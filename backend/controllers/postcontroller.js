const Post = require("../models/postmodel")

const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find({})
        res.status(200).json({posts})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getPost = async (req,res) => {
    try {
        const {id:postid} = req.params;
        const post= await Post.findOne({_id:postid})
        if(!post) {
            return res.status(404).json({msg:`no task found with id ${postid}`})
        }
        res.status(200).json({post})
    } catch (error) {
        res.status(500).json({ msg:error})
    }
}


// const createPost = async (req,res) => {
//     try {
//         const post = await Post.create(req.body)
//         res.status(201).json({post})
//     } catch (error) {
//         res.status(500).json({msg:error})
//     }
// }

const createPost = async (req,res) => {
    // const {base64} = req.body;
    // const {caption} = req.body.caption;
    const {base64, caption, user,likes} = req.body;
    const totald = {
        image:base64,
        caption:caption,
        user:user,
        likes:likes
    }
    try {
        await Post.create(totald)
        // await Post.create({image:base64});
        res.send({Status:"ok"})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updatePost = async (req,res) => {
    try {
        const {id:postid} = req.params
        // const postid = req.body.postid
        const task = await Post.findOneAndUpdate({_id:postid},{ $set: req.body }, {
            new:true,
            runValidators:true,
        })
        if(!task) {
            return res.status(404).json({msg:`no post found with id ${postid}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({ msg:error})
    }
}

const deletePost = async (req,res) => {
    try {
        const {id:taskID} = req.params;
        const task= await Post.findOneAndDelete({_id:taskID})
        if(!task) {
            return res.status(404).json({msg:`no posts found with id ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({ msg:error})
    }
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    getPost,
    deletePost,
}