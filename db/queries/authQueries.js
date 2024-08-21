import pool from '../pool.js';

export const findUserByEmail = async (email) =>
  await pool.query('SELECT username FROM users WHERE email = $1', [email]);

export const findUserByUsername = async (username) =>
  await pool.query('SELECT username FROM users WHERE username = $1', [username]);
