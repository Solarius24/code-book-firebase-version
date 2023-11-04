// @ts-nocheck
import "./TextEditor.css";
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Cell } from "../state";
import { useDispatch } from "react-redux";
import { updateCell } from "../redux/CellsSlice";
import useDebounce from "../hooks/useDebounce";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor = ({ cell }): TextEditorProps => {
  const [value, setValue] = useState(cell.cellData.content);
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const { debaunce } = useDebounce();

  function updateHandler(v) {
    setValue(v);
    debaunce(dispatch(updateCell({ id: cell.id, value: value || "" })), 2000);
  }

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={value}
          // onChange={(value) =>
          //   dispatch(updateCell({ id: cell.id, value: value || "" }))
          // }
          onChange={updateHandler}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown
          source={cell.cellData.content || "CLICK TO OPEN TEXT EDITOR"}
        />
      </div>
    </div>
  );
};

export default TextEditor;
