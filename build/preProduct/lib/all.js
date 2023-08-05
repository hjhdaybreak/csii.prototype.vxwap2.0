/*! vx-ui - v2.4.7 - 2023-07-14
* http://www.csii.com.cn/hercules/v
* Copyright (c) 2023 CSII;
* Licensed : BSD 
*/
/*! http://www.csii.com.cn/hercules/vx
* Copyright (c) 2012-2017 CSII
* @license vx - v2.0 
*/
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(a,b,c){"use strict";function d(a,b){return M(new(M(function(){},{prototype:a})),b)}function e(a){return L(arguments,function(b){b!==a&&L(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)})}),a}function f(a,b){var c=[];for(var d in a.path){if(a.path[d]!==b.path[d])break;c.push(a.path[d])}return c}function g(a){if(Object.keys)return Object.keys(a);var c=[];return b.forEach(a,function(a,b){c.push(b)}),c}function h(a,b){if(Array.prototype.indexOf)return a.indexOf(b,Number(arguments[2])||0);var c=a.length>>>0,d=Number(arguments[2])||0;for(d=0>d?Math.ceil(d):Math.floor(d),0>d&&(d+=c);c>d;d++)if(d in a&&a[d]===b)return d;return-1}function i(a,b,c,d){var e,i=f(c,d),j={},k=[];for(var l in i)if(i[l].params&&(e=g(i[l].params),e.length))for(var m in e)h(k,e[m])>=0||(k.push(e[m]),j[e[m]]=a[e[m]]);return M({},j,b)}function j(a,b,c){if(!c){c=[];for(var d in a)c.push(d)}for(var e=0;e<c.length;e++){var f=c[e];if(a[f]!=b[f])return!1}return!0}function k(a,b){var c={};return L(a,function(a){c[a]=b[a]}),c}function l(a){var b={},c=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var d in a)-1==h(c,d)&&(b[d]=a[d]);return b}function m(a,b){var c=K(a),d=c?[]:{};return L(a,function(a,e){b(a,e)&&(d[c?d.length:e]=a)}),d}function n(a,b){var c=K(a)?[]:{};return L(a,function(a,d){c[d]=b(a,d)}),c}function o(a,b){var d=1,f=2,i={},j=[],k=i,m=M(a.when(i),{$$promises:i,$$values:i});this.study=function(i){function n(a,c){if(s[c]!==f){if(r.push(c),s[c]===d)throw r.splice(0,h(r,c)),new Error("Cyclic dependency: "+r.join(" -> "));if(s[c]=d,I(a))q.push(c,[function(){return b.get(a)}],j);else{var e=b.annotate(a);L(e,function(a){a!==c&&i.hasOwnProperty(a)&&n(i[a],a)}),q.push(c,a,e)}r.pop(),s[c]=f}}function o(a){return J(a)&&a.then&&a.$$promises}if(!J(i))throw new Error("'invocables' must be an object");var p=g(i||{}),q=[],r=[],s={};return L(i,n),i=r=s=null,function(d,f,g){function h(){--u||(v||e(t,f.$$values),r.$$values=t,r.$$promises=r.$$promises||!0,delete r.$$inheritedValues,n.resolve(t))}function i(a){r.$$failure=a,n.reject(a)}function j(c,e,f){function j(a){l.reject(a),i(a)}function k(){if(!G(r.$$failure))try{l.resolve(b.invoke(e,g,t)),l.promise.then(function(a){t[c]=a,h()},j)}catch(a){j(a)}}var l=a.defer(),m=0;L(f,function(a){s.hasOwnProperty(a)&&!d.hasOwnProperty(a)&&(m++,s[a].then(function(b){t[a]=b,--m||k()},j))}),m||k(),s[c]=l.promise}if(o(d)&&g===c&&(g=f,f=d,d=null),d){if(!J(d))throw new Error("'locals' must be an object")}else d=k;if(f){if(!o(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else f=m;var n=a.defer(),r=n.promise,s=r.$$promises={},t=M({},d),u=1+q.length/3,v=!1;if(G(f.$$failure))return i(f.$$failure),r;f.$$inheritedValues&&e(t,l(f.$$inheritedValues,p)),M(s,f.$$promises),f.$$values?(v=e(t,l(f.$$values,p)),r.$$inheritedValues=l(f.$$values,p),h()):(f.$$inheritedValues&&(r.$$inheritedValues=l(f.$$inheritedValues,p)),f.then(h,i));for(var w=0,x=q.length;x>w;w+=3)d.hasOwnProperty(q[w])?h():j(q[w],q[w+1],q[w+2]);return r}},this.resolve=function(a,b,c,d){return this.study(a)(b,c,d)}}function p(a,b,c){this.fromConfig=function(a,b,c){return G(a.template)?this.fromString(a.template,b):G(a.templateUrl)?this.fromUrl(a.templateUrl,b):G(a.templateProvider)?this.fromProvider(a.templateProvider,b,c):null},this.fromString=function(a,b){return H(a)?a(b):a},this.fromUrl=function(c,d){return H(c)&&(c=c(d)),null==c?null:a.get(c,{cache:b,headers:{Accept:"text/html"}}).then(function(a){return a.data})},this.fromProvider=function(a,b,d){return c.invoke(a,null,d||{params:b})}}function q(a,b,e){function f(b,c,d,e){if(q.push(b),o[b])return o[b];if(!/^\w+(-+\w+)*(?:\[\])?$/.test(b))throw new Error("Invalid parameter name '"+b+"' in pattern '"+a+"'");if(p[b])throw new Error("Duplicate parameter name '"+b+"' in pattern '"+a+"'");return p[b]=new O.Param(b,c,d,e),p[b]}function g(a,b,c){var d=["",""],e=a.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!b)return e;switch(c){case!1:d=["(",")"];break;case!0:d=["?(",")?"];break;default:d=["("+c+"|",")?"]}return e+d[0]+b+d[1]}function h(c,e){var f,g,h,i,j;return f=c[2]||c[3],j=b.params[f],h=a.substring(m,c.index),g=e?c[4]:c[4]||("*"==c[1]?".*":null),i=O.type(g||"string")||d(O.type("string"),{pattern:new RegExp(g)}),{id:f,regexp:g,segment:h,type:i,cfg:j}}b=M({params:{}},J(b)?b:{});var i,j=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,k=/([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,l="^",m=0,n=this.segments=[],o=e?e.params:{},p=this.params=e?e.params.$$new():new O.ParamSet,q=[];this.source=a;for(var r,s,t;(i=j.exec(a))&&(r=h(i,!1),!(r.segment.indexOf("?")>=0));)s=f(r.id,r.type,r.cfg,"path"),l+=g(r.segment,s.type.pattern.source,s.squash),n.push(r.segment),m=j.lastIndex;t=a.substring(m);var u=t.indexOf("?");if(u>=0){var v=this.sourceSearch=t.substring(u);if(t=t.substring(0,u),this.sourcePath=a.substring(0,m+u),v.length>0)for(m=0;i=k.exec(v);)r=h(i,!0),s=f(r.id,r.type,r.cfg,"search"),m=j.lastIndex}else this.sourcePath=a,this.sourceSearch="";l+=g(t)+(b.strict===!1?"/?":"")+"$",n.push(t),this.regexp=new RegExp(l,b.caseInsensitive?"i":c),this.prefix=n[0],this.$$paramNames=q}function r(a){M(this,a)}function s(){function a(a){return null!=a?a.toString().replace(/\//g,"%2F"):a}function e(a){return null!=a?a.toString().replace(/%2F/g,"/"):a}function f(a){return this.pattern.test(a)}function i(){return{strict:t,caseInsensitive:p}}function j(a){return H(a)||K(a)&&H(a[a.length-1])}function k(){for(;x.length;){var a=x.shift();if(a.pattern)throw new Error("You cannot override a type's .pattern at runtime.");b.extend(v[a.name],o.invoke(a.def))}}function l(a){M(this,a||{})}O=this;var o,p=!1,t=!0,u=!1,v={},w=!0,x=[],y={string:{encode:a,decode:e,is:f,pattern:/[^\/]*/},"int":{encode:a,decode:function(a){return parseInt(a,10)},is:function(a){return G(a)&&this.decode(a.toString())===a},pattern:/\d+/},bool:{encode:function(a){return a?1:0},decode:function(a){return 0!==parseInt(a,10)},is:function(a){return a===!0||a===!1},pattern:/0|1/},date:{encode:function(a){return this.is(a)?[a.getFullYear(),("0"+(a.getMonth()+1)).slice(-2),("0"+a.getDate()).slice(-2)].join("-"):c},decode:function(a){if(this.is(a))return a;var b=this.capture.exec(a);return b?new Date(b[1],b[2]-1,b[3]):c},is:function(a){return a instanceof Date&&!isNaN(a.valueOf())},equals:function(a,b){return this.is(a)&&this.is(b)&&a.toISOString()===b.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:b.toJson,decode:b.fromJson,is:b.isObject,equals:b.equals,pattern:/[^\/]*/},any:{encode:b.identity,decode:b.identity,is:b.identity,equals:b.equals,pattern:/.*/}};s.$$getDefaultValue=function(a){if(!j(a.value))return a.value;if(!o)throw new Error("Injectable functions cannot be called at configuration time");return o.invoke(a.value)},this.caseInsensitive=function(a){return G(a)&&(p=a),p},this.strictMode=function(a){return G(a)&&(t=a),t},this.defaultSquashPolicy=function(a){if(!G(a))return u;if(a!==!0&&a!==!1&&!I(a))throw new Error("Invalid squash policy: "+a+". Valid policies: false, true, arbitrary-string");return u=a,a},this.compile=function(a,b){return new q(a,M(i(),b))},this.isMatcher=function(a){if(!J(a))return!1;var b=!0;return L(q.prototype,function(c,d){H(c)&&(b=b&&G(a[d])&&H(a[d]))}),b},this.type=function(a,b,c){if(!G(b))return v[a];if(v.hasOwnProperty(a))throw new Error("A type named '"+a+"' has already been defined.");return v[a]=new r(M({name:a},b)),c&&(x.push({name:a,def:c}),w||k()),this},L(y,function(a,b){v[b]=new r(M({name:b},a))}),v=d(v,{}),this.$get=["$injector",function(a){return o=a,w=!1,k(),L(y,function(a,b){v[b]||(v[b]=new r(a))}),this}],this.Param=function(a,b,d,e){function f(a){var b=J(a)?g(a):[],c=-1===h(b,"value")&&-1===h(b,"type")&&-1===h(b,"squash")&&-1===h(b,"array");return c&&(a={value:a}),a.$$fn=j(a.value)?a.value:function(){return a.value},a}function i(b,c,d){if(b.type&&c)throw new Error("Param '"+a+"' has two type configurations.");return c?c:b.type?b.type instanceof r?b.type:new r(b.type):"config"===d?v.any:v.string}function k(){var b={array:"search"===e?"auto":!1},c=a.match(/\[\]$/)?{array:!0}:{};return M(b,c,d).array}function l(a,b){var c=a.squash;if(!b||c===!1)return!1;if(!G(c)||null==c)return u;if(c===!0||I(c))return c;throw new Error("Invalid squash policy: '"+c+"'. Valid policies: false, true, or arbitrary string")}function p(a,b,d,e){var f,g,i=[{from:"",to:d||b?c:""},{from:null,to:d||b?c:""}];return f=K(a.replace)?a.replace:[],I(e)&&f.push({from:e,to:c}),g=n(f,function(a){return a.from}),m(i,function(a){return-1===h(g,a.from)}).concat(f)}function q(){if(!o)throw new Error("Injectable functions cannot be called at configuration time");return o.invoke(d.$$fn)}function s(a){function b(a){return function(b){return b.from===a}}function c(a){var c=n(m(w.replace,b(a)),function(a){return a.to});return c.length?c[0]:a}return a=c(a),G(a)?w.type.decode(a):q()}function t(){return"{Param:"+a+" "+b+" squash: '"+z+"' optional: "+y+"}"}var w=this;d=f(d),b=i(d,b,e);var x=k();b=x?b.$asArray(x,"search"===e):b,"string"!==b.name||x||"path"!==e||d.value!==c||(d.value="");var y=d.value!==c,z=l(d,y),A=p(d,x,y,z);M(this,{id:a,type:b,location:e,array:x,squash:z,replace:A,isOptional:y,value:s,dynamic:c,config:d,toString:t})},l.prototype={$$new:function(){return d(this,M(new l,{$$parent:this}))},$$keys:function(){for(var a=[],b=[],c=this,d=g(l.prototype);c;)b.push(c),c=c.$$parent;return b.reverse(),L(b,function(b){L(g(b),function(b){-1===h(a,b)&&-1===h(d,b)&&a.push(b)})}),a},$$values:function(a){var b={},c=this;return L(c.$$keys(),function(d){b[d]=c[d].value(a&&a[d])}),b},$$equals:function(a,b){var c=!0,d=this;return L(d.$$keys(),function(e){var f=a&&a[e],g=b&&b[e];d[e].type.equals(f,g)||(c=!1)}),c},$$validates:function(a){var b,c,d,e=!0,f=this;return L(this.$$keys(),function(g){d=f[g],c=a[g],b=!c&&d.isOptional,e=e&&(b||!!d.type.is(c))}),e},$$parent:c},this.ParamSet=l}function t(a,d){function e(a){var b=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);return null!=b?b[1].replace(/\\(.)/g,"$1"):""}function f(a,b){return a.replace(/\$(\$|\d{1,2})/,function(a,c){return b["$"===c?0:Number(c)]})}function g(a,b,c){if(!c)return!1;var d=a.invoke(b,b,{$match:c});return G(d)?d:!0}function h(d,e,f,g){function h(a,b,c){return"/"===p?a:b?p.slice(0,-1)+a:c?p.slice(1)+a:a}function m(a){function b(a){var b=a(f,d);return b?(I(b)&&d.replace().url(b),!0):!1}if(!a||!a.defaultPrevented){var e=o&&d.url()===o;if(o=c,e)return!0;var g,h=j.length;for(g=0;h>g;g++)if(b(j[g]))return;k&&b(k)}}function n(){return i=i||e.$on("$locationChangeSuccess",m)}var o,p=g.baseHref(),q=d.url();return l||n(),{sync:function(){m()},listen:function(){return n()},update:function(a){return a?void(q=d.url()):void(d.url()!==q&&(d.url(q),d.replace()))},push:function(a,b,e){d.url(a.format(b||{})),o=e&&e.$$avoidResync?d.url():c,e&&e.replace&&d.replace()},href:function(c,e,f){if(!c.validates(e))return null;var g=a.html5Mode();b.isObject(g)&&(g=g.enabled);var i=c.format(e);if(f=f||{},g||null===i||(i="#"+a.hashPrefix()+i),i=h(i,g,f.absolute),!f.absolute||!i)return i;var j=!g&&i?"/":"",k=d.port();return k=80===k||443===k?"":":"+k,[d.protocol(),"://",d.host(),k,j,i].join("")}}}var i,j=[],k=null,l=!1;this.rule=function(a){if(!H(a))throw new Error("'rule' must be a function");return j.push(a),this},this.otherwise=function(a){if(I(a)){var b=a;a=function(){return b}}else if(!H(a))throw new Error("'rule' must be a function");return k=a,this},this.when=function(a,b){var c,h=I(b);if(I(a)&&(a=d.compile(a)),!h&&!H(b)&&!K(b))throw new Error("invalid 'handler' in when()");var i={matcher:function(a,b){return h&&(c=d.compile(b),b=["$match",function(a){return c.format(a)}]),M(function(c,d){return g(c,b,a.exec(d.path(),d.search()))},{prefix:I(a.prefix)?a.prefix:""})},regex:function(a,b){if(a.global||a.sticky)throw new Error("when() RegExp must not be global or sticky");return h&&(c=b,b=["$match",function(a){return f(c,a)}]),M(function(c,d){return g(c,b,a.exec(d.path()))},{prefix:e(a)})}},j={matcher:d.isMatcher(a),regex:a instanceof RegExp};for(var k in j)if(j[k])return this.rule(i[k](a,b));throw new Error("invalid 'what' in when()")},this.deferIntercept=function(a){a===c&&(a=!0),l=a},this.$get=h,h.$inject=["$location","$rootScope","$injector","$browser"]}function u(a,e){function f(a){return 0===a.indexOf(".")||0===a.indexOf("^")}function l(a,b){if(!a)return c;var d=I(a),e=d?a:a.name,g=f(e);if(g){if(!b)throw new Error("No reference point given for path '"+e+"'");b=l(b);for(var h=e.split("."),i=0,j=h.length,k=b;j>i;i++)if(""!==h[i]||0!==i){if("^"!==h[i])break;if(!k.parent)throw new Error("Path '"+e+"' not valid for state '"+b.name+"'");k=k.parent}else k=b;h=h.slice(i).join("."),e=k.name+(k.name&&h?".":"")+h}var m=y[e];return!m||!d&&(d||m!==a&&m.self!==a)?c:m}function m(a,b){z[a]||(z[a]=[]),z[a].push(b)}function o(a){for(var b=z[a]||[];b.length;)p(b.shift())}function p(b){b=d(b,{self:b,resolve:b.resolve||{},toString:function(){return this.name}});var c=b.name;if(!I(c)||c.indexOf("@")>=0)throw new Error("State must have a valid name");if(y.hasOwnProperty(c))throw new Error("State '"+c+"'' is already defined");var e=-1!==c.indexOf(".")?c.substring(0,c.lastIndexOf(".")):I(b.parent)?b.parent:J(b.parent)&&I(b.parent.name)?b.parent.name:"";if(e&&!y[e])return m(e,b.self);for(var f in B)H(B[f])&&(b[f]=B[f](b,B.$delegates[f]));return y[c]=b,!b[A]&&b.url&&a.when(b.url,["$match","$stateParams",function(a,c){x.$current.navigable==b&&j(a,c)||x.transitionTo(b,a,{inherit:!0,location:!1})}]),o(c),b}function q(a){return a.indexOf("*")>-1}function r(a){var b=a.split("."),c=x.$current.name.split(".");if("**"===b[0]&&(c=c.slice(h(c,b[1])),c.unshift("**")),"**"===b[b.length-1]&&(c.splice(h(c,b[b.length-2])+1,Number.MAX_VALUE),c.push("**")),b.length!=c.length)return!1;for(var d=0,e=b.length;e>d;d++)"*"===b[d]&&(c[d]="*");return c.join("")===b.join("")}function s(a,b){return I(a)&&!G(b)?B[a]:H(b)&&I(a)?(B[a]&&!B.$delegates[a]&&(B.$delegates[a]=B[a]),B[a]=b,this):this}function t(a,b){return J(a)?b=a:b.name=a,p(b),this}function u(a,e,f,h,m,o,p,s,t){function u(b,c,d,f){var g=a.$broadcast("$stateNotFound",b,c,d);if(g.defaultPrevented)return p.update(),D;if(!g.retry)return null;if(f.$retry)return p.update(),E;var h=x.transition=e.when(g.retry);return h.then(function(){return h!==x.transition?B:(b.options.$retry=!0,x.transitionTo(b.to,b.toParams,b.options))},function(){return D}),p.update(),h}function z(a,c,d,g,i,j){var l=d?c:k(a.params.$$keys(),c),n={$stateParams:l};i.resolve=m.resolve(a.resolve,n,i.resolve,a);var o=[i.resolve.then(function(a){i.globals=a})];return g&&o.push(g),L(a.views,function(c,d){var e=c.resolve&&c.resolve!==a.resolve?c.resolve:{};e.$template=[function(){return f.load(d,{view:c,locals:n,params:l,notify:j.notify})||""}],o.push(m.resolve(e,n,i.resolve,a).then(function(f){if(H(c.controllerProvider)||K(c.controllerProvider)){var g=b.extend({},e,n);f.$$controller=h.invoke(c.controllerProvider,null,g)}else f.$$controller=c.controller;f.$$state=a,f.$$controllerAs=c.controllerAs,i[d]=f}))}),e.all(o).then(function(a){return i})}var B=e.reject(new Error("transition superseded")),C=e.reject(new Error("transition prevented")),D=e.reject(new Error("transition aborted")),E=e.reject(new Error("transition failed"));return w.locals={resolve:null,globals:{$stateParams:{}}},x={params:{},current:w.self,$current:w,transition:null},x.reload=function(){return x.transitionTo(x.current,o,{reload:!0,inherit:!1,notify:!0})},x.go=function(a,b,c){return x.transitionTo(a,b,M({inherit:!0,relative:x.$current},c))},x.transitionTo=function(b,c,f){c=c||{},f=M({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},f||{});var g,j=x.$current,m=x.params,n=j.path,q=l(b,f.relative);if(!G(q)){var r={to:b,toParams:c,options:f},s=u(r,j.self,m,f);if(s)return s;if(b=r.to,c=r.toParams,f=r.options,q=l(b,f.relative),!G(q)){if(!f.relative)throw new Error("No such state '"+b+"'");throw new Error("Could not resolve '"+b+"' from state '"+f.relative+"'")}}if(q[A])throw new Error("Cannot transition to abstract state '"+b+"'");if(f.inherit&&(c=i(o,c||{},x.$current,q)),!q.params.$$validates(c))return E;c=q.params.$$values(c),b=q;var t=b.path,y=0,D=t[y],F=w.locals,H=[];if(!f.reload)for(;D&&D===n[y]&&D.ownParams.$$equals(c,m);)F=H[y]=D.locals,y++,D=t[y];if(v(b,j,F,f))return b.self.reloadOnSearch!==!1&&p.update(),x.transition=null,e.when(x.current);if(c=k(b.params.$$keys(),c||{}),f.notify&&a.$broadcast("$stateChangeStart",b.self,c,j.self,m).defaultPrevented)return p.update(),C;for(var I=e.when(F),J=y;J<t.length;J++,D=t[J])F=H[J]=d(F),I=z(D,c,D===b,I,F,f);var K=x.transition=I.then(function(){var d,e,g;if(x.transition!==K)return B;for(d=n.length-1;d>=y;d--)g=n[d],g.self.onExit&&h.invoke(g.self.onExit,g.self,g.locals.globals),g.locals=null;for(d=y;d<t.length;d++)e=t[d],e.locals=H[d],e.self.onEnter&&h.invoke(e.self.onEnter,e.self,e.locals.globals);return x.transition!==K?B:(x.$current=b,x.current=b.self,x.params=c,N(x.params,o),x.transition=null,f.location&&b.navigable&&p.push(b.navigable.url,b.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===f.location}),f.notify&&a.$broadcast("$stateChangeSuccess",b.self,c,j.self,m),p.update(!0),x.current)},function(d){return x.transition!==K?B:(x.transition=null,g=a.$broadcast("$stateChangeError",b.self,c,j.self,m,d),g.defaultPrevented||p.update(),e.reject(d))});return K},x.is=function(a,b,d){d=M({relative:x.$current},d||{});var e=l(a,d.relative);return G(e)?x.$current!==e?!1:b?j(e.params.$$values(b),o):!0:c},x.includes=function(a,b,d){if(d=M({relative:x.$current},d||{}),I(a)&&q(a)){if(!r(a))return!1;a=x.$current.name}var e=l(a,d.relative);return G(e)?G(x.$current.includes[e.name])?b?j(e.params.$$values(b),o,g(b)):!0:!1:c},x.href=function(a,b,d){d=M({lossy:!0,inherit:!0,absolute:!1,relative:x.$current},d||{});var e=l(a,d.relative);if(!G(e))return null;d.inherit&&(b=i(o,b||{},x.$current,e));var f=e&&d.lossy?e.navigable:e;return f&&f.url!==c&&null!==f.url?p.href(f.url,k(e.params.$$keys(),b||{}),{absolute:d.absolute}):null},x.get=function(a,b){if(0===arguments.length)return n(g(y),function(a){return y[a].self});var c=l(a,b||x.$current);return c&&c.self?c.self:null},x}function v(a,b,c,d){return a!==b||(c!==b.locals||d.reload)&&a.self.reloadOnSearch!==!1?void 0:!0}var w,x,y={},z={},A="abstract",B={parent:function(a){if(G(a.parent)&&a.parent)return l(a.parent);var b=/^(.+)\.[^.]+$/.exec(a.name);return b?l(b[1]):w},data:function(a){return a.parent&&a.parent.data&&(a.data=a.self.data=M({},a.parent.data,a.data)),a.data},url:function(a){var b=a.url,c={params:a.params||{}};if(I(b))return"^"==b.charAt(0)?e.compile(b.substring(1),c):(a.parent.navigable||w).url.concat(b,c);if(!b||e.isMatcher(b))return b;throw new Error("Invalid url '"+b+"' in state '"+a+"'")},navigable:function(a){return a.url?a:a.parent?a.parent.navigable:null},ownParams:function(a){var b=a.url&&a.url.params||new O.ParamSet;return L(a.params||{},function(a,c){b[c]||(b[c]=new O.Param(c,null,a,"config"))}),b},params:function(a){return a.parent&&a.parent.params?M(a.parent.params.$$new(),a.ownParams):new O.ParamSet},views:function(a){var b={};return L(G(a.views)?a.views:{"":a},function(c,d){d.indexOf("@")<0&&(d+="@"+a.parent.name),b[d]=c}),b},path:function(a){return a.parent?a.parent.path.concat(a):[]},includes:function(a){var b=a.parent?M({},a.parent.includes):{};return b[a.name]=!0,b},$delegates:{}};w=p({name:"",url:"^",views:null,"abstract":!0}),w.navigable=null,this.decorator=s,this.state=t,this.$get=u,u.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function v(){function a(a,b){return{load:function(c,d){var e,f={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return d=M(f,d),d.view&&(e=b.fromConfig(d.view,d.params,d.locals)),e&&d.notify&&a.$broadcast("$viewContentLoading",d),e}}}this.$get=a,a.$inject=["$rootScope","$templateFactory"]}function w(){var a=!1;this.useAnchorScroll=function(){a=!0},this.$get=["$anchorScroll","$timeout",function(b,c){return a?b:function(a){c(function(){a[0].scrollIntoView()},0,!1)}}]}function x(a,c,d,e){function f(){return c.has?function(a){return c.has(a)?c.get(a):null}:function(a){try{return c.get(a)}catch(b){return null}}}function g(a,b){var c=function(){return{enter:function(a,b,c){b.after(a),c()},leave:function(a,b){a.remove(),b()}}};if(j)return{enter:function(a,b,c){var d=j.enter(a,null,b,c);d&&d.then&&d.then(c)},leave:function(a,b){var c=j.leave(a,b);c&&c.then&&c.then(b)}};if(i){var d=i&&i(b,a);return{enter:function(a,b,c){d.enter(a,null,b),c()},leave:function(a,b){d.leave(a),b()}}}return c()}var h=f(),i=h("$animator"),j=h("$animate"),k={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(c,f,h){return function(c,f,i){function j(){l&&(l.remove(),l=null),n&&(n.$destroy(),n=null),m&&(r.leave(m,function(){l=null}),l=m,m=null)}function k(g){var k,l=z(c,i,f,e),s=l&&a.$current&&a.$current.locals[l];if(g||s!==o){k=c.$new(),o=a.$current.locals[l],c.$emit("$viewContentLoadedStart",k,a.current.name);var t=h(k,function(a){r.enter(a,f,function(){n&&n.$emit("$viewContentAnimationEnded"),(b.isDefined(q)&&!q||c.$eval(q))&&d(a)}),j()});m=t,n=k,n.$emit("$viewContentLoaded"),n.$eval(p)}}var l,m,n,o,p=i.onload||"",q=i.autoscroll,r=g(i,c);c.$on("$stateChangeSuccess",function(){k(!1)}),c.$on("$viewContentLoading",function(){k(!1)}),k(!0)}}};return k}function y(a,b,c,d){return{restrict:"ECA",priority:-400,compile:function(e){var f=e.html();return function(e,g,h){var i=c.$current,j=z(e,h,g,d),k=i&&i.locals[j];if(k){g.data("$uiView",{name:j,state:k.$$state}),g.html(k.$template?k.$template:f);var l=a(g.contents());if(k.$$controller){k.$scope=e;var m=b(k.$$controller,k);k.$$controllerAs&&(e[k.$$controllerAs]=m),g.data("$ngControllerController",m),g.children().data("$ngControllerController",m)}l(e)}}}}}function z(a,b,c,d){var e=d(b.uiView||b.name||"")(a),f=c.inheritedData("$uiView");return e.indexOf("@")>=0?e:e+"@"+(f?f.state.name:"")}function A(a,b){var c,d=a.match(/^\s*({[^}]*})\s*$/);if(d&&(a=b+"("+d[1]+")"),c=a.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!c||4!==c.length)throw new Error("Invalid state ref '"+a+"'");return{state:c[1],paramExpr:c[3]||null}}function B(a){var b=a.parent().inheritedData("$uiView");return b&&b.state&&b.state.name?b.state:void 0}function C(a,c){var d=["location","inherit","reload"];return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(e,f,g,h){var i=A(g.uiSref,a.current.name),j=null,k=B(f)||a.$current,l=null,m="A"===f.prop("tagName"),n="FORM"===f[0].nodeName,o=n?"action":"href",p=!0,q={relative:k,inherit:!0},r=e.$eval(g.uiSrefOpts)||{};b.forEach(d,function(a){a in r&&(q[a]=r[a])});var s=function(c){if(c&&(j=b.copy(c)),p){l=a.href(i.state,j,q);var d=h[1]||h[0];return d&&d.$$setStateInfo(i.state,j),null===l?(p=!1,!1):void g.$set(o,l)}};i.paramExpr&&(e.$watch(i.paramExpr,function(a,b){a!==j&&s(a)},!0),j=b.copy(e.$eval(i.paramExpr))),s(),n||f.bind("click",function(b){var d=b.which||b.button;if(!(d>1||b.ctrlKey||b.metaKey||b.shiftKey||f.attr("target"))){var e=c(function(){a.go(i.state,j,q)});b.preventDefault();var g=m&&!l?1:0;b.preventDefault=function(){g--<=0&&c.cancel(e)}}})}}}function D(a,b,c){return{restrict:"A",controller:["$scope","$element","$attrs",function(b,d,e){function f(){g()?d.addClass(j):d.removeClass(j)}function g(){return"undefined"!=typeof e.uiSrefActiveEq?h&&a.is(h.name,i):h&&a.includes(h.name,i)}var h,i,j;j=c(e.uiSrefActiveEq||e.uiSrefActive||"",!1)(b),this.$$setStateInfo=function(b,c){h=a.get(b,B(d)),i=c,f()},b.$on("$stateChangeSuccess",f)}]}}function E(a){var b=function(b){return a.is(b)};return b.$stateful=!0,b}function F(a){var b=function(b){return a.includes(b)};return b.$stateful=!0,b}var G=b.isDefined,H=b.isFunction,I=b.isString,J=b.isObject,K=b.isArray,L=b.forEach,M=b.extend,N=b.copy;b.module("ui.router.util",["ng"]),b.module("ui.router.router",["ui.router.util"]),b.module("ui.router.state",["ui.router.router","ui.router.util"]),b.module("ui.router",["ui.router.state"]),b.module("ui.router.compat",["ui.router"]),o.$inject=["$q","$injector"],b.module("ui.router.util").service("$resolve",o),p.$inject=["$http","$templateCache","$injector"],b.module("ui.router.util").service("$templateFactory",p);var O;q.prototype.concat=function(a,b){var c={caseInsensitive:O.caseInsensitive(),strict:O.strictMode(),squash:O.defaultSquashPolicy()};return new q(this.sourcePath+a+this.sourceSearch,M(c,b),this)},q.prototype.toString=function(){return this.source},q.prototype.exec=function(a,b){function c(a){function b(a){return a.split("").reverse().join("")}function c(a){return a.replace(/\\-/,"-")}var d=b(a).split(/-(?!\\)/),e=n(d,b);return n(e,c).reverse()}var d=this.regexp.exec(a);if(!d)return null;b=b||{};var e,f,g,h=this.parameters(),i=h.length,j=this.segments.length-1,k={};if(j!==d.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(e=0;j>e;e++){g=h[e];var l=this.params[g],m=d[e+1];for(f=0;f<l.replace;f++)l.replace[f].from===m&&(m=l.replace[f].to);m&&l.array===!0&&(m=c(m)),k[g]=l.value(m)}for(;i>e;e++)g=h[e],k[g]=this.params[g].value(b[g]);return k},q.prototype.parameters=function(a){return G(a)?this.params[a]||null:this.$$paramNames},q.prototype.validates=function(a){return this.params.$$validates(a)},q.prototype.format=function(a){function b(a){return encodeURIComponent(a).replace(/-/g,function(a){return"%5C%"+a.charCodeAt(0).toString(16).toUpperCase()})}a=a||{};var c=this.segments,d=this.parameters(),e=this.params;if(!this.validates(a))return null;var f,g=!1,h=c.length-1,i=d.length,j=c[0];for(f=0;i>f;f++){var k=h>f,l=d[f],m=e[l],o=m.value(a[l]),p=m.isOptional&&m.type.equals(m.value(),o),q=p?m.squash:!1,r=m.type.encode(o);if(k){var s=c[f+1];if(q===!1)null!=r&&(j+=K(r)?n(r,b).join("-"):encodeURIComponent(r)),j+=s;else if(q===!0){var t=j.match(/\/$/)?/\/?(.*)/:/(.*)/;j+=s.match(t)[1]}else I(q)&&(j+=q+s)}else{if(null==r||p&&q!==!1)continue;K(r)||(r=[r]),r=n(r,encodeURIComponent).join("&"+l+"="),j+=(g?"&":"?")+(l+"="+r),g=!0}}return j},r.prototype.is=function(a,b){return!0},r.prototype.encode=function(a,b){return a},r.prototype.decode=function(a,b){return a},r.prototype.equals=function(a,b){return a==b},r.prototype.$subPattern=function(){var a=this.pattern.toString();return a.substr(1,a.length-2)},r.prototype.pattern=/.*/,r.prototype.toString=function(){return"{Type:"+this.name+"}"},r.prototype.$asArray=function(a,b){function d(a,b){function d(a,b){return function(){return a[b].apply(a,arguments)}}function e(a){return K(a)?a:G(a)?[a]:[]}function f(a){switch(a.length){case 0:return c;case 1:return"auto"===b?a[0]:a;default:return a}}function g(a){return!a}function h(a,b){return function(c){c=e(c);var d=n(c,a);return b===!0?0===m(d,g).length:f(d)}}function i(a){return function(b,c){var d=e(b),f=e(c);if(d.length!==f.length)return!1;for(var g=0;g<d.length;g++)if(!a(d[g],f[g]))return!1;return!0}}this.encode=h(d(a,"encode")),this.decode=h(d(a,"decode")),this.is=h(d(a,"is"),!0),this.equals=i(d(a,"equals")),this.pattern=a.pattern,this.$arrayMode=b}if(!a)return this;if("auto"===a&&!b)throw new Error("'auto' array mode is for query parameters only");return new d(this,a)},b.module("ui.router.util").provider("$urlMatcherFactory",s),b.module("ui.router.util").run(["$urlMatcherFactory",function(a){}]),t.$inject=["$locationProvider","$urlMatcherFactoryProvider"],b.module("ui.router.router").provider("$urlRouter",t),u.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],b.module("ui.router.state").value("$stateParams",{}).provider("$state",u),v.$inject=[],b.module("ui.router.state").provider("$view",v),b.module("ui.router.state").provider("$uiViewScroll",w),x.$inject=["$state","$injector","$uiViewScroll","$interpolate"],y.$inject=["$compile","$controller","$state","$interpolate"],b.module("ui.router.state").directive("uiView",x),b.module("ui.router.state").directive("uiView",y),C.$inject=["$state","$timeout"],D.$inject=["$state","$stateParams","$interpolate"],b.module("ui.router.state").directive("uiSref",C).directive("uiSrefActive",D).directive("uiSrefActiveEq",D),E.$inject=["$state"],F.$inject=["$state"],b.module("ui.router.state").filter("isState",E).filter("includedByState",F)}(window,window.angular);;
/*----------------------------------------separator----------------------------------------*/
/*! http://www.csii.com.cn/hercules/vx
* Copyright (c) 2012-2017 CSII
* @license vx - v2.0 
*/
"use strict";!function(a,b){"function"==typeof define&&define.amd?define(["vx"],b):"object"==typeof exports?(b(require("vx")),module.exports="vStorage"):b(a.vx)}(this,function(a){function b(a,b){var c;try{c=a[b]}catch(d){c=!1}if(c){var e="__"+Math.round(1e7*Math.random());try{a[b].setItem(e,e),a[b].removeItem(e,e)}catch(d){c=!1}}return c}function c(c){var d=b(window,c);return function(){var e="vStorage-";this.setKeyPrefix=function(a){if("string"!=typeof a)throw new TypeError("[vStorage] - "+c+"Provider.setKeyPrefix() expects a String.");e=a};var f=a.toJson,g=a.fromJson;this.setSerializer=function(a){if("function"!=typeof a)throw new TypeError("[vStorage] - "+c+"Provider.setSerializer expects a function.");f=a},this.setDeserializer=function(a){if("function"!=typeof a)throw new TypeError("[vStorage] - "+c+"Provider.setDeserializer expects a function.");g=a},this.supported=function(){return!!d},this.get=function(a){return d&&g(d.getItem(e+a))},this.set=function(a,b){return d&&d.setItem(e+a,f(b))},this.remove=function(a){d&&d.removeItem(e+a)},this.$get=["$rootScope","$window","$log","$timeout","$document",function(d,h,i,j,k){var l,m,n=e.length,o=b(h,c),p=o||(i.warn("This browser does not support Web Storage!"),{setItem:a.noop,getItem:a.noop,removeItem:a.noop}),q={$default:function(b){for(var c in b)a.isDefined(q[c])||(q[c]=a.copy(b[c]));return q.$sync(),q},$reset:function(a){for(var b in q)"$"===b[0]||delete q[b]&&p.removeItem(e+b);return q.$default(a)},$sync:function(){for(var a,b=0,c=p.length;c>b;b++)(a=p.key(b))&&e===a.slice(0,n)&&(q[a.slice(n)]=g(p.getItem(a)))},$apply:function(){var b;if(m=null,!a.equals(q,l)){b=a.copy(l),a.forEach(q,function(c,d){a.isDefined(c)&&"$"!==d[0]&&(p.setItem(e+d,f(c)),delete b[d])});for(var c in b)p.removeItem(e+c);l=a.copy(q)}},$supported:function(){return!!o}};return q.$sync(),l=a.copy(q),d.$watch(function(){m||(m=j(q.$apply,100,!1))}),h.addEventListener&&h.addEventListener("storage",function(b){if(b.key){var c=k[0];c.hasFocus&&c.hasFocus()||e!==b.key.slice(0,n)||(b.newValue?q[b.key.slice(n)]=g(b.newValue):delete q[b.key.slice(n)],l=a.copy(q),d.$apply())}}),h.addEventListener&&h.addEventListener("beforeunload",function(){q.$apply()}),q}]}}return a=a&&a.module?a:window.vx,a.module("vStorage",[]).provider("$localStorage",c("localStorage")).provider("$sessionStorage",c("sessionStorage"))}),function(a,b,c){var d=b.module("vStorage");d.provider("$submitConfig",{submitErrProcess:null,setSubmitErrProcess:function(a){this.submitErrProcess=a},submitCompileProcess:null,setSubmitCompileProcess:function(a){this.submitCompileProcess=a},submitBeforeProcess:null,setSubmitBeforeProcess:function(a){this.submitBeforeProcess=a},$get:["$log",function(a){var b=this;return{doSubmitErrProcess:function(a,c,d){b.submitErrProcess&&b.submitErrProcess(a,c,d)},doSubmitCompileProcess:function(a){b.submitCompileProcess&&b.submitCompileProcess(a)},doSubmitBeforeProcess:function(a){b.submitBeforeProcess&&b.submitBeforeProcess(a)}}}]}),d.directive("ngSubmit",["$parse","$rootScope","$submitConfig","$log",function(a,c,d,e){return{restrict:"A",compile:function(c,f){var g=a(f.ngSubmit,null,!0);return function(c,h){var i=h.controller("form");c[f.name].$getData=function(){function c(a){for(var b,c=[],d=0;d<a.length;d++)isValidItem(a[d])&&(b=copy(a[d]),c.push(b));return c}function d(b,c,d){var e=a(c+"=tmp");e(b,{tmp:d})}function e(a){return b.isUndefined(a)||""===a||null===a||a!==a}return function(a){var f={},g={};return a&&(g=parentForm.$getData()),b.forEach(i,function(a){if(a&&a.$name&&!a.$parentModel){var b=a.$modelValue;if(e(b))return;if(a.$virtual&&(b=c(b),0===b.length))return;d(f,a.$name,b)}}),b.extend({},g,f)}}(),d.doSubmitCompileProcess(c),h.on("submit",function(a){d.doSubmitBeforeProcess(c);for(var b=c[f.name],h=f.language||c.language||"zh_CN",i=f.$$element[0],j=0;j<i.length;j++){var k=i[j];-1!=="inputselect".indexOf(k.tagName.toLowerCase())&&k.blur();var l=k.getAttribute("validate")||!0;if("BUTTON"!==k.nodeName&&"false"!==l){var m={};m.zh_CN={required:k.getAttribute("required-message")||"不能为空",min:k.getAttribute("min-message")||"最小值:"+k.getAttribute("v-min"),max:k.getAttribute("max-message")||"最大值:"+k.getAttribute("v-max"),minlength:k.getAttribute("minlength-message")||"最小长度:"+k.getAttribute("v-minlength"),maxlength:k.getAttribute("maxlength-message")||"最大长度:"+k.getAttribute("v-maxlength"),pattern:k.getAttribute("pattern-message")||"格式不正确","default":"格式不正确"},m.en={required:k.getAttribute("required-message_en")||"required invalid",min:k.getAttribute("min-message_en")||"min value:"+k.getAttribute("v-min"),max:k.getAttribute("max-message_en")||"max value:"+k.getAttribute("v-max"),minlength:k.getAttribute("minlength-message_en")||"min length:"+k.getAttribute("v-minlength"),maxlength:k.getAttribute("maxlength-message_en")||"max length:"+k.getAttribute("v-maxlength"),pattern:k.getAttribute("pattern-message_en")||"pattern invalid","default":"pattern invalid"};var n=k.name||k.id,o="en"===h?"["+(k.getAttribute("title_en")||n)+"]  ":"["+(k.getAttribute("title_zh")||k.title||n)+"]  ";for(var p in b.$error)for(var q=0;q<b.$error[p].length;q++)if(n==b.$error[p][q].$name){var r="en"===h?p+"-message_en":p+"-message",s=m[h][p]||k.getAttribute(r)||m[h]["default"];return d.doSubmitErrProcess(o,s,c),void e.error(o+s)}}}var t=function(){g(c,{$event:a})};c.$apply(t)})}}}}])}(window,window.vx),function(a,b,c){var d=b.module("vStorage");d.provider("$contextConfig",{$sessionStorageEnable:!1,setSessionStorageEnable:function(a){this.$sessionStorageEnable=a},$get:["$log",function(a){var b=this;return{sessionStorageEnable:b.$sessionStorageEnable}}]}),d.factory("$context",["$rootScope","$location","$sessionStorage","$contextConfig",function(c,d,e,f){var g=function(){var a={};return e.$supported&&f.sessionStorageEnable?(e.$default({_dataSQueue:[]}),a.setData=function(a,b){e[a]=b,e.$apply()},a.setJson=function(a){for(var b in a)e[b]=a[b];e.$apply()},a.setNextScope=function(b){a._dataS=b},a.getData=function(a){return e[a]},a.removeData=function(a){delete e[a],e.$apply()},a.clear=function(){e.$reset()}):(a._dataSQueue=[],a.setData=function(b,c){a[b]=c},a.setJson=function(b){for(var c in b)a[c]=b[c]},a.setNextScope=function(b){a._dataS=b},a.getData=function(b){return a[b]},a.removeData=function(b){delete a[b]},a.clear=function(){for(var b in a)/^(_dataSQueue)|(setData)|(setJson)|(setNextScope)|(getData)|(removeData)|(clear)$]/.test(a[b])||delete a[b]}),a}();return c.$context=g,c.$on("$viewContentLoadedStart",function(c,d,h){var i=g._dataS;if(i&&"{}"!=b.toJson(i))try{var j=g.getData("_dataSQueue"),k=0;for(k;k<j.length;k++)if(j[k]==h){j.splice(k,1);break}j.push(h),j.length>f.sessionStorageEnable&&delete e[j.shift()],e._dataSQueue=j,e[h]=i,b.extend(d,i),e.$apply()}catch(l){a.history.back(-1)}finally{delete g._dataS}else if(h&&g.getData(h))try{b.extend(d,g.getData(h))}catch(l){a.history.back(-1)}}),g}])}(window,vx);;
/*----------------------------------------separator----------------------------------------*/
/*! http://www.csii.com.cn/hercules/vx  
* Copyright (c) 2012-2017 CSII 
* @license vx - v2.0 
* 2017-03-16 
*/
!function(window,angular){"use strict";function indexOf(a,b){if(a.indexOf)return a.indexOf(b);for(var c=0,d=a.length;d>c;c++)if(b===a[c])return c;return-1}function ngPageController(a,b,c,d,e,f,g){var h,i=this,j=c.onload,k=c.href;b.hide(),i.$element=b,i.$title=c.title,h=b.parent().data("$viewport"),i.$destroy=function(){i.$element=null},i.$index=parseInt(b.attr("page-index")),i.$load=function(c){function d(){f(b.contents())(a),i.$$loaded=!0,c.apply(h,[i.$index,i])}i.$$loaded?c.apply(h,[i.$index,i]):k?e(k,!0).then(function(a){b.html(a),d()},function(a){console.err(a)}):g.defer(function(){d(),a.$apply(null,"ng-page")})},i.$enable=function(c){b.show(),c&&c(),d.$broadcast("$pageContentLoaded",h.$id,i.$index,k,i.$title),a.$eval(j)},i.$disable=function(){b.hide()}}function ngPageDirective(a,b){return{restrict:"EA",terminal:!0,require:"ngPage",priority:99,controller:ngPageController,link:function(c,d,e,f){var g=d.parent().data("$viewport"),h=d.attr("page-index");"1"===h&&a(function(){b.$loadIndex(g,0)}),d.bind("$destroy",function(){f.$destroy()})}}}function $TargetsProvider(){function Factory(window,$location,$log,$rootScope){function forward(a,b,c){service.$targetProxy(a,b,c)}var TARGET_REG=/^#[+-]?\d+$/,service;return service={$viewports:{},$refreshCall:null,setRefreshCall:function(a){a&&(service.$refreshCall=a)},$addView:function(a,b){var c,d=$location.path();return this.$viewports[d]||(this.$viewports[d]={}),c=this.$viewports[d],c[a]=b,b.saveKey=d,b},$getView:function(a){var b,c=$location.path();return b=this.$viewports[c],b?b[a]:void 0},$destroy:function(a){var b=a.saveKey;this.$viewports[b]&&delete this.$viewports[b]},$viewBack:function(a){var b=this.$getView(a);return b?service.$back(b):!0},$back:function(a){var b=a.$viewContext.stack;return 1===b.length?!0:(b.pop(),void service.$loadIndex(a,b[b.length-1],!0))},$parseUrlExp:function(view,urlExp){var result;if(/^#\d+/.test(urlExp)){var targetNo=urlExp.substr(1);result=targetNo>0?targetNo-1:0}else{if(!/^#[+-]\d+/.test(urlExp))throw Error("urlExp sync Error",urlExp);var history=view.$viewContext.historyPage||0;result=eval(history+urlExp.substr(1))}return result},$updateViewCtx:function(a,b,c){var d=a.$viewContext,e=d.stack;d.historyPage=d.activePage,d.activePage=b,c||d.stack.push(b);var f=e.indexOf(b);f!==e.length-1&&e.splice(f+1,e.length-1),$log.debug("vpage:->"+e.join("->")+",currentPage:"+b+",lastPage:"+d.historyPage)},$loadIndex:function(a,b,c){var d=a.$pages[b],e=d.$element,f=$(e).controller("ngPage"),g=a.$viewContext.activePage;f.$load(function(){if(void 0!==g){var d=a.$pages[g],e=d.$element,h=$(e).controller("ngPage");h.$disable()}f.$enable(function(){service.$updateViewCtx(a,b,c)})})},$targetProxy:function(a,b,c){if(!TARGET_REG.test(b))throw targetError("$target","urlExp sync Error in $target(arg1,{0},arg3) second args!",b);var d=this.$getView(a);if(!d)throw targetError(404,"ngViewport with id {0} isn't exist!",arguments[0]);if("#0"===b&&"function"==typeof service.$refreshCall)service.$refreshCall(d);else{var e=service.$parseUrlExp(d,b);service.$loadIndex(d,e,c)}}},window.$viewports=service.$viewports,angular.extend(forward,service)}Factory.$inject=["$window","$location","$log","$rootScope"],this.$get=Factory}var minErr=angular.$$minErr,targetError=minErr("$targets");ngPageController.$inject=["$scope","$element","$attrs","$rootScope","$templateRequest","$compile","$browser"],ngPageDirective.$inject=["$timeout","$targets"],angular.module("vviewport.vpage",[]),angular.module("vviewport.vpage").provider("$targets",$TargetsProvider).directive("ngPage",ngPageDirective),angular.module("vviewport.vpage").config(["$provide",function(a){a.decorator("ngControllerDirective",["$targets","$log","$delegate",function(a,b,c){var d=c[0];return d.compile=function(){return{pre:function(c,d,e){var f,g,h=[];g=e.viewId||"content",b.debug("vpage:enable view in controller:"+e.ngController);var i,j;i=d.children(),angular.forEach(i,function(a){if(a.hasAttribute("v-page")){j=h.length+1;var b={$element:a,$index:j};a.setAttribute("page-index",j),h.push(b)}}),h.length>0&&(f={$id:g,$pages:h,$viewContext:{historyPage:void 0,activePage:void 0,stack:[]}},d.data("$viewport",f),a.$addView(g,f),d.bind("$destroy",function(){a.$destroy(f)}))}}},c}])}])}(window,window.angular),function(a){angular.module("vviewport.vpage").run(["$targets","$state","$stateParams",function(a,b,c){a.setRefreshCall(function(){b.transitionTo(b.current,c,{reload:!0,inherit:!0,notify:!0})})}])}(window);;
/*----------------------------------------separator----------------------------------------*/
/*! http://www.csii.com.cn/hercules/vx
* Copyright (c) 2012-2017 CSII
* @license vx - v2.0 
*/
!function(){"use strict";function a(a){var b=[];return angular.forEach(a.requires,function(a){-1===i.indexOf(a)&&b.push(a)}),b}function b(a){try{return angular.module(a)}catch(b){if(/No module/.test(b)||b.message.indexOf("$injector:nomod")>-1)return!1}}function c(a){try{return angular.module(a)}catch(b){throw(/No module/.test(b)||b.message.indexOf("$injector:nomod")>-1)&&(b.message='The module "'+a+'" that you are trying to load does not exist. '+b.message),b}}function d(a,b,c,d){if(b){var e,g,h,i;for(e=0,g=b.length;g>e;e++)if(h=b[e],angular.isArray(h)){if(null!==a){if(!a.hasOwnProperty(h[0]))throw new Error("unsupported provider "+h[0]);i=a[h[0]]}var j=f(h,c);if("invoke"!==h[1])j&&angular.isDefined(i)&&i[h[1]].apply(i,h[2]);else{var k=function(a){var b=l.indexOf(c+"-"+a);(-1===b||d)&&(-1===b&&l.push(c+"-"+a),angular.isDefined(i)&&i[h[1]].apply(i,h[2]))};if(angular.isFunction(h[2][0]))k(h[2][0]);else if(angular.isArray(h[2][0]))for(var m=0,n=h[2][0].length;n>m;m++)angular.isFunction(h[2][0][m])&&k(h[2][0][m])}}}}function e(a,b,c){if(b){var f,h,j,k=[];for(f=b.length-1;f>=0;f--)if(h=b[f],"string"!=typeof h&&(h=g(h)),h&&-1===m.indexOf(h)){var l=-1===i.indexOf(h);if(j=angular.module(h),l&&(i.push(h),e(a,j.requires,c)),j._runBlocks.length>0)for(n[h]=[];j._runBlocks.length>0;)n[h].push(j._runBlocks.shift());angular.isDefined(n[h])&&(l||c.rerun)&&(k=k.concat(n[h])),d(a,j._invokeQueue,h,c.reconfig),d(a,j._configBlocks,h,c.reconfig),p(l?"vLazyLoad.moduleLoaded":"vLazyLoad.moduleReloaded",h),b.pop(),m.push(h)}var o=a.getInstanceInjector();angular.forEach(k,function(a){o.invoke(a)})}}function f(a,b){var c=a[2][0],d=a[1],e=!1;angular.isUndefined(k[b])&&(k[b]={}),angular.isUndefined(k[b][d])&&(k[b][d]=[]);var f=function(a){e=!0,k[b][d].push(a),p("vLazyLoad.componentLoaded",[b,d,a])};if(angular.isString(c)&&-1===k[b][d].indexOf(c))f(c);else{if(!angular.isObject(c))return!1;angular.forEach(c,function(a){angular.isString(a)&&-1===k[b][d].indexOf(a)&&f(a)})}return e}function g(a){var b=null;return angular.isString(a)?b=a:angular.isObject(a)&&a.hasOwnProperty("name")&&angular.isString(a.name)&&(b=a.name),b}function h(a){if(0===j.length){var b=[a],c=["ng:app","ng-app","x-ng-app","data-ng-app","v-app"],e=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/,f=function(a){return a&&b.push(a)};angular.forEach(c,function(b){c[b]=!0,f(document.getElementById(b)),b=b.replace(":","\\:"),a[0].querySelectorAll&&(angular.forEach(a[0].querySelectorAll("."+b),f),angular.forEach(a[0].querySelectorAll("."+b+"\\:"),f),angular.forEach(a[0].querySelectorAll("["+b+"]"),f))}),angular.forEach(b,function(b){if(0===j.length){var d=" "+a.className+" ",f=e.exec(d);f?j.push((f[2]||"").replace(/\s+/g,",")):angular.forEach(b.attributes,function(a){0===j.length&&c[a.name]&&j.push(a.value)})}})}if(0===j.length)throw"No module found during bootstrap, unable to init vLazyLoad";var g=function h(a){if(-1===i.indexOf(a)){i.push(a);var b=angular.module(a);d(null,b._invokeQueue,a),d(null,b._configBlocks,a),angular.forEach(b.requires,h)}};angular.forEach(j,function(a){g(a)})}var i=["ng"],j=[],k={},l=[],m=[],n={},o=angular.module("vx.lazyLoad",["ng"]),p=angular.noop;o.provider("$vLazyLoad",["$controllerProvider","$provide","$compileProvider","$filterProvider","$injector","$animateProvider",function(d,f,j,k,l,n){var o,q,r,s={},t={$controllerProvider:d,$compileProvider:j,$filterProvider:k,$provide:f,$injector:l,$animateProvider:n},u=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0],v=!1,w=!1;h(angular.element(window.document)),this.$get=["$log","$q","$templateCache","$http","$rootElement","$rootScope","$cacheFactory","$interval",function(d,f,h,j,k,l,n,x){var y,z=n("ngLazyLoad"),A=!1,B=!1;v||(d={},d.error=angular.noop,d.warn=angular.noop,d.info=angular.noop),t.getInstanceInjector=function(){return y?y:y=k.data("$injector")||angular.injector()},p=function(a,b){w&&l.$broadcast(a,b),v&&d.info(a,b)};var C=function(a,b,c){var d,e,g=f.defer(),h=function(a){var b=(new Date).getTime();return a.indexOf("?")>=0?"&"===a.substring(0,a.length-1)?a+"_dc="+b:a+"&_dc="+b:a+"?_dc="+b};switch(angular.isUndefined(z.get(b))&&z.put(b,g.promise),a){case"css":d=document.createElement("link"),d.type="text/css",d.rel="stylesheet",d.href=c.cache===!1?h(b):b;break;case"js":d=document.createElement("script"),d.src=c.cache===!1?h(b):b;break;default:g.reject(new Error('Requested type "'+a+'" is not known. Could not inject "'+b+'"'))}d.onload=d.onreadystatechange=function(a){d.readyState&&!/^c|loade/.test(d.readyState)||e||(d.onload=d.onreadystatechange=null,e=1,p("vLazyLoad.fileLoaded",b),g.resolve())},d.onerror=function(a){g.reject(new Error("Unable to load "+b))},d.async=c.serie?0:1;var i=u.lastChild;if(c.insertBefore){var j=angular.element(c.insertBefore);j&&j.length>0&&(i=j[0])}if(u.insertBefore(d,i),"css"==a){if(!A){var k=navigator.userAgent.toLowerCase();if(/iP(hone|od|ad)/.test(navigator.platform)){var l=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),m=parseFloat([parseInt(l[1],10),parseInt(l[2],10),parseInt(l[3]||0,10)].join("."));B=6>m}else if(k.indexOf("android")>-1){var n=parseFloat(k.slice(k.indexOf("android")+8));B=4.4>n}else if(k.indexOf("safari")>-1&&-1==k.indexOf("chrome")){var o=parseFloat(k.match(/version\/([\.\d]+)/i)[1]);B=6>o}}if(B)var q=1e3,r=x(function(){try{d.sheet.cssRules,x.cancel(r),d.onload()}catch(a){--q<=0&&d.onerror()}},20)}return g.promise};angular.isUndefined(o)&&(o=function(a,b,c){var d=[];angular.forEach(a,function(a){d.push(C("js",a,c))}),f.all(d).then(function(){b()},function(a){b(a)})},o.ngLazyLoadLoader=!0),angular.isUndefined(q)&&(q=function(a,b,c){var d=[];angular.forEach(a,function(a){d.push(C("css",a,c))}),f.all(d).then(function(){b()},function(a){b(a)})},q.ngLazyLoadLoader=!0),angular.isUndefined(r)&&(r=function(a,b,c){var d=[];return angular.forEach(a,function(a){var b=f.defer();d.push(b.promise),j.get(a,c).success(function(c){angular.isString(c)&&c.length>0&&angular.forEach(angular.element(c),function(a){"SCRIPT"===a.nodeName&&"text/ng-template"===a.type&&h.put(a.id,a.innerHTML)}),angular.isUndefined(z.get(a))&&z.put(a,!0),b.resolve()}).error(function(c){b.reject(new Error('Unable to load template file "'+a+'": '+c))})}),f.all(d).then(function(){b()},function(a){b(a)})},r.ngLazyLoadLoader=!0);var D=function(a,b){var c=[],e=[],g=[],h=[],i=null;angular.extend(b||{},a);var j=function(a){i=z.get(a),angular.isUndefined(i)||b.cache===!1?/\.(css|less)[^\.]*$/.test(a)&&-1===c.indexOf(a)?c.push(a):/\.(htm|html)[^\.]*$/.test(a)&&-1===e.indexOf(a)?e.push(a):-1===g.indexOf(a)&&g.push(a):i&&h.push(i)};if(b.serie?j(b.files.shift()):angular.forEach(b.files,function(a){j(a)}),c.length>0){var k=f.defer();q(c,function(a){angular.isDefined(a)&&q.hasOwnProperty("ngLazyLoadLoader")?(d.error(a),k.reject(a)):k.resolve()},b),h.push(k.promise)}if(e.length>0){var l=f.defer();r(e,function(a){angular.isDefined(a)&&r.hasOwnProperty("ngLazyLoadLoader")?(d.error(a),l.reject(a)):l.resolve()},b),h.push(l.promise)}if(g.length>0){var m=f.defer();o(g,function(a){angular.isDefined(a)&&o.hasOwnProperty("ngLazyLoadLoader")?(d.error(a),m.reject(a)):m.resolve()},b),h.push(m.promise)}return b.serie&&b.files.length>0?f.all(h).then(function(){return D(a,b)}):f.all(h)};return{getModuleConfig:function(a){if(!angular.isString(a))throw new Error("You need to give the name of the module to get");return s[a]?s[a]:null},setModuleConfig:function(a){if(!angular.isObject(a))throw new Error("You need to give the module config object to set");return s[a.name]=a,a},getModules:function(){return i},isLoaded:function(a){var c=function(a){var c=i.indexOf(a)>-1;return c||(c=!!b(a)),c};if(angular.isString(a)&&(a=[a]),angular.isArray(a)){var d,e;for(d=0,e=a.length;e>d;d++)if(!c(a[d]))return!1;return!0}throw new Error("You need to define the module(s) name(s)")},load:function(h,j){var k,l,n=this,o=null,p=[],q=[],r=f.defer();if(angular.isUndefined(j)&&(j={}),angular.isArray(h))return angular.forEach(h,function(a){a&&q.push(n.load(a,j))}),f.all(q).then(function(){r.resolve(h)},function(a){r.reject(a)}),r.promise;if(k=g(h),"string"==typeof h?(o=n.getModuleConfig(h),o||(o={files:[h]},k=null)):"object"==typeof h&&(o=n.setModuleConfig(h)),null===o?(l='Module "'+k+'" is not configured, cannot load.',d.error(l),r.reject(new Error(l))):angular.isDefined(o.template)&&(angular.isUndefined(o.files)&&(o.files=[]),angular.isString(o.template)?o.files.push(o.template):angular.isArray(o.template)&&o.files.concat(o.template)),p.push=function(a){-1===this.indexOf(a)&&Array.prototype.push.apply(this,arguments)},angular.isDefined(k)&&b(k)&&-1!==i.indexOf(k)&&(p.push(k),angular.isUndefined(o.files)))return r.resolve(),r.promise;var s={};angular.extend(s,j,o);var u=function v(e){var h,i,j,k,l=[];if(h=g(e),null===h)return f.when();try{i=c(h)}catch(m){var o=f.defer();return d.error(m.message),o.reject(m),o.promise}return j=a(i),angular.forEach(j,function(a){if("string"==typeof a){var c=n.getModuleConfig(a);if(null===c)return void p.push(a);a=c}return b(a.name)?void("string"!=typeof e&&(k=a.files.filter(function(b){return n.getModuleConfig(a.name).files.indexOf(b)<0}),0!==k.length&&d.warn('Module "',h,'" attempted to redefine configuration for dependency. "',a.name,'"\n Additional Files Loaded:',k),l.push(D(a.files,s).then(function(){return v(a)})))):("object"==typeof a&&(a.hasOwnProperty("name")&&a.name&&(n.setModuleConfig(a),p.push(a.name)),a.hasOwnProperty("css")&&0!==a.css.length&&angular.forEach(a.css,function(a){C("css",a,s)})),void(a.hasOwnProperty("files")&&0!==a.files.length&&a.files&&l.push(D(a,s).then(function(){return v(a)}))))}),f.all(l)};return D(o,s).then(function(){null===k?r.resolve(h):(p.push(k),u(k).then(function(){try{m=[],e(t,p,s)}catch(a){return d.error(a.message),void r.reject(a)}r.resolve(h)},function(a){r.reject(a)}))},function(a){r.reject(a)}),r.promise}}}],this.config=function(a){if(angular.isDefined(a.jsLoader)||angular.isDefined(a.asyncLoader)){if(!angular.isFunction(a.jsLoader||a.asyncLoader))throw"The js loader needs to be a function";o=a.jsLoader||a.asyncLoader}if(angular.isDefined(a.cssLoader)){if(!angular.isFunction(a.cssLoader))throw"The css loader needs to be a function";q=a.cssLoader}if(angular.isDefined(a.templatesLoader)){if(!angular.isFunction(a.templatesLoader))throw"The template loader needs to be a function";r=a.templatesLoader}angular.isDefined(a.modules)&&(angular.isArray(a.modules)?angular.forEach(a.modules,function(a){s[a.name]=a}):s[a.modules.name]=a.modules),angular.isDefined(a.debug)&&(v=a.debug),angular.isDefined(a.events)&&(w=a.events)}}]),o.directive("ngLazyLoad",["$vLazyLoad","$compile","$animate","$parse",function(a,b,c,d){return{restrict:"A",terminal:!0,priority:1e3,compile:function(e,f){var g=e[0].innerHTML;return e.html(""),function(e,f,h){e.$root.$broadcast("$vLazyLoadLoaded",f,h);var i=d(h.ngLazyLoad);e.$watch(function(){return i(e)||h.ngLazyLoad},function(d){angular.isDefined(d)&&a.load(d).then(function(a){c.enter(g,f),b(f.contents())(e)})},!0)}}}}]);var q=angular.bootstrap;angular.bootstrap=function(a,b,c){return j=b.slice(),q(a,b,c)},Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){var c;if(null==this)throw new TypeError('"this" is null or not defined');var d=Object(this),e=d.length>>>0;if(0===e)return-1;var f=+b||0;if(Math.abs(f)===1/0&&(f=0),f>=e)return-1;for(c=Math.max(f>=0?f:e-Math.abs(f),0);e>c;){if(c in d&&d[c]===a)return c;c++}return-1})}();;
/*----------------------------------------separator----------------------------------------*/
/*! http://www.csii.com.cn/hercules/vx
* Copyright (c) 2012-2017 CSII
* @license vx - v2.0 
*/
(function(G,t,Ra){'use strict';function va(a,b,c){if(!a)throw ngMinErr("areq",b||"?",c||"required");return a}function wa(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;W(a)&&(a=a.join(" "));W(b)&&(b=b.join(" "));return a+" "+b}function Ha(a){var b={};a&&(a.to||a.from)&&(b.to=a.to,b.from=a.from);return b}function S(a,b,c){var d="";a=W(a)?a:a&&M(a)&&a.length?a.split(/\s+/):[];q(a,function(a,u){a&&0<a.length&&(d+=0<u?" ":"",d+=c?b+a:a+b)});return d}function Ia(a){if(a instanceof J)switch(a.length){case 0:return[];
case 1:if(1===a[0].nodeType)return a;break;default:return J(la(a))}if(1===a.nodeType)return J(a)}function la(a){if(!a[0])return a;for(var b=0;b<a.length;b++){var c=a[b];if(1==c.nodeType)return c}}function Ja(a,b,c){q(b,function(b){a.addClass(b,c)})}function Ka(a,b,c){q(b,function(b){a.removeClass(b,c)})}function P(a){return function(b,c){c.addClass&&(Ja(a,b,c.addClass),c.addClass=null);c.removeClass&&(Ka(a,b,c.removeClass),c.removeClass=null)}}function ha(a){a=a||{};if(!a.$$prepared){var b=a.domOperation||
L;a.domOperation=function(){a.$$domOperationFired=!0;b();b=L};a.$$prepared=!0}return a}function da(a,b){xa(a,b);ya(a,b)}function xa(a,b){b.from&&(a.css(b.from),b.from=null)}function ya(a,b){b.to&&(a.css(b.to),b.to=null)}function Q(a,b,c){var d=(b.addClass||"")+" "+(c.addClass||""),g=(b.removeClass||"")+" "+(c.removeClass||"");a=La(a.attr("class"),d,g);c.preparationClasses&&(b.preparationClasses=X(c.preparationClasses,b.preparationClasses),delete c.preparationClasses);d=b.domOperation!==L?b.domOperation:
null;za(b,c);d&&(b.domOperation=d);b.addClass=a.addClass?a.addClass:null;b.removeClass=a.removeClass?a.removeClass:null;return b}function La(a,b,c){function d(a){M(a)&&(a=a.split(" "));var b={};q(a,function(a){a.length&&(b[a]=!0)});return b}var g={};a=d(a);b=d(b);q(b,function(a,b){g[b]=1});c=d(c);q(c,function(a,b){g[b]=1===g[b]?null:-1});var u={addClass:"",removeClass:""};q(g,function(b,c){var g,d;1===b?(g="addClass",d=!a[c]):-1===b&&(g="removeClass",d=a[c]);d&&(u[g].length&&(u[g]+=" "),u[g]+=c)});
return u}function H(a){return a instanceof t.element?a[0]:a}function Ma(a,b,c){var d="";b&&(d=S(b,"ng-",!0));c.addClass&&(d=X(d,S(c.addClass,"-add")));c.removeClass&&(d=X(d,S(c.removeClass,"-remove")));d.length&&(c.preparationClasses=d,a.addClass(d))}function ia(a,b){var c=b?"-"+b+"s":"";ea(a,[fa,c]);return[fa,c]}function ma(a,b){var c=b?"paused":"",d=T+"PlayState";ea(a,[d,c]);return[d,c]}function ea(a,b){a.style[b[0]]=b[1]}function X(a,b){return a?b?a+" "+b:a:b}function Aa(a,b,c){var d=Object.create(null),
g=a.getComputedStyle(b)||{};q(c,function(a,b){var c=g[a];if(c){var f=c.charAt(0);if("-"===f||"+"===f||0<=f)c=Na(c);0===c&&(c=null);d[b]=c}});return d}function Na(a){var b=0;a=a.split(/\s*,\s*/);q(a,function(a){"s"==a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));a=parseFloat(a)||0;b=b?Math.max(a,b):a});return b}function na(a){return 0===a||null!=a}function Ba(a,b){var c=N,d=a+"s";b?c+="Duration":d+=" linear all";return[c,d]}function Ca(){var a=Object.create(null);return{flush:function(){a=Object.create(null)},
count:function(b){return(b=a[b])?b.total:0},get:function(b){return(b=a[b])&&b.value},put:function(b,c){a[b]?a[b].total++:a[b]={total:1,value:c}}}}function Da(a,b,c){q(c,function(c){a[c]=U(a[c])?a[c]:b.style.getPropertyValue(c)})}var L=t.noop,za=t.extend,J=t.element,q=t.forEach,W=t.isArray,M=t.isString,oa=t.isObject,pa=t.isUndefined,U=t.isDefined,Ea=t.isFunction,qa=t.isElement,N,ra,T,sa;pa(G.ontransitionend)&&U(G.onwebkittransitionend)?(N="WebkitTransition",ra="webkitTransitionEnd transitionend"):
(N="transition",ra="transitionend");pa(G.onanimationend)&&U(G.onwebkitanimationend)?(T="WebkitAnimation",sa="webkitAnimationEnd animationend"):(T="animation",sa="animationend");var ja=T+"Delay",ta=T+"Duration",fa=N+"Delay";G=N+"Duration";var Oa={transitionDuration:G,transitionDelay:fa,transitionProperty:N+"Property",animationDuration:ta,animationDelay:ja,animationIterationCount:T+"IterationCount"},Pa={transitionDuration:G,transitionDelay:fa,animationDuration:ta,animationDelay:ja};t.module("ngAnimate",
[]).directive("ngAnimateChildren",[function(){return function(a,b,c){a=c.ngAnimateChildren;t.isString(a)&&0===a.length?b.data("$$ngAnimateChildren",!0):c.$observe("ngAnimateChildren",function(a){b.data("$$ngAnimateChildren","on"===a||"true"===a)})}}]).factory("$$rAFScheduler",["$$rAF",function(a){function b(a){d=d.concat(a);c()}function c(){if(d.length){for(var b=d.shift(),z=0;z<b.length;z++)b[z]();g||a(function(){g||c()})}}var d,g;d=b.queue=[];b.waitUntilQuiet=function(b){g&&g();g=a(function(){g=
null;b();c()})};return b}]).factory("$$AnimateRunner",["$q","$sniffer","$$animateAsyncRun",function(a,b,c){function d(a){this.setHost(a);this._doneCallbacks=[];this._runInAnimationFrame=c();this._state=0}d.chain=function(a,b){function c(){if(d===a.length)b(!0);else a[d](function(a){!1===a?b(!1):(d++,c())})}var d=0;c()};d.all=function(a,b){function c(z){f=f&&z;++d===a.length&&b(f)}var d=0,f=!0;q(a,function(a){a.done(c)})};d.prototype={setHost:function(a){this.host=a||{}},done:function(a){2===this._state?
a():this._doneCallbacks.push(a)},progress:L,getPromise:function(){if(!this.promise){var b=this;this.promise=a(function(a,c){b.done(function(b){!1===b?c():a()})})}return this.promise},then:function(a,b){return this.getPromise().then(a,b)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)},pause:function(){this.host.pause&&this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end();
this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel();this._resolve(!1)},complete:function(a){var b=this;0===b._state&&(b._state=1,b._runInAnimationFrame(function(){b._resolve(a)}))},_resolve:function(a){2!==this._state&&(q(this._doneCallbacks,function(b){b(a)}),this._doneCallbacks.length=0,this._state=2)}};return d}]).factory("$$animateAsyncRun",["$$rAF",function(a){function b(b){c.push(b);1<c.length||a(function(){for(var a=0;a<c.length;a++)c[a]();c=[]})}var c=[];return function(){var a=
!1;b(function(){a=!0});return function(c){a?c():b(c)}}}]).provider("$$animateQueue",["$animateProvider",function(a){function b(a,b,c,q){return d[a].some(function(a){return a(b,c,q)})}function c(a,b){a=a||{};var c=0<(a.addClass||"").length,d=0<(a.removeClass||"").length;return b?c&&d:c||d}var d=this.rules={skip:[],cancel:[],join:[]};d.join.push(function(a,b,d){return!b.structural&&c(b.options)});d.skip.push(function(a,b,d){return!b.structural&&!c(b.options)});d.skip.push(function(a,b,c){return"leave"==
c.event&&b.structural});d.skip.push(function(a,b,c){return c.structural&&2===c.state&&!b.structural});d.cancel.push(function(a,b,c){return c.structural&&b.structural});d.cancel.push(function(a,b,c){return 2===c.state&&b.structural});d.cancel.push(function(a,b,c){a=b.options;c=c.options;return a.addClass&&a.addClass===c.removeClass||a.removeClass&&a.removeClass===c.addClass});this.$get=["$$rAF","$rootScope","$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite",
"$$forceReflow",function(d,u,z,x,f,k,$,t,h,I){function A(){var a=!1;return function(b){a?b():u.$$postDigest(function(){a=!0;b()})}}function Y(a,b){var c=H(a),e=[],d=v[b];d&&q(d,function(a){a.node.contains(c)&&e.push(a.callback)});return e}function E(a,e,l){function n(b,c,e,v){z(function(){var b=Y(a,c);b.length&&d(function(){q(b,function(b){b(a,e,v)})})});b.progress(c,e,v)}function v(b){var c=a,e=l;e.preparationClasses&&(c.removeClass(e.preparationClasses),e.preparationClasses=null);e.activeClasses&&
(c.removeClass(e.activeClasses),e.activeClasses=null);Ga(a,l);da(a,l);l.domOperation();f.complete(!b)}var s,C;if(a=Ia(a))s=H(a),C=a.parent();l=ha(l);var f=new $,z=A();W(l.addClass)&&(l.addClass=l.addClass.join(" "));l.addClass&&!M(l.addClass)&&(l.addClass=null);W(l.removeClass)&&(l.removeClass=l.removeClass.join(" "));l.removeClass&&!M(l.removeClass)&&(l.removeClass=null);l.from&&!oa(l.from)&&(l.from=null);l.to&&!oa(l.to)&&(l.to=null);if(!s)return v(),f;var h=[s.className,l.addClass,l.removeClass].join(" ");
if(!Qa(h))return v(),f;var E=0<=["enter","move","leave"].indexOf(e),x=!F||D.get(s),h=!x&&m.get(s)||{},I=!!h.state;x||I&&1==h.state||(x=!ka(a,C,e));if(x)return v(),f;E&&w(a);C={structural:E,element:a,event:e,close:v,options:l,runner:f};if(I){if(b("skip",a,C,h)){if(2===h.state)return v(),f;Q(a,h.options,l);return h.runner}if(b("cancel",a,C,h))if(2===h.state)h.runner.end();else if(h.structural)h.close();else return Q(a,h.options,C.options),h.runner;else if(b("join",a,C,h))if(2===h.state)Q(a,l,{});else return Ma(a,
E?e:null,l),e=C.event=h.event,l=Q(a,h.options,C.options),h.runner}else Q(a,l,{});(I=C.structural)||(I="animate"===C.event&&0<Object.keys(C.options.to||{}).length||c(C.options));if(!I)return v(),y(a),f;var t=(h.counter||0)+1;C.counter=t;r(a,1,C);u.$$postDigest(function(){var b=m.get(s),d=!b,b=b||{},h=0<(a.parent()||[]).length&&("animate"===b.event||b.structural||c(b.options));if(d||b.counter!==t||!h){d&&(Ga(a,l),da(a,l));if(d||E&&b.event!==e)l.domOperation(),f.end();h||y(a)}else e=!b.structural&&c(b.options,
!0)?"setClass":b.event,r(a,2),b=k(a,e,b.options),b.done(function(b){v(!b);(b=m.get(s))&&b.counter===t&&y(H(a));n(f,e,"close",{})}),f.setHost(b),n(f,e,"start",{})});return f}function w(a){a=H(a).querySelectorAll("[data-ng-animate]");q(a,function(a){var b=parseInt(a.getAttribute("data-ng-animate")),c=m.get(a);switch(b){case 2:c.runner.end();case 1:c&&m.remove(a)}})}function y(a){a=H(a);a.removeAttribute("data-ng-animate");m.remove(a)}function e(a,b){return H(a)===H(b)}function ka(a,b,c){c=J(x[0].body);
var d=e(a,c)||"HTML"===a[0].nodeName,v=e(a,z),n=!1,y;for((a=a.data("$ngAnimatePin"))&&(b=a);b&&b.length;){v||(v=e(b,z));a=b[0];if(1!==a.nodeType)break;var r=m.get(a)||{};n||(n=r.structural||D.get(a));if(pa(y)||!0===y)a=b.data("$$ngAnimateChildren"),U(a)&&(y=a);if(n&&!1===y)break;v||(v=e(b,z),v||(a=b.data("$ngAnimatePin"))&&(b=a));d||(d=e(b,c));b=b.parent()}return(!n||y)&&v&&d}function r(a,b,c){c=c||{};c.state=b;a=H(a);a.setAttribute("data-ng-animate",b);c=(b=m.get(a))?za(b,c):c;m.put(a,c)}var m=new f,
D=new f,F=null,s=u.$watch(function(){return 0===t.totalPendingRequests},function(a){a&&(s(),u.$$postDigest(function(){u.$$postDigest(function(){null===F&&(F=!0)})}))}),v={},n=a.classNameFilter(),Qa=n?function(a){return n.test(a)}:function(){return!0},Ga=P(h);return{on:function(a,b,c){b=la(b);v[a]=v[a]||[];v[a].push({node:b,callback:c})},off:function(a,b,c){function e(a,b,c){var d=la(b);return a.filter(function(a){return!(a.node===d&&(!c||a.callback===c))})}var d=v[a];d&&(v[a]=1===arguments.length?
null:e(d,b,c))},pin:function(a,b){va(qa(a),"element","not an element");va(qa(b),"parentElement","not an element");a.data("$ngAnimatePin",b)},push:function(a,b,c,e){c=c||{};c.domOperation=e;return E(a,b,c)},enabled:function(a,b){var c=arguments.length;if(0===c)b=!!F;else if(qa(a)){var e=H(a),d=D.get(e);1===c?b=!d:(b=!!b)?d&&D.remove(e):D.put(e,!0)}else b=F=!!a;return b}}}]}]).provider("$$animation",["$animateProvider",function(a){function b(a){return a.data("$$animationRunner")}var c=this.drivers=
[];this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(a,g,u,z,x,f){function k(a){function b(a){if(a.processed)return a;a.processed=!0;var e=a.domNode,d=e.parentNode;f.put(e,a);for(var r;d;){if(r=f.get(d)){r.processed||(r=b(r));break}d=d.parentNode}(r||c).children.push(a);return a}var c={children:[]},d,f=new x;for(d=0;d<a.length;d++){var g=a[d];f.put(g.domNode,a[d]={domNode:g.domNode,fn:g.fn,children:[]})}for(d=0;d<a.length;d++)b(a[d]);return function(a){var b=
[],c=[],d;for(d=0;d<a.children.length;d++)c.push(a.children[d]);a=c.length;var m=0,f=[];for(d=0;d<c.length;d++){var g=c[d];0>=a&&(a=m,m=0,b.push(f),f=[]);f.push(g.fn);g.children.forEach(function(a){m++;c.push(a)});a--}f.length&&b.push(f);return b}(c)}var $=[],t=P(a);return function(h,x,A){function Y(a){a=a.hasAttribute("ng-animate-ref")?[a]:a.querySelectorAll("[ng-animate-ref]");var b=[];q(a,function(a){var c=a.getAttribute("ng-animate-ref");c&&c.length&&b.push(a)});return b}function E(a){var b=[],
c={};q(a,function(a,e){var d=H(a.element),v=0<=["enter","move"].indexOf(a.event),d=a.structural?Y(d):[];if(d.length){var m=v?"to":"from";q(d,function(a){var b=a.getAttribute("ng-animate-ref");c[b]=c[b]||{};c[b][m]={animationID:e,element:J(a)}})}else b.push(a)});var e={},d={};q(c,function(c,m){var f=c.from,y=c.to;if(f&&y){var g=a[f.animationID],r=a[y.animationID],s=f.animationID.toString();if(!d[s]){var h=d[s]={structural:!0,beforeStart:function(){g.beforeStart();r.beforeStart()},close:function(){g.close();
r.close()},classes:w(g.classes,r.classes),from:g,to:r,anchors:[]};h.classes.length?b.push(h):(b.push(g),b.push(r))}d[s].anchors.push({out:f.element,"in":y.element})}else f=f?f.animationID:y.animationID,y=f.toString(),e[y]||(e[y]=!0,b.push(a[f]))});return b}function w(a,b){a=a.split(" ");b=b.split(" ");for(var c=[],e=0;e<a.length;e++){var d=a[e];if("ng-"!==d.substring(0,3))for(var m=0;m<b.length;m++)if(d===b[m]){c.push(d);break}}return c.join(" ")}function y(a){for(var b=c.length-1;0<=b;b--){var e=
c[b];if(u.has(e)&&(e=u.get(e)(a)))return e}}function e(a,c){a.from&&a.to?(b(a.from.element).setHost(c),b(a.to.element).setHost(c)):b(a.element).setHost(c)}function ka(){var a=b(h);!a||"leave"===x&&A.$$domOperationFired||a.end()}function r(b){h.off("$destroy",ka);h.removeData("$$animationRunner");t(h,A);da(h,A);A.domOperation();s&&a.removeClass(h,s);h.removeClass("ng-animate");D.complete(!b)}A=ha(A);var m=0<=["enter","move","leave"].indexOf(x),D=new z({end:function(){r()},cancel:function(){r(!0)}});
if(!c.length)return r(),D;h.data("$$animationRunner",D);var F=wa(h.attr("class"),wa(A.addClass,A.removeClass)),s=A.tempClasses;s&&(F+=" "+s,A.tempClasses=null);$.push({element:h,classes:F,event:x,structural:m,options:A,beforeStart:function(){h.addClass("ng-animate");s&&a.addClass(h,s)},close:r});h.on("$destroy",ka);if(1<$.length)return D;g.$$postDigest(function(){var a=[];q($,function(c){b(c.element)?a.push(c):c.close()});$.length=0;var c=E(a),d=[];q(c,function(a){d.push({domNode:H(a.from?a.from.element:
a.element),fn:function(){a.beforeStart();var c,d=a.close;if(b(a.anchors?a.from.element||a.to.element:a.element)){var m=y(a);m&&(c=m.start)}c?(c=c(),c.done(function(a){d(!a)}),e(a,c)):d()}})});f(k(d))});return D}}]}]).provider("$animateCss",["$animateProvider",function(a){var b=Ca(),c=Ca();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$animate",function(a,g,u,z,x,f,k,t){function Fa(a,b){var c=a.parentNode;return(c.$$ngAnimateParentKey||(c.$$ngAnimateParentKey=
++E))+"-"+a.getAttribute("class")+"-"+b}function h(f,e,h,r){var m;0<b.count(h)&&(m=c.get(h),m||(e=S(e,"-stagger"),g.addClass(f,e),m=Aa(a,f,r),m.animationDuration=Math.max(m.animationDuration,0),m.transitionDuration=Math.max(m.transitionDuration,0),g.removeClass(f,e),c.put(h,m)));return m||{}}function I(a){w.push(a);k.waitUntilQuiet(function(){b.flush();c.flush();for(var a=x(),d=0;d<w.length;d++)w[d](a);w.length=0})}function A(c,e,f){e=b.get(f);e||(e=Aa(a,c,Oa),"infinite"===e.animationIterationCount&&
(e.animationIterationCount=1));b.put(f,e);c=e;f=c.animationDelay;e=c.transitionDelay;c.maxDelay=f&&e?Math.max(f,e):f||e;c.maxDuration=Math.max(c.animationDuration*c.animationIterationCount,c.transitionDuration);return c}var Y=P(g),E=0,w=[];return function(a,c){function d(){m()}function r(){m(!0)}function m(b){if(!(E||ua&&l)){E=!0;l=!1;c.$$skipPreparationClasses||g.removeClass(a,Z);g.removeClass(a,X);ma(n,!1);ia(n,!1);q(w,function(a){n.style[a[0]]=""});Y(a,c);da(a,c);Object.keys(v).length&&q(v,function(a,
b){a?n.style.setProperty(b,a):n.style.removeProperty(b)});if(c.onDone)c.onDone();G&&G.complete(!b)}}function D(a){p.blockTransition&&ia(n,a);p.blockKeyframeAnimation&&ma(n,!!a)}function F(){G=new u({end:d,cancel:r});I(L);m();return{$$willAnimate:!1,start:function(){return G},end:d}}function s(){function b(){if(!E){D(!1);q(w,function(a){n.style[a[0]]=a[1]});Y(a,c);g.addClass(a,X);if(p.recalculateTimingStyles){ga=n.className+" "+Z;aa=Fa(n,ga);B=A(n,ga,aa);V=B.maxDelay;C=Math.max(V,0);K=B.maxDuration;
if(0===K){m();return}p.hasTransitions=0<B.transitionDuration;p.hasAnimations=0<B.animationDuration}p.applyAnimationDelay&&(V="boolean"!==typeof c.delay&&na(c.delay)?parseFloat(c.delay):V,C=Math.max(V,0),B.animationDelay=V,ca=[ja,V+"s"],w.push(ca),n.style[ca[0]]=ca[1]);M=1E3*C;P=1E3*K;if(c.easing){var s,k=c.easing;p.hasTransitions&&(s=N+"TimingFunction",w.push([s,k]),n.style[s]=k);p.hasAnimations&&(s=T+"TimingFunction",w.push([s,k]),n.style[s]=k)}B.transitionDuration&&h.push(ra);B.animationDuration&&
h.push(sa);r=Date.now();var l=M+1.5*P;s=r+l;var k=a.data("$$animateCss")||[],x=!0;if(k.length){var F=k[0];(x=s>F.expectedEndTime)?z.cancel(F.timer):k.push(m)}x&&(l=z(d,l,!1),k[0]={timer:l,expectedEndTime:s},k.push(m),a.data("$$animateCss",k));a.on(h.join(" "),f);c.to&&(c.cleanupStyles&&Da(v,n,Object.keys(c.to)),ya(a,c))}}function d(){var b=a.data("$$animateCss");if(b){for(var c=1;c<b.length;c++)b[c]();a.removeData("$$animateCss")}}function f(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||
b.timeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-r,0)>=M&&b>=K&&(ua=!0,m())}if(!E)if(n.parentNode){var r,h=[],s=function(a){if(ua)l&&a&&(l=!1,m());else if(l=!a,B.animationDuration)if(a=ma(n,l),l)w.push(a);else{var b=w,c=b.indexOf(a);0<=a&&b.splice(c,1)}},k=0<U&&(B.transitionDuration&&0===R.transitionDuration||B.animationDuration&&0===R.animationDuration)&&Math.max(R.animationDelay,R.transitionDelay);k?z(b,Math.floor(k*U*1E3),!1):b();J.resume=function(){s(!0)};J.pause=function(){s(!1)}}else m()}
var v={},n=H(a);if(!n||!n.parentNode||!t.enabled())return F();c=ha(c);var w=[],x=a.attr("class"),k=Ha(c),E,l,ua,G,J,C,M,K,P;if(0===c.duration||!f.animations&&!f.transitions)return F();var ba=c.event&&W(c.event)?c.event.join(" "):c.event,Q="",O="";ba&&c.structural?Q=S(ba,"ng-",!0):ba&&(Q=ba);c.addClass&&(O+=S(c.addClass,"-add"));c.removeClass&&(O.length&&(O+=" "),O+=S(c.removeClass,"-remove"));c.applyClassesEarly&&O.length&&Y(a,c);var Z=[Q,O].join(" ").trim(),ga=x+" "+Z,X=S(Z,"-active"),x=k.to&&0<
Object.keys(k.to).length;if(!(0<(c.keyframeStyle||"").length||x||Z))return F();var aa,R;0<c.stagger?(k=parseFloat(c.stagger),R={transitionDelay:k,animationDelay:k,transitionDuration:0,animationDuration:0}):(aa=Fa(n,ga),R=h(n,Z,aa,Pa));c.$$skipPreparationClasses||g.addClass(a,Z);c.transitionStyle&&(k=[N,c.transitionStyle],ea(n,k),w.push(k));0<=c.duration&&(k=0<n.style[N].length,k=Ba(c.duration,k),ea(n,k),w.push(k));c.keyframeStyle&&(k=[T,c.keyframeStyle],ea(n,k),w.push(k));var U=R?0<=c.staggerIndex?
c.staggerIndex:b.count(aa):0;(ba=0===U)&&!c.skipBlocking&&ia(n,9999);var B=A(n,ga,aa),V=B.maxDelay;C=Math.max(V,0);K=B.maxDuration;var p={};p.hasTransitions=0<B.transitionDuration;p.hasAnimations=0<B.animationDuration;p.hasTransitionAll=p.hasTransitions&&"all"==B.transitionProperty;p.applyTransitionDuration=x&&(p.hasTransitions&&!p.hasTransitionAll||p.hasAnimations&&!p.hasTransitions);p.applyAnimationDuration=c.duration&&p.hasAnimations;p.applyTransitionDelay=na(c.delay)&&(p.applyTransitionDuration||
p.hasTransitions);p.applyAnimationDelay=na(c.delay)&&p.hasAnimations;p.recalculateTimingStyles=0<O.length;if(p.applyTransitionDuration||p.applyAnimationDuration)K=c.duration?parseFloat(c.duration):K,p.applyTransitionDuration&&(p.hasTransitions=!0,B.transitionDuration=K,k=0<n.style[N+"Property"].length,w.push(Ba(K,k))),p.applyAnimationDuration&&(p.hasAnimations=!0,B.animationDuration=K,w.push([ta,K+"s"]));if(0===K&&!p.recalculateTimingStyles)return F();if(null!=c.delay){var ca=parseFloat(c.delay);
p.applyTransitionDelay&&w.push([fa,ca+"s"]);p.applyAnimationDelay&&w.push([ja,ca+"s"])}null==c.duration&&0<B.transitionDuration&&(p.recalculateTimingStyles=p.recalculateTimingStyles||ba);M=1E3*C;P=1E3*K;c.skipBlocking||(p.blockTransition=0<B.transitionDuration,p.blockKeyframeAnimation=0<B.animationDuration&&0<R.animationDelay&&0===R.animationDuration);c.from&&(c.cleanupStyles&&Da(v,n,Object.keys(c.from)),xa(a,c));p.blockTransition||p.blockKeyframeAnimation?D(K):c.skipBlocking||ia(n,!1);return{$$willAnimate:!0,
end:d,start:function(){if(!E)return J={end:d,cancel:r,resume:null,pause:null},G=new u(J),I(s),G}}}}]}]).provider("$$animateCssDriver",["$$animationProvider",function(a){a.drivers.push("$$animateCssDriver");this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function(a,c,d,g,u,z,x){function f(a){return a.replace(/\bng-\S+\b/g,"")}function k(a,b){M(a)&&(a=a.split(" "));M(b)&&(b=b.split(" "));return a.filter(function(a){return-1===b.indexOf(a)}).join(" ")}
function t(c,h,g){function x(a){var b={},c=H(a).getBoundingClientRect();q(["width","height","top","left"],function(a){var d=c[a];switch(a){case "top":d+=I.scrollTop;break;case "left":d+=I.scrollLeft}b[a]=Math.floor(d)+"px"});return b}function e(){var c=f(g.attr("class")||""),d=k(c,m),c=k(m,c),d=a(r,{to:x(g),addClass:"ng-anchor-in "+d,removeClass:"ng-anchor-out "+c,delay:!0});return d.$$willAnimate?d:null}function z(){r.remove();h.removeClass("ng-animate-shim");g.removeClass("ng-animate-shim")}var r=
J(H(h).cloneNode(!0)),m=f(r.attr("class")||"");h.addClass("ng-animate-shim");g.addClass("ng-animate-shim");r.addClass("ng-anchor");A.append(r);var D;c=function(){var c=a(r,{addClass:"ng-anchor-out",delay:!0,from:x(h)});return c.$$willAnimate?c:null}();if(!c&&(D=e(),!D))return z();var F=c||D;return{start:function(){function a(){c&&c.end()}var b,c=F.start();c.done(function(){c=null;if(!D&&(D=e()))return c=D.start(),c.done(function(){c=null;z();b.complete()}),c;z();b.complete()});return b=new d({end:a,
cancel:a})}}}function G(a,b,c,f){var e=h(a,L),g=h(b,L),k=[];q(f,function(a){(a=t(c,a.out,a["in"]))&&k.push(a)});if(e||g||0!==k.length)return{start:function(){function a(){q(b,function(a){a.end()})}var b=[];e&&b.push(e.start());g&&b.push(g.start());q(k,function(a){b.push(a.start())});var c=new d({end:a,cancel:a});d.all(b,function(a){c.complete(a)});return c}}}function h(c){var d=c.element,f=c.options||{};c.structural&&(f.event=c.event,f.structural=!0,f.applyClassesEarly=!0,"leave"===c.event&&(f.onDone=
f.domOperation));f.preparationClasses&&(f.event=X(f.event,f.preparationClasses));c=a(d,f);return c.$$willAnimate?c:null}if(!u.animations&&!u.transitions)return L;var I=x[0].body;c=H(g);var A=J(c.parentNode&&11===c.parentNode.nodeType||I.contains(c)?c:I);P(z);return function(a){return a.from&&a.to?G(a.from,a.to,a.classes,a.anchors):h(a)}}]}]).provider("$$animateJs",["$animateProvider",function(a){this.$get=["$injector","$$AnimateRunner","$$jqLite",function(b,c,d){function g(c){c=W(c)?c:c.split(" ");
for(var d=[],f={},g=0;g<c.length;g++){var q=c[g],u=a.$$registeredAnimations[q];u&&!f[q]&&(d.push(b.get(u)),f[q]=!0)}return d}var u=P(d);return function(a,b,d,k){function t(){k.domOperation();u(a,k)}function G(a,b,d,f,e){switch(d){case "animate":b=[b,f.from,f.to,e];break;case "setClass":b=[b,A,H,e];break;case "addClass":b=[b,A,e];break;case "removeClass":b=[b,H,e];break;default:b=[b,e]}b.push(f);if(a=a.apply(a,b))if(Ea(a.start)&&(a=a.start()),a instanceof c)a.done(e);else if(Ea(a))return a;return L}
function h(a,b,d,e,f){var g=[];q(e,function(e){var h=e[f];h&&g.push(function(){var e,f,g=!1,k=function(a){g||(g=!0,(f||L)(a),e.complete(!a))};e=new c({end:function(){k()},cancel:function(){k(!0)}});f=G(h,a,b,d,function(a){k(!1===a)});return e})});return g}function I(a,b,d,e,f){var g=h(a,b,d,e,f);if(0===g.length){var k,u;"beforeSetClass"===f?(k=h(a,"removeClass",d,e,"beforeRemoveClass"),u=h(a,"addClass",d,e,"beforeAddClass")):"setClass"===f&&(k=h(a,"removeClass",d,e,"removeClass"),u=h(a,"addClass",
d,e,"addClass"));k&&(g=g.concat(k));u&&(g=g.concat(u))}if(0!==g.length)return function(a){var b=[];g.length&&q(g,function(a){b.push(a())});b.length?c.all(b,a):a();return function(a){q(b,function(b){a?b.cancel():b.end()})}}}3===arguments.length&&oa(d)&&(k=d,d=null);k=ha(k);d||(d=a.attr("class")||"",k.addClass&&(d+=" "+k.addClass),k.removeClass&&(d+=" "+k.removeClass));var A=k.addClass,H=k.removeClass,E=g(d),w,y;if(E.length){var e,J;"leave"==b?(J="leave",e="afterLeave"):(J="before"+b.charAt(0).toUpperCase()+
b.substr(1),e=b);"enter"!==b&&"move"!==b&&(w=I(a,b,k,E,J));y=I(a,b,k,E,e)}if(w||y)return{start:function(){function b(c){f=!0;t();da(a,k);g.complete(c)}var d,e=[];w&&e.push(function(a){d=w(a)});e.length?e.push(function(a){t();a(!0)}):t();y&&e.push(function(a){d=y(a)});var f=!1,g=new c({end:function(){f||((d||L)(void 0),b(void 0))},cancel:function(){f||((d||L)(!0),b(!0))}});c.chain(e,b);return g}}}}]}]).provider("$$animateJsDriver",["$$animationProvider",function(a){a.drivers.push("$$animateJsDriver");
this.$get=["$$animateJs","$$AnimateRunner",function(a,c){function d(c){return a(c.element,c.event,c.classes,c.options)}return function(a){if(a.from&&a.to){var b=d(a.from),t=d(a.to);if(b||t)return{start:function(){function a(){return function(){q(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());t&&d.push(t.start());c.all(d,function(a){g.complete(a)});var g=new c({end:a(),cancel:a()});return g}}}else return d(a)}}]}])})(window,window.angular);

