import styles from './TeacherRepoPage.module.scss';
import Header from '../../components/header/Header';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Form } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";

export default function TeacherRepoPage() {
  const location = useLocation();

  var courseId = location.state.courseId;

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedAssignmentId, setSelectedAssignmentId] = useState<number>(0);
  const [inputAssignmentName, setInputAssignmentName] = useState<string>("");
  const [inputAssignmentDescription, setInputAssignmentDescription] = useState<string>("");
  const [inputAssignmentDate, setInputAssignmentDate] = useState<Date>(new Date());

  const [list, setList] = useState(([{courseId : 0, assignmentId: 0, name: "Zad1", description: "Jakiś tam content do zadania, opis itp", deadline : ''},]));
  const [fileList, setFileList] = useState([]);

  const handleCloseAdd = () => setShowAdd(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleShowEdit = () => setShowEdit(true);
  const handleShowDelete = () => setShowDelete(true);

  const [expandedAssignmentId, setExpandedAssignmentId] = useState(null);
  const toggleFilesVisibility = (assignmentId) => {
    if (expandedAssignmentId === assignmentId) {
      setExpandedAssignmentId(null);
    } else {
      setExpandedAssignmentId(assignmentId);
    }
  };


  var token = localStorage.getItem("token") || "a";
  token = token.replace(/['"]+/g, "");

  function handleChangeFile(event: any) {
    console.log(event.target.files);
  }

  async function getAssignments() {
    try {
    const response = await fetch(`https://localhost:7066/api/course/${courseId}/assignments`, {
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

  async function addAssignment(courseId : number, name: string, description: string, deadline : Date) {
    try {
      const response = await fetch(`https://localhost:7066/api/course/${courseId}/assignments`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          "name": name,
          "description": description,
          "deadline": deadline,
          "courseId": courseId
        })
      });

      if (!response.ok) {
        toast.error("Failed to add assignment. Assignment name must be between 3 and 15 characters long, and description must be between 5 and 100 characters long.");
        throw new Error('Failed to add course');
      }

      await getAssignments();
      handleCloseAdd();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  }

  async function editAssignment(courseId: number, assignmentId : number, name: string, description: string, deadline : Date) {
    try {
      const response = await fetch(`https://localhost:7066/api/course/${courseId}/assignments/${assignmentId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          "assignmentId": assignmentId,
          "name": name,
          "description": description,
          "deadline": deadline,
          "courseId": courseId
        })
      });

      if (!response.ok) {
        toast.error("Failed to edit assignment. Assignment name must be between 3 and 15 characters long, and description must be between 5 and 100 characters long.");
        throw new Error('Failed to edit course');
      }

      await getAssignments();
      handleCloseEdit();
    } catch (error) {
      console.error('Error editing course:', error);
    }
  }

  async function deleteAssignment(courseId: number, assignmentId : number) {
    try {
      const response = await fetch(`https://localhost:7066/api/course/${courseId}/assignments/${assignmentId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      await getAssignments();
      handleCloseDelete();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  }

  async function getFiles(courseId : number, assignmentId : number) { 
    try {
      const response = await fetch(`https://localhost:7066/api/course/${courseId}/assignments/${assignmentId}/submissions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve file');
      }

      const data = await response.json();
      console.log(data);
      var temp : any = [] 
      data.map((el : any) => {
        temp.push(el.filePath);
      });
      setFileList(temp);
      console.log('File retrieved successfully ', temp);
    } catch (error) {
      console.error('Error retrieving files:', error);
    }
  }

  async function downloadFile(courseId : any, assignmentId : any, submissionId : any) {
    try {
      const response = await fetch(`https://localhost:7066/api/course/${courseId}/assignments/${assignmentId}/submissions/${submissionId}/download`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to retrieve file');
      }
  
      var temp = fileList[submissionId - 1].split('\\');
      console.log(temp);
      let fileName = `${temp[temp.length - 4]}_${temp[temp.length - 2]}_${temp[temp.length - 3]}_${temp[temp.length - 1]}`;
  
      const disposition = response.headers.get('Content-Disposition');
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          fileName = matches[1].replace(/['"]/g, ''); // Extract filename from Content-Disposition header
        }
      }
  
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  
      console.log('File downloaded successfully');
    } catch (error) {
      console.error('Error retrieving or downloading file:', error);
    }
  }

  useEffect(() => {getAssignments()}, []);

  return (
    <>
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add new assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                onChange={(e) => setInputAssignmentName(e.target.value)}
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
                onChange={(e) => setInputAssignmentDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Due Date"
                onChange={(e) => setInputAssignmentDate(new Date(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseAdd}>
            Close
          </button>
          <button onClick={() => {addAssignment(courseId, inputAssignmentName, inputAssignmentDescription, inputAssignmentDate); handleCloseAdd();}}>
            Add
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                onChange={(e) => setInputAssignmentName(e.target.value)}
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
                onChange={(e) => setInputAssignmentDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Due Date"
                onChange={(e) => setInputAssignmentDate(new Date(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseEdit}>
            Close
          </button>
          <button onClick={() => {editAssignment(courseId, selectedAssignmentId, inputAssignmentName, inputAssignmentDescription, inputAssignmentDate); handleCloseEdit();}}>
            Edit
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Are you sure, you want to delete this assignment?</Form.Label>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseDelete}>
            Close
          </button>
          <button onClick={() => {deleteAssignment(courseId, selectedAssignmentId); handleCloseDelete();}}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
      <Header />
      <div className={styles.repo}>
        <div className={styles.repo__header}>
          <h1>{location.state.courseName}</h1>
          <button className={styles['cbtn--repo-add']} onClick={handleShowAdd}><p>+</p></button>
        </div>
        <ul className={styles.tasks__list}>
          {list.map((el, index) => 
          <li key={index} className={styles.task}>
            <div className={styles.task__header}>
              <h2>{el.name}</h2>
              <button className="cbtn--course" onClick={(e) => {e.stopPropagation(); setSelectedAssignmentId(el.assignmentId); handleShowEdit();}}>edit</button>
              <button className="cbtn--course" onClick={(e) => {e.stopPropagation(); setSelectedAssignmentId(el.assignmentId); handleShowDelete();}}>delete</button>
            </div>
            <div className={styles.task__content}>
              <p>Due Date : {el.deadline.replace('T', ' ')}</p>
              {el.description} 
              <div className={styles.repo__file}>
                <button className={styles['cbtn--expand']} onClick={() => {toggleFilesVisibility(el.assignmentId); getFiles(courseId, el.assignmentId)}}>Show files</button>
                {expandedAssignmentId === el.assignmentId && (
                  fileList.map((elm, index) => {
                    const temp = elm.split('\\');
                    const fileName = `${temp[temp.length - 3]}_${temp[temp.length - 1]}`;

                    return (
                      <a key={index} onClick={(e) => { 
                        setSelectedAssignmentId(el.assignmentId); 
                        downloadFile(courseId, selectedAssignmentId, index + 1);
                      }}>
                        {fileName}
                      </a>
                    );
                  })
                )}
              </div>
            </div>
          </li>)}
        </ul>
      </div>
    </>
  )
}