'use strict';

(function() {
  angular.module('ncsaas')
    .directive('actionListResource', ['actionUtilsService', actionListResource]);

  function actionListResource(actionUtilsService) {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/action-list-resource.html',
      replace: true,
      scope: {
        entity: '=',
        controller: '='
      },
      link: function(scope) {
        function loadActions() {
          scope.loading = true;
          actionUtilsService.loadActions(scope.entity).then(function(actions) {
            if (actions) {
              scope.actions = actions;
            }
          }).finally(function() {
            scope.loading = false;
          });
        }
        scope.buttonClick = function(name, action) {
          action.pending = true;
          var promise = actionUtilsService.buttonClick(scope.controller, scope.entity, name, action);
          promise.finally(function() {
            action.pending = false;
            loadActions();
          });
        }
        scope.loading = false;
        loadActions();
        scope.$watch('entity', function(newEntity, oldEntity) {
          if (newEntity.state != oldEntity.state) {
            loadActions();
          }
        });
      }
    };
  }
})();
