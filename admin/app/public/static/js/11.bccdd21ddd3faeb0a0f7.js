webpackJsonp([11],{"1HTt":function(t,e,a){var n=a("Pu+E");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("cf1f3e08",n,!0,{})},"Pu+E":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"",""])},ejUM:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("TVG1"),i={name:"interface_index",data:function(){return{titleVal:"全部接口",searchVal:"",data:[],pagination:{showQuickJumper:!0},loading:!1,columns:[{title:"编号",dataIndex:"mockid",width:"5%",align:"center"},{title:"接口名称",dataIndex:"api_name",align:"center"},{title:"接口地址",dataIndex:"api_url",align:"center"},{title:"请求类型",scopedSlots:{customRender:"apitype"},dataIndex:"api_type",align:"center"},{title:"项目名称",dataIndex:"projectname",align:"center"},{title:"模块名称",dataIndex:"modulename",align:"center"},{title:"接口状态",scopedSlots:{customRender:"apistatus"},dataIndex:"api_status",align:"center"},{title:"操作",width:"20%",scopedSlots:{customRender:"operation"},align:"center"}]}},computed:{projectid:function(){return this.$route.query.pid},moduleid:function(){return this.$route.query.mid}},watch:{$route:{handler:function(t){void 0!=this.moduleid?this.getInvolv():this.titleVal="全部接口",this.fetch(1)},immediate:!0}},methods:{apiTypeFun:function(t){var e="";switch(t){case"0":e="GET";break;case"1":e="PUT";break;case"2":e="POST";break;case"3":e="DELETE";break;case"4":e="OPTIONS";break;case"5":e="PATCH"}return e},apistatusFun:function(t){var e="";switch(t){case"0":e="废弃";break;case"1":e="已上线";break;case"2":e="开发中";break;case"3":e="测试中"}return e},getInvolv:function(){var t=this;this.$request({method:"GET",url:"/modules/involv/"+this.moduleid}).then(function(e){var a=e.data[0];t.titleVal=a.projectname+" > "+a.modulename+" > 接口"})},fetch:function(t){var e=this;this.loading=!0,this.$request({method:"GET",url:"/interfaces",params:{searchval:this.searchVal,projectid:this.projectid,moduleid:this.moduleid,page:t,pagesize:10}}).then(function(a){e.data=a.data.rows,e.pagination=n.a.pager(e,e.pagination,{current:t,total:a.data.totals}),e.loading=!1}).catch(function(t){e.loading=!1})},handleTableChange:function(t){this.fetch(t.current)},onSearch:function(){this.fetch(1)},handleAddClick:function(){var t={pid:this.$route.query.pid,mid:this.$route.query.mid};this.$router.push({name:"interface_add",query:t})},handleCopy:function(t){this.$router.push({name:"interface_add",query:{id:t.mockid,iscopy:1}})},handleView:function(t){this.$router.push({name:"interface_postman",query:{id:t.mockid}})},handleEidt:function(t){this.$router.push({name:"interface_edit",query:{id:t.mockid}})},handleDelete:function(t){var e=this;this.$confirm({title:"提示",content:"确认删除些项数据?",onOk:function(){e.$request({method:"POST",url:"/interfaces/delete",data:{id:t.mockid}}).then(function(t){t&&(e.$message.success(t.message),e.fetch(1))})}})}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card",{attrs:{title:t.titleVal}},[a("div",{staticClass:"clearfix margin-bottom-15"},[a("div",{staticClass:"fl"},[a("v-input-search",{staticStyle:{width:"400px"},attrs:{size:"small",placeholder:"接口路径或名称",enterButton:""},on:{search:t.onSearch},model:{value:t.searchVal,callback:function(e){t.searchVal=e},expression:"searchVal"}})],1),t._v(" "),a("v-button",{staticClass:"fr",attrs:{type:"primary",size:"small"},on:{click:t.handleAddClick}},[t._v("新增")])],1),t._v(" "),a("v-table",{attrs:{columns:t.columns,dataSource:t.data,pagination:t.pagination,loading:t.loading,bordered:""},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"apitype",fn:function(e,a,n){return[t._v(t._s(t.apiTypeFun(a.api_type)))]}},{key:"apistatus",fn:function(e,n,i){return[a("v-tag",{attrs:{color:"0"==n.api_status?"red":"1"==n.api_status?"green":"2"==n.api_status?"blue":"orange"}},[t._v(t._s(t.apistatusFun(n.api_status)))])]}},{key:"operation",fn:function(e,n,i){return[a("div",{staticClass:"editable-row-operations"},[a("v-button-group",{attrs:{size:"small"}},[a("v-button",{on:{click:function(){return t.handleEidt(n)}}},[t._v("编辑")]),t._v(" "),a("v-button",{on:{click:function(){return t.handleDelete(n)}}},[t._v("删除")]),t._v(" "),a("v-button",{on:{click:function(){return t.handleCopy(n)}}},[t._v("复制")]),t._v(" "),a("v-button",{on:{click:function(){return t.handleView(n)}}},[t._v("查看")])],1)],1)]}}])})],1)],1)},staticRenderFns:[]};var o=a("VU/8")(i,r,!1,function(t){a("1HTt")},"data-v-410fce04",null);e.default=o.exports}});
//# sourceMappingURL=11.bccdd21ddd3faeb0a0f7.js.map