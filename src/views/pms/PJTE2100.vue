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
                <li><a href="/PJTE1000">{{ menu_list[0].name }}</a></li>
                <li class="active"><a href="/PJTE2100">{{ menu_list[1].name }}</a></li>
                <li><a href="/PJTE2110">{{ menu_list[2].name }}</a></li>
                <li><a href="/PJTE2200">{{ menu_list[3].name }}</a></li>
                <li><a href="/PJTE2210">{{ menu_list[4].name }}</a></li>
                <li><a href="/PJTE3000">{{ menu_list[5].name }}</a></li>
                <li><a href="/PJTE4000">{{ menu_list[6].name }}</a></li>
                <li><a href="/PJTE5000">{{ menu_list[7].name }}</a></li>
                <li><a href="/PJTE6000">{{ menu_list[8].name }}</a></li>
                <li><a href="/PJTE7000">{{ menu_list[9].name }}</a></li>
                <li><a href="/PJTE9000">{{ menu_list[10].name }}</a></li>
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
            <combo
                   @bkup_id_change="bkup_id_change"
                   @prjt_nm_chage="prjt_nm_chage"
                   @bzcd_change="bzcd_change"
                   @dvlp_dis_cd_change="dvlp_dis_cd_change"
                   @pgm_dis_cd_change="pgm_dis_cd_change"
                   @prc_step_cd_change="prc_step_cd_change"
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
                       style   = "width: 180px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">개발자명
                <input type="text"
                       placeholder="입력"
                       v-model="info.dvlpe_nm"
                       style   = "width: 115px"
                >
                <button>
                 <img src="@/assets/img/ic_search.svg" alt="profile">
                </button>
                <input type="text"
                       placeholder="입력"
                       v-model="info.dvlpe_no"
                       style   = "width: 120px"
                       :disabled = true
                >
              </div>

            </li>
            <li class="filter-item">
              <div class="item-con">담당PL명
                <input type="text"
                       placeholder="입력"
                       v-model="info.pl_nm"
                       style   = "width: 115px"
                >
                <button>
                  <img src="@/assets/img/ic_search.svg" alt="profile">
                </button>
                <input type="text"
                       placeholder="입력"
                       v-model="info.pl_no"
                       style   = "width: 120px"
                       :disabled = true
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
          <div class="mt-1">
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
              <a href="#" @click="fnEtcSave">기타항목수정</a>
            </div>
            <div class="btn btn-filter-p" style = "margin-left: 20px">
              <a href="#" @click="fnSave">저장</a>
            </div>
            <div class="btn btn-filter-p">
              <a href="#" @click="fnSearch">조회</a>
            </div>
          </ul>
          </div>
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
import WindowPopup from "./PJTE3001.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css';
import { mapActions, mapState } from 'vuex'

