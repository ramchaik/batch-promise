# Batch Promises 
A simple solution to batch promises

## Installation

```sh
npm i @vsr.common/batch-promises
```

## 🚀 Usage

async/await way
```javascript
import { batchPromises } from '@vsr.common/batch-promises';

const arr = [1, 2, 3, 4, 5];
const batchSize = 2;
const [success, error] = await batchPromises(batchSize, arr, (ele) =>
  Promise.resolve(ele)
);
```

Promise way
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
