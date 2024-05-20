import Header from "../../components/header/Header";
import "./SignUpPage.scss";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Dodaj logikę obsługi formularza tutaj
    console.log("Form submitted");
  };

  return (
    <>
      <div className="login-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <a href="" onClick={() => navigate("/")}>
          Alredy have an account? Login!
        </a>
      </div>
      <button onClick={() => navigate("/student")}>Student</button>
      <button onClick={() => navigate("/teacher")}>Teacher</button>
    </>
  );
}
