const Sequelize = require("sequelize");
const sequelize = require("../connection");

const uImages = sequelize.define("Admin-U-IMG", {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    // user_id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    // },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING,
    },
    data: {
        type: Sequelize.BLOB("long"),
    },
}, {
    timestamps: false
});

// sequelize.sync({ alter: true });
// console.log("All models were synchronized successfully.");
module.exports = uImages;