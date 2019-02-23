import { versionExist } from './create-project';

describe('Version exist', () => {
  it('returns true if a version of kakunin exists', async () => {
    expect(await versionExist('2.3.0')).toEqual(true);
  });

  it('returns false if a version of kakunin not exists', async () => {
    expect(await versionExist('undefined')).toEqual(false);
  });
});
