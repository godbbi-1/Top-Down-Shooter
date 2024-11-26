import net from 'net';
import onConnection from './events/onConnection.js';

const PORT = process.env.PORT || 3000;

const server = net.createServer(onConnection);

server.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
