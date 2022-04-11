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
                   v-if="permission.friend_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {getList, getDetail, add, update, remove} from "@/api/friend/friend";
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
        indexLabel: '序号',
        align: 'center',
        rowKey: "",
        selection: false,
        height: 'auto',
        calcHeight: 30,
        tip: false,
        stripe: true,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        viewBtn: false,
        dialogClickModal: false,
        column: [
          {
            label: "用户id",
            prop: "id",
            addDisplay: false,
            editDisplay: false,
            hide: true,
            rules: [{
              required: true,
              message: "请输入用户id",
              trigger: "blur"
            }]
          },
          {
            label: "姓名",
            prop: "name",
            search: true,
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          },
          {
            label: "年龄",
            prop: "age",
            rules: [{
              required: true,
              message: "请输入年龄",
              trigger: "blur"
            }]
          },
          {
            label: "手机号",
            prop: "phone",
            rules: [{
              required: true,
              message: "请输入手机号",
              trigger: "blur"
            }]
          },
          {
            label: "状态",
            addDisplay: false,
            editDisplay: false,
            prop: "status",
            hide:true,
            rules: [{
              required: true,
              message: "请输入状态",
              trigger: "blur"
            }]
          },
          {
            label: "是否已删除",
            prop: "isDeleted",
            addDisplay: false,
            editDisplay: false,
            type: "radio",
            dicData: [
              {
                label: "否",
                value: 0
              },
              {
                label: "是",
                value: 1
              }
            ],
          },
          {
            label: "创建人",
            prop: "createUser",
            hide:true,
            addDisplay: false,
            editDisplay: false,
            rules: [{
              required: true,
              message: "请输入创建人",
              trigger: "blur"
            }]
          },
          {
            label: "创建人姓名",
            prop: "createUserName",
            hide:true,
            addDisplay: false,
            editDisplay: false,
            rules: [{
              required: true,
              message: "请输入创建人姓名",
              trigger: "blur"
            }]
          },
          {
            hide:true,
            label: "创建时间",
            addDisplay: false,
            editDisplay: false,
            prop: "createTime",
            rules: [{
              required: true,
              message: "请输入创建时间",
              trigger: "blur"
            }]
          },
          {
            label: "最后更新人",
            addDisplay: false,
            hide:true,
            editDisplay: false,
            prop: "updateUser",
            rules: [{
              required: true,
              message: "请输入最后更新人",
              trigger: "blur"
            }]
          },
          {
            label: "最后更新时间",
            addDisplay: false,
            hide:true,
            editDisplay: false,
            prop: "updateTime",
            rules: [{
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
        addBtn: this.vaildData(this.permission.friend_add, false),
        viewBtn: this.vaildData(this.permission.friend_view, false),
        delBtn: this.vaildData(this.permission.friend_delete, false),
        editBtn: this.vaildData(this.permission.friend_edit, false)
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
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
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
