import styled from 'styled-components';
import {
  fundingClosedBackground,
  fundingOpenBackground,
  fundingText,
  languageBackground,
  languageText,
} from 'defaultStyleHelper';

export const StyledFundingWrapper = styled.div`
  background-color: ${({ open }) =>
    open ? fundingOpenBackground : fundingClosedBackground};
  border-radius: 0.25rem;
  color: ${({ open }) => (open ? fundingText : '0')};
  display: inline-flex;
  font-size: inherit;
  font-weight: 700;
  padding: 0.5rem 1rem;
  white-space: nowrap;
  opacity: 0.8;
`;

export const StyledLanguageWrapper = styled.div`
  background-color: ${languageBackground};
  border-radius: 0.25rem;
  color: ${languageText};
  display: inline-flex;
  font-size: inherit;
  margin: 0 0.5rem;
  padding: 0.5rem;
`;
