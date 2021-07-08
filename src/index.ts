import { AllSettledResp, error, Promisable, success } from './types';

const batchPromises = (
  batchSize: number,
  collection: Promisable<any[]>,
  callback: (item: any) => Promisable<any[]>
): Promise<[success, error][]> =>
  Promise.resolve(collection).then((arr) =>
    arr
      .map((_, i) => (i % batchSize ? [] : arr.slice(i, i + batchSize)))
      .filter((group) => group.length)
      .map(
        (group) => (res: any[]) =>
          Promise.allSettled(group.map(callback)).then(
            (r: AllSettledResp[]) => {
              const fulfilledPromises = r
                .filter((r) => r.status === 'fulfilled')
                .map((r) => r.value);

              const rejectedPromises = r
                .filter((r) => r.status === 'rejected')
                .map((r) => r.reason);

              if (!res.length) {
                return [fulfilledPromises, rejectedPromises];
              }

              return [
                [...res[0], ...fulfilledPromises],
                [...res[1], ...rejectedPromises],
              ];
            }
          )
      )
      .reduce(
        (chain, work) => chain.then(work) as Promisable<any>,
        Promise.resolve([])
      )
  );

export default batchPromises;
