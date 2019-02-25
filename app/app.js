var myProviderApp = angular.module('myProviderApp', []);


myProviderApp.controller('ProviderController', ['$scope', '$http', function($scope, $http){

  $scope.tableView=false;

  $scope.getProvider = function() {
    $http.get('data/providers.json').then(function (data) {
      return_data = [];
      for(var i=0; i<data.data.length; i++) {
        jsonedate = new Date(data.data[i].effectiveDate);
        jsontdate = new Date(data.data[i].terminationDate);

        // increasing the day by one because of the javascript offset
        jsonedate.setDate(jsonedate.getDate()+1);
        jsontdate.setDate(jsontdate.getDate()+1);

        formedate=new Date($scope.searchProvider.effectiveDate);
        formtdate=new Date($scope.searchProvider.terminationDate);

        if(data.data[i].name==$scope.searchProvider.name
          && data.data[i].phoneNumber==$scope.searchProvider.phoneNumber
          && jsonedate.toDateString()===formedate.toDateString()
          && jsontdate.toDateString()===formtdate.toDateString()
          && data.data[i].state==$scope.searchProvider.state){
            $scope.tableView=true;
            return_data.push(data.data[i]);
          }
      }

      $scope.providers=return_data;

    });

  };

  $scope.clearSearchForm = function () {
    $scope.searchProvider.name = "";
    $scope.searchProvider.phoneNumber = "";
    $scope.searchProvider.effectiveDate = "";
    $scope.searchProvider.terminationDate = "";
    $scope.searchProvider.state = "";
    $scope.tableView=false;
  }

}]);
