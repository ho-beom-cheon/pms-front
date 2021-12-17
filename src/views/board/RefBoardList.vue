<template>
  <section class="section section-shaped section-lg my-0">
    <div class="container shape-container align-items-center">
			<div class="row">
				<div class="col">
      		<h1 class="display-3  text-black">게시판</h1>
					<div class="d-flex mb-auto" style="height:120px">
						<div class="p-2 flex-grow-1">
							<base-input placeholder="제목" v-model="title"></base-input>
						</div>
						<div class="p-2">
							<base-button type="primary" @click="search">조회</base-button>
						</div>
					</div>
					<div class="row justify-content-end p-2">
						<base-button type="primary" @click="ins">글쓰기</base-button>
					</div>
					<grid
						ref="grid"
						:data="gridData"
						:columns="columns"
						:scrollX="scrollX"
						:scrollY="scrollY"
						:bodyHeight="bodyHeight"
						:showDummyRows="showDummyRows"
					></grid>
				</div>
			</div>
    </div>
  </section>
</template>

<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';

export default {
  components: {
    grid: Grid
	},
	data() {
		return {
			title:"",
			scrollX:true,
			scrollY:true,
			bodyHeight: 600,
			showDummyRows: true,
			gridData: { 
				api:{ 
					readData: { url: 'http://localhost:8080/board/select', method: 'GET' },
		      createData: { url: process.env.VUE_APP_API + '/board/insert', method: 'POST' },
		      updateData: { url: process.env.VUE_APP_API + '/board/update', method: 'PUT' },
		      deleteData: { url: process.env.VUE_APP_API + '/board/delete', method: 'DELETE' },
		      modifyData: { url: process.env.VUE_APP_API + '/board/update', method: 'POST' }
				} 
			},
			columns: [
				{
					header: '순번',
					name: 'seq',
				},
				{
					header: '제목',
					name: 'title',
				},
				{
					header: '작성자',
					name: 'writer',
				},
				{
					header: '조회수',
					name: 'count',
				},
				{
					header: '작성일자',
					name: 'regDate'
				}		
			]
		}
	},
	methods:{
		search() {
			console.log( this.gridData ); 
			this.$refs.grid.invoke('readData') ;
		},
		ins(){
			this.$router.push("/RefBoardReg") ;
		}
	},
  created() {
		//this.$refs.grid.invoke('stop')
	},
  mounted() {

	},
}
</script>

<style>

</style>