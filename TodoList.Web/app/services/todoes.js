angular.module('TodoList.service.Todo', ['ngResource'])
    .factory('Todo', ['TodoListConfig', '$resource',
        function (TodoListConfig, $resource) {
            return $resource(TodoListConfig.Api + 'todoes', {}, {
                query: { method: 'GET', isArray: true },
                get: { method: 'GET' },
                save: { method: 'POST' },
                done: { method: 'PUT', url: TodoListConfig.Api + 'todoes/:id' },
                remove: { method: 'DELETE', url: TodoListConfig.Api + 'todoes/:id' },
            });

        }]);
