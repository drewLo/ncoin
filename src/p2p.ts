import * as WebSocket from 'ws';
import { Server } from 'ws';
import { addBlockToChain, Block, getBlockchain, geetLatestBlock, isValidBlockStructure, replaceChain } from './block';
import { write } from 'fs';

const sockets: webSocket[] = [];

enum MessageType {
    QUERY_LATEST = 0,
    QUERY_ALL =1,
    RSPONSE_BLOCKCHAIN = 2,
}

class Message {
    public type: MessageType;
    public data: any;
}

const initP2PServer = (p2pPort: number) => {
    const server: Server = new WebSocket.Server({port: p2pPort});
    server.on('connection', (ws: WebSocket) => {
        initConnection(ws);
    });
    console.log('listening websocket p2p port on: ' + p2pPort);
};

const getSockets = () => sockets;

const initConnection = (we: WebSocket) => {
    sockets.push(ws);
    initMessageHandler(ws);
    initErrorHandler(ws);
    write(ws, queryChainLengthMsg());
};

const JSONToObject = <T>(data: string): T => {
    try {
        return JSON.parse(data);
    } catch (e) {
        console.log(e);
        return null;
    }
};

const initMessageHandler = (ws: Websocket) => {
    ws.on('message', data: string) => {
        const message: Message = JSONToObject<Message>(data);
        if (messag === null) {
            console.log('could not parse received JSON message: ' + data);
            return;
        }
        console.log("Received message' + JSON.stringify(message));
        switch (message.type) {
            case MessageType.QUERY_LATEST:
        }
    }
}