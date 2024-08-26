import pool from '../pool.js';

export const getAllMessages = async () => {
  const { rows, rowCount } = await pool.query(
    'SELECT messages.id, full_name, time_sent, title, content FROM messages INNER JOIN users ON users.id = messages.author_id ORDER BY messages.time_sent',
  );

  return { rows, rowCount };
};

export const createMessage = async ({ body, userID }) => {
  const { rows, rowCount } = await pool.query('INSERT INTO messages(title, content, author_id) VALUES($1, $2, $3)', [
    body.title,
    body.description,
    userID,
  ]);

  return { rows, rowCount };
};

export const deleteMessage = async (messageId) => {
  await pool.query('DELETE FROM messages WHERE messages.id = $1', [messageId]);
};
