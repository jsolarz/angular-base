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
                    templateUrl: 'app/states/todos/todos.tpl.html'
                }
            }
        })
    })

    .controller('TodosController', function TodosController($scope, $state, Todo, todoData) {

        $scope.todoList = todoData;
        $scope.processing = false;

        $scope.sortType = 'Priority'; // set the default sort type
        $scope.sortReverse = true;  // set the default sort order

        initDatePicker();

        $scope.todoItem = {
            priority: 1,
            description: '',
            userId: 1,
            dueDate: $scope.dt
        };

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

            Todo.done({ id: todo.ID, todo: todo }, function (result) {
                $scope.processing = false;
            }, function (err) {
                console.log("Error: ", err);
                $scope.processing = false;
            });
        };

        $scope.done = function Done(id) {
            $scope.processing = true;

            Todo.remove({ id: id }, function (result) {
                $scope.processing = false;
            }, function (err) {
                console.log("Error: ", err);
                $scope.processing = false;
            });
        };


        function initDatePicker() {
            $scope.dt = new Date();

            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };

            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            $scope.toggleMin = function () {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            };

            $scope.toggleMin();

            $scope.open1 = function () {
                $scope.popup1.opened = true;
            };

            $scope.setDate = function (year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];

            $scope.popup1 = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);

            $scope.events = [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }

                return '';
            }
        }
        console.log('TodosController');
    })
    ;