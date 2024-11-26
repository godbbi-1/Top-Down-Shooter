import onData from './onData.js';
import onEnd from './onEnd.js';
import onError from './onError.js';

const onConnection = (socket) => {
    console.log('클라이언트가 연결되었습니다.');

    // 연결된 소켓 이벤트 처리
    socket.on('data', (data) => onData(socket, data));
    socket.on('end', () => onEnd(socket));
    socket.on('error', (err) => onError(socket, err));
};

export default onConnection;
