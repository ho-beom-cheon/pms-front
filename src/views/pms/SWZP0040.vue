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
                <li class="active"><a href="/SWZP0040">{{menu_list[3].name}}</a></li>
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
              <div class="item-con">등록단계구분
                <select
                    v-model = "info.rgs_dscd_selected"
                    style   = "width: 120px"
                >
                  <option
                      v-for  = "(rgs_dscd, idx) in info.rgs_dscd"
                      :key   = "idx"
                      v-text = "rgs_dscd.text"
                      :value = "rgs_dscd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">결함유형
                <select
                    v-model = "info.err_tycd_selected"
                    style   = "width: 100px"
                >
                  <option
                      v-for  = "(err_tycd, idx) in info.err_tycd"
                      :key   = "idx"
                      v-text = "err_tycd.text"
                      :value = "err_tycd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">처리단계
                <select
                    v-model = "info.err_prc_step_cd_selected"
                    style   = "width: 128px"
                >
                  <option
                      v-for  = "(err_prc_step_cd, idx) in info.err_prc_step_cd"
                      :key   = "idx"
                      v-text = "err_prc_step_cd.text"
                      :value = "err_prc_step_cd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">결함등록자
                <input type="text"
                       placeholder="입력"
                       v-model="info.rgpe_no"
                       @keyup.enter="fnSearch"
                       style   = "width: 140px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">담당자
                <input type="text"
                       placeholder="입력"
                       v-model="info.dvlpe_no"
                       @keyup.enter="fnSearch"
                       style   = "width: 145px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">담당PL
                <input type="text"
                       placeholder="입력"
                       v-model="info.pl_no"
                       @keyup.enter="fnSearch"
                       style   = "width: 145px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">결함등록일자
                <div class="input-dateWrap"><input type="date" :max="frcs_end_dt" v-model="frcs_sta_dt"></div>
                -
                <div class="input-dateWrap"><input type="date" :min="frcs_sta_dt" v-model="frcs_end_dt"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">결함조치일자
                <div class="input-dateWrap"><input type="date" :max="end_dt" v-model="sta_dt"></div>
                -
                <div class="input-dateWrap"><input type="date" :max="sta_dt" v-model="end_dt"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">프로그램ID
                <input type="text"
                       placeholder="입력"
                       v-model="info.mng_id"
                       @keyup.enter="fnSearch"
                       style   = "width: 140px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">결함내용
                <input type="text"
                       placeholder="입력"
                       v-model="info.err_txt"
                       @keyup.enter="fnSearch"
                       style   = "width: 435px"
                >
              </div>
            </li>

            <li class="filter-item">
              <div class="item-con">
                <input type="checkbox" id="check_Yn" v-model="info.check_Yn">
                <label>　완료건 포함</label>
              </div>
            </li>
          </ul>
          <ul class="filter-btn">
            <div class="btn btn-filter-b">
              <a href="#" @click="open_page">안정화결함등록</a>
            </div>
            <div class="btn btn-filter-e">
              <a href="#" @click="gridExcelExport">엑셀업로드</a>
            </div>
            <div class="btn btn-filter-e">
              <a href="#" @click="gridExcelExport">엑셀다운로드</a>
            </div>
            <div class="btn btn-filter-p" style = "margin-left: 20px">
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
import 'tui-date-picker/dist/tui-date-picker.css';
import axios from "axios";
import {axiosService} from "@/api/http"; // Date-picker 스타일적용

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
//등록단계구분
const rgs_dscd = [
  {	text:"전체", 	        value:'999'},
  {	text:"단위테스트", 	  value:'1100'},
  {	text:"통합테스트1차", 	value:'2100'},
  {	text:"통합테스트2차", 	value:'2200'},
  {	text:"통합테스트3차", 	value:'2300'},
  {	text:"통합테스트4차", 	value:'2400'},
];

//결함유형
const err_tycd = [
  {	text:"전체", 	value:'999'},
  {	text:"결함", 	value:'100'},
  {	text:"개선", 	value:'200'},
  {	text:"기타", 	value:'900'},
];

