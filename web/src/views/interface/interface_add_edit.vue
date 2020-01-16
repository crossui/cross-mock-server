<template>
  <v-spin :spinning="spinning">
    <div class="card-container">
      <v-tabs type="card" v-model="selectTab" @change="onTabsChange">
        <v-tab-pane tab="基本信息" key="1">
          <v-form
            ref="formValidate1"
            :model="formValidate1"
            :rules="ruleValidate1"
            :label-width="100"
          >
            <v-form-item label="所属项目" prop="projectid">
              <v-select
                style="width: 420px"
                @change="handleChangeProject"
                v-model="formValidate1.projectid"
              >
                <template v-for="item in optionsProject">
                  <v-select-option :value="item.pid">{{item.projectname}}</v-select-option>
                </template>
              </v-select>
            </v-form-item>
            <v-form-item label="所属模块" prop="moduleid">
              <v-select
                style="width: 420px"
                @change="handleChangeModule"
                v-model="formValidate1.moduleid"
              >
                <template v-for="item in optionsModule">
                  <v-select-option :value="item.mid">{{item.modulename}}</v-select-option>
                </template>
              </v-select>
            </v-form-item>
            <v-form-item label="请求类型" prop="apitype">
              <v-select
                style="width: 420px"
                v-model="formValidate1.apitype"
                :options="optionsApiType"
              ></v-select>
            </v-form-item>
            <v-form-item label="接口名称" prop="apiname">
              <v-input
                type="text"
                v-model="formValidate1.apiname"
                style="width: 420px"
                placeholder="请输入接口名称"
              />
            </v-form-item>
            <v-form-item label="接口地址" prop="apiurl">
              <v-input
                type="text"
                v-model="formValidate1.apiurl"
                placeholder="接口地址（如：/api/user 或 /api/:id）"
              />
            </v-form-item>
            <v-form-item label="接口描述" prop="apidesc">
              <v-textarea :rows="4" v-model="formValidate1.apidesc" placeholder="请输入接口描述" />
            </v-form-item>
            <v-form-item label>
              <v-button type="primary" @click="handleNextTabs('2')">下一步</v-button>
            </v-form-item>
          </v-form>
        </v-tab-pane>

        <v-tab-pane tab="请求参数设置" key="2">
          <v-form ref="formValidate2" :model="formValidate2" :label-width="100">
            <v-form-item label="Header参数说明">
              <div class="clearfix margin-bottom-5">
                <v-button
                  size="small"
                  class="editable-add-btn fr"
                  type="primary"
                  @click="handleClickInModal('header')"
                >新增</v-button>
              </div>
              <v-table
                bordered
                size="middle"
                :columns="incolumns"
                :dataSource="headerData"
                :pagination="false"
                :scroll="{y: 240 }"
              >
                <template slot="operation" slot-scope="text, record, index">
                  <div class="editable-row-operations">
                    <v-button-group size="small">
                      <v-button @click="() => handleEidtIn('header',record,index)">编辑</v-button>
                      <v-button @click="() => handleDeleteIn('header',record,index)">删除</v-button>
                    </v-button-group>
                  </div>
                </template>
              </v-table>
            </v-form-item>
            <v-form-item label="Get参数说明">
              <div class="clearfix margin-bottom-5">
                <v-button
                  size="small"
                  class="editable-add-btn fr"
                  type="primary"
                  @click="handleClickInModal('get')"
                >新增</v-button>
              </div>
              <v-table
                bordered
                size="middle"
                :columns="incolumns"
                :dataSource="getData"
                :pagination="false"
                :scroll="{y: 240 }"
              >
                <template slot="operation" slot-scope="text, record, index">
                  <div class="editable-row-operations">
                    <v-button-group size="small">
                      <v-button @click="() => handleEidtIn('get',record,index)">编辑</v-button>
                      <v-button @click="() => handleDeleteIn('get',record,index)">删除</v-button>
                    </v-button-group>
                  </div>
                </template>
              </v-table>
            </v-form-item>
            <v-form-item label="body参数说明">
              <div class="clearfix margin-bottom-5">
                <v-button
                  size="small"
                  class="editable-add-btn fr"
                  type="primary"
                  @click="handleClickInModal('body')"
                >新增</v-button>
              </div>
              <v-table
                bordered
                size="middle"
                :columns="incolumns"
                :dataSource="bodyData"
                :pagination="false"
                :scroll="{y: 240 }"
              >
                <template slot="operation" slot-scope="text, record, index">
                  <div class="editable-row-operations">
                    <v-button-group size="small">
                      <v-button @click="() => handleEidtIn('body',record,index)">编辑</v-button>
                      <v-button @click="() => handleDeleteIn('body',record,index)">删除</v-button>
                    </v-button-group>
                  </div>
                </template>
              </v-table>
            </v-form-item>
            <v-form-item label>
              <v-button type="primary" @click="handleNextTabs('3')">下一步</v-button>
            </v-form-item>
          </v-form>
        </v-tab-pane>
        <v-tab-pane tab="响应参数设置" key="3">
          <v-form ref="formValidate3" :model="formValidate3" :label-width="150">
            <v-form-item label="响应Header参数说明">
              <div class="clearfix margin-bottom-5">
                <v-button
                  size="small"
                  class="editable-add-btn fr"
                  type="primary"
                  @click="handleAddRespondHeader"
                >新增</v-button>
              </div>
              <v-table
                bordered
                size="middle"
                :columns="outcolumns"
                :dataSource="respondHeaderData"
                :pagination="false"
                :scroll="{y: 240 }"
              >
                <template slot="operation" slot-scope="text, record, index">
                  <div class="editable-row-operations">
                    <v-button-group size="small">
                      <v-button @click="() => handleEidtRespond(record)">编辑</v-button>
                      <v-button @click="() => handleDeleteRespond(record)">删除</v-button>
                    </v-button-group>
                  </div>
                </template>
              </v-table>
            </v-form-item>
            <v-form-item label="header响应数据">
              <div id="jsoneditorHeader"></div>
            </v-form-item>
            <v-form-item label="响应参数说明" class="vcu-form-item-required">
              <div class="clearfix margin-bottom-5">
                <v-button
                  size="small"
                  class="editable-add-btn fr"
                  type="primary"
                  @click="handleAddRespondJson"
                >新增</v-button>
              </div>
              <v-table
                bordered
                size="middle"
                :columns="outcolumns"
                :dataSource="respondJsonData"
                :pagination="false"
                :scroll="{y: 240 }"
              >
                <template slot="operation" slot-scope="text, record, index">
                  <div class="editable-row-operations">
                    <v-button-group size="small">
                      <v-button @click="() => handleEidtRespond(record)">编辑</v-button>
                      <v-button @click="() => handleDeleteRespond(record)">删除</v-button>
                    </v-button-group>
                  </div>
                </template>
              </v-table>
            </v-form-item>
            <v-form-item label="响应数据" class="vcu-form-item-required">
              <div id="jsoneditorRespond" class></div>
            </v-form-item>
            <v-form-item label="开启mockjs" props="ismock">
              <v-radio-group v-model="formValidate3.ismock">
                <v-radio value="0">开启</v-radio>
                <v-radio value="1">关闭</v-radio>
              </v-radio-group>
            </v-form-item>
            <v-form-item label="延迟返回数据" props="lazytime">
              <v-input-number :min="0" :max="100000" v-model="formValidate3.lazytime"></v-input-number>秒
            </v-form-item>
            <v-form-item label>
              <v-button type="primary" @click="handleSubmit">保 存</v-button>
            </v-form-item>
          </v-form>
        </v-tab-pane>
      </v-tabs>

      <v-modal v-model="invisible" title="参数说明" :maskClosable="false">
        <template slot="footer">
          <v-button key="back" @click="handleCancelInModal">取消</v-button>
          <v-button key="next" type="primary" @click="handleInModal(false)">下一条</v-button>
          <v-button key="submit" type="primary" @click="handleInModal(true)">完成</v-button>
        </template>
        <v-form ref="formInModal" :model="formInModal" :rules="ruleInModal" :label-width="60">
          <v-form-item label="参数名" prop="name">
            <v-input type="text" v-model="formInModal.name" />
          </v-form-item>
          <v-form-item label="类型" prop="type">
            <v-select style="width: 200px" v-model="formInModal.type" :options="dataType"></v-select>
          </v-form-item>
          <v-form-item label="必填" prop="must">
            <v-radio-group name="radioGroup" v-model="formInModal.must">
              <v-radio value="Yes">Yes</v-radio>
              <v-radio value="No">No</v-radio>
            </v-radio-group>
          </v-form-item>
          <v-form-item label="说明" prop="desc">
            <v-textarea :rows="6" v-model="formInModal.desc"></v-textarea>
          </v-form-item>
        </v-form>
      </v-modal>
    </div>
  </v-spin>
