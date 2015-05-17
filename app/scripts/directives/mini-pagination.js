'use strict';

(function() {
  angular.module('ncsaas')
    .directive('minipagination', ['$state', miniPagination]);

  function miniPagination($state) {
    return {
      restrict: 'E',
      templateUrl: "views/directives/mini-pagination.html",
      replace: true,
      scope: {
        pageModels: '@',
        pageChange: '@',
        pageModelId: '=',
        pageEntityName: '@'
      },
      link: function($scope) {
        var modelId = $scope.pageModelId;
        var paginationKey = modelId + $scope.pageEntityName;
        $scope.paginationKey = paginationKey;
        $scope.numberList = {};
        $scope.change = {};
        $scope.pageCurrent = {};
        $scope.pageCount = {};
        if ($scope.pageModels[modelId]) {
          var model = $scope.pageModels[modelId];
          initPagination(model.pages, model.page, $scope.pageChange, $scope.pageEntityName, modelId)
        }

        $scope.$on('mini-pagination:getNumberList', function (event, count, current, pageChange, entityName, uuid) {
          initPagination(count, current, pageChange, entityName, uuid);
        });

        function initPagination(count, current, pageChange, entityName, uuid) {
          var paginationKey = uuid + entityName;
          $scope.numberList[paginationKey] = getNumberList(count, current);
          $scope.change[paginationKey] = pageChange;
          $scope.pageCurrent[paginationKey] = current;
          $scope.pageCount[paginationKey] = current;
        }

        function getNumberList(num, currentPage) {
          var firstPage,
            lastPage,
            pagesRange,
            interval = 5;

          firstPage = currentPage <= interval ? 1 : currentPage - interval;
          lastPage = currentPage > num - interval ? num : currentPage + interval;
          pagesRange = [];
          for (var i = firstPage; i <= lastPage; i++) {
            pagesRange.push(i);
          }
          return pagesRange;
        }
      }
    }
  }
})();