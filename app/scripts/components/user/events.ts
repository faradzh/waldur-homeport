import eventsRegistry from '@waldur/events/registry';
import { getAffectedUserContext } from '@waldur/events/utils';
import { gettext } from '@waldur/i18n';

eventsRegistry.registerGroup({
  title: gettext('User management events'),
  context: getAffectedUserContext,
  events: [
    {
      key: 'user_activated',
      title: gettext('User {affected_user_link} has been activated.'),
    },
    {
      key: 'user_creation_succeeded',
      title: gettext('User {affected_user_link} has been created.'),
    },
    {
      key: 'user_deactivated',
      title: gettext('User {affected_user_link} has been deactivated.'),
    },
    {
      key: 'user_deletion_succeeded',
      title: gettext('User {affected_user_name} has been deleted.'),
    },
    {
      key: 'user_password_updated',
      title: gettext('Password has been changed for user {affected_user_link}.'),
    },
    {
      key: 'user_update_succeeded',
      title: gettext('User {affected_user_link} has been updated.'),
    },
    {
      key: 'ssh_key_creation_succeeded',
      title: gettext('SSH key {ssh_key_name} has been created for user {affected_user_link}'),
    },
    {
      key: 'ssh_key_deletion_succeeded',
      title: gettext('SSH key {ssh_key_name} has been deleted for user {affected_user_link}'),
    },
  ],
});
