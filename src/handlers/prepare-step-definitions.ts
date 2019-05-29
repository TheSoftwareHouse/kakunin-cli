import chalk from 'chalk';
import sh = require('shelljs');
import { osxSymlinks } from '../../step-definitons-suggestions/osx-linux';
import { winSymlinks } from '../../step-definitons-suggestions/windows';

export const prepareStepDefinitions = (directory: string) => {
  const operatingSystem = process.platform;

  if (operatingSystem === 'darwin' || operatingSystem === 'linux') {
    console.log(chalk.inverse.green.bold(`Installing symlinks for ${operatingSystem} system`));
    sh.cd(`${directory}/step_definitions`);

    osxSymlinks.forEach(element => {
      console.log(element);
      sh.exec(element);
    });
  }

  if (operatingSystem === 'win32') {
    console.log(chalk.inverse.green.bold(`Installing symlinks for ${operatingSystem} system`));
    sh.cd(`${directory}/step_definitions`);

    winSymlinks.forEach(element => {
      console.log(element);
      sh.exec(element);
    });
  }
};
