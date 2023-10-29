// @ts-nocheck
import "./CodeEditor.css";
import "./syntax.css";
import { useRef } from "react";
import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor = ({ onChange, initialValue }: CodeEditorProps) => {
  const editorRef = useRef(null);
  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getValue();
  };


  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        height="100%"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={initialValue}
        onChange={onChange}
        // onChange={delay}
      ></Editor>
    </div>
  );
};

export default CodeEditor;
