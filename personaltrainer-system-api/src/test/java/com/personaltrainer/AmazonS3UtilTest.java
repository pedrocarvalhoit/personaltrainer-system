package com.personaltrainer;

import org.junit.jupiter.api.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class AmazonS3UtilTest {

    @Test
    public void testListFolder(){
        String folderName = "client-photos/23/";
        List<String> listKeys = AmazonS3Util.listFolder(folderName);
        listKeys.forEach(System.out::println);
    }

    @Test
    public void test(){
        System.out.println(Constants.S3_BASE_URL);
    }

    @Test
    public void testUploadFile() throws FileNotFoundException {
        String folderName = "test-image";
        String fileName = "test-image.png";
        String filePath = "D:\\test\\" + fileName;

        InputStream inputStream = new FileInputStream(filePath);

        AmazonS3Util.uploadFile(folderName, fileName, inputStream);
    }

    @Test
    public void testDeleteFile() {
        String fileName = "user-photos/652/asdasd.png";
        AmazonS3Util.deleteFile(fileName);
    }

    @Test
    public void testRemoveFolder() {
        String folderName = "test-image";
        AmazonS3Util.removeFolder(folderName);
    }

}