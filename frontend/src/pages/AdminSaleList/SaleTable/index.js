import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {
  Table, Button, Input,
  Popover, PopoverBody,
} from 'reactstrap'

import Spinner from 'components/Spinner'


class SaleTable extends PureComponent {

  static propTypes = {
    columnList: ImmutablePropTypes.list.isRequired,
    saleList: ImmutablePropTypes.list.isRequired,
    loadingStatus: PropTypes.number.isRequired,
    onUpdateNote: PropTypes.func,
  }

  state = {
    note: '',
    notePopoverOpen: false
  }

  cellValue = (sale, field) => {
    const value = sale.get(field)

    if (field === 'price') {
      return `$${value}`
    }
    return value
  }

  handleToggleNotePopover = (note) => {
    const { notePopoverOpen } = this.state

    if (!notePopoverOpen) {
      this.setState({
        note
      })
    }

    this.setState({
      notePopoverOpen: !notePopoverOpen
    })
  }

  handleChangeNote = (ev) => {
    this.setState({
      note: ev.target.value
    })
  }

  handleSaveNote = (id) => {
    const { note } = this.state

    this.setState({
      notePopoverOpen: false
    })
    this.props.onUpdateNote(id, note)
  }

  render() {
    const { loadingStatus, columnList, saleList } = this.props
    const { note, notePopoverOpen } = this.state

    return (
      <div className="mt-2">
        {loadingStatus === 1 && <Spinner />}

        {loadingStatus === -1 && <div>
          Failed to load data.
        </div>}

        {loadingStatus === 10 && <Table responsive className="data-table mb-0">
          <thead>
            <tr>
              {columnList.filter(
                column => column.get('enabled')
              ).map(column => (
                <th key={column.get('field')}>{column.get('label')}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {saleList.map(sale => {
              const id = sale.get('pk')

              return (
                <tr key={sale.get('pk')}>
                  {columnList.filter(
                    column => column.get('enabled')
                  ).map(column => (
                    <td key={column.get('field')}>{this.cellValue(sale, column.get('field'))}</td>
                  ))}
                  <td>
                    <Button id={`sale${id}`} size="sm" color="link" className="py-0"
                      onClick={this.handleToggleNotePopover.bind(this, sale.get('note'))}
                    >
                      <i className="fa fa-pencil" />
                    </Button>
                    <Popover placement="bottom" isOpen={notePopoverOpen} target={`sale${id}`}
                      toggle={this.handleToggleNotePopover.bind(this, sale.get('note'))}
                    >
                      <PopoverBody className="pt-3 pb-2">
                        <Input
                          type="textarea"
                          value={note}
                          onChange={this.handleChangeNote}
                        />
                        <div className="text-center mt-2">
                          <Button size="sm" color="primary" outline className="px-3 border-0"
                            onClick={this.handleSaveNote.bind(this, id)}
                          >
                            Save
                          </Button>
                        </div>
                      </PopoverBody>
                    </Popover>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>}
      </div>
    )
  }

}

export default SaleTable
