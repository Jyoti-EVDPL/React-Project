const Sequelize = require("sequelize");
const sequelize = require("../connection");

const roleclaim_table = sequelize.define("admin_role_claim_table", {
    roleclaim_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    role_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: "admin_role_tables",
            key: "role_id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    roleclaim_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: false
});
// sequelize.sync({ alter: true });
// console.log("All models were synchronized successfully.");
module.exports = roleclaim_table;