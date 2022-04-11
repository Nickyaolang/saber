<<<<<<< HEAD
<template>
  <el-container>
    <!-- 顶栏 -->
    <el-header height="60px">
    
      <h2>{{title}}</h2>
    </el-header>
    <!-- 嵌套容器 -->
    <el-container>
      <!-- 侧边导航菜单 -->
      <el-aside width="150px">{{leftContent}}</el-aside>
      <!-- 内容 -->
      <el-main>
      
        <!-- 第一列栅格布局 -->
        <el-row>
          <el-col :span="12" class="col1">
          <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in 5" :key="item">
      <h3 class="medium">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
          </el-col>
          <el-col :span="12" class="col2"><el-calendar :range="['2019-03-04', '2019-03-24']">
</el-calendar></el-col>
        </el-row>
        <!-- 第二列布局 -->
        <el-row>
          <el-col :span="24" class="col3">
          {{evalute}}
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <!-- 底栏 -->
    <el-footer height="30px">&copy;{{author}} 2022</el-footer>
  </el-container>
</template>

<script>
export default {
data(){
  return{
    title:"记录 ～ 每一天",
    img:"www.baidu.com",
    author:"author - nicky",
    leftContent:"左边活动列表",
    introduce:"作者介绍",
    evalute:"评价"
  }
}

}
</script>

<style>
.el-header {
  background-color: #409EFF;
  color: white;
}
.el-footer {
  background-color: #909399;
  color: black;
  text-align: center;
}
.el-aside {
  background-color: chartreuse;
}
.el-main {
  background-color: darkkhaki;
}
.el-col {
  height: 200px;
}
.col1 {
  background-color: teal;
}
.col2 {
  background-color: tomato;
}
.col3 {
  background-color: thistle;
}
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
=======
>>>>>>> 4b09ccd8ef17dc30cab951380166973887fb673b
