import { versionExist, createPackageJson } from './create-project';

describe('Version exist', () => {
  it('returns true if a version of kakunin exists', async () => {
    expect(await versionExist('2.3.0')).toEqual(true);
  });

  it('returns false if a version of kakunin not exists', async () => {
    expect(await versionExist('undefined')).toEqual(false);
  });
});

describe('Create Package Json', () => {
  it('returns expected object for legacyKakunin', async () => {
    expect(await createPackageJson({ name: 'legacyKakunin', version: '2.3.0' })).toEqual({
      author: '',
      dependencies: { 'cross-env': '^5.2.0', kakunin: '2.3.0' },
      description: '',
      license: 'ISC',
      main: 'index.js',
      name: 'legacykakunin',
      scripts: { kakunin: 'cross-env NODE_ENV=prod kakunin' },
      version: '1.0.0',
    });
  });

  it('returns expected object for kakunin', async () => {
    expect(await createPackageJson({ name: 'Kakunin', version: '3.0.0-8' })).toEqual({
      author: '',
      dependencies: { 'cross-env': '^5.2.0', kakunin: '3.0.0-8', protractor: '^5.4.2', 'webdriver-manager': '^12.1.1' },
      description: '',
      license: 'ISC',
      main: 'index.js',
      name: 'kakunin',
      scripts: { kakunin: 'cross-env NODE_ENV=prod kakunin' },
      version: '1.0.0',
    });
  });
});
