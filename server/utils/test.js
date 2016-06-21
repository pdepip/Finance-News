//import {exec} from 'child_process';
var exec = require('child_process').exec;

function syntaxnet(text, callback) {
    const processed = [];
    const words = [];
    const dir = process.cwd().replace('/server/utils', '/models/syntaxnet')
    const cmd = 'echo "' + text + '" | syntaxnet/demo.sh'
    const proc = exec(cmd, {cwd: dir}, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
            }
        });

    proc.stdout.on('data', (data) => {
        processed.push(data);
    });

    proc.on('exit', (code) => {
        console.log('Process has completed ' + code);
        const p1 = processed[0].split('\n');
        for (var i = 2; i<p1.length-1; i++) {
            var word = p1[i].replace(/ +(?= )/g,'').replace('+--', '').replace('|', '');
            word = word.split(' ').filter((e) => {return e});
            words.push(word);
        }
		callback(words);
    });
}


syntaxnet('Bob gave the pizza to alice.', function(results) {
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
  console.log(words);
  console.log(subject);
});