;
/*----------------------------------------separator----------------------------------------*/
var q=null;window.PR_SHOULD_USE_CONTINUATION=!0;
(function(){function L(a){function m(a){var f=a.charCodeAt(0);if(f!==92)return f;var b=a.charAt(1);return(f=r[b])?f:"0"<=b&&b<="7"?parseInt(a.substring(1),8):b==="u"||b==="x"?parseInt(a.substring(2),16):a.charCodeAt(1)}function e(a){if(a<32)return(a<16?"\\x0":"\\x")+a.toString(16);a=String.fromCharCode(a);if(a==="\\"||a==="-"||a==="["||a==="]")a="\\"+a;return a}function h(a){for(var f=a.substring(1,a.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),a=
    [],b=[],o=f[0]==="^",c=o?1:0,i=f.length;c<i;++c){var j=f[c];if(/\\[bdsw]/i.test(j))a.push(j);else{var j=m(j),d;c+2<i&&"-"===f[c+1]?(d=m(f[c+2]),c+=2):d=j;b.push([j,d]);d<65||j>122||(d<65||j>90||b.push([Math.max(65,j)|32,Math.min(d,90)|32]),d<97||j>122||b.push([Math.max(97,j)&-33,Math.min(d,122)&-33]))}}b.sort(function(a,f){return a[0]-f[0]||f[1]-a[1]});f=[];j=[NaN,NaN];for(c=0;c<b.length;++c)i=b[c],i[0]<=j[1]+1?j[1]=Math.max(j[1],i[1]):f.push(j=i);b=["["];o&&b.push("^");b.push.apply(b,a);for(c=0;c<
f.length;++c)i=f[c],b.push(e(i[0])),i[1]>i[0]&&(i[1]+1>i[0]&&b.push("-"),b.push(e(i[1])));b.push("]");return b.join("")}function y(a){for(var f=a.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),b=f.length,d=[],c=0,i=0;c<b;++c){var j=f[c];j==="("?++i:"\\"===j.charAt(0)&&(j=+j.substring(1))&&j<=i&&(d[j]=-1)}for(c=1;c<d.length;++c)-1===d[c]&&(d[c]=++t);for(i=c=0;c<b;++c)j=f[c],j==="("?(++i,d[i]===void 0&&(f[c]="(?:")):"\\"===j.charAt(0)&&
(j=+j.substring(1))&&j<=i&&(f[c]="\\"+d[i]);for(i=c=0;c<b;++c)"^"===f[c]&&"^"!==f[c+1]&&(f[c]="");if(a.ignoreCase&&s)for(c=0;c<b;++c)j=f[c],a=j.charAt(0),j.length>=2&&a==="["?f[c]=h(j):a!=="\\"&&(f[c]=j.replace(/[A-Za-z]/g,function(a){a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return f.join("")}for(var t=0,s=!1,l=!1,p=0,d=a.length;p<d;++p){var g=a[p];if(g.ignoreCase)l=!0;else if(/[a-z]/i.test(g.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))){s=!0;l=!1;break}}for(var r=
{b:8,t:9,n:10,v:11,f:12,r:13},n=[],p=0,d=a.length;p<d;++p){g=a[p];if(g.global||g.multiline)throw Error(""+g);n.push("(?:"+y(g)+")")}return RegExp(n.join("|"),l?"gi":"g")}function M(a){function m(a){switch(a.nodeType){case 1:if(e.test(a.className))break;for(var g=a.firstChild;g;g=g.nextSibling)m(g);g=a.nodeName;if("BR"===g||"LI"===g)h[s]="\n",t[s<<1]=y++,t[s++<<1|1]=a;break;case 3:case 4:g=a.nodeValue,g.length&&(g=p?g.replace(/\r\n?/g,"\n"):g.replace(/[\t\n\r ]+/g," "),h[s]=g,t[s<<1]=y,y+=g.length,
    t[s++<<1|1]=a)}}var e=/(?:^|\s)nocode(?:\s|$)/,h=[],y=0,t=[],s=0,l;a.currentStyle?l=a.currentStyle.whiteSpace:window.getComputedStyle&&(l=document.defaultView.getComputedStyle(a,q).getPropertyValue("white-space"));var p=l&&"pre"===l.substring(0,3);m(a);return{a:h.join("").replace(/\n$/,""),c:t}}function B(a,m,e,h){m&&(a={a:m,d:a},e(a),h.push.apply(h,a.e))}function x(a,m){function e(a){for(var l=a.d,p=[l,"pln"],d=0,g=a.a.match(y)||[],r={},n=0,z=g.length;n<z;++n){var f=g[n],b=r[f],o=void 0,c;if(typeof b===
    "string")c=!1;else{var i=h[f.charAt(0)];if(i)o=f.match(i[1]),b=i[0];else{for(c=0;c<t;++c)if(i=m[c],o=f.match(i[1])){b=i[0];break}o||(b="pln")}if((c=b.length>=5&&"lang-"===b.substring(0,5))&&!(o&&typeof o[1]==="string"))c=!1,b="src";c||(r[f]=b)}i=d;d+=f.length;if(c){c=o[1];var j=f.indexOf(c),k=j+c.length;o[2]&&(k=f.length-o[2].length,j=k-c.length);b=b.substring(5);B(l+i,f.substring(0,j),e,p);B(l+i+j,c,C(b,c),p);B(l+i+k,f.substring(k),e,p)}else p.push(l+i,b)}a.e=p}var h={},y;(function(){for(var e=a.concat(m),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      l=[],p={},d=0,g=e.length;d<g;++d){var r=e[d],n=r[3];if(n)for(var k=n.length;--k>=0;)h[n.charAt(k)]=r;r=r[1];n=""+r;p.hasOwnProperty(n)||(l.push(r),p[n]=q)}l.push(/[\S\s]/);y=L(l)})();var t=m.length;return e}function u(a){var m=[],e=[];a.tripleQuotedStrings?m.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,q,"'\""]):a.multiLineStrings?m.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
    q,"'\"`"]):m.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,q,"\"'"]);a.verbatimStrings&&e.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,q]);var h=a.hashComments;h&&(a.cStyleComments?(h>1?m.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,"#"]):m.push(["com",/^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/,q,"#"]),e.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:[/w-]+)+)@[_2Fw-]+_2F.h|[a-z]\w*)>/,q])):m.push(["com",/^#[^\n\r]*/,
    q,"#"]));a.cStyleComments&&(e.push(["com",/^\/\/[^\n\r]*/,q]),e.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,q]));a.regexLiterals&&e.push(["lang-regex",/^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);(h=a.types)&&e.push(["typ",h]);a=(""+a.keywords).replace(/^ | $/g,
    "");a.length&&e.push(["kwd",RegExp("^(?:"+a.replace(/[\s,]+/g,"|")+")\\b"),q]);m.push(["pln",/^\s+/,q," \r\n\t\xa0"]);e.push(["lit",/^@[$_a-z][\w$@]*/i,q],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,q],["pln",/^[$_a-z][\w$@]*/i,q],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,q,"0123456789"],["pln",/^\\[\S\s]?/,q],["pun",/^.[^\s\w"-$'./@\\`]*/,q]);return x(m,e)}function D(a,m){function e(a){switch(a.nodeType){case 1:if(k.test(a.className))break;if("BR"===a.nodeName)h(a),
a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)e(a);break;case 3:case 4:if(p){var b=a.nodeValue,d=b.match(t);if(d){var c=b.substring(0,d.index);a.nodeValue=c;(b=b.substring(d.index+d[0].length))&&a.parentNode.insertBefore(s.createTextNode(b),a.nextSibling);h(a);c||a.parentNode.removeChild(a)}}}}function h(a){function b(a,d){var e=d?a.cloneNode(!1):a,f=a.parentNode;if(f){var f=b(f,1),g=a.nextSibling;f.appendChild(e);for(var h=g;h;h=g)g=h.nextSibling,f.appendChild(h)}return e}
    for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var a=b(a.nextSibling,0),e;(e=a.parentNode)&&e.nodeType===1;)a=e;d.push(a)}var k=/(?:^|\s)nocode(?:\s|$)/,t=/\r\n?|\n/,s=a.ownerDocument,l;a.currentStyle?l=a.currentStyle.whiteSpace:window.getComputedStyle&&(l=s.defaultView.getComputedStyle(a,q).getPropertyValue("white-space"));var p=l&&"pre"===l.substring(0,3);for(l=s.createElement("LI");a.firstChild;)l.appendChild(a.firstChild);for(var d=[l],g=0;g<d.length;++g)e(d[g]);m===(m|0)&&d[0].setAttribute("value",
    m);var r=s.createElement("OL");r.className="linenums";for(var n=Math.max(0,m-1|0)||0,g=0,z=d.length;g<z;++g)l=d[g],l.className="L"+(g+n)%10,l.firstChild||l.appendChild(s.createTextNode("\xa0")),r.appendChild(l);a.appendChild(r)}function k(a,m){for(var e=m.length;--e>=0;){var h=m[e];A.hasOwnProperty(h)?window.console&&console.warn("cannot override language handler %s",h):A[h]=a}}function C(a,m){if(!a||!A.hasOwnProperty(a))a=/^\s*</.test(m)?"default-markup":"default-code";return A[a]}function E(a){var m=
    a.g;try{var e=M(a.h),h=e.a;a.a=h;a.c=e.c;a.d=0;C(m,h)(a);var k=/\bMSIE\b/.test(navigator.userAgent),m=/\n/g,t=a.a,s=t.length,e=0,l=a.c,p=l.length,h=0,d=a.e,g=d.length,a=0;d[g]=s;var r,n;for(n=r=0;n<g;)d[n]!==d[n+2]?(d[r++]=d[n++],d[r++]=d[n++]):n+=2;g=r;for(n=r=0;n<g;){for(var z=d[n],f=d[n+1],b=n+2;b+2<=g&&d[b+1]===f;)b+=2;d[r++]=z;d[r++]=f;n=b}for(d.length=r;h<p;){var o=l[h+2]||s,c=d[a+2]||s,b=Math.min(o,c),i=l[h+1],j;if(i.nodeType!==1&&(j=t.substring(e,b))){k&&(j=j.replace(m,"\r"));i.nodeValue=
    j;var u=i.ownerDocument,v=u.createElement("SPAN");v.className=d[a+1];var x=i.parentNode;x.replaceChild(v,i);v.appendChild(i);e<o&&(l[h+1]=i=u.createTextNode(t.substring(b,o)),x.insertBefore(i,v.nextSibling))}e=b;e>=o&&(h+=2);e>=c&&(a+=2)}}catch(w){"console"in window&&console.log(w&&w.stack?w.stack:w)}}var v=["break,continue,do,else,for,if,return,while"],w=[[v,"auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
        "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],F=[w,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],G=[w,"abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],
    H=[G,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],w=[w,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],I=[v,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
    J=[v,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],v=[v,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],K=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,N=/\S/,O=u({keywords:[F,H,w,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END"+
    I,J,v],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),A={};k(O,["default-code"]);k(x([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),
    ["default-markup","htm","html","mxml","xhtml","xml","xsl"]);k(x([["pln",/^\s+/,q," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,q,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",
    /^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]);k(x([],[["atv",/^[\S\s]+/]]),["uq.val"]);k(u({keywords:F,hashComments:!0,cStyleComments:!0,types:K}),["c","cc","cpp","cxx","cyc","m"]);k(u({keywords:"null,true,false"}),["json"]);k(u({keywords:H,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:K}),["cs"]);k(u({keywords:G,cStyleComments:!0}),["java"]);k(u({keywords:v,hashComments:!0,multiLineStrings:!0}),["bsh","csh","sh"]);k(u({keywords:I,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),
    ["cv","py"]);k(u({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["perl","pl","pm"]);k(u({keywords:J,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb"]);k(u({keywords:w,cStyleComments:!0,regexLiterals:!0}),["js"]);k(u({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
    hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]);k(x([],[["str",/^[\S\s]+/]]),["regex"]);window.prettyPrintOne=function(a,m,e){var h=document.createElement("PRE");h.innerHTML=a;e&&D(h,e);E({g:m,i:e,h:h});return h.innerHTML};window.prettyPrint=function(a){function m(){for(var e=window.PR_SHOULD_USE_CONTINUATION?l.now()+250:Infinity;p<h.length&&l.now()<e;p++){var n=h[p],k=n.className;if(k.indexOf("prettyprint")>=0){var k=k.match(g),f,b;if(b=
        !k){b=n;for(var o=void 0,c=b.firstChild;c;c=c.nextSibling)var i=c.nodeType,o=i===1?o?b:c:i===3?N.test(c.nodeValue)?b:o:o;b=(f=o===b?void 0:o)&&"CODE"===f.tagName}b&&(k=f.className.match(g));k&&(k=k[1]);b=!1;for(o=n.parentNode;o;o=o.parentNode)if((o.tagName==="pre"||o.tagName==="code"||o.tagName==="xmp")&&o.className&&o.className.indexOf("prettyprint")>=0){b=!0;break}b||((b=(b=n.className.match(/\blinenums\b(?::(\d+))?/))?b[1]&&b[1].length?+b[1]:!0:!1)&&D(n,b),d={g:k,h:n,i:b},E(d))}}p<h.length?setTimeout(m,
    250):a&&a()}for(var e=[document.getElementsByTagName("pre"),document.getElementsByTagName("code"),document.getElementsByTagName("xmp")],h=[],k=0;k<e.length;++k)for(var t=0,s=e[k].length;t<s;++t)h.push(e[k][t]);var e=q,l=Date;l.now||(l={now:function(){return+new Date}});var p=0,d,g=/\blang(?:uage)?-([\w.]+)(?!\S)/;m()};window.PR={createSimpleLexer:x,registerLangHandler:k,sourceDecorator:u,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",
    PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ"}})();;
/*----------------------------------------separator----------------------------------------*/
;(function () {

	var block = {
		newline: /^\n+/,
		code: /^( {4}[^\n]+\n*)+/,
		fences: noop,
		hr: /^( *[-*_]){3,} *(?:\n+|$)/,
		heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
		nptable: noop,
		lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
		blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
		list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
		html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
		def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
		table: noop,
		paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
		text: /^[^\n]+/
	};
	block.bullet = /(?:[*+-]|\d+\.)/;
	block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
	block.item = replace(block.item, 'gm')
	(/bull/g, block.bullet)();
	block.list = replace(block.list)
	(/bull/g, block.bullet)
	('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
	('def', '\\n+(?=' + block.def.source + ')')
	();
	block.blockquote = replace(block.blockquote)
	('def', block.def)
	();
	block._tag = '(?!(?:'
		+ 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
		+ '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
		+ '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';
	block.html = replace(block.html)
	('comment', /<!--[\s\S]*?-->/)
	('closed', /<(tag)[\s\S]+?<\/\1>/)
	('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
	(/tag/g, block._tag)
	();
	block.paragraph = replace(block.paragraph)
	('hr', block.hr)
	('heading', block.heading)
	('lheading', block.lheading)
	('blockquote', block.blockquote)
	('tag', '<' + block._tag)
	('def', block.def)
	();

	block.normal = merge({}, block);

	block.gfm = merge({}, block.normal, {
		fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
		paragraph: /^/,
		heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
	});
	block.gfm.paragraph = replace(block.paragraph)
	('(?!', '(?!'
		+ block.gfm.fences.source.replace('\\1', '\\2') + '|'
		+ block.list.source.replace('\\1', '\\3') + '|')
	();

	block.tables = merge({}, block.gfm, {
		nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
		table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
	});

	function Lexer(options) {
		this.tokens = [];
		this.tokens.links = {};
		this.options = options || marked.defaults;
		this.rules = block.normal;
		if (this.options.gfm) {
			if (this.options.tables) {
				this.rules = block.tables;
			} else {
				this.rules = block.gfm;
			}
		}
	}

	Lexer.rules = block;

	Lexer.lex = function (src, options) {
		var lexer = new Lexer(options);
		return lexer.lex(src);
	};

	Lexer.prototype.lex = function (src) {
		src = src
			.replace(/\r\n|\r/g, '\n')
			.replace(/\t/g, '    ')
			.replace(/\u00a0/g, ' ')
			.replace(/\u2424/g, '\n');
		return this.token(src, true);
	};

	Lexer.prototype.token = function (src, top, bq) {
		var src = src.replace(/^ +$/gm, ''), next, loose, cap, bull, b, item, space, i, l;
		while (src) {
			// newline
			if (cap = this.rules.newline.exec(src)) {
				src = src.substring(cap[0].length);
				if (cap[0].length > 1) {
					this.tokens.push({
						type: 'space'
					});
				}
			}
			// code
			if (cap = this.rules.code.exec(src)) {
				src = src.substring(cap[0].length);
				cap = cap[0].replace(/^ {4}/gm, '');
				this.tokens.push({
					type: 'code',
					text: !this.options.pedantic
						? cap.replace(/\n+$/, '')
						: cap
				});
				continue;
			}
			// fences (gfm)
			if (cap = this.rules.fences.exec(src)) {
				src = src.substring(cap[0].length);
				this.tokens.push({
					type: 'code',
					lang: cap[2],
					text: cap[3] || ''
				});
				continue;
			}
			// heading
			if (cap = this.rules.heading.exec(src)) {
				src = src.substring(cap[0].length);
				this.tokens.push({
					type: 'heading',
					depth: cap[1].length,
					text: cap[2]
				});
				continue;
			}
			// table no leading pipe (gfm)
			if (top && (cap = this.rules.nptable.exec(src))) {
				src = src.substring(cap[0].length);
				item = {
					type: 'table',
					header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
					align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
					cells: cap[3].replace(/\n$/, '').split('\n')
				};
				for (i = 0; i < item.align.length; i++) {
					if (/^ *-+: *$/.test(item.align[i])) {
						item.align[i] = 'right';
					} else if (/^ *:-+: *$/.test(item.align[i])) {
						item.align[i] = 'center';
					} else if (/^ *:-+ *$/.test(item.align[i])) {
						item.align[i] = 'left';
					} else {
						item.align[i] = null;
					}
				}
				for (i = 0; i < item.cells.length; i++) {
					item.cells[i] = item.cells[i].split(/ *\| */);
				}
				this.tokens.push(item);
				continue;
			}
			// lheading
			if (cap = this.rules.lheading.exec(src)) {
				src = src.substring(cap[0].length);
				this.tokens.push({
					type: 'heading',
					depth: cap[2] === '=' ? 1 : 2,
					text: cap[1]
				});
				continue;
			}
			// hr
			if (cap = this.rules.hr.exec(src)) {
				src = src.substring(cap[0].length);
				this.tokens.push({
					type: 'hr'
				});
				continue;
			}
			// blockquote
			if (cap = this.rules.blockquote.exec(src)) {
				src = src.substring(cap[0].length);
				this.tokens.push({
					type: 'blockquote_start'
				});
				cap = cap[0].replace(/^ *> ?/gm, '');
				// Pass `top` to keep the current
				// "toplevel" state. This is exactly
				// how markdown.pl works.
				this.token(cap, top, true);
				this.tokens.push({
					type: 'blockquote_end'
				});
				continue;
			}
			// list
			if (cap = this.rules.list.exec(src)) {
				src = src.substring(cap[0].length);
				bull = cap[2];
				this.tokens.push({
					type: 'list_start',
					ordered: bull.length > 1
				});
				// Get each top-level item.
				cap = cap[0].match(this.rules.item);
				next = false;
				l = cap.length;
				i = 0;
				for (; i < l; i++) {
					item = cap[i];
					// Remove the list item's bullet
					// so it is seen as the next token.
					space = item.length;
					item = item.replace(/^ *([*+-]|\d+\.) +/, '');
					// Outdent whatever the
					// list item contains. Hacky.
					if (~item.indexOf('\n ')) {
						space -= item.length;
						item = !this.options.pedantic
							? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
							: item.replace(/^ {1,4}/gm, '');
					}
					// Determine whether the next list item belongs here.
					// Backpedal if it does not belong in this list.
					if (this.options.smartLists && i !== l - 1) {
						b = block.bullet.exec(cap[i + 1])[0];
						if (bull !== b && !(bull.length > 1 && b.length > 1)) {
							src = cap.slice(i + 1).join('\n') + src;
							i = l - 1;
						}
					}
					// Determine whether item is loose or not.
					// Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
					// for discount behavior.
					loose = next || /\n\n(?!\s*$)/.test(item);
					if (i !== l - 1) {
						next = item.charAt(item.length - 1) === '\n';
						if (!loose) loose = next;
					}
					this.tokens.push({
						type: loose
							? 'loose_item_start'
							: 'list_item_start'
					});
					// Recurse.
					this.token(item, false, bq);
					this.tokens.push({
						type: 'list_item_end'
					});
				}
				this.tokens.push({
					type: 'list_end'
				});
				continue;
			}
			// html
			if (cap = this.rules.html.exec(src)) {
				src = src.substring(cap[0].length);
				this.tokens.push({
					type: this.options.sanitize
						? 'paragraph'
						: 'html',
					pre: !this.options.sanitizer
					&& (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
					text: cap[0]
				});
				continue;
			}
			// def
			if ((!bq && top) && (cap = this.rules.def.exec(src))) {
				src = src.substring(cap[0].length);
				this.tokens.links[cap[1].toLowerCase()] = {
					href: cap[2],
					title: cap[3]
				};
				continue;
			}
			// table (gfm)
			if (top && (cap = this.rules.table.exec(src))) {
				src = src.substring(cap[0].length);
				item = {
					type: 'table',
					header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
					align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
					cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
				};
				for (i = 0; i < item.align.length; i++) {
					if (/^ *-+: *$/.test(item.align[i])) {
						item.align[i] = 'right';
					} else if (/^ *:-+: *$/.test(item.align[i])) {
						item.align[i] = 'center';
					} else if (/^ *:-+ *$/.test(item.align[i])) {
						item.align[i] = 'left';
					} else {
						item.align[i] = null;
					}
				}
				for (i = 0; i < item.cells.length; i++) {
					item.cells[i] = item.cells[i]
						.replace(/^ *\| *| *\| *$/g, '')
						.split(/ *\| */);
				}
				this.tokens.push(item);
				continue;
			}
			// top-level paragraph
			if (top && (cap = this.rules.paragraph.exec(src))) {
				src = src.substring(cap[0].length);
				this.tokens.push({
					type: 'paragraph',
					text: cap[1].charAt(cap[1].length - 1) === '\n'
						? cap[1].slice(0, -1)
						: cap[1]
				});
				continue;
			}
			// text
			if (cap = this.rules.text.exec(src)) {
				// Top-level should never reach here.
				src = src.substring(cap[0].length);
				this.tokens.push({
					type: 'text',
					text: cap[0]
				});
				continue;
			}
			if (src) {
				throw new
					Error('Infinite loop on byte: ' + src.charCodeAt(0));
			}
		}
		return this.tokens;
	};

	var inline = {
		escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
		autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
		url: noop,
		tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
		link: /^!?\[(inside)\]\(href\)/,
		reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
		nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
		strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
		em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
		code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
		br: /^ {2,}\n(?!\s*$)/,
		del: noop,
		text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
	};
	inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
	inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;
	inline.link = replace(inline.link)
	('inside', inline._inside)
	('href', inline._href)
	();
	inline.reflink = replace(inline.reflink)
	('inside', inline._inside)
	();

	inline.normal = merge({}, inline);

	inline.pedantic = merge({}, inline.normal, {
		strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
		em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
	});

	inline.gfm = merge({}, inline.normal, {
		escape: replace(inline.escape)('])', '~|])')(),
		url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
		del: /^~~(?=\S)([\s\S]*?\S)~~/,
		text: replace(inline.text)
		(']|', '~]|')
		('|', '|https?://|')
		()
	});

	inline.breaks = merge({}, inline.gfm, {
		br: replace(inline.br)('{2,}', '*')(),
		text: replace(inline.gfm.text)('{2,}', '*')()
	});

	function InlineLexer(links, options) {
		this.options = options || marked.defaults;
		this.links = links;
		this.rules = inline.normal;
		this.renderer = this.options.renderer || new Renderer;
		this.renderer.options = this.options;
		if (!this.links) {
			throw new
				Error('Tokens array requires a `links` property.');
		}
		if (this.options.gfm) {
			if (this.options.breaks) {
				this.rules = inline.breaks;
			} else {
				this.rules = inline.gfm;
			}
		} else if (this.options.pedantic) {
			this.rules = inline.pedantic;
		}
	}

	InlineLexer.rules = inline;

	InlineLexer.output = function (src, links, options) {
		var inline = new InlineLexer(links, options);
		return inline.output(src);
	};

	InlineLexer.prototype.output = function (src) {
		var out = '', link, text, href, cap;
		while (src) {
			// escape
			if (cap = this.rules.escape.exec(src)) {
				src = src.substring(cap[0].length);
				out += cap[1];
				continue;
			}
			// autolink
			if (cap = this.rules.autolink.exec(src)) {
				src = src.substring(cap[0].length);
				if (cap[2] === '@') {
					text = cap[1].charAt(6) === ':'
						? this.mangle(cap[1].substring(7))
						: this.mangle(cap[1]);
					href = this.mangle('mailto:') + text;
				} else {
					text = escape(cap[1]);
					href = text;
				}
				out += this.renderer.link(href, null, text);
				continue;
			}
			// url (gfm)
			if (!this.inLink && (cap = this.rules.url.exec(src))) {
				src = src.substring(cap[0].length);
				text = escape(cap[1]);
				href = text;
				out += this.renderer.link(href, null, text);
				continue;
			}
			// tag
			if (cap = this.rules.tag.exec(src)) {
				if (!this.inLink && /^<a /i.test(cap[0])) {
					this.inLink = true;
				} else if (this.inLink && /^<\/a>/i.test(cap[0])) {
					this.inLink = false;
				}
				src = src.substring(cap[0].length);
				out += this.options.sanitize
					? this.options.sanitizer
					? this.options.sanitizer(cap[0])
					: escape(cap[0])
					: cap[0]
				continue;
			}
			// link
			if (cap = this.rules.link.exec(src)) {
				src = src.substring(cap[0].length);
				this.inLink = true;
				out += this.outputLink(cap, {
					href: cap[2],
					title: cap[3]
				});
				this.inLink = false;
				continue;
			}
			// reflink, nolink
			if ((cap = this.rules.reflink.exec(src))
				|| (cap = this.rules.nolink.exec(src))) {
				src = src.substring(cap[0].length);
				link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
				link = this.links[link.toLowerCase()];
				if (!link || !link.href) {
					out += cap[0].charAt(0);
					src = cap[0].substring(1) + src;
					continue;
				}
				this.inLink = true;
				out += this.outputLink(cap, link);
				this.inLink = false;
				continue;
			}
			// strong
			if (cap = this.rules.strong.exec(src)) {
				src = src.substring(cap[0].length);
				out += this.renderer.strong(this.output(cap[2] || cap[1]));
				continue;
			}
			// em
			if (cap = this.rules.em.exec(src)) {
				src = src.substring(cap[0].length);
				out += this.renderer.em(this.output(cap[2] || cap[1]));
				continue;
			}
			// code
			if (cap = this.rules.code.exec(src)) {
				src = src.substring(cap[0].length);
				out += this.renderer.codespan(escape(cap[2], true));
				continue;
			}
			// br
			if (cap = this.rules.br.exec(src)) {
				src = src.substring(cap[0].length);
				out += this.renderer.br();
				continue;
			}
			// del (gfm)
			if (cap = this.rules.del.exec(src)) {
				src = src.substring(cap[0].length);
				out += this.renderer.del(this.output(cap[1]));
				continue;
			}
			// text
			if (cap = this.rules.text.exec(src)) {
				src = src.substring(cap[0].length);
				out += this.renderer.text(escape(this.smartypants(cap[0])));
				continue;
			}
			if (src) {
				throw new
					Error('Infinite loop on byte: ' + src.charCodeAt(0));
			}
		}
		return out;
	};

	InlineLexer.prototype.outputLink = function (cap, link) {
		var href = escape(link.href)
			, title = link.title ? escape(link.title) : null;
		return cap[0].charAt(0) !== '!'
			? this.renderer.link(href, title, this.output(cap[1]))
			: this.renderer.image(href, title, escape(cap[1]));
	};

	InlineLexer.prototype.smartypants = function (text) {
		if (!this.options.smartypants) return text;
		return text
		// em-dashes
			.replace(/---/g, '\u2014')
			// en-dashes
			.replace(/--/g, '\u2013')
			// opening singles
			.replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
			// closing singles & apostrophes
			.replace(/'/g, '\u2019')
			// opening doubles
			.replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
			// closing doubles
			.replace(/"/g, '\u201d')
			// ellipses
			.replace(/\.{3}/g, '\u2026');
	};

	InlineLexer.prototype.mangle = function (text) {
		if (!this.options.mangle) return text;
		var out = ''
			, l = text.length
			, i = 0
			, ch;
		for (; i < l; i++) {
			ch = text.charCodeAt(i);
			if (Math.random() > 0.5) {
				ch = 'x' + ch.toString(16);
			}
			out += '&#' + ch + ';';
		}
		return out;
	};

	function Renderer(options) {
		this.options = options || {};
	}

	Renderer.prototype.code = function (code, lang, escaped) {
		if (this.options.highlight) {
			var out = this.options.highlight(code, lang);
			if (out != null && out !== code) {
				escaped = true;
				code = out;
			}
		}
		if (!lang) {
			return '<pre><code>'
				+ (escaped ? code : escape(code, true))
				+ '\n</code></pre>';
		}
		return '<pre><code class="'
			+ this.options.langPrefix
			+ escape(lang, true)
			+ '">'
			+ (escaped ? code : escape(code, true))
			+ '\n</code></pre>\n';
	};
	Renderer.prototype.blockquote = function (quote) {
		return '<blockquote>\n' + quote + '</blockquote>\n';
	};
	Renderer.prototype.html = function (html) {
		return html;
	};
	Renderer.prototype.heading = function (text, level, raw) {
		return '<h'
			+ level
			+ ' id="'
			+ this.options.headerPrefix
			+ raw.toLowerCase().replace(/[^\w]+/g, '-')
			+ '">'
			+ text
			+ '</h'
			+ level
			+ '>\n';
	};
	Renderer.prototype.hr = function () {
		return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
	};
	Renderer.prototype.list = function (body, ordered) {
		var type = ordered ? 'ol' : 'ul';
		return '<' + type + '>\n' + body + '</' + type + '>\n';
	};
	Renderer.prototype.listitem = function (text) {
		return '<li>' + text + '</li>\n';
	};
	Renderer.prototype.paragraph = function (text) {
		return '<p>' + text + '</p>\n';
	};
	Renderer.prototype.table = function (header, body) {
		return '<table>\n'
			+ '<thead>\n'
			+ header
			+ '</thead>\n'
			+ '<tbody>\n'
			+ body
			+ '</tbody>\n'
			+ '</table>\n';
	};
	Renderer.prototype.tablerow = function (content) {
		return '<tr>\n' + content + '</tr>\n';
	};
	Renderer.prototype.tablecell = function (content, flags) {
		var type = flags.header ? 'th' : 'td';
		var tag = flags.align
			? '<' + type + ' style="text-align:' + flags.align + '">'
			: '<' + type + '>';
		return tag + content + '</' + type + '>\n';
	};
// span level renderer
	Renderer.prototype.strong = function (text) {
		return '<strong>' + text + '</strong>';
	};
	Renderer.prototype.em = function (text) {
		return '<em>' + text + '</em>';
	};
	Renderer.prototype.codespan = function (text) {
		return '<code>' + text + '</code>';
	};
	Renderer.prototype.br = function () {
		return this.options.xhtml ? '<br/>' : '<br>';
	};
	Renderer.prototype.del = function (text) {
		return '<del>' + text + '</del>';
	};
	Renderer.prototype.link = function (href, title, text) {
		if (this.options.sanitize) {
			try {
				var prot = decodeURIComponent(unescape(href))
					.replace(/[^\w:]/g, '')
					.toLowerCase();
			} catch (e) {
				return '';
			}
			if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
				return '';
			}
		}
		var out = '<a href="' + href + '"';
		if (title) {
			out += ' title="' + title + '"';
		}
		out += '>' + text + '</a>';
		return out;
	};
	Renderer.prototype.image = function (href, title, text) {
		var out = '<img src="' + href + '" alt="' + text + '"';
		if (title) {
			out += ' title="' + title + '"';
		}
		out += this.options.xhtml ? '/>' : '>';
		return out;
	};
	Renderer.prototype.text = function (text) {
		return text;
	};

	function Parser(options) {
		this.tokens = [];
		this.token = null;
		this.options = options || marked.defaults;
		this.options.renderer = this.options.renderer || new Renderer;
		this.renderer = this.options.renderer;
		this.renderer.options = this.options;
	}

	Parser.parse = function (src, options, renderer) {
		var parser = new Parser(options, renderer);
		return parser.parse(src);
	};

	Parser.prototype.parse = function (src) {
		this.inline = new InlineLexer(src.links, this.options, this.renderer);
		this.tokens = src.reverse();
		var out = '';
		while (this.next()) {
			out += this.tok();
		}
		return out;
	};

	Parser.prototype.next = function () {
		return this.token = this.tokens.pop();
	};

	Parser.prototype.peek = function () {
		return this.tokens[this.tokens.length - 1] || 0;
	};

	Parser.prototype.parseText = function () {
		var body = this.token.text;
		while (this.peek().type === 'text') {
			body += '\n' + this.next().text;
		}
		return this.inline.output(body);
	};

	Parser.prototype.tok = function () {
		switch (this.token.type) {
			case 'space':
			{
				return '';
			}
			case 'hr':
			{
				return this.renderer.hr();
			}
			case 'heading':
			{
				return this.renderer.heading(
					this.inline.output(this.token.text),
					this.token.depth,
					this.token.text);
			}
			case 'code':
			{
				return this.renderer.code(this.token.text,
					this.token.lang,
					this.token.escaped);
			}
			case 'table':
			{
				var header = ''
					, body = ''
					, i
					, row
					, cell
					, flags
					, j;
				// header
				cell = '';
				for (i = 0; i < this.token.header.length; i++) {
					flags = {header: true, align: this.token.align[i]};
					cell += this.renderer.tablecell(
						this.inline.output(this.token.header[i]),
						{header: true, align: this.token.align[i]}
					);
				}
				header += this.renderer.tablerow(cell);
				for (i = 0; i < this.token.cells.length; i++) {
					row = this.token.cells[i];
					cell = '';
					for (j = 0; j < row.length; j++) {
						cell += this.renderer.tablecell(
							this.inline.output(row[j]),
							{header: false, align: this.token.align[j]}
						);
					}
					body += this.renderer.tablerow(cell);
				}
				return this.renderer.table(header, body);
			}
			case 'blockquote_start':
			{
				var body = '';
				while (this.next().type !== 'blockquote_end') {
					body += this.tok();
				}
				return this.renderer.blockquote(body);
			}
			case 'list_start':
			{
				var body = ''
					, ordered = this.token.ordered;
				while (this.next().type !== 'list_end') {
					body += this.tok();
				}
				return this.renderer.list(body, ordered);
			}
			case 'list_item_start':
			{
				var body = '';
				while (this.next().type !== 'list_item_end') {
					body += this.token.type === 'text'
						? this.parseText()
						: this.tok();
				}
				return this.renderer.listitem(body);
			}
			case 'loose_item_start':
			{
				var body = '';
				while (this.next().type !== 'list_item_end') {
					body += this.tok();
				}
				return this.renderer.listitem(body);
			}
			case 'html':
			{
				var html = !this.token.pre && !this.options.pedantic
					? this.inline.output(this.token.text)
					: this.token.text;
				return this.renderer.html(html);
			}
			case 'paragraph':
			{
				return this.renderer.paragraph(this.inline.output(this.token.text));
			}
			case 'text':
			{
				return this.renderer.paragraph(this.parseText());
			}
		}
	};

	function escape(html, encode) {
		return html
			.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}

	function unescape(html) {
		return html.replace(/&([#\w]+);/g, function (_, n) {
			n = n.toLowerCase();
			if (n === 'colon') return ':';
			if (n.charAt(0) === '#') {
				return n.charAt(1) === 'x'
					? String.fromCharCode(parseInt(n.substring(2), 16))
					: String.fromCharCode(+n.substring(1));
			}
			return '';
		});
	}

	function replace(regex, opt) {
		regex = regex.source;
		opt = opt || '';
		return function self(name, val) {
			if (!name) return new RegExp(regex, opt);
			val = val.source || val;
			val = val.replace(/(^|[^\[])\^/g, '$1');
			regex = regex.replace(name, val);
			return self;
		};
	}

	function noop() {
	}

	noop.exec = noop;
	function merge(obj) {
		var i = 1, target, key;
		for (; i < arguments.length; i++) {
			target = arguments[i];
			for (key in target) {
				if (Object.prototype.hasOwnProperty.call(target, key)) {
					obj[key] = target[key];
				}
			}
		}
		return obj;
	}

	function marked(src, opt, callback) {
		if (callback || typeof opt === 'function') {
			if (!callback) {
				callback = opt;
				opt = null;
			}
			opt = merge({}, marked.defaults, opt || {});
			var highlight = opt.highlight, tokens, pending, i = 0;
			try {
				tokens = Lexer.lex(src, opt)
			} catch (e) {
				return callback(e);
			}
			pending = tokens.length;
			var done = function (err) {
				if (err) {
					opt.highlight = highlight;
					return callback(err);
				}
				var out;
				try {
					out = Parser.parse(tokens, opt);
				} catch (e) {
					err = e;
				}
				opt.highlight = highlight;
				if (err) {
					return callback(err);
				} else {
					return callback(null, out)
				}
			};
			if (!highlight || highlight.length < 3) {
				return done();
			}
			delete opt.highlight;
			if (!pending) return done();
			for (; i < tokens.length; i++) {
				(function (token) {
					if (token.type !== 'code') {
						return --pending || done();
					}
					return highlight(token.text, token.lang, function (err, code) {
						if (err) return done(err);
						if (code == null || code === token.text) {
							return --pending || done();
						}
						token.text = code;
						token.escaped = true;
						--pending || done();
					});
				})(tokens[i]);
			}
			return;
		}
		try {
			if (opt) opt = merge({}, marked.defaults, opt);
			return Parser.parse(Lexer.lex(src, opt), opt);
		} catch (e) {
			e.message += '\nPlease report this to https://github.com/chjj/marked.';
			if ((opt || marked.defaults).silent) {
				return '<p>An error occured:</p><pre>' + escape(e.message + '', true) + '</pre>';
			}
			throw e;
		}
	}

	marked.options = marked.setOptions = function (opt) {
		merge(marked.defaults, opt);
		return marked;
	};
	marked.defaults = {
		gfm: true,
		tables: true,
		breaks: false,
		pedantic: false,
		sanitize: false,
		sanitizer: null,
		mangle: true,
		smartLists: false,
		silent: false,
		highlight: null,
		langPrefix: 'lang-',
		smartypants: false,
		headerPrefix: '',
		renderer: new Renderer,
		xhtml: false
	};

	marked.Parser = Parser;
	marked.parser = Parser.parse;
	marked.Renderer = Renderer;
	marked.Lexer = Lexer;
	marked.lexer = Lexer.lex;
	marked.InlineLexer = InlineLexer;
	marked.inlineLexer = InlineLexer.output;
	marked.parse = marked;
	if (typeof module !== 'undefined' && typeof exports === 'object') {
		module.exports = marked;
	} else if (typeof define === 'function' && define.amd) {
		define(function () {
			return marked;
		});
	} else {
		this.marked = marked;
	}
}).call(function () {
	return this || (typeof window !== 'undefined' ? window : global);
}());
;
/*----------------------------------------separator----------------------------------------*/
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;(function(root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.NProgress = factory();
    }

})(this, function() {
    var NProgress = {};

    NProgress.version = '0.2.0';

    var Settings = NProgress.settings = {
        minimum: 0.08,
        easing: 'linear',
        positionUsing: '',
        speed: 200,
        trickle: true,
        trickleSpeed: 200,
        showSpinner: true,
        barSelector: '[role="bar"]',
        spinnerSelector: '[role="spinner"]',
        parent: 'body',
        template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    };

    /**
     * Updates configuration.
     *
     *     NProgress.configure({
   *       minimum: 0.1
   *     });
     */
    NProgress.configure = function(options) {
        var key, value;
        for (key in options) {
            value = options[key];
            if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
        }

        return this;
    };

    /**
     * Last number.
     */

    NProgress.status = null;

    /**
     * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
     *
     *     NProgress.set(0.4);
     *     NProgress.set(1.0);
     */

    NProgress.set = function(n) {
        var started = NProgress.isStarted();

        n = clamp(n, Settings.minimum, 1);
        NProgress.status = (n === 1 ? null : n);

        var progress = NProgress.render(!started),
            bar      = progress.querySelector(Settings.barSelector),
            speed    = Settings.speed,
            ease     = Settings.easing;

        progress.offsetWidth; /* Repaint */

        queue(function(next) {
            // Set positionUsing if it hasn't already been set
            if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

            // Add transition
            css(bar, barPositionCSS(n, speed, ease));

            if (n === 1) {
                // Fade out
                css(progress, {
                    transition: 'none',
                    opacity: 1
                });
                progress.offsetWidth; /* Repaint */

                setTimeout(function() {
                    css(progress, {
                        transition: 'all ' + speed + 'ms linear',
                        opacity: 0
                    });
                    setTimeout(function() {
                        NProgress.remove();
                        next();
                    }, speed);
                }, speed);
            } else {
                setTimeout(next, speed);
            }
        });

        return this;
    };

    NProgress.isStarted = function() {
        return typeof NProgress.status === 'number';
    };

    /**
     * Shows the progress bar.
     * This is the same as setting the status to 0%, except that it doesn't go backwards.
     *
     *     NProgress.start();
     *
     */
    NProgress.start = function() {
        if (!NProgress.status) NProgress.set(0);

        var work = function() {
            setTimeout(function() {
                if (!NProgress.status) return;
                NProgress.trickle();
                work();
            }, Settings.trickleSpeed);
        };

        if (Settings.trickle) work();

        return this;
    };

    /**
     * Hides the progress bar.
     * This is the *sort of* the same as setting the status to 100%, with the
     * difference being `done()` makes some placebo effect of some realistic motion.
     *
     *     NProgress.done();
     *
     * If `true` is passed, it will show the progress bar even if its hidden.
     *
     *     NProgress.done(true);
     */

    NProgress.done = function(force) {
        if (!force && !NProgress.status) return this;

        return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
    };

    /**
     * Increments by a random amount.
     */

    NProgress.inc = function(amount) {
        var n = NProgress.status;

        if (!n) {
            return NProgress.start();
        } else if(n > 1) {
            return;
        } else {
            if (typeof amount !== 'number') {
                if (n >= 0 && n < 0.2) { amount = 0.1; }
                else if (n >= 0.2 && n < 0.5) { amount = 0.04; }
                else if (n >= 0.5 && n < 0.8) { amount = 0.02; }
                else if (n >= 0.8 && n < 0.99) { amount = 0.005; }
                else { amount = 0; }
            }

            n = clamp(n + amount, 0, 0.994);
            return NProgress.set(n);
        }
    };

    NProgress.trickle = function() {
        return NProgress.inc();
    };

    /**
     * Waits for all supplied jQuery promises and
     * increases the progress as the promises resolve.
     *
     * @param $promise jQUery Promise
     */
    (function() {
        var initial = 0, current = 0;

        NProgress.promise = function($promise) {
            if (!$promise || $promise.state() === "resolved") {
                return this;
            }

            if (current === 0) {
                NProgress.start();
            }

            initial++;
            current++;

            $promise.always(function() {
                current--;
                if (current === 0) {
                    initial = 0;
                    NProgress.done();
                } else {
                    NProgress.set((initial - current) / initial);
                }
            });

            return this;
        };

    })();

    /**
     * (Internal) renders the progress bar markup based on the `template`
     * setting.
     */

    NProgress.render = function(fromStart) {
        if (NProgress.isRendered()) return document.getElementById('nprogress');

        addClass(document.documentElement, 'nprogress-busy');

        var progress = document.createElement('div');
        progress.id = 'nprogress';
        progress.innerHTML = Settings.template;

        var bar      = progress.querySelector(Settings.barSelector),
            perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
            parent   = document.querySelector(Settings.parent),
            spinner;

        css(bar, {
            transition: 'all 0 linear',
            transform: 'translate3d(' + perc + '%,0,0)'
        });

        if (!Settings.showSpinner) {
            spinner = progress.querySelector(Settings.spinnerSelector);
            spinner && removeElement(spinner);
        }

        if (parent != document.body) {
            addClass(parent, 'nprogress-custom-parent');
        }

        parent.appendChild(progress);
        return progress;
    };

    /**
     * Removes the element. Opposite of render().
     */

    NProgress.remove = function() {
        removeClass(document.documentElement, 'nprogress-busy');
        removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
        var progress = document.getElementById('nprogress');
        progress && removeElement(progress);
    };

    /**
     * Checks if the progress bar is rendered.
     */

    NProgress.isRendered = function() {
        return !!document.getElementById('nprogress');
    };

    /**
     * Determine which positioning CSS rule to use.
     */

    NProgress.getPositioningCSS = function() {
        // Sniff on document.body.style
        var bodyStyle = document.body.style;

        // Sniff prefixes
        var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
            ('MozTransform' in bodyStyle) ? 'Moz' :
                ('msTransform' in bodyStyle) ? 'ms' :
                    ('OTransform' in bodyStyle) ? 'O' : '';

        if (vendorPrefix + 'Perspective' in bodyStyle) {
            // Modern browsers with 3D support, e.g. Webkit, IE10
            return 'translate3d';
        } else if (vendorPrefix + 'Transform' in bodyStyle) {
            // Browsers without 3D support, e.g. IE9
            return 'translate';
        } else {
            // Browsers without translate() support, e.g. IE7-8
            return 'margin';
        }
    };

    /**
     * Helpers
     */

    function clamp(n, min, max) {
        if (n < min) return min;
        if (n > max) return max;
        return n;
    }

    /**
     * (Internal) converts a percentage (`0..1`) to a bar translateX
     * percentage (`-100%..0%`).
     */

    function toBarPerc(n) {
        return (-1 + n) * 100;
    }


    /**
     * (Internal) returns the correct CSS for changing the bar's
     * position given an n percentage, and speed and ease from Settings
     */

    function barPositionCSS(n, speed, ease) {
        var barCSS;

        if (Settings.positionUsing === 'translate3d') {
            barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
        } else if (Settings.positionUsing === 'translate') {
            barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
        } else {
            barCSS = { 'margin-left': toBarPerc(n)+'%' };
        }

        barCSS.transition = 'all '+speed+'ms '+ease;

        return barCSS;
    }

    /**
     * (Internal) Queues a function to be executed.
     */

    var queue = (function() {
        var pending = [];

        function next() {
            var fn = pending.shift();
            if (fn) {
                fn(next);
            }
        }

        return function(fn) {
            pending.push(fn);
            if (pending.length == 1) next();
        };
    })();

    /**
     * (Internal) Applies css properties to an element, similar to the jQuery
     * css method.
     *
     * While this helper does assist with vendor prefixed property names, it
     * does not perform any manipulation of values prior to setting styles.
     */

    var css = (function() {
        var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
            cssProps    = {};

        function camelCase(string) {
            return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
                return letter.toUpperCase();
            });
        }

        function getVendorProp(name) {
            var style = document.body.style;
            if (name in style) return name;

            var i = cssPrefixes.length,
                capName = name.charAt(0).toUpperCase() + name.slice(1),
                vendorName;
            while (i--) {
                vendorName = cssPrefixes[i] + capName;
                if (vendorName in style) return vendorName;
            }

            return name;
        }

        function getStyleProp(name) {
            name = camelCase(name);
            return cssProps[name] || (cssProps[name] = getVendorProp(name));
        }

        function applyCss(element, prop, value) {
            prop = getStyleProp(prop);
            element.style[prop] = value;
        }

        return function(element, properties) {
            var args = arguments,
                prop,
                value;

            if (args.length == 2) {
                for (prop in properties) {
                    value = properties[prop];
                    if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
                }
            } else {
                applyCss(element, args[1], args[2]);
            }
        }
    })();

    /**
     * (Internal) Determines if an element or space separated list of class names contains a class name.
     */

    function hasClass(element, name) {
        var list = typeof element == 'string' ? element : classList(element);
        return list.indexOf(' ' + name + ' ') >= 0;
    }

    /**
     * (Internal) Adds a class to an element.
     */

    function addClass(element, name) {
        var oldList = classList(element),
            newList = oldList + name;

        if (hasClass(oldList, name)) return;

        // Trim the opening space.
        element.className = newList.substring(1);
    }

    /**
     * (Internal) Removes a class from an element.
     */

    function removeClass(element, name) {
        var oldList = classList(element),
            newList;

        if (!hasClass(element, name)) return;

        // Replace the class name.
        newList = oldList.replace(' ' + name + ' ', ' ');

        // Trim the opening and closing spaces.
        element.className = newList.substring(1, newList.length - 1);
    }

    /**
     * (Internal) Gets a space separated list of the class names on the element.
     * The list is wrapped with a single space on each end to facilitate finding
     * matches within the list.
     */

    function classList(element) {
        return (' ' + (element && element.className || '') + ' ').replace(/\s+/gi, ' ');
    }

    /**
     * (Internal) Removes an element from the DOM.
     */

    function removeElement(element) {
        element && element.parentNode && element.parentNode.removeChild(element);
    }

    return NProgress;
});;
/*----------------------------------------separator----------------------------------------*/
vx.module('ui.libraries', []);//自定义组件模块（指令、服务、过滤器）
vx.module("ui.bootstrap", [
	"ui.bootstrap.modal"
	// "ui.bootstrap.transition",
	// "ui.bootstrap.collapse",
	// "ui.bootstrap.accordion",
	// "ui.bootstrap.alert",
	// "ui.bootstrap.bindHtml",
	// "ui.bootstrap.buttons",
	// "ui.bootstrap.carousel",
	// "ui.bootstrap.dateparser",
	// "ui.bootstrap.position",
	// "ui.bootstrap.datepicker",
	// "ui.bootstrap.dropdown",
	//"ui.bootstrap.pagination",
	//"ui.bootstrap.tooltip",
	//"ui.bootstrap.popover",
	//"ui.bootstrap.progressbar",
	//"ui.bootstrap.rating",
	//"ui.bootstrap.tabs",
	//"ui.bootstrap.timepicker",
	//"ui.bootstrap.typeahead"
]);//bootstrap组件模块

var ibsapp = vx.module('ibsapp', [
	'ui.router',
	//'ngAnimate',
	'vStorage',
	'vviewport.vpage',
	'vx.lazyLoad',
	//'ngSanitize',
	'ui.libraries',
	'ui.bootstrap'
]);
(function (window, vx, $) {
	'use strict';
	var mod = vx.module('ibsapp');

	configLog.$inject = ['$logProvider'];

	function configLog($logProvider) {
		$logProvider.debugEnabled(false);
	}

	configBrowser.$inject = ['$browserProvider'];

	function configBrowser($browserProvider) {
	}

	configRemote.$inject = ['$remoteProvider'];

	function configRemote($remoteProvider) {
		$remoteProvider.setErrorTag(function (data) {
			//console.debug('filter data with setErrorTag');
			if (data.jsonError) {
				return true;
			} else if (data._RejCode && !/^0+$/.test(data._RejCode)) {
				return true;
			}
		});
		$remoteProvider.setTrsContext("/local/");
		$remoteProvider.setSendBeforeFn(function () {
			$('#load_back_drop.httpBackend-backdrop').show();
		});
		$remoteProvider.setSendAfterFn(function () {
			$('#load_back_drop.httpBackend-backdrop').hide();
		});
		$remoteProvider.config = {
			headers: {
				'Content-Type': 'application/json'
			},
			timeout: 30000,
			toKeyValue: false
		};
		$remoteProvider.setErrorCallback(function (data, status, headers, config) {
			var $S = config.$scope,
				httpRequest = config.url;
			var currentScope = vx.element("div[v-view]>*").scope() || vx.element("body").scope();
			if (data && data.jsonError) {
				currentScope.jsonError = data.jsonError;
			} else {
				currentScope.jsonError = [{
					"_exceptionMessage": "网络异常:" + status
				}];
			}
			if (status == -1) {
				console.error('请求超时!');
			} else {
				if (data._RejCode != "000000") {
					if (data._RejCode == "777777") {
						currentScope.goto('loginapp.UserLogin');
					} else {
						console.error(data);
						//currentScope.$AlertValidate({
						//    title: "服务器异常",
						//    content: data._exceptionMessage
						//});
					}
				}
			}
		});
	}

	configHttp.$inject = ['$httpProvider'];

	function configHttp($httpProvider) {
		fnReq.$inject = ['$q'];

		function fnReq($q) {
			var interceptor = {
				'request': function (config) {
					return config;
				},
				'response': function (resp) {
					return resp;
				},
				'requestError': function (rejection) {
					return $q.reject(rejection);
				},
				'responseError': function (rejection) {
					return rejection;
				}
			};
			return interceptor;
		}

		$httpProvider.interceptors.push(fnReq);
	}

	configHttpBackend.$inject = ['$httpBackendProvider'];

	function configHttpBackend($httpBackendProvider) {
	}

	configSubmit.$inject = ['$submitConfigProvider'];

	function configSubmit($submitConfigProvider) {
		$submitConfigProvider.setSubmitCompileProcess(function (scope) {
			delete scope.jsonError;
		});
		$submitConfigProvider.setSubmitBeforeProcess(function (scope) {
			delete scope.jsonError;
		});
		$submitConfigProvider.setSubmitErrProcess(function (ctrlComment, errMessage, scope, ctrl) {
			$(ctrl).stop().animate({
				left: "-10px"
			}, 100).animate({
				left: "10px"
			}, 100).animate({
				left: "-10px"
			}, 100).animate({
				left: "10px"
			}, 100).animate({
				left: "0px"
			}, 100);
			scope.jsonError = [{
				"_exceptionMessage": ctrlComment + errMessage
			}];
			scope.$apply();
		});
	}

	configContext.$inject = ['$contextConfigProvider'];

	function configContext($contextConfigProvider) {
		$contextConfigProvider.setSessionStorageEnable(true);
	}

	mod.config(configLog);
	mod.config(configBrowser);
	mod.config(configRemote);
	mod.config(configHttp);
	mod.config(configHttpBackend);
	mod.config(configSubmit);
	mod.config(configContext);
	runRootScope.$inject = ['$rootScope', '$window', '$timeout', '$locale', '$state', '$stateParams', '$location', '$context', '$filter', '$remote', '$targets', '$modal','$q'];

	function runRootScope($rootScope, $window, $timeout, $locale, $state, $stateParams, $location, $context, $filter, $remote, $targets, $modal,$q) {
		$rootScope.$TrsContext = $window.TRSCONTEXT;
		$rootScope.$ClientMode = $window.CLIENTMODE;
		$rootScope.$state = $state;
		$rootScope.showTopAdver = true;
		$rootScope.getRouteParams = function (param) {
			return $stateParams[param];
		};
		$rootScope.goto = function (url, params, viewportName) {
			if (!url) {
				return;
			}
			if (/[\.]/.test(url)) {
				if ($state.current.name != url) {
					$state.go(url, params);
				} else {
					$state.reload();
				}
			} else if (/^[\/]/.test(url)) {
				window.location.hash = url;
			} else if (/^[#]/.test(url)) {
				$targets(viewportName || "content", url);
			} else if (/\.html/.test(url)) {
				window.location = url;
			}
		};
		$rootScope.$AlertValidate = function (modalMsg) {
			if (!$rootScope.$AlertValidate.isOpen) {
				$rootScope.$AlertValidate.isOpen = true;
				var modalInstance = $modal.open({
					templateUrl: 'htmls/Common/Validate.html',
					controller: ['$scope', '$modalInstance',
						function ($scope, $modalInstance) {
							$scope.modalMsg = modalMsg;
							$scope.ok = function () {
								$modalInstance.close();
								$rootScope.$AlertValidate.isOpen = false;
							};
						}
					]
				});
			}
		};
		$rootScope.gotoLocation = function (url) {
			window.location = url;
		};
		$rootScope.goback = function (param) {
			window.history.back(param || -1);
		};
		$rootScope.$field = function (name) {
			return $locale.FIELDS[name] || name;
		};
		$rootScope.$msg = function (name) {
			return $locale.MESSAGES[name] || name;
		};
		$rootScope.showError = function (errorMessage, currentScope) {
			if (currentScope) {
				currentScope.$apply(function () {
					currentScope.jsonError = [{
						"_exceptionMessage": errorMessage
					}];
				});
			} else {
				var currentScope = vx.element("div[ui-view]>*").scope() || vx.element("body").scope();
				currentScope.jsonError = [{
					"_exceptionMessage": errorMessage
				}];
			}
		};
		$rootScope.showOk = function (successMessage, currentScope) {
			if (currentScope) {
				currentScope.$apply(function () {
					currentScope.jsonError = [{
						"type": "success",
						"_exceptionMessage": successMessage
					}];
				});
			} else {
				var currentScope = vx.element("div[ui-view]>*").scope() || vx.element("body").scope();
				currentScope.jsonError = [{
					"type": "success",
					"_exceptionMessage": successMessage
				}];
			}
		};
		$rootScope.FmtError = function (errorMessage) {
			return [{
				"_exceptionMessage": errorMessage
			}];
		};
		$rootScope.cleanError = function (currentScope) {
			if (currentScope) {
				delete currentScope.jsonError;
			} else {
				var currentScope = vx.element("div[ui-view]>*").scope() || vx.element("body").scope();
				delete currentScope.jsonError;
			}
		};
		$rootScope.setValidation = function (el, value) {
			vx.element(el).attr("validate", value);
		};

        /**demo 公共方法 begin**/
        //302强制作实名认证函数方法
		$rootScope.forceRealNameAuthenticateFn = function() {
			var ForceDeferred = $q.defer();
			//判断强制实名认证  T审核中   N是通过认证完成
			$remote.post("QryRealNameAuthResult.do", {}, function(data) {
				if (data.UploadIdentity == "N") {
					ForceDeferred.resolve();
				} else {
					ForceDeferred.reject(data.UploadIdentity);
				}
			});
			return ForceDeferred.promise;
		};
		//强制实名认证弹框
		$rootScope.forceDoAuth = function() {//是否去认证
			//去认证与查看
			$("div#forceNeedAuto_id").hide();
			$rootScope.goto("appOther.NameAuth");
		};
		//强制实名认证取消
		$rootScope.forceAuthCancelFn = function() {
			$("div#forceNeedAuto_id").hide();
			$rootScope.goback();
		};
		//影藏顶部下载广告展示
		$rootScope.hideTopAdver = function() {
			$rootScope.showTopAdver = false;
		};
		//关闭错误信息
		$rootScope.HideErrorDiv = function() {
			$("#EEE").hide();
		};
		// //登录信息
		$rootScope.getLoginF = function() {

			if (sessionStorage.getItem("loginedF") && (sessionStorage.getItem("loginedF") == true || sessionStorage.getItem("loginedF") == "true")) {
				$rootScope.loginedF = true;
			} else {
				$rootScope.loginedF = false;
			}
			return $rootScope.loginedF;
		};
		$rootScope.sessionOutDo = function() {
			$("#sessionOut").hide();
			$rootScope.showLogin();
		};
		$rootScope.sessionOutDo2 = function() {
			$("#sessionOut2").hide();
			$rootScope.showLogin();
		};
		//公共错误弹框
		$rootScope.AlertErr = function(errMsg, btnText) {
			btnText || ( btnText = "朕知道了");
			if ($rootScope.$$phase) {
				$rootScope.ErrMsg = errMsg;
				$rootScope.BtnText = btnText;
				$("#EEE").show();
			} else {
				$rootScope.$apply(function() {
					$rootScope.ErrMsg = errMsg;
					$rootScope.BtnText = btnText;
					$("#EEE").show();
				});
			}
			return;
		};
		//菜单样式修改
		$rootScope.changeSHash = function() {

			$rootScope.sHash = $location.$$path.substring($location.$$path.indexOf('/') + 1);
		};
		/**
		 **打开侧滑栏
		 */
		$rootScope.showLogin = function(transName) {

			$rootScope.slideFlag = true;
			$("#noPicmask").show();
			var clientWidth = document.body.clientWidth * 0.8 + "px";
			$("#mainContentBox").animate({
				marginLeft : clientWidth
			}, 600);
			$(".top02").animate({
				left : clientWidth
			}, 600);
			if ($("#indexAdverFixTop")) {
				$("#indexAdverFixTop").animate({
					left : clientWidth
				}, 600);
			}
			//$("#indexAdverFixTop").animate({ left: clientWidth }, 600);
			// $("#box").animate({ marginLeft: clientWidth }, 600);
			if ($rootScope.loginedF) {
				$("#logiined_box").animate({
					left : 0
				}, 600);
			} else {
				$("#logiin_box").animate({
					left : 0
				}, 600);
			}
			$("#mainContentBox").addClass('fixdFlag');
		};
		/**
		 **关闭侧滑栏
		 */
		$rootScope.closeSlideBar = function() {
			$("#noPicmask").fadeOut();
			//if ($rootScope.loginedF) {
			$("#logiined_box").animate({
				left : "-100%"
			}, 500);
			//} else {
			$("#logiin_box").animate({
				left : "-100%"
			}, 500);
			//}
			$("#mainContentBox").animate({
				marginLeft : "0"
			}, 500);
			$(".top02").animate({
				left : 0
			}, 500);
			if ($("#indexAdverFixTop")) {
				$("#indexAdverFixTop").animate({
					left : 0
				}, 500);
			}
			$rootScope.slideFlag = false;
			//$(".slideL").animate({ left: "0" }, 500);
			//$("#indexAdverFixTop").animate({ left: "0" }, 500);
			// $("#box").animate({ marginLeft: "0" }, 500);
			if ($("#mainContentBox")) {
				$("#mainContentBox").removeClass('fixdFlag');
			}
			$("#loginPwd").val("");
			$("#loginPwd").attr("sf_uuid", "");

		};
		//关闭选择条件
		$rootScope.closeSelectBox = function(e, eleId, maskId) {
			//取消事件冒泡
			if (e && e.stopPropagation) {// 因此它支持W3C的stopPropagation()方法　
				e.stopPropagation();
			} else {//否则，我们需要使用IE的方式来取消事件冒泡   　　
				window.event.cancelBubble = true;
			}
			var ele_id = "#" + eleId;
			//表单id
			var mask_id = "#" + ( maskId ? maskId : "doNotClickMask");
			//遮罩id
			$(ele_id).slideUp(300);
			$(mask_id).hide();
		};
		//判断是否在微信浏览器
		$rootScope.isWeCat = function() {
			var ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				return true;
			}
			return false;
		};

		//短信验证码  登陆后的（需要上送手机号或者不需要）
		$rootScope.getTokenJNRCB = function(hasMobile, tokenMessage, mobile, flag) {
			//hasMobile是否需要上送手机号
			var tokenIndexP = 1;
			var params = {
				"TokenMessage" : tokenMessage,
				"TokenIndex" : tokenIndexP
			};
			if (hasMobile) {//需要上送手机号
				if (!mobile) {
					$rootScope.AlertErr("手机号不能为空");
					return;
				}
				params.MobilePhone = mobile;
				params.CheckExistFlag = flag;
			}
			$remote.post("AutoGenPhoneToken.do", params, function(data) {
				tokenIndexP++;
			}, function(data) {
				tokenIndexP++;
				// if (data.jsonError) {
				// $rootScope.AlertErr(jsonError[0]._exceptionMessage);
				// return;
				// }
			});
		};

		//短信验证码 上送手机号，未登录
		$rootScope.getTokenJNRCBV2 = function(tokenMessage, mobile, flag) {
			var tokenIndexP = 1;
			if (!mobile) {
				$rootScope.AlertErr("手机号不能为空");
			};
			var params = {
				"TokenMessage" : tokenMessage,
				"TokenIndex" : tokenIndexP,
				"MobilePhone" : mobile,
				"CheckExistFlag" : flag
			};
			$remote.post("GenPhoneTokenForPublicForNJ.do", params, function(data) {
				tokenIndexP++;
			}, function(data) {
				tokenIndexP++;
				// if (data.jsonError) {
				// $rootScope.AlertErr(jsonError[0]._exceptionMessage);
				// return;
				// }
			});
		};
		$rootScope.showShiMing = function(param) {
			//打开实名认证
			var shiMingInfo = JSON.parse(sessionStorage.getItem("shiMingInfo"));
			$rootScope.authText = shiMingInfo.authText;
			$rootScope.yesBtn = shiMingInfo.yesBtn;
			$("#showShiMingFlag").show();
		};
		$rootScope.closeShiMing = function(param) {
			//关闭实名认证
			$("#showShiMingFlag").hide();
			sessionStorage.setItem("showShiMingFlag", false);
			$rootScope.shiMingTanKuang = true;
		};
		$rootScope.gotoShiMing = function(param) {
			//去实名认证
			$("#showShiMingFlag").hide();
			$rootScope.goto("appOther.NameAuth");
		};
		$rootScope.getShiMing = function() {
			//
			if (sessionStorage.getItem("loginedF")) {
				$remote.post("QryRealNameAuthResult.do", {}, function(data) {
					if (data.UploadIdentity == "T") {//审核中
						sessionStorage.setItem("shiMingInfo", vx.toJson({
							authText : "实名认证正在审核中，是否立即查看？",
							yesBtn : "立即查看",
						}));
						$rootScope.shiMingTanKuang = false;
						sessionStorage.setItem("showShiMingFlag", true);
					} else if (data.UploadIdentity == "N") {//已审核
						sessionStorage.setItem("showShiMingFlag", false);
						$rootScope.shiMingTanKuang = true;
					} else {//认证中
						sessionStorage.setItem("shiMingInfo", vx.toJson({
							authText : "您暂未进行实名认证，是否立即认证？",
							yesBtn : "立即认证",
						}));
						$rootScope.shiMingTanKuang = false;
						sessionStorage.setItem("showShiMingFlag", true);
					}
				});
			}
		}
		/**demo 公共方法 end**/

		$rootScope.$on('$stateChangeSuccess', function (event, to, pargs, from) {
			if (from.url === "^") { //刷新
				console.log(from.url + '--->' + to.url);
				if (/welcome/.test(to.url)) {
					$rootScope.changeBook(1, true);
				} else if (/css_/.test(to.url)) {
					$rootScope.changeBook(2, true);
				} else if (/core_/.test(to.url)) {
					$rootScope.changeBook(3, true);
				} else if (/component_/.test(to.url)) {
					$rootScope.changeBook(4, true);
				} else if (/plugins_/.test(to.url)) {
					$rootScope.changeBook(5, true);
				} else if (/animation_/.test(to.url)) {
					$rootScope.changeBook(6, true);
				}
			}

			setTimeout(function () {
				window.prettyPrint();
			}, 100);
		});
	}

	ibsapp.run(runRootScope);
})(window, window.vx, window.jQuery);
;
/*----------------------------------------separator----------------------------------------*/
/**
 * 配置插件懒加载资源路径[files字段]、懒加挂插件模块名称[name字段]。
 * 使用字符串进行调用，如v-lazy-load="['easypiechart']" 
 */
var $vLazyLoad_Modules = [
// {
//     name: 'easypiechart',
//     files: ['lib/plugins/easy-pie-chart/angular.easypiechart.min.js']
// }, {
//     name: 'ngGrid',
//     files: ['lib/plugins/ng-grid/ng-grid.min.js', 'lib/plugins/ng-grid/ng-grid.min.css', 'lib/plugins/ng-grid/ng-grid.bootstrap.css']
// }, {
//     name: 'ui.grid',
//     files: ['lib/plugins/ui-grid/ui-grid.min.js', 'lib/plugins/ui-grid/ui-grid.min.css', 'lib/plugins/ui-grid/ui-grid.bootstrap.css']
// }, {
//     name: 'ui.calendar',
//     files: ['lib/plugins/ui-calendar/calendar.js','lib/plugins/fullcalendar/dist/gcal.js']
// }, {
//     name: 'ui.select',
//     files: ['lib/plugins/ui-select/select.js', 'lib/plugins/ui-select/select.min.css']
// }, {
//     name: 'angularFileUpload',
//     files: ['lib/plugins/angular-file-upload/angular-file-upload.min.js']
// }, {
//     name: 'ngImgCrop',
//     files: ['lib/plugins/ng-img-cap/ng-img-crop.min.js', 'lib/plugins/ng-img-cap/ng-mig-crop.min.css']
// }, {
//     name: 'angularBootstrapNavTree',
//     files: ['lib/plugins/angular-bootstrap-nav-tree/abn_tree_directive.js', 'lib/plugins/angular-bootstrap-nav-tree/abn_tree.css']
// }, {
//     name: 'toaster',
//     files: ['lib/plugins/toaster/toaster.js', 'lib/plugins/toaster/toaster.css']
// }, {
//     name: 'textAngular',
//     files: ['lib/plugins/textAngular/dist/textAngular-sanitize.min.js', 'lib/plugins/textAngular/dist/textAngular.min.js']
// }, {
//     name: 'xeditable',
//     files: ['lib/plugins/angular-xeditable/dist/js/xeditable.min.js', 'lib/plugins/angular-xeditable/dist/css/xeditable.css']
// }, {
//     name: 'smart-table',
//     files: ['lib/plugins/angular-smart-table/dist/smart-table.min.js']
// }, {
//     name: 'countUpModule',
//     files: ['lib/plugins/countup/dist/countUp.min.js', 'lib/plugins/countup/dist/angular-countUp.min.js']
// }, {
//     name: 'ui.map', //依赖ui-util  ui.event(全局加载)
//     files: ['lib/plugins/angular-ui-utils/event.min.js', 'lib/plugins/angular-ui-map-baidu/ui-map.js']
// }, {
//     name: 'pdf',
//     files: ['lib/plugins/pdfjs/pdf.js', 'lib/plugins/pdfjs/pdf.worker.js', 'lib/plugins/angular-pdf-viewer/dist/angular-pdf-viewer.js', 'lib/plugins/angular-pdf-viewer/angular-pdf-viewr.css']
// }, {
//     name: 'pdf2',
//     files: ['lib/plugins/pdfjs/pdf.js', 'lib/plugins/pdfjs/pdf.worker.js', 'lib/plugins/angularjs-pdf/angular-pdf.js', 'lib/plugins/angularjs-pdf/angular-pdf.css']
// }
];

/**
 * 仅仅配置插件懒加载资源路径，非模块，name随意。
 * 使用变量进行调用，如v-lazy-load="[_screenfull]"
 */
var $vLazyLoad_NoModules = {
    _iscroll: ['lib/plugins/$scrollPage/iscroll.min.js', 'lib/plugins/$scrollPage/$scrollPage.css', 'lib/plugins/$scrollPage/$scrollPage.js'],
    _flot: ['lib/plugins/flot/jquery.flot.pie.js', 'lib/plugins/flot/jquery.flot.resize.js', 'lib/plugins/flot.tooltip/js/jquery.flot.tooltip.js', 'lib/plugins/flot.orderbars/js/jquery.flot.orderBars.js', 'lib/plugins/flot-spline/js/jquery.flot.spline.js'],
    _qrcode: ['lib/plugins/jquery-qrcode/jquery.qrcode.js'],
     _swiper: ['lib/plugins/swiper/swiper-3.4.2.jquery.min.js', 'lib/plugins/swiper/swiper-3.4.2.min.css', 'lib/plugins/swiper/swiper_page.css']
    //_sparkline: ['lib/plugins/jquery.sparkline/dist/jquery.sparkline.retina.js'],
    //_flotDepend: ['lib/plugins/flot/jquery.flot.js'],
    //_chosen: ['lib/plugins/chosen/chosen.jquery.min.js', 'lib/plugins/bootstrap-chosen/bootstrap-chosen.css'],
    //_sortable: ['lib/plugins/html5sortable/jquery.sortable.js'],
    //_nestable: ['lib/plugins/nestable/jquery.nestable.js', 'lib/plugins/nestable/jquery.nestable.css'],
    //_dataTableDepend: ['lib/plugins/datatables/media/js/jquery.dataTables.min.js'],
    //_dataTable: ['lib/plugins/integration/bootstrap/3/dataTables.bootstrap.js', 'lib/plugins/integration/bootstrap/3/dataTables.bootstrap.css'],
    //_moment: ['lib/plugins/moment/min/moment-with-locales.min.js'],
    //_datepicker: ['lib/plugins/bootstrap-daterangepicker/daterangepicker.js', 'lib/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css'],
    //小草银行成长效果
    //_xiaocao: ['lib/plugins/ui-xiaocao/zepto.min.js', 'lib/plugins/ui-xiaocao/ui-xiaoCao.js', 'lib/plugins/ui-xiaocao/css/ui-xiaocao.css'],
    //WAP版网页密码插件
    //_CSII_WebPassword: ['lib/plugins/CSII.WebPassword/password-widget.min.js'],
    // _vectorMapDepend: ['lib/plugins/jvectormap/jquery-jvectormap-2.0.3.min.js'],
    // _vectorMap: ['lib/plugins/jvectormap/jquery-jvectormap-cn.js', 'lib/plugins/jvectormap/jquery-jvectormap-2.0.3.css'],
    // _touchspin: ['lib/plugins/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', 'lib/plugins/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
    // _wysiwyg: ['lib/plugins/bootstrap-wysiwyg/bootstrap-wysiwyg.js', 'lib/plugins/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
    // _tagsinput: ['lib/plugins/bootstrap-tagsinput/dist/bootstrap-tagsinput.js', 'lib/plugins/bootstrap-tagsinput/dist/bootstrap-tagsinput.css'],
    // _footable: ['lib/plugins/footable/dist/footable.all.min.js', 'lib/plugins/footable/css/footable.core.css'],
    // _uiselectsearch: ['lib/plugins/ui-selectsearch/jquery.nicescroll.js', 'lib/plugins/ui-selectsearch/TextSearch.js', 'lib/plugins/ui-selectsearch/ui-selectSearch.js'],
    // _chartService: ['lib/plugins/chart/Chart.js', 'lib/plugins/chart/$chartService.js', 'lib/plugins/chart/chartService.css'],
    // _discdraw: ['lib/plugins/ui-discdraw/jQueryRotate.2.2.js', 'lib/plugins/ui-discdraw/ui-discdraw.js', 'lib/plugins/ui-discdraw/ui-discdraw.css'],
    // _hammeregg: ['lib/plugins/ui-hammeregg/ui-hammeregg.js', 'lib/plugins/ui-hammeregg/ui-hammeregg.css'],
    // _rollernie: ['lib/plugins/ui-rollernie/ui-rollernie.js', 'lib/plugins/ui-rollernie/ui-rollernie.css'],
    // _fullpage: ['lib/plugins/fullpage/jquery-ui-1.10.3.min.js', 'lib/plugins/fullpage/jquery.fullpage.js', 'lib/plugins/fullpage/jquery.fullpage.css', 'lib/plugins/fullpage/fullpage.css'],
    // _alphabet: ['lib/plugins/alphabet/alphabet.css'],
    // _slideslip: ['lib/plugins/touch/touch.js', 'lib/plugins/sideslip/sideslip.css'],
    // _guacard: ['lib/plugins/guacard/wScratchPad.js', 'lib/plugins/guacard/GuaCard.css'],
    // _uiscale: ['lib/plugins/ui-scale/ui-scale.js', 'lib/plugins/ui-scale/ui-scale.css'],
    // _uicarousel: ['lib/plugins/ui-carousel/ui-carousel.js', 'lib/plugins/ui-carousel/ui-carousel.css'],
    // _uicarousel2: ['lib/plugins/ui-carousel/ui-carousel2.js', 'lib/plugins/ui-carousel/ui-carousel2.css'],
    // _uicarousel3: ['lib/plugins/ui-carousel/ui-carousel3.js', 'lib/plugins/ui-carousel/ui-carousel3.css'],
    // _uiYaojiang: ['lib/plugins/ui-yaojiang/ui-yaoJiang.js', 'lib/plugins/ui-yaojiang/ui-yaoJiang.css'],
    // _sildeslipMenu: ['lib/plugins/sideslip-menu/sildeslip-menu.css'],
    // _scrollBall: ['lib/plugins/scrollBall/ScrollBall.js'],
    // _uismashegg: ['lib/plugins/ui-smashegg/ui-smashegg.js', 'lib/plugins/ui-smashegg/ui-smashegg.css'],
    // _uicountdown: ['lib/plugins/ui-countdown/jquery.downCount.js', 'lib/plugins/ui-countdown/ui-countdown.js'],
    // _uicountup: ['lib/plugins/ui-countup/ui-countup.js'],
    // _takephoto: ['lib/plugins/takephoto/lrz.all.bundle.js', 'lib/plugins/takephoto/takePhoto.js'],
    // _uiselect2: ['lib/plugins/ui-select2/jquery.select.js', 'lib/plugins/ui-select2/ui-select2.js', 'lib/plugins/ui-select2/ui-select2.css'],
    // _popup: ['lib/plugins/actionsheet/actionsheet.js', 'lib/plugins/actionsheet/actionsheet.css'],
    // _echarts: ['lib/plugins/echarts/echarts.min.js', 'lib/plugins/echarts/echarts.css'],
    //_fullcalendar:['lib/plugins/fullcalendar/dist/fullcalendar.min.js','lib/plugins/fullcalendar/dist/fullcalendar.min.css','lib/plugins/fullcalendar/dist/fullcalendar.theme.css']
};

if (typeof(exports) != "undefined") {
    exports.lazyLoad_Modules=$vLazyLoad_Modules;
    exports.lazyLoad_NoModules=$vLazyLoad_NoModules;
} else {
    vx.module('ibsapp').config(['$vLazyLoadProvider', // vlazyload config
        function($vLazyLoadProvider) {
            $vLazyLoadProvider.config({
                debug: true,
                events: true,
                modules: $vLazyLoad_Modules
            });
        }
    ]).run(['$rootScope',
        function($rootScope) {
            vx.extend($rootScope, $vLazyLoad_NoModules);
        }
    ]);
}
;
/*----------------------------------------separator----------------------------------------*/
/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
(function(window, vx, undefined) {
    'use strict';
    var ibsapp = vx.module("ibsapp");
    /**
     * 路由配置
     * App Module
     */
    ibsapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$controllerProvider', "$compileProvider", "$filterProvider", "$provide",
        function($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {


            /******路由配置开始******/
            /*****************菜单页********************/
            $stateProvider.state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'htmls/AppView.html'
                })
                //主页
                .state('app.Main', {
                    url: '/Main',
                    templateUrl: 'htmls/Main/Main.html'
                })
                //我的
                .state('app.My', {
                    url: '/My',
                    templateUrl: 'htmls/My/My.html'
                })
                //财富
                .state('app.Wealth', {
                    url: '/Wealth',
                    templateUrl: 'htmls/Wealth/Wealth.html'
                })
                //生活
                .state('app.Life', {
                    url: '/Life',
                    templateUrl: 'htmls/Life/Life.html'
                })
                //无菜单页view
                .state('appOther', {
                    abstract: true,
                    url: '/appOther',
                    templateUrl: 'htmls/AppOther.html'
                })
                /***推荐 begin***/
                //推荐好友
                .state('appOther.RecommendFriend', {
                    url: '/RecommendFriend/:name/:seq',
                    templateUrl: 'htmls/RecommendFriend/RecommendFriend.html'

                })
                //我的推荐
                .state('appOther.MyRecommendQry', {
                    url: '/MyRecommendQry',
                    templateUrl: 'htmls/MyRecommendQry/Mod.html'

                })
                //我的推荐--达人榜
                .state('appOther.Daren', {
                    url: '/Daren',
                    templateUrl: 'htmls/Daren/Daren.html'

                })
                /***推荐 end***/
                //侧拉抽屉中关于我们
                .state('appOther.AboutUs', {
                    url: '/AboutUs',
                    templateUrl: 'htmls/AboutUs/AboutUs.html'

                })
                //定期转部分---列表
                .state('appOther.RegularShiftTo', {
                    url: '/RegularShiftTo',
                    templateUrl: 'htmls/RegularShiftTo/RegularShiftTo.html'

                })
                //定期转部分---添加
                .state('appOther.RegularShiftTo_Add', {
                    url: '/RegularShiftTo_Add',
                    templateUrl: 'htmls/RegularShiftTo_Add/Mod.html'

                })
                //定期转部分---修改
                .state('appOther.RegularShiftTo_Update', {
                    url: '/RegularShiftTo_Update',
                    templateUrl: 'htmls/RegularShiftTo_Update/Mod.html'

                })
                //定期转部分---删除
                .state('appOther.RegularShiftTo_Delete', {
                    url: '/RegularShiftTo_Delete',
                    templateUrl: 'htmls/RegularShiftTo_Delete/Mod.html'

                })
                //侧拉抽屉常见问题
                .state('appOther.ComQuestion', {
                    url: '/ComQuestion',
                    templateUrl: 'htmls/ComQuestion/ComQuestion.html'

                })
                //我的智能存款
                .state('appOther.MySmartDeposit', {
                    url: '/MySmartDeposit',
                    templateUrl: 'htmls/MySmartDeposit/Mod.html'

                })
                //智能存款产品详情
                .state('appOther.SmartDeposit', {
                    url: '/SmartDeposit',
                    templateUrl: 'htmls/SmartDeposit/Mod.html'

                })
                //我的智能存款 - 投资明细
                .state('appOther.MySmartInvestmentDetail', {
                    url: '/MySmartInvestmentDetail',
                    templateUrl: 'htmls/MySmartInvestmentDetail/Mod.html'

                })
                //智能存款签约
                .state('appOther.SmartDepositSign', {
                    url: '/SmartDepositSign',
                    templateUrl: 'htmls/SmartDepositSign/Mod.html'

                })
                //智能存款解约
                .state('appOther.SmartDepositRelease', {
                    url: '/SmartDepositRelease/:value',
                    templateUrl: 'htmls/SmartDepositRelease/Mod.html'

                })
                //智能存款服务协议
                .state('appOther.ZNCK_FWXY', {
                    url: '/ZNCK_FWXY',
                    templateUrl: 'htmls/Agreements/ZNCK_FUXY.html'

                })
                //我的定期产品列表
                .state('appOther.MyRegular', {
                    url: '/MyRegular',
                    templateUrl: 'htmls/MyRegular/Mod.html'

                })
                //定期产品列表
                .state('appOther.RegularList', {
                    url: '/RegularList',
                    templateUrl: 'htmls/RegularList/Mod.html'

                })
                //月月盈购买
                .state('appOther.YYY_Buy', {
                    url: '/YYY_Buy',
                    templateUrl: 'htmls/YYY_Buy/Mod.html'

                })
                //月月盈产品查询
                .state('appOther.YYY_Query', {
                    url: '/YYY_Query',
                    templateUrl: 'htmls/YYY_Query/Mod.html'

                })
                //月月盈修改到期安排
                .state('appOther.YYY_ModifyDue', {
                    url: '/YYY_ModifyDue',
                    templateUrl: 'htmls/YYY_ModifyDue/Mod.html'

                })
                //月月赢投资明细
                .state('appOther.YYY_InvestDet', {
                    url: '/YYY_InvestDet',
                    templateUrl: 'htmls/YYY_InvestDet/YYY_InvestDet.html'

                })
                //我的月月盈
                .state('appOther.MyYYY', {
                    url: '/MyYYY',
                    templateUrl: 'htmls/MyYYY/MyYYY.html'

                })
                //我的月月盈详情
                .state('appOther.MyYYYDetail', {
                    url: '/MyYYYDetail',
                    templateUrl: 'htmls/MyYYYDetail/MyYYYDetail.html'

                })
                //月月盈服务协议
                .state('appOther.YYY_FWXY', {
                    url: '/YYY_FWXY',
                    templateUrl: 'htmls/Agreements/YYY_FWXY.html'

                })
                //月月盈基金合同
                .state('appOther.YYY_JJHT', {
                    url: '/YYY_JJHT',
                    templateUrl: 'htmls/Agreements/YYY_JJHT.html'

                })
                //月月盈基金招募说明书
                .state('appOther.YYY_JJZMSMS', {
                    url: '/YYY_JJZMSMS',
                    templateUrl: 'htmls/Agreements/YYY_JJZMSMS.html'

                })
                //历史收益率(月月赢 、添利宝)
                .state('appOther.HistoryRate', {
                    url: '/HistoryRate',
                    templateUrl: 'htmls/HistoryRate/HistoryRate.html'

                })
                //招商招益持有查询
                .state('appOther.MyZSZY', {
                    url: '/MyZSZY/:value',
                    templateUrl: 'htmls/MyZSZY/Mod.html'

                })
                //招商招益 - 产品购买
                .state('appOther.ZSZY_Buy', {
                    url: '/ZSZY_Buy/:value',
                    templateUrl: 'htmls/ZSZY_Buy/mod.html'

                })
                //招商招益 - 产品追加购买
                .state('appOther.ZSZY_AppendBuy', {
                    url: '/ZSZY_AppendBuy',
                    templateUrl: 'htmls/ZSZY_AppendBuy/mod.html'

                })
                //招商招益-历史净值查询
                .state('appOther.ZSZY_FundHistNetWorth', {
                    url: '/ZSZY_FundHistNetWorth/:value',
                    templateUrl: 'htmls/ZSZY_FundHistNetWorth/Mod.html'
                })
                //招商招益-明细查询
                .state('appOther.ZSZY_InvestmentDetail', {
                    url: '/ZSZY_InvestmentDetail',
                    templateUrl: 'htmls/ZSZY_InvestmentDetail/InvestmentDetailList.html'
                })
                //招商招益的详情页
                .state('appOther.ZSZYDetail', {
                    url: '/ZSZYDetail/:zszyProd',
                    templateUrl: 'htmls/ZSZYDetail/Mod.html'
                })
                //招商招益服务协议
                .state('appOther.ZSZY_FWXY', {
                    url: '/ZSZY_FWXY',
                    templateUrl: 'htmls/Agreements/ZSZY_FWXY.html'
                })
                //招商招益基金合同
                .state('appOther.ZSZY_JJHT', {
                    url: '/ZSZY_JJHT',
                    templateUrl: 'htmls/Agreements/ZSZY_JJHT.html'
                })
                //招商招益基金招募说明书
                .state('appOther.ZSZY_ZMSMS', {
                    url: '/ZSZY_ZMSMS',
                    templateUrl: 'htmls/Agreements/ZSZY_ZMSMS.html'
                })
                //生活缴费
                .state('appOther.PaidedLife', {
                    url: '/PaidedLife',
                    templateUrl: 'htmls/LifePay/Mod.html'
                })
                //生活缴费-主页
                .state('appOther.LifeMain', {
                    url: '/LifeMain/:prePageUrl',
                    templateUrl: 'htmls/LifePay/LifeMain.html'
                })
                //生活缴费-缴费名册进入缴费
                .state('appOther.BookPayMent', {
                    url: '/BookPayMent',
                    templateUrl: 'htmls/LifeBookPayMent/Mod.html'
                })
                //生活缴费-城市定位选择
                .state('appOther.SelectCity', {
                    url: '/SelectCity',
                    templateUrl: 'htmls/LifePay/SelectCity.html'
                })
                //生活缴费-缴费提醒
                .state('appOther.LifePaymentReminder', {
                    url: '/LifePaymentReminder',
                    templateUrl: 'htmls/LifePaymentReminder/LifePaymentReminder.html'
                })
                //生活缴费-缴费提醒更改
                .state('appOther.LifePaymentReminderUpdate', {
                    url: '/LifePaymentReminderUpdate',
                    templateUrl: 'htmls/LifePaymentReminder/LifePaymentReminderUpdate.html'
                })
                //生活缴费-常见问题
                .state('appOther.LifePaymentComQuestion', {
                    url: '/LifePaymentComQuestion',
                    templateUrl: 'htmls/LifePaymentComQuestion/LifePaymentComQuestion.html'
                })
                //生活缴费-预约缴费
                .state('appOther.LifeReservationPayment', {
                    url: '/LifeReservationPayment',
                    templateUrl: 'htmls/LifeReservationPayment/LifeReservationPayment.html'
                })
                //生活缴费-预约缴费更改
                .state('appOther.LifeReservationPaymentUpdate', {
                    url: '/LifeReservationPaymentUpdate',
                    templateUrl: 'htmls/LifeReservationPayment/LifeReservationPaymentUpdate.html'
                })
                //生活缴费-添加预约缴费
                .state('appOther.LifeReservationPaymentAdd', {
                    url: '/LifeReservationPaymentAdd',
                    templateUrl: 'htmls/LifeReservationPaymentAdd/Mod.html'
                })
                //生活缴费-缴费历史
                .state('appOther.LifePaymentHistQry', {
                    url: '/LifePaymentHistQry',
                    templateUrl: 'htmls/LifePaymentHistQry/Mod.html'
                })
                //手机话费流量-----充值   
                .state('appOther.PhoneRecharge', {
                    url: '/PhoneRecharge',
                    templateUrl: 'htmls/PhoneRecharge/Mod.html'
                })
                //手机话费流量-----记录
                .state('appOther.PhoneChargeRecord', {
                    url: '/PhoneChargeRecord',
                    templateUrl: 'htmls/PhoneChargeRecord/Mod.html'
                })
                //注册
                .state('appOther.Registe', {
                    url: '/Registe',
                    templateUrl: 'htmls/Registe/Mod.html'
                })
                //实名认证
                .state('appOther.NameAuth', {
                    url: '/NameAuth',
                    templateUrl: 'htmls/NameAuth/NameAuth.html'
                })
                //忘记登录密码
                .state('appOther.ForgetLoginPwd', {
                    url: '/ForgetLoginPwd',
                    templateUrl: 'htmls/ForgetLoginPwd/Mod.html'
                })
                //我的资产-交易明细（也是电子账户对应银行卡列表的交易明细，都是电子账户的交易明细）
                .state('appOther.InvestmentDetail', {
                    url: '/InvestmentDetail',
                    templateUrl: 'htmls/InvestmentDetail/InvestmentDetailList.html'
                })
                //电子银行账户下的银行卡列表只展示使用
                .state('appOther.MyBankCard', {
                    url: '/MyBankCard',
                    templateUrl: 'htmls/MyBankCard/Mod.html'
                })
                //我的银行卡交易明细
                .state('appOther.MyBankCardInvestmentDetail', {
                    url: '/MyBankCardInvestmentDetail',
                    templateUrl: 'htmls/MyBankCardInvestmentDetail/MyBankCardInvestmentDetail.html'
                })
                //我的银行卡-交易中可选择
                .state('appOther.CardList', {
                    url: '/CardList',
                    templateUrl: 'htmls/CardList/CardList.html'
                })
                //贷款部分---------贷款查询
                .state('appOther.RepayInfoQry', {
                    url: '/RepayInfoQry',
                    templateUrl: 'htmls/RepayInfoQry/RepayInfoQry.html'
                })
                //贷款部分---------贷款详情
                .state('appOther.LoanDetail', {
                    url: '/LoanDetail',
                    templateUrl: 'htmls/loanDetail/LoanDetail.html'
                })
                //贷款部分--------自动还款维护   
                .state('appOther.RepayAutoMaintain', {
                    url: '/RepayAutoMaintain',
                    templateUrl: 'htmls/RepayAutoMaintain/RepayAutoMaintain.html'
                })
                //贷款部分--------还款修改
                .state('appOther.RepayAutoUpdate', {
                    url: '/RepayAutoUpdate',
                    templateUrl: 'htmls/RepayAutoUpdate/Mod.html'
                })
                //贷款部分--------自动还款删除
                .state('appOther.RepayAutoDel', {
                    url: '/RepayAutoDel',
                    templateUrl: 'htmls/RepayAutoDel/Mod.html'
                })
                //贷款部分--------还款历史
                .state('appOther.RepayHisQry', {
                    url: '/RepayHisQry',
                    templateUrl: 'htmls/RepayHisQry/RepayHisQry.html'
                })
                //贷款部分--------提前还款
                .state('appOther.RepayMentforward', {
                    url: '/RepayMentforward',
                    templateUrl: 'htmls/RepayMentforward/Mod.html'
                })
                //贷款部分--------按期还款
                .state('appOther.RepayTransfer', {
                    url: '/RepayTransfer',
                    templateUrl: 'htmls/RepayTransfer/Mod.html'
                })
                //贷款部分--------自动还款设置
                .state('appOther.RepayAutoAdd', {
                    url: '/RepayAutoAdd',
                    templateUrl: 'htmls/RepayAutoAdd/Mod.html'
                })
                //贷款部分--------还款计划表
                .state('appOther.RepayPlanQry', {
                    url: '/RepayPlanQry/:url',
                    templateUrl: 'htmls/RepayPlanQry/RepayPlanQry.html'
                })
                //添利宝部分-----添利宝购买
                .state('appOther.TLB_Buy', {
                    url: '/TLB_Buy',
                    templateUrl: 'htmls/TLB_Buy/Mod.html'
                })
                //添利宝部分-----添利宝投资明细
                .state('appOther.TLB_InvestmentDetail', {
                    url: '/TLB_InvestmentDetail',
                    templateUrl: 'htmls/TLB_InvestmentDetail/TLB_InvestmentDetail.html'
                })
                //添利宝部分-----添利宝详情
                .state('appOther.TLB_ProductSearch', {
                    url: '/TLB_ProductSearch',
                    templateUrl: 'htmls/TLB_ProductSearch/Mod.html'
                })
                //添利宝部分-----添利宝赎回
                .state('appOther.TLB_ShuHui', {
                    url: '/TLB_ShuHui',
                    templateUrl: 'htmls/TLB_ShuHui/Mod.html'
                })
                //添利宝部分----我的添利宝
                .state('appOther.TLBMy', {
                    url: '/TLBMy',
                    templateUrl: 'htmls/TLBMy/TLBMy.html'
                })
                //添利宝部分----添利宝持有查询
                .state('appOther.TLBHoldShareQry', {
                    url: '/TLBHoldShareQry',
                    templateUrl: 'htmls/TLBHoldShareQry/TLBHoldShareQry.html'
                })
                //添利宝部分-----活期产品列表查询
                .state('appOther.TLBProductList', {
                    url: '/TLBProductList',
                    templateUrl: 'htmls/TLBProductList/TLBProductList.html'
                })
                //我的个人信息      
                .state('appOther.MyInformation', {
                    url: '/MyInformation',
                    templateUrl: 'htmls/MyInformation/Mod.html'
                })
                //收益明细
                .state('appOther.IncomeStatement', {
                    url: '/IncomeStatement/:type/:income',
                    templateUrl: 'htmls/IncomeStatement/IncomeStatement.html'
                })
                //银行理财产品查询
                .state('appOther.BankProductQuery', {
                    url: '/BankProductQuery',
                    templateUrl: 'htmls/BankProductQuery/Mod.html'
                })
                //银行理财产品详情
                .state('appOther.BankProductQueryDetail', {
                    url: '/BankProductQueryDetail',
                    templateUrl: 'htmls/BankProductQuery/BankProductQueryDetail.html'
                })
                //银行理财投资明细
                .state('appOther.BankInvestmentDetail', {
                    url: '/BankInvestmentDetail',
                    templateUrl: 'htmls/BankInvestment/BankInvestmentDetail.html'
                })
                //银行理财产品购买
                .state('appOther.BankProductBuy', {
                    url: '/BankProductBuy',
                    templateUrl: 'htmls/BankProductBuy/Mod.html'
                })
                //行内理财产品购买风险评估
                .state('appOther.HNLCRiskAssessment', {
                    url: '/HNLCRiskAssessment',
                    templateUrl: 'htmls/HNLCRiskAssessment/HNLCRiskAssessment.html'
                })
                //行内理财追加购买
                .state('appOther.HNLCAppendBuy', {
                    url: '/HNLCAppendBuy',
                    templateUrl: 'htmls/HNLCAppendBuy/mod.html'
                })
                //行内理财协议
                .state('appOther.HNLCXieyi', {
                    url: '/HNLCXieyi',
                    templateUrl: 'htmls/HNLCXieyi/HNLCXieYi.html'
                })
                //我的理财产品
                .state('appOther.MyBankProduct', {
                    url: '/MyBankProduct',
                    templateUrl: 'htmls/MyBankProduct/MyBankProduct.html'
                })
                //理财产品撤单
                .state('appOther.BankProductCancel', {
                    url: '/BankProductCancel',
                    templateUrl: 'htmls/BankProductCancel/mod.html'
                })
                //我的消息列表
                .state('appOther.MyNews', {
                    url: '/MyNews',
                    templateUrl: 'htmls/MyNews/Mod.html'
                })
                //资金转入
                .state('appOther.MoneyIn', {
                    url: '/MoneyIn',
                    templateUrl: 'htmls/MoneyIn/Mod.html'
                })
                //资金转出
                .state('appOther.MoneyOut', {
                    url: '/MoneyOut',
                    templateUrl: 'htmls/MoneyOut/Mod.html'
                })
                //加油卡充值
                .state('appOther.GasCardCharge', {
                    url: '/GasCardCharge',
                    templateUrl: 'htmls/GasCardCharge/mod.html'
                })
                //加油卡充值记录查询(列表和详情，点击记录可以查看详情)
                .state('appOther.GasCardChargeRecord', {
                    url: '/GasCardChargeRecord',
                    templateUrl: 'htmls/GasCardChargeRecord/mod.html'
                })
                //下载app--公共页
                .state('appOther.DownApp', {
                    url: '/DownApp',
                    templateUrl: 'htmls/DownApp/DownApp.html'
                })
                //精彩活动主页
                .state('appOther.ActiveMain', {
                    url: '/ActiveMain',
                    templateUrl: 'htmls/ActiveMain/Mod.html'
                })
                //我的奖品
                .state('appOther.MyAward', {
                    url: '/MyAward',
                    templateUrl: 'htmls/MyAward/MyAward.html'
                })
                //精彩活动---大转盘
                .state('appOther.Lottery', {
                    url: '/Lottery',
                    templateUrl: 'htmls/Lottery/Lottery.html'
                });
            /*;
            /******路由配置结束******/

            //默认装置路由
            $urlRouterProvider.otherwise(function($injector) {
                var $state = $injector.get("$state");
                if (!sessionStorage.getItem("thirdLogin")) {
                    $state.go("app.Main");
                } else {
                    //sessionStorage.setItem("paramSB")
                    $state.go("appOther.ThirdPartyMain", { "SB": sessionStorage.getItem("paramSB") });
                }
            });

            /******路由配置结束******/

            //是否使用全局controller
            $controllerProvider.allowGlobals();
            // H5模式configure html5 to get links working on jsfiddle
            //$locationProvider.html5Mode(true);

            // lazy controller, directive and service
            ibsapp.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                constant: $provide.constant,
                value: $provide.value
            };
            ibsapp.controller = $controllerProvider.register;
            ibsapp.directive = $compileProvider.directive;
            ibsapp.filter = $filterProvider.register;
            ibsapp.factory = $provide.factory;
            ibsapp.service = $provide.service;
            ibsapp.constant = $provide.constant;
            ibsapp.value = $provide.value;

            ibsapp.asyncjs = function(js, title, noHistory) {
                fn.$inject = ['$q'];

                function fn($q) {
                    if (window.CLIENTMODE) {
                        // 转场调用通知设置标题名称
                        NativeCall.SetTitle(title);
                    } else {
                        if (title) {
                            if (noHistory && noHistory == "nohistory") {
                                vx.element("#app_title .leftBt").hide();
                            } else {
                                vx.element("#app_title .leftBt").show();
                            }
                            vx.element("#app_title").show().children(".center").html(title);
                        } else {
                            vx.element("#app_title").hide();
                        }
                    }
                    if (js) {
                        var delay = $q.defer(),
                            load = function() {
                                $.getScript(js, function() {
                                    delay.resolve();
                                });
                            };
                        load();
                        return delay.promise;
                    }
                }

                return fn;
            };

        }
    ]);

})(window, vx);
;
/*----------------------------------------separator----------------------------------------*/
/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/

(function(vx) {
	
    var locales = {};
    vx.module("ibsapp").value('$locale', locales);

    locales.id = "zh_CN";

    // data-time formats
    locales.DATETIME_FORMATS = {
        "TITLE" : ["年", "月", "日"],
        "MONTH" : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        "SHORTMONTH" : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        "DAY" : ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        "SHORTDAY" : ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        "AMPMS" : ["上午", "下午"],
        "medium" : "yyyy-M-d ah:mm:ss",
        "short" : "yy-M-d ah:mm",
        "fullDate" : "y年M月d日EEEE",
        "longDate" : "y年M月d日",
        "mediumDate" : "yyyy-M-d",
        "shortDate" : "yy-M-d",
        "mediumTime" : "ah:mm:ss",
        "shortTime" : "ah:mm"
    };

    // number formats
    locales.NUMBER_FORMATS = {
        "DECIMAL_SEP" : ".",
        "GROUP_SEP" : ",",
        "PATTERNS" : [{
            "minInt" : 1,
            "minFrac" : 0,
            "maxFrac" : 3,
            "posPre" : "",
            "posSuf" : "",
            "negPre" : "-",
            "negSuf" : "",
            "gSize" : 3,
            "lgSize" : 3
        }, {
            "minInt" : 1,
            "minFrac" : 2,
            "maxFrac" : 2,
            "posPre" : "\u00A4",
            "posSuf" : "",
            "negPre" : "\u00A4-",
            "negSuf" : "",
            "gSize" : 3,
            "lgSize" : 3
        }],
        "CURRENCY_SYM" : "¥"
    };

    /**
     * fields/messages for example $field("xxxx")/$msg("xxxx") or
     * $locale.FIELDS.xxxx/$locale.MESSAGES.xxxx
     */
    var fields = {}, messages = {};
    locales.FIELDS = fields;
    locales.MESSAGES = messages;
    messages["Currency"] = {
        "AUD" : "澳大利亚元",
        "CAD" : "加拿大元",
        "CHF" : "瑞士法郎",
        "CNY" : "人民币",
        "EUR" : "欧元",
        "GBP" : "英镑",
        "HKD" : "港币",
        "JPY" : "日元",
        "NZD" : "新西兰元",
        "SEK" : "瑞典克郎",
        "SGD" : "新加坡元",
        "USD" : "美元"
    };
	messages["idCard"] = {
		"00": "居民身份证",
		"01": "临时身份证",
		"03": "军人身份证",
		"04": "武警身份证",
		"05": "护照",
		"06": "港澳居民往来内地通行证/回乡证",
		"07": "台湾居民往来内地通行证",
		"08": "其他身份证明文件(个人)"
	};
	/*我的奖品-奖品名称*/
    messages["AwardType"]={
      "0" : "开户送流量",
      "1" : "入金抽红包",
      "2" : "推荐赢大奖",
      "3" : "定期转入",
      "4" : "微理财申购",
      "5" : "微袋宝申购",
      "6" : "生活缴费",
      "7" : "手机充值",
      "8" : "加油卡充值"
    };
    /**/
    messages["bdState"]={
      "B":"绑定卡",
      "C":"支付卡"
    };
    /*银行理财-风险评估等级*/
    messages["ProductRisk"]={
        "1" : "极低",
        "2" : "低",
        "3" : "较低",
        "4" : "中等",
        "5" : "高"
    };
    /*缴费历史明细交易状态*/
    messages["chargeStatus"]={
        "0":"成功",
        "1":"失败",
        "2":"待确认",
        "3":"已退款"
    };
    /**精选产品状态**/
    messages["buyStatus"]={
        "0":"预售",
        "1":"购买",
        "2":"售罄"
    };
    /**精选产品分类**/
    messages["Fund_oname"]={
        "ZS":"定期类产品",//招商招益
        "YYY":"定期类产品",//月月盈
        "TLB":"活期类产品",//添利宝
        "WZC":"银行存款",//微智存
        "HNLC":"银行理财"
    };
    /*行内理财交易类型*/
    messages["HNLCTrsType"]={
        "002":"异常冻结到期解冻",
        "110":"差错调整",
        "121":"预约认购",
        "122":"申购",
        "124":"赎回",
        "129":"设置分红方式",
        "12A":"预约变更",
        "130":"认购",
        "131":"份额控制",
        "132":"份额解控",
        "133":"非交易过户申请",
        "134":"非交易过户转出",
        "135":"非交易过户转入",
        "142":"强制赎回",
        "143":"收益",
        "150":"本金兑付",
        "152":"交易撤单",
        "153":"预约撤销",
        "15B":"单笔调整",
        "170":"权益登记",
        "171":"收益分配",
        "172":"收益结转"
    };
    messages["HNLCTrsState"]={
        "0":"申请成功",
        "1":"申请失败",
        "2":"已撤单(成功)",
        "3":"确认成功",
        "4":"确认失败",
        "5":"单笔确认失败",
        "6":"已撤单(超时)",
        "7":"错误失败"
    };
    //月月盈
    //到期安排
    messages["YYY_DQAP"]={
        "01":"到期自动滚入下一期",
        "00":"到期赎回电子帐户"
    };
    //交易类型
    messages["YYY_JYLX"]={
        "RT04":"申购",
        "RT06":"赎回",
        "RT99":"滚入下一期"
    };
    //交易状态
    messages["YYY_JYZT"]={
        "0":"交易成功",
        "1":"交易失败",
        "9":"待处理"
    };
     //添利宝投资明细交易状态
    messages["TLB_JYZT"]={
        "0" : "成功",
      "1" : "未知",
      "2" : "半成功",
      "3" : "半失败",
      "4" : "失败",
      "5" : "申购预处理",
      "6" : "快速赎回预处理",
      "7" : "普通赎回预处理",
      "8" : "正在处理",
      "9" : "初始状态",
      "c" : "交易撤销"
    };
    messages["PayBusiType"]={
     '0':'电费',
     '1':'水费',
     '2':'燃气费',
     '3':'通讯费',
     '4':'有线电视费',
     '5':'加油卡充值',
     '6':'供暖费',
     '7':'物业费',
     '8':'其他'
    };
})(window.vx);
;
/*----------------------------------------separator----------------------------------------*/
vx.module('ui.bootstrap.modal', ['ui.bootstrap.transition'])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
.factory('$$stackedMap', function() {
    return {
        createNew: function() {
            var stack = [];

            return {
                add: function(key, value) {
                    stack.push({
                        key: key,
                        value: value
                    });
                },
                get: function(key) {
                    for (var i = 0; i < stack.length; i++) {
                        if (key == stack[i].key) {
                            return stack[i];
                        }
                    }
                },
                keys: function() {
                    var keys = [];
                    for (var i = 0; i < stack.length; i++) {
                        keys.push(stack[i].key);
                    }
                    return keys;
                },
                top: function() {
                    return stack[stack.length - 1];
                },
                remove: function(key) {
                    var idx = -1;
                    for (var i = 0; i < stack.length; i++) {
                        if (key == stack[i].key) {
                            idx = i;
                            break;
                        }
                    }
                    return stack.splice(idx, 1)[0];
                },
                removeTop: function() {
                    return stack.splice(stack.length - 1, 1)[0];
                },
                length: function() {
                    return stack.length;
                }
            };
        }
    };
})

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
.directive('modalBackdrop', ['$timeout', function($timeout) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'lib/template/modal/backdrop.html',
        link: function(scope, element, attrs) {
            scope.backdropClass = attrs.backdropClass || '';

            scope.animate = false;

            //trigger CSS transitions
            $timeout(function() {
                scope.animate = true;
            });
        }
    };
}])

.directive('modalWindow', ['$modalStack', '$timeout', function($modalStack, $timeout) {
    return {
        restrict: 'EA',
        scope: {
            index: '@',
            animate: '='
        },
        replace: true,
        transclude: true,
        templateUrl: function(tElement, tAttrs) {
            return tAttrs.templateUrl || 'lib/template/modal/window.html';
        },
        link: function(scope, element, attrs) {
            element.addClass(attrs.windowClass || '');
            scope.size = attrs.size;

            $timeout(function() {
                // trigger CSS transitions
                scope.animate = true;

                /**
                 * Auto-focusing of a freshly-opened modal element causes any child elements
                 * with the autofocus attribute to lose focus. This is an issue on touch
                 * based devices which will show and then hide the onscreen keyboard.
                 * Attempts to refocus the autofocus element via JavaScript will not reopen
                 * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
                 * the modal element if the modal does not contain an autofocus element.
                 */
                if (!element[0].querySelectorAll('[autofocus]').length) {
                    element[0].focus();
                }
            });

            scope.close = function(evt) {
                var modal = $modalStack.getTop();
                if (modal && modal.value.backdrop && modal.value.backdrop != 'static' && (evt.target === evt.currentTarget)) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    $modalStack.dismiss(modal.key, 'backdrop click');
                }
            };
        }
    };
}])

.directive('modalTransclude', function() {
    return {
        link: function($scope, $element, $attrs, controller, $transclude) {
            $transclude($scope.$parent, function(clone) {
                $element.empty();
                $element.append(clone);
            });
        }
    };
})

.factory('$modalStack', ['$transition', '$timeout', '$document', '$compile', '$rootScope', '$$stackedMap',
    function($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {

        var OPENED_MODAL_CLASS = 'modal-open';

        var backdropDomEl, backdropScope;
        var openedWindows = $$stackedMap.createNew();
        var $modalStack = {};

        function backdropIndex() {
            var topBackdropIndex = -1;
            var opened = openedWindows.keys();
            for (var i = 0; i < opened.length; i++) {
                if (openedWindows.get(opened[i]).value.backdrop) {
                    topBackdropIndex = i;
                }
            }
            return topBackdropIndex;
        }

        $rootScope.$watch(backdropIndex, function(newBackdropIndex) {
            if (backdropScope) {
                backdropScope.index = newBackdropIndex;
            }
        });

        function removeModalWindow(modalInstance) {

            var body = $document.find('body').eq(0);
            var modalWindow = openedWindows.get(modalInstance).value;

            //clean up the stack
            openedWindows.remove(modalInstance);

            //remove window DOM element
            removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, function() {
                modalWindow.modalScope.$destroy();
                body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
                checkRemoveBackdrop();
            });
        }

        function checkRemoveBackdrop() {
            //remove backdrop if no longer needed
            if (backdropDomEl && backdropIndex() == -1) {
                var backdropScopeRef = backdropScope;
                removeAfterAnimate(backdropDomEl, backdropScope, 150, function() {
                    backdropScopeRef.$destroy();
                    backdropScopeRef = null;
                });
                backdropDomEl = undefined;
                backdropScope = undefined;
            }
        }

        function removeAfterAnimate(domEl, scope, emulateTime, done) {
            // Closing animation
            scope.animate = false;

            var transitionEndEventName = $transition.transitionEndEventName;
            if (transitionEndEventName) {
                // transition out
                var timeout = $timeout(afterAnimating, emulateTime);

                domEl.bind(transitionEndEventName, function() {
                    $timeout.cancel(timeout);
                    afterAnimating();
                    scope.$apply();
                });
            } else {
                // Ensure this call is async
                $timeout(afterAnimating);
            }

            function afterAnimating() {
                if (afterAnimating.done) {
                    return;
                }
                afterAnimating.done = true;

                domEl.remove();
                if (done) {
                    done();
                }
            }
        }

        $document.bind('keydown', function(evt) {
            var modal;

            if (evt.which === 27) {
                modal = openedWindows.top();
                if (modal && modal.value.keyboard) {
                    evt.preventDefault();
                    $rootScope.$apply(function() {
                        $modalStack.dismiss(modal.key, 'escape key press');
                    });
                }
            }
        });

        $modalStack.open = function(modalInstance, modal) {

            openedWindows.add(modalInstance, {
                deferred: modal.deferred,
                modalScope: modal.scope,
                backdrop: modal.backdrop,
                keyboard: modal.keyboard
            });

            var body = $document.find('body').eq(0),
                currBackdropIndex = backdropIndex();

            if (currBackdropIndex >= 0 && !backdropDomEl) {
                backdropScope = $rootScope.$new(true);
                backdropScope.index = currBackdropIndex;
                var vxBackgroundDomEl = vx.element('<div modal-backdrop></div>');
                vxBackgroundDomEl.attr('backdrop-class', modal.backdropClass);
                backdropDomEl = $compile(vxBackgroundDomEl)(backdropScope);
                body.append(backdropDomEl);
            }

            var vxDomEl = vx.element('<div modal-window></div>');
            vxDomEl.attr({
                'template-url': modal.windowTemplateUrl,
                'window-class': modal.windowClass,
                'size': modal.size,
                'index': openedWindows.length() - 1,
                'animate': 'animate'
            }).html(modal.content);

            var modalDomEl = $compile(vxDomEl)(modal.scope);
            openedWindows.top().value.modalDomEl = modalDomEl;
            body.append(modalDomEl);
            body.addClass(OPENED_MODAL_CLASS);
        };

        $modalStack.close = function(modalInstance, result) {
            var modalWindow = openedWindows.get(modalInstance);
            if (modalWindow) {
                modalWindow.value.deferred.resolve(result);
                removeModalWindow(modalInstance);
            }
        };

        $modalStack.dismiss = function(modalInstance, reason) {
            var modalWindow = openedWindows.get(modalInstance);
            if (modalWindow) {
                modalWindow.value.deferred.reject(reason);
                removeModalWindow(modalInstance);
            }
        };

        $modalStack.dismissAll = function(reason) {
            var topModal = this.getTop();
            while (topModal) {
                this.dismiss(topModal.key, reason);
                topModal = this.getTop();
            }
        };

        $modalStack.getTop = function() {
            return openedWindows.top();
        };

        return $modalStack;
    }
])

.provider('$modal', function() {

    var $modalProvider = {
        options: {
            backdrop: true, //can be also false or 'static'
            keyboard: true
        },
        $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$modalStack',
            function($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {

                var $modal = {};

                function getTemplatePromise(options) {
                    return options.template ? $q.when(options.template) :
                        $http.get(vx.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl, {
                            cache: $templateCache
                        }).then(function(result) {
                            return result.data;
                        });
                }

                function getResolvePromises(resolves) {
                    var promisesArr = [];
                    vx.forEach(resolves, function(value) {
                        if (vx.isFunction(value) || vx.isArray(value)) {
                            promisesArr.push($q.when($injector.invoke(value)));
                        }
                    });
                    return promisesArr;
                }

                $modal.open = function(modalOptions) {

                    var modalResultDeferred = $q.defer();
                    var modalOpenedDeferred = $q.defer();

                    //prepare an instance of a modal to be injected into controllers and returned to a caller
                    var modalInstance = {
                        result: modalResultDeferred.promise,
                        opened: modalOpenedDeferred.promise,
                        close: function(result) {
                            $modalStack.close(modalInstance, result);
                        },
                        dismiss: function(reason) {
                            $modalStack.dismiss(modalInstance, reason);
                        }
                    };

                    //merge and clean up options
                    modalOptions = vx.extend({}, $modalProvider.options, modalOptions);
                    modalOptions.resolve = modalOptions.resolve || {};

                    //verify options
                    if (!modalOptions.template && !modalOptions.templateUrl) {
                        throw new Error('One of template or templateUrl options is required.');
                    }

                    var templateAndResolvePromise =
                        $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


                    templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

                        var modalScope = (modalOptions.scope || $rootScope).$new();
                        modalScope.$close = modalInstance.close;
                        modalScope.$dismiss = modalInstance.dismiss;

                        var ctrlInstance, ctrlLocals = {};
                        var resolveIter = 1;

                        //controllers
                        if (modalOptions.controller) {
                            ctrlLocals.$scope = modalScope;
                            ctrlLocals.$modalInstance = modalInstance;
                            vx.forEach(modalOptions.resolve, function(value, key) {
                                ctrlLocals[key] = tplAndVars[resolveIter++];
                            });

                            ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                            if (modalOptions.controllerAs) {
                                modalScope[modalOptions.controllerAs] = ctrlInstance;
                            }
                        }

                        $modalStack.open(modalInstance, {
                            scope: modalScope,
                            deferred: modalResultDeferred,
                            content: tplAndVars[0],
                            backdrop: modalOptions.backdrop,
                            keyboard: modalOptions.keyboard,
                            backdropClass: modalOptions.backdropClass,
                            windowClass: modalOptions.windowClass,
                            windowTemplateUrl: modalOptions.windowTemplateUrl,
                            size: modalOptions.size
                        });

                    }, function resolveError(reason) {
                        modalResultDeferred.reject(reason);
                    });

                    templateAndResolvePromise.then(function() {
                        modalOpenedDeferred.resolve(true);
                    }, function() {
                        modalOpenedDeferred.reject(false);
                    });

                    return modalInstance;
                };

                return $modal;
            }
        ]
    };

    return $modalProvider;
});
;
/*----------------------------------------separator----------------------------------------*/
vx.module('ui.bootstrap.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
.factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {

    var $transition = function(element, trigger, options) {
        options = options || {};
        var deferred = $q.defer();
        var endEventName = $transition[options.animation ? 'animationEndEventName' : 'transitionEndEventName'];

        var transitionEndHandler = function(event) {
            $rootScope.$apply(function() {
                element.unbind(endEventName, transitionEndHandler);
                deferred.resolve(element);
            });
        };

        if (endEventName) {
            element.bind(endEventName, transitionEndHandler);
        }

        // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
        $timeout(function() {
            if (vx.isString(trigger)) {
                element.addClass(trigger);
            } else if (vx.isFunction(trigger)) {
                trigger(element);
            } else if (vx.isObject(trigger)) {
                element.css(trigger);
            }
            //If browser does not support transitions, instantly resolve
            if (!endEventName) {
                deferred.resolve(element);
            }
        });

        // Add our custom cancel function to the promise that is returned
        // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
        // i.e. it will therefore never raise a transitionEnd event for that transition
        deferred.promise.cancel = function() {
            if (endEventName) {
                element.unbind(endEventName, transitionEndHandler);
            }
            deferred.reject('Transition cancelled');
        };

        return deferred.promise;
    };

    // Work out the name of the transitionEnd event
    var transElement = document.createElement('trans');
    var transitionEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'transition': 'transitionend'
    };
    var animationEndEventNames = {
        'WebkitTransition': 'webkitAnimationEnd',
        'MozTransition': 'animationend',
        'OTransition': 'oAnimationEnd',
        'transition': 'animationend'
    };

    function findEndEventName(endEventNames) {
        for (var name in endEventNames) {
            if (transElement.style[name] !== undefined) {
                return endEventNames[name];
            }
        }
    }

    $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
    $transition.animationEndEventName = findEndEventName(animationEndEventNames);
    return $transition;
}]);
;
/*----------------------------------------separator----------------------------------------*/
'use strict';
vx.module('ui.libraries').directive('uiJq', ['$timeout', function ($timeout) {

	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			// Call jQuery method and pass relevant options
			function callPlugin() {
				var pluginOptions, pluginName;
				pluginOptions = scope.$eval(attrs.jqOptions);
				if (pluginOptions && !vx.isArray(pluginOptions)) {
					pluginOptions = [pluginOptions];
				}
				pluginName = attrs.uiJq;
				$timeout(function () {
					if(element[pluginName]===undefined){
						throw Error("please load the plugin which name is \'" + pluginName + "\' before use it!!!!");
					}
					element[pluginName].apply(element, pluginOptions);
				}, 0, false);
			}

			function refresh() {
				// If ui-refresh is used, re-fire the the method upon every change
				if (attrs.uiRefresh) {
					scope.$watch(attrs.uiRefresh, function () {
						callPlugin();
					});
				}
			}

			callPlugin();
			refresh();
		}
	};
}]);;
/*----------------------------------------separator----------------------------------------*/
/* @author:xuxihai
 * 待完善，未处理请求完成后重置倒计时
 * 倒计时按钮指令(支持input和button元素)
 * usage:ui-timebtn='{"time":10,"callback":"sendSMS"}'
 * */
(function (vx, $) {
	'use strict';
	$.fn.timebtn = function (options) {
		var defaults = {
			time: 60,
			disableLabel: "重新获取",
			startCallback: null,
			endCallback: null,
		};

		function TimeButton(element) {
			var that = this;
			this.options = $.extend({}, defaults, options || {});
			if (element.is("input")) {
				this.type = "input";
				this.defaultLabel = element.val();
			} else if (element.is("button")) {
				this.type = "button";
				this.defaultLabel = element.text();
			} else {
				throw Error("element " + element[0].outerHTML + " is not a button!");
			}
			that.el = element;
			that.curr = this.options.time;
			that.el.on("click", function () {
				that.start();
			});
		}

		TimeButton.prototype = {
			labelUpdate: function (curr) {
				if (this.type == "input") {
					this.el.val(this.options.disableLabel + "(" + curr + ")");
				} else {
					this.el.text(this.options.disableLabel + "(" + curr + ")");
				}
			},
			labelReset: function () {
				if (this.type == "input") {
					this.el.val(this.defaultLabel);
				} else {
					this.el.text(this.defaultLabel);
				}
			},
			count: function () {
				var that = this;//计时器会变更执行环境
				that.timer = setInterval(function () { //计时器会变更执行环境
					if (that.curr < 2) {
						that.el.removeAttr("disabled");
						that.labelReset();
						that.curr = that.options.time;
						clearInterval(that.timer);
						var endcall = that.options.endCallback;
						if (endcall && typeof endcall == "function") {
							endcall.apply(that.el);
						}
					} else {
						that.curr--;
						that.labelUpdate(that.curr);
					}
				}, 1000);
			},
			start: function () {
				var startcall = this.options.startCallback;
				if (startcall && typeof startcall == "function") {
					startcall.apply(this.el);
				}
				this.el.attr("disabled", "true");
				this.labelUpdate(this.curr);
				this.count();
			}
		}
		return new TimeButton(this);
	};
	var mod = vx.module("ui.libraries");
	mod.directive("uiTimebtn",
		function () {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					var options = $.extend({
						time: 15
					}, vx.fromJson(attrs.uiTimebtn || {}));
					if (options.callback && scope[options.callback]) {
						options.startCallback = function () {
							scope.$apply(function () {
								scope[options.callback]();
							});
						};
					}
					element.timebtn(options);
				}
			};
		});
})(window.vx, window.$);;
/*----------------------------------------separator----------------------------------------*/
(function(window, vx, undefined) {'use strict';
	var directive = {};
	directive.placeholder = ["$timeout",
	function($timeout) {
		return {
			restrict : 'A',
			link : function($scope, $element, attrs) {
				if (vx.msie && (vx.msie < 10 || document.documentMode < 10)) {
					var vModel = attrs.vModel;
					$element.wrap("<span class='fakePlaceholderWarp' id='FPW_" + vModel + "'></span>");
					var $span = $element.parent(), $label;
					$span.append("<label style='display:none;' class='fakePlaceholder' id='FP_" + vModel + "'>" + attrs.placeholder + "</label>");
					$element.addClass('placeholderInput');
					$label = $element.siblings('label');
					//延时显示label，因为有的vModel是在vInit中初始化的
					$timeout(function() {
						if (vx.isEmpty($element.scope()[vModel])) {
							$label.show();
						}
					}, 500);

					$label.bind('click', function() {
						$(this).hide();
						$element.focus();
					});

					$element.bind("focus", function() {
						$label.hide();
					});

					$element.bind("blur", function() {
						var txtValue = $element.val();
						if (vx.isEmpty(txtValue)) {
							$label.show();
						}
					});
				}
			}
		};
	}];
	vx.module('ui.libraries').directive(directive);
})(window, window.vx);;
/*----------------------------------------separator----------------------------------------*/
/**
 * 账户格式化，四位一空格
 * @author：tian
 */
