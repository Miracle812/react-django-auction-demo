import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Spinner from 'components/Spinner'
import Uploader from 'components/Uploader'
import CharityForm from 'components/CharityForm'
import AdminLayout from 'pages/AdminLayout'
import {
  getCharityDetail,
  updateCharityDetail,
  uploadCharityLogo,
} from 'store/modules/admin/charities'
import { adminCharitiesSelector } from 'store/selectors'


class AdminCharityDetail extends PureComponent {

  static propTypes = {
    adminCharities: ImmutablePropTypes.map.isRequired,
    getCharityDetail: PropTypes.func.isRequired,
    updateCharityDetail: PropTypes.func.isRequired,
    uploadCharityLogo: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  handleSubmit = (data) => {
    this.props.updateCharityDetail({
      id: this.props.match.params.id,
      data
    })
  }

  componentWillMount() {
    this.props.getCharityDetail({
      id: this.props.match.params.id
    })
  }

  render() {
    const { adminCharities } = this.props
    const charityDetail = adminCharities.get('charityDetail')
    const loadingDetail = adminCharities.get('loadingDetail')
    const loadingDetailError = adminCharities.get('loadingDetailError')
    const updatingDetail = adminCharities.get('updatingDetail')
    const updatingDetailError = adminCharities.get('updatingDetailError')

    if (loadingDetail) {
      return (
        <AdminLayout>
          <Spinner />
        </AdminLayout>
      )
    }

    if (loadingDetailError) {
      return (
        <AdminLayout>
          <h2>Charity not found</h2>
        </AdminLayout>
      )
    }

    return (
      <AdminLayout>
        <div>
          <h3 className="mb-5">Edit Charity</h3>

          <div className="mb-4">
            <label>Upload logo here:</label>
            <Uploader
              uploadAction={this.props.uploadCharityLogo}
              uploadActionParams={{ id: this.props.match.params.id }}
            />
          </div>

          {updatingDetailError && <div className="mb-2 text-danger">
            Failed to update charity
          </div>}
          
          <CharityForm
            initialValues={charityDetail.delete('pk')}
            onSubmit={this.handleSubmit}
            disabled={updatingDetail}
          />
        </div>
      </AdminLayout>
    )
  }
}

const selector = createStructuredSelector({
  adminCharities: adminCharitiesSelector,
})

const actions = {
  getCharityDetail,
  updateCharityDetail,
  uploadCharityLogo,
}

export default compose(
  connect(selector, actions)
)(AdminCharityDetail)
