const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const chatMessageSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            require:true
        },
        message:{
            type: String,
            require:true
        },
        room:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'chatRoom',
            require:true
        }
    },
    {
        timestamps: true,
    }
);


// custom plugin
chatMessageSchema.plugin(toJSON)

// module export
const chatRoomMessage = mongoose.model('chatMessage',chatMessageSchema);
module.exports = chatRoomMessage;