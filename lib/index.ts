import * as http from "http";
import * as https from "https";
import { getRandomId } from "./util";
import { IRpcClientConfig, IRpcClientLoggers, IRpcClientOptions, ICallSpec, ArgumentTypes } from "./types";
import { RpcClientConfig, RpcClientLoggers, CallSpec } from "./constants";




export class ThoughtRpcClient {
  host: string;
  port: number;
  user: string;
  pass: string;
  auth: string;
  protocol: typeof http | typeof https;
  disableAgent?: boolean;
  rejectUnauthorized?: boolean;
  batchedCalls?: any;

  loggers: IRpcClientLoggers = RpcClientLoggers;
  config: IRpcClientConfig = RpcClientConfig;
  callspec: ICallSpec = CallSpec;

  constructor(opts: IRpcClientOptions) {
    this.host = opts.host || '127.0.0.1';
    this.port = opts.port || 10617;
    this.user = opts.user || 'user';
    this.pass = opts.pass || 'pass';
    this.auth = `${this.user}:${this.pass}`;
    this.protocol = opts.protocol === 'http' ? http : https || https;
    this.batchedCalls = null;
    this.disableAgent = opts.disableAgent || false;
    this.rejectUnauthorized = opts.rejectUnauthorized || true;
    this.generateRPCMethods(CallSpec)
  }

  rpc(request: any, callback: (error: any, response?: any) => void) {

    // parse request
    request = JSON.stringify(request);
    const requestJson = JSON.stringify(request);

    // set the auth param 
    const buf = Buffer.from(this.auth);
    this.auth = buf.toString('base64');

    // set up options, merging in any extra options that were passed in
    const options = {
      host: this.host,
      path: '/',
      method: 'POST',
      port: this.port,
      rejectUnauthorized: this.rejectUnauthorized,
      agent: this.disableAgent ? false : undefined
    };

    // Commented out because it's not used for now, merge params
    // if (this.httpOptions) {
    //   for (var k in this.httpOptions) {
    //     options[k] = this.httpOptions[k];
    //   }
    // }

    // Set up the request
    let called = false;

    let req = this.protocol.request(options, function (res : http.IncomingMessage) {

      let buf = '';

      // Data listener
      res.on('data', function (data) {
        buf += data;
      });

      // End Stream listener
      res.on('end', function () {

        // if req already called, return
        if (called) {
          return;
        }

        // mark the req as called
        called = true;

        // Read status codes for errors
        if (res.statusCode === 401) {
          callback(new Error('Thought JSON-RPC: Connection Rejected: 401 Unnauthorized'));
          return;
        }
        if (res.statusCode === 403) {
          callback(new Error('Thought JSON-RPC: Connection Rejected: 403 Forbidden'));
          return;
        }
        if (res.statusCode === 500 && buf.toString() === 'Work queue depth exceeded') {
          callback(new Error('Thought JSON-RPC: ' + buf.toString()));
          return;
        }

        // Attempt to parse the response
        let parsedBuf;
        try {
          parsedBuf = JSON.parse(buf);
        } catch (e: any) {
          // this.log.err(e.stack);
          // this.log.err(buf);
          // this.log.err('HTTP Status code:' + res.statusCode);
          callback(new Error('Thought JSON-RPC: Error Parsing JSON: ' + e.message));
          return;
        }

        // callback with the parsed response
        callback(parsedBuf.error, parsedBuf);

      });
    });

    req.on('error', function (e: Error) {
      if (!called) {
        called = true;
        callback(new Error('Request Error: ' + e.message));
      }
    });

    req.setHeader('Content-Length', requestJson.length);
    req.setHeader('Content-Type', 'application/json');
    req.setHeader('Authorization', 'Basic ' + this.auth);
    req.write(requestJson);
    req.end();
  }

  batch(batchCallback, resultCallback) {
    this.batchedCalls = [];
    batchCallback();
    this.rpc.call(this, this.batchedCalls, resultCallback);
    this.batchedCalls = null;
  };




// TODO: This code is ass, just write the calls instead of generating them at runtime
  private generateRPCMethods(apiCalls: Record<string, ArgumentTypes[]>): void {
    // arg aint even supplied here yert
    const types: Record<ArgumentTypes, (arg: any) => any> = {
      str: (arg) => arg.toString(),
      int: (arg) => parseFloat(arg),
      float: (arg) => parseFloat(arg),
      bool: (arg) => (arg === true || arg == '1' || arg == 'true' || arg.toString().toLowerCase() == 'true'),
      obj: (arg) => (typeof arg === 'string' ? JSON.parse(arg) : arg),
    };

    for (const [methodName, argTypes] of Object.entries(apiCalls)) {
      const argMap = argTypes.map((type) => types[type]);
      this[methodName] = this.createRPCMethod(methodName.toLowerCase(), argMap);
    }
  }

  private createRPCMethod(methodName: string, argMap: ((arg: any) => any)[]): (...args: any) => void {
    return (...args: any) => {
      const limit = this.batchedCalls ? args.length : args.length - 1;
      const processedArgs = args.slice(0, limit).map((arg, i) => argMap[i] ? argMap[i](arg) : arg);

      if (this.batchedCalls) {
        this.batchedCalls.push({
          jsonrpc: '2.0',
          method: methodName,
          params: processedArgs,
          id: getRandomId(),
        });
      } else {
        this.rpc.call(methodName, processedArgs, args[args.length - 1]);
      }
    };
  }



}

//generateRPCMethods(RpcClient, RpcClient.callspec, rpc);













