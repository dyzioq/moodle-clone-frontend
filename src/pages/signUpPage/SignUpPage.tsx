import { useState } from "react";
import "./SignUpPage.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderLogo from "../../components/header/HeaderLogo";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [inputName, setInputName] = useState<string>("");
  const [inputSurname, setInputSurname] = useState<string>("");

  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  async function addUser(
    name: string,
    surname: string,
    email: string,
    password: string
  ) {
    try {
      const response = await fetch("https://localhost:7066/api/User/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          surname: surname,
          email: email,
          password: password,
        }),
      });
      console.log(response);
      //const data = await response.json();

      if (!response.ok) {
        toast.error("Email or password is incorrect");
      } else {
        navigate("/student");

        //return data;
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Dodaj logikę obsługi formularza tutaj
    console.log("sign up Form submitted");

    addUser(inputName, inputSurname, inputEmail, inputPassword);
    //navigate("/student");
  };

  return (
    <>
      <HeaderLogo />
      <div className="login-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              type="text"
              id="name"
              name="name"
              required
            />
          </div>

          <div>
            <label htmlFor="surname">Surname</label>
            <input
              value={inputSurname}
              onChange={(e) => setInputSurname(e.target.value)}
              type="text"
              id="surname"
              name="surname"
              required
            />
          </div>

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
