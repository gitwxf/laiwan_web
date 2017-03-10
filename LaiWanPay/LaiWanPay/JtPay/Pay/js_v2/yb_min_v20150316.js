$(document).ready(function () { var a = jQuery.trim(window.dw_inputUser); var c = jQuery.trim(window.dw_passport); if (c != "") { $("#passportSpan").text(c); $("#passport").val(c) } else { if (a != "") { $(".paymentTable").find("input[name=passport]").val(a); $("#passport").val(a); $("#passportSpan").text(a) } } $("#passport2").focus(function () { $("#noLoginTip").show() }); var b = window.dw_code; if (b == "dhvb") { setChannelInfo(39) } else { if (b != "bank") { var d = $("#channelChooseElt").find("li"); chooseChannel(d.first()); d.each(function (e) { $(this).click(function () { chooseChannel(this) }) }) } } $(".simSelect").hover(function () { var e = $(this); e.addClass("selectDDN"); $("#cardNumP").removeClass("selected"); e.find(".items").show() }, function () { var e = $(this); e.removeClass("selectDDN"); $("#cardNumP").addClass("selected"); e.find(".items").hide() }) }); function chooseChannel(a) { a = $(a); a.addClass("select").siblings("li").addClass("unChoose").removeClass("select"); setChannelInfo(a.attr("data")) } function showCardsInputElm(b) { $("#cardNumP").text(b + "张"); $("#cardNumP").attr("data", b); var d = $(".simSelect"); d.removeClass("selectDDN"); $("#cardNumP").addClass("selected"); d.find(".items").hide(); var a = toInt(b); for (var c = 1; c < 4; c++) { if (c <= a) { $("#cardNumDiv" + c).show(); $("#cardPswDiv" + c).show() } else { $("#cardNumDiv" + c).hide(); $("#cardPswDiv" + c).hide() } } } function clearChoice() { $("#choiceDiv").html(""); $("#factAmountDiv").html(""); $("#payAmount").val("") }
function setChannelInfo(b) {

    b = toInt(b);
    $("#channelId").val(b);
    //var a = window.dw_channelJson; if (a == null) { return } $(a).each(function (c) { var d = a[c]; if (typeof (d) != "object" || d.id != b || d.isC == 1) { return } window.dw_menoyLimit = d.myL; window.dw_coinChoice = d.cnC; window.dw_coinRate = d.rate }); setChannelShowElt(b); clearChoice(); clearCardData(); setChoiceDiv()
} 
function setChannelShowElt(a) { if (a == 34 || a == 35) { $(".paymentTable").find("tr[data=card]").hide(); $(".paymentTable").find("tr[data=cards]").show(); $("#cardSelect").parent().parent().show(); showCardsInputElm(1) } else { $(".paymentTable").find("tr[data=card]").show(); $(".paymentTable").find("tr[data=cards]").hide() } $(".paymentTable").find("input[name=cardNumInput]").attr("maxlength", getMaxCardNum(a)); $(".paymentTable").find("input[name=cardPswInput]").attr("maxlength", getMaxCardPsw(a)) } function clickOtherAmount(a) { $(a).addClass("select").siblings("li").removeClass("select"); $(a).parent().find("span").addClass("unChoose"); $("#amountCustomInput").val(""); $("#payAmount").val("") }
function setChoiceAmount(b) {
    //alert("zxd点卡dd");
    $("#amountCustomInput").val("其他");
    b = $(b);
    b.parent().addClass("select").siblings("li").removeClass("select");
    b.parent().parent().find("span").addClass("unChoose");
    b.removeClass("unChoose"); var c = toInt(b.attr("cc"));
    var a = toFloat(b.attr("yb"));
    $("#payAmount").val(c);
    $("#oriAmount").val(a);
    $("#cardTip").text(c).parent().show();
    showAmount(a);
}



function customInputAmonut(b) { var c = $(b).val(); if (!isLegalAmount(c, 1)) { showErrorMsg("请输入正确的金额"); return } var a = toInt(c); $("#payAmount").val(a); $("#oriAmount").val(a); showAmount(a); $("#amountCustomInput").focus() }

