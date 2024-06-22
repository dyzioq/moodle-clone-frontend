import styles from './TeacherRepoPage.module.scss';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';

export default function TeacherRepoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const index = location.state.index;
  console.log(index);

  function handleChangeFile(event: any) {
    console.log(event.target.files);
  }

  var list = [{title: "Zadanie 1", content: "Jakiś tam content do kursu, opis itp"},{title: "Zadanie 2", content: "Inny opis"},{title: "Zadanie 3", content: "Jeszcze inny opis"},{title: "Zadanie 4", content: "Opis kursu C#"}];

  return (
    <>
      <Header />
      <div className={styles.repo}>
        <div className={styles.repo__header}>
          <h1>Course name jfoisajfqajiowa</h1>
          <button className={styles['cbtn--repo-add']}><p>+</p></button>
        </div>
        <ul className={styles.tasks__list}>
          {list.map((el, index) => 
          <li key={index} className={styles.task} onClick={() => navigate("/teacher/repo", {state: {index}})}>
            <div className={styles.task__header}>
              <h2>{el.title}</h2>
              <button className={styles['cbtn--task']}>edit</button>
              <button className={styles['cbtn--task']}>delete</button>
            </div>
            <div className={styles.task__content}>{el.content}</div>
          </li>)}
        </ul>
        <div className='repo__file'>
          <input type="file" onChange={(event) => handleChangeFile(event)} multiple/>
        </div>
      </div>
    </>
  )
}