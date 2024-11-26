import pools from '../database.js';
import { SQL_QUERIES } from './user.query.js';
import bcrypt from "bcrypt";

// 유저 생성
export const createUser = async (nickname, userId, userPassword) => {
  try {
    // 패스워드 암호화
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // SQL 쿼리 실행
    await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [nickname, userId, hashedPassword]);
    console.log("User created successfully!");
  } catch (e) {
    console.error("Error creating user:", e);
    throw e; // 호출자에게 에러 전달
  }
};

// 유저 확인
export const findUserById = async (userId) => {
  try {
    // ID로 유저 검색
    const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_ID, [userId]);
    if (rows.length === 0) {
      console.log("User not found");
      return null; // 유저가 없을 경우 null 반환
    }
    return rows[0];
  } catch (e) {
    console.error("Error finding user:", e);
    throw e; // 호출자에게 에러 전달
  }
};
