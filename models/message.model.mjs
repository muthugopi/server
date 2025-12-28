import { DataTypes } from "sequelize";
import sequelize from "../src/utils/db.mjs";

const Message = sequelize.define("Message", {
    name : {
        type : DataTypes.STRING(30),
        allowNull : false
    },
    mail : {
        type : DataTypes.STRING,
        allowNull : false
    },
    message : {
        type : DataTypes.STRING,
        allowNull : false
    }
});

export default Message;