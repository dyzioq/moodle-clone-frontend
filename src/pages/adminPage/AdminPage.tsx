import styles from "../teacherRepoPage/TeacherRepoPage.module.scss";
import Header from "../../components/header/Header";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";

export default function AdminPage() {
  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  async function getUsersList() {
    console.log("scaiagam uzytkownikow");
    const token = localStorage.getItem("token");
    console.log("tokenadmin" + token);
    const response = await fetch(
      "https://localhost:7066/api/User/admin/Users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    //console.log(data);
    //console.log(typeof data);

    // var usersArray = Object.keys(data).map(function (userIndex) {
    //   let user = data[userIndex];
    //   // do something with person
    //   return user;
    // });
    // console.log(usersArray);
    // console.log(typeof usersArray);

    return data;
  }

  const usersList = getUsersList();
  usersList.then(function (result) {
    //console.log(result[1]);
    return result;
  });
  console.log(usersList);
  // console.log("check");
  // console.log(usersList);
  // console.log("objekt :" + typeof usersList);

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
        {/* <ul className={styles.tasks__list}>
          {usersList.map((el, index) => (
            <li key={index} className={styles.task}>
              <div className={styles.task__header}>
                <h2>hej</h2>
                <button
                  className={styles["cbtn--task"]}
                  onClick={handleShowEdit}
                >
                  Edit Role
                </button>
              </div>
            </li>
          ))}
        </ul> */}
      </div>
    </>
  );
}
