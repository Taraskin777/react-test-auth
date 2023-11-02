import { PrevNextPage } from "./styled";

import { useDispatch, useSelector } from "react-redux";
import { selectUserListState, setCurrentPage } from "../../store/userListSlice";

export const PrevNext = (): JSX.Element => {
  const dispatch = useDispatch();

  const state = useSelector(selectUserListState);

  const { currentPage, previous, next } = state;

  return (
    <PrevNextPage>
      <button
        onClick={() => {
          if (previous) {
            dispatch(setCurrentPage(currentPage - 1));
          }
        }}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          if (next) {
            dispatch(setCurrentPage(currentPage + 1));
          }
        }}
      >
        Next Page
      </button>
    </PrevNextPage>
  );
};
