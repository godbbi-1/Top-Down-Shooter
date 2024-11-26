import pools from '../database.js';
import { SQL_QUERIES } from './jser.query.js';

// 유저 조회 함수
export const findUserByUsername = async (username) => {
    const pool = pools.USER_DB;
    try {
        const [rows] = await pool.query(SQL_QUERIES.FIND_USER_BY_USERNAME, [username]);
        return rows[0] || null; // 유저 정보 반환 또는 null
    } catch (error) {
        console.error('유저 조회 중 오류 발생:', error);
        throw error;
    }
};

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
        if (error.code === 'ER_DUP_ENTRY') {
            console.error('중복된 username 발생:', error.message);
            return { success: false, error: '중복된 username 입니다.' };
        }
        console.error('회원가입 처리 중 오류 발생:', error.message);
        return { success: false, error: '서버 오류가 발생했습니다.' };
    }
};
