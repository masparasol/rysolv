const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  scalar Object

  type Activity {
    actionType: String
    activityId: ID
    createdDate: Object
    fundedValue: Float
    issueId: ID
    issueName: String
    organizationId: ID
    organizationName: String
    profilePic: String
    pullRequestId: ID
    userId: ID
    username: String
  }

  type ActivityArray {
    activityArray: [Activity]
  }

  input ActivityInput {
    actionType: String
    fundedValue: Float
    issueId: ID
    organizationId: ID
    pullRequestId: ID
    userId: ID
  }

  type Comment {
    body: String
    commentId: ID
    createdDate: Object
    modifiedDate: Object
    profilePic: String
    target: String
    userId: ID
    username: String
  }

  input CommentInput {
    body: String!
    target: ID!
    user: ID!
  }

  type ImportData {
    issueBody: String!
    issueLanguages: [String]
    issueName: String!
    issueUrl: String!
    organizationDescription: String
    organizationId: ID
    organizationLanguages: [String]
    organizationLogo: String
    organizationName: String
    organizationRepo: String
    organizationUrl: String
  }

  type ImportPullRequest {
    apiUrl: String,
    githubUsername: String,
    htmlUrl: String,
    mergeable: Boolean,
    mergeableState: String,
    merged: Boolean,
    open: Boolean,
    pullNumber: Int,
    status: String,
    title: String,
  }

  type Issue {
    activeAttempts: Int
    attempting: [ID]
    attempts: Int
    body: String
    comments: [ID]
    contributor: [String]
    createdDate: Object
    fundedAmount: Float
    id: ID!
    language: [String]
    modifiedDate: Object
    name: String
    open: Boolean
    organizationId: String
    organizationName: String
    organizationVerified: Boolean
    profilePic: String
    rep: Int
    repo: String
    type: String
    userId: ID
    username: String
    watching: [String]
  }

  input IssueInput {
    attempting: [ID]
    attempts: Int
    body: String
    comments: [ID]
    contributor: String
    fundedAmount: Int
    language: [String]
    name: String
    organizationDescription: String
    organizationId: String
    organizationLogo: String
    organizationName: String
    organizationRepo: String
    organizationUrl: String
    rep: Int
    repo: String
    watching: [String]
  }

  type Organization {
    contributors: [Object]
    createdDate: Object
    description: String!
    id: ID!
    issues: [Object]
    logo: String
    modifiedDate: Object
    name: String!
    organizationUrl: String
    ownerId: ID
    preferredLanguages: [String]
    repoUrl: String!
    totalFunded: Float
    verified: Boolean
  }

  input OrganizationInput {
    organizationDescription: String
    organizationLogo: String
    organizationName: String
    organizationPreferredLanguages: [String]
    organizationRepo: String
    organizationUrl: String
    organizationVerified: Boolean
    ownerId: ID
  }

  type PullRequest {
    apiUrl: String
    createdDate: Object!
    githubUsername: String
    htmlUrl: String
    issueId: ID!
    mergeable: Boolean
    mergeableState: String
    merged: Boolean
    modifiedDate: Object!
    issueName: String
    open: Boolean!
    pullNumber: Int
    pullRequestId: ID!
    status: String!
    title: String!
    userId: ID!
  }

  type PullRequestImport {
    status: String!
  }

  type PullRequestArray {
    pullRequestArray: [PullRequest]
  }

  input PullRequestInput {
    htmlUrl: String
    issueId: ID!
    githubUsername: String
    mergeable: Boolean
    mergeableState: String
    merged: Boolean
    open: Boolean!
    pullNumber: Int
    status: String!
    title: String!
    userId: ID!
  }

  type Payment {
    balance: Float
    fundedAmount: Float
  }

  type User {
    activePullRequests: Int
    attempting: [Object]
    balance: Float
    comments: [String]
    completedPullRequests: Int
    createdDate: Object
    dollarsEarned: Int
    email: String!
    firstName: String!
    githubLink: String
    id: ID!
    isOnline: Boolean
    issues: [Object]
    lastName: String!
    modifiedDate: Object
    organizations: [Object]
    personalLink: String
    preferredLanguages: [String]
    profilePic: String
    pullRequests: [String]
    rejectedPullRequests: Int
    rep: Int
    stackoverflowLink: String
    upvotes: [ID]
    username: String
    watching: [Object]
  }

  input UserInput {
    activePullRequests: Int
    attempting: [ID]
    balance: Float
    comments: [String]
    completedPullRequests: Int
    dollarsEarned: Int
    email: String
    firstName: String
    githubLink: String
    isOnline: Boolean
    issues: [String]
    lastName: String
    organizations: [String]
    personalLink: String
    preferredLanguages: [String]
    profilePic: String
    pullRequests: [String]
    rejectedPullRequests: Int
    rep: Int
    stackoverflowLink: String
    upvotes: [ID]
    username: String
    watching: [String]
  }

  type WatchList {
    id: ID
    profilePic: String
    username: String
  }

  type Error {
    message: String
  }

  type Success {
    message: String
  }

  union ActivityResult = ActivityArray | Error
  union PullRequestArrayResult = PullRequestArray | Error
  union PullRequestResult = PullRequest | Error
  union ImportResult = ImportData | Error
  union ImportPullRequestResult = ImportPullRequest | Error
  union IssueResult = Issue | Error
  union OrganizationResult = Organization | Error
  union EventResponse = Success | Error
  union PaymentResult = Payment | Error

  type RootQuery {
    getActivity(column: String!, id: ID): ActivityResult!
    getAllActivity: ActivityResult!
    getComments: [Comment]!
    getIssues: [Issue!]!
    getOrganizations: [Organization!]!
    getUsers: [User!]!
    getPullRequests: PullRequestArrayResult

    getIssueComments(id: ID!): [Comment]
    getUserOrganizations(id: ID!): [Organization!]
    getUserPullRequests(id: ID!): PullRequestArrayResult

    getWatchList(idArray: [ID!], type: String!): [WatchList!]

    oneIssue(id: ID!): IssueResult
    oneOrganization(id: ID!): OrganizationResult
    oneUser(column: String!, query: ID!): User!
    onePullRequest(id: ID!): PullRequestResult

    searchIssues(value: String!): [Issue!]!
    searchOrganizations(value: String!): [Organization!]!
    searchUsers(value: String!): [User!]!
  }

  type RootMutation {
    closeIssue(id: ID!, shouldClose: Boolean): String!

    createActivity(activityInput: ActivityInput): Activity
    createComment(commentInput: CommentInput): Comment
    createIssue(issueInput: IssueInput): Issue!
    createOrganization(organizationInput: OrganizationInput): Organization!
    createUser(userInput: UserInput): [User!]!
    createPullRequest(pullRequestInput: PullRequestInput!): EventResponse!

    deleteIssue(id: ID!): String!
    deleteOrganization(id:ID!): String!
    deleteUser(id:ID!): String!

    importIssue(url: String!): ImportResult
    importOrganization(url: String!): ImportResult
    importPullRequest(url: String!): ImportPullRequestResult

    submitAccountPayment(issueId: ID!, fundValue: Float!, userId: ID!): PaymentResult!

    transformIssue(id: ID!, issueInput: IssueInput): IssueResult!
    transformOrganization(id: ID!, organizationInput: OrganizationInput): OrganizationResult!
    transformUser(id: ID!, userInput: UserInput): User!

    updateIssueArray(id: ID, column: String, data: String, remove: Boolean): Issue!
    updateUserArray(id: ID, column: String, data: String, remove: Boolean): User!

    upvoteIssue(id: ID): Issue!
    userUpvote(id: ID): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
