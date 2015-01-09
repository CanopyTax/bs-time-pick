/**
 * Beanstalk Time Pick
 *
 * A time picker directive for entering and validating the time of day.
 *
 * This directive is intended to work together with ng-model provided with a valid date object.
 * If ng-model is null, a new Date will be created for the current day.
 *
 * **NOTE** You must use ng-model-options={ updateOn: "blur" }
 *
 * Optional attributes:
 *  bs-shake-count - the number of shakes the element will be given when invalid data is entered
 *  bs-shake-distance - the distance of the shaking
 *  bs-shake-duration - the duration of the shaking in milliseconds
 *
 */

var atp = angular.module("bs-time-pick", []);

atp.directive("bsTimePick", [ '$filter', function($filter) {

  /** regex for validating input from the user **/
  var re = /(1[0-2]|[1-9]):([0-5][0-9])\s*(pm|PM|am|AM)/

  return {

    /** this is only an attribute directive and should only be used on an input that has ng-model **/
    restrict: "A",
    require: 'ngModel',

    link: function(scope, el, attr, ngModel) {
      var invalid = false;

      /**
       * Parse an hour string from 1-12 AM/PM into 0-23 format.
       *
       * @param hours - a string 1-12 representing the hours
       * @param aa - expected to be "AM" or "PM"
       *
       * @return string representing the hours from 0-23
       */
      function convertTo24Hour(hours, aa) {
        hours = parseInt(hours);

        if(aa == 'AM' && hours == 12) {
          return "0";
        }

        if(aa == 'PM' && hours < 12) {
          return hours + 12 + "";
        }

        return hours + "";
      }

      /**
       * Read and validate a string into a date object.
       *
       * Because this is purely for time selection, this assumes that there is 
       * already a valid ng-model with a date object present. This is used to calculate
       * the year, month, and day before populating the time of day
       */
      function fromInput(text) {
        var model = ngModel.$modelValue || new Date();
        var results = re.exec(text);
        if(results && results[0] === text) {
          invalid = false;
          return new Date(
            model.getFullYear(),
            model.getMonth(),
            model.getDate(),
            convertTo24Hour(results[1], results[3].toUpperCase()),
            results[2]
          );
        } else {
          invalid = true;
          el.val("");
          shakeElement(attr.bsShakeCount || 4, attr.bsShakeDistance || 5, attr.bsShakeDuration || 300);
          return ngModel.$modelValue;
        }
      }

      /**
       * Parse a date object into a formatted string presented in the input box
       */
      function toInput(date) {
        if(invalid) return "";
        return $filter('date')(date, 'h:mm a');
      }

      /**
       * Shake an element for a given number of shakes, distance, and duration (ms)
       */
      function shakeElement(intShakes, intDistance, intDuration) {
        el.css("position", "relative");
        for (var x=1; x<=intShakes; x++) {
          el.animate({left:(intDistance*-1)}, (((intDuration/intShakes)/4)))
            .animate({left:intDistance}, ((intDuration/intShakes)/2))
            .animate({left:0}, (((intDuration/intShakes)/4)));
        }
      }

      ngModel.$parsers.push(fromInput);
      ngModel.$formatters.push(toInput);
    }
  }
}]);
