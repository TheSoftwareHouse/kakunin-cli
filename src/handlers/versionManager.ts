import { version_2_6_1 } from '../../template/2.6.1/version_2_6_1';
import { version_3_0_0 } from '../../template/3.0.0/version_3_0_0';

const availableVersions = [version_2_6_1, version_3_0_0];

export const getVersionConfig = (name: string) => {
  return availableVersions.find(version => version.isSatisfiedBy(name));
};
