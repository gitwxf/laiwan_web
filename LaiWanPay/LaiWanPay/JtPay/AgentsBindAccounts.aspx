<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AgentsBindAccounts.aspx.cs" Inherits="LaiWanPay.JtPay.AgentsBindAccounts" %>

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
		<link href="CSS/bootstrap.min.css?t=000000002" rel="stylesheet" type="text/css" />
		<title>绑定代理帐号</title>
		<style type="text/css">
			* {
				margin: 0;
				padding: 0;
				list-style: none;
				font-family: "Microsoft YaHei", "微软雅黑", Helvetica, Arial, Tahoma;
				font-size: 12px;
				box-sizing: border-box;
				color: #333;
			}
			
			.cf:after {
				content: '';
				display: block;
				clear: both;
			}
			
			form {
				margin-top: 30px;
				padding: 10px;
			}
			
			form ul li {
				line-height: 30px;
				margin-bottom: 10px;
				text-align: center;
			}
			
			form ul li:after {
				content: '';
				display: block;
				clear: both;
			}
			
			form ul li label {
				line-height: 30px;
				font-size: 14px;
				width: 80px;
				float: left;
				text-align: right;
			}
			
			form ul li input,
			form ul li select {
				line-height: 26px;
				font-size: 14px;
				height: 30px !important;
				width: 65%;
				float: left;
			}
			
			form ul li input {
				padding: 0px 8px;
				box-sizing: border-box;
			}
			
			.required {
				color: #f00;
				width: 5%;
				float: left;
				text-align: center;
				font-size: 16px;
			}
			
			button {
				outline: none;
				border: none;
				background: none;
				width: 120px;
				height: 30px;
				font-size: 18px;
				line-height: 30px;
				text-align: center;
				border-radius: 5px;
				color: #FFF;
			}
			
			.btn-ctrl {
				width: 100%;
				height: 30px;
				text-align: center;
				margin-top: 20px;
			}
			
			.save {
				background: #1ab394;
			}
			
			h4 {
				font-size: 16px;
				margin-bottom: 5px;
				font-weight: bolder;
				padding: 0 20px;
			}
			
			p {
				font-size: 15px;
				line-height: 24px;
				text-indent: 2em;
				padding: 0 20px;
				margin-bottom: 0px;
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
		</style>
</head>
<body>
    <form id="form1" runat="server">
    <ul>
		<li>
			<label>代理账号：</label>
			<input type="text" name="account" id="Account" maxlength="20" runat="server"/>
			<span class="required">*</span>
            <input id="hdOpenId" runat="server" value="" type="hidden"/>
		</li>
		<li>
			<label>帐号密码：</label>
			<input type="password" name="password" id="Password" maxlength="20" runat="server"/>
			<span class="required">*</span>
		</li>
	</ul>
	<div class="btn-ctrl">
        <asp:Button ID="Bind" runat="server" Text="绑定" CssClass="btn btn-success radius l" style="line-height: 1.6em; margin-top: 3px; width: 165px;" OnClick="Bind_Click"/>
	</div>
    <h4>说明：</h4>
	<p>1.您可以在这里填写代理帐号和密码，将本微信账号绑定在代理帐号上。</p>
	<p>2.绑定后您可以在公众号内进行购卡操作。</p>
	<p>3.如果您想成为代理请添加微信号“laiwan120”了解详情。</p>
    <script src="js/jquery-1.10.1.min.js" type="text/javascript"></script>
    <script src="js/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/bootbox.js" type="text/javascript"></script>
    </form>
</body>
</html>
