
const handleRegister =(req,res,pg,bcrypt)=>{
    const {name, email, password} = req.body;
    const hash = bcrypt.hashSync(password);
    if(!name || !email|| !password){
        return res.status(400).json('please fill all of the field')
    }
        pg.transaction(trx =>{
          trx.insert({
            hash:hash,
            email:email
          })
          .into('login')
          .returning('email')
          .then(loginEmail =>{
              return trx('users')
                .returning('*')
                .insert({
                    email:loginEmail[0].email,
                    name: name,
                    joined: new Date()
              })
              .then(user => res.json(user[0]))
            })
              .then(trx.commit)
              .catch(trx.rollback)
          })
          .catch(err=>res.status(405).json(err))
          // .catch(err => {res.status(400).json('the email is invalid, please enter other email')})
        }

    


module.exports={
    handleRegister: handleRegister
}