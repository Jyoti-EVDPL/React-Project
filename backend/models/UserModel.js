const Sequelize = require("sequelize");
const sequelize = require("../connection");

const User = sequelize.define("Admin-CRUD", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  full_name: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email_id: {
    type: Sequelize.STRING,
  },
  phnumber: {
    type: Sequelize.STRING,
  },
  DOB: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  pincode: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    // allowNull: false,
  },
  enabled2FA: {
    type: Sequelize.BOOLEAN,
    // allowNull: false,
  },
  role_id: {
    type: Sequelize.INTEGER,
    references: {
      model: "admin_role_tables",
      key: "role_id"
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },

});

const Otps = sequelize.define("Admin-OTP", {
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
  otp: {
    type: Sequelize.STRING,
  },
  isUsed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },

}, {
  timestamps: false
}
);

// const fOtps = sequelize.define("Admin-F-OTP", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false,
//   },
//   user_id: {
//     type: Sequelize.INTEGER,
//   },
//   otp: {
//     type: Sequelize.STRING,
//   },
//   isUsed: {
//     type: Sequelize.BOOLEAN,
//   },
//   timestamp: {
//     type: Sequelize.DATE,
//     defaultValue: Sequelize.NOW
//   },

// }, {
//   timestamps: false
// }
// );

// User.hasMany(Otps, {
//   foreignKey: 'user_id',
//   sourceKey: 'id'
// })

// Otps.belongsTo(User, {
//   foreignKey: 'user_id',
//   targetKey: 'id'
// })

// User.hasMany(fOtps, {
//   foreignKey: 'user_id',
//   sourceKey: 'id'
// })

// fOtps.belongsTo(User, {
//   foreignKey: 'user_id',
//   targetKey: 'id'
// })

// sequelize.sync({ alter: true });
// console.log("All models were synchronized successfully.");

module.exports = User, Otps;