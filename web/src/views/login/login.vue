<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <v-card :bordered="false">
        <div slot="title">
          <v-icon type="login"></v-icon>欢迎登录
        </div>
        <div class="form-con">
          <v-form ref="loginForm" :model="form" :rules="rules" class="login-form">
            <v-form-item prop="account">
              <v-input v-model="form.account" placeholder="请输入用户名">
                <v-icon slot="prefix" type="user" color="rgba(0,0,0,.25)"></v-icon>
              </v-input>
            </v-form-item>
            <v-form-item prop="password">
              <v-input type="password" v-model="form.password" placeholder="请输入密码">
                <v-icon slot="prefix" type="lock" color="rgba(0,0,0,.25)"></v-icon>
              </v-input>
            </v-form-item>
            <v-form-item>
              <v-button type="primary" @click="handleSubmit" class="login-form-button">登录</v-button>
            </v-form-item>
          </v-form>
          <div class="login-tip">
            <a @click="handleApply">申请账号</a>
          </div>
        </div>
      </v-card>
    </div>

    <v-modal title="申请账号" v-model="visible" @ok="handleOk" @cancel="handleCancel">
      <v-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <v-form-item label="姓名" prop="username">
          <v-input type="text" v-model="formValidate.username" placeholder="请填写真实姓名" />
        </v-form-item>
        <v-form-item label="登陆账号" prop="account">
          <v-input type="text" v-model="formValidate.account" placeholder="建议姓名拼音首字母+生日" />
        </v-form-item>
        <v-form-item label="密码" prop="password">
          <v-input type="password" v-model="formValidate.password" placeholder="最少六位密码" />
        </v-form-item>
      </v-form>
    </v-modal>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import md5 from "md5";
import Util from "@/libs/util";
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
      form: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    //登陆
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let params = {
            account: this.form.account,
            password: md5(this.form.password)
          };
          this.$request({
            method: "POST",
            url: "/users/login",
            data: params
          }).then(res => {
            if (res) {
              if (this.form.account == "admin") {
                Cookies.set("roles", "admin");
              } else {
                Cookies.set("roles", "general");
              }
              Cookies.set("user", this.form.account);
              Cookies.set("password", md5(this.form.password));
              this.$store.commit("updateUserInfo", res.data[0]);
              this.$router.push({
                name: "home_index"
              });
            }
          });
        }
      });
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
            password: md5(this.formValidate.password),
            verify: "2",
            createtime: Util.formatDate(new Date())
          };
          this.$request({
            method: "post",
            url: "/users",
            data: params
          }).then(res => {
            if (res) {
              this.$message.success(res.message);
              this.handleCancel();
            }
          });
        } else {
          this.$message.error("提交数据有错误!");
        }
      });
    },
    //申请账号
    handleApply() {
      this.visible = true;
    }
  }
};
</script>
<style lang="less" scoped>
@import "./login.less";
</style>