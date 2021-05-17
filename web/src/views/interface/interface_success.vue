<template>
  <div>
    <v-card :bodyStyle="{ padding: '100px' }">
      <div class="text-center">
        <v-icon type="check-circle" class="success-icon"></v-icon>
        <div class="mt-30">
          <v-button size="large" @click="handleBack">返回列表</v-button>
          <v-button size="large" @click="handleView" class="ml-20"
            >查看接口</v-button
          >
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "interface_success",
  data() {
    return {};
  },
  methods: {
    handleBack() {
      const formPath = this.$store.state.app.fromPath;
      this.$router.push({
        name: formPath.name,
        query: formPath.query,
      });
    },
    handleView() {
      this.$router.push({
        name: "interface_postman",
        query: {
          id: this.$route.query.mockid,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.success-icon {
  font-size: 120px;
  color: #52c41a;
}
</style>