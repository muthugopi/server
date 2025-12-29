import { DataTypes } from "sequelize";
import sequelize from "../src/utils/db.mjs";

const Admin = sequelize.define(
  "Admin",
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "admins",
    timestamps: false,
  }
);

export default Admin;
