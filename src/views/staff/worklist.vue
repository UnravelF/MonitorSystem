<template>
  <div>
    <el-row class="flex-wrap" :gutter="20">
      <el-col :xl="12" class="mb20">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <form action="" class="form-search">
              <label for="staffId">人员搜索:</label>
                <input class="form-content" type="text" name="" id="staffId" placeholder="请输入">
              <label>角色:</label>
                <select class="form-content" type="text" name="role">
                  <option selected>请选择</option>
                  <option value="运营员">运营员</option>
                  <option value="维修员">维修员</option>
                </select>
              <input type="submit" value="查询" class="form-sub">
            </form>
            <div class="arrange">
              <!-- 分配职位弹框 -->
              <template v-if="showForm">
                <arrange-role @buildClick="buildClick" @cancelClick="cancelClick" :uid="userId"/>
              </template>
            </div>  
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="nickName" label="昵称"></el-table-column>
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="roleName" label="职位"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  class="padding-0"
                  @click="arrangeClick(scope.$index, scope.row)">分配职位</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getUserRole} from '../../network/staff'

  import ArrangeRole from './arrangeRole'

export default {
  components: {
    ArrangeRole
  },
  data() {
    return {
      tableData: [],
      // 分页 数据量
      current: 1,
      size: 8,
      showForm: false,
      userId: 0,
      roleId: 0
    }
  },
  created() {
    this.getRole(this.current, this.size)
  },
  methods: {
    // 获取角色列表
    getRole(current, size) {
      getUserRole(current, size).then(res => {
        console.log(res);
        this.tableData = res.data.userRoleList
      })
    },
    // 分配角色点击事件
    arrangeClick(index, row) {
      this.showForm = true;
      this.userId = row.userId
      this.roleId = row.roleId
    },
    // 修改设备信息传递点击事件
    buildClick() {
      this.showForm = false;
    },
    // 取消修改设备信息传递点击事件
    cancelClick() {
      this.showForm = false;
    },
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
  
  .arrange {
  margin: 20px 0 0 10px;
  }

  .arrange button {
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