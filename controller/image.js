const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key f16ef33efb474f13a3ec7475ce88aff2");


// const Clarifai = require('clarifai');
// console.log(Clarifai);

// const app = new Clarifai.App({
//     apiKey: process.env.ClARIFAI_API_KEY
//    });

const handleApiCall =(req,res) =>{

    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
            model_id: "a403429f2ddf4b49b307e318f00e528b",
            inputs: [{data: {image: {url: req.body.imageURL}}}]
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log("Error: " + err);
                return;
            }
    
            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                return;
            }
    
            console.log("Predicted concepts, with confidence values:")
            for (const c of response.outputs[0].data.concepts) {
                console.log(c.name + ": " + c.value);
            }
            res.json(response)
        }
    );

    // app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.imageURL)
    // .then (data => res.json(data))
    // .catch(err=>res.status(404).json('Unable to use Clarifai API'))
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