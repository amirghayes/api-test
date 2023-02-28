// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    const db = require('mysql2-promise')();
    db.configure({
      "host": "localhost",
      "user": process.env.DB_USER,
      "password": process.env.DB_PASS,
      "database": process.env.DB_NAME
    });

    const query = await db.query('CALL P1');
    console.log(query.rows);
    res.status(200).json(query)

  } catch (error) {
    res.status(200).json(error)
  }

}
