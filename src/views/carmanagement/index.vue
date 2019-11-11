<template>
  <div class="run">
    <div class="search">
      <div>
        <span>查询车辆：</span>
        <el-input placeholder="请输入姓名" v-model="input" size="small" suffix-icon="el-icon-search"></el-input>
      </div>
      <!-- <div>
        <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
      </div>-->
      <div>
        <el-button type="success" size="mini" @click="addcar">车辆录入</el-button>
      </div>
    </div>
    <el-table stripe :data="search" style="width: 100%">
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.ownername }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证">
        <template slot-scope="scope">
          <span>{{ scope.row.cardid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备编号">
        <template slot-scope="scope">
          <span>{{ scope.row.tagcode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.carnum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          <span>{{ scope.row.caraddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popover placement="top" trigger="hover">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                type="primary"
                size="mini"
                @click="handleDelete(scope.$index, scope.row)"
              >确定</el-button>
            </div>
            <el-button size="mini" slot="reference" type="danger" style="margin-left: 10px;">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="pag">
      <el-pagination background :total="tableData.length" @current-change="change"></el-pagination>
    </div>

    <!-- 添加 -->
    <div class="dialog">
      <el-dialog title="车辆录入" :visible.sync="dialogVisible">
        <div class="form">
          <div>
            <span>您的姓名：</span>
            <el-input v-model="addCar.ownername" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span>身份证号：</span>
            <el-input v-model="addCar.cardid" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span>详细地址：</span>
            <el-input v-model="addCar.caraddress" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span>车辆品牌：</span>
            <el-input v-model="addCar.vehiclebrand" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span>车牌号码：</span>
            <el-input v-model="addCar.carnum" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span>设备编号：</span>
            <el-input v-model="addCar.tagcode" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addcar_ok">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 修改 -->
    <div class="dialog">
      <el-dialog title="信息修改" :visible.sync="dialogVisible1">
        <div class="form">
          <div>
            <span>您的姓名：</span>
            <el-input v-model="updateCar.ownername" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span>身份证号：</span>
            <el-input v-model="updateCar.cardid" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span>详细地址：</span>
            <el-input v-model="updateCar.caraddress" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span>车辆品牌：</span>
            <el-input v-model="updateCar.vehiclebrand" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span>车牌号码：</span>
            <el-input v-model="updateCar.carnum" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span>设备编号：</span>
            <el-input v-model="updateCar.tagcode" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="updateCar_ok">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { carList, carAdd, carDelete, carUpdate } from "@/utils/api";
export default {
  name: "",
  data() {
    return {
      input: "",
      dialogVisible: false,
      dialogVisible1: false,
      addCar: {
        ownername: "", //姓名
        cardid: "", //身份证
        caraddress: "", //联系地址
        vehiclebrand: "", //车辆品牌
        carnum: "", //车牌号码
        tagcode: "" //防盗编号|设备编号
      },
      updateCar: {
        id: "",
        ownername: "", //姓名
        cardid: "", //身份证
        caraddress: "", //联系地址
        vehiclebrand: "", //车辆品牌
        carnum: "", //车牌号码
        tagcode: "" //防盗编号|设备编号
      },
      tableData: []
    };
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      carList({}).then(res => {
        this.tableData = res.data;
        console.log(res, "车辆管理");
      });
    },
    addcar() {
      this.dialogVisible = true;
    },
    addcar_ok() {
      // console.log(this.addCar)
      let id_card = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; //身份证号正则
      if (!this.addCar.ownername) {
        this.$message.error("姓名不能为空");
        return;
      } else if (!id_card.test(this.addCar.cardid)) {
        this.$message.error("填写正确的身份证号码");
        return;
      } else if (!this.addCar.caraddress) {
        this.$message.error("联系地址不能为空");
        return;
      } else if (!this.addCar.vehiclebrand) {
        this.$message.error("车辆品牌不能为空");
        return;
      } else if (!this.addCar.carnum) {
        this.$message.error("车牌号码不能为空");
        return;
      } else if (!this.addCar.tagcode) {
        this.$message.error("设备编号不能为空");
        return;
      } else {
        carAdd(this.addCar).then(res => {
          // console.log(res)
          if (res.status == 1) {
            this.dialogVisible = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.query();
          } else {
            this.$message.error("未添加成功");
          }
        });
      }
    },

    handleEdit(index, row) {
      //编辑
      console.log(index, row.id);
      this.dialogVisible1 = true;

      this.updateCar.id = row.id;
      this.updateCar.ownername = row.ownername;
      this.updateCar.cardid = row.cardid;
      this.updateCar.caraddress = row.caraddress;
      this.updateCar.vehiclebrand = row.vehiclebrand;
      this.updateCar.carnum = row.carnum;
      this.updateCar.tagcode = row.tagcode;
    },
    updateCar_ok() {
      // console.log(this.updateCar)
      carUpdate(this.updateCar).then(res => {
        console.log(res);
        if (res.status == 1) {
          this.dialogVisible1 = false;
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.query();
        } else {
          this.$message.error("未修改成功");
        }
      });
    },
    handleDelete(index, row) {
      let id = { id: row.id };
      carDelete(id).then(res => {
        console.log(res);
        this.query();
      });

      // console.log(index, row);
    },
    change(data) {
      console.log(data);
    }
  },
  computed: {
    search() {
      return this.tableData.filter(item => {
        return item.ownername.match(this.input);
      });
    }
  }
};
</script>

<style scoped>
.run {
  overflow: auto;
  height: 100%;
}
.search {
  display: flex;
  padding: 12px 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 9px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}
.search > div {
  display: flex;
  margin: 0 4px;
}
.search > div span {
  width: 100px;
  line-height: 32px;
  font-size: 14px;
}
.run >>> .el-tabs__header {
  padding: 12px 20px;
  background: #f1f1f1;
  box-sizing: border-box;
  box-shadow: 0 2px 9px rgba(0, 0, 0, 0.3);
  margin: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
}

.run >>> .el-tabs__content {
  padding-top: 62px;
  height: 100%;
}
.run >>> .el-tabs__content > div {
  position: relative;
  height: 100%;
}
.run >>> .el-table {
  height: calc(100% - 99px);
  overflow: auto;
}
.run >>> .has-gutter > tr > th {
  font-size: 16px;
  font-weight: bolder;
  letter-spacing: 2px;
  height: 70px;
  background: #f6f8fa;
}
.pag {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6px 0;
  background: #f1f1f1;
  z-index: 1;
}

.dialog >>> .el-dialog {
  border-radius: 4px;
  overflow: hidden;
  width: 600px;
}
.dialog >>> .el-dialog__header {
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  background: #f1f1f1;
  border-bottom: 1px solid #ddd;
  display: flex;
}
.dialog >>> .el-dialog__header span {
  font-size: 14px;
  line-height: 40px;
  flex-grow: 1;
}
.dialog >>> .el-dialog__header .el-dialog__headerbtn {
  position: static;
}
.dialog >>> .el-dialog__body {
  padding: 10px 20px;
}
.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.form > div {
  width: 48%;
  margin-bottom: 10px;
}
.form > div span {
  height: 40px;
  line-height: 40px;
  color: #333;
}
</style>