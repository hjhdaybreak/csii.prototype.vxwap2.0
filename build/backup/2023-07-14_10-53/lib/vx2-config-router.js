/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
(function(window, vx, undefined) {
    'use strict';
    var ibsapp = vx.module("ibsapp");
    /**
     * 路由配置
     * App Module
     */
    ibsapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$controllerProvider', "$compileProvider", "$filterProvider", "$provide",
        function($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {


            /******路由配置开始******/
            /*****************菜单页********************/
            $stateProvider.state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'htmls/AppView.html'
                })
                //主页
                .state('app.Main', {
                    url: '/Main',
                    templateUrl: 'htmls/Main/Main.html'
                })
                //我的
                .state('app.My', {
                    url: '/My',
                    templateUrl: 'htmls/My/My.html'
                })
                //财富
                .state('app.Wealth', {
                    url: '/Wealth',
                    templateUrl: 'htmls/Wealth/Wealth.html'
                })
                //生活
                .state('app.Life', {
                    url: '/Life',
                    templateUrl: 'htmls/Life/Life.html'
                })
                //无菜单页view
                .state('appOther', {
                    abstract: true,
                    url: '/appOther',
                    templateUrl: 'htmls/AppOther.html'
                })
                /***推荐 begin***/
                //推荐好友
                .state('appOther.RecommendFriend', {
                    url: '/RecommendFriend/:name/:seq',
                    templateUrl: 'htmls/RecommendFriend/RecommendFriend.html'

                })
                //我的推荐
                .state('appOther.MyRecommendQry', {
                    url: '/MyRecommendQry',
                    templateUrl: 'htmls/MyRecommendQry/Mod.html'

                })
                //我的推荐--达人榜
                .state('appOther.Daren', {
                    url: '/Daren',
                    templateUrl: 'htmls/Daren/Daren.html'

                })
                /***推荐 end***/
                //侧拉抽屉中关于我们
                .state('appOther.AboutUs', {
                    url: '/AboutUs',
                    templateUrl: 'htmls/AboutUs/AboutUs.html'

                })
                //定期转部分---列表
                .state('appOther.RegularShiftTo', {
                    url: '/RegularShiftTo',
                    templateUrl: 'htmls/RegularShiftTo/RegularShiftTo.html'

                })
                //定期转部分---添加
                .state('appOther.RegularShiftTo_Add', {
                    url: '/RegularShiftTo_Add',
                    templateUrl: 'htmls/RegularShiftTo_Add/Mod.html'

                })
                //定期转部分---修改
                .state('appOther.RegularShiftTo_Update', {
                    url: '/RegularShiftTo_Update',
                    templateUrl: 'htmls/RegularShiftTo_Update/Mod.html'

                })
                //定期转部分---删除
                .state('appOther.RegularShiftTo_Delete', {
                    url: '/RegularShiftTo_Delete',
                    templateUrl: 'htmls/RegularShiftTo_Delete/Mod.html'

                })
                //侧拉抽屉常见问题
                .state('appOther.ComQuestion', {
                    url: '/ComQuestion',
                    templateUrl: 'htmls/ComQuestion/ComQuestion.html'

                })
                //我的智能存款
                .state('appOther.MySmartDeposit', {
                    url: '/MySmartDeposit',
                    templateUrl: 'htmls/MySmartDeposit/Mod.html'

                })
                //智能存款产品详情
                .state('appOther.SmartDeposit', {
                    url: '/SmartDeposit',
                    templateUrl: 'htmls/SmartDeposit/Mod.html'

                })
                //我的智能存款 - 投资明细
                .state('appOther.MySmartInvestmentDetail', {
                    url: '/MySmartInvestmentDetail',
                    templateUrl: 'htmls/MySmartInvestmentDetail/Mod.html'

                })
                //智能存款签约
                .state('appOther.SmartDepositSign', {
                    url: '/SmartDepositSign',
                    templateUrl: 'htmls/SmartDepositSign/Mod.html'

                })
                //智能存款解约
                .state('appOther.SmartDepositRelease', {
                    url: '/SmartDepositRelease/:value',
                    templateUrl: 'htmls/SmartDepositRelease/Mod.html'

                })
                //智能存款服务协议
                .state('appOther.ZNCK_FWXY', {
                    url: '/ZNCK_FWXY',
                    templateUrl: 'htmls/Agreements/ZNCK_FUXY.html'

                })
                //我的定期产品列表
                .state('appOther.MyRegular', {
                    url: '/MyRegular',
                    templateUrl: 'htmls/MyRegular/Mod.html'

                })
                //定期产品列表
                .state('appOther.RegularList', {
                    url: '/RegularList',
                    templateUrl: 'htmls/RegularList/Mod.html'

                })
                //月月盈购买
                .state('appOther.YYY_Buy', {
                    url: '/YYY_Buy',
                    templateUrl: 'htmls/YYY_Buy/Mod.html'

                })
                //月月盈产品查询
                .state('appOther.YYY_Query', {
                    url: '/YYY_Query',
                    templateUrl: 'htmls/YYY_Query/Mod.html'

                })
                //月月盈修改到期安排
                .state('appOther.YYY_ModifyDue', {
                    url: '/YYY_ModifyDue',
                    templateUrl: 'htmls/YYY_ModifyDue/Mod.html'

                })
                //月月赢投资明细
                .state('appOther.YYY_InvestDet', {
                    url: '/YYY_InvestDet',
                    templateUrl: 'htmls/YYY_InvestDet/YYY_InvestDet.html'

                })
                //我的月月盈
                .state('appOther.MyYYY', {
                    url: '/MyYYY',
                    templateUrl: 'htmls/MyYYY/MyYYY.html'

                })
                //我的月月盈详情
                .state('appOther.MyYYYDetail', {
                    url: '/MyYYYDetail',
                    templateUrl: 'htmls/MyYYYDetail/MyYYYDetail.html'

                })
                //月月盈服务协议
                .state('appOther.YYY_FWXY', {
                    url: '/YYY_FWXY',
                    templateUrl: 'htmls/Agreements/YYY_FWXY.html'

                })
                //月月盈基金合同
                .state('appOther.YYY_JJHT', {
                    url: '/YYY_JJHT',
                    templateUrl: 'htmls/Agreements/YYY_JJHT.html'

                })
                //月月盈基金招募说明书
                .state('appOther.YYY_JJZMSMS', {
                    url: '/YYY_JJZMSMS',
                    templateUrl: 'htmls/Agreements/YYY_JJZMSMS.html'

                })
                //历史收益率(月月赢 、添利宝)
                .state('appOther.HistoryRate', {
                    url: '/HistoryRate',
                    templateUrl: 'htmls/HistoryRate/HistoryRate.html'

                })
                //招商招益持有查询
                .state('appOther.MyZSZY', {
                    url: '/MyZSZY/:value',
                    templateUrl: 'htmls/MyZSZY/Mod.html'

                })
                //招商招益 - 产品购买
                .state('appOther.ZSZY_Buy', {
                    url: '/ZSZY_Buy/:value',
                    templateUrl: 'htmls/ZSZY_Buy/mod.html'

                })
                //招商招益 - 产品追加购买
                .state('appOther.ZSZY_AppendBuy', {
                    url: '/ZSZY_AppendBuy',
                    templateUrl: 'htmls/ZSZY_AppendBuy/mod.html'

                })
                //招商招益-历史净值查询
                .state('appOther.ZSZY_FundHistNetWorth', {
                    url: '/ZSZY_FundHistNetWorth/:value',
                    templateUrl: 'htmls/ZSZY_FundHistNetWorth/Mod.html'
                })
                //招商招益-明细查询
                .state('appOther.ZSZY_InvestmentDetail', {
                    url: '/ZSZY_InvestmentDetail',
                    templateUrl: 'htmls/ZSZY_InvestmentDetail/InvestmentDetailList.html'
                })
                //招商招益的详情页
                .state('appOther.ZSZYDetail', {
                    url: '/ZSZYDetail/:zszyProd',
                    templateUrl: 'htmls/ZSZYDetail/Mod.html'
                })
                //招商招益服务协议
                .state('appOther.ZSZY_FWXY', {
                    url: '/ZSZY_FWXY',
                    templateUrl: 'htmls/Agreements/ZSZY_FWXY.html'
                })
                //招商招益基金合同
                .state('appOther.ZSZY_JJHT', {
                    url: '/ZSZY_JJHT',
                    templateUrl: 'htmls/Agreements/ZSZY_JJHT.html'
                })
                //招商招益基金招募说明书
                .state('appOther.ZSZY_ZMSMS', {
                    url: '/ZSZY_ZMSMS',
                    templateUrl: 'htmls/Agreements/ZSZY_ZMSMS.html'
                })
                //生活缴费
                .state('appOther.PaidedLife', {
                    url: '/PaidedLife',
                    templateUrl: 'htmls/LifePay/Mod.html'
                })
                //生活缴费-主页
                .state('appOther.LifeMain', {
                    url: '/LifeMain/:prePageUrl',
                    templateUrl: 'htmls/LifePay/LifeMain.html'
                })
                //生活缴费-缴费名册进入缴费
                .state('appOther.BookPayMent', {
                    url: '/BookPayMent',
                    templateUrl: 'htmls/LifeBookPayMent/Mod.html'
                })
                //生活缴费-城市定位选择
                .state('appOther.SelectCity', {
                    url: '/SelectCity',
                    templateUrl: 'htmls/LifePay/SelectCity.html'
                })
                //生活缴费-缴费提醒
                .state('appOther.LifePaymentReminder', {
                    url: '/LifePaymentReminder',
                    templateUrl: 'htmls/LifePaymentReminder/LifePaymentReminder.html'
                })
                //生活缴费-缴费提醒更改
                .state('appOther.LifePaymentReminderUpdate', {
                    url: '/LifePaymentReminderUpdate',
                    templateUrl: 'htmls/LifePaymentReminder/LifePaymentReminderUpdate.html'
                })
                //生活缴费-常见问题
                .state('appOther.LifePaymentComQuestion', {
                    url: '/LifePaymentComQuestion',
                    templateUrl: 'htmls/LifePaymentComQuestion/LifePaymentComQuestion.html'
                })
                //生活缴费-预约缴费
                .state('appOther.LifeReservationPayment', {
                    url: '/LifeReservationPayment',
                    templateUrl: 'htmls/LifeReservationPayment/LifeReservationPayment.html'
                })
                //生活缴费-预约缴费更改
                .state('appOther.LifeReservationPaymentUpdate', {
                    url: '/LifeReservationPaymentUpdate',
                    templateUrl: 'htmls/LifeReservationPayment/LifeReservationPaymentUpdate.html'
                })
                //生活缴费-添加预约缴费
                .state('appOther.LifeReservationPaymentAdd', {
                    url: '/LifeReservationPaymentAdd',
                    templateUrl: 'htmls/LifeReservationPaymentAdd/Mod.html'
                })
                //生活缴费-缴费历史
                .state('appOther.LifePaymentHistQry', {
                    url: '/LifePaymentHistQry',
                    templateUrl: 'htmls/LifePaymentHistQry/Mod.html'
                })
                //手机话费流量-----充值   
                .state('appOther.PhoneRecharge', {
                    url: '/PhoneRecharge',
                    templateUrl: 'htmls/PhoneRecharge/Mod.html'
                })
                //手机话费流量-----记录
                .state('appOther.PhoneChargeRecord', {
                    url: '/PhoneChargeRecord',
                    templateUrl: 'htmls/PhoneChargeRecord/Mod.html'
                })
                //注册
                .state('appOther.Registe', {
                    url: '/Registe',
                    templateUrl: 'htmls/Registe/Mod.html'
                })
                //实名认证
                .state('appOther.NameAuth', {
                    url: '/NameAuth',
                    templateUrl: 'htmls/NameAuth/NameAuth.html'
                })
                //忘记登录密码
                .state('appOther.ForgetLoginPwd', {
                    url: '/ForgetLoginPwd',
                    templateUrl: 'htmls/ForgetLoginPwd/Mod.html'
                })
                //我的资产-交易明细（也是电子账户对应银行卡列表的交易明细，都是电子账户的交易明细）
                .state('appOther.InvestmentDetail', {
                    url: '/InvestmentDetail',
                    templateUrl: 'htmls/InvestmentDetail/InvestmentDetailList.html'
                })
                //电子银行账户下的银行卡列表只展示使用
                .state('appOther.MyBankCard', {
                    url: '/MyBankCard',
                    templateUrl: 'htmls/MyBankCard/Mod.html'
                })
                //我的银行卡交易明细
                .state('appOther.MyBankCardInvestmentDetail', {
                    url: '/MyBankCardInvestmentDetail',
                    templateUrl: 'htmls/MyBankCardInvestmentDetail/MyBankCardInvestmentDetail.html'
                })
                //我的银行卡-交易中可选择
                .state('appOther.CardList', {
                    url: '/CardList',
                    templateUrl: 'htmls/CardList/CardList.html'
                })
                //贷款部分---------贷款查询
                .state('appOther.RepayInfoQry', {
                    url: '/RepayInfoQry',
                    templateUrl: 'htmls/RepayInfoQry/RepayInfoQry.html'
                })
                //贷款部分---------贷款详情
                .state('appOther.LoanDetail', {
                    url: '/LoanDetail',
                    templateUrl: 'htmls/loanDetail/LoanDetail.html'
                })
                //贷款部分--------自动还款维护   
                .state('appOther.RepayAutoMaintain', {
                    url: '/RepayAutoMaintain',
                    templateUrl: 'htmls/RepayAutoMaintain/RepayAutoMaintain.html'
                })
                //贷款部分--------还款修改
                .state('appOther.RepayAutoUpdate', {
                    url: '/RepayAutoUpdate',
                    templateUrl: 'htmls/RepayAutoUpdate/Mod.html'
                })
                //贷款部分--------自动还款删除
                .state('appOther.RepayAutoDel', {
                    url: '/RepayAutoDel',
                    templateUrl: 'htmls/RepayAutoDel/Mod.html'
                })
                //贷款部分--------还款历史
                .state('appOther.RepayHisQry', {
                    url: '/RepayHisQry',
                    templateUrl: 'htmls/RepayHisQry/RepayHisQry.html'
                })
                //贷款部分--------提前还款
                .state('appOther.RepayMentforward', {
                    url: '/RepayMentforward',
                    templateUrl: 'htmls/RepayMentforward/Mod.html'
                })
                //贷款部分--------按期还款
                .state('appOther.RepayTransfer', {
                    url: '/RepayTransfer',
                    templateUrl: 'htmls/RepayTransfer/Mod.html'
                })
                //贷款部分--------自动还款设置
                .state('appOther.RepayAutoAdd', {
                    url: '/RepayAutoAdd',
                    templateUrl: 'htmls/RepayAutoAdd/Mod.html'
                })
                //贷款部分--------还款计划表
                .state('appOther.RepayPlanQry', {
                    url: '/RepayPlanQry/:url',
                    templateUrl: 'htmls/RepayPlanQry/RepayPlanQry.html'
                })
                //添利宝部分-----添利宝购买
                .state('appOther.TLB_Buy', {
                    url: '/TLB_Buy',
                    templateUrl: 'htmls/TLB_Buy/Mod.html'
                })
                //添利宝部分-----添利宝投资明细
                .state('appOther.TLB_InvestmentDetail', {
                    url: '/TLB_InvestmentDetail',
                    templateUrl: 'htmls/TLB_InvestmentDetail/TLB_InvestmentDetail.html'
                })
                //添利宝部分-----添利宝详情
                .state('appOther.TLB_ProductSearch', {
                    url: '/TLB_ProductSearch',
                    templateUrl: 'htmls/TLB_ProductSearch/Mod.html'
                })
                //添利宝部分-----添利宝赎回
                .state('appOther.TLB_ShuHui', {
                    url: '/TLB_ShuHui',
                    templateUrl: 'htmls/TLB_ShuHui/Mod.html'
                })
                //添利宝部分----我的添利宝
                .state('appOther.TLBMy', {
                    url: '/TLBMy',
                    templateUrl: 'htmls/TLBMy/TLBMy.html'
                })
                //添利宝部分----添利宝持有查询
                .state('appOther.TLBHoldShareQry', {
                    url: '/TLBHoldShareQry',
                    templateUrl: 'htmls/TLBHoldShareQry/TLBHoldShareQry.html'
                })
                //添利宝部分-----活期产品列表查询
                .state('appOther.TLBProductList', {
                    url: '/TLBProductList',
                    templateUrl: 'htmls/TLBProductList/TLBProductList.html'
                })
                //我的个人信息      
                .state('appOther.MyInformation', {
                    url: '/MyInformation',
                    templateUrl: 'htmls/MyInformation/Mod.html'
                })
                //收益明细
                .state('appOther.IncomeStatement', {
                    url: '/IncomeStatement/:type/:income',
                    templateUrl: 'htmls/IncomeStatement/IncomeStatement.html'
                })
                //银行理财产品查询
                .state('appOther.BankProductQuery', {
                    url: '/BankProductQuery',
                    templateUrl: 'htmls/BankProductQuery/Mod.html'
                })
                //银行理财产品详情
                .state('appOther.BankProductQueryDetail', {
                    url: '/BankProductQueryDetail',
                    templateUrl: 'htmls/BankProductQuery/BankProductQueryDetail.html'
                })
                //银行理财投资明细
                .state('appOther.BankInvestmentDetail', {
                    url: '/BankInvestmentDetail',
                    templateUrl: 'htmls/BankInvestment/BankInvestmentDetail.html'
                })
                //银行理财产品购买
                .state('appOther.BankProductBuy', {
                    url: '/BankProductBuy',
                    templateUrl: 'htmls/BankProductBuy/Mod.html'
                })
                //行内理财产品购买风险评估
                .state('appOther.HNLCRiskAssessment', {
                    url: '/HNLCRiskAssessment',
                    templateUrl: 'htmls/HNLCRiskAssessment/HNLCRiskAssessment.html'
                })
                //行内理财追加购买
                .state('appOther.HNLCAppendBuy', {
                    url: '/HNLCAppendBuy',
                    templateUrl: 'htmls/HNLCAppendBuy/mod.html'
                })
                //行内理财协议
                .state('appOther.HNLCXieyi', {
                    url: '/HNLCXieyi',
                    templateUrl: 'htmls/HNLCXieyi/HNLCXieYi.html'
                })
                //我的理财产品
                .state('appOther.MyBankProduct', {
                    url: '/MyBankProduct',
                    templateUrl: 'htmls/MyBankProduct/MyBankProduct.html'
                })
                //理财产品撤单
                .state('appOther.BankProductCancel', {
                    url: '/BankProductCancel',
                    templateUrl: 'htmls/BankProductCancel/mod.html'
                })
                //我的消息列表
                .state('appOther.MyNews', {
                    url: '/MyNews',
                    templateUrl: 'htmls/MyNews/Mod.html'
                })
                //资金转入
                .state('appOther.MoneyIn', {
                    url: '/MoneyIn',
                    templateUrl: 'htmls/MoneyIn/Mod.html'
                })
                //资金转出
                .state('appOther.MoneyOut', {
                    url: '/MoneyOut',
                    templateUrl: 'htmls/MoneyOut/Mod.html'
                })
                //加油卡充值
                .state('appOther.GasCardCharge', {
                    url: '/GasCardCharge',
                    templateUrl: 'htmls/GasCardCharge/mod.html'
                })
                //加油卡充值记录查询(列表和详情，点击记录可以查看详情)
                .state('appOther.GasCardChargeRecord', {
                    url: '/GasCardChargeRecord',
                    templateUrl: 'htmls/GasCardChargeRecord/mod.html'
                })
                //下载app--公共页
                .state('appOther.DownApp', {
                    url: '/DownApp',
                    templateUrl: 'htmls/DownApp/DownApp.html'
                })
                //精彩活动主页
                .state('appOther.ActiveMain', {
                    url: '/ActiveMain',
                    templateUrl: 'htmls/ActiveMain/Mod.html'
                })
                //我的奖品
                .state('appOther.MyAward', {
                    url: '/MyAward',
                    templateUrl: 'htmls/MyAward/MyAward.html'
                })
                //精彩活动---大转盘
                .state('appOther.Lottery', {
                    url: '/Lottery',
                    templateUrl: 'htmls/Lottery/Lottery.html'
                });
            /*;
            /******路由配置结束******/

            //默认装置路由
            $urlRouterProvider.otherwise(function($injector) {
                var $state = $injector.get("$state");
                if (!sessionStorage.getItem("thirdLogin")) {
                    $state.go("app.Main");
                } else {
                    //sessionStorage.setItem("paramSB")
                    $state.go("appOther.ThirdPartyMain", { "SB": sessionStorage.getItem("paramSB") });
                }
            });

            /******路由配置结束******/

            //是否使用全局controller
            $controllerProvider.allowGlobals();
            // H5模式configure html5 to get links working on jsfiddle
            //$locationProvider.html5Mode(true);

            // lazy controller, directive and service
            ibsapp.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                constant: $provide.constant,
                value: $provide.value
            };
            ibsapp.controller = $controllerProvider.register;
            ibsapp.directive = $compileProvider.directive;
            ibsapp.filter = $filterProvider.register;
            ibsapp.factory = $provide.factory;
            ibsapp.service = $provide.service;
            ibsapp.constant = $provide.constant;
            ibsapp.value = $provide.value;

            ibsapp.asyncjs = function(js, title, noHistory) {
                fn.$inject = ['$q'];

                function fn($q) {
                    if (window.CLIENTMODE) {
                        // 转场调用通知设置标题名称
                        NativeCall.SetTitle(title);
                    } else {
                        if (title) {
                            if (noHistory && noHistory == "nohistory") {
                                vx.element("#app_title .leftBt").hide();
                            } else {
                                vx.element("#app_title .leftBt").show();
                            }
                            vx.element("#app_title").show().children(".center").html(title);
                        } else {
                            vx.element("#app_title").hide();
                        }
                    }
                    if (js) {
                        var delay = $q.defer(),
                            load = function() {
                                $.getScript(js, function() {
                                    delay.resolve();
                                });
                            };
                        load();
                        return delay.promise;
                    }
                }

                return fn;
            };

        }
    ]);

})(window, vx);
