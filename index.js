var AWS        = require('aws-sdk'),
    CloudWatch = new AWS.CloudWatch();

exports.handler = function(event, context) {
  
  var s3_event_timestamp = event.Records[0].eventTime;
  
  var s3_event = event.Records[0].eventName;
  
  var s3_key = event.Records[0].s3.object.key;
  
  var s3_key_parts = s3_key.split('/');
  
  var metric = {
    MetricData: [{
      MetricName: s3_event,
      Dimensions: [{
        Name: 'Key',
        Value: s3_key_parts[0]
      }],
      Timestamp: s3_event_timestamp,
      Unit: 'Count',
      Value: 1
    }],
    Namespace: 'S3Cloudwatch'
  };
  
  CloudWatch.putMetricData(metric, context.done);
  
}
