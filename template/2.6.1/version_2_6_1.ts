import { basePackageJSON } from '../basePackageJson';
import * as compareVersions from 'compare-versions';

export class Version261 {
  public isSatisfiedBy(version: string) {
    if( compareVersions(version, '2.6.1') <= 0 ) {
      return true;
    }
    return false;
  }

  public create(name: string) {
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
}