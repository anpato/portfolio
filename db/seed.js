const {User, Project} = require('./models');

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
        password : '1234'
    });

    const project1 = await Project.create({
        name : 'test',
        description : 'asddsadasdasd'
    })

    await User.addProject(project1)

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