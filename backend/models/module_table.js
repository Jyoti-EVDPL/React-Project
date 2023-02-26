const Sequelize = require("sequelize");
const sequelize = require("../connection");

const module_table = sequelize.define("admin_module_table", {
    module_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    module_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    module_desc: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    module_isactive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: false
});
// sequelize.sync({ alter: true });
// console.log("All models were synchronized successfully.");
module.exports = module_table;