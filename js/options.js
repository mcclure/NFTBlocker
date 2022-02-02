var optionsApp = angular.module('twBlockchain', ['ngRoute','kcd.directives','datatables'])
optionsApp.config(['$routeProvider',
function($routeProvider) {
    $routeProvider.
    when('/receipts', {
        templateUrl: 'partial_receipts.html',
        controller: 'ReceiptsController'
    }).
    when('/protected', {
        templateUrl: 'partial_protects.html',
        controller: 'ProtectedController'
    }).
    when('/add-protection', {
        templateUrl: 'partial_add_protection.html',
        controller: 'AddProtectionController'
    }).
    otherwise({
        redirectTo: '/receipts'
    });
}]);
optionsApp.factory('StorageService', function() {
    var storage = new ExtensionStorage();
    return storage;
});

optionsApp.controller('ReceiptsController', ['StorageService', '$scope', function(StorageService, $scope) {
    $scope.currentPage = 0;
    $scope.pages = [];
    $scope.data = {
        search: ''
    };
    var originalDataset = null;
    const amount = 50;
    StorageService.getLocal("blockingReceipts",function(items) {
        var dataset = [];
        for(var username in items.blockingReceipts) {
            var receipt = items.blockingReceipts[username];
            receipt.username = username;
            dataset.push( receipt );
        }
        originalDataset = dataset;
        $scope.receipts = dataset;
        sliceReceipts();
        makePageArray();
        $scope.$apply();
    });
    $scope.setPage = setPage;
    $scope.getNumOfPages = getNumOfPages;
    $scope.$watch('data.search', function() {
        if (originalDataset) {
            filterDataset();
            sliceReceipts();
            makePageArray();
        }
    });
    function filterDataset() {
        $scope.receipts = originalDataset.filter((item) => {
            return item.username.toLowerCase().indexOf($scope.data.search.toLowerCase()) > -1
            || item.connection.toLowerCase().indexOf($scope.data.search.toLowerCase()) > -1;
        });
    }
    function sliceReceipts() {
        $scope.slicedReceipts = $scope.receipts.slice($scope.currentPage * amount, ($scope.currentPage + 1) * amount);
    }
    function getNumOfPages() {
        return Math.floor($scope.receipts.length / amount) + 1;
    }
    function makePageArray() {
        $scope.pages = [];
        for (var i = 0; i < getNumOfPages(); i++) {
            $scope.pages.push(i);
        }
    }
    function setPage(num) {
        if (num >= 0 && num < getNumOfPages())
        $scope.currentPage = num;
        sliceReceipts();
    }
}]);

optionsApp.controller('ProtectedController', ['StorageService', '$scope', function(StorageService, $scope) {
    $scope.should = {};
    $scope.should.refreshTable = false;
    
    StorageService.getSync("protectedUsers",function(items) {
        $scope.protectedUsers=[];
        for(var username in items.protectedUsers) {
            $scope.protectedUsers.push(items.protectedUsers[username]);
        }
        $scope.should.refreshTable = true;
        $scope.$apply();
    });
    $scope.deleteProtection = function(user) {
        var response = confirm("Você tem certeza que quer remover "+user.username+" da lista de usuários protegidos?");
        if (!response)
            return;
        StorageService.getSync("protectedUsers",function(items) {
            if (typeof items.protectedUsers === "undefined") {
                items.protectedUsers = {};
            }
            delete items.protectedUsers[user.username];
            StorageService.setSync({ protectedUsers: items.protectedUsers }, function() {
                $scope.protectedUsers = items.protectedUsers;
                $scope.should.refreshTable = true;
                $scope.$apply();
            });
        });
    }
}]);
optionsApp.controller('AddProtectionController', ['StorageService', '$scope', '$location', function(StorageService, $scope, $location) {
    $scope.user = {username: "", on: Date.now()};
    $scope.error = false;
    $scope.submit = function() {
        $scope.error = false;
        if ($scope.user.username == "" || !$scope.user.username) {
            $scope.error = "Você precisa inserir um nome de usuário";
            return;
        }
        StorageService.getSync("protectedUsers",function(items) {
            if (typeof items.protectedUsers === "undefined") {
                items.protectedUsers = {};
            }
            items.protectedUsers[$scope.user.username] = $scope.user;
            StorageService.setSync({ protectedUsers: items.protectedUsers }, function() {
                $location.url('/protected');
                $scope.$apply();
            });
        });
    };
}]);
optionsApp.controller('NavigationController', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function(path) {
        return ($location.url().indexOf(path) > -1);
    }
}]);

    
    
angular.module('kcd.directives',[]).directive('kcdRecompile', function($compile, $parse) {
    'use strict';

    return {
        scope: true, // required to be able to clear watchers safely
        compile: function(el) {
            var template = el.html();
            return function link(scope, $el, attrs) {
                scope.$parent.$watch(attrs.kcdRecompile, function(_new, _old) {
                    var useBoolean = attrs.hasOwnProperty('useBoolean');
                    if ((useBoolean && (!_new || _new === 'false')) || (!useBoolean && (!_new || _new === _old))) {
                        return;
                    }
                    // remove all watchers because the recompiled version will set them up again.
                    removeChildrenWatchers($el);
                    // reset kcdRecompile to false if we're using a boolean
                    if (useBoolean) {
                        $parse(attrs.kcdRecompile).assign(scope.$parent, false);
                    }

                    // recompile
                    var newEl = $compile(template)(scope.$parent.$new());
                    $el.html(newEl);
                });
            };
        }
    };

    function removeChildrenWatchers(element) {
        angular.forEach(element.children(), function(childElement) {
            removeAllWatchers(angular.element(childElement));
        });
    }

    function removeAllWatchers(element) {
        if (element.data().hasOwnProperty('$scope')) {
            element.data().$scope.$$watchers = [];
        }
        removeChildrenWatchers(element);
    }
});