angular.module('todolist.states.Todos', [
    // Angular modules 
    'ui.router',

    // Custom modules 

    // 3rd Party Modules
    'angular-momentjs'

])
    .config(function config($stateProvider) {
        $stateProvider.state('todos', {
            url: '/todos',
            resolve: {
                todoData: ['$q', 'Todo', function ($q, Todo) {
                    var deferred = $q.defer();

                    Todo.query(function resolveSuccess(d) {
                        deferred.resolve(d);
                    }, function resolveError(err) {
                        console.log(err);
                        deferred.reject(d);
                    });

                    return deferred.promise;
                }]
            },
            views: {
                "main": {
                    controller: 'TodosController',
                    templateUrl: '/app/states/todos/todos.tpl.html'
                }
            }
        })
    })

    .controller('TodosController', function TodosController($scope, $state, Todo, todoData) {
        //fix for xeditable form
        $scope.todoList = _.map(todoData, function (todo) {
            todo.DueDate = new Date(todo.DueDate);
            return todo;
        });

        $scope.processing = false;

        $scope.sortType = 'Priority'; // set the default sort type
        $scope.sortReverse = true;  // set the default sort order       

        $scope.todoItem = {
            priority: 1,
            description: '',
            dueDate: ''
        };

        $scope.priorities = [
            { value: 1, text: '1' },
            { value: 2, text: '2' },
            { value: 3, text: '3' },
            { value: 4, text: '4' }
        ];

        $scope.save = function Save() {
            $scope.processing = true;
            Todo.save($scope.todoItem, function (result) {
                $scope.processing = false;
                $scope.todoList.push(result);
            }, function (err) {
                console.log("Error: ", err);
                $scope.processing = false;
            });
        }

        $scope.done = function Done(todo) {
            $scope.processing = true;

            todo.Status = 1;

            Todo.update({ id: todo.ID }, todo, function (result) {
                $scope.processing = false;
            }, function (err) {
                console.log("Error: ", err);
                $scope.processing = false;
            });
        };

        $scope.remove = function Done(id) {
            $scope.processing = true;

            Todo.remove({ id: id }, function (result) {
                $scope.processing = false;
                $scope.todoList = _.without($scope.todoList, _.findWhere($scope.todoList, {
                    ID: id
                }));

            }, function (err) {
                console.log("Error: ", err);
                $scope.processing = false;
            });
        };

        $scope.update = function Update(data, id) {
            $scope.processing = true;

            var todo = _.findWhere($scope.todoList, {
                ID: id
            });

            todo.Description = data.Description;
            todo.Priority = data.Priority;
            todo.DueDate = data.DueDate;

            Todo.update({ id: id }, todo, function (result) {
                $scope.processing = false;
            }, function (err) {
                console.log("Error: ", err);
                $scope.processing = false;
            });
        }

        console.log('TodosController');
    })
    ;