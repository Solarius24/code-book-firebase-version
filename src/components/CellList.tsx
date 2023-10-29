// @ts-nocheck
import "./CellList.css";
import { Fragment, useEffect } from "react";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCellsFromFirestore } from "../redux/CellsSlice";

const CellList = () => {
  const data = useSelector((state) => state.cells.cellsArray);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCellsFromFirestore());
  }, [dispatch]);

  const renderedCells = data.map((cell) => (
    <Fragment key={cell.cellData.id}>
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
