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
                            <li><a href="/SWZP0014">{{menu_list[0].name}}</a></li>
                            <li><a href="/SWZP0010">{{menu_list[1].name}}</a></li>
                            <li class="active"><a href="/SWZP0030">{{menu_list[2].name}}</a></li>
                            <li><a href="/SWZP0040">{{menu_list[3].name}}</a></li>
                            <li><a href="/SWZP0050">{{menu_list[4].name}}</a></li>
                            <li><a href="/SWZP0060">{{menu_list[5].name}}</a></li>
                            <li><a href="/SWZP0070">{{menu_list[6].name}}</a></li>
                            <li><a href="/SWZP0080">{{menu_list[7].name}}</a></li>
                            <li><a href="/SWZP0090">{{menu_list[8].name}}</a></li>
                            <li><a href="/SWZP0100">{{menu_list[9].name}}</a></li>
                            <li><a href="/SWZP0110">{{menu_list[10].name}}</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
          <div class = "col">
            <li class="filter-item">
              <div class="item-con">프로젝트
                <select
                    v-model = "info.prjt_nm_selected"
                    @change = "change"
                    style   = "width: 167px;"
                >
                  <option
                      v-for  = "(prjt_nm, idx) in info.prjt_nm"
                      :key   = "idx"
                      v-text = "prjt_nm.text"
                      :value = "prjt_nm.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">업무구분
                <select
                    v-model = "info.bzcd_selected"
                    style   = "width: 128px"
                >
                  <option
                      v-for  = "(bzcd, idx) in info.bzcd"
                      :key   = "idx"
                      v-text = "bzcd.text"
                      :value = "bzcd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">차수
                <select
                    v-model = "info.sqn_cd_selected"
                    style   = "width: 128px"
                >
                  <option
                      v-for  = "(sqn_cd, idx) in info.sqn_cd"
                      :key   = "idx"
                      v-text = "sqn_cd.text"
                      :value = "sqn_cd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">시나리오ID
                <input type="text"
                       style="width: 70px;"
                       v-model="info.scnr_id"
                       @keyup.enter="fnSearch"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">테스트케이스ID
                <input type="text"
                       style="width: 110px;"
                       v-model="info.tst_case_id"
                       @keyup.enter="fnSearch"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">처리단계
                <select
                    v-model = "info.itg_tst_prc_cd_selected"
                    style   = "width: 128px"
                >
                  <option
                      v-for  = "(itg_tst_prc_cd, idx) in info.itg_tst_prc_cd"
                      :key   = "idx"
                      v-text = "itg_tst_prc_cd.text"
                      :value = "itg_tst_prc_cd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">개발자명
                <input type="text"
                       style="width: 70px;"
                       v-model="info.dvlpe_eno"
                       @keyup.enter="fnSearch"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">담당PL명
                <input type="text"
                       style="width: 70px;"
                       v-model="info.pl_eno"
                       @keyup.enter="fnSearch"
                >
              </div>
            </li>

            <div class="btn btn-filter-p">
              <a href="#" @click="fnSave">저장</a>
            </div>
            <div class="btn btn-filter-p">
              <a href="#" @click="fnSearch">조회</a>
            </div>
          </div>
          <div class = "col">
            <li class="filter-item-p">
              <div class="item-con">예상종료일자
                <div class="input-dateWrap"><input type="date" :max="frcs_end_dt" v-model="frcs_sta_dt"></div>
                -
                <div class="input-dateWrap"><input type="date" :min="frcs_sta_dt" v-model="frcs_end_dt"></div>
              </div>
            </li>
            <li class="filter-item-p">
              <div class="item-con">개발자확인일자
                <div class="input-dateWrap"><input type="date" :max="end_dt" v-model="sta_dt"></div>
                -
                <div class="input-dateWrap"><input type="date" :max="sta_dt" v-model="end_dt"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">담당현업
                <input type="text"
                       style="width: 70px;"
                       v-model="info.crpe_eno"
                       @keyup.enter="fnSearch"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">유형
                <select
                    v-model = "info.tp_selected "
                    style   = "width: 128px"
                >
                  <option
                      v-for  = "(tp, idx) in info.tp"
                      :key   = "idx"
                      v-text = "tp.text"
                      :value = "tp.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">요구사항ID
                <input type="text"
                       style="width: 110px;"
                       v-model="info.rqu_sbh_id"
                       @keyup.enter="fnSearch"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">
                <input type="checkbox"
                       id="check_Yn"
                       v-model="info.check_Yn"
                >
                <label for="　삭제통합테스트 포함">　삭제통합테스트 포함</label>
              </div>
            </li>
          </div>
        </ul>
        <ul class="filter-btn">
          <div class="btn btn-filter-b">
            <a href="#" @click="gridExcelExport">테이블백업</a>
          </div>
          <div class="btn btn-filter-b">
            <a href="#" @click="open_page">기타항목수정</a>
          </div>
          <div class="btn btn-filter-d">
            <a href="#" @click="gridExcelExport">TC증빙 일괄다운로드ⓘ</a>
          </div>
          <div class="btn btn-filter-d">
            <a href="#" @click="gridExcelExport">양식다운로드ⓘ</a>
          </div>
          <div class="btn btn-filter-e">
            <a href="#" @click="gridExcelExport">엑셀업로드</a>
          </div>
          <div class="btn btn-filter-e">
            <a href="#" @click="gridExcelExport">엑셀다운로드</a>
          </div>
          <div class="btn btn-filter-b">
            <a href="#" @click="gridAddRow">행추가</a>
          </div>
          <div class="btn btn-filter-b">
            <a href="#" @click="gridDelRow">행삭제</a>
          </div>

        </ul>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="gridWrap" style="min-width: 750px;">
          <grid
              ref="grid"
              :data="dataSource"
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
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용


