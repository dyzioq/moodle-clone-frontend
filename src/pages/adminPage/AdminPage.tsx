import styles from "../teacherRepoPage/TeacherRepoPage.module.scss";
import Header from "../../components/header/Header";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

export default function AdminPage() {
  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [usersList, setUsersList] = useState([
    { name: "", surname: "", email: "" },
  ]);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  var token = localStorage.getItem("token") || "a";
  token = token.replace(/['"]+/g, "");

  async function getUsersList() {
    console.log("scaiagam uzytkownikow");
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
    setUsersList(data);

    return data;
  }

  async function getRole(email: string) {
    try {
      const roleResponse = await fetch(
        `https://localhost:7066/api/User/roles?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!roleResponse.ok) {
        toast.error("role is not valid");
        throw new Error("Network response was not ok");
      }
      const roleResult = await roleResponse.json();
      setUserRole(roleResult);
      return roleResult;
    } catch (error) {
      console.error("Error:", error);
      console.log("role nie dzialaja");
    }
  }

  async function patchRole(email: string, role: string) {
    try {
      const response = await fetch("https://localhost:7066/api/User/userRole", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userEmail: email,
          roleName: role,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function deleteRole(email: string, role: string) {
    getRole(email);
    try {
      const response = await fetch("https://localhost:7066/api/User/userRole", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userEmail: email,
          roleName: role,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function showModal(email: string) {
    setUserEmail(email);
    getRole(email);
    handleShowEdit();
    console.log("modal opened");
  }

  function handleDeleteRole(role: string) {
    if (role === "Teacher") {
      deleteRole(userEmail, "Student");
    } else {
      deleteRole(userEmail, "Teacher");
    }
  }

  function handleChangeRole(role: string) {
    patchRole(userEmail, role);
    console.log("role changed succesfully");

    handleCloseEdit();
  }

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <p>
                <Form.Label>Current Role: {userRole}</Form.Label>
              </p>
              <p>
                <Form.Label>Select Role</Form.Label>
              </p>

              <p>
                <a
                  href=""
                  role="button"
                  className="btn btn-secondary popover-test mr-5 my-1"
                  title="Popover title"
                  onClick={() => {
                    handleDeleteRole("Student");
                    handleChangeRole("Student");
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
                    handleDeleteRole("Teacher");
                    handleChangeRole("Teacher");
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
          {usersList.map((el, index) => (
            <li key={index} className={styles.task}>
              <div className={styles.task__header}>
                <h2>
                  {el.name} {el.surname}, {el.email}
                </h2>
                <button
                  className={styles["cbtn--task"]}
                  onClick={() => {
                    showModal(el.email);
                  }}
                >
                  Edit Role
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </>
  );
}
