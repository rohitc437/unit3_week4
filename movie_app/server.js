const express = require("express")


const mongoose = require("mongoose")


const connect = () => {

    return mongoose.connect("mongodb://127.0.0.1:27017/entertainment")
}





//step-1-creating schema
const movieSchema = new mongoose.Schema({
    id:{type:Number,required:true},
    movie_name:{type:String,required:true},
    movie_genre:{type:String,required:true},
    production_year:{type:Number,required:true},
});




//step2-connect schema to the movies collection 
const Movie = mongoose.model("movie",movieSchema);

const app = express();

app.use(express.json());//it is middel weare convert json into object



//---------------CRUD APRI for movie----------------//
//get: getting all movies doc
app.get("/movies",async (req, res)=>{
   const movies = await Movie.find();
    //console.log(movies)
   res.status(200).send({movies});

});

//post: create new doc
app.post("/movies",async (req , res)=>{
    const movies = await Movie.create(req.body);

    return res.status(201).send({movies})
})

//get: geting single movie doc/data
app.get("/movies/:id",async (req , res) => {

    const movie = await Movie.findById(req.params.id).lean().exec();

    res.status(200).send({movie});
})


//patch:creating a new movie doc in database
app.patch("/movies/:id", async (req , res) => {

    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body,{new:true,}).lean().exec();

    return res.status(200).send({movie});
})

//delete: find by id movie and delete
app.delete("/movies/:id",async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec();

    res.status(200).send({movie});
})








//this is our server
app.listen(2345,async function(){
    await connect();

    console.log("Rohit movie server is started")
});