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
        <div class="col">
          <ul class="filter-con clear-fix">
            <combo
                :comboArray = "this.comboList"
                @bkup_id_change="bkup_id_change"
                @prjt_nm_chage="prjt_nm_chage"
                @bzcd_change="bzcd_change"
                @sqn_cd_change="sqn_cd_change"
                @pgm_dis_cd_change="pgm_dis_cd_change"
                @itg_tst_prc_cd_change="itg_tst_prc_cd_change"
            ></combo>
            <li class="filter-item">
              <div class="item-con">시나리오ID
                <input type="text"
                       placeholder="입력"
                       v-model="info.scnr_id"
                       id="info.scnr_id"
                       @keyup.enter="fnSearch"
                       style="width: 100px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">예상종료일자
                <div class="input-dateWrap"><input type="date" :max="info.frcs_end_dt02" v-model="info.frcs_end_dt01"></div>
                ~
                <div class="input-dateWrap"><input type="date" :min="info.frcs_end_dt01" v-model="info.frcs_end_dt02"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">테스트케이스ID
                <input type="text"
                       placeholder="입력"
                       v-model="info.tst_case_id"
                       id="info.tst_case_id"
                       style="width: 157px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">요구사항ID
                <input type="text"
                       placeholder="입력"
                       v-model="info.rqu_sbh_id"
                       id="info.rqu_sbh_id"
                       style="width: 146px"
                >
              </div>
            </li>
            <li class="filter-item-n">
              <div class="input-searchWrap">개발자명
                <input type="text"
                       placeholder="직원명"
                       v-model="info.dvlpe_enm"
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
                     v-model="info.dvlpe_eno"
                     style="width: 70px; background-color: #f2f2f2;"
                     :disabled = true
              >
            </li>
            <li class="filter-item-n">
              <div class="input-searchWrap">담당PL명
                <input type="text"
                       placeholder="직원명"
                       v-model="info.pl_enm"
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
                     v-model="info.pl_eno"
                     style="width: 70px; background-color: #f2f2f2;"
                     :disabled = true
              >
            </li>
            <li class="filter-item-n">
              <div class="input-searchWrap">담당현업명
                <input type="text"
                       placeholder="입력"
                       v-model="info.crpe_enm"
                       style="width: 90px"
                       @keyup.enter="open_pjte9001(3)"
                >
                <button class="search-btn"
                        @click="open_pjte9001_btn(3)"
                ></button>
              </div>
            </li>
            <li class="filter-item">
              <input type="text"
                     placeholder="직원번호"
                     v-model="info.crpe_eno"
                     style="width: 70px; background-color: #f2f2f2;"
                     :disabled = true
              >
            </li>
            <li class="filter-item">
              <div class="item-con">개발자확인일자
                <div class="input-dateWrap"><input type="date" :max="info.dvlpe_cnf_dt02" v-model="info.dvlpe_cnf_dt01"></div>
                ~
                <div class="input-dateWrap"><input type="date" :max="info.dvlpe_cnf_dt01" v-model="info.dvlpe_cnf_dt02"></div>
              </div>
            </li>
          </ul>
          <ul class="filter-btn">
            <button class="btn btn-filter-d" @click="batchDownload">TC증빙 일괄다운로드ⓘ</button>
            <button class="btn btn-filter-d" @click="formDownload">양식다운로드ⓘ</button>
            <button class="btn btn-filter-e">
              <label for="file">엑셀업로드</label>
              <input type="file" id="file"  @change="gridExcelImport"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="display: none;">
            </button>
            <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
            <button class="btn btn-filter-b" @click="fnEtcSave" :disabled="validated">기타항목수정</button>
            <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSave" :disabled="validated">저장</button>
            <button class="btn btn-filter-p" @click="fnSearch">조회</button>
          </ul>
        </div>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <Modal :show.sync="modals.txt_modal1">
          <div class="modal-pop-body">
            <h2>
              미진사유상세보기
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
        <div class="gridWrap" style="min-width: 750px;">
          <grid
              ref="grid"
              :data="dataSource"
              :header="header"
              :columns="columns"
              :bodyHeight="bodyHeight"
              :minRowHeight="minRowHeight"
              :showDummyRows="showDummyRows"
              :columnOptions="columnOptions"
              :editingEvent="editingEvent"
              :rowHeight="rowHeight"
              :rowHeaders="rowHeaders"
              @click="onClick"
              @dblclick="dblonClick"
              @onGridUpdated="onGridUpdated"
              @editingFinish="editingFinish"
              id = "grid"
          ></grid>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import Combo from "@/components/Combo"
