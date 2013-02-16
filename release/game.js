define("F.core/controller",[],function(){function e(e){return n.key(e,1)}function t(e){return n.key(e,0)}function r(e){this.state={},this.config=e,this.keycode={},this.child=new Array,this.sync=!1,this.buf=new Array,n.child.push(this),this.clear_states();for(var t in this.config)this.keycode[t]=r.keyname_to_keycode(this.config[t])}var n=function(){document.addEventListener?(document.addEventListener("keydown",e,!0),document.addEventListener("keyup",t,!0)):document.attachEvent&&(document.attachEvent("keydown",e),document.attachEvent("keyup",t));var n=new Object;return n.child=[],n.key=function(e,t){e||(e=window.event);for(var n in this.child)if(this.child[n].key(e.keyCode,t))break},n}();return r.prototype.key=function(e,t){var n=0;for(var r in this.config)if(this.keycode[r]==e){if(this.sync===!1){if(this.child)for(var i in this.child)this.child[i].key(r,t);this.state[r]=t}else this.buf.push([r,t]);n=1;break}return n},r.prototype.clear_states=function(){for(var e in this.config)this.state[e]=0},r.prototype.fetch=function(){for(var e in this.buf){var t=this.buf[e][0],n=this.buf[e][1];if(this.child)for(var r in this.child)this.child[r].key(t,n);this.state[t]=n}this.buf=[]},r.prototype.flush=function(){this.buf=[]},r.keyname_to_keycode=r.prototype.keyname_to_keycode=function(e){var t;if(e.length==1){var n=e.charCodeAt(0);if(n>="a".charCodeAt(0)&&n<="z".charCodeAt(0)||n>="A".charCodeAt(0)&&n<="Z".charCodeAt(0))e=e.toUpperCase(),t=e.charCodeAt(0);else if(n>="0".charCodeAt(0)&&n<="9".charCodeAt(0))t=e.charCodeAt(0);else switch(e){case"`":t=192;break;case"-":t=189;break;case"=":t=187;break;case"[":t=219;break;case"]":t=221;break;case"\\":t=220;break;case";":t=186;break;case"'":t=222;break;case",":t=188;break;case".":t=190;break;case"/":t=191;break;case" ":t=32}}else switch(e){case"ctrl":t=17;break;case"up":t=38;break;case"down":t=40;break;case"left":t=37;break;case"right":t=39;break;case"space":t=32}return t},r.keycode_to_keyname=r.prototype.keycode_to_keyname=function(e){if(e>="A".charCodeAt(0)&&e<="Z".charCodeAt(0)||e>="0".charCodeAt(0)&&e<="9".charCodeAt(0))return String.fromCharCode(e).toLowerCase();var t=e;switch(e){case 38:t="up";break;case 40:t="down";break;case 37:t="left";break;case 39:t="right";break;case 32:t="space"}return t},r}),define("F.core/util",[],function(){var e={css:function(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("link");n.href=e,n.rel="stylesheet",n.type="text/css",t.appendChild(n)},double_delegate:function(e,t){return function(){e&&e.apply(this,Array.prototype.slice.call(arguments)),t&&t.apply(this,Array.prototype.slice.call(arguments))}},make_array:function(e){return e?e instanceof Array?e:[e]:[]},arr_search:function(e,t,n,r){var i=new Array;for(var s in e)if(t(e[s],s)){n&&(e[s]=n(e[s]));if(!r)return s;i.push(s)}return r?i:-1},push_unique:function(t,n){var r=e.arr_search(t,function(e){return e==n});if(r==-1)return t.push(n),!0},extend_object:function(e,t){for(var n in t)typeof t[n]=="object"?e[n]=arguments.callee(e[n]?e[n]:{},t[n]):e[n]=t[n];return e},to_text:function(e,t,n,r,i,s){if(s===0)return"";s||(s=30),n||(n="\n"),r||(r="");var o=r+t+":"+n;o+=r+"{";var u=0;for(var a in e){var f=i&&i(a,e[a]);f!=1&&(typeof f=="string"?o+=(u?",":"")+n+r+"	"+"'"+a+"'"+": "+f:e[a].constructor==Object?o+=(u?",":"")+n+arguments.callee(e[a],a,n,r+"	",i,s-1):(o+=(u?",":"")+n+r+"	"+"'"+a+"'"+": ",typeof e[a]=="string"&&(o+="'"),o+=e[a],typeof e[a]=="string"&&(o+="'"))),u=1}return o+=n+r+"}",o},extract_array:function(t,n){var r={};n=e.make_array(n);for(var i in n)r[n[i]]=[];for(var s=0;s<t.length;s++)for(var o=0;o<n.length;o++){var u=n[o];r[u].push(t[s][u])}return r}};return e}),define("F.core/controller-changer",["F.core/controller","F.core/util"],function(e,t){function n(n){function a(t,s){function d(i,s){l(i,s);var o=l(i,t.config[s]);o.style.cursor="pointer",o.onclick=function(){if(!r){r=!0;var i=this;i.style.backgroundColor="#FAA";var u=window.onkeydown;window.onkeydown=function(a){a||(a=window.event);var f=a.keyCode,l=e.keycode_to_keyname(f);window.onkeydown=u,o.innerHTML=l,t.config[s]=l,t.keycode[s]=f,i.style.backgroundColor="#EEE",r=!1,n.onchange&&n.onchange(t,s,l,f)}}}}if(s!==0){var o=f(i,"div");o.style.float="left",o.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"}var u=f(i,"table");u.style.float="left";var a=[];a[0]=f(u,"tr");var c=l(a[0],"player "+(s+1));c.colSpan="2";var h=1;for(var p in t.config)a[h]=f(u,"tr"),d(a[h],p),h++}function f(e,t,n){var r=document.createElement(t);return e.appendChild(r),n&&(r.id=n),r}function l(e,t){var n=f(e,"td");return n.innerHTML=t,n.style.border="1px solid #AAA",n.style.backgroundColor="#EEE",n.style.fontFamily="monospace",n.style.width="40px",n.style.textAlign="center",n}var r=!1,i=n.div,s=n.controller;i.style.textAlign="center",s=t.make_array(s);for(var o=0;o<s.length;o++)a(s[o],o);var u=f(i,"div");u.style.clear="both"}return n}),define("F.core/effects-pool",[],function(){function e(e){this.pool=[],this.S=0,this.E=0,this.full=!1,this.config=e,this.livecount=0,e.new_arg?e.new_arg instanceof Array?this.new_arg=e.new_arg:this.new_arg=[e.new_arg]:this.new_arg=[];for(var t=0;t<e.init_size;t++)this.pool[t]=e.construct(),this.pool[t].parent=this}return e.prototype.create=function(){if(this.full){if(!(this.pool.length+this.config.batch_size<=this.config.max_size))return!1;var e=[this.E,0];for(var t=0;t<this.config.batch_size;t++)e[t+2]=this.config.construct(),e[t+2].parent=this;this.pool.splice.apply(this.pool,e),this.S!==0&&(this.S+=this.config.batch_size),this.full=!1}this.E<this.pool.length?this.E++:this.E=1;if(this.E===this.S||this.S===0&&this.E===this.pool.length)this.full=!0;return this.pool[this.E-1].born&&this.pool[this.E-1].born.apply(this.pool[this.E-1],arguments),this.livecount++,this.pool[this.E-1]},e.prototype.die=function(){if(this.livecount>0){var e=this.S;return this.pool[this.S].die&&this.pool[this.S].die.apply(this.pool[this.S],arguments),this.S<this.pool.length-1?this.S++:this.S=0,this.full=!1,this.livecount--,this.pool[e]}console.log("die too much!")},e.prototype.for_each=function(e){if(this.livecount!==0)if(this.S<this.E){for(var t=this.S;t<this.E;t++)if(e(this.pool[t])==="break")break}else{for(var n=this.S;n<this.pool.length;n++)if(e(this.pool[n])==="break")return;for(var t=0;t<this.E;t++)if(e(this.pool[t])==="break")return}},e.prototype.call_each=function(e){if(this.pool[0][e]){var t=Array.prototype.slice.call(arguments,1);this.for_each(function(n){n[e].apply(n,t)})}},e}),define("F.core/css",{load:function(e,t,n,r){function i(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("link");n.href=e,n.rel="stylesheet",n.type="text/css",t.appendChild(n)}i(requirejs.toUrl(e)),n(!0)},pluginBuilder:"./css-build"}),define("F.core/css-embed",function(){function e(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("style"),r=document.createTextNode(e);n.type="text/css",n.styleSheet?n.styleSheet.cssText=r.nodeValue:n.appendChild(r),t.appendChild(n)}return e}),define("F.core/css!F.core/style.css",["F.core/css-embed"],function(e){return e(".F_sprite { position:absolute; overflow:hidden; width:10px; height:10px; } .F_sprite_inline { overflow:hidden; width:10px; height:10px; } .F_sprite_img { position:absolute; } .canvas { position:relative; width:800px; /*height:577px;*/ height:300px; border:1px solid #000; } .page { position: absolute; left: 0px; top: 0px; border: 1px solid #000; z-index: 10000; } "),!0}),define("F.core/support",[],function(){var e={};return function(){var t=navigator.userAgent.toLowerCase(),n=/(webkit)[ \/]([\w.]+)/.exec(t)||/(o)pera(?:.*version)?[ \/]([\w.]+)/.exec(t)||/(ms)ie ([\w.]+)/.exec(t)||/(moz)illa(?:.*? rv:([\w.]+))?/.exec(t)||[],r=/iPad|iPod|iPhone|Android|webOS|IEMobile/i.exec(t);e.mobile=r?r[0]:undefined,e.prefix=n[1]||n[0],e.prefix==="moz"&&(e.prefix="Moz"),e.prefix==="o"&&(e.prefix="O"),n[2]&&(e.version=+n[2].split(".")[0])}(),function(){e.css2dtransform=undefined,e.css3dtransform=undefined;var t=document.createElement("p"),n,r,i={WebkitTransform:"-webkit-transform",OTransform:"-o-transform",MSTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.getElementsByTagName("body")[0].appendChild(t);for(n in i)if(t.style[n]!==undefined){var s;s="matrix(1, 0, 0, 1, 0, 0)",t.style[n]=s,s===window.getComputedStyle(t).getPropertyValue(i[n])&&(e.css2dtransform=n),s="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",t.style[n]=s,s===window.getComputedStyle(t).getPropertyValue(i[n])&&(e.css3dtransform=n)}t.parentNode.removeChild(t)}(),function(){var e=0,t=["ms","moz","webkit","o"];for(var n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var r=(new Date).getTime(),i=Math.max(0,16-(r-e)),s=window.setTimeout(function(){t(r+i)},i);return e=r+i,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}(),e}),define("F.core/sprite",["F.core/css!F.core/style.css","F.core/support","module"],function(e,t,n){function s(e){this.ID=r,r++,e.div?(this.el=e.div,this.el.className?this.el.className+=" F_sprite_inline":this.el.className="F_sprite_inline",window.getComputedStyle(this.el).getPropertyValue("position")==="static"&&(this.el.style.position="relative")):(this.el=document.createElement("div"),this.el.className="F_sprite",e.canvas.appendChild(this.el)),this.img={},this.cur_img=null,this.set_wh(e.wh);if(e.img)if(typeof e.img=="object")for(var n in e.img)this.add_img(e.img[n],n);else this.add_img(e.img,"0");if(e.div){var i=e.div.getElementsByTagName("img");for(var s=0;s<i.length;s++){var o=i[s].getAttribute("name");o&&this.adopt_img(i[s])}}t.css2dtransform&&!e.div&&(this.el.style.left="0px",this.el.style.top="0px")}var r=0,i=n.config();return s.masterconfig=s.prototype.masterconfig=function(e){i=e},s.prototype.set_wh=function(e){this.el.style.width=e.x+"px",this.el.style.height=e.y+"px"},t.css2dtransform&&!i.disable_css2dtransform?s.prototype.set_xy=function(e){this.el.style[t.css2dtransform]="translate("+e.x+"px,"+e.y+"px) "}:s.prototype.set_xy=function(e){this.el.style.left=e.x+"px",this.el.style.top=e.y+"px"},s.prototype.set_z=function(e){this.el.style.zIndex=Math.round(e)},s.prototype.add_img=function(e,t){var n="";i.baseUrl&&(n=i.baseUrl);var r=document.createElement("img");return r.setAttribute("class","F_sprite_img"),r.onload=function(){this.naturalWidth||(this.naturalWidth=this.width),this.naturalHeight||(this.naturalHeight=this.height),this.onload=null},r.src=n+e,this.el.appendChild(r),this.img[t]=r,this.switch_img(t),r},s.prototype.adopt_img=function(e){var t=e.getAttribute("name");e.hasAttribute("class")?e.setAttribute("class",e.getAttribute("class")+" F_sprite_img"):e.setAttribute("class","F_sprite_img"),e.naturalWidth||(e.naturalWidth=e.width),e.naturalHeight||(e.naturalHeight=e.height),!e.naturalWidth&&!e.naturalHeight&&(e.onload=function(){this.naturalWidth||(this.naturalWidth=this.width),this.naturalHeight||(this.naturalHeight=this.height),this.onload=null}),this.img[t]=e,this.switch_img(t)},s.prototype.switch_img=function(e){var t,n;for(var r in this.img)if(this.img[r].style.display==""){t=this.img[r].style.left,n=this.img[r].style.top;break}for(var r in this.img)r==e?(this.img[r].style.left=t,this.img[r].style.top=n,this.img[r].style.display=""):this.img[r].style.display="none";this.cur_img=e},s.prototype.set_img_xy=function(e){this.img[this.cur_img].style.left=e.x+"px",this.img[this.cur_img].style.top=e.y+"px"},s.prototype.remove=function(){this.el.parentNode.removeChild(this.el),this.removed=!0},s.prototype.attach=function(){this.removed&&config.canvas.appendChild(this.el)},s.prototype.hide=function(){this.el.style.display="none"},s.prototype.show=function(){this.el.style.display=""},s}),define("F.core/animator",[],function(){function e(e){this.config=e,this.target=e.tar,this.I=0,this.horimirror=!1,e.borderright||(e.borderright=0),e.borderbottom||(e.borderbottom=0),e.borderleft||(e.borderleft=0),e.bordertop||(e.bordertop=0)}return e.prototype.next_frame=function(){var e=this.config;this.I++;if(!e.ani)this.I==e.gx*e.gy&&(this.I=0),this.show_frame(this.I);else{var t=e.ani[this.I];if(this.I>=e.ani.length||this.I<0)this.I=0,t=e.ani[0];this.show_frame(t)}return this.I},e.prototype.seek=function(e){var t=this.config;if(t.ani&&e>=0&&e<t.ani.length){this.I=e;var n=t.ani[this.I];this.show_frame(n)}},e.prototype.rewind=function(){this.I=-1,this.next_frame()},e.prototype.set_frame=function(e){this.I=e,this.show_frame(e)},e.prototype.hmirror=function(e){this.horimirror=e},e.prototype.show_frame=function(e){var t=this.config,n,r;n=-(e%t.gx*t.w+t.x+t.borderleft),r=-(Math.floor(e/t.gx)*t.h+t.y+t.bordertop),this.horimirror&&(n=-this.target.img[this.target.cur_img].naturalWidth-n+t.w-t.borderleft-t.borderright),this.target.set_wh({x:t.w-t.borderleft-t.borderright,y:t.h-t.bordertop-t.borderbottom}),this.target.set_img_xy({x:n,y:r})},e.prototype.get_at=function(e){e||(e=this.I);var t=this.config;return t.graph[e%t.gx][Math.floor(e/t.gx)]},e.set=function(t,n){if(!t)return null;var r=new Object;for(var i in t){if(n&&i==n)continue;if(n&&t[n])for(var s in t[n])t[i][s]=t[n][s];r[i]=new e(t[i])}return r},e}),define("F.core/math",[],function(){return math={inbetween:function(e,t,n){var r,i;return t<=n?(r=t,i=n):(r=n,i=t),e>=r&&e<=i},round_d2:function(e){return Math.round(e*100)/100},negligible:function(e){return-1e-8<e&&e<1e-8},bezier2:function(e,t,n,r){var i=new Array;for(var s=0;s<r;s++)i.push(math.bezier2_step(e,t,n,s,r));return i.push(n),i},bezier2_step:function(e,t,n,r,i){function o(e,t,n,r){return((r-n)*e+n*t)/r}var s={x:0,y:0};return s.x=o(o(e.x,t.x,r,i),o(t.x,n.x,r,i),r,i),s.y=o(o(e.y,t.y,r,i),o(t.y,n.y,r,i),r,i),s},add:function(e,t){return{x:e.x+t.x,y:e.y+t.y}},sub:function(e,t){return{x:e.x-t.x,y:e.y-t.y}},sca:function(e,t){return{x:e.x*t,y:e.y*t}},length:function(e){return Math.sqrt(e.x*e.x+e.y*e.y)},distance:function(e,t){return Math.sqrt((t.x-e.x)*(t.x-e.x)+(t.y-e.y)*(t.y-e.y))},negative:function(e){return{x:-e.x,y:-e.y}},normalize:function(e){return math.sca(e,1/math.length(e))},perpen:function(e){return{x:-e.y,y:e.x}},signed_area:function(e,t,n){var r=(t.x-e.x)*(n.y-e.y)-(n.x-e.x)*(t.y-e.y);return r},intersect:function(e,t,n,r){var i,s,o,u,a;return o=(r.y-n.y)*(t.x-e.x)-(r.x-n.x)*(t.y-e.y),u=(r.x-n.x)*(e.y-n.y)-(r.y-n.y)*(e.x-n.x),a=(t.x-e.x)*(e.y-n.y)-(t.y-e.y)*(e.x-n.x),negligible(u)&&negligible(a)&&negligible(o)?{x:(e.x+t.x)*.5,y:(e.y+t.y)*.5}:negligible(o)?{x:0,y:0}:(i=u/o,s=a/o,{x:e.x+i*(t.x-e.x),y:e.y+i*(t.y-e.y)})}},math}),define("cele/chart",["F.core/effects-pool","F.core/sprite","F.core/animator","F.core/math"],function(e,t,n,r){function i(r){this.config=r;var i=r.div,u=this;i.style.width=r.width+"px",i.style.height=r.lineheight*r.lines+"px",f("div","bars",null,null,i),f("div","rules",null,null,i),f("div","beats",null,null,i),f("div","marks",null,null,i),f("div","hitmarks",null,null,i);for(var a=1;a<r.lines;a++)o(f("div",null,null,null,c("rules")),0,a*r.lineheight);var l={init_size:5,batch_size:5,max_size:100,construct:function(){return new s("bar",null,c("bars"))}},h={init_size:20,batch_size:10,max_size:100,construct:function(){var e=new s("beat",r.beat,c("beats"));return e.chart=u,e}},p={init_size:20,batch_size:10,max_size:100,construct:function(){return new s("flyer",r.beat,r.fly.div,r.fly)}};this.bars=new e(l),this.beats=new e(h),this.flyers=new e(p),this.marks=[];if(r.mark)for(var a=0;a<r.mark.line.length;a++){var d={canvas:c("marks"),wh:{x:r.mark.w,y:r.lineheight},img:r.mark.img},v=new t(d),m={x:r.mark.x,y:r.mark.y,w:r.mark.w,h:r.mark.h,gx:r.mark.gx,gy:r.mark.gy,tar:v},g=new n(m);g.set_frame(r.mark.line[a]),v.set_xy({x:0,y:r.lineheight*a}),this.marks.push(v);if(r.mark.text){r.mark.text[a];var y=f("span",null,"marktext",r.mark.text[a],v.el);y.style.lineHeight=r.mark.h+"px"}}this.hitmarks=[];if(r.hitmark){var b=r.hitmark.centerx-r.mark.centerx,w=r.hitmark.centery-r.mark.centery;for(var a=0;a<r.mark.line.length;a++){var E={canvas:c("hitmarks"),wh:{x:r.hitmark.w,y:r.hitmark.h},img:r.hitmark.img},S=new t(E),x={x:r.hitmark.x,y:r.hitmark.y,w:r.hitmark.w,h:r.hitmark.h,gx:r.hitmark.gx,gy:r.hitmark.gy,tar:S},T=new n(x);T.set_frame(r.hitmark.frame),S.set_xy({x:-b,y:r.lineheight*a-w}),S.hide(),this.hitmarks.push(S)}}this.lasttime=0,this.lastbar=0,this.beatcursor=0,this.lycursor=0,this.hitmarkout=0}function s(e,r,i,s){this.type=e;if(e==="beat"||e==="flyer"){var o={canvas:i,wh:{x:r.w,y:r.h},img:r.img},u=new t(o),a={x:r.x,y:r.y,w:r.w,h:r.h,gx:r.gx,gy:r.gy,tar:u};this.ani=new n(a),this.el=u.el,this.width=r.w,this.die()}e==="bar"&&(this.el=f("div",null,null,null,i),this.width=parseInt(window.getComputedStyle(this.el).getPropertyValue("width")),this.width||(this.width=1e3),this.die()),e==="flyer"&&(this.fy_config=s)}function o(e,t,n){return t!==undefined&&t!==null&&(e.style.left=l(t)+"px"),n!==undefined&&n!==null&&(e.style.top=l(n)+"px"),e}function u(e,t,n){return t&&(e.style.left=l(t+parseFloat(e.style.left))+"px"),n&&(e.style.top=l(n+parseFloat(e.style.top))+"px"),e}function a(e){return{x:parseFloat(e.style.left),y:parseFloat(e.style.top)}}function f(e,t,n,r,i){var s=document.createElement(e);return t&&(s.id=t),n&&(s.className=n),r&&(s.innerHTML=r),i&&i.appendChild(s),s}function l(e,t){if(t===undefined||t===null)t=2;var n=1;for(var r=0;r<t;r++)n*=10;return Math.round(e*n)/n}function c(e){return document.getElementById(e)}function h(e){e.style.display=""}function p(e){e.style.display="none"}return i.prototype.frame=function(e){var t=this.config,n=t.data,r=e+t.width/t.timescale;r>=this.lastbar+t.basebeat&&(this.bars.create(t.width),this.lastbar=Math.floor(r/t.basebeat)*t.basebeat);for(var i=this.beatcursor,s=n.beats.length;i<s;i++)if(r<n.beats[i].t)break;if(i>this.beatcursor){for(var o=this.beatcursor;o<i;o++){var u=t.ondata(n.beats[o].v);this.beats.create(t.width,u.y,n.beats[o].v,u.frame,u.hitframe)}this.beatcursor=i}for(var i=this.lycursor,a=n.lyrics.length;i<a;i++)if(e<n.lyrics[i].t)break;if(i>this.lycursor){for(var o=this.lycursor;o<i;o++)c("lyrics").innerHTML=n.lyrics[o].v;this.lycursor=i}if(this.hitmarkout!=="cleared"&&e>=this.hitmarkout){for(var f=0;f<this.hitmarks.length;f++)this.hitmarks[f].hide();this.hitmarkout="cleared"}var l=(e-this.lasttime)*t.timescale;this.bars.call_each("frame",l),this.beats.call_each("frame",l),this.flyers.call_each("frame",l),this.lasttime=e},i.prototype.test_run=function(e,t){var n=this,r=(new Date).getTime()/1e3+this.config.width/this.config.timescale+1,i=0,s=setInterval(function(){e?i+=e:i=(new Date).getTime()/1e3-r;if(i>=0&&t){clearInterval(s),t();return}n.frame(i)},1e3/45)},i.prototype.pre_run=function(e){this.test_run(null,e)},i.prototype.hit=function(e){var t=this;this.beats.for_each(function(n){var r=a(n.el),i=Math.abs(r.x+t.config.beat.centerx-t.config.mark.centerx);if(r.y>=e*t.config.lineheight&&r.y<(e+1)*t.config.lineheight)return n.cleared?"continue":(i<=t.config.beat.dist&&n.hit(),i<=t.config.hitmark.dist&&(t.hitmarks[e].show(),t.hitmarkout=t.lasttime+t.config.hitmark.showtime),t.config.onhit&&t.config.onhit(n.id,i)&&n.clear(),"break")})},i.prototype.missed=function(){this.config.onmiss&&this.config.onmiss()},s.prototype.born=function(e,t,n,i,s){o(this.el,e,t),h(this.el),this.type==="beat"&&(n&&(this.id=n),this.ani&&i!==undefined&&this.ani.set_frame(i),s!==undefined&&(this.hitframe=s));if(this.type==="flyer"){var u={x:e,y:t},a=this.fy_config.to,f={x:(u.x+a.x)/2,y:u.y-this.fy_config.height};this.curve=r.bezier2(u,f,a,this.fy_config.steps),this.curve.I=0,this.ani.set_frame(s)}},s.prototype.die=function(){p(this.el),this.type==="beat"&&(this.cleared||this.chart&&this.chart.missed(),this.cleared=!1)},s.prototype.frame=function(e){if(this.type==="bar"||this.type==="beat")u(this.el,-e),a(this.el).x<-this.width&&this.parent.die();if(this.type==="flyer"){if(!(this.curve.I<this.curve.length/2)){this.curve=null,this.parent.die();return}o(this.el,this.curve[this.curve.I].x,this.curve[this.curve.I].y),this.curve.I++}},s.prototype.hit=function(e){if(this.type==="beat"){var t=a(this.el);this.chart.flyers.create(t.x,t.y,null,null,this.hitframe),p(this.el)}},s.prototype.clear=function(){this.cleared=!0},i}),define("cele/sound",["cele/drum"],function(){if(typeof buzz!="undefined"){var e=[],t=function(t,n){var r=!1;if(t.indexOf(".mp3")!==-1||t.indexOf(".ogg")!==-1||t.indexOf(".wav")!==-1)r=!0;var i=new buzz.sound(t,{formats:r?null:["mp3","ogg"],preload:!0,autoplay:!1,loop:!1});n.timeupdate&&i.bind("timeupdate",function(){var e=this.getTime();e>s.time&&(s.time=e,n.timeupdate(s.time))}).bind("seeked",function(){s.time=this.getTime()}),n.onload&&i.bind("loadedmetadata",function(){n.onload()}),n.ended&&i.bind("ended",function(){n.ended()}),n.loaded&&i.bind("canplaythrough",function(){n.loaded()}),n.progress&&i.bind("progress",function(){var e=0,t=i.getBuffered();for(var n=0;n<t.length;n++)e+=t[n].end-t[n].start;return Math.round(e/i.getDuration()*100)});var s={sound:i,timeupdate:n.timeupdate,time:0};return e.push(s),i};t.ready=function(e){e()};var n=(new Date).getTime();return setInterval(function(){var t=(new Date).getTime(),r=Math.floor(t-n)/1e3;for(var i=0;i<e.length;i++)e[i].sound.isPaused()||r<.25&&(e[i].time+=r,e[i].timeupdate(e[i].time));n=t},40),t}if(typeof soundManager!="undefined"){var r=0,t=function(e,t){var n=!1;if(e.indexOf(".mp3")!==-1||e.indexOf(".ogg")!==-1||e.indexOf(".wav")!==-1)n=!0;var i={id:"mysound"+r++,url:e+(n?"":".mp3")};t.timeupdate&&(i.whileplaying=function(){t.timeupdate(this.position/1e3)}),t.onload&&(i.onload=function(){this.readyState===3&&t.onload()}),t.ended&&(i.onfinish=function(){t.ended()}),t.loaded&&(i.whileloading=function(){this.canplaythrough||(this.bytesLoaded/this.bytesTotal>.5?(t.loaded(),this.canplaythrough=!0):t.progress&&t.progress(Math.round(this.bytesLoaded/this.bytesTotal*100)))});var s=soundManager.createSound(i);return s.getDuration=function(){return s.duration/1e3},s.setTime=function(e){s.setPosition(e*1e3)},s};return t.ready=function(e){soundManager.onready(e)},t}}),define("cele/sprite-data",{369:{w:23,h:34,ani:[0,1,2]},agree:{w:26,h:28,ani:[22,21,20,22,21,20,22,21,20]},banghead:{w:35,h:27,ani:[2,3,4,5,6]},bouncer:{w:72,h:68,ani:[21,22,23,24,12,13,14,20]},bouncerlm:{w:43,h:82,ani:[30,31,32,33,34,35,36,37,38]},clown3:{w:50,h:50,ani:[70,71,72,73,74,80,81,82,83,84,85,86,86,86,86,86]},diulm:{w:45,h:32,ani:[30,31,32]},hehelm:{w:32,h:32,ani:[13,14,15,15,14,13]},hoho:{w:59,h:18,ani:[120,123,120,123,122,121]},hoholm:{w:96,h:32,ani:[150,153,152,151]},hoho2:{w:59,h:18,ani:[5,25]},sosad2:{w:23,h:21,ani:[250,251,252,253,254,255,256,257,258,259,250,251,252,253,254,255]},sosad3:{w:29,h:30,ani:[150,151,152,153,154,155,156,157,158,159,150,151,152,153,154,155]}}),define("cele/musician",["cele/sprite-data","F.core/sprite","F.core/animator"],function(e,t,n){function r(e){this.musi=[];var t=e.getElementsByTagName("span"),n=t.length,r=parseInt(e.getAttribute("copy"));r||(r=1);for(var s=0;s<r;s++)for(var o=0;o<n;o++){var u=t[o],a=u.getAttribute("sprite");a&&this.musi.push(new i(e,a))}}function i(r,i){var s=e[i],o={canvas:r,wh:{x:s.w,y:s.h},img:"sprites.png"};this.sp=new t(o);var u={x:0,y:0,w:s.w,h:s.h,gx:10,gy:100,tar:this.sp,ani:s.ani};this.ani=new n(u),this.ani_length=s.ani.length,this.ani.rewind(),this.active=!1}return r.prototype.frame=function(){for(var e=0;e<this.musi.length;e++)this.musi[e].frame()},r.prototype.onhit=function(){for(var e=0;e<this.musi.length;e++)this.musi[e].onhit()},i.prototype.frame=function(){if(this.active){var e=this.ani.next_frame();e===0&&(this.active=!1)}},i.prototype.onhit=function(){this.ani.rewind(),this.active=!0},r}),define("F.core/css!celebrate/src/drum.css",["F.core/css-embed"],function(e){return e(".drumset {  -webkit-user-select: none;  -khtml-user-select: none;  -moz-user-select: none;  -ms-user-select: none;  user-select: none; } .drumset .drumimg {  position: absolute;  left: 0;  top: 0;  width: 100%;  height: 100%;  z-index: -1; } "),!0}),define("cele/drumset",["cele/drum","F.core/util","F.core/css!celebrate/src/drum.css"],function(e,t){function n(t,n){var i=this,s="";n&&(this.onhit=n.onhit,n.baseurl&&(s=n.baseurl)),this.set={},this.key={},t.className="drumset";var o=t.getElementsByTagName("div");for(var u=0;u<o.length;u++){function a(e){return f.getAttribute(e)}var f=o[u],l=a("key"),c=a("vol"),h=a("sound"),p=a("radius"),d=a("width"),v=a("height"),m=a("color"),g=a("img");l&&(this.key[l]?this.key[l].push(f.id):this.key[l]=[f.id]),c&&(c=parseInt(c)),h&&(f.onmousedown=function(){i.hit(this.id)},this.set[f.id]=new e(s,h,c)),p&&(f.style.width=p*2+"px",f.style.height=p*2+"px",f.style.borderRadius=p+"px"),d&&(f.style.width=d+"px"),v&&(f.style.height=v+"px"),m&&(f.style.background=m);if(g){var y=document.createElement("img");y.src=g,y.className="drumimg",f.appendChild(y)}}if(!r(this.key)){function b(e){e||(e=window.event);var t=String.fromCharCode(e.keyCode).toLowerCase();return i.hit(i.key[t])}document.addEventListener("keydown",b,!0),this.removeEventListener=function(){document.removeEventListener("keydown",b,!0)}}}function r(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}return n.prototype.hit=function(e){var e=t.make_array(e);for(var n=0;n<e.length;n++){var r=e[n];if(this.set[r])return this.onhit&&this.onhit.apply(null,arguments),this.set[r].hit(),!0}},n}),define("cele/iconset",["cele/musician","cele/drumset"],function(e,t){function u(e){for(var t=0;t<e.length;t++){var r=e[t];n[r]&&n[r].onhit()}}function f(){for(var e in n)n[e].frame();var t=this.time;this.time=(new Date).getTime();var r=this.time-t}function l(e){return document.getElementById(e)}var n={},r=l("musicians").getElementsByClassName("group");for(var i=0;i<r.length;i++){var s=r[i];n[s.id]=new e(s)}var o=new t(l("musicians"),{baseurl:"../sound/",onhit:u}),a=setInterval(f,100);return{musi:n,drumset:o,timer:a,hit:u}}),requirejs.config({baseUrl:"../../",paths:{cele:"celebrate/src",third_party:"celebrate/third_party"}}),requirejs(["F.core/controller","F.core/controller-changer","cele/gamedata","cele/chart","cele/sound","cele/iconset"],function(e,t,n,r,i,s){function c(e){e=e.slice(1);var t={y:0,frame:0,hit_frame:0};switch(e){case"3":case"4":case"5":case"6":case"7":case"f":case"v":t.frame=2,t.hitframe=3;break;case"r":case"t":case"y":case"u":case"b":case"g":case"n":t.frame=0,t.hitframe=1}var n=(o.lineheight-o.block.h)/2;switch(e){case"r":case"t":case"y":case"u":t.y=n;break;case"g":case"b":case"n":t.y=o.lineheight+n;break;case"3":case"4":case"5":case"6":case"7":case"f":case"v":t.y=o.lineheight*2+n}return t}function h(e,t){var n,r=.2,i=1;t<=u.perfect?n="perfect":t<=u.good?n="good":t<=u.bad?n="bad":n="miss",n===v.mess?(v.count++,E("hitcount").innerHTML=v.count):(v.count=0,E("hitcount").innerHTML=""),f[n]+=1,f.total+=a[n],v.count>f["max_cont_"+n]&&(f["max_cont_"+n]=v.count),E("currentscore").innerHTML='<span class="green">'+f.total+"</span>",v.count>10?i=2:v.count>20&&(i=5),E("hitcount").className=E(n).className,v.mess=n,S(E(n)),S(E("hitcount")),E("hitmessage").className="pop",E("currentscore").className="pop",setTimeout(function(){E("hitmessage").className="",E("currentscore").className=""},1e3*r/6),setTimeout(function(){x(E(n)),x(E("hitcount"))},1e3*r*i);if(t<=u.bad)return s.drumset.hit(s.drumset.key[e.slice(1)]),s.hit(p(e.slice(1))),!0}function p(e){switch(e){case"r":case"t":case"y":case"u":return["banghead1","banghead2","banghead3","banghead4"];case"3":case"4":return["g369a","g369b"];case"7":return["g369a","g369b","agree"];case"6":case"g":case"f":return["hoho","hoho2","diulm","hoholm"];case"b":case"n":return["bouncer1","bouncer2"];case"v":return["bouncerlm"];case"5":return["g369a","g369b","agree","bouncer1","bouncer2","bouncerlm"]}}function d(){h(1e3)}function E(e){return document.getElementById(e)}function S(e){e.style.display=""}function x(e){e.style.display="none"}var o={div:E("chart"),width:900,timescale:300,block:{w:50,h:50},lineheight:70,lines:3,basebeat:2,data:n,ondata:c,beat:{x:0,y:0,w:52,h:50,gx:10,gy:1,img:"beats.png",centerx:25,centery:25,dist:30},mark:{x:0,y:50,w:70,h:70,gx:10,gy:1,img:"beats.png",line:[0,0,1],text:["v","b","space"],centerx:35,centery:35},hitmark:{x:0,y:0,w:400,h:180,gx:10,gy:1,img:"mark.png",centerx:90,centery:90,dist:30,frame:0,showtime:.1},fly:{to:{x:500,y:-10},height:200,steps:12,div:E("flyers")},onhit:h,onmiss:d},u={perfect:15,good:30,bad:45},a={perfect:3,good:2,bad:1,miss:-1},f={total:0,perfect:0,good:0,bad:0,miss:0,fault_presses:0,max_cont_perfect:0,max_cont_good:0,max_cont_bad:0,max_cont_miss:0},l=.8;o.block.w*=l,o.block.h*=l,o.lineheight*=l,o.timescale*=l,o.beat.w*=l,o.beat.h*=l,o.beat.centerx*=l,o.beat.centery*=l,o.beat.dist*=l,o.mark.y*=l,o.mark.w*=l,o.mark.h*=l,o.mark.centerx*=l,o.mark.centery*=l,o.hitmark.w*=l,o.hitmark.h*=l,o.hitmark.centerx*=l,o.hitmark.centery*=l,o.hitmark.dist*=l,o.beat.img="beats-small.png",o.mark.img="beats-small.png",o.hitmark.img="mark-small.png",u.perfect*=l,u.good*=l,u.bad*=l,x(E("perfect")),x(E("good")),x(E("bad")),x(E("miss")),x(E("scoreboard")),x(E("keychanger")),x(E("loadingprogress-holder"));var v={mess:"",count:0},m,g=!1,y=new r(o),b;i.ready(function(){m=i("../music/Jubilant",{timeupdate:function(e){y.frame(e)},ended:function(){E("scoreboard").innerHTML='<span style="font-size: 40px;">Score: '+f.total+"</span><br>"+"Perfect: "+f.perfect+", "+"Good: "+f.good+", "+"Bad: "+f.bad+","+"Miss: "+f.miss+"<br>"+"max. cont. Perfect: "+f.max_cont_perfect+"<br>"+"max. cont. Good: "+f.max_cont_good+"<br>"+"max. cont. Bad: "+f.max_cont_bad+"<br>"+"max. cont. Miss: "+f.max_cont_miss+"<br>",S(E("scoreboard")),s.drumset.onhit=s.hit},loaded:function(){E("start").className="bigbutton",E("start").innerHTML="Start",x(E("loadingprogress-holder"))},progress:function(e){S(E("loadingprogress-holder")),E("loadingprogress").style.width=e+"%"}})}),E("start").onclick=function(){this.innerHTML==="Start"&&(x(E("start")),x(E("instruction")),x(E("keychanger")),E("musicians").className="gamestarted",s.drumset.removeEventListener(),s.drumset.onhit=null,y.pre_run(function(){m.play()}))};var w={0:"v",1:"b",2:"space",pause:"p"};b=new e(w),b.child.push({key:function(e,t){if(!t)return;switch(e){case"0":y.hit(0);break;case"1":y.hit(1);break;case"2":y.hit(2);break;case"pause":g?m.play():m.pause(),g=!g}}}),new t({div:E("keychanger"),controller:b,onchange:function(e,t,n,r){var i=y.marks[t].el,s=i.getElementsByClassName("marktext");if(!s)return;s=s[0],s&&(s.innerHTML=n)}}),E("changekey").onclick=function(){S(E("keychanger"))}}),define("cele/game",function(){});