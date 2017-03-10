$(document).ready(function() {
    $("#lobby").val(window.dw_lobby);
    if (isLogin() == false) {
        $("#gameDiv").find("li[data=0]").removeClass("current").hide();
        $("#gameDiv").find("li[data=ABCD]").addClass("current");
        $("#couponsTipDiv").html("<a href=\"javascript:udbLogin('" + window.dw_type + "','" + window.dw_code + "');\"><span>(请登陆账户)</span></a>")
    }
    else {
        $("#passport").val(window.dw_passport);
        $("#couponsTipDiv").html("<div class='scheckbox' onclick='showCoupons(this);'><span></span></div>使用<span><strong style='color:red'>()</strong></span>")
    } $("#passport2").focus(function() { $("#noLoginTip").show() });
    var g = function(i) {
        var h = $(i); h.addClass("selectDDN"); h.find(".items").show();
        showFirstGameDiv()
    };
    var c = function(i) {
        var h = $(i); h.addClass("selectDDN"); h.find(".items").show()
    };
    var d = function() {
        $("#nickNameDiv").show()
    };
    var f = function(i) {
        var h = $(i); h.removeClass("selectDDN"); h.find(".items").hide()
    };
    $("#gameSelectDiv").hover(function() {
        g(this)
    },
    function() { f(this) });
    $("#serverSelectDiv").hover(function() { c(this) }, function() { f(this) });
    $("#nickNameSelectDiv").hover(function() { d() }, function() { $("#nickNameDiv").hide() });
    $("#gameDiv").find("li").each(function() {
        var h = $(this); h.mouseover(function() {
            h.addClass("current").siblings("li").removeClass("current");
            var i = $(this).attr("data"); if (i == "0") { showHistoryGames(dw_historyGames) } else { setGameDiv(i) }
        })
    });
    var b = jQuery.trim(window.dw_inputUser);
    var e = jQuery.trim(window.dw_passport); if (e != "")
    { $("#passport").val(e) } else { if (b != "") { $(".paymentTable").find("input[name=passport]").val(b); $("#passport").val(b) } }
    var a = getGame(window.dw_gameId); if (isLogin() && isValidGame(a) && useCp(a) && b != "") {
        depositToFriend(); $("#passport1").val(b);
        $("#passport2").val(b);
        $("#passport").val(b);
    } clickGame(window.dw_gameId, false); if (jQuery.trim(window.dw_gameId) == "" && (window.dw_code == "bank" || window.dw_code == "yb")) { showChoiceDiv([{ id: 0, yb: 0, isBanktabShow: false, gameCoin: 0 }, { id: 1, yb: 50, isBanktabShow: true, gameCoin: 500 }, { id: 1, yb: 100, isBanktabShow: true, gameCoin: 1000 }, { id: 1, yb: 300, isBanktabShow: true, gameCoin: 3000 }, { id: 1, yb: 500, isBanktabShow: true, gameCoin: 5000 }, { id: 1, yb: 1000, isBanktabShow: true, gameCoin: 10000 }, { id: 1, yb: 50000, isBanktabShow: true, gameCoin: 500000}]) }
});
var dw_getCouponsIng = false; function showCoupons(d) {
    var e = $(d).find("span"); if (e.attr("class") == "checked") { clearCoupon(); return } var b = $("#gameId").val(); if (jQuery.trim(b) == "") { showErrorMsg("请选择"); return } var a = toInt($("#payAmount").val()); if (a == 0) { showErrorMsg("请输入充值金额"); return } var c = function(f) { $("#couponDiv").html("<table class='table' cellspacing='0' width='100%' style='display: block;'><tr><td>" + f + "</td></tr></table>").show() }; e.addClass("checked"); if (dw_getCouponsIng) { return } else { dw_getCouponsIng = true } c("查询中..."); $.ajax({ url: "/account/ajaxListCoupons.do", data: { gameId: b, amount: a, json: "json" }, type: "post", cache: false, dataType: "json", timeout: 15000, error: function() { dw_getCouponsIng = false }, success: function(h) { dw_getCouponsIng = false; if (h.code != "ok") { c("获取数据失败，请稍候重试。"); return } var i = jQuery.parseJSON(h.result); if (i.length == 0) { c("抱歉，您没有。"); return } var g = "<table class='table' cellspacing='0' width='100%' style='display: block;'><tbody>"; var f = i.sort(function(k, j) { if (k.activityTime < j.activityTime) { return 1 } if (k.activityTime > j.activityTime) { return -1 } return 0 }); jQuery.each(f, function(k, n) { var m = 0; m = a - n.faceValue; m = m < 0 ? 0 : m; var l = n.activityTime, j = ""; if (l != null) { j = new Date(l).gpayFormat("yyyy-MM-dd") } g += "<tr>"; g += "<td width='120px'><div class='sradio' data='" + n.code + "' factAmount='" + m + "' onclick='setCouponValue(this);'><span></span></div>"; g += j + "</td>"; g += "<td width='230px'>" + n.name + "</td>"; g += "<td width='140px'>实际支付：<strong>" + m + "</strong>元</td>"; g += "</tr>" }); g += "</tbody></table>"; $("#couponDiv").html(g).show() } })
} function setCouponValue(a) {
    a = $(a); $("#couponDiv").find("table").find("span").removeClass("checked");
    a.find("span").addClass("checked"); $("#coupon").val(a.attr("data")); $("#factAmount").val(a.attr("factAmount")); $("#showAmount").val(a.attr("factAmount")); setChoiceAmountDiv()
}
var dw_historyGames = null;
var dw_gameRelativeInfo = {};
var dw_historyGs = {};
var dw_oldActivityAomount = -1;
function showFirstGameDiv() {
    if (isLogin()) { getAndShowHistoryGames(dw_historyGames) } else { $("#noLoginGameTab").addClass("current"); setGameDiv($("#noLoginGameTab").attr("data")) }
}
function getAndShowHistoryGames() {
    if (dw_historyGames != null) { showHistoryGames(dw_historyGames); return } $.ajax({ url: "/game/getHistoryGames.do", type: "post", cache: false, dataType: "json", data: { json: "json" }, timeout: 15000, error: function() { }, success: function(b) { if (b.code == "ok") { var a = jQuery.parseJSON(b.result); dw_historyGames = a; showHistoryGames(a) } else { showErrorMsg("获取数据失败，请稍候重试") } } })
}
function showHistoryGames(b) {
    if ($("#gameDiv").find("li[class=current]").first().attr("data") != "0")
    { return }
    if (b == null) { $("#showGameDiv").html(""); return } var a = "";
    $(b).each(function(c, d) { if (isValidGame(d)) { a += createGameDivHtml(d) } });
    $("#showGameDiv").html(a)
} function setGameDiv(f) {
    var d = ""; for (var c = 0, a = f.length; c < a; c++)
    { var b = f.charAt(c); var e = window.dw_gameJson; if (e == null) { return } $(e).each(function(g, h) { if (h.ftPY.charAt(0) == b && isValidGame(h)) { d += createGameDivHtml(h) } }) } $("#showGameDiv").html(d)
}
function createGameDivHtml(a) {
    return "<li value='" + a.id + "' onclick=\"clickGame('" + a.id + "',true);\"><label><div class='sradio'><span></span></div>" + a.name + "</label></li>"
}
function clickGame(d, b) {
    if (b) { dw_serverId = window.dw_serverId = ""; dw_gameId = window.dw_gameId = ""; dw_role = window.dw_role = "" } var a = getGame(d); if (!isValidGame(a)) { return } if (b) { var c = $("#serverSelectDiv"); c.addClass("selectDDN"); c.find(".items").show() } $("#gameChoose").text(a.name); $("#gameId").val(d); $("#gamebox").hide(); $("#nickNameSelectTr").hide(); clearServer(); clearRole(); clearChoice(); clearCoupon(); getAndSetRelativeInfo(); getAndSetHistoryGs(); if (useCp(a)) { $(".paymentTable").find(".ml5").show(); if ($("#accountType").val() == a.cp) { depositToCpAccount() } else { depositToYyAccount() } } else { $(".paymentTable").find(".ml5").hide(); reinstatePstText(); setPassport() } showRoleDiv()
}
function clearGame() {
    $("#gameChoose").text("请选择"); $("#gameId").val(""); $("#showGameDiv").html("")
}
function clearServer() {
    $("#serverChoose").text("请选择"); $("#serverId").val(""); $("#gsShowDiv").html(""); $("#gsDiv").html("")
}
function getAndSetRelativeInfo() {
    var a = $("#gameId").val(); if (jQuery.trim(a) == "") { return } a = a.toUpperCase(); if (dw_gameRelativeInfo[a] != null) { setGameServerDiv(dw_gameRelativeInfo[a]); return } $.ajax({ url: "/game/getRelativeInfo.do", data: { gameId: a, json: "json" }, type: "post", cache: false, dataType: "json", timeout: 15000, error: function() { }, success: function(c) { if (c.code == "ok") { var b = jQuery.parseJSON(c.result); dw_gameRelativeInfo[a] = b; setGameServerDiv(b) } else { showErrorMsg("获取数据失败，请稍候重试") } } })
}
function initServerDiv() {
    var a = jQuery.trim(window.dw_serverId); if (a == "") { return } var b = jQuery.trim(window.dw_gameId); if (b != jQuery.trim($("#gameId").val())) { return } clickServer(a, null, true)
}
function setGameServerDiv(f) {
    initServerDiv(); var q = f.size; q = q < 50 ? 50 : q; var h = f.types; var d = f.sers; var m = isLoginAndDepositMe(); var j = ""; if (m == true) { j = "<li class='current' data_t='0' ><span></span></li>" } var n = 0, c = []; var p, e = 0, g = 0; var b = function(i, r) { if (jQuery.inArray(r, i) < 0) { i.push(r) } }; var o = ",0,"; for (e = 0, g = h.length; e < g; e++) { if (h[e]["type"] == 1) { o = h[e]["val"]; break } } for (e = 0, g = d.length; e < g; e++) { p = d[e]; var l = p.type; if ((o.indexOf("," + l + ",") >= 0)) { n++; b(c, 0) } else { b(c, l) } } var a = h.sort(function(r, i) { if (r.seq < i.seq) { return -1 } if (r.seq > i.seq) { return 1 } return 0 }); var k = function(r, u) { for (var t = 0, s = r.length; t < s; t++) { if (u.indexOf("," + r[t] + ",") >= 0) { return true } } return false }; jQuery.each(a, function(i, r) { if (!k(c, r.val)) { return } if (r.type != 1) { j += createGsHeader(r.type, r.val, 0, 0, r.name); return } for (e = n; e > 0; ) { if (e > q) { j += createGsHeader(r.type, r.val, (n - e), q, e + "_" + (e + 1 - q)); e -= q } else { j += createGsHeader(r.type, r.val, (n - e), e, e + "_" + 1); e = 0 } } }); $("#gsDiv").html(j); $("#gsDiv").find("li").each(function() { var i = $(this); i.mouseover(function() { i.addClass("current").siblings("li").removeClass("current"); var t = $(this); var s = t.attr("data_t"); var u = toInt(t.attr("start")); var r = toInt(t.attr("size")); setGsDiv(s, t.attr("data_v"), u, r) }) }); setFirstGsDiv(); showChoiceDiv(f.choices)
}
function createGsHeader(c, d, e, b, a) {
    return "<li data_t='" + c + "' data_v='" + d + "' start='" + e + "' size='" + b + "' ><span>" + a + "</span></li>"
}
function setFirstGsDiv() {
    var c = $("#gsDiv").find("li").first(); c.addClass("on"); var b = c.attr("data_t"); var d = toInt(c.attr("start")); var a = toInt(c.attr("size")); setGsDiv(b, c.attr("data_v"), d, a)
}
function getAndSetHistoryGs() {
    var a = $("#gameId").val(); if (jQuery.trim(a) == "") { return } if (dw_historyGs[a] != null) { return } if (isLoginAndDepositMe() == false) { return } $.ajax({ url: "/game/getHistoryGs.do", type: "post", data: { gameId: a, json: "json" }, cache: false, dataType: "json", timeout: 15000, error: function() { }, success: function(c) { if (c.code == "ok") { var b = jQuery.parseJSON(c.result); dw_historyGs[a] = b; setGsDiv("0", "", 0, 0) } else { showErrorMsg("获取数据失败，请稍候重试") } } })
}
function setGsDiv(m, n, a, s) {
    if (m == null) { return } var r = $("#gsDiv").find("li[class=current]").attr("data_t"); if (r != null && m != r) { return } var p = $("#gameId").val(); if (jQuery.trim(p) == "") { return } var e = dw_gameRelativeInfo[p]; if (dw_gameRelativeInfo[p] == null) { return } var b = e.sers; var l = e.types; var q = ",0,"; for (var d = 0, k = l.length; d < k; d++) { if (l[d]["type"] == 1) { q = l[d]["val"]; break } } var h = ""; if (m == "1") { var g = 0, c = 0; for (var d = 0, k = b.length; d < k; d++) { var o = b[d]; if (q.indexOf("," + o.type + ",") >= 0) { c++; if (c > a) { h += createServerDivHtml(o); g++ } } if (g >= s) { break } } } else { if (m == "0" && dw_historyGs[p] != null) { b = dw_historyGs[p] } if (m != "0") { var f = []; $(b).each(function(j, i) { if (n != null && n.indexOf("," + i.type + ",") >= 0) { f.push(i) } }); b = f } $(b).each(function(i, j) { h += createServerDivHtml(j) }) } $("#gsShowDiv").html(h)
}
function createServerDivHtml(a) {
    return "<li onclick=\"clickServer('" + a.srId + "','" + a.name + "',false);\"><label title='" + a.name + "'><div class='sradio'><span></span></div>" + a.name + "</label></li>"
}
function clickServer(f, a, h) {
    if (a == null)
    { var j = $("#gameId").val(); var c = dw_gameRelativeInfo[j]; if (c != null) { var d = c.sers; if (jQuery.isArray(d)) { for (var e = 0, g = d.length; e < g; e++) { var b = d[e]; if (b.srId == f) { a = b.name; break } } } } } if (a == null) { return } $("#serverChoose").text(a); $("#serverId").val(f); $("#serverbox").hide(); clearRole(); getRole(true);
    setChoiceAmountDiv();
}
function clearRole() {
    $("#nickName").text("请选择"); $("#gameRoleId").val(""); $("#gameRoleName").val(""); $("#nickNameDiv").html("")
}
function showRoleDiv() {
    if ($("#nickNameSelectTr").is(":visible")) { return } var c = $("#gameId").val(); var b = getGame(c); var a = function() { var e = $("#passport").val(); if (jQuery.trim(e) == "") { return } var d = $("#accountType").val(); $.ajax({ url: "/check/checkAccount.do", data: { account: e, gameId: c, type: d, json: "json" }, type: "post", cache: false, dataType: "json", timeout: 15000, error: function() { }, success: function(f) { if (f.code == "ok") { if (f.result == "0") { $("#nickNameSelectTr").show(); getRole(false) } else { $("#nickNameSelectTr").hide() } } else { $("#nickName").text("获取数据失败，请稍候重试") } } }) }; if (b == null) { return } if (useCp(b)) { a(); return } if (b.ndGR == 1) { $("#nickNameSelectTr").show(); getRole(true); return } $("#nickNameSelectTr").hide()
} var dw_getGameRoleInfo = ""; function getRole(g) { if ($("#nickNameSelectTr").is(":hidden")) { return } var b = jQuery.trim($("#gameId").val()); if (b == "") { if (g != true) { showErrorMsg("请选择") } return } b = b.toUpperCase(); var d = getGame(b); if (d == null) { return } var f = jQuery.trim($("#passport").val()); if (f == "") { if (g != true) { showErrorMsg("请输入") } return } var a = jQuery.trim($("#serverId").val()); a = a == "" ? jQuery.trim(window.dw_serverId) : a; if (a == "") { if (g != true) { showErrorMsg("请输入") } return } a = a.toLowerCase(); var h = window.dw_role; var e = function(j, i) { return dw_getGameRoleInfo == j + i }; if (e(b, a)) { return } $("#nickName").text("查询中..."); dw_getGameRoleInfo = b + a; var c = jQuery.trim($("#accountType").val()); $.ajax({ url: "/game/getGameRole.do", data: { passport: f, gameId: b, serverId: a, accountType: c, json: "json" }, type: "post", cache: false, dataType: "json", timeout: 15000, error: function() { dw_getGameRoleInfo = "" }, success: function(l) { if (!e(b, a)) { return } if (l.code == "ok") { var i = jQuery.parseJSON(l.result); if (!jQuery.isArray(i) || i.length == 0) { $("#nickName").text(""); if (useCp(d)) { showErrorMsg("") } } var k = ""; $(i).each(function(n, m) { if (h == m.roleId || h == m.roleName || n == 0) { clickRole(m.roleId, m.roleName) } k += "<li onclick=\"clickRole('" + m.roleId + "','" + m.roleName + "');\"><p>" + decodeURIComponent(m.roleName) + "</p></li>" }); var j = $("#nickNameDiv"); j.html(k); j.find("li").each(function() { var m = $(this); m.mouseover(function() { m.addClass("select").siblings("li").removeClass("select") }) }) } else { $("#nickName").text("获取数据失败，请稍候重试") } dw_getGameRoleInfo = "" } }) } function clickRole(b, a) { $("#gameRoleId").val(b); $("#gameRoleName").val(a); var d = decodeURIComponent(a); $("#nickName").text(d); $("#nickNameDiv").hide(); if (d != null && d.length > 7) { var c = d.length * 13; $("#nickName").css("width", "" + c); $("#nickNameSelectDiv").css("width", "" + (c + 32)) } } function clearChoice() {
    $("#choiceDiv").html("");
    $("#gameCoinAmount").html("");
    $("#factAmountDiv").html("");
    $("#payAmount").val("");
    $("#showAmount").val("");
    $("#choiceId").val("0")
} function showChoiceDiv(c) { if (c == null) { return } var b = ""; var a = false; $(c).each(function(f, g) { var d = g.yb; if (g.id == 0) { a = true; return } if (isInMenoyLimit(d)) { if (window.dw_menoyLimit == "*" && g.isBanktabShow) { b += "<li><span class='unChoose' choiceId='" + g.id + "' choiceDesc='" + encodeURIComponent(jQuery.trim(g.choiceDesc)) + "' gc='" + g.gameCoin + "' cc='" + d + "' yb='" + d + "' type='radio' onclick='setChoiceAmount(this);'>" + d + "元</span></li>" } else { var e = getDepositYb(d); if (e > 0) { b += "<li><span class='unChoose' choiceId='" + g.id + "' choiceDesc='" + encodeURIComponent(jQuery.trim(g.choiceDesc)) + "'  gc='" + g.gameCoin + "' cc='" + e + "' yb='" + d + "' type='radio' onclick='setChoiceAmount(this);'>" + e + "元</span></li>" } } } }); if (a && window.dw_menoyLimit == "*") { b += "<li class='inputBox' onclick='clickOtherAmount(this);'><input type='text' id='amountCustomInput' onchange='customInputAmonut(this);' maxlength='6' value='其他'></li><li class='noop'><p class='rechargeRange'>元<em>（充值范围：" + window.dw_minAmount + "-20W之间的整数）</em></p></li>" } $("#choiceDiv").html(b); setDefaultAmount() } function setDefaultAmount() { var d = $("#channelId").val(), c = toInt(window.dw_defaultAmount); c = c < 1 ? getDefaultAmount(d) : c; var a = false; $("#choiceDiv").find("span").each(function() { var f = $(this); if (toInt(f.attr("cc")) == c || toInt(f.attr("yb")) == c) { setChoiceAmount(f); a = true } }); if (a) { return } var b = $("#amountCustomInput").length > 0; if (b) { var e = $("#amountCustomInput"); var c = toInt(window.dw_defaultAmount); c = c < 1 ? 100 : c; e.val(c); e.parent().addClass("select"); customInputAmonut(e); $("#amountCustomInput").focus(); return } var e = $("#choiceDiv").find("span").first(); if (e != null) { setChoiceAmount(e); return } } function clickOtherAmount(a) { $(a).addClass("select").siblings("li").removeClass("select"); $(a).parent().find("span").addClass("unChoose"); $("#amountCustomInput").val(""); $("#payAmount").val(""); $("#choiceId").val("0") }
function setChoiceAmount(b) {
    $("#amountCustomInput").val("其他");
    b = $(b);
    b.parent().addClass("select").siblings("li").removeClass("select");
    b.parent().parent().find("span").addClass("unChoose");
    b.removeClass("unChoose"); var a = toInt(b.attr("gc")); $("#choiceId").val(b.attr("choiceId")); $("#payAmount").val(b.attr("yb")); var c = b.attr("cc"); $("#oriAmount").val(c); $("#showAmount").val(c); $("#cardTip").text(c).parent().show(); clearCoupon(); setChoiceAmountDiv()
}
 function customInputAmonut(d) {
    if (!isLegalAmount($(d).val(), window.dw_minAmount)) { showErrorMsg("请输入正确的金额"); return } var c = toInt($(d).val()); var b = $("#gameId").val();
    var a = $("#serverId").val(); if (b == null || a == null) { return } $("#payAmount").val(c); $("#oriAmount").val(c); $("#showAmount").val(c); $("#choiceId").val("0"); setChoiceAmountDiv(); clearCoupon()
}
function setChoiceAmountDiv() {
    $("#lackYbAmountDiv").hide();
    var j = $("#gameId").val();
    var f = $("#serverId").val();
    var h = $("#choiceId").val();
    var d = toInt($("#payAmount").val());
    var i = getGame(j);
    if (i == null || i.id == null || dw_gameRelativeInfo[j] == null) {
        return
    }
    var c = getGameChoice(dw_gameRelativeInfo[j]["choices"], h);
    var a = 0; if (c != null) {
        d = c.yb; a = c.gameCoin
    } else { a = d * i.rate }
    if (d < 1) { return }
    $("#oriGameCoin").val(a); var e = ""; if (c == null || jQuery.trim(c.choiceDesc) == "") { e = "<em class='big'>" + a + "</em>" + i.geCN } else { e = c.choiceDesc } var g = toInt($("#factAmount").val()); var b = g >= 0 ? g : d; $("#factAmountDiv").html("<em class='big orange'>" + b + "</em> 元");
    showChoiceAmountDiv(j, e, []);
    showReturnAmountTips(j, f, e, b); showChengKaTip()
} function getGameChoice(e, b) {
    if (!jQuery.isArray(e) || b < 1) { return null } for (var d = 0, a = e.length; d < a; d++) { var c = e[d]; if (c.id == b) { return c } } return null
}
function showChoiceAmountDiv(k, c, d) {
    alert("showChoiceAmountDiv");
    var j = getGame(k);
    if (j == null) {
        return;
    }
    var h = "", e = "", l = 0;
    for (var b = 0, f = d.length; b < f; b++) {
        var g = toInt(toInt(d[b]) * j.rate); l += g; if (g > 0) { h += "+" + g }
    }
    var a = toInt($("#oriGameCoin").val());
    $("#gameCoin").val(a + l); if (h != "") {
        e = c + " + <em>" + h.substring(1) + "<em>" + j.geCN;
+"</span>";
    } else {
        e = c;
    }
    $("#gameCoinAmount").html(e);
} function showReturnAmountTips(e, c, b, d) { var a = $("#passport").val(); var f = window.dw_passport; if (jQuery.trim(b) == "" || jQuery.trim(e) == "" || jQuery.trim(f) == "" || f != a) { return } if (!isEmpty($("#coupon").val())) { return } dw_oldActivityAomount = d; $.ajax({ url: "/deposit/activityAmount.do", data: { gameId: e, serverId: c, amount: d, json: "json" }, type: "post", cache: false, dataType: "json", timeout: 15000, error: function() { }, success: function(g) { if (dw_oldActivityAomount != d) { return } if (jQuery.isArray(g) && g.length > 0) { showChoiceAmountDiv(e, b, g) } } }) } function isInMenoyLimit(g) { if (window.dw_menoyLimit == "*") { return true } var c = window.dw_coinChoice; if (c == null) { return false } var b = c.split(","); var h = 0; for (var f = 0, a = b.length; f < a; f++) { var e = b[f].split(":"); if (e.length == 2 && toInt(e[0]) == g) { h = g; break } } if (h < 1) { return false } var d = window.dw_menoyLimit; if (d == null) { return false } b = d.split(","); for (var f = 0, a = b.length; f < a; f++) { if (toInt(b[f]) == h) { return true } } return false } function getDepositYb(c) { var d = window.dw_coinChoice; if (d == null) { return false } var b = d.split(","); var g = 0; for (var f = 0, a = b.length; f < a; f++) { var e = b[f].split(":"); if (e.length == 2 && toInt(e[0]) == c) { return toInt(e[1]) } } return 0 } function showChengKaTip() { if (window.dw_showChengka != "1") { return } if (window.dw_type != "game") { return } if (window.dw_code != "bank" && window.dw_code != "yb") { return } if (!isEmpty($("#coupon").val())) { return } var e = $("#passport").val(); var d = $("#gameId").val(); var b = $("#serverId").val(); var a = $("#choiceId").val(); var c = 0; if (toInt($("#factAmount").val()) != -1) { c = $("#factAmount").val() } else { c = $("#payAmount").val() } $.ajax({ url: "/account/chengka.do", data: { passport: e, serverId: b, gameId: d, choiceId: a, amount: c, json: "json" }, type: "post", cache: false, dataType: "json", timeout: 10000, error: function() { }, success: function(j) { try { if (j.code != "ok") { return } var i = "", h = jQuery.parseJSON(j.result); if (h.code == "hide") { return } if (h.code == "show") { i = "<em class='big orange'>" + c + "</em> 元<span class='tips tipSuccess promo'><span class='icon'></span>" + h.amount + "元&emsp;<a href='/item/index.do?gameId=VVCZHY&itemId=month&num=1&serverId=s1' target='_blank'>马上开通&raquo;</a></span>" } else { if (h.code == "ok") { var g = toFloat(h.amount), f = toFloat(c); i = "<em class='big orange'>" + c + "</em> <span class='positionFix'>元 * <span class='orangeCardIcon'></span> <span class='orange'>(" + (10 * g / f).toFixed(1) + "折)</span> =</span> <em class='big orange'>" + h.amount + "</em> 元"; $("#showAmount").val(h.amount) } } $("#factAmountDiv").html(i).show() } catch (k) { } } }) } function isLoginAndDepositMe() { var b = jQuery.trim(window.dw_passport); var a = $("#passport").val(); if (b != "" && b == a) { return true } return false }
function setChannelInfo(b) {
    b = toInt(b); $("#channelId").val(b);
    var a = window.dw_channelJson;
    if (a == null) { return } $(a).each(function(c) { var d = a[c]; if (typeof (d) != "object" || d.id != b || d.isC == 1) { return } window.dw_menoyLimit = d.myL; window.dw_coinChoice = d.cnC; window.dw_coinRate = d.rate }); clearCardData(); setChannelShowElt(b)
}

