<template>
  <!-- CONTENTS -->
  <div class="contents">
    <input type="hidden" name="updatedRows" v-model="updatedRows" id="updatedRows">
    <input type="hidden" name="deletedRows" v-model="deletedRows" id="deletedRows">
    <input type="hidden" name="createdRows" v-model="createdRows" id="createdRows">
    <div class="div-img"></div>

    <!-- 컨텐츠 영역 -->
    <div class="kanban-contents-body">
      <!-- 필터영역 -->
      <section class="filter">
        <ul class="filter-con clear-fix">
          <combo
              :comboArray = "this.comboList"
              @bkup_id_change="bkup_id_change"
              @prjt_nm_chage="prjt_nm_chage"
          ></combo>
        </ul>

        <ul class="filter-btn">
          <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
          <button class="btn btn-filter-b" @click="gridAddRow">행추가</button>
          <button class="btn btn-filter-b" @click="gridDelRow">행삭제</button>
          <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSave">저장</button>
          <button class="btn btn-filter-p" @click="fnSearch">조회</button>
        </ul>
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
              :editingEvent="editingEvent"
              :rowHeight="rowHeight"
              :minRowHeight="minRowHeight"
              :rowHeaders="rowHeaders"
              @click="onClick"
              @dblclick="dbClick"
              @onGridUpdated="onGridUpdated"
              @beforeExport="beforeExport"
              @editingFinish="editingFinish"
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
import XLSX from "xlsx";
import PmsSideBar from  "@/components/PmsSideBar";
import WindowPopup from "./PJTE3001.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http";


