<template>
  <div class="run">
    <div class="search">
      <div>
        <span>内容：</span>
        <el-input placeholder="请输入内容" v-model="input" size="small"></el-input>
      </div>
      <div>
        <span>内容：</span>
        <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
      </div>
    </div>
    <el-table stripe :data="tableData" style="width: 100%">
      <el-table-column label="日期">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
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
      <el-pagination background :total="40" @current-change="change"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      input: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    change(data) {
      console.log(data);
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
  width: 60px;
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
</style>