const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
} = require("../database/queries/user-queries.js");

// GET /api/users
router.get("/", (req, res) => {
  getAllUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET /api/users/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  getUserById(id)
    .then((users) => {
      if (!users.length) {
        return res.send("no user with that id found");
      }

      res.json(users[0]);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
