import "./CodeCell.css";
import { useEffect } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./resizable";
import {
  useAppDispatch,
  useAppSelector,
} from "../hooks/useTypedSelectorAndDispatch";
import { useCumulativeCode } from "../hooks/useCumulativeCode";
import { updateCellToSessionStorage } from "../redux/CellsSlice";
import { RootState } from "../redux/store";
import { Cell } from "../typescript/cell";
import { createBundle } from "../redux/BundlerSlice";

const CodeCell = ({ cell }: { cell: Cell }) => {
  const dispatch = useAppDispatch();
  const bundle = useAppSelector((state: RootState) => state.bundler[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      dispatch(createBundle({ cellId: cell.id, cumulativeCode }));
      return;
    }

    const timer = setTimeout(async () => {
      dispatch(createBundle({ cellId: cell.id, cumulativeCode }));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) =>
              dispatch(updateCellToSessionStorage({ id: cell.id, value }))
            }
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
