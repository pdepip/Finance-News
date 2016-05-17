import mongoose from 'mongoose'

class Tweet extends mongoose.Schema {
	constructor() {
		super({
			twid : String, 
      			author: String,
        		body: String,
			pos: String,
			taggedWords: Array,
      			date: Date,
			screenname: String
		})
	}
}
export default mongoose.model('Tweet', new Tweet());