//그리드 아이템 예제
var listItem = [{text:"개발", value:"1"},{text:"운영", value:"2"},{text:"이관", value:"3"}];
var prjt_nm  = [{text:"개발", value:"1"},{text:"운영", value:"2"},{text:"이관", value:"3"}];

// 업무구분
const bzcd = [
				{	text:"전체", 	value:'999'},
				{	text:"신용", 	value:'AAA'}, 
				{	text:"재무제표", 	value:"BBB"},
				{	text:"신용평가", 	value:"CCC"},
			 ];
// 개발구분
const dvlp_dis_cd = [
	                    {	text:"전체", 		value:"999"},
	                    {	text:"신규", 		value:"100"}, 
	                    {	text:"변경", 		value:"200"},
	                    {	text:"이행", 		value:"300"},
	                    {	text:"삭제", 		value:"400"}
	                ];
// 프로그램구분
const pgm_dis_cd = [
                   		{	text:"전체", 		value:"999"},
  						{	text:"화면", 		value:"100"},
  						{	text:"프로그램", 	value:"200"},
  						{	text:"보고서", 	value:"300"},
  						{	text:"배치", 		value:"400"}
  				   ];
// 프로그램 세부 구분
const enlpe_nm = [
					{	text:"전체", 		value:'999'},
  					{	text:"JSP", 	value:"100"},
  					{	text:"JAVA", 	value:"200"},
  					{	text:"RD", 		value:"300"}
  				 ];
// 처리단계
const prc_step_cd = [
						{	text:"전체", 		value:"999"},
						{	text:"미개발",	value:"1"},
						{	text:"개발중", 	value:"2"},
						{	text:"개발완료", 	value:"3"},
						{	text:"PL완료", 	value:"4"},
						{	text:"삭제", 		value:"5"},
						{	text:"개발종료", 	value:"6"}
					];
					
