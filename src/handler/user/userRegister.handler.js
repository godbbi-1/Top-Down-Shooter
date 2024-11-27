import { checkDuplicateUsername, handleUserRegistration } from '../../db/user/user.db.js';

export const handleRegister = async (socket, messageParts) => {
    const [_, username, password, nickname] = messageParts;

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
};