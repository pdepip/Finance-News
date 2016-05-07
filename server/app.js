import express from 'express'
import mongoose from 'mongoose'
import Twitter from 'ntwitter'
import dataController from './controllers/dataController'
import bodyParser from 'body-parser'

import config from './config'

//Create express app
const app = express()

//Connect to mongodb database
mongoose.connect(config.database)

//Create a new twitter instance
const twit = new Twitter(config.twitter)

app.use(bodyParser.json())
//Report Route
app.get('/api/*', dataController.handleGet)

const port = 3000
app.listen(port, () => console.log('Running on port ${port}'))

const watchList = ['4922002810']
twit.stream('statuses/filter', {follow: watchList}, function(stream) {
	stream.on('data', function(data) {
		console.log(data)
	})
	stream.on('error', function(error) {
		console.log(error)
	})

})
