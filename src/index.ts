import * as CryptoJS from 'crypto-js';

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }

    // 구조 검증
    static validStructure = (aBlock: Block): boolean => 
        (typeof aBlock.index === 'number' &&
        typeof aBlock.hash === 'string' &&
        typeof aBlock.previousHash === 'string' &&
        typeof aBlock.timestamp === 'number' &&
        typeof aBlock.data === 'string');

    // 해시 출력
    static calcHash = (index: number, previousHash: string, timestamp: number, data: string): string => 
        CryptoJS.SHA256(index+previousHash+timestamp+data).toString();

    // 마지막 블록 get
    static getLatestBlock = (): Block => blockchain[blockchain.length - 1];

    // 해시 get
    static getHashForBlock = (block: Block): string => Block.calcHash(block.index, block.previousHash, block.timestamp, block.data);

    // timestamp 생성
    static getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

    // 블록 유효 검증
    static isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
        if (!Block.validStructure(candidateBlock)) {
            return false;
        } else if (previousBlock.index + 1 !== candidateBlock.index) {
            return false;
        } else if (previousBlock.hash !== candidateBlock.previousHash) {
            return false;
        } else if (Block.getHashForBlock(candidateBlock) !== candidateBlock.hash) {
            return false;
        } else {
            return true;
        }
    }

    // 블록 생성
    static createNewBlock = (data: string): Block => {
        const previousBlock: Block = Block.getLatestBlock();
        const newIndex: number = previousBlock.index + 1;
        const newTimeStamp: number = Block.getNewTimeStamp();
        const nextHash: string = Block.calcHash(newIndex, previousBlock.hash, newTimeStamp, data);

        const newBlock: Block = new Block(newIndex, nextHash, previousBlock.hash, data, newTimeStamp);

        addBlock(newBlock);
        return newBlock;
    }
}

// 최초블록
const genesisBlock: Block = new Block(0,'1010', '', 'hello', 123456);
let blockchain: Block[] = [genesisBlock];

// 블록 추가
const addBlock = (candidateBlock: Block): void => {
    if (Block.isBlockValid(candidateBlock, Block.getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
}

Block.createNewBlock('nice1');
Block.createNewBlock('nice2');
Block.createNewBlock('nice3');
console.log(blockchain);

export {};










