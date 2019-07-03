#!/usr/bin/env node
import * as yargs from 'yargs';
import { createProject, versionExist } from './create-project';
import { openDocs as docs } from './docs';
import * as latestVersion from 'latest-version';
import chalk from 'chalk';
import { generateFiles } from './handlers/generate-files';

export const fileTypes = {
  pageObject: 'pageObject',
  generator: 'generator',
  matcher: 'matcher',
};

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
  .command(
    ['create-page <name>'],
    'Create page object template in project directory',
    (args: yargs.Argv) => {
      return yargs
        .option('name', {
          alias: 'n',
          describe: 'Name of your page object',
          demandOption: true,
          string: true,
        })
        .option('pageUrl', {
          alias: 'url',
          describe: 'Url of your page object',
          demandOption: true,
          string: true,
        })
        .option('kakunin', {
          alias: 'k',
          describe: 'Version of kakunin which you are using',
          demandOption: false,
          string: true,
        });
    },
    async argv => {
      console.log(chalk.inverse.green.bold(`creating page object...`));

      const exists = argv.kakunin ? await versionExist(argv.kakunin) : false;
      const version = exists ? argv.kakunin : await latestVersion('kakunin');

      generateFiles({ fileType: fileTypes.pageObject, fileName: argv.name, pageUrl: argv.pageUrl }, version);
    }
  )
  .command(
    ['create-generator <name>'],
    'Create data generator template in project directory',
    (args: yargs.Argv) => {
      return yargs
        .option('name', {
          alias: 'n',
          describe: 'Name of your data generator',
          demandOption: true,
          string: true,
        })
        .option('kakunin', {
          alias: 'k',
          describe: 'Version of kakunin which you are using',
          demandOption: false,
          string: true,
        });
    },
    async argv => {
      console.log(chalk.inverse.green.bold(`creating data generator template...`));

      const exists = argv.kakunin ? await versionExist(argv.kakunin) : false;
      const version = exists ? argv.kakunin : await latestVersion('kakunin');

      generateFiles({ fileType: fileTypes.generator, fileName: argv.name }, version);
    }
  )
  .command(
    ['create-matcher <name>'],
    'Create matcher template in project directory',
    (args: yargs.Argv) => {
      return yargs
        .option('name', {
          alias: 'n',
          describe: 'Name of your matcher',
          demandOption: true,
          string: true,
        })
        .option('kakunin', {
          alias: 'k',
          describe: 'Version of kakunin which you are using',
          demandOption: false,
          string: true,
        });
    },
    async argv => {
      console.log(chalk.inverse.green.bold(`creating matcher...`));

      const exists = argv.kakunin ? await versionExist(argv.kakunin) : false;
      const version = exists ? argv.kakunin : await latestVersion('kakunin');

      generateFiles({ fileType: fileTypes.matcher, fileName: argv.name }, version);
    }
  )
  .help('?')
  .alias('?', 'help')
  .epilogue('For more information, visit kakunin page https://kakunin.io').argv;
