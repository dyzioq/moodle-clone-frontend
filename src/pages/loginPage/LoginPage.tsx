import './LoginPage.scss';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <div className="login">
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                <button type="submit">Login</button>
            </form>
            <button onClick={() => navigate("/student")}>Student</button>
            <button onClick={() => navigate("/teacher")}>Teacher</button>
        </div>
    )
}