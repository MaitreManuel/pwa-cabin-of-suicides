(function(e){function t(t){for(var o,i,r=t[0],c=t[1],l=t[2],u=0,p=[];u<r.length;u++)i=r[u],s[i]&&p.push(s[i][0]),s[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);d&&d(t);while(p.length)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,i=1;i<n.length;i++){var c=n[i];0!==s[c]&&(o=!1)}o&&(a.splice(t--,1),e=r(r.s=n[0]))}return e}var o={},s={app:0},a=[];function i(e){return r.p+"js/"+({about:"about"}[e]||e)+"."+{about:"663d5b62"}[e]+".js"}function r(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.e=function(e){var t=[],n=s[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise(function(t,o){n=s[e]=[t,o]});t.push(n[2]=o);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,r.nc&&c.setAttribute("nonce",r.nc),c.src=i(e),a=function(t){c.onerror=c.onload=null,clearTimeout(l);var n=s[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+o+": "+a+")");i.type=o,i.request=a,n[1](i)}s[e]=void 0}};var l=setTimeout(function(){a({type:"timeout",target:c})},12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(t)},r.m=e,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var d=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"203f":function(e,t,n){"use strict";var o=n("9974"),s=n.n(o);s.a},2555:function(e,t,n){"use strict";var o=n("68c4"),s=n.n(o);s.a},"2fba":function(e,t,n){},"458f":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),s=n("5132"),a=n.n(s),i=n("ce5b"),r=n.n(i),c=(n("db4d"),n("d1e7"),n("bf40"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",{staticClass:"wrapper"},[n("router-view")],1)}),l=[],u={name:"app",beforeCreate:function(){this.$store.dispatch("loadCabins"),this.$store.dispatch("loadHelpers"),this.$store.dispatch("loadLang")}},d=u,p=(n("5c0b"),n("2877")),f=Object(p["a"])(d,c,l,!1,null,null,null),m=f.exports,v=n("a925"),h={message:{hello:"hello world"}},b={message:{hello:"{ msg } world"}};o["default"].use(v["a"]);var g=navigator.language,y=new v["a"]({locale:g,fallbackLocale:"fr",en:h,fr:b}),w=n("8c4f"),x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:"","pa-0":""}},[n("navigation"),n("v-layout",{attrs:{row:"","map-layout":""}},[n("v-flex",{attrs:{xs12:""}},[n("div",{attrs:{id:"map"}})])],1),n("v-btn",{staticClass:"location",attrs:{absolute:"",dark:"",fab:""},on:{click:e.focusLocation}},[n("v-icon",[e._v("gps_fixed")])],1),e.ready?e._e():n("loader",{attrs:{msg:"Chargement des données"}})],1)},_=[],k=(n("7f7f"),n("ac6a"),n("cebc")),q=n("2f62"),S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrapper-loader"},[n("div",{staticClass:"loader"},[n("img",{attrs:{src:"img/sync.svg",alt:""}}),n("p",[e._v(e._s(e.msg))])])])},L=[],C={name:"loader",props:{msg:{type:String,required:!1}}},T=C,O=(n("d95b"),Object(p["a"])(T,S,L,!1,null,"2db95e8f",null)),$=O.exports,N=n("f4dd"),P={name:"home",data:function(){return{latitude:47.218371,longitude:-1.553621,map:null,mapReady:null,mbgl:null}},components:{Loader:$,Navigation:N["a"]},computed:Object(k["a"])({},Object(q["b"])(["cabins","helpers"]),{ready:function(){return this.cabins&&this.helpers&&this.mapReady}}),watch:{ready:function(){this.setCabins(),this.setHelpers(),this.setOwn()}},beforeMount:function(){this.setLocation()},mounted:function(){n("ac6d"),this.mbgl=n("e192"),this.setMap()},methods:{drawPath:function(e){var t=this;t.axios({method:"GET",url:t.$direction({latitude:t.latitude,longitude:t.longitude},e)}).then(function(e){var t=e.data.routes[0].geometry.coordinates;console.log(t)})},focusLocation:function(){document.querySelector(".mapboxgl-ctrl-geolocate").click()},openCabin:function(e){var t=this;t.axios({method:"POST",url:"".concat(t.$baseUrl,"/cabin/lock"),data:{id:e,date:(new Date).getTime()}}).then(function(e){console.log(e)})},setMap:function(){var e=this,t=new e.mbgl.GeolocateControl({fitBoundsOptions:{zoom:15},positionOptions:{enableHighAccuracy:!0},trackUserLocation:!0});t.on("trackuserlocationstart",function(){e.map.getLayer("marker")&&e.map.removeLayer("marker")}),t.on("geolocate",function(t){e.longitude=t.coords.longitude,e.latitude=t.coords.latitude}),e.mbgl.accessToken=this.$accessToken,e.map=new e.mbgl.Map({container:"map",style:"mapbox://styles/mapbox/streets-v11",center:[e.longitude,e.latitude],zoom:12,pitch:0}),e.map.addControl(t),e.map.on("load",function(){e.map.loadImage("img/cabin.png",function(t,n){if(t)throw t;e.map.addImage("cabin",n)}),e.map.loadImage("img/cabin-taken.png",function(t,n){if(t)throw t;e.map.addImage("cabin-taken",n)}),e.map.loadImage("img/helper.png",function(t,n){if(t)throw t;e.map.addImage("helper",n)}),e.map.loadImage("img/pedestrian.png",function(t,n){if(t)throw t;e.map.addImage("marker",n),e.map.isStyleLoaded()?e.$nextTick(function(){e.mapReady=!0}):e.map.once("styledata",function(){e.mapReady=!0})})})},setCabins:function(){var e=this;e.cabins&&e.cabins.forEach(function(t){if(!e.map.getLayer(t.name)){var n=[],o={type:"Feature",properties:{description:t.isTaken.status?"\n              <h2>".concat(t.name,"</h2>\n              <p>Cette cabine est occupée</p>\n            "):"\n              <h2>".concat(t.name,'</h2>\n              <button id="btn-').concat(t.name,'" class="go-to"><i class="v-icon material-icons theme--dark">directions</i> Itinéraire</button>\n            ')},geometry:{type:"Point",coordinates:[t.location.longitude,t.location.latitude]}};n.push(o);var s={id:t.name,type:"symbol",source:{type:"geojson",data:{type:"FeatureCollection",features:n}},layout:{"icon-image":t.isTaken.status?"cabin-taken":"cabin","icon-allow-overlap":!0,"icon-size":.3}};e.map.on("click",t.name,function(n){var o=n.features[0].geometry.coordinates.slice(),s=n.features[0].properties.description;while(Math.abs(n.lngLat.lng-o[0])>180)o[0]+=n.lngLat.lng>o[0]?360:-360;(new e.mbgl.Popup).setLngLat(o).setHTML(s).addTo(e.map),document.querySelector("#btn-".concat(t.name)).addEventListener("click",function(){e.drawPath(t.location),localStorage.setItem("idCabin",t._id),setTimeout(function(){e.$router.push({name:"step",params:{step:1}})},1500)}),e.map.flyTo({center:n.features[0].geometry.coordinates,zoom:17})}),e.map.addLayer(s)}})},setHelpers:function(){var e=this;e.helpers&&e.helpers.forEach(function(t){if(!e.map.getLayer(t.username)){var n=[],o={type:"Feature",properties:{description:"\n                  <h2>".concat(t.username,'</h2>\n                  <button id="btn-').concat(t.username,'" class="go-to">Contacter</button>\n                ')},geometry:{type:"Point",coordinates:[t.location.longitude,t.location.latitude]}};n.push(o);var s={id:t.username,type:"symbol",source:{type:"geojson",data:{type:"FeatureCollection",features:n}},layout:{"icon-image":"helper","icon-allow-overlap":!0,"icon-size":.3}};e.map.on("click",t.username,function(t){var n=t.features[0].geometry.coordinates.slice(),o=t.features[0].properties.description;while(Math.abs(t.lngLat.lng-n[0])>180)n[0]+=t.lngLat.lng>n[0]?360:-360;(new e.mbgl.Popup).setLngLat(n).setHTML(o).addTo(e.map),e.map.flyTo({center:t.features[0].geometry.coordinates,zoom:17})}),e.map.addLayer(s)}})},setLocation:function(){var e=this;this.$getLocation(function(t,n){e.latitude=t,e.longitude=n})},setOwn:function(){var e=this;e.map.on("click","marker",function(t){var n=t.features[0].geometry.coordinates.slice(),o=t.features[0].properties.description;while(Math.abs(t.lngLat.lng-n[0])>180)n[0]+=t.lngLat.lng>n[0]?360:-360;(new e.mbgl.Popup).setLngLat(n).setHTML(o).addTo(e.map),e.map.flyTo({center:t.features[0].geometry.coordinates,zoom:17})}),e.map.addLayer({id:"marker",type:"symbol",source:{type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",properties:{description:"Vous êtes ici."},geometry:{type:"Point",coordinates:[e.longitude,e.latitude]}}]}},layout:{"icon-image":"marker","icon-size":.3}})}}},E=P,I=(n("b8f2"),n("b5d4"),Object(p["a"])(E,x,_,!1,null,"47f919f4",null)),j=I.exports,z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrapper-questions-list"},[n("div",{staticClass:"ripple"}),n("div",{staticClass:"wave"}),e.lock||0===e.i?n("div",{staticClass:"lock",on:{click:function(t){return e.goNext("lock")}}},[n("p",{staticClass:"message animate"},[n("span",{staticClass:"lock-message"},[n("i",{staticClass:"v-icon material-icons theme--dark"},[e._v(e._s(e.lock?"lock":"lock_open"))]),e._v(" "+e._s(e.lock?"VERROUILLÉE":"DÉVERROUILLÉE"))]),e.lock?e._e():n("span",{staticClass:"start mt-3"},[e._v("Installez-vous puis touchez l'écran.")])])]):e._e(),n("v-container",{staticClass:"question-list",attrs:{"grid-list":""}},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs10:"","offset-xs1":""}},[n("v-layout",{staticClass:"mb-4",attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs10:"","offset-xs1":""}},[n("p",[e._v(e._s(e.questions[e.i].text))])])],1),"start"===e.questions[e.i].id?n("div",[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs4:"","offset-xs1":""}},[n("v-text-field",{attrs:{label:"Prénom",autocomplete:"new-password",required:""},model:{value:e.questions[e.i].response.firstname,callback:function(t){e.$set(e.questions[e.i].response,"firstname",t)},expression:"questions[i].response.firstname"}})],1),n("v-flex",{attrs:{xs4:"","offset-xs2":""}},[n("v-text-field",{attrs:{label:"Nom",autocomplete:"new-password",required:""},model:{value:e.questions[e.i].response.lastname,callback:function(t){e.$set(e.questions[e.i].response,"lastname",t)},expression:"questions[i].response.lastname"}})],1)],1),n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs4:"","offset-xs1":""}},[n("v-text-field",{attrs:{type:"number",label:"Numéro de téléphone",autocomplete:"new-password",required:""},model:{value:e.questions[e.i].response.phonenumber,callback:function(t){e.$set(e.questions[e.i].response,"phonenumber",t)},expression:"questions[i].response.phonenumber"}})],1)],1)],1):e._e(),"call-number"===e.questions[e.i].id?n("div",[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs4:"","offset-xs1":""}},[n("v-text-field",{attrs:{label:"Prénom Nom",autocomplete:"new-password",required:""},model:{value:e.questions[e.i].response.name,callback:function(t){e.$set(e.questions[e.i].response,"name",t)},expression:"questions[i].response.name"}})],1),n("v-flex",{attrs:{xs4:"","offset-xs2":""}},[n("v-text-field",{attrs:{label:"Numéro de téléphone",autocomplete:"new-password",required:""},model:{value:e.questions[e.i].response.phonenumber,callback:function(t){e.$set(e.questions[e.i].response,"phonenumber",t)},expression:"questions[i].response.phonenumber"}})],1)],1)],1):e._e(),"why"===e.questions[e.i].id||"day"===e.questions[e.i].id?n("div",[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs10:"","offset-xs1":""}},[n("v-textarea",{attrs:{label:"why"===e.questions[e.i].id?"Expliquez la raison de votre choix":"Racontez ce jour...",autocomplete:"new-password",required:""},model:{value:e.questions[e.i].response,callback:function(t){e.$set(e.questions[e.i],"response",t)},expression:"questions[i].response"}})],1)],1)],1):e._e(),e.questions[e.i].delay?n("div",[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs10:"","offset-xs1":""}},[n("div",{staticClass:"wrapper-timer"},[n("div",{ref:"timer",staticClass:"timer"})])])],1)],1):e._e(),"start"===e.questions[e.i].id?n("div",[n("v-layout",{attrs:{row:"",wrap:"","text-xs-center":""}},[n("v-flex",{attrs:{xs12:""}},[n("v-btn",{attrs:{disabled:!e.questions[e.i].response.firstname||!e.questions[e.i].response.lastname||!e.questions[e.i].response.phonenumber||!this.timeroff},on:{click:function(t){return e.goNext("start")}}},[e._v("Valider")])],1)],1)],1):e._e(),"call-number"===e.questions[e.i].id?n("div",[n("v-layout",{attrs:{row:"",wrap:"","text-xs-center":""}},[n("v-flex",{attrs:{xs12:""}},[n("v-btn",{attrs:{disabled:!e.questions[e.i].response.name||!e.questions[e.i].response.phonenumber||!this.timeroff},on:{click:function(t){return e.goNext("call-number")}}},[e._v("Valider")])],1)],1)],1):e._e(),"why"===e.questions[e.i].id||"day"===e.questions[e.i].id?n("div",[n("v-layout",{attrs:{row:"",wrap:"","text-xs-center":""}},[n("v-flex",{attrs:{xs12:""}},[n("v-btn",{attrs:{disabled:!e.questions[e.i].response||!this.timeroff},on:{click:function(t){return e.goNext("why"===e.questions[e.i].id?"why":"day")}}},[e._v("Valider")])],1)],1)],1):e._e(),!0===e.questions[e.i].yesOrNoQuestion?n("div",[n("v-layout",{attrs:{row:"",wrap:"","text-xs-center":""}},[n("v-flex",{attrs:{xs3:"","offset-xs3":""}},[n("v-btn",{attrs:{disabled:!this.timeroff},on:{click:function(t){return e.goNext(e.questions[e.i].id,!1)}}},[e._v("Non")])],1),n("v-flex",{attrs:{xs3:""}},[n("v-btn",{attrs:{disabled:!this.timeroff},on:{click:function(t){return e.goNext(e.questions[e.i].id,!0)}}},[e._v("Oui")])],1)],1)],1):e._e()],1)],1)],1)],1)},A=[],H=n("e814"),M=n.n(H),U=n("1e5c"),Q={name:"cabin",data:function(){return{ActionSound:new U["Howl"]({src:["sounds/PS4/Action_Up.mp3"],volume:1}),BlockedActionSound:new U["Howl"]({src:["sounds/PS4/Action_Down.mp3"],volume:1}),CancelSound:new U["Howl"]({src:["sounds/PS4/Load_Error.mp3"],volume:1}),DeathSound:new U["Howl"]({src:["sounds/PS4/Log_Off.mp3"],volume:1}),StartSound:new U["Howl"]({src:["sounds/PS4/Intro_Start_Up_2.mp3"],volume:1}),ThemeSound:null,UnlockSound:new U["Howl"]({src:["sounds/Outlast/Put_Battery.mp3"],volume:1}),i:M()(this.$route.params.step)-1,idInterval:0,idTheme:null,timeroff:!1,questions:[{delay:null,id:"lock",response:null,text:null,yesOrNoQuestion:!1},{delay:6e3,id:"start",response:{firstname:null,lastname:null,phonenumber:null},text:"Avant de commencer, veuillez renseigner ces informations :",yesOrNoQuestion:!1},{delay:5e3,id:"ready",response:null,text:"Êtes-vous prêt à commencer ?",yesOrNoQuestion:!0},{delay:5e3,id:"ready-1",response:null,text:"Est-ce que vous êtes sûr de vouloir mettre fin à vos jours ?",yesOrNoQuestion:!0},{delay:6e3,id:"call-number",response:{name:null,phonenumber:null},text:"Nous avons besoin d'une personne à contacter à la fin du processus, veuillez entrer ses coordonnées",yesOrNoQuestion:!1},{delay:3e4,id:"why",response:null,text:"Pourquoi en êtes-vous arrivé à cette décision ?",yesOrNoQuestion:!1},{delay:5e3,id:"ready-2",response:null,text:"Êtes-vous sûr de vouloir continuer ?",yesOrNoQuestion:!0},{delay:3e4,id:"day",response:null,text:"Racontez-nous une journée où vous vous êtes senti particulièrement bien et heureux",yesOrNoQuestion:!1},{delay:1e4,id:"end",response:null,text:"Nous voici à la fin... Êtes-vous prêt ?",yesOrNoQuestion:!0},{delay:null,id:"death",response:null,text:"Détendez-vous, nous allons procéder à la suite...",yesOrNoQuestion:!1},{delay:null,id:"stop",response:null,text:"Vous n'avez pas l'air d'être sûr de vos choix. Pour éviter toutes mauvaises actions nous préférons mettre fin à la procédure et vous laisser le temps de réfléchir.",yesOrNoQuestion:!1}]}},computed:Object(k["a"])({},Object(q["b"])(["lock"])),watch:{"$route.params.step":function(){clearInterval(this.idInterval),this.$nextTick(function(){this.timer()}),10===this.$route.params.step&&(this.ThemeSound.stop(this.idTheme),this.DeathSound.play(),this.axios({method:"POST",url:"".concat(this.$baseUrl,"/cabin/death"),data:{name:"".concat(this.questions[1].response.firstname," ").concat(this.questions[1].response.lastname),to:this.questions[4].response.phonenumber,toName:this.questions[4].response.name}}).then(function(e){console.log(e)}))},"$store.state.lock":function(){this.UnlockSound.play()}},created:function(){document.body.classList.add("cabin"),this.$socket.emit("register",{id:localStorage.getItem("id")})},destroyed:function(){document.body.classList.remove("cabin")},mounted:function(){document.body.classList.add("cabin"),window.addEventListener("click",function(e){var t=document.querySelector(".ripple"),n=t.cloneNode(!0);n.classList.add("animate"),n.style.left=e.clientX-5+"px",n.style.top=e.clientY-5+"px",t.parentNode.replaceChild(n,t)})},updated:function(){if(document.body.classList.add("cabin"),!this.lock&&!this.ThemeSound){var e=new U["Howl"]({src:["sounds/PS4/Menu_them_PS4_old.mp3"],loop:!0,volume:.25,onend:function(){console.log("Finished!")}});this.idTheme||(this.ThemeSound=e,this.idTheme=e.play())}},methods:{goNext:function(e,t){var n=this,o=function(e){var t;e||(e=1),n.i="number"!==typeof e&&"notsure"===e?n.questions.length-1:n.i+e,t=n.i+1,n.timeroff=!1,n.$router.push({name:"cabin",params:{step:t}})};"lock"===e?this.lock?this.BlockedActionSound.play():(this.StartSound.play(),o()):(this.ActionSound.play(),"boolean"===typeof t&&(this.questions[this.i].response=t),!1===t&&["ready","ready-1","ready-2","end"].indexOf(e)>-1?(this.ThemeSound.stop(this.idTheme),this.CancelSound.play(),o("notsure")):o())},timer:function(){var e=this,t=document.querySelector(".timer"),n=100,o=n/this.questions[this.i].delay*4;function s(e){n<=0?(clearInterval(e.idInterval),e.timeroff=!0):(n-=o,t&&(t.style.width="".concat(n,"%")))}this.idInterval=setInterval(function(){s(e)},1)}}},R=Q,B=(n("203f"),n("2555"),Object(p["a"])(R,z,A,!1,null,"043cecd0",null)),F=B.exports,V=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrapper-step"},[n("v-container",{staticClass:"step",attrs:{"grid-list":""}},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs10:"","offset-xs1":"","text-xs-center":""}},[n("v-icon",{staticClass:"direction"},[e._v(e._s(e.steps[e.i].icon))]),n("p",{staticClass:"text mt-5",domProps:{innerHTML:e._s(e.steps[e.i].text)}}),e.$route.params.step<e.steps.length?n("p",{staticClass:"mt-5 text-xs-right"},[n("v-btn",{on:{click:function(t){return e.goNext()}}},[e._v("Suivant")])],1):e._e(),e.$route.params.step===e.steps.length?n("p",{staticClass:"mt-5 text-xs-center"},[n("v-btn",{on:{click:function(t){return e.openCabin()}}},[n("v-icon",[e._v("lock_open")]),e._v(" Ouvrir la cabine")],1)],1):e._e()],1)],1)],1)],1)},D=[],G={name:"step",data:function(){return{i:M()(this.$route.params.step)-1,steps:[{icon:"arrow_forward",text:'Dans <span class="bold">200m</span>, tournez à <span class="bold">droite</span>'},{icon:"arrow_forward",text:'Tournez à <span class="bold">droite</span>'},{icon:"arrow_upward",text:'Pendant <span class="bold">600m</span>, continuez <span class="bold">tout droit</span>'},{icon:"call_made",text:'Au <span class="bold">carrefour</span>, prenez sur votre <span class="bold">droite</span>'},{icon:"arrow_upward",text:'Pendant <span class="bold">400m</span>, continuez <span class="bold">tout droit</span>'},{icon:"arrow_upward",text:'Après le <span class="bold">carrefour</span>, continuez <span class="bold">tout droit</span> jusqu\'au <span class="bold">rond-point</span> pendant <span class="bold">500m</span>'},{icon:"nature_people",text:'Au <span class="bold">rond-point</span>, vous apercevrez la <span class="bold">cabine</span>'},{icon:"done_outline",text:'Vous êtes <span class="bold">arrivé</span>'}]}},watch:{"$route.params.step":function(){this.i=this.$route.params.step-1}},methods:{goNext:function(){this.$router.push({name:"step",params:{step:M()(this.$route.params.step)+1}})},openCabin:function(){var e=this;e.axios({method:"POST",url:"".concat(e.$baseUrl,"/cabin/lock"),data:{id:localStorage.getItem("idCabin"),date:(new Date).getTime()}}).then(function(e){console.log(e)})}}},W=G,J=(n("e0f9"),n("fb1d"),Object(p["a"])(W,V,D,!1,null,"c34bc782",null)),X=J.exports;o["default"].use(w["a"]);var K=new w["a"]({routes:[{path:"/",name:"home",component:j},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/cabin/:step",name:"cabin",component:F},{path:"/step/:step",name:"step",component:X}]}),Y=n("bc3a"),Z=n.n(Y),ee=n("a7fe"),te=n.n(ee);o["default"].use(q["a"]),o["default"].use(te.a,Z.a);var ne=new q["a"].Store({state:{cabins:null,helpers:null,lang:null,lock:!0},actions:{loadCabins:function(e){var t=e.commit;o["default"].axios({method:"GET",url:"".concat(this._vm.$baseUrl,"/cabin")}).then(function(e){return e.data}).then(function(e){t("SET_CABINS",e)})},loadHelpers:function(e){var t=e.commit;o["default"].axios({method:"GET",url:"".concat(this._vm.$baseUrl,"/helper")}).then(function(e){return e.data}).then(function(e){t("SET_HELPERS",e)})},loadLang:function(e){var t=e.commit,n=localStorage.getItem("lang")?localStorage.getItem("lang"):"fr";localStorage.setItem("lang",n),t("SET_LANG",n)}},mutations:{SET_CABINS:function(e,t){e.cabins=t},SET_HELPERS:function(e,t){e.helpers=t},SET_LANG:function(e,t){e.lang=t},SET_LOCK:function(e,t){e.lock=t}}}),oe=ne,se=n("9483");Object(se["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),o["default"].config.productionTip=!1,o["default"].prototype.$accessToken="pk.eyJ1IjoibWFpdHJlbWFudWVsIiwiYSI6ImNqdWUwOXB5czByOWg0NHA5emhzajg0MXoifQ.wmKWlpczXU1SVDUCA8GMbA",o["default"].prototype.$baseUrl="https://cabin-of-suicides.herokuapp.com",o["default"].prototype.$direction=function(e,t){return"https://api.mapbox.com/directions/v5/mapbox/walking/".concat(e.longitude,"%2C").concat(e.latitude,"%3B").concat(t.longitude,"%2C").concat(t.latitude,".json?access_token=").concat(o["default"].prototype.$accessToken,"&overview=full&geometries=geojson")},o["default"].prototype.$getLocation=function(e){"geolocation"in navigator?navigator.geolocation.getCurrentPosition(function(t){e(t.coords.latitude,t.coords.longitude)}):alert("/* geolocation IS NOT available */")},o["default"].prototype.$splitUrlMapBox=["https://api.mapbox.com/geocoding/v5/mapbox.places/",",",".json?access_token="],o["default"].use(new a.a({debug:!0,connection:o["default"].prototype.$baseUrl})),o["default"].use(r.a,{iconfont:"md"}),new o["default"]({i18n:y,router:K,sockets:{connect:function(){console.log("socket connected")},lock:function(){this.$store.commit("SET_LOCK",!1)}},store:oe,render:function(e){return e(m)}}).$mount("#app")},"5b6a":function(e,t,n){"use strict";var o=n("aec1"),s=n.n(o);s.a},"5c0b":function(e,t,n){"use strict";var o=n("458f"),s=n.n(o);s.a},6041:function(e,t,n){},"68c4":function(e,t,n){},8412:function(e,t,n){},"98c5":function(e,t,n){},9974:function(e,t,n){},"9b74":function(e,t,n){},a4cc:function(e,t,n){},aec1:function(e,t,n){},b5d4:function(e,t,n){"use strict";var o=n("2fba"),s=n.n(o);s.a},b8f2:function(e,t,n){"use strict";var o=n("8412"),s=n.n(o);s.a},d95b:function(e,t,n){"use strict";var o=n("98c5"),s=n.n(o);s.a},e0f9:function(e,t,n){"use strict";var o=n("6041"),s=n.n(o);s.a},e274:function(e,t,n){"use strict";var o=n("9b74"),s=n.n(o);s.a},f4dd:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{attrs:{row:"","nav-layout":""}},[n("v-flex",{attrs:{xs12:""}},[n("v-toolbar",[n("v-toolbar-side-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}})],1),n("v-navigation-drawer",{attrs:{absolute:"",dark:"",temporary:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list",{staticClass:"pa-1"},[n("v-list-tile",{attrs:{avatar:"",tag:"div"}},[n("v-list-tile-avatar",[n("v-icon",[e._v("face")])],1),n("v-list-tile-content",[n("v-list-tile-title",[e._v("Visiteur")])],1),n("v-list-tile-action",[n("v-btn",{attrs:{icon:""},on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}},[n("v-icon",[e._v("close")])],1)],1)],1)],1),n("v-list",{staticClass:"pt-0",attrs:{dense:""}},[n("v-divider",{attrs:{dark:""}})],1)],1)],1)],1)},s=[],a={name:"navigation",data:function(){return{drawer:!1,items:[{title:"Accueil",icon:"dashboard",page:"home"},{title:"À propos",icon:"question_answer",page:"about"},{title:"Se connecter (helper)",icon:"perm_identity",page:"login"}],right:null}},methods:{goTo:function(e,t,n){n(),this.$router.push({name:e,params:t})},switchLang:function(){localStorage.getItem("lang")&&localStorage.setItem("lang","fr")}}},i=a,r=(n("e274"),n("5b6a"),n("2877")),c=Object(r["a"])(i,o,s,!1,null,"b81baeac",null);t["a"]=c.exports},fb1d:function(e,t,n){"use strict";var o=n("a4cc"),s=n.n(o);s.a}});