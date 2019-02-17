import * as latestVersion from 'latest-version';
import { execSync } from 'child_process';
import * as shell from 'shelljs';
import * as mkdirp from 'mkdirp';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as templatePackageJson from '../template/package.json';

const generateProjectPath = (name: string) => path.join(process.cwd(), `${name}`);

const createPackageJson = (directory: string) => {
  const kakuninConfigPath = path.resolve(directory);

  mkdirp(kakuninConfigPath, err => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      fs.writeFileSync(path.join(kakuninConfigPath, 'package.json'), JSON.stringify(templatePackageJson));

      console.log('Creating project');

      shell.cd(kakuninConfigPath);
      execSync('npm i && npm run kakunin init', { stdio: 'inherit' });

      console.log('Project created.');
    }
  });
};

const createPackageJsonHere = (name: string) => {
  const kakuninConfigPath = generateProjectPath(name);

  mkdirp(kakuninConfigPath, err => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      fs.writeFileSync(path.join(kakuninConfigPath, 'package.json'), JSON.stringify(templatePackageJson));

      console.log('Creating project');

      shell.cd(kakuninConfigPath);
      execSync('npm i && npm run kakunin init', { stdio: 'inherit' });

      console.log('Project created.');
    }
  });
};

export const initProject = (directory: string) => (ver: string | undefined) => {
  if (typeof ver !== 'undefined') {
    templatePackageJson.dependencies.kakunin = ver;
    createPackageJson(directory);
  } else {
    latestVersion('kakunin').then((version: string) => {
      templatePackageJson.dependencies.kakunin = version;

      createPackageJson(directory);
    });
  }
};

export const initProjectHere = (name: string) => (ver: string | undefined) => {
  if (typeof ver !== 'undefined') {
    templatePackageJson.dependencies.kakunin = ver;
    createPackageJsonHere(name);
  } else {
    latestVersion('kakunin').then((version: string) => {
      templatePackageJson.dependencies.kakunin = version;

      createPackageJsonHere(name);
    });
  }
};
