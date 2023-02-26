const Sequelize = require("sequelize");
const sequelize = require("../connection");

const LocationTbl = sequelize.define("admin_user_loc_data", {
    location_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    businessName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    businessWebsite: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    continent: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    countryCode: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ipName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ipType: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isp: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lat: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lon: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    org: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    query: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    region: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: false
}
);
// sequelize.sync({ alter: true });
// console.log("All models were synchronized successfully.");
module.exports = LocationTbl;