import * as React from 'react';

import { CustomerLink } from '@waldur/customer/CustomerLink';
import { Table, connectTable, createFetcher } from '@waldur/table-react';
import { filterByUser } from '@waldur/workspace/selectors';

import CustomerCreateButton from './CustomerCreateButton';
import CustomerExpertField from './CustomerExpertField';
import CustomerRole from './CustomerRole';

const TableComponent = props => {
  const { translate, filterColumns } = props;
  return (
    <Table {...props}
      columns={filterColumns([
        {
          title: translate('Organization name'),
          render: CustomerLink,
        },
        {
          title: translate('Owner'),
          render: CustomerRole,
          className: 'text-center col-md-1',
        },
        {
          title: translate('Expert'),
          render: CustomerExpertField,
          className: 'text-center col-md-1',
          feature: 'experts',
        },
      ])}
      verboseName={translate('organizations')}
      actions={<CustomerCreateButton/>}
    />
  );
};

const TableOptions = {
  table: 'customers',
  fetchData: createFetcher('customer-permissions'),
  getDefaultFilter: filterByUser,
  exportFields: ['customer', 'role'],
  exportRow: row => [row.customer_name, row.role],
};

export default connectTable(TableOptions)(TableComponent);
