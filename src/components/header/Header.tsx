import './Header.scss';

export default function Header() {
  return (
    <div className='header'>
        <div className='header__logo'>Moodyl</div>
        <div className='header__search'>
            &#128269;
            <input></input>
        </div>
        <div className='header__profile'></div>
    </div>
  )
}