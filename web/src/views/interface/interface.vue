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
/* 
projectid: "4a6df4b0466611ea87a0b706f"
moduleid: 38
apiname: "常用工具"
apiurl: "api/outilsTree"
apitype: "2"
apidesc: ""
apistatus: "2"
apiheaderdesc: "[]"
apiparmsdesc: "[]"
apibodydesc: "[]"
apicontent: "{"status":200,"title":"ok","payload":[{"tabId":"14","data":[{"data":[{"name":"病人入院登记","id":"HIS13_ZYSF_BRRYDJ","useStatus":true,"keycode":"F2"},{"name":"病人入院取消","id":"HIS13_ZYSF_BRRYQX","useStatus":true,"keycode":"F5"},{"name":"住院病人信息修改","id":"HIS13_ZYSF_ZYBRXXXG","useStatus":false},{"name":"病人住院号修改","id":"HIS13_ZYSF_BRZYHXG","useStatus":false},{"name":"出院病人电话修改","id":"HIS13_ZYSF_CYBRDHXG","useStatus":false},{"name":"住院病人单病种操作","id":"HIS13_ZYSF_ZYBRDBZCZ","useStatus":false},{"name":"住院病人费别修改","id":"HIS13_ZYSF_ZYBRFBXG","useStatus":false},{"name":"入院中心预约管理","id":"HIS13_ZYSF_RYZXYYGL","useStatus":false}],"fnsId":"HIS13_ZYSF_ZYRCZGL","name":"住院入出转管理"},{"data":[{"name":"住院预交金收款","id":"HIS13_ZYSF_ZYSYJJ","useStatus":false},{"name":"住院预交金退款","id":"HIS13_ZYSF_ZYTYJJ","useStatus":false},{"name":"住院病人预交金催款","id":"HIS13_ZYSF_ZYBRYJJCK","useStatus":false},{"name":"住院病人预交金催款设置","id":"HIS13_ZYSF_ZYBRYJJCKSZ","useStatus":false},{"name":"住院代理收预交金","id":"HIS13_ZYSF_ZYDLSYJJ","useStatus":false},{"name":"住院代理退预交金","id":"HIS13_ZYSF_ZYDLTYJJ","useStatus":false},{"name":"住院预交金收款冲销","id":"HIS13_ZYSF_ZYYJJSKCX","useStatus":false},{"name":"住院预交金综合查询","id":"HIS13_ZYSF_ZYYJJZHCX","useStatus":false}],"fnsId":"HIS13_ZYSF_ZYYJJGL","name":"住院预交金管理"},{"data":[{"name":"住院病人出院结算","id":"HIS13_ZYSF_ZYBRCYJS","useStatus":false},{"name":"住院病人中途结算","id":"HIS13_ZYSF_ZYBRZTS","useStatus":false},{"name":"住院病人挂帐结算","id":"HIS13_ZYSF_ZYBRGZJS","useStatus":false},{"name":"住院病人综合操作","id":"HIS13_ZYSF_ZYBRZHCZ","useStatus":false},{"name":"住院病人挂帐处理","id":"HIS13_ZYSF_ZYBRGZCL","useStatus":false},{"name":"婴儿挂账留院结算","id":"HIS13_ZYSF_YEGZLYJS","useStatus":false},{"name":"住院费用折扣处理","id":"HIS13_ZYSF_ZYFYZKCL","useStatus":false},{"name":"统一支付综合查询平台","id":"HIS13_ZYSF_TYCFZHCXPT","useStatus":false},{"name":"榕医通平台综合查询","id":"HIS13_ZYSF_RYTPTZHCX","useStatus":false}],"fnsId":"HIS13_ZYSF_ZYSFJSGL","name":"住院收费结算管理"},{"data":[{"name":"医保病人信息查询","id":"HIS13_ZYSF_YBBRXXCX","useStatus":false},{"name":"医保病人费用预结算","id":"HIS13_ZYSF_YBBRFYYJS","useStatus":false},{"name":"医保单方面冲销","id":"HIS13_ZYSF_YBDFMCX","useStatus":false},{"name":"医保病人年度结算","id":"HIS13_ZYSF_YBBRNDJS","useStatus":false},{"name":"出院病人医保费用补发送","id":"HIS13_ZYSF_CYBRYBFYBFS","useStatus":false},{"name":"医保日清单发送","id":"HIS13_ZYSF_YBRQDFS","useStatus":false},{"name":"新生儿医保信息补传","id":"HIS13_ZYSF_XSEYBXXBC","useStatus":false},{"name":"出院病人医保应急发送","id":"HIS13_ZYSF_CYBRYBYJFS","useStatus":false}],"fnsId":"HIS13_ZYSF_ZYYBGL","name":"住院医保管理"},{"data":[{"name":"住院收费员结账","id":"HIS13_ZYSF_ZYSFYJZ","useStatus":false},{"name":"住院收费员结账查询","id":"HIS13_ZYSF_ZYSFYJZCX","useStatus":false},{"name":"住院收费员结账审核","id":"HIS13_ZYSF_ZYSFYJZSH","useStatus":false},{"name":"住院票据当前号作废","id":"HIS13_ZYSF_ZYPJDQHZF","useStatus":false},{"name":"收费员代理转交","id":"HIS13_ZYSF_SFYDLZJ","useStatus":false},{"name":"收费员代理结转","id":"HIS13_ZYSF_SFYDLJZ","useStatus":false},{"name":"住院代理人设置","id":"HIS13_ZYSF_SFYDLRSZ","useStatus":false},{"name":"住院票据领用管理","id":"HIS13_ZYSF_ZYPJLYGL","useStatus":false},{"name":"收费员现金收入审核表","id":"HIS13_ZYSF_SFYXJSRSHB","useStatus":false},{"name":"住院预交金余额核对表","id":"HIS13_ZYSF_ZYYJJYEHDB","useStatus":false},{"name":"全院收费员缴款收入统计","id":"HIS13_ZYSF_QYSFYJKSRTJ","useStatus":false},{"name":"收费员挂账结清处理","id":"HIS13_ZYSF_SFYGZJQCL","useStatus":false},{"name":"住院发票综合查询","id":"HIS13_ZYSF_ZYFPZHCX","useStatus":false},{"name":"住院票据使用情况查询","id":"HIS13_ZYSF_ZYPJSYQKCX","useStatus":false},{"name":"住院航天发票综合操作","id":"HIS13_ZYSF_ZYHTFPZHCZ","useStatus":false},{"name":"收费员综合查询","id":"HIS13_ZYSF_SFYZHCX","useStatus":false}],"fnsId":"HIS13_ZYSF_ZYSFYGL","name":"住院收费员管理"},{"data":[{"name":"住院审批欠费人员设置","id":"HIS13_ZYSF_ZYSPQFRYSZ","useStatus":false},{"name":"住院担保与欠费设置","id":"HIS13_ZYSF_ZYDBYQFSZ","useStatus":false},{"name":"住院医保明细项目发送维护","id":"HIS13_ZYSF_ZYTBMXXMFSWH","useStatus":false},{"name":"住院票据号互换","id":"HIS13_ZYSF_ZYPJHHH","useStatus":false},{"name":"院内支付明细维护","id":"HIS13_ZYSF_YNZFMXWH","useStatus":false}],"fnsId":"HIS13_ZYSF_XTWH","name":"系统维护"},{"data":[{"name":"住院病人综合查询","id":"HIS13_ZYSF_ZYBRZHCX","useStatus":false},{"name":"历史病人综合查询","id":"HIS13_ZYSF_LSBRZHCX","useStatus":false},{"name":"医保病人综合查询","id":"HIS13_ZYSF_YBBRZHCX","useStatus":false},{"name":"住院日清单综合查询","id":"HIS13_ZYSF_ZYRQDZHCX","useStatus":false},{"name":"住院医保病人结算报表","id":"HIS13_ZYSF_ZYYBBRJSBB","useStatus":false},{"name":"住院收入汇总报表","id":"HIS13_ZYSF_ZYSRHZBB","useStatus":false},{"name":"住院科室收入报表","id":"HIS13_ZYSF_ZYKSSRBB","useStatus":false},{"name":"住院结算收入汇总报表","id":"HIS13_ZYSF_ZYJSSRHZBB","useStatus":false},{"name":"住院医保结算汇总报表","id":"HIS13_ZYSF_ZYYBJSHZBB","useStatus":false},{"name":"住院预交金退出统计","id":"HIS13_ZYSF_ZYYJJTCTJ","useStatus":false},{"name":"住院收费员缴款报表","id":"HIS13_ZYSF_ZYSFYJKBB","useStatus":false},{"name":"住院结算收入报表","id":"HIS13_ZYSF_ZYJSSRBB","useStatus":false},{"name":"住院病区科室结算收入报表","id":"HIS13_ZYSF_ZYBQKSJSSRBB","useStatus":false},{"name":"住院科室结算收入报表","id":"HIS13_ZYSF_ZJKSJSSRBB","useStatus":false},{"name":"住院科室项目统计","id":"HIS13_ZYSF_ZYKSXMTJ","useStatus":false},{"name":"住院病人费用明细账","id":"HIS13_ZYSF_ZYBRFYMXZ","useStatus":false}],"fnsId":"HIS13_ZYSF_TJCX","name":"统计查询"},{"data":[{"name":"电子病历病案首页上传","id":"HIS13_ZYSF_DZBLBASYSC","useStatus":false},{"name":"住院C-DRG病案数据上传","id":"HIS13_ZYSF_ZYC-DRGBASJSC","useStatus":false},{"name":"住院病案首页信息维护","id":"HIS13_ZYSF_ZYBASYXXWH","useStatus":false}],"fnsId":"HIS13_ZYSF_BASYGL","name":"住院病案管理"}],"name":"HIS13住院收费系统"},{"tabId":"5","data":[{"data":[{"name":"住院病人综合查询","id":"HIS13_ZYSF_ZYBRZHCX1","useStatus":true,"keycode":"F4"},{"name":"历史病人综合查询","id":"HIS13_ZYSF_LSBRZHCX1","useStatus":false},{"name":"医保病人综合查询","id":"HIS13_ZYSF_YBBRZHCX1","useStatus":false},{"name":"住院日清单综合查询","id":"HIS13_ZYSF_ZYRQDZHCX1","useStatus":false},{"name":"住院医保病人结算报表","id":"HIS13_ZYSF_ZYYBBRJSBB1","useStatus":false},{"name":"住院收入汇总报表","id":"HIS13_ZYSF_ZYSRHZBB1","useStatus":false},{"name":"住院科室收入报表","id":"HIS13_ZYSF_ZYKSSRBB1","useStatus":false},{"name":"住院结算收入汇总报表","id":"HIS13_ZYSF_ZYJSSRHZBB1","useStatus":false},{"name":"住院医保结算汇总报表","id":"HIS13_ZYSF_ZYYBJSHZBB1","useStatus":false},{"name":"住院预交金退出统计","id":"HIS13_ZYSF_ZYYJJTCTJ1","useStatus":false},{"name":"住院收费员缴款报表","id":"HIS13_ZYSF_ZYSFYJKBB1","useStatus":false},{"name":"住院结算收入报表","id":"HIS13_ZYSF_ZYJSSRBB1","useStatus":false},{"name":"住院病区科室结算收入报表","id":"HIS13_ZYSF_ZYBQKSJSSRBB1","useStatus":false},{"name":"住院科室结算收入报表","id":"HIS13_ZYSF_ZJKSJSSRBB1","useStatus":false},{"name":"住院科室项目统计","id":"HIS13_ZYSF_ZYKSXMTJ1","useStatus":false},{"name":"住院病人费用明细账","id":"HIS13_ZYSF_ZYBRFYMXZ1","useStatus":false}],"fnsId":"HIS13_ZYSF_TJCX1","name":"统计查询"}],"name":"住院收费管理系统"}]}"
apicontentdesc: "[{"name":"a","type":"Int","value":"as","desc":"as"}]"
ismockjs: 0
apireqheader: "{}"
apireqheaderdesc: "[]"
apilazytime: 0 */

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
          value: itemtwo["返回值"],
          desc: itemtwo["说明"]
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
            desc: itemthr["说明"]
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