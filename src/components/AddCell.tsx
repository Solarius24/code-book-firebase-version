// @ts-nocheck
import "./AddCell.css";
import React from "react";
import { useDispatch } from "react-redux";
import { addCellToSessionStorage } from "../redux/CellsSlice";

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell = ({ forceVisible, previousCellId }: AddCellProps) => {
  const dispatch = useDispatch();

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => {
            dispatch(addCellToSessionStorage({previousCellId, type:"code"}));
          }}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => {
            dispatch(addCellToSessionStorage({previousCellId, type:"text"}));
          }}
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