function submitToDeposit(type) {
    var userName = $("#userName").val();
    if (isEmpty(userName)) {
        showErrorMsg("充值用户名不能为空！");
        return;
    }

    var money = $("#money").val();
    if (isEmpty(money)) {
        showErrorMsg("充值金额不能为空！");
        return;
    }

    if (toInt(money) == 0) {
        showErrorMsg("充值金额须为整数！");
        return;
    }
    switch (type) {
        case "bank"://网银
            var yhid = $("#channelId").val();
            if (isEmpty(yhid)) {
                showErrorMsg("请选择支付渠道");
                return;
            }
            var payBankCode = "";
            if (yhid == 1) payBankCode = "ICBC"; //pay银行编码
            else if (yhid == "2") payBankCode = "CSH"; //
            else if (yhid == "3") payBankCode = "ABC"; //
            else if (yhid == "4") payBankCode = "CCB"; //
            else if (yhid == "5") payBankCode = "PSBC"; //
            else if (yhid == "6") payBankCode = "COMM"; //
            else if (yhid == "7") payBankCode = "CMB"; //
            else if (yhid == "8") payBankCode = "CIB"; //
            else if (yhid == "9") payBankCode = "CMBC"; //
            else if (yhid == "10") payBankCode = "ECITIC"; //
            else if (yhid == "11") payBankCode = "CEB"; //
            else if (yhid == "12") payBankCode = "SPDB"; //
            else if (yhid == "13") payBankCode = "CBHB"; //
            else if (yhid == "14") payBankCode = "SRCB"; //
            else if (yhid == "15") payBankCode = "BOS"; //
            else if (yhid == "16") payBankCode = "BEA"; //
            else if (yhid == "17") payBankCode = "PINGAN"; //
            else if (yhid == "18") payBankCode = "NJCB"; //
            else if (yhid == "19") payBankCode = "NBBANK"; //
            else if (yhid == "20") payBankCode = "BJRCB"; //
            else if (yhid == "21") payBankCode = "HZCB"; //
            else if (yhid == "22") payBankCode = "HXB"; //
            else if (yhid == "23") payBankCode = "HSB"; //
            else if (yhid == "24") payBankCode = "BOGH"; //
            else if (yhid == "25") payBankCode = "GDB"; //
            else if (yhid == "26") payBankCode = "BCCB"; //
            else if (yhid == "27") payBankCode = "CZB"; //
            window.location.href = "../../JtpayPost.aspx?amount=" + money + "&payAccounts=" + userName + "&p9_paymethod=1&p25_terminal=1&p26_iswappay=1&p10_paychannelnum=" + payBankCode;
            break;
        case "kuaijie": //快捷
            window.location.href = "../../JtpayPost.aspx?amount=" + money + "&payAccounts=" + userName + "&p9_paymethod=2&p25_terminal=1&p26_iswappay=1";
            break;
        case "weixin": //微信
            window.location.href = "../../JtpayPost.aspx?amount=" + money + "&payAccounts=" + userName + "&p9_paymethod=3&p25_terminal=1&p26_iswappay=1";
            break;
        case "zhifubao": //支付宝
            window.location.href = "../../JtpayPost.aspx?amount=" + money + "&payAccounts=" + userName + "&p9_paymethod=4&p25_terminal=1&p26_iswappay=1";
            break;
        case "kalei": //卡类

            var prepaidCardSerialNumber = $("#prepaidCardSerialNumber").val();
            if (isEmpty(userName)) {
                showErrorMsg("充值卡序列号不能为空！");
                return;
            }

            var prepaidCardPassword = $("#prepaidCardPassword").val();
            if (isEmpty(userName)) {
                showErrorMsg("充值卡密码不能为空！");
                return;
            }
            var yhid = $("#channelId").val(); //游戏卡id
            var payBankCode = "";
            if (yhid == 1) payBankCode = "SNDACARD"; //id 对应的卡编码
            else if (yhid == "2") payBankCode = "YPCARD"; //
            else if (yhid == "3") payBankCode = "ZHENGTU"; //
            else if (yhid == "4") payBankCode = "WANMEI"; //
            else if (yhid == "5") payBankCode = "NETEASE"; //
            else if (yhid == "6") payBankCode = "SOHU"; //
            else if (yhid == "7") payBankCode = "JIUYOU"; //
            else if (yhid == "8") payBankCode = "SZX"; //
            else if (yhid == "9") payBankCode = "UNICOM"; //
            else if (yhid == "10") payBankCode = "TELECOM"; //
            else if (yhid == "11") payBankCode = "QQCARD"; //
            else if (yhid == "12") payBankCode = "ZONGYOU"; //
            else if (yhid == "13") payBankCode = "TIANXIA"; //
            else if (yhid == "14") payBankCode = "TIANHONG"; //
            else if (yhid == "15") payBankCode = "JUNNET"; //
            window.location.href = "../../JtpayPost.aspx?amount=" + money + "&payAccounts=" + userName + "&p9_paymethod=5&p25_terminal=1&p26_iswappay=1&p10_paychannelnum=" + payBankCode + "&p19_productcat=" + prepaidCardPassword + "&p20_productnum=" + prepaidCardSerialNumber;
            break;
        case "azwx": //安卓微信内嵌
            window.location.href = "../../JtpayPost.aspx?amount=" + money + "&payAccounts=" + userName + "&p9_paymethod=3&p25_terminal=3&p26_iswappay=2";
            break;
        case "azwxtc": //安卓微信弹出
            window.location.href = "../../JtpayPost.aspx?amount=" + money + "&payAccounts=" + userName + "&p9_paymethod=3&p25_terminal=3&p26_iswappay=3";
            break;
        case "azzfbtc": //安卓支付宝弹出
            window.location.href = "../../JtpayPost.aspx?amount=" + money + "&payAccounts=" + userName + "&p9_paymethod=4&p25_terminal=3&p26_iswappay=3";
            break;
        case "AZZFB": //安卓支付宝内嵌
            window.location.href = "../../JtpayPost.aspx?amount=" + money + "&payAccounts=" + userName + "&p9_paymethod=4&p25_terminal=3&p26_iswappay=2";
            break;
        case "AZGZH": //安卓微信公众号
            window.location.href = "../../JtpayPost.aspx?amount=" + money + "&payAccounts=" + userName + "&p9_paymethod=3&p25_terminal=3&p26_iswappay=4";
            break;
        case "IOSwx": //IOS微信wap
            window.location.href = "../../JtpayPost.aspx?amount=" + money + "&payAccounts=" + userName + "&p9_paymethod=3&p25_terminal=2&p26_iswappay=2";
            break;
        case "IOSzfb": //IOS支付宝wap
            window.location.href = "../../JtpayPost.aspx?amount=" + money + "&payAccounts=" + userName + "&p9_paymethod=4&p25_terminal=2&p26_iswappay=2";
            break;
        case "IOSgzh": //IOS微信公众号
            window.location.href = "../../JtpayPost.aspx?amount=" + money + "&payAccounts=" + userName + "&p9_paymethod=3&p25_terminal=2&p26_iswappay=4";
            break;
    default:break;
    }

}

