angular.module('todoList.filter.MomentDateTime', [])
    .filter('MomentDateTime', function () {
        return function (input) {
            var date = moment(input).format('DD-MM-YYYY');
            return date;
        }
    });
