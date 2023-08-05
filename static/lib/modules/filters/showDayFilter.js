/**
 * @author zy
 */
(function(window, vx, undefined) {'use strict';
	var filter = {};
	filter.showDay = [function() {
		return function(input) {
		   if(!input){
		   	 return ;
		   }else if( input*1+""=='NaN'){
              return input;
		   }else{
		   	  return input+"天";
		   }
		};
	}];
	vx.module('ibsapp').filter('showDay', filter.showDay);
})(window, window.vx);
(function(window, vx) {'use strict';
	function amountTwo() {
		return function(input) {
			if (input !== undefined && input > 9999) {
				return input / 10000 + '万';
			} else {
				return input;
			}

		};
	}


	vx.module('ui.libraries').filter('amountTwoFtr', amountTwo);
})(window, window.vx);
/**
 * @wangkai
 * filter 月份小写转大写
 */
(function(window, vx) {'use strict';
	function MonthToUpper() {
		return function(input) {
			if (input !== undefined) {
				var date = new Date();
				var month = date.getMonth() + 1;
				//当前月份

				if (input == month) {
					return "本";
				} else {
					switch(input) {
						case "1":
							return "一";
						case "2":
							return "二";
						case "3":
							return "三";
						case "4":
							return "四";
						case "5":
							return "五";
						case "6":
							return "六";
						case "7":
							return "七";
						case "8":
							return "八";
						case "9":
							return "九";
						case "10":
							return "十";
						case "11":
							return "十一";
						case "12":
							return "十二";
						default:
							return input;
					}
				}
			}
			return input;
		};
	}


	vx.module('ui.libraries').filter('MonthToUpper', MonthToUpper);

})(window, window.vx);
//银行卡过滤器
(function(window, vx) {'use strict';
	function bankCardCalor() {
		return function(input) {
			
			switch (input) {
				case "305100000013":
					return "card01 bank_minsheng";
				case "102100099996":
					return "card01 bank_gongshang";
				case "104100000004":
					return "card01 bank_zhongguo";
				case "403100000004":
					return "card01 bank_youzheng";
				case "309391000011":
					return "card01 bank_xingye";
				case "303100000006":
					return "card01 bank_guangda";
				case "307584007998":
					return "card01 bank_pingan";
				case "306581000003":
					return "card01 bank_guangfa";
				case "302100011000":
					return "card01 bank_zhongxin";
				case "313168000003":
					return "card01 bank_jincheng";
				default:
					return "card01 bank_other";
			}
		};
	};
	vx.module('ui.libraries').filter('bankCardCalor', bankCardCalor);
})(window, window.vx); 
//银行卡logo过滤器
(function(window, vx) {'use strict';
	function bankCardLogoFilterFn() {
		return function(input) {
			
			switch (input) {
				case "305100000013":
					return "minsheng.png";
				case "102100099996":
					return "zhongguogongshang.png";
				case "104100000004":
					return "zhongguoyinhang.png";
				case "403100000004":
					return "zhonguoyouzheng.png";
				case "309391000011":
					return "xingye.png";
				case "303100000006":
					return "guangda.png";
				case "307584007998":
					return "pingan.png";
				case "306581000003":
					return "guangfa.png";
				case "302100011000":
					return "zhongxin.png";
				case "313168000003":
					return "jincheng.png";
				default:
					return "";	
			}
		};
	};
	vx.module('ui.libraries').filter('bankCardLogoFilter', bankCardLogoFilterFn);
})(window, window.vx);
