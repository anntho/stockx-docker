const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS shoes (
      id serial PRIMARY KEY,
      ticker VARCHAR (150) UNIQUE NOT NULL,
      name VARCHAR (150) NOT NULL,
      created_on TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS fits (
      id serial PRIMARY KEY,
      shoeId INTEGER REFERENCES shoes(id),
      fit INTEGER NOT NULL,
      created_on TIMESTAMP DEFAULT NOW()
    );
  `);

  let insertSQL = `
    INSERT INTO shoes (ticker, name)
    SELECT $1, $2
    ON CONFLICT (ticker) DO NOTHING
  `;

  await client.query({
    text: insertSQL,
    values: ['YZY350V2ZEBRA', 'adidas Yeezy Boost 350 V2 Zebra']
  });

  await client.query({
    text: insertSQL,
    values: ['NKSBDLSLSB', 'Nike SB Dunk Low StrangeLove Skateboards (Regular Box)']
  });

  await client.release(true);
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
    DROP TABLE fits;
    DROP TABLE shoes;
  `);

  await client.release(true);
  next()
}
