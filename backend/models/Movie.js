import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import dbConn from "../config/Connection.js"

const { DataTypes } = Sequelize;

const Movies = db.define('movietable',{
    
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    movieimage:{
        type: DataTypes.STRING
    },
    moviename:{
        type: DataTypes.STRING
    },
    genre:{
        type: DataTypes.STRING
    },
    rating:{
        type: DataTypes.INTEGER
    },
},{
    freezeTableName:true
});


export default Movies;



