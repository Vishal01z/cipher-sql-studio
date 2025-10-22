import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

export default function Editor({ files, setFiles }) {
  return (
    <div style={{ height: "500px", border: "1px solid #ccc", marginTop: "20px" }}>
      <Sandpack
        template="react"
        files={files}
        options={{
          editorHeight: 500,
          showLineNumbers: true,
          showInlineErrors: true,
        }}
        onFileChange={(fileName, code) => {
          setFiles({ ...files, [fileName]: { code } });
        }}
      />
    </div>
  );
}
