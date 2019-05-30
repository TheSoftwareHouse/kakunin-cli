import sh = require('shelljs');
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import prettier = require('prettier');

import _ = require('lodash');

export const createGenerator = (generatorName: string) => {
  const path = sh.pwd();
  const properGeneratorName = _.upperFirst(_.camelCase(`${generatorName}`));
  const generatorTemplate: string = `
  
  const { generators } = require('kakunin');

  class ${properGeneratorName}{
    isSatisfiedBy(name) {
      return name === '${properGeneratorName}';
    }
  
    generate(params) {
      return Promise.resolve('some-random-value');
    }
  }
  
  generators.addGenerator(new ${properGeneratorName}());`;

  if (sh.test('-e', `${path}/generators/${generatorName}.js`) === false) {
    const formattedFile = prettier.format(generatorTemplate, { parser: 'typescript' });
    writeFileSync(resolve(`${path}/generators`, `${generatorName}.js`), formattedFile);
  } else {
    throw Error('file already exist');
  }
};
