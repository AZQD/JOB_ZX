<template>
  <div class="container">
    <div class="wrapper">

      <div class="left">
        <div class="topicBox">
          <div class="topicItem" v-for="item in prizeData" :key="item.id">
            <div class="firstPart">
              <div class="text">{{item.name}}</div>
            </div>
            <div class="secondPart" v-if="item.son">
              <div class="text" v-for="itemSon in item.son" :key="itemSon.id">{{itemSon.name}}</div>
              <!--<div class="text">分类2</div>-->
              <!--<div class="text">分类3</div>-->
            </div>
          </div>
          <!--<div class="topicItem">-->
            <!--<div class="firstPart">-->
              <!--<div class="text">题型2</div>-->
            <!--</div>-->
            <!--<div class="secondPart">-->
              <!--<div class="text">分类1</div>-->
              <!--<div class="text">分类2</div>-->
              <!--<div class="text">分类3</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="topicItem">-->
            <!--<div class="firstPart">-->
              <!--<div class="text">题型3</div>-->
            <!--</div>-->
            <!--<div class="secondPart">-->
              <!--<div class="text">分类1</div>-->
              <!--<div class="text">分类2</div>-->
              <!--<div class="text">分类3</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>

      <div class="middle">
        <div class="title">答题活动</div>
        <div class="question">题目：“什么是我们党的初心和使命？我们为什么要进行‘不忘初心、牢记使命’主题教育？怎样在‘不忘初心、牢记使命’主题教育中，解决我们目前存在的问题？”</div>
        <div class="showAnsBtn">查看答案</div>
        <div class="answer">答案：了解了为中国人民谋幸福、为中华民族谋复兴的初心使命是怎么来的，就能体会到进行“不忘初心、牢记使命”主题教育对于共产党来说，是一个永恒的命题。</div>
      </div>

      <div class="right">
        <div class="btnBox">选择<br/>题目</div>
        <div class="numBox">12/30</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Index',
  data () {
    return {
      prizeData: [], // 抽奖数组数据
      currentQuestionArr: [] // 当前题库
    }
  },
  created () {
    axios.get('//dati.xihuo.ink/api/index/index').then((res) => {
      console.log('接口返回数据：', res)
      if (res.data.code === 1) {
        this.prizeData = res.data.data
      } else {
        alert('接口请求异常')
      }
    }).catch((error) => {
      console.log('error:', error)
    })
  },
  methods: {
    codeCtrl: function (type) {
      // console.log(666, type)
      this.codeType = type
      console.log(111, this.codeType)
      // this.data.codeType = type
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .container {
    min-width: 800px;
    height: 100vh;
    background: url(./../../assets/images/prize/bodyBg.png) no-repeat;
    background-size: 100% 100%;
    .wrapper{
      height: 100%;
      display: flex;
      .left{
        height: 100%;
        min-width: 200px;
        background: rgba(204,204,255,0.5);
        box-shadow: 2px 3px 5px rgba(102,153,204,0.5);
        padding-top: 200px;
        .topicBox{
          width: 100%;
          border: 1px solid #ddd;
          .topicItem{
            text-align: center;
            border-bottom: 1px solid #ddd;
            display: flex;
            align-items: center;
            background-color: deeppink;
            .firstPart{
              width: 0;
              flex-grow: 1;
              font-size: 18px;
              font-weight: bold;
              .text{
                cursor: pointer;
                padding: 4px 0;
                border-bottom: 1px solid #ddd;
                &:last-child{
                  border-bottom: none;
                }
              }
            }
            .secondPart{
              width: 0;
              flex-grow: 1;
              border-left: 1px solid #ddd;
              font-size: 16px;
              .text{
                cursor: pointer;
                padding: 4px 0;
                border-bottom: 1px solid #ddd;
                &:last-child{
                  border-bottom: none;
                }
              }
            }
            &:last-child{
              border-bottom: none;
            }
          }
          .topicItem:nth-child(2n){
            background-color: pink;
          }
        }
      }
      .middle{
        flex-grow: 1;
        padding: 34px 60px;
        overflow-y: scroll;
        .title{
          text-align: center;
          font-size: 40px;
          font-weight: bold;
        }
        .question{
          padding-top: 40px;
          font-size: 30px;
          font-weight: bold;
        }
        .showAnsBtn{
          display: inline-block;
          font-size: 28px;
          font-weight: bold;
          color: blue;
          cursor: pointer;
          padding: 20px 0;
        }
        .answer{
          font-size: 30px;
          font-weight: bold;
          color: red;
        }
      }
      .right{
        height: 100%;
        min-width: 200px;
        background: rgba(204,204,255,0.5);
        box-shadow: 2px 3px 5px rgba(102,153,204,0.5);
        padding-top: 200px;
        text-align: center;
        .btnBox{
          width: 100px;
          height: 100px;
          background-color: #ffbd6f;
          color: #ff4b31;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          margin: 0 auto;
        }
        .numBox{
          text-align: center;
          color: #1e4eff;
          font-size: 30px;
          font-weight: bold;
          padding-top: 30px;
        }
      }
    }
  }
</style>
