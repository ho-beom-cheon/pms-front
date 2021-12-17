<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container shape-container d-flex">
        <div class="col px-0">
            <div class="row">
                <div class="col-lg-6">
                    <h1 class="display-3  text-white">Get/Post방식 서버호출 예제</h1>
                    <base-button type="primary" @click="get">Get방식 호출</base-button>
                    <base-button type="primary" @click="post">Post방식 호출</base-button>
                    <h4 class="display-4  text-white">{{ resultVal }}</h4>
                    <h4 class="display-4  text-white">결과 list</h4> 
                    <ul>
                      <li class="text-white" v-for="result in resultVal" :key="result.id" >
                        {{ result.name }}
                      </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </section> 
</template>

<script>
export default {
  data() {
    return {
      resultVal : null
    }
  },
  methods: {
    get: async function(){
      console.log("get방식 호출")

    },
    post(){
      console.log("post방식 호출")
    }
  }
}
</script>


