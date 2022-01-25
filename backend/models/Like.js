import dbConn from "../config/Connection.js"

const Likes=function(name,movieid){
    dbConn.query("insert into liketable (`username`,`movieid`) values(?,?);", [name,movieid]); 
  };

export default Likes;