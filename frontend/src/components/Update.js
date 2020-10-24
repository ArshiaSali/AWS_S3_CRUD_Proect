import React, { useState, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useDropzone } from 'react-dropzone';

export default () => {

  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [desc, setDescription] = useState('');
  const [uplFile, setUplFile] = useState('');
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);

  const [shows, setShows] = useState(false);
  const handleCloses = () => setShows(false);
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
  const updateEmployee = (fileid,filekey,firstname,lastname,description) =>{
    console.log("deleted",fileid,filekey);
    setShow(false);
    setFirstName(firstname);
    setLastName(lastname);
    setDescription(description);
    axios.delete("domain_name/api/v1/user-profile/file" + '/' + fileid + '/' + filekey);
    console.log("called axios delete");
    setShows(true);
  }

  function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0];
      setUplFile(file);
      console.log(file);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <Button variant="info">Drop your Files</Button> :
            <Button variant="info">Choose your file</Button>
        }
      </div>
    )
  }

  const onSubmit = event => {
    event.preventDefault();
    console.log(fname, lname, desc, uplFile);
    var q = new Date(uplFile.lastModified);
    var lmd = q.toString();
    console.log(`Last Modified Date: ${q}`);
    lmd = lmd.split(" ");
    var stringArray = new Array();
    for (var i = 0; i < 6; i++) {
      stringArray.push(lmd[i]);
      if (i !== lmd.length - 1) {
        stringArray.push(" ");
      }
    }
    var a = stringArray.toString();
    var lastModifiedDate = a.replace(/,/g, "");
    console.log(lastModifiedDate);

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
  

    const formData = new FormData();
    formData.append("file",uplFile);
    formData.append("firstname",fname);
    formData.append("lastname",lname);
    formData.append("uploadtime",lastModifiedDate);
    formData.append("updatetime",dateTime);
    formData.append("desc",desc);

    axios.post(`domain_name/api/v1/user-profile/${userid}/file/upload`,
    formData,{
      headers: {
        "Content-Type":"multipart/form-data"
      }
      }).then(() => {
        console.log("file uploaded!");
      }).catch(err => {
        console.log("error");
      })
      setShows(false);
  };

  return (
    <>

      <Button variant="success" onClick={handleShow}>
        Update
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
                                          <button style={{marginLeft: "10px"}} onClick={ () => updateEmployee(file.id,file.fileId,file.firstName,file.lastName,file.description)} className="btn btn-danger">Update</button>
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


      <Modal show={shows} onHide={handleCloses}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyDropzone />
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="updateformFirstName">

              <Row>
                <Col md={{ span: 6, offset: 3 }}><Form.Label>First Name </Form.Label></Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Control type="text" placeholder="Enter First Name" value={fname}
                    onChange={event => setFirstName(event.target.value)}
                  /></Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="updateformLastName">
              <Row>
                <Col md={{ span: 6, offset: 3 }}><Form.Label>Last Name</Form.Label></Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}><Form.Control type="text" placeholder="Enter Last Name" value={lname}
                  onChange={event => setLastName(event.target.value)}
                /></Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="updateformDescription">

              <Row>
                <Col md={{ span: 6, offset: 3 }}><Form.Label>Description </Form.Label></Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Control type="text" placeholder="Enter Description" value={desc}
                    onChange={event => setDescription(event.target.value)}
                  /></Col>
              </Row>
            </Form.Group>
            <Row>
              <Col md={{ span: 5, offset: 5 }}>
                <Button variant="info" type="submit">
                  Update
                            </Button></Col>
            </Row>
          </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloses}>
            Close
              </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};