(self.webpackChunksocial_network=self.webpackChunksocial_network||[]).push([[634],{4634:function(e,s,n){"use strict";n.r(s),n.d(s,{default:function(){return se}});var t=n(8683),r=n(2791),a=n(6871),o=n(8687),i=n(885),c=n(3483),u=n(6853),l=n(1363),d=n(3174),f=n(184),g=function(e){var s=e.searchMode,n=e.setSearchMode;return(0,f.jsxs)("div",{className:"sidebarHeader",children:[s&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("span",{className:"text opacity-animation",children:"Find people"}),(0,f.jsx)(l.G,{className:"opacity-animation",onClick:function(){return n(!1)},icon:d.g82})]}),!s&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("span",{className:"text opacity-animation",children:"Messages"}),(0,f.jsx)(l.G,{className:"opacity-animation",onClick:function(){return n(!0)},icon:d.g6h})]})]})},m=n(5078),p=n(1544),h=n(2519),v=function(e){var s=e.filterDialogs,n=e.setDialogs,t=Number((0,a.UO)().userId);return(0,f.jsxs)("div",{className:"search-users pointer",children:[(0,f.jsx)(l.G,{icon:d.wn1}),(0,f.jsx)(m.l0,{onSubmit:function(e){s(e.searchBody)},render:function(e){var s=e.handleSubmit,r=e.form;return(0,f.jsx)("form",{onSubmit:s,children:(0,f.jsx)(m.gN,{name:"searchBody",autoFocus:!0,validate:p.C1,onKeyUp:function(e){return function(e,s){(0,h.j)(e,s,n,t),s.submit()}(e,r)},component:"input",placeholder:"Find dialog by name",className:"search-users__input"})})}})]})},x=n(2032),S=(0,o.$j)((function(e){return{}}),{filterDialogs:u.J_,setDialogs:u.ow})((function(e){var s=e.filterDialogs,n=e.setDialogs,t=(0,r.useState)(!1),a=(0,i.Z)(t,2),o=a[0],u=a[1];return(0,f.jsxs)("ul",{className:"peoples",children:[(0,f.jsx)(g,{searchMode:o,setSearchMode:u}),(0,f.jsx)("div",{className:o?"shown":"hidden",children:(0,f.jsx)(c.Z,{setSearchMode:u,startDialogOnClick:!0})}),(0,f.jsxs)("div",{className:o?"hidden":"shown",children:[(0,f.jsx)(v,{setDialogs:n,filterDialogs:s}),(0,f.jsx)(x.Z,{className:"messages-page-dialogs"})]})]})})),A=n(8214),j=n(5861),E=function(e){return{type:"messages-reducer/SET_MORE_MESSAGES",messages:e}},b=function(e){return{type:"messages-reducer/SET_MESSAGES",messages:e}},y=function(e){return{type:"messages-reducer/SET_TOTAL_MESSAGES_COUNT",count:e}},N=function(e){return{type:"messages-reducer/UPDATE_MESSAGES",newMessages:e}},M=function(e){return{type:"messages-reducer/ADD_NEW_MESSAGE",newMessage:e}},T=function(e){return{type:"messages-reducer/SET_PAGE_NUMBER",pageNumber:e}},U=function(e){return{type:"messages-reducer/SET_IS_MESSAGES_LOADED",isLoaded:e}},Z=function(){return{type:"messages-reducer/CLEAR_MESSAGES_ERROR"}},w=function(e){return{type:"messages-reducer/SET_IS_MESSAGES_LOADING",isLoading:e}},C=function(e){return{type:"messages-reducer/SET_IS_MESSAGES_FETCHING",isFetching:e}},k=T,D=function(e){return{type:"messages-reducer/SET_DIALOG_USER_ID",userId:e}},O=U,F=n(3692),H=n(1468),I=n(1834),L=n(8997),G=function(e,s){return!e[0]||!s[0]||s[s.length-1].id===e[e.length-1].id},R=n(220);var Q=n.p+"static/media/send.2ec83b7d2370fbd448eddc161ecfe473.svg",B=function(e){var s=e.sendMessage;return(0,f.jsx)("div",{className:"message-text-container",children:(0,f.jsx)(m.l0,{onSubmit:s,render:function(e){var s=e.handleSubmit,n=e.submitting,t=e.pristine,r=e.form;return(0,f.jsxs)("form",{className:"add-message-form",onSubmit:s,children:[(0,f.jsx)(m.gN,{onKeyDown:function(e){return function(e,s){"Enter"===e.key&&(e.preventDefault(),s.submit(),s.reset())}(e,r)},name:"body",component:"textarea",placeholder:"Text a message"}),(0,f.jsx)("button",{disabled:n||t,onClick:function(){return function(e){e.submit(),e.reset()}(r)},children:(0,f.jsx)("img",{src:Q,alt:""})})]})}})})},_=n(6083),q=n(3504),P=(0,o.$j)((function(e){return{conversationHead:e.dialogsPage.conversationHead}}),{})((function(e){var s=e.conversationHead,n=s.photo?s.photo:_;return(0,f.jsxs)(q.OL,{replace:!0,to:"/profile/".concat(s.id),className:"conversation-head",children:[(0,f.jsx)("figure",{children:(0,f.jsx)("img",{src:n,alt:""})}),(0,f.jsx)("span",{children:s.userName})]})})),K=n(5095),W=n.n(K),V=function(e){if(!e)return!1;var s=e.scrollHeight-e.offsetHeight-32;return e.scrollTop+70<s},J=function(e,s,n,t){(0,r.useEffect)((function(){!function(e){e&&(V(e)||(e.scrollTop=e.scrollHeight))}(s)}),[e]),(0,r.useEffect)((function(){t.isLoading||n.current||(s&&(s.scrollTop=s.scrollHeight),n.current=!0)}),[t.isLoading]),(0,r.useEffect)((function(){var e=!t.isFetching&&!t.allMessagesIsLoaded;s&&e&&(s.scrollTop=1100)}),[t.isFetching])},z=n(2195),Y=n.n(z),X=function(e){var s=e.messages,n=e.sendNewMessage,t=e.status,o=e.loadMoreMessages,c=Number((0,a.UO)().userId),u=(0,r.useState)(null),l=(0,i.Z)(u,2),d=l[0],g=l[1],m=(0,r.useRef)(!1);J(s,d,m,t);var p=function(e,s,n){var t=(0,r.useState)(!1),a=(0,i.Z)(t,2),o=a[0],c=a[1],u=(0,r.useCallback)(W()(e,500),[]);return{handleScrollClick:function(){s&&(s.scrollTop=s.scrollHeight)},handleScroll:function(){V(s)?!o&&c(!0):o&&c(!1),s&&s.scrollTop<30&&n&&u()},showScrollButton:o}}(o,d,m),h=p.handleScrollClick,v=p.handleScroll,x=p.showScrollButton;return(0,f.jsxs)("div",{className:"peoples-mesg-box",children:[c&&(0,f.jsxs)("div",{className:"chatArea opacity-animation",children:[(0,f.jsx)(P,{}),(0,f.jsxs)(Y(),{className:"chatting-area",component:"ul",containerRef:function(e){return g(e)},onScroll:v,children:[(0,f.jsx)(R.Z,{isFetching:t.isFetching,size:"small"}),t.isLoading&&(0,f.jsx)(R.Z,{}),s[0]?!t.isLoading&&s:!t.isLoading&&(0,f.jsx)("div",{className:"preloader",children:"You've got no messages yet."})]}),x&&(0,f.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAO8SURBVFhH7ZlLaBNRFIY7kzRJ0yRto5FuFMQWBZcqKFaQUq21FoQq4mPhA0QX4rJuRNduBHc+qAiKUFHUUh8VEZcuWgQVUSuKCwVj0iapTdO8/M7kVtT0kSbTOoV+kOTce2bu/efcd0Yr+wNd15e43e4TTqdzh91ur9c0rVK55oRsNvszlUq9TyQSPSMjIxcymUxQucp+C3W5XLuqqqo6EedVWf8VREcjkcih0dHRO5K2yZeIrK6u7kKkU9JWQLSgazcRfs3nrSbNHQgEBqwSyX8hspFgMFhvq6ysPEWf3KLyLQcBdCE2rhPeNpVnWQhkm26z2VaotGVhBqrTCa1HpS2LjB9d2ZZnQajZLAg1m/kvNBQKbeSzlh3MV5U1a0gd1LUmHA5vUll5TBXRsWQy2SeC0+n0B5VnOlK21EFd/SyVCZWdx6RC2U31OhwOEfmZgjZQ0AvlMo2xsbF+ym6QOsrLy9dR5wPlymNSoSytNSKWdXYbTROiWZoo+Ilylwyb4+eDg4ONlP2dgDT6/f6n1LlYufOYcjCxBXSzmb7HxmUPzTJMwW1sZG8pd9Eg8v7Q0FCLbOEoeycB6ZlumzmlUAGxDgq6yRHlpPQhKtjLMeGScs8Y7r3GA7fL1o0yj1H2bepwKfek2Dwez1llT4UmXYCnrpDmlzONZNJkmw1vgcg5KBqNHsfMsA/u8Pl857GnDZZQqFADhDXw9IsQ+hjBz+hfYR6gGddfh8QJyMZisY7h4eHT2JrX6z1HvWfENrwFoNXW1maVXTDxePw6B6/DmMmKior99OOr2OWGM5801x7lnk5sG9de5J4jOVfhFCVUIKrd9FcZZHGi2oqALhl8ym1AxBM09T45SdJtnFxzg8HTrtwzoqD+MRFyPGAgPESAT/qsTDXMhyHlFpE8x1CTEumpqanpLlakUHREx6Gv9iFou8yHHBlWI/4RkbUjvIVF4iW2H5E9TOjr1S1FUbJQAUHvELuViH5h0l4uedifsJchvBeRK40LS8AUoQIR/cbq1ZxKpV5JmuiuEpH8LjUuKBHThApEMUxkWzGT0n+JaCDnKR1ThQrMAjH5nW5JnClFj/rJEIFmixRMFzpbLAg1m/kjdHyUWhk0RnUm6I8qbVlY+QZ02QWptGVhP9Etf40H1F/jPpVvKWh2+Wu8TmeNDsrbB/IyOZelyKDtIBp/GG9F5K2DvH1Q56JpD1pzgUQS9rOfvStpQ6ggYjkuXOGCUZJeuoQshY6cd26QGYiB8wYdlxF5ALs/5ykr+wUuwtPz9MCTQwAAAABJRU5ErkJggg==",alt:"",className:"scroll-bottom opacity-animation",onClick:h}),(0,f.jsx)(B,{sendMessage:function(e){return n(e)}})]}),!c&&(0,f.jsx)("div",{className:"fetch-error",children:"Choose friend to start chat"})]})},$=n(4025),ee=(0,o.$j)((function(e){return{messages:(0,$.xq)(e),totalMessagesCount:(0,$.bp)(e),pageNumber:(0,$.p6)(e),status:(0,$.RL)(e)}}),{sendNewMessage:function(e){return function(){var s=(0,j.Z)((0,A.Z)().mark((function s(n,t){var r,a,o;return(0,A.Z)().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return r=t().messagesPage.dialogUserId,s.prev=1,s.next=4,F.o.sendMessage(r,e);case 4:(a=s.sent).resultCode===H.Td.Success?(o=a.data.message,n(M(o))):n(I.xZ.addError(a.messages[0])),s.next=11;break;case 8:s.prev=8,s.t0=s.catch(1),n(I.xZ.addError("Can't send message"));case 11:case"end":return s.stop()}}),s,null,[[1,8]])})));return function(e,n){return s.apply(this,arguments)}}()},loadMessages:function(){return function(){var e=(0,j.Z)((0,A.Z)().mark((function e(s,n){var t,r,a;return(0,A.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(w(!0)),t=n().messagesPage.dialogUserId,s((function(e,s){var n=s().messagesPage.dialogUserId;e(T(1)),e(U(!1)),e(Z()),e(L.G.setConversationHead(n))})),e.prev=3,r=n().messagesPage.count,e.next=7,F.o.requireMessages(t,r,1);case 7:a=e.sent,s(b(a.items)),s(y(a.totalCount)),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),s(I.xZ.addError("Can't load messages"));case 15:s(w(!1));case 16:case"end":return e.stop()}}),e,null,[[3,12]])})));return function(s,n){return e.apply(this,arguments)}}()},fetchMessages:function(){return function(){var e=(0,j.Z)((0,A.Z)().mark((function e(s,n){var t,r,a,o,i,c;return(0,A.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=n().messagesPage,r=t.count,a=t.dialogUserId,e.next=4,F.o.requireMessages(a,r,1);case 4:o=e.sent,i=n().messagesPage,c=i.messages,i.messagesError&&s(Z()),!G(c,o.items)&&(s(N(o.items)),s(y(o.totalCount))),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),s(I.xZ.addError("Can't load messages"));case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(s,n){return e.apply(this,arguments)}}()},setIsAllMessagesLoaded:O,setPageNumber:k,loadMoreMessages:function(){return function(){var e=(0,j.Z)((0,A.Z)().mark((function e(s,n){var t,r,a,o,i,c,u,l,d,f,g;return(0,A.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n().messagesPage,r=t.dialogUserId,a=t.messages,o=t.pageNumber,i=t.status,e.next=3,F.o.requireLastMessage(r);case 3:if(c=e.sent,c.totalCount!==a.length){e.next=8;break}return i.allMessagesIsLoaded||s(U(!0)),e.abrupt("return");case 8:return s(C(!0)),i.allMessagesIsLoaded&&s(U(!1)),s(T(o+1)),e.prev=11,u=n().messagesPage,l=u.pageNumber,d=u.count,e.next=15,F.o.requireMessages(r,d,l);case 15:f=e.sent,s(E(f.items)),s(y(f.totalCount)),e.next=25;break;case 20:e.prev=20,e.t0=e.catch(11),g=n().messagesPage.pageNumber,s(T(g-1)),s(I.xZ.addError("Can't load messages"));case 25:s(C(!1));case 26:case"end":return e.stop()}}),e,null,[[11,20]])})));return function(s,n){return e.apply(this,arguments)}}()},setDialogUserId:D}),se=ee((function(e){var s=Number((0,a.UO)().userId);return(0,r.useEffect)((function(){s&&(e.setDialogUserId(s),e.loadMessages());var n=!!s&&setInterval((function(){return e.fetchMessages()}),1500);return function(){n&&clearInterval(n)}}),[s]),(0,f.jsx)("div",{className:"central-meta messages",children:(0,f.jsx)("div",{className:"messages",children:(0,f.jsxs)("div",{className:"message-box",children:[(0,f.jsx)(S,{}),(0,f.jsx)(X,(0,t.Z)({},e))]})})})}))},5095:function(e,s,n){var t=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,o=/^0o[0-7]+$/i,i=parseInt,c="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g,u="object"==typeof self&&self&&self.Object===Object&&self,l=c||u||Function("return this")(),d=Object.prototype.toString,f=Math.max,g=Math.min,m=function(){return l.Date.now()};function p(e){var s=typeof e;return!!e&&("object"==s||"function"==s)}function h(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==d.call(e)}(e))return NaN;if(p(e)){var s="function"==typeof e.valueOf?e.valueOf():e;e=p(s)?s+"":s}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(t,"");var n=a.test(e);return n||o.test(e)?i(e.slice(2),n?2:8):r.test(e)?NaN:+e}e.exports=function(e,s,n){var t,r,a,o,i,c,u=0,l=!1,d=!1,v=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function x(s){var n=t,a=r;return t=r=void 0,u=s,o=e.apply(a,n)}function S(e){return u=e,i=setTimeout(j,s),l?x(e):o}function A(e){var n=e-c;return void 0===c||n>=s||n<0||d&&e-u>=a}function j(){var e=m();if(A(e))return E(e);i=setTimeout(j,function(e){var n=s-(e-c);return d?g(n,a-(e-u)):n}(e))}function E(e){return i=void 0,v&&t?x(e):(t=r=void 0,o)}function b(){var e=m(),n=A(e);if(t=arguments,r=this,c=e,n){if(void 0===i)return S(c);if(d)return i=setTimeout(j,s),x(c)}return void 0===i&&(i=setTimeout(j,s)),o}return s=h(s)||0,p(n)&&(l=!!n.leading,a=(d="maxWait"in n)?f(h(n.maxWait)||0,s):a,v="trailing"in n?!!n.trailing:v),b.cancel=function(){void 0!==i&&clearTimeout(i),u=0,t=c=r=i=void 0},b.flush=function(){return void 0===i?o:E(m())},b}}}]);
//# sourceMappingURL=634.93c04ab0.chunk.js.map