<template>
  <div>
    <v-card title="项目列表" :bodyStyle="{ padding: '0px' }">
      <div class="split-wrap">
        <splitpanes>
          <pane
            size="30"
            key="split-pane-left"
            class="split-pane split-pane-left"
          >
            <div class="clearfix mb-15">
              <v-button
                type="primary"
                size="small"
                class="fr"
                @click="handleAddProjectClick"
                >新增</v-button
              >
            </div>
            <v-list
              :dataSource="projectListData"
              :loading="listLoading"
              bordered
              size="small"
              :pagination="paginationProj"
            >
              <v-list-item
                slot="renderItem"
                slot-scope="item"
                key="item.pid"
                v-bind:class="{ selected: item.pid == selectedProject }"
                @click="handleSelectProj(item)"
              >
                <v-button-group size="small" slot="actions">
                  <v-button
                    icon="edit"
                    @click="() => handleEidtProj(item)"
                  ></v-button>
                  <v-button
                    icon="delete"
                    @click="() => handleDeleteProj(item)"
                  ></v-button>
                </v-button-group>
                <span>{{ item.projectname }}</span>
              </v-list-item>
            </v-list>
          </pane>
          <pane key="split-pane-right" class="split-pane split-pane-right">
            <div class="clearfix mb-15">
              <div class="fl">
                <v-input-search
                  placeholder="模块名称"
                  style="width: 200px"
                  @search="onSearch"
                  enterButton
                  size="small"
                  v-model="searchModuleName"
                ></v-input-search>
              </div>
              <v-button
                type="primary"
                size="small"
                class="fr"
                @click="handleAddModulesClick"
                >新增</v-button
              >
            </div>
            <v-table
              :rowKey="(record) => record.mid"
              :indentSize="30"
              :columns="columns"
              :dataSource="tabledata"
              :scroll="{ y: 500 }"
              :pagination="false"
              :loading="loading"
              :expandedRowKeys="expandedRowKeys"
              @change="handleTableChange"
              bordered
            >
              <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                  <v-button-group size="small">
                    <v-button
                      @click="() => handleAddChildModule(record)"
                      v-if="!record.child"
                      >添加</v-button
                    >
                    <v-button @click="() => handleEidtModule(record)"
                      >编辑</v-button
                    >
                    <v-button @click="() => handleDeleteModule(record)"
                      >删除</v-button
                    >
                    <v-button @click="() => handleView(record)"
                      >查看接口</v-button
                    >
                  </v-button-group>
                </div>
              </template>
            </v-table>
          </pane>
        </splitpanes>
      </div>
    </v-card>

    <v-modal
      title="项目名称"
      v-model="projVisible"
      @ok="handleProjOk"
      @cancel="handleProjCancel"
      :maskClosable="false"
    >
      <v-form-model
        ref="formproj"
        :model="formProj"
        :rules="ruleProj"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <v-form-model-item label="名称" prop="projectname">
          <v-input type="text" v-model="formProj.projectname" />
        </v-form-model-item>
      </v-form-model>
    </v-modal>

    <v-modal
      title="模块名称"
      v-model="modleVisible"
      @ok="handleModleOk"
      @cancel="handleModleCancel"
      :maskClosable="false"
    >
      <v-form-model
        ref="formModle"
        :model="formModle"
        :rules="ruleModle"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <v-form-model-item label="上级模块" prop="pmid">
          <v-select
            v-model="formModle.pmid"
            style="width: 100%"
            :options="pmidOptions"
          ></v-select>
        </v-form-model-item>
        <v-form-model-item label="名称" prop="modulename">
          <v-input type="text" v-model="formModle.modulename" />
        </v-form-model-item>
      </v-form-model>
    </v-modal>
  </div>
</template>

<script>
import Util from "@/libs/util";

