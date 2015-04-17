var app = angular.module("demoApp", []);

app.factory('taskFactory', function() {

  var tasks = [
  { task :  'Clean Room No - 103' , time : '45'},
  { task :  'Fix Bulb in Room' , time : '5'},
  { task :  'Inform guest for checkout' , time : '5'}
  ];

  var employee = [
    { name:'Elivia', role:'Manager', tasks: [{ task :  'Book a room for guest' , time : '5'}], total: 5},
    { name:'Tito', role:'Maintenance Guy', tasks: [{ task :  'Jacuzi water pipe leakage' , time : '5'},], total: 5},
    { name:'Diana', role:'House Keeping', tasks: [{ task :  'Clean Room No - 201' , time : '45'}], total: 45}
  ];


  var factory = {};

  factory.getTask = function() {
    return tasks;
  }

  factory.assignTask = function(user, task) {
    console.log(task);
    for(e in employee) {
      console.log(e)
      if(employee[e].name == user.name) {
        employee[e].tasks.push(task);
        employee[e].total+=parseInt(task.time);
        tasks.splice(tasks.indexOf(task),1);
      }
    }
  } 

  factory.getEmployee = function() {
    return employee;
  } 

  return factory;
});

app.controller("taskController", function($scope, taskFactory) {

  $scope.tasks = taskFactory.getTask();

  $scope.addTask = function() {
    //console.log($scope.newtask)
    $scope.tasks.push($scope.newtask);
    $scope.newtask = {};
  }

});

app.controller("taskListController", function($scope, taskFactory) {
  //$scope.options = ['Elivia(Manager)', 'Diana(House Keeping)', 'Tito(Maintenance Guy)'];
  $scope.tasks = taskFactory.getTask(); 
  $scope.employee = taskFactory.getEmployee();

  $scope.deleteTask = function(task) {
    $scope.tasks.splice($scope.tasks.indexOf(task),1);
  }
   $scope.assignTask = function(task) {
    
    var assignedUser = task.user;
    // console.log(assignedUser);
    // console.log(task);
    taskFactory.assignTask(assignedUser, task);
  }

});


app.controller("assignedTasksController", function($scope, taskFactory) {
  $scope.employee = taskFactory.getEmployee();

  $scope.completetask = function(user, task) {
    
    console.log('test');
    console.log(user);
    console.log(task);
    $scope.employee[$scope.employee.indexOf(user)]
    .tasks[$scope.employee[$scope.employee.indexOf(user)].tasks.indexOf(task)].done=true;
    $scope.employee[$scope.employee.indexOf(user)].total-=parseInt(task.time);
  }



});