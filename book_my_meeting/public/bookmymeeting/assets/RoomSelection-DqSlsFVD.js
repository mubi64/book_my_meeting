import{c as r,_ as C,r as h,a,o as s,b as e,t as c,d as u,F as v,e as b,f as M,g as I,h as q,i as j,u as y,j as P}from"./index-DU6LRjxd.js";import{S as R}from"./Spinner-BhxefNDG.js";/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=r("CoffeeIcon",[["path",{d:"M17 8h1a4 4 0 1 1 0 8h-1",key:"jx4kbh"}],["path",{d:"M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z",key:"1bxrl0"}],["line",{x1:"6",x2:"6",y1:"2",y2:"4",key:"1cr9l3"}],["line",{x1:"10",x2:"10",y1:"2",y2:"4",key:"170wym"}],["line",{x1:"14",x2:"14",y1:"2",y2:"4",key:"1c5f70"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=r("MapPinIcon",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=r("MonitorIcon",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=r("SquarePenIcon",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z",key:"1lpok0"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=r("UsersIcon",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=r("VideoIcon",[["path",{d:"m22 8-6 4 6 4V8Z",key:"50v9me"}],["rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2",key:"1rqjg6"}]]),L={name:"RoomCard",components:{Users:V,MapPin:p,Monitor:_,PenSquare:k,Video:f,Coffee:x},props:{room:{type:Object,required:!0}},methods:{getAmenityIcon(i){const t=i.toLowerCase();return t.includes("projector")||t.includes("tv")?_:t.includes("whiteboard")?k:t.includes("video")?f:t.includes("coffee")?x:p}},emits:["select"]},U={class:"relative h-48 overflow-hidden"},B=["src","alt"],Z={class:"p-4"},z={class:"text-lg font-semibold text-gray-900 dark:text-white mb-2"},A={class:"flex items-center text-gray-600 dark:text-gray-300 mb-2"},H={class:"text-sm"},N={class:"flex items-center text-gray-600 dark:text-gray-300 mb-2"},$={class:"text-sm"},D={class:"mt-3"},F={class:"flex flex-wrap gap-1"};function T(i,t,o,l,d,n){const g=h("Users"),w=h("MapPin");return s(),a("div",{class:"card hover:shadow-md transition-all duration-300 cursor-pointer group",onClick:t[0]||(t[0]=m=>i.$emit("select",o.room.id))},[e("div",U,[e("img",{src:o.room.imageUrl,alt:o.room.name,class:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"},null,8,B),t[1]||(t[1]=e("div",{class:"absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"},null,-1))]),e("div",Z,[e("h3",z,c(o.room.name),1),e("div",A,[u(g,{size:"16",class:"mr-2"}),e("span",H,"Capacity: "+c(o.room.capacity),1)]),e("div",N,[u(w,{size:"16",class:"mr-2"}),e("span",$,c(o.room.location),1)]),e("div",D,[t[2]||(t[2]=e("h4",{class:"text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"},"Amenities:",-1)),e("div",F,[(s(!0),a(v,null,b(o.room.amenities,(m,S)=>(s(),a("span",{key:S,class:"badge bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"},[(s(),M(q(n.getAmenityIcon(m)),{size:"12",class:"mr-1"})),I(" "+c(m),1)]))),128))])])])])}const E=C(L,[["render",T]]),O={key:0,class:"container py-6"},G={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"},J={key:1,class:"flex items-center justify-center h-screen"},W={__name:"RoomSelection",setup(i){const t=j({url:"book_my_meeting.book_my_meeting.api.meeting_room.get_meeting_rooms",auto:!0}),o=l=>{P.push({name:"TimeSlotSelection",params:{id:l}})};return(l,d)=>y(t).loading?(s(),a("div",J,[u(y(R),{class:"w-8"})])):(s(),a("div",O,[d[0]||(d[0]=e("div",{class:"mb-8"},[e("h2",{class:"text-2xl font-bold text-gray-900 dark:text-white mb-2"},"Select a Meeting Room"),e("p",{class:"text-gray-600 dark:text-gray-400"},"Choose from our available meeting spaces")],-1)),e("div",G,[(s(!0),a(v,null,b(y(t).data,n=>(s(),M(E,{key:n.id,room:n,onSelect:g=>o(n.id)},null,8,["room","onSelect"]))),128))])]))}};export{W as default};
