import Header from '../../components/header/Header';
import styles from './StudentRepoPage.module.scss';

export default function StudentRepoPage() {

  function handleChangeFile(event: any) {
    console.log(event.target.files);
  }
  var list = [{title: "Zadanie 1", content: "Jakiś tam content do kursu, opis itp"},{title: "Zadanie 2", content: "Inny opis"},{title: "Zadanie 3", content: "Jeszcze inny opis"},{title: "Zadanie 4", content: "Opis kursu C#"}];

  var token = localStorage.getItem("token") || "a";
  token = token.replace(/['"]+/g, "");

  return (
    <>
      <Header />
      <div className={styles.repo}>
        <div className={styles.repo__header}>
          <h1>Course name jfoisajfqajiowa</h1>
        </div>
        <ul className={styles.tasks__list}>
          {list.map((el, index) => 
          <li key={index} className={styles.task}>
            <div className={styles.task__header}>
              <h2>{el.title}</h2>
            </div>
            <div className={styles.task__content}>{el.content}</div>
          </li>)}
        </ul>
        <div className='repo__file'>
          <input type="file" onChange={(event) => handleChangeFile(event)} multiple/>
          <button>Upload</button>
        </div>
      </div>
    </>
  )
}