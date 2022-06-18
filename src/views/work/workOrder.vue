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
            <!-- 新建工单 -->
            <div class="addwork">
              <button @click="addWork">
                <i class="fa fa-plus-circle"></i>
                新建
              </button>
              <template  v-if="showForm">
                <add-work-order @buildClick="buildClick" @cancelClick="cancelClick"/>
              </template>
            </div>
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="type" label="工单类型" width="150"></el-table-column>
            <el-table-column prop="userName" label="工程师" width="150"></el-table-column>
            <el-table-column prop="nickName" label="工程师昵称" width="150"></el-table-column>
            <el-table-column prop="description" label="描述" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="工单状态" width="150"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  class="padding-0"
                  @click="finishClick(scope.$index, scope.row)">完成</el-button>
                <el-button type="text" size="small" class="padding-0" 
                           @click="deleteClick(scope.$index, scope.row)">
                           删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="TotalWokrOder"
            :page-size = 8
            @prev-click="getPrevData"
            @next-click="getMoreData"
            @current-change="getAnotherPage">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AddWorkOrder from './addWorkOrder'

  import {getWorkOrderData, finishWorkOrder, deleteWorkOrder} from '../../network/work'

  export default {
    components: {
      AddWorkOrder
    },
    data() {
      return {
        tableData: [],
        showForm: false,
        // 默认获取工单页及数据数  
        current: 1,
        size: 8,
        // 默认管理员
        adminId: 0,
        // 存储点击对应列的工单id
        workId: "",
        // 存储工单总数
        TotalWokrOder: 0
      }
    },
    created() {
      // 获取工单信息
      this.WorkOrderData(this.adminId, this.current, this.size)
    },
    computed: {

    },
    watch: {},
    methods: {
      // 新增设备点击事件
      addWork() {
        this.showForm = true;
      },
      // 新建工单传递事件
      buildClick() {
        this.$nextTick(()=> {
          this.showForm = false;
        })
      },
      cancelClick() {
        this.showForm = false;
      },
      // 分页获取已有工单数据
      WorkOrderData(userId, current, size) {
        getWorkOrderData(userId,current, size).then(res => {
          console.log(res);
          // 获取工单总数
          this.TotalWokrOder = res.data.total
          this.tableData = res.data.workOrderList
          // 对获取的工单类型进行判断并转换
          for(let i = 0;i < this.tableData.length; i++) {
            this.tableData[i].type == 1 ? this.tableData[i].type = '安装设备' : this.tableData[i].type = '维修设备'
            this.tableData[i].status == 0 ? this.tableData[i].status = '进行中' : this.tableData[i].status = '已完成' 
          }
        })
      },
      // 点击完成工单事件
      finishClick(index, row) {
        // 获取点击的工单id
        this.workId = this.tableData[index].id
        // 操作提示
        this.$confirm('确定该工单已完成?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送完成工单请求
          finishWorkOrder(this.workId).then(res => {
            console.log(res);
            // 对请求结果进行判断
            if(res.status === 100) {
              // 请求成功成功
              this.$message({
                type: 'success',
                message: '状态修改成功!'
              });
              // 页面重定向
              location.reload()
            } else {
              this.$message({
                showClose: true,
                message: ' 发生未知错误, 状态修改失败',
                type: 'error'
              })
            }
          })
        })
      },
      // 删除工单事件
      deleteClick(index, row) {
        // 获取点击的工单id
        this.workId = this.tableData[index].id
        // 操作提示
        this.$confirm('确定删除该工单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送删除工单请求
          deleteWorkOrder(this.workId).then(res => {
            console.log(res);
            // 对请求结果进行判断
            if(res.status === 100) {
              // 请求成功
              this.$message({
                type: 'success',
                message: '删除工单成功!'
              });
            } else {
              this.$message({
                showClose: true,
                message: ' 发生未知错误, 删除工单失败',
                type: 'error'
              })
            }
          })
        })
      },
      // 点击分页获取前一页数据
      getPrevData() {
        if(this.current > 0) {
          this.current -= 1
          this.WorkOrderData(this.adminId, this.current, this.size)
        }
      },
      // 点击分页按钮渲染更多数据
      getMoreData() {
        this.current += 1
        this.WorkOrderData(this.adminId, this.current, this.size)
      },
      // 分页改变点击事件
      getAnotherPage(index) {
        this.WorkOrderData(this.adminId, index, this.size)
      },
    }
  };
</script>

<style>
  .el-table {
    margin-bottom: 20px;
  }

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

  .addwork {
    margin: 20px 0 0 10px;
  }

  .addwork button {
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