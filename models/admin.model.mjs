// models/admin.model.mjs
import { DataTypes } from "sequelize";
import sequelize from "../src/utils/db.mjs"; // your Sequelize instance
import bcrypt from "bcrypt";

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 30],
        msg: "Name must be between 3 and 30 characters",
      },
      notEmpty: {
        msg: "Name cannot be empty",
      },
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      },
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING,
    defaultValue: "admin",
    allowNull: false,
  },
}, {
  tableName: "admins",
  timestamps: true,
  hooks: {
    beforeCreate: async (admin) => {
      // Hash password 
      if (admin.password) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
      }
    },
    beforeUpdate: async (admin) => {
      // Hash password
      if (admin.password) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
      }
    }
  }
});

Admin.prototype.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default Admin;
