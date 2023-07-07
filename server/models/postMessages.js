import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creatorName: String,
    creator: String,
    tags: Array,
    selectedFile: String,
    likeCount: {
        type: [String],
        default: [],
    },
    comments: {
        type: [String],
        default: [],
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
},{
    timestamps:true
});

const PostMessage = mongoose.model('PostMessage',postSchema)
export default PostMessage;