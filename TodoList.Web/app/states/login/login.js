angular.module('todolist.states.Login', [
    // Angular modules 
    'ui.router',

    // Custom modules 

    // 3rd Party Modules
    'angular-momentjs'

])
    .config(function config($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            views: {
                "main": {
                    controller: 'LoginController',
                    templateUrl: 'app/states/login/login.tpl.html'
                }
            }
        })
    })

    .controller('LoginController', function LoginController($scope, $state, Authentication) {

        $scope.loginData = {
            Email: "",
            Password: ""
        };

        $scope.message = "";
        $scope.processing = false;

        $scope.login = function Login() {
            $scope.processing = true;
            Authentication.login($scope.loginData).then(function (response) {

                $location.path('/todos');

            },
            function (err) {
                $scope.message = err.error_description;
                $scope.processing = false;
            });
        };

        console.log('LoginController');
    })
    ;