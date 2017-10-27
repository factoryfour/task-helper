# TaskOutput

## Initialization
Initialize a TaskOutput object:
```js
const tout = new TaskOutput();
```

## Add Datapoints
The type of content must match the Datapoint's format.
```js
// Create a Datapoint
const dp1 = new Datapoint();
dp1.setFormat('string');
dp1.setContent({ title: 'a_number', value: 'fifty-two' });

// Add the Datapoint to the TaskOutput
const tout = new TaskOutput();
tout.addDatapoint(dp1);
```

## Add notifications
```js
const tout = new TaskOutput();
const nt1 = { value: 'hello' };
const nt2 = { value: 'world' };
tout.addNotification(nt1).addNotification(nt2);
```

## Add assignments
```js
const tout = new TaskOutput();
const as1 = { value: 'goodnight' };
const as2 = { value: 'moon' };
tout.addAssignment(as1).addAssignment(as2);
```

## Generate a TaskOutput object
The `generate()` function validates a TaskOutput and returns its data. 
```js
// Sample Datapoint
const dp1 = new Datapoint('sample-type', 'string').setContent({ value: 'hello' });
dp1.addPermission('GET', 'bruce')
    .addPermission('PUT', 'clark')
    .addPermission('DELETE', 'diana');
dp1.setParent('DC52');

// Sample notifications
const nt1 = { value: 'hello' };
const nt2 = { value: 'world' };

// Sample assignments
const as1 = { value: 'goodnight' };
const as2 = { value: 'moon' };

// Add them all to a TaskOutput object. Note that commands can be chained for readibility and ease of use.
const tout = new TaskOutput();
// Datapoints can be added using either the Datapoint object or just the data
tout.addDatapoint(dp1).addDatapoint(dp1.data);
tout.addNotification(nt1).addNotification(nt2);
tout.addAssignment(as1).addAssignment(as2);

// Generate to validate fields and return the data
const myTaskOutput = tout.generate();
```