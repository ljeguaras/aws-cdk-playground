import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotosStack extends cdk.Stack{
    constructor(scope:Construct, id:string, props?:cdk.StackProps) {
        super(scope,id,props);
         // new Bucket(this,'PhotosBucket');
    //if rename the contruct id , aws will create and replace the resource
    // then delete the old one
    //in order to overide the construct id when need to refactor there is a way to manually specify the logicalid/constructid to make sure it wont recreated and then deleted
    const myBucket = new Bucket(this,'PhotosBucket');
    (myBucket.node.defaultChild as CfnBucket).overrideLogicalId("PhotosBucketv2")

    //The construct ID is a name you assign in code when you create a resource.
    // CDK uses this construct ID (plus a hash for uniqueness) to generate the logical ID, which CloudFormation uses in the template.
    // The logical ID is composed of the construct ID followed by a short hash.
    // It is used by AWS CloudFormation to identify resources uniquely within the stack.
    // For example: PhotosBucket → PhotosBucket2FjdsfoQwe


   //The difference between a logical ID and a physical ID is that the logical ID is required and used by AWS CloudFormation to reference resources within the template, while the physical ID is required by AWS as a globally unique identifier, similar to an ARN (Amazon Resource Name)."

    // | Term         | Used by        | Purpose                                                 |
    // | ------------ | -------------- | ------------------------------------------------------- |
    // | Construct ID | Your CDK code  | Identifies the construct in the CDK app                 |
    // | Logical ID   | CloudFormation | Identifies the resource in the CloudFormation stack     |
    // | Physical ID  | AWS Resource   | Globally unique (like the S3 bucket name or Lambda ARN) |
    }
}