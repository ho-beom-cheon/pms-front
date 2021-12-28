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
    </aside>

    <!-- 컨텐츠 영역 -->
    <div class="contents-body">
      <!-- 필터영역 -->
      <section class="filter">
        <div class = "col">
          <ul class="filter-con clear-fix">
            <li class="filter-item">
              <div class="item-con">프로젝트명
                <select
                    v-model = "info.prjt_nm_selected"
                    style   = "width: 165px"
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
                    style   = "width: 145px"
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
                    v-model = "info.dvlp_dis_cd_selected"
                    style   = "width: 120px"
                >
                  <option
                      v-for  = "(dvlp_dis_cd, idx) in info.dvlp_dis_cd"
                      :key   = "idx"
                      v-text = "dvlp_dis_cd.text"
                      :value = "dvlp_dis_cd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">시나리오ID
                <input type="text"
                       placeholder="입력"
                       v-model="info.pgm_id"
                       id= "info.pgm_id"
                       @keyup.enter="fnSearch"
                       style   = "width: 90px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">테스트케이스ID
                <input type="text"
                       placeholder="입력"
                       v-model="info.tst_case_id"
                       id= "info.tst_case_id"
                       @keyup.enter="fnSearch"
                       style   = "width: 153px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">처리단계
                <select
                    v-model = "info.prc_step_cd_selected"
                    style   = "width: 80px"
                >
                  <option
                      v-for  = "(prc_step_cd, idx) in info.prc_step_cd"
                      :key   = "idx"
                      v-text = "prc_step_cd.text"
                      :value = "prc_step_cd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">개발자명
                <input type="text"
                       placeholder="입력"
                       v-model="info.dvlpe_no"
                       @keyup.enter="fnSearch"
                       style   = "width: 140px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">담당PL명
                <input type="text"
                       placeholder="입력"
                       v-model="info.pl_no"
                       @keyup.enter="fnSearcha"
                       style   = "width: 145px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">예상종료일자
                <div class="input-dateWrap"><input type="date" :max="frcs_end_dt" v-model="frcs_sta_dt"></div>
                -
                <div class="input-dateWrap"><input type="date" :min="frcs_sta_dt" v-model="frcs_end_dt"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">개발자완료일자
                <div class="input-dateWrap"><input type="date" :max="end_dt" v-model="sta_dt"></div>
                -
                <div class="input-dateWrap"><input type="date" :max="sta_dt" v-model="end_dt"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">담당현업명
                <input type="text"
                       placeholder="입력"
                       v-model="info.dvlpe_no"
                       @keyup.enter="fnSearch"
                       style   = "width: 140px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">유형
                <select
                    v-model = "info.bzcd_selected"
                    style   = "width: 145px"
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
              <div class="item-con">요구사항ID
                <input type="text"
                       placeholder="입력"
                       v-model="info.rqu_sbh_id"
                       id= "info.rqu_sbh_id"
                       @keyup.enter="fnSearch"
                       style   = "width: 153px"
                >
              </div>
            </li>

            <li class="filter-item">
              <div class="item-con">
                <input type="checkbox" id="check_Yn" v-model="info.check_Yn">
                <label>　삭제통합테스트 포함</label>
              </div>
            </li>
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
            <div class="btn btn-filter-p" style = "margin-left: 20px">
              <a href="#" @click="fnSave">저장</a>
            </div>
            <div class="btn btn-filter-p">
              <a href="#" @click="fnSearch">조회</a>
            </div>
          </ul>
        </div>
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
import WindowPopup from "./SWZP0041.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용

//그리드 아이템 예제
var listItem = [{text:"개발", value:"1"},{text:"운영", value:"2"},{text:"이관", value:"3"}];
var prjt_nm  = [{text:"개발", value:"1"},{text:"운영", value:"2"},{text:"이관", value:"3"}];


// 업무구분
const bzcd = [
  {	text:"전체", 	value:'000'},
  {	text:"신용", 	value:'AAA'},
  {	text:"재무제표", 	value:"BBB"},
  {	text:"신용평가", 	value:"CCC"},
];
// 개발구분
const dvlp_dis_cd = [
  {	text:"전체", 		value:"000"},
  {	text:"신규", 		value:"100"},
  {	text:"변경", 		value:"200"},
  {	text:"이행", 		value:"300"},
  {	text:"삭제", 		value:"400"}
];
// 프로그램구분
const pgm_dis_cd = [
  {	text:"전체", 		value:"000"},
  {	text:"화면", 		value:"100"},
  {	text:"프로그램", 	value:"200"},
  {	text:"보고서", 	value:"300"},
  {	text:"배치", 		value:"400"}
];
// 프로그램 세부 구분
const enlpe_nm = [
  {	text:"전체", 		value:'000'},
  {	text:"JSP", 	value:"100"},
  {	text:"JAVA", 	value:"200"},
  {	text:"RD", 		value:"300"}
];
// 처리단계
const prc_step_cd = [
  {	text:"전체", 		value:"0"},
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
var dvlp_dis_cd_selected;

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
          header: '업무구분',
          width: 100,
          align: 'center',
          name: 'bzcd',
          type: 'text'
        },
        {
          header: '차수',
          width: 100,
          align: 'center',
          name: 'sqn_cd',
          type: 'text'
        },
        {
          header: '시나리오ID',
          width: 100,
          align: 'center',
          name: 'scnr_id',
          type: 'text'
        },
        {
          header: '시나리오명',
          width: 100,
          align: 'center',
          name: 'scnr_nm',
          type: 'text'
        },
        {
          header: '완료여부',
          width: 100,
          align: 'center',
          name: 'bzcd',
          type: 'text'
        },
        {
          header: '테스트케이스ID',
          width: 100,
          align: 'center',
          name: 'tst_case_id',
          type: 'text'
        },
        {
          header: '테스트케이스명',
          width: 100,
          align: 'center',
          name: 'tst_case_nm',
          type: 'text'
        },
        {
          header: '처리단계',
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
          header: '개발자확인일자',
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
          header: '담당현업',
          width: 160,
          align: 'center',
          name: 'opr_no',

        },
        {
          header: '통합테스트증빙첨부',
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
          header: '미진사유',
          width: 400,
          name: 'col24',
        },
        {
          header: '프로그램ID',
          width: 200,
          name: 'col25',
        },
        {
          header: '화면ID',
          width: 140,
          name: 'col26'
        },
        {
          header: '거래코드',
          width: 90,
          name: 'col27'
        },
        {
          header: '요구사항ID',
          width: 90,
          name: 'col28'
        },
        {
          header: '사전조건',
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
</style>
