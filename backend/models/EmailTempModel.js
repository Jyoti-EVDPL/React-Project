const Sequelize = require("sequelize");
const sequelize = require("../connection");

const EmailTemp = sequelize.define("Admin_Email_Temp", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    templatename: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
}, {
    timestamps: false
}
);
// sequelize.sync({ alter: true });
// console.log("All models were synchronized successfully.");
module.exports = EmailTemp;