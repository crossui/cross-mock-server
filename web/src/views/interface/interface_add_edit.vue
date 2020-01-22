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
              <v-tree-select
                style="width: 420px"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="optionsModule"
                treeDefaultExpandAll
                labelInValue
                v-model="formValidate1.moduleid"
              ></v-tree-select>
            </v-form-item>
            <v-form-item label="请求类型" prop="apitype">
              <v-select
                style="width: 420px"
                v-model="formValidate1.apitype"
                :options="optionsApiType"
              ></v-select>
            </v-form-item>
            <v-form-item label="状态" prop="apistatus">
              <v-select
                style="width: 420px"
                v-model="formValidate1.apistatus"
                :options="optionsApiStatus"
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
                addonBefore="/"
                v-model="formValidate1.apiurl"
                placeholder="接口地址（如：api/user 或 api/:id）"
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
                :dataSource="formValidate2.headerVal"
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
                :dataSource="formValidate2.getVal"
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
                :dataSource="formValidate2.bodyVal"
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
          <v-form
            ref="formValidate3"
            :model="formValidate3"
            :rules="ruleValidateCheck3"
            :label-width="150"
          >
            <v-form-item label="响应Header参数说明">
              <div class="clearfix margin-bottom-5">
                <v-button
                  size="small"
                  class="editable-add-btn fr"
                  type="primary"
                  @click="handleRespondModal('header')"
                >新增</v-button>
              </div>
              <v-table
                bordered
                size="middle"
                :columns="outcolumns"
                :dataSource="formValidate3.headerVal"
                :pagination="false"
                :scroll="{y: 240 }"
              >
                <template slot="operation" slot-scope="text, record, index">
                  <div class="editable-row-operations">
                    <v-button-group size="small">
                      <v-button @click="() => handleEidtRespond('header',record,index)">编辑</v-button>
                      <v-button @click="() => handleDeleteRespond('header',record,index)">删除</v-button>
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
                  @click="handleRespondModal('respond')"
                >新增</v-button>
              </div>
              <v-table
                bordered
                size="middle"
                :columns="outcolumns"
                :dataSource="formValidate3.respondVal"
                :pagination="false"
                :scroll="{y: 240 }"
              >
                <template slot="operation" slot-scope="text, record, index">
                  <div class="editable-row-operations">
                    <v-button-group size="small">
                      <v-button @click="() => handleEidtRespond('respond',record,index)">编辑</v-button>
                      <v-button @click="() => handleDeleteRespond('respond',record,index)">删除</v-button>
                    </v-button-group>
                  </div>
                </template>
              </v-table>
              <div
                class="vcu-form-item-error-tip"
                v-if="formValidate3.respondVal.length==0 && roleValidate3"
              >不能为空</div>
            </v-form-item>
            <v-form-item label="响应数据" class="vcu-form-item-required">
              <div id="jsoneditorRespond" class></div>
              <div
                class="vcu-form-item-error-tip"
                v-if="respondJsonValidate && roleValidate3"
              >不能为空,或JSON格式有错误</div>
            </v-form-item>
            <v-form-item label="返回状态码" prop="rcode">
              <v-input v-model="formValidate3.rcode" style="width:200px"></v-input>
            </v-form-item>
            <v-form-item label="开启mockjs" prop="ismock">
              <v-radio-group v-model="formValidate3.ismock">
                <v-radio value="0">开启</v-radio>
                <v-radio value="1">关闭</v-radio>
              </v-radio-group>
            </v-form-item>
            <v-form-item label="延迟返回数据" prop="lazytime">
              <v-input-number :min="0" :max="100000" v-model="formValidate3.lazytime"></v-input-number>秒
            </v-form-item>
            <v-form-item label>
              <v-button type="primary" @click="handleSubmit">保 存</v-button>
            </v-form-item>
          </v-form>
        </v-tab-pane>
      </v-tabs>

      <v-modal v-model="invisible" title="参数说明" :maskClosable="false" @cancel="handleCancelInModal">
        <template slot="footer">
          <v-button key="back" @click="handleCancelInModal">取消</v-button>
          <v-button key="next" type="primary" @click="handleInModal(false)" v-if="inModalNext">下一条</v-button>
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

      <v-modal
        v-model="revisible"
        title="响应参数说明"
        :maskClosable="false"
        @cancel="handleCancelReModal"
      >
        <template slot="footer">
          <v-button key="back" @click="handleCancelReModal">取消</v-button>
          <v-button
            key="next"
            type="primary"
            @click="handleRespondSubmit(false)"
            v-if="reModalNext"
          >下一条</v-button>
          <v-button key="submit" type="primary" @click="handleRespondSubmit(true)">完成</v-button>
        </template>
        <v-form ref="formReModal" :model="formReModal" :rules="ruleReModal" :label-width="60">
          <v-form-item label="返回键" prop="name">
            <v-input type="text" v-model="formReModal.name" />
          </v-form-item>
          <v-form-item label="类型" prop="type">
            <v-select style="width: 200px" v-model="formReModal.type" :options="dataType"></v-select>
          </v-form-item>
          <v-form-item label="返回值" prop="value">
            <v-input type="text" v-model="formReModal.value" />
          </v-form-item>
          <v-form-item label="说明" prop="desc">
            <v-textarea :rows="6" v-model="formReModal.desc"></v-textarea>
          </v-form-item>
        </v-form>
      </v-modal>
    </div>
  </v-spin>
