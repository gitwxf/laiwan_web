$(function ()
{
    if ($(".container").height() < 548) {
         $("#sidebar").height(548)
    }
    $(".tips").find(".detail").click(function() {
         var a = $(this).parent().find(".expand"); if (a.hasClass("expandShow")) { a.removeClass("expandShow") } else { a.addClass("expandShow") }
    });
    $(".recharge").find(".inputBox").find("input").focus(function() {
        if ($(this).val() == "其他") {
            $(this).val("").css({ fontSize: "16px", color: "#3a3a3a" });
        }
    }).blur(function() {
        if ($(this).val() == "") {
            $(this).val("其他").css({ fontSize: "13px", color: "#ccc" });
        }
    });
    $(".gameSelect").find(".tabsContent").find("label").click(function() {
        $(".gameSelect").find(".items").hide();
        $(".serverSelect").addClass("selectDDN").find(".items").show();
    });
    $(".serverSelect").find(".tabsContent").find("label").click(function() {
        var a = $(".chapterSelect").find(".items"); $(".serverSelect").find(".items").hide();
        if (a.find("li").length > 1) {
             a.show()
        }
    });
    $(".chapterSelect").find(".items").find("li").click(function() {
        $(".chapterSelect").find(".items").hide();
    });
    $(".popup").find(".closePopup, .close").click(function() {
        closePopDiv();
    });
});
function openPopDiv(b) {
    var d = $("#" + b);
    var a = $(document).scrollTop(), c;
    a = a < 0 ? 0 : a;
    a = toInt(a + $(window).height() * 0.5 - d.outerHeight() * 0.8);
    c = toInt($(window).width() * 0.5 - d.outerWidth() * 0.5);
    $("body").append($('<div id="popupScreen"/>').css({ width: $(document).width(), height: $(document).height() }));
    d.css({ left: c, top: a }).show();
}
function closePopDiv() {
     $("#popupScreen").remove(); $(".popup").hide()
}
function clickScheckbox(a) {
     var b = $(a).find("span"); if (b.attr("class") == "checked") { b.removeClass("checked") } else { b.addClass("checked") }
}
function showErrorMsg(b, a) {
     closePopDiv(); $("#err_title").text(b); if (isEmpty(a)) { $("#err_msg").text("") } else { $("#err_msg").text(a) } openPopDiv("errMsgDiv")
}
function closeErrorMsg() {
     if (dw_box_ts != null) { dw_box_ts.quitBox() }
}
function toInt(b) {
     if (b == null) { return 0 } var a = parseInt(b); a = isNaN(a) ? 0 : a; return a
}
function strLength(a) {
     if (a == null) { return 0 } return ("" + a).length
}
function toFloat(b) {
     if (b == null) { return 0 } var a = parseFloat(b); a = isNaN(a) ? 0 : a; return a
}
function isEmpty(a) {
     if (a == null) { return true } if (a.replace(/(\s*)|(\s*$)/g, "").length <= 0) { return true } return false
}
function isEmail(a) {
     if (!isEmpty(a)) { if (a.search(/([-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/) != -1) { return true } else { return false } } else { return false }
}
function isLegalYb(c) {
     var b = /^[1-9]\d*$/; if (b.test(c)) { var a = toInt(c); if (a < 1 || a > 200000) { return false } return true } else { return false }
}
function isLegalAmount(d, b) {
     b = toInt(b); b = b < 1 ? 1 : b; var c = /^[1-9]\d*$/; if (c.test(d)) { var a = toInt(d); if (a < b || a > 200000) { return false } return true } else { return false }
}
function isLegalNum(d, c, a) {
     if (isNaN(d)) { return false } var b = parseInt(d); if (isNaN(b)) { return false } if (b < c) { return false } if (b > a) { return false } return true
}
function isLegalCard(b) {
     if (isEmpty(b)) { return false } var a = /^[0-9a-zA-Z~]*$/g; return a.test(b)
}
Date.prototype.gpayFormat = function(a) {
     var c = { "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), S: this.getMilliseconds() }; if (/(y+)/.test(a)) { a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)) } for (var b in c) { if (new RegExp("(" + b + ")").test(a)) { a = a.replace(RegExp.$1, (RegExp.$1.length == 1) ? (c[b]) : (("00" + c[b]).substr(("" + c[b]).length))) } } return a
};
function getMaxCardNum(a) {
     a = toInt(a); if (a == 31) { return 17 } if (a == 32) { return 15 } if (a == 34) { return 12 } if (a == 35) { return 16 } if (a == 37) { return 16 } if (a == 38) { return 13 } if (a == 45) { return 15 } return 0
}
function getMaxCardPsw(a) {
     a = toInt(a); if (a == 31) { return 18 } if (a == 32) { return 19 } if (a == 34) { return 15 } if (a == 35) { return 16 } if (a == 37) { return 8 } if (a == 38) { return 9 } if (a == 45) { return 8 } return 0
}
function getDefaultAmount(a) {
     a = toInt(a); if (a == 31 || a == 32) { return 100 } if (a == 34 || a == 35 || a == 37 || a == 38 || a == 45) { return 50 } if (a == 39) { return 20 } if (a == 33 || a == 44) { return 10 } return 100
}
function newTabToSubmit(a) {
    a = toInt(a);
    if (a >= 1 && a <= 30) {
        return true;
    }
    if (a == 33 || a == 36 || a == 39 || a == 44) {
        return true;
    }
    if (a == 31 || a == 32 || a == 34 || a == 35 || a == 37 || a == 38 || a == 45) {
        return false;

    }
    return true;
}
function baseChannelCheck(f, e) {
     f = toInt(f); if (f >= 1 && f <= 30) { return true } if (f == 36 || f == 39) { return true } if (f == 33 || f == 44) { if (isEmpty($("#cellPhone").val())) { showErrorMsg("请输入手机号码"); return } } if (f == 31 || f == 32 || f == 34 || f == 35 || f == 37 || f == 38 || f == 45) { if (!isLegalCard($("#cardNum").val())) { showErrorMsg("请输入正确的充值卡序列号"); return false } if (!isLegalCard($("#cardPsw").val())) { showErrorMsg("请输入正确的充值卡密码"); return false } } if (f == 31) { if (strLength($("#cardNumInput").val()) != 17) { showErrorMsg("充值卡序列号长度应该是17位"); return false } if (strLength($("#cardPswInput").val()) != 18) { showErrorMsg("充值卡密码长度应该是18位"); return false } return true } else { if (f == 32) { if (strLength($("#cardNumInput").val()) != 15) { showErrorMsg("充值卡序列号长度应该是15位"); return false } if (strLength($("#cardPswInput").val()) != 19) { showErrorMsg("充值卡密码长度应该是19位"); return false } return true } else { if (f == 37) { var a = strLength($("#cardNumInput").val()); if (a != 15 && a != 16) { showErrorMsg("充值卡序列号长度应该是15或者16位"); return false } if (strLength($("#cardPswInput").val()) != 8) { showErrorMsg("充值卡密码长度应该是8位"); return false } return true } else { if (f == 38) { if (strLength($("#cardNumInput").val()) != 13) { showErrorMsg("充值卡序列号长度应该是13位"); return false } if (strLength($("#cardPswInput").val()) != 9) { showErrorMsg("充值卡密码长度应该是9位"); return false } return true } else { if (f == 45) { if (strLength($("#cardNumInput").val()) != 15) { showErrorMsg("充值卡序列号长度应该是15位"); return false } if (strLength($("#cardPswInput").val()) != 8) { showErrorMsg("充值卡密码长度应该是8位"); return false } return true } } } } } e = e == "yb" ? "yb" : "game"; if (f == 34 && e == "game") { var b = false; if (strLength($("#cardNumInput").val()) == 12 && strLength($("#cardPswInput").val()) == 15) { b = true } else { if (strLength($("#cardNumInput").val()) == 10 && strLength($("#cardPswInput").val()) == 10) { b = true } } if (!b) { showErrorMsg("充值卡应该是12位序列号和15位密码或者10位序列号和10位密码"); return false } return true } else { if (f == 35 && e == "game") { if (strLength($("#cardNumInput").val()) != 16) { showErrorMsg("充值卡序列号长度应该是16位"); return false } if (strLength($("#cardPswInput").val()) != 16) { showErrorMsg("充值卡密码长度应该是16位"); return false } return true } else { if (f == 34 && e == "yb") { var c = toInt($("#cardSelect").val()); for (var d = 1; d <= c; d++) { var b = false; if (strLength($("#cardNumInput" + d).val()) == 12 && strLength($("#cardPswInput" + d).val()) == 15) { b = true } else { if (strLength($("#cardNumInput" + d).val()) == 10 && strLength($("#cardPswInput" + d).val()) == 10) { b = true } } if (!b) { showErrorMsg("第" + d + "组充值卡应该是12位序列号和15位密码或者10位序列号和10位密码"); return false } return true } } else { if (f == 35 && e == "yb") { var c = toInt($("#cardSelect").val()); for (var d = 1; d <= c; d++) { if (strLength($("#cardNumInput" + d).val()) != 16) { showErrorMsg("第" + d + "组充值卡序列号长度应该是16位"); return false } if (strLength($("#cardPswInput" + d).val()) != 16) { showErrorMsg("第" + d + "组充值卡密码长度应该是16位"); return false } return true } } } } } return true
}
function isLogin() {
     return jQuery.trim(window.dw_passport) != ""
}
function setPassport()
{
    var b = jQuery.trim($("#passport1").val());
    var a = jQuery.trim($("#passport2").val());
    if (b == "" || a == "") {
        return false;
    }
    if (isLogin() && $("#passport").val() == window.dw_passport) {
        return false;
    }
    var c = function(f) {
        var e = jQuery.trim($("#accountType").val());
        if (e != "" && e != "yy")
        {
            return true;
        }
        if (/^[0-9]*$/.test(f)) {
            return false;
        }
        if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(f)) {
            return false;
        }
        return true;
    };
    if (b != a)
    {
        $("#passport1").addClass("inputTips");
        $("#passport2").addClass("inputTips");
        //$("#errorPst").text("请输入正确的充值帐号！").show();
        $("#passport").val("");
        return false;
    }
    else
    {
        if (!c(b))
        {
            var d = ""; if (isLogin()) {
                d = "请输入正确的充值帐号！";
            } else {
                d = '请输入正确的充值帐号！';
            }
            //$("#errorPst").html(d).show();
            $("#passport").val("");
            return false;
        }
    }
    if ($("#passport").val() == a) {
        return false;
    }
    $("#passport1").removeClass("inputTips");
    $("#passport2").removeClass("inputTips");
    $("#errorPst").hide();
    $("#passport").val(a);
    doAfterSetPasspot();
    return true;
}
function depositToFriend() {
     $(".forSelf").hide(); $(".forFriends").show(); $(".passportText").css("paddingTop", "58px"); $(".tdForFriends").show(); var b = $("#passport1").val(); var a = $("#passport2").val(); if (b == a) { $("#passport").val(b) } else { $("#passport").val("") } doAfterDepositToFriend()
}
function depositToMe() {
     $(".forFriends").hide(); $(".forSelf").show(); $(".passportText").css("paddingTop", "14px"); $(".tdForFriends").hide(); $("#passport").val(window.dw_passport); doAfterDepositToMe()
} function showLoading(b) {
     closePopDiv(); openPopDiv("depositWaiting"); if (b) { var a = setOrderTs(); window.setTimeout("checkOrderSuccess('" + a + "',0,0)", 5000) }
}
function checkOrderSuccess(b, a, d)
{
    if (isOrderChange(b)) {
         return
    }
    a++;
    if (a > 120) { depositFail(); return } var c = $("#opParam").val(); $.ajax({ url: "/deposit/checkOrderState.do", data: { json: "json", op: c }, type: "post", cache: false, dataType: "json", error: function () { }, success: function (f) { var e = f.result; if (f.code != "ok") { e = "-1" } if (e == "100") { depositSuccess(); return } else { if (e == "-1" || e == "-2" || e == "-3" || e == "-99" || e == "99") { d++; if (d > 1) { depositFail(); return } } else { if (e == "2") { showLoading(false) } } } window.setTimeout("checkOrderSuccess('" + b + "'," + a + "," + d + ")", 5000) } })
}
function depositSuccess() { sendStat("/pay_success/" + $("#channelId").val()); closePopDiv(); openPopDiv("depositSuccess") } var dw_checkOrderIng = false; function setOrderTs() { var a = "" + new Date().getTime(); $("#orderTs").val(a); dw_checkOrderIng = false; return a } function isOrderChange(a) { return a != $("#orderTs").val() } function showDepositIng(a) { setConfirmDetail(); closePopDiv(); openPopDiv("depositConfirm"); if (dw_checkOrderIng) { return } dw_checkOrderIng = true; window.setTimeout("checkOrderSuccess('" + a + "',0,0)", 5000) } function setConfirmDetail() { } function reOrder() { sendStat("/re_order/" + $("#channelId").val()); closePopDiv() } function depositFail() { sendStat("/order_fail/" + $("#channelId").val()); var a = $("#opParam").val(); jQuery.ajax({ url: "/deposit/getErrorMsg.do", data: { json: "json", op: a }, type: "post", cache: false, dataType: "json", error: function () { }, success: function (d) { var b = d.result; if (d.code == "ok") { if (b == "success") { depositSuccess() } else { if (isEmpty(b)) { showErrorMsg("充值失败"); return } else { var c = jQuery.parseJSON(b); showErrorMsg("充值失败", "订单号:" + c.orderId + "错误信息:" + c.reason) } } } else { showErrorMsg(d.msg) } } }) }
function getChannel(c) {
    var c = toInt(c); if (c < 1) { return null }
    var d = window.dw_channelJson; if (d == null || !jQuery.isArray(d)) { return null } for (var b = 0, a = d.length; b < a; b++) { if (d[b]["id"] == c) { return d[b] } } return null
}
function validBankChl(a)
{ var b = jQuery.trim(a.muC); b = b.substring(0, 4); if (a == null || a.isC == 1 || b != "bank") { return false } return true } function getBankClass(b, a) { var c = b.id, d = ""; if (c >= 1 && c <= 27) { return b.bkId } if (a) { d = " less lessthen" } if (c == 28) { return "kuaiqian" + d } if (c == 29) { return "ebao" + d } if (c == 30) { return "alipay" + d } if (c == 48) { return "alicode" + d } return "" } function createBankChannelHtml(b, a) { var c = b.id; return "<li class='" + getBankClass(b, a) + "' onclick='setChannelId(this);' data='" + c + "'><span>" + b.name + "</span></li>" } function moreBank(c) { c = $(c); var b = c.attr("data"); if (b == "100") { c.removeClass("open").addClass("close").removeClass("iconUp").addClass("iconDown").text("更多银行"); var a = $(".pruneShow").find(".lessthen"); $.each(a, function (d, e) { $(e).addClass("less") }); $(".bankSelect").animate({ height: c.data("oriHeight") }); $(c).attr("data", "1"); return } if (b == "0") { setAllBankChl() } $(".bankSelect").animate({ height: "330" }); var a = $(".pruneShow").find(".lessthen"); $.each(a, function (d, e) { $(e).removeClass("less") }); $("#moreBank").attr("data", "100").removeClass("close").addClass("open").removeClass("iconDown").addClass("iconUp").data("oriHeight", $(".bankSelect").height()).text("收起银行"); initBankChannel() } function setAllBankChl() {
    var a = window.dw_channelJson; if (a == null) { return } var b = []; bankUpDiv = "<ul class='bankSelect clearfix'>"; $(a).each(function (d) { var e = a[d]; if (!validBankChl(e)) { return } if (e.isIF == 1) { b.push(e); return } bankUpDiv += createBankChannelHtml(e, false) }); bankUpDiv += "</ul>"; var c = "<ul class='internetBankSelect clearfix'>"; if (b.length > 0) { $(b).each(function (e) { var d = (e > 1); c += createBankChannelHtml(b[e], d) }) } c += "<li class='noop'><span class='trigger iconDown close' id='moreBank' onclick='moreBank(this);' data='1'>更多银行</span></li>"; c += "</ul>";
    $("#bankDiv").html(bankUpDiv + c)
}
function setChannelId(a) {
   //zxd点击银行获取银行编码;
    a = $(a);
    a.parent().parent().find("li").removeClass("select");
    a.addClass("select");
    //alert(a.attr("data"));
    $("#channelId").val(a.attr("data"));
}
function initBankChannel() {
    var b = window.dw_chlIds, a = 1; if (jQuery.isArray(b) && b.length > 0) { a = b[0] }
    $("#bankDiv").find("li").each(function () { if (toInt($(this).attr("data")) == a) { setChannelId(this) } })
} function setUserYbAmount(b) { b = $(b); var a = "查询中..."; if (b.text() == a) { return } if (toFloat($("#userYbAmount").val()) > 0) { return } b.text(a); jQuery.ajax({ url: "/account/getUserYbAmount.do", data: {}, type: "post", cache: false, dataType: "json", error: function () { b.text("查询失败") }, success: function (c) { if (c.code == "ok") { $("#userYbAmount").val(c.result); b.text(c.result) } } }) };