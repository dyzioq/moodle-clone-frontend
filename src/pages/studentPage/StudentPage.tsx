import './StudentPage.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';

export default function StudentPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="courses">
        <h1 className="courses__header">Courses</h1>
        <ul className="courses__list">
          <li className='courses__list__li' onClick={() => navigate("/student/repo")}>
            <div className='courses__list__li__header'>header</div>
            <div className='courses__list__li__content'>content</div>
          </li>
          <li className='courses__list__li' onClick={() => navigate("/student/repo")}>
            <div className='courses__list__li__header'>header</div>
            <div className='courses__list__li__content'>content</div>
          </li>
          <li className='courses__list__li' onClick={() => navigate("/student/repo")}>
            <div className='courses__list__li__header'>header</div>
            <div className='courses__list__li__content'>content</div>
          </li>
        </ul>
      </div>
    </>
  )
}