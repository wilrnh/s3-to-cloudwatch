var AWS        = require('aws-sdk'),
    CloudWatch = new AWS.CloudWatch();

exports.handler = function(event, context) {
  
  var s3_event_timestamp = event.Records[0].eventTime;
  
  var s3_event = event.Records[0].eventName;
  
  var s3_bucket = event.Records[0].s3.bucket.name;
  
  var s3_key = event.Records[0].s3.object.key;
  
  var s3_key_parts = s3_key.split('/');
  
  var metric = {
    MetricData: [
      {
        MetricName: s3_event,
        Dimensions: [
          {
            Name: 'Key',
            Value: s3_key_parts[0]
          },
          {
            Name: 'Bucket',
            Value: s3_bucket
          }
        ],
        Timestamp: s3_event_timestamp,
        Unit: 'Count',
        Value: 1
      },
      {
        MetricName: s3_event,
        Dimensions: [
          {
            Name: 'Key',
            Value: '*'
          },
          {
            Name: 'Bucket',
            Value: s3_bucket
          }
        ],
        Timestamp: s3_event_timestamp,
        Unit: 'Count',
        Value: 1
      }
    ],
    Namespace: 's3-to-cloudwatch'
  };
  
  CloudWatch.putMetricData(metric, context.done);
  
}
