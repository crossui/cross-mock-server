<style lang="less">
@import "./own-space.less";
</style>

<template>
  <div>
    <v-card>
      <div slot="title">
        <v-icon type="user" size="18"></v-icon>个人信息
      </div>
      <div>
        <v-form
          ref="userForm"
          :model="userForm"
          :label-width="100"
          label-position="right"
          :rules="inforValidate"
        >
          <v-form-item label="用户姓名：" prop="username">
            <div style="display:inline-block;width:300px;">
              <v-input v-model="userForm.username"></v-input>
            </div>
          </v-form-item>
          <v-form-item label="登陆账号：" prop="account">
            <div style="display:inline-block;width:300px;">
              <v-input v-model="userForm.account"></v-input>
            </div>
          </v-form-item>
          <v-form-item label="登录密码：">
            <div style="display:inline-block;width:300px;">
              <v-input type="password" v-model="userForm.password"></v-input>
            </div>
          </v-form-item>
          <v-form-item label=" ">
            <v-button
              type="primary"
              style="width: 100px;"
              :loading="save_loading"
              @click="saveEdit"
            >保存</v-button>
          </v-form-item>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script>
import md5 from "md5";
export default {
  name: "ownspace_index",
  data() {
    return {
      userForm: {
        username: "",
        account: "",
        password: ""
      },
      save_loading: false,

      inforValidate: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        account: [
          { required: true, message: "请输入登陆账号", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init() {
      this.userForm = Object.assign(
        {},
        this.userForm,
        this.$store.state.user.userinfo
      );
    },
    saveEdit() {
      this.$refs["userForm"].validate(valid => {
        if (valid) {
          this.saveInfoAjax();
        }
      });
    },
    saveInfoAjax() {
      this.save_loading = true;
      this.$request({
        method: "PATCH",
        url: `/users/${this.userForm.uid}`,
        data: {
          username: this.userForm.username,
          account: this.userForm.account,
          password: this.userForm.password == '' ? "" : md5(this.userForm.password)
        }
      }).then(res => {
        if (res) {
          this.$message.success('保存成功');
        }
        this.save_loading = false;
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
