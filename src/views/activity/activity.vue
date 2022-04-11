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
               @row-click="begin"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <!--        <el-button type="danger"-->
        <!--                   size="small"-->
        <!--                   icon="el-icon-delete"-->
        <!--                   plain-->
        <!--                   @click="handleDelete">删 除-->
        <!--        </el-button>-->
      </template>

    </avue-crud>
  </basic-container>

</template>


<script>
import {getList, getDetail, add, update, remove, begin} from "@/api/activity/activity";
import {mapGetters} from "vuex";
import AvueMap from 'avue-plugin-map'

export default {
  data() {
    return {
      form: {
        map: [113.10235504165291, 41.03624227495205, "内蒙古自治区乌兰察布市集宁区新体路街道顺达源广告传媒"]
      },
      // form: {},
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
            label: "id",
            prop: "id",
            addDisplay: false,
            editDisplay: false,
            hide: true,
            rules: [{
              required: true,
              message: "请输入id",
              trigger: "blur"
            }]
          },
          {
            label: "活动名称",
            prop: "activityName",
            search: true,
            rules: [{
              required: true,
              message: "请输入活动名称",
              trigger: "blur"
            }]
          },
          {
            label: "活动时间",
            prop: "activityTime",
            valueFormat: 'yyyy-MM-dd HH:mm',
            type: "date",
            rules: [{
              required: true,
              message: "请输入活动时间",
              trigger: "blur"
            }]
          },
          {
            label: "活动描述",
            overHidden: true,
            type: "textarea",
            prop: "activityDescription",
            rules: [{
              required: true,
              message: "请输入活动描述",
              trigger: "blur"
            }]
          },
          {
            label: "活动原因",
            prop: "activityCase",
            type: "textarea",
            overHidden: true,
            rules: [{
              required: true,
              message: "请输入活动原因",
              trigger: "blur"
            }]
          },
          {
            label: "支付方式",
            prop: "paymentMethod",
            type: "radio",
            dicData: [
              {
                label: "AA付款",
                value: 1
              },
              {
                label: "选择付款",
                value: 2
              }
            ],
            rules: [{
              required: true,
              message: "请选择支付方式",
              trigger: "blur"
            }]
          },
          {
            label: "活动地点",
            overHidden: true,
            prop: "activityAddress",
            component: "avueMap",
            rules: [{
              required: true,
              message: "",
              trigger: "blur"
            }],
            value: {
              "formattedAddress": "",
              "longitude": '',
              "latitude": ''
            },
          },

          {
            label: "活动状态",
            prop: "status",
            search: true,
            addDisplay: false,
            editDisplay: false,
            type: "radio",
            dicData: [
              {
                label: "未开始",
                value: 1
              },
              {
                label: "待开始",
                value: 2
              }, {
                label: "已开始",
                value: 3
              },
              {
                label: "已结束",
                value: 4
              }
            ],
            rules: [{
              required: true,
              message: "请选择支付方式",
              trigger: "blur"
            }]
          },
          {
            label: "是否已删除",
            hide: true,
            prop: "isDeleted",
            addDisplay: false,
            editDisplay: false,
            rules: [{
              required: true,
              message: "请输入是否已删除",
              trigger: "blur"
            }]
          },
          {
            label: "创建人",
            addDisplay: false,
            editDisplay: false,
            prop: "createUserName",
            overHidden: true,
            rules: [{
              required: true,
              message: "请输入活动时间",
              trigger: "blur"
            }]
          },
          {
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
            editDisplay: false,
            hide: true,
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
            editDisplay: false,
            hide: true,
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
        addBtn: this.vaildData(this.permission.activity_add, true),
        viewBtn: this.vaildData(this.permission.activity_view, true),
        delBtn: this.vaildData(this.permission.activity_delete, true),
        editBtn: this.vaildData(this.permission.activity_edit, true)
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
      row.activityAddress = row.activityAddress.formattedAddress;
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
      row.activityAddress = row.activityAddress.formattedAddress;
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
    , begin(row, event, column) {
      if (row.status != 1) {
        // this.$message.info("该活动已开始或已结束！")
        return;
      }
      var msg = "确定开始:" + row.activityName + "活动吗?";
      this.$confirm(msg, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return begin(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    }
  }
};
</script>

<style>
</style>
