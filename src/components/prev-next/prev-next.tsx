import { PrevNextPage } from "./styled";

import { useDispatch, useSelector } from "react-redux";
import { selectUserListState, setCurrentPage } from "../../store/userListSlice";
import { useState, useEffect } from "react";

interface TotalPages {
  totalPages: number;
}

export const PrevNext = ({ totalPages }: TotalPages): JSX.Element => {
  const dispatch = useDispatch();

  const [firstPage, setFirstPage] = useState<boolean>(false);
  const [lastPage, setLastPage] = useState<boolean>(false);

  const state = useSelector(selectUserListState);

  const { currentPage, previous, next } = state;

  useEffect(() => {
    setFirstPage(currentPage === 1);
    if (currentPage === totalPages) {
      setLastPage(true);
    } else {
      setLastPage(false);
    }
  }, [currentPage]);


  return (
    <PrevNextPage>
      <button
        onClick={() => {
          if (previous) {
            dispatch(setCurrentPage(currentPage - 1));
          }
        }}
        disabled={firstPage}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          if (next) {
            dispatch(setCurrentPage(currentPage + 1));
          }
        }}
        disabled={lastPage}
      >
        Next Page
      </button>
    </PrevNextPage>
  );
};
