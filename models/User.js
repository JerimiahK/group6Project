const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Change password length later if we want (8 min)
      },
    },
  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
  //Hooks before and after create for hashing password with bcrypt
);

//  hooks: {
//       async beforeCreate(newUserData) {
//         newUserData.password = await bcrypt.hash(newUserData.password, 10);
//         return newUserData;
//       },
//     },
module.exports = User;
