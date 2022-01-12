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
                            <li><a href="/SWZP0014">{{menu_list[0].name}}</a></li>
                            <li><a href="/SWZP0010">{{menu_list[1].name}}</a></li>
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
                        <div class="item-con">업무구분
                            <select
                                v-model = "info.bzcd_selected"
                                style   = "width: 180px"
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
                        <div class="item-con">산출물구분
                            <select
                                v-model = "info.file_cd_selected"
                                style   = "width: 180px"
                            >
                                <option
                                    v-for  = "(file_cd, idx) in info.file_cd"
                                    :key   = "idx"
                                    v-text = "file_cd.text"
                                    :value = "file_cd.value"
                                ></option>
                            </select>
                        </div>
                    </li>
                    <li class="filter-item">
                        <div class="item-con">검증구분
                            <select
                                v-model = "info.check_cd_selected"
                                style   = "width: 200px"
                            >
                                <option
                                    v-for  = "(check_cd, idx) in info.check_cd"
                                    :key   = "idx"
                                    v-text = "check_cd.text"
                                    :value = "check_cd.value"
                                ></option>
                            </select>
                        </div>
                    </li>
                    <li class="filter-item">
                        <div class="item-con">검색항목
                            <select
                                v-model = "info.search_cd_selected"
                                style   = "width: 100px"
                            >
                                <option
                                    v-for  = "(search_cd, idx) in info.search_cd"
                                    :key   = "idx"
                                    v-text = "search_cd.text"
                                    :value = "search_cd.value"
                                ></option>
                            </select>
                        </div>
                    </li>
                    <li class="filter-item">
                        <div class="item-con">
                            <input type="text" placeholder="입력" v-model="info.searchbox_cd" style = "width: 330px">
                        </div>
                    </li>
                </ul>

                <ul class="filter-btn">
                    <div class="btn btn-filter-p" style = "margin-left: 10px">
                        <a href="#" @click="fnSearch">조회</a>
                    </div>
                </ul>
            </section>

            <!-- page contents -->
            <section class="page-contents">
            <div class="grid1-box">
              <div class="div-header"><h2>산출물 상세정보</h2>
                <ul class="filter-btn">
                  <li class="filter-item">
                    <div class="item-con">
                      <input type="checkbox" id="check_Yn" v-model="info.check_Yn">
                      <label>　삭제 후 엑셀업로드　</label>
                    </div>
                  </li>
                  <div class="btn btn-filter-e">
                    <a href="#" @click="gridExcelExport">엑셀업로드</a>
                  </div>
                  <div class="btn btn-filter-e">
                    <a href="#" @click="gridExcelExport">엑셀다운로드</a>
                  </div>
                </ul>
              </div>
                <div class="gridWrap" style="min-width: 750px;">
                  <grid
                    ref="grid1"
                    :data="dataSource"
                    :header="header"
                    :columns="columns1"
                    :bodyHeight="125"
                    :minRowHeight="minRowHeight"
                    :showDummyRows="showDummyRows"
                    :columnOptions="columnOptions"
                    :rowHeight="rowHeight"
                    :rowHeaders="rowHeaders"
                    @click="onClick"
                  ></grid>
                </div>
               </div>
               <div class="grid1-box">
                 <div class="div-header"><h2>산출물 점검대상</h2></div>
                  <div class="gridWrap" style="min-width: 750px;">
                    <grid
                      ref="grid2"
                      :data="dataSource"
                      :header="header"
                      :columns="columns2"
                      :bodyHeight="bodyHeight"
                      :minRowHeight="minRowHeight"
                      :showDummyRows="showDummyRows"
                      :columnOptions="columnOptions"
                      :rowHeight="rowHeight"
                      @click="onClick"
                    ></grid>
                  </div>
               </div>
               <div class="grid1-box">
                 <div class="div-header"><h2>미매핑 ID목록</h2>
                   <ul class="filter-btn">
                     <div class="btn btn-filter-e">
                       <a href="#" @click="gridExcelExport">엑셀다운로드</a>
                     </div>
                   </ul>
                 </div>
                  <div class="gridWrap" style="min-width: 750px;">
                    <grid
                      ref="grid3"
                      :data="dataSource"
                      :header="header"
                      :columns="columns3"
                      :bodyHeight="bodyHeight"
                      :minRowHeight="minRowHeight"
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
import WindowPopup from "./PJTE3001.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
//그리드 아이템 예제
var listItem = [{text:"개발", value:"1"},{text:"운영", value:"2"},{text:"이관", value:"3"}];

