const {Sequelize} = require('sequelize')
const bcrypt = require('bcrypt')

const db = new Sequelize( process.env.DATABSE_URL || 'postgres://localhost:5432/portfolio', {
    database : 'portfolio',
    dialect : 'postgres',
    define : {
        underscored :true
    }
});

const User = db.define('user', {
    first_name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    last_name : {
        type : Sequelize.STRING,
        allowNull: false
    },
    username : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type: Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        unique : true,
        allowNull : false,
        validate : {
            isEmail : true
        }
    }
});

const Project = db.define('project', {
    name: {
        type: Sequelize.STRING
    },
    description : {
        type : Sequelize.TEXT
    },
    image : {
        type : Sequelize.STRING
    },
    url : {
        type : Sequelize.STRING
    }
});

User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 12)
    user.password = hashedPassword
});

User.hasMany(Project, {
    onDelete:'cascade'
});
Project.belongsTo(User)

module.exports = {
    Project,
    User,
    db
}