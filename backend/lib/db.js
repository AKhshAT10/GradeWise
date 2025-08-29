import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});


export const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("PostgreSQL connected successfully");
  } catch (err) {
    console.error("PostgreSQL connection error:", err);
  }
};

export default pool;