</template>

<script>
import jsoneditor from "jsoneditor";
/////
import FileReader from "filereader";
const dataType = [
  {
    label: "Int",
    value: "Int"
  },
  {
    label: "String",
    value: "String"
  },
  {
    label: "JSONObject",
    value: "JSONObject"
  },
  {
    label: "Boolean",
    value: "Boolean"
  },
  {
    label: "BigDecimal",
    value: "BigDecimal"
  },
  {
    label: "Array",
    value: "Array"
  },
  {
    label: "Float",
    value: "Float"
  },
  {
    label: "Double",
    value: "Double"
  },
  {
    label: "Char",
    value: "Char"
  }
];
const optionsApiType = [
  {
    label: "GET",
    value: "0"
  },
  {
    label: "PUT",
    value: "1"
  },
  {
    label: "POST",
    value: "2"
  },
  {
    label: "DELETE",
    value: "3"
  },
  {
    label: "OPTIONS",
    value: "4"
  },
  {
    label: "PATCH",
    value: "5"
  }
];
const incolumns = [
  {
    title: "参数名",
    dataIndex: "name",
    width: "20%",
    align: "center"
  },
  {
    title: "类型",
    dataIndex: "type",
    width: "20%",
    align: "center"
  },
  {
    title: "必填",
    dataIndex: "must",
    width: "20%",
    align: "center"
  },
  {
    title: "说明",
    dataIndex: "desc",
    width: "20%",
    align: "center"
  },
  {
    title: "操作",
    width: "20%",
    scopedSlots: { customRender: "operation" },
    align: "center"
  }
];

