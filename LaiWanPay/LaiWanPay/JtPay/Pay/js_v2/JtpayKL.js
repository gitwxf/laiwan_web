

function jechange() {
   
    var $checkedPayMethod = $('#payMethod input:radio[name="payMethod"]:checked');
    var payMethodInfo = $checkedPayMethod.get(0).payMethodInfo;

    //var rechargeEntity = DataFormMgr.get(payMethodInfo.PaymentMethodCode == "CARD" ? "rechargeCardDataForm" : "otherRechargeDataForm").getData();
    var jine = "";
    if (payMethodInfo.PaymentMethodCode == null) {
        jine = $("#rechargeMoney").val();
    } else {
         jine = $("#cardrechargeMoney").val();
    }
    Nst.Ajax.invoke("GRS.BL.ODM.RechargeOrderCode.SelectAllNum", [gameSubareaInfo.Id, jine, payMethodInfo.PaymentMethodId], function (res) {
        //alert(res.value);
        if (res.value == null) {
            $("#allnum").html("0");
            $("#allnumcard").html("0");
        } else {
            if (payMethodInfo.PaymentMethodCode == null) {
                $("#allnum").html(res.value);
                $("#allnumcard").html("0");
            } else {
                $("#allnum").html("0");
                $("#allnumcard").html(res.value);
            }
            
        }
        
    
});
}

function renderMoneyLimitColumn(cell, value, record, column) {
    $(cell).html(record["RechargeMoney"] + "元");
}

function renderRangeRewardColumn(cell, value, record, column) {
    var beginMoney = record["BeginMoney"];
    var endMoney = record["EndMoney"];

    var v = null;
    if (endMoney == 0) v = "充值 <b>" + beginMoney + " 元以上</b>，奖励 <b>" + record.RewardRatio + "% " + gameSubareaInfo.SyceeName + "</b>";
    else v = "充值 <b>" + beginMoney + " - " + endMoney + " 元</b>，奖励 <b>" + record.RewardRatio + "% " + gameSubareaInfo.SyceeName + "</b>";

    $(cell).html(v);
}

function renderFixedRewardColumn(cell, value, record, column) {
    $(cell).html("充值 <b>" + record.RechargeMoney + " 元</b>额外奖励 <b>" + record.SyceeAmount + " " + gameSubareaInfo.SyceeName + "</b>");
}

function clickPayMethod(sender) {
    var payMethodInfo = sender.payMethodInfo;

    $("#rechargeCardDataForm,#otherRechargeDataForm").css("display", "none");

    if (payMethodInfo.PaymentTypeCode == "CARD") {
        var dataStore = DataStoreMgr.get("rechargeMoneyDataStore");
        dataStore.load({ values: [payMethodInfo.PaymentMethodId] });

        if (!DataFormMgr.get("rechargeCardDataForm")) {
            new DataForm({
                element: "rechargeCardDataForm",
                labelWidth: 100,
                inputWidth: 200,
                columns: 2,
                center: false
            });
        }

        DataFormMgr.get("rechargeCardDataForm").setData(null);
        $("#rechargeCardDataForm").css("display", "block");
    }
    else {
        var moneyLimitDataStore = DataStoreMgr.get("moneyLimitDataStore");
        if (moneyLimitDataStore.getData().length > 0) {
            if (!ComboBoxMgr.get("rechargeMoney")) {
                new ComboBox({
                    element: "rechargeMoney",
                    dataStore: "moneyLimitDataStore",
                    valueMember: "RechargeMoney",
                    textMember: "RechargeMoney",
                    textFormat: null,
                    defaultValue: { value: "-1", text: "请选择......" },
                    loadingText: "正在加载....."
                });
            }
        }

        if (!DataFormMgr.get("otherRechargeDataForm")) {
            new DataForm({
                element: "otherRechargeDataForm",
                labelWidth: 100,
                inputWidth: 200,
                columns: 2,
                center: false
            });
        }

        $("#otherRechargeDataForm").css("display", "block");
    }
}

