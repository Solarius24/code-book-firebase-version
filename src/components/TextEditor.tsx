import "./TextEditor.css";
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useDispatch } from "react-redux";
import {
  updateCellToSessionStorage,
  isDataSavedStatus,
} from "../redux/CellsSlice";
import { Cell } from "../typescript/cell";

const TextEditor = ({cell}:{cell:Cell}) => {
  const [value, setValue] = useState(cell.content);
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  function updateHandler(value:any) {
    setValue(value);
    dispatch(updateCellToSessionStorage({ id: cell.id, value: value || "" }));
    dispatch(isDataSavedStatus(false));
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
        <MDEditor value={value} onChange={(value) => updateHandler(value)} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown
          source={cell.content || "CLICK TO OPEN TEXT EDITOR"}
        />
      </div>
    </div>
  );
};

export default TextEditor;
