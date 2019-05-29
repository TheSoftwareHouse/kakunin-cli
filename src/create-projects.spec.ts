import { versionExist } from './create-project';
import { getVersionConfig } from './handlers/version-manager';

describe('Version exist', () => {
  it('returns true if a version of kakunin exists', async () => {
    expect(await versionExist('2.3.0')).toEqual(true);
  });

  it('returns false if a version of kakunin not exists', async () => {
    expect(await versionExist('undefined')).toEqual(false);
  });
});

describe('Get Version Config', () => {
  it('returns expected object for kakunin 2.5.0', async () => {
    expect(getVersionConfig('2.5.0', 'my_app').packageJson).toEqual({
      author: '',
      dependencies: { 'cross-env': '^5.2.0', kakunin: 'latest', protractor: '^5.4.2', 'webdriver-manager': '^12.1.1' },
      description: '',
      license: 'ISC',
      main: 'index.js',
      name: 'my_app',
      scripts: { kakunin: 'cross-env NODE_ENV=prod kakunin' },
      version: '2.6.1',
    });
  });

  it('returns expected object for kakunin 3.0.0', async () => {
    expect(getVersionConfig('3.0.9', 'my_app').packageJson).toEqual({
      author: '',
      dependencies: { 'cross-env': '^5.2.0', kakunin: 'latest' },
      description: '',
      license: 'ISC',
      main: 'index.js',
      name: 'my_app',
      scripts: { kakunin: 'cross-env NODE_ENV=prod kakunin' },
      version: '3.0.0',
    });
  });
});