(function (window, vx) {
	'use strict';
	var ibsapp = vx.module("ui.libraries");

	function accountNoFilter() {
		return function (input) {
			if (input !== undefined)
				input = input.replace(/(.{4})/g, "$1 ");
			return input;
		};
	}


	ibsapp.filter('accountNoFilter', accountNoFilter);

})(window, window.vx);;
/*----------------------------------------separator----------------------------------------*/
/**
 * @author filter template 大写金额转换
 * @author：tian
 */
(function (window, vx) {
	'use strict';

	function amountFilter() {
		return function (input) {
			if (input !== undefined) {
				var strOutput = "", strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
				input += "00";
				var intPos = input.indexOf('.');
				if (intPos >= 0) {
					input = input.substring(0, intPos) + input.substr(intPos + 1, 2);
				}
				strUnit = strUnit.substr(strUnit.length - input.length);
				for (var i = 0; i < input.length; i++) {
					strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(input.substr(i, 1), 1) + strUnit.substr(i, 1);
				}
				return strOutput.replace(/^零角零分$/, '').replace(/零角零分$/, '整').replace(/^零元零角/, '').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元").replace(/零角/, '零').replace(/零元/, '').replace(/零分$/, "");
			}
			return input;
		};
	}


	vx.module('ui.libraries').filter('amountFilter', amountFilter);

})(window, window.vx);;
/*----------------------------------------separator----------------------------------------*/
/**
 * @author 日期yyyyMMdd转换成yyyy-MM-dd
 * @author：tian
 */
