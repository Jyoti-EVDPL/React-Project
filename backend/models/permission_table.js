const Sequelize = require("sequelize");
const sequelize = require("../connection");

const permission_table = sequelize.define("admin_permission_table", {
    permission_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    permission_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    permission_desc: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: false
});
// sequelize.sync({ alter: true });
// console.log("All models were synchronized successfully.");
module.exports = permission_table;