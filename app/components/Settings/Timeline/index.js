/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { ConditionalRender } from 'components/base_ui';
import { formatDollarAmount, formatWordString } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  EmptyOverviewListComponent,
  OverviewListComponent,
} from '../OverviewList';
import {
  HeaderContainer,
  StyledBaseDropDownMenu,
  StyledButton,
  TimelineActivity,
  TimelineContainer,
  TimelineContent,
  TimelineDividerContainer,
  TimelineDollar,
  TimelineHeader,
  TimelineHorizontalDivider,
  TimelineInfo,
  TimelineListItem,
  TimelineTitle,
  TimelineType,
  TimelineVerticalDivider,
  StyledAction,
} from './styledComponents';
import { HeaderWrapper, StyledH3 } from '../styledComponents';

const ViewAllIcon = iconDictionary('viewAll');

const UserTimelineView = ({
  activity,
  attempting,
  filterValues: { users: usersFilter },
  handleInputChange,
  handleNav,
  handleRemoveIssue,
  userId,
  watching,
}) => {
  const AttemptingComponent = () => (
    <ConditionalRender
      Component={OverviewListComponent}
      FallbackComponent={
        <EmptyOverviewListComponent handleNav={handleNav} type="attempting" />
      }
      propsToPassDown={{
        handleNav,
        handleRemoveIssue,
        list: attempting.slice(0, 5),
        type: 'attempting',
        userId,
      }}
      shouldRender={!!attempting.length}
    />
  );
  const WatchingComponent = () => (
    <ConditionalRender
      Component={OverviewListComponent}
      FallbackComponent={
        <EmptyOverviewListComponent handleNav={handleNav} type="watching" />
      }
      propsToPassDown={{
        handleNav,
        handleRemoveIssue,
        list: watching.slice(0, 5),
        type: 'watching',
        userId,
      }}
      shouldRender={!!watching.length}
    />
  );

  const activityDiv = activity.map((el, index) => {
    const {
      action,
      activityId,
      date,
      fundedValue,
      icon,
      path,
      target: { targetType, targetName },
    } = el;

    const TimelineListItemComponent = (
      <TimelineListItem key={activityId}>
        <TimelineDividerContainer>
          <TimelineVerticalDivider />
          {icon}
        </TimelineDividerContainer>
        <TimelineContent>
          <TimelineType>
            <StyledAction>{formatWordString(action)}</StyledAction>&nbsp;
            {targetType}
          </TimelineType>
          <TimelineInfo>
            <ConditionalRender
              Component={
                <Fragment>
                  <TimelineDollar>
                    {formatDollarAmount(fundedValue)}
                  </TimelineDollar>
                  for &nbsp;
                </Fragment>
              }
              shouldRender={!!fundedValue}
            />
            <TimelineActivity onClick={() => handleNav(path)}>
              {targetName}
            </TimelineActivity>
          </TimelineInfo>
        </TimelineContent>
      </TimelineListItem>
    );

    if (index === 0 || date !== activity[index - 1].date) {
      return (
        <Fragment key={`list-item-${index}`}>
          <TimelineHeader>
            <TimelineTitle>{moment(date).format('MMMM DD')}</TimelineTitle>
            <TimelineHorizontalDivider />
          </TimelineHeader>
          {TimelineListItemComponent}
        </Fragment>
      );
    }
    return TimelineListItemComponent;
  });

  return (
    <TimelineContainer>
      <div>
        <HeaderContainer>
          <StyledH3>Your Attempting</StyledH3>
          <ConditionalRender
            Component={
              <StyledButton
                disableRipple
                onClick={() => handleNav('/settings/attempting')}
              >
                View All
                {ViewAllIcon}
              </StyledButton>
            }
            shouldRender={!!attempting.length}
          />
        </HeaderContainer>
        <AttemptingComponent />
      </div>
      <div>
        <HeaderContainer>
          <StyledH3>Your Watching</StyledH3>
          <ConditionalRender
            Component={
              <StyledButton
                disableRipple
                onClick={() => handleNav('/settings/watching')}
              >
                View All
                {ViewAllIcon}
              </StyledButton>
            }
            shouldRender={!!watching.length}
          />
        </HeaderContainer>
        <WatchingComponent />
      </div>
      <HeaderWrapper>
        <StyledH3>All Activity</StyledH3>
        <StyledBaseDropDownMenu
          handleChange={value =>
            handleInputChange({ field: 'users', form: 'filter', value })
          }
          selectedValue={usersFilter}
          values={['All', 'Earned', 'Funded', 'Submitted', 'Withdrew']}
        />
      </HeaderWrapper>
      {activityDiv}
    </TimelineContainer>
  );
};

UserTimelineView.propTypes = {
  activity: T.array,
  attempting: T.array.isRequired,
  filterValues: T.object.isRequired,
  handleInputChange: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleRemoveIssue: T.func.isRequired,
  userId: T.string.isRequired,
  watching: T.array.isRequired,
};

export default UserTimelineView;
