/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/

(function(vx) {
	
    var locales = {};
    vx.module("ibsapp").value('$locale', locales);

    locales.id = "zh_CN";

    // data-time formats
    locales.DATETIME_FORMATS = {
        "TITLE" : ["年", "月", "日"],
        "MONTH" : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        "SHORTMONTH" : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        "DAY" : ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        "SHORTDAY" : ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        "AMPMS" : ["上午", "下午"],
        "medium" : "yyyy-M-d ah:mm:ss",
        "short" : "yy-M-d ah:mm",
        "fullDate" : "y年M月d日EEEE",
        "longDate" : "y年M月d日",
        "mediumDate" : "yyyy-M-d",
        "shortDate" : "yy-M-d",
        "mediumTime" : "ah:mm:ss",
        "shortTime" : "ah:mm"
    };

    // number formats
    locales.NUMBER_FORMATS = {
        "DECIMAL_SEP" : ".",
        "GROUP_SEP" : ",",
        "PATTERNS" : [{
            "minInt" : 1,
            "minFrac" : 0,
            "maxFrac" : 3,
            "posPre" : "",
            "posSuf" : "",
            "negPre" : "-",
            "negSuf" : "",
            "gSize" : 3,
            "lgSize" : 3
        }, {
            "minInt" : 1,
            "minFrac" : 2,
            "maxFrac" : 2,
            "posPre" : "\u00A4",
            "posSuf" : "",
            "negPre" : "\u00A4-",
            "negSuf" : "",
            "gSize" : 3,
            "lgSize" : 3
        }],
        "CURRENCY_SYM" : "¥"
    };

    /**
     * fields/messages for example $field("xxxx")/$msg("xxxx") or
     * $locale.FIELDS.xxxx/$locale.MESSAGES.xxxx
     */
    var fields = {}, messages = {};
    locales.FIELDS = fields;
    locales.MESSAGES = messages;
    messages["Currency"] = {
        "AUD" : "澳大利亚元",
        "CAD" : "加拿大元",
        "CHF" : "瑞士法郎",
        "CNY" : "人民币",
        "EUR" : "欧元",
        "GBP" : "英镑",
        "HKD" : "港币",
        "JPY" : "日元",
        "NZD" : "新西兰元",
        "SEK" : "瑞典克郎",
        "SGD" : "新加坡元",
        "USD" : "美元"
    };
	messages["idCard"] = {
		"00": "居民身份证",
		"01": "临时身份证",
		"03": "军人身份证",
		"04": "武警身份证",
		"05": "护照",
		"06": "港澳居民往来内地通行证/回乡证",
		"07": "台湾居民往来内地通行证",
		"08": "其他身份证明文件(个人)"
	};
	/*我的奖品-奖品名称*/
    messages["AwardType"]={
      "0" : "开户送流量",
      "1" : "入金抽红包",
      "2" : "推荐赢大奖",
      "3" : "定期转入",
      "4" : "微理财申购",
      "5" : "微袋宝申购",
      "6" : "生活缴费",
      "7" : "手机充值",
      "8" : "加油卡充值"
    };
    /**/
    messages["bdState"]={
      "B":"绑定卡",
      "C":"支付卡"
    };
    /*银行理财-风险评估等级*/
    messages["ProductRisk"]={
        "1" : "极低",
        "2" : "低",
        "3" : "较低",
        "4" : "中等",
        "5" : "高"
    };
    /*缴费历史明细交易状态*/
    messages["chargeStatus"]={
        "0":"成功",
        "1":"失败",
        "2":"待确认",
        "3":"已退款"
    };
    /**精选产品状态**/
    messages["buyStatus"]={
        "0":"预售",
        "1":"购买",
        "2":"售罄"
    };
    /**精选产品分类**/
    messages["Fund_oname"]={
        "ZS":"定期类产品",//招商招益
        "YYY":"定期类产品",//月月盈
        "TLB":"活期类产品",//添利宝
        "WZC":"银行存款",//微智存
        "HNLC":"银行理财"
    };
    /*行内理财交易类型*/
    messages["HNLCTrsType"]={
        "002":"异常冻结到期解冻",
        "110":"差错调整",
        "121":"预约认购",
        "122":"申购",
        "124":"赎回",
        "129":"设置分红方式",
        "12A":"预约变更",
        "130":"认购",
        "131":"份额控制",
        "132":"份额解控",
        "133":"非交易过户申请",
        "134":"非交易过户转出",
        "135":"非交易过户转入",
        "142":"强制赎回",
        "143":"收益",
        "150":"本金兑付",
        "152":"交易撤单",
        "153":"预约撤销",
        "15B":"单笔调整",
        "170":"权益登记",
        "171":"收益分配",
        "172":"收益结转"
    };
    messages["HNLCTrsState"]={
        "0":"申请成功",
        "1":"申请失败",
        "2":"已撤单(成功)",
        "3":"确认成功",
        "4":"确认失败",
        "5":"单笔确认失败",
        "6":"已撤单(超时)",
        "7":"错误失败"
    };
    //月月盈
    //到期安排
    messages["YYY_DQAP"]={
        "01":"到期自动滚入下一期",
        "00":"到期赎回电子帐户"
    };
    //交易类型
    messages["YYY_JYLX"]={
        "RT04":"申购",
        "RT06":"赎回",
        "RT99":"滚入下一期"
    };
    //交易状态
    messages["YYY_JYZT"]={
        "0":"交易成功",
        "1":"交易失败",
        "9":"待处理"
    };
     //添利宝投资明细交易状态
    messages["TLB_JYZT"]={
        "0" : "成功",
      "1" : "未知",
      "2" : "半成功",
      "3" : "半失败",
      "4" : "失败",
      "5" : "申购预处理",
      "6" : "快速赎回预处理",
      "7" : "普通赎回预处理",
      "8" : "正在处理",
      "9" : "初始状态",
      "c" : "交易撤销"
    };
    messages["PayBusiType"]={
     '0':'电费',
     '1':'水费',
     '2':'燃气费',
     '3':'通讯费',
     '4':'有线电视费',
     '5':'加油卡充值',
     '6':'供暖费',
     '7':'物业费',
     '8':'其他'
    };
})(window.vx);
