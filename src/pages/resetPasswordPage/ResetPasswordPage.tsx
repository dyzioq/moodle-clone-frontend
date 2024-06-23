import { useState } from "react";
import "../loginPage/LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Modal, Form, Button } from "react-bootstrap";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputForgotEmail, setForgotEmail] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Dodaj logikę obsługi formularza tutaj
    console.log("Form submitted");

    // if (inputEmail !== "john@example.com") {
    //   toast.error("Incorrect email or password!");
    // } else if (inputPassword !== "Polo1#") {
    //   toast.error("Incorrect email or password!");
    // } else {
    //   navigate("/student");
    // }

    try {
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
      console.log("Success:", result);

      navigate("/student");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Show forgot password modal
  const [showForgotPassword, setForgotPassword] = useState(false);

  const handleCloseForgotPassword = () => setForgotPassword(false);
  const handleShowForgotPassword = () => setForgotPassword(true);

  const handleForgotPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("https://localhost:7066/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputEmail,
        }),
      });

      if (!response.ok) {
        toast.error("Email or password is incorrect");
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Success:", result);

      navigate("/student");
    } catch (error) {
      console.log(error);
    }

    handleCloseForgotPassword();
    navigate("/resetPassword");
  };

  return (
    <>
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
