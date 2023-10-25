import { PageButton, PagesButtons, CurrentPage, Dots } from "./styled";

interface IPageButtons {
  pageNumbers: number[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (number: number) => void;
}

export const PageButtons = ({
  pageNumbers,
  currentPage,
  totalPages,
  handlePageChange,
}: IPageButtons): JSX.Element => {
  return (
    <PagesButtons>
      {pageNumbers.map((pageNumber) => {
        if (pageNumber === currentPage) {
          return <CurrentPage key={pageNumber}>{pageNumber}</CurrentPage>;
        }

        if (
          pageNumber <= 1 ||
          pageNumber === totalPages ||
          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
        ) {
          return (
            <PageButton
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              style={{ fontWeight: "normal" }}
            >
              {pageNumber}
            </PageButton>
          );
        } else if (
          (pageNumber === 2 && currentPage > 3) ||
          (pageNumber === totalPages - 1 && totalPages - currentPage > 2)
        ) {
          return <Dots key={pageNumber}>. . .</Dots>;
        }

        return null;
      })}
    </PagesButtons>
  );
};
