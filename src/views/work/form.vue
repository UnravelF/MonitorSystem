<template>
  <div>
    <el-row class="flex-wrap" :gutter="20">
      <el-col :xl="12" class="mb20">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <form action="" class="form-search">
              <label for="workId">工单编号:</label>
                <input class="form-content" type="text" name="" id="workId" placeholder="请输入">
              <label for="workState">工单状态:</label>
                <input class="form-content" type="text" name="" id="workState" placeholder="请输入">
              <input type="submit" value="查询" class="form-sub">
            </form>
            <div class="add">
              <button>
                <i class="fa fa-plus-circle"></i>
                新建
                </button>
            </div>
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="workId" label="工单编号" width="120"></el-table-column>
            <el-table-column prop="equipmentId" label="设备ID" width="120"></el-table-column>
            <el-table-column prop="workType" label="工单类型" width="120"></el-table-column>
            <el-table-column prop="workState" label="工单状态" width="120"></el-table-column>
            <el-table-column prop="staffName" label="运维人员" width="120"></el-table-column>
            <el-table-column prop="workDate" label="创建日期" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  class="padding-0"
                >查看</el-button>
                <el-button type="text" size="small" class="padding-0">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageBackground: false,
      styleValue: "false",
      optionsArr: ["total", "prev", "pager", "next"],
      pageOptions: ["total", "prev", "pager", "next"],
      showHelpTip1: false,
      dropType: "row",
      tableData: [
        {
          workId: "202201",
          equipmentId: "01003",
          workType: "维修工单",
          workState: "完成",
          staffName: "运维刘小盛",
          workDate: "2022.03.22 19:36:19"
        },
        {
          workId: "202202",
          equipmentId: "01002",
          workType: "维修工单",
          workState: "取消",
          staffName: "运维吴小贤",
          workDate: "2022.04.19 19:36:19"
        },
        {
          workId: "202203",
          equipmentId: "01003",
          workType: "维修工单",
          workState: "取消",
          staffName: "运维范小邦",
          workDate: "2022.04.21 19:36:19"
        },
        {
          workId: "202204",
          equipmentId: "01004",
          workType: "维修工单",
          workState: "完成",
          staffName: "运维周小康",
          workDate: "2022.04.23 19:36:19"
        }
      ]
    }
  },
  created() {
  },
  computed: {

  },
  watch: {},
  methods: {
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.drag-btn {
  cursor: move;
  font-size: 12px;
}

.form-search {
  display: inline-block;
}

.form-search label {
  line-height: 36px;
  text-align: right;
  font-size: 14px;
  color: #606266;
  padding-right: 12px;
  margin-left: 10px;
}

.form-content {
  height: 36px;
  line-height: 36px;
  padding-right: 30px;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #d8dde3;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  outline: none;
  padding: 0 15px;
}

.form-sub {
  /* display: inline-block; */
  justify-content: center;
  align-items: center;
  min-width: 80px;
  height: 36px;
  background-color: #5f84ff;
  border: none;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  margin-left: 10px;
}

.add {
  margin: 20px 0 0 10px;
}

.add button {
  width: 80px!important;
  height: 36px;
  padding: 0;
  background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
  color: #fff;
  border: none;
  font-size: 14px;
  border-radius: 4px;
}
</style>