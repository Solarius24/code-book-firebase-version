// @ts-nocheck
import { useDispatch } from "react-redux";
import "./ActionBar.css";
import React from "react";
import { deleteCellFromSessionStorage, moveCell} from "../redux/CellsSlice";



interface ActionBarProps {
  id: string;
}

const ActionBar = ({ id }: ActionBarProps) => {
  const dispatch = useDispatch();
  const handleDeleteCell = (id) => {
    dispatch(deleteCellFromSessionStorage(id));
  };

  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => {dispatch(moveCell({id, direction:'up'}))}}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => {dispatch(moveCell({id, direction:'down'}))}}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => handleDeleteCell(id)}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
