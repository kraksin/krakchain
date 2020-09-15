import * as CryptoJS from 'crypto-js';

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    // 구조 검증
    static validStructure = (aBlock: Block): boolean => 
        (typeof aBlock.index === 'number' &&
        typeof aBlock.hash === 'string' &&
        typeof aBlock.previousHash === 'string' &&
        typeof aBlock.timestamp === 'number' &&
        typeof aBlock.data === 'string');

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
}

// 최초블록
const genesisBlock: Block = new Block(0,'1010', '', 'hello', 123456);
let blockchain: Block[] = [genesisBlock];

// 해시 출력
const calcHash = (index: number, previousHash: string, timestamp: number, data: string): string => 
    CryptoJS.SHA256(index+previousHash+timestamp+data).toString();

// 마지막 블록 get
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

// timestamp 생성
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

// 블록 생성
const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const nextHash: string = calcHash(newIndex, previousBlock.hash, newTimeStamp, data);

    const newBlock: Block = new Block(newIndex, nextHash, previousBlock.hash, data, newTimeStamp);
    return newBlock;
}

// 해시 get
const getHashForBlock = (block: Block): string => calcHash(block.index, block.previousHash, block.timestamp, block.data);

// 블록 유효 검증
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
}

// 블록 추가
const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
}

addBlock(createNewBlock('nice1'));
addBlock(createNewBlock('nice2'));    
console.log(blockchain);



export {};










