import styles from "../teacherRepoPage/TeacherRepoPage.module.scss";
import Header from "../../components/header/Header";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";

export default function AdminPage() {
  const navigate = useNavigate();

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  var list = [
    { name: "Adam", surname: "Kowalksi" },
    { name: "Pawel ", surname: "Jakis" },
    { name: "Bartek ", surname: "Nowak" },
    { name: "Michal", surname: "Piotrowski" },
  ];

  return (
    <>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Select Role</Form.Label>
              <p>
                <a
                  href=""
                  role="button"
                  className="btn btn-secondary popover-test mr-5 my-1"
                  title="Popover title"
                  onClick={() => {
                    "dac tutaj funkcje zmiany roli na studenta - konczy sie na handle closeedit";
                    handleCloseEdit();
                  }}
                >
                  Student
                </a>

                <a
                  href=""
                  role="button"
                  className="btn btn-secondary popover-test my-1"
                  title="Popover title"
                  onClick={() => {
                    "dac tutaj funkcje zmiany roli na studenta - konczy sie na handle closeedit";
                    handleCloseEdit();
                  }}
                >
                  Teacher
                </a>
              </p>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            ></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseEdit}>Close</button>
        </Modal.Footer>
      </Modal>

      <Header />
      <div className={styles.repo}>
        <div className={styles.repo__header}>
          <h1>List of Users</h1>
        </div>
        <ul className={styles.tasks__list}>
          {list.map((el, index) => (
            <li key={index} className={styles.task}>
              <div className={styles.task__header}>
                <h2>
                  {el.name} {el.surname}
                </h2>
                <button
                  className={styles["cbtn--task"]}
                  onClick={handleShowEdit}
                >
                  Edit Role
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
