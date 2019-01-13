import * as CryptoJS from 'crypto-js';
import { broadcastLatest } from './p2p';
import { hexToBinary } from './util';
class Block {

    public index: number;
    public hash: string;
    public previousHash: string;
    public timestamp: number;
    public data: string;
        public difficulty: number;
        public nonce: number;

        constructor(index: number, hash: string, previousHash: string, timestamp: number, data: string, difficulty: number, nonce: number) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
                this.difficulty = difficulty;
                this.nonce = nonce;
    }
}

const genesisBlock: Block = new Block(
        0, '91a73664bc84c0baa1fc75ea6e4aa6d1d20c5df664c724e3159aefc2e1186627', '', 1465154705, 'my genesis block!!', 0, 0
);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const generateNextBlock = (blockData: string) => {
    const previousBlock: Block = getLatestBlock();
        const difficulty: number = getDifficulty(getBlockchain());
        console.log('difficulty: ' + difficulty);
    const nextIndex: number = previousBlock.index + 1;
        const newBlock: Block = findBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty);
    return newBlock;
};

const calculateHashForBlock = (block: Block): string => 
    calculateHash(block.index, block.previousHash, block.timestamp,block.data);

const calculateHash = (index: number, previousHash: string, timestamp: number, data: string): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

const isValidnewBlock = (newBlock: Block, previousBlock: Block): boolean => {
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index');
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previoushash');
        return false;
    } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log(typeof (newBlock.hash) + ' ' + typeof calculateHashForBlock(newBlock));
        console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
        return false;
    }
    return true;
};

const hashMatchesDifficulty = (hash: string, difficulty: number): boolean => {
    const hashInBinary: string = hexToBinary(hash);
    const requiredPrefix: string = '0'.repeat(difficulty);
    return hashInBinary.startsWith(requiredPrefix);
};

const isValidBlockStructure = (block: Block): boolean => {
    return typeof block.index === 'number'
        && typeof block.hash === 'string'
        && typeof block.previousHash === 'string'
        && typeof block.timestamp === 'number'
        && typeof block.data === 'string';
};

const isValidChain = (blockchainToValidate: Block[]): boolean => {
    const isValidGenesis = (block: Block): boolean => {
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    };

    if (!isValidGenesis(blockchainToValidate[0])) {
        return false;
    }

        for (let i = 1; i < blockchainToValidate.length; i++) {
        if (!isValidnewBlock(blockchainToValidate[i], blockchainToValidate[i - 1])) {
            return false;
        }
    }
    return true;
}

const findBlock = (index: number, previousHash: string, timestamp: number, data: string, difficulty: number): Block => {
        let nonce = 0;
        while (true) {
                const hash: string = calculateHash(index, previousHash, timestamp, data, difficulty, nonce);
                if (hashMatchesDifficulty(hash, difficulty) {
                        return new Block(index, hash, previousHash, timestamp, data, difficulty, nonce);
                }
                nonce++;
        }
}

const addBlockToChain = (newBlock: Block) => {
    if (isValidnewBlock(newBlock, getLatestBlock())) {
        blockchain.push(newBlock);
        return true;
    }
    return false;
};

const replaceChain = (newBlocks: Block[]) => {
    if (isValidChain(newBlocks) && newBlocks.length > getBlockchain().length) {
        console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
        blockchain = newBlocks;
        broadcastLatest();
    } else {
        console.log('Received blockchain invalid');
    }
};

export { Block, getBlockchain, getLatestBlock, generateNextBlock, isValidBlockStructure, replaceChain, addBlockToChain };
