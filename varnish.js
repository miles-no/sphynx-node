import path from 'path';
import {spawn} from 'child_process';

const varnishDir = path.join(process.env.HOME, '.sphynx', 'varnish');
const vcl = './varnish.vcl';
const port = 5000;

const child = spawn('varnishd', ['-F', '-f', vcl, '-n', varnishDir, '-a', `:${port}`]);
child.stdout.on('data', (data) => {
  console.log(data.toString());
});
child.stderr.on('data', (data) => {
  console.log(data.toString());
});
console.log('info', 'Varnish listening on port ', port);
