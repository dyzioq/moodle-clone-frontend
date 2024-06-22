import './StudentPage.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';

export default function StudentPage() {
  const navigate = useNavigate();

  // async function getAllCourses() {
  //   const response = await fetch('https://localhost:7066/api/Courses');
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // }

  // async function getCourses(id : number) {
  //   const response = await fetch('https://localhost:7066/api/courses/id');
  //   const data = await response.json();
  //   return data;
  // }

  var list = [{name: "Kurs do języka javascript", description: "Jakiś tam content do kursu, opis itp"}, 
  {name: "Kurs Java", description: "Inny opis"}, 
  {name: "Kurs do języka C++", description: "Jeszcze inny opis"},
  {name: "Kurs C#", description: "Opis kursu C#"}];

  return (
    <>
      <Header />
      <div className="courses">
        <div className="courses__header"><h1>Courses</h1></div>
        <ul className="courses__list">
          {list.map((el, index) => 
          <li key={index} className='course' onClick={() => navigate("/student/repo", {state: {index}})}>
              <div className='course__header'><h2>{el.name}</h2></div>
              <div className='course__content'>{el.description}</div>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}