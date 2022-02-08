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
                :comboArray = "this.comboList"
                @bkup_id_change="bkup_id_change"
                @prjt_nm_chage="prjt_nm_chage"
                @bzcd_change="bzcd_change"
                @dvlp_dis_cd_change="dvlp_dis_cd_change"
                @pgm_dis_cd_change="pgm_dis_cd_change"
                @prc_step_cd_change="prc_step_cd_change"
            ></combo>
            <li class="filter-item">
              <div class="item-con">예상종료일자
                <div class="input-dateWrap"><input type="date" :max="info.frcs_end_dt" v-model="info.frcs_sta_dt"></div>
                ~
                <div class="input-dateWrap"><input type="date" :min="info.frcs_sta_dt" v-model="info.frcs_end_dt"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">프로그램ID
                <input type="text"
                       placeholder="입력"
                       v-model="info.pgm_id"
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
                       style   = "width: 180px"
                >
              </div>
            </li>
            <li class="filter-item-n">
              <div class="input-searchWrap">개발자명
                <input type="text"
                       placeholder="직원명"
                       v-model="info.dvlpe_nm"
                       style   = "width: 90px"
                       @keyup.enter="open_pjte9001(1)"
                >
                <button class="search-btn"
                        @click="open_pjte9001(1)"
                ></button>
              </div>
            </li>
            <li class="filter-item">
              <input type="text"
                     placeholder="직원번호"
                     id="id.dvlpe_no"
                     v-model="info.dvlpe_no"
                     style="width: 70px; background-color: #f2f2f2;"
                     :disabled = true
              >
            </li>
            <li class="filter-item-n">
              <div class="input-searchWrap">담당PL명
                <input type="text"
                       placeholder="직원명"
                       v-model="info.pl_nm"
                       style   = "width: 90px"
                       @keyup.enter="open_pjte9001(2)"
                >
                <button class="search-btn"
                        @click="open_pjte9001(2)"
                ></button>
              </div>
            </li>
            <li class="filter-item">
              <input type="text"
                     placeholder="직원번호"
                     id="id.pl_no"
                     v-model="info.pl_no"
                     style="width: 70px; background-color: #f2f2f2;"
                     :disabled = true
              >
            </li>
            <li class="filter-item">
              <div class="item-con">개발자완료일자
                <div class="input-dateWrap"><input type="date" :max="info.dvlpe_end_dt" v-model="info.dvlpe_sta_dt"></div>
                ~
                <div class="input-dateWrap"><input type="date" :min="info.dvlpe_sta_dt" v-model="info.dvlpe_end_dt"></div>
              </div>
            </li>
          </ul>
          <div class="mt-1">
            <ul class="filter-btn">
              <button class="btn btn-filter-d" @click="gridExcelExport">TC증빙 일괄다운로드ⓘ</button>
              <button class="btn btn-filter-d" @click="gridExcelExport">양식다운로드ⓘ</button>
              <button class="btn btn-filter-e" @click="gridExcelImport">엑셀업로드</button>
              <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
              <button class="btn btn-filter-b" @click="gridAddRow">행추가</button>
              <button class="btn btn-filter-b" @click="gridDelRow">행삭제</button>
              <button class="btn btn-filter-b" @click="fnEtcSave">기타항목수정</button>
              <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSave">저장</button>
              <button class="btn btn-filter-p" @click="fnSearch">조회</button>
            </ul>
          </div>
        </div>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <!-- Modal popup contents -->
        <Modal :show.sync="modals.txt_modal1">
          <h3 slot="header" class="modal-title" id="modal-title-default">내용상세보기</h3>
          <tr>
            <textarea id="modalId" cols="73" rows="15" style="margin-bottom: 10px" v-model="modalTxt"></textarea>
          </tr>
          <tr>
            <div style="float: right">
              <button class="btn btn-filter-p" id="fnEdit" style="margin-right: 5px" @click="fnEdit">수정</button>
              <button class="btn btn-filter-b" @click="fnCloseModal">닫기</button>
            </div>
          </tr>
        </Modal>
        <!-- grid contents -->
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
              :minRowHeight="minRowHeight"
              :rowHeaders="rowHeaders"
              @click="onClick"
              @dblclick="dblonClick"
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
import Modal from "@/components/Modal";
import WindowPopup from "./PJTE3001.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http";

