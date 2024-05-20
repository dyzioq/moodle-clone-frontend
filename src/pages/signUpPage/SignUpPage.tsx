import { useState } from "react";
import "./SignUpPage.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  async function addUser(email: string, password: string) {
    try {
      const response = await fetch("https://localhost:7066/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log(response);
      const data = await response.json();

      return data;
    } catch {
      toast.error("Email or password is incorrect");
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Dodaj logikę obsługi formularza tutaj
    console.log("Form submitted");

    addUser(inputEmail, inputPassword);
    //navigate("/student");
  };

  return (
    <>
      <div className="login-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              type="text"
              id="username"
              name="username"
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
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <a href="" onClick={() => navigate("/")}>
          Already have an account? Login!
        </a>
      </div>
      <button onClick={() => navigate("/student")}>Student</button>
      <button onClick={() => navigate("/teacher")}>Teacher</button>
      <ToastContainer />
    </>
  );
}
