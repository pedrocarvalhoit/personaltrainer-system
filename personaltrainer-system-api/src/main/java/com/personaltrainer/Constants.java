package com.personaltrainer;

public class Constants {

    public static final String S3_BASE_URL;

    static {

        String bucketName = System.getenv("AWS_BUCKET_NAME");
        String region = System.getenv("AWS_REGION");
        String pattern = "https://%s.s3.%s.amazonaws.com";

        S3_BASE_URL = bucketName == null ? "" : String.format(pattern, bucketName, region);

    }

}