// 첨부파일 팝업에서 받은 값
window.fileData = (fileLists, num) => {
  console.log(fileLists);
  window.pms_register.file_name_list = fileLists;
  window.pms_register.atfl_num = num;
  window.pms_register.atfl_mng_id_YN = fileLists[1].atfl_mng_id;
  window.pms_register.atfl_mng_id = fileLists[1].atfl_mng_id;
}
// 직원조회 팝업에서 받은 값
window.empData = (empnm ,empno, btn_id, emprow, empcol) => {
  window.pms_register.emp_nm = empnm;
  window.pms_register.emp_no = empno;
  window.pms_register.emp_btn_id = btn_id;
  window.pms_register.emp_rowKey = emprow;
  window.pms_register.emp_colName = empcol;
}

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
// 그리드 내  커스텀 이미지 버튼을 만들기 위한 클래스 생성
class SearchBtn {
  constructor(props) {
    const el = document.createElement('img');
    el.src = 'some-image-link';
    this.el = el;
    this.render(props);
  }
  getElement() {return this.el;}
  render(props) {
    // 결함등록 버튼 img
    this.el.src = '/img/ic_search.21e28c8b.svg';
  }
}

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    grid: Grid,
    WindowPopup,
    Modal
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
    window.pms_register = this;
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
  },

