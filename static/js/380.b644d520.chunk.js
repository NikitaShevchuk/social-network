"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[380],{6001:function(e,s,l){l.r(s),l.d(s,{default:function(){return b}});var t=l(8683),i=l(2791),a=l(8687),n=l(1598),r="Profile_whiteBg__PKEUq",o="Profile_transparent__VkP+M",c=l.p+"static/media/timeline-1.b965bc92cf972e3a9de6.jpg",u=l(1434),d=l(885),h=l(184),f=function(e){var s=(0,i.useState)(e.status),l=(0,d.Z)(s,2),t=l[0],a=l[1],n=(0,i.useState)(!1),r=(0,d.Z)(n,2),o=r[0],c=r[1];return(0,i.useEffect)((function(){a(e.status)}),[e.status]),(0,h.jsxs)(h.Fragment,{children:[o&&(0,h.jsx)("input",{type:"text",onChange:function(e){a(e.target.value)},onBlur:function(){c(!1),e.updStatusThunk(t)},autoFocus:!0,onKeyDown:function(s){"Enter"===s.key&&(c(!1),e.updStatusThunk(t))},value:null===t?"Add your status":t}),!o&&(0,h.jsx)("span",{onClick:function(){c(!0)},children:null===e.status||""===e.status?"Add your status":e.status})]})},m=l(6871),j=function(e){var s=(0,m.UO)().userId;s||(s=e.myId),(0,i.useEffect)((function(){e.loadProfile(s)}),[s]);return e.profile?(0,h.jsx)("section",{children:(0,h.jsxs)("div",{className:"feature-photo",children:[(0,h.jsx)("figure",{children:(0,h.jsx)("img",{src:c,alt:""})}),(0,h.jsx)("div",{className:"add-btn",children:e.followed?(0,h.jsx)("button",{title:"",className:"add-butn",disabled:e.disableWhileRequest,onClick:function(){e.unfollowUser(s)},children:"Unfollow"}):(0,h.jsx)("button",{title:"",className:"add-butn",disabled:e.disableWhileRequest,onClick:function(){e.followUser(s)},children:"Follow"})}),(0,h.jsx)("div",{className:"container-fluid",children:(0,h.jsxs)("div",{className:"row merged",children:[(0,h.jsx)("div",{className:"col-lg-2 col-sm-3",children:(0,h.jsx)("div",{className:"user-avatar",children:(0,h.jsxs)("figure",{className:e.profile.photos.large?o:r,children:[(0,h.jsx)("img",{src:e.profile.photos.large?e.profile.photos.large:n,alt:""}),(0,h.jsxs)("form",{className:"edit-phto",children:[(0,h.jsx)("i",{className:"fa fa-camera-retro"}),(0,h.jsxs)("label",{className:"fileContainer",children:["Edit Display Photo",(0,h.jsx)("input",{type:"file"})]})]})]})})}),(0,h.jsx)("div",{className:"col-lg-10 col-sm-9",children:(0,h.jsx)("div",{className:"timeline-info",children:(0,h.jsxs)("ul",{children:[(0,h.jsxs)("li",{className:"admin-name",children:[(0,h.jsx)("h5",{children:e.profile.fullName}),(0,h.jsx)(f,{status:e.status,updStatusThunk:e.updStatusThunk})]}),(0,h.jsxs)("li",{children:[(0,h.jsx)("a",{className:"active",href:"time-line.html",title:"",children:"time line"}),(0,h.jsx)("a",{className:"",href:"timeline-photos.html",title:"",children:"Photos"}),(0,h.jsx)("a",{className:"",href:"timeline-videos.html",title:"",children:"Videos"}),(0,h.jsx)("a",{className:"",href:"timeline-friends.html",title:"",children:"Friends"}),(0,h.jsx)("a",{className:"",href:"timeline-groups.html",title:"",children:"Groups"}),(0,h.jsx)("a",{className:"",href:"about.html",title:"",children:"about"}),(0,h.jsx)("a",{className:"",href:"#",title:"",children:"more"})]}),(0,h.jsx)("li",{children:(0,h.jsxs)("ul",{className:"education",children:[(0,h.jsxs)("li",{children:[(0,h.jsx)("i",{className:"ti-facebook"})," ",(0,h.jsx)("a",{href:"".concat(e.profile.contacts.facebook),children:"My Facebook"})]}),(0,h.jsxs)("li",{children:[(0,h.jsx)("i",{className:"ti-twitter"}),(0,h.jsx)("a",{href:"".concat(e.profile.contacts.twitter),children:"My Twitter"})]})]})})]})})})]})})]})}):(0,h.jsx)(u.Z,{})},x=l(2727),p=l(7781),N=l(9270),b=(0,p.qC)(N.Z,(0,a.$j)((function(e){return{profile:e.profilePage.profile,followed:e.profilePage.followed,disableWhileRequest:e.profilePage.disableWhileRequest,status:e.profilePage.status,myId:e.auth.userData.id}}),{followUser:x.P_,unfollowUser:x.F6,loadProfile:x.hr,updStatusThunk:x.zF}))((function(e){return(0,h.jsx)(j,(0,t.Z)({},e))}))}}]);
//# sourceMappingURL=380.b644d520.chunk.js.map