(function(window, vx) {
	'use strict';

	// accountNo.$inject = ['$locale'];
	function dateConvertFilter() {
		return function(input) {
			if (input !== undefined) {
				if (/^\d{8}$/g.test(input) == true) {
					input = input.substring(0, 4) + '-' + input.substring(4, 6)
							+ '-' + input.substring(6, input.length);
				}

			}
			return input;
		};
	}

	vx.module('ui.libraries').filter('dateConvertFilter', dateConvertFilter);

})(window, window.vx);;
/*----------------------------------------separator----------------------------------------*/
/**
 * @author tian
 * filter 模糊账号处理    1234****5678
 */
(function (window, vx) {
	'use strict';

	function dimAcNoFilter() {
		return function (input) {
			if (input !== undefined)
				return input.substring(0, 4) + "****" + input.substring(input.length - 4);
		};
	}


	vx.module('ui.libraries').filter('dimAcNoFilter', dimAcNoFilter);

})(window, window.vx);;
/*----------------------------------------separator----------------------------------------*/
/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/

/**
 * 过滤器命名规范：xxxFtr
 * 判空显示暂无
 */
(function (window, vx) {
	'use strict';

	vx.module("ui.libraries").filter('isNullFtr', function () {
		return function (input) {
			if (input === null || input === undefined) {
				return "暂无";
			}
			return input;
		};
	});

})(window, window.vx);;
/*----------------------------------------separator----------------------------------------*/
/**
 * @authot
 * filter 加密手机号码    123****5678
 */