import {Grid} from '@toast-ui/vue-grid';
import Modal from "@/components/Modal";
import WindowPopup from "./PJTE3001.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
import {axiosService} from "@/api/http";
import XLSX from "xlsx";
import PmsSideBar from  "@/components/PmsSideBar";

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
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'dvlpe_eno', empno);
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'dvlpe_enm', empnm);
    } else if(empcol == 'pl_btn') {
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'pl_eno', empno);
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'pl_enm', empnm);
    } else if(empcol == 'crpe_btn') {
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'crpe_eno', empno);
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'crpe_enm', empnm);
    } else if(empcol == 'dvlpe_enm') {
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'dvlpe_eno', empno);
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'dvlpe_enm', empnm);
    } else if(empcol == 'pl_enm') {
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'pl_eno', empno);
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'pl_enm', empnm);
    } else if(empcol == 'crpe_enm') {
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'crpe_eno', empno);
      window.pms_register.$refs.grid.invoke("setValue", emprow, 'crpe_enm', empnm);
    }
  } else {  // 상단 필터 직원조회
    if(btn_id === '1') {
      window.pms_register.info.dvlpe_eno = empno  // 개발자번호
      window.pms_register.info.dvlpe_enm = empnm  // 개발자명
    } else if(btn_id === '2') {
      window.pms_register.info.pl_eno = empno  // PL번호
      window.pms_register.info.pl_enm = empnm  // PL명
    } else if(btn_id === '3') {
      window.pms_register.info.crpe_eno = empno  // 담당현업번호
      window.pms_register.info.crpe_enm = empnm  // 담당현업명
    }
  }
}

