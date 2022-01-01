(function(){function getApiById(format,layer){var currentScript=document.currentScript,apiId=currentScript&&currentScript.parentNode&&currentScript.parentNode.getAttribute('jpx-api-id'),api;if(apiId){api=window.top[apiId]}else{var selector;if('left'===layer){selector='jpx-wp-layer-left'}else if('right'===layer){selector='jpx-wp-layer-right'}else if('center'===layer){selector='jpx-wp-layer-center'}else if('top'===layer){selector='jpx-wp-layer-top'}else if('bg'===layer){selector='jpx-wp-layer-bg'}
var el=window.top.document.getElementById(selector);if(el){apiId=el.getAttribute('jpx-api-id');api=window.top[apiId]}}
return api}
var obj={};function getApiFromScope(e){obj._window=e||window;var t=obj._window.frameElement&&obj._window.frameElement.parentNode&&obj._window.frameElement.parentNode.getAttribute("jpx-api-id");if(obj._window.frameElement.getAttribute("jpx-api-id")){return window.top[obj._window.frameElement.getAttribute("jpx-api-id")]}else if(obj._window.jpxApi||t&&obj._window[t]){return obj._window.jpxApi||obj._window[t]}else if(obj._window.parent&&obj._window.parent!==obj._window.top){return getApiFromScope(obj._window.parent)}}
var scope=window;try{window.top.document?scope=window.top:void(0)}catch(e){}
var width="1000";var height="250";var format;try{format=window.top[window.top.jpx_template_id].format}catch(a){format=void 0}
var layerName=format==='wp'?"top":"global";var baseUrl="https://cdn.justpremium.com/api-builder-prod/custom_builder/56882eed-36c6-43af-b34a-97eaa65b6335/1640017238/";try{var loc=window.top.document.location.href;if((loc.indexOf('justpremium.com')>-1||loc.indexOf('stage.int')>-1)&&(loc.indexOf('preview')>-1))baseUrl="https://jp-api-prod.s3-eu-west-1.amazonaws.com/api-builder-prod/custom_builder/56882eed-36c6-43af-b34a-97eaa65b6335/1640017238/"}catch(e){}
var headTemplate="<!-- justpremium_format_template v1.2.7 2021-10-27 -->\n\n<!DOCTYPE html>\n<html>\n\n<head><base href=\""+baseUrl+"\"><script>var layer = 'top';var cw;try {    var loc = window.top.location.href;    cw = window.top;} catch (e) {    cw = window.parent;}var vars = cw.jp_creative_vars || {};function writeScript(src) {    var script = window.document.createElement('script');    script.src = src;    window.document.head.appendChild(script);    console.log('Vendor script has been added successfully', src);}switch (layer) {    case 'top':        try {            var format = cw[window.top.jpx_template_id].format;            if (format === 'ca' || format === 'pd') {                if (vars.vendor) {                    writeScript(vars.vendor)                }                if (vars.vendors && typeof vars.vendors === 'object') {                    vars.vendors.forEach(function (vendorObj, key) {                        if (vendorObj && '' !== vendorObj.script) {                            writeScript(vendorObj.script);                        }                    })                }            }        } catch (e) {            console.warn('Can not add vendor script!');        }        break;    case 'left':    case 'global':    case 'main':        if (vars.vendor) {            writeScript(vars.vendor)        }        if (vars.vendors && typeof vars.vendors === 'object') {            vars.vendors.forEach(function (vendorObj, key) {                if (vendorObj && '' !== vendorObj.script) {                    writeScript(vendorObj.script);                }            })        }}</script>\n    <meta charset=\"utf-8\">\n    <link rel=\"stylesheet\" href=\"\/\/cdn.justpremium.com\/Justpremium\/boilerplate\/css\/premium_2.0.css\">\n    <link rel=\"stylesheet\" href=\"css\/style.css?v=t\">\n<\/head>\n\n";var bodyTemplate="<body id=\"body_top\">\n    <!-- START OF CUSTOM HTML -->\n\n    <div class=\"jpt-wrapper\">\n\n        <!-- <div class=\"jpt-section jpt-section-copy\"> -->\n\n            <!-- Real text -->\n            <!-- <h1 class=\"jpt-h1 jpt-entrance-animation\">The Macallan Fine & Rare <br> Collection<\/h1>\n            <p class=\"jpt-p jpt-entrance-animation\">The Spirit of the 20th Century<span class=\"jpt-nowrap\"><\/span><\/p> -->\n\n            <!-- Image text -->\n            <!-- <h1 class=\"jpt-h1 jpt-entrance-animation\">\n                <img srcset=\"assets-template\/text-mainheading@2x.png 2x, assets-template\/text-mainheading.png 1x\" src=\"assets-template\/text-mainheading.png\">\n            <\/h1>\n            <p class=\"jpt-p jpt-entrance-animation\" data-jp-template='{\"x\":0, \"y\":0}'>\n                <img srcset=\"assets-template\/text-copy@2x.png 2x, assets-template\/text-copy.png 1x\" src=\"assets-template\/text-copy.png\">\n            <\/p> -->\n\n        <!-- <\/div> -->\n\n        <!-- Video -->\n        <div class=\"jpt-section jpt-section-video \">\n            <!-- <div jp-controls=\"videoratio:1.778 nopixelcentring showfullscreen\" class=\"jpt-video-container\">\n                <video src=\"assets-template\/video.mp4\" muted poster=\"assets-template\/poster.jpg\"><\/video>\n            <\/div> -->\n            <div class=\"jpt-video-container\" jp-createvideo-src=\"assets\/video.mp4\" jp-createvideo-controls=\"videoratio:1.778 nopixelcentring showfullscreen\" jp-createvideo-poster=\"assets\/poster.jpg\"><\/div>\n        <\/div>\n\n        <!-- Product image section -->\n        <!-- <div class=\"jpt-section jpt-section-image\">\n            <div class=\"jpt-image jpt-background-image jpt-kv-image jpt-entrance-animation\" style=\"background-image:url(assets-template\/product.png)\"><\/div>\n            <div class=\"jpt-spacer\"><\/div>\n        <\/div> -->\n\n    <\/div>\n\n    <!-- END OF CUSTOM HTML -->\n    <script src=\"js\/main.js\"><\/script>\n    <script src=\"\/\/cdn.justpremium.com\/Justpremium\/boilerplate\/js\/jp-controls_0.6.0.js\"><\/script>\n\n    <script src=\"\/\/cdn.justpremium.com\/Justpremium\/boilerplate\/lib\/gsap_3.6.0.js\"><\/script>\n    <!-- <script src=\"\/\/cdn.justpremium.com\/Justpremium\/boilerplate\/js\/jp-carousel_0.1.7.js\"><\/script> -->\n    <script src=\"js\/template.js\"><\/script>\n    <script src=\"\/\/cdn.justpremium.com\/Justpremium\/boilerplate\/js\/premium_2.4.3.js\"><\/script>\n<\/body>\n\n";var footerTemplate="<\/html>";var out={window:window,format:format,layer:layerName,height:height,width:width,responsive:window.jpx_responsive,h:headTemplate,b:bodyTemplate,f:footerTemplate};try{var jpxApi=window.jpxApi||getApiById(format,layerName)||getApiFromScope();jpxApi.loadJcl(out,window)}catch(e){if("undefined"!=typeof format&&(format==='ci'||format==='fi'||format==='hi'||format==='mt'||format==='ca'))window.jpx_responsive=!0;if(window.jpx_responsive&&"undefined"!=typeof format){var format=window.top[window.top.jpx_template_id].format;switch(format){case "mt":case "cf":case "fi":case "hi":case "is":case "ci":case "ca":width="100%",height="100%"}}else if("undefined"!=typeof format){if(format==="wp"&&layerName=='top'){width="100%",height="100%"}}
var script=document.createElement("script");script.type="text/javascript";script.src="https://cdn.justpremium.com/api/jcl.v2.min.js?v=1";document.head.appendChild(script);script.onload=function(){var jcl=new scope.Jcl(layerName,width,height,window);jcl.template(headTemplate,bodyTemplate,footerTemplate);jcl.load();try{if(!("undefined"!=typeof format)){var format=window.jpx_ad_config.format}
if(format==="mt"||format==="is"){var arrAdPreviews=["test.adform.com","ox-ui.justpremium.com","google.com","https://www.google.com","doc-0c-8s-adspreview.googleusercontent.com","creative-preview.mathads.com","creative-preview-an.com","xbid-prod.googleusercontent.com","preview-desk.thetradedesk.com"];if(arrAdPreviews.indexOf(window.location.hostname)>-1||(window.location.ancestorOrigins.length>0&&arrAdPreviews.indexOf(window.location.ancestorOrigins[1])>-1)){var jclElm=window.document.querySelector(".jcl-wrapper");if(jclElm){jclElm.style.width="300px";jclElm.style.height="600px"}}}}catch(e){}}}})()