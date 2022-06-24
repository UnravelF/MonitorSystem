<template>
  <div class="block">
    <el-empty description="暂无报警记录" v-if="alert"></el-empty>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <el-timeline>
        <li class="infinite-list-item" v-for="(item, index) in warnData" :key="index" >
          <el-timeline-item :timestamp="item.createTime.substring(0, 10)" placement="top">
            <el-card>
              <h2>{{item.entityType === 1 ? "温度预警" : (item.entityType === 2 ? "湿度预警" : "烟雾预警")}}：</h2>
              <h3>设备名称：{{item.deviceName}}<br>设备ID：{{item.deviceId}}<br>
              <span style="color: #409EFF">阈值：{{item.dataLimit}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #F56C6C">数值：{{item.data}}</span>
              </h3>
              <p>{{item.createTime}}</p>
            </el-card>
          </el-timeline-item>
        </li>
      </el-timeline>
    </ul>
  </div>
</template>

<script>
  import {getWarninlog} from '../../network/basic'

  export default {
    data() {
      return {
        // 历史警报分页
        current: 1,
        // 获取数据数目
        size: 8,
        // 存储报警信息数组
        warnData: [],
        alert: true
      }
    },
    created() {
      this.getWarnin(this.current, this.size)
    },
    computed: {
    },
    watch: {},
    methods: {
      // 获取历史报警信息
      getWarnin(current, size) {
        getWarninlog(current, size).then(res => {
          this.warnData = res.data.logList
          console.log(this.warnData)
          console.log(res);
          if(res.data.total > 0) {
            this.alert = false
          } 
        })
      },
      // 滚动到底部事件
      load() {
        this.current += 1
        getWarninlog(this.current, this.size).then(res => {
          res.data.logList.forEach((val, index) => {
            this.warnData.push(val)
          })
        })
      }
    }
  };
</script>

<style>
.block {
  height: 2160px;
}
.block h2 {
  color: #f50d0d;
  margin: 10px 0;
}
.block h3 {
  /* color: #606266; */
  font-weight: normal;
  line-height: 30px;
}
.block p {
  color: #606266;
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
</style>