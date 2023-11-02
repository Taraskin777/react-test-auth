import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";


interface Results {
  id: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

interface Data {
  resultsPerPage: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: Results[];
  currentPage: number;
  editingUser: Results | null;
}

const initialState: Data = {
  previous: "",
  next: "",
  count: 0,
  currentPage: 1,
  results: [],
  resultsPerPage: 10,
  editingUser: null,
};

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    setData(state: Data, action) {
      state.results = action.payload.results;
      state.count = action.payload.count;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
    },
    setCurrentPage(state: Data, action) {
      state.currentPage = action.payload;
    },
    setEditingUser(state: Data, action) {
      state.editingUser = action.payload;
    },
  },
});

export const { setCurrentPage, setData, setEditingUser } =
  userListSlice.actions;

export const selectUserListState = (state: AppState) => state.userList;

export default userListSlice.reducer;
