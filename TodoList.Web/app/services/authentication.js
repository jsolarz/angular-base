'use strict';

angular.module('TodoList.service.Authentication', ['ngResource'])

    .factory('Authentication', ['$http', '$q', 'localStorageService', 'TodoListConfig', function ($http, $q, localStorageService, TodoListConfig) {

        var serviceBase = TodoListConfig.BaseUrl;
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: ""
        };

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.Email + "&password=" + loginData.Password;

            var deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(function (response) {

                    localStorageService.set('authorizationData', { token: response.data.access_token, userName: loginData.Email });

                    _authentication.isAuth = true;
                    _authentication.userName = loginData.Email;

                    deferred.resolve(response);

                }, function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });

            return deferred.promise;

        };

        var _logOut = function () {

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";

        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
            }

        }

        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;

        return authServiceFactory;
    }]);

angular.module('TodoList.service.AuthInterceptorService', ['ngResource'])

    .factory('authInterceptorService', ['$q', '$injector', '$location', '$state', 'localStorageService', function ($q, $injector, $location, $state, localStorageService) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get('authService');
                var authData = localStorageService.get('authorizationData');

                if (authData) {
                    if (authData.useRefreshTokens) {
                        //$location.path('/refresh');
                        return $q.reject(rejection);
                    }
                }
                authService.logOut();
                //$location.path('/login');
                $state.go('login');
            }
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }]);