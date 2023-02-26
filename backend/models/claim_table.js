const Sequelize = require("sequelize");
const sequelize = require("../connection");

const claim_table = sequelize.define("admin_claim_table", {
    claim_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    claim_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    claim_desc: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: false
});
// sequelize.sync({ alter: true });
// console.log("All models were synchronized successfully.");
module.exports = claim_table;