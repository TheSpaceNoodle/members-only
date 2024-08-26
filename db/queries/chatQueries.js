import pool from '../pool';

export const getAllMessages = async (pageSize = 10) => {
  const { rows, rowCount } = await pool.query(
    'SELECT full_name, time_sent, title, content FROM messages INNER JOIN users ON users.id = messages.author_id ORDER BY messages.time_sent LIMIT $1',
    [pageSize],
  );

  return { rows, rowCount };
};
