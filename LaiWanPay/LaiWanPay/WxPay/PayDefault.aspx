﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PayDefault.aspx.cs" Inherits="LaiWanPay.WxPay.PayDefault" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0,maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="copyright" content="Copyright (c) www.laiwan888.com" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
    <meta http-equiv="expires" content="0" />
    <meta name="author" content="徕玩游戏:www.laiwan888.com" />
    <link href="CSS/bootstrap.min.css?t=112" rel="stylesheet" type="text/css" />
    <title>代理充值</title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
            list-style: none;
            font-family: "Microsoft YaHei", "微软雅黑", Helvetica, Arial, Tahoma;
            font-size: 12px;
            box-sizing: border-box;
            color: #000;
        }

        header {
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            font-weight: bold;
            color: #000000;
            background: #EEEEEE;
            padding-left: 20px;
        }

        .cf:after {
            content: '';
            display: block;
            clear: both;
        }

        .box {
            padding: 10px;
            border-bottom: 1px solid #CCC;
        }

        .form {
            overflow: hidden;
        }

            .form label {
                line-height: 30px;
                float: left;
                width: 85px;
                padding: 0 5px;
                text-align: right;
                font-size: 16px;
            }

            .form span {
                line-height: 30px;
                float: left;
                font-size: 14px;
            }

            .form input,
            .form select {
                padding: 0px 10px;
                line-height: 26px;
                height: 30px !important;
                float: left;
                width: 45%;
                box-sizing: border-box;
                margin-right: 3%;
                font-size: 14px;
                margin-bottom: 0px;
            }

            .form button {
                padding: 0px 10px;
                line-height: 26px;
                float: left;
                height: 30px;
                width: 20%;
                box-sizing: border-box;
            }

        .commodity-area {
            overflow: hidden;
            width: 100%;
            margin: 0;
        }

            .commodity-area li {
                float: left;
                width: 32%;
                border: 2px solid #CCC;
                box-sizing: border-box;
                margin-bottom: 10px;
                margin-right: 1.33%;
                border-radius: 5px;
            }

                .commodity-area li.active {
                    border: 2px solid #f00;
                }

                    .commodity-area li.active span {
                        color: #f00;
                    }

                    .commodity-area li.active p {
                        color: #f00;
                        border-bottom: 1px solid #f00;
                    }

                .commodity-area li span,
                .commodity-area li p {
                    display: block;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .commodity-area li p {
                    border-bottom: 1px solid #CCC;
                    line-height: 22px;
                    font-size: 13px;
                }

                .commodity-area li .props {
                    font-size: 14px;
                }

                .commodity-area li .unitPrice {
                    font-size: 18px;
                }

        .rechage-area p {
            font-size: 14px;
            line-height: 20px;
            margin: 0px;
        }

        .rechage-area .rechage-money,
        .rechage-area .rechage-money label {
            font-size: 16px;
        }

            .rechage-area .rechage-money label {
                display: inline;
            }

            .rechage-area .rechage-money span {
                font-size: 20px;
            }

        .btn-ctrl {
            text-align: center;
        }

        button {
            padding: 5px 25px;
            outline: none;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            color: #FFF;
        }

        .primary {
            background: #1ab394;
        }

        .default {
            background: #e6e6e6;
        }

        .rechage-area,
        .btn-ctrl {
            border-bottom: 0px;
        }

        .btn-ctrl {
            margin-bottom: 20px;
        }

        .modal {
            width: 60%;
            left: 20%;
            top: 20%;
            margin-left: 0px;
        }

            .modal button {
                width: auto;
            }

        .bootbox-body {
            text-align: center;
            font-size: 15px;
            line-height: 26px;
        }

        .modal-footer {
            text-align: center;
        }

        .hint p {
            text-align: left;
            color: #999;
            margin: 0px;
            padding-left: 10px;
        }
    </style>
    <script src="Scripts/jquery-1.10.1.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        function GetParamValue(paramName) {
            paramValue = "", isFound = !1;
            if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
                arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
                while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
            }
            return paramValue == "" && (paramValue = null), paramValue
        }
        function IsPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }
        function IsWx() {
            var ua = navigator.userAgent.toLowerCase();
            var isWeixin = ua.indexOf('micromessenger') != -1;
            var isAndroid = ua.indexOf('android') != -1;
            var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
            return isWeixin;
        }
        if (!IsPC()) {
            if (IsWx()) {
                window.parent.location.href = "http://pay.laiwan888.com/WxPay/PayValidate.aspx?AgentsID=" + GetParamValue("AgentsID") + "&KindID=" + GetParamValue("KindID");
            }
            else {
                window.parent.location.href = "http://pay.laiwan888.com/WxPay/MobileDefault.aspx";
            }
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <header>在线充值</header>
        <main>
            <div class="box form">
                <div class="hint">
                    <p style="color: red;">小提示：</p>
                    <p style="color: red;">1、成功购买后房卡直接充值到代理帐号中</p>
                    <p style="color: red;">2、房卡将充入您当前代理帐号，请确认无误</p>
                </div>
            </div>
            <div class="box" style="padding-bottom: 0px;">
                <ul class="commodity-area" id="ProductList">
                    <li sumcard="360" huodong_card="0" price="300"><span class="unitPrice">充值300元</span><span class="send">获得360张房卡</span><span class="activitySend"></span></li>
                    <li sumcard="750" huodong_card="0" price="500"><span class="unitPrice">充值500元</span><span class="send">获得750张房卡</span><span class="activitySend"></span></li>
                    <li sumcard="1500" huodong_card="0" price="1000" class="active"><span class="unitPrice">充值1000元</span><span class="send">获得1500张房卡</span><span class="activitySend"></span></li>
                </ul>
            </div>
            <div class="box rechage-area">
                <p id="Description">购买获得1500张房卡</p>
                <p class="rechage-money">
                    <label>应付金额:</label>
                    <span id="AmountPayable">1000</span> 元
                </p>
            </div>
            <div class="btn-ctrl">
                <a id="reBtn" class="btn btn-success radius l" style="line-height: 1.6em; margin-top: 3px; width: 165px;" href="javascript:;">立即充值</a>
            </div>
        </main>
        <script src="Scripts/bootstrap.min.js" type="text/javascript"></script>
        <script src="Scripts/bootbox.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                //选择商品
                $('#ProductList').delegate('li', 'click', function () {
                    $(this).addClass('active').siblings().removeClass('active');
                    if ($(this).attr('huodong_card') > 0) {
                        $('#Description').text('购买' + $(this).find('.send').text() + ',活动送' + $(this).attr('huodong_card') + '张房卡');
                    } else {
                        $('#Description').text('购买' + $(this).find('.send').text());
                    }
                    $('#AmountPayable').text($(this).attr('price'));
                });
                //立即充值
                $("#reBtn").click(function () {
                    var agentsId = GetParamValue("AgentsID");
                    var kindId = GetParamValue("KindID");
                    if (agentsId == null || kindId == null || agentsId == "" || kindId == "") {
                        alert("参数获取错误，请返回重试。");
                        return;
                    }
                    var payvalue = $("#AmountPayable").text();
                    if (payvalue == "0") {
                        alert("请选择充值金额。");
                        return;
                    }
                    window.location.href = "PayAddOrder.aspx?KindID=" + kindId + "&AgentsID=" + agentsId + "&PayMoney=" + payvalue + "&t=" + new Date().getTime();
                });
            });
        </script>
    </form>
</body>
</html>
