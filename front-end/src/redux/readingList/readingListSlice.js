import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: {
    wantToRead: [
      {
        id: 1,
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt and David Thomas",
      },
    ],
    currentlyReading: [
      {
        id: 2,
        title: "The Art of Computer Programming",
        author: "Donald Knuth",
      },
      { id: 3, title: "Clean Code", author: "Robert C. Martin" },
    ],
    finishedReading: [{ id: 4, title: "The Myth", author: "Chad Orzel" }],
  },
};

const readingListSlice = createSlice({
  name: "readingList",
  initialState,
  reducers: {
    addToReadingListSuccess: (state, action) => {},
    moveToAnotherListSuccess: (state, action) => {},
  },
});

// export const { addToReadingListSuccess, moveToAnotherListSuccess } = readingListSlice.actions;

export default readingListSlice.reducer;
