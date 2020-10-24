import React, { useState, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDropzone } from 'react-dropzone';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import {useParams} from 'react-router';


export default () => {

  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [desc, setDescription] = useState('');
  const [uplFile, setUplFile] = useState('');
  const {userid}=useParams();

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
      setShow(false);
  };
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <Button variant="primary" onClick={handleShow}>
        Upload
          </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyDropzone />
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formFirstName">

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

            <Form.Group controlId="formLastName">
              <Row>
                <Col md={{ span: 6, offset: 3 }}><Form.Label>Last Name</Form.Label></Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}><Form.Control type="text" placeholder="Enter Last Name" value={lname}
                  onChange={event => setLastName(event.target.value)}
                /></Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formDescription">

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
                  Upload
                            </Button></Col>
            </Row>
          </Form>


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