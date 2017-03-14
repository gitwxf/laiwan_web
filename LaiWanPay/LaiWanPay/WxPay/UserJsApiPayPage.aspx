<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserJsApiPayPage.aspx.cs" Inherits="LaiWanPay.WxPay.UserJsApiPayPage" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/> 
    <title>徕玩支付</title>
</head><script type="text/javascript">
               //调用微信JS api 支付
               function jsApiCall()
               {
                   WeixinJSBridge.invoke(
                   'getBrandWCPayRequest',
                   <%=wxJsApiParam%>,//josn串
                    function (res)
                    {
                        WeixinJSBridge.log(res.err_msg);
                        if(res.err_msg == "get_brand_wcpay_request:ok") {
                            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。  
                            document.body.innerHTML="<span style='color:#FF0000;font-size:20px'>" + "支付完成" + "</span>。";
                        }
                        else if(res.err_msg == "get_brand_wcpay_request:cancel")                             
                        {
                            document.body.innerHTML="<span style='color:#FF0000;font-size:20px'>" + "您取消了支付" + "</span>。";
                        }    
                    }
                    );
               }

               function callpay()
               {
                   if (typeof WeixinJSBridge == "undefined")
                   {
                       if (document.addEventListener)
                       {
                           document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                       }
                       else if (document.attachEvent)
                       {
                           document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                           document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                       }
                   }
                   else
                   {
                       jsApiCall();
                   }
               }
               
     </script>

<body onload="callpay();">
    <form runat="server"></form>
</body>
</html>
