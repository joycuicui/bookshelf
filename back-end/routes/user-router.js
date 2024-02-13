const express = require("express");
const router = express.Router();

const verifyToken = require("../helpers/verifyUser");
const { updateUser } = require("../controllers/user-controller.js");

router.patch("/:userId", verifyToken, updateUser);

// GET /api/users/:id
// router.get("/:id", (req, res) => {
//   const id = req.params.id;

//   getUserById(id)
//     .then((users) => {
//       if (!users.length) {
//         return res.send("no user with that id found");
//       }

//       res.json(users[0]);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

module.exports = router;
