import React, { useState } from "react";

export default function FileManager() {
  const [files, setFiles] = useState(["App.js", "index.js"]);

  const addFile = () => {
    const name = prompt("Enter new file name:");
    if (name) setFiles([...files, name]);
  };

  const deleteFile = (file) => {
    setFiles(files.filter((f) => f !== file));
  };

  return (
    <div className="file-manager">
      <h3>Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file}>
            {file}
            <button onClick={() => deleteFile(file)}>❌</button>
          </li>
        ))}
      </ul>
      <button className="add-btn" onClick={addFile}>➕ Add File</button>
    </div>
  );
}
