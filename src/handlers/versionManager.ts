import { version_2_6_1 } from '../../template/2.6.1/package_json';
import { version_3_0_0 } from '../../template/3.0.0/package_json';

const availableVersions = [version_2_6_1, version_3_0_0];

export const getVersionConfig = (name: string) => {
  return availableVersions.find(version => version.isSatisfiedBy(name));
};
