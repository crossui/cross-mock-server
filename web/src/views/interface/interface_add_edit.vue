<template>
  <v-spin :spinning="spinning">
    <div class="card-container">
      <v-tabs type="card" v-model="selectTab" @change="onTabsChange">
        <template slot="tabBarExtraContent">
          <v-button-group size="small">
            <v-button type="primary" @click="handleDownTpl">
              <v-icon type="cloud-download"></v-icon>下载模板
            </v-button>
            <v-button type="primary" @click="handleSelectFile">
              <v-icon type="cloud-upload"></v-icon>导入Excel
            </v-button>
          </v-button-group>
        </template>
        <v-tab-pane tab="基本信息" key="1">
          <v-form
            ref="formValidate1"
            :model="formValidate1"
            :rules="ruleValidate1"
            :label-width="120"
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
            <v-form-item label="语句" prop="sqlsentence">
              <v-textarea :rows="4" v-model="formValidate1.sqlsentence" placeholder="请输入SQL语句" />
            </v-form-item>
            <v-form-item label="图片">
              <v-upload
                name="interface"
                listType="picture-card"
                :fileList="fileList"
                action="/uploadFile/interface"
                :beforeUpload="beforeUpload"
                @preview="handlePreview"
                @remove="handleRemoveUpload"
                @change="handleChangeUpload"
              >
                <div>
                  <v-icon type="plus"></v-icon>
                  <div class="vcu-upload-text">Upload</div>
                </div>
              </v-upload>
              <v-modal :visible="previewVisible" :footer="null" @cancel="handleCancelPreview">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </v-modal>
            </v-form-item>
            <v-form-item label>
              <v-button type="primary" @click="handleNextTabs('2')">下一步</v-button>
            </v-form-item>
          </v-form>
        </v-tab-pane>

        <v-tab-pane tab="请求参数设置" key="2">
          <v-form ref="formValidate2" :model="formValidate2" :label-width="120">
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
            <!-- <v-form-item label="返回状态码" prop="rcode">
              <v-input v-model="formValidate3.rcode" style="width:200px"></v-input>
            </v-form-item>-->
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
    <iframe name="myIframe" style="display:none"></iframe>
    <input type="file" id="file" style="display:none" @change="importFile" />
  </v-spin>
</template>

