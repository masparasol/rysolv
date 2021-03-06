/* eslint-disable no-underscore-dangle */
import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchActiveUser } from 'containers/Auth/actions';
import { post } from 'utils/request';

import {
  DELETE_ORGANIZATION,
  FETCH_INFO,
  FETCH_ORGANIZATIONS,
  IMPORT_ORGANIZATION,
  SAVE_INFO,
  SEARCH_ORGANIZATIONS,
  successCreateOrganizationMessage,
  successEditOrganizationMessage,
  UPDATE_INFO,
  UPVOTE_ISSUE,
} from './constants';
import {
  deleteOrganizationFailure,
  deleteOrganizationSuccess,
  fetchInfo,
  fetchInfoFailure,
  fetchInfoSuccess,
  fetchOrganizations,
  fetchOrganizationsFailure,
  fetchOrganizationsSuccess,
  importOrganizationFailure,
  importOrganizationSuccess,
  saveInfoFailure,
  saveInfoSuccess,
  searchOrganizationsFailure,
  searchOrganizationsSuccess,
  updateInfoFailure,
  updateInfoSuccess,
  upvoteIssueFailure,
  upvoteIssueSuccess,
} from './actions';

export function* deleteOrganizationSaga({ payload }) {
  const { itemId } = payload;
  try {
    const query = `
    mutation{
      deleteOrganization(id: "${itemId}")
    }`;
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { deleteOrganization },
    } = yield call(post, '/graphql', graphql);
    yield put(
      deleteOrganizationSuccess({ itemId, message: deleteOrganization }),
    );
  } catch (error) {
    yield put(deleteOrganizationFailure({ error }));
  }
}

export function* fetchOrganizationsSaga() {
  const query = `
  query {
    getOrganizations {
      id,
      createdDate,
      modifiedDate,
      name,
      description,
      repoUrl,
      organizationUrl,
      issues,
      logo,
      verified,
      totalFunded,
      preferredLanguages
    }
  }
`;
  try {
    const organizationsQuery = JSON.stringify({
      query,
      variables: {},
    });
    const { data: getOrganizations } = yield call(
      post,
      '/graphql',
      organizationsQuery,
    );
    yield put(fetchOrganizationsSuccess(getOrganizations));
  } catch (error) {
    yield put(fetchOrganizationsFailure({ error }));
  }
}

export function* fetchInfoSaga({ payload }) {
  const { itemId } = payload;
  const query = `
  query {
    oneOrganization(id: "${itemId}") {
      __typename
      ... on Organization {
        contributors,
        createdDate,
        description,
        id,
        issues,
        logo,
        modifiedDate,
        name,
        organizationUrl,
        ownerId,
        preferredLanguages
        repoUrl,
        totalFunded,
        verified,
      }
      ... on Error {
        message
      }
    }
    getActivity(column: "activity.organization_id", id: "${itemId}") {
      __typename
      ... on ActivityArray {
        activityArray {
          actionType
          activityId
          createdDate
          fundedValue
          issueId
          issueName
          organizationId
          organizationName
          profilePic
          pullRequestId
          userId
          username
        }
      }
      ... on Error {
        message
      }
    }
  }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        oneOrganization,
        getActivity: { activityArray },
      },
    } = yield call(post, '/graphql', graphql);
    oneOrganization.activity = activityArray;

    if (oneOrganization.__typename === 'Error') {
      throw new Error(oneOrganization.message);
    }

    yield put(fetchInfoSuccess({ organization: oneOrganization }));
  } catch (error) {
    yield put(fetchInfoFailure({ error }));
  }
}

export function* importOrganizationSaga({ payload }) {
  const { validatedUrl } = payload;
  const query = `
  mutation{
    importOrganization(url: "${validatedUrl}") {
      __typename
      ... on ImportData {
        organizationDescription,
        organizationId,
        organizationLanguages,
        organizationLogo,
        organizationName,
        organizationRepo,
        organizationUrl,
      }
      ... on Error {
        message
      }
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        importOrganization,
        importOrganization: { __typename },
      },
    } = yield call(post, '/graphql', graphql);

    if (__typename === 'Error') {
      throw new Error(importOrganization.message);
    }

    yield put(importOrganizationSuccess({ importOrganization }));
  } catch (error) {
    yield put(importOrganizationFailure({ error }));
  }
}

