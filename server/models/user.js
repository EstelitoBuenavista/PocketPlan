const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: { 
        type: DataTypes.STRING, 
        unique: false, 
        allowNull: false 
    },
    email: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "guest"),
      allowNull: false,
      defaultValue: "guest",
    },
  });

  return User;
};
