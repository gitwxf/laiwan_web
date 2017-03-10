<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MobileDefault.aspx.cs" Inherits="LaiWanPay.WxPay.MobileDefault" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">
        .content{width:80%;margin:200px auto;}
        .hide_box{z-index:999;filter:alpha(opacity=50);background:#666;opacity: 0.5;-moz-opacity: 0.5;left:0;top:0;height:99%;width:100%;position:fixed;}
        .shang_box{width:540px;height:540px;padding:10px;background-color:#fff;border-radius:10px;position:fixed;z-index:1000;left:50%;top:50%;margin-left:-280px;margin-top:-280px;border:1px dotted #dedede;}
        .shang_box img{border:none;border-width:0;}
        .dashang{display:block;width:100px;margin:5px auto;height:25px;line-height:25px;padding:10px;background-color:#E74851;color:#fff;text-align:center;text-decoration:none;border-radius:10px;font-weight:bold;font-size:16px;transition: all 0.3s;}
        .dashang:hover{opacity:0.8;padding:15px;font-size:18px;}
        .shang_close{float:right;display:inline-block;}
        .shang_logo{display:block;text-align:center;margin:20px auto;}
        .shang_tit{width: 100%;height: 75px;text-align: center;line-height: 66px;color: #a3a3a3;font-size: 16px;font-family: 'Microsoft YaHei';margin-top: 7px;margin-right:2px;}
        .shang_tit p{color:#a3a3a3;text-align:center;font-size:16px;}
        .shang_payimg{width:140px;padding:10px;border:6px solid #EA5F00;margin:0 auto;border-radius:3px;height:140px;}
        .shang_payimg img{display:block;text-align:center;width:140px;height:140px; }
        .pay_explain{text-align:center;margin:10px auto;font-size:12px;color:#545454;}
        .radiobox{width: 16px;height: 16px;display: block;float: left;margin-top: 5px;margin-right: 14px;}
        .checked .radiobox{}
        .shang_payselect{text-align:center;margin:0 auto;margin-top:40px;cursor:pointer;height:60px;width:280px;font-family:'Microsoft YaHei'}
        .shang_payselect .pay_item{display:inline-block;margin-right:10px;float:left;}
        .shang_info{clear:both;}
		.shang_info p,.shang_info a{color:#000000;text-align:center;font-size:12px;text-decoration:none;line-height:2em;font-family:'Microsoft YaHei'}
        .pay_logo {color:#000;font-weight:bold;}
    </style>
    <title>代理充值</title>
</head>
<body>
    <form id="form1" runat="server">
        <div class="content">
    <div class="hide_box"></div>
    <div class="shang_box">
    	<div class="shang_tit">
    		<p>感谢您的支持，我们会继续努力的!</p>
    	</div>
    	<div class="shang_payimg">
    		<img src="images/laiwanewm.jpg" alt="扫码支持" title="扫一扫" />
    	</div>
    	<div class="shang_info">
    		<p>打开微信扫一扫，关注官方公众号，即可进行代理充值哦</p>
    	</div>
        <div class="shang_payselect">
            <div class="pay_item checked" data-id="alipay">
                <span class="radiobox"></span>
                官方公众号：<span class="pay_logo">徕玩游戏</span>
            </div>
            <div class="pay_item" data-id="weipay">
                <span class="radiobox"></span>
                客服微信号：<span class="pay_logo">laiwan5</span>
            </div>
        </div>
    </div>
    </div>
    </form>
</body>
</html>