var pgm_dis_cd_selected;
var bzcd_selected;
var prjt_nm_selected;
var bzcd_selected;
var sqn_cd_selected;
var itg_tst_prc_cd_selected;					 							//처리단계
var tp_selected;


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
	// 화면 동작 시 제일 처음 실행되는 부분
	// 변수 초기화
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
			this.$refs.grid.invoke("modifyData");
			console.log("modifyData");
		},
		onClick(ev) {
			console.log("클릭" + ev.rowKey);
			this.curRow = ev.rowKey;
		},
		fnSearch(){
			this.$refs.grid.invoke("setRequestParams", this.info);
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
				info : {
					pgm_id      : this.pgm_id,    	// 프로그램ID
					pgm_nm      : this.pgm_nm,    	// 프로그램명
					dvlpe_no    : this.dvlpe_no,    // 개발자명
					pl_no       : this.pl_no,    	  // 담당PL명
					
					dvlp_dis_cd : dvlp_dis_cd,		  // 개발구분
					prjt_nm     : prjt_nm,    		  // 프로젝트명
					bzcd        : bzcd,    			    // 업무구분
					pgm_dis_cd  : pgm_dis_cd,    	  // 프로그램구분
					prc_step_cd : prc_step_cd,    	// 처리단계

					/* select 박스 */
					dvlp_dis_cd_selected : dvlp_dis_cd[0].value,  // 개발구분
					prjt_nm_selected     : prjt_nm[0].value,      // 프로젝트명
					bzcd_selected        : bzcd[0].value,         // 업무구분 
					pgm_dis_cd_selected  : pgm_dis_cd[0].value    // 프로그램구분

				},
				addRow : {
					
				},
					frcs_sta_dt : '',    // 계획일자STA
					frcs_end_dt : '',    // 계획일자END
					sta_dt      : '',    // 실제일자STA
					end_dt      : '',    // 실제일자END
		            
					check_Yn    : false,  // 삭제프로그램/소스취약점포함
					
					count:0,
					curRow:-1,
					title:"",
					scrollX:false,
					scrollY:false,
					bodyHeight: 610,
					rowHeight: 30,
					showDummyRows: true,
					open: false,
					menu_list: [
					{
            id: 'SWZP0014',
            path: '/SWZP0014',
            name: 'PMS현황'
          },
            {
              id: 'SWZP0010',
              path: '/SWZP0010',
              name: '개발현황'
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
			dataSource: {
				api: {
					readData: { url: 'http://localhost:8080/SWZP0030/select', method: 'GET' },
					modifyData : { url: 'http://localhost:8080/SWZP0030/select', method: 'PUT'},
				},	
				initialRequest: false,
			},
			columnOptions: {
				resizable: true
			},
			rowHeaders:['checkbox', 'rowNum'],
			header:{ 
				height: 40
			},
			columns: [
				{
					header: '업무',
					width: 100,
					minWidth: 50,
					maxWidth: 250,
					name: 'title',
					align: 'center',
					formatter: 'listItemText',
					editor: {
							 	type: 'select',
								options:{
											listItems: listItem
										}
							}
				},
				{
					header: '업무세부',
					width: 180,
					align: 'left',
					name: 'bz_dtls_txt',
				},
				{
					header: '프로그램ID',
					width: 150,
					align: 'left',
					name: 'pgm_id',
					
				},
				{
					header: '프로그램명',
					width: 280,
					align: 'left',
					name: 'pgm_nm',
					
				},
				{
					header: '업무구분',
					width: 100,
					align: 'center',
					name: 'bzcd',
					type: 'text'
				},
				{
					header: '개발구분',
					width: 80,
					align: 'center',
					name: 'dvlp_dis_cd',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
								listItems: dvlp_dis_cd
							}
					}
				},
				{
					header: '프로그램구분',
					width: 120,
					align: 'center',
					name: 'pgm_dis_cd',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
								listItems: pgm_dis_cd
							}
					}
				},
				{
					header: '프로그램세부구분',
					width: 120,
					align: 'center',
					name: 'enlpe_nm',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
								listItems: enlpe_nm
							}
					}
				},
				{
					header: '예상시작일',
					width: 110,
					align: 'center',
					name: 'frcs_sta_dt',
					format: 'yyyy-mm-dd',
					editor: 'datePicker'
				},
				{
					header: '예상종료일',
					width: 110,
					align: 'center',
					type: 'date',
					name: 'frcs_end_dt',
					editor: 'datePicker'
				},
				{
					header: '개발자완료일자',
					width: 110,
					align: 'center',
					name: 'dvlpe_cnf_dt',
					editor: 'datePicker'
				},
				{
					header: 'PL확인일자',
					width: 110,
					align: 'center',
					name: 'pl_cnf_dt',
					editor: 'datePicker'
				},
				{
					header: '처리단계',
					width: 80,
					align: 'center',
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
					header: '개발자',
					width: 160,
					align: 'center',
					name: 'dvlpe_no',
					
				},
				{
					header: '담당PL',
					width: 160,
					align: 'center',
					name: 'pl_no',
					
				},
				{
					header: '현업',
					width: 160,
					align: 'center',
					name: 'opr_no',
					
				},
				{
					header: '단위테스트증빙첨부',
					width: 150,
					align: 'center',
					name: 'atfl_mng_id',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
							listItems: listItem
							}
					}
				},
				{
					header: '총건수',
					width: 80,
					align: 'right',
					name: 'col19',
					
				},
				{
					header: '완료',
					width: 80,
					align: 'center',
					name: 'col20',
					
				},
				{
					header: '미완료',
					width: 80,
					align: 'center',
					name: 'col21',
					
				},
				{
					header: '결함등록',
					width: 120,
					name: 'col22',
				},
				{
					header: '요구사항ID',
					width: 150,
					name: 'col23',
				},
				{
					header: '미진사유',
					width: 400,
					name: 'col24',
				},
				{
					header: '해당화면ID',
					width: 200,
					name: 'col25',
				},
				{
					header: '소스경로',
					width: 140,
					name: 'col26'
				},
				{
					header: '일자',
					width: 90,
					name: 'col27'
				},
				{
					header: '이행시간',
					width: 90,
					name: 'col28'
				},
				{
					header: '담당자',
					width: 90,
					name: 'col29'
				},
				{
					header: '일자',
					width: 90,
					name: 'col30'
				},
				{
					header: '점검시간',
					width: 90,
					name: 'col31'
				},
				{
					header: '담당자',
					width: 90,
					name: 'col32'
				},
				{
					header: '이행진행구분',
					width: 150,
					name: 'col33',
					formatter: 'listItemText',
					editor: {
					type: 'select',
					options:{
							listItems: listItem
							}
					}
				},
			]
		}
	},
};

