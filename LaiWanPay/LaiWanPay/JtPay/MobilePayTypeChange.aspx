<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MobilePayTypeChange.aspx.cs" Inherits="LaiWanPay.JtPay.MobilePayTypeChange" %>
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
		<link href="css/bootstrap.min.css?t=112" rel="stylesheet" type="text/css" />
		<title>徕玩充值-支付方式选择</title>
		<style>
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
                text-align:center;
                padding:2px;
			}

                .commodity-area img {
                    border:0;
                }
			
			.commodity-area li.active {
				border: 2px solid #f00;
			}
			
			.commodity-area li.active span {
				color: #f00;
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
</head>
<body>
    <form id="form1" runat="server">
    <header>请选择支付方式</header>
		<main>
			<div class="box form">
				<div class="hint">
					<p style="color:red;text-align:center;font-size:16px;"></p>
				</div>
			</div>
			<div class="box" style="padding-bottom: 0px;">
				<ul class="commodity-area" id="ProductList">
                    <li class="active" paytype="wx"><label for="imgWx"><img id="imgWx" name="imgWx" src="images/wx.png"/>微信支付</label></li>
                    <li paytype="zfb"><label for="imgZfb"><img id="imgZfb" name="imgZfb" src="images/zfb.png"/>支付宝</label></li>
				</ul>
			</div>
			<div class="box rechage-area">
                <p class="rechage-money"><label>订单金额:</label> <asp:Literal ID="AmountPayable" runat="server" Text="0"></asp:Literal> 元</p>
            </div>
			<div class="btn-ctrl"><input type="hidden" id="hdpaytype" value="wx"/><input type="hidden" id="hdOrderId" runat="server" /><input type="hidden" id="hdPayMoney" runat="server" /><input type="hidden" id="hdAgentsId" runat="server" /><input type="hidden" id="hdTerminal" runat="server" />
				<a class="btn btn-success radius l" id="reBtn" href="javascrt:;" onclick="confirm();">确定</a>
			</div>
		</main>
        <script src="js/jquery-1.10.1.min.js" type="text/javascript"></script>
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <script src="js/bootbox.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(function () {
                $("#ProductList li").click(function () {
                    $(this).addClass("active").siblings().removeClass("active");
                    $("#hdpaytype").val($(this).attr("paytype"));
                });
            });
            function confirm() {
                var paytypeArray = ['wx', 'zfb'];
                var paytype = $.trim($("#hdpaytype").val());
                if (paytypeArray.indexOf(paytype) < 0) {
                    alert("请选择支付方式。");
                    return;
                }
                var amount = $("#hdPayMoney").val();
                var payAccounts = $("#hdAgentsId").val();
                var orderId = $("#hdOrderId").val();
                var tera = $("#hdTerminal").val();
                if (tera == "androidwap") {
                    switch (paytype) {
                        case "wx":
                            window.location.href = "http://pay.laiwan888.com:8021/JtPay/JtPayPost?amount=" + amount + "&payAccounts=" + payAccounts + "&orderId=" + orderId + "&p9_paymethod=3&p25_terminal=2&p26_iswappay=3";
                            break;
                        case "zfb":
                            window.location.href = "JtpayPost.aspx?amount=" + amount + "&payAccounts=" + payAccounts + "&orderId=" + orderId + "&p9_paymethod=4&p25_terminal=3&p26_iswappay=3";
                            break;
                    }
                }
                else {
                    switch (paytype) {
                        case "wx":
                            window.location.href = "http://pay.laiwan888.com:8021/JtPay/JtPayPost?amount=" + amount + "&payAccounts=" + payAccounts + "&orderId=" + orderId + "&p9_paymethod=3&p25_terminal=2&p26_iswappay=3";
                            break;
                        case "zfb":
                            window.location.href = "JtpayPost.aspx?amount=" + amount + "&payAccounts=" + payAccounts + "&orderId=" + orderId + "&p9_paymethod=4&p25_terminal=2&p26_iswappay=3";
                            break;
                    }
                }
            }
        </script>   
    </form>
</body>
</html>