<script>
import Util from "@/libs/util";
import Excels from "@/libs/excel";
import jsoneditor from "jsoneditor";
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

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [],
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
        apistatus: "2",
        sqlsentence: ""
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
        //rcode: "200",
        lazytime: 0
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
        ]
        /* rcode: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" }
        ] */
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
        ],
        desc: [{ pattern: /^(?!(\'+$))/, message: "不可以使用单引号" }]
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
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" },
          { pattern: /^(?!(\'+$))/, message: "不可以使用单引号" }
        ],
        desc: [{ pattern: /^(?!(\'+$))/, message: "不可以使用单引号" }]
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
    this.init();
  },
  methods: {
    async init() {
      this.spinning = true;
      let resProject = await this.getProject();
      if (!resProject) this.spinning = false;
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
      this.formValidate1.sqlsentence = res.sqlsentence;
      this.formValidate1.apistatus = res.api_status;
      this.fileList = res.fileList ? res.fileList : [];

      this.formValidate2.headerVal = JSON.parse(res.api_header_desc);
      this.formValidate2.getVal = JSON.parse(res.api_parms_desc);
      this.formValidate2.bodyVal = JSON.parse(res.api_body_desc);

      this.formValidate3.headerVal = JSON.parse(res.api_req_header_desc);
      this.formValidate3.respondVal = JSON.parse(res.api_content_desc);
      this.formValidate3.headerJson = res.api_req_header;
      this.formValidate3.respondJson = res.api_content;
      this.formValidate3.ismock = res.is_mockjs.toString();
      this.formValidate3.lazytime = res.api_lazy_time;
      //this.formValidate3.rcode = res.rcode;
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

      this.formValidate3.headerJson != null &&
        this.jsoneditorHeader.set(JSON.parse(this.formValidate3.headerJson));
      this.formValidate3.respondJson != null &&
        this.jsoneditorRespond.set(JSON.parse(this.formValidate3.respondJson));
      /* if (this.apiPageType == false || this.apiPageIsCopy) {
        this.jsoneditorHeader.set(JSON.parse(this.formValidate3.headerJson));
        this.jsoneditorRespond.set(JSON.parse(this.formValidate3.respondJson));
      } */
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
            value: Util.replaceQuotes(this.formReModal.value),
            desc: Util.replaceQuotes(this.formReModal.desc)
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
            desc: Util.replaceQuotes(this.formInModal.desc)
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
      const fileList = this.fileList
        .map(item => {
          if (item.status == "done") {
            return item.response;
          }
        })
        .filter(item => {
          return item != undefined;
        });
      let data = {
        projectid: this.formValidate1.projectid,
        moduleid: parseInt(this.formValidate1.moduleid.value),
        apiname: this.formValidate1.apiname,
        apiurl: this.formValidate1.apiurl,
        apitype: this.formValidate1.apitype,
        apidesc: this.formValidate1.apidesc,
        sqlsentence: this.formValidate1.sqlsentence,
        apistatus: this.formValidate1.apistatus,

        apiheaderdesc: JSON.stringify(this.formValidate2.headerVal),
        apiparmsdesc: JSON.stringify(this.formValidate2.getVal),
        apibodydesc: JSON.stringify(this.formValidate2.bodyVal),

        apicontent: JSON.stringify(this.formValidate3.respondJson),
        apicontentdesc: JSON.stringify(this.formValidate3.respondVal),
        ismockjs: parseInt(this.formValidate3.ismock),
        apireqheader: JSON.stringify(this.formValidate3.headerJson),
        apireqheaderdesc: JSON.stringify(this.formValidate3.headerVal),
        //rcode: this.formValidate3.rcode,
        apilazytime: this.formValidate3.lazytime,
        fileList
      };
      let method = "POST";
      let url = `/interfaces`;
      if (this.apiPageType) {
        data.createtime = Util.formatDate(new Date());
      } else {
        method = "PATCH";
        url = `/interfaces/${this.mockId}`;
      }

      this.spinning = true;
      this.$request({
        method,
        url,
        data
      })
        .then(res => {
          if (res.code == 200) {
            this.$router.push({
              name: "interface_success",
              query: {
                mockid: res.data.insertId
              }
            });
          } else {
            this.$error({
              title: "错误",
              content: res.message
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
    },
    //下载模板
    handleDownTpl() {
      window.open(`/mockServe_interface_tpl.xls`, "myIframe");
    },
    //导入excel
    handleSelectFile() {
      const el = document.getElementById("file");
      el.click();
    },
    async importFile() {
      const el = document.getElementById("file");
      const file = el.files[0];
      const data = await Excels.importFromLocal(file);
      this.handleExcelData(data);
    },
    handleExcelData(data) {
      try {
        /* 基本信息 */
        this.formValidate1.apiname = data[0][0]["接口名称"];
        this.formValidate1.apitype = switchTypeFun(data[0][0]["请求类型"]);
        this.formValidate1.apiurl = data[0][0]["接口地址"];
        this.formValidate1.apidesc = data[0][0]["接口描述"];
        this.formValidate1.sqlsentence = data[0][0]["语句"];
        /* 响应参数说明 */
        this.formValidate3.respondVal = data[1].map(item => {
          let _data = {
            name: item["返回键"],
            type: item["类型"],
            value: Util.replaceQuotes(item["返回值"]),
            desc: Util.replaceQuotes(item["说明"])
          };
          return _data;
        });
        /* 响应数据 */
        this.formValidate3.respondJson = data[2][0]["响应数据"];
        //this.jsoneditorHeader.set(JSON.parse(this.formValidate3.headerJson));
        this.selectTab == "3" &&
          this.jsoneditorRespond.set(
            JSON.parse(this.formValidate3.respondJson)
          );
        /* 响应Header参数说明 */
        this.formValidate3.headerVal =
          data[3].length == 0
            ? []
            : data[3].map(item => {
                return {
                  name: item["返回键"],
                  type: item["类型"],
                  value: Util.replaceQuotes(item["返回值"]),
                  desc: Util.replaceQuotes(item["说明"])
                };
              });
        /* 响应Header数据 */
        this.formValidate3.headerJson = data[4][0]["响应数据"];
        this.selectTab == "3" &&
          this.jsoneditorHeader.set(JSON.parse(this.formValidate3.headerJson));

        /* formValidate2: {
          headerVal: [],
          getVal: [],
          bodyVal: []
          name: this.formReModal.name,
            type: this.formReModal.type,
            value: this.formReModal.value,
            desc: this.formReModal.desc
        }, */
        /* Header参数说明 */
        this.formValidate2.headerVal =
          data[5].length == 0
            ? []
            : data[5].map(item => {
                return {
                  name: item["参数名"],
                  type: item["类型"],
                  must: item["必填"],
                  desc: Util.replaceQuotes(item["说明"])
                };
              });
        /* Get参数说明 */
        this.formValidate2.getVal =
          data[6].length == 0
            ? []
            : data[6].map(item => {
                return {
                  name: item["参数名"],
                  type: item["类型"],
                  must: item["必填"],
                  desc: Util.replaceQuotes(item["说明"])
                };
              });
        /* body参数说明 */
        this.formValidate2.bodyVal =
          data[7].length == 0
            ? []
            : data[7].map(item => {
                return {
                  name: item["参数名"],
                  type: item["类型"],
                  must: item["必填"],
                  desc: Util.replaceQuotes(item["说明"])
                };
              });
      } catch (error) {
        alert(error);
      }
    },
    handleCancelPreview() {
      this.previewVisible = false;
    },
    //删除图片
    handleRemoveUpload(file) {
      this.$request({
        method: "POST",
        url: "/uploadFile/delete",
        data: {
          id: file.fileid
        }
      }).then(res => {
        if (res) {
          this.$message.success(res.message);
        }
      });
    },
    //查看图片
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    //上传图片
    handleChangeUpload({ fileList }) {
      this.fileList = fileList;
    },
    //上传图片前
    beforeUpload(file) {
      /* const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("You can only upload JPG file!");
      } */
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 4MB!");
      }
      //return isJPG && isLt2M;
      return isLt2M;
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

.vcu-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.vcu-upload-select-picture-card .vcu-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>