// 그리드 내  커스텀 이미지 버튼을 만들기 위한 클래스 생성
class CustomRenderer {
  constructor(props) {
    const el = document.createElement('img');
    el.src = 'some-image-link';
    this.el = el;
    this.render(props);
  }
  getElement() {return this.el;}
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
    Modal,
    WindowPopup,
    PmsSideBar,
    grid: Grid,
  },
  mounted() {
    console.log("mounted");
    this.init();
    this.fnSearch();    // 최초조회
    // this.setColumns();  // 권한에 따른 컬럼 세팅
    window.pms_register = this;
  },
  // 함수를 선언하는 부분
  // "종속대상에 따라 캐싱"된다는 점이 method와는 다른점.
  computed: {
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
    sqn_cd_change(params) {this.info.sqn_cd_selected = params},
    pgm_dis_cd_change(params) {this.info.pgm_dis_cd_selected = params},
    itg_tst_prc_cd_change(params) {this.info.itg_tst_prc_cd_selected = params},

    init() {
      if(sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600'){
        // 특정 열 비활성화
        this.$refs.grid.invoke("disableColumn", 'frcs_sta_dt');
        this.$refs.grid.invoke("disableColumn", 'frcs_end_dt');
      }
    },
    // 저장 버튼
    fnSave(){
      if(this.excelUplod === 'Y') {

        axiosService.post("/PJTE2200/create", {
          excelUplod            : this.excelUplod,
          gridData              : this.gridData,
          prjt_id               : sessionStorage.getItem("LOGIN_PROJ_ID"),
          login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO")
        }).then(res => {
          if (res.data) {
            alert("저장이 완료되었습니다.");
            this.fnSearch();
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
            try {
              // 데이터 파라메타 전달
              this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.createdRows));
              // create api 요청
              this.$refs.grid.invoke("request", "createData", {showConfirm: false});
              alert("저장이 완료되었습니다.")
              this.$refs.grid.invoke("reloadData");
            } catch (e) {
              console.log(e);
            }
          }
          // 저장 후 변경 데이터 배열 비움
          this.$refs.grid.invoke("clearModifiedData")
          this.$refs.grid.invoke("reloadData");
        }
        if (this.updatedRows.length !== 0) {
          if (this.vaildation(this.updatedRows, "1") === true) {
            try {
              // 데이터 파라메타 전달
              this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.updatedRows));
              this.$refs.grid.invoke("setRequestParams", this.login);
              // update api 요청
              this.$refs.grid.invoke("request", "updateData", {showConfirm: false});
              alert("저장이 완료되었습니다.")
              this.$refs.grid.invoke("reloadData");
            } catch (e) {
              console.log("업데이트 오류 ::", e);
            }
          }
        }
      }
      // 저장 후 변경 데이터 배열 비움
      this.$refs.grid.invoke("clearModifiedData")
      this.$refs.grid.invoke("reloadData");
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

      if(this.updatedRows.length !== 0) {
        if (this.vaildation(this.updatedRows, "2") === true) {
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
      this.$refs.grid.invoke("reloadData");
    },

    /* 그리드 직원명 입력 후
       edit이 끝날 시 입력한 직원명이
       단건일 때, 직원번호에 바인딩 */
    editingFinish(ev) {
      if(ev.columnName === 'dvlpe_enm' || ev.columnName === 'pl_enm' || ev.columnName === 'crpe_enm') {
        let empnm = ''
        let prjt_id_selected = this.info.prjt_nm_selected
        let bkup_id_selected = this.info.bkup_id_selected
        if(ev.columnName === 'dvlpe_enm'){
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'dvlpe_enm')
        } else if(ev.columnName === 'pl_enm') {
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'pl_enm')
        } else if(ev.columnName === 'crpe_enm') {
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'crpe_enm')
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
                  if (ev.columnName == 'dvlpe_enm') {
                    this.$refs.grid.invoke("setValue", this.curRow, 'dvlpe_eno', res.data.data.contents[0].empno);
                    this.$refs.grid.invoke("setValue", this.curRow, 'dvlpe_enm', res.data.data.contents[0].empnm);
                  } else if (ev.columnName == 'pl_enm') {
                    this.$refs.grid.invoke("setValue", this.curRow, 'pl_eno', res.data.data.contents[0].empno);
                    this.$refs.grid.invoke("setValue", this.curRow, 'pl_enm', res.data.data.contents[0].empnm);
                  } else if (ev.columnName == 'crpe_enm') {
                    this.$refs.grid.invoke("setValue", this.curRow, 'crpe_eno', res.data.data.contents[0].empno);
                    this.$refs.grid.invoke("setValue", this.curRow, 'crpe_enm', res.data.data.contents[0].empnm);
                  }
                } else { // 입력한 직원명으로 조회한 값이 여러건일 경우 : PJTE9001 팝업 호출 후 파라미터 값으로 조회
                  let bkup_id = this.info.bkup_id_selected, prjt_id = this.info.prjt_nm_selected, emprow = ev.rowKey, empcol = ev.columnName
                  window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&emp_row=${emprow}&emp_col=${empcol}&`, "open_emp_page", "width=700, height=600");
                }
              })
        }
      }
    },

    onClick(ev) {
      this.curRow = ev.rowKey;
      let gridData = this.$refs.grid.invoke("getRow",this.curRow);
      this.$refs.grid.invoke("getRow", this.curRow);
      // grid 셀 클릭 시 윈도우 팝업 호출(함수화예정)
      if(ev.columnName === 'atfl_mng_id_yn') {
        let bkup_id='0000000000', prjt_id=gridData.prjt_id, atfl_mng_id=gridData.atfl_mng_id != null?gridData.atfl_mng_id:'', file_rgs_dscd='200', bzcd = gridData.bzcd, tst_case_id=gridData.tst_case_id
        this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&bzcd=${bzcd}&pgm_id=${tst_case_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
      }

      // 결함등록 Column 클릭 시 결함등록팝업 호출
      if(ev.columnName === 'err_btn') {
        let cctn_id= this.$refs.grid.invoke("getValue", this.curRow, 'tst_case_id');  //연결ID
        let cctn_nm= this.$refs.grid.invoke("getValue", this.curRow, 'tst_case_nm');  //연결이름
        let cctn_bzcd= this.$refs.grid.invoke("getValue", this.curRow, 'bzcd');  // 연결업무구분
        let cctn_sqn_cd= this.$refs.grid.invoke("getValue", this.curRow, 'sqn_cd'); //연결차수구분
        let rgs_dscd= '' // 등록구분
        if(cctn_sqn_cd == '100'){
          rgs_dscd = '2100' //1차통합테스트단계
        } else if(cctn_sqn_cd == '200') {
          rgs_dscd = '2200' //2차통합테스트단계
        } else if(cctn_sqn_cd == '300') {
          rgs_dscd = '2300' //3차통합테스트단계
        } else if(cctn_sqn_cd == '400') {
          rgs_dscd = '2400' //4차통합테스트단계
        }
        let bkup_id='0000000000', prjt_id=this.info.prjt_nm_selected
        this.pop = window.open(`../PJTE3001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&cctn_id=${cctn_id}&cctn_nm=${cctn_nm}&cctn_bzcd=${cctn_bzcd}&cctn_sqn_cd=${cctn_sqn_cd}&rgs_dscd=${rgs_dscd}&`, "open_page", "width=1000, height=800");
      }

      // 그리드 내 직원조회 버튼 클릭 시 직원조회팝업
      if(ev.columnName === 'dvlpe_btn' || ev.columnName === 'pl_btn' || ev.columnName === 'crpe_btn') {
        let empnm = ''
        let prjt_id_selected = this.info.prjt_nm_selected
        let bkup_id_selected = this.info.bkup_id_selected
        if(ev.columnName === 'dvlpe_btn'){
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'dvlpe_enm')
        } else if(ev.columnName === 'pl_btn') {
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'pl_enm')
        } else if(ev.columnName === 'crpe_btn') {
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'crpe_enm')
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
    dblonClick(ev) {  // 그리드 셀 더블클릭 시 선택버튼 클릭
      this.curRow = ev.rowKey;
    },
    fnEdit(){   // 모달창에서 수정버튼 클릭 시 그리드Text 변경
      this.$refs.grid.invoke("setValue", this.curRow, "rmrk", document.getElementById("modalId").value);
      this.modals.txt_modal1 = false;
    },
    formDownload(){
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem("LOGIN_PROJ_ID"), bzcd=sessionStorage.getItem("LOGIN_BZCD"), atfl_mng_id = "0000000000", file_rgs_dscd = '901' //atfl_mng_id 값은 양식 파일 첨부 ID 추후에 추가
      this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&bzcd=${bzcd}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=500");
    },
    // TC증빙 일괄다운로드
    batchDownload(){
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem("LOGIN_PROJ_ID"), bzcd=sessionStorage.getItem("LOGIN_BZCD"), file_rgs_dscd = '100' //atfl_mng_id 값은 양식 파일 첨부 ID 추후에 추가
      this.pop = window.open(`../PJTE9003/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&bzcd=${bzcd}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=700");
    },
    fnCloseModal(){  // 모달창 닫기
      this.modals.txt_modal1 = false;
    },
    // gridfocusChange(ev) {
    //   this.$refs.grid.invoke("click", {rowkey:this.curRow}, {columnName: 'btn_popup'});
    //   this.pop = window.open("../SWZP0041/", "open_page", "width=1000, height=800");
    // },
    fnSearch() {
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    gridInit() {
      this.$refs.grid.invoke("clear");
    },
    gridAddRow() {
      this.$refs.grid.invoke("appendRow",
          {
            pgm_id: sessionStorage.getItem("pgm_id"),
            bzcd: sessionStorage.getItem("bzcd"),
            prjt_id: sessionStorage.getItem("prjt_id"),
            bkup_id: "00000000",
          },
          {focus: true});
      this.fnEnable();
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
        if(data[i].bzcd === null || data[i].bzcd === "")                   { alert("업무구분은 필수 입력 사항입니다");       return false;}
        if(data[i].scnr_id === null || data[i].scnr_id === "")             { alert("시나리오 ID는 필수 입력 사항입니다");     return false;}
        if(data[i].scnr_nm === null || data[i].scnr_nm === "")             { alert("시나리오명은 필수 입력 사항입니다");      return false;}
        if(data[i].tst_case_id === null || data[i].tst_case_id === "")     { alert("테스트케이스 ID는 필수 입력 사항입니다");  return false;}
        if(data[i].tst_case_nm === null || data[i].tst_case_nm === "")     { alert("테스트케이스 명은 필수 입력 사항입니다");  return false;}
        if(data[i].frcs_sta_dt === null || data[i].frcs_sta_dt === "")     { alert("예상시작일자는 필수 입력 사항입니다");    return false;}
        if(data[i].frcs_end_dt === null || data[i].frcs_end_dt === "")     { alert("예상종료일자는 필수 입력 사항입니다");    return false;}
        if(data[i].dvlpe_cnf_dt === null || data[i].dvlpe_cnf_dt === "")   { alert("개발자확인일자는 필수 입력 사항입니다");   return false;}
        if(data[i].rqu_sbh_id === null || data[i].rqu_sbh_id === "")       { alert("요구사항 ID는 필수 입력 사항입니다");     return false;}
        if(data[i].tst_rst === null || data[i].tst_rst === "")             { alert("테스트 결과는 필수 입력 사항입니다");     return false;}
        if(data[i].tst_achi_rst  === null || data[i].tst_achi_rst  === "") { alert("테스트 수행결과는 필수 입력 사항입니다");  return false;}
        if(data[i].atfl_mng_id  === null || data[i].atfl_mng_id  === "")   { alert("첨부파일관리 ID는 필수 입력 사항입니다");  return false;}
        if(data[i].bkup_id  === null || data[i].bkup_id  === "")           { alert("백업 ID는 필수 입력 사항입니다");         return false;}
        if(data[i].prjt_id  === null || data[i].prjt_id  === "")           { alert("프로젝트 ID는 필수 입력 사항입니다");      return false;}

      }

      return  true;
    },
    onGridUpdated(grid){
      this.$refs.grid.invoke("addColumnClassName", "rmrk", "disableColor");
      this.$refs.grid.invoke("addColumnClassName", "dvlpe_btn", "empBtnColor");
      this.$refs.grid.invoke("addColumnClassName", "pl_btn", "empBtnColor");
      this.$refs.grid.invoke("addColumnClassName", "crpe_btn", "empBtnColor");
    },
    fnEnable() {
      // 새로 ADD한 Row를 enable시킴
      this.NewRow = this.$refs.grid.invoke("getRowCount");
      this.$refs.grid.invoke("enableRow", this.NewRow-1, {withCheckbox: true});
    },
    gridDelRow() {
      this.$refs.grid.invoke("removeCheckedRows", this.curRow, {showConfirm: false});
      // DB 데이터 삭제로직 추가
    },
    gridExcelExport() {
      this.$refs.grid.invoke("export", "xlsx",{fileName: "엑셀다운로드",useFormattedValue : true} );
    },
    gridExcelImport(event) {
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
          if (sheetName === '통합테스트' || sheetName === 'Sheet1') {
            try {
              console.log(wb.Sheets[sheetName])
              wb.Sheets[sheetName].A1.w = "NO"
              wb.Sheets[sheetName].B1.w = "bzcd"
              wb.Sheets[sheetName].C1.w = "sqn_cd"
              wb.Sheets[sheetName].D1.w = "scnr_id"
              wb.Sheets[sheetName].E1.w = "scnr_nm"
              wb.Sheets[sheetName].F1.w = "tst_case_id"
              wb.Sheets[sheetName].G1.w = "tst_case_nm"
              wb.Sheets[sheetName].H1.w = "itg_tst_prc_cd"
              let I1 = {
                I1: {
                  t: 's',
                  v: '사번',
                  r: '<t>사번</t><phoneticPr fontId="1" type="noConversion"/>',
                  h: '사번',
                  w: 'crpe_no'
                }
              }
              wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], I1)
              wb.Sheets[sheetName].I2.w = "frcs_sta_dt"
              let J1 = {
                J1: {
                  t: 's',
                  v: '사번',
                  r: '<t>사번</t><phoneticPr fontId="1" type="noConversion"/>',
                  h: '사번',
                  w: 'crpe_no'
                }
              }
              wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], J1)
              wb.Sheets[sheetName].J2.w = "frcs_end_dt"
              wb.Sheets[sheetName].K1.w = "dvlpe_cnf_dt"
              wb.Sheets[sheetName].L1.w = "pl_cnf_dt"
              let M1 = {
                M1: {
                  t: 's',
                  v: '명',
                  r: '<t>명</t><phoneticPr fontId="1" type="noConversion"/>',
                  h: '명',
                  w: 'dvlpe_enm'
                }
              }
              wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], M1)
              wb.Sheets[sheetName].M2.w = "dvlpe_enm"
              wb.Sheets[sheetName].N2.w = "dvlpe_btn"
              let O1 = {
                O1: {
                  t: 's',
                  v: '사번',
                  r: '<t>사번</t><phoneticPr fontId="1" type="noConversion"/>',
                  h: '사번',
                  w: 'dvlpe_eno'
                }
              }
              wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], O1)
              wb.Sheets[sheetName].O2.w = "dvlpe_eno"
              let P1 = {
                P1: {
                  t: 's',
                  v: 'PL',
                  r: '<t>PL</t><phoneticPr fontId="1" type="noConversion"/>',
                  h: 'PL',
                  w: 'PL'
                }
              }
              wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], P1)
              wb.Sheets[sheetName].P2.w = "pl_enm"
              wb.Sheets[sheetName].Q2.w = "pl_btn"
              let R1 = {
                R1: {
                  t: 's',
                  v: '사번',
                  r: '<t>사번</t><phoneticPr fontId="1" type="noConversion"/>',
                  h: '사번',
                  w: 'pl_eno'
                }
              }
              wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], R1)
              wb.Sheets[sheetName].R2.w = "pl_eno"
              let S1 = {
                S1: {
                  t: 's',
                  v: '명',
                  r: '<t>명</t><phoneticPr fontId="1" type="noConversion"/>',
                  h: '명',
                  w: 'crpe_enm'
                }
              }
              wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], S1)
              wb.Sheets[sheetName].S2.w = "crpe_enm"
              wb.Sheets[sheetName].T2.w = "crpe_btn"
              let U1 = {
                U1: {
                  t: 's',
                  v: '사번',
                  r: '<t>사번</t><phoneticPr fontId="1" type="noConversion"/>',
                  h: '사번',
                  w: 'crpe_eno'
                }
              }
              wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], U1)
              wb.Sheets[sheetName].U2.w = "crpe_eno"
              wb.Sheets[sheetName].V1.w = "atfl_mng_id_yn"
              wb.Sheets[sheetName].W2.w = "err_tot_cnt"
              wb.Sheets[sheetName].X2.w = "err_cmpl_cnt"
              wb.Sheets[sheetName].Y2.w = "err_ncmpl_cnt"
              wb.Sheets[sheetName].Z2.w = "err_btn"
              wb.Sheets[sheetName].AA1.w = "rmrk"
              wb.Sheets[sheetName].AB1.w = "pgm_id"
              wb.Sheets[sheetName].AC1.w = "scrn_id"
              wb.Sheets[sheetName].AD1.w = "trn_cd"
              wb.Sheets[sheetName].AE1.w = "rqu_sbh_id"
              wb.Sheets[sheetName].AF1.w = "prr_cnd"
              wb.Sheets[sheetName].AG1.w = "inp_val"
              wb.Sheets[sheetName].AH1.w = "tst_des"
              wb.Sheets[sheetName].AI1.w = "oup_val"
              wb.Sheets[sheetName].AJ1.w = "tp"
              wb.Sheets[sheetName].AK1.w = "oup_mens"
              wb.Sheets[sheetName].AL1.w = "tst_achi_rst"

              let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
              let rowObj_copy = [];
              for (let n = 1; n < rowObj.length; n++) {
                rowObj_copy[n - 1] = rowObj[n];
              }
              gridExcelData = JSON.parse(JSON.stringify(rowObj_copy));
              console.log("gridExcelData ::", gridExcelData)
              this.excelUplod = 'Y'
              alert('업로드 파일이 적용되었습니다.')
              this.$refs.grid.invoke('resetData', gridExcelData)
              this.gridData = this.$refs.grid.invoke("getData");
            } catch (e) {
              alert('업로드 실패')
            }
          }

        })
      };
      reader.readAsBinaryString(input.files[0]);
      event.target.value = '';
    },

    //엔터키를 눌러 직원 조회
    open_pjte9001(btn_id) {
      let empnm = ''
      let prjt_id_selected = this.info.prjt_nm_selected
      let bkup_id_selected = this.info.bkup_id_selected
      if (btn_id == '1') {
        empnm = this.info.dvlpe_enm
      } else if (btn_id == '2') {
        empnm = this.info.pl_enm
      } else if (btn_id == '3') {
        empnm = this.info.crpe_enm
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
                  this.info.dvlpe_eno = res.data.data.contents[0].empno
                  this.info.dvlpe_enm = res.data.data.contents[0].empnm
                } else if (btn_id == '2') {
                  this.info.pl_eno = res.data.data.contents[0].empno
                  this.info.pl_enm = res.data.data.contents[0].empnm
                } else if (btn_id == '3') {
                  this.info.crpe_eno = res.data.data.contents[0].empno
                  this.info.crpe_enm = res.data.data.contents[0].empnm
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
    //직원조회 버튼 클릭 시
    open_pjte9001_btn(btn_id) {
      let empnm = ''
      if (btn_id == '1') {
        empnm = this.info.dvlpe_enm
      } else if (btn_id == '2') {
        empnm = this.info.pl_enm
      } else if (btn_id == '3') {
        empnm = this.info.crpe_enm
      }
      if((empnm === '' || empnm == null || empnm === undefined)) {
        let bkup_id = this.info.bkup_id_selected, prjt_id =  this.info.prjt_nm_selected
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      } else {
        let bkup_id = this.info.bkup_id_selected, prjt_id =  this.info.prjt_nm_selected
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      }
    }
  },
  // 특정 데이터에 실행되는 함수를 선언하는 부분
  // newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch: {
    atfl_mng_id(){    // 단위테스트 케이스 변경 시 작동
      if(this.atfl_mng_id_yn !== '') {
        this.$refs.grid.invoke("setValue", this.curRow, 'atfl_mng_id_yn', '첨부');
        this.$refs.grid.invoke("setValue", this.curRow, 'atfl_mng_id', this.atfl_mng_id);
      }
    },
  },
  // 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C27","C0","C1","C4","C6","C26"],

      atfl_mng_id         : '',  // 단위테스트 케이스 첨부파일관리
      atfl_mng_id_yn      : '',  // 단위테스트 케이스 첨부파일관리
      pal_atfl_mng_id     : '',  // 설계서 첨부파일관리
      pal_atfl_mng_id_yn  : '',  // 설계서 첨부파일관리

      excelUplod: 'N',           // 엑셀 업로드
      validated: false,

      info: {
        scnr_id      : this.scnr_id,         // 시나리오 ID
        tst_case_id  : this.tst_case_id,     // 테스트케이스 ID
        dvlpe_eno    : this.dvlpe_eno,       // 개발자번호
        dvlpe_enm    : this.dvlpe_enm,       // 개발자명
        pl_eno       : this.pl_eno,          // 담당 PL번호
        pl_enm       : this.pl_enm,           // 담당 PL명
        crpe_eno     : this.crpe_eno,        // 담당현업명
        crpe_enm     : this.crpe_enm,        // 담당현업명
        rqu_sbh_id   : this.rqu_sbh_id,      // 요구사항 ID

        prjt_nm_selected         : sessionStorage.getItem("LOGIN_PROJ_ID"),
        bkup_id_selected         : '0000000000',
        bzcd_selected            : sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600' ? 'TTT':sessionStorage.getItem("LOGIN_BZCD"),
        sqn_cd_selected          : 'TTT',
        pgm_dis_cd_selected      : 'TTT',
        itg_tst_prc_cd_selected  : 'TTT',

        frcs_end_dt01: '',        // 예상종료일자 (시작)
        frcs_end_dt02: '',        // 예상종료일자 (종료)
        dvlpe_cnf_dt01: '',      // 개발자확인일자 (시작)
        dvlpe_cnf_dt02: '',      // 개발자확인일자 (종료)

      },
      updatedRows: this.updatedRows,
      deletedRows: this.deletedRows,
      createdRows: this.createdRows,

      /* 그리드 상세보기 모달 속성 */
      modals: {
        txt_modal1: false,
      },
      modalTxt:this.modalTxt,

      addRow: {
        grid: this.grid,
      },

      frcs_sta_dt: '',    // 예상시작일자
      frcs_end_dt: '',    // 예상종료일자
      sta_dt: '',         // 실제시작일자
      end_dt: '',         // 실제종료일자

      check_Yn: false,    // 삭제프로그램/소스취약점포함

      count: 0,
      curRow: -1,
      title: "",
      scrollX: false,
      scrollY: false,
      bodyHeight: 635,
      rowHeight: 25,
      minRowHeight: 10,
      showDummyRows: false,
      open: false,
      editingEvent: 'click',
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE2200/select', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE2200/create', method: 'POST'},
          updateData : { url: process.env.VUE_APP_API + '/PJTE2200/update', method: 'PUT'},
        },
        initialRequest: false,
        contentType: 'application/json;',
        headers: {'x-custom-header': 'custom-header'},
        withCredentials: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders: ['rowNum'],
      header: {
        height: 45,
        complexColumns: [
          {header: '결함건수',  name: 'mergeColumn1', childNames: ['col19', 'col20', 'col21']},
          {header: '테스트계획', name: 'mergeColumn2', childNames: ['frcs_sta_dt', 'frcs_end_dt']},
          {header: '결함',      name: 'mergeColumn3', childNames: ['err_tot_cnt', 'err_cmpl_cnt','err_ncmpl_cnt','err_btn']},
          {header: '개발자',     name: 'mergeColumn4', childNames: ['dvlpe_enm', 'dvlpe_btn','dvlpe_eno']},
          {header: 'PL',        name: 'mergeColumn5', childNames: ['pl_enm', 'pl_btn','pl_eno']},
          {header: '담당현업',   name: 'mergeColumn6', childNames: ['crpe_enm', 'crpe_btn','crpe_eno']},
          {header: '통합테스트',   name: 'mergeColumn7', childNames: ['atfl_mng_id_yn']},
        ]
      },
      columns: [
        {
          header: '업무구분',
          width: 100,
          minWidth: 50,
          maxWidth: 250,
          align: 'center',
          name: 'bzcd',
          formatter: 'listItemText',
          disabled: true,
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000001N
            }
          }
        },
        {
          header: '차수',
          width: 50,
          align: 'center',
          name: 'sqn_cd',
          formatter: 'listItemText',
          disabled: true,
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000006N
            }
          }
        },
        {
          header: '시나리오ID',
          width: 80,
          align: 'center',
          name: 'scnr_id',
        },
        {
          header: '시나리오명',
          width: 200,
          align: 'left',
          name: 'scnr_nm',
          editor: 'text'
        },
        {
          header: '테스트케이스ID',
          width: 130,
          align: 'center',
          name: 'tst_case_id',
        },
        {
          header: '테스트케이스명',
          width: 200,
          align: 'left',
          name: 'tst_case_nm',
        },
        {
          header: '처리단계',
          width: 110,
          align: 'center',
          name: 'itg_tst_prc_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000026N
            }
          }
        },
        {
          header: '예상시작일',
          width: 90,
          align: 'center',
          name: 'frcs_sta_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '예상종료일',
          width: 90,
          align: 'center',
          type: 'date',
          name: 'frcs_end_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '개발자확인일',
          width: 90,
          align: 'center',
          name: 'dvlpe_cnf_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: 'PL확인일',
          width: 90,
          align: 'center',
          name: 'pl_cnf_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: '이름',
          width: 50,
          align: 'center',
          name: 'dvlpe_enm',
          editor: 'text',
        },
        {
          header: '검색',
          width: 35,
          minWidth: 10,
          align: 'center',
          name: 'dvlpe_btn',
          renderer: SearchBtn,
        },
        {
          header: '번호',
          width: 80,
          align: 'center',
          name: 'dvlpe_eno',
        },
        {
          header: '이름',
          width: 50,
          align: 'center',
          name: 'pl_enm',
          editor: 'text',
        },
        {
          header: '검색',
          width: 35,
          minWidth: 10,
          align: 'center',
          name: 'pl_btn',
          renderer: SearchBtn,
        },
        {
          header: '번호',
          width: 80,
          align: 'center',
          name: 'pl_eno',
        },
        {
          header: '이름',
          width: 50,
          align: 'center',
          name: 'crpe_enm',
          editor: 'text',
        },
        {
          header: '검색',
          width: 35,
          minWidth: 10,
          align: 'center',
          name: 'crpe_btn',
          renderer: SearchBtn,
        },
        {
          header: '번호',
          width: 80,
          align: 'center',
          name: 'crpe_eno',
        },
        {
          header: '증빙첨부',
          width: 80,
          align: 'center',
          name: 'atfl_mng_id_yn',
          // hidden : true,
          defaultValue: '미첨부',
        },
        {
          header: '증빙첨부',
          width: 100,
          align: 'center',
          name: 'atfl_mng_id',
          hidden : true
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
          header: '미완료',
          width: 40,
          align: 'right',
          name: 'err_ncmpl_cnt',
        },
        {
          header: '등록',
          width: 40,
          name: 'err_btn',
          align: 'center',
          renderer: CustomRenderer,
        },
        {
          header: '미진사유',
          width: 400,
          name: 'rmrk',
        },
        {
          header: '프로그램ID',
          width: 120,
          name: 'pgm_id',
          editor: "text",
        },
        {
          header: '화면ID',
          width: 100,
          name: 'scrn_id',
          editor: "text",
        },
        {
          header: '거래코드',
          width: 90,
          name: 'trn_cd',
          editor: "text",
        },
        {
          header: '요구사항ID',
          width: 100,
          name: 'rqu_sbh_id',
          editor: "text",
        },
        {
          header: '사전조건',
          width: 90,
          name: 'prr_cnd',
          editor: "text",
        },
        {
          header: '입력값',
          width: 90,
          name: 'inp_val',
          editor: "text",
        },
        {
          header: '테스트설명/절차',
          width: 130,
          name: 'tst_des',
          editor: "text",
        },
        {
          header: '출력값',
          width: 90,
          name: 'oup_val',
          editor: "text",
        },
        {
          header: '유형',
          width: 90,
          name: 'tp',
          editor: "text",
        },
        {
          header: '출력수단',
          width: 150,
          name: 'oup_mens',
          editor: "text",
        },
        {
          header: '테스트결과',
          width: 100,
          name: 'oup_mens',
          editor: "text",
        },
        {
          header: '테스트수행결과',
          width: 100,
          name: 'tst_achi_rst',
          editor: "text",
        },
        {
          header: '백업ID',
          width: 100,
          name: 'bkup_id',
          hidden : true,
        },
        {
          header: '프로젝트ID',
          width: 100,
          name: 'prjt_id',
          hidden : true,
        },
      ],
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