</template>

<script>
import Util from "@/libs/util";
import jsoneditor from "jsoneditor";
/////
//import FileReader from "filereader";
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
const optionsApiStatus = [
  {
    label: "废弃",
    value: "0"
  },
  {
    label: "已上线",
    value: "1"
  },
  {
    label: "开发中",
    value: "2"
  },
  {
    label: "测试中",
    value: "3"
  }
];
const outcolumns = [
  {
    title: "返回键",
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

const convertToTreeData = (data, pid) => {
  let result = [],
    temp;
  for (let i = 0; i < data.length; i++) {
    if (data[i].pmid === pid) {
      let obj = {
        label: data[i].modulename,
        key: data[i].mid.toString(),
        value: data[i].mid.toString()
      };
      temp = convertToTreeData(data, data[i].mid);
      if (temp.length > 0) {
        obj.children = temp;
      }
      result.push(obj);
    }
  }

  return result;
};
export default {
  data() {
    return {
      spinning: false,
      selectTab: "1",
      mockId: null,
      formValidate1: {
        projectid: "",
        moduleid: undefined,
        apitype: "",
        apiname: "",
        apiurl: "",
        apidesc: "",
        apistatus: "2"
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
        apistatus: [
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
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" },
          { pattern: /^(?!\/)/, message: "第一个字符不能为“/”" }
        ]
      },
      optionsProject: [],
      optionsModule: [],
      optionsApiType,
      optionsApiStatus,

      formValidate2: {
        headerVal: [],
        getVal: [],
        bodyVal: []
      },
      incolumns,
      inJsonHeader: [],
      inJsonGet: [],
      inJsonBody: [],

      formValidate3: {
        headerVal: [],
        respondVal: [],
        headerJson: null,
        respondJson: null,
        ismock: "0",
        lazytime: 0,
        rcode: "200"
      },
      ruleValidateCheck3: {
        ismock: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        lazytime: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        rcode: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" }
        ]
      },
      roleValidate3: false,
      respondJsonValidate: false,
      outcolumns,
      jsoneditorHeader: null,
      jsoneditorRespond: null,
      reJsonHeader: [],
      reJsonRespond: [],
      errorsHeader: "",
      errorsRespond: "",

      inModalType: "",
      inModalNext: true,
      invisible: false,
      inModalIndex: null,
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
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: "只允许英文、数字"
          }
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
      },

      reModalType: "",
      reModalNext: true,
      revisible: false,
      reModalIndex: null,
      formReModal: {
        name: "",
        type: "",
        value: "",
        desc: ""
      },
      ruleReModal: {
        name: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: "只允许英文、数字"
          }
        ],
        type: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        value: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" }
        ]
      }
    };
  },
  computed: {
    apiQueryID() {
      return this.$route.query.id;
    },
    apiPageType() {
      return this.$route.name == "interface_edit" ? false : true;
    },
    apiPageIsCopy() {
      return this.$route.query.iscopy;
    },
    addprojectid() {
      return this.$route.query.pid;
    },
    addmoduleid() {
      return this.$route.query.mid;
    }
  },
  mounted() {
    /* console.info(this.$) */
    this.init();
  },
  methods: {
    async init() {
      this.spinning = true;
      let resProject = await this.getProject();
      this.checkLength(resProject);
      this.optionsProject = resProject;
      if (this.apiPageType == false || this.apiPageIsCopy) {
        // 先根据MOCKID请求
        let res = await this.getMockIdData();
        // 请求模块列表
        let redModule = await this.getModule(res[0].projectid);
        this.optionsModule = convertToTreeData(redModule, 0);
        this.assingValue(res[0]);
      }
      if (this.addprojectid && this.addmoduleid) {
        this.formValidate1.projectid = this.addprojectid;
        // 请求模块列表
        let redModule = await this.getModule(this.addprojectid);
        this.optionsModule = convertToTreeData(redModule, 0);
        this.formValidate1.moduleid = { value: this.addmoduleid.toString() };
      }
      this.spinning = false;
    },
    async getMockIdData() {
      let res = await this.$request({
        method: "GET",
        url: `/interfaces/mockid/${this.$route.query.id}`
      });
      return res.data;
    },
    //赋值
    assingValue(res) {
      this.mockId = res.mockid;
      this.formValidate1.projectid = res.projectid;
      this.formValidate1.moduleid = { value: res.moduleid.toString() };
      this.formValidate1.apitype = res.api_type;
      this.formValidate1.apiname = res.api_name;
      this.formValidate1.apiurl = res.api_url;
      this.formValidate1.apidesc = res.api_desc;
      this.formValidate1.apistatus = res.api_status;

      this.formValidate2.headerVal = JSON.parse(res.api_header_desc);
      this.formValidate2.getVal = JSON.parse(res.api_parms_desc);
      this.formValidate2.bodyVal = JSON.parse(res.api_body_desc);

      this.formValidate3.headerVal = JSON.parse(res.api_req_header_desc);
      this.formValidate3.respondVal = JSON.parse(res.api_content_desc);
      this.formValidate3.headerJson = res.api_req_header;
      this.formValidate3.respondJson = res.api_content;
      this.formValidate3.ismock = res.is_mockjs.toString();
      this.formValidate3.lazytime = res.api_lazy_time;
      this.formValidate3.rcode = res.rcode;
    },
    //获取项目
    async getProject() {
      let res = await this.$request({
        method: "GET",
        url: `/projects/all`
      });
      return res.data;
    },
    //根据项目ID获取模块
    async getModule(id) {
      let res = await this.$request({
        method: "GET",
        url: `/modules/all/${id}`
      });
      return res.data;
    },
    //检查是否有项目或模块
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
      let _this = this;
      if (this.jsoneditorHeader && this.jsoneditorRespond) return;
      let containerHeader = document.getElementById("jsoneditorHeader");
      let containerRespond = document.getElementById("jsoneditorRespond");
      let optionsHeader = {
        modes: ["code", "form", "text", "tree", "view", "preview"],
        onValidationError: function(errors) {
          _this.errorsHeader = errors;
        }
      };
      let optionsRespond = {
        modes: ["code", "form", "text", "tree", "view", "preview"],
        onValidationError: function(errors) {
          _this.errorsRespond = errors;
        }
      };
      this.jsoneditorHeader = new jsoneditor(containerHeader, optionsHeader);
      this.jsoneditorRespond = new jsoneditor(containerRespond, optionsRespond);

      if (this.apiPageType == false || this.apiPageIsCopy) {
        this.jsoneditorHeader.set(JSON.parse(this.formValidate3.headerJson));
        this.jsoneditorRespond.set(JSON.parse(this.formValidate3.respondJson));
      }
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
    async handleNextTabs(p) {
      let next = true;
      if (p == "2") {
        next = await this.validateOne();
      } else if (p == "3") {
        next = this.validateTwo();
      }
      if (next) this.selectTab = p;
      if (p == "3") {
        this.$nextTick(() => {
          this.renderJsoneditor();
        });
      }
    },
    //验证第一步
    async validateOne() {
      let validate = await this.$refs["formValidate1"].validate();
      if (!validate) {
        this.$message.error("验证失败!");
        return false;
      }
      return true;
    },
    //验证第二步
    validateTwo() {
      return true;
    },
    //验证第三步
    async validateThr() {
      let validate = await this.$refs["formValidate3"].validate();
      if (!validate) {
        this.$message.error("验证失败!");
        return false;
      }
      if (this.errorsHeader.length != 0) {
        this.$error({
          title: "header响应数据错误",
          content: this.errorsHeader[0].message
        });
        return false;
      } else {
        try {
          this.formValidate3.headerJson = this.jsoneditorHeader.get();
        } catch (error) {
          this.formValidate3.headerJson = {};
        }
      }

      if (this.errorsRespond.length != 0) {
        this.$error({
          title: "响应数据错误",
          content: this.errorsRespond[0].message
        });
        return false;
      } else {
        try {
          let jsoneditorRespondVal = this.jsoneditorRespond.get();
          let respondValArray = Object.keys(jsoneditorRespondVal);
          if (respondValArray.length === 0) {
            this.respondJsonValidate = true;
          } else {
            this.respondJsonValidate = false;
            this.formValidate3.respondJson = jsoneditorRespondVal;
          }
          if (
            respondValArray.length == 0 ||
            this.formValidate3.respondVal.length == 0
          ) {
            this.roleValidate3 = true;
            return false;
          }
        } catch (error) {
          this.$error({
            title: "响应数据错误",
            content: "请认真检查，注意不能为空"
          });
          return false;
        }
      }

      this.roleValidate3 = false;
      return true;
    },
    //项目change
    async handleChangeProject(val) {
      this.spinning = true;
      this.formValidate1.moduleid = undefined;
      let res = await this.getModule(val);
      this.checkLength(res);
      this.optionsModule = convertToTreeData(res, 0);
      this.spinning = false;
    },
    //显示响应参数窗口
    handleRespondModal(type) {
      this.reJsonHeader = [];
      this.reJsonRespond = [];
      this.reModalType = type;
      this.reModalNext = true;
      this.revisible = true;
    },
    //取消响应参数窗口
    handleCancelReModal() {
      this.$refs["formReModal"].resetFields();
      this.revisible = false;
    },
    //响应参数下一步、完成窗口
    handleRespondSubmit(b) {
      this.$refs["formReModal"].validate(valid => {
        if (valid) {
          let _data = {
            name: this.formReModal.name,
            type: this.formReModal.type,
            value: this.formReModal.value,
            desc: this.formReModal.desc
          };
          if (this.reModalNext) {
            switch (this.reModalType) {
              case "header":
                this.reJsonHeader.push(_data);
                break;
              case "respond":
                this.reJsonRespond.push(_data);
                break;
            }
            if (b) {
              switch (this.reModalType) {
                case "header":
                  this.formValidate3.headerVal = this.formValidate3.headerVal.concat(
                    this.reJsonHeader
                  );
                  break;
                case "respond":
                  this.formValidate3.respondVal = this.formValidate3.respondVal.concat(
                    this.reJsonRespond
                  );
                  break;
              }
              this.handleCancelReModal();
            } else {
              this.$refs["formReModal"].resetFields();
            }
          } else {
            switch (this.reModalType) {
              case "header":
                this.formValidate3.headerVal[this.reModalIndex] = _data;
                break;
              case "respond":
                this.formValidate3.respondVal[this.reModalIndex] = _data;
                break;
            }
            this.handleCancelReModal();
          }
        } else {
          this.$message.error("验证失败!");
        }
      });
    },
    //响应参数编辑
    handleEidtRespond(type, record, index) {
      this.reModalType = type;
      this.revisible = true;
      this.reModalNext = false;
      this.reModalIndex = index;
      this.$nextTick(() => {
        this.formReModal = Object.assign({}, this.formReModal, record);
      });
    },
    //响应参数删除
    handleDeleteRespond(type, record, index) {
      switch (type) {
        case "header":
          this.formValidate3.headerVal.splice(index, 1);
          break;
        case "respond":
          this.formValidate3.respondVal.splice(index, 1);
          break;
      }
    },

    //显示入参窗口
    handleClickInModal(type) {
      this.inJsonHeader = [];
      this.inJsonGet = [];
      this.inJsonBody = [];
      this.inModalType = type;
      this.inModalNext = true;
      this.invisible = true;
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
          if (this.inModalNext) {
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
                  this.formValidate2.headerVal = this.formValidate2.headerVal.concat(
                    this.inJsonHeader
                  );
                  break;
                case "get":
                  this.formValidate2.getVal = this.formValidate2.getVal.concat(
                    this.inJsonGet
                  );
                  break;
                case "body":
                  this.formValidate2.bodyVal = this.formValidate2.bodyVal.concat(
                    this.inJsonBody
                  );
                  break;
              }
              this.handleCancelInModal();
            } else {
              this.$refs["formInModal"].resetFields();
            }
          } else {
            switch (this.inModalType) {
              case "header":
                this.formValidate2.headerVal[this.inModalIndex] = _data;
                break;
              case "get":
                this.formValidate2.getVal[this.inModalIndex] = _data;
                break;
              case "body":
                this.formValidate2.bodyVal[this.inModalIndex] = _data;
                break;
            }
            this.handleCancelInModal();
          }
        } else {
          this.$message.error("验证失败!");
        }
      });
    },
    //入参编辑
    handleEidtIn(type, record, index) {
      this.inModalType = type;
      this.invisible = true;
      this.inModalNext = false;
      this.inModalIndex = index;
      this.$nextTick(() => {
        this.formInModal = Object.assign({}, this.formInModal, record);
      });
    },
    //入参删除
    handleDeleteIn(type, record, index) {
      switch (type) {
        case "header":
          this.formValidate2.headerVal.splice(index, 1);
          break;
        case "get":
          this.formValidate2.getVal.splice(index, 1);
          break;
        case "body":
          this.formValidate2.bodyVal.splice(index, 1);
          break;
      }
    },
    //保存
    async handleSubmit() {
      let validate = true;
      validate = await this.validateOne();
      if (!validate) {
        this.selectTab = "1";
        return;
      }
      //validate = this.validateTwo()
      validate = await this.validateThr();
      if (validate) {
        this.saveResult();
      }
    },
    saveResult() {
      let data = {
        projectid: this.formValidate1.projectid,
        moduleid: parseInt(this.formValidate1.moduleid.value),
        apiname: this.formValidate1.apiname,
        apiurl: this.formValidate1.apiurl,
        apitype: this.formValidate1.apitype,
        apidesc: this.formValidate1.apidesc,
        apistatus: this.formValidate1.apistatus,

        apiheaderdesc: JSON.stringify(this.formValidate2.headerVal),
        apiparmsdesc: JSON.stringify(this.formValidate2.getVal),
        apibodydesc: JSON.stringify(this.formValidate2.bodyVal),

        apicontent: JSON.stringify(this.formValidate3.respondJson),
        apicontentdesc: JSON.stringify(this.formValidate3.respondVal),
        ismockjs: parseInt(this.formValidate3.ismock),
        apireqheader: JSON.stringify(this.formValidate3.headerJson),
        apireqheaderdesc: JSON.stringify(this.formValidate3.headerVal),
        rcode: this.formValidate3.rcode,
        apilazytime: this.formValidate3.lazytime
      };
      let method = "POST";
      let url = `/interfaces`;
      if (this.apiPageType) {
        data.createtime = Util.formatDate(new Date());
      } else {
        method = "PATCH";
        url = `/interfaces/${this.mockId}`;
      }
      console.info(data);

      this.spinning = true;
      this.$request({
        method,
        url,
        data
      })
        .then(res => {
          if (res) {
            this.$router.push({
              name: "interface_success",
              query: {
                mockid: res.data.insertId
              }
            });
          }
          this.spinning = false;
        })
        .catch(err => {
          this.spinning = false;
        });
      /* console.info(this.formValidate1);
      console.info(this.formValidate2);
      console.info(this.formValidate3); */
    }
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