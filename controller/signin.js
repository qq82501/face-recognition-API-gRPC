const handleSignin =(req,res,pg,bcrypt)=>{
const {email,password} = req.body
    if(!email || !password){
        res.status(400).json('please field all of field')
    }

    pg.select('hash','email').from('login')
    .where('email','=', email)
      .then(loginData => {
        const isValid = bcrypt.compareSync(password, loginData[0].hash)
        if(isValid){
          return pg.select('*').from('users')
                    .where('email','=',loginData[0].email)
                    .then(user => {
                      console.log(1,user[0])
                      res.json(user[0])
                    })
        }else{
            return res.status(400).json('wrong credential')
        }
      })
      // .catch(err=> res.status(400).json('wrong credential2') )
   
  }

  module.exports ={
    handleSignin: handleSignin
  }