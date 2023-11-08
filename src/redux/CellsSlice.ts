// @ts-nocheck
import { createSlice, nanoid } from "@reduxjs/toolkit";
import db from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

// fetch cell
export const fetchCellsFromFirestore = createAsyncThunk(
  "cells/fetchCellsFromFirestore",
  async () => {
    const docRef = doc(db, "codeBook", "oZwRgHFwztEbaPt4awo0");
    const docSnap = await getDoc(docRef);
    const cells = docSnap.data();
    return cells;
  }
);

// interface CellsState {
//   name:string,
//   initialState:{
//     cellsArray: {
//       id: string;
//       cellData: {
//         type: "code" | "text";
//         constent: string;
//       }[];
//     };
//   }

// }

const cellsSlice = createSlice({
  name: "Cells",
  initialState: {
    cellsArray: [],
    isDataSaved: true,
    orderArray: [],
  },
  reducers: {
    fetchCellsFromSessionStorage: (state) => {
      const dataFromSesionStorage = JSON.parse(
        sessionStorage.getItem("codeBookData")
      );
      const { cellsArray, orderArray } = dataFromSesionStorage;
      state.cellsArray = cellsArray;
      state.orderArray = orderArray;
    },
    addCellToSessionStorage: (state, action) => {
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

      sessionStorage.setItem("codeBookData", JSON.stringify(state));
    },
    isDataSavedStatus: (state, action) => {
      state.isDataSaved = action.payload;
      sessionStorage.setItem("codeBookData", JSON.stringify(state))
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
    },
    // insertCellAfter: (state, action) => {
    //   console.log("inser cell");
    //   const cell: Cell = {
    //     content: "",
    //     type: action.payload.type,
    //     id: randomId(),
    //   };

    //   state.data[cell.id] = cell;
    //   const foundIndex = state.orderArray.findIndex(
    //     (id) => id === action.payload.id
    //   );
    //   if (foundIndex < 0) {
    //     state.orderArray.order.unshift(cell.id);
    //   } else {
    //     state.orderArray.order.splice(foundIndex + 1, 0, cell.id);
    //   }
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCellsFromFirestore.fulfilled, (state, action) => {
      state.cellsArray = action.payload.cellsArray;
      state.orderArray = action.payload.orderArray;
      state.isDataSaved = action.payload.isDataSaved;
    });
  },
});
export const {
  addCellToSessionStorage,
  updateCellToSessionStorage,
  deleteCellFromSessionStorage,
  fetchCellsFromSessionStorage,
  isDataSavedStatus,
  insertCellAfter,
  moveCell,
} = cellsSlice.actions;
export default cellsSlice.reducer;
