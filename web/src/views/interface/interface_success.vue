<template>
  <div>
    <v-card :bodyStyle="{padding: '100px'}">
      <div class="text-center">
        <v-icon type="check-circle" size="120" color="#52c41a"></v-icon>
        <div class="margin-top-30">
          <v-button size="large" @click="handleBack">返回列表</v-button>
          <v-button size="large" @click="handleView" class="margin-left-20">查看接口</v-button>
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
    handleBack(){

    },
    handleView(){
      
    }
  }
};
</script>
<style lang="less" scoped>
</style>