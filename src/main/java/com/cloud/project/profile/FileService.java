package com.cloud.project.profile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloud.project.bucket.BucketName;
import com.cloud.project.exception.ResourceNotFoundException;
import com.cloud.project.filestore.FileStore;
import com.cloud.project.model.FileDetails;
import com.cloud.project.repository.FileRepository;
import com.google.gson.Gson;

@Service
public class FileService {
	
	@Autowired
	private FileRepository fileRepository;
    private final FileStore fileStore;

    @Autowired
    public FileService(FileStore fileStore) { 
        this.fileStore = fileStore;
    }

    void uploadUserProfileImage( String User_id, MultipartFile file, String FirstName,String LastName,String UploadTime,String UpdateTime,String Description, FileDetails filedetails) {
        // 1. Check if image is not empty
        	isFileEmpty(file);

        // 2. Grab some metadata from file if any
        Map<String, String> metadata = extractMetadata(file);

        // 3. Store the image in s3 and update database (userProfileImageLink) with s3 image link 
         String path = String.format("%s", BucketName.PROFILE_IMAGE.getBucketName());
         String filename = String.format("%s", file.getOriginalFilename());

         System.out.println("filedetails");
         System.out.println(filedetails);
        
        try {
            fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
            fileRepository.save(filedetails);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    
    private Map<String, String> extractMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }

    private void isFileEmpty(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file [ " + file.getSize() + "]");
        }
    }

	public String fetchAllFiles(String userId) {
		// TODO Auto-generated method stub
		List<FileDetails> f = fileRepository.fetchAllFiles(userId);
		
		 Gson gson = new Gson();
	        String jsonNames = gson.toJson(f);
	        System.out.println("jsonNames = " + jsonNames);   
	     return jsonNames;
	}
	
	public String fetchAllFilesAdmin(String userId) {
		// TODO Auto-generated method stub
		List<FileDetails> f = fileRepository.fetchAllFilesAdmin(userId);
		
		 Gson gson = new Gson();
	        String jsonNames = gson.toJson(f);
	        System.out.println("jsonNames = " + jsonNames); 
	     
	     return jsonNames;
		
	}

	public void deleteFileById(Long fileId, String fileKey) {
		// TODO Auto-generated method stub
		FileDetails fd = fileRepository.findById(fileId).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + fileId));
		 String path = String.format("%s", BucketName.PROFILE_IMAGE.getBucketName());
		fileRepository.delete(fd);
		fileStore.delete(path,fileKey);
	}
}