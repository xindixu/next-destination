import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl
} from "react-bootstrap";

const getPreviousPages = currentPage => {
  if (currentPage === 1) {
    return [];
  }
  if (currentPage === 2) {
    return [1];
  }

  return [currentPage - 3, currentPage - 2, currentPage - 1];
};

const getNextPages = (currentPage, totalPages) => {
  if (currentPage + 1 === totalPages) {
    return [currentPage + 1];
  }

  if (currentPage + 2 === totalPages) {
    return [currentPage + 1, currentPage + 2];
  }

  return [currentPage + 1, currentPage + 2, currentPage + 3];
};

const Pagination = ({ totalPages, loadPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationButtons = [
    ...getPreviousPages(currentPage),
    currentPage,
    ...getNextPages(currentPage, totalPages)
  ];

  const goToPage = num => {
    setCurrentPage(num);
    loadPage(num);
  };

  return (
    <>
      <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <ButtonGroup aria-label="Pages">
          <Button
            variant="outline-primary"
            onClick={() => goToPage(1)}
            type="button"
            aria-label="go to first page"
          >
            First
          </Button>
          {paginationButtons.map(num => (
            <Button
              variant="outline-primary"
              onClick={() => goToPage(num)}
              key={num}
              type="button"
              className={num === currentPage ? "active" : ""}
              aria-label={`go to page ${num}`}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline-primary"
            onClick={() => goToPage(totalPages)}
            type="button"
            aria-label="go to last page"
          >
            Last
          </Button>
        </ButtonGroup>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder="Input group example"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
          />
        </InputGroup>
      </ButtonToolbar>
    </>
  );
};

Pagination.propTypes = {};

export default Pagination;
