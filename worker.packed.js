// Copyleft 2021: AKA Infra
// Formally: PUBLIC DOMAIN / CC0
// Informally: "an ye harm none, do what ye will"

// declaration parsed by autoinsert.py; inserts the literal contents of deps/marked.min.js
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2021, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
!function(e,u){"object"==typeof exports&&"undefined"!=typeof module?module.exports=u():"function"==typeof define&&define.amd?define(u):(e="undefined"!=typeof globalThis?globalThis:e||self).marked=u()}(this,function(){"use strict";function r(e,u){for(var t=0;t<u.length;t++){var n=u[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,u){(null==u||u>e.length)&&(u=e.length);for(var t=0,n=new Array(u);t<u;t++)n[t]=e[t];return n}function c(e,u){var t;if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator])return(t=e[Symbol.iterator]()).next.bind(t);if(Array.isArray(e)||(t=function(e,u){if(e){if("string"==typeof e)return i(e,u);var t=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(t="Object"===t&&e.constructor?e.constructor.name:t)||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?i(e,u):void 0}}(e))||u&&e&&"number"==typeof e.length){t&&(e=t);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function t(e){return D[e]}var e,u=(function(u){function e(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}u.exports={defaults:e(),getDefaults:e,changeDefaults:function(e){u.exports.defaults=e}}}(e={exports:{}}),e.exports),n=/[&<>"']/,s=/[&<>"']/g,l=/[<>"']|&(?!#?\w+;)/,a=/[<>"']|&(?!#?\w+;)/g,D={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};var o=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function h(e){return e.replace(o,function(e,u){return"colon"===(u=u.toLowerCase())?":":"#"===u.charAt(0)?"x"===u.charAt(1)?String.fromCharCode(parseInt(u.substring(2),16)):String.fromCharCode(+u.substring(1)):""})}var p=/(^|[^\[])\^/g;var g=/[^\w:]/g,f=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;var F={},A=/^[^:]+:\/*[^/]*$/,C=/^([^:]+:)[\s\S]*$/,d=/^([^:]+:\/*[^/]*)[\s\S]*$/;function E(e,u){F[" "+e]||(A.test(e)?F[" "+e]=e+"/":F[" "+e]=k(e,"/",!0));var t=-1===(e=F[" "+e]).indexOf(":");return"//"===u.substring(0,2)?t?u:e.replace(C,"$1")+u:"/"===u.charAt(0)?t?u:e.replace(d,"$1")+u:e+u}function k(e,u,t){var n=e.length;if(0===n)return"";for(var r=0;r<n;){var i=e.charAt(n-r-1);if(i!==u||t){if(i===u||!t)break;r++}else r++}return e.substr(0,n-r)}var m=function(e,u){if(u){if(n.test(e))return e.replace(s,t)}else if(l.test(e))return e.replace(a,t);return e},b=h,x=function(t,e){t=t.source||t,e=e||"";var n={replace:function(e,u){return u=(u=u.source||u).replace(p,"$1"),t=t.replace(e,u),n},getRegex:function(){return new RegExp(t,e)}};return n},B=function(e,u,t){if(e){var n;try{n=decodeURIComponent(h(t)).replace(g,"").toLowerCase()}catch(e){return null}if(0===n.indexOf("javascript:")||0===n.indexOf("vbscript:")||0===n.indexOf("data:"))return null}u&&!f.test(t)&&(t=E(u,t));try{t=encodeURI(t).replace(/%25/g,"%")}catch(e){return null}return t},w={exec:function(){}},v=function(e){for(var u,t,n=1;n<arguments.length;n++)for(t in u=arguments[n])Object.prototype.hasOwnProperty.call(u,t)&&(e[t]=u[t]);return e},y=function(e,u){var t=e.replace(/\|/g,function(e,u,t){for(var n=!1,r=u;0<=--r&&"\\"===t[r];)n=!n;return n?"|":" |"}).split(/ \|/),n=0;if(t.length>u)t.splice(u);else for(;t.length<u;)t.push("");for(;n<t.length;n++)t[n]=t[n].trim().replace(/\\\|/g,"|");return t},_=function(e,u){if(-1===e.indexOf(u[1]))return-1;for(var t=e.length,n=0,r=0;r<t;r++)if("\\"===e[r])r++;else if(e[r]===u[0])n++;else if(e[r]===u[1]&&--n<0)return r;return-1},z=function(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")},$=function(e,u){if(u<1)return"";for(var t="";1<u;)1&u&&(t+=e),u>>=1,e+=e;return t+e},S=u.defaults,T=k,I=y,R=m,Z=_;function q(e,u,t){var n=u.href,r=u.title?R(u.title):null,u=e[1].replace(/\\([\[\]])/g,"$1");return"!"!==e[0].charAt(0)?{type:"link",raw:t,href:n,title:r,text:u}:{type:"image",raw:t,href:n,title:r,text:R(u)}}var O=function(){function e(e){this.options=e||S}var u=e.prototype;return u.space=function(e){e=this.rules.block.newline.exec(e);if(e)return 1<e[0].length?{type:"space",raw:e[0]}:{raw:"\n"}},u.code=function(e){var u=this.rules.block.code.exec(e);if(u){e=u[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:u[0],codeBlockStyle:"indented",text:this.options.pedantic?e:T(e,"\n")}}},u.fences=function(e){var u=this.rules.block.fences.exec(e);if(u){var t=u[0],e=function(e,u){if(null===(e=e.match(/^(\s+)(?:```)/)))return u;var t=e[1];return u.split("\n").map(function(e){var u=e.match(/^\s+/);return null!==u&&u[0].length>=t.length?e.slice(t.length):e}).join("\n")}(t,u[3]||"");return{type:"code",raw:t,lang:u[2]&&u[2].trim(),text:e}}},u.heading=function(e){var u=this.rules.block.heading.exec(e);if(u){var t=u[2].trim();return/#$/.test(t)&&(e=T(t,"#"),!this.options.pedantic&&e&&!/ $/.test(e)||(t=e.trim())),{type:"heading",raw:u[0],depth:u[1].length,text:t}}},u.nptable=function(e){e=this.rules.block.nptable.exec(e);if(e){var u={type:"table",header:I(e[1].replace(/^ *| *\| *$/g,"")),align:e[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:e[3]?e[3].replace(/\n$/,"").split("\n"):[],raw:e[0]};if(u.header.length===u.align.length){for(var t=u.align.length,n=0;n<t;n++)/^ *-+: *$/.test(u.align[n])?u.align[n]="right":/^ *:-+: *$/.test(u.align[n])?u.align[n]="center":/^ *:-+ *$/.test(u.align[n])?u.align[n]="left":u.align[n]=null;for(t=u.cells.length,n=0;n<t;n++)u.cells[n]=I(u.cells[n],u.header.length);return u}}},u.hr=function(e){e=this.rules.block.hr.exec(e);if(e)return{type:"hr",raw:e[0]}},u.blockquote=function(e){var u=this.rules.block.blockquote.exec(e);if(u){e=u[0].replace(/^ *> ?/gm,"");return{type:"blockquote",raw:u[0],text:e}}},u.list=function(e){e=this.rules.block.list.exec(e);if(e){for(var u,t,n,r,i,s,l=e[0],a=e[2],D=1<a.length,o={type:"list",raw:l,ordered:D,start:D?+a.slice(0,-1):"",loose:!1,items:[]},c=e[0].match(this.rules.block.item),h=!1,p=c.length,g=this.rules.block.listItemStart.exec(c[0]),f=0;f<p;f++){if(l=u=c[f],this.options.pedantic||(s=u.match(new RegExp("\\n\\s*\\n {0,"+(g[0].length-1)+"}\\S")))&&(t=u.length-s.index+c.slice(f+1).join("\n").length,o.raw=o.raw.substring(0,o.raw.length-t),l=u=u.substring(0,s.index),p=f+1),f!==p-1){if(n=this.rules.block.listItemStart.exec(c[f+1]),this.options.pedantic?n[1].length>g[1].length:n[1].length>=g[0].length||3<n[1].length){c.splice(f,2,c[f]+(!this.options.pedantic&&n[1].length<g[0].length&&!c[f].match(/\n$/)?"":"\n")+c[f+1]),f--,p--;continue}(!this.options.pedantic||this.options.smartLists?n[2][n[2].length-1]!==a[a.length-1]:D==(1===n[2].length))&&(t=c.slice(f+1).join("\n").length,o.raw=o.raw.substring(0,o.raw.length-t),f=p-1),g=n}n=u.length,~(u=u.replace(/^ *([*+-]|\d+[.)]) ?/,"")).indexOf("\n ")&&(n-=u.length,u=this.options.pedantic?u.replace(/^ {1,4}/gm,""):u.replace(new RegExp("^ {1,"+n+"}","gm"),"")),u=T(u,"\n"),f!==p-1&&(l+="\n"),n=h||/\n\n(?!\s*$)/.test(l),f!==p-1&&(h="\n\n"===l.slice(-2),n=n||h),n&&(o.loose=!0),this.options.gfm&&(i=void 0,(r=/^\[[ xX]\] /.test(u))&&(i=" "!==u[1],u=u.replace(/^\[[ xX]\] +/,""))),o.items.push({type:"list_item",raw:l,task:r,checked:i,loose:n,text:u})}return o}},u.html=function(e){e=this.rules.block.html.exec(e);if(e)return{type:this.options.sanitize?"paragraph":"html",raw:e[0],pre:!this.options.sanitizer&&("pre"===e[1]||"script"===e[1]||"style"===e[1]),text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):R(e[0]):e[0]}},u.def=function(e){e=this.rules.block.def.exec(e);if(e)return e[3]&&(e[3]=e[3].substring(1,e[3].length-1)),{tag:e[1].toLowerCase().replace(/\s+/g," "),raw:e[0],href:e[2],title:e[3]}},u.table=function(e){e=this.rules.block.table.exec(e);if(e){var u={type:"table",header:I(e[1].replace(/^ *| *\| *$/g,"")),align:e[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:e[3]?e[3].replace(/\n$/,"").split("\n"):[]};if(u.header.length===u.align.length){u.raw=e[0];for(var t=u.align.length,n=0;n<t;n++)/^ *-+: *$/.test(u.align[n])?u.align[n]="right":/^ *:-+: *$/.test(u.align[n])?u.align[n]="center":/^ *:-+ *$/.test(u.align[n])?u.align[n]="left":u.align[n]=null;for(t=u.cells.length,n=0;n<t;n++)u.cells[n]=I(u.cells[n].replace(/^ *\| *| *\| *$/g,""),u.header.length);return u}}},u.lheading=function(e){e=this.rules.block.lheading.exec(e);if(e)return{type:"heading",raw:e[0],depth:"="===e[2].charAt(0)?1:2,text:e[1]}},u.paragraph=function(e){e=this.rules.block.paragraph.exec(e);if(e)return{type:"paragraph",raw:e[0],text:"\n"===e[1].charAt(e[1].length-1)?e[1].slice(0,-1):e[1]}},u.text=function(e){e=this.rules.block.text.exec(e);if(e)return{type:"text",raw:e[0],text:e[0]}},u.escape=function(e){e=this.rules.inline.escape.exec(e);if(e)return{type:"escape",raw:e[0],text:R(e[1])}},u.tag=function(e,u,t){e=this.rules.inline.tag.exec(e);if(e)return!u&&/^<a /i.test(e[0])?u=!0:u&&/^<\/a>/i.test(e[0])&&(u=!1),!t&&/^<(pre|code|kbd|script)(\s|>)/i.test(e[0])?t=!0:t&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0])&&(t=!1),{type:this.options.sanitize?"text":"html",raw:e[0],inLink:u,inRawBlock:t,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):R(e[0]):e[0]}},u.link=function(e){var u=this.rules.inline.link.exec(e);if(u){var t=u[2].trim();if(!this.options.pedantic&&/^</.test(t)){if(!/>$/.test(t))return;e=T(t.slice(0,-1),"\\");if((t.length-e.length)%2==0)return}else{var n=Z(u[2],"()");-1<n&&(i=(0===u[0].indexOf("!")?5:4)+u[1].length+n,u[2]=u[2].substring(0,n),u[0]=u[0].substring(0,i).trim(),u[3]="")}var r,n=u[2],i="";return this.options.pedantic?(r=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n))&&(n=r[1],i=r[3]):i=u[3]?u[3].slice(1,-1):"",n=n.trim(),q(u,{href:(n=/^</.test(n)?this.options.pedantic&&!/>$/.test(t)?n.slice(1):n.slice(1,-1):n)&&n.replace(this.rules.inline._escapes,"$1"),title:i&&i.replace(this.rules.inline._escapes,"$1")},u[0])}},u.reflink=function(e,u){if((t=this.rules.inline.reflink.exec(e))||(t=this.rules.inline.nolink.exec(e))){e=(t[2]||t[1]).replace(/\s+/g," ");if((e=u[e.toLowerCase()])&&e.href)return q(t,e,t[0]);var t=t[0].charAt(0);return{type:"text",raw:t,text:t}}},u.emStrong=function(e,u,t){void 0===t&&(t="");var n=this.rules.inline.emStrong.lDelim.exec(e);if(n&&(!n[3]||!t.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/))){var r=n[1]||n[2]||"";if(!r||r&&(""===t||this.rules.inline.punctuation.exec(t))){var i,s=n[0].length-1,l=s,a=0,D="*"===n[0][0]?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(D.lastIndex=0,u=u.slice(-1*e.length+s);null!=(n=D.exec(u));)if(i=n[1]||n[2]||n[3]||n[4]||n[5]||n[6])if(i=i.length,n[3]||n[4])l+=i;else if(!((n[5]||n[6])&&s%3)||(s+i)%3){if(!(0<(l-=i))){if(l+a-i<=0&&!u.slice(D.lastIndex).match(D)&&(i=Math.min(i,i+l+a)),Math.min(s,i)%2)return{type:"em",raw:e.slice(0,s+n.index+i+1),text:e.slice(1,s+n.index+i)};if(Math.min(s,i)%2==0)return{type:"strong",raw:e.slice(0,s+n.index+i+1),text:e.slice(2,s+n.index+i-1)}}}else a+=i}}},u.codespan=function(e){var u=this.rules.inline.code.exec(e);if(u){var t=u[2].replace(/\n/g," "),n=/[^ ]/.test(t),e=/^ /.test(t)&&/ $/.test(t);return n&&e&&(t=t.substring(1,t.length-1)),t=R(t,!0),{type:"codespan",raw:u[0],text:t}}},u.br=function(e){e=this.rules.inline.br.exec(e);if(e)return{type:"br",raw:e[0]}},u.del=function(e){e=this.rules.inline.del.exec(e);if(e)return{type:"del",raw:e[0],text:e[2]}},u.autolink=function(e,u){e=this.rules.inline.autolink.exec(e);if(e){var t,u="@"===e[2]?"mailto:"+(t=R(this.options.mangle?u(e[1]):e[1])):t=R(e[1]);return{type:"link",raw:e[0],text:t,href:u,tokens:[{type:"text",raw:t,text:t}]}}},u.url=function(e,u){var t,n,r,i;if(t=this.rules.inline.url.exec(e)){if("@"===t[2])r="mailto:"+(n=R(this.options.mangle?u(t[0]):t[0]));else{for(;i=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])[0],i!==t[0];);n=R(t[0]),r="www."===t[1]?"http://"+n:n}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}},u.inlineText=function(e,u,t){e=this.rules.inline.text.exec(e);if(e){t=u?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):R(e[0]):e[0]:R(this.options.smartypants?t(e[0]):e[0]);return{type:"text",raw:e[0],text:t}}},e}(),y=w,_=x,w=v,x={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,nptable:y,table:y,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};x.def=_(x.def).replace("label",x._label).replace("title",x._title).getRegex(),x.bullet=/(?:[*+-]|\d{1,9}[.)])/,x.item=/^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/,x.item=_(x.item,"gm").replace(/bull/g,x.bullet).getRegex(),x.listItemStart=_(/^( *)(bull) */).replace("bull",x.bullet).getRegex(),x.list=_(x.list).replace(/bull/g,x.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+x.def.source+")").getRegex(),x._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",x._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,x.html=_(x.html,"i").replace("comment",x._comment).replace("tag",x._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),x.paragraph=_(x._paragraph).replace("hr",x.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",x._tag).getRegex(),x.blockquote=_(x.blockquote).replace("paragraph",x.paragraph).getRegex(),x.normal=w({},x),x.gfm=w({},x.normal,{nptable:"^ *([^|\\n ].*\\|.*)\\n {0,3}([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",table:"^ *\\|(.+)\\n {0,3}\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}),x.gfm.nptable=_(x.gfm.nptable).replace("hr",x.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",x._tag).getRegex(),x.gfm.table=_(x.gfm.table).replace("hr",x.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",x._tag).getRegex(),x.pedantic=w({},x.normal,{html:_("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",x._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:y,paragraph:_(x.normal._paragraph).replace("hr",x.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",x.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});y={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:y,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/\_\_[^_]*?\*[^_]*?\_\_|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,rDelimUnd:/\*\*[^*]*?\_[^*]*?\*\*|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:y,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/,_punctuation:"!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~"};y.punctuation=_(y.punctuation).replace(/punctuation/g,y._punctuation).getRegex(),y.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g,y.escapedEmSt=/\\\*|\\_/g,y._comment=_(x._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),y.emStrong.lDelim=_(y.emStrong.lDelim).replace(/punct/g,y._punctuation).getRegex(),y.emStrong.rDelimAst=_(y.emStrong.rDelimAst,"g").replace(/punct/g,y._punctuation).getRegex(),y.emStrong.rDelimUnd=_(y.emStrong.rDelimUnd,"g").replace(/punct/g,y._punctuation).getRegex(),y._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,y._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,y._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,y.autolink=_(y.autolink).replace("scheme",y._scheme).replace("email",y._email).getRegex(),y._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,y.tag=_(y.tag).replace("comment",y._comment).replace("attribute",y._attribute).getRegex(),y._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,y._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,y._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,y.link=_(y.link).replace("label",y._label).replace("href",y._href).replace("title",y._title).getRegex(),y.reflink=_(y.reflink).replace("label",y._label).getRegex(),y.reflinkSearch=_(y.reflinkSearch,"g").replace("reflink",y.reflink).replace("nolink",y.nolink).getRegex(),y.normal=w({},y),y.pedantic=w({},y.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:_(/^!?\[(label)\]\((.*?)\)/).replace("label",y._label).getRegex(),reflink:_(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",y._label).getRegex()}),y.gfm=w({},y.normal,{escape:_(y.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/}),y.gfm.url=_(y.gfm.url,"i").replace("email",y.gfm._extended_email).getRegex(),y.breaks=w({},y.gfm,{br:_(y.br).replace("{2,}","*").getRegex(),text:_(y.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});var y={block:x,inline:y},j=u.defaults,U=y.block,P=y.inline,L=$;function M(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function N(e){for(var u,t="",n=e.length,r=0;r<n;r++)u=e.charCodeAt(r),t+="&#"+(u=.5<Math.random()?"x"+u.toString(16):u)+";";return t}var X=function(){function t(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||j,this.options.tokenizer=this.options.tokenizer||new O,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options;e={block:U.normal,inline:P.normal};this.options.pedantic?(e.block=U.pedantic,e.inline=P.pedantic):this.options.gfm&&(e.block=U.gfm,this.options.breaks?e.inline=P.breaks:e.inline=P.gfm),this.tokenizer.rules=e}t.lex=function(e,u){return new t(u).lex(e)},t.lexInline=function(e,u){return new t(u).inlineTokens(e)};var e,u,n=t.prototype;return n.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    "),this.blockTokens(e,this.tokens,!0),this.inline(this.tokens),this.tokens},n.blockTokens=function(e,u,t){var n,r,i,s;for(void 0===u&&(u=[]),void 0===t&&(t=!0),this.options.pedantic&&(e=e.replace(/^ +$/gm,""));e;)if(n=this.tokenizer.space(e))e=e.substring(n.raw.length),n.type&&u.push(n);else if(n=this.tokenizer.code(e))e=e.substring(n.raw.length),(s=u[u.length-1])&&"paragraph"===s.type?(s.raw+="\n"+n.raw,s.text+="\n"+n.text):u.push(n);else if(n=this.tokenizer.fences(e))e=e.substring(n.raw.length),u.push(n);else if(n=this.tokenizer.heading(e))e=e.substring(n.raw.length),u.push(n);else if(n=this.tokenizer.nptable(e))e=e.substring(n.raw.length),u.push(n);else if(n=this.tokenizer.hr(e))e=e.substring(n.raw.length),u.push(n);else if(n=this.tokenizer.blockquote(e))e=e.substring(n.raw.length),n.tokens=this.blockTokens(n.text,[],t),u.push(n);else if(n=this.tokenizer.list(e)){for(e=e.substring(n.raw.length),i=n.items.length,r=0;r<i;r++)n.items[r].tokens=this.blockTokens(n.items[r].text,[],!1);u.push(n)}else if(n=this.tokenizer.html(e))e=e.substring(n.raw.length),u.push(n);else if(t&&(n=this.tokenizer.def(e)))e=e.substring(n.raw.length),this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});else if(n=this.tokenizer.table(e))e=e.substring(n.raw.length),u.push(n);else if(n=this.tokenizer.lheading(e))e=e.substring(n.raw.length),u.push(n);else if(t&&(n=this.tokenizer.paragraph(e)))e=e.substring(n.raw.length),u.push(n);else if(n=this.tokenizer.text(e))e=e.substring(n.raw.length),(s=u[u.length-1])&&"text"===s.type?(s.raw+="\n"+n.raw,s.text+="\n"+n.text):u.push(n);else if(e){var l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}throw new Error(l)}return u},n.inline=function(e){for(var u,t,n,r,i,s=e.length,l=0;l<s;l++)switch((i=e[l]).type){case"paragraph":case"text":case"heading":i.tokens=[],this.inlineTokens(i.text,i.tokens);break;case"table":for(i.tokens={header:[],cells:[]},n=i.header.length,u=0;u<n;u++)i.tokens.header[u]=[],this.inlineTokens(i.header[u],i.tokens.header[u]);for(n=i.cells.length,u=0;u<n;u++)for(r=i.cells[u],i.tokens.cells[u]=[],t=0;t<r.length;t++)i.tokens.cells[u][t]=[],this.inlineTokens(r[t],i.tokens.cells[u][t]);break;case"blockquote":this.inline(i.tokens);break;case"list":for(n=i.items.length,u=0;u<n;u++)this.inline(i.items[u].tokens)}return e},n.inlineTokens=function(e,u,t,n){var r;void 0===u&&(u=[]),void 0===t&&(t=!1),void 0===n&&(n=!1);var i,s,l,a=e;if(this.tokens.links){var D=Object.keys(this.tokens.links);if(0<D.length)for(;null!=(i=this.tokenizer.rules.inline.reflinkSearch.exec(a));)D.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,i.index)+"["+L("a",i[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(i=this.tokenizer.rules.inline.blockSkip.exec(a));)a=a.slice(0,i.index)+"["+L("a",i[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;null!=(i=this.tokenizer.rules.inline.escapedEmSt.exec(a));)a=a.slice(0,i.index)+"++"+a.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);for(;e;)if(s||(l=""),s=!1,r=this.tokenizer.escape(e))e=e.substring(r.raw.length),u.push(r);else if(r=this.tokenizer.tag(e,t,n)){e=e.substring(r.raw.length),t=r.inLink,n=r.inRawBlock;var o=u[u.length-1];o&&"text"===r.type&&"text"===o.type?(o.raw+=r.raw,o.text+=r.text):u.push(r)}else if(r=this.tokenizer.link(e))e=e.substring(r.raw.length),"link"===r.type&&(r.tokens=this.inlineTokens(r.text,[],!0,n)),u.push(r);else if(r=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(r.raw.length);o=u[u.length-1];"link"===r.type?(r.tokens=this.inlineTokens(r.text,[],!0,n),u.push(r)):o&&"text"===r.type&&"text"===o.type?(o.raw+=r.raw,o.text+=r.text):u.push(r)}else if(r=this.tokenizer.emStrong(e,a,l))e=e.substring(r.raw.length),r.tokens=this.inlineTokens(r.text,[],t,n),u.push(r);else if(r=this.tokenizer.codespan(e))e=e.substring(r.raw.length),u.push(r);else if(r=this.tokenizer.br(e))e=e.substring(r.raw.length),u.push(r);else if(r=this.tokenizer.del(e))e=e.substring(r.raw.length),r.tokens=this.inlineTokens(r.text,[],t,n),u.push(r);else if(r=this.tokenizer.autolink(e,N))e=e.substring(r.raw.length),u.push(r);else if(t||!(r=this.tokenizer.url(e,N))){if(r=this.tokenizer.inlineText(e,n,M))e=e.substring(r.raw.length),"_"!==r.raw.slice(-1)&&(l=r.raw.slice(-1)),s=!0,(c=u[u.length-1])&&"text"===c.type?(c.raw+=r.raw,c.text+=r.text):u.push(r);else if(e){var c="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(c);break}throw new Error(c)}}else e=e.substring(r.raw.length),u.push(r);return u},e=t,u=[{key:"rules",get:function(){return{block:U,inline:P}}}],(n=null)&&r(e.prototype,n),u&&r(e,u),t}(),G=u.defaults,V=B,H=m,J=function(){function e(e){this.options=e||G}var u=e.prototype;return u.code=function(e,u,t){var n=(u||"").match(/\S*/)[0];return!this.options.highlight||null!=(u=this.options.highlight(e,n))&&u!==e&&(t=!0,e=u),e=e.replace(/\n$/,"")+"\n",n?'<pre><code class="'+this.options.langPrefix+H(n,!0)+'">'+(t?e:H(e,!0))+"</code></pre>\n":"<pre><code>"+(t?e:H(e,!0))+"</code></pre>\n"},u.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},u.html=function(e){return e},u.heading=function(e,u,t,n){return this.options.headerIds?"<h"+u+' id="'+this.options.headerPrefix+n.slug(t)+'">'+e+"</h"+u+">\n":"<h"+u+">"+e+"</h"+u+">\n"},u.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},u.list=function(e,u,t){var n=u?"ol":"ul";return"<"+n+(u&&1!==t?' start="'+t+'"':"")+">\n"+e+"</"+n+">\n"},u.listitem=function(e){return"<li>"+e+"</li>\n"},u.checkbox=function(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "},u.paragraph=function(e){return"<p>"+e+"</p>\n"},u.table=function(e,u){return"<table>\n<thead>\n"+e+"</thead>\n"+(u=u&&"<tbody>"+u+"</tbody>")+"</table>\n"},u.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},u.tablecell=function(e,u){var t=u.header?"th":"td";return(u.align?"<"+t+' align="'+u.align+'">':"<"+t+">")+e+"</"+t+">\n"},u.strong=function(e){return"<strong>"+e+"</strong>"},u.em=function(e){return"<em>"+e+"</em>"},u.codespan=function(e){return"<code>"+e+"</code>"},u.br=function(){return this.options.xhtml?"<br/>":"<br>"},u.del=function(e){return"<del>"+e+"</del>"},u.link=function(e,u,t){if(null===(e=V(this.options.sanitize,this.options.baseUrl,e)))return t;e='<a href="'+H(e)+'"';return u&&(e+=' title="'+u+'"'),e+=">"+t+"</a>"},u.image=function(e,u,t){if(null===(e=V(this.options.sanitize,this.options.baseUrl,e)))return t;t='<img src="'+e+'" alt="'+t+'"';return u&&(t+=' title="'+u+'"'),t+=this.options.xhtml?"/>":">"},u.text=function(e){return e},e}(),K=function(){function e(){}var u=e.prototype;return u.strong=function(e){return e},u.em=function(e){return e},u.codespan=function(e){return e},u.del=function(e){return e},u.html=function(e){return e},u.text=function(e){return e},u.link=function(e,u,t){return""+t},u.image=function(e,u,t){return""+t},u.br=function(){return""},e}(),Q=function(){function e(){this.seen={}}var u=e.prototype;return u.serialize=function(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")},u.getNextSafeSlug=function(e,u){var t=e,n=0;if(this.seen.hasOwnProperty(t))for(n=this.seen[e];t=e+"-"+ ++n,this.seen.hasOwnProperty(t););return u||(this.seen[e]=n,this.seen[t]=0),t},u.slug=function(e,u){void 0===u&&(u={});var t=this.serialize(e);return this.getNextSafeSlug(t,u.dryrun)},e}(),W=u.defaults,Y=b,ee=function(){function t(e){this.options=e||W,this.options.renderer=this.options.renderer||new J,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new K,this.slugger=new Q}t.parse=function(e,u){return new t(u).parse(e)},t.parseInline=function(e,u){return new t(u).parseInline(e)};var e=t.prototype;return e.parse=function(e,u){void 0===u&&(u=!0);for(var t,n,r,i,s,l,a,D,o,c,h,p,g,f,F,A="",C=e.length,d=0;d<C;d++)switch((D=e[d]).type){case"space":continue;case"hr":A+=this.renderer.hr();continue;case"heading":A+=this.renderer.heading(this.parseInline(D.tokens),D.depth,Y(this.parseInline(D.tokens,this.textRenderer)),this.slugger);continue;case"code":A+=this.renderer.code(D.text,D.lang,D.escaped);continue;case"table":for(l=o="",r=D.header.length,t=0;t<r;t++)l+=this.renderer.tablecell(this.parseInline(D.tokens.header[t]),{header:!0,align:D.align[t]});for(o+=this.renderer.tablerow(l),a="",r=D.cells.length,t=0;t<r;t++){for(l="",i=(s=D.tokens.cells[t]).length,n=0;n<i;n++)l+=this.renderer.tablecell(this.parseInline(s[n]),{header:!1,align:D.align[n]});a+=this.renderer.tablerow(l)}A+=this.renderer.table(o,a);continue;case"blockquote":a=this.parse(D.tokens),A+=this.renderer.blockquote(a);continue;case"list":for(o=D.ordered,E=D.start,c=D.loose,r=D.items.length,a="",t=0;t<r;t++)g=(p=D.items[t]).checked,f=p.task,h="",p.task&&(F=this.renderer.checkbox(g),c?0<p.tokens.length&&"text"===p.tokens[0].type?(p.tokens[0].text=F+" "+p.tokens[0].text,p.tokens[0].tokens&&0<p.tokens[0].tokens.length&&"text"===p.tokens[0].tokens[0].type&&(p.tokens[0].tokens[0].text=F+" "+p.tokens[0].tokens[0].text)):p.tokens.unshift({type:"text",text:F}):h+=F),h+=this.parse(p.tokens,c),a+=this.renderer.listitem(h,f,g);A+=this.renderer.list(a,o,E);continue;case"html":A+=this.renderer.html(D.text);continue;case"paragraph":A+=this.renderer.paragraph(this.parseInline(D.tokens));continue;case"text":for(a=D.tokens?this.parseInline(D.tokens):D.text;d+1<C&&"text"===e[d+1].type;)a+="\n"+((D=e[++d]).tokens?this.parseInline(D.tokens):D.text);A+=u?this.renderer.paragraph(a):a;continue;default:var E='Token with "'+D.type+'" type was not found.';if(this.options.silent)return void console.error(E);throw new Error(E)}return A},e.parseInline=function(e,u){u=u||this.renderer;for(var t,n="",r=e.length,i=0;i<r;i++)switch((t=e[i]).type){case"escape":n+=u.text(t.text);break;case"html":n+=u.html(t.text);break;case"link":n+=u.link(t.href,t.title,this.parseInline(t.tokens,u));break;case"image":n+=u.image(t.href,t.title,t.text);break;case"strong":n+=u.strong(this.parseInline(t.tokens,u));break;case"em":n+=u.em(this.parseInline(t.tokens,u));break;case"codespan":n+=u.codespan(t.text);break;case"br":n+=u.br();break;case"del":n+=u.del(this.parseInline(t.tokens,u));break;case"text":n+=u.text(t.text);break;default:var s='Token with "'+t.type+'" type was not found.';if(this.options.silent)return void console.error(s);throw new Error(s)}return n},t}(),ue=v,te=z,ne=m,m=u.getDefaults,re=u.changeDefaults,u=u.defaults;function ie(e,t,n){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if("function"==typeof t&&(n=t,t=null),t=ue({},ie.defaults,t||{}),te(t),n){var r,i=t.highlight;try{r=X.lex(e,t)}catch(e){return n(e)}var s=function(u){var e;if(!u)try{e=ee.parse(r,t)}catch(e){u=e}return t.highlight=i,u?n(u):n(null,e)};if(!i||i.length<3)return s();if(delete t.highlight,!r.length)return s();var l=0;return ie.walkTokens(r,function(t){"code"===t.type&&(l++,setTimeout(function(){i(t.text,t.lang,function(e,u){return e?s(e):(null!=u&&u!==t.text&&(t.text=u,t.escaped=!0),void(0===--l&&s()))})},0))}),void(0===l&&s())}try{var u=X.lex(e,t);return t.walkTokens&&ie.walkTokens(u,t.walkTokens),ee.parse(u,t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",t.silent)return"<p>An error occurred:</p><pre>"+ne(e.message+"",!0)+"</pre>";throw e}}return ie.options=ie.setOptions=function(e){return ue(ie.defaults,e),re(ie.defaults),ie},ie.getDefaults=m,ie.defaults=u,ie.use=function(l){var u,t=ue({},l);l.renderer&&function(){var e,s=ie.defaults.renderer||new J;for(e in l.renderer)!function(r){var i=s[r];s[r]=function(){for(var e=arguments.length,u=new Array(e),t=0;t<e;t++)u[t]=arguments[t];var n=l.renderer[r].apply(s,u);return n=!1===n?i.apply(s,u):n}}(e);t.renderer=s}(),l.tokenizer&&function(){var e,s=ie.defaults.tokenizer||new O;for(e in l.tokenizer)!function(r){var i=s[r];s[r]=function(){for(var e=arguments.length,u=new Array(e),t=0;t<e;t++)u[t]=arguments[t];var n=l.tokenizer[r].apply(s,u);return n=!1===n?i.apply(s,u):n}}(e);t.tokenizer=s}(),l.walkTokens&&(u=ie.defaults.walkTokens,t.walkTokens=function(e){l.walkTokens(e),u&&u(e)}),ie.setOptions(t)},ie.walkTokens=function(e,u){for(var t,n=c(e);!(t=n()).done;){var r=t.value;switch(u(r),r.type){case"table":for(var i=c(r.tokens.header);!(s=i()).done;){var s=s.value;ie.walkTokens(s,u)}for(var l,a=c(r.tokens.cells);!(l=a()).done;)for(var D=c(l.value);!(o=D()).done;){var o=o.value;ie.walkTokens(o,u)}break;case"list":ie.walkTokens(r.items,u);break;default:r.tokens&&ie.walkTokens(r.tokens,u)}}},ie.parseInline=function(e,u){if(null==e)throw new Error("marked.parseInline(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");u=ue({},ie.defaults,u||{}),te(u);try{var t=X.lexInline(e,u);return u.walkTokens&&ie.walkTokens(t,u.walkTokens),ee.parseInline(t,u)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",u.silent)return"<p>An error occurred:</p><pre>"+ne(e.message+"",!0)+"</pre>";throw e}},ie.Parser=ee,ie.parser=ee.parse,ie.Renderer=J,ie.TextRenderer=K,ie.Lexer=X,ie.lexer=X.lex,ie.Tokenizer=O,ie.Slugger=Q,ie.parse=ie});

const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

const DEFAULT_MIME_TEXT = 'text/raw; charset=UTF-8'
const DEFAULT_MIME_HTML = 'text/html; charset=UTF-8'
const favicon_gzip = 'H4sIAO9PM2AAA+2UMQrCQBBF36wbNZUBiUKa2MXOI9il9Rh6DMHKyjOls/UKVpYqFimEOBpE4yYXkLzls7Pzh+FXC6InCHix8mCk91T1bE1UQr80hQ9fdZIk+L6PMQZrLWmaIiJEUUQYhrS0tPwx3crLOIXj9vCaJ5o3//Y6VUNwqVvg5nl/cA2JbZ1bbs7ncFrCfgNbDbArVGdY5DBTxTfVFQYXKFTrA2RDOI7hHsMDH7d8sX4FAAA='

// This is non-standard, but very convenient and relatively simple:
// specific interpolated strings - those wrapped in single-backticks (`) - and prefaced by AUTOINSERT_
// are found by a regular-expression search autoinsert.py and converted into corresponding filenames
//
// For example, AUTOINSERT_NOTPACMAN__SVG is replaced with the contents of notpacman.svg, in the deps directory
//
// This keeps the worker.js script simple, without requiring much build tooling!

const notpacman_svg = `<svg version="1.0" viewBox="0 0 42.28 42.28" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://web.resource.org/cc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
<radialGradient id="a" cx="8.1144" cy="-3.2957" r="11.096" gradientTransform="matrix(1.1664 -.0051021 .0057143 1.3063 -1.5277 .68564)" gradientUnits="userSpaceOnUse">
<stop stop-color="#fff" offset="0"/>
<stop stop-color="#ff0" offset="1"/>
</radialGradient>
</defs>
<g transform="translate(.645 15.11)" stroke="#000">
<path transform="matrix(1.5736 0 0 1.4684 -1.1223 2.5823)" d="m24.473 7.9a11.4 11.4 0 1 1 -1e-6 -11.4l-9.8727 5.7z" fill="url(#a)" stroke-width="1.0004"/>
<path transform="matrix(1.5748 0 0 1.4684 -8.0682 4.3444)" d="m20-6a1 1 0 1 1 -2 0 1 1 0 1 1 2 0z" stroke-width="1.5"/>
</g>
</svg>
` // eslint-disable-line
const getpost_css = `@font-face {
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 400;
    src: url(ubuntu-4iCs6KVjbNBYlgoKcg72j00.woff2) format('woff2');
}

* {
    font-family: Ubuntu;
}


body {
    margin: 0 auto;
    color: #444444;
    line-height: 1;
    max-width: 960px;
    padding: 12px;
}
h1,
h2,
h3,
h4 {
    color: #111111;
    font-weight: 400;
}
h1,
h2,
h3,
h4,
h5,
p {
    padding: 0;
}
h1 {
    font-size: 48px;
}
h2 {
    margin-top: 36px;
    font-size: 36px;
    margin-bottom: 8px;
}
h3 {
    font-size: 24px;
}
h4 {
    line-height: 23px;
    font-size: 21px;
}
h4 time {
    font-size: 18px;
    margin-left: 100px;
    float: right;
}
h5 {
    font-size: 18px;
}
a:link {
    color: #000000;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
}
a:visited {
    color: #000000;
}
a:hover {
    text-decoration: none;
    color: #ff6600;
}
ul,
ol {
    padding: 0;
    margin: 0;
}
li {
    line-height: 24px;
}
li ul,
li ul {
    margin-left: 24px;
}
p,
ul,
ol {
    font-size: 16px;
    line-height: 24px;
    max-width: 540px;
}
pre {
    padding: 0px 24px;
    max-width: 800px;
    white-space: pre-wrap;
}
code {
    font-family: Consolas, Monaco, Andale Mono, monospace;
    line-height: 1.5;
    font-size: 13px;
}
aside {
    display: block;
    float: right;
    width: 390px;
}
blockquote {
    border-left: .5em solid #eee;
    padding: 0 2em;
    margin-left: 0;
    max-width: 476px;
}
blockquote cite {
    font-size: 14px;
    line-height: 20px;
    color: #bfbfbf;
}
blockquote cite:before {
    content: '&mdash;'
}

blockquote p {
    color: #666;
    max-width: 460px;
}
hr {
    width: 840px;
    margin: 0 auto 0 auto;
    color: #999;

}

h1 {
    font-family: Ubuntu;
    font-size: 32px;
    font-style: normal;
    font-variant: normal;
    font-weight: 700;
    line-height: 32px;
}
h2 {
    font-family: Ubuntu;
    font-size: 28px;
    font-style: normal;
    font-variant: normal;
    font-weight: 700;
    line-height: 32px;
}
h3 {
    font-family: Ubuntu;
    font-size: 25px;
    font-style: normal;
    font-variant: normal;
    font-weight: 700;
    line-height: 32px;
}
p {
    font-family: Ubuntu;
    font-size: 20px;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 32px;
}
blockquote {
    font-family: Ubuntu;
    font-size: 25px;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 32px;
}
pre {
    font-family: Ubuntu;
    font-size: 16px;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 32px;
}

` // eslint-disable-line
const ubuntu_woff_base64 = `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` // eslint-disable-line
const upload = `<html><head>
<link rel="stylesheet" href="/getpost.css">
<title>GetPost: Upload</title>
<meta name="title" content="GetPost: File Upload">
<meta name="description" content="Share the love!">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://getpost.bitsandpieces.io/"">
<meta property="twitter:title" content="GetPost: Upload">
<meta property="twitter:description" content="Libre linking for poems and memes. Share the love!">
<meta property="twitter:image" content="https://getpost.bitsandpieces.io/post?key=01EYWFTY440WJFRAC6MX8VZ5YK&raw">
</head>
<body>
<div id="wrap">
    <div id="form">
      <form method="post" enctype="multipart/form-data" action="/post" method="post" >
        <input id="upfile" name="upfile" type="file">
        <input value="Post" onclick="upload_file_directly()" type="button">
      </form>
    </div>
  </div>
  <table id="userinfo"><tr>
<tr id="upfilename"></tr>
<tr id="upfilesize"></tr>
<tr id="upfiletype"></tr>
<tr>
<div id="notpacman" style="width: 30%; height: auto" >
    ${notpacman_svg}
</div>
</tr>
<tr><td id="message">omnomnom files.<br/></td></tr>
</table>
</div>
<script>
var file;
var file_buffer;
const dropArea = document.getElementById('notpacman');

dropArea.addEventListener('dragover', (event) => {
  event.stopPropagation();
  event.preventDefault();
  // Style the drag-and-drop as a "copy file" operation.
  event.dataTransfer.dropEffect = 'copy';
});

dropArea.addEventListener('drop', (event) => {
  event.stopPropagation();
  event.preventDefault();
  file = event.dataTransfer.files[0];
    file.arrayBuffer().then((l,r)=>{file_buffer=l})
    document.getElementById("upfilesize").innerHTML = "Size: " + file.size + " bytes";
    document.getElementById("upfiletype").innerHTML = "Type: " + file.type;
    document.getElementById("upfilename").innerHTML = "Filename: " + file.name;
});

function upload_file_directly() {
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "/post", true);
    oReq.onload = function (oEvent) {
        console.log(oReq.response);
        document.body.innerHTML = oReq.response
    };
    oReq.overrideMimeType(document.getElementById("upfiletype").innerHTML);
    var blob = new Blob([file_buffer], {type: 'application/x-www-form-urlencoded'});
    oReq.send(blob);
};

document.getElementById("upfile").addEventListener("change", function(event) {
    file = event.target.files[0];
    file.arrayBuffer().then((l,r)=>{file_buffer=l})
    document.getElementById("upfilesize").innerHTML = "Size: " + file.size + " bytes";
    document.getElementById("upfiletype").innerHTML = "Type: " + file.type;
    document.getElementById("upfilename").innerHTML = "Filename: " + file.name;
}, false);
</script>
</body>
</html>
` // eslint-disable-line

const ENCODING_LEN = ENCODING.length
const TIME_LEN = 10
const RANDOM_LEN = 16

addEventListener('fetch', fetch_event => {
  // configure primary entrypoint
  fetch_event.respondWith(HANDLER(fetch_event))
})

// main entrypoint for all requests
async function HANDLER (fetch_event) {
  const now = Date.now()
  request = fetch_event.request
  let headers = [...request.headers]
  for (const key in request.cf) {
    headers = headers.concat([
      ['cf-' + key, request.cf[key]]
    ])
  }
  // massage headers and cloudflare metadata into "requestHeadersAndFriends" - an object containing helpful metadata for a given request
  const requestHeadersAndFriends = {}
  for (const header_index in headers) {
    requestHeadersAndFriends[headers[header_index][0].toLowerCase()] = headers[header_index][1]
  }
  const url = new URL(request.url)
  // wrap main handler in a try/catch exception logging & reporting block, for easy debug
  try {
    url.protocol = 'https:'
    // if upload is directed at /post or root (new)
    if ((url.pathname === '/post') || (url.pathname === '/')) {
      if (request.method === 'POST') {
        // generate store, edit, and delete keys - for future reference
        const storeKey = ulid(now)
        const editKey = ulid(now)
        const deleteKey = ulid(now)
        let blob = await request.arrayBuffer()
        blob = await (new Blob([blob])).arrayBuffer()
        // use specified ttl if x-ttl header present, else use 1 year
        let xTtlSeconds = requestHeadersAndFriends['x-ttl']
        if (xTtlSeconds === undefined) {
          // 1 year: 24 hours/day, 60*60 seconds/hour, 30 days/month, 12months/year
          xTtlSeconds = 24 * 60 * 60 * 30 * 12
        } else {
          // parse base-10 number from header string
          xTtlSeconds = parseInt(xTtlSeconds, 10)
        }
        await NAMESPACE.put(storeKey, blob, { expirationTtl: xTtlSeconds, metadata: { edit: editKey, del: deleteKey } })
        // date string for expiry in IS08601; have to multiply TTL (in seconds) by 1000 for JS-friendly time
        const expiryTime = new Date(xTtlSeconds * 1000 + now).toISOString()
        const resp = `## GetPost stored ${blob.byteLength} bytes!

## share link: ${url.href}?key=${storeKey}&raw

## save link to delete: ${url.href}?key=${storeKey}&del=${deleteKey}

## expires at: ${expiryTime}`
        // file body is just bytes from the file, type and name are optionally passed as parameters
        if (requestHeadersAndFriends['content-type'] === 'application/x-www-form-urlencoded') {
          if (requestHeadersAndFriends['user-agent'].startsWith('curl/')) {
            return buildResponse(resp, DEFAULT_MIME_TEXT)
          } else {
            return buildResponse(marked(resp), DEFAULT_MIME_TEXT)
          }
        }
        // normal multipart form uploads are actually surprisingly messy to parse, with their own syntax and semantics
        // instead of using normal form submit (multipart) - upload.html actually intercepts the buttonpush and calls a special handler to upload
        // NB: should never get here
        return buildResponse('Sorry, MultiPart uploads are not supported.', DEFAULT_MIME_HTML, {}, 503)
      } else if (request.method === 'GET') {
        const del = url.searchParams.get('del')
        const key = url.searchParams.get('key')
        const raw = url.searchParams.has('raw')
        // if no key parameter provided, return the upload prompt so user can upload
        if (!url.searchParams.has('key')) {
          return buildResponse(upload)
        }
        // ULID is len26
        if (key.length === 26 || key.length === 91) {
          let { contentFromKeyAsArrayBuffer, metadata } = await NAMESPACE.getWithMetadata(key, 'arrayBuffer')
          // if either key dne, or old format
          if (metadata === null) {
            // check to see if old (pre-metadata)
            contentFromKeyAsArrayBuffer = await NAMESPACE.get(key, 'arrayBuffer')
            if (contentFromKeyAsArrayBuffer !== null) {
              contentFromKeyAsArrayBuffer = contentFromKeyAsArrayBuffer.slice(0, -26)
            } else {
              return buildResponse('Sorry, invalid key!', DEFAULT_MIME_TEXT, {}, 404)
            }
          } else {
            // this second get should not be required... it appears getWithMetadata doesn't support returning arrayBuffers!?
            contentFromKeyAsArrayBuffer = await NAMESPACE.get(key, 'arrayBuffer')
          }
          // if both key and delete key...
          if (url.searchParams.has('del') && (del.length == 26)) {
            if (del === metadata.del) {
              const deleted_target_key = await NAMESPACE.delete(key)
              return buildResponse(`OK, sent command to delete ${key} using ${del} - please wait 3min for full delete.`)
            } else {
              return buildResponse('Sorry, invalid del key!', DEFAULT_MIME_TEXT, {}, 404)
            }
          }
          const [generatedBodyHtml, type] = generateHtmlBasedOnType(contentFromKeyAsArrayBuffer, url)
          if (raw) {
            // if requested as raw, return the original resp object wtih detected MIME type
            return buildResponse(contentFromKeyAsArrayBuffer, type)
          }
          // otherwise, return the wrapped body with the text/html mimetype
          else {
            return buildResponse(generatedBodyHtml, DEFAULT_MIME_HTML)
          }
        } else {
          return buildResponse('Sorry, invalid key!', DEFAULT_MIME_TEXT, {}, 404)
        }
      }
    } else if (url.pathname === '/headers') {
      // helpful debug endpoint - return the headersAndFriends object, as a nicely formatted string
      requestHeadersAndFriends.url = url.toString()
      requestHeadersAndFriends.method = request.method
      // first 20 bytes (hex-encoded) of the request
      requestHeadersAndFriends.startBodyHex = hex((await request.arrayBuffer()).slice(-1, 20))
      return new Response(JSON.stringify(requestHeadersAndFriends, null, 2) + '\n')
    } else if (url.pathname === '/echo') {
      // helpful debug endpoint - return the request body
      return new buildResponse(await request.arrayBuffer())
    } else if (url.pathname === '/raise_exception') {
      // trigger an exception
      this_method_does_not_exist()
    } else if (url.pathname === '/getpost.css') {
      // return static css content
      return buildResponse(getpost_css, 'text/css')
    } else if (url.pathname === '/favicon.ico') {
      // returning binary requires UTF-16 JS strings to be converted to ie) UTF-8 bytes
      return buildResponse(str2ab(atob(favicon_gzip)), 'image/x-icon', { 'Content-Encoding': 'gzip' })
    } else if (url.pathname === '/ubuntu-4iCs6KVjbNBYlgoKcg72j00.woff2') {
      return buildResponse(str2ab(atob(ubuntu_woff_base64)), 'application/font-woff')
    } else {
      return buildResponse(`You probably want ${url.host}/post, not ${url.pathname}!`, DEFAULT_MIME_HTML, {}, 404)
    }
  } catch (err) {
    // very helpful traceback functionality, such that users can report errors
    requestHeadersAndFriends.url = url.toString()
    requestHeadersAndFriends.method = request.method
    requestHeadersAndFriends.traceback = err.stack.split('\n')
    // include the first 20 bytes, as 40 hex characters
    requestHeadersAndFriends.startBodyHex = hex((await request.arrayBuffer()).slice(0, 20))
    return new Response(JSON.stringify(requestHeadersAndFriends, null, 2), {
      status: 500,
      statusText: 'caught exception in worker'
    })
  }
}
// returns a single byte from the Cloudflare worker's (cryptographically secure) RNG
function prng () {
  const buffer = new Uint8Array(8)
  crypto.getRandomValues(buffer)
  return buffer[0] / 0xff
};

// get a random character from the set of encodings
function randomChar () {
  let rand = Math.floor(prng() * ENCODING_LEN)
  if (rand === ENCODING_LEN) {
    rand = ENCODING_LEN - 1
  }
  return ENCODING.charAt(rand)
}

// shove time (or any integer) into "len" base32 characters
function encodeTime (now, len) {
  let mod
  let str = ''
  for (; len > 0; len--) {
    mod = now % ENCODING_LEN
    str = ENCODING.charAt(mod) + str
    now = (now - mod) / ENCODING_LEN
  }
  return str
}

// get "len" random base32 characters
function encodeRandom (len) {
  let str = ''
  for (; len > 0; len--) {
    str = randomChar() + str
  }
  return str
}

// return a ULID from an optional time, comprised of TIME_LEN characters of timestamp and RANDOM_LEN characters of entropy
function ulid (seedTime) {
  // if no seedTime is provided, use the current time
  if (isNaN(seedTime)) {
    seedTime = Date.now()
  }
  return encodeTime(seedTime, TIME_LEN) + encodeRandom(RANDOM_LEN)
};

// helper to turn a string into an array buffer
function str2ab (str) {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i) & 0xFF
  }
  return buf
}

// Uint8Array -> hex string
function hex (uint8arr_or_arraybuffer) {
  const uint8arr = new Uint8Array(uint8arr_or_arraybuffer)
  if (!uint8arr) {
    return ''
  }
  let hexStr = ''
  for (let i = 0; i < uint8arr.length; i++) {
    let hex = (uint8arr[i] & 0xff).toString(16)
    hex = (hex.length === 1) ? '0' + hex : hex
    hexStr += hex
  }
  return hexStr
}

// content (and optional url) to wrapper html and detected type
function generateHtmlBasedOnType (content, url = '') {
  if ((content === null) || (content === undefined)) {
    return ['CONTENT NOT FOUND', DEFAULT_MIME_TEXT]
  }
  const contentAsUint8Array = new Uint8Array(content)
  const contentAsString = new TextDecoder('utf-8').decode(contentAsUint8Array)
  // checks to see if characters are all plausibly utf-8 / printable
  const contentIsPrintable = /^[\x00-\x7F]*$/m.test(contentAsString)
  const header = hex(contentAsUint8Array.slice(0, 4))
  let injectorScript, type
  // matches the first four bytes of the uploaded file
  switch (header) {
    case '25504446':
      type = 'application/pdf'
      break
    case '89504e47':
      type = 'image/png'
      break
    case '47494638':
      type = 'image/gif'
      break
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      type = 'image/jpeg'
      break
    default:
      if (contentIsPrintable === true) {
        type = DEFAULT_MIME_TEXT
      } else {
        type = 'application/octet-stream'
      }
      break
  }
  switch (type) {
    case 'image/png':
    case 'image/gif':
    case 'image/jpeg':
      break
    case 'application/pdf':
    case 'application/octet-stream':
      injectorScript = 'window.location.assign(window.location.href+\'&raw\')'
      break
    case DEFAULT_MIME_TEXT:
    default:
      injectorScript = ''
      break
  }
  const TITLE = `GetPost: ${type}`
  let contentAsHtmlFromMarked = ''
  let imageUrl = ''
  let description = ''
  // future use
  const encodedPayload = ''
  // strip non-url characters from description
  if (type === DEFAULT_MIME_TEXT) {
    contentAsHtmlFromMarked = marked((new TextDecoder('utf-8')).decode(content))
    // use the first 140 characters that aren't special, as the description!
    description = (new TextDecoder('utf-8')).decode(new Uint8Array(content.slice(0, 140))).replace(/[^0-9a-z\\\ \.\:\?]/gi, '')
  } else {
    description = 'GetPost: ' + type
  }
  if (type.startsWith('image/')) {
    imageUrl = url.toString() + '&raw'
    injectorScript = ''
  };
  const contentAsWrappedHtml = `<html>
<head>
<!-- Primary Meta Tags -->
<title>GetPost: Content</title>
<meta name="title" content="${TITLE}">
<meta name="description" content="${description}">

<!-- Open Graph / Facebook -->
<meta property="og:url" content="${url.toString()}">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url.toString()}">
<meta property="twitter:title" content="${TITLE}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${imageUrl}">

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui">
</head>

<body>
<link rel="stylesheet" href="getpost.css">
  <div id="content">
      <img id="imgContent" src="${imageUrl}"></img>
  </div>
  <div id="markdownContent">${contentAsHtmlFromMarked}</div>
  <script>
      var payloadType = "${type}";
      </script>
  <script>
      var encodedPayload = "${encodedPayload}";
      </script>
  <script>
  const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
  ${injectorScript};
  </script>
</body>
</html>
` // eslint-disable-line
  return [contentAsWrappedHtml, type]
}

function buildResponse (blob, type = DEFAULT_MIME_HTML, headers = {}, statuscode = 200) {
  const headersObj = Object.assign(headers, { 'content-type': type })
  if (statuscode !== 200) {
    return new Response(blob, { status: statuscode, statusText: blob })
  }
  return new Response(blob, { status: statuscode, headers: headersObj })
}