// 업무구분코드
const bzcd = [
  {text: "전체", value: '999'},
  {text: "신용", value: 'AAA'},
  {text: "재무제표", value: "BBB"},
  {text: "신용평가", value: "CCC"},
];
// 산출물구분코드
const file_cd = [
  {text: "전체", value: "999"},
  {text: "요구사항정의서", value: "100"},
  {text: "화면설계서", value: "200"},
  {text: "프로그램설계서", value: "300"},
  {text: "인터페이스설계서", value: "400"},
  {text: "테이블목록", value: "500"},
  {text: "단위테스트결과서", value: "600"},
  {text: "통합테스트결과서", value: "700"},
  {text: "요구사항추적표", value: "800"},
];
// 검증구분코드
const check_cd = [
  {text: "1: 산출물목록 -> 산출물매핑ID", value: "100"},
  {text: "2: 산출물매핑ID -> 산출물목록", value: "200"},
];
// 검색항목코드
const search_cd = [
  {text: "전체", value: "999"},
  {text: "산출물상세정보", value: "100"},
  {text: "산출물점검대상", value: "200"},
  {text: "미매핑ID목록", value: "300"},
];

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
    this.fnSearch()
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
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");
      this.$refs.grid3.invoke("setRequestParams", this.info);
      this.$refs.grid3.invoke("readData");
		},
		gridInit(){
			this.$refs.grid1.invoke("clear");
			this.$refs.grid2.invoke("clear");
			this.$refs.grid3.invoke("clear");
		},
		gridExcelExport(){
			this.$refs.grid1.invoke("export", "xlsx", {fileName:"엑셀다운로드"});
			this.$refs.grid2.invoke("export", "xlsx", {fileName:"엑셀다운로드"});
			this.$refs.grid3.invoke("export", "xlsx", {fileName:"엑셀다운로드"});
		},
		gridExcelImport(){
			// 엑셀파일 업로드 로직 추가
		},
		open_page(){
			this.pop = window.open("../SWZP0041/", "open_page", "width=1000, height=800");
		},
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
      info: {
        bzcd_selected: bzcd[0].value,            // 업무구분
        file_cd_selected: file_cd[0].value,      // 산출물구분
        check_cd_selected: check_cd[0].value,    // 검증구분
        search_cd_selected: search_cd[0].value,  // 검색항목구분

        bzcd: bzcd,                  // 업무구분
        file_cd: file_cd,            // 산출물구분
        check_cd: check_cd,          // 검증구분
        search_cd: search_cd,        // 검색항목구분

        searchbox_cd: this.searchbox_cd, // 검색 입력
      },

			count:0,
			curRow:-1,
			title:"",
			scrollX:false,
			scrollY:false,
			bodyHeight: 175,
      minRowHeight: 10,
      rowHeight: 25,
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
					readData: { url: 'http://localhost:8080/SWZP0100/select', method: 'GET' },
				},
				initialRequest: false,
			},
			columnOptions: {
				resizable: true
			},
			rowHeaders:['rowNum'],
      header: {
        height: 45,
        complexColumns: [
          {
            header: '산출물목록',
            name: 'mergeColumn1',
            childNames: [ 'colm22', 'colm23', 'colm24', 'colm25'
                        , 'colm26', 'colm27', 'colm28', 'colm29', 'colm30'
                        , 'colm31', 'colm32', 'colm35', 'colm36']
          },
        ]
      },
			columns1: [
        {
          header: '항목1',
          width: 150,
          name: 'colm01',
        },
        {
          header: '항목2',
          width: 150,
          name: 'colm02',
        },
        {
          header: '항목3',
          width: 150,
          name: 'colm03',
        },
        {
          header: '항목4',
          width: 150,
          name: 'colm04',
        },
        {
          header: '항목5',
          width: 150,
          name: 'colm05',
        },
        {
          header: '항목6',
          width: 150,
          name: 'colm06',
        },
        {
          header: '항목7',
          width: 150,
          name: 'colm07',
        },
        {
          header: '항목8',
          width: 150,
          name: 'colm08',
        },
        {
          header: '항목9',
          width: 150,
          name: 'colm09',
        },
        {
          header: '항목10',
          width: 150,
          name: 'colm10',
        },
        {
          header: '항목11',
          width: 150,
          name: 'colm11',
        },
        {
          header: '항목12',
          width: 150,
          name: 'colm12',
        },
        {
          header: '항목13',
          width: 150,
          name: 'colm13',
        },
        {
          header: '항목14',
          width: 150,
          name: 'colm14',
        },
        {
          header: '항목15',
          width: 150,
          name: 'colm15',
        },
        {
          header: '항목16',
          width: 150,
          name: 'colm16',
        },
        {
          header: '항목17',
          width: 150,
          name: 'colm17',
        },
        {
          header: '항목18',
          width: 150,
          name: 'colm18',
        },
        {
          header: '항목19',
          width: 150,
          name: 'colm19',
        },
        {
          header: '항목20',
          width: 150,
          name: 'colm20',
        },
			],
      columns2: [
        {
          header: '구분',
          width: 50,
          name: 'colm21',
        },
        {
          header: '산출명',
          width: 190,
          name: 'colm22',
        },
        {
          header: '산출물등록',
          width: 80,
          name: 'colm23',
          align: 'center',
        },
        {
          header: '업무기능분할도',
          width: 120,
          name: 'colm24',
        },
        {
          header: '요구사항정의서',
          width: 120,
          name: 'colm25',
        },
        {
          header: '화면목록',
          width: 120,
          name: 'colm26',
        },
        {
          header: '보고서목록',
          width: 120,
          name: 'colm27',
        },
        {
          header: '인터페이스목록',
          width: 120,
          name: 'colm28',
        },
        {
          header: '프로그램목록',
          width: 120,
          name: 'colm29',
        },
        {
          header: '테이블목록',
          width: 120,
          name: 'colm30',
        },
        {
          header: '단위테스트',
          width: 120,
          name: 'colm31',
        },
        {
          header: '통합테스트',
          width: 120,
          name: 'colm32',
        },
        {
          header: '요구사항추적표',
          width: 120,
          name: 'colm35',
        },
        {
          header: '메뉴구조도',
          width: 120,
          name: 'colm36',
        },
			],
			columns3: [
        {
          header: '항목ID',
          width: 350,
          name: 'colm33',
        },
        {
          header: '항목명',
          name: 'colm34',
        },
			]
		}
	},
};

</script>
<style>
</style>
