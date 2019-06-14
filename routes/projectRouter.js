const express = require('express');
const projectRouter = express.Router();
const {Project, User} = require('../db/models')

projectRouter.get('/', async(req,res) => {
    try {
        const projects = await Project.findAll()
        res.send(projects)
    } catch (error) {
        throw erro
    }
})

module.exports = projectRouter