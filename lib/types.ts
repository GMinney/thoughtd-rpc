import { noop, cl } from "./util";

export interface IRpcClientOptions {
  host: string;
  port: number;
  user: string;
  pass: string;
  auth?: string;
  protocol?: string;
  disableAgent?: boolean;
  rejectUnauthorized?: boolean;
  batchedCalls?: any;
  chain?: string;
  isEVM?: boolean;
  rpcPort?: number;
  rpcUser?: string;
  rpcPass?: string;
  tokens?: Object;
}

export interface IRpcClientLoggers {
  none: {info: typeof noop, warn: typeof noop, err: typeof noop, debug: typeof noop };
  normal: {info: typeof cl, warn: typeof cl, err: typeof cl, debug: typeof noop };
  debug: {info: typeof cl, warn: typeof cl, err: typeof cl, debug: typeof cl };
}

export type ICallSpec = Record<string, ArgumentTypes[]>;

export type ArgumentTypes = 'str' | 'int' | 'float' | 'bool' | 'obj';


// need to constrict string types to normal none or debug
export interface IRpcClientConfig {
  logger?: "normal" | "none" | "debug";
}
