const Sequelize = require("sequelize");
const sequelize = require("../connection");

const ConfigTbl = sequelize.define("admin_config", {
    config_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    configname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
}, {
    timestamps: false
}
);
// sequelize.sync({ alter: true });
// console.log("All models were synchronized successfully.");
module.exports = ConfigTbl;