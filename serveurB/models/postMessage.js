import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type:Number,
        default: 0
    },
    createdAt: {
        type: Date,
        defaut: new Date()
    }
});

const PostMessage = mongoose.model('postmessage', postSchema);

export default PostMessage;