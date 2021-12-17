<template>
  <div>
		<div id="contents">
			<div id="header">
				아이티아이즈 로고 / PMS or Net or Flow
			</div>
			<div id="nav">PMS > 메뉴1 > 메뉴2</div>
			<div id="left">
				<div id="left-title">타이틀</div >
				<ul> Menu
					<li><a href="#">Menu1</a></li>
					<li><a href="#">Menu2</a></li>
					<li><a href="#">Menu3</a></li>
					<li><a href="#">Menu4</a></li>
					<li><a href="#">Menu5</a></li>
				</ul>
			</div>
			<div id="content">
				<div id="menu-title">● 메뉴명 영역</div> 
				<div id="search-filter" class="row row-cols-12 align-items-center">
					<div class="col-11">
						<div class="row row-cols-11">
					    <div class="col">
      					조건명 : <select class="custom-select-small" style="width:180px"><option selected>조건1</option></select>
							</div>
					    <div class="col">
      					조건명 : <select class="custom-select-small" style="width:180px"><option selected>조건2</option></select>
							</div>
					    <div class="col">
      					조건명 : <select class="custom-select-small" style="width:180px"><option selected>조건3</option></select>
							</div>
					    <div class="col">
      					조건명 : <select class="custom-select-small" style="width:180px"><option selected>조건4</option></select>
							</div>
					    <div class="col">
      					조건명 : <select class="custom-select-small" style="width:180px"><option selected>조건5</option></select>
							</div>
						</div>
						<div class="row row-cols-11">
					    <div class="col">
      					조건명 : <select class="custom-select-small" style="width:180px"><option selected>조건1</option></select>
							</div>
					    <div class="col">
      					조건명 : <select class="custom-select-small" style="width:180px"><option selected>조건2</option></select>
							</div>
					    <div class="col">
      					조건명 : <select class="custom-select-small" style="width:180px"><option selected>조건3</option></select>
							</div>
					    <div class="col">
      					조건명 : <select class="custom-select-small" style="width:180px"><option selected>조건4</option></select>
							</div>
					    <div class="col">
      					조건명 : <select class="custom-select-small" style="width:180px"><option selected>조건5</option></select>
							</div>
						</div>
					</div>
					<div class="col-1">
						<button class="btn btn-primary" type="submit" @click="fnSearch">검색</button>
					</div>
				</div>
				<div id="content-grid">
					<div class="row row-cols-12 ">
						<div id="content-grid-top" class="col-12">
							<button id="grid-top-com" class="btn-small btn-info" type="submit" @click="gridInit">초기화</button>
							<button id="grid-top-com1" class="btn-small btn-info" type="submit" @click="gridAddRow">행추가</button>
							<button id="grid-top-com2" class="btn-small btn-info" type="submit" @click="gridDelRow">행삭제</button>
							<button id="grid-top-com3" class="btn-small btn-info" type="submit" @click="gridADelRow">전체삭제</button>
							<button id="grid-top-com4" class="btn-small btn-info" type="submit" @click="gridIns">저장</button>
							<button id="grid-top-com5" class="btn-small btn-info" type="submit" @click="gridExcelExport">엑셀저장</button>
							<button id="grid-top-com6" class="btn-small btn-info" type="submit" @click="gridExcelImport">엑셀업로드</button>
						</div>
					</div>
					<div>
						<grid
							ref="grid"
							:data="data"
							:header="header"
							:columns="columns"
							:bodyHeight="bodyHeight"
							:showDummyRows="showDummyRows"
							:columnOptions="columnOptions"
							:rowHeight="rowHeight"
							:rowHeaders="rowHeaders"
							@click="onClick"
						></grid>
					</div>
				</div>
			</div>
			<div id="footer">FOOTER 영역</div>
		</div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';

var listItem = [{text:"1번", value:"1"},{text:"2번", value:"2"},{text:"3번", value:"3"}];

