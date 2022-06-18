<template>
  <div class="device-form">
    <div class="form-message">
      <el-form :model="deviceinfo" :rules="rules" ref="deviceinfo" label-width="100px" class="demo-ruleForm">
        <h3>添加设备信息</h3>
        <div class="device">
          <el-form-item label="设备ID：" prop="DeviceId">
            <el-input type="text" v-model="deviceinfo.DeviceId"></el-input>
          </el-form-item>
        </div>
        <div class="device">
          <el-form-item label="设备名称：" prop="DeviceName">
            <el-input type="text" v-model="deviceinfo.DeviceName"></el-input>
          </el-form-item>
        </div>
        <div class="device">
          <el-form-item label="设备地址：" prop="DeviceAddress">
            <el-input type="text" v-model="deviceinfo.DeviceAddress"></el-input>
          </el-form-item>
        </div>
        <div class="device">
          <el-form-item label="温度阈值：" prop="temLimit">
            <el-input type="text" v-model="deviceinfo.temLimit"></el-input>
          </el-form-item>
        </div>
        <div class="device">
          <el-form-item label="湿度阈值：" prop="humLimit">
            <el-input type="text" v-model="deviceinfo.humLimit"></el-input>
          </el-form-item>
        </div>
        <div class="device">
          <el-form-item label="烟感阈值：" prop="smokeLimit">
            <el-input type="text" v-model="deviceinfo.smokeLimit"></el-input>
          </el-form-item>
        </div>
        <div class="btn">
          <button @click="buildClick">确定</button>
          <button @click="cancelClick">取消</button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {addEquipement} from '../../network/basic'

  export default {
    name: "addDevice",
    data() {
      return {
        deviceinfo: {
          DeviceId: "",
          DeviceName: "",
          DeviceAddress: "",
          temLimit: "",
          humLimit: "",
          smokeLimit: ""
        },
        rules: {
          DeviceId: [
            { required: true, message: '设备ID，不能为空', trigger: 'blur' }
          ],
          DeviceAddress: [
            { required: true, message: '设备地址，不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 新增设备
      _addEquipement(DeviceId, DeviceName, DeviceAddress, temLimit, humLimit, smokeLimit) {
        addEquipement(DeviceId, DeviceName, DeviceAddress, temLimit, humLimit, smokeLimit).then(res => {
          console.log(res);
          // 对请求结果进行判断
          if(res.status === 100) {
            this.$message({
              showClose: true,
              message: '恭喜你，新建设备成功',
              type: 'success'
            })
          }else {
            this.$message({
              showClose: true,
              message: ' 发生未知错误, 新建设备失败',
              type: 'error'
            })
          }
        })
      },
      buildClick() {
        this.$emit('buildClick')
        // 发送新增设备请求
        this._addEquipement(this.deviceinfo.DeviceId, this.deviceinfo.DeviceName, this.deviceinfo.DeviceAddress, this.deviceinfo.temLimit, this.deviceinfo.humLimit, this.deviceinfo.smokeLimit)
      },
      cancelClick() {
        this.$emit('cancelClick')
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
