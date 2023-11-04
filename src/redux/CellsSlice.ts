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
  getDoc,
} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";


//send data to FIRESTORE
export const sendCellsToFirestore = createAsyncThunk(
  "cells/sendCellsToFirestore", async () => {

  }
)

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
    const docRef = doc(db, "codeBook", "oZwRgHFwztEbaPt4awo0");
    const docSnap = await getDoc(docRef);
    const cells = docSnap.data().code;
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
    const cells = await getDocs(collection(db, "codeBook"));
    for (let snap of cells.docs) {
      if (snap.id === id) {
        const cellRef = doc(db, "codeBook", snap.id);
        await updateDoc(cellRef, { content: value });
      }
    }
    return { id: id, value: value };
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
  reducers: {
    fetchCellsFromSessionStorage: (state) => {
      const dataFromSesionStorage = JSON.parse(sessionStorage.getItem("codeBookData"))
      const {cellsArray} = dataFromSesionStorage
      state.cellsArray = cellsArray
  
    
    },
    addCellToSessionStorage: (state, action) => {
      state.cellsArray.push(action.payload);
      sessionStorage.setItem("codeCellData", JSON.stringify(state));
    },

    updateCellToSessionStorage: (state, action) => {
      const { id, value } = action.payload;
      const cellIndex = state.cellsArray.findIndex((cell) => cell.id === id);
      if (cellIndex !== -1) {
        state.cellsArray[cellIndex].content = value;
        sessionStorage.setItem("codeBookData", JSON.stringify(state));
      }
    },
    deleteCellFromSessionStorage: (state) => {
      state.cellsArray = state.cellsArray.filter(
        (cell) => cell.id !== action.payload
      );
      sessionStorage.setItem("codeBookData", JSON.stringify(state));
    },
  },
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
      });
  },
});
export const {
  addCellToSessionStorage,
  updateCellToSessionStorage,
  deleteCellFromSessionStorage,
  fetchCellsFromSessionStorage,
} = cellsSlice.actions;
export default cellsSlice.reducer;
