const router = require("express").Router();
 
// const mongoose = require("mongoose");
 
const Project = require("../models/Project.model");
const Task = require("../models/Task.model");
 
//  POST /api/projects  -  Creates a new project
router.post("/projects", (req, res, next) => {

  const { title, description } = req.body;
 
  Project.create({ title, description, tasks: [] })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

router.get('/projects', (req, res, next) => {
  Project.find()
    .populate('tasks')
    .then(allProjects => res.json(allProjects))
    .catch(err => res.json(err));
});
 
 
module.exports = router;