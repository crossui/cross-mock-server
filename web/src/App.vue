<template>
  <v-config-provider :getPopupContainer="getPopupContainer" :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </v-config-provider>
</template>

<script>
import zh_CN from "vcu/dist/locale/zh_CN";
import "moment/locale/zh-cn";
export default {
  name: "App",
  data() {
    return {
      zh_CN,
    };
  },
  methods: {
    getPopupContainer(el, dialogContext) {
      if (dialogContext) {
        return dialogContext.getDialogWrap();
      } else {
        return document.body;
      }
    },
  },
};
</script>

<style lang="less">
@import "./styles/index.less";
</style>
