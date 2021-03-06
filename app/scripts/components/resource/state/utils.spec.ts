import { translate } from '@waldur/i18n';
import '@waldur/openstack/provider';

import { Resource } from './types';

import { getResourceState } from './utils';

describe('getResourceState', () => {
  it('renders OK state', () => {
    const resource: Resource = {
      resource_type: 'OpenStackTenant.Instance',
      state: 'OK',
      runtime_state: 'ONLINE',
      service_settings_state: 'OK',
    };
    expect(getResourceState(resource, translate)).toEqual({
      className: 'progress-bar-primary',
      label: 'ONLINE',
      movementClassName: '',
      tooltip: 'Resource is in sync, current state on backend: ONLINE.',
    });
  });

  it('renders error state', () => {
    const resource: Resource = {
      resource_type: 'OpenStackTenant.Instance',
      state: 'Erred',
      runtime_state: 'ONLINE',
      service_settings_state: 'OK',
    };
    expect(getResourceState(resource, translate)).toEqual({
      className: 'progress-bar-warning',
      label: 'ONLINE',
      movementClassName: '',
      tooltip: 'Failed to operate with backend.',
    });
  });

  it('renders error runtime state', () => {
    const resource: Resource = {
      resource_type: 'OpenStackTenant.Instance',
      state: 'OK',
      runtime_state: 'ERROR',
      service_settings_state: 'OK',
    };
    expect(getResourceState(resource, translate)).toEqual({
      className: 'progress-bar-danger',
      label: 'ERROR',
      movementClassName: '',
      tooltip: 'Resource is in sync, current state on backend: ERROR.',
    });
  });

  it('renders error for service settings state', () => {
    const resource: Resource = {
      resource_type: 'OpenStackTenant.Instance',
      state: 'OK',
      runtime_state: 'ONLINE',
      service_settings_state: 'ERRED',
      service_settings_error_message: 'Server does not respond.',
    };
    expect(getResourceState(resource, translate)).toEqual({
      className: 'progress-bar-warning',
      label: 'ONLINE',
      movementClassName: '',
      tooltip: 'Service settings of this resource are in state erred., error message: Server does not respond.',
    });
  });

  it('renders progress state', () => {
    const resource: Resource = {
      resource_type: 'OpenStackTenant.Instance',
      state: 'Updating',
      runtime_state: 'RESIZING',
      service_settings_state: 'OK',
    };
    expect(getResourceState(resource, translate)).toEqual({
      className: 'progress-bar-primary',
      label: 'Updating',
      movementClassName: 'progress-striped active',
      tooltip: 'Updating OpenStack Instance, current state on backend: RESIZING.',
    });
  });

  it('renders action details', () => {
    const resource: Resource = {
      resource_type: 'OpenStackTenant.Instance',
      state: 'Updating',
      runtime_state: 'RESIZING',
      service_settings_state: 'OK',
      action: 'change_flavor',
      action_details: {message: 'Changing flavor from small to large.'},
    };
    expect(getResourceState(resource, translate)).toEqual({
      className: 'progress-bar-primary',
      label: 'Changing flavor',
      movementClassName: 'progress-striped active',
      tooltip: 'Changing flavor from small to large., current state on backend: RESIZING.',
    });
  });
});
