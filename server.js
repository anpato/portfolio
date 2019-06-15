const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config()

const {userAuthorized} = require('./Auth/Auth');
const AuthRouter = require('./routes/authRouter');
const AppRouter = require('./routes/appRouter');
const AwsRouter = require('./routes/AwsRouter');
const ProjectRouter = require('./routes/projectRouter')
const ContactRouter = require('./routes/contactRouter')

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// routes
app.use('/images', AwsRouter);
app.use('/auth', AuthRouter);
app.use('/app', userAuthorized,AppRouter)
app.use('/projects',ProjectRouter);
app.use('/contact', ContactRouter)
app.use(passport.initialize())

// Test Message
app.get('/', (req, res) => {
    try {
        res.send({msg: 'Working'})
    } catch (error) {
        throw error
    }
});

// listening Port
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});