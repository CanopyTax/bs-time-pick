/*!
 * bs-time-pick
 * author: Bret Little
 * copyright: 2015
 * license: MIT
 * version: 1.0.1
 */
!function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(){"use strict";var e=angular.module("bs-time-pick",[]);e.directive("bsTimePick",["$filter",function(e){var t=/(1[0-2]|[1-9]):([0-5][0-9])\s*(pm|PM|am|AM)/;return{restrict:"A",require:"ngModel",link:function(r,n,a,i){function o(e,t){return e=parseInt(e),"AM"==t&&12==e?"0":"PM"==t&&12>e?e+12+"":e+""}function u(e){var r=i.$modelValue||new Date,u=t.exec(e);return u&&u[0]===e?(c=!1,new Date(r.getFullYear(),r.getMonth(),r.getDate(),o(u[1],u[3].toUpperCase()),u[2])):(c=!0,n.val(""),l(a.bsShakeCount||4,a.bsShakeDistance||5,a.bsShakeDuration||300),i.$modelValue)}function s(t){return c?"":e("date")(t,"h:mm a")}function l(e,t,r){n.css("position","relative");for(var a=1;e>=a;a++)n.animate({left:-1*t},r/e/4).animate({left:t},r/e/2).animate({left:0},r/e/4)}var c=!1;i.$parsers.push(u),i.$formatters.push(s)}}}])}]);