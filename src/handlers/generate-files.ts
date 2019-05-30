import { getVersionTemplateFiles } from './version-manager';
import prettier = require('prettier');
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import fs = require('fs');

type FileProperties = {
  fileType: string;
  fileName: string;
  pageUrl?: string;
};

export const generateFiles = (properties: FileProperties, version: string) => {
  const fileConfig = getVersionTemplateFiles(properties.fileType, properties.fileName, properties.pageUrl, version);

  if (fs.existsSync(`${fileConfig.filePath}/${properties.fileName}.js`) === false) {
    const formattedFile = prettier.format(fileConfig.templateFile, { parser: 'typescript' });
    writeFileSync(resolve(`${fileConfig.filePath}`, `${properties.fileName}.js`), formattedFile);
  } else {
    throw Error('file already exist');
  }
};
