export const SQL_QUERIES = {
    // 유저 생성
    CREATE_USER: `
      INSERT INTO users (uuid, username, nickname, password) 
      VALUES (UUID(), ?, ?, ?)
    `,
    // 유저 확인
    FIND_USER_BY_USERNAME: `
      SELECT * FROM users 
      WHERE username = ?
    `,
    // 전체 유저 조회
    FIND_ALL_USERS: `
      SELECT * FROM users
    `,
  };
  