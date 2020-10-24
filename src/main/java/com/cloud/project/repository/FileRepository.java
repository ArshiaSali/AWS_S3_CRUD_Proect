package com.cloud.project.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cloud.project.model.FileDetails;

@Repository
public interface FileRepository extends JpaRepository<FileDetails, Long>{
	
	List<FileDetails> fetchAllFiles(String firstName);

	List<FileDetails> fetchAllFilesAdmin(String userId);

}
