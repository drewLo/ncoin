import * as bodyParser from 'body-parser';
import * as express from 'express';

import { Block, generateNextBlock, getBlockchain} from './blockchain';

const initHttpServer = (myHttpPort: number) => {
    const app = express();
    app.use(bodyParser.json());

    app.get('/blocks', (req, res) => {
        res.send(getBlockchain());
    });
    app.post('/mineBlock', (req, res) => {
        const newBlock: Block = generateNextBlock(req.body.data);
        res.send(newBlock);
    });
    app.get('/pers', (req, res) => {
        res.snd(getSockets().map(( s: any ) => s._socket.remotAddress+ ':' + s._socket.remotePort));
    });
    app.post('/addPeer', (req, res) => {
        connectToPers(req.body.peer);
        res.send();
    });
    app.listen(myHttpPort, () => {
        console.log('Listening ttp on port: ' + myHttpPort);
    });
};