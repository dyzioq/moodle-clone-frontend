import './TeacherRepoPage.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';

export default function TeacherRepoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const index = location.state.index;
  console.log(index);

  function handleChangeFile(event: any) {
    console.log(event.target.files);
  }
  return (
    <>
      <Header />
      <div className="repo">
        <h1 className="repo__header">Course name jfoisajfqajiowa</h1>
        <div className='repo__file'>
          <input type="file" onChange={(event) => handleChangeFile(event)} multiple/>
          <button>Upload</button>
        </div>
      </div>
    </>
  )
}