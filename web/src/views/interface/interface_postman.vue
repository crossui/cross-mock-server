<template>
  <div>
    <v-card>
      <v-input-group compact>
        <v-input style="width: 5%" defaultValue="GET" disabled></v-input>
        <v-input
          style="width: 25%"
          defaultValue="HTTP://127.0.0.1/74b5f1c03a7f11ea859a9b10c/"
          disabled
        ></v-input>
        <v-input-search
          style="width: 55%"
          defaultValue="awddfsafaf/faafds/23232323232321111"
        >
          <v-button type="primary" slot="enterButton" :loading="sendLoading">发 送</v-button>
        </v-input-search>
      </v-input-group>
    </v-card>
    <div class="margin-top-20">
      <v-card title="响应数据" :bodyStyle="{padding: '0px'}">
        <div class="split-wrap">
          <v-split v-model="splitVal">
            <div slot="left" class="split-pane split-pane-left">
              <h4>Headers</h4>
              <v-scrollbar class="scroll-container">
                <json-viewer :value="jsonHeaders" :expand-depth="50"></json-viewer>
              </v-scrollbar>
            </div>
            <div slot="right" class="split-pane split-pane-right">
              <h4>Body</h4>
              <v-scrollbar class="scroll-container">
                <json-viewer :value="jsonBody" :expand-depth="50"></json-viewer>
              </v-scrollbar>
            </div>
          </v-split>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
export default {
  name: "interface_postman",
  components: {
    JsonViewer
  },
  data() {
    return {
      splitVal: 0.3,
      sendLoading: false,
      jsonHeaders: {},
      jsonBody: {}
    };
  },
  mounted(){
    
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.split-wrap {
  height: 680px;
  .split-pane {
    padding: 0 20px;
  }
}
.scroll-container {
  height: 600px;
}
</style>