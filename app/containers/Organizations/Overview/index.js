import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import Organizations from 'components/Organizations';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  clearAlerts,
  fetchOrganizations,
  inputChange,
  searchOrganizations,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsError,
  makeSelectOrganizationsFiltered,
  makeSelectOrganizationsLoading,
  makeSelectOrganizationsSearchDisabled,
} from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
const OrganizationsOverview = ({
  alerts,
  organizations,
  disabled,
  error,
  handleClearAlerts,
  dispatchFetchOrganizations,
  handleInputChange,
  handleNav,
  handleSearchOrganizations,
  loading,
  params: { searchValue },
  search,
}) => {
  useEffect(() => {
    if (searchValue) {
      handleSearchOrganizations({ value: searchValue });
    } else {
      dispatchFetchOrganizations();
    }
    return handleClearAlerts;
  }, [searchValue]);

  return (
    <AsyncRender
      asyncData={organizations}
      component={Organizations}
      error={error}
      loading={loading}
      propsToPassDown={{
        alerts,
        disabled,
        handleClearAlerts,
        handleInputChange,
        handleNav,
        handleSearchOrganizations,
        search,
      }}
    />
  );
};

OrganizationsOverview.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  organizations: T.array,
  disabled: T.bool.isRequired,
  dispatchFetchOrganizations: T.func,
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchOrganizations: T.func,
  loading: T.bool,
  params: T.object,
  search: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  alerts: makeSelectOrganizations('alerts'),
  organizations: makeSelectOrganizationsFiltered(),
  disabled: makeSelectOrganizationsSearchDisabled('searchInput'),
  error: makeSelectOrganizationsError('organizations'),
  loading: makeSelectOrganizationsLoading('organizations'),
  search: makeSelectOrganizations('search'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    dispatchFetchOrganizations: () => dispatch(fetchOrganizations()),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleInputChange: payload => dispatch(inputChange(payload)),
    handleSearchOrganizations: payload =>
      dispatch(searchOrganizations(payload)),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'organizations', reducer });
const withSaga = injectSaga({ key: 'organizations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrganizationsOverview);
