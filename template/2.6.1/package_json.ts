class Version261 {
  public isSatisfiedBy(name: string) {
    return name <= '2.6.1';
  }

  public config(name: string) {
    const packageJson = {
      name: 'your-app-name',
      version: '1.0.0',
      description: '',
      main: 'index.js',
      scripts: {
        kakunin: 'cross-env NODE_ENV=prod kakunin',
      },
      author: '',
      license: 'ISC',
      dependencies: {
        'cross-env': '^5.2.0',
        kakunin: 'latest',
        protractor: '^5.4.2',
        'webdriver-manager': '^12.1.1',
      },
    };
    return name === 'packageJson' ? packageJson : null
  }
}

export const version_2_6_1 = new Version261();
