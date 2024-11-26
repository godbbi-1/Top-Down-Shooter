import net from 'net';
import { HOST, PORT } from './constants/env.js';

const server = net.createServer((socket) => {
    console.log('클라이언트가 연결되었습니다.');

    // 데이터 수신
    socket.on('data', (data) => {
        console.log(`받은 데이터: ${data.toString()}`);
        // 응답 데이터 전송
        socket.write('서버에서 메시지를 받았습니다.');
    });

    // 연결 종료
    socket.on('end', () => {
        console.log('클라이언트 연결이 종료되었습니다.');
    });

    // 오류 처리
    socket.on('error', (err) => {
        console.error('오류 발생:', err.message);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`서버가 ${HOST}:${PORT}에서 실행 중입니다.`);
});
