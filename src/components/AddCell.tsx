// @ts-nocheck
import "./AddCell.css";
import React from "react";
import { useDispatch } from "react-redux";
import { addCellToFirestore } from "../redux/CellsSlice";

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell = ({ forceVisible, previousCellId }: AddCellProps) => {
  const dispatch = useDispatch();

  const handleAddCodeCell = () => {
    let cellData = { type: "code", content: "" };
    dispatch(addCellToFirestore(cellData));
  };
  const handleAddTextCell = () => {
    let cellData = { type: "text", content: "" };
    dispatch(addCellToFirestore(cellData));
  };

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={handleAddCodeCell}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={handleAddTextCell}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