function showAmount(a) {
    //$("#factAmountDiv").html("<em class='big orange'>" + a + "</em> Y币")
    //Nst.Ajax.invoke("GRS.BL.ODM.RechargeOrderCode.SelectAllNum", [gameSubareaInfo.Id, $("#payAmount").val(), $("#PaymentMethodId").val()], function (res) {
//        //alert(res.value);
//        if (res.value == null) {
//            $("#factAmountDiv").html("<em class='big orange'>0</em> " + gameSubareaInfo.SyceeName);
//        } else {
//            if ($("#PaymentMethodId").val == null) {
//                $("#factAmountDiv").html("<em class='big orange'>" + res.value + "</em> " + gameSubareaInfo.SyceeName);
//            } else {
//                $("#factAmountDiv").html("<em class='big orange'>" + res.value + "</em> " + gameSubareaInfo.SyceeName);
//            }

//        }


//    });
}
function getChannelCoinName() { var a = getChannel($("#channelId").val()); if (a == null) { return "元" } return a.cnN } function setChoiceDiv() { var f = window.dw_menoyLimit; if (f == null) { return } var e = []; if (f == "*") { setNotLimitChoiceDiv(); var d = $("#amountCustomInput"); var b = toInt(window.dw_defaultAmount); b = b < 1 ? 100 : b; d.val(b); d.parent().addClass("select"); customInputAmonut(d) } else { setLimitChoiceDiv(f); var c = $("#channelId").val(); var a = getDefaultAmount(c); $("#choiceDiv").find("span").each(function () { var g = $(this); if (toInt(g.attr("cc")) == a || toInt(g.attr("yb")) == a) { setChoiceAmount(g) } }) } doAfterSetChoiceDiv() } function doAfterSetChoiceDiv() { } function setLimitChoiceDiv(b) { var a = b.split(","); var c = window.dw_coinChoice; if (c == null) { return } var g = ""; var f = c.split(","); var e = getChannelCoinName(); for (var d = 0, h = f.length; d < h; d++) { var j = f[d].split(":"); if (j.length == 2 && (jQuery.inArray(j[0], a) >= 0)) { g += "<li><span class='unChoose' cc='" + j[1] + "' yb='" + j[0] + "' onclick='setChoiceAmount(this);'>" + j[1] + e + "</span></li>" } } $("#choiceDiv").html(g) } function setNotLimitChoiceDiv() { var e = [50, 100, 300, 500, 1000, 3000, 5000, 10000, 30000]; var d = ""; for (var c = 0, a = e.length; c < a; c++) { var b = e[c]; d += "<li><span class='unChoose' cc='" + b + "' yb='" + b + "' onclick='setChoiceAmount(this);'>" + b + "元</span></li>" } d += "<li class='inputBox' onclick='clickOtherAmount(this);'><input type='text' id='amountCustomInput' onchange='customInputAmonut(this);' maxlength='6' value='其他'></li><li class='noop'><p class='rechargeRange'>元<em>（充值范围：1-20W之间的整数）</em></p></li></ul>"; $("#choiceDiv").html(d) } function isLoginAndDepositMe() { var b = jQuery.trim(window.dw_passport); var a = $("#passport").val(); if (b != "" && b == a) { return true } return false }

   function doBeforeSubmit() { } function otherDepositCheck() { return false } function clearCardData() { $(".paymentTable").find("input[name=cardNumInput]").val(""); $(".paymentTable").find("input[name=cardPswInput]").val("") } function setConfirmDetail() { var b = $("#payAmount").val(); var a = $("#oriAmount").val(); $("#confirmDetail").text("充值： " + a + "Y币"); $("#confirmAmount").html("支付：<em>" + b + "</em>元") } function doAfterSetPasspot() { } function doAfterDepositToFriend() { } function doAfterDepositToMe() { } function setCellPhone(a) { $("#cellPhone").val($(a).val()) } function setCardNum(a) { $("#cardNum").val($(a).val()) } function setCardPsw(a) { $("#cardPsw").val($(a).val()) };