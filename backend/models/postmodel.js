const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema(
    // postedby:String,
    // caption:String,
    // comments: [{
    //     text:String,
    //     postedby:String
    // }],
    // likes:[{
    //     cnt:Number,
    //     likedby:String
    // }]
    // name: String
    // desc: String,
    // img:
    // {
    //     data: Buffer,
    //     contentType: String
    // }
    // image:String,
    // caption:String,
    // dim:String,
    {
        image:String,
        caption:String,
        user:String,
        likes:{
            type:Number,
            default:0,
        }
    },
    {
        collection: "ImageDetails",
    }

// });
)

module.exports = mongoose.model('posts',PostSchema)