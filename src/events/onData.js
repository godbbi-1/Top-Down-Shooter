import { findUserByUsername, checkDuplicateUsername, handleUserRegistration } from '../db/user/user.db.js';

const onData = async (socket, data) => {
    const message = data.toString().trim();
    console.log(`수신된 데이터: ${message}`);

    try {
        if (message.startsWith('REGISTER|')) {
            // 회원가입 요청 처리
            const [_, username, password, nickname] = message.split('|');

            if (!username || !password || !nickname) {
                socket.write('회원가입 실패: 유효하지 않은 데이터 형식');
                return;
            }

            // 중복 확인
            const isDuplicate = await checkDuplicateUsername(username);
            if (isDuplicate) {
                socket.write('회원가입 실패: 중복된 ID');
                return;
            }

            const result = await handleUserRegistration(username, password, nickname);
            if (result.success) {
                socket.write('회원가입 성공');
            } else {
                socket.write(`회원가입 실패: ${result.error}`);
            }
        } else if (message.startsWith('LOGIN|')) {
            // 로그인 요청 처리
            const [_, username, password] = message.split('|');

            if (!username || !password) {
                socket.write('로그인 실패: 유효하지 않은 데이터 형식');
                return;
            }

            const user = await findUserByUsername(username);
            if (user && user.password === password) {
                socket.write('로그인 성공');
            } else {
                socket.write('로그인 실패: 잘못된 ID 또는 비밀번호');
            }
        } else {
            socket.write('요청 실패: 알 수 없는 요청 유형');
        }
    } catch (error) {
        console.error('데이터 처리 중 오류 발생:', error);
        socket.write('서버 오류: 요청 처리 중 문제가 발생했습니다.');
    }
};

export default onData;
