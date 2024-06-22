import styles from './TeacherRepoPage.module.scss';
import Header from '../../components/header/Header';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Form } from 'react-bootstrap';

export default function TeacherRepoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const index = location.state.index;
  console.log(index);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleShowEdit = () => setShowEdit(true);
  const handleShowDelete = () => setShowDelete(true);

  function handleChangeFile(event: any) {
    console.log(event.target.files);
  }

  var list = [{title: "Zadanie 1", content: "Jakiś tam content do kursu, opis itp"},{title: "Zadanie 2", content: "Inny opis"},{title: "Zadanie 3", content: "Jeszcze inny opis"},{title: "Zadanie 4", content: "Opis kursu C#"}];

  return (
    <>
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add new task</Modal.Title>
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
          <button onClick={handleCloseAdd}>
            Close
          </button>
          <button onClick={handleCloseAdd}>
            Add
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit task</Modal.Title>
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
          <button onClick={handleCloseEdit}>
            Close
          </button>
          <button onClick={handleCloseEdit}>
            Edit
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Are you sure, you want to delete this task?</Form.Label>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseDelete}>
            Close
          </button>
          <button onClick={handleCloseDelete}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>

      <Header />
      <div className={styles.repo}>
        <div className={styles.repo__header}>
          <h1>Course name jfoisajfqajiowa</h1>
          <button className={styles['cbtn--repo-add']} onClick={handleShowAdd}><p>+</p></button>
        </div>
        <ul className={styles.tasks__list}>
          {list.map((el, index) => 
          <li key={index} className={styles.task} onClick={() => navigate("/teacher/repo", {state: {index}})}>
            <div className={styles.task__header}>
              <h2>{el.title}</h2>
              <button className={styles['cbtn--task']} onClick={handleShowEdit}>edit</button>
              <button className={styles['cbtn--task']} onClick={handleShowDelete}>delete</button>
            </div>
            <div className={styles.task__content}>{el.content}</div>
          </li>)}
        </ul>
        <div className='repo__file'>
          <input type="file" onChange={(event) => handleChangeFile(event)} multiple/>
        </div>
      </div>
    </>
  )
}