# AWS_S3_CRUD_Project

Implemented as a part of the Course Cloud Technologies(CMPE 281) for Masters in Software Engineering at SJSU (http://www.sjsu.edu/)

## Contents
- Project Abstract
- Snapshots from Demonstration
- AWS Configurations and Pre-requisite Setup
- Steps to reproduce the project in Local

## Project Abstract

A scalable and highly available Cloud based Project implemented in Spring Boot and React for performing CRUD Operations in AWS S3 bucket. Users can sign up themselves and login. They can **Upload Files to S3, Download Files from S3, Update/Edit Files, Delete files from S3.** Admin can login to the application to see all the files uploaded by the users, and perform operation on them. During file upload, metadata entered by the user is stored in RDS (MySQL Instance). During file read, the data is fetched from database and shown in the UI. 

## Snapshots from Demonstration

## AWS Configurations and Pre-requisite Setup

### Create Amazon Cognito User Pools 
  For Admin and User access, create a User Pool with two different groups in Amazon Cognito
  
### Create an S3 bucket in the AWS Console
  Provide a unique bucket name, enable versionihg
  - Enable Lifecycle Policies under Management Tab and attach policies to transfer the contents of the bucket to Standard IA after 75 days, after 1 year to Amazon                  Glacier and expire after two years.
  - Enable replication to prevent from disaster recovery.
 
### Create a Cloudfront Distribution
  Create a new Cloudfront distribution for end users to access the files in the bucket.
 
### Build the code to generate a jar file
   Clone and build the code to produce a jar file which can be deployed.
   
### Deploy the jar in Elastic Beanstalk
  Create a new Application in Elastic Beanstalk and deploy the generated jar file. 
  
### Configure RDS, Load Balancing and Auto Scaling Group in Elastic Beanstalk Configurations
  Configure a MySQL Instance in the Database Section. Select Multi AZ deployment option. In the Capacity tab, increase the number of instances for load balancing which will        serve as the AutoScaling group.
  
### Simple Notification Service (SNS)
  Create a topic in SNS and configure email/SMS to get notifications on S3 file upload.
  
### CloudWatch
  Create a cloudwatch alarm to monitor health status of your Elastic Beanstalk environment.
  
### Lambda Function
  Create a Lambda function and add a trigger when a file is deleted from the s3 bucket. Lambda makes an entry in to the Cloudwatch logs once a file is deleted from s3 bucket.
  
### R53
  Route 53 provides DNS.It connects the end users to your applcation by converting domain names to IP addresses. Create a domain name and request a SSL certificate under the Certificate Manager section in AWS for your registered domain. Give Alias to your beanstalk URL.

## Steps to reproduce the project in Local
  Clone the project to your local. Import as a Maven project into Eclipe IDE. Perform Maven Clean Install and Run as Sprinboot application. This will make the project available  in local host port 8080.

 
 
  
  

