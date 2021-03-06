const keyList = {
  templateUrl: 'views/partials/filtered-list.html',
  controller: KeyListController,
  controllerAs: 'ListController',
};

export default keyList;

// @ngInject
function KeyListController(
  $stateParams,
  keysService,
  baseControllerListClass,
  usersService,
  $state) {
  let controllerScope = this;
  let Controller = baseControllerListClass.extend({
    init: function() {
      this.controllerScope = controllerScope;
      this.service = keysService;
      this._super();

      this.tableOptions = {
        searchFieldName: 'name',
        noDataText: gettext('No SSH keys yet.'),
        noMatchesText: gettext('No SSH keys found matching filter.'),
        columns: [
          {
            title: gettext('Title'),
            className: 'all',
            render: function(row) {
              return row.name;
            }
          },
          {
            title: gettext('Fingerprint'),
            className: 'min-tablet-l',
            render: function(row) {
              return row.fingerprint;
            }
          }
        ],
        rowActions: this.getRowActions(),
        tableActions: this.getTableActions()
      };
    },
    getRowActions: function() {
      if (this.isStaffOrSelf()) {
        return [
          {
            title: gettext('Remove'),
            iconClass: 'fa fa-trash',
            callback: this.remove.bind(controllerScope)
          }
        ];
      }
    },
    getTableActions: function() {
      if (this.isStaffOrSelf()) {
        return [
          {
            title: gettext('Add SSH key'),
            iconClass: 'fa fa-plus',
            callback: function() {
              $state.go('keys.create');
            }
          }
        ];
      }
    },
    isStaffOrSelf: function() {
      return angular.isUndefined($stateParams.uuid) ||
             usersService.currentUser.uuid === $stateParams.uuid ||
             usersService.currentUser.is_staff;
    },
    getList: function(filter) {
      this.service.defaultFilter.user_uuid = $stateParams.uuid || usersService.currentUser.uuid;
      return this._super(filter);
    }
  });
  controllerScope.__proto__ = new Controller();
}
