String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"");};String.prototype.replaceBlank=function(){s=this.toString();s=s.replace(/ /g,"");s=s.replace(/&nbsp;/g,"");s=s.replace(/&/g,"|||");s=s.replace(/r/g,"");return s;};String.prototype.isNotBlank=function(){var a=this.toString();return a.trim()!=="";};String.prototype.isBlank=function(){return this.trim()==="";};String.prototype.contains=function(a){return this.indexOf(a)>-1;};String.prototype.startWith=function(a){if(!a||this.length===0||a.length>this.length){return false;}if(this.substring(0,a.length)===a){return true;}return false;};if(typeof YA=="undefined"||!YA){var YA={};}YA.namespace=function(){var b=arguments,g=null,e,c,f;for(e=0;e<b.length;e=e+1){f=b[e].split(".");g=YA;for(c=(f[0]=="YA")?1:0;c<f.length;c=c+1){g[f[c]]=g[f[c]]||{};g=g[f[c]];}}return g;};YA.namespace("YA.utils","YA.config","YA.report","YA.tools");YA.namespace("YA.utils");YA.utils.Class={create:function(){return function(){this.initialize.apply(this,arguments);};},end:""};YA.namespace("YA.config");YA.config.Config={ap:navigator.appName,av:navigator.appVersion,ua:navigator.userAgent.toLowerCase(),cen:(navigator.cookieEnabled)?1:0,jen:navigator.javaEnabled()?1:0,lla:((navigator.language)?navigator.language:navigator.browserLanguage),sre:screen.width+"."+screen.height,sco:(parseInt(screen.colorDepth)||parseInt(screen.pixelDepth)),__yaParamPrex:"__ya",__yaOnerrorRetry:true,__debug:false,_yaDataCollectUrl:(("https:"==document.location.protocol)?"https://stat.duowan.com/data.do":"http://stat.game.yy.com/data.do"),initConfig:function(){this._constant=YA.utils.Constant;this.referrer=document.referrer;this.refrerrerParam=this._constant.getQueryParam(this.referrer);this.yaLocation=window.location;this.locationParam=this._constant.getQueryParam(this.yaLocation);},getYaParam:function(){return this._constant.getYaParamByPrefix(this.locationParam,this.__yaParamPrex);},getBaseClientInfo:function(){if(this.baseParam){return this.baseParam;}var a=new YA.utils.Parameter();a.add("mid",this.getYamid(this.locationParam.get("mid")));a.add("bve",this._constant.getBrowerVersion());a.add("lla",this.lla);a.add("os",this._constant.getOS());a.add("sco",this.sco);a.add("sre",this.sre);a.add("fve",this._constant.getFlashVersion());a.add("jav",this.jen);a.add("coo",this.cen);a.add("domain",this._constant.getUrlDomain());a.add("fla","Y");a.add("sdk_ver","js-ya-1.3.0");if(this.getYaParam().size>0){a.addAll(this.getYaParam());}if(this.yaConfigParam.size>0){a.addAll(this.yaConfigParam);}this.baseParam=a;return this.baseParam;},setYaConfigParam:function(d){var c=new YA.utils.Parameter();if(d){for(var b in d){c.add(b,d[b]);}}var a=c.get("mid");if(a&&this.getYamid(a)!=a){this.setYaMidCookie(a);}if(c.containsKey("error_retry")){this.__yaOnerrorRetry=c.get("error_retry");}this.yaConfigParam=c;},_yaMidCookieKey:"__yamid",_yaMidCookieTimeout:2*365*24*60*60*1000,setYaMidCookie:function(a){if(a){YA.utils.Cookie.setCookie(this._yaMidCookieKey,a,this._yaMidCookieTimeout);}},getYamid:function(a){var c=YA.utils.Cookie;var b=c.getCookie(this._yaMidCookieKey);if(b){return b;}b=a?a:YA.utils.UUID.generate32(),this.setYaMidCookie(b);return b;},end:""};YA.namespace("YA.utils");YA.utils.Constant={encode:function(a){return encodeURIComponent(a);},decode:function(a){return decodeURIComponent(a);},parseToInt:function(a){return isNaN(parseInt(a))?0:parseInt(a);},getOS:function(){var l=navigator.userAgent.toLowerCase();var d=navigator.platform;var e=(d==="Win32")||(d==="Windows");var f=(d==="Mac68K")||(d==="MacPPC")||(d==="Macintosh")||(d==="MacIntel");var g=l.match(/ipad/i)==="ipad";var h=l.match(/iphone os/i)==="iphone os";var c=(d==="X11")&&!e&&!f;var b=(String(d).indexOf("Linux")>-1);var a=l.match(/android/i)==="android";if(f){return"Mac";}if(c){return"Unix";}if(b){if(a){return"Android";}return"Linux";}if(e){var k={ce:"WindowsMobile",mobile:"WindowsMobile","nt 5.0":"Windows2000","nt 5.1":"WindowsXP","nt 5.2":"Windows2003","nt 6.0":"WindowsVista","nt 6.1":"Windows7","nt 6.2":"Windows8","2000":"Windows2000",xp:"WindowsXP","2003":"Windows2003",vista:"WindowsVista","7":"Windows7","8":"Windows8"};for(var j in k){if(l.indexOf("windows "+j)>-1){return k[j];}}}return"unknown";},getBrowerVersion:function(){var c="unknown";var a=navigator.userAgent.toLowerCase();var b;(b=a.match(/msie ([\d.]+)/))?c=b[0]:(b=a.match(/firefox\/([\d.]+)/))?c=b[0]:(b=a.match(/yyexplorer\/([\d.]+)/))?c=b[0]:(b=a.match(/chrome\/([\d.]+)/))?c=b[0]:(b=a.match(/opera.([\d.]+)/))?c=b[0]:(b=a.match(/version\/([\d.]+).*safari/))?c=b[0]:0;return c;},getFlashVersion:function(){var f="0",n=navigator;if(n.plugins&&n.plugins.length){for(var ii=0;ii<n.plugins.length;ii++){if(n.plugins[ii].name.indexOf("Shockwave Flash")!=-1){f=n.plugins[ii].description.split("Shockwave Flash ")[1];break;}}}else{if(window.ActiveXObject){for(var ii=10;ii>=2;ii--){try{var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ii+"');");if(fl){f=ii+".0";break;}}catch(e){}}}}return f.replaceBlank();},getQueryParam:function(a){var b=new YA.utils.Parameter();if(!a){return b;}s=this.decode(a).replace("?","?&").split("&");for(i=0;i<s.length;i++){var c=s[i].split("=");if(!c||c.length<2){continue;}b.add(c[0],c[1]);}return b;},getUrlDomain:function(b){if(!b){return document.domain;}var d=/.*\:\/\/([^\/]*).*/;var a=b.match(d);var c="";if(typeof a!="undefined"&&null!=a){c=a[1];}return c;},getURILocation:function(a){if(!this.isURL(a)){return"";}return a.replace(/(.*\.[\w-]+\/){0,}([^\?]+).*/ig,"$2");},isURL:function(b){var a=/^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i;return a.test(b);},extractByCutPrefix:function(b,a){if(!b instanceof String||!b.startWith(a)){return b;}return b.substring(a.length,b.length);},getYaParamByPrefix:function(b,d,e){var c=new YA.utils.Parameter();if(b){for(var a in b.data){if(a.startWith(d)){c.add(this.extractByCutPrefix(a,d),b.get(a));}else{if(e){c.add(a,b.get(a));}}}}return c;},consoleLog:function(b){try{if(YA.config.Config.__debug){console.log(new Date().format("yyyy-mm-dd HH:MM:ss")+" - "+b);}}catch(a){}},initToolbar:function(){var b=this;if(b.enableDeveloperToolbar==true){if(!jQuery){b.consoleLog("the dev toolbar depend on jQuery! but jQuery="+jQuery);return;}var a="http://sz.duowan.com/s/ya/DeveloperToolbar.js";if(!YA.tools.Devtool){jQuery.ajax({url:a,async:true,dataType:"script"});}if(!YA.tools.Devtool){this.consoleLog("please wait for Devtool init,and try click again! YA.tools.Devtool="+YA.tools.Devtool);}}},log2Toolbar:function(a){var b=this;try{if(!jQuery){b.consoleLog("the dev toolbar depend on jQuery! but jQuery="+jQuery+",queryStirng="+a);return;}b.initToolbar();if(b.enableDeveloperToolbar==true&&YA.tools.Devtool&&jQuery){YA.tools.Devtool.callDatacheckLog(a);}b.consoleLog("call datacheck and show result error! YA.tools.Devtool="+YA.tools.Devtool+",and !jQuery="+(jQuery==undefined));}catch(c){b.consoleLog("do log to toolbar error! e="+c);}},isTestUser:function(b){var a=",bimoziyan0,data_qianduan1,data_qianduan2,data_qianduan3,data_chanpin1,data_chanpin2,data_chanpin3,data_yunying1,data_yunying2,data_yunying3,data_test1,data_test2,data_test3,";if(a.indexOf(","+b+",")>-1){return true;}return false;},end:""};YA.namespace("YA.utils");YA.utils.Cookie={init:"",getCookieValue:function(b){var a=document.cookie.indexOf(";",b);if(a==-1){a=document.cookie.length;}return YA.utils.Constant.decode(document.cookie.substring(b,a));},getCookie:function(d){var b=d+"=";var f=b.length;var a=document.cookie.length;var e=0;while(e<a){var c=e+f;if(document.cookie.substring(e,c)==b){return this.getCookieValue(c);}e=document.cookie.indexOf(" ",e)+1;if(e==0){break;}}return null;},getExpires:function(b){var a=new Date();a.setTime(a.getTime()+b);return a;},deleteCookie:function(a){this.setCookie(a,"",0);},setCookie:function(c,d,b){var a=document.domain;var d=c+"="+YA.utils.Constant.encode(d)+"; domain="+a+";";if(b>0){d+=" expires="+this.getExpires(b).toGMTString();}document.cookie=d;}};YA.namespace("YA.utils");YA.utils.DateFormat={dateFormat:function(w,r,a){var c=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,p=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,v=/[^-+\dA-Z]/g,t=function(m,d){m=String(m);d=d||2;while(m.length<d){m="0"+m;}return m;};var k=YA.utils.DateFormat;if(arguments.length==1&&Object.prototype.toString.call(w)=="[object String]"&&!/\d/.test(w)){r=w;w=undefined;}w=w?new Date(w):new Date;if(isNaN(w)){throw SyntaxError("invalid date");}r=String(k.masks[r]||r||k.masks["default"]);if(r.slice(0,4)=="UTC:"){r=r.slice(4);a=true;}var x=a?"getUTC":"get",u=w[x+"Date"](),l=w[x+"Day"](),q=w[x+"Month"](),g=w[x+"FullYear"](),h=w[x+"Hours"](),e=w[x+"Minutes"](),j=w[x+"Seconds"](),f=w[x+"Milliseconds"](),n=a?0:w.getTimezoneOffset(),b={d:u,dd:t(u),ddd:k.i18n.dayNames[l],dddd:k.i18n.dayNames[l+7],m:q+1,mm:t(q+1),mmm:k.i18n.monthNames[q],mmmm:k.i18n.monthNames[q+12],yy:String(g).slice(2),yyyy:g,h:h%12||12,hh:t(h%12||12),H:h,HH:t(h),M:e,MM:t(e),s:j,ss:t(j),l:t(f,3),L:t(f>99?Math.round(f/10):f),t:h<12?"a":"p",tt:h<12?"am":"pm",T:h<12?"A":"P",TT:h<12?"AM":"PM",Z:a?"UTC":(String(w).match(p)||[""]).pop().replace(v,""),o:(n>0?"-":"+")+t(Math.floor(Math.abs(n)/60)*100+Math.abs(n)%60,4),S:["th","st","nd","rd"][u%10>3?0:(u%100-u%10!=10)*u%10]};return r.replace(c,function(d){return d in b?b[d]:d.slice(1,d.length-1);});},masks:{"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"},i18n:{dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},parse:function(a){if(typeof a!=="string"||!a.isNotBlank()){return null;}return new Date(Date.parse(a.replace(/-/g,"/")));}};Date.prototype.format=function(a,b){return YA.utils.DateFormat.dateFormat(this,a,b);};Date.prototype.yaTimestamp=function(){return this.format("yyyymmddHHMMss");};YA.namespace("YA.utils");YA.utils.Parameter=YA.utils.Class.create();YA.utils.Parameter.prototype={initialize:function(){this.data={};this.size=0;},data:{},add:function(a,b){if(!(a in this.data)){this.size++;}this.data[a]=b;},get:function(a){return this.data[a];},remove:function(a){if(a in this.data){delete this.data[a];this.size--;}},addAll:function(b){if(b instanceof YA.utils.Parameter){for(var a in b.data){this.add(a,b.get(a));}}},addAllIfNoExist:function(b){if(b instanceof YA.utils.Parameter){for(var a in b.data){if(!(a in this.data)){this.add(a,b.get(a));}}}},containsKey:function(a){return(a in this.data);},containsValue:function(b){for(var a in this.data){if(this.get(a)===b){return true;}}return false;},removeAll:function(b){if(b instanceof YA.utils.Parameter){for(var a in b.data){this.remove(a);}}},toString:function(){var a="";for(var b in this.data){if(a!=""){a+="&";}a+=b+"="+this.data[b];}return a;}};YA.namespace("YA.core");YA.core.Queue={separator:"\01",defaultLen:10,queueEnable:false,initialize:function(){if(!this.queue){this.queue=new Array();}},push:function(c,b){var a=this;a.initialize();if(a.queueEnable){a.queue.push(c);}else{YA.core.ReportSender.sendData(c);}if(!b){b=a.callback;}b(c);},pushAll:function(){this.initialize();for(var a=0;a<arguments.length;a++){this.push(arguments[a]);}},shift:function(e){this.initialize();if(!e){e=this.defaultLen;}var d=this.queue;var a=d.length>e?e:d.length;var c=new Array();for(var b=0;b<a;b++){c.push(d.shift());}if(c.length<1){return null;}return c.join(this.separator);},callback:function(a){},end:""};YA.namespace("YA.core");YA.core.SessionData={defaultSessionIdKey:"product",_yasdatas:"_yasdatas_",_yasids:"_yasids",sessionIds:new YA.utils.Parameter(),sDataQueue:new Array(),add:function(g,d,c){var h={pro:"",cha:"",rso:""};var f=YA.utils.Constant.getQueryParam(d);var e=new YA.utils.Parameter();for(var b in h){e.add(b,f.get(b));}var a=new YA.utils.Parameter();a.add(g,d);this.sDataQueue.push(a);if(c==true){YA.utils.Cookie.setCookie(this._yasdatas+g,e.toString(),-1);}},get:function(d){var b=null;for(var a=0;a<this.sDataQueue.length;a++){if(this.sDataQueue[a] instanceof YA.utils.Parameter&&this.sDataQueue[a].containsKey(d)){b=this.sDataQueue[a];}}if(b instanceof YA.utils.Parameter){return b.get(d);}if(b==null){var c=this.getCCParam(this._yasdatas+d);if(c&&c.size>1){c.add("act","/session_data");c.add("session_id",d);c.addAll(YA.config.Config.getBaseClientInfo());this.add(d,c.toString());b=c.toString();}}return b;},list:function(){var a=new Array();var e=new Array();var f=YA.core.Queue.separator;var b=new YA.utils.Parameter();b.addAll(this.sessionIds);b.addAll(this.getCCParam(this._yasids));defaultLen=5;for(var d in b.data){var c=this.get(b.get(d));if(c){e.push(c);}if(i%defaultLen==0){a.push(e.join(f));e=[];}}a.push(e.join(f));return a;},getCCParam:function(a){return YA.utils.Constant.getQueryParam(this.getCCValue(a));},getCCValue:function(a){return YA.utils.Cookie.getCookie(a);},generateSessionId:function(e,d){var c=(e)?e.toLowerCase():this.defaultSessionIdKey;var b=YA.utils.UUID.generate32();this.sessionIds.add(c,b);if(d==true){var a=this.getCCParam(this._yasids);if(!a){var a=new YA.utils.Parameter();}a.add(c,b);YA.utils.Cookie.setCookie(this._yasids,a.toString(),-1);}return b;},getSessionId:function(d){var c=(d)?d.toLowerCase():this.defaultSessionIdKey;var b=this.sessionIds.get(c);if(!b){var a=this.getCCParam(this._yasids);b=a.get(c);if(b){this.sessionIds.add(c,b);}}return b;},getSessionIdAndGenIfNotExist:function(c,b){var a=this.getSessionId(c);if(!a){a=this.generateSessionId(c,b);}return a;},end:""};YA.namespace("YA.utils");YA.utils.Timer=YA.utils.Class.create();YA.utils.Timer.prototype={periodTime:300*1000,intervalCouter:0,initialize:function(a){this.startTime=new Date();var b=/^[1-9]+[0-9]*$/;if(a&&b.test(a)){this.periodTime=a;}},doInterval:function(b){var a=this;if(!a.sh){a.sh=setInterval(b,a.periodTime);}},clearRefresh:function(){var a=this.sh;clearInterval(a);},end:null};YA.namespace("YA.utils");YA.utils.UUID={generate32:function(){var d=new Date(1582,10,15,0,0,0,0);var j=new Date();var l=j.getTime()-d.getTime();var c="";var e=YA.utils.UUID;var m=e.generateBits(l,0,31);var k=e.generateBits(l,32,47);var g=e.generateBits(l,48,59)+"1";var b=e.generateBits(e.rand(4095),0,7);var f=e.generateBits(e.rand(4095),0,7);var a=e.generateBits(e.rand(8191),0,7)+e.generateBits(e.rand(8191),8,15)+e.generateBits(e.rand(8191),0,7)+e.generateBits(e.rand(8191),8,15)+e.generateBits(e.rand(8191),0,15);return m+c+k+c+g+c+b+f+c+a;},generate:function(a){if(!a){var a=5;}var c=new Date().getTime();var b=YA.utils.UUID;var d=b.generateBits(b.rand(8191*a),0,7)+b.generateBits(b.rand(8191*a),8,15)+b.generateBits(b.rand(8191*a),0,3);return d+c;},generateBits:function(f,g,b){var a=this.returnBase(f,16);var d=new Array();var e="";var c=0;for(c=0;c<a.length;c++){d.push(a.substring(c,c+1));}for(c=Math.floor(g/4);c<=Math.floor(b/4);c++){if(!d[c]||d[c]==""){e+="0";}else{e+=d[c];}}return e;},returnBase:function(c,d){var e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];if(c<d){var b=e[c];}else{var f=""+Math.floor(c/d);var a=c-f*d;if(f>=d){var b=this.returnBase(f,d)+e[a];}else{var b=e[f]+e[a];}}return b;},rand:function(a){return Math.floor(Math.random()*a);}};YA.config.Config.initConfig();YA.namespace("YA.core");YA.core.ReportSender=YA.utils.Class.create();YA.core.ReportSender={initialize:function(){this.startReportSdata();},reportTimerPeriod:1*1000,reportSDataTimerPeriod:4*60*60*1000,startReport:function(){var d=this;if(!d.reportTimer){d.reportTimer=new YA.utils.Timer(this.reportTimerPeriod);}var b=d.reportTimer;var c=YA.core.Queue;var a=0;b.doInterval(function(){try{var g=c.shift();a++;if(g){d.sendData(g);}YA.utils.Constant.consoleLog("reporting reportCount="+a+" queryString="+g);}catch(f){YA.utils.Constant.consoleLog("reporting reportCount="+a+" ,send with exception="+f);}});},startReportSdata:function(){if(!this.reportSdTimer){this.reportSdTimer=new YA.utils.Timer(this.reportSDataTimerPeriod);}var c=this.reportSdTimer;var d=this;var b=YA.core.SessionData;var a=0;c.doInterval(function(){try{var h=b.list();a++;if(h instanceof Array&&h.length>=1){for(var f=0;f<=h.length-1;f++){var g=h[f];if(g&&g.length>=1){d.sendData(h[f]);}}}YA.utils.Constant.consoleLog("reporting sessionData reportCount="+a+" queryStrings="+h);}catch(j){YA.utils.Constant.consoleLog("reporting sessionData reportCount="+a+" ,send with exception="+j);}});},sendData:function(a,c,b){return this.doSendData(YA.config.Config._yaDataCollectUrl+"?",a,c,b);},doSendData:function(d,a,h,c){var b=YA.utils.Constant.encode(a.toString())+"&__yafm=i&ati="+new Date().yaTimestamp();var e=d+b;var f=this;if(!h){h=f.callback;}var g=f.newImage(e);g.onload=function(){g.onload=null;h(b);};if(!c){c=f.errorCallback;}g.onerror=function(){g.onerror=null;if(YA.config.Config.__yaOnerrorRetry==false){return;}this.src=e+"&ati="+new Date().yaTimestamp();c(e);};},newImage:function(a){var b=new Image(1,1);b.src=a;return b;},callback:function(a){if(YA.utils.Constant.enableDeveloperToolbar==true){YA.utils.Constant.log2Toolbar(a);}},errorCallback:function(a){},end:""};YA.namespace("YA.report");YA.report.PAS=YA.utils.Class.create();YA.report.PAS.prototype={initialize:function(b,c){this._queue=YA.core.Queue;var a=new YA.utils.Parameter();if(b){a.add("pro",b);}if(c){a.add("pas",c);}a.add("dty","pas");this.param=a;},getSidKey:function(){var a=this.param;return a.get("pro")+"-"+a.get("pas");},setParam:function(a,b){if(this.param){this.param.add(a,b);}},setExtParam:function(a){if(a){var c=YA.utils.Constant;var b=c.getYaParamByPrefix(c.getQueryParam(a),YA.config.Config.__yaParamPrex,true);this.param.addAll(b);}},getPasParam:function(d,c){var b=new YA.utils.Parameter();b.addAll(this.param);if(d){for(var a in d){b.add(a,d[a]);}}b.addAll(YA.utils.Constant.getQueryParam(c));return b;},reportSessionData:function(d,c){var b=new YA.utils.Parameter();b.add("act","/session_data");var a=YA.core.SessionData.getSessionIdAndGenIfNotExist(this.getSidKey(),true);b.add("session_id",a);b.addAll(YA.config.Config.getBaseClientInfo());b.addAll(this.getPasParam(d,c));YA.core.SessionData.add(a,b.toString(),true);this._queue.push(b.toString());},reportEvent:function(b,a){return this.reportEventBase(this.getPasParam(b,a));},reportEventBase:function(b){var a=new YA.utils.Parameter();a.add("act","/event");a.addAll(this.getTransmitParam());a.addAll(b);this._queue.push(a.toString());},getTransmitParam:function(){var a=YA.core.SessionData.getSessionIdAndGenIfNotExist(this.getSidKey());var e=YA.core.SessionData.get(a);var f=YA.utils.Constant.getQueryParam(e);var c=new YA.utils.Parameter();var d={pro:"",session_id:""};for(var b in f.data){if(b in d){c.add(b,f.get(b));}}return c;},reportStartUp:function(c,b){this.reportSessionData(c,b);var a=this.getPasParam(c,b);a.add("eid","startup");this.reportEventBase(a);},startHeartbeat:function(e,d){var b=this.getPasParam(e,d);b.add("eid","heartbeat");var c=YA.utils.Timer.periodTime;if(e&&e.hbPeriodTime){c=e.hbPeriodTime;}var a=new YA.utils.Timer(c);this.heartbeatTimer=a;var g=this;var f=0;a.doInterval(function(){try{b.add("dur",((f+1)*a.periodTime/1000));g.reportEventBase(b);f++;a.intervalCouter=f;YA.utils.Constant.consoleLog("pas heartbeating heartbeatCount="+f+", _param="+b);}catch(h){YA.utils.Constant.consoleLog("pas heartbeating heartbeatCount="+f+" ,send with exception="+h);}});},reportEndUp:function(f,d){var c=this.getPasParam(f,d);c.add("eid","endup");var b=this.heartbeatTimer;if(b){c.add("dur",parseInt(new Date().getTime()-b.startTime.getTime()));this.reportEventBase(c);YA.utils.Constant.consoleLog("endup endUp.intervalCouter="+b.intervalCouter+", _param:"+c);var a=YA.core.SessionData.getSessionIdAndGenIfNotExist(this.getSidKey());var e=YA.core.SessionData.get(a);this._queue.push(e.toString());}},end:""};YA.config.Config.initConfig();YA.namespace("YA.report");YA.report.GAS=YA.utils.Class.create();YA.report.GAS.prototype={initialize:function(b,c){this.queue=YA.core.Queue;this.config=YA.config.Config;this.sessionData=YA.core.SessionData;var a=new YA.utils.Parameter();if(b){a.add("pro",b);}if(c){a.add("pas",c);}a.add("dty","gas");this.param=a;},setParam:function(a,b){if(this.param){this.param.add(a,b);}},setExtParam:function(a){if(a){var c=YA.utils.Constant;var b=c.getYaParamByPrefix(c.getQueryParam(a),YA.config.Config.__yaParamPrex,true);this.param.addAll(b);}},reportGlobalSessionData:function(d,b){var e=this.sessionData.getSessionIdAndGenIfNotExist(this.param.get("pro")+"_"+this.param.get("pas"),true);var a=this.initParam(d,b,true);a.add("act","/session_data");a.add("session_id",e);a.add("session_type","global");var c=a.toString();this.queue.push(c);this.sessionData.add(e,c,true);},reportGlobalEvent:function(c,b){var a=this.initParam(c,b,false);a.add("act","/event");a.add("session_id",this.sessionData.getSessionIdAndGenIfNotExist(this.param.get("pro")+"_"+this.param.get("pas"),true));this.queue.push(a.toString());},reportStartUp:function(c,b){var d=this.reportGameSessionData(c,b);var a=this.initParam(c,b,false);a.add("act","/event");a.add("session_id",d);a.add("eid","startup");this.queue.push(a.toString());},reportGameSessionData:function(d,a){var e=this.sessionData.generateSessionId(d.gam+"_"+d.gse,false);var c=this.initParam(d,a,true);c.add("act","/session_data");c.add("session_id",e);c.add("session_type","game");var b=c.toString();this.queue.push(b);this.sessionData.add(e,b,false);return e;},startHeartbeat:function(d,c){var b=this.initParam(d,c,false);b.add("act","/event");b.add("eid","heartbeat");var a=new YA.utils.Timer(d.hbPeriodTime);this.heartbeatTimer=a;var f=this;var e=0;a.doInterval(function(){try{b.add("session_id",f.sessionData.getSessionIdAndGenIfNotExist(d.gam+"_"+d.gse,false));b.add("dur",(e+1)*a.periodTime);f.queue.push(b.toString());e++;a.intervalCouter=e;}catch(g){YA.utils.Constant.consoleLog("gas heartbeating heartbeatCount="+e+" ,send with exception="+g);}});},reportGameEvent:function(c,b){var d=this.sessionData.getSessionId(c.gam+"_"+c.gse);if(!d){d=this.reportGameSessionData(c,b);c.special_game_event="1";}var a=this.initParam(c,b,false);a.add("act","/event");a.add("session_id",d);this.queue.push(a.toString());},reportEndUp:function(d,c){var e=this.sessionData.getSessionId(d.gam+"_"+d.gse);var b=this.initParam(d,c,false);b.add("act","/event");b.add("eid","endup");b.add("session_id",e);var a=this.heartbeatTimer;b.add("dur",a.intervalCouter*a.periodTime);this.queue.push(b.toString());this.queue.push(this.sessionData.get(e));},initParam:function(d,c,e){var b=new YA.utils.Parameter();for(var a in d){b.add(a,d[a]);}b.addAll(YA.utils.Constant.getQueryParam(c));b.addAll(this.param);if(e==true){b.addAll(this.config.getBaseClientInfo());this.specialBusiness(b);}return b;},specialBusiness:function(d){var b=["pro","rso","ref","rso_desc","ref_desc"];for(var a=0;a<b.length;a++){var c=this.config.locationParam.get(b[a]);if(!d.get(b[a])&&c){d.add(b[a],c);}}},end:""};YA.config.Config.initConfig();YA.core.ReportSender.initialize();YA.namespace("YA.report");YA.report.YYAnalytics=YA.utils.Class.create();YA.report.YYAnalytics.prototype={initialize:function(b,c,a){this.pas=new YA.report.PAS(b,c);this.gas=new YA.report.GAS(b,c);if("http:"==document.location.protocol){this.isInitTestToolbar(c);}YA.config.Config.setYaConfigParam(a);},setParam:function(a,b){this.pas.setParam(a,b);this.gas.setParam(a,b);},setExtParam:function(a){this.pas.setExtParam(a);this.gas.setExtParam(a);},isInitTestToolbar:function(a){if(YA.utils.Constant.isTestUser(a)==true){YA.utils.Constant.enableDeveloperToolbar=true;YA.utils.Constant.initToolbar();}},reportProductStartUp:function(b,a){this.pas.reportStartUp(b,a);},startProductHeartbeat:function(b,a){this.pas.startHeartbeat(b,a);},reportProductEndUp:function(b,a){this.pas.reportEndUp(b,a);},reportProductEvent:function(b,a){var c=this;c.pas.reportEvent(b,a);},reportGameStartUp:function(b,a){this.gas.reportStartUp(b,a);},startGameHeartbeat:function(b,a){this.gas.startHeartbeat(b,a);},reportGameEvent:function(b,a){this.gas.reportGameEvent(b,a);},reportGameEndUp:function(b,a){this.gas.reportEndUp(b,a);},end:""};