var sodecApp = angular.module('SodecDashboard', []);

sodecApp.service('deviceService', function($http) {
    this.getData = function(successCallback, sensor) {
        $http({
            method: 'GET',
            url: 'http://calpolysolardecathlon.org:3000/srv/latest-event?device=' + sensor.device
        }).success(function(data) {
            successCallback(data);
        }).error(function(data) {
            console.log('FAIL');
        });
    }
});


sodecApp.controller('temperatureController', function($scope, deviceService) {
    var TempSensors = [
        {name: 'Living Room', device : 's-temp-lr'},
        {name: 'Bedroom', device: 's-temp-bed'},
        {name: 'Kitchen', device : 's-temp-kit'},
        {name: 'Bathroom', device : 's-temp-bath'}
    ];

    $scope.TempSensors = TempSensors;

    var successCallback = function(data) {
//    console.log('Got back ' + data['device-id']);
        var device = $.grep($scope.TempSensors, function(e){return e.device == data['device-id']})[0];
        if(typeof data == 'string') {
            console.log(' Got This!: ' + data);
            device.data = data;
        } else {
            device.data = parseInt(data.status)/10.0;
        }
    }


    for(var i = 0; i < TempSensors.length; i++) {
        deviceService.getData(successCallback, $scope.TempSensors[i]);
    }
});




sodecApp.controller('occupancyController', function($scope, deviceService) {
    var occupancySensors = [
        {name: 'Living Room', device: 's-occ-lr', data: 'No Data'},
        {name: 'Bedroom', device: 's-occ-bed', data: 'No Data'},
        {name: 'Mechanical Room', device: 's-occ-mech', data: 'No Data'},
        {name: 'Bathroom', device: 's-occ-bath', data: 'No Data'}
    ];

    $scope.OccSensors = occupancySensors;
    

    var successCallback = function(data)
    {
        var device = $.grep($scope.OccSensors, function(e){return e.device == data['device-id']})[0];

        if(device)
        {
            device.data = parseInt(data.status)/10.0;
        }
    }

    for(var i = 0; i < $scope.OccSensors.length; i++) {
        deviceService.getData(successCallback, $scope.OccSensors[i]);
    }
});
