<template>
  <!-- CONTENTS -->
  <div class="contents">
    <input type="hidden" name="updatedRows" v-model="updatedRows" id="updatedRows">
    <input type="hidden" name="deletedRows" v-model="deletedRows" id="deletedRows">
    <input type="hidden" name="createdRows" v-model="createdRows" id="createdRows">
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
                <li class="active"><a href="/PJTE2100">{{menu_list[1].name}}</a></li>
                <li><a href="/SWZP0030">{{menu_list[2].name}}</a></li>
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
            <combo @bzcd_change="bzcd_change"
                   @dvlp_dis_cd_change="dvlp_dis_cd_change"
            ></combo>
            <li class="filter-item">
              <div class="item-con">예상종료일자
                <div class="input-dateWrap"><input type="date" :max="frcs_end_dt" v-model="frcs_sta_dt"></div>
                -
                <div class="input-dateWrap"><input type="date" :min="frcs_sta_dt" v-model="frcs_end_dt"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">프로그램ID
                <input type="text"
                       placeholder="입력"
                       v-model="info.pgm_id"
                       @keyup.enter="fnSearch"
                       style   = "width: 145px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">프로그램명
                <input type="text"
                       placeholder="입력"
                       v-model="info.pgm_nm"
                       id= "info.pgm_nm"
                       @keyup.enter="fnSearch"
                       style   = "width: 153px"
                >
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
                       @keyup.enter="fnSearch"
                       style   = "width: 145px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">개발자완료일자
                <div class="input-dateWrap"><input type="date" :max="end_dt" v-model="sta_dt"></div>
                -
                <div class="input-dateWrap"><input type="date" :max="sta_dt" v-model="end_dt"></div>
              </div>
            </li>
          </ul>
          <ul class="filter-btn">
            <div class="btn btn-filter-d">
              <a href="#" @click="gridExcelExport">TC증빙 일괄다운로드ⓘ</a>
            </div>
            <div class="btn btn-filter-d">
              <a href="#" @click="gridExcelExport">양식다운로드ⓘ</a>
            </div>
            <div class="btn btn-filter-e">
              <a href="#" @click="gridExcelImport">엑셀업로드</a>
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
            <div class="btn btn-filter-b">
              <a href="#" @click="open_page">기타항목수정</a>
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
import Combo from "@/components/Combo"
import { Grid } from '@toast-ui/vue-grid';
import WindowPopup from "./SWZP0041.vue";          // 결함등록팝업 
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http"; // Date-picker 스타일적용


//그리드 아이템 예제 
var listItem = [{text:"개발", value:"1"},{text:"운영", value:"2"},{text:"이관", value:"3"}];
var prjt_nm  = [{text:"개발", value:"1"},{text:"운영", value:"2"},{text:"이관", value:"3"}];

let bzcd = [];
// 개발구분
const dvlp_dis_cd = [
  {text:"전체", value:"TTT"},
  {text:"신규", value:"100"},
  {text:"변경", value:"200"},
  {text:"이행", value:"300"},
  {text:"삭제", value:"400"}
];
// 프로그램구분 
const pgm_dis_cd = [
  {text:"전체", value:"TTT"},
  {text:"화면", value:"100"},
  {text:"프로그램", value:"200"},
  {text:"보고서", value:"300"},
  {text:"배치", value:"400"}
];
// 프로그램 세부 구분 
const enlpe_nm = [
  {text:"전체", value:'TTT'},
  {text:"JSP", value:"100"},
  {text:"JAVA", value:"200"},
  {text:"RD", value:"300"}
];
// 처리단계 
const prc_step_cd = [
  {text:"전체",      value:"TTT"},
  {text:"개발전",     value:"000"},
  {text:"개발시작",   value:"100"},
  {text:"개발자완료",  value:"200"},
  {text:"PL확인",     value:"300"},
  {text:"담당자확인",  value:"400"},
  // {text:"현업확인", value:"500"},
  // {text:"개발종료", value:"600"}
];

export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언) 
  components: {
    Combo,
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

    console.log("created")
  },
  beforeMount() {

    console.log("beforeMount");
  },
  mounted() {
    // 화면 초기화
    this.init();
    // 화면 접속 시 데이터 조회
    this.fnSearch();

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
    setBzcd() {
      bzcd.push(this.$store.getters["pms/CD1000000001N"])
      console.log("bzcd ::", bzcd)
    },
    getCount() {
      return this.count;
    }

  },

