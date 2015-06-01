var sodecApp = angular.module('SodecDashboard', []);

sodecApp.service('deviceService', function($http) {
    this.getData = function(successCallback, sensor) {
        $http({
            method: 'GET',
            url: 'http://calpolysolardecathlon.org:3000/srv/latest-event?device=' + sensor.device,
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
            device.data = data;
        } else {
            device.data = parseInt(data.status)/10;
        }

    }

    for(var i = 0; i < TempSensors.length; i++) {
        deviceService.getData(successCallback, $scope.TempSensors[i]);
    }
});



/*
sodecApp.controller('occupancyController', function($scope, deviceService) {
    var occupancySensors = [
        {name: 'Living Room', device: 's-occ-lr'},
        {name: 'Bedroom', device: 's-occ-bed'},
        {name: 'Mechanical Room', device: 's-occ-mech'},
        {name: 'Bathroom', device: 's-occ-bath'}
    ];

    $scope.OccSensors = occupancySensors;

    var successCallback = function(data)
    {
        var device = $.grep($scope.OccSensors, function(e){return e.device == data['device-id']})[0];

        if(typeof data == 'string') {
            device.data = data;
        } else {
            device.data = parseInt(data.status)/10;
        }
    }

    for(var i = 0; i < $scope.OccSensors.length; i++) {
        deviceService.getData(successCallback, $scope.OccSensors[i]);
    }
});

sodecApp.controller('lightingController', function($scope) {
    var lightSensors = [
        {name: 'Living Room', device: 's-occ-lr'},
        {name: 'Bedroom', device: 's-occ-bed'},
        {name: 'Mechanical Room', device: 's-occ-mech'},
        {name: 'Bathroom', device: 's-occ-bath'}
    ];

    $scope.LightSensors = lightSensors;

    var successCallback = function(data)
    {
        console.log('Got back ' + data['device-id']);
        var device = $.grep($scope.TempSensors, function(e){return e.device == data['device-id']})[0];
        device.data = parseInt(data.status)/10;
    }

    for(var i = 0; i < occupancySensors.length; i++) {
        var data = $resource('http://calpolysolardecathlon.org:3000/srv/latest-event?device=' +
            occupancySensors[i].device);
        deviceService.getData(successCallback, $scope.TempSensors[i]);
    }

});
*/
