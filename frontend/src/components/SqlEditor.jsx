import Editor from "@monaco-editor/react";

export default function SqlEditor({ query, setQuery, darkMode }) {
  return (
    <Editor
      height="300px"
      language="sql"
      theme={darkMode ? "vs-dark" : "light"}
      value={query}
      onChange={(value) => setQuery(value)}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
      }}
    />
  );
}
