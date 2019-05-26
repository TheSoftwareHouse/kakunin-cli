import { writeFileSync } from 'fs';
import { resolve } from 'path';
import sh = require('shelljs');
import _ = require('lodash');

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

  writeFileSync(resolve(`${path}/pages`, `${pageName}.js`), pageObjectTemplate);
};
