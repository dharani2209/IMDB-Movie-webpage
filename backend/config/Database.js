import {Sequelize} from "sequelize";

const db = new Sequelize('moviedb','root','password',{
    host: "localhost",
    dialect: "mysql"
});


export default db;
