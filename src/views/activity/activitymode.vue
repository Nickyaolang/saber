<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.activitymode_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/activity/activitymode";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          selectRow: '',
          indexLabel:'序号',
          rowKey:"",
          selection:false,
          height:'auto',
          calcHeight: 30,
          tip: false,
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: false,
          viewBtn: true,
          selection: true,
          dialogClickModal: false,
          column: [
            {
              label: "id",
              hide:true,
              addDisplay: false,
              editDisplay: false,
              prop: "id",
              rules: [{
                required: true,
                message: "请输入id",
                trigger: "blur"
              }]
            },
            {
              label: "模版名称",
              search:true,
              prop: "name",
              searchTip:'根据模板名称进行搜索噢！',
              rules: [{
                required: true,
                message: "请输入模版名称",
                trigger: "blur"
              }]
            },
            {
              label: "活动名称",
              prop: "activityName",
              rules: [{
                required: true,
                message: "请输入活动名称",
                trigger: "blur"
              }]
            },
            {
              label: "活动地点",
              prop: "address",
              rules: [{
                required: true,
                message: "请输入活动地点",
                trigger: "blur"
              }]
            },
            {
              label: "活动时间",
              prop: "activityTime",
              type:"date",
              overHidden:true,
              rules: [{
                required: true,
                message: "请输入活动时间",
                trigger: "blur"
              }]
            },
            {
              label: "活动描述",
              prop: "activityDescription",
              overHidden:true,
              rules: [{
                required: true,
                message: "请输入活动描述",
                trigger: "blur"
              }]
            },
            {
              label: "活动原因",
              prop: "activityCase",
              overHidden:true,
              rules: [{
                required: true,
                message: "请输入活动原因",
                trigger: "blur"
              }]
            },
            {
              label: "状态",
              hide:true,
              prop: "status",
               addDisplay: false,
              editDisplay: false,
              rules: [{
                required: true,
                message: "请输入状态",
                trigger: "blur"
              }]
            },
            {
              label: "是否已删除",
               addDisplay: false,
               hide:true,
              editDisplay: false,
              prop: "isDeleted",
              rules: [{
                
                required: true,
                message: "请输入是否已删除",
                trigger: "blur"
              }]
            },
            {
              label: "创建人",
              prop: "createUser",
              addDisplay: false,
              overHidden:true,
              editDisplay: false,
              rules: [{
                required: true,
                message: "请输入创建人",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "createTime",
              overHidden:true,
              addDisplay: false,
              type:"date",
              editDisplay: false,
              rules: [{
                required: true,
                message: "请输入创建时间",
                trigger: "blur"
              }]
            },
            {
              label: "最后更新人",
              prop: "updateUser",
              addDisplay: false,
              editDisplay: false,
               hide:true,
              rules: [{
                 hide:true,
                required: true,
                message: "请输入最后更新人",
                trigger: "blur"
              }]
            },
            {
              label: "最后更新时间",
              prop: "updateTime",
              addDisplay: false,
              editDisplay: false,
               hide:true,
              rules: [{
                hide:true,
                required: true,
                message: "请输入最后更新时间",
                trigger: "blur"
              }]
            },
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.activitymode_add, true),
          viewBtn: this.vaildData(this.permission.activitymode_view, true),
          delBtn: this.vaildData(this.permission.activitymode_delete, true),
          editBtn: this.vaildData(this.permission.activitymode_edit, true)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    methods: {
      rowSave(row, done, loading) {
        add(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          loading();
          window.console.log(error);
        });
      },
      rowUpdate(row, index, done, loading) {
        update(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          loading();
          console.log(error);
        });
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        done();
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.page.currentPage = 1;
        this.onLoad(this.page, params);
        done();
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }
    }
  };
</script>

<style>
</style>
