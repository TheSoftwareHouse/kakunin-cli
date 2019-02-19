#!/usr/bin/env node
import * as yargs from 'yargs';
import { createProject } from './handlers/create-project';
import { openDocs as docs } from './docs';
import * as latestVersion from 'latest-version';

// tslint:disable-next-line
yargs
  .usage('Usage: kakunin-cli <command>')
  .version()
  .command(
    ['create-project <name>', 'cp <name>'],
    'Create a new kakunin project in desired directory with optional kakunin version, default latest',
    (args: yargs.Argv) => {
      return yargs
        .option('name', {
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
          describe: ' Version of kakunin which you want to use in your project e.g. 2.3.0',
          demandOption: false,
          string: true,
        });
    },
    async argv => {
      console.log(`Starting to create new kakuknin project. This will take a while.`);
      const version = argv.kakunin || (await latestVersion('kakunin'));

      createProject({
        name: argv.name,
        dir: argv.dir,
        version,
      });
    }
  )
  // tslint:disable-next-line
  .command(['docs', 'd', 'documentation'], 'Go to the documentation at https://kakunin.io', (): any => {}, docs)
  .help('?')
  .alias('?', 'help')
  .epilogue('For more information, find the documentation at https://kakunin.io').argv;
