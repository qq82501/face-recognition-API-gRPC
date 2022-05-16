const handleProfileGet =(req,res,pg)=>{
    const {id} = req.params;
    pg.select('*').from('users').where({
      id: id
    })
      .then(user =>{
        if(user.length){
            res.json(user[0]);
        }else{
          res.status(400).json('the user not found')
        }
    })
  }

module.exports={
    handleProfileGet: handleProfileGet
}