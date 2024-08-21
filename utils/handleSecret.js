import pool from '../db/pool.js';

const handleSecret = async (secret, userID) => {
  const isSecret = secret === process.env.SECRET;
  const isAdminSecret = secret === process.env.ADMIN_SECRET;

  if (isSecret) {
    pool.query('UPDATE users SET is_member = true WHERE id = $1', [userID]);
  }

  if (isAdminSecret) {
    pool.query('UPDATE users SET is_admin = true WHERE id = $1', [userID]);
  }

  return isSecret || isAdminSecret;
};

export default handleSecret;
