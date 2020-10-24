import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router';
import axios from 'axios';

export default () => {


  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);
  const {userid}=useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    console.log("userid",userid);
    axios.get(`domain_name/api/v1/user-profile/${userid}/getFiles`).then(res => {
      console.log(res.data);
      setFiles(res.data);
    });
  }
  const deleteEmployee = (fileid,filekey) =>{
    console.log("deleted",fileid,filekey);
    axios.delete("domain_name/api/v1/user-profile/file" + '/' + fileid + '/' + filekey);
    console.log("called axios delete");
    setShow(false);
  }
  return (
    <>

      <Button variant="warning" onClick={handleShow}>
        Delete
          </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
                 <h2 className="text-center">Files in your S3 Bucket</h2>
                
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> File name</th>
                                    <th> First Name</th>
                                    <th> Last Name</th>
                                    <th> Uploaded Time</th>
                                    <th> Updated Time</th>
                                    <th> File Description</th>
                                    <th> Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  files.map((file) => {
                                    return(
                                      <tr key = {file.id}>
                                      <td> { file.fileId} </td>   
                                      <td> {file.firstName}</td>
                                      <td> {file.lastName}</td>
                                      <td> { file.uploadedTime} </td>   
                                      <td> {file.updatedTime}</td>
                                      <td> {file.description}</td>
                                      <td>
                                          <button style={{marginLeft: "10px"}} onClick={ () => deleteEmployee(file.id,file.fileId)} className="btn btn-danger">Delete </button>
                                      </td>
                                  </tr>
                                    )
                                  })

                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
              </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};