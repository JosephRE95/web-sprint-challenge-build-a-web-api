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
  
  router.post("/", (req, res) => {
    const newAction = req.body;
  
    // Check if required fields are missing
    if (!newAction.notes || !newAction.description || !newAction.project_id) {
      return res.status(400).json({ message: "Notes, description, and project_id are required" });
    }
  
    action.insert(newAction)
      .then((createdAction) => {
        res.status(201).json(createdAction); // Respond with the newly created action
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error inserting action",
          err: err.message,
          stack: err.stack,
        });
      });
  });
  
  router.put("/:id", (req, res) => {
    const actionId = req.params.id;
    const updatedAction = req.body;
  
    // Check if required fields are missing
    if (!updatedAction.notes || !updatedAction.description || updatedAction.completed === undefined || !updatedAction.project_id) {
      return res.status(400).json({ message: "Notes, description, completed, and project_id are required" });
    }
  
    // Update the action in the database
    action.update(actionId, updatedAction)
      .then((updated) => {
        if (updated) {
          // If updated successfully, respond with the updated action
          res.json(updated);
        } else {
          // If the action with the specified ID does not exist, respond with a 404 status code
          res.status(404).json({ message: "Action not found" });
        }
      })
      .catch((err) => {
        // If there's any error during the process, respond with a 500 status code and an error message
        res.status(500).json({
          message: "Error updating action",
          err: err.message,
          stack: err.stack,
        });
      });
  });
  
  
  



module.exports = router