import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import {
  BaseDropDownMenu,
  BaseInput,
  PaymentModalInputWithAdornment,
  PrimaryAsyncButton,
  SecondaryButton,
} from 'components/base_ui';
import { defaultFontSize, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const AccountBalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const BalanceAmount = styled.h3`
  color: rgba(0, 0, 0, 0.87);
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0;
`;

export const BalanceSquare = styled.div`
  background-color: #f6f8fa;
  border-radius: 0.3rem;
  padding: 1.6rem 2.4rem;
  text-align: ${({ isCentered }) => (isCentered ? 'center' : 'left')};
  width: ${({ isCentered }) => (isCentered ? '100%' : '45%;')};
`;

export const BalanceTitle = styled.span`
  color: #586069;
  font-size: ${defaultFontSize};
  font-weight: 400;
  line-height: 1.5;
  word-wrap: break-word;
`;

export const BalanceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ChargeBreakdownWrapper = styled.div`
  display: flex;
  font-size: 1.6rem;
  padding-bottom: 2rem;
`;

export const ChargeTitle = styled.div``;

export const ChargeValue = styled.div`
  text-align: end;
`;

export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: justify;
  width: 45%;

  ${mobile} {
    text-align: left;
  }
`;

export const ComponentText = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  padding: 2rem 0;
`;

export const ComponentTitle = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  text-decoration: underline;
`;

export const DisplayText = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: row;
  font-size: ${defaultFontSize};
  line-height: 2.1rem;
  margin: 0 0 0.6rem;
  white-space: nowrap;
`;

export const Divider = styled.div`
  border-bottom: 0.1rem solid #d5d5d5;
  margin: 1rem 0;
  width: 100%;
`;

export const FundingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0 1rem 0;
`;

export const HorizontalWrapper = styled.div`
  display: flex;
`;

export const InputHeader = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: row;
  font-size: ${defaultFontSize};
  line-height: 2.1rem;
  margin: 0 0 0.6rem;
  width: 100%;
`;

export const InputWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

export const PaymentOptionWrapper = styled.div`
  padding: 1.5rem 0;
`;

export const PaymentTitle = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.5;
  margin: 0.5rem 0;
`;

export const StyledBaseDropDownMenu = styled(BaseDropDownMenu)`
  background-color: #fafbfc;
  border-radius: 0.3rem;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.4rem;
  line-height: 2rem;
  margin-right: 0.5rem;
  min-height: 34px;
  width: 100%;
`;

export const StyledBaseInput = styled(BaseInput)`
  background-color: #fafbfc;
  border-radius: 0.3rem;
  color: ${textColor};
  font-size: ${defaultFontSize};
  line-height: 2rem;
  margin-right: 0.5rem;
  min-height: 34px;
  width: ${({ width }) => width || '100%'};
`;

export const StyledPaper = styled(Paper)`
  border-bottom: 0.1rem solid lightgrey;
  border-radius: 0;
  box-shadow: none;
  width: 100%;
`;

export const StyledPaymentModalInputWithAdornment = styled(
  PaymentModalInputWithAdornment,
)`
  margin-bottom: 2rem;
  width: 50%;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  margin-left: 0;
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  align-self: center;
  background-color: #00eb93;
  font-size: ${defaultFontSize};
  margin-left: 0;
  width: 11.5rem;

  &:hover {
    background-color: #00eb93;
  }

  ${mobile} {
    margin-right: 0;
  }
`;

export const StyledTab = styled(Tab)`
  color: ${textColor};
  font-size: ${defaultFontSize};
  min-width: 9rem;
  padding: 0.6rem;
  text-transform: capitalize;

  &.selected {
    color: ${textColor};
    font-weight: 600;
  }
`;

export const StyledTabs = styled(Tabs)`
  .indicator {
    background-color: transparent;
  }
`;

export const StyledText = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  margin-bottom: 3rem;
  margin-top: -2rem;
`;

export const TooltipIconWrapper = styled.div`
  align-items: center;
  display: flex;
  margin: 0 0.5rem;

  svg {
    color: ${textColor};
  }
`;

export const Title = styled.div`
  font-weight: 500;
  padding: 0.75rem 7.5rem 0.75rem 0;
`;

export const Value = styled.div`
  padding: 0.75rem 0;
`;

export const WithdrawalInputContainer = styled.div`
  width: 50%;
`;

export const WithdrawalInputWrapper = styled.div`
  align-items: center;
  display: ${({ isRow }) => (isRow ? 'flex' : 'block')};
  font-weight: ${({ isThin }) => (isThin ? '400' : '600')};
  padding: 1rem 0;
`;