// 처리단계
const err_prc_step_cd = [

  {text:"전체",     value:"999"},
  {text:"미개발",   value:"100"},
  {text:"개발중",   value:"200"},
  {text:"개발완료",  value:"300"},
  {text:"PL완료",    value:"400"},

];

var prjt_nm_selected;
var bzcd_selected;
var rgs_dscd_selected;
var err_tycd_selected;
var err_prc_step_cd_selected;

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
    this.$refs.grid.invoke("readData");
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
      //this.$refs.grid.invoke("modifyData");
      //console.log("modifyData");
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

        rgpe_no : this.rgpe_no,       //결함등록자
        dvlpe_no : this.dvlpe_no,     //담당자
        pl_no : this.pl_no,           //담당PL
        mng_id : this.mng_id,         //프로그램ID
        err_txt : this.err_txt,       //결함내용

        prjt_nm     : prjt_nm,    		      // 프로젝트명
        bzcd        : bzcd,    			        // 업무구분
        rgs_dscd      : rgs_dscd,               //등록단계구분
        err_tycd     : err_tycd,              //결함유형
        err_prc_step_cd  : err_prc_step_cd,   //처리단계
        /* select 박스 */
        prjt_nm_selected        : prjt_nm[0].value,        // 프로젝트명
        bzcd_selected           : bzcd[0].value,           // 업무구분
        rgs_dscd_selected         : rgs_dscd[0].value,         // 등록단계구분
        err_tycd_selected        : err_tycd[0].value,        // 결함유형
        err_prc_step_cd_selected : err_prc_step_cd[0].value, // 처리단계

      },
      addRow : {

      },

      frcs_sta_dt : '',    //결함등록일자STA
      frcs_end_dt : '',    //결함등록일자END
      sta_dt      : '',    //결함조치일자STA
      end_dt      : '',    //결함조치일자END

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
          readData: { url: 'http://localhost:8080/SWZP0040/select', method: 'GET' },
          //modifyData : { url: 'http://localhost:8080/SWZP0040/select', method: 'PUT'},
        },
        initialRequest: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders:['rowNum'],
      header:{
        height: 40
      },
      columns: [
        {
          header: '업무구분',
          width: 100,
          minWidth: 50,
          maxWidth: 250,
          align: 'center',
          name: 'bzcd',
        },
        {
          header: '등록단계',
          width: 180,
          align: 'left',
          name: 'rgs_dscd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: rgs_dscd
            }
          }
        },
        {
          header: '프로그램ID',
          width: 150,
          align: 'left',
          name: 'prjt_id'/*컬럼명 name 애매모호 ...db 보고 확인 */
        },
        {
          header: '프로그램명',
          width: 280,
          align: 'left',
          name: 'pgm_nm',/*컬럼명 name 애매모호 ...db 보고 확인 */

        },
        {
          header: '결함유형',
          width: 100,
          align: 'center',
          name: 'err_tycd',
          type: 'text',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: err_tycd
            }
          }
        },
        {
          header: '처리단계',
          width: 80,
          align: 'center',
          name: 'err_prc_step_cd'
        },
        {
          header: '결함등록일자',
          width: 120,
          align: 'center',
          name: 'rgs_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '결함등록자',
          width: 120,
          align: 'center',
          name: 'rgpe_no'
        },
        {
          header: '결함내용',
          width: 110,
          align: 'center',
          name: 'err_txt'
        },
        {
          header: '조치예정일자',
          width: 110,
          align: 'center',
          type: 'date',
          name: 'ttmn_scd_dt',
          editor: 'datePicker'
        },
        {
          header: '조치일자',
          width: 110,
          align: 'center',
          name: 'ttmn_dt',
          editor: 'datePicker'
        },
        {
          header: '조치자명',
          width: 110,
          align: 'center',
          name: 'dvlpe_no'/*컬럼명 name 애매모호 ...db 보고 확인 */
        },
        {
          header: 'PL명',
          width: 80,
          align: 'center',
          name: 'pl_no'
        },
        {
          header: '조치내용',
          width: 160,
          align: 'center',
          name: 'ttmn_txt'
        },
        {
          header: '이관전업무',
          width: 160,
          align: 'center',
          name: 'bfjr_bzcd'
        }
      ]
    }
  },
};

</script>
<style>
</style>
