package com.cloud.project.profile;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloud.project.model.FileDetails;

@RestController
@RequestMapping("api/v1/user-profile")
@CrossOrigin("*")
public class FileController {

    private final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }


    @GetMapping(path = "{userid}/getFiles")
    public String getListofFiles(@PathVariable("userid") UUID userProfileId) {

    	String User_Id= userProfileId.toString();
    	System.out.println(User_Id);
    	if(User_Id.equals("53ebf880-24a4-44a1-a6d6-e0802b4f3660"))
    	{
    		System.out.println("its admin");
    		return fileService.fetchAllFilesAdmin(User_Id);
    	}
    	else {
    		System.out.println("its not admin");
    		return fileService.fetchAllFiles(User_Id);
    	}
    	
    	
    	}
    
    @PostMapping(
            path = "{userid}/file/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadUserProfileImage(@PathVariable("userid") UUID userProfileId,
    								   @RequestParam("file") MultipartFile file,
                                       @RequestParam("firstname") String FirstName,
                                       @RequestParam("lastname") String LastName,
                                       @RequestParam("uploadtime") String UploadTime,
                                       @RequestParam("updatetime") String UpdateTime,
                                       @RequestParam("desc") String Description) {
    	String User_Id= userProfileId.toString();
    	
    	FileDetails f= new FileDetails(User_Id,file.getOriginalFilename(), FirstName, LastName, UploadTime, UpdateTime,
    			Description);
    	
    	fileService.uploadUserProfileImage(User_Id, file, FirstName,LastName,UploadTime,UpdateTime,Description, f);
    }

	// delete file rest api
	@DeleteMapping("/file/{id}/{key}")
	public void deleteFileById(@PathVariable String id, @PathVariable String key){
		Long fileId = Long.parseLong(id);
		
		System.out.println("fileId:"+fileId+key);
		
		fileService.deleteFileById(fileId,key);
		
		
	}
    
}