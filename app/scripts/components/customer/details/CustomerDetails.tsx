import * as React from 'react';
import { connect } from 'react-redux';

import { formatDateTime } from '@waldur/core/dateUtils';
import { Customer } from '@waldur/customer/types';
import { withTranslation, TranslateProps } from '@waldur/i18n';
import { Field } from '@waldur/resource/summary';
import { getConfig, getNativeNameVisible } from '@waldur/store/config';
import { connectAngularComponent } from '@waldur/store/connect';

interface  CustomerDetailsProps extends TranslateProps {
  customer: Customer;
  organizationSubnetsVisible: boolean;
  nativeNameVisible: boolean;
}

export const PureCustomerDetails = (
  { translate, customer, organizationSubnetsVisible, nativeNameVisible }: CustomerDetailsProps
) => (
  <div className="panel panel-default">
    <div className="panel-heading">
      {translate('Organization details')}
    </div>

    <div className="panel-body">
      <dl className="dl-horizontal resource-details-table">

        <Field
          label={translate('Name')}
          value={customer.name}
        />

        <Field
          label={translate('Organization type')}
          value={customer.type}
        />

        {nativeNameVisible && (
          <Field
            label={translate('Native name')}
            value={customer.native_name}
          />
        )}

        <Field
          label={translate('Abbreviation')}
          value={customer.abbreviation}
        />

        <Field
          label={translate('Registry code')}
          value={customer.registration_code}
        />

        <Field
          label={translate('Accounting start date')}
          value={customer.accounting_start_date && formatDateTime(customer.accounting_start_date)}
        />

        <Field
          label={translate('Agreement number')}
          value={customer.agreement_number}
        />

        <Field
          label={translate('Address')}
          value={customer.address || customer.contact_details}
        />

        <Field
          label={translate('Contact e-mail')}
          value={customer.email}
        />

        <Field
          label={translate('Contact phone')}
          value={customer.phone_number}
        />

        <Field
          label={translate('VAT code')}
          value={customer.vat_code}
        />

        <Field
          label={translate('VAT rate')}
          value={`${customer.default_tax_percent}%`}
        />

        <Field
          label={translate('Subnets from where connection to self-service is allowed.')}
          value={organizationSubnetsVisible && customer.access_subnets}
        />

        <Field
          label={translate('Country')}
          value={customer.country_name}
        />

        <Field
          label={translate('Postal code')}
          value={customer.postal}
        />

        <Field
          label={translate('Bank name')}
          value={customer.bank_name}
        />

        <Field
          label={translate('Bank account')}
          value={customer.bank_account}
        />
      </dl>
    </div>
  </div>
);

const mapStateToProps = state => ({
  organizationSubnetsVisible: getConfig(state).organizationSubnetsVisible,
  nativeNameVisible: getNativeNameVisible(state),
});

export const CustomerDetails = connect(mapStateToProps)(withTranslation(PureCustomerDetails));

export default connectAngularComponent(CustomerDetails, ['customer']);
