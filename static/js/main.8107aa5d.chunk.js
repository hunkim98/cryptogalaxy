(this.webpackJsonpcryptogalaxy=this.webpackJsonpcryptogalaxy||[]).push([[0],{39:function(t,e,n){},40:function(t,e,n){},46:function(t,e,n){"use strict";n.r(e);var i=n(4),s=n(28),r=n.n(s),a=(n(39),n(40),n(8)),o=n(14),h=n(26),u=n(11),c=n(22),l=n(23),w="https://upbit-next-proxy.vercel.app/api/",f=function(){var t=Object(c.a)(Object(u.a)().mark((function t(e,n){var i;return Object(u.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.get(w+"days"+"?market=".concat(e,"&count=").concat(n));case 2:return i=t.sent,console.log(i),t.abrupt("return",i.data.data);case 5:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),d=function(){var t=Object(c.a)(Object(u.a)().mark((function t(e){var n;return Object(u.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.get(w+"ticker"+"?market=".concat(e));case 2:return n=t.sent,t.abrupt("return",n.data.data);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),v=function(t,e){if(t.length<e)throw new Error("the inverval is bigger than the passed data ");var n=y(t,e);return(n[n.length-1]-n[0])/n[0]},y=function(t,e){for(var n=new Date(t[0].candle_date_time_utc).getTime()-new Date(t[0].candle_date_time_utc).getTime()>0?Object(o.a)(t).reverse():t,i=[],s=n.length,r=n.map((function(t){return t.prev_closing_price})),a=0;a<s-(e-1);a++){var h=r.slice(a,a+(e-1)).reduce((function(t,e){return t+e}),0);i.push(h)}return i},g=n(6),C=Object(i.createContext)({}),x=function(t){var e=t.children,n=Object(i.useState)(new Map),s=Object(h.a)(n,2),r=s[0],a=s[1];Object(i.useEffect)((function(){f("KRW-BTC",60).then((function(t){var e=v(t,20);a((function(t){return new Map([].concat(Object(o.a)(t),[["KRW-BTC",{increaseRatio:e}]]))}))})),f("KRW-ETH",60).then((function(t){var e=v(t,20);a((function(t){return new Map([].concat(Object(o.a)(t),[["KRW-ETH",{increaseRatio:e}]]))}))})),f("KRW-ETH",60).then((function(t){var e=v(t,20);a((function(t){return new Map([].concat(Object(o.a)(t),[["KRW-DOGE",{increaseRatio:e}]]))}))})),d("KRW-BTC").then((function(t){console.log(t)}))}),[]);var u=Object(i.useState)([]),c=Object(h.a)(u,2);c[0],c[1];return Object(g.jsx)(C.Provider,{value:{cryptoData:r},children:e})},p=n(2),b=n(3),k=function(){function t(e,n,i,s){Object(p.a)(this,t),this.x=void 0,this.y=void 0,this.z=void 0,this.w=void 0,this.x=e||0,this.y=n||0,this.z=i||0,this.w=s||0}return Object(b.a)(t,[{key:"add",value:function(e){return new t(this.x+e.x,this.y+e.y,this.z+e.z,this.w+e.w)}},{key:"subtract",value:function(e){return new t(this.x-e.x,this.y-e.y,this.z-e.z,this.w-e.w)}},{key:"negative",value:function(){return new t(-this.x,-this.y,-this.z,-this.w)}},{key:"dot",value:function(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}},{key:"clone",value:function(){return new t(this.x,this.y,this.z,this.w)}},{key:"length",value:function(){return Math.sqrt(this.dot(this))}},{key:"scalarBy",value:function(e){return new t(this.x*e,this.y*e,this.z*e,this.w*e)}},{key:"equals",value:function(t){return this.x===t.x&&this.y===t.y&&this.z===t.z&&this.w===t.w}},{key:"toArray",value:function(){return[this.x,this.y,this.z,this.w]}},{key:"toVector2",value:function(){return new O(this.x,this.y)}},{key:"toVector3",value:function(){return new m(this.x,this.y,this.z)}},{key:"normalize",value:function(){return this.scalarBy(1/this.length())}}]),t}();k.One=new k(1,1,1,1),k.Zero=new k(0,0,0,0),k.UnitX=new k(1,0,0,0),k.UnitY=new k(0,1,0,0),k.UnitZ=new k(0,0,1,0),k.UnitW=new k(0,0,0,1);var m=function(){function t(e,n,i){Object(p.a)(this,t),this.x=void 0,this.y=void 0,this.z=void 0,this.x=e||0,this.y=n||0,this.z=i||0}return Object(b.a)(t,[{key:"add",value:function(e){return new t(this.x+e.x,this.y+e.y,this.z+e.z)}},{key:"subtract",value:function(e){return new t(this.x-e.x,this.y-e.y,this.z-e.z)}},{key:"negative",value:function(){return new t(-this.x,-this.y,-this.z)}},{key:"dot",value:function(t){return this.x*t.x+this.y*t.y+this.z*t.z}},{key:"clone",value:function(){return new t(this.x,this.y,this.z)}},{key:"length",value:function(){return Math.sqrt(this.dot(this))}},{key:"scalarBy",value:function(e){return new t(this.x*e,this.y*e,this.z*e)}},{key:"equals",value:function(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}},{key:"toAffine",value:function(t){return new k(this.x,this.y,this.z,t?1:0)}},{key:"toArray",value:function(){return[this.x,this.y,this.z]}},{key:"toVector2",value:function(){return new O(this.x,this.y)}},{key:"normalize",value:function(){return this.scalarBy(1/this.length())}}]),t}();m.One=new m(1,1,1),m.Zero=new m(0,0,0),m.UnitX=new m(1,0,0),m.UnitY=new m(0,1,0),m.UnitZ=new m(0,0,1);var O=function(){function t(e,n){Object(p.a)(this,t),this.x=void 0,this.y=void 0,this.x=e||0,this.y=n||0}return Object(b.a)(t,[{key:"add",value:function(e){return new t(this.x+e.x,this.y+e.y)}},{key:"subtract",value:function(e){return new t(this.x-e.x,this.y-e.y)}},{key:"negative",value:function(){return new t(-this.x,-this.y)}},{key:"dot",value:function(t){return this.x*t.x+this.y*t.y}},{key:"clone",value:function(){return new t(this.x,this.y)}},{key:"length",value:function(){return Math.sqrt(this.dot(this))}},{key:"scalarBy",value:function(e){return new t(this.x*e,this.y*e)}},{key:"equals",value:function(t){return this.x===t.x&&this.y===t.y}},{key:"toAffine",value:function(t){return new m(this.x,this.y,t?1:0)}},{key:"toArray",value:function(){return[this.x,this.y]}},{key:"normalize",value:function(){return this.scalarBy(1/this.length())}},{key:"toScreenPointVector",value:function(){return new t(Math.floor(this.x),Math.floor(this.y))}}]),t}();O.One=new O(1,1),O.Zero=new O(0,0),O.UnitX=new O(1,0),O.UnitY=new O(0,1);var j=function(){function t(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;Object(p.a)(this,t),this.canvas=void 0,this.points=void 0,this.scale=1,this.canvas=e,this.points=n,this.scale=i}return Object(b.a)(t,[{key:"draw",value:function(t,e){var n=this.canvas.getContext("2d");n.save(),n.beginPath(),n.moveTo(this.points[0].x*this.scale+t.x,-this.points[0].y*this.scale+t.y);var i,s=Object(a.a)(this.points);try{for(s.s();!(i=s.n()).done;){var r=i.value;n.lineTo(r.x*this.scale+t.x,-r.y*this.scale+t.y)}}catch(o){s.e(o)}finally{s.f()}n.fillStyle="rgba(".concat(e.r,", ").concat(e.g,", ").concat(e.b,", ").concat(e.a,")"),n.fill(),n.closePath(),n.restore()}}]),t}(),z=[new O(0,.7),new O(-.4,1),new O(-.8,.6),new O(-.5,.1),new O(-.15,0),new O(-.1,-.6),new O(.1,-.8),new O(.3,-.5),new O(.45,0),new O(.7,.3),new O(.6,.6),new O(.2,.76)],B=[new O(.3,.8),new O(-.3,.7),new O(-.25,.1),new O(-.25,.1),new O(-.1,0),new O(-.2,-.2),new O(.2,-.6),new O(.6,-.1),new O(.4,.15),new O(.5,.4)],M=[new O(-.1,.5),new O(-.7,.2),new O(-.6,-.3),new O(-.2,-.4),new O(.3,-.35),new O(.6,-.1),new O(.65,.1),new O(.4,.5),new O(.2,.35)],R=[new O(-.3,.35),new O(-.7,.1),new O(-.4,-.2),new O(.1,.05),new O(.45,-.15),new O(.75,.1),new O(.4,.4),new O(.1,.3)],S=[new O(-.5,.5),new O(-.7,.3),new O(-.3,0),new O(-.4,-.4),new O(0,-.8),new O(.8,-.5),new O(.9,-.3),new O(.2,.4)],F=[new O(0,.9),new O(-.5,.7),new O(-.2,.2),new O(-.4,-.4),new O(.3,-.2),new O(.5,0),new O(.6,.7)],A=[new O(0,.7),new O(-.5,.6),new O(-.3,.1),new O(0,0),new O(.1,-.6),new O(.45,0),new O(.7,.3),new O(.6,.6),new O(.2,.76)],P=[new O(0,.8),new O(-.25,.1),new O(-.5,.1),new O(-.4,-.4),new O(-.2,-.6),new O(.3,-0),new O(.4,.15),new O(.5,.4)],T=[new O(-.5,.35),new O(-.4,.1),new O(-.1,-.2),new O(.3,-.5),new O(.6,-.15),new O(.9,.1),new O(.45,.4),new O(.1,.3)],V=[new O(-.4,.5),new O(-.5,.2),new O(-.8,-.5),new O(-.5,-.4),new O(.1,-.35),new O(.4,-.3),new O(.65,.1),new O(.4,.2),new O(.2,.4)],U=[z,B,M,R,S,F,A,P,T,V],I=function(t,e){return e.add(new O(t.width/2,t.height/2))},q=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O.UnitX,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:O.UnitY;Object(p.a)(this,t),this.Cols=void 0,this.Cols=[e,n]}return Object(b.a)(t,[{key:"transpose",value:function(){return new t(new O(this.Cols[0].x,this.Cols[1].x),new O(this.Cols[0].y,this.Cols[1].y))}},{key:"add",value:function(e){return new t(this.Cols[0].add(e.Cols[0]),this.Cols[1].add(e.Cols[1]))}},{key:"subtract",value:function(e){return new t(this.Cols[0].subtract(e.Cols[0]),this.Cols[1].subtract(e.Cols[1]))}},{key:"scalarBy",value:function(e){return new t(this.Cols[0].scalarBy(e),this.Cols[1].scalarBy(e))}},{key:"negative",value:function(){return new t(this.Cols[0].negative(),this.Cols[1].negative())}},{key:"determinant",value:function(){return this.Cols[0].x*this.Cols[1].y-this.Cols[0].y-this.Cols[1].x}},{key:"multiplyMatrix",value:function(e){var n=this.transpose();return new t(new O(n.Cols[0].dot(e.Cols[0]),n.Cols[1].dot(e.Cols[0])),new O(n.Cols[0].dot(e.Cols[1]),n.Cols[1].dot(e.Cols[1])))}},{key:"multiplyVector",value:function(t){var e=this.transpose();return new O(e.Cols[0].dot(t),e.Cols[1].dot(t))}}]),t}(),E=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m.UnitX,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m.UnitY,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:m.UnitZ;Object(p.a)(this,t),this.Cols=void 0,this.Cols=[e,n,i]}return Object(b.a)(t,[{key:"transpose",value:function(){return new t(new m(this.Cols[0].x,this.Cols[1].x,this.Cols[2].x),new m(this.Cols[0].y,this.Cols[1].y,this.Cols[2].y),new m(this.Cols[0].z,this.Cols[1].z,this.Cols[2].z))}},{key:"add",value:function(e){return new t(this.Cols[0].add(e.Cols[0]),this.Cols[1].add(e.Cols[1]),this.Cols[2].add(e.Cols[2]))}},{key:"subtract",value:function(e){return new t(this.Cols[0].subtract(e.Cols[0]),this.Cols[1].subtract(e.Cols[1]),this.Cols[2].subtract(e.Cols[2]))}},{key:"scalarBy",value:function(e){return new t(this.Cols[0].scalarBy(e),this.Cols[1].scalarBy(e),this.Cols[2].scalarBy(e))}},{key:"negative",value:function(){return new t(this.Cols[0].negative(),this.Cols[1].negative(),this.Cols[2].negative())}},{key:"determinant",value:function(){}},{key:"multiplyMatrix",value:function(e){var n=this.transpose();return new t(new m(n.Cols[0].dot(e.Cols[0]),n.Cols[1].dot(e.Cols[0]),n.Cols[2].dot(e.Cols[0])),new m(n.Cols[0].dot(e.Cols[1]),n.Cols[1].dot(e.Cols[1]),n.Cols[2].dot(e.Cols[1])),new m(n.Cols[0].dot(e.Cols[2]),n.Cols[1].dot(e.Cols[2]),n.Cols[2].dot(e.Cols[2])))}},{key:"multiplyVector",value:function(t){var e=this.transpose();return new m(e.Cols[0].dot(t),e.Cols[1].dot(t),e.Cols[2].dot(t))}},{key:"toMatrix2x2",value:function(){return new q(this.Cols[0].toVector2(),this.Cols[1].toVector2())}}]),t}(),W=function(){function t(e){Object(p.a)(this,t),this.degree=void 0,this.degree=e}return Object(b.a)(t,[{key:"clamp",value:function(){this.degree=t.getClampedValue(this.degree)}},{key:"toRadian",value:function(){return this.clamp(),this.degree*Math.PI/180}},{key:"update",value:function(e){this.degree=t.getClampedValue(e)}},{key:"getRotateMatrix",value:function(){var t=Math.cos(this.toRadian()),e=Math.sin(this.toRadian());return new q(new O(t,e),new O(-e,t))}},{key:"getRotateAffineMatrix",value:function(){var t=Math.cos(this.toRadian()),e=Math.sin(this.toRadian());return new E(new O(t,e).toAffine(!1),new O(-e,t).toAffine(!1),void 0)}}],[{key:"getClampedValue",value:function(t){var e=t%360;return e<0&&(e+=360),e}}]),t}(),D=function(){function t(e,n,i,s){var r=this;Object(p.a)(this,t),this.canvas=void 0,this.rotator=void 0,this.radius=void 0,this.position=void 0,this.speed=void 0,this.distanceFromSun=void 0,this.spaceShips=void 0,this.continents=void 0,this.continentOrigins=void 0,this.canvas=e,this.speed=i,this.rotator=new W(360*Math.random()),this.distanceFromSun=n,this.radius=s,this.spaceShips=[];var a=new O(n,0).toAffine(!0),o=this.rotator.getRotateAffineMatrix(),h=U.sort((function(){return.5-Math.random()})).slice(0,5);this.continents=h.map((function(t){return new j(r.canvas,t,20)})),this.position=o.multiplyVector(a).toVector2(),this.continentOrigins=[new O(0,-this.radius),new O(0,this.radius)];for(var u=this.continents.length-this.continentOrigins.length,c=0;c<u;c++){var l=2*Math.PI/u,w=new O(Math.cos(l*c),Math.sin(l*c)).scalarBy(Math.random()*this.radius);this.continentOrigins.push(w)}}return Object(b.a)(t,[{key:"drawContinents",value:function(t){var e,n=Object(a.a)(this.continentOrigins);try{for(n.s();!(e=n.n()).done;){var i=e.value,s=this.continents.shift();s.draw(t.add(i),{r:255,g:0,b:255,a:1}),this.continents.push(s)}}catch(r){n.e(r)}finally{n.f()}}},{key:"draw",value:function(){this.rotator.degree++;var t=new O(this.distanceFromSun,0).toAffine(!0),e=this.rotator.getRotateAffineMatrix();this.position=e.multiplyVector(t).toVector2();var n=I(this.canvas,this.position),i=this.canvas.getContext("2d");i.save(),i.beginPath(),i.arc(n.x,n.y,this.radius,0,2*Math.PI,!1),i.fillStyle="white",i.fill(),i.closePath(),i.restore(),this.drawContinents(n)}}]),t}(),K=function(){function t(e){Object(p.a)(this,t),this.canvas=void 0,this.radius=150,this.color="#FFFF4D",this.brightness=0,this.position=new O(0,0),this.canvas=e}return Object(b.a)(t,[{key:"setBrightness",value:function(t){console.log(t),this.brightness=t}},{key:"clampBrightnessRadius",value:function(t,e){var n=1e7*t;return n>e?e:n<0?0:n}},{key:"drawBrightnessInner",value:function(t,e){e.save(),e.beginPath(),e.arc(t.x,t.y,this.radius+this.clampBrightnessRadius(this.brightness,10),0,2*Math.PI,!1),e.fillStyle="rgba(255, 255, 255, 0.4)",e.fill(),e.restore()}},{key:"drawBrightnessOuter",value:function(t,e){e.save(),e.beginPath(),e.arc(t.x,t.y,this.radius+this.clampBrightnessRadius(this.brightness,20),0,2*Math.PI,!1),e.fillStyle="rgba(255, 255, 255, 0.2)",e.fill(),e.restore()}},{key:"drawSun",value:function(t,e){e.save(),e.beginPath(),e.arc(t.x,t.y,this.radius,0,2*Math.PI,!1),e.fillStyle=this.color,e.fill(),e.restore()}},{key:"draw",value:function(){var t=this.canvas.getContext("2d"),e=I(this.canvas,this.position);this.drawBrightnessInner(e,t),this.drawBrightnessOuter(e,t),this.drawSun(e,t)}}]),t}(),_=function(){function t(e){var n=this;Object(p.a)(this,t),this.fps=24,this.element=void 0,this.ctx=void 0,this.width=0,this.height=0,this.sun=void 0,this.planets=[],this.requestAnimationFrameId=void 0,this.continents=[],this.updateFrame=function(){n.render(),setTimeout((function(){n.requestAnimationFrameId=requestAnimationFrame(n.updateFrame.bind(n))}),1e3/n.fps)},this.render=function(){n.clear(),n.drawScene(),setTimeout((function(){requestAnimationFrame(n.render.bind(n))}),1e3/n.fps)},this.element=e,this.ctx=e.getContext("2d"),this.sun=new K(e),this.initialize(),this.render(),this.requestAnimationFrameId=requestAnimationFrame(this.render),this.continents.push(new j(e,z,100)),this.continents.push(new j(e,B,100)),this.continents.push(new j(e,M,100)),this.continents.push(new j(e,R,100)),this.continents.push(new j(e,S,100)),this.continents.push(new j(e,F,100)),this.continents.push(new j(e,A,100)),this.continents.push(new j(e,P,100)),this.continents.push(new j(e,T,100)),this.continents.push(new j(e,V,100))}return Object(b.a)(t,[{key:"initialize",value:function(){this.planets=[new D(this.element,this.sun.radius+50,1,20)]}},{key:"setWidth",value:function(t,e){this.width=t,this.element.width=e?t*e:t,this.element.style.width="".concat(t,"px")}},{key:"setHeight",value:function(t,e){this.height=t,this.element.height=e?t*e:t,this.element.style.height="".concat(t,"px")}},{key:"setSize",value:function(t,e,n){this.setWidth(t,n),this.setHeight(e,n)}},{key:"drawBackground",value:function(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.width,this.height)}},{key:"drawScene",value:function(){this.drawBackground(),this.drawGalaxyComponents()}},{key:"drawDummy",value:function(){}},{key:"drawGalaxyComponents",value:function(){this.sun.draw();var t,e=Object(a.a)(this.planets);try{for(e.s();!(t=e.n()).done;){t.value.draw()}}catch(i){e.e(i)}finally{e.f()}for(var n=0;n<this.continents.length;n++)this.continents[n].draw(new O(150*(n-2),150),{r:55,g:0,b:200,a:1})}},{key:"clear",value:function(){this.ctx.clearRect(0,0,this.width,this.height)}}]),t}(),H=function(){var t=Object(i.useRef)(null),e=Object(i.useRef)(null),n=Object(i.useRef)(null),s=Object(i.useContext)(C).cryptoData;return Object(i.useEffect)((function(){if(!t.current)return function(){};var e=new _(t.current);return n.current=e,function(){n.current&&n.current.clear()}}),[]),Object(i.useEffect)((function(){if(s&&n.current){var t,e=Object(a.a)(s);try{for(e.s();!(t=e.n()).done;){var i=t.value;console.log(i,"hihihi"),"KRW-BTC"===i[0]&&n.current.sun.setBrightness(i[1].increaseRatio)}}catch(r){e.e(r)}finally{e.f()}}}),[s]),Object(i.useEffect)((function(){var t=function(){if(e.current&&n.current){var t=e.current.getBoundingClientRect();n.current.setSize(t.width,t.height),n.current.drawScene()}};return t(),window.addEventListener("resize",t),function(){window.removeEventListener("resize",t)}}),[]),Object(g.jsx)("div",{style:{width:"100%",height:"100%",position:"fixed"},ref:e,children:Object(g.jsx)("canvas",{ref:t})})};var Z=function(){return Object(g.jsx)("div",{style:{display:"flex",flexDirection:"column",minHeight:"100vh"},children:Object(g.jsx)(x,{children:Object(g.jsx)(H,{})})})},X=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,47)).then((function(e){var n=e.getCLS,i=e.getFID,s=e.getFCP,r=e.getLCP,a=e.getTTFB;n(t),i(t),s(t),r(t),a(t)}))};r.a.createRoot(document.getElementById("root")).render(Object(g.jsx)(Z,{})),X()}},[[46,1,2]]]);
//# sourceMappingURL=main.8107aa5d.chunk.js.map