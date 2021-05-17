<template>
  <div>
    <v-card>
      <v-table
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        bordered
      >
        <template slot="indexs" slot-scope="text, record, index">
          {{ index + 1 }}
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <v-button-group size="small">
              <v-button icon="export" @click="() => handleExportModel(record)"
                >按模块</v-button
              >
              <v-button icon="export" @click="() => handleExportWord(record)">
                全部
              </v-button>
            </v-button-group>
          </div>
        </template>
      </v-table>
    </v-card>

    <v-modal title="选择模块导出WORD" v-model="modalVisible">
      <template slot="footer">
        <v-button key="back" @click="handleCancel">取消</v-button>
        <v-button
          key="submit"
          type="primary"
          :loading="modalLoading"
          @click="handleOk"
        >
          导出
        </v-button>
      </template>

      <v-table
        :rowKey="(record) => record.mid"
        :indentSize="30"
        :columns="modalColumns"
        :dataSource="modalTabledata"
        :scroll="{ y: 300 }"
        :pagination="false"
        :expandedRowKeys="expandedRowKeys"
        :rowSelection="rowSelection"
        bordered
      >
      </v-table>
    </v-modal>
    <iframe name="myIframe" style="display: none"></iframe>
  </div>
</template>

<script>
import Util from "@/libs/util";

const convertToTreeData = (data, pid) => {
  let result = [],
    temp;
  for (let i = 0; i < data.length; i++) {
    if (data[i].pmid === pid) {
      let obj = data[i];
      temp = convertToTreeData(data, data[i].mid);
      if (temp.length > 0) {
        temp.forEach((item) => {
          item.child = true;
        });
        obj.children = temp;
      }
      result.push(obj);
    }
  }

  return result;
};

export default {
  name: "export_index",
  data() {
    return {
      modalLoading: false,
      modalVisible: false,
      modalColumns: [
        {
          title: "模块名称",
          dataIndex: "modulename",
        },
      ],
      modalTabledata: [],
      expandedRowKeys: [],
      currPid: null,
      selectedRows: null,
      data: [],
      pagination: { showQuickJumper: true },
      loading: false,
      fileUrl: "",
      columns: [
        {
          title: "编号",
          scopedSlots: { customRender: "indexs" },
          width: "10%",
          align: "center",
        },
        {
          title: "项目名称",
          dataIndex: "projectname",
          align: "center",
        },
        {
          title: "创建时间",
          dataIndex: "createtime",
          align: "center",
        },
        {
          title: "操作",
          width: "20%",
          scopedSlots: { customRender: "operation" },
          align: "center",
        },
      ],
    };
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRows = selectedRows;
        },
      };
    },
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
        url: `/projects`,
        params: {
          page: pageNum,
          pagesize: 10,
        },
      })
        .then((res) => {
          this.data = res.data.rows;
          this.pagination = Util.pager(this, this.pagination, {
            current: pageNum,
            total: res.data.totals,
          });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    handleTableChange(p) {
      this.fetch(p.current);
    },
    handleExportModel(record) {
      this.currPid = record.pid;
      this.$request({
        method: "GET",
        url: `/modules`,
        params: {
          modulename: "",
          projectid: record.pid,
          page: 1,
          pagesize: 10,
        },
      }).then((res) => {
        this.modalTabledata = convertToTreeData(res.data.rows, 0);
        this.expandedRowKeys = this.modalTabledata
          .map((item) => {
            if (item.children) {
              return item.mid;
            }
          })
          .filter((item) => {
            return item != undefined;
          });
        this.modalVisible = true;
      });
    },
    handleCancel() {
      this.modalVisible = false;
      this.modalLoading = false;
      this.$nextTick(() => {
        this.modalTabledata = [];
        this.expandedRowKeys = [];
        this.currPid = null;
        this.selectedRows = null;
      });
    },
    handleOk() {
      if (this.selectedRows && this.selectedRows.length) {
        let mids = [];
        this.selectedRows.forEach((item) => {
          mids.push(item.mid);
        });
        this.modalLoading = true;
        this.$request({
          method: "POST",
          url: `/exports/word/models`,
          data: {
            pid: this.currPid,
            mids: mids,
          },
        })
          .then((res) => {
            if (res.code == 200) {
              this.fileUrl = res.data.fileUrl;
              this.downloadFile();
            } else {
              this.$message.error(res.message);
            }
            this.handleCancel();
          })
          .catch((err) => {
            this.modalLoading = false;
          });
      } else {
        this.$error({
          title: "提示",
          content: "请选择要导出的模块",
        });
      }
    },
    handleExportWord(record) {
      this.loading = true;
      this.$request({
        method: "POST",
        url: `/exports/word`,
        data: {
          id: record.pid,
        },
      })
        .then((res) => {
          if (res.code == 200) {
            this.fileUrl = res.data.fileUrl;
            this.downloadFile();
          } else {
            this.$message.error(res.message);
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    downloadFile() {
      window.open(`http://${this.fileUrl}`, "myIframe");
    },
  },
};
</script>
<style lang="less" scoped>
</style>