<template>
  <div>
    <v-card title="用户列表">
      <v-button type="primary" size="small" slot="extra" @click="handleAddClick">新增</v-button>
      <div class="margin-bottom-10">
        <v-input-search
          placeholder="登陆账号"
          v-model="searchAccount"
          @search="onSearch"
          enterButton
          style="width:200px"
        ></v-input-search>
      </div>
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

        <template slot="verify" slot-scope="text, record, index">
          <div class="user-row-verify">{{record.verify == "1" ? '通过' : "不通过"}}</div>
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
        <v-form-item label="状态" prop="verify">
          <v-radio-group name="radioGroup" v-model="formValidate.verify">
            <v-radio value="1">通过</v-radio>
            <v-radio value="2">不通过</v-radio>
          </v-radio-group>
        </v-form-item>
      </v-form>
    </v-modal>
  </div>
</template>

<script>
import Util from "@/libs/util";
import md5 from "md5";
export default {
  data() {
    return {
      searchAccount: "",
      modalType: true,
      visible: false,
      formValidate: {
        username: "",
        account: "",
        password: "",
        verify: false
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
            min: 6,
            message: "不能为空,最少6位",
            trigger: "blur"
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" }
        ]
      },
      data: [],
      pagination: { showQuickJumper: true },
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
          title: "状态",
          dataIndex: "verify",
          scopedSlots: { customRender: "verify" },
          align: "center"
        },
        {
          title: "创建时间",
          dataIndex: "createtime",
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
  mounted() {
    this.fetch(1);
  },
  methods: {
    //获取表格数据   pageNum  当前请求的页码
    fetch(pageNum) {
      this.loading = true;
      this.$request({
        method: "GET",
        url: `/users`,
        params: {
          account: this.searchAccount,
          page: pageNum,
          pagesize: 10
        }
      }).then(res => {
        this.data = res.data.rows;
        this.pagination = Util.pager(this, this.pagination, {
          current: pageNum,
          total: res.data.totals
        });
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
    //弹窗取消
    handleCancel() {
      this.$refs["formValidate"].resetFields();
      this.visible = false;
    },
    //弹窗确认
    handleOk() {
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          let params = {
            account: this.formValidate.account,
            username: this.formValidate.username,
            password: this.formValidate.password == "" ? "" : md5(this.formValidate.password),
            verify: this.formValidate.verify
          };
          let method = "POST";
          let url = "/users";
          if (!this.modalType) {
            method = "PATCH";
            url = `/users/${this.formValidate.uid}`;
          } else {
            params.createtime = Util.formatDate(new Date());
          }
          this.$request({
            method,
            url,
            data: params
          }).then(res => {
            if (res) {
              this.$message.success(res.message);
              this.fetch(1);
              this.handleCancel();
            }
          });
        } else {
          this.$message.error("Fail!");
        }
      });
    },
    //新增用户
    handleAddClick() {
      this.modalType = true;
      this.visible = true;
    },
    //编辑用户
    handleEidt(record) {
      this.modalType = false;
      this.visible = true;
      this.$nextTick(() => {
        this.formValidate = Object.assign({}, this.formValidate, record);
      });
    },
    //删除用户
    handleDelete(record) {
      let _this = this;
      this.$confirm({
        title: "提示",
        content: "确认删除些项数据?",
        onOk() {
          _this
            .$request({
              method: "POST",
              url: "/users/delete",
              data: {
                id: record.uid
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
    }
  }
};
</script>
<style lang="less" scoped>
</style>