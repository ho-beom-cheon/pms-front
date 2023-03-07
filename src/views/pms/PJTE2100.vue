<template>
  <!-- CONTENTS -->
  <div class="contents">
    <input type="hidden" name="updatedRows" v-model="updatedRows" id="updatedRows">
    <input type="hidden" name="deletedRows" v-model="deletedRows" id="deletedRows">
    <input type="hidden" name="createdRows" v-model="createdRows" id="createdRows">
    <div class="div-img"></div>

    <!-- ASIDE -- LNB -->
    <PmsSideBar></PmsSideBar>
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
                @sqn_cd_change="sqn_cd_change"
                @prc_step_cd_change="prc_step_cd_change"
                @dvlp_dis_cd_change="dvlp_dis_cd_change"
                @pgm_dis_cd_change="pgm_dis_cd_change"
                ref="combo"
            ></combo>
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
                        @click="open_pjte9001_btn(1)"
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
                        @click="open_pjte9001_btn(2)"
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
              <div class="item-con">예상종료일자
                <div class="input-dateWrap"><input type="date" :max="info.frcs_end_dt" v-model="info.frcs_sta_dt"></div>
                ~
                <div class="input-dateWrap"><input type="date" :min="info.frcs_sta_dt" v-model="info.frcs_end_dt"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">개발자완료일자
                <div class="input-dateWrap"><input type="date" :max="info.dvlpe_end_dt" v-model="info.dvlpe_sta_dt"></div>
                ~
                <div class="input-dateWrap"><input type="date" :min="info.dvlpe_sta_dt" v-model="info.dvlpe_end_dt"></div>
              </div>
            </li>
            <button class="btn btn-filter-p" style="margin-left: 470px" @click="fnSearch">
              <a href="#">조회</a>
            </button>
          </ul>

          <div class="mt-1">
            <ul class="filter-btn">
              <button class="btn btn-filter-d" @click="batchDownload">TC증빙 일괄다운로드ⓘ</button>
              <button class="btn btn-filter-d" @click="formDownload">양식다운로드ⓘ</button>
              <div title="업무구분을 선택한 후 엑셀을 업로드 할 수 있습니다.">
              <button class="btn btn-filter-e" v-bind:disabled="this.info.bzcd_selected=='TTT'||this.info.sqn_cd_selected=='TTT'">
                <label for="file">엑셀업로드</label>
                <input type="file" id="file"  @change="gridExcelImport"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="display: none;">
              </button>
              </div>
              <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
              <button class="btn btn-filter-b" @click="gridAddRow" :disabled="validated">행추가</button>
              <button class="btn btn-filter-b" @click="gridDelRow" :disabled="validated">행삭제</button>
              <button class="btn btn-filter-b" @click="fnEtcSave" :disabled="validated">기타항목수정</button>
              <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSave" :disabled="validated">저장</button>

            </ul>
          </div>
        </div>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <!-- Modal popup contents -->
        <Modal :show.sync="modals.txt_modal1">
          <div class="modal-pop-body">
            <h2 v-bind:hidden="this.col_nm!='prg_txt'">
              개발진행현황 편집 및 상세보기
            </h2>
            <h2 v-bind:hidden="this.col_nm!='rmrk'">
              비고 내용편집 및 상세보기
            </h2>
          </div>
          <hr>
          <table>
            <colgroup>
              <col width="60px">
              <col width="*">
              <col width="60px">
              <col width="*">
            </colgroup>
            <tbody>
            <br>
            <tr>
              <td colspan="5">
                <textarea
                    id="modalId"
                    cols="72"
                    rows="20"
                    v-model="modalTxt"
                    style="margin-bottom: 10px; line-height: normal; padding-top: 5px"
                ></textarea>
              </td>
            </tr>
            </tbody>
          </table>
          <div style="float: right">
            <button id="crpenm-edit" class="btn btn-filter-p" style="margin-right: 5px" @click="fnEdit">수정</button>
            <button id="crpenm-close" class="btn btn-filter-b" @click="fnCloseModal">닫기</button>
          </div>
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
              @dblclick="dblonClick"
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
  if(btn_id === undefined) {  // 그리드 내 직원조회
    if(empcol == 'dvlpe_btn') {
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'dvlpe_no', empno);
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'dvlpe_nm', empnm);
    } else if(empcol == 'pl_btn') {
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'pl_no', empno);
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'pl_nm', empnm);
    } else if(empcol == 'crpe_btn') {
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'crpe_no', empno);
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'crpe_nm', empnm);
    } else if(empcol == 'dvlpe_nm') {
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'dvlpe_no', empno);
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'dvlpe_nm', empnm);
    } else if(empcol == 'pl_nm') {
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'pl_no', empno);
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'pl_nm', empnm);
    } else if(empcol == 'crpe_nm') {
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'crpe_no', empno);
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'crpe_nm', empnm);
    }
  } else {  // 상단 필터 직원조회
    if(btn_id === '1') {
      window.pms_register.info.dvlpe_no = empno  // 개발자번호
      window.pms_register.info.dvlpe_nm = empnm  // 개발자명
    } else {
      window.pms_register.info.pl_no = empno  // PL번호
      window.pms_register.info.pl_nm = empnm  // PL명
    }
  }
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
    this.el.src = '../../img/ic_new.e2fc07f4.svg';
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
    this.el.src = '';
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
// 변수 초기화
  mounted() {
    // 화면 초기화
    this.init();
    // 화면 접속 시 데이터 조회
    this.fnSearch();
    window.pms_register = this;
  },
  updated(){
    // 100, 200 권한에 따른 구분함수
    // 개발자 : 100, PL : 200
    this.setNo();
  },

