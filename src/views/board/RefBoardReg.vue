<template>
  <section class="section section-shaped section-lg my-0">
    <div class="container shape-container align-items-center">
			<div class="row">
				<div class="col">
      		<h1 class="display-3  text-black">글 등록</h1>
					<div class="form-group">
						<label for="title" class="form-label">제목</label>
						<input type="text" class="form-control" id="title" v-model="info.title">
					</div>
					<div class="form-group">
						<label for="content" class="form-label">내용</label>
						<textarea id="content" class="form-control" v-model="info.contents" rows="10"></textarea>
					</div>
					<div class="form-group">
						<base-button type="primary" @click="ins">등록</base-button>
						<base-button type="primary" @click="$router.go(-1)">취소</base-button>
					</div>
				</div>
			</div>
    </div>
  </section>
</template>

<script>
import { axiosService } from '@/api/http';

export default {
	data(){
		return {
			info : {	title: null,
								contents : null
						}
		}	
	},
	methods:{
		async ins() {
			await axiosService.get("/board/ins", {
        params: this.info
	    }) ;
		}
	}
}
</script>

<style>

</style>