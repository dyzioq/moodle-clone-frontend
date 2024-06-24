import { useState } from "react";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderLogo from "../../components/header/HeaderLogo";

import { Modal, Form } from "react-bootstrap";

export default function LoginPage() {
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputForgotEmail, setForgotEmail] = useState<string>("");

  //handle Submit of logging in
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Dodaj logikę obsługi formularza tutaj
    console.log("login Form submitted");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7066/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword,
        }),
      });

      if (!response.ok) {
        toast.error("Email or password is incorrect");
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      localStorage.setItem(
        "token",
        JSON.stringify(result["accessToken"]).replace(/['"]+/g, "")
      );
      console.log("token123: " + token);
      console.log("Success:", result);

      try {
        const roleResponse = await fetch(
          `https://localhost:7066/api/User/roles?email=${inputEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(roleResponse);
        if (!roleResponse.ok) {
          toast.error("role is not valid");
          throw new Error("Network response was not ok");
        }
        const roleResult = await roleResponse.json();
        console.log("Success:", roleResult);

        if (roleResult.length === 0) {
          navigate("/student");
        } else {
          switch (roleResult[0]) {
            case "Admin":
              navigate("/admin");
              break;
            case "Student":
              navigate("/student");
              break;
            case "Teacher":
              navigate("/teacher");
              break;
            default:
              console.log("cos nie dziala z rola111");
              break;
          }
        }
      } catch (error) {
        console.error("Error:", error);
        console.log("role nie dzialaja");
      }

      //navigate("/student");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Show forgot password modal
  const [showForgotPassword, setForgotPassword] = useState(false);

  const handleCloseForgotPassword = () => setForgotPassword(false);
  const handleShowForgotPassword = () => setForgotPassword(true);

  //Handle submit for sending email to reset password
  const handleForgotPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(inputForgotEmail);
    try {
      const response = await fetch("https://localhost:7066/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputForgotEmail,
        }),
      });

      if (!response.ok) {
        toast.error("Something is incorrect");
        throw new Error("Network response was not ok");
      } else {
        handleCloseForgotPassword();
        navigate("/resetPassword");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        show={showForgotPassword}
        onHide={handleCloseForgotPassword}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Enter your email - code to reset your password will be send
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={inputForgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            ></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseForgotPassword}>Close</button>
          <button onClick={handleForgotPassword}>Submit</button>
        </Modal.Footer>
      </Modal>

      <HeaderLogo />
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              type="text"
              id="email"
              name="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
            />
            <a href="#" onClick={handleShowForgotPassword}>
              Forgot Password? Click here!
            </a>
          </div>
          <button type="submit">Login</button>
        </form>
        <a href="" onClick={() => navigate("/signup")}>
          Doesn't have an account? Sign Up!
        </a>
      </div>
      <button onClick={() => navigate("/student")}>Student</button>
      <button onClick={() => navigate("/teacher")}>Teacher</button>
      <button onClick={() => navigate("/admin")}>Admin</button>
      <ToastContainer />
    </>
  );
}
