// @ts-nocheck
import "./CellList.css";
import { Fragment, useEffect } from "react";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCellsFromFirestore } from "../redux/CellsSlice";
import { fetchCellsFromSessionStorage } from "../redux/CellsSlice";

const CellList = () => {
  const data = useSelector((state) => state.cells.cellsArray);
  console.log("CELL LIST DATA",data)

  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionStorage.getItem("codeBookData")) {
      console.log("session storage")
      dispatch(fetchCellsFromSessionStorage());
    } else {
      dispatch(fetchCellsFromFirestore());
    }
  }, [dispatch]);

  const renderedCells = data.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={data.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
