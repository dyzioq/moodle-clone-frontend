import './Header.scss';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className='header'>
        <div className='header__logo' onClick={() => navigate('/')}>Moodyl</div>
        <div className='header__search' onClick={(e) => e.stopPropagation()}>
            &#128269;
            <input></input>
        </div>
        <div className='header__profile' onClick={(e) => e.stopPropagation()}></div>
    </div>
  )
}