export function* saveInfoSaga({ payload }) {
  const {
    requestBody: {
      organizationDescription,
      organizationLogo,
      organizationName,
      organizationRepo,
      organizationUrl,
    },
    activeUser: { id: userId },
  } = payload;
  const query = `
  mutation {
    createOrganization(organizationInput: {
      organizationDescription: "${organizationDescription}",
      organizationLogo: "${organizationLogo}",
      organizationName: "${organizationName}",
      organizationRepo: "${organizationRepo}",
      organizationUrl: "${organizationUrl}",
      ownerId: "${userId}"
    })
    { id }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    yield call(post, '/graphql', graphql);
    yield put(fetchOrganizations());
    yield put(saveInfoSuccess({ message: successCreateOrganizationMessage }));
  } catch (error) {
    yield put(saveInfoFailure({ error }));
  }
}

export function* searchOrganizationsSaga({ payload }) {
  const { value } = payload;
  const query = `
  query {
    searchOrganizations(value: "${value}") {
      createdDate,
      description,
      id,
      issues,
      logo,
      modifiedDate,
      name,
      organizationUrl,
      repoUrl,
      totalFunded,
      verified,
    }
  }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { searchOrganizations },
    } = yield call(post, '/graphql', graphql);
    yield put(
      searchOrganizationsSuccess({ organizations: searchOrganizations }),
    );
  } catch (error) {
    yield put(searchOrganizationsFailure({ error }));
  }
}

export function* updateInfoSaga({ payload }) {
  const { editRequest, itemId } = payload;
  const {
    organizationUrl,
    description,
    logo,
    name,
    preferredLanguages,
    repoUrl,
    verified,
  } = editRequest;
  const query = `
    mutation {
      transformOrganization(id: "${itemId}", organizationInput: {
        organizationDescription: "${description}",
        organizationLogo: "${logo}",
        organizationName: "${name}",
        organizationPreferredLanguages: ${JSON.stringify(preferredLanguages)},
        organizationRepo: "${repoUrl}",
        organizationUrl: "${organizationUrl}",
        organizationVerified: ${verified},
      }) {
        __typename
        ... on Organization {
          id,
          createdDate,
          modifiedDate,
          name,
          description,
          repoUrl,
          organizationUrl,
          issues,
          logo,
          verified,
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { transformOrganization },
    } = yield call(post, '/graphql', graphql);
    if (transformOrganization.__typename === 'Error') {
      throw transformOrganization;
    }
    yield put(fetchInfo({ itemId }));
    yield put(updateInfoSuccess({ message: successEditOrganizationMessage }));
  } catch (error) {
    yield put(updateInfoFailure({ error }));
  }
}

export function* upvoteIssueSaga({ payload }) {
  const { issueId, userId } = payload;
  const upvoteIssueQuery = `
      mutation {
        upvoteIssue(id: "${issueId}" ) {
          id,
          rep
        }
        userUpvote(id: "${userId}" ) {
          id,
          rep
        }
        updateUserArray(id: "${userId}", column: "upvotes", data: "${issueId}", remove: false ) {
          attempting,
          watching
        }
      }
    `;
  try {
    const upvoteIssue = JSON.stringify({
      query: upvoteIssueQuery,
      variables: {},
    });
    const {
      data: {
        upvoteIssue: { id, rep },
      },
    } = yield call(post, '/graphql', upvoteIssue);
    yield put(upvoteIssueSuccess({ id, rep }));
    yield put(fetchActiveUser({ userId }));
  } catch (error) {
    yield put(upvoteIssueFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DELETE_ORGANIZATION, deleteOrganizationSaga);
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(FETCH_ORGANIZATIONS, fetchOrganizationsSaga);
  yield takeLatest(IMPORT_ORGANIZATION, importOrganizationSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_ORGANIZATIONS, searchOrganizationsSaga);
  yield takeLatest(UPDATE_INFO, updateInfoSaga);
  yield takeLatest(UPVOTE_ISSUE, upvoteIssueSaga);
}
