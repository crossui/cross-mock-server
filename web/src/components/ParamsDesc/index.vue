<template>
  <div>
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
            <v-button @click="() => handleAddIn('header',record,index)">添加</v-button>
            <v-button @click="() => handleEidtIn('header',record,index)">编辑</v-button>
            <v-button @click="() => handleDeleteIn('header',record,index)">删除</v-button>
          </v-button-group>
        </div>
      </template>
    </v-table>

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
  </div>
</template>

<script>
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
export default {
  name: "params-desc",
  data() {
    return {
      incolumns,
      formValidate2: {
        headerVal: []
      },

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
      dataType
    };
  },
  methods: {
    //入参显示窗口
    handleClickInModal(type) {
      this.invisible = true;
    },
    //入参添加子级
    handleAddIn(type, record, index) {},
    //入参编辑
    handleEidtIn(type, record, index) {},
    //入参删除
    handleDeleteIn(type, record, index) {},
    //入参取消窗口
    handleCancelInModal(){
      this.$refs["formInModal"].resetFields();
      this.invisible = false;
    },
    //入参下一步、完成窗口
    handleInModal(){

    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
