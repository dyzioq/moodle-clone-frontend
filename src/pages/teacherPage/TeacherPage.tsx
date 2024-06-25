import './TeacherPage.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Form } from 'react-bootstrap';
import Header from '../../components/header/Header';
import { ToastContainer, toast } from "react-toastify";

export default function TeacherPage() {
  const navigate = useNavigate();
  const [list, setList] = useState(([{id: 1, name: "Kurs do języka javascript", description: "Jakiś tam content do kursu, opis itp"},]));
  const [pendingStudents, setPendingStudents] : any = useState({});

  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [inputCourseName, setInputCourseName] = useState<string>("");
  const [inputCourseDescription, setInputCourseDescription] = useState<string>("");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAcceptStudent, setShowAcceptStudent] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleCloseAcceptStudent = () => setShowAcceptStudent(false);

  const handleShowAdd = () => setShowAdd(true);
  const handleShowEdit = () => setShowEdit(true);
  const handleShowDelete = () => setShowDelete(true);
  const handleShowAcceptStudent = () => setShowAcceptStudent(true);

  var token = localStorage.getItem("token") || "a";
  token = token.replace(/['"]+/g, "");

  async function getCourses() {
    try {
      const response = await fetch('https://localhost:7066/api/User/teacher/courses', {
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
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  async function addCourse(name: string, description: string) {
    try {
      const response = await fetch('https://localhost:7066/api/Courses', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          "name": name,
          "description": description
        })
      });

      if (!response.ok) {
        toast.error("Failed to add course. Course name must be between 3 and 15 characters long, and description must be between 5 and 100 characters long.");
        throw new Error('Failed to add course');
      }

      await getCourses();
      handleCloseAdd();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  }

  async function editCourse(courseId: number, name: string, description: string) {
    try {
      const response = await fetch(`https://localhost:7066/api/Courses/${courseId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          "courseId": courseId,
          "name": name,
          "description": description
        })
      });

      if (!response.ok) {
        toast.error("Failed to edit course. Course name must be between 3 and 15 characters long, and description must be between 5 and 100 characters long.");
        throw new Error('Failed to edit course');
      }

      await getCourses();
      handleCloseEdit();
    } catch (error) {
      console.error('Error editing course:', error);
    }
  }

  async function deleteCourse(id: number) {
    try {
      const response = await fetch(`https://localhost:7066/api/Courses/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        toast.error("Failed to delete course");
        throw new Error('Failed to delete course');
      }

      await getCourses();
      handleCloseDelete();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  }

  async function getPendingStudents(courseId: number) {
    try {
      const response = await fetch(`https://localhost:7066/api/Courses/${courseId}/pending-students`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to get students');
      }
      const data = await response.json();
      setPendingStudents(prev => {
        return {
          ...prev,
          [courseId]: data
        };
      });
      return data;
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }

  async function acceptStudent(courseId : number, studentId : string) {
    try {
      const response = await fetch(`https://localhost:7066/api/Courses/${courseId}/accept`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify({
          "courseId": courseId,
          "studentId": studentId
        })
      });

      if (!response.ok) {
        toast.error("Failed to accept student");
        throw new Error('Failed to accept stuent');
      }
      getPendingStudents(courseId);
    } catch (error) {
      console.error('Error accepting student:', error);
    }
  }

  useEffect(() => {getCourses();}, [token]);

  return (
    <>
     <Modal show={showAdd} onHide={handleCloseAdd}>
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
                onChange={(e) => setInputCourseName(e.target.value)}
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
                onChange={(e) => setInputCourseDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseAdd}>
            Close
          </button>
          <button onClick={() => {addCourse(inputCourseName, inputCourseDescription); handleCloseAdd();}}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
      {/* //EDIT */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                onChange={(e) => setInputCourseName(e.target.value)}
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
                onChange={(e) => setInputCourseDescription(e.target.value)}
                />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseEdit}>
            Close
          </button>
          <button onClick={() => {editCourse(selectedCourseId, inputCourseName, inputCourseDescription); handleCloseEdit();}}>
            Edit
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Are you sure, you want to delete this course?</Form.Label>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseDelete}>
            Close
          </button>
          <button onClick={() => {deleteCourse(selectedCourseId); handleCloseDelete();}}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAcceptStudent} onHide={handleCloseAcceptStudent}>
        <Modal.Header closeButton>
          <Modal.Title>Delete course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Accept this student?</Form.Label>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseAcceptStudent}>
            Close
          </button>
          <button onClick={() => {acceptStudent(selectedCourseId, selectedStudentId); handleCloseAcceptStudent();}}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
      <Header />
      <div className="courses">
        <div className="courses__header">
          <h1>Courses</h1> 
          <button className='courses__add' onClick={handleShowAdd}><p>+</p></button>
        </div>
        <ul className="courses__list">
          {list.map((el) => 
          <li key={el.id} className='course'>
            <div className="course__header" onClick={() => navigate("/teacher/repo", {state: {courseId : el.id, courseName : el.name}})}>
              <h2>{el.name}</h2>
              <button className="cbtn--course" onClick={(e) => {e.stopPropagation(); setSelectedCourseId(el.id); handleShowEdit();}}>edit</button>
              <button className="cbtn--course" onClick={(e) => {e.stopPropagation(); setSelectedCourseId(el.id); handleShowDelete();}}>delete</button>
            </div>
            <div className="course__content">{el.description}</div>
            <ul className="pending__list">
            {pendingStudents[el.id] ? (
              pendingStudents[el.id].map((student, studentIndex) => (
                <li key={studentIndex}>
                  {student.name} <button className="cbtn--course" onClick={() => {setSelectedCourseId(el.id); setSelectedStudentId(student.studentId); handleShowAcceptStudent();}}>accept</button>
                </li>
              ))
            ) : (
              <p>No students pending for this course. <button className="cbtn--course" onClick={() => getPendingStudents(el.id)}>Search</button></p>
            )}
          </ul>
          </li>)}
        </ul>
      </div>
    </>
  )
}