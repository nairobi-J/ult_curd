const database = require("../config/db");

const getTasks = async(req, res) => {
    try {

        const data = await database.query(' SELECT * FROM tasks')
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




//id

const getTaskById = async(req, res) => {
   try {
      const taskId = req.params.id
      if(!taskId){
      return res.status(404).send({
        success: false,
        message: "invalid id",
        
    })
}
const data = await database.query(` SELECT * FROM tasks WHERE taskId=?` , [taskId])
if(!data){
    return res.status(404).send({
      success: false,
      message: "nothing found",
      
  }) }
  res.status(200).send({
    success: true,
   
    data: data[0]
    
});

   } catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: "error fetching student api",
        error
    })
    
   }
}

const createTask = async(req, res) => {
    try {

        const {title, description, status, userId} = req.body
        if(!title || !description || !status || !userId){
            return res.status(404).send({
                success: false,
                message: "give all info",
                
            })
        }
        const data = await database.query(`INSERT INTO tasks (title,description,status, userId) VALUES(?, ?, ?, ?)` , [title, description, status, userId])
        if(!data) {
            return res.status(404).send({
                success: false,
                message: "can't insert",
                
            }) }
            res.status(200).send({
                success: true,
                message: "new task added",
                data: data[0]
            });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "can't create task api",
            error
        })
        
       }
   
}



const updateTask = async(req, res) => {
    try {
        const taskId = req.params.id
        if(!taskId){
        return res.status(404).send({
          success: false,
          message: "invalid id",
          
      })
  }
  const {title, description, status, userId} = req.body
  const data = await database.query(` UPDATE tasks SET name=?, description=?, status=?, userId=? WHERE taskId = ?` , [title, description, status,userId,taskId])
  if(!data){
      return res.status(404).send({
        success: false,
        message: "updating data error",
        
    }) }
    res.status(200).send({
      success: true,
      message: "details updated",
      data: data[0]
  });
    } 
    
    
    
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "can't update",
            error
        })
        
       }

}


const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id
        if(!taskId){
            return res.status(404).send({
                success: false,
                message: "invalid id",
                
            })
        }
        const data = await database.query(`DELETE FROM tasks WHERE taskId=?` , [taskId])
        if(!data){
            return res.status(404).send({
              success: false,
              message: "deleting data error",
              
          }) }
        res.status(200).send({
            success: true,
            message: "task deleted",
            data: data[0]
        });

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "can't delete",
            error
        })
        
       }
}

module.exports = {getTasks, getTaskById, createTask, updateTask, deleteTask};