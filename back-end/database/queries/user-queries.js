const db = require("../connection");

const createUser = async ({ name, email, password, avatar }) => {
  try {
    let insertQuery;
    if (avatar) {
      insertQuery = `
        INSERT INTO users (name, email, password, avatar) 
        VALUES ($1, $2, $3, $4) RETURNING *;`;
    } else {
      insertQuery = `
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3) RETURNING *;`;
    }
    const values = avatar
      ? [name, email, password, avatar]
      : [name, email, password];
    const res = await db.query(insertQuery, values);
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

const getUserById = async (id) => {
  try {
    const res = await db.query("SELECT * FROM users WHERE id = $1;", [id]);
    const user = res.rows[0];
    return user || null;
  } catch (err) {
    console.log(err.message);
  }
};

const updateUserById = async (userId, name, password, avatar) => {
  try {
    console.log(name, password, avatar);

    let query = "UPDATE users SET ";
    const queryParams = [];
    const updateFields = [];

    if (name) {
      queryParams.push(name);
      updateFields.push(`name = $${queryParams.length}`);
    }

    if (password) {
      queryParams.push(password);
      updateFields.push(`password = $${queryParams.length}`);
    }

    if (avatar) {
      queryParams.push(avatar);
      updateFields.push(`avatar = $${queryParams.length}`);
    }

    if (updateFields.length === 0) {
      return null;
    }

    query +=
      updateFields.join(", ") +
      ` WHERE id = $${queryParams.length + 1} RETURNING *;`;
    queryParams.push(userId);

    // console.log("query: ", query);
    // console.log("queryParams: ", queryParams);

    const res = await db.query(query, queryParams);
    return res.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserById,
};