</script>
<style>
@font-face {
  font-family: 'Noto Sans Kr';
  font-style: normal;
  font-weight: 300;
  src:
      local('Noto Sans Light'),
      local('NotoSans-Light'),
      url('../../assets/font/NotoSansKR-Light.otf') format('opentype');
}
@font-face {
  font-family: 'Noto Sans Kr';
  font-style: normal;
  font-weight: 400;
  src:
      local('Noto Sans Regular'),
      local('NotoSans-Regular'),
      url('../../assets/font/NotoSansKR-Regular.otf') format('opentype');
}
@font-face {
  font-family: 'Noto Sans Kr';
  font-style: normal;
  font-weight: 700;
  src:
      local('Noto Sans Bold'),
      local('NotoSans-Bold'),
      url('../../assets/font/NotoSansKR-Bold.otf') format('opentype');
}
:root {
  --primary: #FF5C00;
  --primary-b: #FF3D00;
  --aside-w : 240px;
  --gnb-h : 54px;
}

/* COMMON */
* {
  font-size: 14px;
}
html {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica
  Neue, Arial, 'Noto Sans KR', sans-serif, Apple Color Emoji, Segoe UI Emoji;
}
h1,h2,h3,h4,h5,p,em,strong,b,a {
  /* font-family: 'Noto Sans KR', sans-serif; */
  color: #000;
  letter-spacing: -0.03em;
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  text-decoration: underline;
  color: inherit;
}

