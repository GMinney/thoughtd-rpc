// export function decodeURL(str): IRpcClientOptions {
//   const parsedUrl = new URL(str);
//   const hostname = parsedUrl.hostname;
//   const port = parseInt(parsedUrl.port, 10);
//   let protocol = parsedUrl.protocol;
//   // strip trailing ":"
//   protocol = protocol.substring(0, protocol.length - 1);
//   const auth = parsedUrl.auth;
//   const parts = auth.split(':');
//   const user = parts[0] ? decodeURIComponent(parts[0]) : null;
//   const pass = parts[1] ? decodeURIComponent(parts[1]) : null;
//   const opts = {
//     host: hostname,
//     port: port,
//     protocol: protocol,
//     user: user,
//     pass: pass,
//   };
//   return opts;
// }

export const cl = console.log.bind(console);

export function noop() {}

export function slice (arr, start, end) {
  return Array.prototype.slice.call(arr, start, end);
};

export function getRandomId(): number {
  return Math.random() * 100000;
}