import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';
import fetch from 'node-fetch';
import { getVersionConfig } from './handlers/versionManager';

interface ProjectConfig {
  name: string;
  dir?: string;
  version?: string;
}

export const versionExist = (version: string) => {
  return fetch('http://registry.npmjs.org/kakunin')
    .then(res => res.json())
    .then(body => {
      return {}.hasOwnProperty.call(body.time, version);
    })
    .then(exists => exists);
};

export const createPackageJson = (config: ProjectConfig) => {
  const templatePackakgeJsonString = JSON.stringify(getVersionConfig(config.version, config.name).packageJson);
  const packageJson = JSON.parse(templatePackakgeJsonString);
  packageJson.name = config.name.toLowerCase();
  if (!config.version) {
    return packageJson;
  }
  packageJson.dependencies.kakunin = config.version;
  return packageJson;
};

export const createProject = (config: ProjectConfig) => {
  const kakuninConfigPath = !config.dir ? resolve(process.cwd(), config.name) : resolve(config.dir, config.name);

  mkdirSync(kakuninConfigPath, { recursive: true });
  console.log(chalk.green('Preparing package.json...'));
  writeFileSync(resolve(kakuninConfigPath, 'package.json'), JSON.stringify(createPackageJson(config)));

  console.log(chalk.green('Project initializing...'));

  execSync(`cd ${kakuninConfigPath} && npm i && npm run kakunin init`, { stdio: 'inherit' });

  console.log(chalk.inverse.green.bold('Project ready.'));
};
