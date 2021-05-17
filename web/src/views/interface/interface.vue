<template>
  <div>
    <v-spin :spinning="importVisible" tip="批量导入接口...">
      <v-card :title="titleVal">
        <template slot="extra" v-if="isModel">
          <v-button-group size="small">
            <v-button type="primary" @click="handleDownTpl">
              <v-icon type="cloud-download"></v-icon>下载模板
            </v-button>
            <v-button type="primary" @click="handleSelectFile">
              <v-icon type="cloud-upload"></v-icon>批量导入接口
            </v-button>
          </v-button-group>
        </template>
        <div class="clearfix mb-15">
          <div class="fl">
            <v-input-search
              size="small"
              placeholder="接口路径或名称"
              style="width: 400px"
              @search="onSearch"
              enterButton
              v-model="searchVal"
            ></v-input-search>
          </div>
          <v-button type="primary" size="small" class="fr" @click="handleAddClick">新增</v-button>
        </div>
        <v-table
          :columns="columns"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          bordered
        >
          <template slot="apitype" slot-scope="text, record">{{apiTypeFun(record.api_type)}}</template>
          <template slot="apistatus" slot-scope="text, record">
            <v-tag
              :color="record.api_status == '0' ? 'red' : record.api_status == '1' ? 'green' : record.api_status == '2' ? 'blue' : 'orange'"
            >{{apistatusFun(record.api_status)}}</v-tag>
          </template>
          <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
              <v-button-group size="small">
                <v-button @click="() => handleEidt(record)">编辑</v-button>
                <v-button @click="() => handleDelete(record)">删除</v-button>
                <v-button @click="() => handleCopy(record)">复制</v-button>
                <v-button @click="() => handleView(record)">查看</v-button>
              </v-button-group>
            </div>
          </template>
        </v-table>
      </v-card>

      <iframe name="myIframe" style="display:none"></iframe>
      <input type="file" id="file" style="display:none" @change="importFile" />
    </v-spin>
  </div>
</template>

<script>
import Util from "@/libs/util";
import Excels from "@/libs/excel";
const apiTypeFun = type => {
  let _type = "";
  switch (type) {
    case "0":
      _type = "GET";
      break;
    case "1":
      _type = "PUT";
      break;
    case "2":
      _type = "POST";
      break;
    case "3":
      _type = "DELETE";
      break;
    case "4":
      _type = "OPTIONS";
      break;
    case "5":
      _type = "PATCH";
      break;
  }
  return _type;
};

const switchTypeFun = type => {
  let _type = "";
  switch (type) {
    case "GET":
      _type = "0";
      break;
    case "PUT":
      _type = "1";
      break;
    case "POST":
      _type = "2";
      break;
    case "DELETE":
      _type = "3";
      break;
    case "OPTIONS":
      _type = "4";
      break;
    case "PATCH":
      _type = "5";
      break;
  }
  return _type;
};
const apistatusFun = status => {
  let _status = "";
  switch (status) {
    case "0":
      _status = "废弃";
      break;
    case "1":
      _status = "已上线";
      break;
    case "2":
      _status = "开发中";
      break;
    case "3":
      _status = "测试中";
      break;
  }
  return _status;
};

