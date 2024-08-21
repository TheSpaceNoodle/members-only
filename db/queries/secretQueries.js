import pool from '../pool.js';

export const makeMember = async (userID) =>
  await pool.query('UPDATE users SET is_member = true WHERE id = $1', [userID]);

export const makeAdmin = async (userID) => await pool.query('UPDATE users SET is_admin = true WHERE id = $1', [userID]);
