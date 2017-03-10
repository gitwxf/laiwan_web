<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="JtpayPost.aspx.cs" Inherits="LaiWanPay.JtPay.JtpayPost" EnableViewState="false" EnableEventValidation="false"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript">
        function Post() {
            document.getElementById("form1").submit();
        }
    </script>
</head>
<body onload="Post()">
    <form id="form1" runat="server">
        <input type="hidden" id="p1_usercode" runat="server" />
        <!--商户号-->
        <input type="hidden" id="p2_order" runat="server" />
        <!--订单号-->
        <input type="hidden" id="p3_money" runat="server" />
        <!--金额-->
        <input type="hidden" id="p4_returnurl" runat="server" />
        <!--回掉界面-->
        <input type="hidden" id="p5_notifyurl" runat="server" />
        <!--通知界面-->
        <input type="hidden" id="p6_ordertime" runat="server" />
        <!--订单时间-->
        <input type="hidden" id="p7_sign" runat="server" />
        <!--商户传递参数加密值-->
        <input type="hidden" id="p8_signtype" runat="server" />
        <!--签名验证方式-->
        <input type="hidden" id="p9_paymethod" runat="server" />
        <!--商户支付方式-->
        <input type="hidden" id="p10_paychannelnum" runat="server" />
        <!--支付通道编码-->
        <input type="hidden" id="p14_customname" runat="server" />
        <!--客户名称-->
        <input type="hidden" id="p17_customip" runat="server" />
        <!--客户端IP-->
        <input type="hidden" id="p18_product" runat="server" />
        <!--商品名称-->
        <input type="hidden" id="p19_productcat" runat="server" />
        <!--卡密-->
        <input type="hidden" id="p20_productnum" runat="server" />
        <!--卡号-->
        <input type="hidden" id="p25_terminal" runat="server" />
        <!--终端设备-->
        <input type="hidden" id="p26_iswappay" runat="server" />
        <!--支付场景-->
    </form>
</body>
</html>
