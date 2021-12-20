<template>
    <!-- CONTENTS -->
    <div class="contents">

        <!-- ASIDE -- LNB -->
        <aside>
            <div class="page-tit">
                ITeyes PMS
            </div>
            <dl>
                <dd>
                    <a href="#">기본메뉴</a>
                </dd>
                <dd>
                    <a href="#">즐겨찾기메뉴</a>
                </dd>
            </dl>
            <div class="aside-con">
                <div class="accordion" id="accordionExample">
                    <div class="card">
                      <div class="card-header" id="headingOne">
                          <button class="menu-group" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            PMS
                          </button>
                      </div>
                  
                      <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <ul class="card-body">
                            <li><a href="/SWZP0010">{{menu_list[0].name}}</a></li>
                            <li><a href="/SWZP0014">{{menu_list[1].name}}</a></li>
                            <li><a href="/SWZP0030">{{menu_list[2].name}}</a></li>
                            <li><a href="/SWZP0040">{{menu_list[3].name}}</a></li>
                            <li><a href="/SWZP0050">{{menu_list[4].name}}</a></li>
                            <li><a href="/SWZP0060">{{menu_list[5].name}}</a></li>
                            <li><a href="/SWZP0070">{{menu_list[6].name}}</a></li>
                            <li><a href="/SWZP0080">{{menu_list[7].name}}</a></li>
                            <li><a href="/SWZP0090">{{menu_list[8].name}}</a></li>
                            <li class="active"><a href="/SWZP0100">{{menu_list[9].name}}</a></li>
                            <li><a href="/SWZP0110">{{menu_list[10].name}}</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
            </div>
        </aside>

        <!-- 컨텐츠 영역 -->
        <div class="contents-body">
            <!-- 필터영역 -->
            <section class="filter">
                <ul class="filter-con clear-fix">
                    <li class="filter-item">
                        <div class="item-con">업무 구분
                            <select 
                                v-model = "bzcd_selected"
                                style   = "width: 180px"
                            >
                                <option
                                    v-for  = "(bzcd, idx) in bzcd"
                                    :key   = "idx"
                                    v-text = "bzcd.text"
                                    :value = "bzcd.value"
                                ></option>
                            </select>
                        </div>
                    </li>
                    <li class="filter-item">
                        <div class="item-con">산출물구분
                            <select 
                                v-model = "prjt_nm_selected"
                                style   = "width: 180px"
                            >
                                <option
                                    v-for  = "(prjt_nm, idx) in prjt_nm"
                                    :key   = "idx"
                                    v-text = "prjt_nm.text"
                                    :value = "prjt_nm.value"
                                ></option>
                            </select>
                        </div>
                    </li>
                    <li class="filter-item">
                        <div class="item-con">검증구분
                            <select 
                                v-model = "dvlp_dis_cd_selected"
                                style   = "width: 200px"
                            >
                                <option
                                    v-for  = "(dvlp_dis_cd, idx) in dvlp_dis_cd"
                                    :key   = "idx"
                                    v-text = "dvlp_dis_cd.text"
                                    :value = "dvlp_dis_cd.value"
                                ></option>
                            </select>
                        </div>
                    </li>
                    <li class="filter-item">
                        <div class="item-con">검색항목
                            <select 
                                v-model = "prc_step_cd_selected"
                                style   = "width: 100px"
                            >
                                <option
                                    v-for  = "(prc_step_cd, idx) in prc_step_cd"
                                    :key   = "idx"
                                    v-text = "prc_step_cd.text"
                                    :value = "prc_step_cd.value"
                                ></option>
                            </select>
                        </div>
                    </li>
                    <li class="filter-item">
                        <div class="item-con">
                            <input type="text" placeholder="입력" v-model="pgm_id" style = "width: 330px">
                        </div>
                    </li>
                </ul>

                <ul class="filter-btn">
                    <div class="btn btn-filter-p" style = "margin-left: 30px">
                        <a href="#" @click="fnSave">신규신청</a>
                    </div>
                    <div class="btn btn-filter-p" style = "margin-left: 10px">
                        <a href="#" @click="fnSearch">조회</a>
                    </div>
                </ul>
            </section>

            <!-- page contents -->
            <section class="page-contents">
            <div class="grid-box">산출물상세정보
                <div class="gridWrap" style="min-width: 750px;">
						<grid
							ref="grid"
							:data="data1"
							:header="header"
							:columns="columns1"
							:bodyHeight="bodyHeight"
							:showDummyRows="showDummyRows"
							:columnOptions="columnOptions"
							:rowHeight="rowHeight"
							:rowHeaders="rowHeaders"
							@click="onClick"
						></grid>
                </div>
               </div>
               <div class="grid-box">산출물점검대상
                <div class="gridWrap" style="min-width: 750px;">
						<grid
							ref="grid"
							:data="data2"
							:header="header"
							:columns="columns2"
							:bodyHeight="bodyHeight"
							:showDummyRows="showDummyRows"
							:columnOptions="columnOptions"
							:rowHeight="rowHeight"
							:rowHeaders="rowHeaders"
							@click="onClick"
						></grid>
                </div>
               </div>
               <div class="grid-box">미매핑내역
                <div class="gridWrap" style="min-width: 750px;">
						<grid
							ref="grid"
							:data="data3"
							:header="header"
							:columns="columns3"
							:bodyHeight="bodyHeight"
							:showDummyRows="showDummyRows"
							:columnOptions="columnOptions"
							:rowHeight="rowHeight"
							:rowHeaders="rowHeaders"
							@click="onClick"
						></grid>
                </div>
               </div>
            </section>
        </div>
    </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';