// 일반적인 함수를 선언하는 부분
  methods: {
    // Combo.vue 에서 받아온 값
    bkup_id_change(params) {this.info.bkup_id_selected = params},
    prjt_nm_chage(params) {
      this.info.prjt_nm_selected = params
      if(params !== sessionStorage.getItem("LOGIN_PROJ_ID")){
        this.validated = true;
      } else {
        this.validated = false;
      }
    },
    bzcd_change(params) {this.info.bzcd_selected = params},
    dvlp_dis_cd_change(params) {this.info.dvlp_dis_cd_selected = params},
    pgm_dis_cd_change(params) {this.info.pgm_dis_cd_selected = params},
    prc_step_cd_change(params) {

      if(params===null || params === undefined){
        this.info.prc_step_cd_selected = "TTT"
        this.$refs.combo.$data.prc_step_cd_selected  = "TTT"
      } else {
        this.info.prc_step_cd_selected = params
      }
    },
    sqn_cd_change(params) {this.info.sqn_cd_selected = params},

    // 화면 init
    init() {
      // 그리드 초기화
      this.$refs.grid.invoke("clear");

      console.log("init:"+this.$refs.combo.$data.prc_step_cd_selected);

      if(sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600'
          && sessionStorage.getItem("LOGIN_AUT_CD") !== '900' ){
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
    },
    // 저장 버튼
    fnSave(){
      if(this.excelUplod === 'Y') {
        this.gridData = this.$refs.grid.invoke("getData");
        if (this.gridData.length !== 0) {
          if (this.vaildation(this.gridData, "2") === true) {
            axiosService.post("/PJTE2100/create", {
              excelUplod: this.excelUplod,
              bzcd: this.info.bzcd_selected,
              login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
              login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),
              login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),
              sqn_cd      : this.info.sqn_cd_selected,
              gridData: this.gridData
            }).then(res => {
              console.log(res);
              if (res.data) {
                alert("엑셀 업로드 저장이 완료되었습니다.")
                this.fnSearch()
              }
            }).catch(e => {
              alert("등록중 오류 ::"+ e)
            })
          } else {
            return;
          }
        }
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
            axiosService.post("/PJTE2100/create", {
              excelUplod: this.excelUplod,
              login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
              login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),
              login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),
              sqn_cd      : this.info.sqn_cd_selected,
              gridData: this.createdRows
            }).then(res => {
              console.log(res)
              if (res.data === true) {
                alert("신규 개발현황이 저장이 완료되었습니다.")
                this.excelUplod = 'N'
                this.fnSearch()
              } else {
                alert("등록중 오류 ::"+ e)
                return;
              }
            })
          } else {
            return;
          }
        }
        if (this.updatedRows.length !== 0) {
          if (this.vaildation(this.updatedRows, "1") === true) {
            try {
              axiosService.post("/PJTE2100/update", {
                login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
                login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),
                login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),
                sqn_cd      : this.info.sqn_cd_selected,
                gridData: this.updatedRows
              }).then(res => {
                console.log(res)
                if (res.data === true) {
                  alert("변경된 정보가 수정되었습니다.")
                  this.excelUplod = 'N'
                  this.fnSearch()
                } else {
                  alert("수정중 오류 ::"+ e)
                  return;
                }
              })
            } catch (e) {
              alert("수정중 오류 ::"+ e)
            }
          } else {
            return;
          }
        }
      }
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
            axiosService.post("/PJTE2100/update", {
              login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
              login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),
              login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),
              gridData: this.updatedRows
            }).then(res => {
              console.log(res)
              if (res.data === true) {
                alert("변경된 기타정보가 수정되었습니다.")
                this.excelUplod = 'N'
                this.fnSearch()
              } else {
                alert("수정중 오류 ::"+ e)
                return;
              }
            })
          } catch (e) {
            console.log("업데이트 오류 ::", e);
          }
        } else {
          this.$refs.grid.invoke("reloadData");
        }
      }
    },
    onGridUpdated(grid){
      this.$refs.grid.invoke("addColumnClassName","err_btn", "new-btn-img");
      this.$refs.grid.invoke("addColumnClassName", "rmrk", "disableColor");
      this.$refs.grid.invoke("addColumnClassName", "prg_txt", "disableColor");
      this.$refs.grid.invoke("addColumnClassName", "dvlpe_btn", "search-btn-img");
      this.$refs.grid.invoke("addColumnClassName", "pl_btn", "search-btn-img");
      this.$refs.grid.invoke("addColumnClassName", "crpe_btn","search-btn-img");
      this.addCheak = 'N';
      // 열고정
      this.$refs.grid.invoke("setFrozenColumnCount", 3);
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
      let gridRow = this.$refs.grid.invoke("getRow",this.curRow);
      let gridData = this.$refs.grid.invoke("getData");

      const currentCellData = (this.$refs.grid.invoke("getFocusedCell"));
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

      if(this.addCheak === 'Y'){
        if(this.curRow === gridData.length-1){
          return;
        }
      }
      // grid 셀 클릭 시 윈도우 팝업 호출(함수화예정)
      if(ev.columnName === 'atfl_mng_id_yn') {
        this.count = 1
        let bkup_id='0000000000', prjt_id=gridRow.prjt_id, atfl_mng_id=gridRow.atfl_mng_id != null?gridRow.atfl_mng_id:'', file_rgs_dscd='100', bzcd = gridRow.bzcd, pgm_id=gridRow.pgm_id
        this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&bzcd=${bzcd}&pgm_id=${pgm_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
      }
      if(ev.columnName === 'pal_atfl_mng_id_yn') {
        this.count = 2
        let bkup_id='0000000000', prjt_id=gridRow.prjt_id, pal_atfl_mng_id=gridRow.pal_atfl_mng_id != null?gridRow.pal_atfl_mng_id:'', file_rgs_dscd='101', bzcd = gridRow.bzcd, pgm_id=gridRow.pgm_id
        this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${pal_atfl_mng_id}&bzcd=${bzcd}&pgm_id=${pgm_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
      }

      // 결함등록 Column 클릭 시 결함등록팝업 호출
      if(ev.columnName === 'err_btn') {
        let cctn_id= this.$refs.grid.invoke("getValue", this.curRow, 'pgm_id');
        let cctn_nm= this.$refs.grid.invoke("getValue", this.curRow, 'pgm_nm');
        let cctn_bzcd= this.$refs.grid.invoke("getValue", this.curRow, 'bzcd');
        let cctn_sqn_cd= this.$refs.grid.invoke("getValue", this.curRow, 'sqn_cd'); //연결차수구분
        let rgs_dscd= '1100'
        let bkup_id='0000000000', prjt_id=sessionStorage.getItem('LOGIN_PROJ_ID')
        this.pop = window.open(`../PJTE3001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&cctn_id=${cctn_id}&cctn_nm=${cctn_nm}&cctn_bzcd=${cctn_bzcd}&cctn_sqn_cd=${cctn_sqn_cd}&rgs_dscd=${rgs_dscd}&`, "open_page", "width=1000, height=930");
      }
    },
    dblonClick(ev) {  // 그리드 셀 더블클릭 시 선택버튼 클릭
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
      let gridRow = this.$refs.grid.invoke("getRow",this.curRow);
      let gridData = this.$refs.grid.invoke("getData");

      const currentCellData = (this.$refs.grid.invoke("getFocusedCell"));
      this.col_nm = ev.columnName

      if(ev.columnName == 'rmrk' || ev.columnName == 'prg_txt') {  // 컬럼명이 <비고>일 때만 팝업
        this.modals.txt_modal1 = true;
        this.modalTxt = currentCellData.value;
        const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      }
    },
    // 양식다운로드
    formDownload(){
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem("LOGIN_PROJ_ID"), bzcd=sessionStorage.getItem("LOGIN_BZCD"), atfl_mng_id = "0000000000", file_rgs_dscd = '901' //atfl_mng_id 값은 양식 파일 첨부 ID 추후에 추가
      this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&bzcd=${bzcd}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=650");
    },
    // TC증빙 일괄다운로드
    batchDownload(){
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem("LOGIN_PROJ_ID"), bzcd=this.info.bzcd_selected, file_rgs_dscd = '100' //atfl_mng_id 값은 양식 파일 첨부 ID 추후에 추가
      this.pop = window.open(`../PJTE9003/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&bzcd=${bzcd}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=900");
    },
    // 모달창에서 수정버튼 클릭 시 그리드Text 변경
    fnEdit(){
      this.$refs.grid.invoke("setValue", this.curRow, this.col_nm, document.getElementById("modalId").value);
      console.log("확인::", document.getElementById("modalId").value);
      console.log("this.curRow::", this.curRow);
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
      this.excelUplod = 'N'
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    // 행추가
    gridAddRow(){
      //this.$refs.grid.invoke("setFrozenColumnCount", 0);
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
      // this.$refs.grid.invoke("enableCell", this.NewRow-1, "pgm_id");
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "pl_cnf_dt");
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "pl_cnf_dt");
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "pal_atfl_mng_id_yn");
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "atfl_mng_id_yn");
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "err_btn");
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "sta_dt");
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "end_dt");
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "dvlpe_cnf_dt");
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "pl_cnf_dt");
      this.$refs.grid.invoke("addColumnClassName", "rmrk", "disableColor");

      this.$refs.grid.invoke("addColumnClassName","err_btn", "new-btn-img");
      this.$refs.grid.invoke("addColumnClassName", "dvlpe_btn", "search-btn-img");
      this.$refs.grid.invoke("addColumnClassName", "pl_btn", "search-btn-img");
      this.$refs.grid.invoke("addColumnClassName", "crpe_btn","search-btn-img");
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
      this.$refs.grid.invoke("export", "xlsx",{fileName: "개발현황_"+this.getCurrentYyyymmdd(), useFormattedValue : true, onlySelected:true});
    },
    getCurrentYyyymmdd() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = ("0" + date.getDate()).slice(-2);

      if(month < 10){
        month = "0"+month;
      }
      return year + '-' +  month + '-' + day;
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
        console.log("wb ::"+ wb.SheetNames);

        wb.SheetNames.forEach((sheetName, idx) => {
          if (sheetName === '개발현황' || sheetName === 'Sheet1') {
            console.log(wb.Sheets[sheetName])
            wb.Sheets[sheetName].A1.w = "NO"
            wb.Sheets[sheetName].B1.w = "bzcd"
            wb.Sheets[sheetName].C1.w = "pgm_id"
            wb.Sheets[sheetName].D1.w = "pgm_nm"
            wb.Sheets[sheetName].E1.w = "sqn_cd"
            wb.Sheets[sheetName].F1.w = "bz_dtls_txt"
            wb.Sheets[sheetName].G1.w = "dvlp_dis_cd"
            wb.Sheets[sheetName].H1.w = "pgm_dis_cd"
            wb.Sheets[sheetName].I1.w = "atfl_mng_id_yn"
            wb.Sheets[sheetName].J1.w = "prc_step_cd"
            wb.Sheets[sheetName].K1.w = "prg_txt"
            wb.Sheets[sheetName].L1.w = "cnv_bs_dt"
            wb.Sheets[sheetName].M1.w = "err_btn"
            wb.Sheets[sheetName].N1.w = "rmrk"
            wb.Sheets[sheetName].O1.w = "rqu_sbh_id"
            let P1 = {P1: { t: 's',v: '예상시작일',r: '<t>예상종료일자</t><phoneticPr fontId="1" type="noConversion"/>',h: '예상시작일',w: 'frcs_sta_dt'}}
            wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], P1)
            wb.Sheets[sheetName].P2.w = "frcs_sta_dt"
            let Q1 = {Q1: { t: 's',v: '예상종료일',r: '<t>예상종료일자</t><phoneticPr fontId="1" type="noConversion"/>',h: '예상종료일',w: 'frcs_end_dt'}}
            wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], Q1)
            wb.Sheets[sheetName].Q2.w = "frcs_end_dt"
            wb.Sheets[sheetName].R1.w = "sta_dt"
            wb.Sheets[sheetName].S2.w = "end_dt"
            wb.Sheets[sheetName].T1.w = "dvlpe_cnf_dt"
            wb.Sheets[sheetName].U1.w = "pl_cnf_dt"
            wb.Sheets[sheetName].V2.w = "dvlpe_nm"
            wb.Sheets[sheetName].W2.w = "dvlpe_btn"
            let X1 = {X1: { t: 's',v: '사번',r: '<t>사번</t><phoneticPr fontId="1" type="noConversion"/>',h: '사번',w: 'dvlpe_no'}}
            wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], X1)
            wb.Sheets[sheetName].X2.w = "dvlpe_no"
            wb.Sheets[sheetName].Y2.w = "pl_nm"
            wb.Sheets[sheetName].Z2.w = "pl_btn"
            let AA1 = {AA1: { t: 's',v: '사번',r: '<t>사번</t><phoneticPr fontId="1" type="noConversion"/>',h: '사번',w: 'pl_no'}}
            wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], AA1)
            wb.Sheets[sheetName].AA2.w = "pl_no"
            wb.Sheets[sheetName].AB2.w = "crpe_nm"
            wb.Sheets[sheetName].AC2.w = "crpe_btn"
            let AD1 = {AD1: { t: 's',v: '사번',r: '<t>사번</t><phoneticPr fontId="1" type="noConversion"/>',h: '사번',w: 'crpe_no'}}
            wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], AD1)
            wb.Sheets[sheetName].AD2.w = "crpe_no"
            wb.Sheets[sheetName].AE2.w = "err_tot_cnt"
            wb.Sheets[sheetName].AF2.w = "err_cmpl_cnt"
            wb.Sheets[sheetName].AG2.w = "err_ncmpl_cnt"
            wb.Sheets[sheetName].AH1.w = "pal_atfl_mng_id_yn"

            let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            let rowObj_copy = [];

            for (let n = 1; n < rowObj.length; n++) {
                rowObj_copy[n - 1] = rowObj[n];
              }
            gridExcelData = JSON.parse(JSON.stringify(rowObj_copy));
          }
        })
        this.excelUplod = 'Y'
        try {
          this.$refs.grid.invoke('resetData', gridExcelData)
          alert('업로드 파일이 적용되었습니다.')
        } catch (e){
          alert('업로드에 실패했습니다.')
        }
      };
      reader.readAsBinaryString(input.files[0]);
      event.target.value = '';
    },
    // 특수 문자가 있나 없나 체크
    checkSpecial(str) {
    	let special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    	if(special_pattern.test(str) === true) {
    		return true;
    	} else {
    		return false;
    	}
    },
    excelDateToJSDate(excelDate) {
      /* 엑셀에서 넘어온 숫자형태의 데이터를 날짜형태로 바꿔주는 함수
      ex) 1. 엑셀 파일에서 2021-02 형태로 값을 입력하면 Feb-22 형태의 날짜 데이터가 자동입력됨
          2. gridExcelImport2 함수에서
          XLSX.utils.sheet_to_json(wb.Sheets[sheetName]) 엑셀데이터를 JSON으로 바뀌면서
          Feb-22 의 데이터가 44593 << 숫자형태의 데이터로 바뀜
          3. excelDateToJSDate 함수에서 44593 형태의 데이터를 2021-02 형태의 데이터로 변환
       */
      let date = new Date(Math.round((excelDate - (25567 + 2)) * 86400 * 1000));
      let converted_date = date.toISOString().split('T')[0].substring(0, 10);
      return converted_date;
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
        let pgm_nm = "["+data[i].pgm_nm+"]은/는"
        let pgm_nm1 = "["+data[i].pgm_nm+"]"
        let dvlpe_no = data[i].dvlpe_no
        let pl_no    = data[i].pl_no
        let crpe_no  = data[i].crpe_no
        let pass_yn  = "N"
        let unt_tst_yn  = data[i].unt_tst_yn

        if(sessionStorage.getItem("LOGIN_AUT_CD") === "500" || sessionStorage.getItem("LOGIN_AUT_CD") === "600" || sessionStorage.getItem("LOGIN_AUT_CD") === "900"){
          pass_yn  = "Y"
        }
        /* 출력 영역  */
        if(data[i].bzcd === null)         { alert(pgm_nm+" 업무구분은 필수 입력 사항입니다");      return false;}
        if(data[i].pgm_id === null)       { alert(pgm_nm+" 프로그램ID는 필수 입력 사항입니다");    return false;}
        if(data[i].pgm_nm === null)       { alert(pgm_nm+" 프로그램명은 필수 입력 사항입니다");   return false;}
        if(data[i].sqn_cd === null)       { alert(pgm_nm+" 차수는 필수 입력 사항입니다");    return false;}
        if(data[i].dvlp_dis_cd === null)  { alert(pgm_nm+" 개발구분은 필수 입력 사항입니다");      return false;}
        if(data[i].pgm_dis_cd === null)   { alert(pgm_nm+" 프로그램 구분은 필수 입력 사항입니다");  return false;}
        if(data[i].prc_step_cd === null)  { alert(pgm_nm+" 처리단계는 필수 입력 사항입니다");      return false;}
        if(data[i].frcs_sta_dt === null)  { alert(pgm_nm+" 예상시작일은 필수 입력 사항입니다");   return false;}
        if(data[i].frcs_end_dt === null)  { alert(pgm_nm+" 예상종료일은 필수 입력 사항입니다");   return false;}
        if(data[i].dvlpe_no === null)     { alert(pgm_nm+" 개발자 사번은 필수 입력 사항입니다");   return false;}
        if(data[i].pl_no === null)        { alert(pgm_nm+" PL 사번은 필수 입력 사항입니다");      return false;}
        if(data[i].crpe_no === null)      { alert(pgm_nm+" 담당자 사번은 필수 입력 사항입니다");   return false;}


        if(pass_yn === "N"){
          if(data[i].dvlp_dis_cd === "900"){
            alert(pgm_nm1+"의 개발구분[삭제]는 PMO만 가능합니다.\nPMS신청관리 화면에서 신청하세요.");
            return false;
          }
        }
        if(division === "1") {
          //권한ID[500:PM,600:PMO] - 모두 가능
          if(pass_yn === 'N') {
            if (data[i].prc_step_cd === "000" || data[i].prc_step_cd === "100" || data[i].prc_step_cd === "110" || data[i].prc_step_cd === "200") {
              if (dvlpe_no != sessionStorage.getItem("LOGIN_EMP_NO") && pl_no != sessionStorage.getItem("LOGIN_EMP_NO")) {
                if(data[i].prc_step_cd === "110"){
                    alert(pgm_nm1 + "의 처리단계[전환코딩완료]는 개발자 또는 PL만 가능한 처리단계입니다.")
                } else {
                  alert(pgm_nm1 + "의 처리단계[개발전,개발시작,개발자완료]는 개발자 또는 PL만 가능한 처리단계입니다.")
                }
                return false;
              }
            } else if (data[i].prc_step_cd === "300") {
              if (pl_no != sessionStorage.getItem("LOGIN_EMP_NO")) {
                alert(pgm_nm1 + "의 처리단계[PL확인]는 PL만 가능한 처리단계입니다.")
                return false;
              }
            } else if (data[i].prc_step_cd === "400") {
              if (crpe_no != sessionStorage.getItem("LOGIN_EMP_NO")) {
                alert(pgm_nm1 + "의 처리단계[개발종료]는 담당현업만 가능한 처리단계입니다.")
                return false;
              }
            }
            if(data[i].atfl_mng_id === '' && unt_tst_yn === 'Y' && (data[i].prc_step_cd !== "000" && data[i].prc_step_cd !== "100" && data[i].prc_step_cd !== "110") )  { alert(pgm_nm + " 단위테스트결과서 증빙은 필수 입력 사항입니다");   return false;}
          }
        }
      }
      return  true;
    },

  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{
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
    txt_modal1() {
      if(this.modals.txt_modal1 === true) {
        document.getElementById("modalId").focus()
      }
    },

  },

// 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C27","C0","C1","C6","C2","C3","C4"],

      gridData: [],
      excelUplod: 'N',
      addCheak: 'N',
      validated: false,
      col_nm: '',
      header_col_nm: '',

      atfl_mng_id         : '',  // 단위테스트 케이스 첨부파일관리
      atfl_mng_id_yn      : '',  // 단위테스트 케이스 첨부파일관리
      pal_atfl_mng_id     : '',  // 설계서 첨부파일관리
      pal_atfl_mng_id_yn  : '',  // 설계서 첨부파일관리
      up_aut_cd : '',
      up_emp_no : '',
      up_proj_id : '',

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
        bzcd_selected         : sessionStorage.getItem("LOGIN_AUT_CD") === '300' || sessionStorage.getItem("LOGIN_AUT_CD") === '400' ||
                                sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600' ||
                                sessionStorage.getItem("LOGIN_AUT_CD") === '900' ? 'TTT':sessionStorage.getItem("LOGIN_BZCD"),
        dvlp_dis_cd_selected  : 'TTT',
        pgm_dis_cd_selected   : 'TTT',
        prc_step_cd_selected  : 'TTT',
        sqn_cd_selected       : 'TTT',
      },
      login : {
        login_aut_cd          : sessionStorage.getItem("LOGIN_AUT_CD"),
        login_bzcd            : sessionStorage.getItem("LOGIN_BZCD"),
        login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO"),
        login_proj_id         : sessionStorage.getItem("LOGIN_PROJ_ID"),      },

      updatedRows : this.updatedRows,
      deletedRows : this.deletedRows,
      createdRows : this.createdRows,

      /* grid 속성 */
      count:0,
      curRow:-1,
      title:"",
      scrollX:false,
      scrollY:false,
      bodyHeight: 700,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: false,
      editingEvent : "click",


      /* 그리드 상세보기 모달 속성 */
      modals: {
        txt_modal1: false,
      },
      modalTxt:this.modalTxt,

      // toast ui grid 데이터
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE2100/select', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE2100/create', method: 'POST'},
          updateData : { url: process.env.VUE_APP_API + '/PJTE2100/update', method: 'POST'},
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
          {header: '결함',             name: 'mergeColumn3', childNames: ['err_tot_cnt', 'err_cmpl_cnt', 'err_ncmpl_cnt'], headerAlign:'center'},
          {header: '개발자',           name: 'mergeColumn4', childNames: ['dvlpe_btn','dvlpe_nm','dvlpe_no']},
          {header: 'PL',              name: 'mergeColumn5', childNames: ['pl_nm', 'pl_btn','pl_no'], headerAlign:'center'},
          {header: '담당현업',         name: 'mergeColumn6', childNames: ['crpe_nm', 'crpe_btn','crpe_no'], headerAlign:'center'},
          {header: '테스트',           name: 'mergeColumn7', childNames: ['atfl_mng_id_yn'], headerAlign:'center'},
          {header: '설계서',           name: 'mergeColumn8', childNames: ['pal_atfl_mng_id_yn'], headerAlign:'center'},
          {header: '결함',            name: 'mergeColumn9', childNames: ['err_btn'], headerAlign:'center'},
        ]
      },
      columns: [
        {
          header: '업무구분',
          width: 110,
          minWidth: 50,
          maxWidth: 250,
          name: 'bzcd',
          align: 'center',
          filter: 'select',
          formatter: 'listItemText',
          disabled: true,
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000001N
            }
          }
        },
        {
          header: '프로그램ID',
          width: 150,
          align: 'left',
          name: 'pgm_id',
          ellipsis : true,
          editor: "text",
          filter: 'text',
          disabled: true,
        },
        {
          header: '프로그램명',
          width: 250,
          align: 'left',
          name: 'pgm_nm',
          ellipsis : true,
          editor: 'text',
          filter: 'text',
        },
        {
          header: '차수',
          width: 60,
          align: 'center',
          name: 'sqn_cd',
          formatter: 'listItemText',
          filter: 'select',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000006N
            }
          }
        },
        {
          header: '업무상세분류',
          width: 100,
          align: 'left',
          name: 'bz_dtls_txt',
          editor: 'text',
          filter: 'text',
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
              listItems: this.$store.state.pms.CD1000000003N
            }
          },
          filter: 'select',
        },
        {
          header: '프로그램구분',
          width: 100,
          align: 'center',
          name: 'pgm_dis_cd',
          formatter: 'listItemText',
          filter: 'select',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000004N

            }
          }
        },
        {
          header: '증빙',
          width: 40,
          align: 'center',
          name: 'atfl_mng_id_yn',
          type : 'text',
          defaultValue: '미첨부',
        },
        {
          header: '처리단계',
          width: 110,
          align: 'center',
          name: 'prc_step_cd',
          formatter: 'listItemText',
          filter: 'select',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000002N
            }
          }
        },
        {
          header: '개발진행현황',
          width: 250,
          align: 'left',
          name: 'prg_txt',
          filter: 'text',
        },
        {
          header: '전환기준일자',
          width: 100,
          align: 'center',
          name: 'cnv_bs_dt',
          format: 'yyyy-mm-dd',
          filter: 'text',
          editor: 'datePicker',
        },
        {
          header: '등록',
          width: 30,
          align: 'center',
          name: 'err_btn',
        },
        {
          header: '비고',
          width: 200,
          align: 'left',
          name: 'rmrk',
          filter: 'text',
        },
        {
          header: '관련프로그램',
          width: 120,
          align: 'left',
          name: 'rqu_sbh_id',
          ellipsis : true,
          editor: 'text',
          filter: 'text',
        },
        {
          header: '예상시작일',
          width: 90,
          align: 'center',
          name: 'frcs_sta_dt',
          filter: 'text',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '예상종료일',
          width: 90,
          align: 'center',
          type: 'date',
          name: 'frcs_end_dt',
          filter: 'text',
          editor: 'datePicker'
        },
        {
          header: '실제시작일',
          width: 90,
          align: 'center',
          name: 'sta_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          filter: 'text',
          disabled: true,
        },
        {
          header: '실제종료일',
          width: 90,
          align: 'center',
          type: 'date',
          name: 'end_dt',
          editor: 'datePicker',
          filter: 'text',
          disabled: true,
        },
        {
          header: '개발자확인일',
          width: 110,
          align: 'center',
          name: 'dvlpe_cnf_dt',
          editor: 'datePicker',
          filter: 'text',
          disabled: true,
        },
        {
          header: 'PL확인일',
          width: 90,
          align: 'center',
          name: 'pl_cnf_dt',
          editor: 'datePicker',
          filter: 'text',
          disabled: true,
        },

        {
          header: '이름',
          width: 60,
          align: 'center',
          name: 'dvlpe_nm',
          filter: 'text',
          editor: 'text',
        },
        {
          header: '검색',
          width: 35,
          minWidth: 10,
          align: 'center',
          name: 'dvlpe_btn',
          //renderer: SearchBtn,
        },
        {
          header: '번호',
          width: 80,
          align: 'center',
          name: 'dvlpe_no',
        },
        {
          header: '이름',
          width: 60,
          align: 'center',
          name: 'pl_nm',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '검색',
          width: 35,
          minWidth: 10,
          align: 'center',
          name: 'pl_btn',
          //renderer: SearchBtn,
        },
        {
          header: '번호',
          width: 80,
          align: 'center',
          name: 'pl_no',
        },
        {
          header: '이름',
          width: 60,
          align: 'center',
          name: 'crpe_nm',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '검색',
          width: 35,
          minWidth: 10,
          align: 'center',
          name: 'crpe_btn',
          //renderer: SearchBtn,
        },
        {
          header: '번호',
          width: 80,
          align: 'center',
          name: 'crpe_no',
        },
        {
          header: '전체',
          width: 40,
          align: 'right',
          name: 'err_tot_cnt',
        },
        {
          header: '완료',
          width: 40,
          align: 'right',
          name: 'err_cmpl_cnt',
        },
        {
          header: '진행',
          width: 40,
          align: 'right',
          name: 'err_ncmpl_cnt',
        },
        {
          header: '첨부파일관리ID',
          width: 120,
          align: 'center',
          name: 'pal_atfl_mng_id_yn',
          defaultValue: '미첨부',
        },
        {
          header: '문서',
          width: 130,
          align: 'center',
          name: 'atfl_mng_id',
          type : 'text',
          hidden : true,
        },
        {
          header: '첨부파일관리ID',
          width: 150,
          align: 'center',
          name: 'pal_atfl_mng_id',
          hidden : true
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
          defaultValue: '0000000000'
        },
        {
          header: '프로젝트 ID',
          width: 90,
          name: 'prjt_id',
          align: 'center',
          hidden : true,
          defaultValue: sessionStorage.getItem("LOGIN_PROJ_ID")
        },
        {
          header: '단위테스트대상여부',
          width: 90,
          name: 'unt_tst_yn',
          align: 'center',
          hidden : true
        },
      ]
    }
  },
};

</script>
<style>
.disableColor {
  background: #FFFFFF!important;
}
.empBtnColor {
  background: #BEBEBE!important;
}
</style>
