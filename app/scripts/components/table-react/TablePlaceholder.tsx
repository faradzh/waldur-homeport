import * as React from 'react';

import { TranslateProps } from '@waldur/i18n/types';

interface Props extends TranslateProps {
  query?: string;
  verboseName?: string;
}

const TablePlaceholder = ({ query, translate, verboseName }: Props) => {
  const context = {verboseName: verboseName || translate('items')};
  let message;
  if (query && query !== '') {
    message = translate('There are no {verboseName} found matching the filter.', context);
  } else {
    message = translate('There are no {verboseName} yet.', context);
  }
  return (<p>{message}</p>);
};

export default TablePlaceholder;