const renderFileArr = (data, pid, mid) => {
  let _data = [];
  if (data[0].length == 0) return "1";
  if (data[1].length == 0) return "2";
  let isapiurl = false;
  data[0].forEach(itemone => {
    const reg = /^(?!\/)/;
    isapiurl = reg.test(itemone["接口地址"]);
    if (!isapiurl) return;
    let res = {
      projectid: pid,
      moduleid: mid,
      apiname: itemone["接口名称"],
      apiurl: itemone["接口地址"],
      apitype: switchTypeFun(itemone["请求类型"]),
      apidesc: "",
      apistatus: "2",
      sqlsentence: itemone["语句"],
      apiheaderdesc: "[]",
      apiparmsdesc: "[]",
      ismockjs: 0,
      apireqheader: "{}",
      apireqheaderdesc: "[]",
      apilazytime: 0
    };
    let apicontentdesc = [];
    data[1].forEach(itemtwo => {
      if (itemtwo["接口ID"] == itemone["接口ID"]) {
        apicontentdesc.push({
          name: itemtwo["返回键"],
          type: itemtwo["类型"],
          value: Util.replaceQuotes(itemtwo["返回值"]),
          desc: Util.replaceQuotes(itemtwo["说明"])
        });
      }
    });

    let apibodydesc = [];
    if (data[2].length) {
      data[2].forEach(itemthr => {
        if (itemthr["接口ID"] == itemone["接口ID"]) {
          apibodydesc.push({
            name: itemthr["参数名"],
            type: itemthr["类型"],
            must: itemthr["必填"],
            desc: Util.replaceQuotes(itemthr["说明"])
          });
        }
      });
    }

    if (data[3].length) {
      data[3].forEach(itemfou => {
        if (itemfou["接口ID"] == itemone["接口ID"]) {
          if (itemfou["响应数据"] != undefined && itemfou["响应数据"] != "") {
            res.apicontent = itemfou["响应数据"];
          } else {
            res.apicontent = JSON.stringify({
              status: 200,
              title: "ok",
              payload: []
            });
          }
        }
      });
    }

    if (res.apicontent == undefined) {
      res.apicontent = JSON.stringify({
        status: 200,
        title: "ok",
        payload: []
      });
    }

    res.apicontentdesc = JSON.stringify(apicontentdesc);
    res.apibodydesc = JSON.stringify(apibodydesc);
    _data.push(res);
  });
  if (!isapiurl) return "apiurl";
  return _data;
};
export default {
  name: "interface_index",
  data() {
    return {
      importFileAllVal: [],
      importVisible: false,

      isModel: false,
      titleVal: "全部接口",
      searchVal: "",
      data: [],
      pagination: { showQuickJumper: true },
      loading: false,
      columns: [
        {
          title: "编号",
          dataIndex: "mockid",
          width: "5%",
          align: "center"
        },
        {
          title: "接口名称",
          dataIndex: "api_name",
          align: "center"
        },
        {
          title: "接口地址",
          dataIndex: "api_url",
          align: "center"
        },
        {
          title: "请求类型",
          scopedSlots: { customRender: "apitype" },
          dataIndex: "api_type",
          align: "center"
        },
        {
          title: "项目名称",
          dataIndex: "projectname",
          align: "center"
        },
        {
          title: "模块名称",
          dataIndex: "modulename",
          align: "center"
        },
        {
          title: "接口状态",
          scopedSlots: { customRender: "apistatus" },
          dataIndex: "api_status",
          align: "center"
        },
        {
          title: "操作",
          width: "20%",
          scopedSlots: { customRender: "operation" },
          align: "center"
        }
      ]
    };
  },
  computed: {
    projectid() {
      return this.$route.query.pid;
    },
    moduleid() {
      return this.$route.query.mid;
    }
  },
  watch: {
    $route: {
      handler(route) {
        if (this.moduleid != undefined) {
          this.isModel = true;
          this.getInvolv();
        } else {
          this.isModel = false;
          this.titleVal = "全部接口";
        }
        this.fetch(1);
      },
      immediate: true
    }
  },
  methods: {
    apiTypeFun,
    apistatusFun,
    getInvolv() {
      this.$request({
        method: "GET",
        url: `/modules/involv/${this.moduleid}`
      }).then(res => {
        let _res = res.data[0];
        this.titleVal = `${_res.projectname} > ${_res.modulename} > 接口`;
      });
    },
    //获取表格数据   pageNum  当前请求的页码
    fetch(pageNum) {
      this.loading = true;
      this.$request({
        method: "GET",
        url: `/interfaces`,
        params: {
          searchval: this.searchVal,
          projectid: this.projectid,
          moduleid: this.moduleid,
          page: pageNum,
          pagesize: 10
        }
      })
        .then(res => {
          this.data = res.data.rows;
          this.pagination = Util.pager(this, this.pagination, {
            current: pageNum,
            total: res.data.totals
          });
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    //表格分页
    handleTableChange(p) {
      this.fetch(p.current);
    },
    //搜索
    onSearch() {
      this.fetch(1);
    },
    //新增
    handleAddClick() {
      let query = {
        pid: this.$route.query.pid,
        mid: this.$route.query.mid
      };
      this.$router.push({
        name: "interface_add",
        query
      });
    },
    //复制
    handleCopy(record) {
      this.$router.push({
        name: "interface_add",
        query: {
          id: record.mockid,
          iscopy: 1
        }
      });
    },
    //查看
    handleView(record) {
      this.$router.push({
        name: "interface_postman",
        query: {
          id: record.mockid
        }
      });
    },
    //编辑
    handleEidt(record) {
      this.$router.push({
        name: "interface_edit",
        query: {
          id: record.mockid
        }
      });
    },
    //删除
    handleDelete(record) {
      let _this = this;
      this.$confirm({
        title: "提示",
        content: "确认删除些项数据?",
        onOk() {
          _this
            .$request({
              method: "POST",
              url: "/interfaces/delete",
              data: {
                id: record.mockid
              }
            })
            .then(res => {
              if (res) {
                _this.$message.success(res.message);
                _this.fetch(1);
              }
            });
        }
      });
    },

    async importFile() {
      const el = document.getElementById("file");
      const file = el.files[0];
      const data = await Excels.importFromLocal(file);
      try {
        let arr = renderFileArr(data, this.projectid, this.moduleid);
        if (arr == "1") {
          this.$message.error("基础表不能为空");
        } else if (arr == "2") {
          this.$message.error("出参表不能为空");
        } else if (arr == "apiurl") {
          this.$message.error("接口地址第一个字符不能为“/”");
        } else {
          this.submitAddInterface(arr);
        }
      } catch (error) {
        alert(error);
      }
    },
    //提交批量接口
    async submitAddInterface(data) {
      this.importVisible = true;
      let res = await this.$request({
        method: "POST",
        url: "/interfaces/batchAdd",
        data: {
          allInterface: JSON.stringify(data)
        }
      });
      if (res.code == 200) {
        this.$message.success(res.message);
        this.fetch(1);
      } else {
        this.$error({
          title: "错误",
          content: res.message
        });
      }
      this.importVisible = false;
    },
    //下载模板
    handleDownTpl() {
      window.open(`/mockServe_interface_batch_tpl.xls`, "myIframe");
    },
    //导入excel
    handleSelectFile() {
      const el = document.getElementById("file");
      el.click();
    }
  }
};
</script>
<style lang="less" scoped>
</style>