import { checkDuplicateUsername, handleUserRegistration } from '../db/user/user.db.js';

const onData = async (socket, data) => {
    const message = data.toString().trim();
    console.log(`수신된 데이터: ${message}`);

    const [id, password, nickname] = message.split('|');

    if (!id || !password || !nickname) {
        console.error('유효하지 않은 데이터 형식');
        socket.write('회원가입 실패: 유효하지 않은 데이터 형식');
        return;
    }

    try {
        // 중복 확인
        const isDuplicate = await checkDuplicateUsername(id);
        if (isDuplicate) {
            console.log('중복된 ID 감지');
            socket.write('회원가입 실패: 중복된 ID');
            return;
        }

        // 중복이 없으면 회원가입 진행
        const result = await handleUserRegistration(id, password, nickname);
        if (result.success) {
            socket.write('회원가입 성공');
        } else {
            socket.write(`회원가입 실패: ${result.error}`);
        }
    } catch (err) {
        console.error('회원가입 처리 중 오류 발생', err);
        socket.write('회원가입 실패: 서버 오류');
    }
};

export default onData;
