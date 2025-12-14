import { DataTypes } from "sequelize";
import Sequelize from "../src/utils/db.mjs";

const Student = sequelize.define("Student", {
    name: {
        type : DataTypes.STRING,
        allowNull : false
    },
    age : {
        type: DataTypes.INTEGER,
        allowNull : false
    },
    marks : {
        type: DataTypes.INTEGER,
        allowNull : false
    },
    role : {
        type : DataTypes.STRING
    }
});

export default Student;