// 일반적인 함수를 선언하는 부분
  methods: {
    // Combo.vue 에서 받아온 값
    bkup_id_change(params) {this.info.bkup_id_selected = params},
    prjt_nm_chage(params) {this.info.prjt_nm_selected = params},
    bzcd_change(params) {this.info.bzcd_selected = params},
    dvlp_dis_cd_change(params) {this.info.dvlp_dis_cd_selected = params},
    pgm_dis_cd_change(params) {this.info.pgm_dis_cd_selected = params},
    prc_step_cd_change(params) {this.info.prc_step_cd_selected = params},

    init() {
      // 그리드 초기화
      this.$refs.grid.invoke("clear");
      // 열고정
      this.$refs.grid.invoke("setFrozenColumnCount", 4);

      // 특정 열 비활성화
      this.$refs.grid.invoke("disableColumn", 'pgm_id');
      this.$refs.grid.invoke("applyTheme", 'striped' ,{cell: {disabled: {text: '#000000'}}});

      // '100' 권한,개발자명
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
    // 저장 버튼
    fnSave(){
      // 변경 사항 유무 체크
      // if(this.$refs.grid.invoke("isModified") === false){
      //   alert("변경된 내용이 없습니다.");
      //   return;
      // }
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
            this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.createdRows));
            // create api 요청
            this.$refs.grid.invoke("request", "createData", {showConfirm: false});
            alert("저장이 완료되었습니다.")
          } catch (e){
            console.log(e);
          }
        } else {
          this.$refs.grid.invoke("reloadData");
        }
      }
      if(this.updatedRows.length !== 0){
        if(this.vaildation(this.updatedRows, "1") === true) {
          try {
            // 데이터 파라메타 전달

            this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.updatedRows));
            this.$refs.grid.invoke("setRequestParams", this.login);
            // update api 요청
            this.$refs.grid.invoke("request", "updateData", {showConfirm: false});
            alert("저장이 완료되었습니다.")
          } catch (e) {
            console.log("업데이트 오류 ::", e);
          }
        } else {
          this.$refs.grid.invoke("reloadData");
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
        } else {
          this.$refs.grid.invoke("reloadData");
        }
      }
      // 저장 후 변경 데이터 배열 비움
      this.$refs.grid.invoke("clearModifiedData")
    },
    // 클릭 이벤트
    onClick(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
      let gridData = this.$refs.grid.invoke("getRow",this.curRow);
      console.log(this.$refs.grid.invoke("getRow", this.curRow));

      // grid 셀 클릭 시 윈도우 팝업 호출(함수화예정)
      if(ev.columnName === 'atfl_mng_id') {
        let bkup_id='0000000000', prjt_id=gridData.prjt_id, atfl_mng_id=gridData.atfl_mng_id != null?gridData.atfl_mng_id:'', file_rgs_dscd='100', bzcd = gridData.bzcd, pgm_id=gridData.pgm_id
        this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&pgm_id=${pgm_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
      }
      if(ev.columnName === 'pal_atfl_mng_id') {
        let bkup_id='0000000000', prjt_id=gridData.prjt_id, atfl_mng_id=gridData.pal_atfl_mng_id != null?gridData.pal_atfl_mng_id:'', file_rgs_dscd='101', bzcd = gridData.bzcd, pgm_id=gridData.pgm_id
        this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&pal_atfl_mng_id=${pal_atfl_mng_id}&pgm_id=${pgm_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
      }

      // 결함등록 Column 클릭 시 결함등록팝업 호출
      if(ev.columnName === 'err_btn') {
        let cctn_id= this.$refs.grid.invoke("getValue", this.curRow, 'pgm_id');
        let cctn_nm= this.$refs.grid.invoke("getValue", this.curRow, 'pgm_nm');
        let bkup_id='0000000000', prjt_id=sessionStorage.getItem('LOGIN_PROJ_ID')
        this.pop = window.open(`../PJTE3001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&cctn_id=${cctn_id}&cctn_nm=${cctn_nm}&`, "open_page", "width=1000, height=800");
      }

      // 그리드 내 직원조회 버튼 클릭 시 직원조회팝업
      if(ev.columnName === 'dvlpe_btn' || ev.columnName === 'pl_btn' || ev.columnName === 'crpe_btn') {
        let empnm = ''
        if(ev.columnName === 'dvlpe_btn'){
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'dvlpe_nm')
        } else if(ev.columnName === 'pl_btn') {
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'pl_nm')
        } else if(ev.columnName === 'crpe_btn') {
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'crpe_nm')
        }

        if (empnm != null && empnm != '') {
          axiosService.get("/PJTE9001/select", {
            params: {
              empnm
            }
          })
              .then(res => {
                let res_data = res.data.data.contents;
                // console.log(res_data)
                if (res_data.length == 1) {  // 입력한 직원명으로 조회한 값이 단건일 경우 : 직원번호 바인딩
                  if (ev.columnName == 'dvlpe_btn') {
                    this.$refs.grid.invoke("setValue", this.curRow, 'dvlpe_no', res.data.data.contents[0].empno);
                  } else if (ev.columnName == 'pl_btn') {
                    this.$refs.grid.invoke("setValue", this.curRow, 'pl_no', res.data.data.contents[0].empno);
                  } else if (ev.columnName == 'crpe_btn') {
                    this.$refs.grid.invoke("setValue", this.curRow, 'crpe_no', res.data.data.contents[0].empno);
                  }
                } else { // 입력한 직원명으로 조회한 값이 여러건일 경우 : PJTE9001 팝업 호출 후 파라미터 값으로 조회
                  let bkup_id = '0000000000', prjt_id = sessionStorage.getItem('LOGIN_PROJ_ID'), emprow = ev.rowKey, empcol = ev.columnName
                  window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&emp_row=${emprow}&emp_col=${empcol}&`, "open_emp_page", "width=700, height=600");
                }
              })
        } else { // 직원명에 입력한 값이 없을 때 : PJTE9001 팝업 호출
          let bkup_id = '0000000000', prjt_id = sessionStorage.getItem('LOGIN_PROJ_ID'), emprow = ev.rowKey, empcol = ev.columnName
          window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&emp_row=${emprow}&emp_col=${empcol}&`, "open_emp_page", "width=700, height=600");
        }
      }

      const currentCellData = (this.$refs.grid.invoke("getFocusedCell"));
      if(ev.columnName == 'rmrk') {  // 컬럼명이 <비고>일 때만 팝업
        this.modals.txt_modal1 = true;
        this.modalTxt = currentCellData.value;
        const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      }
    },
    // 그리드 내용 더블클릭 시 상세보기 모달팝업
    dblonClick(ev) {
      this.curRow = ev.rowKey;
      debugger;
    },
    fnEdit(){   // 모달창에서 수정버튼 클릭 시 그리드Text 변경
      this.$refs.grid.invoke("setValue", this.curRow, "rmrk", document.getElementById("modalId").value);
      this.modals.txt_modal1 = false;
    },
    fnCloseModal(){  // 모달창 닫기
      this.modals.txt_modal1 = false;
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
      this.fnEnable();
    },
    // 추가한 행 편집 활성화
    fnEnable() {
      // 새로 ADD한 Row를 enable시킴
      this.NewRow = this.$refs.grid.invoke("getRowCount");
      this.$refs.grid.invoke("enableRow", this.NewRow-1, {withCheckbox: true});
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
      this.$refs.grid.invoke("export", "xlsx", {fileName:"엑셀다운로드"}, {useFormattedValue : true});
    },
    // 엑셀파일 업로드(미완성)
    gridExcelImport(){
      this.$refs.grid.invoke("import", "xlsx", {fileName:"엑셀업로드"});
    },
    open_pjte9001(btn_id) {
      let empnm = ''
      if (btn_id == '1') {
        empnm = this.info.dvlpe_nm
      } else if (btn_id == '2') {
        empnm = this.info.pl_nm
      }
      if (empnm != null && empnm != '') {
        axiosService.get("/PJTE9001/select", {
          params: {
            empnm
          }
        })
            .then(res => {
              let res_data = res.data.data.contents;
              // console.log(res_data)
              if (res_data.length == 1) {  // 입력한 직원명으로 조회한 값이 단건일 경우 : 직원번호 바인딩
                if (btn_id == '1') {
                  this.info.dvlpe_no = res.data.data.contents[0].empno
                } else if (btn_id == '2') {
                  this.info.pl_no = res.data.data.contents[0].empno
                }
              } else { // 입력한 직원명으로 조회한 값이 여러건일 경우 : PJTE9001 팝업 호출 후 파라미터 값으로 조회
                let bkup_id = '0000000000', prjt_id = sessionStorage.getItem('LOGIN_PROJ_ID')
                window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
              }
            })
      } else { // 직원명에 입력한 값이 없을 때 : PJTE9001 팝업 호출
        let bkup_id = '0000000000', prjt_id = sessionStorage.getItem('LOGIN_PROJ_ID')
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      }
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
    // vaildation('검증 랗 데이터', '일반저장(1) | 기타저장(2) 구분')
    vaildation(data, division) {
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
          if(data[i].atfl_mng_id === 'N')  { alert("단위테스트결과서 첨부파일관리ID는 필수 입력 사항입니다");   return false;}
        }
      }
      return  true;
    },
  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{
    deep : true,
    /* 직원조회 팝업에서 받아온 값으로 emp_btn_id값이 바뀔 때
   버튼 id에 따라 직원명, 직원번호 값을 넣는다*/
    emp_btn_id() {  // 필터에 있는 직원조회 팝업 (btn_id로 구분)
      if(this.emp_btn_id == '1'){       // 개발자명
        this.info.dvlpe_no = this.emp_no
        this.info.dvlpe_nm = this.emp_nm
      }else if(this.emp_btn_id == '2'){ // 담당PL
        this.info.pl_no = this.emp_no
        this.info.pl_nm = this.emp_nm
      }
    },
    /*watch에서 emp_rowKey가 변경되거나 emp_colName의 값이 변경되었을 때
     버튼에 따라 직원명과 직원번호를 입력한다.*/
    emp_rowKey() {  // 그리드에 있는 직원조회 팝업 (emp_colName과 emp_rowKey로 구분)
      if(this.emp_colName == 'dvlpe_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'dvlpe_no', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'dvlpe_nm', this.emp_nm);
      } else if(this.emp_colName == 'pl_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'pl_no', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'pl_nm', this.emp_nm);
      } else if(this.emp_colName == 'crpe_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'crpe_no', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'crpe_nm', this.emp_nm);
      }
    },
    emp_colName() {  // 그리드에 있는 직원조회 팝업 (emp_colName과 emp_rowKey로 구분)
      if(this.emp_colName == 'dvlpe_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'dvlpe_no', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'dvlpe_nm', this.emp_nm);
      } else if(this.emp_colName == 'pl_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'pl_no', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'pl_nm', this.emp_nm);
      } else if(this.emp_colName == 'crpe_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'crpe_no', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'crpe_nm', this.emp_nm);
      }
    },
    atfl_mng_id(){    // 단위테스트 케이스 변경 시 작동
      if(this.atfl_mng_id_YN !== '') {
        this.$refs.grid.invoke("setValue", this.curRow, 'atfl_mng_id', this.atfl_mng_id_YN);
      }
    },
    pal_atfl_mng_id(){
      if(this.pal_atfl_mng_id !== '') {
        this.$refs.grid.invoke("setValue", this.curRow, 'pal_atfl_mng_id', 'Y');
      }
    }

  },

