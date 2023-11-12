// @ts-ignore
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import db from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collectionCellData } from "../firebase/config";

interface CellsState {
  cellsArray: {
    id: string;
    content: string;
    type: "code" | "text";
  }[];
  isDataSaved: boolean;
  orderArray: string[];
}

const initialState: CellsState = {
  cellsArray: [
    {
      content:
        'import { useState } from "react";\r\nconst Counter = () => {\r\n    const [count, setCount] = useState(0)\r\n    return (\r\n        <div>\r\n            <button onClick={()=> setCount(count +1)}>Click</button>\r\n            <h3>Count: {count}</h3>\r\n        </div>\r\n    )\r\n}\r\nshow(<Counter/>)',
      type: "code",
      id: "ztest01",
    },
    {
      content:
        "const App = () => {\r\n    return (\r\n        <div>\r\n            <h3>App Says Hi</h3>\r\n            <i>Counter componenet will be rendered below...</i>\r\n            <hr></hr>\r\n            <Counter/>\r\n        </div>\r\n    )\r\n}\r\n\r\nshow(<App/>)",
      type: "code",
      id: "ztest02",
    },
  ],
  isDataSaved: true,
  orderArray: ["ztest01", "ztest02"],
};

// fetch cell
export const fetchCellsFromFirestore = createAsyncThunk(
  "cells/fetchCellsFromFirestore",
  async (userId: string) => {
    console.log("data from firestore");
    // const docRef = doc(db,collectionCellData,userId)
    const docRef = doc(db, "codeBook", "Wc5IToceGTgsWV5mmnj3J1wo2Fm1");
    const docSnap = await getDoc(docRef);
    const cells = docSnap.data();
    console.log(cells);
    return cells;
  }
);

const cellsSlice = createSlice({
  name: "Cells",
  initialState,
  reducers: {
    fetchCellsFromSessionStorage: (state) => {
      let codeBookData = sessionStorage.getItem("codeBookData");
      if (codeBookData) {
        const dataFromSesionStorage = JSON.parse(codeBookData);
        const { cellsArray, orderArray } = dataFromSesionStorage;
        state.cellsArray = cellsArray;
        state.orderArray = orderArray;
      }
      // const dataFromSesionStorage:CellsState = JSON.parse(
      //   sessionStorage.getItem("codeBookData")
      // );
      // const { cellsArray, orderArray } = dataFromSesionStorage;
      // state.cellsArray = cellsArray;
      // state.orderArray = orderArray;
    },

    addCellToSessionStorage: (
      state,
      action: PayloadAction<{ type: "code" | "text"; previousCellId: string }>
    ) => {
      const id = nanoid();
      let cellData = { id: id, type: action.payload.type, content: "" };
      // state.cellsArray[cell.id] = cell;

      state.cellsArray.push(cellData);
      const foundIndex = state.orderArray.findIndex(
        (id) => id === action.payload.previousCellId
      );
      if (foundIndex < 0) {
        state.orderArray.unshift(cellData.id);
      } else {
        state.orderArray.splice(foundIndex + 1, 0, cellData.id);
      }
      return sessionStorage.setItem("codeCellData", JSON.stringify(state));
    },

    updateCellToSessionStorage: (state, action) => {
      state.isDataSaved = false;
      const { id, value } = action.payload;
      const cellIndex = state.cellsArray.findIndex((cell) => cell.id === id);
      if (cellIndex !== -1) {
        state.cellsArray[cellIndex].content = value;
        sessionStorage.setItem("codeBookData", JSON.stringify(state));
      }
    },
    deleteCellFromSessionStorage: (state, action) => {
      state.cellsArray = state.cellsArray.filter(
        (cell) => cell.id !== action.payload
      );
      state.orderArray = state.orderArray.filter(
        (cell) => cell !== action.payload
      );
      state.isDataSaved = false;

      sessionStorage.setItem("codeBookData", JSON.stringify(state));
    },
    isDataSavedStatus: (state, action) => {
      state.isDataSaved = action.payload;
      sessionStorage.setItem("codeBookData", JSON.stringify(state));
    },
    moveCell: (state, action) => {
      const direction = action.payload.direction;
      const index = state.orderArray.findIndex(
        (id) => id === action.payload.id
      );
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.orderArray.length - 1) {
        return state;
      }
      state.orderArray[index] = state.orderArray[targetIndex];
      state.orderArray[targetIndex] = action.payload.id;
      return state
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCellsFromFirestore.fulfilled, (state, action) => {
      if (action.payload) {
        state.cellsArray = action.payload.cellsArray;
        state.orderArray = action.payload.orderArray;
        state.isDataSaved = action.payload.isDataSaved;
      }
    });
  },
});
export const {
  addCellToSessionStorage,
  updateCellToSessionStorage,
  deleteCellFromSessionStorage,
  fetchCellsFromSessionStorage,
  isDataSavedStatus,
  moveCell,
} = cellsSlice.actions;
export default cellsSlice.reducer;