export default {
	// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    grid: Grid,
	},
	// beforeCreate ~ destroyed 까지는 Vue 인스턴스 생성에 따라 자동으로 호출되는 함수
	// "라이프사이클 훅"이라고 함.
	// 자세한 사항은 Vue 라이프 사이클 참조
	// https://kr.vuejs.org/v2/guide/instance.html
	beforeCreate() {
		console.log("beforeCreate");
	},
	created() {
		console.log("created");
	},
	beforeMount() {
		console.log("beforeMount");
	},
	mounted() {
		console.log("mounted");
	},
	beforeUpdate() {
		console.log("beforeUpdate");
	},
	updated(){
		console.log("updated");
	},
	beforeDestroy() {
		console.log("beforeDestroy");
	},
	destroyed() {
		console.log("destroyed");
	},
	// 함수를 선언하는 부분
	// "종속대상에 따라 캐싱"된다는 점이 method와는 다른점.
	computed: {
		getCount() {
			return this.count;
		}
	},
	// 일반적인 함수를 선언하는 부분 
	methods: {
		onClick(ev) {
			console.log("클릭" + ev.rowKey);
			this.curRow = ev.rowKey;
		},
		fnSearch(){
			this.$refs.grid.invoke("setRequestParams", {cond1:"test"});
			this.$refs.grid.invoke("readData");
		},
		gridInit(){
			this.$refs.grid.invoke("clear");
		},
		gridAddRow(){
			this.$refs.grid.invoke("appendRow",{ col1:"aa", col2:"bb", col5:"2021-11-04"},{focus:true}) ;
		},
		gridDelRow(){
			this.$refs.grid.invoke("removeRow", this.curRow);
			// DB 데이터 삭제로직 추가
		},
		gridADelRow(){
			// DB 데이터 삭제로직 추가 
		},
		gridIns(){
			// DB 데이터 삭제로직 추가 
		},
		gridExcelExport(){
			this.$refs.grid.invoke("export", "xlsx", {fileName:"엑셀다운로드"});
		},
		gridExcelImport(){
			// 엑셀파일 업로드 로직 추가
		}
	},
	// 특정 데이터에 실행되는 함수를 선언하는 부분
	// newValue, oldValue 두개의 매개변수를 사용할 수 있음
	watch:{
		count: (a, b) => { 
			console.log("count의 값이 변경되면 여기도 실행");
			console.log("new Value :: " + a);
			console.log("old Value :: " + b);
		} 
	},
	// 변수 선언부분
	data() {
		return {
			count:0,
			curRow:-1,
			title:"",
			scrollX:true,
			scrollY:true,
			bodyHeight: 480,
			rowHeight: 30,
			showDummyRows: true,
			data: {
				api: {
					readData: { url: process.env.VUE_APP_API + '/board/select', method: 'GET' },
				},	
				initialRequest: false,
			},
      columnOptions: {
        resizable: true
      },
      rowHeaders:['checkbox'],
			header:{ 
				height: 30
			},
			columns: [
				{
					header: '컬럼1',
					name: 'col1',
					editor: 'text'
				},
				{
					header: '컬럼2',
					name: 'col2',
					editor: 'text'
				},
				{
					header: '컬럼3',
					name: 'col3',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: listItem
            }
          }
				},
				{
					header: '컬럼4',
					name: 'col4',
				},
				{
					header: '컬럼5',
					name: 'col5',
					editor: 'datePicker'
				},
				{
					header: '컬럼6',
					name: 'col6',
				},
				{
					header: '컬럼7',
					name: 'col7',
				},
				{
					header: '컬럼8',
					name: 'col8',
				},
				{
					header: '컬럼9',
					name: 'col9',
				},
				{
					header: '컬럼10',
					name: 'col10',
				},
				{
					header: '컬럼11',
					name: 'col11'
				},
			]
		}
	},
};

</script>
<style>
#contents
{
	width:1900px;
	height:900px;
	margin:0 auto;
	color:#000;
}
#header
{
	position: fixed;
	width:1900px;
	height:80px;
	line-height:80px;
	background-color:darkorange;
	z-index:99;
}
#nav
{
	position: fixed;
	text-align: right;
	padding-right: 20px;
	margin-top:80px;
	width:1900px;
	height:50px;
	line-height:50px;
	background-color:coral;	
	z-index:99;
}
#left
{
	padding: 10px;
	float:left;
	margin-top:130px;
	width:220px;
	min-height:700px;
	background-color:indianred;
}

#left-title
{
	padding:10px;
	text-align: center;
	background-color:sandybrown;
}

#left ul
{
	padding:0px;
	background-color:yellow;
}

#left ul li
{
	list-style: none;
	padding: 5px 0px 5px 5px;
	margin-bottom: 5px;
  border-bottom: 1px solid #efefef;
	background-color:white;
}

#content
{
	float:left;
	margin-top:130px;
	padding : 10px;
	width:1680px;
	min-height:700px;
	background-color:blanchedalmond;
}

#menu-title 
{
	height:50px;
	font-size:1.3em;
}

#search-filter
{
	font-size:1em;
	padding : 10px;
	margin: 0;
	background-color:yellow;
}

#search-filter div.col
{
	padding:0;
	margin: 1px;
	background-color:#ff0000;
}
#content-grid-top
{
	text-align: right;
	margin-bottom:3px;
}
#grid-top-com
{
	margin-left:3px;
	font-size:0.9em;
}
#content-grid
{
	margin-top:10px;
}

#footer
{
	float:left;
	width:1900px;
	height:70px;
	line-height:70px;
	background-color:brown;
}
</style>