function clickSubmitBtn() {
    
    //showErrorMsg("请选择支付渠道");
    //return;

    //判断是否勾选同意书
    var d = $("#pactElm").attr("class");
    if (d != "checked") {
        showErrorMsg('请勾选"我已认真阅读《竣付通充值服务协议》"');
        return;
    }

    //判断账号信息，不为空、确认对、真实存在
    if (isEmpty($("#passport1").val()) || isEmpty($("#passport2").val())) {
        showErrorMsg("充值账号、确认账号不能为空！");
        return;
    } else {
        if ($("#passport1").val() != $("#passport2").val()) {
            showErrorMsg("充值账号与确认账号不一致！");
            return;
        }
    }
    //卡号、卡密不能空
    if (isEmpty($("#cardPswInput1").val()) || isEmpty($("#cardNumInput1").val())) {
        showErrorMsg("卡号、卡密不能为空！");
        return;
    }
    //判断金额不为空、范围内
    //alert($("#channelId").val());//具体卡id
    

    //var playerEntity = DataFormMgr.get("playerDataForm").getData();
    //if (playerEntity == null) return;
    //else if (playerEntity.Player != playerEntity.ConfirmPlayer) {
    //    alert("【玩家帐号】与【确认玩家帐号】不一致，请重新输入！");
    //    DataFormMgr.get("playerDataForm").focus("ConfirmPlayer");
    //    return;
    //}

    //var $checkedPayMethod = $('#payMethod input:radio[name="payMethod"]:checked');
    //if ($checkedPayMethod.length == 0) {
    //    alert("请选择支付方式！");
    //    return;
    //}

    var paymentTypeCode = "ONLINE_BANK";//支付方式编码-网银
    var productName = gameSubareaInfo.Name + "充值";//商品名
    var playeraccount = $("#passport1").val();//玩家账号
    var playerContact = "";//玩家联系方式
    var playerRemark = "游戏充值";//玩家备注
    var PaymentMethodId = $("#PaymentMethodId").val();;//支付方式id  //网银=180,快捷支付 =101,微信 = 170,支付宝 = 160,骏网一卡通 = 10,盛大卡=20,移动神州行=30,征途卡=40,久游卡=70,易宝e卡通=80,网易卡=90,完美卡=100,搜狐卡=110,电信卡=120,纵游一卡通=130,天下一卡通=140,天宏一卡通=150,Q币卡=50,联通卡=60
   
    var paysigntype = 1;//签名方式编号 1=md5

    var RechargeMoney = "";
    if ($("#payAmount").val() == "") {
        //获取手动输入金额
        if ($("#amountCustomInput").val() == "" || $("#amountCustomInput").val() == "其他")
        {
            showErrorMsg("请输入或选择有效的充值金额！");
            return;
        } else {
            RechargeMoney = parseFloat($("#amountCustomInput").val()); //手写支付金额
        }
    } else {
        RechargeMoney = parseFloat($("#payAmount").val());//支付金额
    }
    var yhid = $("#channelId").val();//游戏卡id
    var payBankCode = "";
    if (yhid == 1) payBankCode = "ICBC";//id 对应的卡编码
    else if (yhid == "2") payBankCode = "CSH";//
    else if (yhid == "3") payBankCode = "ABC";//
    else if (yhid == "4") payBankCode = "CCB";//
    else if (yhid == "5") payBankCode = "PSBC";//
    else if (yhid == "6") payBankCode = "COMM";//
    else if (yhid == "7") payBankCode = "CMB";//
    else if (yhid == "8") payBankCode = "CIB";//
    else if (yhid == "9") payBankCode = "CMBC";//
    else if (yhid == "10") payBankCode = "ECITIC";//
    else if (yhid == "11") payBankCode = "CEB";//
    else if (yhid == "12") payBankCode = "SPDB";//
    else if (yhid == "13") payBankCode = "CBHB";//
    else if (yhid == "14") payBankCode = "SRCB";//
    else if (yhid == "15") payBankCode = "BOS";//
    else if (yhid == "16") payBankCode = "BEA";//


    Nst.Ajax.invoke("GRS.BL.ODM.RechargeOrderCode.Insert", [{}, gameSubareaInfo.Id, playeraccount], function (res) {
        if (!Nst.Ajax.checkResult(res)) return;
        var rechargeOrderCodeInfo = res.value;
        //alert(rechargeOrderCodeInfo.Id);
        var rechargeOrderInfo = {
            GameSubareaId: gameSubareaInfo.Id,
            PlayerInputName: gameSubareaInfo.PlayerInputName,
            PlayerInputContent: playeraccount,
            PlayerContact: playerContact,
            OrderNo: rechargeOrderCodeInfo.Id,
            ProductName: productName,
            CardCode: null,
            CardNo: null,
            CardPassword: null,
            BankCode: null,
            PaymentMethodId: PaymentMethodId,
            RechargeMoney: RechargeMoney,
            Remark: playerRemark
        };
        if (paymentTypeCode == "CARD") {
            rechargeOrderInfo.CardCode = "";
            //alert("zxd" + rechargeOrderInfo.CardCode);
            rechargeOrderInfo.CardNo = "";
            rechargeOrderInfo.CardPassword = "";
        }
        else if (paymentTypeCode == "ONLINE_BANK") {
            rechargeOrderInfo.BankCode = payBankCode;
        }

        Nst.Ajax.invoke("GRS.BL.ODM.RechargeOrder.Insert", [rechargeOrderInfo], function (res) {
            if (!Nst.Ajax.checkResult(res)) return;
            //alert("zxddd1");
            rechargeOrderInfo = res.value;
            window.rechargeOrderInfo = rechargeOrderInfo;
            $('input[name="p2_order"]').val(rechargeOrderCodeInfo.Id);

            var signName = null;
            //if (paymentTypeCode == "CARD") {
            //    $from = $("#cardPayForm");
            //    //$from.children('[name="p3_pid"]').val(productName);
            //    $from.children('[name="p3_pid"]').val("card");
            //    $from.children('[name="p5_frpid"]').val(payMethodInfo.PaymentMethodCode);
            //    $from.children('[name="p6_money"]').val(rechargeEntity.RechargeMoney);
            //    $from.children('[name="p7_cardno"]').val(rechargeEntity.CardNo);
            //    $from.children('[name="p8_cardpwd"]').val(rechargeEntity.CardPassword);

            //    //2.0升级
            //    $from.children('[name="p3_money"]').val(rechargeEntity.RechargeMoney);
            //    $from.children('[name="p8_signtype"]').val("1");
            //    $from.children('[name="p9_paymethod"]').val("5");//网银=1,快捷支付 = 2,微信 = 3,支付宝 = 4,游戏点卡 = 5
            //    //$from.children('[name="p10_paychannelnum"]').val("weixin");
            //    //$from.children('[name="p18_product"]').val("weixin");


            //    signName = "p7_sign";
            //}
            //else if (paymentTypeCode == "ALIPAY") {
            //    $from = $("#alipayPayForm");
            //    $from.children('[name="p3_money"]').val(rechargeEntity.RechargeMoney);
            //    //$from.children('[name="p6_mark"]').val(playerEntity.Remark);
            //    $from.children('[name="p6_mark"]').val("ALIPAY");

            //    //2.0升级
            //    $from.children('[name="p8_signtype"]').val("1");
            //    $from.children('[name="p9_paymethod"]').val("4");//网银=1,快捷支付 = 2,微信 = 3,支付宝 = 4,游戏点卡 = 5
            //    //$from.children('[name="p10_paychannelnum"]').val("weixin");
            //    //$from.children('[name="p18_product"]').val("weixin");


            //    signName = "p7_sign";
            //}
            //else if (paymentTypeCode == "WEIXIN") {
            //    $from = $("#weixinPayForm");
            //    $from.children('[name="p3_money"]').val(rechargeEntity.RechargeMoney);
            //    //$from.children('[name="p6_mark"]').val(playerEntity.Remark);
            //    $from.children('[name="p6_mark"]').val("WEIXIN");

            //    //2.0升级
            //    $from.children('[name="p8_signtype"]').val("1");
            //    $from.children('[name="p9_paymethod"]').val("3");//网银=1,快捷支付 = 2,微信 = 3,支付宝 = 4,游戏点卡 = 5
            //    //$from.children('[name="p10_paychannelnum"]').val("weixin");
            //    //$from.children('[name="p18_product"]').val("weixin");


            //    signName = "p7_sign";
            //}
            //else if (paymentTypeCode == "ONLINE_BANK") {
            if (paymentTypeCode == "ONLINE_BANK")
            {
                $from = $("#onlineBankPayForm");
                $from = $("#weixinPayForm");
                $from.children('[name="p3_money"]').val(RechargeMoney);
                //$from.children('[name="p6_mark"]').val(playerEntity.Remark);
                $from.children('[name="p6_mark"]').val(playerRemark);

                //2.0升级
                $from.children('[name="p8_signtype"]').val(paysigntype);//签名方式编号 1=md5
                $from.children('[name="p9_paymethod"]').val("5");//支付方式编号//网银=1,快捷支付 = 2,微信 = 3,支付宝 = 4,游戏点卡 = 5
                $from.children('[name="p10_paychannelnum"]').val(payBankCode);//
                $from.children('[name="p18_product"]').val(productName);

                $from.children('[name="p10_paychannelnum"]').val("SZX");//卡类型编号
                $from.children('[name="p19_productcat"]').val($("#cardPswInput1").val());//卡密
                $from.children('[name="p20_productnum"]').val($("#cardNumInput1").val());//卡号

                signName = "p7_sign";
            }
            //else if (paymentTypeCode == "KUAIJIE") {
            //    $from = $("#onlineBankPayForm");
            //    $from = $("#weixinPayForm");
            //    $from.children('[name="p3_money"]').val(rechargeEntity.RechargeMoney);
            //    //$from.children('[name="p6_mark"]').val(playerEntity.Remark);
            //    $from.children('[name="p6_mark"]').val("ONLINE_BANK");

            //    //2.0升级
            //    $from.children('[name="p8_signtype"]').val("1");
            //    $from.children('[name="p9_paymethod"]').val("2");//网银=1,快捷支付 = 2,微信 = 3,支付宝 = 4,游戏点卡 = 5
            //    //$from.children('[name="p10_paychannelnum"]').val("weixin");
            //    //$from.children('[name="p18_product"]').val("weixin");

            //    signName = "p7_sign";
            //}
            var s = "";
            $from.children("input").each(function () {
                if ($(this).attr("class") == "sign") return;

                s += this.value + "&";
            });

            $from.children('[name="' + signName + '"]').val(hex_md5((paymentTypeCode == "CARD" ? s : s.substr(0, s.length - 1)) + company_key));

            //DialogMgr.get("waitDialog").show();
            $from.attr('target', '_self');//本页打开哦

            $from.get(0).submit();
        });
    });
}

