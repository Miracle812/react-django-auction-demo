import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
// import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import AppLayout1 from 'pages/AppLayout1'
import { authSelector } from 'store/selectors'


class Home extends PureComponent {

  static propTypes = {
    auth: ImmutablePropTypes.map.isRequired,
  }

  render() {
    return (
      <AppLayout1>
        This is home content
      </AppLayout1>
    )
  }
}

const selector = createStructuredSelector({
  auth: authSelector,
})

export default compose(
  connect(selector)
)(Home)