function submitDepositForm(b) {
    if (newTabToSubmit(b)) {
        var a = setOrderTs();
        showDepositIng(a);
        $("#json_value").val("");
        $("#depositForm").attr("target", "_blank").submit();
    }
    else
    { showLoading(true); $("#json_value").val("json"); $.ajax({ url: "/deposit/quickOrder.do", data: $("#depositForm").serialize(), type: "post", cache: false, dataType: "json", error: function() { }, success: function(c) { if (c.code != "ok" || "1" != c.result) { showErrorMsg(c.msg) } } }) }
}
function doBeforeSubmit() { } function otherDepositCheck() { return false } function clearCardData() { $("#cardNumInput").val(""); $("#cardPswInput").val("") } function setConfirmDetail() { var f = $("#gameChoose").text(); var g = $("#serverChoose").text(); var e = $("#nickName").text(); var d = $("#gameId").val(); var b = getGame(d); if (b == null) { return } if (b.ndGR == 1) { e = " " + e } else { e = "" } var a = toInt($("#gameCoin").val()); var c = $("#showAmount").val(); $("#confirmDetail").text("充值产品：" + f + " " + g + e); $("#confirmAmount").html("充值金额：<em>" + a + "</em>" + b.geCN + " 支付<em>" + c + "</em>元") } function setCellPhone(a) { $("#cellPhone").val($(a).val()) } function setCardNum(a) { $("#cardNum").val($(a).val()) } function setCardPsw(a) { $("#cardPsw").val($(a).val()) } function doAfterSetPasspot() { clearCoupon(); $("#nickNameSelectTr").hide(); clearRole(); showRoleDiv() } function doAfterDepositToFriend() { clearPage(); $("#gameDiv").find("li[data=0]").removeClass("current").hide(); $("#gameDiv").find("li[data=ABCD]").addClass("current").siblings("li").removeClass("current") } function doAfterDepositToMe() { $("#nickNameSelectTr").hide(); clearPage(); depositToYyAccount(); showRoleDiv() }
function clearCoupon() {
    $("#couponDiv").html("").hide();
    $("#couponsTipDiv").find("span").removeClass("checked");
    if (isEmpty($("#coupon").val())) {
        return;
    }
    $("#coupon").val("");
    $("#factAmount").val("-1");
    $("#showCoupon").val("0");
    setChoiceAmountDiv();
}
function clearPage() { clearChoice(); clearRole(); clearCoupon(); var a = $("#gameId").val(); var b = dw_gameRelativeInfo[a]; if (b) { showChoiceDiv(b.choices) } } function depositToYyAccount() { var b = $("#gameId").val(); var a = getGame(b); if (!useCp(a)) { return } reinstatePstText(); $(".paymentTable").find(".ml5").text("切换" + a.cpN) } function reinstatePstText() { $(".paymentTable").find(".passportText").text("："); $(".paymentTable").find(".passportText2").text("确认："); $("#accountType").val("yy") } function depositToCpAccount() { var b = $("#gameId").val(); var a = getGame(b); if (!useCp(a)) { return } $(".paymentTable").find(".passportText").text(a.cpN + "："); $(".paymentTable").find(".passportText2").text("确认" + a.cpN + "："); $("#accountType").val(a.cp); $(".paymentTable").find(".ml5").text("切换") } function useCp(a) { if (a == null) { showErrorMsg("请选择"); return false } if (a.useCp == 0) { return false } return true } function changeAccountType() { if (isLogin()) { depositToFriend() } if ($("#accountType").val() == "yy") { depositToCpAccount() } else { depositToYyAccount() } if (!setPassport()) { doAfterSetPasspot() } } function isValidGame(a) { if (a == null) { return false } if (a.type == 3) { return true } return false } function showConfirmRole() { $("#confirmRole").find("h3").text("您确定：" + $("#nickName").text() + ""); openPopDiv("confirmRole") } function closeConfirmRole() { closePopDiv("confirmRole") } function sureConfirmRole() {
    closeConfirmRole();
    submitToDeposit(0);
};