import './StudentPage.scss';
import Header from '../../components/header/Header';

export default function StudentPage() {
  return (
    <>
      <Header />
      <div className="courses">
        <h1 className="courses__header">Courses</h1>
        <ul className="courses__list">
          <li>
            <div className='courses__list__li__header'>header</div>
            <div className='courses__list__li__content'>content</div>
          </li>
          <li>
            <div className='courses__list__li__header'>header</div>
            <div className='courses__list__li__content'>content</div>
          </li>
          <li>
            <div className='courses__list__li__header'>header</div>
            <div className='courses__list__li__content'>content</div>
          </li>
        </ul>
      </div>
    </>
  )
}