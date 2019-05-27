import { writeFileSync } from 'fs';
import { resolve } from 'path';
import sh = require('shelljs');
import _ = require('lodash');
import prettier = require('prettier');

export const createPageObject = (pageName: string, pageUrl: string) => {
  const path = sh.pwd();
  const properPageName = _.upperFirst(_.camelCase(`${pageName}`));

  const pageObjectTemplate: string = `const { BasePage } = require('kakunin');

  class ${properPageName}Page extends BasePage {
    constructor() {
      super();
  
      this.url = '/${pageUrl}';
    }
  }
  
  module.exports = ${properPageName}Page;`;

  if (sh.test('-e', `${path}/pages/${pageName}.js`) === false) {
    const formattedFile = prettier.format(pageObjectTemplate, { parser: 'typescript' });
    writeFileSync(resolve(`${path}/pages`, `${pageName}.js`), formattedFile);
  } else {
    throw Error('file already exist');
  }
};
