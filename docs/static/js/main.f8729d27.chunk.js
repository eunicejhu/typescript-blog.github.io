(this.webpackJsonpdemo=this.webpackJsonpdemo||[]).push([[0],{52:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);var r=n(13),c=n(1),a=n(0),s=n.n(a),o=n(22),i=n.n(o),u=n(6),d=n(16),j=n(58),l=n(27),b=Object(l.a)(),f="dark",O=s.a.createContext({theme:f,setTheme:function(){}});O.displayName="ThemeContext";var p=O,h=n(10),x=n(4),v=n.n(x),m=n(12),y=n(18),g=n(34),w=n(35),P=n(59),k=n(56),N="2020-11-15T16:16:08.493Z",S={posts:{status:"idle",error:void 0,updatePostError:void 0,data:[{id:"1",title:"First test Post!",content:"test!",userId:"1",date:Object(P.a)(Object(k.a)(N),{days:1}).toISOString(),reactions:{thumbsUp:0,hooray:0,heart:4,rocket:0,eyes:0}},{id:"2",title:"Second test Post",content:"test",userId:"0",date:Object(P.a)(Object(k.a)(N),{days:5}).toISOString(),reactions:{thumbsUp:3,hooray:0,heart:0,rocket:0,eyes:0}}]},users:{data:[{id:"0",name:"Tianna Jenkins"},{id:"1",name:"Kevin Grant"},{id:"2",name:"Madison Price"}],status:"succeeded",error:null}},I=function(){function e(){Object(g.a)(this,e)}return Object(w.a)(e,null,[{key:"fetchPost",value:function(){var e=Object(m.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new Promise((function(e){setTimeout((function(){return e({data:S.posts.data})}),1e3)})),e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"addNewPost",value:function(){var e=Object(m.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Promise((function(e,n){setTimeout((function(){return e({data:Object(y.a)(Object(y.a)({},t),{},{id:Object(h.d)(),date:(new Date).toISOString(),reactions:{thumbsUp:0,hooray:0,heart:0,rocket:0,eyes:0}})})}),1e3)})),e.abrupt("return",n);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"updatePost",value:function(){var e=Object(m.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Promise((function(e){setTimeout((function(){return e({data:t})}),1e3)})),e.abrupt("return",n);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"addReaction",value:function(){var e=Object(m.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Promise((function(e){return e({data:t})})),e.abrupt("return",n);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),C=Object(h.b)("posts/fetchPosts",Object(m.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.fetchPost();case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})))),T=Object(h.b)("posts/addNewPost",function(){var e=Object(m.a)(v.a.mark((function e(t){var n,r,c,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.title,r=t.content,c=t.userId,e.next=3,I.addNewPost({title:n,content:r,userId:c});case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),E=Object(h.b)("posts/updatePost",function(){var e=Object(m.a)(v.a.mark((function e(t){var n,r,c,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,r=t.title,c=t.content,e.next=3,I.updatePost({id:n,title:r,content:c});case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),F=Object(h.b)("posts/addReaction",function(){var e=Object(m.a)(v.a.mark((function e(t){var n,r,c;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.postId,r=t.reaction,e.next=3,I.addReaction({postId:n,reaction:r});case 3:return c=e.sent,e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),R={data:[],status:"idle",error:void 0,updatePostError:void 0},U=Object(h.c)({name:"posts",initialState:R,reducers:{},extraReducers:function(e){e.addCase(C.pending,(function(e){e.status="loading"})),e.addCase(C.fulfilled,(function(e,t){e.data=t.payload.data,e.status="succeeded",e.error=void 0})),e.addCase(C.rejected,(function(e,t){var n="".concat(t.type,": Error from REST API (action.error.message)");console.error(n),e.error="Failed to fetch posts",e.status="failed",e.data=[]})),e.addCase(T.fulfilled,(function(e,t){e.data.push(t.payload.data)})),e.addCase(E.fulfilled,(function(e,t){var n=t.payload.data,r=n.id,c=n.title,a=n.content,s=e.data.find((function(e){return e.id===r}));if(s)s.title=c,s.content=a;else{var o="".concat(t.type,": Error from client: existingPost not found for data from server ").concat(JSON.stringify(t.payload.data));console.error(o);e.updatePostError="Failed to update post"}})),e.addCase(E.rejected,(function(e,t){var n="".concat(t.type,": Error from REST API (action.error.message)");console.error(n);e.updatePostError="Failed to update post"})),e.addCase(F.fulfilled,(function(e,t){var n=e.data.find((function(e){return e.id===t.payload.data.postId}));if(n){var r=t.payload.data.reaction;n.reactions[r]+=1}else{var c="".concat(t.type,": Error from client: existingPost not found for data from server ").concat(JSON.stringify(t.payload.data));console.error(c)}})),e.addCase(F.rejected,(function(e,t){var n="".concat(t.type,": Error from REST API (action.error.message)");console.error(n)}))}}).reducer,A=n(23),B=Object(h.b)("users/fetchUsers",Object(m.a)(v.a.mark((function e(){var t,n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Promise((function(e){setTimeout((function(){return e(S.users.data)}),1e3)})),e.next=3,n;case 3:return t=e.sent,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})))),J=Object(h.c)({name:"users",initialState:{data:[],status:"idle",error:null},reducers:{},extraReducers:Object(A.a)({},B.fulfilled,(function(e,t){e.data=t.payload}))}).reducer,D=Object(h.a)({reducer:{posts:U,users:J}}),H=function(e){return e.posts.data},Z=function(e,t){return e.posts.data.find((function(e){return e.id===t}))},G=D,K=function(){return Object(c.jsx)("nav",{children:Object(c.jsx)("li",{children:Object(c.jsx)(d.b,{to:"/",children:"Home"})})})},M=n(7),Q=function(e){var t=e.userId,n=Object(u.c)((function(e){return e.users.data.find((function(e){return e.id===t}))}));return Object(c.jsxs)("span",{className:"post-author",children:["By ",n?n.name:"Unknown author"]})},q=n(57),z=function(e){return Boolean(e)?Object(q.a)(Object(k.a)(e)):""},L=function(e){var t=e.date,n=z(t);return Boolean(n)&&(n+=" ago"),Object(c.jsxs)("span",{className:"date",children:[" ",Object(c.jsx)("i",{children:n})," "]})},V={thumbsUp:"\ud83d\udc4d",hooray:"\ud83c\udf89",heart:"\u2764\ufe0f",rocket:"\ud83d\ude80",eyes:"\ud83d\udc40"},W=function(e){var t=e.post,n=t.reactions,a=t.id,s=Object(u.b)(),o=Object.entries(V).map((function(e){var t=Object(r.a)(e,2),o=t[0],i=t[1];return Object(c.jsxs)("button",{type:"button",name:o,onClick:function(){return s(F({postId:a,reaction:o}))},children:[i," ",n[o]]},o)}));return Object(c.jsx)("div",{className:"reactions-container",children:o})},X=function(){var e=Object(M.g)().params.id,t=Object(u.c)((function(t){return Z(t,e)}));return t?Object(c.jsx)("section",{className:"post",children:Object(c.jsxs)("article",{children:[Object(c.jsx)("h3",{children:t.title}),Object(c.jsx)("p",{children:t.content}),Object(c.jsx)(Q,{userId:t.userId}),Object(c.jsx)(L,{date:t.date}),Object(c.jsx)("p",{children:Object(c.jsx)(d.b,{to:"/editPost/".concat(e),children:"Edit"})}),Object(c.jsx)(W,{post:t})]})}):Object(c.jsx)("div",{children:"No post found"})},Y=function(){var e=Object(a.useState)(""),t=Object(r.a)(e,2),n=t[0],s=t[1],o=Object(a.useState)(""),i=Object(r.a)(o,2),d=i[0],j=i[1],l=Object(a.useState)(""),b=Object(r.a)(l,2),f=b[0],O=b[1],p=Object(a.useState)("idle"),x=Object(r.a)(p,2),y=x[0],g=x[1],w=Object(a.useState)(void 0),P=Object(r.a)(w,2),k=P[0],N=P[1],S=Object(u.b)(),I=Object(u.c)((function(e){return e.users.data})),C=I&&I.map((function(e){return Object(c.jsx)("option",{value:e.id,children:e.name},e.id)})),E=[n,d,f].every(Boolean)&&"idle"===y,F=function(){var e=Object(m.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!E){e.next=20;break}return e.prev=1,g("pending"),e.next=5,S(T({title:n,content:d,userId:f}));case 5:t=e.sent,Object(h.e)(t),s(""),j(""),O(""),e.next=17;break;case 12:e.prev=12,e.t0=e.catch(1),N(e.t0.message),setTimeout((function(){N(void 0)}),1e3),console.error("Failed to save the post: ",e.t0.message);case 17:return e.prev=17,g("idle"),e.finish(17);case 20:case"end":return e.stop()}}),e,null,[[1,12,17,20]])})));return function(){return e.apply(this,arguments)}}();return Object(c.jsx)("div",{className:"add-post",children:Object(c.jsxs)("form",{children:[Object(c.jsxs)("div",{className:"field",children:[Object(c.jsx)("label",{htmlFor:"title",children:"Title"}),Object(c.jsx)("input",{id:"title","data-testid":"title",name:"title",width:20,value:n,onChange:function(e){s(e.currentTarget.value)}})]}),Object(c.jsxs)("div",{className:"field",children:[Object(c.jsx)("label",{htmlFor:"content",children:"Content"}),Object(c.jsx)("textarea",{id:"content","data-testid":"content",name:"content",value:d,onChange:function(e){j(e.currentTarget.value)}})]}),Object(c.jsxs)("div",{className:"field",children:[Object(c.jsx)("label",{htmlFor:"users",children:"Author"}),Object(c.jsxs)("select",{"data-testid":"users",value:f,name:"users",id:"users",onChange:function(e){O(e.currentTarget.value)},children:[Object(c.jsx)("option",{value:""}),C]})]}),Object(c.jsxs)("div",{className:"field",children:[Object(c.jsx)("button",{type:"button",onClick:F,disabled:!E,children:"Add Post"})," ",Object(c.jsx)("span",{children:k})]})]})})},$=function(){var e,t=Object(M.g)().path,n=Object(u.b)(),r=Object(u.c)((function(e){return e.posts.status})),s=Object(u.c)((function(e){return e.posts.error}));Object(a.useEffect)((function(){"idle"===r&&n(C())}),[n,r]);var o=Object(u.c)(H),i=o.slice().sort((function(e,t){return t.date.localeCompare(e.date)})).map((function(e){return Object(c.jsxs)("article",{className:"post-excerpt",children:[Object(c.jsx)("h3",{children:e.title}),Object(c.jsx)("p",{className:"post-content",children:e.content.substring(0,100)}),Object(c.jsx)(Q,{userId:e.userId}),Object(c.jsx)(L,{date:e.date}),Object(c.jsx)("p",{children:Object(c.jsx)(d.b,{to:"".concat(t,"posts/").concat(e.id),children:"See more"})}),Object(c.jsx)(W,{post:e})]},e.id)}));return"loading"===r?e=Object(c.jsx)("div",{children:"loading..."}):"succeeded"===r?e=o.length?i:Object(c.jsx)("div",{children:"No post"}):s&&(e=Object(c.jsx)("div",{children:s})),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("section",{className:"add-post-form",children:Object(c.jsx)(Y,{})}),Object(c.jsxs)("section",{className:"posts-list",children:[Object(c.jsx)("h2",{children:"Posts"}),e]})]})},_=function(){var e=Object(M.g)().params.id,t=Object(u.c)((function(t){return Z(t,e)})),n=Object(a.useState)(null===t||void 0===t?void 0:t.title),s=Object(r.a)(n,2),o=s[0],i=s[1],d=Object(a.useState)(null===t||void 0===t?void 0:t.content),j=Object(r.a)(d,2),l=j[0],b=j[1],f=Object(u.b)(),O=Object(M.f)();return t?Object(c.jsxs)("form",{children:[Object(c.jsx)("h2",{children:"Edit Post"}),Object(c.jsxs)("div",{className:"field",children:[Object(c.jsx)("label",{htmlFor:"title",children:"Title"}),Object(c.jsx)("input",{id:"title",name:"title",type:"text",value:o,onChange:function(e){i(e.currentTarget.value)}})]}),Object(c.jsxs)("div",{className:"field",children:[Object(c.jsx)("label",{htmlFor:"content",children:"Content"}),Object(c.jsx)("textarea",{name:"content",id:"content",cols:30,rows:10,value:l,onChange:function(e){b(e.currentTarget.value)}})]}),Object(c.jsx)("div",{className:"field",children:Object(c.jsx)("button",{value:"Submit",onClick:function(e){e.preventDefault(),l&&o&&(f(E(Object(y.a)(Object(y.a)({},t),{},{title:o,content:l}))),O.push("/"))},children:"Submit"})})]}):Object(c.jsx)("div",{children:"No post found"})},ee=function(){return Object(c.jsx)(c.Fragment,{children:"No match"})},te=function(){return Object(c.jsxs)(M.c,{children:[Object(c.jsx)(M.a,{exact:!0,path:"/",children:Object(c.jsx)($,{})}),Object(c.jsx)(M.a,{exact:!0,path:"/posts/:id",children:Object(c.jsx)(X,{})}),Object(c.jsx)(M.a,{exact:!0,path:"/editPost/:id",children:Object(c.jsx)(_,{})}),Object(c.jsx)(M.a,{children:Object(c.jsx)(ee,{})})]})},ne=(n(52),function(){var e=Object(u.b)();return Object(a.useEffect)((function(){e(B())}),[e]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("header",{children:Object(c.jsx)(K,{})}),Object(c.jsx)("main",{children:Object(c.jsx)(te,{})}),Object(c.jsx)("footer",{children:"copyright@2020 author ZUOQIN HU"})]})}),re=(n(53),function(){var e=Object(a.useState)(f),t=Object(r.a)(e,2),n=t[0],s=t[1];return Object(c.jsx)(u.a,{store:G,children:Object(c.jsx)(p.Provider,{value:{theme:n,setTheme:s},children:Object(c.jsx)(j.a,{children:Object(c.jsx)(d.a,{history:b,children:Object(c.jsx)(ne,{})})})})})});i.a.render(Object(c.jsx)(re,{}),document.getElementById("root"))}},[[54,1,2]]]);
//# sourceMappingURL=main.f8729d27.chunk.js.map