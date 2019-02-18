import { execSync } from 'child_process';
import * as shell from 'shelljs';
import * as mkdirp from 'mkdirp';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as templatePackageJson from '../../template/package.json';

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
  const kakuninConfigPath = !config.dir
    ? path.join(process.cwd(), config.name)
    : path.resolve(path.join(config.dir, config.name));

  mkdirp(kakuninConfigPath, err => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log('Preparing package.json');
      const packageJson = createPackageJson(config);
      fs.writeFileSync(path.join(kakuninConfigPath, 'package.json'), JSON.stringify(packageJson));

      console.log('Project initializing');

      shell.cd(kakuninConfigPath);
      execSync('npm i && npm run kakunin init', { stdio: 'inherit' });

      console.log('Project ready.');
    }
  });
};
