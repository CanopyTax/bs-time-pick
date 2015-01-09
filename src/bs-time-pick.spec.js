describe("Angular time pick", function() {
  var elm, scope, input, dateFilter;
  var format = "h:mm a";

  beforeEach(module('bs-time-pick'));

  beforeEach(inject(function($rootScope, $compile, $filter) {
    dateFilter = $filter('date');
    elm = angular.element(
      '<div>' +
        '<input type="text" bs-time-pick ng-model="value" ng-model-options=\'{ updateOn: "blur" }\'>' +
        '<span>{{ value | date:"h:mm a" }}</span>' +
      '</div>'
    );

    scope = $rootScope.$new();
    scope.value = new Date();
    $compile(elm)(scope);
    scope.$digest();

    input = elm.find('input');
  }));

  it("should bind the model with the correct format", function() {
    $('body').append(elm);
    expect(input.val()).toBe(dateFilter(new Date(), format));
  });

  it("should update the model", function() {
    input.val("9:01am").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe("9:01 AM");

    input.val("9:01pm").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe("9:01 PM");

    input.val("9:01 pm").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe("9:01 PM");

    input.val("12:00pm").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe("12:00 PM");

    input.val("12:00am").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe("12:00 AM");

    input.val("9:01 PM").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe("9:01 PM");

    input.val("12:00PM").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe("12:00 PM");
  });

  it("should validate the model by not taking non time values", function() {
    input.val("13:00am").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe(dateFilter(new Date(), format));

    input.val("13:00pm").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe(dateFilter(new Date(), format));

    input.val("3:4am").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe(dateFilter(new Date(), format));

    input.val("3:4pm").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe(dateFilter(new Date(), format));

    input.val("3:70am").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe(dateFilter(new Date(), format));

    input.val("3:70pm").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe(dateFilter(new Date(), format));
  });

  it("should default to 'today' if no initial date is present", function() {
    scope.value = null;
    scope.$digest();
    input.val("9:01am").trigger("input").blur();
    expect(dateFilter(scope.value, format)).toBe("9:01 AM");
    expect(dateFilter(scope.value, "yyyy MMM dd")).toBe(dateFilter(new Date(), "yyyy MMM dd"));
  });
});
