<template>
  <div class="data">
    <div class="head">
      <div class="button" @click="to"></div>
    </div>
    <div class="con">
      <div class="con_l">
        <h4>一段字</h4>
        <div class="data_table">
          <div id="table1"></div>
          <div id="table2"></div>
          <div id="table3"></div>
        </div>
      </div>

      <div class="center">
        <div id="center_top">
          <div id="center_top_con"></div>
        </div>
        <div id="center_but">
          <div class="center_but_con">
            <ul>
              <li>
                <span>已处理</span>
                <span>89</span>
              </li>
              <li>
                <span>未处理</span>
                <span>13</span>
              </li>
            </ul>
          </div>
          <table class="table">
            <tr>
              <th>时间</th>
              <th>地点</th>
              <th>设备</th>
              <th>联系人</th>
            </tr>
            <tr>
              <td>2019-08-10 13:22</td>
              <td>宝安区龙岗区</td>
              <td>心爱的小摩托</td>
              <td>黄先生的女儿</td>
            </tr>
            <tr>
              <td>2019-08-10 13:22</td>
              <td>宝安区龙岗区</td>
              <td>心爱的小摩托</td>
              <td>黄先生的女儿</td>
            </tr>
            <tr>
              <td>2019-08-10 13:22</td>
              <td>宝安区龙岗区</td>
              <td>心爱的小摩托</td>
              <td>黄先生的女儿</td>
            </tr>
            <tr>
              <td>2019-08-10 13:22</td>
              <td>宝安区龙岗区</td>
              <td>心爱的小摩托</td>
              <td>黄先生的女儿</td>
            </tr>
            <tr>
              <td>2019-08-10 13:22</td>
              <td>宝安区龙岗区</td>
              <td>心爱的小摩托</td>
              <td>黄先生的女儿</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="con_r">
        <ul class="con_r_top">
          <li>
            <div>
              <img src="../assets/images/equipment.png" width="42px" alt />
              <span>设备总数</span>
            </div>
            <h3 style="color:#3be4cd">123,456</h3>
          </li>
          <li>
            <div>
              <img src="../assets/images/equipment.png" width="42px" alt />
              <span>设备在线数</span>
            </div>
            <h3 style="color:#f89637">123,456</h3>
          </li>
          <li>
            <div>
              <img src="../assets/images/equipment.png" width="42px" alt />
              <span>设备离线数</span>
            </div>
            <h3 style="color:#ec2d34">123,456</h3>
          </li>
        </ul>

        <div class="con_r_but">
          <h4>一行字</h4>
          <div class="con_r_but_con">
            <div>
              <h2>已接入设备</h2>
              <ul>
                <li>
                  <span>智慧用电模块</span>
                  <span>1000</span>
                </li>
                <li>
                  <span>智慧用电模块</span>
                  <span>123654</span>
                </li>
                <li>
                  <span>智慧用电模块</span>
                  <span>546598</span>
                </li>
              </ul>
            </div>

            <div>
              <h2>已接入设备</h2>
              <ul>
                <li>
                  <span>智慧用电模块</span>
                  <span>1000</span>
                </li>
                <li>
                  <span>智慧用电模块</span>
                  <span>123654</span>
                </li>
                <li>
                  <span>智慧用电模块</span>
                  <span>546598</span>
                </li>
              </ul>
            </div>

            <div>
              <h2>已接入设备</h2>
              <ul>
                <li>
                  <span>智慧用电模块</span>
                  <span>1000</span>
                </li>
                <li>
                  <span>智慧用电模块</span>
                  <span>123654</span>
                </li>
                <li>
                  <span>智慧用电模块</span>
                  <span>546598</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "echarts/map/js/china.js";
