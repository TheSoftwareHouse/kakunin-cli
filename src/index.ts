#!/usr/bin/env node
import * as yargs from 'yargs';
import { createProject, versionExist } from './create-project';
import { openDocs as docs } from './docs';
import * as latestVersion from 'latest-version';
import chalk from 'chalk';
// tslint:disable-next-line
yargs
  .usage('Usage: kakunin-cli <command>')
  .version()
  .command(
    ['create-project <name>', 'cp <name>'],
    'Create a new kakunin project in desired directory with optional kakunin version. Default version is latest.',
    (args: yargs.Argv) => {
      return yargs
        .option('name', {
          alias: 'n',
          describe: 'Name of your project',
          demandOption: true,
          string: true,
        })
        .option('dir', {
          alias: 'd',
          describe: 'Directory where you want to create your project e.g /users/example/nameOfProject',
          demandOption: false,
          string: true,
        })
        .option('kakunin', {
          alias: 'k',
          describe: 'Version of kakunin which you want to use in your project e.g. 2.3.0',
          demandOption: false,
          string: true,
        });
    },
    async argv => {
      console.log(chalk.inverse.green.bold(`Starting to create new kakuknin project. This will take a while.`));

      const exists = argv.kakunin ? await versionExist(argv.kakunin) : false;
      const version = exists ? argv.kakunin : await latestVersion('kakunin');

      createProject({
        ...argv,
        version,
      });
    }
  )
  // tslint:disable-next-line
  .command(['docs', 'd', 'documentation'], 'Open kakunin documentation', (): any => {}, docs)
  .help('?')
  .alias('?', 'help')
  .epilogue('For more information, visit kakunin page https://kakunin.io').argv;
