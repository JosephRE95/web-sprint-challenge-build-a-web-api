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

  
  



module.exports = router