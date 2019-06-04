import _ = require('lodash');
import prettier = require('prettier');
import * as compareVersions from 'compare-versions';

export class Version261Templates {
  public isSatisfiedBy(version: string) {
    if (compareVersions(version, '2.6.1') <= 0) {
      return true;
    }
    return false;
  }

  public GenerateFile(typeOfFile: string, name: string, pageUrl?: string) {
    const properName = _.upperFirst(_.camelCase(`${name}`));

    const templates: object = {
      pageObject: `const { BasePage } = require('kakunin');

    class ${properName}Page extends BasePage {
      constructor() {
        super();
    
        this.url = '/${pageUrl}';
      }
    }
    
    module.exports = ${properName}Page;`,

      generator: `const { generators } = require('kakunin');

        class ${properName}{
          isSatisfiedBy(name) {
            return name === '${properName}';
          }
        
          generate(params) {
            return Promise.resolve('some-random-value');
          }
        }
        
        generators.addGenerator(new ${properName}());`,
    };

    for (const [key, value] of Object.entries(templates)) {
      if (key === typeOfFile) {
        return prettier.format(value, { parser: 'typescript' });
      }
    }
  }
}

const testing = new Version261Templates();

console.log(testing.GenerateFile('generator', 'testName'));
