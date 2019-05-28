/* eslint-disable @typescript-eslint/explicit-function-return-type */

import chalk from 'chalk';
import readline from 'readline';

import * as Lox from './lox';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  // completer,
});

export function initRepl(): void {
  console.log('TLox REPL');
  rl.prompt();
  rl.on('line', line => {
    const input = line + '\n';
    Lox.run(input);
    Lox.setError(false);
    rl.prompt();
  });

  // rl.on('close', () => {
  //   console.log(chalk.blueBright('\nBye'));
  //   rl.close();
  // });

  rl.on('SIGINT', () => {
    console.log(chalk.blueBright('\nBye'));
    rl.close();
  });
}