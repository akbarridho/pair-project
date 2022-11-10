'use strict';
const {
  Model
} = require('sequelize');

const bcryptjs = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already has been used'
      },
      validate: {
        notNull: {
          msg: "Username cannot be empty"
        },
        notEmpty: {
          msg: "Username cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already has been used'
      },
      validate: {
        notNull: {
          msg: "Email Address cannot be empty"
        },
        notEmpty: {
          msg: "Email Address cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be empty"
        },
        notEmpty: {
          msg: "Password cannot be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role cannot be empty"
        },
        notEmpty: {
          msg: "Role cannot be empty"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(instance.password, salt) // berubah ngaco
        // bcryptjs.compareSync("B4c0/\/", hash) // ngebandingin password
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};