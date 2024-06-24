import { useState } from "react";
import "../loginPage/LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderLogo from "../../components/header/HeaderLogo";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputCode, setInputCode] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Dodaj logikę obsługi formularza tutaj
    console.log("reset password Form submitted");

    try {
      const response = await fetch("https://localhost:7066/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputEmail,
          resetCode: inputCode,
          newPassword: inputPassword,
        }),
      });

      if (!response.ok) {
        toast.error("Email or password is incorrect");
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <HeaderLogo />
      <div className="login-form">
        <h1>Reset Password</h1>
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
            <label htmlFor="code">Code</label>
            <input
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              type="text"
              id="code"
              name="code"
              required
            />
          </div>

          <div>
            <label htmlFor="password">New Password</label>
            <input
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <button onClick={() => navigate("/student")}>Student</button>
      <button onClick={() => navigate("/teacher")}>Teacher</button>
      <button onClick={() => navigate("/admin")}>Admin</button>
      <ToastContainer />
    </>
  );
}
