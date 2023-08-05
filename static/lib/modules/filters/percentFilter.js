/**
 * @author zy
 */
(function(window, vx, undefined) {'use strict';
	var filter = {};
	filter.percent = ['calculate','$filter',function(calculate,$filter) {
		return function(input, length) {
		   var dotLength=length||4;
           if(/^[\d.]+$/.test(input)){
               	return $filter("number")(calculate.accMul(input,1),dotLength)+"%";
           }
		};
	}];
	vx.module('ui.libraries').filter('percent', filter.percent);
})(window, window.vx);