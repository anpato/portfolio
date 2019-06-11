const express = require('express');
const appRouter = express.Router();

appRouter.get('/protected', (req, res, next) => {
    console.log('***Req protected route***', req);
    
    res.json({
        msg: 'Authenticated',
        user: req.user, 
    });
});

module.exports = appRouter;