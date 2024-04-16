// Write your "projects" router here!
const express = require('express')

const router = express.Router()

const projects = require("./projects-model");

const errorHandler = require("./projects-middleware"); // Import the error handler middleware



  router.get("/", (req, res, next) => {
    projects.get()
      .then((found) => {
        res.json(found);
        console.log(found)
      })
      .catch(next)
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
  
  router.post("/", (req, res) => {
    const newProject = req.body;
  
    if (!newProject.name || !newProject.description) {
      return res.status(400).json({ message: "Name and description are required" });
    }
  
    projects.insert(newProject)
      .then((createdProject) => {
        res.status(201).json(createdProject);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error inserting project",
          err: err.message,
          stack: err.stack,
        });
      });
  });
  
  router.put("/:id", (req, res) => {
    const projectId = req.params.id;
    const updatedProject = req.body;
  
    // Check if required fields are missing
    if (!updatedProject.name || !updatedProject.description || updatedProject.completed === undefined) {
      return res.status(400).json({ message: "Name, description, and completed are required" });
    }
  
    // Update the project in the database
    projects.update(projectId, updatedProject)
      .then((updated) => {
        if (updated) {
          // If updated successfully, respond with the updated project
          res.json(updated);
        } else {
          // If the project with the specified ID does not exist, respond with a 404 status code
          res.status(404).json({ message: "Project not found" });
        }
      })
      .catch((err) => {
        // If there's any error during the process, respond with a 500 status code and an error message
        res.status(500).json({
          message: "Error updating project",
          err: err.message,
          stack: err.stack,
        });
      });
  });
  
  router.delete("/:id", (req, res) => {
    const projectId = req.params.id;
  
    // Delete the project from the database
    projects.remove(projectId)
      .then((deletedCount) => {
        if (deletedCount > 0) {
          // If project deleted successfully, respond with a 204 status code (no content)
          res.status(204).end();
        } else {
          // If no project found with the given ID, respond with a 404 status code
          res.status(404).json({ message: "Project not found" });
        }
      })
      .catch((err) => {
        // If there's any error during the process, respond with a 500 status code and an error message
        res.status(500).json({
          message: "Error deleting project",
          err: err.message,
          stack: err.stack,
        });
      });
  });


  router.get("/:id/actions", async (req, res) => {
    const projectId = req.params.id;
  
    try {
      // Check if the project exists
      const project = await projects.get(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      // Retrieve actions belonging to the project
      const projectActions = await projects.getProjectActions(projectId);
      res.json(projectActions);
    } catch (err) {
      res.status(500).json({
        message: "Error retrieving actions for the project",
        err: err.message,
        stack: err.stack,
      });
    }
  });
  


module.exports = router