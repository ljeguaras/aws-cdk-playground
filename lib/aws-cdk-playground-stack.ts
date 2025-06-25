import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
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
    new Bucket(this,'MyL2Bucket',{
      lifecycleRules:[{expiration:Duration.days(2)}] 
    });
    
    //L3: Patterns: Combine multiple types of resources and helpt with common task in AWS. Ex. LambdaAPI
    new L3Bucket(this,'MyL3Bucket',5);
   
  }
}
