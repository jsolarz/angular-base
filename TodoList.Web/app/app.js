
angular.module('todoListApp', [

    'todolist.module.Config',
    'todolist.constants.Urls',

    /** External Libs **/
    'ui.router',
    'angular-momentjs',
    'underscore',
    'LocalStorageModule',
    'xeditable',

    /** States/Routes **/
    'todolist.states.Todos',
    'todolist.states.Login',
    'todolist.states.Register',

    /** Services **/    
    'TodoList.service.Authentication',
    'TodoList.service.AuthInterceptorService',
    'TodoList.service.Todo',
    'TodoList.service.Account',

    /** Directives **/
    'todoList.directive.AppCalendar',
    'todoList.directive.DateInput',
    'todoList.filter.MomentDateTime',
    'todoList.filters.truncate'
])
    .config(function ($urlRouterProvider, $locationProvider, $uiViewScrollProvider, $httpProvider, localStorageServiceProvider, TodoListConfig, $qProvider) {
        $httpProvider.interceptors.push('authInterceptorService');

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        /**
         * Normalize URLs and add a trailing slash, if it's missing
         */
        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path(),
                normalized = path.toLowerCase();

            if (path != normalized) {
                path = normalized;
            }

            if (path[path.length - 1] !== '/') {
                path = path + "/";
            }

            return path;
        });

        /**
         * If no other routes match, simply redirect to the front page
         * (or change this to any other page, like a 404).
         */
        $urlRouterProvider.otherwise('/');
        localStorageServiceProvider.setPrefix(TodoListConfig.LocalStoragePrefix);
        $uiViewScrollProvider.useAnchorScroll();
        $qProvider.errorOnUnhandledRejections(false);
    })
    .run(function ($http, $rootScope, $state, $window, $location, Authentication, editableOptions) {
        // Enable credientials (ie. cookies etc.) through the $http Angular Service
        $http.defaults.withCredentials = true;

        $rootScope.prerender = {
            StatusCode: 200,
            Header: ""
        };
        $rootScope.url = window.location.href;

        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {

            var isLogin = toState.name === "login";
            if (isLogin) {
                return; // no need to redirect 
            }

            // now, redirect only not authenticated
            if (Authentication.authentication.isAuth === false) {
                e.preventDefault(); // stop current execution
                $state.go('login'); // go to login
            }
        });

        Authentication.fillAuthData();        

        if (Authentication.authentication.isAuth === false) {
            $state.go('login'); // go to login
        }

        init = function () {
            _.keys($rootScope);
        }

        init();

        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

        console.log("Todo List App");
    })
    .controller('MainController', ['$scope', '$location', '$state', 'Authentication', '_', function ($scope, $location, $state, Authentication, _) {
        init = function () {
            _.keys($scope);
        }

        init();

        $scope.logOut = function () {
            Authentication.logOut();
            $state.go('login'); // go to login
        }

        // now, redirect only not authenticated
        var userInfo = Authentication.authentication;

        if (userInfo.authenticated === false) {
            e.preventDefault(); // stop current execution
            $state.go('login'); // go to login
        }

        $scope.authentication = Authentication.authentication;
    }])
    ;