export default {
  name: "Bigdata",
  data() {
    return {
      table1: {
        dataAxis: ["点", "击", "柱", "子", "或", "者", "两", "指"],
        data: [120, 182, 50, 130, 100, 100, 100, 123]
      }
    };
  },
  mounted() {
    this.table();
    this.table2();
    this.table3();
    this.myMap();
  },
  methods: {
    to(){
      this.$router.go('-1')
    },
    table() {
      // 基于准备好的dom，初始化echarts实例
      let table = this.$echarts.init(document.getElementById("table1"));
      const optionData = {
        title: {
          text: "特性示例：渐变色 阴影 点击缩放",
          top: 14,
          left: 16,
          textStyle: {
            color: "#3d63b0",
            fontSize: "100px"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          //鼠标滑上去显示效果
          trigger: "item"
        },
        xAxis: {
          data: this.table1.dataAxis,
          axisLabel: {
            // inside: true,
            textStyle: {
              color: "#3d63b0"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              //字体颜色
              color: "#3d63b0"
            }
          },
          splitLine: {
            lineStyle: {
              //y轴隔线样式
              color: "#22346a"
            }
          }
        },
        dataZoom: [{ type: "inside" }],
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              normal: { color: "rgba(0,0,0,0.05)" }
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            animation: false
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#49fcb0" },
                  { offset: 0.5, color: "#41dbcb" },
                  { offset: 1, color: "#37adf1" }
                ])
              }
            },
            data: this.table1.data
          }
        ]
      };
      // 绘制图表
      table.setOption(optionData);
      window.addEventListener("resize", function() {
        table.resize();
      });
    },
    //map
    table2() {
      let table = this.$echarts.init(document.getElementById("table2"));
      const optionData = {
        title: {
          text: "折线图堆叠",
          top: 14,
          left: 16,
          textStyle: {
            color: "#3d63b0",
            fontSize: 12
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          top: 14,
          data: ["邮件营销", "联盟广告"],
          textStyle: {
            color: "#3d63b0",
            fontSize: "100px"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLabel: {
            // inside: true,
            textStyle: {
              color: "#3d63b0"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              //字体颜色
              color: "#3d63b0"
            }
          },
          splitLine: {
            lineStyle: {
              //y轴隔线样式
              color: "#22346a"
            }
          }
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      };
      table.setOption(optionData);
      window.addEventListener("resize", function() {
        table.resize();
      });
    },
    table3() {
      let table = this.$echarts.init(document.getElementById("table3"));
      const optionData = {
        title: {
          text: "折线图堆叠",
          top: 14,
          left: 16,
          textStyle: {
            color: "#3d63b0",
            fontSize: "100px"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          top: 14,
          data: ["邮件营销", "联盟广告"],
          textStyle: {
            color: "#3d63b0",
            fontSize: "100px"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLabel: {
            // inside: true,
            textStyle: {
              color: "#3d63b0"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              //字体颜色
              color: "#3d63b0"
            }
          },
          splitLine: {
            lineStyle: {
              //y轴隔线样式
              color: "#22346a"
            }
          }
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      };
      table.setOption(optionData, true);
      window.addEventListener("resize", function() {
        table.resize();
      });
    },
    myMap() {
      var nameColor = " rgb(55, 75, 113)";
      var name_fontFamily = "等线";
      var subname_fontSize = 15;
      var name_fontSize = 18;
      var mapName = "china";
      var data = [
        { name: "北京", value: 177 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 66 },
        { name: "上海", value: 24 },
        { name: "江苏", value: 92 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 91 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 67 },
        { name: "广东", value: 123 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 }
      ];

      var geoCoordMap = {};
      var toolTipData = [
        {
          name: "北京",
          value: [{ name: "车辆", value: 95 }]
        },
        {
          name: "天津",
          value: [{ name: "车辆", value: 22 }]
        },
        {
          name: "河北",
          value: [{ name: "车辆", value: 60 }]
        },
        {
          name: "山西",
          value: [{ name: "车辆", value: 40 }]
        },
        {
          name: "内蒙古",
          value: [{ name: "车辆", value: 23 }]
        },
        {
          name: "辽宁",
          value: [{ name: "车辆", value: 39 }]
        },
        {
          name: "吉林",
          value: [{ name: "车辆", value: 41 }]
        },
        {
          name: "黑龙江",
          value: [{ name: "车辆", value: 35 }]
        },
        {
          name: "上海",
          value: [{ name: "车辆", value: 12 }]
        },
        {
          name: "江苏",
          value: [{ name: "车辆", value: 47 }]
        },
        {
          name: "浙江",
          value: [{ name: "车辆", value: 57 }]
        },
        {
          name: "安徽",
          value: [{ name: "车辆", value: 57 }]
        },
        {
          name: "福建",
          value: [{ name: "车辆", value: 59 }]
        },
        {
          name: "江西",
          value: [{ name: "车辆", value: 49 }]
        },
        {
          name: "山东",
          value: [{ name: "车辆", value: 67 }]
        },
        {
          name: "河南",
          value: [{ name: "车辆", value: 69 }]
        },
        {
          name: "湖北",
          value: [{ name: "车辆", value: 60 }]
        },
        {
          name: "湖南",
          value: [{ name: "车辆", value: 62 }]
        },
        {
          name: "重庆",
          value: [{ name: "车辆", value: 47 }]
        },
        {
          name: "四川",
          value: [{ name: "车辆", value: 65 }]
        },
        {
          name: "贵州",
          value: [{ name: "车辆", value: 32 }]
        },
        {
          name: "云南",
          value: [{ name: "车辆", value: 42 }]
        },
        {
          name: "西藏",
          value: [{ name: "车辆", value: 5 }]
        },
        {
          name: "陕西",
          value: [{ name: "车辆", value: 38 }]
        },
        {
          name: "甘肃",
          value: [{ name: "车辆", value: 28 }]
        },
        {
          name: "青海",
          value: [{ name: "车辆", value: 5 }]
        },
        {
          name: "宁夏",
          value: [{ name: "车辆", value: 10 }]
        },
        {
          name: "新疆",
          value: [{ name: "车辆", value: 36 }]
        },
        {
          name: "广东",
          value: [{ name: "车辆", value: 63 }]
        },
        {
          name: "广西",
          value: [{ name: "车辆", value: 29 }]
        },
        {
          name: "海南",
          value: [{ name: "车辆", value: 8 }]
        }
      ];

      /*获取地图数据*/
      // myChart.showLoading();
      var mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
      // myChart.hideLoading();
      mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });

      // console.log("============geoCoordMap===================")
      // console.log(geoCoordMap)
      // console.log("================data======================")
      // console.log(data);
      // console.log(toolTipData);
      var max = 480,
        min = 9; // todo
      var maxSize4Pin = 100,
        minSize4Pin = 20;

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      let table = this.$echarts.init(document.getElementById("center_top_con"));
      const optionData = {
        title: {
          x: "center",
          textStyle: {
            color: nameColor,
            fontFamily: name_fontFamily,
            fontSize: name_fontSize
          },
          subtextStyle: {
            fontSize: subname_fontSize,
            fontFamily: name_fontFamily
          }
        },
        grid:{
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            if (typeof params.value[2] == "undefined") {
              var toolTiphtml = "";
              for (var i = 0; i < toolTipData.length; i++) {
                if (params.name == toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ":<br>";
                  for (var j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml +=
                      toolTipData[i].value[j].name +
                      ":" +
                      toolTipData[i].value[j].value +
                      "<br>";
                  }
                }
              }
              // console.log(toolTiphtml);
              // console.log(convertData(data))
              return toolTiphtml;
            } else {
              var toolTiphtml = "";
              for (var i = 0; i < toolTipData.length; i++) {
                if (params.name == toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ":<br>";
                  for (var j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml +=
                      toolTipData[i].value[j].name +
                      ":" +
                      toolTipData[i].value[j].value +
                      "<br>";
                  }
                }
              }
              // console.log(toolTiphtml);
              // console.log(convertData(data))
              return toolTiphtml;
            }
          }
        },
        // legend: {
        //     orient: 'vertical',
        //     y: 'bottom',
        //     x: 'right',
        //     data: ['credit_pm2.5'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        visualMap: {
          show: true,
          min: 0,
          max: 200,
          left: 20,
          bottom: 100,
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
          }
        },
        /*工具按钮组*/
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //         dataView: {
        //             readOnly: false
        //         },
        //         restore: {},
        //         saveAsImage: {}
        //     }
        // },
        geo: {
          show: true,
          map: mapName,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#031525",
              borderColor: "#3B5077"
            },
            emphasis: {
              areaColor: "#2B91B7"
            }
          }
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#05C3F9"
              }
            }
          },
          {
            type: "map",
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077"
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            },
            animation: false,
            data: data
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              data
                .sort(function(a, b) {
                  return b.value - a.value;
                })
                .slice(0, 5)
            ),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "yellow",
                shadowBlur: 10,
                shadowColor: "yellow"
              }
            },
            zlevel: 1
          }
        ]
      };
      table.setOption(optionData);
      window.addEventListener("resize", function() {
        table.resize();
      });
    }
  }
};
</script>

