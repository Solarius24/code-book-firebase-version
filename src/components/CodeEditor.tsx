// @ts-nocheck
import "./CodeEditor.css";
import "./syntax.css";
import { useRef } from "react";
import { Editor } from "@monaco-editor/react";
// import parser from 'prettier/parser-babel';
// import codeShift from 'jscodeshift';
// import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor = ({ onChange, initialValue }: CodeEditorProps) => {
  const editorRef = useRef(null);
    const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getValue();
    }
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
      ></Editor>
    </div>
  );

  // const editorRef = useRef<any>();

  // const onEditorDidMount = (getValue:any, monacoEditor:any) => {
  //   editorRef.current = monacoEditor;
  //   monacoEditor.onDidChangeModelContent(() => {
  //     console.log("monaco editor on change")
  //     onChange(getValue());
  //   });

  //   monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

  //   // const highlighter = new Highlighter(
  //   //   // @ts-ignore
  //   //   window.monaco,
  //   //   codeShift,
  //   //   monacoEditor
  //   // );
  //   // highlighter.highLightOnDidChangeModelContent(
  //   //   () => {},
  //   //   () => {},
  //   //   undefined,
  //   //   () => {}
  //   // );
  // };



  //   //format that value
  //   const formatted = prettier
  //     .format(unformatted, {
  //       parser: 'babel',
  //       plugins: [parser],
  //       useTabs: false,
  //       semi: true,
  //       singleQuote: true,
  //     })
  //     .replace(/\n$/, '');

  //   editorRef.current.setValue(formatted);
  // };

  // return (
  //   <div className="editor-wrapper">
  //     <button
  //       className="button button-format is-primary is-small"
  //       onClick={onFormatClick}
  //     >
  //       Format
  //     </button>
  //     <MonacoEditor
  //       editorDidMount={onEditorDidMount}
  //       value={initialValue}
  //       theme="vs-dark"
  //       language="javascript"
  //       height="100%"
  //       options={{

  //         wordWrap: 'on',
  //         minimap: { enabled: false },
  //         showUnused: false,
  //         folding: false,
  //         lineNumbersMinChars: 3,
  //         fontSize: 16,
  //         scrollBeyondLastLine: false,
  //         automaticLayout: true,
  //       }}
  //     />
  //   </div>
  // );
};

export default CodeEditor;
