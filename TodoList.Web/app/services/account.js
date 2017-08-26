angular.module('TodoList.service.Account', ['ngResource'])
    .factory('Account', ['TodoListConfig', '$resource',
        function (TodoListConfig, $resource) {
            return $resource(TodoListConfig.Api + 'account', {}, {
                register: { method: 'POST' },
                login: { method: 'POST' }
            });

        }]);
