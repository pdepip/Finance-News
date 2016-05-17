import pos from 'pos'

export default function(text) {

	const words = new pos.Lexer().lex(text)
	const tagger = new pos.Tagger()
	const taggedWords = tagger.tag(words)

	var corpus = ''
	for (var i in taggedWords) {
		const taggedWord = taggedWords[i]
		const word = taggedWord[0]
		const tag = taggedWord[1]
		corpus += (word + '{' + tag + '} ')
	}
	return taggedWords
}

