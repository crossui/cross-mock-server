<template>
  <div>
    <v-card title="用户列表">
      <v-button type="primary" size="small" slot="extra" @click="handleAddClick">新增</v-button>
      <v-table
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        bordered
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
    </v-card>

    <v-modal title="用户管理" v-model="visible" @ok="handleOk" @cancel="handleCancel">
      <v-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <v-form-item label="姓名" prop="username">
          <v-input type="text" v-model="formValidate.username" />
        </v-form-item>
        <v-form-item label="登陆账号" prop="account">
          <v-input type="text" v-model="formValidate.account" />
        </v-form-item>
        <v-form-item label="密码" prop="password">
          <v-input type="password" v-model="formValidate.password" />
        </v-form-item>
      </v-form>
    </v-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      formValidate: {
        username: "",
        account: "",
        password: ""
      },
      ruleValidate: {
        account: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" }
        ],
        username: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" }
        ],
        password: [
          {
            required: true,
            min: 6,
            message: "不能为空,最少6位",
            trigger: "blur"
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" }
        ]
      },
      data: [{ uid: 1, username: "11111", account: "faf" }],
      pagination: {},
      loading: false,
      columns: [
        {
          title: "编号",
          dataIndex: "uid",
          width: "10%",
          align: "center"
        },
        {
          title: "登陆账号",
          dataIndex: "account",
          align: "center"
        },
        {
          title: "姓名",
          dataIndex: "username",
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
  methods: {
    //表格分页
    handleTableChange() {},
    //弹窗取消
    handleCancel() {
      this.$refs["formValidate"].resetFields();
      this.visible = false;
    },
    //弹窗确认
    handleOk() {
      this.$refs["formValidate"].resetFields();
      return;
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          this.handleClear();
          this.$message.success("Success!");
        } else {
          this.$message.error("Fail!");
        }
      });
    },
    //新增用户
    handleAddClick() {
      this.visible = true;
    },
    //编辑用户
    handleEidt(record) {
      this.visible = true;
      this.$nextTick(() => {
        this.formValidate = Object.assign({}, this.formValidate, record);
      });
    },
    //删除用户
    handleDelete(record) {
      this.$confirm({
        title: "提示",
        content: "确认删除些项数据?",
        onOk() {
          console.log("OK");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>