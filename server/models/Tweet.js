import mongoose from 'mongoose'

class Tweet extends mongoose.Schema {
	constructor() {
		super({
			twid : String,
      author: String,
  		body: String,
		  subject: String,
			taggedWords: [{word:String,
				 						 pos:String,
										 dep:String}],
			date: Date,
			screenname: String
		})
	}
}
export default mongoose.model('Tweet', new Tweet());
