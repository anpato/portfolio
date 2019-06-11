const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport')
const dotenv = require('dotenv')
dotenv.config()

const {userAuthorized} = require('./Auth/Auth');
const AuthRouter = require('./Routes/authRouter');
const AppRouter = require('./Routes/appRouter')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/auth', AuthRouter);
app.use('/app', userAuthorized,AppRouter)
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