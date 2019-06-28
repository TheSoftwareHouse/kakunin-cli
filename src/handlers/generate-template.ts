import { fileTypes } from '../index';
import { Version261 } from '../../template/2.6.1/version_2_6_1';
import { Version300 } from '../../template/3.0.0/version_3_0_0';

export const generateTemplate = (fileType: string, fileName: string, matchingTemplates: Version261 | Version300) => {
  const path = process.cwd();

  if (fileType === fileTypes.generator) {
    return { templateFile: matchingTemplates.generatorTemplate(fileName), filePath: `${path}/generators` };
  }
  if (fileType === fileTypes.pageObject) {
    return { templateFile: matchingTemplates.pageObjectTemplate(fileName), filePath: `${path}/pages` };
  }
  if (fileType === fileTypes.matcher) {
    return { templateFile: matchingTemplates.matcherTemplate(fileName), filePath: `${path}/matchers` };
  }
};
