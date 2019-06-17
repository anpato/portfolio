const {User, Project} = require('./models');
const dotenv = require('dotenv')
dotenv.config()
const main = async () => {
    await User.destroy({
        where : {}
    });
    await Project.destroy({
        where: {}
    });

    const user = await User.create({
        first_name: 'andre',
        last_name: 'pato',
        username : 'anpato',
        email : 'andre@mail.com',
        password : process.env.LOGIN_PASSWORD
    });
}

async function run() {
    try {
        await main();
    } catch (e) {
        console.error(e);
    } finally {
        await process.exit()
    }
}

run()