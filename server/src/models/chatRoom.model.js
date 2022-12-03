const mongoose = require('mongoose');
const { toJSON } = require('./plugins');


const chatRoomSchema = mongoose.Schema(
    {
        users: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            require:true,
            unique:false
        },]
    },
    {
        timestamps: true,
    }
);




// custom plugin
chatRoomSchema.plugin(toJSON);


// module export
const chatRoom = mongoose.model('chatRoom', chatRoomSchema);
module.exports = chatRoom;

