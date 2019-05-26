import { writeFileSync } from 'fs';
import { resolve } from 'path';
import sh = require('shelljs');

export const createPageObject = (pageName: string, pageUrl: string) => {
  const path = sh.pwd();
  const pageNameUpperCase = pageName.charAt(0).toUpperCase();
  const pageNameWithoutFirstLetter = pageName.slice(1);

  const pageObjectTemplate: string = `const { BasePage } = require('kakunin');

  class ${pageNameUpperCase + pageNameWithoutFirstLetter}Page extends BasePage {
    constructor() {
      super();
  
      this.url = '/${pageUrl}';
    }
  }
  
  module.exports = ${pageNameUpperCase + pageNameWithoutFirstLetter}Page;`;

  writeFileSync(resolve(`${path}/pages`, `${pageName}.js`), pageObjectTemplate);
};
