import './App.css';
import {useState} from "react";

function App() {
  const [files, setFiles] = useState([]);
  const setFilesHelper = (fileList) => {
    const fileArray = [];
    for (let i = 0; i < fileList.length; i++) {
      fileArray.push(fileList[i]);
    }
    setFiles(fileArray);
  }
  console.log('files state', files);

  function handleFiles(event) {
    setFilesHelper(event.target.files);
  }

  return (
    <div className="App">
      <form>
        <input type="file" id="fileInput" multiple onChange={handleFiles}/>
      </form>
      <ul>
        {files.map(file => {
          const src = URL.createObjectURL(file);
          let previewComponent;
          if (file.type.startsWith('image/')) {
            previewComponent = <img alt="flesk" src={src} height={60} onLoad={() => URL.revokeObjectURL(src)} />
          } else if (file.type.startsWith('application/pdf')) {
            previewComponent = <iframe title={file.name} src={src} onLoad={() => URL.revokeObjectURL(src)} />
          } else {
            previewComponent = <div>{file.type} er ikke støttet</div>
          }
          return <li key={src}>
            <span>
              {previewComponent}
              {`${file.name}: ${file.size} bytes`}
            </span>
          </li>;
        })}
      </ul>
    </div>
  );
}

export default App;
