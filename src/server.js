import net from 'net';
import { HOST, PORT } from './constants/env.js'

const server = net.createServer();

server.listen( PORT, HOST, () => {
    console.log(`서버가 ${HOST}:${PORT}에서 실행 중입니다.`);
});
