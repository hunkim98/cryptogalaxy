(this.webpackJsonpcryptogalaxy=this.webpackJsonpcryptogalaxy||[]).push([[0],{39:function(t,e,n){},40:function(t,e,n){},46:function(t,e,n){"use strict";n.r(e);var i,s=n(4),r=n(28),a=n.n(r),o=(n(39),n(40),n(10)),c=n(9),h=n(6),u=n(13),l=n(26),f=n(16),d="https://upbit-next-proxy.vercel.app/api/",v=function(){var t=Object(u.a)(Object(h.a)().mark((function t(e,n){var i;return Object(h.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.a.get(d+"days"+"?market=".concat(e,"&count=").concat(n));case 2:return i=t.sent,console.log(i),t.abrupt("return",i.data.data);case 5:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),w=function(){var t=Object(u.a)(Object(h.a)().mark((function t(e){var n;return Object(h.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.a.get(d+"ticker"+"?market=".concat(e));case 2:return n=t.sent,t.abrupt("return",n.data.data);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),y=function(t,e){for(var n=new Date(t[0].candle_date_time_utc).getTime()-new Date(t[t.length-1].candle_date_time_utc).getTime()>0?Object(c.a)(t).reverse():t,i=new Date(e[0].candle_date_time_utc).getTime()-new Date(e[e.length-1].candle_date_time_utc).getTime()>0?Object(c.a)(t).reverse():t,s=n.map((function(t){return t.prev_closing_price})),r=i.map((function(t){return t.prev_closing_price})),a=s.reduce((function(t,e){return t+e}),0)/s.length,o=r.reduce((function(t,e){return t+e}),0)/r.length,h=s.map((function(t){return Math.pow(t-a,2)})).reduce((function(t,e){return t+e}),0),u=r.map((function(t){return Math.pow(t-o,2)})).reduce((function(t,e){return t+e}),0),l=0,f=0;f<t.length;f++)l+=(t[f].prev_closing_price-a)*(e[f].prev_closing_price-o);return l/(Math.sqrt(h)*Math.sqrt(u))},g=function(t,e){if(t.length<e)throw new Error("the inverval is bigger than the passed data ");var n=p(t,e);return(n[n.length-1]-n[0])/n[0]},p=function(t,e){for(var n=new Date(t[0].candle_date_time_utc).getTime()-new Date(t[t.length-1].candle_date_time_utc).getTime()>0?Object(c.a)(t).reverse():t,i=[],s=n.length,r=n.map((function(t){return t.prev_closing_price})),a=0;a<s-(e-1);a++){var o=r.slice(a,a+(e-1)),h=o.reduce((function(t,e){return t+e}),0)/o.length;i.push(h)}return i};!function(t){t.RED="RED",t.BLUE="BLUE"}(i||(i={}));var x=function(t){var e=[],n=[],s=new Date(t[0].candle_date_time_utc).getTime()-new Date(t[t.length-1].candle_date_time_utc).getTime()>0?Object(c.a)(t).reverse():t;s.pop();var r=s.map((function(t){return t.candle_acc_trade_volume}));t:for(var a=0;a<s.length;a++)if(!(a-10<0||a+10>s.length)){var o=s[a],h=o.high_price,u=o.low_price,l=s.slice(a-10,a).map((function(t){return t.candle_acc_trade_volume})).reduce((function(t,e){return t+e}),0)/10;if(0!==n.length&&u<n[n.length-1]){var f=n.pop();e.push(f)}if(0!==e.length&&h>e[e.length-1]){var d=e.pop();n.push(d)}if(!(r[a]<l)&&!(a-Math.floor(2)<0||a+Math.floor(2)>s.length)){for(var v=[],w=[],y=1;y<=Math.floor(2);y++)v.unshift(s[a-y]),w.push(s[a+y]);for(var g=null,p=null,x={high:0,low:Number.MAX_VALUE},b={high:0,low:Number.MAX_VALUE},C=0,m=v;C<m.length;C++){var k=m[C];if(!k)continue t;var _;if(_=k.opening_price-k.trade_price>0?i.BLUE:i.RED,null!==g&&g!==_)continue t;g=_,x.high<k.high_price&&(x.high=k.high_price),x.low>k.low_price&&(x.low=k.low_price)}for(var O=0,j=w;O<j.length;O++){var M=j[O];if(!M)continue t;var z;if(z=M.opening_price-M.trade_price>0?i.BLUE:i.RED,null!==p&&p!==z)continue t;p=z,b.high<M.high_price&&(b.high=M.high_price),b.low>M.low_price&&(b.low=M.low_price)}if(p!==g)if(g===i.RED&&p===i.BLUE){if(h<x.high||h<b.high)continue;e.push(h)}else{if(u>x.low||u>b.low)continue;n.push(u)}}}return{support:n,resistance:e}},b=n(7),C=Object(s.createContext)({}),m=function(t){var e=t.children,n=Object(s.useState)(new Map),i=Object(l.a)(n,2),r=i[0],a=i[1],o=Object(s.useCallback)(function(){var t=Object(u.a)(Object(h.a)().mark((function t(e,n,i,s){var r,o,c,u,l,f,d,p,b,C;return Object(h.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.split("-")[1].toLowerCase(),o=s.find((function(t){return t.symbol===r})),o){t.next=4;break}return t.abrupt("return");case 4:return c=o.market_cap,t.next=7,v(e,n);case 7:return u=t.sent,l=g(u.slice(-i.length),20),f=y(i,u.slice(-i.length)),console.log(l,f,r),d=x(u),p=d.support,b=d.resistance,t.next=14,w(e);case 14:C=t.sent,a((function(t){var n=new Map(t);return n.set(e,{increaseRatio:l,coefficient:f,volume:c,currentPrice:C.trade_price,support:p,resistance:b}),n}));case 16:case"end":return t.stop()}}),t)})));return function(e,n,i,s){return t.apply(this,arguments)}}(),[]);Object(s.useEffect)((function(){v("KRW-BTC",30).then(function(){var t=Object(u.a)(Object(h.a)().mark((function t(e){var n,i,s;return Object(h.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=g(n=e,20),a((function(t){return new Map([].concat(Object(c.a)(t),[["KRW-BTC",{increaseRatio:i}]]))})),t.next=5,f.a.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=100&page=1&sparkline=false");case 5:return s=t.sent.data,t.abrupt("return",{btcCandles:n,coinMarketData:s});case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).then((function(t){var e=t.btcCandles,n=t.coinMarketData;o("KRW-ETH",200,e,n),o("KRW-ETC",200,e,n),o("KRW-APT",200,e,n),o("KRW-SAND",200,e,n),o("KRW-XRP",200,e,n),o("KRW-DOGE",200,e,n)})),w("KRW-BTC").then((function(t){console.log(t)}))}),[]);var d=Object(s.useState)([]),p=Object(l.a)(d,2);p[0],p[1];return Object(b.jsx)(C.Provider,{value:{cryptoData:r},children:e})},k=n(2),_=n(3),O=function(t,e,n,i,s){var r=t;return r>n&&(r=n),r<e&&(r=e),(r-e)/(n-e)*(s-i)+i},j=function(){function t(e,n,i,s){Object(k.a)(this,t),this.x=void 0,this.y=void 0,this.z=void 0,this.w=void 0,this.x=e||0,this.y=n||0,this.z=i||0,this.w=s||0}return Object(_.a)(t,[{key:"add",value:function(e){return new t(this.x+e.x,this.y+e.y,this.z+e.z,this.w+e.w)}},{key:"subtract",value:function(e){return new t(this.x-e.x,this.y-e.y,this.z-e.z,this.w-e.w)}},{key:"negative",value:function(){return new t(-this.x,-this.y,-this.z,-this.w)}},{key:"dot",value:function(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}},{key:"clone",value:function(){return new t(this.x,this.y,this.z,this.w)}},{key:"length",value:function(){return Math.sqrt(this.dot(this))}},{key:"scalarBy",value:function(e){return new t(this.x*e,this.y*e,this.z*e,this.w*e)}},{key:"equals",value:function(t){return this.x===t.x&&this.y===t.y&&this.z===t.z&&this.w===t.w}},{key:"toArray",value:function(){return[this.x,this.y,this.z,this.w]}},{key:"toVector2",value:function(){return new z(this.x,this.y)}},{key:"toVector3",value:function(){return new M(this.x,this.y,this.z)}},{key:"normalize",value:function(){return this.scalarBy(1/this.length())}}]),t}();j.One=new j(1,1,1,1),j.Zero=new j(0,0,0,0),j.UnitX=new j(1,0,0,0),j.UnitY=new j(0,1,0,0),j.UnitZ=new j(0,0,1,0),j.UnitW=new j(0,0,0,1);var M=function(){function t(e,n,i){Object(k.a)(this,t),this.x=void 0,this.y=void 0,this.z=void 0,this.x=e||0,this.y=n||0,this.z=i||0}return Object(_.a)(t,[{key:"add",value:function(e){return new t(this.x+e.x,this.y+e.y,this.z+e.z)}},{key:"subtract",value:function(e){return new t(this.x-e.x,this.y-e.y,this.z-e.z)}},{key:"negative",value:function(){return new t(-this.x,-this.y,-this.z)}},{key:"dot",value:function(t){return this.x*t.x+this.y*t.y+this.z*t.z}},{key:"clone",value:function(){return new t(this.x,this.y,this.z)}},{key:"length",value:function(){return Math.sqrt(this.dot(this))}},{key:"scalarBy",value:function(e){return new t(this.x*e,this.y*e,this.z*e)}},{key:"equals",value:function(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}},{key:"toAffine",value:function(t){return new j(this.x,this.y,this.z,t?1:0)}},{key:"toArray",value:function(){return[this.x,this.y,this.z]}},{key:"toVector2",value:function(){return new z(this.x,this.y)}},{key:"normalize",value:function(){return this.scalarBy(1/this.length())}}]),t}();M.One=new M(1,1,1),M.Zero=new M(0,0,0),M.UnitX=new M(1,0,0),M.UnitY=new M(0,1,0),M.UnitZ=new M(0,0,1);var z=function(){function t(e,n){Object(k.a)(this,t),this.x=void 0,this.y=void 0,this.x=e||0,this.y=n||0}return Object(_.a)(t,[{key:"add",value:function(e){return new t(this.x+e.x,this.y+e.y)}},{key:"subtract",value:function(e){return new t(this.x-e.x,this.y-e.y)}},{key:"negative",value:function(){return new t(-this.x,-this.y)}},{key:"dot",value:function(t){return this.x*t.x+this.y*t.y}},{key:"clone",value:function(){return new t(this.x,this.y)}},{key:"length",value:function(){return Math.sqrt(this.dot(this))}},{key:"scalarBy",value:function(e){return new t(this.x*e,this.y*e)}},{key:"equals",value:function(t){return this.x===t.x&&this.y===t.y}},{key:"toAffine",value:function(t){return new M(this.x,this.y,t?1:0)}},{key:"toArray",value:function(){return[this.x,this.y]}},{key:"normalize",value:function(){return this.scalarBy(1/this.length())}},{key:"toScreenPointVector",value:function(){return new t(Math.floor(this.x),Math.floor(this.y))}}]),t}();z.One=new z(1,1),z.Zero=new z(0,0),z.UnitX=new z(1,0),z.UnitY=new z(0,1);var B=function(t,e){return e.add(new z(t.width/2,t.height/2))},R=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z.UnitX,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:z.UnitY;Object(k.a)(this,t),this.Cols=void 0,this.Cols=[e,n]}return Object(_.a)(t,[{key:"transpose",value:function(){return new t(new z(this.Cols[0].x,this.Cols[1].x),new z(this.Cols[0].y,this.Cols[1].y))}},{key:"add",value:function(e){return new t(this.Cols[0].add(e.Cols[0]),this.Cols[1].add(e.Cols[1]))}},{key:"subtract",value:function(e){return new t(this.Cols[0].subtract(e.Cols[0]),this.Cols[1].subtract(e.Cols[1]))}},{key:"scalarBy",value:function(e){return new t(this.Cols[0].scalarBy(e),this.Cols[1].scalarBy(e))}},{key:"negative",value:function(){return new t(this.Cols[0].negative(),this.Cols[1].negative())}},{key:"determinant",value:function(){return this.Cols[0].x*this.Cols[1].y-this.Cols[0].y-this.Cols[1].x}},{key:"multiplyMatrix",value:function(e){var n=this.transpose();return new t(new z(n.Cols[0].dot(e.Cols[0]),n.Cols[1].dot(e.Cols[0])),new z(n.Cols[0].dot(e.Cols[1]),n.Cols[1].dot(e.Cols[1])))}},{key:"multiplyVector",value:function(t){var e=this.transpose();return new z(e.Cols[0].dot(t),e.Cols[1].dot(t))}}]),t}(),E=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M.UnitX,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:M.UnitY,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:M.UnitZ;Object(k.a)(this,t),this.Cols=void 0,this.Cols=[e,n,i]}return Object(_.a)(t,[{key:"transpose",value:function(){return new t(new M(this.Cols[0].x,this.Cols[1].x,this.Cols[2].x),new M(this.Cols[0].y,this.Cols[1].y,this.Cols[2].y),new M(this.Cols[0].z,this.Cols[1].z,this.Cols[2].z))}},{key:"add",value:function(e){return new t(this.Cols[0].add(e.Cols[0]),this.Cols[1].add(e.Cols[1]),this.Cols[2].add(e.Cols[2]))}},{key:"subtract",value:function(e){return new t(this.Cols[0].subtract(e.Cols[0]),this.Cols[1].subtract(e.Cols[1]),this.Cols[2].subtract(e.Cols[2]))}},{key:"scalarBy",value:function(e){return new t(this.Cols[0].scalarBy(e),this.Cols[1].scalarBy(e),this.Cols[2].scalarBy(e))}},{key:"negative",value:function(){return new t(this.Cols[0].negative(),this.Cols[1].negative(),this.Cols[2].negative())}},{key:"determinant",value:function(){}},{key:"multiplyMatrix",value:function(e){var n=this.transpose();return new t(new M(n.Cols[0].dot(e.Cols[0]),n.Cols[1].dot(e.Cols[0]),n.Cols[2].dot(e.Cols[0])),new M(n.Cols[0].dot(e.Cols[1]),n.Cols[1].dot(e.Cols[1]),n.Cols[2].dot(e.Cols[1])),new M(n.Cols[0].dot(e.Cols[2]),n.Cols[1].dot(e.Cols[2]),n.Cols[2].dot(e.Cols[2])))}},{key:"multiplyVector",value:function(t){var e=this.transpose();return new M(e.Cols[0].dot(t),e.Cols[1].dot(t),e.Cols[2].dot(t))}},{key:"toMatrix2x2",value:function(){return new R(this.Cols[0].toVector2(),this.Cols[1].toVector2())}}]),t}(),S=function(){function t(e){Object(k.a)(this,t),this.degree=void 0,this.degree=e}return Object(_.a)(t,[{key:"clamp",value:function(){this.degree=t.getClampedValue(this.degree)}},{key:"toRadian",value:function(){return this.clamp(),this.degree*Math.PI/180}},{key:"update",value:function(e){this.degree=t.getClampedValue(e)}},{key:"getRotateMatrix",value:function(){var t=Math.cos(this.toRadian()),e=Math.sin(this.toRadian());return new R(new z(t,e),new z(-e,t))}},{key:"getRotateAffineMatrix",value:function(){var t=Math.cos(this.toRadian()),e=Math.sin(this.toRadian());return new E(new z(t,e).toAffine(!1),new z(-e,t).toAffine(!1),void 0)}}],[{key:"getClampedValue",value:function(t){var e=t%360;return e<0&&(e+=360),e}}]),t}(),A=function(){function t(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;Object(k.a)(this,t),this.canvas=void 0,this.points=void 0,this.scale=1,this.canvas=e,this.points=n,this.scale=i}return Object(_.a)(t,[{key:"draw",value:function(t,e){var n=this.canvas.getContext("2d");n.save(),n.beginPath(),n.moveTo(this.points[0].x*this.scale+t.x,-this.points[0].y*this.scale+t.y);var i,s=Object(o.a)(this.points);try{for(s.s();!(i=s.n()).done;){var r=i.value;n.lineTo(r.x*this.scale+t.x,-r.y*this.scale+t.y)}}catch(a){s.e(a)}finally{s.f()}n.fillStyle="rgba(".concat(e.r,", ").concat(e.g,", ").concat(e.b,", ").concat(e.a,")"),n.fill(),n.closePath(),n.restore()}}]),t}(),T=[[new z(0,.7),new z(-.4,1),new z(-.8,.6),new z(-.5,.1),new z(-.15,0),new z(-.1,-.6),new z(.1,-.8),new z(.3,-.5),new z(.45,0),new z(.7,.3),new z(.6,.6),new z(.2,.76)],[new z(.3,.8),new z(-.3,.7),new z(-.25,.1),new z(-.25,.1),new z(-.1,0),new z(-.2,-.2),new z(.2,-.6),new z(.6,-.1),new z(.4,.15),new z(.5,.4)],[new z(-.1,.5),new z(-.7,.2),new z(-.6,-.3),new z(-.2,-.4),new z(.3,-.35),new z(.6,-.1),new z(.65,.1),new z(.4,.5),new z(.2,.35)],[new z(-.3,.35),new z(-.7,.1),new z(-.4,-.2),new z(.1,.05),new z(.45,-.15),new z(.75,.1),new z(.4,.4),new z(.1,.3)],[new z(-.5,.5),new z(-.7,.3),new z(-.3,0),new z(-.4,-.4),new z(0,-.8),new z(.8,-.5),new z(.9,-.3),new z(.2,.4)],[new z(0,.9),new z(-.5,.7),new z(-.2,.2),new z(-.4,-.4),new z(.3,-.2),new z(.5,0),new z(.6,.7)],[new z(0,.7),new z(-.5,.6),new z(-.3,.1),new z(0,0),new z(.1,-.6),new z(.45,0),new z(.7,.3),new z(.6,.6),new z(.2,.76)],[new z(0,.8),new z(-.25,.1),new z(-.5,.1),new z(-.4,-.4),new z(-.2,-.6),new z(.3,-0),new z(.4,.15),new z(.5,.4)],[new z(-.5,.35),new z(-.4,.1),new z(-.1,-.2),new z(.3,-.5),new z(.6,-.15),new z(.9,.1),new z(.45,.4),new z(.1,.3)],[new z(-.4,.5),new z(-.5,.2),new z(-.8,-.5),new z(-.5,-.4),new z(.1,-.35),new z(.4,-.3),new z(.65,.1),new z(.4,.2),new z(.2,.4)]],P=function(){function t(e,n,i,s,r,a,o,c){var h=this;Object(k.a)(this,t),this.name=void 0,this.canvas=void 0,this.rotator=void 0,this.radius=void 0,this.position=void 0,this.speed=void 0,this.distanceFromSun=void 0,this.spaceShips=void 0,this.continents=void 0,this.continentOrigins=void 0,this.ctx=void 0,this.price=void 0,this.support=void 0,this.resistance=void 0,this.greenness=null,this.name=r,this.canvas=e,this.speed=i,this.rotator=new S(360*Math.random()),this.distanceFromSun=n,this.radius=s,this.spaceShips=[],this.ctx=this.canvas.getContext("2d"),this.price=a,this.resistance=c,this.support=o;var u=new z(n,0).toAffine(!0),l=this.rotator.getRotateAffineMatrix(),f=T.sort((function(){return.5-Math.random()})).slice(0,5);if(this.continents=f.map((function(t){return new A(h.canvas,t,20)})),this.position=l.multiplyVector(u).toVector2(),this.continentOrigins=[new z(0,-this.radius),new z(0,this.radius)],console.log(o,c,this.name),0===o.length&&0===c.length)this.greenness=0;else if(0===o.length&&0!==c.length)this.greenness=30;else if(0===c.length&&0!==o.length)this.greenness=255;else{console.log(o[o.length-1],a,c[c.length-1],this.name);for(var d=o[o.length-1],v=c[c.length-1];a>v&&c.length>0;)c.pop(),v=c[c.length-1];for(;a<d&&o.length>0;)o.pop(),d=o[o.length-1];0===c.length&&(this.greenness=255),0===o.length&&(this.greenness=10),0!==o.length&&0!==c.length&&(this.greenness=O(a,d,v,10,255)),console.log(this.greenness,"greenness!!")}for(var w=this.continents.length-this.continentOrigins.length,y=0;y<w;y++){var g=2*Math.PI/w,p=new z(Math.cos(g*y),Math.sin(g*y)).scalarBy(Math.random()*this.radius);this.continentOrigins.push(p)}}return Object(_.a)(t,[{key:"drawContinents",value:function(t){var e,n=Object(o.a)(this.continentOrigins);try{for(n.s();!(e=n.n()).done;){var i,s=e.value,r=this.continents.shift();this.ctx.save(),this.ctx.arc(t.x,t.y,this.radius,0,2*Math.PI,!1),this.ctx.clip(),r.draw(t.add(s),{r:this.greenness?255-this.greenness:0,g:null!==(i=this.greenness)&&void 0!==i?i:0,b:0,a:1}),this.ctx.restore(),this.continents.push(r)}}catch(a){n.e(a)}finally{n.f()}}},{key:"draw",value:function(){var t;this.rotator.degree+=this.speed;var e=new z(this.distanceFromSun,0).toAffine(!0),n=this.rotator.getRotateAffineMatrix();this.position=n.multiplyVector(e).toVector2();var i=B(this.canvas,this.position);this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(i.x,i.y,this.radius,0,2*Math.PI,!1),this.ctx.fillStyle="rgba(".concat(this.greenness?255-this.greenness:0,", ",0,", ").concat(null!==(t=this.greenness)&&void 0!==t?t:0,", ",1,")"),this.ctx.fill(),this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.fillStyle="white",this.ctx.fillText(this.name,i.x,i.y+this.radius+15),this.ctx.closePath(),this.ctx.restore(),this.drawContinents(i)}}]),t}(),I=function(){function t(e){Object(k.a)(this,t),this.canvas=void 0,this.radius=130,this.color="#FFFF4D",this.brightness=0,this.position=new z(0,0),this.MIN_BRIGHTNESS=5,this.MAX_BRIGHTNESS=30,this.canvas=e}return Object(_.a)(t,[{key:"setBrightness",value:function(t){console.log(t),this.brightness=t}},{key:"clampBrightnessRadius",value:function(t,e){var n=1e7*t;return n>e?e:n<0?5:n}},{key:"drawBrightnessInner",value:function(t,e){e.save(),e.beginPath(),e.arc(t.x,t.y,this.radius+this.clampBrightnessRadius(this.brightness,this.MAX_BRIGHTNESS),0,2*Math.PI,!1),e.fillStyle="rgba(255, 255, 255, 0.4)",e.fill(),e.restore()}},{key:"drawBrightnessOuter",value:function(t,e){e.save(),e.beginPath(),e.arc(t.x,t.y,this.radius+2*this.clampBrightnessRadius(this.brightness,this.MAX_BRIGHTNESS),0,2*Math.PI,!1),e.fillStyle="rgba(255, 255, 255, 0.2)",e.fill(),e.restore()}},{key:"drawSun",value:function(t,e){e.save(),e.beginPath(),e.arc(t.x,t.y,this.radius,0,2*Math.PI,!1),e.fillStyle=this.color,e.fill(),e.restore()}},{key:"draw",value:function(){var t=this.canvas.getContext("2d"),e=B(this.canvas,this.position);this.drawBrightnessInner(e,t),this.drawBrightnessOuter(e,t),this.drawSun(e,t)}}]),t}(),D=function(){function t(e){var n=this;Object(k.a)(this,t),this.fps=24,this.element=void 0,this.ctx=void 0,this.width=0,this.height=0,this.sun=void 0,this.planets=[],this.requestAnimationFrameId=void 0,this.MIN_PLANET_SIZE=15,this.MAX_PLANET_SIZE=100,this.updateFrame=function(){n.render(),setTimeout((function(){n.requestAnimationFrameId=requestAnimationFrame(n.updateFrame.bind(n))}),1e3/n.fps)},this.render=function(){n.clear(),n.drawBackground(),n.drawScene(),setTimeout((function(){requestAnimationFrame(n.render.bind(n))}),1e3/n.fps)},this.element=e,this.ctx=e.getContext("2d"),this.sun=new I(e),this.render(),this.requestAnimationFrameId=requestAnimationFrame(this.render),this.planets=[],this.initialize()}return Object(_.a)(t,[{key:"addPlanet",value:function(t,e,n,i,s,r,a){console.log(n,e,t);var o=function(t,e,n,i,s){var r=t;return r>n&&(r=n),r<e&&(r=e),(1-(r-e)/(n-e))*(s-i)+i}(n,-.1,.2,this.sun.radius+10,400+this.sun.radius),c=O(e,0,1,.02,.3),h=O(i,615291230759,93930235541513,this.MIN_PLANET_SIZE,this.MAX_PLANET_SIZE),u=new P(this.element,o,c,h,t,s,r,a);this.planets.push(u)}},{key:"initialize",value:function(){}},{key:"setWidth",value:function(t,e){this.width=t,this.element.width=e?t*e:t,this.element.style.width="".concat(t,"px")}},{key:"setHeight",value:function(t,e){this.height=t,this.element.height=e?t*e:t,this.element.style.height="".concat(t,"px")}},{key:"setSize",value:function(t,e,n){this.setWidth(t,n),this.setHeight(e,n)}},{key:"drawBackground",value:function(){}},{key:"drawScene",value:function(){this.drawGalaxyComponents()}},{key:"drawDummy",value:function(){}},{key:"drawGalaxyComponents",value:function(){this.sun.draw();var t,e=Object(o.a)(this.planets);try{for(e.s();!(t=e.n()).done;){t.value.draw()}}catch(n){e.e(n)}finally{e.f()}}},{key:"clear",value:function(){this.ctx.clearRect(0,0,this.width,this.height)}},{key:"destroy",value:function(){this.clear(),this.planets=[]}}]),t}(),U=function(){var t=Object(s.useRef)(null),e=Object(s.useRef)(null),n=Object(s.useRef)(null),i=Object(s.useContext)(C).cryptoData;return Object(s.useEffect)((function(){if(!t.current)return function(){};var e=new D(t.current);return n.current=e,function(){n.current&&n.current.destroy()}}),[]),Object(s.useEffect)((function(){if(i&&n.current){var t,e=Object(o.a)(i);try{for(e.s();!(t=e.n()).done;){var s=t.value;"KRW-BTC"===s[0]?n.current.sun.setBrightness(s[1].increaseRatio):!n.current.planets.map((function(t){return t.name})).includes(s[0])&&s[1].coefficient&&s[1].volume&&s[1].currentPrice&&s[1].support&&s[1].resistance&&n.current.addPlanet(s[0],s[1].increaseRatio,s[1].coefficient,s[1].volume,s[1].currentPrice,s[1].support,s[1].resistance)}}catch(r){e.e(r)}finally{e.f()}}}),[i]),Object(s.useEffect)((function(){var t=function(){if(e.current&&n.current){var t=e.current.getBoundingClientRect();n.current.setSize(t.width,t.height),n.current.drawScene()}};return t(),window.addEventListener("resize",t),function(){window.removeEventListener("resize",t)}}),[]),Object(b.jsx)("div",{style:{width:"100%",height:"100%",position:"fixed",background:"linear-gradient(111.08deg, rgba(0, 0, 0, 0.8) 5.71%, rgba(0, 15, 45, 0.8) 54.7%, rgba(0, 0, 0, 0.8) 98.84%)"},ref:e,children:Object(b.jsx)("canvas",{ref:t})})};var F=function(){return Object(b.jsx)("div",{style:{display:"flex",flexDirection:"column",minHeight:"100vh",backgroundColor:"black"},children:Object(b.jsx)(m,{children:Object(b.jsx)(U,{})})})},V=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,47)).then((function(e){var n=e.getCLS,i=e.getFID,s=e.getFCP,r=e.getLCP,a=e.getTTFB;n(t),i(t),s(t),r(t),a(t)}))};a.a.createRoot(document.getElementById("root")).render(Object(b.jsx)(F,{})),V()}},[[46,1,2]]]);
//# sourceMappingURL=main.9ffb2d77.chunk.js.map