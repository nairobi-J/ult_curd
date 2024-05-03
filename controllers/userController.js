const database = require("../config/db");

const getUser = async(req, res) => {
    try {

        const data = await database.query(' SELECT * FROM user')
        if(!data) {
          return res.status(404).send({
                success: false,
                message: "no record",
                
            });

        }
        res.status(200).send({
            success: true,
            message: "all record",
            totalTasks: data[0].length,
            data: data[0]
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in getall task api",
            error
        });
    }

};
const createUser = async(req, res) => {
    try {

        const {user_name, user_mail,user_password, user_role} = req.body
        if(!user_name || !user_mail || !user_password || !user_role){
            return res.status(404).send({
                success: false,
                message: "give all info",
                
            })
        }
        const data = await database.query(`INSERT INTO user (user_name,user_mail,user_password, user_role) VALUES(?, ?, ?, ?)` , [user_name, user_mail, user_password, user_role])
        if(!data) {
            return res.status(404).send({
                success: false,
                message: "can't insert",
                
            }) }
            res.status(200).send({
                success: true,
                message: "new user added",
                data: data[0]
            });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "can't create user api",
            error
        })
        
       }
   
}


module.exports = {getUser, createUser};

// "user_name": "jerin",
// "user_mail": "www.hdiehfu.com",
// "user_password": "wjhiuejnf",
//  "user_role": "hegg"