<style scoped>
.data {
  height: 100%;
  background-color: #02051d;
}
.head {
  height: 107px;
  background: url(../assets/images/head.png) no-repeat center center;
  background-size: cover;
  position: relative;
}
.button{
  position: absolute;
  width: 100px;
  height: 50px;
  right: 0;
  top: 10px;
  cursor: pointer;
}
.con {
  padding: 32px 30px;
  box-sizing: border-box;
  display: flex;
}
.con_l {
  background: url(../assets/images/l_bg.png) no-repeat;
  background-size: 100% 100%;
  height: 783px;
  /* width: 580px; */
  flex: 1;
}
.con_l > h4 {
  font-size: 14px;
  line-height: 30px;
  height: 30px;
  text-align: center;
  color: #6ebded;
  letter-spacing: 2px;
}
.data_table {
  width: 100%;
  height: 100%;
  padding: 20px 25px 30px;
  box-sizing: border-box;
}
#table1,
#table2,
#table3 {
  height: 222px;
  background: #111439;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.48);
  overflow: hidden;
}
#table1,
#table2 {
  margin-bottom: 16px;
}
.center {
  flex: 1.5;
  padding: 0 40px;
  box-sizing: border-box;
  background: url(../assets/images/data_bg.png) no-repeat;
}
#center_but {
  width: 100%;
  /* width: 620px; */
  height: 280px;
  background: url(../assets/images/l_bg.png) no-repeat;
  background-size: 100% 100%;
  padding: 15px 25px;
  box-sizing: border-box;
}
.center_but_con {
  margin-bottom: 16px;
}
.center_but_con > ul {
  display: flex;
  color: #fff;
  justify-content: space-between;
}
.center_but_con > ul > li {
  display: flex;
  justify-content: space-between;
  width: 200px;
  height: 38px;
  line-height: 38px;
  background: #111439;
  border: 1px solid #46b6fd;
  border-radius: 4px;
  padding: 0 15px 0 22px;
  box-sizing: border-box;
  font-size: 14px;
}
.table {
  color: #b3b3b3;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.48);
}
.table > tr {
  text-align: center;
  height: 34px;
  line-height: 34px;
  font-size: 14px;
}
.table > tr:nth-child(1) {
  color: #3b66b6;
}
.table > tr > td,
.table > tr > th {
  width: 25%;
}
.table > tr:nth-child(odd) {
  background: rgba(17, 20, 57, 0.8);
}
.table > tr:nth-child(even) {
  background: rgba(0, 0, 0, 0.3);
}
.con_r {
  flex: 1;
}

