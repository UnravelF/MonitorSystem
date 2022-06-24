<template>
  <div class="device-form">
    <div class="form-message">
      <el-form :model="device" :rules="rules" ref="device" label-width="100px" class="demo-ruleForm">
        <h3>修改设备信息</h3>
        <div class="device">
          <el-form-item label="设备ID：" prop="deviceId">
          <el-input type="text" v-model="device.deviceId"></el-input>
          </el-form-item>
        </div>
        <div class="device">
          <el-form-item label="设备名称：" prop="deviceName">
            <el-input type="text" v-model="device.deviceName"></el-input>
          </el-form-item>
        </div>
        <div class="device">
          <el-form-item label="设备地址：" prop="location">
            <el-input type="text" v-model="device.location"></el-input>
          </el-form-item>
        </div>
        <div class="device">
          <el-form-item label="温度阈值：" prop="temLimit">
            <el-input type="text" v-model="device.temLimit"></el-input>
          </el-form-item>
        </div>
        <div class="device">
          <el-form-item label="湿度阈值：" prop="humLimit">
            <el-input type="text" v-model="device.humLimit"></el-input>
          </el-form-item>
        </div>
        <div class="device">
          <el-form-item label="烟感阈值：" prop="smokeLimit">
            <el-input type="text" v-model="device.smokeLimit"></el-input>
          </el-form-item>
        </div>
        <div class="btn">
          <button @click="editClick">修改</button>
          <button @click="cancelEdit">取消</button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {editDeviceById, editDevice} from '../../network/basic'

  export default {
    name: "editDevice",
    props: {
      deviceid: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        device: {},
        // 验证规则
        rules: {
          deviceId: [
            { required: true, message: '设备ID，不能为空', trigger: 'blur' }
          ],
          location: [
            { required: true, message: '设备地址，不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      // 获取设备信息
      this.getDeviceById(this.deviceid)
    },
    methods: {
      // 修改设备事件
      editClick() {
        this.$emit('editdevice')
        // 发送修改请求
        this.editDevice(this.deviceid, this.device)
      },
      // 取消修改
      cancelEdit() {
        this.$emit('cancelEdit')
      },
      // 根据设备id获取信息
      getDeviceById(id) {
        editDeviceById(id).then(res => {
          this.device = res.data
        })
      },
      // 根据设备id更新设备信息请求方法
      editDevice(id, device) {
        editDevice(id, device.deviceId, device.deviceName, device.location, device.temLimit, device.humLimit,device.smokeLimit).then(res =>{
          console.log(res);
          // 对请求结果进行判断
          if(res.status === 100) {
            this.$message({
              showClose: true,
              message: '修改设备成功',
              type: 'success'
            })
            // 页面刷新
            setTimeout(function(){
              location.reload()
            },500)
          }else {
            this.$message({
              showClose: true,
              message: ' 发生未知错误, 修改设备失败',
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
.device-form {
    width: 100%;
    height: 100%;
    background-color: rgba( 0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-message {
    background-color: #fff;
    width: 500px;
    height: 500px;
    text-align: center;
    border-radius: 10px;
  }

  .device {
    margin: 20px 30px;
    font-size: 18px;
  }

  .device input {
    width: 294px;
    height: 36px;
    outline: none;
    font-size: 16px;
    vertical-align: middle;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
  }

  .btn button{
    margin: 0 10px;
  }
</style>
