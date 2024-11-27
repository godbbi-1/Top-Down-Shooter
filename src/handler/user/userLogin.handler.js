import { findUserByUsername } from '../../db/user/user.db.js';

export const handleLogin = async (socket, messageParts) => {
    const [_, username, password] = messageParts;

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
};
