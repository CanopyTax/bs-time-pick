# bs-time-pick
A basic time picking directive for entering and validating the time of day.

## Installation
bs-time-pick requires jquery and Angular 1.3.*

Install bs-time-pick with bower or npm
```
  bower install --save bs-time-pick
  npm install --save bs-time-pick
```
Or manually download the [built file](https://raw.githubusercontent.com/Beanstalkhq/bs-time-pick/master/build/bs-time-pick.js)

## Usage
Make your angular app depend upon the `bs-time-pick` module
```javascript
angular.module("app", ["bs-time-pick"]);
```
This directive is intended to work together with ng-model which needs to be provided with a valid date object.
If ng-model is null, a new Date will be created for the current day and bound to ng-model. The date model passed to ng-model can easily be shared with a date-picker widget which can select the year, month, day, and bs-time-pick can input the time of day.

**NOTE** You must use ng-model-options={ updateOn: "blur" }

Options: 
 *  bs-shake-count - the number of shakes the element will be given when invalid data is entered
 *  bs-shake-distance - the distance of the shaking
 *  bs-shake-duration - the duration of the shaking in milliseconds
 
## Example
```html
  <input type="text" ng-model="myDate" ng-model-options={ updateOn: "blur" } />
  {{ myDate | date:"h:mm a" }}
```
