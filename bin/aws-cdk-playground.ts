#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsCdkPlaygroundStack } from './../lib/aws-cdk-playground-stack';
import { PhotosStack } from '../lib/PhotosStack';

const app = new cdk.App();
new AwsCdkPlaygroundStack(app, 'AwsCdkPlaygroundStack', {});
new PhotosStack(app,'PhotosStack')