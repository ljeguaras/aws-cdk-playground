#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsCdkPlaygroundStack } from './../lib/aws-cdk-playground-stack';
import { PhotosStack } from '../lib/PhotosStack';
import { PhotosHandlerStack } from '../lib/PhotosHandlerStack';
import { BucketTagger } from './bucket-tagger';

const app = new cdk.App();
new AwsCdkPlaygroundStack(app, 'AwsCdkPlaygroundStack', {});
const photosStack =  new PhotosStack(app,'PhotosStack');
new PhotosHandlerStack(app,'PhotosHandlerStack',{targetBucketArn:photosStack.photosBucketArn});
const tagger = new BucketTagger('level', 'test');
cdk.Aspects.of(app).add(tagger);