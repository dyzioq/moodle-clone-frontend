import './StudentPage.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';

export default function StudentPage() {
  const navigate = useNavigate();
  const [list, setList] = useState(([{id: 1, name: "Kurs do języka javascript", description: "Jakiś tam content do kursu, opis itp"},]));

  var token = "CfDJ8CvtbO1npDNFkEzFaPFn4rtcZr0SLX0xei8XRlsnGTYL6M-3Oe2LIJWlijPOXvZqIhRiV7EWAFX9jkVnngogBMlIwZqQSHQUgG1KESQxF2KsU-3AW9uUC3migClUwoSwqYdv-hS64DqTYYFq0e0KbcaKAsCez53-n7SJgNLlP64hCPNiK8hFQotz3Qp4fZzcRL3uHb9i5s2b1y3yK66xUJX6g7xjTvMrIcVJ27ov-x1uWrybrVev_FvUdE_u9tg8xPkvDVRtBHoQAqTVItycBclcZgYGQiUW3vhAbMbyBc3IbEQqYoUi052Kahni3sRVA3COINyiYZ1Mv8zH0j9qLxY5LmWUWITgqIaX0rr_ib9bGNKS12tJRyqxoJJqxk44Xc1AhiueG2XDVtEbTvXiH4RG6GE2VBz9bgbmKzuv2-RW1a_Qb81tu6E0ENyOK2gyzIm2uCOAWqYSeo7drSXM-52eOCT6l4IdLi-Op1LeGzlGSkjvaqsXsYoBfruSzbjb7m2rvRAs5_ucEUjNdj-cNDWfx8HagaE91ZCx5Rnr-NQwc8nF-kUeQv8zz81qJ4J1dxNSJrnwqs8M6Xm5L5FOdBmn7dItLKmkHZ1D6kMOdUFkrL4Yg4r0waXc7mkiPfqBiO3v7_8LTdwdLXRpen_y2T11Ng1jgRQUllvFvD4Lj"

  var token = localStorage.getItem("token") || "a";
  token = token.replace(/['"]+/g, "");

  async function getCourses() {
    const response = await fetch('https://localhost:7066/api/User/student/courses', {method: 'GET', 
      headers: { "Authorization": `Bearer ${token}` }});
    const data = await response.json();
    setList(data);
    return data;
  }

  // async function getCourses(id : number) {
  //   const response = await fetch('https://localhost:7066/api/courses/id');
  //   const data = await response.json();
  //   return data;
  // }

  useEffect(() => {getCourses();}, []);
  useEffect(() => {console.log(list)}, [list]);

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