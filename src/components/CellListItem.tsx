import "./CellListItem.css";
import CodeCell from "./CodeCell";
import ActionBar from "./ActionBar";
import TextEditor from "./TextEditor";
import { Cell } from "../typescript/cell";

const CellListItem = ({cell}:{ cell:Cell}) => {
  let child: JSX.Element;
  if (cell.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
  }

  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
