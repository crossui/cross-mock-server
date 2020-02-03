<template>
  <v-card>
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
      :rowKey="record => record.key"
      :columns="incolumns"
      :dataSource="formValidate2.headerVal"
      :pagination="false"
      :scroll="{y: 240 }"
    >
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <v-button-group size="small">
            <v-button
              @click="() => handleAddIn('header',record,index)"
              v-if="!record.children && !record.pid"
            >添加</v-button>
            <v-button @click="() => handleEidtIn('header',record)">编辑</v-button>
            <v-button @click="() => handleDeleteIn('header',record)">删除</v-button>
          </v-button-group>
        </div>
      </template>
    </v-table>

    <v-modal v-model="invisible" title="参数说明" :maskClosable="false" @cancel="handleCancelInModal">
      <template slot="footer">
        <v-button key="back" @click="handleCancelInModal">关闭</v-button>
        <v-button key="next" type="primary" @click="handleInModal()" v-if="!isEditModalIn">保存并下一条</v-button>
        <v-button key="submit" type="primary" @click="handleInEditModal()" v-if="isEditModalIn">保存</v-button>
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
  </v-card>
</template>

<script>
import uuidv1 from "uuid/v1";
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
  data() {
    return {
      incolumns,
      formValidate2: {
        headerVal: []
      },

      inModalType: "",
      invisible: false,
      isEditModalIn: false,
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
      this.isEditModalIn = false;
      this.inModalType = type;
      this.invisible = true;
    },
    //入参添加子级
    handleAddIn(type, record) {
      this.inModalType = type;
      this.isEditModalIn = false;
      this.invisible = true;
    },
    //入参编辑
    handleEidtIn(type, record) {
      this.isEditModalIn = true;
      this.inModalType = type;
      this.invisible = true;
      console.info(this.formInModal)
      this.$nextTick(() => {
        this.formInModal = Object.assign({}, this.formInModal, record);
      console.info(this.formInModal)
      });
    },
    //入参删除
    handleDeleteIn(type, record) {
      switch (type) {
        case "header":
          const dataSource = [...this.formValidate2.headerVal];
          this.formValidate2.headerVal = dataSource.filter(
            item => item.key !== record.key
          );
          break;

        case "get":
          break;

        case "body":
          break;
      }
    },
    //入参取消窗口
    handleCancelInModal() {
      this.$refs["formInModal"].resetFields();
      this.invisible = false;
    },
    //入参保存编辑
    handleInEditModal() {
      this.$refs["formInModal"].validate(valid => {
        if (valid) {
          let newData = {
            name: this.formInModal.name,
            type: this.formInModal.type,
            must: this.formInModal.must,
            desc: this.formInModal.desc
          };
          switch (this.inModalType) {
            case "header":
              const dataSource = [...this.formValidate2.headerVal];
              this.formValidate2.headerVal = dataSource.map(item => {
                if (item.key == this.formInModal.key) {
                  item = Object.assign({}, item, newData);
                }
                return item;
              });
              break;

            case "get":
              break;

            case "body":
              break;
          }
          this.handleCancelInModal();
        } else {
          this.$message.error("验证失败!");
        }
      });
    },
    //新增入参窗口
    handleInModal() {
      this.$refs["formInModal"].validate(valid => {
        if (valid) {
          let newData = {
            key: uuidv1(),
            name: this.formInModal.name,
            type: this.formInModal.type,
            must: this.formInModal.must,
            desc: this.formInModal.desc
          };
          switch (this.inModalType) {
            case "header":
              this.formValidate2.headerVal = [
                ...this.formValidate2.headerVal,
                newData
              ];
              break;

            case "get":
              break;

            case "body":
              break;
          }
          this.$refs["formInModal"].resetFields();
        } else {
          this.$message.error("验证失败!");
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
