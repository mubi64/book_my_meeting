import{c as a,_ as f,r as u,a as c,o as s,b as t,t as l,d as g,F as v,e as b,f as M,g as R,h as q,u as I,i as P}from"./index-BXwvlhjQ.js";import{u as B}from"./bookingStore-CMuDvlYr.js";/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=a("CoffeeIcon",[["path",{d:"M17 8h1a4 4 0 1 1 0 8h-1",key:"jx4kbh"}],["path",{d:"M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z",key:"1bxrl0"}],["line",{x1:"6",x2:"6",y1:"2",y2:"4",key:"1cr9l3"}],["line",{x1:"10",x2:"10",y1:"2",y2:"4",key:"170wym"}],["line",{x1:"14",x2:"14",y1:"2",y2:"4",key:"1c5f70"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=a("MapPinIcon",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=a("MonitorIcon",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=a("SquarePenIcon",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z",key:"1lpok0"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=a("UsersIcon",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-vue-next v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=a("VideoIcon",[["path",{d:"m22 8-6 4 6 4V8Z",key:"50v9me"}],["rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2",key:"1rqjg6"}]]),j={name:"RoomCard",components:{Users:V,MapPin:h,Monitor:x,PenSquare:k,Video:_,Coffee:p},props:{room:{type:Object,required:!0}},methods:{getAmenityIcon(r){const e=r.toLowerCase();return e.includes("projector")||e.includes("tv")?x:e.includes("whiteboard")?k:e.includes("video")?_:e.includes("coffee")?p:h}},emits:["select"]},L={class:"relative h-48 overflow-hidden"},U=["src","alt"],Z={class:"p-4"},$={class:"text-lg font-semibold text-gray-900 dark:text-white mb-2"},z={class:"flex items-center text-gray-600 dark:text-gray-300 mb-2"},A={class:"text-sm"},H={class:"flex items-center text-gray-600 dark:text-gray-300 mb-2"},N={class:"text-sm"},D={class:"mt-3"},F={class:"flex flex-wrap gap-1"};function T(r,e,o,n,S,y){const d=u("Users"),i=u("MapPin");return s(),c("div",{class:"card hover:shadow-md transition-all duration-300 cursor-pointer group",onClick:e[0]||(e[0]=m=>r.$emit("select",o.room.id))},[t("div",L,[t("img",{src:o.room.imageUrl,alt:o.room.name,class:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"},null,8,U),e[1]||(e[1]=t("div",{class:"absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"},null,-1))]),t("div",Z,[t("h3",$,l(o.room.name),1),t("div",z,[g(d,{size:"16",class:"mr-2"}),t("span",A,"Capacity: "+l(o.room.capacity),1)]),t("div",H,[g(i,{size:"16",class:"mr-2"}),t("span",N,l(o.room.location),1)]),t("div",D,[e[2]||(e[2]=t("h4",{class:"text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"},"Amenities:",-1)),t("div",F,[(s(!0),c(v,null,b(o.room.amenities,(m,C)=>(s(),c("span",{key:C,class:"badge bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"},[(s(),M(q(y.getAmenityIcon(m)),{size:"12",class:"mr-1"})),R(" "+l(m),1)]))),128))])])])])}const w=f(j,[["render",T]]),E={name:"RoomSelection",components:{RoomCard:w},setup(){const r=I(),e=B(),o=n=>{e.selectRoom(n),r.push({name:"TimeSlotSelection",params:{id:n}})};return P(()=>{e.resetBooking()}),{rooms:e.rooms,selectRoom:o}}},O={class:"container py-6"},G={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"};function J(r,e,o,n,S,y){const d=w;return s(),c("div",O,[e[0]||(e[0]=t("div",{class:"mb-8"},[t("h2",{class:"text-2xl font-bold text-gray-900 dark:text-white mb-2"},"Select a Meeting Room"),t("p",{class:"text-gray-600 dark:text-gray-400"},"Choose from our available meeting spaces")],-1)),t("div",G,[(s(!0),c(v,null,b(n.rooms,i=>(s(),M(d,{key:i.id,room:i,onSelect:n.selectRoom},null,8,["room","onSelect"]))),128))])])}const W=f(E,[["render",J]]);export{W as default};
