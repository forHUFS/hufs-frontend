(this["webpackJsonphufs-frontend"]=this["webpackJsonphufs-frontend"]||[]).push([[18],{205:function(t,e,c){"use strict";var a=c(206),n=c(40),i=c(1),s=c(32),r=c(7);e.a=function(t,e){e.match;var c=Object(n.b)(),j=Object(n.c)((function(t){var e=t.item,c=t.loading;return{items:e.items,isLoading:c[s.b]}})),l=j.items,d=j.isLoading;return Object(i.useEffect)((function(){c(Object(s.e)())}),[c]),Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(a.a,{items:l,isLoading:d,match:t.match,props:t})})}},206:function(t,e,c){"use strict";c.d(e,"a",(function(){return d}));var a=c(8),n=c(440),i=c(259),s=c(437),r=c(129),j=c(7),l=(n.a.Text,n.a.Title);function d(t){var e=t.items,c=t.isLoading,n=t.match,d=t.props;d.match.params;e=[{id:1,title:"\uc548\ub155",score:2},{id:2,title:"\ud558\uc138\uc694",score:3}];var o=Object(a.f)(),b=e.map((function(t){return{id:t.id,title:t.title,score:t.score}}));return Object(j.jsxs)("div",{style:{width:"800px",margin:"0 auto",paddingTop:"150px"},children:[c&&"\ub85c\ub529\uc911...",!c&&e&&Object(j.jsxs)(j.Fragment,{children:[!e.length&&Object(j.jsx)(i.a,{}),!!e.length&&Object(j.jsx)(s.a,{columns:[{title:"index",dataIndex:"id"},{title:"\uc81c\ubaa9",dataIndex:"title"},{title:"\ud3c9\uc810",dataIndex:"score"}],dataSource:b,bordered:!0,title:function(){return Object(j.jsx)(l,{level:2,children:"\ub9ac\ubdf0 \ubaa9\ub85d"})}})]}),Object(j.jsx)(r.a,{onClick:function(){return o.push({pathname:"".concat(n.path,"/register"),state:{id:d.location.state.id}})},children:"Write Review"})]})}},207:function(t,e,c){"use strict";var a=c(208),n=c(27),i=c.n(n),s=c(8),r=c(7);e.a=Object(s.h)((function(t){var e=t.history,c=t.match,n=Object(s.g)();return Object(r.jsx)(a.a,{onRegister:function(t){var a=t.title,s=t.score,r=t.content,j=t.file,l={title:a,score:s,content:r},d=new FormData;d.append("file",j),d.append("item",JSON.stringify(l)),i.a.post("http://52.78.2.40:8080/store/".concat(n.state.id,"/review"),d,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){alert("\ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4."),e.push("".concat(c.path,"/read")+t.data.id)})).catch((function(t){alert(t)}))},match:c})}))},208:function(t,e,c){"use strict";c.d(e,"a",(function(){return o}));var a=c(107),n=c(8),i=c(1),s=c(463),r=c(444),j=c(129),l=c(7),d=s.a.TextArea;function o(t){var e=t.onRegister,c=(t.match,Object(i.useState)("")),o=Object(a.a)(c,2),b=o[0],u=o[1],O=Object(i.useState)(0),h=Object(a.a)(O,2),x=h[0],m=h[1],f=Object(i.useState)(""),p=Object(a.a)(f,2),v=p[0],g=p[1],y=Object(i.useState)(null),w=Object(a.a)(y,2),N=w[0],k=w[1],C=Object(n.f)(),S=Object(i.useCallback)((function(t){u(t.target.value)}),[]),L=Object(i.useCallback)((function(t){g(t.target.value)}),[]),T=Object(i.useCallback)((function(t){k(t.target.files[0])}),[]),R=Object(i.useCallback)((function(t){t.preventDefault(),e({title:b,score:x,content:v,file:N})}),[e,b,x,v,N]);return Object(l.jsx)("div",{style:{maxWidth:"700px",margin:"2rem auto"},children:Object(l.jsxs)("form",{onSubmit:R,children:[Object(l.jsx)("br",{}),Object(l.jsxs)("div",{style:{maxWidth:"700px",margin:"2rem"},children:[Object(l.jsx)("label",{children:"\uc81c\ubaa9 "}),Object(l.jsx)(s.a,{type:"text",value:b,onChange:S}),Object(l.jsx)("hr",{}),Object(l.jsx)("label",{children:"\ud3c9\uc810 "}),Object(l.jsx)(r.a,{allowHalf:!0,value:x,onChange:function(t){m(t)}}),Object(l.jsx)("hr",{}),Object(l.jsx)("label",{children:"\uc0ac\uc9c4"}),Object(l.jsx)(s.a,{type:"file",onChange:T}),Object(l.jsx)("hr",{}),Object(l.jsx)("label",{children:"\ud6c4\uae30"}),Object(l.jsx)(d,{rows:"5",value:v,onChange:L})]}),Object(l.jsxs)("div",{children:[Object(l.jsx)("button",{type:"submit",children:"\ub4f1\ub85d"}),"\xa0",Object(l.jsx)(j.a,{onClick:function(){return C.goBack()},children:"\ucde8\uc18c"}),"\xa0"]})]})})}},212:function(t,e,c){"use strict";var a=c(107),n=c(8),i=c(444),s=c(1),r=c(7);function j(t){var e=t.item,c=t.isLoading,j=t.onModify,l=(t.match,Object(n.f)()),d=Object(s.useState)(""),o=Object(a.a)(d,2),b=o[0],u=o[1],O=Object(s.useState)(0),h=Object(a.a)(O,2),x=h[0],m=h[1],f=Object(s.useState)(""),p=Object(a.a)(f,2),v=p[0],g=p[1],y=Object(s.useState)(null),w=Object(a.a)(y,2),N=w[0],k=w[1];Object(s.useEffect)((function(){e&&(u(e.title),m(e.score),g(e.content))}),[e]);var C,S=Object(s.useCallback)((function(t){g(t.target.value)}),[]),L=Object(s.useCallback)((function(t){k(t.target.files[0])}),[]);return Object(r.jsxs)("div",{align:"center",children:[Object(r.jsx)("h2",{children:"\uc218\uc815"}),c&&"\ub85c\ub529\uc911...",!c&&e&&Object(r.jsxs)("form",{onSubmit:function(t){t.preventDefault(),j(b,x,v,N)},children:[Object(r.jsx)("table",{children:Object(r.jsxs)("tbody",{children:[Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{className:"form-label",children:"\ubc88\ud638"}),Object(r.jsx)("td",{children:Object(r.jsx)("input",{type:"text",value:e.id,disabled:!0})})]}),Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{className:"form-label",children:"\uc74c\uc2dd\uc774\ub984"}),Object(r.jsx)("td",{children:Object(r.jsx)("input",{type:"text",value:b,onChange:function(t){u(t.target.value)}})})]}),Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{className:"form-label",children:"\uc74c\uc2dd \ud3c9\uc810"}),Object(r.jsx)("td",{children:Object(r.jsx)(i.a,{allowHalf:!0,value:x,onChange:function(t){m(t.target.value)}})})]}),Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{className:"form-label",children:"\uc74c\uc2dd\ud30c\uc77c"}),Object(r.jsx)("td",{children:Object(r.jsx)("input",{type:"file",onChange:L})})]}),Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{className:"form-label",children:"\ubbf8\ub9ac\ubcf4\uae30"}),Object(r.jsx)("td",{children:Object(r.jsx)("img",{src:(C=e.id,"/items/display?id=".concat(C,"&timestamp=").concat((new Date).getTime())),alt:"",width:"200",className:"img-preview"})})]}),Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{className:"form-label",children:"\uc74c\uc2dd\uc124\uba85"}),Object(r.jsx)("td",{children:Object(r.jsx)("textarea",{rows:"5",value:v,onChange:S})})]})]})}),Object(r.jsxs)("div",{children:[Object(r.jsx)("button",{type:"submit",className:"like-a-button",children:"\uc218\uc815"}),"\xa0",Object(r.jsx)("button",{onClick:function(){return l.goBack()},children:"\ucde8\uc18c"}),"\xa0"]})]})]})}var l=c(40),d=c(32),o=c(27),b=c.n(o);e.a=Object(n.h)((function(t){var e=t.match,c=t.history,a=Object(l.b)(),n=Object(l.c)((function(t){var e=t.item,c=t.loading;return{item:e.item,isLoading:c[d.a]}})),i=n.item,o=n.isLoading,u=e.params.id;return Object(s.useEffect)((function(){a(Object(d.d)(u))}),[a,u]),Object(r.jsx)(j,{item:i,isLoading:o,onModify:function(t,a,n,i){var s={id:u,title:t,score:a,content:n},r=new FormData;r.append("file",i),r.append("item",JSON.stringify(s)),b.a.put("http://52.78.2.40:8080/store/review/".concat(u),r,{headers:{"Content-type":"multipart/form-data"}}).then((function(t){alert("\uc218\uc815\ub418\uc5c8\uc2b5\ub2c8\ub2e4."),c.push("".concat(e.url,"/").concat(u))})).catch((function(t){alert(t.response.data.msg)}))},match:e})}))},213:function(t,e,c){"use strict";var a=c(17),n=c.n(a),i=c(111),s=c(1),r=c(40),j=c(39),l=c(7);function d(t){var e=t.id,c=t.item,a=t.isLoading,n=t.onRemove,i=t.match;return Object(l.jsxs)("div",{align:"center",children:[Object(l.jsx)("h2",{className:"title",children:"\uc74c\uc2dd \uc0c1\uc138\ubcf4\uae30"}),a&&"\ub85c\ub529\uc911....",!a&&c&&Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("table",{children:Object(l.jsxs)("tbody",{children:[Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{className:"form-label",children:"\uc74c\uc2dd\ubc88\ud638"}),Object(l.jsx)("td",{children:Object(l.jsx)("input",{type:"text",value:c.id,readOnly:!0})})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{className:"form-label",children:"\uc74c\uc2dd\uba85"}),Object(l.jsx)("td",{children:Object(l.jsx)("input",{type:"text",value:c.title,readOnly:!0})})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{className:"form-label",children:"\uc74c\uc2dd \ud3c9\uc810"}),Object(l.jsx)("td",{children:Object(l.jsx)("input",{type:"text",value:c.score,readOnly:!0})})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{className:"form-label",children:"\ubbf8\ub9ac\ubcf4\uae30"}),Object(l.jsx)("td",{children:Object(l.jsx)("img",{src:"/items/display?id=".concat(e,"&timestamp=").concat((new Date).getTime()),alt:"\uc74c\uc2dd \uc774\ubbf8\uc9c0",width:"200",className:"img-preview"})})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{className:"form-label",children:"\uc74c\uc2dd \uc124\uba85"}),Object(l.jsx)("td",{children:Object(l.jsx)("textarea",{value:c.content,readOnly:!0})})]})]})})}),Object(l.jsx)(j.b,{to:"".concat(i.path,"/edit/").concat(e),className:"like-a-button",children:"\ud3b8\uc9d1"}),"\xa0",Object(l.jsx)("button",{onClick:n,className:"like-a-button danger",children:"\uc0ad\uc81c"}),"\xa0",Object(l.jsx)(j.b,{to:"".concat(i.path),className:"like-a-button",children:"\ubaa9\ub85d"})]})}var o=c(32),b=c(8),u=c(35);e.a=Object(b.h)((function(t){var e=t.match,c=t.history,a=e.params.id,j=Object(r.b)(),b=Object(r.c)((function(t){var e=t.item,c=t.loading;return{item:e.item,isLoading:c[o.a]}})),O=b.item,h=b.isLoading,x=function(){var t=Object(i.a)(n.a.mark((function t(){return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(u.c)(a);case 3:alert("\uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4."),c.push("".concat(e.url,"/ReviewPage")),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}();return Object(s.useEffect)((function(){j(Object(o.d)(a))}),[j,a]),Object(l.jsx)(d,{id:a,item:O,isLoading:h,onRemove:x})}))},257:function(t,e,c){"use strict";c.r(e);var a=c(39),n=c(8),i=c(205),s=c(207),r=c(212),j=c(213),l=c(7);e.default=function(t){return Object(l.jsx)(a.a,{children:Object(l.jsxs)("div",{className:"main-bg-wrapper",children:[Object(l.jsx)("div",{className:"main-bg"}),Object(l.jsxs)("div",{className:"main-container",children:[Object(l.jsxs)(n.c,{children:[Object(l.jsx)(n.a,{component:i.a,path:"".concat(t.match.url),exact:!0}),Object(l.jsx)(n.a,{component:s.a,path:"".concat(t.match.url,"/register"),exact:!0}),Object(l.jsx)(n.a,{component:r.a,path:"".concat(t.match.url,"/edit/:id"),exact:!0}),Object(l.jsx)(n.a,{component:j.a,path:"".concat(t.match.url,"/read/:id"),exact:!0})]})," "]})]})})}},451:function(t,e,c){"use strict";c.r(e);var a=c(107),n=c(1),i=c(8),s=c(440),r=c(260),j=c(303),l=c(129),d=c.p+"static/media/icon1.e5f37642.png",o=c.p+"static/media/icon2.2dff31df.png",b=(c(436),c(257),c(208),c(206),c(205),c(207),c(212),c(213),c(7)),u=(s.a.Text,s.a.Title);e.default=function(t){var e=t.match,c=t.history,s=(t.props,Object(n.useState)(0)),O=(s.value,s.setVlue,Object(n.useState)("")),h=Object(a.a)(O,2),x=(h[0],h[1],Object(i.g)()),m=[{title:"\uc9c0\ubc88\uc8fc\uc18c",description:x.state.numAddress,img:d},{title:"\ub3c4\ub85c\uba85\uc8fc\uc18c",description:x.state.roadAddress,img:o}];return Object(b.jsxs)("div",{style:{width:"400px",margin:"0 auto",paddingTop:"150px"},children:[Object(b.jsx)("div",{children:Object(b.jsx)(u,{level:3,children:x.state.name})}),Object(b.jsx)("div",{children:Object(b.jsx)(r.b,{itemLayout:"horizontal",dataSource:m,renderItem:function(t){return Object(b.jsx)(r.b.Item,{children:Object(b.jsx)(r.b.Item.Meta,{avatar:Object(b.jsx)(j.a,{src:t.img}),title:t.title,description:t.description})})}})}),Object(b.jsx)("div",{children:Object(b.jsx)(l.a,{onClick:function(t){c.push({pathname:"".concat(e.url,"/ReviewPage"),state:{id:e.params.id}})},children:"\ub9ac\ubdf0 \ubcf4\ub7ec\uac00\uae30"})}),Object(b.jsx)("div",{})]})}}}]);
//# sourceMappingURL=18.ebf8bbdd.chunk.js.map