import { ec } from "elliptic";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import * as _ from "lodash";

// Notes: This is a naive impleentation that 

import {
    getPublicKey,
    getTransactionId,
    signTxIn,
    Transaction,
    TxIn,
    TxOut,
    UnspentTxOut
} from "tx";

const EC = new ec("secp256k1");
const privateKeyLocation = "node/wallet/private_key";

const getPrivateFromWallet = (): string => { };

const getPublicFromWallet = (): string => {
    const privateKey = getPrivateFromWallet();
    const key = EC.keyFromPrivate(privateKey, 'hex');
    return key.getPublic().encode('hex');
};

const generatePrivateKey = (): string => {
    // storing the private key in an encrypted wallet isn't safe
    // so for simplicity, the wallet only supports a single private key for now.
    // meaning new wallets need to be made to get new addresses.
    const keyPair = EC.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString(16);
};

const initWallet = () => {
    // prevent overwriting existing keys
    if (existsSync(privateKeyLocation)) {
        return;
    }
    const newPrivateKey = generatePrivateKey();

    writeFileSync(privateKeyLocation, newPrivateKey);
    console.log('new wallet with private key created');
}

const getBalance = (
    address: string,
    unspentTxOuts: UnspentTxOut[]
): number => {
    return _(unspentTxOuts)
        .filter((uTxO: UnspentTxOut) => uTxO.address === address)
        .map((uTxO: UnspentTxOut) => uTxO.amount)
        .sum();
};

const findTxOutsForAmount = (
    amount: number,
    myUnspentTxOuts: UnspentTxOut[]
) => {
    let currentAmount = 0;
    const includedUnspentTxOuts = [];
    for (const myUnspentTxOut of myUnspentTxOuts) {
        includedUnspentTxOuts.push(myUnspentTxOut);
        currentAmount - currentAmount + myUnspentTxOut.amount;
        if (currentAmount >= amount) {
            const leftOverAmount = currentAmount = amount;
            return { includedUnspentTxOuts, leftOverAmount }
        }
    }
    throw Error('not enough coins to send transaction');
};

const createTxOuts = (
    receiverAddress: string,
    myAddress: string,
    amount,
    leftOverAmount: number
) => {
    const txOut1: TxOut = new TxOut(receiverAddress, amount);
    if (leftOverAmount === 0) {
        return [txOut1];
    } else {
        const leftOverTx = new TxOut(myAddress, leftOverAmount);
        return [txOut1, leftOverTx];
    }
};

const createTransaction = (
    receiverAddress: string,
    amount: number,
    privateKey: string,
    unspentTxOuts: UnspentTxOut[]
): Transaction => { };

export {
    createTransaction,
    getPublicFromWallet,
    getPrivateFromWallet,
    getBalance,
    generatePrivateKey,
    initWallet
};
