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
});

projectRouter.delete('/:id', async (req,res) => {
    try {
        await Project.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({msg:`Project ${req.params.id} was removed`});
    } catch (error) {
        throw error
    }
})

module.exports = projectRouter