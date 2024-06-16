import { AllSettledResp, Error, Promisable, Success } from "../types";

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
  Promise.resolve(collection).then(async (arr) => {
    const groups: any[][] = [];
    const success: Success = [];
    const error: Error = [];

    // Grouping items into batches
    for (let i = 0; i < arr.length; i += batchSize) {
      const endIndex = Math.min(i + batchSize, arr.length);
      groups.push(arr.slice(i, endIndex));
    }

    // Processing each batch
    groups.forEach(async (group) => {
      if (group.length > 0) {
        const results: AllSettledResp<unknown>[] = await Promise.allSettled(
          group.map(callback)
        );

        // Separating fulfilled and rejected promises
        results.forEach((result) => {
          if (result.status === "fulfilled") {
            success.push(result.value);
          } else if (result.status === "rejected") {
            error.push(result.reason);
          }
        });
      }
    });

    return [success, error];
  });

export default batchPromises;
