// Put the constants here
// Do the same to crypto-rpc lib
// Do the same to thoughtcore-p2p lib

// Eventually make everything typescript and combine packages

import { cl, noop } from './util'
import { IRpcClientConfig, IRpcClientLoggers, ICallSpec } from './types'

export const RpcClientConfig: IRpcClientConfig = {
  logger: 'normal'
}

export const RpcClientLoggers: IRpcClientLoggers = {
  none: {info: noop, warn: noop, err: noop, debug: noop },
  normal: {info: cl, warn: cl, err: cl, debug: noop },
  debug: {info: cl, warn: cl, err: cl, debug: cl }
}

export const CallSpec: ICallSpec = {
  abandonTransaction: ['str'],
  addMultiSigAddress: [],
  addNode: [],
  backupWallet: [],
  clearBanned: [],
  createMultiSig: [],
  createRawTransaction: ['obj', 'obj'],
  decodeScript: ['str'],
  decodeRawTransaction: [],
  disconnectNode: [],
  dumphdinfo: [],
  dumpPrivKey: [],
  dumpWallet: ['str'],
  encryptWallet: [],
  estimateFee: [], // deprecated
  estimateSmartFee: ['int', 'str'],
  estimatePriority: ['int'], // deprecated
  estimateSmartPriority: ['int'], // deprecated
  generate: ['int'], // deprecated
  generateToAddress: ['int', 'str'],
  getAccount: [], // deprecated
  getAccountAddress: ['str'], // deprecated
  getAddedNodeInfo: [],
  getAddressMempool: ['obj'], // deprecated
  getAddressUtxos: ['obj'], // deprecated
  getAddressBalance: ['obj'], // deprecated
  getAddressDeltas: ['obj'], // deprecated
  getAddressInfo: ['str'],
  getAddressTxids: ['obj'], // deprecated
  getAddressesByAccount: [], // deprecated
  getBalance: ['str', 'int'],
  getBestBlockHash: [],
  getBlock: ['str', 'int'],
  getBlockchainInfo: [],
  getBlockCount: [],
  getBlockHashes: ['int', 'int', 'obj'], // deprecated
  getBlockHash: ['int'],
  getBlockHeader: ['str'],
  getBlockTemplate: [],
  getConnectionCount: [],
  getChainTips: [],
  getDifficulty: [],
  getInfo: [], // deprecated
  getMemoryInfo: [],
  getMemPoolAncestors: ['str'],
  getMemPoolDescendants: ['str'],
  getMemPoolEntry: ['str'],
  getMemPoolInfo: [],
  getMiningInfo: [],
  getNetTotals: [],
  getNetworkHashPS: [],
  getNetworkInfo: [],
  getNewAddress: ['str', 'str'],
  getPeerInfo: [],
  getRawChangeAddress: [],
  getRawMemPool: ['bool'],
  getRawTransaction: ['str', 'int'],
  getReceivedByAccount: ['str', 'int'], // deprecated
  getReceivedByAddress: ['str', 'int'],
  getSpentInfo: ['obj'],
  getTransaction: [],
  getTxOut: ['str', 'int', 'bool'],
  getTxOutProof: [],
  getTxOutSetInfo: [],
  getUnconfirmedBalance: [],
  getWalletInfo: [],
  fundRawTransaction: ['str'],
  help: [],
  importAddress: ['str', 'str', 'bool'],
  importElectrumWallet: ['str'],
  importDescriptors: ['str'],
  importMulti: ['obj', 'obj'],
  importPrivKey: ['str', 'str', 'bool'],
  importPrunedFunds: ['str', 'str'],
  importPubKey: ['str'],
  importWallet: ['str'],
  keyPoolRefill: [],
  listAccounts: ['int'],
  listAddressGroupings: [],
  listAddressBalances: ['int', 'str'],
  listBanned: [],
  listReceivedByAccount: ['int', 'bool'],
  listReceivedByAddress: ['int', 'bool'],
  listSinceBlock: ['str', 'int'],
  listTransactions: ['str', 'int', 'int'],
  listUnspent: ['int', 'int'],
  lockUnspent: [],
  move: ['str', 'str', 'float', 'int', 'str'],
  ping: [],
  preciousBlock: ['str'],
  prioritiseTransaction: ['str', 'float', 'int'],
  pruneBlockChain: ['int'],
  removePrunedFunds: ['str'],
  sendFrom: ['str', 'str', 'float', 'int', 'str', 'str'],
  sendMany: ['str', 'obj', 'int', 'str'],  //not sure this is will work
  sendRawTransaction: ['str'],
  sendToAddress: ['str', 'float', 'str', 'str'],
  setAccount: [],
  setBan: ['str', 'str'],
  setNetworkActive: ['bool'],
  setTxFee: ['float'],
  signMessage: [],
  signMessageWithPrivKey: ['str', 'str'],
  signRawTransaction: [],
  stop: [],
  submitBlock: ['str'],
  validateAddress: [],
  verifyChain: [],
  verifyMessage: [],
  verifyTxOutProof: ['str'],
}