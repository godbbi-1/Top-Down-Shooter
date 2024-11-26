import pools from '../database.js';
import { SQL_QUERIES } from './jser.query.js';

// 중복된 ID 확인 함수
export const checkDuplicateUsername = async (username) => {
    const pool = pools.USER_DB;
    try {
        const [rows] = await pool.query(SQL_QUERIES.FIND_USER_BY_USERNAME, [username]);
        return rows.length > 0; // 중복된 값이 있으면 true 반환
    } catch (error) {
        console.error('중복 확인 중 오류 발생:', error);
        throw error;
    }
};

// 회원가입 처리 함수
export const handleUserRegistration = async (username, password, nickname) => {
    const pool = pools.USER_DB;
    try {
        const [result] = await pool.query(SQL_QUERIES.CREATE_USER, [
            username,
            password,
            nickname,
        ]);
        return { success: true, insertId: result.insertId };
    } catch (error) {
        console.error('회원가입 처리 중 오류 발생:', error);
        return { success: false, error: error.message };
    }
};

// 다른 필요한 함수들 추가 가능