// 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C27","C0","C1","C2","C3","C4"],

      /*직원조회 팝업 변수*/
      emp_btn_id          : '',  // 직원조회팝업 버튼ID
      emp_nm              : '',  // 직원조회팝업 직원명
      emp_no              : '',  // 직원조회팝업 직원번호

      emp_rowKey          : '',  // 직원조회팝업 (그리드) rowKey
      emp_colName         : '',  // 직원조회팝업 (그리드) colName
      atfl_mng_id         : '',  // 단위테스트 케이스 첨부파일관리
      pal_atfl_mng_id     : '',  // 설계서 첨부파일관리

      info : {
        pgm_id                : this.pgm_id,          // 프로그램ID
        pgm_nm                : this.pgm_nm,          // 프로그램명
        dvlpe_no              : this.dvlpe_no,        // 개발자번호
        dvlpe_nm              : this.dvlpe_nm,        // 개발자명
        pl_nm                 : this.pl_nm,           // 담당PL명
        pl_no                 : this.pl_no,           // 담당PL번호
        frcs_sta_dt           : this.frcs_sta_dt,     // 계획일자STA
        frcs_end_dt           : this.frcs_end_dt,     // 계획일자END
        dvlpe_sta_dt          : this.dvlpe_sta_dt,    // 실제일자STA
        dvlpe_end_dt          : this.dvlpe_end_dt,    // 실제일자END
        atfl_mng_id           : this.atfl_mng_id,
        pal_atfl_mng_id       : this.pal_atfl_mng_id,

        prjt_nm_selected      : sessionStorage.getItem("LOGIN_PROJ_ID"),
        bkup_id_selected      : '0000000000',
        bzcd_selected         : sessionStorage.getItem("LOGIN_BZCD"),
        dvlp_dis_cd_selected  : 'TTT',
        pgm_dis_cd_selected   : 'TTT',
        prc_step_cd_selected  : 'TTT',
      },
      login : {
        login_aut_cd          : sessionStorage.getItem("LOGIN_AUT_CD"),
        login_bzcd            : sessionStorage.getItem("LOGIN_BZCD"),
        login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO"),
        login_proj_id         : sessionStorage.getItem("LOGIN_PROJ_ID"),
      },

      updatedRows : this.updatedRows,
      deletedRows : this.deletedRows,
      createdRows : this.createdRows,
      rowData : this.$store.state["pms"].CD0000000000N,
      addRow : {
        grid : this.grid,
      },

      // 메뉴 리스트 (추후 공통 작업 필요)
      menu_list: [
        { id: 'PJTE1000', path: '/PJTE1000', name: 'ProjectEyes현황' },
        { id: 'PJTE2100', path: '/PJTE2100', name: '개발현황' },
        { id: 'PJTE2110', path: '/PJTE2110', name: '개발진척현황' },
        { id: 'PJTE2200', path: '/PJTE2200', name: '통합테스트' },
        { id: 'PJTE2210', path: '/PJTE2210', name: '통합테스트진척현황' },
        { id: 'PJTE3000', path: '/PJTE3000', name: '결함관리' },
        { id: 'PJTE4000', path: '/PJTE4000', name: 'ActionItem및이슈관리현황' },
        { id: 'PJTE5000', path: '/PJTE5000', name: 'WBS관리' },
        { id: 'PJTE6000', path: '/PJTE6000', name: 'PMS신청관리' },
        { id: 'PJTE7000', path: '/PJTE7000', name: '산출물정합성체크' },
        { id: 'PJTE9000', path: '/PJTE9000', name: '시스템관리' },
      ],
      /* 그리드 상세보기 모달 속성 */
      modals: {
        txt_modal1: false,
      },
      modalTxt:this.modalTxt,

      /* grid 속성 */
      count:0,
      curRow:-1,
      title:"",
      scrollX:false,
      scrollY:false,
      bodyHeight: 610,
      minRowHeight: 10,
      rowHeight: 25,
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
        height: 45,
        complexColumns: [
          {header: '계획',             name: 'mergeColumn1', childNames: ['frcs_sta_dt', 'frcs_end_dt']},
          {header: '실적',             name: 'mergeColumn2', childNames: ['sta_dt', 'end_dt']},
          {header: '결함',             name: 'mergeColumn3', childNames: ['err_tot_cnt', 'err_cmpl_cnt', 'err_ncmpl_cnt']},
          {header: '개발자',           name: 'mergeColumn4', childNames: ['dvlpe_nm', 'dvlpe_btn','dvlpe_no'], hideChildHeaders : true},
          {header: 'PL',              name: 'mergeColumn5', childNames: ['pl_nm', 'pl_btn','pl_no'], hideChildHeaders : true},
          {header: '담당현업',         name: 'mergeColumn6', childNames: ['crpe_nm', 'crpe_btn','crpe_no'], hideChildHeaders : true},
          {header: '단위테스트케이스',   name: 'mergeColumn7', childNames: ['atfl_mng_id']},
          {header: '설계서',           name: 'mergeColumn8', childNames: ['pal_atfl_mng_id']},
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
          type:'text',
          rowSpan: true,
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
        {
          header: '개발자',
          width: 80,
          align: 'center',
          name: 'dvlpe_nm',
          editor: 'text',
        },
        {
          header: '개발자',
          width: 50,
          align: 'center',
          name: 'dvlpe_btn',
          renderer: SearchBtn,
        },
        {
          header: '개발자',
          width: 80,
          align: 'center',
          name: 'dvlpe_no',
          editor: 'text',
        },
        {
          header: 'PL명',
          width: 80,
          align: 'center',
          name: 'pl_nm',
          editor: 'text',
        },
        {
          header: 'PL명',
          width: 50,
          align: 'center',
          name: 'pl_btn',
          renderer: SearchBtn,
        },
        {
          header: 'PL번호',
          width: 80,
          align: 'center',
          name: 'pl_no',
        },
        {
          header: '담당자명',
          width: 80,
          align: 'center',
          name: 'crpe_nm',
          editor: 'text',
        },
        {
          header: '담당자명',
          width: 50,
          align: 'center',
          name: 'crpe_btn',
          renderer: SearchBtn,
        },
        {
          header: '담당자번호',
          width: 80,
          align: 'center',
          name: 'crpe_no',
        },
        {
          header: '첨부파일관리ID',
          width: 130,
          align: 'center',
          name: 'atfl_mng_id',
          type : 'text',
          defaultValue: 'N',
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
          header: '등록',
          width: 80,
          align: 'center',
          name: 'err_btn',
          renderer: CustomRenderer,
        },
        {
          header: '요구사항 ID',
          width: 120,
          align: 'center',
          name: 'rqu_sbh_id',
          ellipsis : true,
          editor: 'text',
        },
        {
          header: '첨부파일관리ID',
          width: 150,
          align: 'center',
          name: 'pal_atfl_mng_id',
          // hidden : true,
          defaultValue: 'N',
        },
        {
          header: '비고',
          width: 220,
          align: 'left',
          name: 'rmrk',
          editor: 'text',
          ellipsis : true,
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
