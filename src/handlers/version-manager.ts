import { Version261 } from '../../template/2.6.1/version_2_6_1';
import { Version300 } from '../../template/3.0.0/version_3_0_0';
import { generateTemplate } from './generate-template';

interface FileConfig {
  templateFile: string;
  filePath: string;
}

const availableVersions = [new Version261(), new Version300()];

export const getVersionConfig = (version: string, name: string) => {
  const matchingConfig = availableVersions.find(pacakgeVersion => pacakgeVersion.isSatisfiedBy(version));
  if (!matchingConfig) {
    throw new Error(`No matching version for ${version}`);
  }

  return matchingConfig.create(name);
};

export const getVersionTemplateFiles = (fileType: string, fileName: string, version: string): FileConfig => {
  const matchingTemplates = availableVersions.find(filesVersion => filesVersion.isSatisfiedBy(version));
  if (!matchingTemplates) {
    throw new Error(`No matching version for ${version}`);
  } else {
    return generateTemplate(fileType, fileName, matchingTemplates);
  }
};
