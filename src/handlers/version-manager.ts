import { Version261 } from '../../template/2.6.1/version_2_6_1';
import { Version300 } from '../../template/3.0.0/version_3_0_0';
import { fileTypes } from '../index';

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

export const getVersionTemplateFiles = (
  fileType: string,
  fileName: string,
  pageUrl: string,
  version: string
): FileConfig => {
  const path = process.cwd();
  const matchingTemplates = availableVersions.find(filesVersion => filesVersion.isSatisfiedBy(version));
  if (!matchingTemplates) {
    throw new Error(`No matching version for ${version}`);
  }
  if (fileType === fileTypes.generator) {
    return { templateFile: matchingTemplates.generatorTemplate(fileName), filePath: `${path}/generators` };
  }
  if (fileType === fileTypes.pageObject) {
    return { templateFile: matchingTemplates.pageObjectTemplate(fileName, pageUrl), filePath: `${path}/pages` };
  }
};
