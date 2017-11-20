import React, { PureComponent } from 'react'
import { Alert } from 'reactstrap'
import { compose } from 'redux'
import { reduxForm } from 'redux-form/immutable'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import FormField from 'components/FormField'
import InputField from 'components/InputField'


class AuctionForm extends PureComponent {

  static propTypes = {
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: ImmutablePropTypes.map,
    onBack: PropTypes.func,
    productList: ImmutablePropTypes.list.isRequired,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool,
  }

  handleClickBack = (e) => {
    e.preventDefault()

    const { onBack } = this.props
    if (onBack) {
      onBack()
    }
  }

  render() {
    const { error, handleSubmit, initialValues, onBack, productList, submitFailed, submitting } = this.props

    return (
      <form onSubmit={handleSubmit}>
        {submitFailed && <Alert color="danger">
          {error || 'Failed to create an auction'}
        </Alert>}

        <FormField
          name="title"
          type="text"
          label="Title:"
          component={InputField}
        />
        <FormField
          name="starting_price"
          type="number"
          label="Starting Price:"
          component={InputField}
        />
        <FormField
          name="product"
          label="Product:"
          type="select"
          component={InputField}
          options={productList.map(product => ({
            key: product.get('pk'),
            value: product.get('title'),
          }))}
        />
        <center>
          {onBack && <button className="btn mr-3" onClick={this.handleClickBack}>
            Back
          </button>}
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {initialValues ? 'Update' : 'Create'}
          </button>
        </center>
      </form>
    )
  }
}

const validate = (values) => {
  const errors = {}

  if (!values.get('title')) {
    errors.title = 'Title is required'
  }

  if (!values.get('starting_price')) {
    errors.starting_price = 'Starting price is required'
  }

  const startingPrice = parseFloat(values.get('starting_price'))
  if (startingPrice <= 0) {
    errors.starting_price = 'Starting price should be positive number'
  }

  if (!values.get('product')) {
    errors.product = 'Please select a product'
  }

  if (!values.get('tagnames') || !values.get('tagnames').size) {
    errors.tagnames = 'Please enter at least one tag'
  }

  return errors
}

export default compose(
  reduxForm({
    form: 'auctionForm',
    validate,
  })
)(AuctionForm)