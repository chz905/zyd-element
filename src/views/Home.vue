<template>
  <div id="echarts">
    <p class="ech-top">系统总览</p>
    <ul class="con-1">
      <li>
        <div class="con-box">
          <div class="icon icon1">
            <em></em>
          </div>
          <ul>
            <li>
              <b>总物资</b>
            </li>
            <li>{{ wz }}</li>
          </ul>
        </div>
      </li>
      <li>
        <div class="con-box">
          <div class="icon icon2">
            <em></em>
          </div>
          <ul>
            <li>
              <b>总设备</b>
            </li>
            <li>{{ sb }}</li>
          </ul>
        </div>
      </li>
      <li>
        <div class="con-box">
          <div class="icon icon3">
            <em></em>
          </div>
          <ul>
            <li>
              <b>总用户</b>
            </li>
            <li>{{ yh }}</li>
          </ul>
        </div>
      </li>
    </ul>
    <div class="con-2">
      <div>
        <p>物资种类</p>
        <div id="myChart"></div>
      </div>
      <div>
        <p>每天新增设备</p>
        <div id="histogram"></div>
      </div>
    </div>
    <div class="con-3">
      <p>每月新增的物资</p>
      <div id="linechart"></div>
    </div>
  </div>
</template>

<script>
// import echarts from 'echarts'
export default {
  name: "Echarts",
  data() {
    return {
      //总物资 总设备 总用户
      wz: 99,
      sb: 10,
      yh: 10
      //物资种类  饼状图
      // list: []
    };
  },
  mounted() {
    this.pieChart();
    this.histogram();
    this.lineChart();
  },
  methods: {
    //饼状图
    pieChart() {
      //初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      const optionData = {
        title: {
          text: "种类物资",
          subtext: "虚构数据",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["西凉", "益州", "兖州", "荆州", "幽州"]
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: 535, name: "荆州" },
              { value: 510, name: "兖州" },
              { value: 634, name: "益州" },
              { value: 735, name: "西凉" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(optionData);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //柱状图
    histogram() {
      //初始化echarts实例
      let histogram = this.$echarts.init(document.getElementById("histogram"));

      const optionData = {
        title: {
          text: "每天新增设备",
          subtext: "虚构数据",
          left: "center"
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      };
      histogram.setOption(optionData);
      window.addEventListener("resize", function() {
        histogram.resize();
      });
    },

    //折线图
    lineChart() {
      //初始化echarts实例
      let lineChart = this.$echarts.init(document.getElementById("linechart"));

      const optionData = {
        title: {
          text: "堆叠区域图"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      };
      lineChart.setOption(optionData);
      window.addEventListener("resize", function() {
        lineChart.resize();
      });
    }
  }
};
</script>

<style scoped>
.ech-top {
  height: 46px;
  line-height: 46px;
  font-weight: 600;
  padding-left: 10px;
  background: #fff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}
.con-1,
.con-2 {
  display: flex;
  justify-content: space-around;
}
.con-1 {
  padding: 26px 0;
}
.con-1 > li,
.con-2 > div,
.con-3 {
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}
.con-1 > li {
  width: 32%;
  height: 130px;
  padding: 30px 0;
  box-sizing: border-box;
}
.con-2 > div {
  width: 48%;
  height: 330px;
}
.con-2 > div > p,
.con-3 > p {
  font-size: 14px;
  font-weight: 400;
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #eee;
  background: #f4f4f4;
  padding-left: 20px;
  color: #333;
}
.con-3 {
  width: 98%;
  height: 330px;
  margin: 26px auto;
}
.con-box {
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
}
.icon em {
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 16px rgba(52, 150, 201, 0.22);
  background: url(../assets/images/wz.png) no-repeat center center;
  background-size: 40px;
}
.icon1 em {
  background: url(../assets/images/wz.png) no-repeat center center;
  background-size: 40px;
}
.icon2 em {
  background: url(../assets/images/sb.png) no-repeat center center;
  background-size: 40px;
}
.icon3 em {
  background: url(../assets/images/yh.png) no-repeat center center;
  background-size: 40px;
}
.con-box > ul {
  flex-grow: 1;
  margin-left: 34px;
}
.con-box > ul > li:nth-child(1) {
  color: #666;
  font-size: 14px;
  margin-top: 6px;
}
.con-box > ul > li:nth-child(2) {
  /* font-weight: 600; */
  color: #333;
  font-size: 30px;
  line-height: 40px;
}

/* 表格的大小 */
#myChart {
  width: 100%;
  height: 282px;
}
#histogram {
  width: 100%;
  height: 282px;
}
#linechart {
  width: 100%;
  height: 282px;
}
</style>
