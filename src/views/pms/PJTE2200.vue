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
              <button class="menu-group" type="button" data-toggle="collapse" data-target="#collapseOne"
                      aria-expanded="true" aria-controls="collapseOne">
                PMS
              </button>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
              <ul class="card-body">
                <li><a href="/PJTE1000">{{ menu_list[0].name }}</a></li>
                <li><a href="/PJTE2100">{{ menu_list[1].name }}</a></li>
                <li><a href="/PJTE2110">{{ menu_list[2].name }}</a></li>
                <li class="active"><a href="/PJTE2200">{{ menu_list[3].name }}</a></li>
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
                        @click="open_pjte9001(1)"
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
                        @click="open_pjte9001(2)"
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
                        @click="open_pjte9001(3)"
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
            <div class="btn btn-filter-d">
              <a href="#" @click="gridExcelExport">TC증빙 일괄다운로드ⓘ</a>
            </div>
            <div class="btn btn-filter-d">
              <a href="#" @click="formDownload">양식다운로드ⓘ</a>
            </div>
            <div class="btn btn-filter-e">
              <a href="#" @click="gridExcelExport">엑셀업로드</a>
            </div>
            <div class="btn btn-filter-e">
              <a href="#" @click="gridExcelExport">엑셀다운로드</a>
            </div>
            <div class="btn btn-filter-b">
              <a href="#" @click="fnEtcSave">기타항목수정</a>
            </div>
            <div class="btn btn-filter-p" style="margin-left: 20px">
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
              :rowHeight="rowHeight"
              :rowHeaders="rowHeaders"
              @click="onClick"
              @dblclick="dblonClick"
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


//그리드 아이템 예제
var listItem = [{text: "개발", value: "1"}, {text: "운영", value: "2"}, {text: "이관", value: "3"}];

// 업무구분
const bzcd = [
  {"text":" ","value":"NNN"},
  {text: "업무팀", value: '100'},
  {text: "공통팀", value: "200"},
  {text: "PMO", value: "300"},
];

