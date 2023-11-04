// @ts-nocheck
import "./CodeCell.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./resizable";
import { updateCell } from "../redux/CellsSlice";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useCumulativeCode } from "../hooks/use-cumulative-code";
import { createBundle } from "../redux/BundlerSlice";
import useDebounce from "../hooks/useDebounce";
import { updateCellToSessionStorage } from "../redux/CellsSlice";

interface CodeCellProps {
  cell: {
    id: string;
    type: string;
    content: string;
  };
}

const CodeCell = ({ cell }) => {
  const dispatch = useDispatch();
  const bundle = useTypedSelector((state) => state.bundler[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);
  const { debaunce } = useDebounce();
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
            // onChange={debaunce(
            //   (value) => dispatch(updateCell({ id: cell.id, value })),
            //   2000
            // )}
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
