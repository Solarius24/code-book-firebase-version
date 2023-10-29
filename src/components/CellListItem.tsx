// @ts-nocheck
import './CellListItem.css';
import CodeCell from './CodeCell';
import ActionBar from './ActionBar';

// interface CellListItemProps {
//   cell: Cell;
// }

const CellListItem = ({ cell }) => {
  let child: JSX.Element;
  if (cell.cellData.type === 'code') {
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
   
        <ActionBar id={cell.id} />
      </>
    );
  }

  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;