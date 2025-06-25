import * as cdk from 'aws-cdk-lib';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class L3Bucket extends Construct
{
constructor(scope:Construct,id:string,expiration:number) {
  super(scope,id);
  new Bucket(this,'L3Bucket',{
    lifecycleRules:[{expiration:Duration.days(expiration)}] 
  });
}}
export class AwsCdkPlaygroundStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //L1 : Low level constructs - Cfn(Cloud Formamtion) resources. When used, we must configure all properties.
    new CfnBucket(this,'MyL1Bucket',{
      lifecycleConfiguration:{
        rules:[ {
          expirationInDays:1, 
          status:'Enabled'} ]
        }
    });

    //L2: Aws resources with higher=level - CDK provides additional fuctionality like defaults, boiler plate and type safety for many paramertes
    const myL2Bucket = new Bucket(this,'MyL2Bucket',{
      lifecycleRules:[{expiration:Duration.days(2)}] 
    });
    
    //this will not print information it will available only after deployed. 
    //because all this code happen locally.
    console.log("bucket name:"+ myL2Bucket.bucketName);

    //using cloud formation output it can find the information out right in console
    //CloudFormation outputs are a great way in which different cloudformation stacks can share information between them.
    new CfnOutput(this,'MyL2BucketName',{
      value: myL2Bucket.bucketName
    })

    //L3: Patterns: Combine multiple types of resources and helpt with common task in AWS. Ex. LambdaAPI
    new L3Bucket(this,'MyL3Bucket',5);
   
  }
}