.con_r_top {
  display: flex;
  justify-content: space-between;
  background: url(../assets/images/l_bg.png) no-repeat;
  background-size: 100% 100%;
  height: 140px;
  padding: 20px 14px;
  box-sizing: border-box;
  width: 100%;
}
.con_r_top > li {
  width: 33.33%;
}
.con_r_top > li > div {
  margin: 0 auto;
  text-align: center;
  display: flex;
  height: 42px;
  line-height: 42px;
  color: #3b66b6;
  flex-wrap: wrap;
  font-weight: bold;
}
.con_r_top > li > h3 {
  color: #fff;
  font-size: 34px;
  letter-spacing: 2px;
  width: 100%;
  line-height: 60px;
}

.con_r_but {
  margin-top: 30px;
  background: url(../assets/images/l_bg.png) no-repeat;
  background-size: 100% 100%;
  height: 610px;
}
.con_r_but h4 {
  font-size: 14px;
  color: #6ebded;
  line-height: 26px;
  text-align: center;
  letter-spacing: 2px;
}
.con_r_but_con {
  width: 100%;
  padding: 14px 18px;
  box-sizing: border-box;
}
.con_r_but_con div {
  background: #111439;
  padding: 16px 14px 14px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.48);
  box-sizing: border-box;
  margin-bottom: 10px;
}
.con_r_but_con div h2 {
  color: #ffffff;
  font-size: 14px;
  margin-bottom: 14px;
}
.con_r_but_con div ul li:nth-child(odd) {
  background: rgba(33, 37, 84, 0.47);
}
.con_r_but_con div ul li:nth-child(even) {
  background: rgba(17, 20, 57, 0.8);
}
.con_r_but_con div ul li {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 40px;
  height: 40px;
  padding: 0 14px 0 6px;
  color: #3b66b6;
}
#center_top {
  width: 100%;
  height: 510px;
  overflow: hidden;
  position: relative;
}
#center_top_con{
  position: absolute;
  top: -100px;
  left: -20px;
  width: 800px;
  height: 700px;
}

</style>