const outcolumns = [
  {
    title: "返回键",
    dataIndex: "key",
    width: "20%",
    align: "center"
  },
  {
    title: "类型",
    dataIndex: "type",
    width: "20%",
    align: "center"
  },
  {
    title: "返回值",
    dataIndex: "value",
    width: "20%",
    align: "center"
  },
  {
    title: "说明",
    dataIndex: "desc",
    width: "20%",
    align: "center"
  },
  {
    title: "操作",
    width: "20%",
    scopedSlots: { customRender: "operation" },
    align: "center"
  }
];
export default {
  name: "interface_add_edit",
  data() {
    return {
      spinning: false,
      selectTab: "1",
      formValidate1: {
        projectid: "",
        moduleid: "",
        apitype: "",
        apiname: "",
        apiurl: "",
        apidesc: ""
      },
      ruleValidate1: {
        projectid: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        moduleid: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        apitype: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        apiname: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" }
        ],
        apiurl: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" }
        ]
      },
      optionsProject: [],
      optionsModule: [],
      optionsApiType,

      formValidate2: {
        headerVal: "",
        getVal: "",
        bodyVal: ""
      },
      incolumns,
      inJsonHeader: [],
      inJsonGet: [],
      inJsonBody: [],
      headerData: [],
      getData: [],
      bodyData: [],

      formValidate3: {
        ismock: "0",
        lazytime: 0
      },
      outcolumns,
      respondHeaderData: [],
      respondJsonData: [],
      jsoneditorHeader: null,
      jsoneditorRespond: null,
      fileList: [],
      istab: true,

      inModalType: "",
      invisible: false,
      formInModal: {
        name: "",
        type: "",
        must: "No",
        desc: ""
      },
      dataType,
      ruleInModal: {
        name: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" }
        ],
        type: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        must: [
          {
            required: true
          }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.spinning = true;
      let resProject = await this.getProject();
      this.checkLength(resProject);
      this.optionsProject = resProject;
      this.spinning = false;
    },
    async getProject() {
      let res = await this.$request({
        method: "GET",
        url: `/projects/all`
      });
      return res.data;
    },
    async getModule(id) {
      let res = await this.$request({
        method: "GET",
        url: `/modules/all/${id}`
      });
      return res.data;
    },
    checkLength(res) {
      let _this = this;
      if (res.length == 0) {
        this.$confirm({
          title: "提示",
          content: "还没有项目或模块是否添加",
          onOk() {
            _this.$router.push({
              name: "project_index"
            });
          }
        });
        return false;
      }
    },
    //生成Jsoneditor
    renderJsoneditor() {
      if (this.jsoneditorHeader && this.jsoneditorRespond) return;
      let containerHeader = document.getElementById("jsoneditorHeader");
      let containerRespond = document.getElementById("jsoneditorRespond");
      let options = {
        modes: ["code", "form", "text", "tree", "view", "preview"]
      };
      this.jsoneditorHeader = new jsoneditor(containerHeader, options);
      this.jsoneditorRespond = new jsoneditor(containerRespond, options);
    },
    //切换面板的回调
    onTabsChange(activeKey) {
      if (activeKey == "3") {
        this.$nextTick(() => {
          this.renderJsoneditor();
        });
      }
    },
    //手动下一步
    handleNextTabs(p) {
      if (p == "2") {
        this.validateOne();
      } else if (p == "3") {
        this.validateTwo();
      }
      if (this.istab) this.selectTab = p;
    },
    //验证第一步
    validateOne() {
      this.$refs["formValidate1"].validate(valid => {
        if (valid) {
          this.istab = true;
        } else {
          this.$message.error("验证失败!");
          this.istab = false;
        }
      });
    },
    //验证第二步
    validateTwo() {},
    //验证第三步
    validateThr() {},
    //项目change
    async handleChangeProject(val) {
      this.spinning = true;
      this.formValidate1.moduleid = "";
      let res = await this.getModule(val);
      this.checkLength(res);
      this.optionsModule = res;
      this.spinning = false;
    },
    handleChangeModule() {},

    handleAddRespondHeader() {},
    handleAddRespondJson() {},
    handleSubmit() {},
    //显示入参窗口
    handleClickInModal(type) {
      this.inJsonHeader = [];
      this.inJsonGet = [];
      this.inJsonBody = [];
      this.inModalType = type;
      this.$nextTick(() => {
        this.invisible = true;
      });
    },
    //入参取消窗口
    handleCancelInModal() {
      this.$refs["formInModal"].resetFields();
      this.invisible = false;
    },
    //入参下一步、完成窗口
    handleInModal(b) {
      this.$refs["formInModal"].validate(valid => {
        if (valid) {
          let _data = {
            name: this.formInModal.name,
            type: this.formInModal.type,
            must: this.formInModal.must,
            desc: this.formInModal.desc
          };
          switch (this.inModalType) {
            case "header":
              this.inJsonHeader.push(_data);
              break;
            case "get":
              this.inJsonGet.push(_data);
              break;
            case "body":
              this.inJsonBody.push(_data);
              break;
          }
          if (b) {
            switch (this.inModalType) {
              case "header":
                this.headerData = this.inJsonHeader;
                break;
              case "get":
                this.getData = this.inJsonGet;
                break;
              case "body":
                this.bodyData = this.inJsonBody;
                break;
            }
            this.handleCancelInModal();
          }else{
            this.$refs["formInModal"].resetFields();
          }
        } else {
          this.$message.error("验证失败!");
        }
      });
    },
    //入参编辑
    handleEidtIn(type,record,index){

    },
    //入参删除
    handleDeleteIn(type,record,index){
      
    },
  }
};
</script>
<style lang="less">
@import url("jsoneditor/dist/jsoneditor.min.css");
.card-container {
  .vcu-tabs-card {
    .vcu-tabs-content {
      min-height: 120px;
      margin-top: -16px;
      .vcu-tabs-tabpane {
        background: #fff;
        padding: 16px;
      }
    }
    .vcu-tabs-bar {
      border-color: #fff;
      .vcu-tabs-tab {
        border-color: transparent;
        background: transparent;
      }
      .vcu-tabs-tab-active {
        border-color: #fff;
        background: #fff;
      }
    }
  }
}
</style>