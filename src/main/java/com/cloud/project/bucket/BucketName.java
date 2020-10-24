package com.cloud.project.bucket;

public enum BucketName {
	
	PROFILE_IMAGE("bucket_name");
	
	private final String bucketName;

	private BucketName(String bucketName) {
		this.bucketName = bucketName;
	}

	public String getBucketName() {
		return bucketName;
	}
	
	
}
