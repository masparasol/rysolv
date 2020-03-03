import React from 'react';
import T from 'prop-types';
import AdminSubHeader from 'components/Admin/AdminSubHeader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  ConditionalRender,
  ErrorSuccessBanner,
  Settings,
  IconToolTip,
  Upvote,
  Comments,
  Verified,
} from 'components/base_ui';
import {
  BannerWrapper,
  StyledIssueCard,
  NameWrapper,
  DollarWrapper,
  StyledListItem,
  StyledIssueHeader,
  IssueLanguage,
  IssueOverview,
  StyledIssueContent,
  StyledIssueText,
  StyledIssueFooter,
  OrganizationNameWrapper,
  UpvotePanel,
} from './styledComponents';

const IssueCard = ({
  alerts: { error, success },
  clearAlerts,
  data,
  // handleDelete,
  // handleNav,
}) => {
  const hasCompanies = data.length > 0;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const IssueCardComponent = (
    <div>
      <BannerWrapper>
        <AdminSubHeader />
        <ErrorSuccessBanner
          error={error}
          onClose={clearAlerts}
          success={success}
        />
      </BannerWrapper>
      <StyledIssueCard>
        {data.map(
          ({
            attempts,
            comments,
            id,
            language,
            name,
            organization,
            organizationVerified,
            overview,
            rep,
            setPrice,
            solved,
            watched,
          }) => (
            <div key={id}>
              <StyledListItem>
                <UpvotePanel>
                  <Upvote />
                  {rep}
                </UpvotePanel>
                <StyledIssueContent>
                  <StyledIssueHeader>
                    <OrganizationNameWrapper>
                      {organization}

                      {organizationVerified ? (
                        <IconToolTip toolTipText="Verified Contributor">
                          <div>
                            <Verified />
                          </div>
                        </IconToolTip>
                      ) : (
                        ''
                      )}
                    </OrganizationNameWrapper>

                    <IssueLanguage>{language}</IssueLanguage>
                    <div
                      aria-controls="settingsMenu"
                      aria-haspopup="true"
                      tabIndex={-1}
                      role="button"
                      onClick={handleClick}
                      onKeyDown={handleClick}
                    >
                      <Settings />
                    </div>

                    <Menu
                      id="settingsMenu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Edit</MenuItem>
                      <MenuItem onClick={handleClose}>
                        <span style={{ color: 'red' }}>Delete</span>
                      </MenuItem>
                    </Menu>
                  </StyledIssueHeader>
                  <StyledIssueText>
                    <NameWrapper>{name}</NameWrapper>
                    <IssueOverview>{overview}</IssueOverview>
                  </StyledIssueText>
                  <StyledIssueFooter>
                    <div>
                      <Comments /> {comments} comments
                    </div>
                    <div>{solved ? 'Resolved' : `${attempts} attempts`}</div>
                    <div>{watched} Watch</div>
                    <DollarWrapper>${setPrice}</DollarWrapper>
                  </StyledIssueFooter>
                </StyledIssueContent>
              </StyledListItem>
            </div>
          ),
        )}
      </StyledIssueCard>
    </div>
  );
  return (
    <ConditionalRender
      Component={IssueCardComponent}
      FallbackComponent={<div>Hello</div>}
      shouldRender={hasCompanies}
    />
  );
};

IssueCard.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  clearAlerts: T.func,
  data: T.array,
  // handleDelete: T.func,
  // handleNav: T.func,
};

export default IssueCard;