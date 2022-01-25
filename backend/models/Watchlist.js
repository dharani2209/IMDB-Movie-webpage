import dbConn from "../config/Connection.js"

const Watchlist=function(name,result){
    console.log(name);
    dbConn.query("SELECT *  FROM movietable  where id in (select movieid from liketable where username=?);", [name], function (err, res) {
        if(err) {
            console.log("error: ", err);
        }
        else{
            console.log(res);  
            result(null,res);
        }
    }); 
  };

  export default Watchlist;