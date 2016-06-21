import Tweet from '../models/Tweet';
import posHandler from './posHandler';
import parseHandler from './parseHandler';
import syntaxnet from './syntaxnet';

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
		syntaxnet(data['text'], function(results) {
			var words = []
		  var subject = ''
		  for (var i = 0; i < results.length; i++) {
		    var word = results[i];
		    if (word[word.length-1].includes('nsubj')) {
		      subject = word[0]
		    }
		    words.push({word:word[0],
		                pos: word[1],
		                dep: word[2]})
		  }

			const tweet = {
				twid: data['id'],
				author: data['user']['name'],
				body: data['text'],
				subject: subject,
				taggedWords: words,
				date: data['created_at'],
				screenname: data['user']['screen_name']
			                }
			const tweetEntry = new Tweet(tweet)

			tweetEntry.save(function(err) {
				if (!err) {
					io.emit('tweet', tweet)
				}
			})
		});
	}
	})
}
