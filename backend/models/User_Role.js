const Sequelize = require("sequelize");
const sequelize = require("../connection");

const User_Role = sequelize.define("admin_user_role_tables", {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: "admin-cruds",
            key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    role_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: "admin_role_tables",
            key: "role_id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
}, {
    timestamps: false
});
// sequelize.sync({ alter: true });
// console.log("All models were synchronized successfully.");
module.exports = User_Role;