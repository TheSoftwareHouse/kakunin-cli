import { Version261Templates } from '../../template/2.6.1/file-templates';

const availableVersions = [new Version261Templates()];

export const getVersionConfig = (version: string, name: string) => {
  const matchingConfig = availableVersions.find(templateVersion => templateVersion.isSatisfiedBy(version));
  if (!matchingConfig) {
    throw new Error(`No matching version for ${version}`);
  }

  console.log(matchingConfig);
};

console.log(getVersionConfig('2.0.0', 'test'));
