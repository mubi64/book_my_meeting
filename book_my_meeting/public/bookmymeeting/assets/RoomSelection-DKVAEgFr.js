import{c as a,_ as q,r as p,a as n,o as s,b as e,t as l,d as u,F as v,e as b,f as M,g as C,h as I,i as j,u as y,j as P}from"./index-BV7ajd4C.js";import{S as V}from"./Spinner-D2cFcfEp.js";/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=a("CoffeeIcon",[["path",{d:"M17 8h1a4 4 0 1 1 0 8h-1",key:"jx4kbh"}],["path",{d:"M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z",key:"1bxrl0"}],["line",{x1:"6",x2:"6",y1:"2",y2:"4",key:"1cr9l3"}],["line",{x1:"10",x2:"10",y1:"2",y2:"4",key:"170wym"}],["line",{x1:"14",x2:"14",y1:"2",y2:"4",key:"1c5f70"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=a("MapPinIcon",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=a("MonitorIcon",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=a("ProjectorIcon",[["path",{d:"M5 7 3 5",key:"1yys58"}],["path",{d:"M9 6V3",key:"1ptz9u"}],["path",{d:"m13 7 2-2",key:"1w3vmq"}],["circle",{cx:"9",cy:"13",r:"3",key:"1mma13"}],["path",{d:"M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17",key:"2frwzc"}],["path",{d:"M16 16h2",key:"dnq2od"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=a("SquarePenIcon",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z",key:"1lpok0"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=a("UsersIcon",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=a("VideoIcon",[["path",{d:"m22 8-6 4 6 4V8Z",key:"50v9me"}],["rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2",key:"1rqjg6"}]]),H={name:"RoomCard",components:{Users:z,MapPin:k,Monitor:x,PenSquare:_,Video:f,Coffee:g},props:{room:{type:Object,required:!0}},methods:{getAmenityIcon(c){const t=c.toLowerCase();return t.includes("tv")?x:t.includes("projector")?R:t.includes("whiteboard")?_:t.includes("video")?f:t.includes("refreshments")?g:k}},emits:["select"]},L={class:"relative h-48 overflow-hidden"},U=["src","alt"],B={class:"p-4"},Z={class:"text-lg font-semibold text-gray-900 dark:text-white mb-2"},A={class:"flex items-center text-gray-600 dark:text-gray-300 mb-2"},N={class:"text-sm"},$={class:"flex items-center text-gray-600 dark:text-gray-300 mb-2"},D={class:"text-sm"},F={class:"mt-3"},T={class:"flex flex-wrap gap-1"};function E(c,t,o,d,i,r){const h=p("Users"),w=p("MapPin");return s(),n("div",{class:"card hover:shadow-md transition-all duration-300 cursor-pointer group",onClick:t[0]||(t[0]=m=>c.$emit("select",o.room.id))},[e("div",L,[e("img",{src:o.room.imageUrl,alt:o.room.name,class:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"},null,8,U),t[1]||(t[1]=e("div",{class:"absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"},null,-1))]),e("div",B,[e("h3",Z,l(o.room.name),1),e("div",A,[u(h,{size:"16",class:"mr-2"}),e("span",N,"Capacity: "+l(o.room.capacity),1)]),e("div",$,[u(w,{size:"16",class:"mr-2"}),e("span",D,l(o.room.location),1)]),e("div",F,[t[2]||(t[2]=e("h4",{class:"text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"},"Amenities:",-1)),e("div",T,[(s(!0),n(v,null,b(o.room.amenities,(m,S)=>(s(),n("span",{key:S,class:"badge bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"},[(s(),M(I(r.getAmenityIcon(m)),{size:"12",class:"mr-1"})),C(" "+l(m),1)]))),128))])])])])}const O=q(H,[["render",E]]),G={key:0,class:"container py-6"},J={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"},K={key:1,class:"flex items-center justify-center h-screen"},X={__name:"RoomSelection",setup(c){const t=j({url:"book_my_meeting.book_my_meeting.api.meeting_room.get_meeting_rooms",auto:!0}),o=(d,i)=>{P.push({name:"TimeSlotSelection",params:{id:d},query:{roomName:i}})};return(d,i)=>y(t).loading?(s(),n("div",K,[u(y(V),{class:"w-8"})])):(s(),n("div",G,[i[0]||(i[0]=e("div",{class:"mb-8"},[e("h2",{class:"text-2xl font-bold text-gray-900 dark:text-white mb-2"},"Select a Meeting Room"),e("p",{class:"text-gray-600 dark:text-gray-400"},"Choose from our available meeting spaces")],-1)),e("div",J,[(s(!0),n(v,null,b(y(t).data,r=>(s(),M(O,{key:r.id,room:r,onSelect:h=>o(r.id,r.name)},null,8,["room","onSelect"]))),128))])]))}};export{X as default};
