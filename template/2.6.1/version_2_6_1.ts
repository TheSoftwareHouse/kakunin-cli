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

  public pageObjectTemplate(fileName: string) {
    const template = (name: string) => {
      const properName = _.upperFirst(_.camelCase(`${name}`));

      return `const { BasePage } = require('kakunin');
        class ${properName}Page extends BasePage {
          constructor() {
            super();
        
            this.myElement = element(by.css('.some-elemnt'));
          }
        }
        
        module.exports = ${properName}Page;`;
    };

    return template(fileName);
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

  public formHandlerTemplate(filename: string) {
    const template = (name: string) => {
      const properName = _.upperFirst(_.camelCase(`${name}`));

      return `const { handlers } = require('kakunin');

      const ${properName} {
        constructor() {
          this.registerFieldType = false;
          this.fieldType = 'default';
        }
      
        isSatisfiedBy(element, elementName) {
          return Promise.resolve(elementName === 'someElementName');
        }
       
        handleFill(page, elementName, desiredValue) {
          return page[elementName].isDisplayed()
            .then(function () {
              return page[elementName].clear().then(function () {
                return page[elementName].sendKeys(desiredValue);
              });
            }
          );
        }
      
        handleCheck(page, elementName, desiredValue) {
          return page[elementName].isDisplayed()
            .then(function () {
              return page[elementName].getAttribute('value').then(function (value) {
                if (value === desiredValue) {
                  return Promise.resolve();
                }
      
                return Promise.reject(\`Expected \${desiredValue} got \${value} for text input element \${elementName}\`);
              });
            }
          );
        }
      };
      
      handlers.addHandler(new ${properName}());`;
    };
    return template(filename);
  }
}
