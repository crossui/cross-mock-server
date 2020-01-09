<template>
  <div>
    <v-card title="用户列表">
      <v-button type="primary" size="small" slot="extra">新增</v-button>
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
              <v-button>编辑</v-button>
              <v-button>删除</v-button>
            </v-button-group>
          </div>
        </template>
      </v-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [{ uid: 1, username: "11111", account: "faf" }],
      pagination: {},
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
          title: "操作",
          scopedSlots: { customRender: "operation" },
          align: "center"
        }
      ]
    };
  },
  methods: {
    handleTableChange(){

    },
    handleOperation(){}
  }
};
</script>
<style lang="less" scoped>
</style>