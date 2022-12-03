const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const commentSchema = mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        post:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'post',
            requried:true
        }
    }, {
    timestamps: true,
}
)
commentSchema.plugin(toJSON);
const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment
