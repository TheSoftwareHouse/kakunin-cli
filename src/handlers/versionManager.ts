import * as version_2_5_0 from '../../template/2.5.0/package.json';
import * as version_3_0_0 from '../../template/3.0.0/package.json';

class VersionManager {
  public _versions: any;
  public version: any;
  constructor() {
    this._versions = [];
  }
  public addVersion(version: any) {
    this._versions = [...this._versions, version];
  }
  public getVersion(name: string) {
    return this._versions.find((version: { _name: string }) => version._name === name);
  }
}

// tslint:disable-next-line:max-classes-per-file
class Version {
  public _name: string;
  public _handler: any;
  constructor(name: string, handler: any) {
    this._name = name;
    this._handler = handler;
  }
  public doAction() {
    this._handler();
  }
}

const versionManager = new VersionManager();
const ver_2_5_0 = new Version('2.5.0', () => version_2_5_0);
const ver_3_0_0 = new Version('3.0.0', () => version_3_0_0);

versionManager.addVersion(ver_2_5_0);
versionManager.addVersion(ver_3_0_0);

export const selectPackageJson = (name: string) => {
  console.log(ver_2_5_0);
  console.log(ver_2_5_0._handler);
  console.log(ver_2_5_0.doAction());
  return name <= '2.5.0' ? ver_2_5_0.doAction() : ver_3_0_0.doAction();
};
