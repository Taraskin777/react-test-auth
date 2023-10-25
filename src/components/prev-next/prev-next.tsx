import { PrevNextPage } from "./styled";

interface IPrevNext {
  prev: string | null;
  next: string | null;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

export const PrevNext = ({
  prev,
  next,
  setCurrentPage,
  currentPage,
}: IPrevNext): JSX.Element => {
  return (
    <PrevNextPage>
      <button
        onClick={() => {
          if (prev) {
            setCurrentPage(currentPage - 1);
          }
        }}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          if (next) {
            setCurrentPage(currentPage + 1);
          }
        }}
      >
        Next Page
      </button>
    </PrevNextPage>
  );
};