// 통합테스트처리코드 (처리단계)
const itg_tst_prc_cd = [
  {"text":" ","value":"NNN"},
  {text: "테스트전", value: "000"},
  {text: "테스트시작", value: "100"},
  {text: "테스트자완료", value: "200"},
  {text: "PL확인", value: "300"},
  {text: "담당자확인", value: "400"},
  {text: "현업확인", value: "500"},
  {text: "테스트완료", value: "600"}
];
// 유형
const tp = [
  {"text":" ","value":"NNN"},
  {text: "화면", value: "100"},
  {text: "프로그램", value: "200"},
  {text: "보고서", value: "300"},
  {text: "배치", value: "400"}
];
// 차수구분
const sqn_cd = [
  {text: " ", value: "NNN"},
  {text: "1차수", value: "100"},
  {text: "2차수", value: "200"},
  {text: "3차수", value: "300"},
  {text: "4차수", value: "400"},
];
export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    Modal,
    WindowPopup,
    grid: Grid,
  },
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
    this.init();
    this.fnSearch();    // 최초조회
    // this.setColumns();  // 권한에 따른 컬럼 세팅
    window.pms_register = this;
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
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
    bkup_id_change(params) {this.info.bkup_id_selected = params},
    prjt_nm_chage(params) {this.info.prjt_nm_selected = params},
    bzcd_change(params) {this.info.bzcd_selected = params},
    sqn_cd_change(params) {this.info.sqn_cd_selected = params},
    pgm_dis_cd_change(params) {this.info.pgm_dis_cd_selected = params},
    itg_tst_prc_cd_change(params) {this.info.itg_tst_prc_cd_selected = params},

    // setColumns() {    // 권한에 따른 컬럼 세팅
    //   if (sessionStorage.getItem("aut_cd") === '100') {
    //     this.$refs.grid.invoke("disableColumn", 'frcs_end_dt');
    //   } else if (sessionStorage.getItem("aut_cd") === '500') {
    //     this.$refs.grid.invoke("disableColumn", 'frcs_sta_dt');
    //   } else {
    //     this.$refs.grid.invoke("disableColumn", 'frcs_sta_dt');
    //   }
    // },
    init() {
      if(sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600'){
        // 특정 열 비활성화
        this.$refs.grid.invoke("disableColumn", 'frcs_sta_dt');
        this.$refs.grid.invoke("disableColumn", 'frcs_end_dt');
      }
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
            this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.createdRows));
            // create api 요청
            this.$refs.grid.invoke("request", "createData", {showConfirm: false});
            alert("저장이 완료되었습니다.")
            this.$refs.grid.invoke("reloadData");
          } catch (e){
            console.log(e);
          }
        }
        // 저장 후 변경 데이터 배열 비움
        this.$refs.grid.invoke("clearModifiedData")
        this.$refs.grid.invoke("reloadData");
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
            this.$refs.grid.invoke("reloadData");
          } catch (e) {
            console.log("업데이트 오류 ::", e);
          }
        }
      }
      // 저장 후 변경 데이터 배열 비움
      this.$refs.grid.invoke("clearModifiedData")
      this.$refs.grid.invoke("reloadData");
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

    onClick(ev) {
      this.curRow = ev.rowKey;
      let gridData = this.$refs.grid.invoke("getRow",this.curRow);
      this.$refs.grid.invoke("getRow", this.curRow);
// grid 셀 클릭 시 윈도우 팝업 호출(함수화예정)
      if(ev.columnName === 'atfl_mng_id_yn') {
        let bkup_id='0000000000', prjt_id=gridData.prjt_id, atfl_mng_id=gridData.atfl_mng_id != null?gridData.atfl_mng_id:'', file_rgs_dscd='101', bzcd = gridData.bzcd, tst_case_id=gridData.tst_case_id
        this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&pgm_id=${tst_case_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
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
        let prjt_id_selected = this.info.prjt_nm_selected
        if(ev.columnName === 'dvlpe_btn'){
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'dvlpe_enm')
        } else if(ev.columnName === 'pl_btn') {
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'pl_enm')
        } else if(ev.columnName === 'crpe_btn') {
          empnm = this.$refs.grid.invoke("getValue", this.curRow, 'crpe_enm')
        }

        if (empnm != null && empnm != '') {
          axiosService.get("/PJTE9001/select", {
            params: {
              empnm,
              prjt_id_selected
            }
          })
              .then(res => {
                let res_data = res.data.data.contents;
                // console.log(res_data)
                if (res_data.length == 1) {  // 입력한 직원명으로 조회한 값이 단건일 경우 : 직원번호 바인딩
                  if (ev.columnName == 'dvlpe_btn') {
                    this.$refs.grid.invoke("setValue", this.curRow, 'dvlpe_eno', res.data.data.contents[0].empno);
                  } else if (ev.columnName == 'pl_btn') {
                    this.$refs.grid.invoke("setValue", this.curRow, 'pl_eno', res.data.data.contents[0].empno);
                  } else if (ev.columnName == 'crpe_btn') {
                    this.$refs.grid.invoke("setValue", this.curRow, 'crpe_eno', res.data.data.contents[0].empno);
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
    dblonClick(ev) {  // 그리드 셀 더블클릭 시 선택버튼 클릭
      this.curRow = ev.rowKey;
      if(ev.columnName === 'tst_case_nm') {
        this.pop = window.open("../PJTE3001/", "open_page", "width=1000, height=800");
      }
    },
    fnEdit(){   // 모달창에서 수정버튼 클릭 시 그리드Text 변경
      this.$refs.grid.invoke("setValue", this.curRow, "rmrk", document.getElementById("modalId").value);
      this.modals.txt_modal1 = false;
    },
    formDownload(){
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem("LOGIN_PROJ_ID"), atfl_mng_id = "0000000000", file_rgs_dscd = '902' //atfl_mng_id 값은 양식 파일 첨부 ID 추후에 추가
      this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}}`, "open_file_page", "width=1000, height=500");
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

        if(data[i].atfl_mng_id === null)  { alert("단위테스트결과서 첨부파일관리ID는 필수 입력 사항입니다");   return false;}
        if(data[i].pal_atfl_mng_id === null)  { alert("설계서 첨부파일관리ID는 필수 입력 사항입니다");   return false;}
      }

      return  true;
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
      this.$refs.grid.invoke("export", "xlsx",{fileName: "엑셀다운로드"}, {useFormattedValue : true} );
    },
    gridExcelImport() {
      // 엑셀파일 업로드 로직 추가
      this.$refs.grid.invoke("import", "xlsx", {fileName: "엑셀업로드"});
    },
    open_page() {
      this.pop = window.open("../PJTE3001/", "open_page", "width=1000, height=800");
    },
    open_pjte9001(btn_id) {
      let empnm = ''
      let prjt_id_selected = this.info.prjt_nm_selected
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
            prjt_id_selected
          }
        })
            .then(res => {
              let res_data = res.data.data.contents;
              // console.log(res_data)
              if (res_data.length == 1) {  // 입력한 직원명으로 조회한 값이 단건일 경우 : 직원번호 바인딩
                if (btn_id == '1') {
                  this.info.dvlpe_eno = res.data.data.contents[0].empno
                } else if (btn_id == '2') {
                  this.info.pl_eno = res.data.data.contents[0].empno
                } else if (btn_id == '3') {
                  this.info.crpe_eno = res.data.data.contents[0].empno
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
    }
  },
  // 특정 데이터에 실행되는 함수를 선언하는 부분
  // newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch: {
    /* 직원조회 팝업에서 받아온 값으로 emp_btn_id값이 바뀔 때
       버튼 id에 따라 직원명, 직원번호 값을 넣는다*/
    emp_btn_id() {  // 필터에 있는 직원조회 팝업 (btn_id로 구분)
      if(this.emp_btn_id == '1'){       // 개발자명
        this.info.dvlpe_eno = this.emp_no
        this.info.dvlpe_enm = this.emp_nm
      }else if(this.emp_btn_id == '2'){ // 담당PL
        this.info.pl_eno = this.emp_no
        this.info.pl_enm = this.emp_nm
      } else if(this.emp_btn_id == '3'){ // 담당현업
        this.info.crpe_eno = this.emp_no
        this.info.crpe_enm = this.emp_nm
      }
    },
    /*watch에서 emp_rowKey가 변경되거나 emp_colName의 값이 변경되었을 때
     버튼에 따라 직원명과 직원번호를 입력한다.*/
    emp_rowKey() {  // 그리드에 있는 직원조회 팝업 (emp_colName과 emp_rowKey로 구분)
      if(this.emp_colName == 'dvlpe_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'dvlpe_eno', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'dvlpe_enm', this.emp_nm);
      } else if(this.emp_colName == 'pl_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'pl_eno', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'pl_enm', this.emp_nm);
      } else if(this.emp_colName == 'crpe_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'crpe_eno', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'crpe_enm', this.emp_nm);
      }
    },
    emp_colName() {  // 그리드에 있는 직원조회 팝업 (emp_colName과 emp_rowKey로 구분)
      if(this.emp_colName == 'dvlpe_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'dvlpe_eno', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'dvlpe_enm', this.emp_nm);
      } else if(this.emp_colName == 'pl_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'pl_eno', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'pl_enm', this.emp_nm);
      } else if(this.emp_colName == 'crpe_btn') {
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'crpe_eno', this.emp_no);
        this.$refs.grid.invoke("setValue", this.emp_rowKey, 'crpe_enm', this.emp_nm);
      }
    },
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
      bodyHeight: 630,
      rowHeight: 25,
      minRowHeight: 10,
      showDummyRows: true,
      open: false,
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
          {header: '결함',      name: 'mergeColumn3', childNames: ['err_tot_cnt', 'err_cmpl_cnt','err_ncmpl_cnt']},
          {header: '개발자',     name: 'mergeColumn4', childNames: ['dvlpe_enm', 'dvlpe_btn','dvlpe_eno'], hideChildHeaders : true},
          {header: 'PL',        name: 'mergeColumn5', childNames: ['pl_enm', 'pl_btn','pl_eno'], hideChildHeaders : true},
          {header: '담당현업',   name: 'mergeColumn6', childNames: ['crpe_enm', 'crpe_btn','crpe_eno'], hideChildHeaders : true},
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
              listItems: bzcd,
            }
          }
        },
        {
          header: '차수',
          width: 70,
          align: 'center',
          name: 'sqn_cd',
          formatter: 'listItemText',
          disabled: true,
          editor: {
            type: 'select',
            options: {
              listItems: sqn_cd
            }
          }
        },
        {
          header: '시나리오ID',
          width: 100,
          align: 'center',
          name: 'scnr_id',
          editor: 'text'
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
          width: 130,
          align: 'center',
          name: 'itg_tst_prc_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: itg_tst_prc_cd
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
          width: 80,
          align: 'center',
          name: 'dvlpe_enm',
          editor: 'text',
        },
        {
          header: '개발자',
          width: 60,
          align: 'center',
          name: 'dvlpe_btn',
          renderer: SearchBtn,
        },
        {
          header: '개발자',
          width: 80,
          align: 'center',
          name: 'dvlpe_eno',
          editor: 'text',
        },
        {
          header: 'PL명',
          width: 80,
          align: 'center',
          name: 'pl_enm',
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
          name: 'pl_eno',
        },
        {
          header: '담당자명',
          width: 80,
          align: 'center',
          name: 'crpe_enm',
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
          name: 'crpe_eno',
        },
        {
          header: '증빙첨부',
          width: 150,
          align: 'center',
          name: 'atfl_mng_id_yn',
          // hidden : true,
          defaultValue: '미첨부',
        },
        {
          header: '증빙첨부',
          width: 150,
          align: 'center',
          name: 'atfl_mng_id',
          hidden : true
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
          header: '미완료',
          width: 80,
          align: 'right',
          name: 'err_ncmpl_cnt',
        },
        {
          header: '결함등록',
          width: 120,
          name: 'err_btn',
          align: 'center',
          renderer: CustomRenderer,
        },
        {
          header: '미진사유',
          width: 400,
          name: 'rmrk',
          editor: "text",
        },
        {
          header: '프로그램ID',
          width: 200,
          name: 'pgm_id',
          editor: "text",
        },
        {
          header: '화면ID',
          width: 140,
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
          width: 150,
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
</style>
