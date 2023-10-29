// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import db from "../firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

// add cell to firestore
export const addCellToFirestore = createAsyncThunk(
  "cells/addCellToFirestore",
  async (cellData) => {
    const addCellRef = await addDoc(collection(db, "codeBook"), cellData);
    const newCell = { id: addCellRef.id, cellData };
    return newCell;
  }
);

// fetch cell
export const fetchCellsFromFirestore = createAsyncThunk(
  "cells/fetchCellsFromFirestore",
  async () => {
    const querySnapshot = await getDocs(collection(db, "codeBook"));
    const cells = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      cellData: doc.data(),
    }));
    return cells;
  }
);

// delete cell
export const deleteCellFromFirestore = createAsyncThunk(
  "cells/deleteCellFromFirestore",
  async (id) => {
    const cells = await getDocs(collection(db, "codeBook"));
    for (let snap of cells.docs) {
      if (snap.id === id) {
        await deleteDoc(doc(db, "codeBook", snap.id));
      }
    }
    return id;
  }
);

// delete all cells
export const deleteAllCells = createAsyncThunk(
  "cells/deleteAllCells",
  async () => {
    const cells = await getDocs(collection(db, "codeBook"));
    for (var snap of cells.docs) {
      await deleteDoc(doc(db, "codeBook", snap.id));
    }
    return [];
  }
);

// update cell
export const updateCell = createAsyncThunk(
  "cells/updateCell",
  async ({ id, value }) => {
    console.log("state update")
    const cells = await getDocs(collection(db, "codeBook"));
    for (let snap of cells.docs) {
      if (snap.id === id) {
        const cellRef = doc(db, "codeBook", snap.id);
        await updateDoc(cellRef, {content:value});
      }
    }
    return { id:id, value:value };
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
  },
  // reducers: {

  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCellsFromFirestore.fulfilled, (state, action) => {
        state.cellsArray = action.payload;
      })
      .addCase(addCellToFirestore.fulfilled, (state, action) => {
        state.cellsArray.push(action.payload);
      })
      .addCase(deleteCellFromFirestore.fulfilled, (state, action) => {
        state.cellsArray = state.cellsArray.filter(
          (cell) => cell.id !== action.payload
        );
      })
      .addCase(deleteAllCells.fulfilled, (state, action) => {
        state.cellsArray = action.payload;
      })
      .addCase(updateCell.fulfilled, (state, action) => {
        const { id, value } = action.payload;
        const cellIndex = state.cellsArray.findIndex((cell) => cell.id === id);
        if (cellIndex !== -1) {
          state.cellsArray[cellIndex].cellData.content = value;
        }
      })
  },
});

export default cellsSlice.reducer;
