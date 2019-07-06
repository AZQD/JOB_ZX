<template>
  <div class="container">
    <div class="wrapper">

      <div class="left">
        <div class="topicBox">
          <div class="topicItem" v-for="(item, itemIndex) in prizeData" :key="item.id">
            <div class="firstPart">
              <div class="text">{{item.name}}</div>
            </div>
            <div class="secondPart" v-if="item.son">
              <div class="text" v-on:click="chooseFun(itemSon, itemIndex, itemSonIndex)" v-for="(itemSon, itemSonIndex) in item.son" :key="itemSon.id">{{itemSon.name}}</div>
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
        <div v-if="prizeData.length">
          <div class="question">题目：{{this.prizeData[itemIndex].son[itemSonIndex].questions[chooseIndex].question}}</div>
          <div class="showAnsBtn" v-if="!loading" v-on:click="showAnswerFun(true)">查看答案</div>
          <div class="answer" v-if="showAnswer">答案：{{this.prizeData[itemIndex].son[itemSonIndex].questions[chooseIndex].answer}}</div>
        </div>
      </div>

      <div class="right" v-if="prizeData.length">
        <div class="btnBox" v-if="!loading" v-on:click="changeQuestionFun(false)">选择<br/>题目</div>
        <div class="btnBox" v-if="loading" v-on:click="changeQuestionFun(true)">停止</div>
        <div class="numBox">剩余{{this.prizeData[itemIndex].son[itemSonIndex].questions.length}}题</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
var timer = null
export default {
  name: 'Index',
  data () {
    return {
      prizeData: [], // 抽奖数组数据
      showAnswer: false, // 是否展示答案
      loading: false, // 是否正在抽题
      timer: null, // 定时器

      itemIndex: 0,
      itemSonIndex: 0,
      chooseIndex: 0

    }
  },
  created () {
    axios.get('//dati.xihuo.ink/api/index/index').then((res) => {
      console.log('接口返回数据：', res)
      if (res.data.code === 1) {
        this.prizeData = res.data.data
        // for (let i = 0; i < this.prizeData.length; i++) {
        //   let item1 = this.prizeData[i]
        //   for (let j = 0; j < item1.son.length; j++) {
        //     let item2 = item1.son[j].questions
        //     for (let k = 0; k < item2.length; k++) {
        //       console.log(1111, item2[k].question)
        //     }
        //   }
        // }
      } else {
        alert('接口请求异常')
      }
    }).catch((error) => {
      console.log('error:', error)
    })
  },
  methods: {
    // 左侧菜单类别选择
    chooseFun: function (itemSon, itemIndex, itemSonIndex) {
      // console.log(itemSon, itemSonIndex)

      // 修改原数据
      let prizeData = this.prizeData
      // prizeData[itemIndex].son[itemSonIndex].questions[0].checked = true
      this.itemIndex = itemIndex
      this.itemSonIndex = itemSonIndex
      this.chooseIndex = 0
      this.prizeData = prizeData
      this.showAnswerFun(false)
    },
    // 选择题目
    changeQuestionFun: function (type) {
      this.showAnswerFun(false)

      if (type) {
        console.log('结束了')
        clearInterval(timer)
        this.loading = !this.loading
      } else {
        console.log('抽题中...')

        let prizeData = this.prizeData
        let questions = prizeData[this.itemIndex].son[this.itemSonIndex].questions
        if (questions.length === 1) {
          alert('该题型都答完了')
          clearInterval(timer)
          return
        }
        let newQuestion = questions.filter((item, index) => {
          return this.chooseIndex !== index
        })
        prizeData[this.itemIndex].son[this.itemSonIndex].questions = newQuestion
        this.prizeData = prizeData

        timer = setInterval(() => {
          let currentQuestionArr = this.prizeData[this.itemIndex].son[this.itemSonIndex].questions
          this.chooseIndex = this.sum(0, currentQuestionArr.length - 1)
        }, 10)
        this.loading = !this.loading
      }
    },
    // 是否显示答案
    showAnswerFun: function (flag) {
      this.showAnswer = flag
    },
    // 生成随机数
    sum: function (start, end) {
      return Math.floor(Math.random() * (start - end) + end)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .container {
    min-width: 800px;
    height: 100vh;
    background: url(http://dati.xihuo.ink/uploads/bg.jpg) no-repeat;
    background-size: auto 100%;
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
          text-align: justify;
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
          text-align: justify;
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
