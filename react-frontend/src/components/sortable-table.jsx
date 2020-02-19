import React from 'react'
import PropTypes from 'prop-types'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const SortableTable = ({ data, settings }) => {
  const options = {
    sortName: 'name',
    sortOrder: 'asc'
  }

  return (
    <BootstrapTable version='4' data={data} options={options}
      tableStyle={{ marginBottom: 0 }}
      striped hover
    >
      {Object.keys(settings).map((key) => {
        const { getBodyFormat, title, isKey, dataSort, sortFunc } = settings[key]
        return (<TableHeaderColumn
          key={key}
          isKey={isKey}
          dataField={key}
          dataFormat={(_, row) => getBodyFormat(key, row)}
          dataSort={dataSort}
          sortFunc={sortFunc}>{title}
        </TableHeaderColumn>)
      })}
    </BootstrapTable>
  )
}

SortableTable.defaultProps = {
  getHeaderFormat: (item) => item,
  getBodyFormat: (item) => item
}

SortableTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  settings: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    getBodyFormat: PropTypes.func.isRequired,
    isKey: PropTypes.bool.isRequired,
    dataSort: PropTypes.bool.isRequired,
    sortFunc: PropTypes.func,
  }).isRequired).isRequired,
}

export default SortableTable
