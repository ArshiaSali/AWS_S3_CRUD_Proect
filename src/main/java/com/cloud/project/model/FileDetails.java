package com.cloud.project.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries({
	@NamedQuery(name = "FileDetails.fetchAllFiles",
			query = "SELECT f FROM FileDetails f where f.userId=?1"),
	@NamedQuery(name = "FileDetails.fetchAllFilesAdmin",
			query = "SELECT f FROM FileDetails f ")
}) 
@Entity
@Table(name = "filedetails")
public class FileDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "user_id")
	private String userId;
	
	@Column(name = "file_id")
	private String fileId;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "uploaded_time")
	private String uploadedTime;
	
	@Column(name = "updated_time")
	private String updatedTime;
	
	@Column(name = "description")
	private String description;
	
	public FileDetails() {
		
	}

	public FileDetails(String userId, String fileId, String firstName, String lastName, String uploadedTime,
			String updatedTime, String description) {
		super();
		this.userId = userId;
		this.fileId = fileId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.uploadedTime = uploadedTime;
		this.updatedTime = updatedTime;
		this.description = description;
	}

	@Override
	public String toString() {
		return "FileDetails [id=" + id + ", userId=" + userId + ", fileId=" + fileId + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", uploadedTime=" + uploadedTime + ", updatedTime=" + updatedTime
				+ ", description=" + description + "]";
	}




}

