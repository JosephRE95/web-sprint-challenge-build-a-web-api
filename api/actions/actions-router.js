// Write your "actions" router here!
const express = require('express')


const router = express.Router()

const action = require("./actions-model");


router.get("/", (req, res) => {
    action.get()
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
    const actionId = req.params.id;
  
    action.get(actionId)
      .then((foundAction) => {
        if (foundAction) {
          res.json(foundAction);
          console.log(foundAction);
        } else {
          res.status(404).json({ message: "Action not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "The action information could not be retrieved",
          err: err.message,
          stack: err.stack,
        });
      });
  });
  
  
  



module.exports = router