// 일반적인 함수를 선언하는 부분  
  methods: {
    bzcd_change(params) {this.info.bzcd_selected = params},
    dvlp_dis_cd_change(params) {this.info.bzcd_selected = params},

    init() {

      this.$refs.grid.invoke("clear");
      // 열고정
      this.$refs.grid.invoke("setFrozenColumnCount", 4);
      // 정렬
      //this.$refs.grid.invoke("sort",);
    },
    change(){
      console.log("change");
    },
    fnSave(){
      debugger;
      // 데이터 로그 확인
      console.log("updatedRows ::" ,this.$refs.grid.invoke("getModifiedRows").updatedRows);
      console.log("createdRows ::" ,this.$refs.grid.invoke("getModifiedRows").createdRows);
      console.log("deletedRows ::" ,this.$refs.grid.invoke("getModifiedRows").deletedRows);

      // 변경 데이터 저장
      this.updatedRows = this.$refs.grid.invoke("getModifiedRows").updatedRows;
      this.deletedRows = this.$refs.grid.invoke("getModifiedRows").deletedRows;
      this.createdRows = this.$refs.grid.invoke("getModifiedRows").createdRows;

      if(this.createdRows.length !== 0){
        // 데이터 파라메타 전달
        this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.createdRows));
        // create api 요청
        this.$refs.grid.invoke("request", "createData",{showConfirm:false});
      }
      if(this.updatedRows.length !== 0){
        // 데이터 파라메타 전달
        this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.updatedRows));
        // update api 요청
        this.$refs.grid.invoke("request", "updateData",{showConfirm:false});
      }
      if(this.deletedRows.length !== 0){
        // 데이터 파라메타 전달
        this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.deletedRows));
        // delete api 요청
        this.$refs.grid.invoke("request", "deleteData",{showConfirm:false});
      }
    },
    onClick(ev) {
      this.curRow = ev.rowKey;
      this.$refs.grid.invoke("getRow",this.curRow);
      console.log(this.$refs.grid.invoke("getRow", this.curRow));
    },
    fnSearch(){
      // 조회 api 호출
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");

    },
    gridAddRow(){
      this.$refs.grid.invoke("appendRow",
          {
            bzcd    : sessionStorage.getItem("LOGIN_BZCD"),
            save_yn : "N", //행르 추가하면 등록여부 'N'
            prjt_id : sessionStorage.getItem("LOGIN_PROJ_ID"),
            bkup_id : sessionStorage.getItem("LOGIN_PROJ_ID"),
          },
          {focus:true}) ;
    },
    gridDelRow(){
      for(let i=0; i<this.$refs.grid.invoke('getCheckedRows').length; i++){
          if(this.$refs.grid.invoke('getCheckedRows')[i].save_yn === "Y"){
            this.$refs.grid.invoke("uncheckAll");
            alert("등록된 목록은 삭제불가함. PMS 관리자에게 요청하세요.");
            return;
          }
      }
      this.$refs.grid.invoke("removeRow", this.curRow, {showConfirm:false});

    // DB 데이터 삭제로직 추가
    },
    gridExcelExport(){
      this.$refs.grid.invoke("export", "xlsx", {fileName:"엑셀다운로드"});
    },
    gridExcelImport(){
      // 엑셀파일 업로드 로직 추가
      this.$refs.grid.invoke("import", "xlsx", {fileName:"엑셀업로드"});
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
        pgm_id      : this.pgm_id,          // 프로그램ID
        pgm_nm      : this.pgm_nm,          // 프로그램명
        dvlpe_no    : this.dvlpe_no,        // 개발자명
        pl_no       : this.pl_no,           // 담당PL명

        //dvlp_dis_cd : dvlp_dis_cd,          // 개발구분
        prjt_nm     : prjt_nm,              // 프로젝트명
        //bzcd        : bzcd,                 // 업무구분
        pgm_dis_cd  : pgm_dis_cd,           // 프로그램구분
        prc_step_cd : prc_step_cd,          // 처리단계

        /* select 박스 */
        //dvlp_dis_cd_selected  : dvlp_dis_cd[0].value,  // 개발구분
        prjt_nm_selected      : prjt_nm[0].value,      // 프로젝트명
        //bzcd_selected         : bzcd[0].value,         // 업무구분
        pgm_dis_cd_selected   : pgm_dis_cd[0].value,   // 프로그램구분
        prc_step_cd_selected  : prc_step_cd[0].value,  // 프로그램구분
      },
      updatedRows : this.updatedRows,
      deletedRows : this.deletedRows,
      createdRows : this.createdRows,
      code_it : [],
      row : 0,
      set_yn : "",
      bzcd : [],

      addRow : {
        grid : this.grid,
      },
      frcs_sta_dt : "",     // 계획일자STA
      frcs_end_dt : "",     // 계획일자END
      sta_dt      : "",     // 실제일자STA
      end_dt      : "",     // 실제일자END

      // 메뉴 리스트 (추후 공통 작업 필요)
      menu_list: [
        {
          id: 'SWZP0014',
          path: '/SWZP0014',
          name: 'PMS현황'
        },
        {
          id: 'PJTE2100',
          path: '/PJTE2100',
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

      /* grid 속성 */
      count:0,
      curRow:-1,
      title:"",
      scrollX:false,
      scrollY:false,
      bodyHeight: 610,
      rowHeight: 30,
      showDummyRows: true,
      open: false,
      // toast ui grid 데이터
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE2100/select', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE2100/create', method: 'POST'},
          updateData : { url: process.env.VUE_APP_API + '/PJTE2100/update', method: 'PUT'},
          deleteData : { url: process.env.VUE_APP_API + '/PJTE2100/delete', method: 'PUT'},
        },
        initialRequest: false,
        contentType : 'application/json;',
        headers : {  'x-custom-header' : 'custom-header'  },
        withCredentials: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders:['checkbox', 'rowNum'],
      header:{
          height: 50,
          complexColumns: [
            {
              header: '계획',
              name: 'mergeColumn1',
              childNames: ['frcs_sta_dt', 'frcs_end_dt']
            },
            {
              header: '실적',
              name: 'mergeColumn2',
              childNames: ['sta_dt', 'end_dt']
            },
            {
              header: '결함',
              name: 'mergeColumn3',
              childNames: ['err_tot_cnt', 'err_cmpl_cnt', 'err_ncmpl_cnt']
            },
          ]
      },
      columns: [
        {
          header: '업무구분',
          width: 100,
          minWidth: 50,
          maxWidth: 250,
          name: 'bzcd',
          align: 'center',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: bzcd,
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
          ellipsis : true,
        },
        {
          header: '프로그램명',
          width: 220,
          align: 'left',
          name: 'pgm_nm',
          ellipsis : true,
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
          header: '예상시작일자',
          width: 110,
          align: 'center',
          name: 'frcs_sta_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '예상종료일자',
          width: 110,
          align: 'center',
          type: 'date',
          name: 'frcs_end_dt',
          editor: 'datePicker'
        },
        {
          header: '실제시작일자',
          width: 110,
          align: 'center',
          name: 'sta_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '실제종료일자',
          width: 110,
          align: 'center',
          type: 'date',
          name: 'end_dt',
          editor: 'datePicker'
        },
        {
          header: '개발자확인일자',
          width: 110,
          align: 'center',
          name: 'dvlpe_cnf_dt',
          editor: 'datePicker',

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
          header: '진행현황',
          width: 160,
          align: 'center',
          name: 'prg_txt',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: listItem
            }
          }
        },
        {
          header: '개발자명',
          width: 160,
          align: 'center',
          name: 'dvlpe_no',

        },
        {
          header: 'PL명',
          width: 160,
          align: 'center',
          name: 'pl_no',

        },
        {
          header: '담당자명',
          width: 160,
          align: 'center',
          name: 'crpe_nm',

        },
        {
          header: '전체',
          width: 80,
          align: 'right',
          name: 'err_tot_cnt',

        },
        {
          header: '완료',
          width: 80,
          align: 'right',
          name: 'err_cmpl_cnt',

        },
        {
          header: '진행',
          width: 80,
          align: 'right',
          name: 'err_ncmpl_cnt',

        },
        {
          header: '비고',
          width: 120,
          name: 'rmrk',
          ellipsis : true,
        },
        {
          header: '단위테스트결과서 첨부파일관리ID',
          width: 150,
          align: 'center',
          //hidden : true,
          name: 'atfl_mng_id',
        },
        {
          header: '설계서 첨부파일관리ID',
          width: 150,
          hidden : true,
          name: 'pal_atfl_mng_id',
        },
        {
          header: '개발자사번',
          width: 400,
          hidden : true,
          name: 'dvlpe_no',
        },
        {
          header: 'PL사번',
          width: 200,
          hidden : true,
          name: 'pl_no',
        },
        {
          header: '담당자사번',
          width: 140,
          hidden : true,
          name: 'crpe_no',

        },
        {
          header: '등록여부',
          width: 90,
          hidden : true,
          name: 'save_yn'
        },
        {
          header: '백업 ID',
          width: 90,
          name: 'bkup_id',
          hidden : true,
        },
        {
          header: '프로젝트 ID',
          width: 90,
          name: 'prjt_id',
          align: 'center',
          hidden : true,
        },
      ]
    }
  },
};

</script>
<style>
</style>
