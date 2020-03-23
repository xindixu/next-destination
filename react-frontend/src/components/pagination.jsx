import React from "react";
import PropTypes from "prop-types";
import { Pagination as BSPagination } from "react-bootstrap";
import "./pagination.css";

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

const Pagination = ({ totalRecords, loadPage, currentPage }) => {
  const totalPages = Math.min(Math.floor(totalRecords / LIMIT), MAX_PAGE_NUM);

  const paginationButtons = getButtons(currentPage, totalPages);

  const goToPage = num => {
    if (num === currentPage) {
      return;
    }

    loadPage(num);
  };

  return (
    <BSPagination>
      <BSPagination.First
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
      />
      <BSPagination.Prev
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage - 1 < 1}
      />
      {paginationButtons[0] !== 1 && <BSPagination.Ellipsis />}
      {paginationButtons.map(num => (
        <BSPagination.Item
          onClick={() => goToPage(num)}
          key={num}
          active={num === currentPage}
        >
          {num}
        </BSPagination.Item>
      ))}
      {paginationButtons[paginationButtons.length - 1] !== totalPages && (
        <BSPagination.Ellipsis />
      )}
      <BSPagination.Next
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage + 1 > totalPages}
      />
      <BSPagination.Last
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
      />
    </BSPagination>
  );
};

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  loadPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
