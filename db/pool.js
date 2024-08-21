import pg from 'pg';

import 'dotenv/config';

const pool = new pg.Pool({
  connectionString: process.env.DB_CONN_STR,
});

export default pool;
