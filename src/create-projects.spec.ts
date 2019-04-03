import { versionExist, createPackageJson } from './create-project';
import { getVersionConfig } from './handlers/versionManager';

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
    expect(await getVersionConfig('2.5.0').config('packageJson')).toEqual({
      author: '',
      dependencies: { 'cross-env': '^5.2.0', kakunin: 'latest', protractor: '^5.4.2', 'webdriver-manager': '^12.1.1' },
      description: '',
      license: 'ISC',
      main: 'index.js',
      name: 'your-app-name',
      scripts: { kakunin: 'cross-env NODE_ENV=prod kakunin' },
      version: '1.0.0',
    });
  });

  it('returns expected object for kakunin 3.0.0', async () => {
    expect(await getVersionConfig('3.0.0-9').config('packageJson')).toEqual({
      author: '',
      dependencies: { 'cross-env': '^5.2.0', kakunin: 'latest' },
      description: '',
      license: 'ISC',
      main: 'index.js',
      name: 'your-app-name',
      scripts: { kakunin: 'cross-env NODE_ENV=prod kakunin' },
      version: '1.0.0',
    });
  });
});

describe('Create Package Json', () => {
  it('returns expected object for kakunine 2.5.0', async () => {
    expect(await createPackageJson({ name: 'Kakunin_2_5_0', version: '2.5.0' })).toEqual({
      author: '',
      dependencies: { 'cross-env': '^5.2.0', kakunin: '2.5.0', protractor: '^5.4.2', 'webdriver-manager': '^12.1.1' },
      description: '',
      license: 'ISC',
      main: 'index.js',
      name: 'kakunin_2_5_0',
      scripts: { kakunin: 'cross-env NODE_ENV=prod kakunin' },
      version: '1.0.0',
    });
  });

  it('returns expected object for kakunin 3.0.0', async () => {
    expect(await createPackageJson({ name: 'Kakunin_3_0_0', version: '3.0.0-8' })).toEqual({
      author: '',
      dependencies: { 'cross-env': '^5.2.0', kakunin: '3.0.0-8' },
      description: '',
      license: 'ISC',
      main: 'index.js',
      name: 'kakunin_3_0_0',
      scripts: { kakunin: 'cross-env NODE_ENV=prod kakunin' },
      version: '1.0.0',
    });
  });
});
