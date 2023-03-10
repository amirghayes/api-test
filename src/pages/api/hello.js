// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const mysql = require('mysql2/promise');
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.NEXT_PUBLIC_DB_HOST,
      port: process.env.NEXT_PUBLIC_DB_PORT,
      user: process.env.NEXT_PUBLIC_DB_USER,
      password: process.env.NEXT_PUBLIC_DB_PASS,
      database: process.env.NEXT_PUBLIC_DB_NAME
    });

    const [rows] = await connection.execute('CALL P1');
    const rowData = rows[0][0];
    res.status(200).send(`${rowData.ServerStatus},${rowData.ServerVersion}`);

  } catch (error) {
    // Handle error
    console.log(error);
    res.status(200).json(error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
