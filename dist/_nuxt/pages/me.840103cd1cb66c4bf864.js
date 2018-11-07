webpackJsonp([3],{"2wfW":function(a,t,e){"use strict";var r=e("dP+h"),i=e("tJl5"),s=e("VU/8")(r.a,i.a,!1,null,null,null);s.options.__file="components/organization/form/add_organization.vue",t.a=s.exports},"3dL8":function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("yFE5"),i=e("9Oci"),s=e("VU/8")(r.a,i.a,!1,null,null,null);s.options.__file="pages/me.vue",t.default=s.exports},"9Oci":function(a,t,e){"use strict";var r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",[e("v-layout",{staticClass:"my-4",attrs:{"justify-space-around":""}},[e("v-flex",{attrs:{xs12:"","justify-center":""}},[e("v-card",{staticClass:"b-1",attrs:{flat:""}},[e("v-toolbar",{attrs:{flat:"",tabs:"",color:"white"}},[e("v-toolbar-title",[a._v("\n            Hi "+a._s(a.$store.state.authentication.me.name)+",\n          ")]),e("v-spacer"),e("v-btn",{attrs:{icon:"",nuxt:"",to:"/"}},[e("v-icon",[a._v("exit_to_app")])],1),e("v-tabs",{staticClass:"bb-1",attrs:{slot:"extension",color:"white"},slot:"extension",model:{value:a.tab,callback:function(t){a.tab=t},expression:"tab"}},[e("v-tabs-slider",{attrs:{color:"primary"}}),e("v-tab",{key:"1"},[a._v("Pilih Perusahaan")]),e("v-tab",{key:"2"},[a._v("Akunku")])],1)],1),e("v-card-text",[e("v-tabs-items",{model:{value:a.tab,callback:function(t){a.tab=t},expression:"tab"}},[e("v-tab-item",{key:"1"},[e("v-list",[e("v-list-tile",{on:{click:function(t){a.dialog.addCompanyForm.show=!0}}},[e("v-list-tile-action",[e("v-icon",[a._v("add")])],1),e("v-list-tile-content",[a._v("Tambah Perusahaan")])],1),a._l(a.Organization,function(t){return e("v-list-tile",{key:t.id,attrs:{nuxt:"",to:"/dashboard/"+t.id}},[e("v-list-tile-action",[e("v-icon",[a._v("store")])],1),e("v-list-tile-content",[a._v(a._s(t.name))])],1)})],2)],1),e("v-tab-item",{key:"2"},[e("v-list",[e("v-list-tile",{on:{click:function(t){a.dialog.updatePasswordForm.show=!0}}},[e("v-list-tile-action",[e("v-icon",[a._v("lock")])],1),e("v-list-tile-content",[a._v("Ubah Password")])],1),e("v-list-tile",{attrs:{nuxt:"",to:"/"}},[e("v-list-tile-action",[e("v-icon",[a._v("exit_to_app")])],1),e("v-list-tile-content",[a._v("Logout")])],1)],1)],1)],1)],1)],1)],1)],1),e("v-dialog",{attrs:{persistent:"","max-width":"400"},model:{value:a.dialog.updatePasswordForm.show,callback:function(t){a.$set(a.dialog.updatePasswordForm,"show",t)},expression:"dialog.updatePasswordForm.show"}},[e("v-card",[e("v-card-title",{staticClass:"headline"},[a._v("\n        Ubah Password\n        "),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(t){a.dialog.updatePasswordForm.show=!1}}},[e("v-icon",{staticClass:"grey--text"},[a._v("close")])],1)],1),e("v-card-text",[null!==a.dialog.updatePasswordForm.error?e("div",{staticClass:"error--text mb-3"},[a._v("\n          "+a._s(a.dialog.updatePasswordForm.error)+"\n        ")]):a._e(),e("FormUpdatePassword",{key:Date.now(),ref:"FormUpdatePassword",on:{SUBMIT_SUCCESS:a.PasswordUpdated,SUBMIT_FAIL:a.PasswordFailToUpdate,SUBMIT_ERROR:a.PasswordFailToUpdate}})],1)],1)],1),e("v-dialog",{attrs:{persistent:"","max-width":"600"},model:{value:a.dialog.addCompanyForm.show,callback:function(t){a.$set(a.dialog.addCompanyForm,"show",t)},expression:"dialog.addCompanyForm.show"}},[e("v-card",[e("v-card-title",{staticClass:"headline"},[a._v("\n        Tambah Perusahaan\n        "),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(t){a.dialog.addCompanyForm.show=!1}}},[e("v-icon",{staticClass:"grey--text"},[a._v("close")])],1)],1),e("v-card-text",[null!==a.dialog.addCompanyForm.error?e("div",{staticClass:"error--text mb-3"},[a._v("\n          "+a._s(a.dialog.addCompanyForm.error)+"\n        ")]):a._e(),e("v-container",{attrs:{"grid-list-md":""}},[e("v-layout",[e("v-flex",{attrs:{xs12:""}},[e("FormAddCompany",{key:Date.now(),ref:"FormAddCompany",on:{SUBMIT_SUCCESS:a.CompanyAdded,SUBMIT_FAIL:a.FailToAddCompany}})],1)],1)],1)],1)],1)],1)],1)};r._withStripped=!0;var i={render:r,staticRenderFns:[]};t.a=i},Fbo3:function(a,t,e){"use strict";var r=e("hAPH"),i=e.n(r);t.a={apollo:{$client:"customer"},props:{},data:function(){return{errorMessages:{},isSubmitting:!1,formData:{},GQL:{data:"UpdateMyPassword"}}},mounted:function(){this.reset()},computed:{transformedInput:function(){return{input:{password:this.formData.password,new_password:this.formData.new_password}}},transformedErrors:function(){return{password:this.translate(this.errorMessages.password,{password:"password saat ini"}),new_password:this.translate(this.errorMessages.new_password,{new_password:"password baru"}),new_password_confirmation:this.translate(this.errorMessages.new_password_confirmation,{new_password_confirmation:"konfirmasi password"})}}},watch:{},methods:{reset:function(){this.formData={},this.errorMessages={}},submit:function(a){var t=this;if(t.isSubmitting)return!1;t.$validator.validateAll().then(function(e){e?(t.$emit("SUBMITTING"),t.isSubmitting=!0,t.$apollo.mutate({mutation:i.a,variables:t.transformedInput}).then(function(a){t.$emit("SUBMIT_SUCCESS",a.data[t.GQL.data]),t.isSubmitting=!0}).catch(function(a){a.graphQLErrors&&Array.isArray(a.graphQLErrors)&&a.graphQLErrors.length?a.graphQLErrors.forEach(function(a){switch(a.message){case"validation":t.errorMessages=a.validation,t.$forceUpdate();break;default:t.$emit("SUBMIT_FAIL",a.code)}}):a.networkError.message&&t.$emit("SUBMIT_ERROR","Fail to connect to server"),t.isSubmitting=!1})):t.errorMessages=t.$validator.errors.collect(),a.preventDefault()})}}}},P38x:function(a,t,e){"use strict";var r=e("Fbo3"),i=e("dxAO"),s=e("VU/8")(r.a,i.a,!1,null,null,null);s.options.__file="components/auth/form/change_password.vue",t.a=s.exports},"dP+h":function(a,t,e){"use strict";var r=e("zJJk"),i=e.n(r);t.a={apollo:{$client:"customer"},props:{},data:function(){return{errorMessages:{},isSubmitting:!1,formData:{},GQL:{data:"AddOrganization"}}},mounted:function(){this.reset()},computed:{transformedInput:function(){return{input:{name:this.formData.name,settings:{alamat:this.formData.alamat,kota:this.formData.kota,propinsi:this.formData.propinsi,telp:[{type:"default",value:this.formData.telp}]}}}},transformedErrors:function(){return{name:this.translate(this.errorMessages.name,{name:"nama"}),alamat:this.translate(this.errorMessages.settings?this.errorMessages.settings.alamat:[],{"settings.alamat":"alamat"}),kota:this.translate(this.errorMessages.settings?this.errorMessages.settings.kota:[],{"settings.kota":"kota"}),propinsi:this.translate(this.errorMessages.settings?this.errorMessages.settings.propinsi:[],{"settings.propinsi":"propinsi"})}}},watch:{},methods:{reset:function(){this.formData={},this.errorMessages={}},submit:function(a){var t=this;if(t.isSubmitting)return!1;t.$validator.validateAll().then(function(e){e?(t.$emit("SUBMITTING"),t.isSubmitting=!0,t.$apollo.mutate({mutation:i.a,variables:t.transformedInput}).then(function(a){t.$emit("SUBMIT_SUCCESS",a.data[t.GQL.data]),t.isSubmitting=!0}).catch(function(a){a.graphQLErrors&&Array.isArray(a.graphQLErrors)&&a.graphQLErrors.length?a.graphQLErrors.forEach(function(a){switch(a.message){case"validation":t.errorMessages=a.validation,t.$forceUpdate();break;default:t.$emit("SUBMIT_FAIL",a.code)}}):a.networkError.message&&t.$emit("SUBMIT_ERROR","Fail to connect to server"),t.isSubmitting=!1})):t.errorMessages=t.$validator.errors.collect(),a.preventDefault()})}}}},dxAO:function(a,t,e){"use strict";var r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",[e("v-layout",{attrs:{wrap:""},on:{keyup:function(t){return"button"in t||!a._k(t.keyCode,"enter",13,t.key,"Enter")?a.submit(t):null}}},[e("v-flex",{staticClass:"mb-2",attrs:{xs12:""}},[e("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{type:"password",name:"password",label:"password saat ini","error-messages":a.transformedErrors.password,autocomplete:"new-password"},model:{value:a.formData.password,callback:function(t){a.$set(a.formData,"password",t)},expression:"formData['password']"}})],1),e("v-flex",{staticClass:"mb-2",attrs:{xs12:""}},[e("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{type:"password",name:"new_password",label:"password baru","error-messages":a.transformedErrors.new_password,autocomplete:"new-password"},model:{value:a.formData.new_password,callback:function(t){a.$set(a.formData,"new_password",t)},expression:"formData['new_password']"}})],1),e("v-flex",{staticClass:"mb-2",attrs:{xs12:""}},[e("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required|confirmed:new_password",expression:"'required|confirmed:new_password'"}],attrs:{type:"password",name:"new_password_confirmation",label:"konfirmasi password","error-messages":a.transformedErrors.new_password_confirmation,autocomplete:"new-password"},model:{value:a.formData.new_password_confirmation,callback:function(t){a.$set(a.formData,"new_password_confirmation",t)},expression:"formData['new_password_confirmation']"}})],1)],1),e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{staticClass:"mb-2",attrs:{xs12:""}},[a.isSubmitting?e("v-btn",{staticClass:"grey lighten-2",attrs:{flat:"",block:"",disabled:""}},[e("v-progress-circular",{staticClass:"mr-3",attrs:{indeterminate:"",size:"20"}}),a._v(" Mengirimkan data...")],1):e("v-btn",{staticClass:"primary",attrs:{flat:"",block:""},on:{click:a.submit}},[a._v("Ubah Password")])],1)],1)],1)};r._withStripped=!0;var i={render:r,staticRenderFns:[]};t.a=i},hAPH:function(a,t){var e={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UpdateMyPassword"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NamedType",name:{kind:"Name",value:"InputUpdateMyPassword"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"UpdateMyPassword"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[]}]}}],loc:{start:0,end:92}};e.loc.source={body:"mutation UpdateMyPassword($input: InputUpdateMyPassword) {\n\tUpdateMyPassword(input:$input)\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function i(a,t){for(var e=0;e<a.definitions.length;e++){var r=a.definitions[e];if(r.name&&r.name.value==t)return r}}e.definitions.forEach(function(a){if(a.name){var t=new Set;!function a(t,e){if("FragmentSpread"===t.kind)e.add(t.name.value);else if("VariableDefinition"===t.kind){var r=t.type;"NamedType"===r.kind&&e.add(r.name.value)}t.selectionSet&&t.selectionSet.selections.forEach(function(t){a(t,e)}),t.variableDefinitions&&t.variableDefinitions.forEach(function(t){a(t,e)}),t.definitions&&t.definitions.forEach(function(t){a(t,e)})}(a,t),r[a.name.value]=t}}),a.exports=e,a.exports.UpdateMyPassword=function(a,t){var e={kind:a.kind,definitions:[i(a,t)]};a.hasOwnProperty("loc")&&(e.loc=a.loc);for(var s=r[t]||new Set,n=new Set,o=new Set(s);o.size>0;){var d=o;o=new Set,d.forEach(function(a){n.has(a)||(n.add(a),(r[a]||new Set).forEach(function(a){o.add(a)}))})}return n.forEach(function(t){var r=i(a,t);r&&e.definitions.push(r)}),e}(e,"UpdateMyPassword")},tJl5:function(a,t,e){"use strict";var r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",[e("v-form",{nativeOn:{keyup:function(t){return"button"in t||13===t.keyCode?a.submit(t):null}}},[e("v-layout",{attrs:{wrap:""}},[e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{type:"text",name:"name",label:"Nama","error-messages":a.transformedErrors.name,placeholder:" "},model:{value:a.formData.name,callback:function(t){a.$set(a.formData,"name",t)},expression:"formData['name']"}})],1),e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{type:"text",name:"alamat",label:"Alamat","error-messages":a.transformedErrors.alamat,placeholder:" "},model:{value:a.formData.alamat,callback:function(t){a.$set(a.formData,"alamat",t)},expression:"formData['alamat']"}})],1),e("v-flex",{attrs:{xs6:""}},[e("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{type:"text",name:"kota",label:"Kota","error-messages":a.transformedErrors.kota,placeholder:" "},model:{value:a.formData.kota,callback:function(t){a.$set(a.formData,"kota",t)},expression:"formData['kota']"}})],1),e("v-flex",{attrs:{xs6:""}},[e("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{type:"text",name:"propinsi",label:"Propinsi","error-messages":a.transformedErrors.propinsi,placeholder:" "},model:{value:a.formData.propinsi,callback:function(t){a.$set(a.formData,"propinsi",t)},expression:"formData['propinsi']"}})],1),e("v-flex",{attrs:{xs6:""}},[e("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"min:7|max:15|numeric",expression:"'min:7|max:15|numeric'"}],attrs:{type:"text",name:"telp",label:"telp","error-messages":a.transformedErrors.telp,mask:"#### #########",placeholder:" "},model:{value:a.formData.telp,callback:function(t){a.$set(a.formData,"telp",t)},expression:"formData['telp']"}})],1)],1)],1),e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{staticClass:"text-xs-right mt-4",attrs:{xs12:""}},[a.isSubmitting?a._e():a._t("action"),a._t("submit",[a.isSubmitting?e("span",[e("v-progress-circular",{attrs:{indeterminate:"",color:"primary",size:"20"}}),a._v(" Mengirimkan data...")],1):e("v-btn",{staticClass:"primary",attrs:{flat:""},on:{click:a.submit}},[a._v("Simpan")])])],2)],1)],1)};r._withStripped=!0;var i={render:r,staticRenderFns:[]};t.a=i},yFE5:function(a,t,e){"use strict";var r=e("P38x"),i=e("2wfW"),s=e("I/eA"),n=e.n(s);t.a={layout:"me",components:{FormUpdatePassword:r.a,FormAddCompany:i.a},apollo:{$client:"customer"},data:function(){return{tab:null,dialog:{updatePasswordForm:{show:!1,error:null},addCompanyForm:{show:!1,error:null}},Organization:[]}},mounted:function(){this.fetchMyOrganization()},watch:{"dialog.updatePasswordForm.show":function(a){!1===a&&(this.dialog.updatePasswordForm.error=null)}},methods:{PasswordUpdated:function(a){this.dialog.updatePasswordForm.show=!1,this.$store.dispatch("ui/alert",{success:"Password telah berhasil terupdate"})},PasswordFailToUpdate:function(a){switch(a){case 1e3:this.dialog.updatePasswordForm.error="Password saat ini yang anda masukkan salah"}this.$refs.FormUpdatePassword.reset()},CompanyAdded:function(a){this.dialog.addCompanyForm.show=!1,this.fetchMyOrganization(),this.$store.dispatch("ui/alert",{success:"Perusahaan "+a.name+" telah berhasil ditambahkan"})},FailToAddCompany:function(a){switch(a){case 1601:this.dialog.updatePasswordForm.error="Perusahaan dengan nama tersebut telah terdaftar dalam akun anda sebelumnya"}this.$refs.FormUpdatePassword.reset()},fetchMyOrganization:function(){var a=this;this.$apollo.query({query:n.a,fetchPolicy:"no-cache"}).then(function(t){a.Organization=t.data.Organization,a.$forceUpdate()})}}}},zJJk:function(a,t){var e={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"AddOrganization"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NamedType",name:{kind:"Name",value:"InputOrganization"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"AddOrganization"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:104}};e.loc.source={body:"mutation AddOrganization($input: InputOrganization) {\n\tAddOrganization(input:$input) {\n\t\tid,\n\t\tname\n\t}\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function i(a,t){for(var e=0;e<a.definitions.length;e++){var r=a.definitions[e];if(r.name&&r.name.value==t)return r}}e.definitions.forEach(function(a){if(a.name){var t=new Set;!function a(t,e){if("FragmentSpread"===t.kind)e.add(t.name.value);else if("VariableDefinition"===t.kind){var r=t.type;"NamedType"===r.kind&&e.add(r.name.value)}t.selectionSet&&t.selectionSet.selections.forEach(function(t){a(t,e)}),t.variableDefinitions&&t.variableDefinitions.forEach(function(t){a(t,e)}),t.definitions&&t.definitions.forEach(function(t){a(t,e)})}(a,t),r[a.name.value]=t}}),a.exports=e,a.exports.AddOrganization=function(a,t){var e={kind:a.kind,definitions:[i(a,t)]};a.hasOwnProperty("loc")&&(e.loc=a.loc);for(var s=r[t]||new Set,n=new Set,o=new Set(s);o.size>0;){var d=o;o=new Set,d.forEach(function(a){n.has(a)||(n.add(a),(r[a]||new Set).forEach(function(a){o.add(a)}))})}return n.forEach(function(t){var r=i(a,t);r&&e.definitions.push(r)}),e}(e,"AddOrganization")}});