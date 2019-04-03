class Version300 {
  public isSatisfiedBy(name: string) {
    return name >= '3.0.0';
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
      },
    };
    return name === 'packageJson' ? packageJson : null;
  }
}

export const version_3_0_0 = new Version300();
