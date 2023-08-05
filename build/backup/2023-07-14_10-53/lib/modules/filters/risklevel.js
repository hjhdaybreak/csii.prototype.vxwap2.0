//风险等级
(function(window, vx) {'use strict';
	function riskLevelCalor() {
		return function(input) {
			switch (input) {
				case '0':
				case 0:
					return "risk_no";
					break;
				case '1':
				case 1:
					return "risk_di";
					break;
				case '2':
				case 2:
					return "risk_di";
					break;
				case '3':
				case 3:
					return "risk_di";
					break;
				case '4':
				case 4:
					return "risk_zhong";
					break;
				case '5':
				case 5:
					return "risk_gao";
					break;
				default:
					return "risk_gao";
					break;
			}
		};
	};
	vx.module('ui.libraries').filter('riskLevelCalor', riskLevelCalor);
})(window, window.vx); 