<template>
  <div>
    <v-spin :spinning="spinning">
      <v-card>
        <v-input-group compact>
          <v-input style="width: 5%" v-model="apiType" disabled></v-input>
          <v-input style="width: 25%" v-model="apiPrefix" disabled></v-input>
          <v-input-search
            @search="handleSend"
            style="width: 55%"
            v-model="apiUrl"
            enterButton="发 送"
          ></v-input-search>
        </v-input-group>
      </v-card>
      <div class="margin-top-20">
        <v-row :gutter="16">
          <v-col :span="12">
            <v-card title="图片">
              <v-scrollbar class="scroll-help">
                <v-upload
                  action
                  class="mock-view-picture"
                  list-type="picture-card"
                  :file-list="fileList"
                  @preview="handlePreview"
                ></v-upload>
                <v-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </v-modal>
              </v-scrollbar>
            </v-card>
          </v-col>
          <v-col :span="12">
            <v-card title="语句">
              <v-scrollbar class="scroll-help">
                <div class="mock-sqlsentence">{{sqlsentence}}</div>
              </v-scrollbar>
            </v-card>
          </v-col>
        </v-row>
      </div>
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
    </v-spin>
  </div>
</template>

<script>
import axios from "axios";
import JsonViewer from "vue-json-viewer";

const optionsApiType = type => {
  let _type = "";
  switch (type) {
    case "0":
      _type = "GET";
      break;
    case "1":
      _type = "PUT";
      break;
    case "2":
      _type = "POST";
      break;
    case "3":
      _type = "DELETE";
      break;
    case "4":
      _type = "OPTIONS";
      break;
    case "5":
      _type = "PATCH";
      break;
  }
  return _type;
};
export default {
  name: "interface_postman",
  components: {
    JsonViewer
  },
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      sqlsentence: "",
      spinning: false,
      splitVal: 0.3,
      apiType: "",
      apiPrefix: "",
      apiUrl: "",
      apilazytime: 0,
      jsonHeaders: {},
      jsonBody: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.spinning = true;
      let res = await this.getApiInfo();
      let result = res.data[0];
      let ip = res.serviceip;
      this.apiType = optionsApiType(result.api_type);
      this.apiPrefix = `http://${ip}/mock/${result.projectid}/`;
      this.apiUrl = result.api_url;
      this.apilazytime = result.api_lazy_time;
      this.sqlsentence = result.sql_sentence;
      this.fileList = result.fileList;
      this.spinning = false;
    },
    async getApiInfo() {
      let id = this.$route.query.id;
      let res = await this.$request({
        method: "GET",
        url: `/interfaces/mockid/${id}`
      });
      return res;
    },
    handleSend(value) {
      this.spinning = true;

      axios({
        method: this.apiType,
        url: `${this.apiPrefix}${this.apiUrl}`,
        timeout: this.apilazytime === 0 ? 8000 : (this.apilazytime + 2) * 1000,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      })
        .then(res => {
          this.jsonHeaders = res.headers;
          this.jsonBody = res.data;
          this.spinning = false;
        })
        .catch(err => {
          this.spinning = false;
        });

      /* this.$request({
        method: this.apiType,
        url: `${this.apiPrefix}${this.apiUrl}`,
        timeout: this.apilazytime === 0 ? 8000 : (this.apilazytime + 2) * 1000
      })
        .then(res => {
          if (res) {
            this.jsonHeaders = res.headers;
            this.jsonBody = res.data.data;
          } else {
            this.jsonHeaders = {};
            this.jsonBody = {};
          }
          this.spinning = false;
        })
        .catch(err => {
          this.spinning = false;
        }); */
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    }
  }
};
</script>
<style lang="less">
.mock-sqlsentence {
  word-wrap: break-word;
}
.mock-view-picture .vcuicon-delete {
  display: none;
}
.split-wrap {
  height: 400px;
  .split-pane {
    padding: 0 20px;
  }
}
.scroll-help {
  height: 105px;
}
.scroll-container {
  height: 330px;
}
</style>