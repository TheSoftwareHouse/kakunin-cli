import { basePackageJSON } from '../basePackageJson';
import * as compareVersions from 'compare-versions';

export class Version300 {
  public isSatisfiedBy(version: string) {
    if( compareVersions(version, '3.0.0') >= 0 ) {
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
        },
      },
      type: '',
    };

    return config;
  }
}