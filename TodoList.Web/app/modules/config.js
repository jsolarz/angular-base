angular.module('todolist.module.Config', [])
    .constant('TodoListConfig', {
        BaseUrl: 'http://localhost:52785/',
        Api: 'http://localhost:52785/api/',
        LocalStoragePrefix: 'TodoList'

    })

    ;
