const db = require("../connection");

const getAllUsers = () => {
  return db.query("SELECT * FROM users ORDER BY id;").then((res) => res.rows);
};

const getUserById = (id) => {
  return db
    .query("SELECT * FROM users WHERE id = $1;", [id])
    .then((res) => res.rows);
};

module.exports = {
  getAllUsers,
  getUserById,
};
