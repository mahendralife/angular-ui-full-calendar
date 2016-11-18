var app=angular.module('mwl.calendar.docs', ['mwl.calendar', 'ui.bootstrap']);

  app.controller('KitchenSinkCtrl', function(moment, calendarConfig, $http) {
    var vm = this;
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    //get event data form server
    $http.get('event.json').success(function(response){
      //convert date string to javascript date object
      response.filter(function(value){
         value.startsAt=new Date(value.startsAt);
         value.endsAt=new Date(value.endsAt);
      });

      vm.events=response;
    })

    vm.cellIsOpen = true;
    vm.eventClicked = function(event) {
      console.log(event)
  
    };

    vm.eventTimesChanged = function(event) {
    console.log(event)
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {

      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }

    };

  });