(function(window, vx) {
	'use strict';

	function dimPhoneNumFilter() {
		return function(input) {
			if(input !== undefined)
				return input.substring(0, 3) + "****" + input.substring(input.length - 4);
		};
	}

	vx.module('ui.libraries').filter('dimPhoneNumFilter', dimPhoneNumFilter);

})(window, window.vx);;
/*----------------------------------------separator----------------------------------------*/
/**
 * @author zy
 */
(function(window, vx, undefined) {'use strict';
	var filter = {};
	filter.percent = ['calculate','$filter',function(calculate,$filter) {
		return function(input, length) {
		   var dotLength=length||4;
           if(/^[\d.]+$/.test(input)){
               	return $filter("number")(calculate.accMul(input,1),dotLength)+"%";
           }
		};
	}];
	vx.module('ui.libraries').filter('percent', filter.percent);
})(window, window.vx);;
/*----------------------------------------separator----------------------------------------*/
/**
 * @author zy
 */
(function(window, vx, undefined) {'use strict';
	var filter = {};
	filter.showDay = [function() {
		return function(input) {
		   if(!input){
		   	 return ;
		   }else if( input*1+""=='NaN'){
              return input;
		   }else{
		   	  return input+"天";
		   }
		};
	}];
	vx.module('ibsapp').filter('showDay', filter.showDay);
})(window, window.vx);
(function(window, vx) {'use strict';
	function amountTwo() {
		return function(input) {
			if (input !== undefined && input > 9999) {
				return input / 10000 + '万';
			} else {
				return input;
			}

		};
	}


	vx.module('ui.libraries').filter('amountTwoFtr', amountTwo);
})(window, window.vx);
/**
 * @wangkai
 * filter 月份小写转大写
 */
