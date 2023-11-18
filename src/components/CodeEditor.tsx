import "./CodeEditor.css";
import "./syntax.css";
import { useRef } from "react";
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginEstree from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";
import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor = ({ onChange, initialValue }: CodeEditorProps) => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: null) {
    editorRef.current = editor;
  }

  const onFormatClick = async () => {
    // @ts-ignore
    const unformatted = editorRef.current.getValue();
    const formatted = await prettier.format(unformatted, {
      parser: "babel",
      plugins: [prettierPluginBabel, prettierPluginEstree],
      useTabs: true,
    });
    // @ts-ignore
    editorRef.current.setValue(formatted);
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
        // @ts-ignore
        onChange={onChange}
                // @ts-ignore
        onMount={handleEditorDidMount}
      ></Editor>
    </div>
  );
};

export default CodeEditor;
