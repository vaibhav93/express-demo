
angular.module('ngTableApp', ['ngTable','mwl.confirm','ui.bootstrap','cgNotify'])
.controller('tableController', function ($scope, $filter,$http, ngTableParams,notify) {
	$scope.users = [];
	$scope.emp={};	
$http.get("http://slc09uem.us.oracle.com:8888/api/employees")
	.success(function(response){
		//$scope.data = response;
		//$scope.usersTable.reload();
	});
	$scope.addemp = false;
	$scope.showForm = function(){
	$scope.addemp = true;
	}
	
	$scope.close = function(){
	$scope.addemp = false;
	console.log($scope.dt);
	$scope.emp = {};
	}
	$scope.CreateEmp = function(emp){
emp.hireDate=$filter('date')($scope.dt, 'dd-MMM-yy');
         $http.post('http://slc09uem.us.oracle.com:8888/api/employees',emp).success(function(data){console.log(data);$scope.usersTable.reload();$scope.emp = {};
if(data.error){notify({ message:data.error,duration:'5000', classes:'alert-danger',position:'right'} );};
if(data.status){notify({ message:'Created',duration:'3000', classes:'alert-success',position:'right'} );}
});
}
	$scope.deleteEmp = function(empId){
$http.delete('http://slc09uem.us.oracle.com:8888/api/employees', {data:{empid:empId}, headers: {"Content-Type": "application/json;charset=utf-8"}},function(data,status){

console.log(data)}).success(function(data){$scope.usersTable.reload();
if(data.error){notify({ message:data.error,duration:'5000', classes:'alert-danger',position:'right'} );};
if(data.status){notify({ message:'Deleted',duration:'3000', classes:'alert-success',position:'right'} );}
});
}
$scope.editId = -1;	
$scope.edit = function(empid){
console.log('edit' + empid);
$scope.editId = empid;
}

	$scope.usersTable = new ngTableParams({
		page: 1,
		count: 8
	}, {
		//total: $scope.data.length, 
		getData: function ($defer, params) {
			$http.get("http://slc09uem.us.oracle.com:8888/api/employees")
			.success(function(response){
			var orderedData=params.sorting() ? $filter('orderBy')(response, params.orderBy()) : response;
			orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
			$scope.data = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
			params.total(orderedData.length);
			$defer.resolve($scope.data);
		})
		}
	});
	$scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open = function($event) {
    $scope.status.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    formatMonth:'MMM',
    startingDay: 1
  };

  $scope.formats = ['dd-MMM-yy'];
  $scope.format = $scope.formats[0];

  $scope.status = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
	
});
