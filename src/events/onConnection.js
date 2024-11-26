import onData from './onData.js';
import onEnd from './onEnd.js';
import onError from './onError.js';



const onConnection = (socket) => {
    console.log('클라이언트가 연결되었습니다.');

    socket.on('data', (data) => onData(socket, data));
    socket.on('close', () => console.log('클라이언트 연결이 종료되었습니다.'));
    socket.on('error', (error) => console.error('소켓 오류:', error));
};

export default onConnection;
