if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const c=s=>l(s,n),o={module:{uri:n},exports:u,require:c};e[n]=Promise.all(i.map((s=>o[s]||c(s)))).then((s=>(r(...s),u)))}}define(["./workbox-d1edc562"],(function(s){"use strict";s.setCacheNameDetails({prefix:"frontend"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/29.db90bb38.css",revision:null},{url:"/css/340.da339ff9.css",revision:null},{url:"/css/377.db90bb38.css",revision:null},{url:"/css/451.db90bb38.css",revision:null},{url:"/css/488.db90bb38.css",revision:null},{url:"/css/546.91cd286f.css",revision:null},{url:"/css/6.ea954d89.css",revision:null},{url:"/css/app.bc05a740.css",revision:null},{url:"/css/chunk-vendors.b77da5ae.css",revision:null},{url:"/img/bryan.jpeg",revision:"a77f704eafb6ebc390e2f2e3a90d8767"},{url:"/img/chris.jpeg",revision:"f10854f1a57f48dc3339c0a85b582f1b"},{url:"/img/higor.jpeg",revision:"f80c24209b64a22fc8d07ba02d0e6bd2"},{url:"/img/logo.png",revision:"5703d7ab0f932f84eb010578025798aa"},{url:"/index.html",revision:"4388f430b57daaea0a545f8db528c7ef"},{url:"/js/106.6115c538.js",revision:null},{url:"/js/16.0b9be20c.js",revision:null},{url:"/js/181.42f71dbe.js",revision:null},{url:"/js/29.0069d79e.js",revision:null},{url:"/js/340.a90079f1.js",revision:null},{url:"/js/377.f616d57e.js",revision:null},{url:"/js/451.5a2b3683.js",revision:null},{url:"/js/488.c2ef57ce.js",revision:null},{url:"/js/492.c6416ca3.js",revision:null},{url:"/js/546.ce9955e9.js",revision:null},{url:"/js/6.ccadc50c.js",revision:null},{url:"/js/823.20532b57.js",revision:null},{url:"/js/app.21622cfc.js",revision:null},{url:"/js/chunk-vendors.714ef9e1.js",revision:null},{url:"/manifest.json",revision:"4b14c64efaf846819b9a229b4193c8b7"}],{})}));
//# sourceMappingURL=service-worker.js.map
