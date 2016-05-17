import express from 'express'
import mongoose from 'mongoose'
import Twitter from 'ntwitter'
import dataController from './controllers/dataController'
import bodyParser from 'body-parser'
import http from 'http'
import streamHandler from './utils/streamHandler'
import config from './config'

//Create express app
const app = express()
const port = process.env.PORT || 3000

//Connect to mongodb database
mongoose.connect(config.database)

//Create a new twitter instance
const twit = new Twitter(config.twitter)

app.use(bodyParser.json())
//Report Route
app.get('/api/*', dataController.handleGet)

const server = http.createServer(app).listen(port, () => 
	console.log('Server listening on port ' + port))


var io = require('socket.io').listen(server)

//Get list of twitter accounts to follow
const watchList = config.watchList

twit.stream('statuses/filter', {follow: watchList}, function(stream) {
	streamHandler(stream, io)	
})
