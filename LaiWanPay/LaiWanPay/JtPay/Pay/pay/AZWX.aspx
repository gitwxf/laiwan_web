﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AZWX.aspx.cs" Inherits="LaiWanPay.JtPay.Pay.pay.AZWX" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    
    <title>安卓微信wap内嵌收银台</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="../styles_v2/style_min_v20150917.css" />
    <style id="antiClickjack">
        body
        {
            display: none !important;
        }
    </style>

    <script type="text/javascript" src="../js_v2/jquery_v1.8.3.js"></script>

    <script src="../js_v2/main_min_v20150316.js"></script>

    <script type="text/javascript" src="../js_v2/ya.1.3.1-v0521.js"></script>

    <script src="../js_v2/cgame_min_v20150826.js"></script>

    <script type="text/javascript">
        if (self === top) {
            var antiClickjack = document.getElementById("antiClickjack");
            antiClickjack.parentNode.removeChild(antiClickjack);
        } else {
            top.location = self.location;
        }

        dw_start_time = window.dw_start_time = new Date().getTime();
        dw_YYAnalytics = null;
        dw_channelJson = window.dw_channelJson = jQuery.parseJSON('[' +
	    '{"id":1,"bkId":"ICBC","name":"工商银行","seq":1,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":2,"bkId":"CSH","name":"中国银行","seq":2,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":3,"bkId":"ABC","name":"农业银行","seq":3,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":4,"bkId":"CCB","name":"建设银行","seq":4,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":5,"bkId":"PSBC","name":"邮政银行","seq":5,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":6,"bkId":"COMM","name":"交通银行","seq":6,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":7,"bkId":"CMB","name":"招商银行","seq":7,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":8,"bkId":"CIB","name":"兴业银行","seq":8,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":9,"bkId":"CMBC","name":"民生银行","seq":9,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":10,"bkId":"ECITIC","name":"中信银行","seq":10,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":11,"bkId":"CEB","name":"光大银行","seq":11,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":12,"bkId":"SPDB","name":"浦发银行","seq":12,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":13,"bkId":"CBHB","name":"渤海银行","seq":13,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":14,"bkId":"SRCB","name":"上海农商","seq":14,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":15,"bkId":"BOS","name":"上海银行","seq":15,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":16,"bkId":"BEA","name":"东亚银行","seq":16,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":17,"bkId":"PINGAN","name":"平安银行","seq":17,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":18,"bkId":"NJCB","name":"南京银行","seq":18,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":19,"bkId":"NBBANK","name":"宁波银行","seq":19,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":20,"bkId":"BJRCB","name":"北京农商","seq":20,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":21,"bkId":"HZCB","name":"杭州银行","seq":21,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":22,"bkId":"HXB","name":"华夏银行","seq":22,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":23,"bkId":"HSB","name":"徽商银行","seq":23,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":24,"bkId":"BOGH","name":"广州银行","seq":24,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":1,"isIF":0,"muC":"bank"},' +
	    '{"id":25,"bkId":"GDB","name":"广发银行","seq":25,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
	    '{"id":26,"bkId":"BCCB","name":"北京银行","seq":26,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +
        '{"id":27,"bkId":"CZB","name":"浙商银行","seq":27,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +


        // '{"id":30,"bkId":"","name":"支付宝","seq":28,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":1,"muC":"bank"},' +
        // '{"id":32,"bkId":"","name":"易宝支付","seq":29,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":1,"isIF":1,"muC":"bank"},' +
        //'{"id":228,"bkId":"","name":"快钱2","seq":30,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"bank"},' +

	    '{"id":37,"bkId":"","name":"盛大一卡通","seq":37,"cnN":"元","rate":0.90,"myL":"4.5,9,13.5,22.5,27,31.5,40.5,45,90","cnC":"4.5:5,9:10,13.5:15,22.5:25,27:30,31.5:35,40.5:45,45:50,90:100","isC":0,"isIF":0,"muC":"sd"},' +
	    '{"id":38,"bkId":"","name":"网易一卡通","seq":38,"cnN":"元","rate":0.85,"myL":"8.5,12.5,17,25.5,42.5","cnC":"8.5:10,12.5:15,17:20,25.5:30,42.5:50","isC":0,"isIF":0,"muC":"wy"},' +

	    '{"id":49,"bkId":"","name":"WAP微信","seq":49,"cnN":"元","rate":1.00,"myL":"*","cnC":"","isC":0,"isIF":0,"muC":"wap"}]');
        dw_gameJson = window.dw_gameJson = jQuery.parseJSON('[]');
        dw_activityJson = window.dw_activityJson = jQuery.parseJSON('{"activity":[],"choices":{}}');
        dw_showChengka = window.dw_showChengka = '0';
        dw_passport = window.dw_passport = '';
        dw_inputUser = window.dw_inputUser = decodeURIComponent("");
        dw_role = window.dw_role = decodeURIComponent("");
        dw_needLogin = window.dw_needLogin = '';
        dw_defaultAmount = window.dw_defaultAmount = '100';
        dw_chlIds = window.dw_chlIds = jQuery.parseJSON('[]');
        var t_type = 'game';
        var t_code = 'bank';
        if (t_type == "") {
            t_type = '';
            t_code = '';
        }
        dw_code = window.dw_code = t_code;
        dw_type = window.dw_type = t_type;
        dw_minAmount = window.dw_minAmount = '10';
        var t_lobby1 = '0';
        var t_lobby2 = '0';
        var lobby = '0';
        if ('1' == t_lobby1 || '1' == t_lobby2) {
            lobby = '1';
        }
        dw_lobby = window.dw_lobby = lobby;
        dw_gameId = window.dw_gameId = ''.toUpperCase();
        dw_serverId = window.dw_serverId = ''.toLowerCase();
        if (dw_gameJson != null) {
            var gameMap = {};
            jQuery(dw_gameJson).each(function (index, value) {
                gameMap[value["id"]] = value;
            });
            window.gameMap = gameMap;
        }

        function getGame(gameId) {
            var gameMap = window.gameMap;
            if (gameMap == null) {
                return null;
            }
            return gameMap[gameId];
        }

        function sendStat(eid) {
            sendSimpleStat(eid);
            sendSimpleStat("/" + dw_type + "/" + dw_code + eid);
        }

        function sendSimpleStat(eid) {
            try {
                data = { eid: eid, pro: "gpay" };
                if (dw_YYAnalytics != null) {
                    dw_YYAnalytics.reportProductEvent(data, null);
                }
            } catch (e) { };
        }

        function sendChengkaStat() {
            sendSimpleStat("CHENGKA");
        }

        jQuery(window).load(function () {
            try {
                var ya = new YA.report.YYAnalytics('gpay', dw_passport, { "error_retry": false });
                dw_YYAnalytics = ya;
                if (dw_code == "bank") {
                    var dur = toInt(new Date().getTime() - window.dw_start_time);
                    var from = YA.utils.Cookie.getCookie('from');
                    if (isEmpty(from)) {
                        from = "FROM_WEBYYGAME";
                    }
                    var data = { pro: "gpay", cha: "gpay", rso: from, dur: dur };
                    ya.reportProductStartUp(data, null);
                    sendSimpleStat("ACCESS");
                }
            } catch (e) { };
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <style>
        A.applink:hover
        {
            border: 2px dotted #DCE6F4;
            padding: 2px;
            background-color: #ffff00;
            color: green;
            text-decoration: none;
        }
        A.applink
        {
            border: 2px dotted #DCE6F4;
            padding: 2px;
            color: #2F5BFF;
            background: transparent;
            text-decoration: none;
        }
        A.info
        {
            color: #2F5BFF;
            background: transparent;
            text-decoration: none;
        }
        A.info:hover
        {
            color: green;
            background: transparent;
            text-decoration: underline;
        }
    </style>
    <div id="nav">
        <div class="bd">
            <h1>
            </h1>
            <div class="userInfo" style=" font-size: 15px;" id="userNoLoginDiv">
                <b>欢迎您使用 <a href="http://www.jtpay.com/" style="color: #2c8fd2; text-decoration: none;" target="_blank">竣付通</a> 游戏充值平台</b>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="../../res.udb.duowan.com/lgn/js/oauth/udbsdk/pcweb/udb.sdk.pcweb.popup.min.js"></script>

    <script type="text/javascript">
        var httpHead = "https";
        if (window.location.protocol == "http:") {
            httpHead = "http";
        }

        function writeCookie(url, redirectUrl) {
            UDB.sdk.PCWeb.writeCrossmainCookieWithCallBack(url, function () { top.window.location = redirectUrl; });
        }

        jQuery(document).ready(function () {
            var passport = window.dw_passport;
            if (jQuery.trim(passport) != "") {
                jQuery("#userLoginDiv").show();
                jQuery("#userNoLoginDiv").hide();
                jQuery("#userNameSpan").text(passport);
            } else {
                jQuery("#userNoLoginDiv").show();
                jQuery("#userLoginDiv").hide();
                jQuery("#userNameSpan").text("");
            }

            var type = window.dw_type;
            var code = window.dw_code;
            if (type == '' && code == '') {
                jQuery("#tab_account").parent().addClass("current").siblings("li").removeClass("current");
            } else {
                jQuery("#tab_" + type).parent().addClass("current").siblings("li").removeClass("current");
            }
        });

        function sdkLogin() {
            var type = jQuery.trim(jQuery("#type").val());
            var code = jQuery.trim(jQuery("#code").val());
            udbLogin(type, code);
        }

        function udbLogin(type, code) {

            var preLoginUrl = httpHead + '://gpay.duowan.com/user/preLogin.do';
            var loginUrl = httpHead + '://gpay.duowan.com/user/login.do?' + getUrlParams(type, code);
            var cancelLoginUrl = httpHead + '://gpay.duowan.com/user/cancelLogin.do';
            UDB.sdk.PCWeb.popupOpenLgn(preLoginUrl, loginUrl, cancelLoginUrl);

        }

        function getUrlParams(type, code) {
            var lobby = window.dw_lobby;
            var gameId = jQuery("#gameId").val(), serverId = jQuery("#serverId").val(), user = jQuery("#passport").val(), accountType = jQuery("#accountType").val();
            var role = jQuery("#gameRoleId").val();
            var amount = "";
            if (jQuery.trim(type).toLowerCase() != 'yb') {
                amount = jQuery("#oriAmount").val();
            }
            if (jQuery.trim(gameId) != "") {
                gameId = "&gameId=" + gameId;
            } else {
                gameId = "";
            }
            if (jQuery.trim(serverId) != "") {
                serverId = "&serverId=" + serverId;
            } else {
                serverId = "";
            }
            if (jQuery.trim(accountType) != "") {
                accountType = "&accountType=" + accountType;
            } else {
                accountType = "";
            }
            if (jQuery.trim(role) != "") {
                role = "&role=" + encodeURIComponent(role);
            } else {
                role = "";
            }
            if (jQuery.trim(amount) != "") {
                amount = "&amount=" + amount;
            } else {
                amount = "";
            }
            if (jQuery.trim(user) != "") {
                user = "&user=" + encodeURIComponent(user);
            } else {
                user = "";
            }
            return "lobby=" + lobby + "&type=" + type + "&code=" + code + gameId + serverId + user + accountType + amount + role;
        }

        function udbLogout() {
            $.ajax({
                type: "POST",
                async: false, //同步
                url: httpHead + "://" + window.location.host + "/user/preLogout.do",
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                dataType: "text",
                success: function (data, textStatus) {
                    UDB.sdk.PCWeb.deleteCrossmainCookieWithCallBack(data, logoutForward);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            });
        }

        function logoutForward() {
            top.window.location = httpHead + "://" + window.location.host + "/user/logout.do";
        }
    </script>

    <div class="container clearfix">
        <div id="sidebar">
            <ul>
		    <li><p class='payment-s1' data='bank' title='网银支付' onclick='changeMethod(this);'>网银支付</p></li>
            <li><p class='payment-s2' data='kuaijie' title='快捷支付' onclick='changeMethod(this);'>快捷支付</p></li>
            <li><p class='payment-s3' data='zhifubao' title='支付宝支付' onclick='changeMethod(this);'>支付宝支付</p></li>
            <li><p class='payment-s4' data='weixin' title='微信支付' onclick='changeMethod(this);'>微信支付</p></li>
            <li><p class='payment-s5' data='kalei' title='卡类支付' onclick='changeMethod(this);'>卡类支付</p></li>
            <li><p class='payment-s4' data='azwx' title='安卓微信内嵌' onclick='changeMethod(this);'>安卓微信内嵌</p></li>
            <li><p class='payment-s4' data='azwxtc' title='安卓微信弹出' onclick='changeMethod(this);'>安卓微信弹出</p></li>
            <li><p class='payment-s3' data='azzfbtc' title='安卓支付宝弹出' onclick='changeMethod(this);'>安卓支付宝弹出</p></li>
            <li><p class='payment-s3' data='AZZFB' title='安卓支付宝内嵌' onclick='changeMethod(this);'>安卓支付宝内嵌</p></li>
            <li><p class='payment-s4' data='AZGZH' title='安卓微信公众号' onclick='changeMethod(this);'>安卓微信公众号</p></li>
            <li><p class='payment-s4' data='IOSwx' title='IOS微信wap' onclick='changeMethod(this);'>IOS微信wap</p></li>
            <li><p class='payment-s3' data='IOSzfb' title='IOS支付宝wap' onclick='changeMethod(this);'>IOS支付宝wap</p></li>
            <li><p class='payment-s4' data='IOSgzh' title='IOS微信公众号' onclick='changeMethod(this);'>IOS微信公众号</p></li>
            </ul>
        </div>

        <script type="text/javascript">
            function changeMethod(obj) {
                var data = jQuery(obj).attr("data");
                if (data == "bank")
                    top.window.location = "./JtpayWY.aspx?payAccounts=" + $("#userName").val() + "&amount=" + $("#money").val();
                else if (data == "kuaijie")
                    top.window.location = "./JtpayKJ.aspx?payAccounts=" + $("#userName").val() + "&amount=" + $("#money").val();
                else if (data == "zhifubao")
                    top.window.location = "./JtpayZFB.aspx?payAccounts=" + $("#userName").val() + "&amount=" + $("#money").val();
                else if (data == "weixin")
                    top.window.location = "./JtpayWX.aspx?payAccounts=" + $("#userName").val() + "&amount=" + $("#money").val();
                else if (data == "kalei")
                    top.window.location = "./JtpayKL.aspx?payAccounts=" + $("#userName").val() + "&amount=" + $("#money").val();
                else if (data == "azwx")
                    top.window.location = "./AZWX.aspx?payAccounts=" + $("#userName").val() + "&amount=" + $("#money").val();
                else if (data == "azwxtc")
                    top.window.location = "./azwxtc.aspx?payAccounts=" + $("#userName").val() + "&amount=" + $("#money").val();
                else if (data == "azzfbtc")
                    top.window.location = "./azzfbtc.aspx?payAccounts=" + $("#userName").val() + "&amount=" + $("#money").val();
                else if (data == "AZZFB")
                    top.window.location = "./AZZFB.aspx?payAccounts=" + $("#userName").val() + "&amount=" + $("#money").val();
                else if (data == "AZGZH")
                    top.window.location = "./AZGZH.aspx?payAccounts=" + $("#userName").val() + "&amount=" + $("#money").val();
                else if (data == "IOSwx")
                    top.window.location = "./IOSwx.aspx?payAccounts=" + $("#userName").val() + "&amount=" + $("#money").val();
                else if (data == "IOSzfb")
                    top.window.location = "./IOSzfb.aspx?payAccounts=" + $("#userName").val() + "&amount=" + $("#money").val();
                else if (data == "IOSgzh")
                    top.window.location = "./IOSgzh.aspx?payAccounts=" + $("#userName").val() + "&amount=" + $("#money").val();
            }

            jQuery(document).ready(function () {
                var code ="azwx";
                var obj = jQuery("#sidebar").find("p[data=" + code + "]").parent();
                obj.addClass("current").siblings("p").removeClass("current");
            });
        </script>

        <div id="main">
            <div class="payment">
                <table class="paymentTable">
                    <tr>
                        <th align="right" width="110" class="passportText" style="padding-top: 12px;">
                            充值用户名：
                        </th>
                        <td>
                            <div class="forFriends">
                                <input type="text" class="input" id="userName" name="passport"  runat="server">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th align="right">
                            充值金额：
                        </th>
                        <td>
                           <input type="text" class="input" id="money" name="passport"  runat="server">
                        </td>
                    </tr>
                    <tr>
                        <th>
                        </th>
                        <td>
                            <a href="javascript:;" class="imgBtn largeBtn" onclick="submitToDeposit('azwx')"><%--立即支付--%></a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div id="footer">
        <p>联系电话：400-0315-758 QQ：2395509955 联系邮箱：Service@jtpay.com</p>
        <p>唐山君浩科技有限公司 版权所有</p>
        <p>Copyright © 2008-2015, All right reserved 君浩科技有限公司. <a href="http://www.jtpay.com/" style="color: #2c8fd2; text-decoration: none;" target="_blank">www.jtpay.com</a> 冀ICP备12022825-2 </p>
    </div>
    </form>
</body>
</html>
