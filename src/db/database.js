import mysql from 'mysql2/promise';
import { config } from '../config/config.js';
import { formatDate } from '../utils/dataFormatter.js'; // 올바른 경로 확인 필요

const { db } = config;

// 데이터베이스 커넥션 풀 생성 함수
const createPool = (dbConfig) => {
  const pool = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    waitForConnections: true,
    connectionLimit: dbConfig.connectionLimit || 10, // 설정 값 추가
    queueLimit: dbConfig.queueLimit || 0, // 0은 무제한
  });

  // SQL 쿼리 로깅
  const originalQuery = pool.query;
  pool.query = async (sql, params) => {
    const date = new Date();
    console.log(
      `[${formatDate(date)}] 쿼리 실행: ${sql} ${
        params ? `파라미터: ${JSON.stringify(params)}` : ''
      }`
    );
    return await originalQuery.call(pool, sql, params);
  };

  return pool;
};

// 커넥션 풀 생성
const pools = {
  USER_DB: createPool(db),
};

export default pools;
