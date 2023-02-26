const Sequelize = require("sequelize");
const sequelize = require("../connection");

const role_table = sequelize.define("admin_role_table", {
    role_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    role_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role_desc: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role_isactive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: false
});
// sequelize.sync({ alter: true });
// console.log("All models were synchronized successfully.");
module.exports = role_table;