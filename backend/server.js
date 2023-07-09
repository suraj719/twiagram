const express = require("express")
const connectDB = require("./Connection")
const app =express()
const users = require("./route")
// const postsroute = require("./postsroute")
const cors = require("cors")
require("dotenv").config()
var bodyParser = require('body-parser');
// var bodyParser = require('body-parser');
// var imgSchema = require('./models/postmodel')
// var fs = require('fs');
// var path = require('path');


// app.set("view engine", "ejs");
// app.use(express.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())
app.use('/api',users)
// app.use('/api/posts',postsroute)
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

const port = process.env.PORT || 5000

// app.get("/hello",(req,res)=> {
//     res.send("hello")
// })
// var multer = require('multer');
 
// var storage = multer.diskStorage({
//     // destination: (req, file, cb) => {
//     //     cb(null, 'uploads')
//     // },
//     destination:"uploads",
//     filename: (req, file, cb) => {
//         // cb(null, file.fieldname + '-' + Date.now())
//         cb(null,file.originalname);
//     }
// });
 
// var upload = multer({ storage: storage });
 
// app.get('/', (req, res) => {
//     // imgSchema.find({})
//     // .then((data, err)=>{
//     //     if(err){
//     //         console.log(err);
//     //     }
//     //     // res.render('imagepage',{items: data})
//     // })
//     try {
//         const dat = imgSchema.find({})
//         console.log(dat)
//         res.status(200).json("hi")
//     } catch (error) {
//         console.log(error)
//     }
// });

// app.get("/",(req,res)=> {
//     imgSchema.find({})
//     .then((data,err)=>console.log(data))
// })
// app.post('/', upload.single('image'), (req, res, next) => {
 
//     var obj = {
//         name: req.body.name,
//         // desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     imgSchema.create(obj)
//     // .then(res=>console.log(res))
//     // .catch(err=>console.log(err))
// });

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,console.log(`server is listening to port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()