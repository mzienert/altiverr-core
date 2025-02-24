import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';

import { S3Construct } from './constructs/storage/s3-construct';
import { asaRacingUIPipelineConstruct } from './constructs/pipeline/asa-racing-pipeline-construct';

export interface AsaRacingStackProps extends cdk.StackProps {
  stage: string;
  certificateArn: string;
  githubOwner: string;
  githubRepo: string;
  githubBranch: string;
  githubTokenSecretName: string;
}

export class AsaRacingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AsaRacingStackProps) {
    super(scope, id, props);

    if (!props.certificateArn.startsWith('arn:aws:acm:')) {
      throw new Error('Invalid certificate ARN. Please deploy the certificate stack first and add the ARN to your .env file');
    }

    // Create S3 Bucket
    const s3Construct = new S3Construct(this, 'S3Construct');

    // Create NextJS Pipeline
    const certificate = acm.Certificate.fromCertificateArn(this, 'Certificate', props.certificateArn);
    const nextjsPipelineConstruct = new asaRacingUIPipelineConstruct(this, 'AsaRacingNextJSPipelineConstructV2', {
      githubOwner: props.githubOwner,
      githubRepo: props.githubRepo,
      githubBranch: props.githubBranch,
      githubTokenSecretName: props.githubTokenSecretName,
      certificate: certificate,
      domainNames: ['altiverr.com', 'www.altiverr.com'],
    });

    // Create Route53 Hosted Zone
    const zone = route53.HostedZone.fromLookup(this, 'AltiverZone', {
      domainName: 'altiverr.com'
    });

    // Create Route53 records
    new route53.ARecord(this, 'ARecord', {
      zone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(nextjsPipelineConstruct.distribution)
      ),
    });

    new route53.ARecord(this, 'WWWARecord', {
      zone,
      recordName: 'www',
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(nextjsPipelineConstruct.distribution)
      ),
    });

    // Stack Outputs
    new cdk.CfnOutput(this, 'altiverBucketName', {
      value: s3Construct.bucket.bucketName,
      description: 'Name of the S3 bucket for deployments',
    });

    new cdk.CfnOutput(this, 'NextJSWebsiteURL', {
      value: `https://${nextjsPipelineConstruct.distribution.distributionDomainName}`,
      description: 'Next.js Website URL',
    });
    
    new cdk.CfnOutput(this, 'NextJSPipelineArn', {
      value: nextjsPipelineConstruct.pipeline.pipelineArn,
      description: 'Next.js Pipeline ARN',
    });
  }
}
