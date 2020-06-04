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
          {{index+1}}
        </template>
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <v-button-group size="small">
              <!-- <v-button icon="export" @click="() => handleExportPdf(record)">PDF</v-button> -->
              <v-button icon="export" @click="() => handleExportWord(record)">WORD</v-button>
            </v-button-group>
          </div>
        </template>
      </v-table>
    </v-card>
    </v-card>
    <iframe name="myIframe" style="display:none"></iframe>
  </div>
</template>

<script>
import Util from "@/libs/util";
export default {
  name: "export_index",
  data() {
    return {
      data: [],
      pagination: { showQuickJumper: true },
      loading: false,
      fileUrl: "",
      columns: [
        {
          title: "编号",
          scopedSlots: { customRender: "indexs" },
          width: "10%",
          align: "center"
        },
        {
          title: "项目名称",
          dataIndex: "projectname",
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
        url: `/projects`,
        params: {
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
      }).catch(err =>{
        this.loading = false;
      });
    },
    handleTableChange(p){
      this.fetch(p.current);
    },
    handleExportPdf(record){

    },
    handleExportWord(record){
      this.loading = true;
      this.$request({
        method: "POST",
        url: `/exports/word`,
        data: {
          id: record.pid
        }
      }).then(res => {
        if(res.code == 200){
          this.fileUrl = res.data.fileUrl;
          this.downloadFile()
        }else{
          this.$message.error(res.message)
        }
        this.loading = false;
      }).catch(err =>{
        this.loading = false;
      });
    },
    downloadFile(){
      window.open(`http://${this.fileUrl}`, 'myIframe');
    }
  }
};
</script>
<style lang="less" scoped>

</style>