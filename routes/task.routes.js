const router = require("express").Router();
//const mongoose = require("mongoose");

const Task = require("../models/Task.model");
const Project = require("../models/Project.model");

//POST /api/tasks  -  Creates a new task
router.post("/tasks", (req, res, next) => {
  console.log({body: req.body});
  const { title, description, projectId } = req.body;

  Task.create({ title, description, project: projectId })
    .then(newTask => {
      Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } }, {new: true} )
      .then(response => {
        res.json({response, newTask})
      }).catch(err => res.json(err));
    }).catch(err => res.json(err))
});

// Update add the project id in the update route maybe once you have it.

module.exports = router;
