<template>
  <div>
    <el-row class="flex-wrap" :gutter="20">
      <el-col :xl="12" class="mb20">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <form action="" class="form-search">
              <label for="staffId">人员搜索:</label>
                <input class="form-content" type="text" name="" id="staffId" placeholder="请输入">
              <input type="submit" value="查询" class="form-sub">
            </form>
            <div class="add">
              <button @click="addClick">
                <i class="fa fa-plus-circle"></i>
                新建
                </button>
                <!-- 添加人员表单 -->
              <template  v-if="showaddForm">
                <add-staff @buildClick="buildClick" @cancelClick="cancelClick"/>
              </template>
              <!-- 修改人员信息表单 -->
              <template  v-if="showeditForm">
                <edit-staff @editStaff="editStaff" @cancelEdit="cancelEdit"/>
              </template>
            </div>
          </div>
          <el-table :data="staffData" style="width: 100%">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="userName" label="用户名" width="120"></el-table-column>
            <el-table-column prop="nickName" label="人员名称" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
            <el-table-column prop="phone" label="电话" width="120"></el-table-column>
            <el-table-column prop="sex" label="性别" width="120"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="用户状态">
              <template slot-scope="scope" >
                <el-switch
                  style="display: block"
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="0"
                  @change="statusChange(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  class="padding-0"
                  @click="editClick(scope.$index, scope.row)">编辑</el-button>
                <el-button 
                  type="text" 
                  size="small" 
                  class="padding-0"
                  @click="deleteClick(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getStaffData, deleteUser} from '../../network/staff'

  import AddStaff from './addStaff'
  import EditStaff from './editStaff'

export default {
  components: {
    AddStaff,
    EditStaff
  },
  data() {
    return {
      pageBackground: false,
      styleValue: "false",
      optionsArr: ["total", "prev", "pager", "next"],
      pageOptions: ["total", "prev", "pager", "next"],
      showHelpTip1: false,
      dropType: "row",
      staffData: [],
      // 分页数
      current: 1,
      size: 8,
      // 添加职工信息弹框
      showaddForm: false,
      // 编辑职工信息弹框
      showeditForm: false
    }
  },
  created() {
    this.getStaff(this.current, this.size)
  },
  computed: {

  },
  watch: {},
  methods: {
    // 获取所有员工信息
    getStaff(current, size) {
      getStaffData(current, size).then(res => {
        console.log(res);
        // 获取用户总数
        this.staffData = res.data.userList
      })
    },
    // 新增设备点击事件
    addClick() {
      this.showaddForm = true;
    },
    // 添加人员传递的事件
    buildClick() {
      this.$nextTick(()=> {
        this.showaddForm = false;
      })
    },
    // 取消新建人员点击事件
    cancelClick() {
      this.showaddForm = false;
    },
    // 修改人员状态
    statusChange(row) {
      console.log(row.status);
      console.log(typeof(row.status));
    },
    // 编辑用户信息点击事件
    editClick(index, row) {
      console.log(index);
      console.log(row);
      this.showeditForm = true
    },
    // 删除用户信息点击事件
    deleteClick(index, row) {
      // 删除设备弹出提示
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 根据id删除用户
        deleteUser(row.id).then(res => {
          console.log(res);
          if( res.status === 100) {
            // 删除成功
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            // 删除成功
            this.$message({
              type: 'success',
              message: '发生未知错误，删除失败!'
            });
          }
        })
      })
    },
    // 编辑人员信息传递事件
    editStaff() {
      this.$nextTick(() => {
        this.showeditForm = false
      })
    },
    // 取消编辑人员信息传递事件
    cancelEdit() {
      this.$nextTick(() => {
        this.showeditForm = false
      })
    }
  },
  
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

/* 添加设备成功后提示信息样式 */
.addMessage {
  display: none;
}
</style>