(function(window, vx) {'use strict';
	function MonthToUpper() {
		return function(input) {
			if (input !== undefined) {
				var date = new Date();
				var month = date.getMonth() + 1;
				//当前月份

				if (input == month) {
					return "本";
				} else {
					switch(input) {
						case "1":
							return "一";
						case "2":
							return "二";
						case "3":
							return "三";
						case "4":
							return "四";
						case "5":
							return "五";
						case "6":
							return "六";
						case "7":
							return "七";
						case "8":
							return "八";
						case "9":
							return "九";
						case "10":
							return "十";
						case "11":
							return "十一";
						case "12":
							return "十二";
						default:
							return input;
					}
				}
			}
			return input;
		};
	}


	vx.module('ui.libraries').filter('MonthToUpper', MonthToUpper);

})(window, window.vx);
//银行卡过滤器
(function(window, vx) {'use strict';
	function bankCardCalor() {
		return function(input) {
			
			switch (input) {
				case "305100000013":
					return "card01 bank_minsheng";
				case "102100099996":
					return "card01 bank_gongshang";
				case "104100000004":
					return "card01 bank_zhongguo";
				case "403100000004":
					return "card01 bank_youzheng";
				case "309391000011":
					return "card01 bank_xingye";
				case "303100000006":
					return "card01 bank_guangda";
				case "307584007998":
					return "card01 bank_pingan";
				case "306581000003":
					return "card01 bank_guangfa";
				case "302100011000":
					return "card01 bank_zhongxin";
				case "313168000003":
					return "card01 bank_jincheng";
				default:
					return "card01 bank_other";
			}
		};
	};
	vx.module('ui.libraries').filter('bankCardCalor', bankCardCalor);
})(window, window.vx); 
//银行卡logo过滤器
(function(window, vx) {'use strict';
	function bankCardLogoFilterFn() {
		return function(input) {
			
			switch (input) {
				case "305100000013":
					return "minsheng.png";
				case "102100099996":
					return "zhongguogongshang.png";
				case "104100000004":
					return "zhongguoyinhang.png";
				case "403100000004":
					return "zhonguoyouzheng.png";
				case "309391000011":
					return "xingye.png";
				case "303100000006":
					return "guangda.png";
				case "307584007998":
					return "pingan.png";
				case "306581000003":
					return "guangfa.png";
				case "302100011000":
					return "zhongxin.png";
				case "313168000003":
					return "jincheng.png";
				default:
					return "";	
			}
		};
	};
	vx.module('ui.libraries').filter('bankCardLogoFilter', bankCardLogoFilterFn);
})(window, window.vx);
;
/*----------------------------------------separator----------------------------------------*/
//风险等级
(function(window, vx) {'use strict';
	function riskLevelCalor() {
		return function(input) {
			switch (input) {
				case '0':
				case 0:
					return "risk_no";
					break;
				case '1':
				case 1:
					return "risk_di";
					break;
				case '2':
				case 2:
					return "risk_di";
					break;
				case '3':
				case 3:
					return "risk_di";
					break;
				case '4':
				case 4:
					return "risk_zhong";
					break;
				case '5':
				case 5:
					return "risk_gao";
					break;
				default:
					return "risk_gao";
					break;
			}
		};
	};
	vx.module('ui.libraries').filter('riskLevelCalor', riskLevelCalor);
})(window, window.vx); ;
/*----------------------------------------separator----------------------------------------*/
(function (window, vx, undefined) {
	var mod = vx.module("ui.libraries");
	/**
	 * $os
	 * @author 
	 * @param {Object} window
	 * @param {Object} vx
	 * 获取终端设备型号及浏览器内核的服务
	 **/
	mod.factory('$os', function() {
		var os = {
			webkit : navigator.userAgent.match(/WebKit\/([\d.]+)/) ? true : false,
			android : navigator.userAgent.match(/(Android)\s+([\d.]+)/) || navigator.userAgent.match(/Silk-Accelerated/) ? true : false,
			androidICS : this.android && navigator.userAgent.match(/(Android)\s4/) ? true : false,
			ipad : navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false,
			iphone : !(navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false) && navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false,
			ios : (navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false) || (!(navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false) && navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false),
			ios5 : (navigator.userAgent.match(/(iPad).*OS\s([5_]+)/) ? true : false) || (!(navigator.userAgent.match(/(iPad).*OS\s([5_]+)/) ? true : false) && navigator.userAgent.match(/(iPhone\sOS)\s([5_]+)/) ? true : false),
			wphone : navigator.userAgent.match(/Windows Phone/i) ? true : false,
			firefox : navigator.userAgent.match(/Firefox/i) ? true: false
		};
		return os;
	});
})(window, vx);;
/*----------------------------------------separator----------------------------------------*/
/**
 * @author zy
 */