// 커스텀 이미지 버튼을 만들기 위한 클래스 생성
class CustomRenderer {
  constructor(props) {
    const el = document.createElement('img');
    el.src = 'some-image-link';

    this.el = el;
    this.render(props);
  }
  getElement() {
    return this.el;
  }
  render(props) {
    // 결함등록 버튼 img
    this.el.src = '/img/ic_logOut.8c60a751.svg';
  }
}

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
    // 100, 200 권한에 따른 구분함수
    // 개발자 : 100, PL : 200
    this.setNo();
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
    // Combo.vue 에서 받아온 값
    bkup_id_change(params) {this.bkup_id_selected = params},
    prjt_nm_chage(params) {this.prjt_nm_selected = params},
    bzcd_change(params) {this.bzcd_selected = params},
    dvlp_dis_cd_change(params) {this.dvlp_dis_cd_selected = params},
    pgm_dis_cd_change(params) {this.pgm_dis_cd_selected = params},
    prc_step_cd_change(params) {this.prc_step_cd_selected = params},

    init() {
      // 그리드 초기화
      this.$refs.grid.invoke("clear");
      // 열고정
      this.$refs.grid.invoke("setFrozenColumnCount", 4);

      // 특정 열 비활성화
      this.$refs.grid.invoke("disableColumn", 'bz_dtls_txt');
      this.$refs.grid.invoke("disableColumn", 'pgm_id');

      // '100' 권한,개발잠명
      if(sessionStorage.getItem("LOGIN_AUT_CD") === '100'){
         this.info.dvlpe_nm = sessionStorage.getItem("LOGIN_EMP_NM")
         this.info.dvlpe_no = sessionStorage.getItem("LOGIN_EMP_NO")
      }
      // '200' 권한, pl명
      if(sessionStorage.getItem("LOGIN_AUT_CD") === '200'){
        this.info.pl_nm = sessionStorage.getItem("LOGIN_EMP_NM")
        this.info.pl_no = sessionStorage.getItem("LOGIN_EMP_NO")
      }
      // 정렬
      //this.$refs.grid.invoke("sort",);
    },
    change(){
      console.log("change");
    },
    // 저장 버튼
    fnSave(){
      // 변경 사항 유무 체크
      if(this.$refs.grid.invoke("isModified") === false){
        alert("변경된 내용이 없습니다.");
        return;
      }
      // 데이터 로그 확인
      console.log("updatedRows ::" ,this.$refs.grid.invoke("getModifiedRows").updatedRows);
      console.log("createdRows ::" ,this.$refs.grid.invoke("getModifiedRows").createdRows);
      console.log("deletedRows ::" ,this.$refs.grid.invoke("getModifiedRows").deletedRows);
      // 변경 데이터 저장
      this.updatedRows = this.$refs.grid.invoke("getModifiedRows").updatedRows;
      this.deletedRows = this.$refs.grid.invoke("getModifiedRows").deletedRows;
      this.createdRows = this.$refs.grid.invoke("getModifiedRows").createdRows;

      if(this.createdRows.length !== 0){
        if(this.vaildation(this.createdRows, "1") === true){
          try {
            // 데이터 파라메타 전달
            this.$refs.grid.invoke("setRequestParams", JSON.stringify());
            this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.createdRows));
            // create api 요청
            this.$refs.grid.invoke("request", "createData", {showConfirm: false});
            alert("저장이 완료되었습니다.")
          } catch (e){
            console.log(e);
          }
        }
      }
      if(this.updatedRows.length !== 0){
        if(this.vaildation(this.updatedRows, "1") === true) {
          try {
            // 데이터 파라메타 전달
            this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.updatedRows));
            // update api 요청
            this.$refs.grid.invoke("request", "updateData", {showConfirm: false});
            alert("저장이 완료되었습니다.")
          } catch (e) {
            console.log("업데이트 오류 ::", e);
          }
        }
      }
      if(this.deletedRows.length !== 0){
        try {
          // 데이터 파라메타 전달
          this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.deletedRows));
          // delete api 요청
          this.$refs.grid.invoke("request", "deleteData", {showConfirm: false});
          alert("저장이 완료되었습니다.")
        } catch (e){
          console.log(e);
        }
      }
      // 저장 후 변경 데이터 배열 비움
      this.$refs.grid.invoke("clearModifiedData")
    },
    // 기타 항목 저장
    fnEtcSave() {
      // 변경 사항 유무 체크
      if(this.$refs.grid.invoke("isModified") === false){
        alert("변경된 내용이 없습니다.");
        return;
      }
      // 변경 데이터 저장
      this.updatedRows = this.$refs.grid.invoke("getModifiedRows").updatedRows;
      debugger
      if(this.updatedRows.length !== 0){
        if(this.vaildation(this.updatedRows, "2") === true) {
          try {
            // 데이터 파라메타 전달
            this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.updatedRows));
            // update api 요청
            this.$refs.grid.invoke("request", "updateData", {showConfirm: false});
            alert("저장이 완료되었습니다.")
          } catch (e) {
            console.log("업데이트 오류 ::", e);
          }
        }
      }
      // 저장 후 변경 데이터 배열 비움
      this.$refs.grid.invoke("clearModifiedData")
    },
    // 클릭 이벤트
    onClick(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
      this.$refs.grid.invoke("getRow",this.curRow);
      console.log(this.$refs.grid.invoke("getRow", this.curRow));

      // grid 셀 클릭 시 윈도우 팝업 호출(함수화예정)
      if(ev.columnName === 'atfl_mng_id') {
        this.pop = window.open("../PJTE3001/", "open_page", "width=1000, height=800");
      }
      if(ev.columnName === 'pal_atfl_mng_id') {
        this.pop = window.open("../PJTE3001/", "open_page", "width=1000, height=800");
      }
    },
    //조회
    fnSearch(){
      if(this.searchVaildation() === false) {
        return;
      }
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    // 행추가
    gridAddRow(){
      this.$refs.grid.invoke("appendRow",
          {
            bzcd    : sessionStorage.getItem("LOGIN_BZCD"),
            save_yn : "N", //행르 추가하면 등록여부 'N'
            prjt_id : sessionStorage.getItem("LOGIN_PROJ_ID"),
            bkup_id : "0000000000",
          },
          {focus:true}) ;

      const addRow = this.$refs.grid.invoke("getModifiedRows").createdRows[0].rowKey;
      //this.$refs.grid.invoke("disableColumn", "pgm_nm");
      this.$refs.grid.invoke("startEditing", 52,'pgm_nm');

    },
    // 행삭제
    gridDelRow(){
        if(this.$refs.grid.invoke('getRow',this.curRow).save_yn === "Y"){
          alert("등록된 목록은 삭제불가함. PMS 관리자에게 요청하세요.");
          return;
      }
      this.$refs.grid.invoke("removeRow", this.curRow, {showConfirm:false});
    },
    // 엑셀 다운로드
    gridExcelExport(){
      this.$refs.grid.invoke("export", "xlsx", {fileName:"엑셀다운로드"});
    },
    // 엑셀파일 업로드(미완성)
    gridExcelImport(){
      this.$refs.grid.invoke("import", "xlsx", {fileName:"엑셀업로드"});
    },
    // 팝업 호출
    open_page(){
      this.pop = window.open("../PJTE3001/", "open_page", "width=1000, height=800");
    },
    // 직원명 삭제 시 직원번호 초기화
    setNo() {
      if(this.info.pl_nm === "") this.info.pl_no = "";
      if(this.info.dvlpe_nm === "") this.info.dvlpe_no = "";
    },
    // 조회 유효값 검사
    searchVaildation(){

      //if(this.bkup_id_selected === null) { alert("백업 ID는 필수 입력 사항입니다"); return false;}
      //if(this.prjt_nm_selected === null) { alert("프로그램 ID는 필수 입력 사항입니다"); return false;}
      return true;

    },
    // 유효값 검증
    vaildation(data, division) {
        /* 공통 */
        //if(sessionStorage.getItem("LOGIN_AUT_CD") === null)      { alert("권한 ID는 필수 입력 사항입니다");  return false;}

        for(let i=0; i<data.length; i++){
          // 저장과 기타항목수정 분류
          if(division === "1") {
            /* 권한 ID에 따른 처리단계 체크 */
            if (sessionStorage.getItem("LOGIN_AUT_CD") === "100") {        //권한 ID[100:개발자]
              if (data[i].prc_step_cd !== "000" && data[i].prc_step_cd !== "100" && data[i].prc_step_cd !== "200") {
                alert("권한이 부족합니다.")
                return false;
              }
            } else if (sessionStorage.getItem("LOGIN_AUT_CD") === "200") { //권한 ID[200:PL]
              if (data[i].prc_step_cd !== "300") {
                alert("권한이 부족합니다.")
                return false;
              }
            } else if (sessionStorage.getItem("LOGIN_AUT_CD") === "300") { //권한 ID[300:IT]
              if (data[i].prc_step_cd !== "400" && data[i].prc_step_cd !== "600") {
                alert("권한이 부족합니다.")
                return false;
              }
            } else if (sessionStorage.getItem("LOGIN_AUT_CD") === "400") { //권한 ID[400:현업]
              if (data[i].prc_step_cd !== "500" && data[i].prc_step_cd !== "600") {
                alert("권한이 부족합니다.")
                return false;
              }
            }
            //권한ID[500:PM,600:PMO] - 모두 가능
          }
          /* 출력 영역  */
          if(data[i].bzcd === null)         { alert("업무구분은 필수 입력 사항입니다");      return false;}
          if(data[i].pgm_id === null)       { alert("프로그램ID는 필수 입력 사항입니다");    return false;}
          if(data[i].pgm_nm === null)       {  alert("프로그램명은 필수 입력 사항입니다");   return false;}
          if(data[i].dvlp_dis_cd === null)  { alert("개발구분은 필수 입력 사항입니다");      return false;}
          if(data[i].pgm_dis_cd === null)   { alert("프로그램 구분은 필수 입력 사항입니다");  return false;}
          if(data[i].frcs_sta_dt === null)  { alert("예상시작일자는 필수 입력 사항입니다");   return false;}
          if(data[i].frcs_end_dt === null)  { alert("예상종료일자는 필수 입력 사항입니다");   return false;}
          if(data[i].prc_step_cd === null)  { alert("처리단계는 필수 입력 사항입니다");      return false;}
          if(data[i].dvlpe_no === null)     { alert("개발자 사번은 필수 입력 사항입니다");   return false;}
          if(data[i].pl_no === null)        { alert("PL 사번은 필수 입력 사항입니다");      return false;}
          if(data[i].crpe_no === null)      { alert("담당자 사번은 필수 입력 사항입니다");   return false;}
          if(data[i].bkup_id === null)      { alert("백업 ID는 필수 입력 사항입니다");      return false;}
          if(data[i].prjt_id === null)      { alert("프로젝트 ID는 필수 입력 사항입니다");   return false;}

          if(data[i].prc_step_cd >= "200"){
            if(data[i].atfl_mng_id === '' || data[i].atfl_mng_id === null)  { alert("단위테스트결과서 첨부파일관리ID는 필수 입력 사항입니다");   return false;}
          }
        }

        return  true;
    },
  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{
  },

// 변수 선언부분
  data() {
    return {
      info : {
        pgm_id      : this.pgm_id,          // 프로그램ID
        pgm_nm      : this.pgm_nm,          // 프로그램명
        dvlpe_no    : this.dvlpe_no,        // 개발자번호
        dvlpe_nm    : this.dvlpe_nm,        // 개발자명
        pl_no       : this.pl_no,           // 담당PL번호
        pl_nm       : this.pl_nm,           // 담당PL명
      },
      prjt_nm_selected      : null,
      bkup_id_selected      : null,
      bzcd_selected         : null,
      dvlp_dis_cd_selected  : null,
      pgm_dis_cd_selected   : null,
      prc_step_cd_selected  : null,

      sessionAraay : this.sessionAraay,
      updatedRows : this.updatedRows,
      deletedRows : this.deletedRows,
      createdRows : this.createdRows,

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
          id: 'PJTE1000',
          path: '/PJTE1000',
          name: 'ProjectEyes현황'
        },
        {
          id: 'PJTE2100',
          path: '/PJTE2100',
          name: '개발현황'
        },
        {
          id: 'PJTE2110',
          path: '/PJTE2110',
          name: '개발진척현황'
        },
        {
          id: 'PJTE2200',
          path: '/PJTE2200',
          name: '통합테스트'
        },
        {
          id: 'PJTE2210',
          path: '/PJTE2210',
          name: '통합테스트진척현황'
        },
        {
          id: 'PJTE3000',
          path: '/PJTE3000',
          name: '결함관리'
        },
        {
          id: 'PJTE4000',
          path: '/PJTE4000',
          name: 'ActionItem및이슈관리현황'
        },
        {
          id: 'PJTE5000',
          path: '/PJTE5000',
          name: 'WBS관리'
        },
        {
          id: 'PJTE6000',
          path: '/PJTE6000',
          name: 'PMS신청관리'
        },
        {
          id: 'PJTE7000',
          path: '/PJTE7000',
          name: '산출물정합성체크'
        },
        {
          id: 'PJTE9000',
          path: '/PJTE9000',
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
      open: true,
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
      rowHeaders:['rowNum'],
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
              listItems:
                    [
                      {"text":" ","value":"NNN"},
                      {"text":"관리","value":"EEE"},
                      {"text":"공통","value":"DDD"},
                      {"text":"신용조사","value":"AAA"},
                      {"text":"재무제표","value":"BBB"},
                      {"text":"신용평가","value":"CCC"}
                    ]
            }
          }
        },
        {
          header: '업무세부',
          width: 180,
          align: 'left',
          name: 'bz_dtls_txt',
          editor: 'text',
        },
        {
          header: '프로그램ID',
          width: 150,
          align: 'left',
          name: 'pgm_id',
          editor: 'text',
          ellipsis : true,
        },
        {
          header: '프로그램명',
          width: 200,
          align: 'left',
          name: 'pgm_nm',
          ellipsis : true,
          editor: 'text',
        },
        {
          header: '개발구분',
          width: 120,
          align: 'center',
          name: 'dvlp_dis_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems:
                  [
                    {"text":" ","value":"NNN"},
                    {"text":"신규","value":"100"},
                    {"text":"변경","value":"200"},
                    {"text":"이행","value":"300"},
                    {"text":"삭제","value":"900"}
                  ]
            }
          },

        },
        {
          header: '프로그램구분',
          width: 100,
          align: 'center',
          name: 'pgm_dis_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems:
                  [
                      {"text":" ","value":"NNN"},
                    {"text":"화면","value":"100"},
                    {"text":"프로그램","value":"200"},
                    {"text":"보고서","value":"300"},
                    {"text":"배치","value":"400"}
                  ]
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
          width: 120,
          align: 'center',
          name: 'prc_step_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems:
                  [
                    {"text":" ","value":"NNN"},
                    {"text":"개발전","value":"000"},
                    {"text":"개발시작","value":"100"},
                    {"text":"개발자완료","value":"200"},
                    {"text":"PL확인","value":"300"},
                    {"text":"담당자확인","value":"400"},
                    {"text":"현업확인","value":"500"},
                    {"text":"개발종료","value":"600"}
                  ]
            }
          }
        },
        // {
        //   header: '진행현황',
        //   width: 160,
        //   align: 'center',
        //   name: 'prg_txt',
        //   formatter: 'listItemText',
        //   editor: {
        //     type: 'select',
        //     options:{
        //       listItems: listItem
        //     }
        //   }
        // },
        {
          header: '개발자명',
          width: 160,
          align: 'center',
          name: 'dvlpe_nm',
          editor: 'text',
        },
        {
          header: 'PL명',
          width: 160,
          align: 'center',
          name: 'pl_nm',
          editor: 'text',
        },
        {
          header: '담당자명',
          width: 160,
          align: 'center',
          name: 'crpe_nm',
          editor: 'text',
        },
        {
          header: '전체',
          width: 80,
          align: 'right',
          name: 'err_tot_cnt',
          editor: 'text',
        },
        {
          header: '완료',
          width: 80,
          align: 'right',
          name: 'err_cmpl_cnt',
          editor: 'text',
        },
        {
          header: '진행',
          width: 80,
          align: 'right',
          name: 'err_ncmpl_cnt',
          editor: 'text',
        },
        {
          header: '요구사항 ID',
          width: 120,
          name: 'rqu_sbh_id',
          ellipsis : true,
          editor: 'text',
        },
        {
          header: '비고',
          width: 120,
          name: 'rmrk',
          editor: 'text',
          ellipsis : true,
        },
        {
          header: '단위테스트결과서\n첨부파일관리ID',
          width: 150,
          align: 'center',
          //hidden : true,
          name: 'atfl_mng_id',
          renderer: CustomRenderer,
          // hidden : true,
        },
        {
          header: '설계서 첨부파일관리ID',
          width: 150,
          align: 'center',
          name: 'pal_atfl_mng_id',
          renderer: CustomRenderer,
          // hidden : true,
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
