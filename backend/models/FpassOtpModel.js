const Sequelize = require("sequelize");
const sequelize = require("../connection");

// const { TIME } = require("sequelize");
// const Sequelize = require("sequelize");
// const sequelize = require("../connection");
// const User = require("./UserModel");

// const Otps = sequelize.define("Admin-OTP", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     // primaryKey: true,
//     allowNull: false,
//   },
//   username: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   otp: {
//     type: Sequelize.STRING,
//   },
//   isUsed: {
//     type: Sequelize.BOOLEAN,
//     allowNull: false,
//   },
//   timestamp: {
//     type: Sequelize.DATE & TIME,
//     defaultValue: Sequelize.NOW
//   },

// }, {
//   timestamps: false
// }
// );

// module.exports = Otps;

const fOtps = sequelize.define("Admin-F-OTP", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    otp: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isUsed: {
        type: Sequelize.BOOLEAN,
    },
    // timestamp: {
    //     type: Sequelize.DATE(3),
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    // },
    timestamp: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    for_fpass: {
        type: Sequelize.BOOLEAN,
    },
    for_twoFA: {
        type: Sequelize.BOOLEAN,
    },
}, {
    timestamps: false
}
);
// sequelize.sync({ alter: true });
// console.log("All models were synchronized successfully.");
module.exports = fOtps;