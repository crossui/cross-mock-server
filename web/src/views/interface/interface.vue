<template>
  <div>
    <v-card :title="titleVal">
      <div class="clearfix margin-bottom-15">
        <div class="fl">
          <v-input-search
            size="small"
            placeholder="接口路径或名称"
            style="width: 400px"
            @search="onSearch"
            enterButton
          ></v-input-search>
        </div>
        <v-button type="primary" size="small" class="fr" @click="handleAddClick">新增</v-button>
      </div>
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
              <v-button @click="() => handleEidt(record)">编辑</v-button>
              <v-button @click="() => handleDelete(record)">删除</v-button>
            </v-button-group>
          </div>
        </template>
      </v-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "interface_index",
  data() {
    return {
      titleVal: "全部接口",
      data: [{ uid: 1, modulesname: "11111" }],
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
          title: "项目名称",
          dataIndex: "projectname"
        },
        {
          title: "模块名称",
          dataIndex: "modulesname"
        },
        {
          title: "请求类型",
          dataIndex: "requesttype"
        },
        {
          title: "接口地址",
          dataIndex: "apiurl"
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
  methods: {
    handleAddClick() {
      this.$router.push({
        name: "interface_add_edit"
      });
    },
    onSearch() {},
    handleTableChange() {}
  }
};
</script>
<style lang="less" scoped>
</style>