export const SQL_QUERIES = {
  FIND_USER_BY_USERNAME: 'SELECT * FROM users WHERE username = ?',
  CREATE_USER: 'INSERT INTO users (uuid, username, nickname, password) VALUES (UUID(), ?, ?, ?)',
};
