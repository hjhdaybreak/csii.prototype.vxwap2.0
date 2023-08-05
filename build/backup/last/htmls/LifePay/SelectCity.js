'use strict';
/**
 * 生活缴费城市选择
 */
ibsapp.register.controller('SelectCityCtrl', ["$filter", "$state", "$stateParams", "$cookieService", "$location", "$rootScope", '$scope', '$remote', '$nativeCall',
function($filter, $state, $stateParams, $cookieService, $location, $rootScope, $scope, $remote, $nativeCall) {
	/***整理出需要的列表
	 *@list 要整理的集合
	 * @initialField要过滤的内容的首字母所对应的字段名称
	 **/
	$rootScope.getLastBankList = function(list, initialField) {
		var scope = this;
		if (list) {
			var TheTempBankList = vx.copy(list);
			var AObjectList = [];
			var BObjectList = [];
			var CObjectList = [];
			var DObjectList = [];
			var EObjectList = [];
			var FObjectList = [];
			var GObjectList = [];
			var HObjectList = [];
			var IObjectList = [];
			var JObjectList = [];
			var KObjectList = [];
			var LObjectList = [];
			var MObjectList = [];
			var NObjectList = [];
			var OObjectList = [];
			var PObjectList = [];
			var QObjectList = [];
			var RObjectList = [];
			var SObjectList = [];
			var TObjectList = [];
			var UObjectList = [];
			var VObjectList = [];
			var WObjectList = [];
			var XObjectList = [];
			var YObjectList = [];
			var ZObjectList = [];
			var AObject = {
				"bankFlagName" : "A",
				"bankFlagNameList" : AObjectList
			};
			var BObject = {
				"bankFlagName" : "B",
				"bankFlagNameList" : BObjectList
			};
			var CObject = {
				"bankFlagName" : "C",
				"bankFlagNameList" : CObjectList
			};
			var DObject = {
				"bankFlagName" : "D",
				"bankFlagNameList" : DObjectList
			};
			var EObject = {
				"bankFlagName" : "E",
				"bankFlagNameList" : EObjectList
			};
			var FObject = {
				"bankFlagName" : "F",
				"bankFlagNameList" : FObjectList
			};
			var GObject = {
				"bankFlagName" : "G",
				"bankFlagNameList" : GObjectList
			};
			var HObject = {
				"bankFlagName" : "H",
				"bankFlagNameList" : HObjectList
			};
			var IObject = {
				"bankFlagName" : "I",
				"bankFlagNameList" : IObjectList
			};
			var JObject = {
				"bankFlagName" : "J",
				"bankFlagNameList" : JObjectList
			};
			var KObject = {
				"bankFlagName" : "K",
				"bankFlagNameList" : KObjectList
			};
			var LObject = {
				"bankFlagName" : "L",
				"bankFlagNameList" : LObjectList
			};
			var MObject = {
				"bankFlagName" : "M",
				"bankFlagNameList" : MObjectList
			};
			var NObject = {
				"bankFlagName" : "N",
				"bankFlagNameList" : NObjectList
			};
			var OObject = {
				"bankFlagName" : "O",
				"bankFlagNameList" : OObjectList
			};
			var PObject = {
				"bankFlagName" : "P",
				"bankFlagNameList" : PObjectList
			};
			var QObject = {
				"bankFlagName" : "Q",
				"bankFlagNameList" : QObjectList
			};
			var RObject = {
				"bankFlagName" : "R",
				"bankFlagNameList" : RObjectList
			};
			var SObject = {
				"bankFlagName" : "S",
				"bankFlagNameList" : SObjectList
			};
			var TObject = {
				"bankFlagName" : "T",
				"bankFlagNameList" : TObjectList
			};
			var UObject = {
				"bankFlagName" : "U",
				"bankFlagNameList" : UObjectList
			};
			var VObject = {
				"bankFlagName" : "V",
				"bankFlagNameList" : VObjectList
			};
			var WObject = {
				"bankFlagName" : "W",
				"bankFlagNameList" : WObjectList
			};
			var XObject = {
				"bankFlagName" : "X",
				"bankFlagNameList" : XObjectList
			};
			var YObject = {
				"bankFlagName" : "Y",
				"bankFlagNameList" : YObjectList
			};
			var ZObject = {
				"bankFlagName" : "Z",
				"bankFlagNameList" : ZObjectList
			};
			//将字母不同的Model，分别装进不同的对象
			for (var k = 0; k < TheTempBankList.length; k++) {
				switch(TheTempBankList[k][initialField]) {
					case 'a':
					case 'A':
						AObjectList.push(TheTempBankList[k]);
						break;
					case 'b':
					case 'B':
						BObjectList.push(TheTempBankList[k]);
						break;
					case 'c':
					case 'C':
						CObjectList.push(TheTempBankList[k]);
						break;
					case 'd':
					case 'D':
						DObjectList.push(TheTempBankList[k]);
						break;
					case 'e':
					case 'E':
						EObjectList.push(TheTempBankList[k]);
						break;
					case 'f':
					case 'F':
						FObjectList.push(TheTempBankList[k]);
						break;
					case 'g':
					case 'G':
						GObjectList.push(TheTempBankList[k]);
						break;
					case 'h':
					case 'H':
						HObjectList.push(TheTempBankList[k]);
						break;
					case 'i':
					case 'I':
						IObjectList.push(TheTempBankList[k]);
						break;
					case 'j':
					case 'J':
						JObjectList.push(TheTempBankList[k]);
						break;
					case 'k':
					case 'K':
						KObjectList.push(TheTempBankList[k]);
						break;
					case 'l':
					case 'L':
						LObjectList.push(TheTempBankList[k]);
						break;
					case 'm':
					case 'M':
						MObjectList.push(TheTempBankList[k]);
						break;
					case 'n':
					case 'N':
						NObjectList.push(TheTempBankList[k]);
						break;
					case 'o':
					case 'O':
						OObjectList.push(TheTempBankList[k]);
						break;
					case 'p':
					case 'P':
						PObjectList.push(TheTempBankList[k]);
						break;
					case 'q':
					case 'Q':
						QObjectList.push(TheTempBankList[k]);
						break;
					case 'r':
					case 'R':
						RObjectList.push(TheTempBankList[k]);
						break;
					case 's':
					case 'S':
						SObjectList.push(TheTempBankList[k]);
						break;
					case 't':
					case 'T':
						TObjectList.push(TheTempBankList[k]);
						break;
					case 'u':
					case 'U':
						UObjectList.push(TheTempBankList[k]);
						break;
					case 'v':
					case 'V':
						VObjectList.push(TheTempBankList[k]);
						break;
					case 'w':
					case 'W':
						WObjectList.push(TheTempBankList[k]);
						break;
					case 'x':
					case 'X':
						XObjectList.push(TheTempBankList[k]);
						break;
					case 'y':
					case 'Y':
						YObjectList.push(TheTempBankList[k]);
						break;
					case 'z':
					case 'Z':
						ZObjectList.push(TheTempBankList[k]);
						break;
				}
			}
			//将最终的Model，装进想要的Model列表
			var TheLastBankList = [AObject, BObject, CObject, DObject, EObject, FObject, GObject, HObject, IObject, JObject, KObject, LObject, MObject, NObject, OObject, PObject, QObject, RObject, SObject, TObject, UObject, VObject, WObject, XObject, YObject, ZObject];
			var FilterLastBankTempList = new Array();
			var FilterLastBankList = new Array();
			for (var i = 0; i < TheLastBankList.length; i++) {
				if (TheLastBankList[i].bankFlagNameList.length > 0) {
					FilterLastBankTempList.push(TheLastBankList[i]);
				}
			}
			for (var s = 0; s < FilterLastBankTempList.length; s++) {
				for (var t = 0; t < FilterLastBankTempList[s].bankFlagNameList.length; t++) {
					FilterLastBankTempList[s].bankFlagNameList[t].QuanPin = $filter("ChineseCharactersToPinyinFilter")(FilterLastBankTempList[s].bankFlagNameList[t].AREA_NAME, "QuanPinType");
					FilterLastBankTempList[s].bankFlagNameList[t].SuoXie = $filter("ChineseCharactersToPinyinFilter")(FilterLastBankTempList[s].bankFlagNameList[t].AREA_NAME, "SuoXieType");
				};
				FilterLastBankList.push(FilterLastBankTempList[s]);
			}
			return FilterLastBankList;
		}
	};
	/*Model列表结束*/
	//初始化函数
	$scope.startup = function() {
		//获取城市所在位置
		if (sessionStorage.getItem("PayCityString")) {
			$scope.PayCity = vx.fromJson(sessionStorage.getItem("PayCityString"));
		}
		$scope.KeyWords = '';
		$remote.post("PaymentCityListQry.do", {}, function(data) {
			//生成城市List
			$scope.PayCityList = data.PayCityList;
			$scope.HotCityList = data.HotCityList;
			//确定热门城市行数
			var HotCityLineCount = Math.ceil($scope.HotCityList.length / 3);
			//获取热门城市行数计算相应高度
			$("div.searchListBox").css({
				'top' : 180 + 44 * HotCityLineCount
			});
			//对Model列表进行过滤
			$scope.TheLastBankList = $rootScope.getLastBankList($scope.PayCityList, "AREA_INITIAL");
			//监听vRepeat是否遍历完成事件对象
			$scope.$on("vRepeatFinished", function(vRepeatFinishedEvent) {
				$(function() {
					$('#nav').ECommGetPosition({
						currentClass : 'current',
						changeHash : false,
						scrollSpeed : 750,
					});
				});
			});
		});
	};
	//字符显示
	$scope.charactorShowFn = function(row) {
		$scope.KeyWords = '';
		$scope.CharactorFlagName = row.bankFlagName;
		$("div#letter").fadeIn();
		setTimeout(function() {
			$("div#letter").fadeOut();
		}, 1000);
	};
	//选择某一城市
	$scope.selectHotCityFn = function(row) {
		//选择了新的城市，重置当前城市
		$scope.PayCity = row;
		//$scope.PayCity为生活缴费模块公用数据，需保存到sessionStorage中
		sessionStorage.setItem("PayCityString", vx.toJson($scope.PayCity));
		//选择了新的城市，重置缴费城市
		$scope.BusiType = {};
		$scope.BusiType.AREA_CODE = $scope.PayCity.AREA_CODE;
		$scope.BusiType.AREA_NAME = $scope.PayCity.AREA_NAME;
		$scope.BusiType.BUSI_TYPE = null;
		//重置缴费类型
		sessionStorage.setItem("busitypeString", vx.toJson($scope.BusiType));
		//返回历史前一页面
		$scope.goback();
	};
	//清除城市选择信息
	$scope.deleteCitySelectDataFn = function() {
		$scope.KeyWords = '';
	};
}]);
