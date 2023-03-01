// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const mysql = require('mysql2/promise');
  let connection;
  let result;
  try {
    connection = await mysql.createConnection({
      host: '130.61.132.4',
      port: 3306,
      user: process.env.NEXT_PUBLIC_DB_USER,
      password: process.env.NEXT_PUBLIC_DB_PASS,
      database: process.env.NEXT_PUBLIC_DB_NAME
    });

    const [rows] = await connection.execute('CALL P1');
    const rowData = rows[0][0];
    result = `${rowData.ServerStatus},${rowData.ServerVersion}`;
    // for (const row of rows) {
    //   // Do something with each row
    //   console.log(row[0]);
    //   result += row[0].ID;
    // }
    res.status(200).send(result);

  } catch (error) {
    // Handle error
    console.log(error);
    res.status(200).json(error, process.env.NEXT_PUBLIC_DB_USER);

  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
