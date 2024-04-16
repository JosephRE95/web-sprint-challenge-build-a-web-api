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


  router.get("/:id", (req, res) => {
    const projectId = req.params.id;
  
    projects.get(projectId)
      .then((found) => {
        if (found) {
          res.json(found);
          console.log(found);
        } else {
          res.status(404).json({ message: "Project not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "The project information could not be retrieved",
          err: err.message,
          stack: err.stack,
        });
      });
  });
  



module.exports = router