input {
  -webkit-appearance:checkbox;
  height: 24px;
  line-height: 24px;
}
select {
  -moz-appearance:none; /* Firefox */
  -webkit-appearance:none; /* Safari and Chrome */
  appearance:none;
  height: 24px;
  line-height: 24px;
  background: #f2f2f2 url(../../assets/img/ic_select_arr_s.svg) right 5px center/16px no-repeat;
  padding-right: 26px !important;
}
textarea, input {
  -webkit-appearance: none;
  -webkit-border-radius: 0;
  background: #F2F2F2;
}
textarea::placeholder, input::placeholder {
  color: #A8A8A8;
}
textarea, input, select {
  outline-color: var(--primary);
  border: 0;
  padding: 0 6px;
  font-size: 12px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
input[type="date"]::-webkit-calendar-picker-indicator{
  opacity:0;
  z-index: 1;
  cursor: pointer;
}
.input-dateWrap {
  position: relative;
  display: inline-block;
}
.input-dateWrap::after {
  content: '';
  position: absolute;
  right: 6px;
  top: 4px;
  width: 16px;
  height: 16px;
  background: url(../../assets/img/ic_input_cal.svg) center/cover no-repeat;
}
.input-searchWrap {
  position: relative;
}
.input-searchWrap input {
  padding-right: 28px;
  width: 100%;
}
.input-searchWrap .search-btn {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: block;
  width: 28px;
  height: 24px;
  background: url(../../assets/img/ic_search.svg) center/16px no-repeat;
  border: 0;
}
input[type="checkbox"] {
  height: 24px;
  width: 24px;
  background: #f2f2f2 url(../../assets/img/ic_check_df.svg) center/16px no-repeat;
}
input[type="checkbox"]:checked {
  background: var(--primary) url(../../assets/img/ic_check_ac.svg) center/16px no-repeat;
}
.btn {
  cursor: pointer;
  transition: ease-out 0.3s;
}
.btn.btn-line {
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  min-width:74px;
  border: 1px solid #DADADA;
  border-radius: 0;
  padding: 2px 4px;
  box-sizing: border-box;
}
.btn.btn-line-p {
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  min-width:74px;
  border: 1px solid var(--primary);
  color: var(--primary);
  border-radius: 0;
  padding: 2px 4px;
  box-sizing: border-box;
}
.btn.btn-primary {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
  height: 42px;
  padding: 0px 10px;
  background: var(--primary);
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #fff;
  border: 0;
  margin: 0;
}
.btn.btn-primary:hover {
  background-color: var(--primary-b);
}
.btn.btn-primary + .btn.btn-primary {
  margin-left: 8px;
}
.btn.logOut {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  background: #F2F2F2;
  border: 1px solid #DADADA;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 14px;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn.logOut::before {
  content: '';
  display: block;
  width: 16px;
  height: 16px;
  background: url(../../assets/img/ic_logOut.svg) center/cover no-repeat;
  margin-right: 8px;
}
.btn.btn-filter-p {
  border-radius: 0;
  font-size: 12px;
  height: 24px;
  line-height: 22px;
  padding: 0 10px;
  color: #fff;
  min-width: 112px;
  margin-top:3px;
}
.btn.btn-filter-b {
  border-radius: 0;
  font-size: 12px;
  height: 24px;
  line-height: 22px;
  padding: 0 10px;
  color: #fff;
  min-width: 80px;
}
.btn.btn-filter-e {
  border-radius: 0;
  font-size: 12px;
  height: 24px;
  line-height: 22px;
  padding: 0 10px;
  color: #fff;
  min-width: 80px;
}
.btn.btn-filter-d {
  border-radius: 0;
  font-size: 12px;
  height: 24px;
  line-height: 22px;
  padding: 0 10px;
  color: #fff;
  min-width: 80px;
  border: 1px solid #8C8C8C;
}
.btn.btn-filter-p {
  background: var(--primary);
}
.btn.btn-filter-b {
  background: #5B5B5B;
}
.btn.btn-filter-e {
  background: #00B700;
}
.btn.btn-filter-d {
  background: #BDBDBD;
}
.btn.btn-filter-p:hover{
  background-color: var(--primary-b);
}
.btn.btn-filter-b:hover {
  background-color: #3c3c3c;
}
.btn.btn-filter-e:hover {
  background-color: #009300;
}
.btn.btn-filter-d:hover {
  background-color: #A6A6A6;
}
.btn.btn-filter-p:hover a,
.btn.btn-filter-b:hover a,
.btn.btn-filter-e:hover a,
.btn.btn-filter-d:hover a{
  text-decoration: none;
}
.ic-info {
  display: block;
  width: 16px;
  height: 16px;
  background: url(../../assets/img/ic_info.svg) center/cover no-repeat;
  margin-right: 4px;
}
.info-msg {
  display: flex;
}
table.form-table th {
  width: 113px;
  text-align: left;
  padding: 7px 0;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
  font-size: 14px;
  line-height: 19px;
}
table.form-table td {
  padding: 7px 0;
  font-size: 14px;
  line-height: 19px;
}
table.form-table input,
table.form-table select {
  font-size: 14px;
  line-height: 19px;
  height: 38px;
  background: #F2F2F2;
  border: 0;
  border-radius: 0;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}
table.form-table select {
  background-image: url(../../assets/img/ic_select_arr.svg);
  background-size: 16px;
  background-position: calc(100% - 15px) center;
  background-repeat: no-repeat;
}
.text-primary {
  color: var(--primary);
}
.clear-fix::after {
  content: '';
  display: block;
  clear: both;
}
.contents {
  display: flex;
  flex-wrap: nowrap;
}
.contents aside {
  width: var(--aside-w);
  height: calc(100vh - 97px);
  border-right: 1px solid #D5D5D5;
  box-sizing: border-box;
  flex: 0 0 auto;
  position: fixed;
  left: 0;
  top: 54px;
}
.contents-body {
  width: 100%;
  padding-top: var(--gnb-h);
  padding-left: var(--aside-w);
}

.page-contents {
  width: 100%;
  overflow: auto;
}
.gridWrap {

}
.grid {
  font-size: 12px;
  text-align: left;
  table-layout: fixed;
  width: 100%;
}
.grid thead {
  font-weight: bold;
}
.grid thead th {
  padding: 7px 20px;
  border-top: 1px solid #D4D4D4;
  border-bottom: 2px solid #C4C4C4;
  height: 50px;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
}
.grid tbody td {
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 7px 20px;
  height: 50px;
  border-bottom: 1px solid #C4C4C4;
}

/* ASIDE -- LNB */
aside .page-tit {
  width: 100%;
  height: 42px;
  color: #fff;
  background: var(--primary);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
}
aside dl::after {
  content: '';
  display: block;
  clear: both;
}
aside dl dd a {
  display: block;
  float: left;
  width: 50%;
  box-sizing: border-box;
  border-bottom: 1px solid #FFD1A7;;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
}
aside dl dd + dd a {
  border-left: 1px solid #F2F2F2;
}

.aside-con {
  padding: 20px 16px;
}
.aside-con .card {
  border: 0;
}
.aside-con .card + .card {
  margin-top: 26px;
}
.aside-con .card-header {
  background: transparent;
  border: 0;
  padding: 0;
}
.aside-con .card-body {
  padding: 0;
  padding-left: 16px;
  padding-top: 10px;
  font-size: 14px;
  line-height: 16px;
}
.aside-con .card-body li {
  padding: 5px 0;
}
.aside-con .card-body li.active,
.aside-con .card-body li:hover {
  color: var(--primary);
}
.aside-con .card-body li a {
  text-decoration: none;
}
.aside-con .menu-group {
  display: flex;
  line-height: 16px;
  border: 0;
  background: transparent;
  margin-bottom: 10px;
  padding: 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #8E8E8E;
  margin: 0;
}
.aside-con .menu-group::before {
  content: '';
  display: block;
  width: 16px;
  height: 16px;
  background: url(../../assets/img/ic_lnb_arr.svg) center/cover no-repeat;
  transition: 0.3s;
}
.aside-con .collapsed.menu-group::before {
  transform: rotate(-90deg);
}

/* SECTION -- FILTER */
.filter {
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
}
.filter .filter-con {

}
.filter .filter-con .filter-item {
  float: left;
  margin-right: 20px;
  padding: 4px 0;
  list-style:none;
}
.filter .filter-con .filter-item-p {
  float: left;
  margin-left: 15px;
  margin-right: 20px;
  padding: 4px 0;
  list-style:none;
}
.filter .filter-con .filter-item label {
  font-weight: normal;
  font-size: 11px;
  line-height: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.filter-btn {
  flex: 1 0 auto;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  margin-right: 20px;
}
</style>
