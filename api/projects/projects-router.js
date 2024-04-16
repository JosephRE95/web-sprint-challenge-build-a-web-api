// Write your "projects" router here!
const express = require('express')

const router = express.Router()

const projects = require("./projects-model");






  router.get("/", (req, res) => {
    projects.get()
      .then((found) => {
        res.json(found);
        console.log(found)
      })
      .catch((err) => {
        res.status(500).json({
          message: "The posts information could not be retrieved",
          err: err.message,
          stack: err.stack,
        });
      });
  });




module.exports = router