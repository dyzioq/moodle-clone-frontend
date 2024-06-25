import './StudentPage.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import Header from '../../components/header/Header';

export default function StudentPage() {
  const navigate = useNavigate();
  const [list, setList] = useState(([{id: 1, name: "Kurs do języka javascript", description: "Jakiś tam content do kursu, opis itp"},]));
  const [isAllCourses, setIsAllCourses] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);

  const [showJoin, setShowJoin] = useState(false);

  const handleCloseJoin = () => setShowJoin(false);
  const handleShowJoin = () => setShowJoin(true);

  var token = localStorage.getItem("token") || "a";
  token = token.replace(/['"]+/g, "");

  async function getAllCourses() {
    try {
      const response = await fetch('https://localhost:7066/api/Courses', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch all courses');
      }
      const data = await response.json();
      setList(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching all courses:', error);
    }
  }

  async function getCourses() {
    try {
      const response = await fetch('https://localhost:7066/api/User/student/courses', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setList(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  async function joinCourse(courseId : number) {
    try {
      const response = await fetch(`https://localhost:7066/api/Courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        toast.error("You arleady enrolled to this course");
        throw new Error('Failed to enroll course');
      }
      const data = await response;
      console.log(data);
    } catch (error) {
      console.error('Error enrolling course:', error);
    }
  }

  useEffect(() => {getCourses();}, [token]);

  return (
    <>
    <ToastContainer />
      <Modal show={showJoin} onHide={handleCloseJoin}>
        <Modal.Header closeButton>
          <Modal.Title>Join course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Send join request to this course?</Form.Label>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseJoin}>
            Close
          </button>
          <button onClick={() => {joinCourse(selectedCourseId); handleCloseJoin();}}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>

      <Header />
      <div className="courses">
        <div className="courses__header"><h1>Courses</h1></div>
        <button className="cbtn--change-state" onClick={() => {getAllCourses(); setIsAllCourses(true)}}>Show all courses</button>
        <button className="cbtn--change-state" onClick={() => {getCourses(); setIsAllCourses(false)}}>Show my courses</button>
        <ul className="courses__list">
          {isAllCourses ? <h3>Join new courses</h3> : <></>}
          {list.map((el, index) => 
          <li key={index} className='course' onClick={() => {!isAllCourses ? navigate("/student/repo", {state: {courseId : el.id, courseName : el.name}}) : <></>}}>
              <div className='course__header'><h2>{el.name}</h2> {isAllCourses ? <button className="cbtn--course" onClick={(e) => {e.stopPropagation(); setSelectedCourseId(el.id); handleShowJoin();}}>join</button> : <></>}</div>
              <div className='course__content'>{el.description}</div>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}