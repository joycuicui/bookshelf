const db = require("../connection");

const createUser = async ({ name, email, password }) => {
  try {
    const res = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;",
      [name, email, password]
    );
    const user = res.rows[0];
    return user || null;
  } catch (err) {
    console.log(err.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const res = await db.query("SELECT * FROM users WHERE email ILIKE $1;", [
      email,
    ]);
    const user = res.rows[0];
    return user || null;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
