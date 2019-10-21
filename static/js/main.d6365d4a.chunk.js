(this["webpackJsonpinventory-control"]=this["webpackJsonpinventory-control"]||[]).push([[0],{60:function(e,t,n){},73:function(e,t,n){e.exports=n(86)},78:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){},86:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(7),o=n.n(i),l=(n(78),n(20)),c=n(15),s=n(27),u=n(28),d=n(11),h=n(31),m=n(127),v=n(130),f=n(88),b=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={title:e.title},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(m.a,{position:"static",color:"secondary"},r.a.createElement(v.a,null,r.a.createElement(f.a,{variant:"h6",style:{fontWeight:"bold"}},this.state.title)))}}]),t}(a.Component),k=n(141),g=n(131),S=n(24),y=(n(60),n(38)),E="ADD_SKU",p="SCAN_FIXTURE";var C=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={fixtureId:null},n.handleFixtureIdChange=n.handleFixtureIdChange.bind(Object(d.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(d.a)(n)),n.isButtonDisabled=n.isButtonDisabled.bind(Object(d.a)(n)),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"handleFixtureIdChange",value:function(e){this.setState({fixtureId:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this.state.fixtureId;this.props.scanFixture({fixtureId:t}),this.setState({fixtureId:""})}},{key:"isButtonDisabled",value:function(){return!this.state.fixtureId}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(b,{title:"Inventory Control"}),r.a.createElement("div",{className:"container"},r.a.createElement(k.a,{autoFocus:!0,id:"outlined-name",label:"Fixture ID",margin:"normal",variant:"outlined",onChange:this.handleFixtureIdChange}),r.a.createElement(S.b,{to:"/start",style:{textDecoration:"none"}},r.a.createElement(g.a,{disabled:this.isButtonDisabled(),style:{width:"100%"},fullWidth:!0,variant:"contained",color:"secondary",onClick:this.handleSubmit},"Proceed"))))}}]),t}(a.Component),j=Object(y.b)(null,(function(e){return{scanFixture:function(t){return e({type:p,payload:t})}}}))(C),x=n(132),O=n(145),w=(n(84),n(22)),I=Object(x.a)((function(e){return Object(O.a)({root:{flexGrow:1}})})),F=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return this.props.fixtureId?r.a.createElement("div",{className:I.root},r.a.createElement(b,{title:"Inventory Control"}),r.a.createElement(f.a,{variant:"overline",style:{fontSize:18,margin:10,marginBottom:0,textTransform:"uppercase"}},"Fixture ID:",r.a.createElement(f.a,{variant:"overline",style:{fontSize:18,margin:10,marginBottom:0,textDecoration:"underline"}},this.props.fixtureId)),r.a.createElement("div",{style:{display:"flex-vertical",flexGrow:2,margin:10}},r.a.createElement(S.b,{to:"/scan",style:{textDecoration:"none"}},r.a.createElement(g.a,{style:{width:"100%",marginBottom:10},variant:"contained",color:"secondary"},"Start Scanning")),r.a.createElement(S.b,{to:"/",style:{textDecoration:"none"}},r.a.createElement(g.a,{style:{width:"100%"},variant:"contained",color:"secondary"},"Back to Home")))):r.a.createElement(w.a,{push:!0,to:"/"})}}]),t}(a.Component),L=Object(y.b)((function(e){return{fixtureId:e.fixtureId}}))(F),D=n(135),W=n(139),B=n(138),T=n(136),M=n(137),A=n(143),R=n(140),U=n(64),N=n(144),G=n(134),K=n(133);function P(){var e=r.a.useState(!1),t=Object(U.a)(e,2),n=t[0],a=t[1],i=function(){a(!1)};return r.a.createElement("div",null,r.a.createElement(g.a,{style:{width:"100%",marginBottom:10},variant:"contained",color:"secondary",onClick:function(){a(!0)}},"Finish Counting"),r.a.createElement(N.a,{open:n,onClose:i,"aria-labelledby":"form-dialog-title"},r.a.createElement(K.a,{id:"form-dialog-title"},"Finish counting?"),r.a.createElement(G.a,null,r.a.createElement(g.a,{onClick:i,color:"primary"},"Cancel"),r.a.createElement(g.a,{onClick:i,color:"primary"},"Confirm"))))}var z=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleSkuIdChange=n.handleSkuIdChange.bind(Object(d.a)(n)),n.handleSkuSave=n.handleSkuSave.bind(Object(d.a)(n)),n.resetState=n.resetState.bind(Object(d.a)(n)),n.getSkuTable=n.getSkuTable.bind(Object(d.a)(n)),n.handleSwitchToggle=n.handleSwitchToggle.bind(Object(d.a)(n)),n.handleSkuSaveWithId=n.handleSkuSaveWithId.bind(Object(d.a)(n)),n.textField=r.a.createRef(),n.returnFocus=n.returnFocus.bind(Object(d.a)(n)),n.state={currentSku:"",scannerMode:!1,skuCountList:{}},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"handleSkuIdChange",value:function(e){this.setState({currentSku:e.target.value,skuCountList:this.state.skuCountList,scannerMode:this.state.scannerMode}),this.state.scannerMode&&this.handleSkuSaveWithId(e.target.value)}},{key:"resetState",value:function(){this.setState({currentSku:"",scannerMode:!1,skuCountList:{}}),this.returnFocus()}},{key:"returnFocus",value:function(){this.textField.current.focus()}},{key:"handleSwitchToggle",value:function(){var e=this.state.scannerMode;this.setState({currentSku:this.state.currentSku,scannerMode:!e,skuCountList:this.state.skuCountList}),this.returnFocus()}},{key:"handleSkuSaveWithId",value:function(e){var t=this.state.skuCountList;this.state.skuCountList[e]?t[e]=this.state.skuCountList[e]+1:e&&(t[e]=1),this.setState({skuCountList:t,currentSku:""}),this.returnFocus()}},{key:"handleSkuSave",value:function(){this.handleSkuSaveWithId(this.state.currentSku)}},{key:"isScanDisabled",value:function(){return!!this.state.scannerMode||!this.state.currentSku}},{key:"getSkuTable",value:function(){if(this.state.skuCountList&&Object.entries(this.state.skuCountList).length>0)return r.a.createElement(D.a,{stickyHeader:!0},r.a.createElement(T.a,null,r.a.createElement(M.a,null,r.a.createElement(B.a,null,r.a.createElement(f.a,{variant:"h6"},"SKU ID")),r.a.createElement(B.a,null,r.a.createElement(f.a,{variant:"h6"},"Count")))),r.a.createElement(W.a,null,Object.entries(this.state.skuCountList).map((function(e){return r.a.createElement(M.a,{key:e[0]},r.a.createElement(B.a,null,e[0]),r.a.createElement(B.a,null,e[1]))}))))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(b,{title:"Inventory Control"}),r.a.createElement("div",{className:"container"},r.a.createElement("div",{style:{display:"flex",alignSelf:"end"}},r.a.createElement(R.a,{control:r.a.createElement(A.a,{onChange:this.handleSwitchToggle,checked:this.state.scannerMode}),label:"Scanner Mode"})),r.a.createElement(k.a,{id:"outlined-name",label:"CSKU ID",margin:"normal",variant:"outlined",autoFocus:!0,inputRef:this.textField,value:this.state.currentSku,onChange:this.handleSkuIdChange}),r.a.createElement("div",{style:{display:"flex-vertical",flexGrow:2}},r.a.createElement(g.a,{style:{width:"100%",marginBottom:10},variant:"contained",color:"secondary",disabled:this.isScanDisabled(),onClick:this.handleSkuSave},"Scan"),r.a.createElement(g.a,{style:{width:"100%",marginBottom:10},variant:"contained",color:"secondary",onClick:this.resetState},"Start Again"),r.a.createElement(P,null),r.a.createElement(S.b,{to:"/start",style:{textDecoration:"none"}},r.a.createElement(g.a,{style:{width:"100%"},variant:"contained",color:"secondary"},"Return"))),r.a.createElement("div",null,this.getSkuTable())))}}]),t}(a.Component);n(85);var H=function(){return r.a.createElement(S.a,{basename:"/inventory-control"},r.a.createElement("div",null,r.a.createElement(w.b,{exact:!0,path:"/"},r.a.createElement(j,null)),r.a.createElement(w.b,{exact:!0,path:"/start"},r.a.createElement(L,null)),r.a.createElement(w.b,{exact:!0,path:"/scan"},r.a.createElement(z,null))))},J=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function _(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var X=n(48),$={fixtureId:null,startTime:null,skuList:[]};var q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,t=arguments.length>1?arguments[1]:void 0;return t.type===E?Object.assign({},e,{skuList:e.skuList.concat(t.payload).skuId}):t.type===p?Object.assign({},e,{fixtureId:t.payload.fixtureId}):e},Q=Object(X.b)(q);o.a.render(r.a.createElement(y.a,{store:Q},r.a.createElement(H,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/inventory-control",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/inventory-control","/service-worker.js");J?(!function(e,t){fetch(e).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):_(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):_(t,e)}))}}()}},[[73,1,2]]]);
//# sourceMappingURL=main.d6365d4a.chunk.js.map