const convertSelectData = (data) => {
  let result = [
    {
      label: "顶级模块",
      value: "0",
    },
  ];
  data.forEach((item) => {
    if (item.pmid === 0) {
      result.push({
        label: item.modulename,
        value: item.mid.toString(),
      });
    }
  });
  return result;
};

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
  name: "project_index",
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      listLoading: false,
      projVisible: false,
      projModalType: true,
      paginationProj: {
        size: "small",
        simple: true,
        total: 1,
        onChange: (page) => {
          this.onShowSizeChange(page);
        },
      },
      formProj: {
        projectname: "",
      },
      ruleProj: {
        projectname: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" },
        ],
      },
      projectListData: [],
      selectedProject: "",

      searchModuleName: "",
      modModalType: true,
      modleVisible: false,
      pmidOptions: [],
      formModle: {
        modulename: "",
        pmid: "0",
      },
      ruleModle: {
        pmid: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        modulename: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
          { pattern: /^(?!(\s+$))/, message: "不可为纯空格" },
        ],
      },
      tabledata: [],
      expandedRowKeys: [],
      //pagination: { showQuickJumper: true },
      loading: false,
      columns: [
        {
          title: "模块名称",
          dataIndex: "modulename",
        },
        {
          title: "操作",
          width: "30%",
          scopedSlots: { customRender: "operation" },
          align: "center",
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.fetchProject(1);
    },
    //获取项目列表
    fetchProject(pageNum) {
      this.listLoading = true;
      this.$request({
        method: "GET",
        url: `/projects`,
        params: {
          page: pageNum,
          pagesize: 10,
        },
      })
        .then((res) => {
          if (res) {
            this.projectListData = res.data.rows;
            this.selectedProject = res.data.rows.length
              ? res.data.rows[0].pid
              : "";
            this.paginationProj.total = res.data.totals;
            this.fetch(1);
          }
          this.listLoading = false;
        })
        .catch((err) => {
          this.listLoading = false;
        });
    },
    //新增项目
    handleAddProjectClick() {
      this.projModalType = true;
      this.projVisible = true;
    },
    //项目新增确认
    handleProjOk() {
      this.$refs["formproj"].validate((valid) => {
        if (valid) {
          let params = {
            projectname: this.formProj.projectname,
          };
          let method = "POST";
          let url = "/projects";
          if (!this.projModalType) {
            method = "PATCH";
            url = `/projects/${this.formProj.pid}`;
          } else {
            params.createtime = Util.formatDate(new Date());
          }
          this.$request({
            method,
            url,
            data: params,
          }).then((res) => {
            if (res) {
              this.$message.success(res.message);
              this.fetchProject(1);
              this.handleProjCancel();
            }
          });
        } else {
          this.$message.error("验证失败!");
        }
      });
    },
    //项目新增取消
    handleProjCancel() {
      this.$refs["formproj"].resetFields();
      this.projVisible = false;
    },
    //项目编辑
    handleEidtProj(record) {
      this.projModalType = false;
      this.projVisible = true;
      this.$nextTick(() => {
        this.formProj = Object.assign({}, this.formProj, record);
      });
    },
    //项目删除
    handleDeleteProj(record) {
      let _this = this;
      this.$confirm({
        title: "提示",
        content: "删除项目将会移除其下面所有的模块及接口且不可恢复",
        onOk() {
          _this
            .$request({
              method: "POST",
              url: "/projects/delete",
              data: {
                id: record.pid,
              },
            })
            .then((res) => {
              if (res) {
                _this.$message.success(res.message);
                _this.fetchProject(1);
              }
            });
        },
      });
    },
    //选择项目
    handleSelectProj(record) {
      this.searchModuleName = "";
      this.selectedProject = record.pid;
      this.fetch(1);
    },
    //项目分页
    onShowSizeChange(page) {
      this.fetchProject(page);
    },
    //获取表格数据   pageNum  当前请求的页码
    fetch(pageNum) {
      this.loading = true;
      this.$request({
        method: "GET",
        url: `/modules`,
        params: {
          modulename: this.searchModuleName,
          projectid: this.selectedProject,
          page: pageNum,
          pagesize: 10,
        },
      }).then((res) => {
        if (this.searchModuleName == "") {
          this.pmidOptions = convertSelectData(res.data.rows);
          this.tabledata = convertToTreeData(res.data.rows, 0);
          this.expandedRowKeys = this.tabledata
            .map((item) => {
              if (item.children) {
                return item.mid;
              }
            })
            .filter((item) => {
              return item != undefined;
            });
        } else {
          this.tabledata = res.data.rows;
        }

        /* this.pagination = Util.pager(this, this.pagination, {
          current: pageNum,
          total: res.data.totals
        }); */
        this.loading = false;
      });
    },
    //表格分页
    handleTableChange(p, t, r) {
      this.fetch(p.current);
    },
    //新增模块
    handleAddModulesClick() {
      this.modModalType = true;
      this.modleVisible = true;
    },
    //搜索
    onSearch() {
      this.fetch(1);
    },
    //模块新增确认
    handleModleOk() {
      this.$refs["formModle"].validate((valid) => {
        if (valid) {
          let params = {
            modulename: this.formModle.modulename,
            projectid: this.selectedProject,
            pmid: parseInt(this.formModle.pmid),
          };
          let method = "POST";
          let url = "/modules";
          if (!this.modModalType) {
            method = "PATCH";
            url = `/modules/${this.formModle.mid}`;
          } else {
            params.createtime = Util.formatDate(new Date());
          }

          this.$request({
            method,
            url,
            data: params,
          }).then((res) => {
            if (res) {
              this.$message.success(res.message);
              this.fetch(1);
              this.handleModleCancel();
            }
          });
        } else {
          this.$message.error("验证失败!");
        }
      });
    },
    //模块新增取消
    handleModleCancel() {
      this.$refs["formModle"].resetFields();
      this.modleVisible = false;
    },
    //编辑模块
    handleEidtModule(record) {
      this.modModalType = false;
      this.modleVisible = true;
      this.$nextTick(() => {
        record.pmid = record.pmid.toString();
        this.formModle = Object.assign({}, this.formModle, record);
      });
    },
    //查看接口
    handleView(record) {
      this.$router.push({
        name: "interface_index",
        query: {
          pid: this.selectedProject,
          mid: record.mid,
        },
      });
    },
    //添加子级模块
    handleAddChildModule(record) {
      this.modModalType = true;
      this.modleVisible = true;
      this.formModle.pmid = record.mid.toString();
    },
    //删除模块
    handleDeleteModule(record) {
      let _this = this;
      this.$confirm({
        title: "提示",
        content: "删除模块将会移除其下面所有的接口且不可恢复?",
        onOk() {
          _this
            .$request({
              method: "POST",
              url: "/modules/delete",
              data: {
                id: record.mid,
              },
            })
            .then((res) => {
              if (res) {
                _this.$message.success(res.message);
                _this.fetch(1);
              }
            });
        },
      });
    },
  },
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
  height: 750px;
  .split-pane {
    padding: 20px;
  }
}
</style>