<template>
  <div class="card-container">
    <v-tabs type="card">
      <v-tab-pane tab="基本信息" key="1">
        <v-form
          ref="formValidate1"
          :model="formValidate1"
          :rules="ruleValidate1"
          :label-width="100"
        >
          <v-form-item label="所属项目" prop="projectid">
            <v-select
              style="width: 220px"
              @change="handleChangeProject"
              v-model="formValidate1.projectid"
              :options="optionsProject"
            ></v-select>
          </v-form-item>
          <v-form-item label="所属模块" prop="moduleid">
            <v-select
              style="width: 220px"
              @change="handleChangeModule"
              v-model="formValidate1.moduleid"
              :options="optionsModule"
            ></v-select>
          </v-form-item>
          <v-form-item label="请求类型" prop="apitype">
            <v-select
              style="width: 220px"
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
            <v-button type="primary">下一步</v-button>
          </v-form-item>
        </v-form>
      </v-tab-pane>

      <v-tab-pane tab="请求参数设置" key="2">
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
      </v-tab-pane>
      <v-tab-pane tab="响应参数设置" key="3">
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
      </v-tab-pane>
    </v-tabs>
  </div>
</template>

<script>
const optionsApiType = [];
export default {
  name: "interface_add",
  data() {
    return {
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
      optionsApiType
    };
  },
  methods: {
    handleChangeProject() {},
    handleChangeModule() {}
  }
};
</script>
<style lang="less">
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