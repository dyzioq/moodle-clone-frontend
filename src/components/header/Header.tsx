import './Header.scss';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className='header' onClick={() => navigate("/")}>
        <div className='header__logo'>Moodyl</div>
        <div className='header__search' onClick={(e) => e.stopPropagation()}>
            &#128269;
            <input></input>
        </div>
        <div className='header__profile' onClick={(e) => e.stopPropagation()}></div>
    </div>
  )
}