import './TeacherPage.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Form } from 'react-bootstrap';
import Header from '../../components/header/Header';

export default function TeacherPage() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // async function getAllCourses() {
  //   const response = await fetch('https://localhost:7066/api/Courses');
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // }

  async function getCourses(id : number) {
    const response = await fetch('https://localhost:7066/api/courses/id');
    const data = await response.json();
    return data;
  }

  async function addCourse(name: string, description: string) {
    const response = await fetch('https://localhost:7066/api/Courses', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": name, 
        "description": description})
    });
    const data = await response.json();
    return data;
  }

  async function deleteCourse(id : number) {
    const response = await fetch(`https://localhost:7066/api/Courses/${id}`, {method: 'DELETE'});
    const data = await response.json();
    return data;
  }

  var list = [{name: "C plus", description: "Jakiś tam content do kursu, opis itp"}, 
  {name: "Java", description: "Inny opis"}, 
  {name: "Python", description: "Jeszcze inny opis"},
  {name: "C#", description: "Opis kursu C#"}];

  return (
    <>
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={handleClose}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
      <Header />
      <div className="courses">
        <div className="courses__header">
          <h1>Courses</h1> 
          <button className='courses__add' onClick={handleShow}><p>+</p></button>
        </div>
        <ul className="courses__list">
          {list.map((el, index) => 
          <li key={index} className='course' onClick={() => navigate("/teacher/repo", {state: {index}})}>
            <div className='course__header'><h2>{el.name}</h2></div>
            <div className='course__content'>{el.description}</div>
          </li>)}
        </ul>
      </div>
    </>
  )
}