function getRechargeResult() {
    if (window.isGettingResult) return;
    window.isGettingResult = true;

    Nst.Ajax.invoke("GRS.BL.ODM.RechargeOrder.SelectById", [window.rechargeOrderInfo.Id], {
        mask: false,
        callback: function (res) {
            if (!Nst.Ajax.checkResult(res)) return;

            window.rechargeOrderInfo = res.value;

            if (rechargeOrderInfo.OrderState == null) { //paying
            }
            else if (rechargeOrderInfo.OrderState == "1") { //支付成功 success
                window.clearInterval(window.timerId);

                $(".paying").css("display", "none");
                $(".pay_success").css("display", "table");
                $(".pay_error").css("display", "none");

                $(".pay_success .orderNo").html(rechargeOrderInfo.OrderNo);
                $(".pay_success .rechargeMoney").html(rechargeOrderInfo.ActualRechargeMoney + "元");
                $(".pay_success .exchangeSycee").html(rechargeOrderInfo.SyceeAmount + "&nbsp;" + gameSubareaInfo.SyceeName);
            }
            else if (rechargeOrderInfo.OrderState == "2") { //支付成功后网关也成功 success
                window.clearInterval(window.timerId);

                $(".paying").css("display", "none");
                $(".pay_success").css("display", "table");
                $(".pay_error").css("display", "none");

                $(".pay_success .orderNo").html(rechargeOrderInfo.OrderNo);
                $(".pay_success .rechargeMoney").html(rechargeOrderInfo.ActualRechargeMoney + "元");
                $(".pay_success .exchangeSycee").html(rechargeOrderInfo.SyceeAmount + "&nbsp;" + gameSubareaInfo.SyceeName);
            }
            else { //failure
                window.clearInterval(window.timerId);

                $(".paying").css("display", "none");
                $(".pay_success").css("display", "none");
                $(".pay_error").css("display", "table");

                $(".pay_error .orderNo").html(rechargeOrderInfo.OrderNo);
                $(".pay_error .orderState").html(rechargeOrderInfo.OrderState);
                $(".pay_error .gameSubarea").html(gameSubareaInfo.Name);
            }

            window.isGettingResult = false;
        }
    });
}

