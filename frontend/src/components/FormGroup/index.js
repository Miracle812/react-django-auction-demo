import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'


class FormGroup extends PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    component: PropTypes.func.isRequired,
  }

  render() {
    const { name, label, component, type } = this.props

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <Field name={name} component={component} type={type} />
      </div>
    )
  }
}

export default FormGroup