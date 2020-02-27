<template>
  <div>
    <v-card :title="titleVal">
      <template slot="extra" v-if="isModel">
        <v-button-group size="small">
          <v-button type="primary" @click="handleDownTpl">
            <v-icon type="cloud-download"></v-icon>下载模板
          </v-button>
          <v-button type="primary" @click="handleShowFileModal">
            <v-icon type="cloud-upload"></v-icon>批量导入接口
          </v-button>
        </v-button-group>
      </template>
      <div class="clearfix margin-bottom-15">
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
        <template slot="apitype" slot-scope="text, record, index">{{apiTypeFun(record.api_type)}}</template>
        <template slot="apistatus" slot-scope="text, record, index">
          <v-tag
            :color="record.api_status == '0' ? 'red' : record.api_status == '1' ? 'green' : record.api_status == '2' ? 'blue' : 'orange'"
          >{{apistatusFun(record.api_status)}}</v-tag>
        </template>
        <template slot="operation" slot-scope="text, record, index">
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

    <v-modal
      title="批量导入接口"
      v-model="visibleFile"
      @cancel="handleCancelVisibleFile"
      @ok="handleOkVisibleFile"
    >
      <v-row class="vcu-form-item-required margin-bottom-20">
        <v-col :span="4" class="vcu-form-item-label">基础表：</v-col>
        <v-col :span="20">
          <v-button size="small" type="primary" @click="handleSelectFile('1')">导入</v-button>
          <span class="margin-left-10">{{filename.one}}</span>
        </v-col>
      </v-row>
      <v-row class="vcu-form-item-required margin-bottom-20">
        <v-col :span="4" class="vcu-form-item-label">出参表：</v-col>
        <v-col :span="20">
          <v-button size="small" type="primary" @click="handleSelectFile('2')">导入</v-button>
          <span class="margin-left-10">{{filename.two}}</span>
        </v-col>
      </v-row>
      <v-row class="vcu-form-item-required margin-bottom-20">
        <v-col :span="4">入参表：</v-col>
        <v-col :span="20">
          <v-button size="small" type="primary" @click="handleSelectFile('3')">导入</v-button>
          <span class="margin-left-10">{{filename.thr}}</span>
        </v-col>
      </v-row>
    </v-modal>

    <iframe name="myIframe" style="display:none"></iframe>
    <input type="file" id="file" style="display:none" @change="importFile" />
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
const renderFileArr = (data) => {
  let _data = [];
  

  return _data;
};
export default {
  name: "interface_index",
  data() {
    return {
      visibleFile: false,
      importFileType: "",
      filename: {
        one: "",
        two: "",
        thr: ""
      },
      fileVal: {
        one: [],
        tow: [],
        thr: []
      },
      importFileAllVal:[],

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
      switch(this.importFileType){
        case "1":
          this.filename.one = file.name;
          this.fileVal.one = data;
          break;

        case "2":
          this.filename.two = file.name;
          this.fileVal.two = data;
          break;

        case "3":
          this.filename.thr = file.name;
          this.fileVal.thr = data;
          break;
      }
    },
    //下载模板
    handleDownTpl() {
      window.open(`/mockServe_interface_tpl.xls`, "myIframe");
    },
    //导入excel
    handleSelectFile(type) {
      this.importFileType = type
      const el = document.getElementById("file");
      el.click();
    },
    //显示选择文件窗口
    handleShowFileModal() {
      this.visibleFile = true;
    },
    //批量导入接口窗口关闭
    handleCancelVisibleFile() {},
    //批量导入接口窗口确认
    handleOkVisibleFile() {}
  }
};
</script>
<style lang="less" scoped>
</style>