<template>
  <div>
    <v-card title="项目列表" :bodyStyle="{padding: '0px'}">
      <div class="split-wrap">
        <v-split v-model="splitVal">
          <div slot="left" class="split-pane split-pane-left">
            <div class="clearfix margin-bottom-15">
              <v-button type="primary" size="small" class="fr" @click="handleAddProjectClick">新增</v-button>
            </div>
            <v-list :dataSource="projectListData" :loading="listLoading" bordered size="small">
              <v-list-item
                slot="renderItem"
                slot-scope="item, index"
                key="item.pid"
                v-bind:class="{'selected': item.pid == selectedProject}"
              >
                <v-button-group size="small" slot="actions">
                  <v-button icon="edit" @click="() => handleEidt(item)"></v-button>
                  <v-button icon="delete" @click="() => handleDelete(item)"></v-button>
                </v-button-group>
                <span>{{item.projectname}}</span>
              </v-list-item>

              <div
                v-if="showLoadingMore"
                slot="loadMore"
                :style="{ textAlign: 'center',  height: '32px', lineHeight: '32px' }"
              >
                <v-spin v-if="loadingMore"></v-spin>
                <a v-else @click="onLoadMore">加载更多</a>
              </div>
            </v-list>
          </div>
          <div slot="right" class="split-pane split-pane-right">
            <div class="clearfix margin-bottom-15">
              <div class="fl">
                <v-input-search
                  placeholder="模块名称"
                  style="width: 200px"
                  @search="onSearch"
                  enterButton
                  size="small" 
                ></v-input-search>
              </div>
              <v-button type="primary" size="small" class="fr" @click="handleAddModulesClick">新增</v-button>
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
          </div>
        </v-split>
      </div>
    </v-card>

    <v-modal title="项目名称" v-model="projVisible" @ok="handleProjOk" @cancel="handleProjCancel">
      <v-form ref="formproj" :model="formProj" :rules="ruleProj" :label-width="50">
        <v-form-item label="名称" prop="projname">
          <v-input type="text" v-model="formProj.projname" />
        </v-form-item>
      </v-form>
    </v-modal>

    <v-modal title="模块名称" v-model="modleVisible" @ok="handleModleOk" @cancel="handleModleCancel">
      <v-form ref="formModle" :model="formModle" :rules="ruleModle" :label-width="50">
        <v-form-item label="名称" prop="modlename">
          <v-input type="text" v-model="formModle.modlename" />
        </v-form-item>
      </v-form>
    </v-modal>
  </div>
</template>

<script>
export default {
  name: 'project_index',
  data() {
    return {
      projVisible: false,
      formProj: {
        projname: ""
      },
      ruleProj: {
        projname: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" }
        ]
      },
      modleVisible: false,
      formModle: {
        modlename: ""
      },
      ruleModle: {
        modlename: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" }
        ]
      },
      selectedProject: "1",
      splitVal: 0.3,
      listLoading: false,
      projectListData: [],
      loadingMore: false,
      showLoadingMore: true,
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
          title: "模块名称",
          dataIndex: "modulesname"
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
    this.init();
  },
  methods: {
    init(){
      
    },
    onLoadMore(){

    },
    //表格分页
    handleTableChange() {},
    //新增项目
    handleAddProjectClick() {
      this.projVisible = true;
    },
    //新增模块
    handleAddModulesClick() {
      this.modleVisible = true;
    },
    //搜索
    onSearch() {},
    //项目新增确认
    handleProjOk() {},
    //项目新增取消
    handleProjCancel() {},
    //模块新增确认
    handleModleOk() {},
    //模块新增取消
    handleModleCancel() {}
  }
};
</script>
<style lang="less" scoped>
.vcu-list-item {
  cursor: pointer;
  &.selected {
    background: #f0f0f0;
  }
}
.split-wrap {
  height: 700px;
  .split-pane {
    padding: 20px;
  }
}
</style>