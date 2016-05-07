import mongoose from 'mongoose'

const Tweet = mongoose.Schema({
	twid : String, 
        author: String,
        body: String,
      	date: Date,
        title: String,
      	url: String
})

export default mongoose.model('Tweet', new Tweet());

