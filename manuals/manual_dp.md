# Datapoints

## Initialization
Initialize a Datapoint, either empty, or with a type or format:

```js
// An empty Datapoint
const dp1 = new Datapoint();

// A Datapoint with a type
const dp2 = new Datapoint('sample-type');

// A Datapoint with a type and format
const dp3 = new Datapoint('sample-type', 'string');
```

Set type and format fields in a Datapoint
```js
const dp1 = new Datapoint();
dp1.setType('sample-type');
dp1.setFormat('string');
```

## Set content
Content must match the Datapoint's format
```js
// Set content as a JSON
const dp1 = new Datapoint();
dp1.setFormat('string');
dp1.setContent({ title: 'a_number', value: 'fifty-two' });

// Set content with a string value
const dp2 = new Datapoint();
dp2.setFormat('string');
dp2.setContent('fifty-two');

// Set content with a number value
const dp3 = new Datapoint();
dp3.setFormat('number');
dp3.setContent(52);
```

## Set permissions
Standard permissions have GET, PUT, and DELETE parameters. They can be set at once or added one at a time.
```js
// Set all permissions at once
const newPerms = {
    GET: ['bruce'],
    PUT: ['clark'],
    DELETE: ['diana']
};
const dp1 = new Datapoint();
dp1.setPermissions(newPerms);

// Add permissions one at a time
const dp2 = new Datapoint();
dp2.addPermission('GET', 'bruce');
dp2.addPermission('PUT', 'clark');
dp2.addPermission('DELETE', 'diana');
```

Custom permissions can take any format:
```js
const dp1 = new Datapoint();
dp1.setCustomPermissions('my-custom-permissions');
```

## Chain commands
You can chain functions for readability:
```js
const dp1 = new Datapoint().setType('sample-type').setFormat('string').setContent('fifty-two');
```

## Generate a Datapoint
The `generate()` function validates a Datapoint and returns its data.
```js
const dp1 = new Datapoint('sample-type', 'string').setContent({ value: 'hello' });
dp1.addPermission('GET', 'bruce')
    .addPermission('PUT', 'clark')
    .addPermission('DELETE', 'diana');
dp1.setParent('DC52');

const mydata = dp1.generate();
```