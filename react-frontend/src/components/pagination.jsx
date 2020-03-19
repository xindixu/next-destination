import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl
} from "react-bootstrap";

import { MAX_PAGE_NUM, LIMIT } from "../lib/constants";

const MAX_NUM_BUTTONS = 5;

const getButtons = (currentPage, totalPages) => {
  if (totalPages > MAX_NUM_BUTTONS) {
    let startsAt = currentPage - 2;
    if (startsAt < 1) {
      startsAt = 1;
    }
    if (currentPage + 2 >= totalPages) {
      startsAt = totalPages - MAX_NUM_BUTTONS + 1;
    }

    return [...Array(MAX_NUM_BUTTONS).keys()].map(key => key + startsAt);
  }

  return [...Array(totalPages).keys()].map(key => key + 1);
};

const Pagination = ({ totalRecords, loadPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.min(Math.floor(totalRecords / LIMIT), MAX_PAGE_NUM);

  const paginationButtons = getButtons(currentPage, totalPages);

  const goToPage = num => {
    setCurrentPage(num);
    loadPage(num);
  };

  return (
    <ButtonGroup aria-label="Pages">
      <Button
        variant="outline-primary"
        onClick={() => goToPage(1)}
        type="button"
        aria-label="go to first page"
      >
        First
      </Button>
      {paginationButtons[0] !== 1 && (
        <span className="btn btn-outline-primary disabled">...</span>
      )}
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
      {paginationButtons[paginationButtons.length - 1] !== totalPages && (
        <span className="btn btn-outline-primary disabled">...</span>
      )}
      <Button
        variant="outline-primary"
        onClick={() => goToPage(totalPages)}
        type="button"
        aria-label="go to last page"
      >
        Last
      </Button>
    </ButtonGroup>
  );
};

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  loadPage: PropTypes.func.isRequired
};

export default Pagination;
