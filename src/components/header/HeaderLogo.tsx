import "./Header.scss";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header__logo" onClick={() => navigate("/")}>
        Moodyl
      </div>
    </div>
  );
}