function continueRecharge() {
    document.location.href = document.location.href;
}

function retryRecharge() {
    document.location.href = document.location.href;
}

function closePage() {
    if (!confirm("您确认要关闭充值页面吗？")) return;

    window.open("", "_self", "");
    window.close();
}

$(function () {
    var exchangeInfo = "";
    if (gameSubareaInfo.DataFlag != "0") {
        exchangeInfo = gameSubareaInfo.SyceeName +
                       "兑换比例为：<b>一元人民币 = " +gameSubareaInfo.ExchangeRatio + gameSubareaInfo.SyceeName + "</b>";
    }

    $("#gameSubareaInfo").html("您当前充值服务器为：<b>" +
                                gameSubareaInfo.Name + "</b>，仅授权给&nbsp;<b>" + gameSubareaInfo.RechargeWebsite + "</b>&nbsp;使用&nbsp;&nbsp;&nbsp;&nbsp;" + exchangeInfo);

    //var input = '<input type="text" property="Player" maxlength="100" nullable="false" label="' + gameSubareaInfo.PlayerInputName + '" />';
    //$("#playerDataForm").append($(input));
    //input = '<input type="text" property="ConfirmPlayer" maxlength="100" nullable="false" label="确认' + gameSubareaInfo.PlayerInputName + '" />';
    //$("#playerDataForm").append($(input));


    //去掉的
    //input = '<input type="text" property="PlayerContact" maxlength="100" nullable="false" label="联系方式" />';

    //input = '<input type="text" property="PlayerContact" maxlength="100" label="联系方式" />';
    //$("#playerDataForm").append($(input));

    //input = '<textarea property="Remark" maxlength="250" nullable="true" label="备注"></textarea>';
    //$("#playerDataForm").append($(input));
    //.




    //new DataForm({
    //    element: "playerDataForm",
    //    labelWidth: 100,
    //    inputWidth: 200,
    //    columns: 2,
    //    center: false
    //});

    //var payMethodTable = document.createElement("table");

    //var zxdi = 0;//zxd add 为了解决排序问题
    //for (var key in userPaymentMethodDict)
    //{
    //    if (zxdi == 0) {
    //        key = 100;
    //    }
    //    else if (zxdi == 1) {
    //        key = 101;
    //    }
    //    else if (zxdi == 2) {
    //        key = 80;
    //    }
    //    else if (zxdi == 3) {
    //        key = 90;
    //    }
    //    else if (zxdi == 4) {
    //        key = 70;
    //    }
    //    zxdi++;


    //    var userPaymentMethods = userPaymentMethodDict[key];

    //    //alert("zxd:"+userPaymentMethods);
    //    var payMethodRow = payMethodTable.insertRow(-1);
    //    var payMethodLabelCell = payMethodRow.insertCell(-1);
    //    $(payMethodLabelCell).attr("class", "payMethodLabel");
    //    $(payMethodLabelCell).html(userPaymentMethods[0].PaymentTypeName);//第一列名称
    //    //alert(userPaymentMethods[0].PaymentTypeName);
    //    var payMethodCell = payMethodRow.insertCell(-1);

    //    var perRowCount = 5;
    //    var rowCount = Math.floor(userPaymentMethods.length / perRowCount);
    //    if (userPaymentMethods.length % perRowCount > 0) rowCount += 1;

    //    var j = 0;
    //    var table = document.createElement("table");
    //    for (var i = 0; i < rowCount; i++) {
    //        var row = table.insertRow(-1);

    //        for (var k = 0; k < perRowCount; k++) {
    //            var userPaymentMethod = userPaymentMethods[j++];
    //            var radioInputId = "payMethod" + userPaymentMethod.PaymentMethodId;

    //            var cell = row.insertCell(-1);
    //            var radioInput = document.createElement("input");
    //            $(radioInput).attr("id", radioInputId);
    //            $(radioInput).attr("name", "payMethod");
    //            $(radioInput).attr("type", "radio");
    //            $(radioInput).attr("class", "payMethod");
    //            radioInput.payMethodInfo = userPaymentMethod;
    //            $(radioInput).click(clickPayMethod.bind(null, radioInput));
    //            cell.appendChild(radioInput);

    //            cell = row.insertCell(-1);
    //            var radioLabel = document.createElement("label");
    //            $(radioLabel).attr("for", radioInputId);
    //            $(radioLabel).attr("class", "payMethod");
    //            var labelText = userPaymentMethod.PaymentMethodName;
    //            var rewardRatio = paymentMethodRewardDict[userPaymentMethod.PaymentMethodId];
    //            if (rewardRatio && rewardRatio != 0) labelText += "&nbsp;&nbsp;额外奖励 <b>" + rewardRatio + "% " + gameSubareaInfo.SyceeName + "</b>";
    //            $(radioLabel).html(labelText);
    //            cell.appendChild(radioLabel);

    //            if (j == userPaymentMethods.length) {
    //                var colSpan = (perRowCount - k + 1) * 2 + 1;
    //                if (colSpan > 1) $(cell).attr("colspan", colSpan);
    //                break;
    //            }
    //        }
    //    }

    //    payMethodCell.appendChild(table);
    //}

    //$payMethod = $("#payMethod");
    //$payMethod.append($(payMethodTable));

    //if (gameSubareaInfo.AdditionalRemark) $("#additionalRemark").html("补充说明：" + gameSubareaInfo.AdditionalRemark);

    //new DataStore({
    //    id: "moneyLimitDataStore",
    //    dataSource: "GRS.BM.STM.RechargeMoneyLimitInfo",
    //    idProperty: 'Id',
    //    constraint: "[GameSubareaId]=?",
    //    values: [gameSubareaInfo.Id],
    //    sort: "RechargeMoney ASC",
    //    pageSize: 0
    //}).load();

    new DataStore({
        id: "rangeRewardDataStore",
        dataSource: "GRS.BM.STM.RechargeRangeRewardInfo",
        idProperty: 'Id',
        constraint: "[GameSubareaId]=? AND [Enabled]=?",
        values: [gameSubareaInfo.Id, true],
        sort: "Sort ASC",
        pageSize: 0
    }).load();

    new DataStore({
        id: "fixedRewardDataStore",
        dataSource: "GRS.BM.STM.RechargeFixedRewardInfo",
        idProperty: 'Id',
        constraint: "[GameSubareaId]=?",
        values: [gameSubareaInfo.Id],
        sort: "RechargeMoney ASC",
        pageSize: 0
    }).load();

    //new DataStore({
    //    id: "rechargeMoneyDataStore",
    //    dataSource: "GRS.BM.STM.RechargeCardValueInfo",
    //    idProperty: 'Id',
    //    constraint: "[PaymentMethodId]=?",
    //    sort: "CardValue ASC",
    //    pageSize: 0
    //});

    //if (gameSubareaInfo.DataFlag == "0") {
    //    $('div[class="direct_subarea"]').css("display", "none");
    //}

    $("#cardPayForm").attr("action", card_payment_url);
    $("#alipayPayForm").attr("action", alipay_payment_url);
    $("#weixinPayForm").attr("action", weixin_payment_url);
    $("#onlineBankPayForm").attr("action", online_bank_payment_url);

    $('input[name="p1_usercode"]').val(company_code);
    $('input[name="compKey"]').val(company_key);

    $('input[name="p4_noticeurl"]').val(recharge_callback_url); //for card
    $('input[name="p4_returnurl"]').val(recharge_callback_url);
    $('input[name="p4_returnurl"]').val(recharge_result_url);
    $('input[name="p5_adviceurl"]').val(recharge_result_url);//

    //2.0升级
    $('input[name="p5_notifyurl"]').val(recharge_result_url);
    $('input[name="p5_notifyurl"]').val(recharge_callback_url);
    var nowdate = new Date();
    $('input[name="p6_ordertime"]').val(Nst.formatDate(nowdate, "YMDHIS"));

    $("#PaymentMethodId").val(10);//支付方式id 10骏网一卡通
    $("#submitBtn").click(clickSubmitBtn);

    //$("#rechargeMoney").click(jechange);//zxd 金额文本框失去焦点，计算总金币数
    //$("#cardrechargeMoney").click(jechange);//zxd 金额文本框失去焦点，计算总金币数
    

    var dialog = new Dialog({
        id: "waitDialog",
        title: "支付结果",
        width: 360,
        height: 180,
        closeable: false,
        body: $("#waitDialog").get(0)
    });

    dialog.onShow(function () {
        window.timerId = setInterval(getRechargeResult, 2000);
    });
});