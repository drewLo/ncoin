import { ec } from 'elliptic'
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import * as _ from 'lodash';
import { getPublicKey, getTransactionId, signTxIn, TxOut, UnspentTxOt } from 'tx';

const EC = new ec('secp256k1');
const privateKeyLocation = 'node/wallet/privat_key';

const getPrivateFromWallet = (): string => {
    
};

const getPublicFromWallet = (): string => {
    
};

const generatePrivateKey = (): string => {
    
};

const initWallet = () => {};

const getBalance = (address: string, unspentTxOuts: UnspentTxOut[]): number => {};

const findTxOutsForAmount = (amount: number, myUnspentTxOuts: UnspentTxOut[]) => {};

const createTxOuts = (receiverAddress: string, myAddress: string, amount, leftOverAmount: number) => {};

const createTransaction = (receiverAddress: string, amount: number, privateKey: string, unspentTxOuts: UnspentTxOut[]): Transaction => {};