// 첨부파일 팝업에서 받은 값
window.fileData = (fileLists, num) => {
  console.log(fileLists);
  window.pms_register.file_name_list = fileLists;
  window.pms_register.atfl_num = num;
  window.pms_register.atfl_mng_id_yn = fileLists[1].atfl_mng_id;
  window.pms_register.atfl_mng_id = fileLists[1].atfl_mng_id;
  window.pms_register.pal_atfl_mng_id_yn = fileLists[1].atfl_mng_id;
  window.pms_register.pal_atfl_mng_id = fileLists[1].atfl_mng_id;
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
    this.el.src = '/img/ic_new.e2fc07f4.svg';
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
    // 직원조회 버튼 img
    this.el.src = '/img/ic_search.21e28c8b.svg';
  }
}

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    grid: Grid,
    WindowPopup,
    Modal,
    PmsSideBar
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
      this.$refs.grid.invoke("setFrozenColumnCount", 4);

      if(sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600'){
        // 특정 열 비활성화
        this.$refs.grid.invoke("disableColumn", 'frcs_sta_dt');
        this.$refs.grid.invoke("disableColumn", 'frcs_end_dt');
      }

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
      if(this.excelUplod === 'Y') {
        this.gridData = this.$refs.grid.invoke("getData");
        axiosService.post("/PJTE2100/create", {
          excelUplod : this.excelUplod,
          gridData: this.gridData,
          prjt_id  : sessionStorage.getItem("LOGIN_PROJ_ID"),
          login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO")
        }).then(res => {
          console.log(res);
          if (res.data) {
            alert("저장이 완료되었습니다.");
          }
        })
      } else if(this.excelUplod === 'N') {

        // 변경 사항 유무 체크
        if (this.$refs.grid.invoke("isModified") === false) {
          alert("변경된 내용이 없습니다.");
          return;
        }
        // 데이터 로그 확인
        console.log("updatedRows ::", this.$refs.grid.invoke("getModifiedRows").updatedRows);
        console.log("createdRows ::", this.$refs.grid.invoke("getModifiedRows").createdRows);
        console.log("deletedRows ::", this.$refs.grid.invoke("getModifiedRows").deletedRows);

        // 변경 데이터 저장
        this.updatedRows = this.$refs.grid.invoke("getModifiedRows").updatedRows;
        this.deletedRows = this.$refs.grid.invoke("getModifiedRows").deletedRows;
        this.createdRows = this.$refs.grid.invoke("getModifiedRows").createdRows;

        if (this.createdRows.length !== 0) {
          if (this.vaildation(this.createdRows, "1") === true) {
            if(sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600'){
              for(let i=0; i<this.createdRows.length; i++){
                if(this.createdRows[i].dvlp_dis_cd === "900"){
                  alert("개발구분 삭제 권한이 없습니다.");
                  return;
                }
              }
            }
            try {
              // 데이터 파라메타 전달
              this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.createdRows));
              // create api 요청
              this.$refs.grid.invoke("request", "createData", {showConfirm: false});
              alert("저장이 완료되었습니다.")
            } catch (e) {
              console.log(e);
            }
          } else {
            this.$refs.grid.invoke("reloadData");
          }
        }
        if (this.updatedRows.length !== 0) {
          if (this.vaildation(this.updatedRows, "1") === true) {
            try {
              if(sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600'){
                for(let i=0; i<this.updatedRows.length; i++){
                  if(this.updatedRows[i].dvlp_dis_cd === "900"){
                    alert("삭제 권한이 없습니다.");
                    return;
                  }
                }
              }
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
        if (this.deletedRows.length !== 0) {
          try {
            // 데이터 파라메타 전달
            this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.deletedRows));
            // delete api 요청
            this.$refs.grid.invoke("request", "deleteData", {showConfirm: false});
            alert("저장이 완료되었습니다.")
          } catch (e) {
            console.log(e);
          }
        }
      }
      // 저장 후 변경 데이터 배열 비움
      this.$refs.grid.invoke("clearModifiedData")
      this.excelUplod = 'N'
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
    onGridUpdated(grid){

    },
    beforeExport(grid){
      console.log("beforeExport::" , grid)
    },

    /* 그리드 직원명 입력 후
   edit이 끝날 시 입력한 직원명이
   단건일 때, 직원번호에 바인딩 */
    editingFinish(ev) {
      if(ev.columnName === 'dvlpe_nm' || ev.columnName === 'pl_nm' || ev.columnName === 'crpe_nm') {
        let empnm = ''
        let prjt_id_selected = this.info.prjt_nm_selected
        let bkup_id_selected = this.info.bkup_id_selected
        if(ev.columnName === 'dvlpe_nm'){
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'dvlpe_nm')
        } else if(ev.columnName === 'pl_nm') {
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'pl_nm')
        } else if(ev.columnName === 'crpe_nm') {
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'crpe_nm')
        }

        if (empnm != null && empnm != '') {
          axiosService.get("/PJTE9001/select", {
            params: {
              empnm,
              prjt_id_selected,
              bkup_id_selected
            }
          })
              .then(res => {
                let res_data = res.data.data.contents;
                // console.log(res_data)
                if (res_data.length == 1) {  // 입력한 직원명으로 조회한 값이 단건일 경우 : 직원번호 바인딩
                  if (ev.columnName == 'dvlpe_nm') {
                    this.$refs.grid.invoke("setValue", this.curRow, 'dvlpe_no', res.data.data.contents[0].empno);
                    this.$refs.grid.invoke("setValue", this.curRow, 'dvlpe_nm', res.data.data.contents[0].empnm);
                  } else if (ev.columnName == 'pl_nm') {
                    this.$refs.grid.invoke("setValue", this.curRow, 'pl_no', res.data.data.contents[0].empno);
                    this.$refs.grid.invoke("setValue", this.curRow, 'pl_nm', res.data.data.contents[0].empnm);
                  } else if (ev.columnName == 'crpe_nm') {
                    this.$refs.grid.invoke("setValue", this.curRow, 'crpe_no', res.data.data.contents[0].empno);
                    this.$refs.grid.invoke("setValue", this.curRow, 'crpe_nm', res.data.data.contents[0].empnm);
                  }
                } else { // 입력한 직원명으로 조회한 값이 여러건일 경우 : PJTE9001 팝업 호출 후 파라미터 값으로 조회
                  let bkup_id = this.info.bkup_id_selected, prjt_id = this.info.prjt_nm_selected, emprow = ev.rowKey, empcol = ev.columnName
                  window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&emp_row=${emprow}&emp_col=${empcol}&`, "open_emp_page", "width=700, height=600");
                }
              })
        }
      }
    },

    // 클릭 이벤트
    onClick(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
      let gridData = this.$refs.grid.invoke("getRow",this.curRow);
      console.log(this.$refs.grid.invoke("getRow", this.curRow));

      // next 버튼 클릭 시
      if(ev.columnName === 'next_btn1') {
        debugger
        if(this.$refs.grid.invoke("getValue", this.curRow, 'pgm_nm') == '' || this.$refs.grid.invoke("getValue", this.curRow, 'pgm_nm') == null){
          alert('작업목록(TO-DO)항목이 없습니다.')
        } else {
          this.current_task = this.$refs.grid.invoke("getValue", this.curRow, 'pgm_nm');
          this.$refs.grid.invoke("setValue", ev.rowKey, 'in_progress_nm', this.current_task);
          this.$refs.grid.invoke("setValue", ev.rowKey, 'pgm_nm', '');
        }

      }

      // grid 셀 클릭 시 윈도우 팝업 호출(함수화예정)
      if(ev.columnName === 'atfl_mng_id_yn' && this.addCheak === 'N') {
        this.count = 1
        let bkup_id='0000000000', prjt_id=gridData.prjt_id, atfl_mng_id=gridData.atfl_mng_id != null?gridData.atfl_mng_id:'', file_rgs_dscd='100', bzcd = gridData.bzcd, pgm_id=gridData.pgm_id
        this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&bzcd=${bzcd}&pgm_id=${pgm_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
      }
      if(ev.columnName === 'pal_atfl_mng_id_yn' && this.addCheak === 'N') {
        this.count = 2
        let bkup_id='0000000000', prjt_id=gridData.prjt_id, pal_atfl_mng_id=gridData.pal_atfl_mng_id != null?gridData.pal_atfl_mng_id:'', file_rgs_dscd='101', bzcd = gridData.bzcd, pgm_id=gridData.pgm_id
        this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${pal_atfl_mng_id}&bzcd=${bzcd}&pgm_id=${pgm_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
      }

      // 결함등록 Column 클릭 시 결함등록팝업 호출
      if(ev.columnName === 'err_btn' && this.addCheak === 'N') {
        let cctn_id= this.$refs.grid.invoke("getValue", this.curRow, 'pgm_id');
        let cctn_nm= this.$refs.grid.invoke("getValue", this.curRow, 'pgm_nm');
        let cctn_bzcd= this.$refs.grid.invoke("getValue", this.curRow, 'bzcd');
        let rgs_dscd= '1100'
        let bkup_id='0000000000', prjt_id=sessionStorage.getItem('LOGIN_PROJ_ID')
        this.pop = window.open(`../PJTE3001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&cctn_id=${cctn_id}&cctn_nm=${cctn_nm}&cctn_bzcd=${cctn_bzcd}&rgs_dscd=${rgs_dscd}&`, "open_page", "width=1000, height=800");
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
        if((empnm === '' || empnm == null || empnm === undefined)) {
          let bkup_id = this.info.bkup_id_selected, prjt_id = this.info.prjt_nm_selected, emprow = ev.rowKey, empcol = ev.columnName
          window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&emp_row=${emprow}&emp_col=${empcol}&`, "open_emp_page", "width=700, height=600");
        } else {
          let bkup_id = this.info.bkup_id_selected, prjt_id = this.info.prjt_nm_selected, emprow = ev.rowKey, empcol = ev.columnName
          window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&emp_row=${emprow}&emp_col=${empcol}&`, "open_emp_page", "width=700, height=600");
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
    dbClick(ev) {
      this.curRow = ev.rowKey;
    },
    // 양식다운로드
    formDownload(){
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem("LOGIN_PROJ_ID"), bzcd=sessionStorage.getItem("LOGIN_BZCD"), atfl_mng_id = "0000000000", file_rgs_dscd = '902' //atfl_mng_id 값은 양식 파일 첨부 ID 추후에 추가
      this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&bzcd=${bzcd}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}}`, "open_file_page", "width=1000, height=500");
    },
    // TC증빙 일괄다운로드
    batchDownload(){
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem("LOGIN_PROJ_ID"), bzcd=sessionStorage.getItem("LOGIN_BZCD"), file_rgs_dscd = '100' //atfl_mng_id 값은 양식 파일 첨부 ID 추후에 추가
      this.pop = window.open(`../PJTE9003/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&bzcd=${bzcd}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=700");
    },
    // 모달창에서 수정버튼 클릭 시 그리드Text 변경
    fnEdit(){
      this.$refs.grid.invoke("setValue", this.curRow, "rmrk", document.getElementById("modalId").value);
      this.modals.txt_modal1 = false;
    },
    // 모달창 닫기
    fnCloseModal(){
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
      this.addCheak = 'Y';
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
      this.$refs.grid.invoke("enableRow", this.NewRow-1);
      this.$refs.grid.invoke("enableCell", this.NewRow-1, "pgm_id");
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "pal_atfl_mng_id_yn");
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "atfl_mng_id_yn");
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "err_btn");
    },
    // 행삭제
    gridDelRow(){
      if(this.$refs.grid.invoke('getRow',this.curRow).save_yn === "Y"){
        alert("등록된 목록은 삭제불가함. PMS 관리자에게 요청하세요.");
        return;
      }
      this.addCheak = 'N'
      this.$refs.grid.invoke("removeRow", this.curRow, {showConfirm:false});
    },
    // 엑셀 다운로드
    gridExcelExport(){
      this.$refs.grid.invoke("export", "xlsx",{fileName: "엑셀다운로드", useFormattedValue : true, onlySelected:true});
    },
    // 엑셀파일 업로드
    gridExcelImport(event){
      // 엑셀파일 업로드 로직 추가
      console.log(event.target.files[0])
      this.file = event.target.files ? event.target.files[0] : null;
      let input = event.target;
      let reader = new FileReader();
      reader.onload = () => {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, {type: 'binary'});
        let gridExcelData;

        wb.SheetNames.forEach((sheetName, idx) => {
          if (sheetName === '개발현황') {
            console.log(wb.Sheets[sheetName])
            wb.Sheets[sheetName].A1.w = "NO"
            wb.Sheets[sheetName].B1.w = "bzcd"
            wb.Sheets[sheetName].C1.w = "pgm_id"
            wb.Sheets[sheetName].D1.w = "pgm_nm"
            wb.Sheets[sheetName].E1.w = "bz_dtls_txt"
            wb.Sheets[sheetName].F1.w = "dvlp_dis_cd"
            wb.Sheets[sheetName].G1.w = "pgm_dis_cd"
            wb.Sheets[sheetName].H2.w = "frcs_sta_dt"
            wb.Sheets[sheetName].I2.w = "frcs_end_dt"
            wb.Sheets[sheetName].J2.w = "sta_dt"
            wb.Sheets[sheetName].K2.w = "end_dt"
            wb.Sheets[sheetName].L1.w = "dvlpe_cnf_dt"
            wb.Sheets[sheetName].M1.w = "pl_cnf_dt"
            wb.Sheets[sheetName].N1.w = "prc_step_cd"
            wb.Sheets[sheetName].O1.w = "prg_txt"
            wb.Sheets[sheetName].P2.w = "dvlpe_nm"
            wb.Sheets[sheetName].Q2.w = "dvlpe_btn"
            wb.Sheets[sheetName].R2.w = "dvlpe_no"
            wb.Sheets[sheetName].S2.w = "pl_nm"
            wb.Sheets[sheetName].T2.w = "pl_btn"
            wb.Sheets[sheetName].U2.w = "pl_no"
            wb.Sheets[sheetName].V2.w = "crpe_nm"
            wb.Sheets[sheetName].W2.w = "crpe_btn"
            wb.Sheets[sheetName].X2.w = "crpe_no"
            wb.Sheets[sheetName].Y1.w = "atfl_mng_id_yn"
            wb.Sheets[sheetName].Z2.w = "err_tot_cnt"
            wb.Sheets[sheetName].AA2.w = "err_cmpl_cnt"
            wb.Sheets[sheetName].AB2.w = "err_ncmpl_cnt"
            wb.Sheets[sheetName].AC2.w = "err_btn"
            wb.Sheets[sheetName].AD1.w = "rqu_sbh_id"
            wb.Sheets[sheetName].AE1.w = "pal_atfl_mng_id_yn"
            wb.Sheets[sheetName].AF1.w = "rmrk"

            let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            let rowObj_copy = [];
            for(let n=1; n<rowObj.length; n++){
              rowObj_copy[n-1] = rowObj[n];
            }
            gridExcelData = JSON.parse(JSON.stringify(rowObj_copy));
            console.log("gridExcelData ::", gridExcelData)
          }
        })
        this.excelUplod = 'Y'
        alert('업로드 파일이 적용되었습니다.')
        this.$refs.grid.invoke('resetData', gridExcelData)
      };
      reader.readAsBinaryString(input.files[0]);
      event.target.value = '';
    },
    //직원조회 버튼 클릭 시
    open_pjte9001_btn(btn_id) {
      let empnm = ''
      if (btn_id == '1') {
        empnm = this.info.dvlpe_nm
      } else if (btn_id == '2') {
        empnm = this.info.pl_nm
      }
      if((empnm === '' || empnm == null || empnm === undefined)) {
        let bkup_id = this.info.bkup_id_selected, prjt_id =  this.info.prjt_nm_selected
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      } else {
        let bkup_id = this.info.bkup_id_selected, prjt_id =  this.info.prjt_nm_selected
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      }
    },
    //엔터키를 눌러 직원 조회
    open_pjte9001(btn_id) {
      let empnm = ''
      let prjt_id_selected = this.info.prjt_nm_selected
      let bkup_id_selected = this.info.bkup_id_selected
      if (btn_id == '1') {
        empnm = this.info.dvlpe_nm
      } else if (btn_id == '2') {
        empnm = this.info.pl_nm
      }
      if (empnm != null && empnm != '') {
        axiosService.get("/PJTE9001/select", {
          params: {
            empnm,
            prjt_id_selected,
            bkup_id_selected

          }
        })
            .then(res => {
              let res_data = res.data.data.contents;
              // console.log(res_data)
              if (res_data.length == 1) {  // 입력한 직원명으로 조회한 값이 단건일 경우 : 직원번호 바인딩
                if (btn_id == '1') {
                  this.info.dvlpe_no = res.data.data.contents[0].empno
                  this.info.dvlpe_nm = res.data.data.contents[0].empnm
                } else if (btn_id == '2') {
                  this.info.pl_no = res.data.data.contents[0].empno
                  this.info.pl_nm = res.data.data.contents[0].empnm
                }
              } else { // 입력한 직원명으로 조회한 값이 여러건일 경우 : PJTE9001 팝업 호출 후 파라미터 값으로 조회
                let bkup_id = this.info.bkup_id_selected, prjt_id = this.info.prjt_nm_selected
                window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
              }
            })
      } else { // 직원명에 입력한 값이 없을 때 : PJTE9001 팝업 호출
        let bkup_id = this.info.bkup_id_selected, prjt_id = this.info.prjt_nm_selected
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

          if(data[i].atfl_mng_id === null)  { alert("단위테스트결과서 첨부파일관리ID는 필수 입력 사항입니다");   return false;}
          if(data[i].pal_atfl_mng_id === null)  { alert("설계서 첨부파일관리ID는 필수 입력 사항입니다");   return false;}
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



      }
      return  true;
    },
  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{
    deep : true,
    /*watch에서 emp_nm의 값이 변경되었을 때
      버튼에 따라 직원명과 직원번호를 입력한다.*/
    emp_nm() {  // 그리드에 있는 직원조회 팝업 (emp_nm 으로 구분)
      if(this.emp_colName == 'dvlpe_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'dvlpe_no', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'dvlpe_nm', this.emp_nm);
      } else if(this.emp_colName == 'pl_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'pl_no', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'pl_nm', this.emp_nm);
      } else if(this.emp_colName == 'crpe_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'crpe_no', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'crpe_nm', this.emp_nm);
      } else if(this.emp_colName == 'dvlpe_nm') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'dvlpe_no', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'dvlpe_nm', this.emp_nm);
      } else if(this.emp_colName == 'pl_nm') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'pl_no', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'pl_nm', this.emp_nm);
      } else if(this.emp_colName == 'crpe_nm') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'crpe_no', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'crpe_nm', this.emp_nm);
      }
      // emp_btn_id 변경 시 발생
      if(this.emp_btn_id == '1'){       // 개발자명
        this.info.dvlpe_no = this.emp_no
        this.info.dvlpe_nm = this.emp_nm
      }else if(this.emp_btn_id == '2'){ // 담당PL
        this.info.pl_no = this.emp_no
        this.info.pl_nm = this.emp_nm
      }
    },
    atfl_mng_id(){    // 단위테스트 케이스 변경 시 작동
      if(this.count == 1) {
        if (this.atfl_mng_id_yn !== '') {
          this.$refs.grid.invoke("setValue", this.curRow, 'atfl_mng_id_yn', '첨부');
          this.$refs.grid.invoke("setValue", this.curRow, 'atfl_mng_id', this.atfl_mng_id);
        }
      }
      if(this.count == 2) {
        if(this.pal_atfl_mng_id_yn !== '') {
          this.$refs.grid.invoke("setValue", this.curRow, 'pal_atfl_mng_id_yn', '첨부');
          this.$refs.grid.invoke("setValue", this.curRow, 'pal_atfl_mng_id', this.pal_atfl_mng_id);
        }
      }
    },

  },

// 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C27","C0"],

      gridData: [],
      excelUplod: 'N',
      addCheak: 'N',

      current_task: '',

      /*직원조회 팝업 변수*/
      emp_btn_id          : '',  // 직원조회팝업 버튼ID
      emp_nm              : '',  // 직원조회팝업 직원명
      emp_no              : '',  // 직원조회팝업 직원번호

      emp_rowKey          : '',  // 직원조회팝업 (그리드) rowKey
      emp_colName         : '',  // 직원조회팝업 (그리드) colName
      atfl_mng_id         : '',  // 단위테스트 케이스 첨부파일관리
      atfl_mng_id_yn      : '',  // 단위테스트 케이스 첨부파일관리
      pal_atfl_mng_id     : '',  // 설계서 첨부파일관리
      pal_atfl_mng_id_yn  : '',  // 설계서 첨부파일관리

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
        bzcd_selected         : sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600' ? 'TTT':sessionStorage.getItem("LOGIN_BZCD"),
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
      bodyHeight: 730,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: true,
      editingEvent : "click",
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
        resizable: true,
        minWidth: 20,
      },
      rowHeaders:['rowNum'],
      header:{
        height: 55,
        complexColumns: [
          {header: '작업목록(TO-DO)',      name: 'mergeColumn1', childNames: ['pgm_nm', 'pl_nm', 'frcs_sta_dt', 'frcs_end_dt']},
          {header: '진행중(In-Progress)', name: 'mergeColumn2', childNames: ['dvlpe_enm', 'if_end_dt']},
          {header: '중단(Hold)',          name: 'mergeColumn3', childNames: ['stop_sta_dt', 'stop_end_dt'], headerAlign:'center'},
          {header: '완료(Done)',          name: 'mergeColumn4', childNames: ['end_dt','next_no']},
          {header: '비고(Back-Log)',              name: 'mergeColumn5', childNames: ['mark', 'rmrk'], headerAlign:'center'},
        ]
      },
      columns: [
        {
          header: '작업목록(TO-DO)',
          width: 350,
          align: 'left',
          name: 'pgm_nm',
          whiteSpace: 'normal',
          editor: 'text',
          filter: 'select'
        },
        {
          header: '등록자',
          width: 110,
          align: 'center',
          name: 'pl_nm',
          editor: 'text',
          filter: 'select'
        },
        {
          header: '등록일',
          width: 110,
          align: 'center',
          name: 'frcs_sta_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: '완료요청일',
          width: 110,
          align: 'center',
          name: 'frcs_end_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: '담당자',
          width: 110,
          align: 'center',
          name: 'dvlpe_enm',
          editor: 'text',
        },
        {
          header: '완료예정일',
          width: 110,
          align: 'center',
          name: 'if_end_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: '중단일',
          width: 110,
          align: 'center',
          name: 'stop_sta_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '재시작일',
          width: 110,
          align: 'center',
          type: 'date',
          name: 'stop_end_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '완료일',
          width: 110,
          align: 'center',
          name: 'end_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '후속작업',
          name: 'next_no',
          width: 110,
          editor: "text",
        },
        {
          header: 'Mark',
          width: 50,
          align: 'center',
          name: 'mark',
        },
        {
          header: '비고(Back log)',
          name: 'rmrk',
          whiteSpace: 'normal',
        },
      ],
    }
  },
};

</script>
<style>
</style>
