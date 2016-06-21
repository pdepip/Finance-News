import {exec} from 'child_process';

export default function(text, callback) {
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
