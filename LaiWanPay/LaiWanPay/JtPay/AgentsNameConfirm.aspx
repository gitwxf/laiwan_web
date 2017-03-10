<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AgentsNameConfirm.aspx.cs" Inherits="LaiWanPay.JtPay.AgentsNameConfirm" %>

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
    <script src="js/jquery-1.10.1.min.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <header>代理帐号确认</header>
        <main>
            <div class="box form">
                <div class="hint">
                    <p style="font-size:16px;font-family:'Microsoft YaHei'">您当前绑定的代理帐号：<strong style="color:red;font-weight:bold;font-size:18px;"><%=AgentsName %></strong>，确认为该帐号充值？</p>
                </div>
            </div>
            <div class="btn-ctrl" style="margin-top:20px;"><input runat="server" id="hdAgentsId" type="hidden"/><input runat="server" id="hdKindId" type="hidden"/><input runat="server" id="hdAgentsName" type="hidden"/><input runat="server" id="hdOpenId" type="hidden"/>
                <a id="reBtn" class="btn btn-success radius l" style="line-height: 1.6em; margin-top: 3px; " href="javascript:;" onclick="confirmpay();">确认充值</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id="change" href="javascript:;" class="btn radius l" style="line-height: 1.6em; margin-top: 3px;" onclick="changeaccount();">切换帐号</a>
            </div>
        </main>
        <script type="text/javascript">
            function confirmpay() {
                window.location.href = "MobilePayDefault.aspx?AgentsID=" + $("#hdAgentsId").val() + "&KindID=" + $("#hdKindId").val() + "&t=" + new Date().getTime();
            }
            function changeaccount() {
                window.location.href = "AgentsBindAccounts.aspx?OpenID=" + $("#hdOpenId").val();
            }
        </script>   
    </form>
</body>
</html>
