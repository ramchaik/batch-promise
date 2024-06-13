# Batch Promises 
A simple solution to batch promises

## Why?

While working on my project, I encountered a significant roadblock: the lack of a robust solution for batching promises effectively. This inspired me to create batch-promises, a solution that not only fills this gap but also simplifies asynchronous code management.

By adopting batch-promises, you gain the ability to:
1. **Optimize Performance**: Execute promises strategically, reducing unnecessary resource usage and potential bottlenecks.
2. **Improve Code Readability**: Benefit from clear async/await integration, making your asynchronous logic easier to understand and maintain.
3. **Error Handling Made Easy**: Employ the structured [successResults, errorResults] return value to gracefully handle both successful and failed promises.

## Key Features:
1. **Enhanced Control and Efficiency**: Execute promises in well-defined batches, optimizing resource utilization and preventing application overload.
2. **Simplified Async/Await Syntax**: Enjoy intuitive async/await support for cleaner and more readable asynchronous operations.
3. **Clear Error Handling**: The batchPromises function returns a two-element array: [successResults, errorResults], providing a structured approach to handling both successful and rejected promises.


## Installation

```sh
npm i @vsr.common/batch-promises
```

## 🚀 Usage

### Async/await way
```javascript
import { batchPromises } from '@vsr.common/batch-promises';

const arr = [1, 2, 3, 4, 5];
const batchSize = 2;
const [success, error] = await batchPromises(batchSize, arr, (ele) =>
  Promise.resolve(ele)
);
```

### Promise way
```javascript
const { batchPromises } = require('@vsr.common/batch-promises');

const arr = [1, 2, 3, 4, 5];
const batchSize = 2;
batchPromises(batchSize, arr, (ele) =>
  Promise.resolve(ele)
).then(([success, error]) => {
  // do your thing!
});
```

