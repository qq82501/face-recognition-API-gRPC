const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.ClARIFAI_API_KEY
   });

const handleApiCall =(req,res) =>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.imageURL)
    .then (data => res.json(data))
    .catch(err=>res.status(404).json('Unable to use Clarifai API'))
}

    
const handleImage =(req,res,pg)=>{
    const {id} = req.body;
    console.log('id=',id)
    pg('users').where('id',  '=',id)
      .increment('entries',1)
      .returning('entries')
      .then(entries =>{
          res.json(entries[0].entries)
      })
      .catch(err =>{res.status(400).json('unable to get entries')})
  }

  module.exports ={
      handleImage: handleImage,
      handleApiCall: handleApiCall
  }