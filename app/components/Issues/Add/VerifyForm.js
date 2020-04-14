/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';
import omit from 'lodash/omit';

import { issueDataDictionary } from 'containers/Issues/constants';

import {
  DataWrapper,
  KeyAndValueContainer,
  KeyGroupWrapper,
  KeyWrapper,
  ValueWrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyForm extends React.PureComponent {
  render() {
    const {
      data,
      data: { repo, body, language, value, name },
    } = this.props;
    const tempData = omit(data, ['importUrl', 'verified']);
    return (
      <DataWrapper>
        {issueDataDictionary.name}
        {name.value}

        {issueDataDictionary.repo}
        {repo.value}

        {issueDataDictionary.body}
        {body.value}

        {issueDataDictionary.language}
        {language.value}

        {issueDataDictionary.value}
        {value.value}
        <KeyGroupWrapper>
          {Object.keys(tempData).map((key, index) => (
            <KeyAndValueContainer key={`verify-key-${key}-${index}`}>
              <KeyWrapper>{issueDataDictionary[key]}:</KeyWrapper>
              <ValueWrapper>{tempData[key].value}</ValueWrapper>
            </KeyAndValueContainer>
          ))}
        </KeyGroupWrapper>
      </DataWrapper>
    );
  }
}

VerifyForm.propTypes = { data: T.object };

export default VerifyForm;
