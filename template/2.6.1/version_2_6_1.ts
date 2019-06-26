import { basePackageJSON } from '../basePackageJson';
import * as compareVersions from 'compare-versions';
import _ = require('lodash');

export class Version261 {
  public isSatisfiedBy(version: string) {
    if (compareVersions(version, '2.6.1') <= 0) {
      return true;
    }
    return false;
  }

  public create(name: string) {
    // tslint:disable-next-line: prefer-immediate-return
    const config = {
      packageJson: {
        ...basePackageJSON,
        name: name,
        version: '1.0.0',
        dependencies: {
          'cross-env': '^5.2.0',
          kakunin: 'latest',
          protractor: '^5.4.2',
          'webdriver-manager': '^12.1.1',
        },
      },
      type: '',
    };

    return config;
  }

  public pageObjectTemplate(fileName: string, pageUrl: string) {
    const template = (name: string, pageUrl: string) => {
      const properName = _.upperFirst(_.camelCase(`${name}`));

      return `const { BasePage } = require('kakunin');
        class ${properName}Page extends BasePage {
          constructor() {
            super();
        
            this.url = '/${pageUrl}';
          }
        }
        
        module.exports = ${properName}Page;`;
    };

    return template(fileName, pageUrl);
  }

  public generatorTemplate(filename: string) {
    const template = (name: string) => {
      const properName = _.upperFirst(_.camelCase(`${name}`));

      return `const { generators } = require('kakunin');
        class ${properName}{
          isSatisfiedBy(name) {
            return name === '${properName}';
          }
        
          generate(params) {
            return Promise.resolve('some-random-value');
          }
        }
        
        generators.addGenerator(new ${properName}());`;
    };
    return template(filename);
  }

  public matcherTemplate(filename: string) {
    const template = (name: string) => {
      const properName = _.upperFirst(_.camelCase(`${name}`));

      return `const { matchers } = require('kakunin');

      class ${properName} {
        isSatisfiedBy(prefix, name) {
          return prefix === 'm:' && name === 'pending';
        }
       
        match(protractorElement, matcherName) {
          return protractorElement.getText().then((value) => {
            if (value === 'pending') {
              return true;
            }
            
            return Promise.reject(\`Matcher ${properName} could not match value on element "\${protractorElement.locator()}". Expected: "pending", given: "\${value}"\`);
          }); 
        }
      }
      
      matchers.addMatcher(new ${properName}());`;
    };
    return template(filename);
  }
}