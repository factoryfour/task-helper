# task-helper
Helper methods for datapoints and task outputs

## Class: Datapoint

### Fields
- *Datapoint*.data
- *Datapoint*.type
- *Datapoint*.format
- *Datapoint*.content

### Functions
- *Datapoint*.setType(type)
- *Datapoint*.setFormat(format)
- *Datapoint*.setValue(val)
- *Datapoint*.toString()

## Class: TaskOutput

### Fields
- *Datapoint*.assignments
- *Datapoint*.datapoints
- *Datapoint*.notifications

### Functions
- *Datapoint*.addDatapoint(val)
- *Datapoint*.addNotification(val)
- *Datapoint*.addAssignment(val)

All values that are added must be Objects (or Datapoint instances if using addDatapoint

- *Datapoint*.generate()
- *Datapoint*.toString()
Constructs a JSON Object of all data:
```
{
    datapoints: [
        {
            type: 'test-type',
            format: 'string',
            content: {
                value: 'fifty-two'
            }
        },
        {
            type: 'test-type',
            format: 'number',
            content: {
                value: 52
            }
        }
    ],
    notifications: [
        {
            value: 'hello'
        },
        {
            value: 'world'
        }
    ],
    assignments: [
        {
            value: 'goodnight'
        },
        {
            value: 'moon'
        }
    ]
}
```