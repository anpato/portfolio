const express = require('express')
const AwsRouter = express.Router()
const {Project} = require('../db/models')





AwsRouter.post('/upload/user/:id/project/', async (req,res,next) => {
    console.log(req.body)
    try {
        const project = await Project.create(req.body)
        await project.setUser(req.body.userId)
        res.send(project)
    } catch (error) {
        res.send({msg:'Upload failed'})
        throw error
    }
});

module.exports = AwsRouter

