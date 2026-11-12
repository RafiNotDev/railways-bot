import yargs from 'yargs';
import cfonts from 'cfonts';
import { fileURLToPath } from 'url';
import "console";
import { join, dirname } from 'path';
import { createRequire } from 'module';
import { createInterface } from 'readline';
import chalk from "chalk";
import readline from 'readline'
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import "../Pengaturan.js"
// Setup console output
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author, version } = require(join(__dirname, '../package.json'));
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
const permen = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var isRunning = false;
function start(file) {
  if (isRunning) return;
  isRunning = true;

  let args = [join(__dirname, file), ...process.argv.slice(2)];
  console.clear()
  setupMaster({ exec: args[0], args: args.slice(1) });
  let p = fork();

  p.on('message', data => {
    console.log('[✅RECEIVED]', data);
    switch (data) {
      case 'reset':
        p.kill(); // Change here
        isRunning = false;
        start(file);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
      default:
          console.warn('[⚠️ PESAN TIDAK DI KENAL]', data);
    }
  });

  p.on('exit', (_, code) => {
    isRunning = false;
    console.error('[❗] Kesalahan Pada Kode:', code);
    if (code !== 0) {
      console.log('[ 🔄 ] Mengulangi Sambungan Bot...');
      return start(file);
    }
    
    watchFile(args[0], () => {
      unwatchFile(args[0]);
      start(file);
    });
  });

  let opts = yargs(process.argv.slice(2)).exitProcess(false).parse();
  
  if (!opts['test']) {
    if (!rl.listenerCount()) {
      rl.on('line', line => {
        p.emit('message', line.trim());
      });
    }
  }
}
start('./Motherboard.js')