(function(window, vx, undefined) {
    'use strict';
    var services = {};
    services.calculate = [function() {
        return {
            accAdd: function(arg1, arg2) { //加
                var r1, r2, m;
                try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
                try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
                m = Math.pow(10, Math.max(r1, r2))
                return (arg1 * m + arg2 * m) / m
            },
            accSub: function(arg1, arg2) { //减法
                var r1, r2, m, n;
                try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
                try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
                m = Math.pow(10, Math.max(r1, r2));
                //动态控制精度长度
                n = (r1 >= r2) ? r1 : r2;
                return ((arg1 * m - arg2 * m) / m).toFixed(n);
            },
            accMul: function(arg1, arg2) { //乘
                var m = 0,
                    s1 = arg1.toString(),
                    s2 = arg2.toString();
                try { m += s1.split(".")[1].length } catch (e) {}
                try { m += s2.split(".")[1].length } catch (e) {}
                return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
            }
        }
    }];
    vx.module('ui.libraries').factory(services);
})(window, window.vx);
;
/*----------------------------------------separator----------------------------------------*/
/**
 * @author wbr
 * 日期相关工具
 * */
(function(window, vx, undefined) {
    'use strict';
    var service = {};
    service.$dateUtil = ['$filter',
        function($filter) {
            return {

                /**
                 * 要返回的提示信息
                 */
                flagStr: '',

                /**
                 * 判断是否日期格式
                 * @author wangjian
                 * @param  dateStart [description]
                 * @param  dateEnd   [description]
                 */
                isDateString: function(dateStart, dateEnd) {

                    if (arguments.length == 1) {
                        return isDateStr(arguments[0]);
                    } else if (arguments.length == 2) {
                        var date1 = isDateStr(arguments[0]);
                        var date2 = isDateStr(arguments[1]);
                        return (date1 && date2);
                    } else {
                        return false;
                    }

                    // 判断一个字符串是否为合法的日期格式：YYYY-MM-DD HH:MM:SS
                    //或 YYYY-MM-DD
                    function isDateStr(ds) {
                        var parts = ds.split(' ');
                        switch (parts.length) {
                            case 2:
                                if (isDatePart(parts[0]) === true && isTimePart(parts[1])) {
                                    return true;
                                } else {
                                    return false;
                                }
                                break;
                            case 1:
                                var aPart = parts[0];
                                if (aPart.indexOf(':') > 0) {
                                    return isTimePart(aPart);
                                } else {
                                    return isDatePart(aPart);
                                }
                                break;
                            default:
                                return false;
                        }
                    }

                    //判断一个字符串是否为合法的日期格式：YYYY-MM-DD
                    function isDatePart(dateStr) {
                        var parts;
                        if (dateStr.indexOf("-") > -1) {
                            parts = dateStr.split('-');
                        } else if (dateStr.indexOf("/") > -1) {
                            parts = dateStr.split('/');
                        } else {
                            return false;
                        }
                        if (parts.length < 3) {
                            //日期部分不允许缺少年、月、日中的任何一项
                            return false;
                        }
                        for (var i = 0; i < 3; i++) {
                            //如果构成日期的某个部分不是数字，则返回false
                            if (isNaN(parts[i])) {
                                return false;
                            }
                        }
                        var y, m, d;
                        y = parts[0];
                        //年
                        m = parts[1];
                        //月
                        d = parts[2];
                        //日
                        //限定年月日的范围
                        if (y > 3000) {
                            return false;
                        }
                        if (m < 1 || m > 12) {
                            return false;
                        }
                        if (d < 1 || d > 31) {
                            return false;
                        }
                        switch (d) {
                            case 29:
                                if (m == 2) {
                                    //如果是2月份
                                    if ((y / 100) * 100 == y && (y / 400) * 400 != y) {
                                        //如果年份能被100整除但不能被400整除 (即闰年)
                                    } else {
                                        return false;
                                    }
                                }
                                break;
                            case 30:
                                if (m == 2) {
                                    //2月没有30日
                                    return false;
                                }
                                break;
                            case 31:
                                if (m == 2 || m == 4 || m == 6 || m == 9 || m == 11) {
                                    //2、4、6、9、11月没有31日
                                    return false;
                                }
                                break;
                            default:
                                return true;
                        }
                        return true;
                    }

                    // isDatePart(dateStr)结束

                    function isTimePart(timeStr) {
                        var parts;
                        parts = timeStr.split(':');
                        if (parts.length < 2) {
                            //日期部分不允许缺少小时、分钟中的任何一项
                            return false;
                        }
                        for (var i = 0; i < parts.length; i++) {
                            //如果构成时间的某个部分不是数字，则返回false
                            if (isNaN(parts[i])) {
                                return false;
                            }
                        }
                        var h, m, s;
                        h = parts[0];
                        //小时
                        m = parts[1];
                        //分钟
                        if (h < 0 || h > 23) {
                            //限制小时的范围
                            return false;
                        }
                        if (m < 0 || h > 59) {
                            //限制分钟的范围
                            return false;
                        }
                        if (parts.length > 2) {
                            s = parts[2];
                            //日
                            if (s < 0 || s > 59) {
                                //限制秒的范围
                                return false;
                            }
                        }
                        return true;
                    }

                    //isDatePart(dateStr)结束

                },
                /**
                 * 判断日期区间是否合法
                 * @author wangjian
                 * @param  {[type]}  startDate [起始时间]
                 * @param  {[type]}  endDate   [结束时间]
                 * @param  {[type]}  interval  [月份限制，两个日期超过这个限制则返回false]
                 * @return {Boolean}           [结果]
                 */
                isCorrectDateInterval: function(startDate, endDate, interval) {
                    //这里传递的是字符串

                    if (arguments.length == 3) {

                        if (startDate === undefined) {
                            this.flagStr = "开始日期不能为空!";
                            return false;
                        } else if (endDate === undefined) {
                            this.flagStr = "结束日期不能为空!";
                            return false;
                        }
                        var intervalMonth = 3;
                        var intervalYear = 1;
                        if (interval !== undefined) {
                            try {
                                intervalMonth = Number(interval);
                                if (isNaN(intervalMonth)) {
                                    this.flagStr = "间隔日期不能解析!";
                                    return false;
                                }
                                if (intervalMonth <= 0 || intervalMonth > 12) {
                                    this.flagStr = "超出间隔日期的范围！";
                                    return false;
                                }
                            } catch (err) {
                                this.flagStr = "间隔日期不能解析";
                                return false;
                            }
                        }

                        if (this.isDateString(startDate) === false) {

                            this.flagStr = "开始时间格式错误，请从新输入！";
                            return false;
                        } else if (this.isDateString(endDate) === false) {
                            this.flagStr = "结束时间格式错误，请从新输入！";
                            return false;

                        }

                        var _startDate = arguments[0].replace(/-/g, "\/");
                        var _endDate = arguments[1].replace(/-/g, "\/");
                        var dateStart = new Date(_startDate);
                        var dateEnd = new Date(_endDate);
                        var currentDate = new Date();

                        //要得到晚一年的时间
                        var lackOneYear_year = Number(currentDate.getFullYear()) - 1;
                        var lackOneYear_month = currentDate.getMonth();
                        var lackOneYear_day = currentDate.getDate();
                        var lackOneYear = new Date(lackOneYear_year, lackOneYear_month, lackOneYear_day);

                        if (currentDate - dateStart < 0) {
                            this.flagStr = "开始时间大于当前时间！";
                            return false;
                        } else if (currentDate - dateEnd < 0) {
                            this.flagStr = "结束时间大于当前时间！";
                            return false;
                        } else if (dateStart - dateEnd > 0) {
                            this.flagStr = "开始时间大于结束时间！";
                            return false;
                        }

                        if (dateStart - lackOneYear < 0) {

                            this.flagStr = "查询的时间跨度不能超过一年！";
                            return false;
                        } else if (dateEnd - lackOneYear < 0) {
                            this.flagStr = "查询的时间跨度不能超过一年！";
                            return false;
                        }

                        var startNum = _startDate.split('/');
                        var endNum = _endDate.split('/');

                        //获取开始时间的年月日
                        var startYear = parseInt(startNum[0], 10);
                        var startMonth = parseInt(startNum[1], 10);
                        var startDay = parseInt(startNum[2], 10);

                        //获取结束时间的年月日
                        var endYear = parseInt(endNum[0], 10);
                        var endMonth = parseInt(endNum[1], 10);
                        var endDay = parseInt(endNum[2], 10);

                        //获取年月日的差值，用于两者的比较
                        var year = endYear - startYear;
                        var month = endMonth - startMonth;
                        var day = endDay - startDay;

                        if (year > 1) {
                            this.flagStr = "超过一年了！";
                            return false;

                        } else if (year == 1) {
                            var oneYearMonth = month + 12;

                            //先判断超过一年的，在判断超过三个月的。
                            if (month > 0) {
                                this.flagStr = "超过一年的不能查询！";
                                return false;
                            } else if (month === 0) {
                                if (day > 0) {
                                    this.flagStr = "超过一年的不能查询！";
                                    return false;
                                } else {
                                    this.flagStr = "没有超过一年但是超过三个月！";
                                    return false;
                                }
                            } else {
                                if (oneYearMonth > intervalMonth) {
                                    this.flagStr = "超过" + intervalMonth + "个月了,请重新输入日期！";
                                    return false;
                                } else if (oneYearMonth == intervalMonth) {
                                    if (day > 0) {
                                        this.flagStr = "超过" + intervalMonth + "个月了,请重新输入日期！";
                                        return false;
                                    } else {
                                        this.flagStr = "";
                                        return true;
                                    }

                                } else {
                                    this.flagStr = "";
                                    return true;
                                }
                            }

                        } else if (year === 0) {
                            if (month > intervalMonth) {
                                this.flagStr = "超过" + intervalMonth + "个月了,请重新输入日期！";
                                return false;
                            } else if (month == intervalMonth) {
                                if (day > 0) {
                                    this.flagStr = "超过" + intervalMonth + "个月了,请重新输入日期！";
                                    return false;
                                } else {
                                    this.flagStr = "";
                                    return true;
                                }

                            } else {
                                this.flagStr = "";
                                return true;
                            }

                        } else {
                            return false;
                        }

                    } else if (arguments.length == 2) {
                        var _startDate = arguments[0].replace(/-/g, "\/");
                        var _endDate = arguments[1].replace(/-/g, "\/");
                        var dateStart = new Date(_startDate);
                        var dateEnd = new Date(_endDate);
                        var currentDate = new Date();
                        if (currentDate - dateStart < 0) {
                            this.flagStr = "开始时间大于当前时间！";
                            return false;
                        } else if (currentDate - dateEnd < 0) {
                            this.flagStr = "结束时间大于当前时间！";
                            return false;
                        } else if (dateStart - dateEnd > 0) {
                            this.flagStr = "开始时间大于结束时间！";
                            return false;
                        } else {
                            this.flagStr = "";
                            return true;
                        }
                    }
                    //传递的参数不是两个或三个的时候都返回false
                    else {
                        this.flagStr = '参数传递不对！';
                        return false;
                    }

                },

                /**
                 * 获得错误原因
                 * @author wangjian
                 * @return {string} 返回校验错误的原因
                 */
                getErrorReason: function() {

                    return this.flagStr;
                },

                /**
                 * [getStandardDate description]
                 * @author wangjian
                 * @param  {[type]} dateStr [description]
                 * @return {[type]}         [description]
                 */
                getStandardDate: function(dateStr) { //这个方法暂时是没有用的

                    var dateString = dateStr;
                    var dateLength = dateString.length;
                    var year, month, day;
                    var dateNum = [];
                    if (dateLength <= 0 || dateLength > 8) {
                        this.flagStr = '时间的格式不对！';
                        return false;
                    } else {
                        dateNum[0] = dateString.substring(0, 4);
                        if (dateString.substring(4, 5) === '0') {
                            dateNum[1] = dateString.substring(5, 6);
                        } else {
                            dateNum[1] = dateString.substring(5, 7);
                        }

                    }

                },

                /**
                 * 获得当前时间
                 * @author wangjian
                 * @param  {[type]} t [description]
                 * @return {[type]}   [description]
                 */
                getDate: function(t) {
                    if (!t) {
                        return new Date();
                    }
                    var TIMESTAMP_REG = /^\d{13}$/;
                    var DATE_STR_REG = /^\d{4}[\.\-\/]\d{1,2}[\.\-\/]\d{1,2}$/;
                    var isTs = TIMESTAMP_REG.test(t);
                    var isDateStr = DATE_STR_REG.test(t);
                    if (isTs) {
                        t = parseInt(t, 10);
                        return new Date(t);
                    } else if (isDateStr) {
                        return new Date(t);
                    } else {
                        try {
                            return new Date(t);
                        } catch (e) {
                            throw "DateUtil.getDate() invalid parameter";
                        }
                    }
                },

                /**
                 * 计算某一时间偏移后的时间
                 * @author wangjian
                 * @param  {[type]} days         偏移量
                 * @param  {[type]} standardDate 起始时间
                 * @param  {[type]} format       [description]
                 * @return {[type]}              返回时间
                 */
                 
                changeDate: function(days, standardDate, format) {
                    format = format || 'yyyy-MM-dd';
                    if (days && !standardDate) {
                        var group = days.match(/(-?\d+)([dDMmWw])/);
                        var value = parseInt(group[1], 10),
                            type = group[2].toUpperCase();
                        if (type === 'D')
                            return $filter('date')(new Date(new Date().getTime() + (value * 24 * 3600 * 1000)), format);
                        else if (type === 'W')
                            return $filter('date')(new Date(new Date().getTime() + (value * 7 * 24 * 3600 * 1000)), format);
                        else if (type === 'M') {
                            var date = new Date();
                            date.setMonth(date.getMonth() + value);
                            return $filter('date')(date, format);
                        }
                    } else if (days && standardDate) {
                        var group = days.match(/(-?\d+)([dDMmWw])/);
                        var value = parseInt(group[1], 10),
                            type = group[2].toUpperCase();
                        if (type === 'D')
                            return $filter('date')(new Date(standardDate.getTime() + (value * 24 * 3600 * 1000)), format);
                        else if (type === 'W')
                            return $filter('date')(new Date(standardDate.getTime() + (value * 7 * 24 * 3600 * 1000)), format);
                        else if (type === 'M') {
                            var date = new Date(standardDate);
                            date.setMonth(date.getMonth() + value);
                            return $filter('date')(date, format);
                        }
                    } else
                        return $filter('date')(new Date(), format);
                },

                /**
                 * 计算两个日期之间的相差天数
                 * @author wangjian
                 * @param  {[type]} beginDate 起始时间
                 * @param  {[type]} endDate   [结束时间]
                 * @return {[type]}           [天数]
                 */
                daysBetween: function(beginDate, endDate) {
                    var opts = Object.prototype.toString,
                        difference;
                    if (opts.call(beginDate) === "[object Date]" && opts.call(endDate) === "[object Date]") {
                        difference = (endDate.getTime() - beginDate.getTime()) / 86400000;
                    } else {
                        var OneMonth = beginDate.substring(5, beginDate.lastIndexOf('-'));
                        var OneDay = beginDate.substring(beginDate.length, beginDate.lastIndexOf('-') + 1);
                        var OneYear = beginDate.substring(0, beginDate.indexOf('-'));
                        var TwoMonth = endDate.substring(5, endDate.lastIndexOf('-'));
                        var TwoDay = endDate.substring(endDate.length, endDate.lastIndexOf('-') + 1);
                        var TwoYear = endDate.substring(0, endDate.indexOf('-'));
                        difference = ((Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear) - Date.parse(OneMonth + '/' + OneDay + '/' + OneYear)) / 86400000);
                    }
                    return difference;
                }
            };
        }
    ];

    vx.module('ui.libraries').service(service);

})(window, window.vx);
;
/*----------------------------------------separator----------------------------------------*/
/**
 * @author Zhengjinguang
 */
(function(window, vx, undefined) {
	'use strict';

	var services = {};
	services.$cookieService = [ function() {
		return {
			addCookice : function(name,value,expireHours) {
				// TODO 添加函数过程
				var cookieStr=name+"="+escape(value);
				//是否设置过期时间
				if(expireHours>0){
					var date =new Date();
					date.setTime(date.getTime+expireHours*3600*1000);
					cookieStr=cookieStr+";expires="+date.toGMTString();
				}
				document.cookie=cookieStr;			
			},
			getCookie : function(name){
				
				var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
				if(arr != null) 
					return unescape(arr[2]); 
				return null;
				
			},
			deleteCookie : function(name){
				var exp=new Date();
				exp.setTime(exp.getTime()-10000);
				var cval=this.getCookie(name);
				if(cval!=null){
					document.cookie=name+"="+cval+";expires="+exp.toGMTString();
				}											
			}
		};
	} ];

	vx.module('ibsapp').factory(services);

})(window, window.vx);
