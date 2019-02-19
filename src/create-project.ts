import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { green } from 'colors';
import * as templatePackageJson from '../template/package.json';

interface ProjectConfig {
  name: string;
  dir?: string;
  version?: string;
}

const createPackageJson = (config: ProjectConfig) => {
  const templatePackakgeJsonString = JSON.stringify(templatePackageJson);
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

  mkdirSync(kakuninConfigPath);
  console.log(green('Preparing package.json...'));
  writeFileSync(resolve(kakuninConfigPath, 'package.json'), JSON.stringify(createPackageJson(config)));

  console.log(green('Project initializing...'));

  execSync(`cd ${kakuninConfigPath} && npm i && npm run kakunin init`, { stdio: 'inherit' });

  console.log(green('Project ready.'));
};
