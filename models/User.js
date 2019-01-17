const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    profileIMG: String,
    accessToken: String,
    refreshToken: String
});

mongoose.model('users', userSchema);
