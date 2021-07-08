import batchPromises from '../index';

describe('#batchPromises', () => {
  test('all promises succeed', async () => {
    const batchSize = 3;
    const arr = [1, 2, 3, 4, 5];

    const [success, error] = await batchPromises(batchSize, arr, (ele) =>
      Promise.resolve(ele)
    );

    expect(success.length).toBe(arr.length);
    expect(error.length).toBe(0);
  });

  test('all promises fail', async () => {
    const batchSize = 3;
    const arr = [1, 2, 3, 4, 5];

    const [success, error] = await batchPromises(batchSize, arr, (ele) =>
      Promise.reject(ele)
    );

    expect(success.length).toBe(0);
    expect(error.length).toBe(arr.length);
  });

  test('some promises fail and others pass', async () => {
    const batchSize = 3;
    const arr = [1, 2, 3, 4, 5];
    const failCount = 3;
    const passCount = arr.length - failCount;

    const [success, error] = await batchPromises(batchSize, arr, (ele) => {
      if (ele <= failCount) return Promise.reject(ele);
      return Promise.resolve(ele);
    });

    expect(success.length).toBe(passCount);
    expect(error.length).toBe(failCount);
  });
});
