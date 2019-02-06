#!/usr/bin/env node
import * as yargs from 'yargs';
import { initProject as createProject, initProjectHere as createProjectHere } from './create-project';
import { openDocs as docs } from './docs';

yargs
  .usage('Usage: kak-cli <command>')
  .version()
  .command(
    ['create-project <dir> [version]','cp <dir> [version]'], 
    'Create a new kakunin project in desired directory with optional kakunin version, default latest',
    (args: yargs.Argv) => {

      return yargs
        .option('dir', {
          demandOption: true,
          string: true,
        })
        .option('version', {
          demandOption: false,
          string: true,
        });
    },
    (argv) => {
      console.log(`Starting to create new kakuknin project. This will take a while.`)
      createProject(argv.dir)(argv.version);
    },
  )
  .command(
    ['create-project-here <name> [version]','cph <name> [version]'], 
    'Create a new kakunin project in present directory with optional kakunin version, default latest',
    (args: yargs.Argv) => {

      return yargs
        .option('name', {
          demandOption: true,
          string: true,
        })
        .option('version', {
          demandOption: false,
          string: true,
        });
    },
    (argv) => {
      console.log(`Starting to create new kakuknin project. This will take a while.`)
      createProjectHere(argv.name)(argv.version);
    },
  )
  .command(['docs', 'd', 'documentation'],'Go to the documentation at https://kakunin.io',(): any => {}, docs)
  .help('?')
  .alias('?', 'help')
  .epilogue('For more information, find the documentation at https://kakunin.io')
  .argv
 