import WindowPopup from "./SWZP0041.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
//그리드 아이템 예제
var listItem = [{text:"개발", value:"1"},{text:"운영", value:"2"},{text:"이관", value:"3"}];
// 전체 선택
// 프로젝트명
var prjt_nm = [{text:"전체", value:"0"}, {text:"ITeyesPMS구축", value:"1"},{text:"바젤3개편안시스템구축", value:"2"},{text:"심사분석시스템재구축", value:"3"}];
// 업무구분
var bzcd = [{text:"전체", value:"0"}, {text:"PMS테스트", value:"1"},{text:"해외_운영리스크", value:"2"},{text:"지주_신용리스크", value:"3"},{text:"지주_ERMS", value:"4"}];
// 개발구분
var dvlp_dis_cd = [{text:"전체", value:"0"}, {text:"개발", value:"1"},{text:"운영", value:"2"},{text:"이관", value:"3"}];
// 프로그램구분
var pgm_dis_cd = [{text:"전체", value:"0"}, {text:"배치", value:"1"},{text:"화면", value:"2"},{text:"인터페이스", value:"3"},{text:"서비스", value:"4"},{text:"모듈", value:"5"},{text:"R-CLIPS", value:"6"},{text:"소스취약점", value:"7"},{text:"보고서", value:"8"},{text:"기타프로그램", value:"9"}];
// 처리단계
var prc_step_cd = [{text:"전체", value:"0"}, {text:"미개발", value:"1"},{text:"개발중", value:"2"},{text:"개발완료", value:"3"},{text:"PL완료", value:"4"},{text:"삭제", value:"5"},{text:"개발종료", value:"6"}];

