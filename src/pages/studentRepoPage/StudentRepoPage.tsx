import Header from '../../components/header/Header';
import styles from './StudentRepoPage.module.scss';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

export default function StudentRepoPage() {
  var location = useLocation();

  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  function handleChangeFile(event : any) {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
    setFileUploaded(false);
  }

  var courseId = location.state.courseId;
  const [list, setList] = useState(([{courseId : 0, assignmentId: 0, name: "Zad1", description: "Jakiś tam content do zadania, opis itp", deadline : ''},]));

  var token = localStorage.getItem("token") || "a";
  token = token.replace(/['"]+/g, "");

  async function getAssignments() {
    try {
    const response = await fetch(`https://localhost:7066/api/course/${courseId}/assignments`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const data = await response.json();
    setList(data);
    console.log(data);
    return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  async function sendFiles(courseId : number, assignmentId : number, event : any) { 
    event.preventDefault();
  
    if (!file) {
      toast.error("No file selected");
      console.error('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch(`https://localhost:7066/api/course/${courseId}/assignments/${assignmentId}/submissions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });
  
      if (!response.ok) {
        toast.error("Failed to upload file.");
        throw new Error('Failed to upload file');
      }
  
      console.log('File uploaded successfully');
      toast.success("File uploaded successfully");
      setFileUploaded(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  useEffect(() => {getAssignments()}, []);

  return (
    <>
      <ToastContainer />
      <Header />
      <div className={styles.repo}>
        <div className={styles.repo__header}>
          <h1>{location.state.courseName}</h1>
        </div>
        <ul className={styles.tasks__list}>
          {list.map((el, index) => 
          <li key={index} className={styles.task}>
            <div className={styles.task__header}>
              <h2>{el.name}</h2>
            </div>
            <div className={styles.task__content}>{el.description}</div>
            <div className={styles['task__files']}>
              <input type="file" onChange={(event) => handleChangeFile(event)} multiple/>
              <button className={`${styles['task__btn-upload']} ${fileUploaded ? styles['task__btn-uploaded'] : ''}`} onClick={(event) => {sendFiles(courseId, el.assignmentId, event)}}>Upload</button>
            </div>
          </li>)}
        </ul>
      </div>
    </>
  )
}