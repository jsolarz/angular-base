angular.module('todolist.states.Register', [
    // Angular modules 
    'ui.router',

    // Custom modules 

    // 3rd Party Modules
    'angular-momentjs'

])
    .config(function config($stateProvider) {
        $stateProvider.state('register', {
            url: '/register',
            views: {
                "main": {
                    controller: 'RegisterController',
                    templateUrl: 'app/states/register/register.tpl.html'
                }
            }
        })
    })

    .controller('RegisterController', function RegisterController($scope, $state, Account, Authentication) {

        $scope.appUser = {
            Name: '',
            Email: '',
            Password: ''
        };
        $scope.processing = false;

        $scope.register = function Register() {
            Authentication.logOut();

            $scope.processing = true;
            
            Account.register($scope.appUser, function (result) {
                $scope.processing = false;
                console.log(result);
                $state.go('login');
            }, function (err) {
                console.log("Error: ", err);
                $scope.processing = false;
            });
        }

        console.log('RegisterController');
    })
    ;