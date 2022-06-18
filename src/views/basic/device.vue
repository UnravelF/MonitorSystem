<template>
  <div>
    <el-row class="flex-wrap" :gutter="20">
      <el-col :xl="12" class="mb20">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <!-- 设备关键字搜索设备 -->
            <form action="" class="form-search">
            <label for="deviceKeyword">设备关键字:</label>
              <input class="form-content" type="text" name="" id="deviceKeyword" v-model="deviceKeyword" placeholder="请输入设备关键字">
              <el-button type="primary" icon="el-icon-search" class="device-btn" @click="getDeviceById">搜索</el-button>
              <el-button type="primary" icon="el-icon-arrow-left" class="device-btn" round v-show="back" @click="backClick">返回</el-button>
            </form>
            <div class="addDevice">
              <button  @click="addClick">
                <i class="fa fa-plus-circle"></i>
                新建
              </button>
              <!-- 添加设备表单 -->
              <template  v-if="showaddForm">
                <add-device @buildClick="buildClick" @cancelClick="cancelClick"/>
              </template>
              <!-- 编辑设备信息表单 -->
              <template v-if="showeditForm">
                <edit-device @editdevice="editdevice" @cancelEdit="cancelEdit" :deviceid="devId"/>
              </template>
            </div>  
          </div>
          <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="deviceId" label="设备ID" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="deviceName" label="设备名称" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="location" label="地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="temLimit" label="温度阈值" width="120"></el-table-column>
            <el-table-column prop="humLimit" label="湿度阈值" width="120"></el-table-column>
            <el-table-column prop="smokeLimit" label="烟感阈值" width="120"></el-table-column>
            <el-table-column prop="tem" label="温度" width="120"></el-table-column>
            <el-table-column prop="hum" label="湿度" width="120" ></el-table-column>
            <el-table-column prop="smoke" label="烟感" width="120"></el-table-column>
            <el-table-column prop="status" label="设备状态" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" 
                           size="small"
                           class="padding-0" 
                           @click="editClick(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  type="text"
                  size="small"
                  class="padding-0" @click="deleteClick(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
              background
              layout="prev, pager, next"
              :total="totalDevice"
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
  import {getEquipmentData, deleteDeviceById} from "../../network/basic";

  // 引入Websocket
  import {sendWebsocket, closeWebsocket} from '../../network/webscoket'

  // 添加设备
  import AddDevice from './addDevice'
  // 修改设备
  import EditDevice from './editDevice'

  export default {
    components: {
      AddDevice,
      EditDevice
    },
    data() {
      return {
        // 存储设备信息数组
        tableData: [],
        // 存储分页新数据
        pageData: [],
        // 添加设备表单显示属性
        showaddForm: false,
        // 修改设备表单显示属性
        showeditForm: false,
        // 存储WebSocket传输的信息
        deviceMessage: "",
        // 首页设备信息分页，数据条
        current: 1,
        size: 8,
        // 搜索设备关键词
        deviceKeyword: "",
        // 设备信息总数
        totalDevice: 0,
        // 编辑设备id
        devId: "",
        back: false
      }
    },
    created() {
      // 发送WebSocket请求 建立数据通道
      this.requestWs();
      this._getEquipmentData(this.current, this.size, this.keyWord)
    },
    computed: {
    },
    watch: {},
    methods: {
      // 获取现有设备数据
      _getEquipmentData(current, size, keyWord) {
        getEquipmentData(current, size, keyWord).then(res => {
          console.log(res);
          this.tableData = res.data.deviceList
          // 获取设备总数
          this.totalDevice = res.data.total
          for(var i = 0; i < this.tableData.length; i++) {
            // 根据设备id获取对应传感器数据
            if(this.tableData[i].deviceId === this.deviceMessage['deviceId']) {
              this.tableData[i].tem = this.deviceMessage['tem'] + '℃'
              this.tableData[i].hum = this.deviceMessage['hum'] + '%'
              this.tableData[i].smoke = this.deviceMessage['smoke'] + 'ppm'
            }else {
              this.tableData[i].tem = '0' + '℃'
              this.tableData[i].hum = '0' + '%'
              this.tableData[i].smoke = '0' + 'ppm'
            }
            // 判断设备状态
            this.tableData[i].status == 1 ?  this.tableData[i].status = "运行" : this.tableData[i].status =  "维护"
            // 判断是否设置设备阈值
            this.tableData[i].humLimit == null ? this.tableData[i].humLimit = "未设置" : this.tableData[i].humLimit
            this.tableData[i].temLimit == null ? this.tableData[i].temLimit = "未设置" : this.tableData[i].temLimit
            this.tableData[i].smokeLimit == null ? this.tableData[i].smokeLimit = "未设置" : this.tableData[i].smokeLimit
          }          
        })
      },
      // 判断传感器数据是否超过设定阈值
      tableRowClassName({row, rowIndex}) {
        if (row.tem >= row.temLimit || row.hum >= row.humLimit || row.smoke >= row.smokeLimit) {
          if((row.tem - row.temLimit) >= 5 || row.hum - row.humLimit >= 10 || row.smoke - row.smokeLimit >= 50) {
            return 'error-row'
          }else{
            return 'warning-row';
          }
        } else{
          return '';
        }
      },
      // 新增设备点击事件
      addClick() {
        this.showaddForm = true;
      },
      // 编辑设备点击事件
      editClick(index, row) {
        this.showeditForm = true;
        this.devId = this.tableData[index].id
      },
      // 删除设备点击事件
      deleteClick(index, row) {
        // 获取设备唯一id
        this.devId = this.tableData[index].id
        // 删除设备弹出提示
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 根据id删除设备
          deleteDeviceById(this.devId).then(res => {
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
                message: '发送错误，删除失败!'
              });
            }
          })
        })
      },
      // 添加设备传递的事件
      buildClick() {
        this.$nextTick(()=> {
          this.showaddForm = false;
        })
      },
      // 取消添加设备点击事件
      cancelClick() {
        this.showaddForm = false;
      },
      // 修改设备信息传递点击事件
      editdevice() {
        this.showeditForm = false;
      },
      // 取消修改设备信息传递点击事件
      cancelEdit() {
        this.showeditForm = false;
      },
      // 点击分页获取前一页数据
      getPrevData() {
        if(this.current > 0) {
          this.current -=1;
          this._getEquipmentData(this.current, this.size)
        }
      },
      // 点击分页按钮渲染更多数据
      getMoreData() {
        this.current += 1
        this._getEquipmentData(this.current, this.size)
      },
      // 分页改变点击事件
      getAnotherPage(index) {
        this._getEquipmentData(index, this.size)
      },
      // 根据设备关键字获取设备信息
      getDeviceById() {
        let cur = ""
        let sized = ""
        // 发送搜索请求
        this._getEquipmentData( cur, sized, this.deviceKeyword)
        this.back = true
      },
      // 返回首页
      backClick() {
        location.reload()
        // this.back = false
      },
      // webSocket实现数据实时互通
      requestWs() {
        // 发送ws请求
        // 192.168.43.159:8080
        sendWebsocket('ws://192.168.149.39:8080/ws', null, this.wsMessage, this.wsError)
      },
      // 对获取的后端传感器最新数据处理
      wsMessage(data) {
        const dataJson = data
        console.log(dataJson);
        this.deviceMessage = dataJson
        this.deviceMessage = eval('('+this.deviceMessage+')')
        // 得到传感器实时数据后，再次发送获取现有设备数据
        this._getEquipmentData(this.current, this.size)
      },
      // ws连接失败，输出错误
      wsError() {
        console.log('连接失败，发生未知错误');
      }
    },
    beforeDestroy() {
      // 关闭页面后关闭WebSocket请求
      closeWebsocket()
    }
  };
</script>

<style>
.el-table {
  margin-bottom: 20px;
}
/* 阈值limit样式 */
.el-table .warning-row {
  background: oldlace;
}

.el-table .error-row {
  background: rgb(253, 226, 226);
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

.addDevice {
  margin: 20px 0 0 10px;
}

.addDevice button {
  width: 80px!important;
  height: 36px;
  padding: 0;
  background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
  color: #fff;
  border: none;
  font-size: 14px;
  border-radius: 4px;
}

.device-btn {
  margin-left: 10px;
}
</style>