/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(m){var n=/\+/g;function x(e){return e}function l(e){return decodeURIComponent(e.replace(n," "))}function v(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return g.json?JSON.parse(e):e}catch(e){}}var g=m.cookie=function(e,n,o){if(void 0!==n){if("number"==typeof(o=m.extend({},g.defaults,o)).expires){var i=o.expires,r=o.expires=new Date;r.setDate(r.getDate()+i)}return n=g.json?JSON.stringify(n):String(n),document.cookie=[g.raw?e:encodeURIComponent(e),"=",g.raw?n:encodeURIComponent(n),o.expires?"; expires="+o.expires.toUTCString():"",o.path?"; path="+o.path:"",o.domain?"; domain="+o.domain:"",o.secure?"; secure":""].join("")}for(var t=g.raw?x:l,a=document.cookie.split("; "),c=e?void 0:{},u=0,f=a.length;u<f;u++){var d=a[u].split("="),p=t(d.shift()),s=t(d.join("="));if(e&&e===p){c=v(s);break}e||(c[p]=v(s))}return c};g.defaults={},m.removeCookie=function(e,n){return void 0!==m.cookie(e)&&(m.cookie(e,"",m.extend({},n,{expires:-1})),!0)}});