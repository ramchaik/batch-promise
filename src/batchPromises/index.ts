import { AllSettledResp, Error, Promisable, Success } from '../types';

/**
 * @typedef {Array<any>} Success - list of success responses
 * @typedef {Array<any>} Error - list of error responses
 * @typedef {[Success, Error]} BatchResponse - response of batchPromises
 */

/**
 * Batches promises to groups and then executes each group
 *
 * @example
 * // returns [[1,2,3], []]
 * batchPromises(2, [1,2,3], (i) => Promise.resolve(i));
 *
 * @async
 * @param {number} batchSize - size of the batch
 * @param {Promisable<unknown[]>} collection - list of items
 * @param {(item:unknown)=>Promisable<unknown>} callback - callback function
 * @returns {BatchResponse} A tuple with success response and error response
 */
export const batchPromises = (
  batchSize: number,
  collection: Promisable<any[]>,
  callback: (item: any) => Promisable<any>
): Promise<[Success, Error]> =>
  Promise.resolve(collection).then((arr) =>
    arr
      .map((_, i) => (i % batchSize ? [] : arr.slice(i, i + batchSize)))
      .filter((group) => group.length)
      .map(
        (group): ((res: [Success, Error]) => Promise<[Success, Error]>) =>
          ([success, error]: [Success, Error] = [[], []]) =>
            Promise.allSettled(group.map(callback)).then(
              (r: AllSettledResp<unknown>[]) => {
                const fulfilledPromises = r
                  .filter((r) => r.status === 'fulfilled')
                  .map((r) => r.value);

                const rejectedPromises = r
                  .filter((r) => r.status === 'rejected')
                  .map((r) => r.reason);

                return !Array.isArray(success) && !Array.isArray(error)
                  ? [fulfilledPromises, rejectedPromises]
                  : [
                      [...success, ...fulfilledPromises],
                      [...error, ...rejectedPromises],
                    ];
              }
            )
      )
      .reduce(
        (chain, work) => chain.then(work),
        Promise.resolve([[], []] as [Success, Error])
      )
  );

export default batchPromises;
