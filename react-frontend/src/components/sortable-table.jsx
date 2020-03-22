import React from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./sortable-table.css";

const SortableTable = ({ data, settings }) => {
  // TODO: pass in option as props
  const options = {
    sortName: "name",
    sortOrder: "asc"
  };

  return (
    <BootstrapTable
      version="4"
      data={data}
      options={options}
      tableStyle={{ marginBottom: 0 }}
      striped
      hover
      tableBodyClass="table-dark"
      tableHeaderClass="table-dark"
    >
      {Object.keys(settings).map(key => {
        const {
          getBodyFormat,
          title,
          isKey,
          dataSort,
          sortFunc,
          width
        } = settings[key];
        return (
          <TableHeaderColumn
            key={key}
            isKey={isKey}
            dataField={key}
            dataFormat={(_, row) => getBodyFormat(key, row)}
            dataSort={dataSort}
            width={width}
            sortFunc={sortFunc}
          >
            {title}
          </TableHeaderColumn>
        );
      })}
    </BootstrapTable>
  );
};

SortableTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  settings: PropTypes.shape({
    title: PropTypes.string.isRequired,
    getBodyFormat: PropTypes.func.isRequired,
    isKey: PropTypes.bool.isRequired,
    dataSort: PropTypes.bool.isRequired,
    sortFunc: PropTypes.func,
    width: PropTypes.number
  }).isRequired
};

export default SortableTable;
