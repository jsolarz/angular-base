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

    .controller('RegisterController', function RegisterController($scope, $state, Account) {

        $scope.appUser = {
            Name: '',
            Email: '',
            Password: ''
        };
        $scope.processing = false;

        $scope.register = function Register() {
            $scope.processing = true;

            todo.Status = 1;

            Todo.register($scope.appUser, function (result) {
                $scope.processing = false;
            }, function (err) {
                console.log("Error: ", err);
                $scope.processing = false;
            });
        }

        console.log('RegisterController');
    })
    ;