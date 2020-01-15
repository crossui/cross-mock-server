<template>
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
              :options="optionsProject"
            ></v-select>
          </v-form-item>
          <v-form-item label="所属模块" prop="moduleid">
            <v-select
              style="width: 420px"
              @change="handleChangeModule"
              v-model="formValidate1.moduleid"
              :options="optionsModule"
            ></v-select>
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
                @click="handleAddHeader"
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
                    <v-button @click="() => handleEidt(record)">编辑</v-button>
                    <v-button @click="() => handleDelete(record)">删除</v-button>
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
                @click="handleAddGet"
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
                    <v-button @click="() => handleEidt(record)">编辑</v-button>
                    <v-button @click="() => handleDelete(record)">删除</v-button>
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
                @click="handleAddBody"
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
                    <v-button @click="() => handleEidt(record)">编辑</v-button>
                    <v-button @click="() => handleDelete(record)">删除</v-button>
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
                    <v-button @click="() => handleEidt(record)">编辑</v-button>
                    <v-button @click="() => handleDelete(record)">删除</v-button>
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
                    <v-button @click="() => handleEidt(record)">编辑</v-button>
                    <v-button @click="() => handleDelete(record)">删除</v-button>
                  </v-button-group>
                </div>
              </template>
            </v-table>
          </v-form-item>
          <v-form-item label="响应数据" class="vcu-form-item-required">
            <div id="jsoneditorRespond"></div>
          </v-form-item>
          <v-form-item label>
            <v-button type="primary" @click="handleSubmit">保 存</v-button>
          </v-form-item>
        </v-form>
      </v-tab-pane>
    </v-tabs>
  </div>
</template>

<script>
import jsoneditor from "jsoneditor";
const optionsApiType = [];
const incolumns = [
  {
    title: "参数名",
    dataIndex: "paramsname",
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
  name: "interface_add",
  data() {
    return {
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

      formValidate2: {},

      incolumns,
      headerData: [],
      getData: [],
      bodyData: [],

      formValidate3: {},
      outcolumns,
      respondHeaderData: [],
      respondJsonData: [],
      jsoneditorHeader: null,
      jsoneditorRespond:null
    };
  },
  mounted() {},
  methods: {
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
      this.selectTab = p;
    },
    handleChangeProject() {},
    handleChangeModule() {},
    handleAddHeader() {},
    handleAddGet() {},
    handleAddBody() {},

    handleAddRespondHeader(){

    },
    handleAddRespondJson() {},
    handleSubmit(){}
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