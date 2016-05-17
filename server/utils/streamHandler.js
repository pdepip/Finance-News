import Tweet from '../models/Tweet'
import posHandler from './posHandler'

/*
 * TO DO:
 * 1. Remove article link from tweet
 * 2. Enter article link to database
 * 3. use tensorflow for pos tagging
 * 4. Generate subject of article
 */

export default function(stream, io) {
	stream.on('data', function(data) {
	
	//Make sure tweet isn't retweet or response
	if (!('retweeted_status' in data) && data['in_reply_to_screen_name'] == null)
	{ 
		const posText = posHandler(data['text'])
		console.log(posText)
		const tweet = {
			twid: data['id'],
			author: data['user']['name'],
			body: data['text'],
			taggedWords: posText,
			date: data['created_at'],
			screenname: data['user']['screen_name']
		                }
		const tweetEntry = new Tweet(tweet)

		tweetEntry.save(function(err) {
			if (!err) {
				io.emit('tweet', tweet)
			}
		})
	}
	})
}


