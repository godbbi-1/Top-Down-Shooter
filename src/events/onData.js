import { handleRegister } from '../handlers/user/registerHandler.js';
import { handleLogin } from '../handlers/user/loginHandler.js';

const onData = async (socket, data) => {
    const message = data.toString().trim();
    console.log(`수신된 데이터: ${message}`);

    try {
        if (message.startsWith('REGISTER|')) {
            await handleRegister(socket, message.split('|'));
        } else if (message.startsWith('LOGIN|')) {
            await handleLogin(socket, message.split('|'));
        } else {
            socket.write('요청 실패: 알 수 없는 요청 유형');
        }
    } catch (error) {
        console.error('데이터 처리 중 오류 발생:', error);
        socket.write('서버 오류: 요청 처리 중 문제가 발생했습니다.');
    }
};

export default onData;
