import "./CellList.css";
import { Fragment, useEffect } from "react";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import { fetchCellsFromFirestore } from "../redux/CellsSlice";
import { fetchCellsFromSessionStorage } from "../redux/CellsSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../hooks/useTypedSelectorAndDispatch";

const CellList = () => {
  //make this code more clear and simple
  const data = useAppSelector((state) => state.cells.cellsArray);
  const userId = useAppSelector((state) => state.auth.userId)

  const cellsDisplayOrder = useAppSelector((state) => state.cells.orderArray);
  const dataToDisplay = cellsDisplayOrder.map((id) => {
    return data.filter((item) => item.id === id);
  });
  const orderDataToDisplay = [];
  for (let i = 0; i < dataToDisplay.length; i++) {
    orderDataToDisplay.push(dataToDisplay[i][0]);
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("codeBookData") && userId) {
      dispatch(fetchCellsFromSessionStorage());
    } else if(userId) {
      dispatch(fetchCellsFromFirestore(userId));
    }
  }, [dispatch]);

  const renderedCells = orderDataToDisplay.map((cell) => (
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
