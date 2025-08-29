import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "GradeWiseDataBase",
  password: "October@2006",
  port: 5432,
});

export const User = {
  async create(email, fullName, password, profilePic = "") {
    const result = await pool.query(
      `INSERT INTO users (email, full_name, password, profile_pic)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [email, fullName, password, profilePic]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },
};
