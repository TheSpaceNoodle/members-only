import pool from '#src/db/pool.js';

export const findUserById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

  return rows[0];
};

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query('SELECT username FROM users WHERE email = $1', [email]);

  return rows[0];
};

export const findUserByUsername = async (username) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

  return rows[0];
};

export const createUser = async (body) => {
  const { rows } = await pool.query(
    'INSERT INTO users(username, password, first_name, last_name, email, is_member, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [body.username, body.password, body.first_name, body.last_name, body.email, false, false],
  );

  return rows[0];
};
