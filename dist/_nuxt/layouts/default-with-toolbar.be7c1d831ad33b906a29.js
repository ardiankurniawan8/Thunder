webpackJsonp([22],{"6PfB":function(t,e,a){"use strict";e.a={mounted:function(){console.log()},data:function(){return{dialog:!1,drawer:!0,snackbar:null,items:[{icon:"dashboard",text:"Dashboard",href:"",scope:"*"},{icon:"people",text:"Siswa",href:"siswa",scope:"manage_customer"},{icon:"money",text:"Keuangan",href:"finance",scope:"manage_order"},{icon:"money",text:"HRD",href:"hrd",scope:"manage_order"},{icon:"keyboard_arrow_up","icon-alt":"keyboard_arrow_down",text:"Settings",model:!0,children:[{icon:"developer_board",text:"Products",href:"/dashboard/settings/products",scope:"manage_product"},{icon:"airport_shuttle",text:"Supplier",href:"/dashboard/settings/suppliers",scope:"manage_supplier"},{icon:"people",text:"Admin",href:"/dashboard/settings/admin",scope:"manage_admin"}]}]}}}},CUgY:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{staticClass:"grey lighten-3"},[a("v-toolbar",{attrs:{color:"white",flat:"",app:"",fixed:"","clipped-left":t.$vuetify.breakpoint.lgAndUp}},[a("v-toolbar-side-icon"),a("v-toolbar-title",{staticClass:"white--text"},[a("img",{attrs:{src:"/v2.png",height:"40"}})]),a("v-spacer"),a("v-toolbar-items",t._l(t.items,function(e){return a("v-btn",{key:e.href,staticClass:"hidden-xs-only",attrs:{flat:"",nuxt:"",to:"/dashboard/"+t.$route.params.id+"/"+e.href}},[t._v("\n        "+t._s(e.text)+"\n      ")])})),a("v-btn",{attrs:{icon:""}},[a("v-icon",[t._v("account_circle")])],1)],1),a("v-content",[a("v-container",{attrs:{"grid-list-lg":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("nuxt")],1)],1)],1)],1)],1)};r._withStripped=!0;var o={render:r,staticRenderFns:[]};e.a=o},QHX2:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("6PfB"),o=a("CUgY"),n=a("VU/8")(r.a,o.a,!1,null,null,null);n.options.__file="layouts/default-with-toolbar.vue",e.default=n.exports}});