export default {
	// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    grid: Grid,
    WindowPopup
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
		change(){
			console.log();
		},
		fnSave(){
			console.log();
		},
		onClick(ev) {
			console.log("클릭" + ev.rowKey);
			this.curRow = ev.rowKey;
		},
		fnSearch(){
			this.$refs.grid.invoke("setRequestParams", {cond1:"contents"});
			this.$refs.grid.invoke("readData");
		},
		gridInit(){
			this.$refs.grid.invoke("clear");
		},
		gridAddRow(){
			this.$refs.grid.invoke("appendRow",{ col1:"1", col3:"개발", col4:"SWZP0010", col5:"PMS구축"},{focus:true}) ;
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
		},
		open_page(){
			this.pop = window.open("../SWZP0041/", "open_page", "width=1000, height=800");
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
			prjt_nm_selected: prjt_nm[0].value,
			bzcd_selected: bzcd[0].value,
			dvlp_dis_cd_selected: dvlp_dis_cd[0].value,
			pgm_dis_cd_selected: pgm_dis_cd[0].value,
			prc_step_cd_selected: prc_step_cd[0].value,
			prjt_nm: prjt_nm,            // 프로젝트명
			bzcd: bzcd,                  // 업무구분
			dvlp_dis_cd: dvlp_dis_cd,    // 개발구분
			pgm_dis_cd: pgm_dis_cd,      // 프로그램구분
			prc_step_cd: prc_step_cd,    // 처리단계
			frcs_sta_dt: '',             // 계획일자STA
			frcs_end_dt: '',             // 계획일자END
			pgm_id: '',                  // 프로그램ID
			pgm_nm: '',                  // 프로그램명
			dvlpe_no: '',                // 개발자명
			pl_no: '',                   // 담당PL명
			sta_dt: '',                  // 실제일자STA
			end_dt: '',                  // 실제일자END
			check_Yn: false,             // 삭제프로그램/소스취약점포함
			count:0,
			curRow:-1,
			title:"",
			scrollX:false,
			scrollY:false,
			bodyHeight: 185,
			rowHeight: 10,
			showDummyRows: true,
			open: false,
			menu_list: [
				{
					id: 'SWZP0010',
					path: '/SWZP0010',
					name: '개발현황'
				},
				{
					id: 'SWZP0014',
					path: '/SWZP0014',
					name: 'PMS현황'
				},
				{
					id: 'SWZP0030',
					path: '/SWZP0030',
					name: '통합테스트'
				},
				{
					id: 'SWZP0040',
					path: '/SWZP0040',
					name: '결함관리'
				},
				{
					id: 'SWZP0050',
					path: '/SWZP0050',
					name: 'PMS신청관리'
				},
				{
					id: 'SWZP0060',
					path: '/SWZP0060',
					name: 'ActionItem및이슈관리현황'
				},
				{
					id: 'SWZP0070',
					path: '/SWZP0070',
					name: '통합테스트진척현황'
				},
				{
					id: 'SWZP0080',
					path: '/SWZP0080',
					name: '개발진척현황'
				},
				{
					id: 'SWZP0090',
					path: '/SWZP0090',
					name: '본오픈이행관리'
				},
				{
					id: 'SWZP0100',
					path: '/SWZP0100',
					name: '산출물체크관리'
				},
				{
					id: 'SWZP0110',
					path: '/SWZP0110',
					name: '시스템관리'
				},
			],
			data: {
				api: {
					readData: { url: 'http://localhost:8080/SWZP0010/select', method: 'GET' },
				},	
				initialRequest: false,
			},
			columnOptions: {
				resizable: true
			},
			rowHeaders:['rowNum'],
			header:{ 
				height: 28
			},
			columns1: [
				{
					header: '어플리케이션',
					width: 150,
					minWidth: 50,
					maxWidth: 250,
					name: 'title',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
							listItems: listItem
							}
					}
				},
				{
					header: '어플리케이션명',
					width: 150,
					name: 'bz_dtls_txt',
				},
				{
					header: '레벨',
					width: 150,
					name: 'pgm_id',
					
				},
				{
					header: '어플리케이션기능',
					width: 150,
					name: 'pgm_nm',
					
				},
				{
					header: '프로세스ID',
					width: 150,
					name: 'bzcd',
					
				},
				{
					header: '단위기능ID',
					width: 150,
					name: 'dvlp_dis_cd',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
							listItems: listItem
							}
					}
				},
				{
					header: '단위기능명',
					width: 150,
					name: 'pgm_dis_cd',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
							listItems: listItem
							}
					}
				},
				{
					header: '세부설정',
					width: 150,
					name: 'enlpe_nm',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
							listItems: listItem
							}
					}
				},
				{
					header: '주요입력',
					width: 150,
					name: 'prc_step_cd',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
							listItems: listItem
							}
					}
				},
				{
					header: '처리흐름',
					width: 150,
					name: 'dvlpe_no',
					
				},
				{
					header: '주요출력',
					width: 150,
					name: 'pl_no',
					
				},
				{
					header: '비고',
					width: 150,
					name: 'opr_no',
					
				},
			],
			columns2: [
				{
					header: '산출명',
					width: 150,
					minWidth: 50,
					maxWidth: 250,
					name: 'title',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
							listItems: listItem
							}
					}
				},
				{
					header: '산출물등록',
					width: 150,
					name: 'bz_dtls_txt',
				},
				{
					header: '업무기능분할도',
					width: 150,
					name: 'pgm_id',
					
				},
				{
					header: '요구사항정의서',
					width: 150,
					name: 'pgm_nm',
					
				},
				{
					header: '화면목록',
					width: 150,
					name: 'bzcd',
					
				},
				{
					header: '보고서목록',
					width: 150,
					name: 'dvlp_dis_cd',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
							listItems: listItem
							}
					}
				},
				{
					header: '단위기능명',
					width: 150,
					name: 'pgm_dis_cd',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
							listItems: listItem
							}
					}
				},
				{
					header: '세부설정',
					width: 150,
					name: 'enlpe_nm',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
							listItems: listItem
							}
					}
				},
				{
					header: '주요입력',
					width: 150,
					name: 'prc_step_cd',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
							listItems: listItem
							}
					}
				},
				{
					header: '처리흐름',
					width: 150,
					name: 'dvlpe_no',
					
				},
				{
					header: '주요출력',
					width: 150,
					name: 'pl_no',
					
				},
				{
					header: '비고',
					width: 150,
					name: 'opr_no',
					
				},
			],
			columns3: [
				{
					header: '항목ID',
					width: 350,
					name: 'title',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
							listItems: listItem
							}
					}
				},
				{
					header: '항목명',
					name: 'bz_dtls_txt',
				},
			]
		}
	},
};

</script>
<style>
</style>
