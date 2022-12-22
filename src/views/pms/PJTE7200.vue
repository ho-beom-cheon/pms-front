<template>
  <!-- CONTENTS -->
  <div class="contents">
    <div class="div-img"></div>
    <!-- ASIDE -- LNB -->
    <PmsSideBar></PmsSideBar>
    <!-- 컨텐츠 영역 -->
    <div class="contents-body">
      <!-- 필터영역 -->
      <section class="filter">
        <ul class="filter-con clear-fix">
          <combo
              :comboArray = "this.comboList"
              @prjt_nm_chage="prjt_nm_chage"
              @bkup_id_change="bkup_id_change"
              hidden="false"
          ></combo>
          <li class="filter-item">
            <div class="input-dateWrap">요청일자
              <input  type="date"
                      style="width: 125px"
                      v-model="info.rqs_dt"
              >
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">배포일시
              <input  type="text"
                      style="width: 125px"
                      v-model="info.rls_dt"
              >
            </div>
          </li>
          <combo
              :comboArray2= "this.comboList2"
              @dstr_change="dstr_change"
          ></combo>
          <li class="filter-item-n">
            <div class="input-searchWrap">요청자
              <input type="text"
                     placeholder="직원명"
                     v-model="info.rqs_nm"
                     style="width: 90px"
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
                   v-model="info.rqs_no"
                   style="width: 90px; background-color: #f2f2f2;"
                   :disabled=true
            >
          </li>
          <li class="filter-item-n">
            <div class="input-searchWrap">검토자
              <input type="text"
                     placeholder="직원명"
                     v-model="info.rvw_nm"
                     style="width: 90px"
                     @keyup.enter="open_pjte9001(2)"
              >
              <button class="search-btn" @click="open_pjte9001_btn(2)"></button>
            </div>
          </li>
          <li class="filter-item">
            <input type="text"
                   placeholder="직원번호"
                   v-model="info.rvw_no"
                   style="width: 90px; background-color: #f2f2f2;"
                   :disabled=true
            >
          </li>
          <li class="filter-item-n">
            <div class="input-searchWrap">승인자
              <input type="text"
                     placeholder="직원명"
                     v-model="info.aprv_nm"
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
                   v-model="info.aprv_no"
                   style="width: 90px; background-color: #f2f2f2;"
                   :disabled=true
            >
          </li>
          <li class="filter-item">
            <div class="item-con">
              <input type="checkbox" id="cmpl_yn" v-model="cmpl_yn">
              <label>　완료건 포함</label>
            </div>
          </li>
        </ul>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box" style="height: 250px">
          <div class="div-header">
            <ul class="filter-btn">
              <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
              <button class="btn btn-filter-p" style="margin-left: 10px" @click="fnSearch">조회</button>
            </ul>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid"
                :data="dataSource"
                :header="header"
                :columns="columns"
                :minBodyHeight="55"
                :bodyHeight="155"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeaders="rowHeaders"
                :rowHeight="rowHeight"
                @click="onClick"
            ></grid>
          </div>
        </div>
<!-- 요청정보 -->
        <div class="grid1-box" style="height: 100%">
          <div class="div-header-b"><h2>요청정보</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-b" style="margin-left: 20px" @click="fnClear">초기화</button>
            </ul>
          </div>
          <section class="filter">
            <ul class="filter-con clear-fix" style="width: 100%; margin-left:9px">
              <li class="filter-item">
                <div class="item-con" >요청ID
                  <input type="text"
                         id      = "as_pgm_id"
                         v-model="detail.rqs_id"
                         style= "width: 180px; margin-left: 5px; background-color: #f2f2f2;"
                         :disabled=true
                  >
                </div>
              </li>
              <li class="filter-item">
                <div class="item-con">요청일자
                  <input type="date"
                         v-model="detail.rqs_dt"
                         style= "width: 150px; margin-left: 5px; background-color: #f2f2f2;"
                         :disabled=true
                  >
                </div>
              </li>
              <li class="filter-item">
                <div class="item-con" >배포일시
                  <input type="text"
                         ref="address"
                         v-model="detail.rls_dt"
                         style="width: 150px; margin-left: 5px;"
                  >
                </div>
              </li>
              <combo
                  :comboArray3 = "this.comboList3"
                  @prcs_stts_cd_change="prcs_stts_cd_change"
                  @dstr_change="dstr_change"
              ></combo>
            </ul>
            <ul class="filter-con clear-fix" style="width: 100%; margin-left:10px">
              <li class="filter-item-n" >
                <div class="input-searchWrap">요청자
                  <input type="text"
                         placeholder="직원명"
                         v-model="detail.rqs_nm"
                         style="width: 90px; margin-left:5px"
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
                       v-model="detail.rqs_no"
                       style="width: 90px; background-color: #f2f2f2;"
                       :disabled=true
                >
              </li>
              <li class="filter-item-n">
                <div class="input-searchWrap">검토자
                  <input type="text"
                         placeholder="직원명"
                         v-model="detail.rvw_nm"
                         style="width: 90px; margin-left:5px"
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
                       v-model="detail.rvw_no"
                       style="width: 90px; background-color: #f2f2f2;"
                       :disabled=true
                >
              </li>
              <li class="filter-item-n">
                <div class="input-searchWrap">승인자
                  <input type="text"
                         placeholder="직원명"
                         v-model="detail.aprv_nm"
                         style="width: 90px; margin-left:5px"
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
                       v-model="detail.aprv_no"
                       style="width: 90px; background-color: #f2f2f2;"
                       :disabled=true
                >
              </li>
            </ul>
            <ul class="filter-con clear-fix">
              <li class="filter-item" style="width: 100%">
                <div class="item-con">
                  <th style="vertical-align: middle;text-align: right">
                    <label>요청사유</label>
                  </th>
                  <td>
                      <textarea cols="270"
                                rows="4"
                                placeholder="요청사유를 입력해주세요"
                                v-model="detail.req_res"
                                style="width: 100%; margin-left: 7px"
                      ></textarea>
                  </td>
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix">
              <li class="filter-item" style="width: 100%">
                <div class="item-con">
                  <th style="vertical-align: middle;text-align: right ;width: 44px">
                    <label>비고</label>
                  </th>
                  <td>
                      <textarea cols="260"
                                rows="4"
                                placeholder="비고내용을 입력해주세요"
                                v-model="detail.rmrk"
                                style="width: 100%; margin-left: 7px"
                      ></textarea>
                  </td>
                </div>
              </li>
            </ul>
          </section>

        </div>
        <section class="page-contents">
          <div class="grid1-box" style="height: 270px">
            <div class="div-header"><h2>배포목록</h2>
              <ul class="filter-btn">
                <button class="btn btn-filter-e" >
                  <label for="file">엑셀업로드</label>
                  <input type="file" id="file"  @change="gridExcelImport"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="display: none;">
                </button>
                <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
              </ul>
            </div>
            <div class="gridWrap" style="min-width: 750px;">
              <grid
                  ref="grid2"
                  :data="dataSource2"
                  :header="header2"
                  :columns="columns2"
                  :minBodyHeight="55"
                  :bodyHeight="175"
                  :minRowHeight="minRowHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions2"
                  :rowHeaders="rowHeaders2"
                  :rowHeight="rowHeight"
              ></grid>
            </div>
          </div>
        </section>
        <br>
        <br>
        <br>
        <br>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import Combo from "@/components/Combo"
import { Grid } from '@toast-ui/vue-grid';
import PmsSideBar from  "@/components/PmsSideBar";
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http";
import XLSX from "xlsx";

// 직원조회 팝업에서 받은 값
window.empData = (empnm ,empno, btn_id) => {
  if(btn_id === '1'){           // info
    window.pms_register.info.rqs_nm = empnm
    window.pms_register.info.rqs_no = empno
  } else if(btn_id === '2'){   // detail
    window.pms_register.info.rvw_nm = empnm
    window.pms_register.info.rvw_no = empno
  } else if(btn_id === '3'){   // detail
    window.pms_register.info.aprv_nm = empnm
    window.pms_register.info.aprv_no = empno
  }
}

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    grid: Grid,
    PmsSideBar
  },

  mounted() {
    if(sessionStorage.getItem("LOGIN_AUT_CD") === '900' || sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600'){
      this.aut_cd_check = false
    } else {
      this.aut_cd_check = true
    }

    // 화면 접속 시 데이터 조회
    this.fnSearch();
    // 화면 초기화
    this.init();
    window.pms_register = this;
  },
  updated(){
    this.setNo();
    this.setNo1();
  },

// 일반적인 함수를 선언하는 부분
  methods: {
    // Combo.vue 에서 받아온 값
    prjt_nm_chage(params)         {this.info.prjt_nm_selected = params},            // 프로젝트
    bkup_id_change(params)        {this.info.bkup_id_selected = params},            // 백업id
    prcs_stts_cd_change(params)   {this.info.prcs_stts_cd_selected = params},       // 배포구분
    dstr_change(params)         {this.info.dstr_selected = params},                 // 배포요청상태
    // 화면 init
    init() {
      // 그리드 초기화
      this.$refs.grid.invoke("clear");
      // 그리드1 전체 비활성화
      this.$refs.grid.invoke("disable");

    },
    // 저장 버튼
    fnSave(){
      //필수항목 확인
      if (this.checkPrimary() == true) {
        if (confirm("정말 저장하시겠습니까?") === true) {
          if(this.newCheck == "Y"){
            axiosService.get("/PJTE7100/select_7100_02", {
              params: {
                prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),
                bkup_id_selected: this.info.bkup_id_selected,
                as_pgm_id: this.detail.as_pgm_id,                      // As-Is프로그램id
                as_pgm_dis_cd: this.detail.as_pgm_dis_cd_selected,     // As-Is프로그램유형
              }
            }).then(res => {
              console.log(res);
              if (res.data) {
                if(res.data.data.contents[0].save_yn == 'N') {
                  axiosService.post("/PJTE7100/insert_7100_01", {
                    prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID
                    as_pgm_id: this.detail.as_pgm_id,                      // as-is 프로그램id
                    as_pgm_dis_cd: this.detail.as_pgm_dis_cd_selected,     // as-is 프로그램구분코드
                    as_pgm_nm: this.detail.as_pgm_nm,                      // as-is 프로그램명
                    to_pgm_id: this.detail.to_pgm_id,                      // to-be 프로그램id
                    to_pgm_nm: this.detail.to_pgm_nm,                      // to-be 프로그램명
                    trn_stt_cd : this.detail.trn_stt_cd_selected,          // 전환상태코드
                    use_pgm_txt: this.detail.use_pgm_txt,                  // 사용프로그램
                    dvlpe_no: this.detail.dvlpe_no,                        // 전환담당자번호
                    rmrk: this.detail.rmrk,                                // 비고
                    frcs_sta_dt: this.detail.frcs_sta_dt,                  // 계획시작일자
                    frcs_end_dt: this.detail.frcs_end_dt,                  // 계획종료일자
                    login_emp_no:sessionStorage.getItem("LOGIN_EMP_NO"), //로그인번호
                    login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"), // 권한ID
                  }).then(res => {
                    //this.$refs.grid.invoke("reloadData");
                    document.getElementById("as_pgm_id").style.backgroundColor="#f2f2f2";
                    document.getElementById("as_pgm_id").disabled=true;
                    document.getElementById("as_pgm_dis_cd").style.backgroundColor="#f2f2f2";
                    document.getElementById("as_pgm_dis_cd").disabled=true;
                    alert("신규저장을 완료했습니다.")
                    //this.fnSearch()
                  }).catch(e => {
                    alert("신규저장에 실패했습니다.")
                  })
                }else {
                  alert('등록하려는 As-Is 대 To-Be매핑이 이미 등록되어있습니다. 확인 후 등록해주세요.')
                  return false;
                }
              }
            }).catch(e => {
              alert("저장에 실패했습니다.")
            })
          }else{
            //기등록일때
              this.$refs.grid.invoke("setValue", this.curRow, 'as_pgm_nm', this.detail.as_pgm_nm);
              this.$refs.grid.invoke("setValue", this.curRow, 'to_pgm_id', this.detail.to_pgm_id);
              this.$refs.grid.invoke("setValue", this.curRow, 'to_pgm_nm', this.detail.to_pgm_nm);
              this.$refs.grid.invoke("setValue", this.curRow, 'as_pgm_dis_cd', this.detail.as_pgm_dis_cd_selected);
              this.$refs.grid.invoke("setValue", this.curRow, 'use_pgm_txt', this.detail.use_pgm_txt);
              this.$refs.grid.invoke("setValue", this.curRow, 'trn_stt_cd', this.detail.trn_stt_cd_selected);
              this.$refs.grid.invoke("setValue", this.curRow, 'dvlpe_nm', this.detail.dvlpe_nm);
              this.$refs.grid.invoke("setValue", this.curRow, 'dvlpe_no', this.detail.dvlpe_no);
              this.$refs.grid.invoke("setValue", this.curRow, 'frcs_sta_dt', this.detail.frcs_sta_dt);
              this.$refs.grid.invoke("setValue", this.curRow, 'frcs_end_dt', this.detail.frcs_end_dt);
              this.$refs.grid.invoke("setValue", this.curRow, 'rmrk', this.detail.rmrk);

              axiosService.put("/PJTE7200/update_7200_01", {
                prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID
                rmrk: this.detail.rmrk,                                // 비고
                login_emp_no:sessionStorage.getItem("LOGIN_EMP_NO"), //로그인번호
                login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"), // 권한ID
                excelUplod: this.excelUplod,
              }).then(res => {
                console.log(res);
                //this.$refs.grid.invoke("reloadData");
                alert("저장을 완료했습니다.")
              }).catch(e => {
                alert("저장에 실패했습니다.")
              })
          }

        } else {   //취소
          return;
        }
      } else {
      }
    },
    /* 저장을 하기위한 필수 항목 체크 */
    checkPrimary() {
      if (this.detail.as_pgm_dis_cd_selected == "NNN" ||this.detail.as_pgm_dis_cd_selected == "" || this.detail.as_pgm_dis_cd_selected == null) {
        alert(' As-Is 프로그램구분코드는 필수 입력사항입니다.');
        return false;
      } else if (this.detail.dvlpe_no == "" || this.detail.dvlpe_no == null) {
        alert('직원명과 직원번호는 필수 입력사항입니다.');
        return false;
      } else if (this.detail.as_pgm_id == "" || this.detail.as_pgm_id == null) {
        alert('As-Is 프로그램 ID는 필수 입력사항입니다.');
        return false;
      }  else if (this.detail.as_pgm_nm == "" || this.detail.as_pgm_nm == null) {
        alert('As-Is 프로그램명은 필수 입력사항입니다.');
        return false;
      }  else {
        return true;  // 필수 값 모두 입력 시 true
      }
    },

    onGridUpdated(grid){

    },

    // 그리드 1 클릭 이벤트 - 인력내역(그리드1) ROW 클릭 시 하단 세부내역 조회 (인적사항, 그리드2, 그리드3)
    onClick(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
      if(this.curRow === undefined){
        return;
      }
      this.newCheck ='N'; //신규인지 기등록인지 확인

      const currentRowData = (this.$refs.grid.invoke("getRow", this.curRow));

      // 그리드 row 클릭 시 상세내용에 Bind
      if (currentRowData != null) {
        this.cellDataBind(currentRowData) // currentRowData가 있을 때 Row 클릭 시 상세내용에 Bind
      }
    },

    //조회
    fnSearch(){
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
      this.excelUplod = 'N'
    },

    // 조회한 데이터로 인적사항 데이터 바인딩
    cellDataBind(currentRowData) {
      this.detail.rqs_id                                 = currentRowData.rqs_id                     // 요청 ID
      this.detail.rmrk                                   = currentRowData.rmrk                       // 비고
      // this.$refs.combo2.$data.as_pgm_dis_cd_selected  = currentRowData.as_pgm_dis_cd              // as-is프로그램유형
    },
    cmpl_yn () {
      this.cmpl_yn ? this.info.cmpl_yn = 'Y' : this.info.cmpl_yn = 'N';
    },

    //직원조회 버튼 클릭 시
    open_pjte9001_btn(btn_id) {
      let empnm = ''

      if (btn_id == '1') {
        empnm = this.info.rqs_nm
      } else if (btn_id == '2') {
        empnm = this.info.rvw_nm
      } else if (btn_id == '3') {
        empnm = this.info.aprv_nm
      }

      if((empnm === '' || empnm == null || empnm === undefined)) {
        let bkup_id = this.info.bkup_id_selected, prjt_id =  this.info.prjt_nm_selected
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      } else {
        let bkup_id = this.info.bkup_id_selected, prjt_id =  this.info.prjt_nm_selected
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&btn_id=${btn_id}&empnm=${empnm}&`, "open_emp_page", "width=700, height=600");
      }
    },
    //엔터키를 눌러 직원 조회
    open_pjte9001(btn_id) {
      let empnm = ''

      let prjt_id_selected = this.info.prjt_nm_selected
      let bkup_id_selected = this.info.bkup_id_selected

      if (btn_id == '1') {
        empnm = this.info.rqs_nm
      } else if (btn_id == '2') {
        empnm = this.info.rvw_nm
      } else if (btn_id == '3') {
        empnm = this.info.aprv_nm
      }

      if (empnm != null && empnm != '') {
        axiosService.get("/PJTE9001/select", {
          params: {
            empnm,
            prjt_id_selected,
            bkup_id_selected
          }
        }).then(res => {
              let res_data = res.data.data.contents;
              // console.log(res_data)
              if (res_data.length == 1) {  // 입력한 직원명으로 조회한 값이 단건일 경우 : 직원번호 바인딩
                if (btn_id == '1') {

                  this.info.rqs_no = res.data.data.contents[0].empno
                  this.info.rqs_nm = res.data.data.contents[0].empnm
                } else if (btn_id == '2') {
                  this.info.rvw_no = res.data.data.contents[0].empno
                  this.info.rvw_nm = res.data.data.contents[0].empnm
                } else if (btn_id == '3') {
                  this.info.aprv_no = res.data.data.contents[0].empno
                  this.info.aprv_nm = res.data.data.contents[0].empnm
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
      if(this.info.rqs_nm === "") this.info.rqs_nm = "";
      if(this.info.rvw_nm === "") this.info.rvw_nm = "";
      if(this.info.aprv_nm === "") this.info.aprv_nm = "";
    },
    // 직원명 삭제 시 직원번호 초기화
    setNo1() {
      if(this.info.rqs_nm === "") this.info.rqs_no = "";
      if(this.info.rvw_nm === "") this.info.rvw_no = "";
      if(this.info.aprv_nm === "") this.info.aprv_no = "";
    },

    // [신규초기화] 버튼 클릭 시 상세내용 값 초기화
    fnClear() {
      document.getElementById("as_pgm_id").style.backgroundColor="#ffffff";
      document.getElementById("as_pgm_id").disabled=false;
      document.getElementById("as_pgm_dis_cd").style.backgroundColor="#ffffff";
      document.getElementById("as_pgm_dis_cd").disabled=false;

      this.$refs.combo3.$data.trn_stt_cd_selected     = this.$refs.combo3.$data.CD1000000052N[0].value      // 전환상태       // 계획종료일자

      this.detail.save_yn               = 'N'        // 등록가능여부
      this.newCheck                     = 'Y';
    },

    gridExcelExport() {
      this.$refs.grid.invoke("export", "xlsx", {fileName: "배포요청관리_"+this.getCurrentYyyymmdd(), useFormattedValue : true, onlySelected:true});
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

    // 재직사항 그리드 엑셀업로드
    gridExcelImport(event) {
      // 엑셀파일 업로드 로직 추가
      console.log(event.target.files[0])
      this.file = event.target.files ? event.target.files[0] : null;
      let input = event.target;
      let reader = new FileReader();
      reader.onload = () => {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, {type: 'binary'});
        console.log("wb ::"+ wb.SheetNames);
        let gridExcelData;
        wb.SheetNames.forEach((sheetName, idx) => {
          if (sheetName === 'As-Is대To-Be매핑관리' || sheetName === 'Sheet1') {
            console.log(wb.Sheets[sheetName])
            wb.Sheets[sheetName].A1.w = "No"
            wb.Sheets[sheetName].B1.w = "as_pgm_id"
            wb.Sheets[sheetName].C1.w = "as_pgm_nm"
            wb.Sheets[sheetName].D1.w = "to_pgm_id"
            wb.Sheets[sheetName].E1.w = "to_pgm_nm"
            wb.Sheets[sheetName].F1.w = "as_pgm_dis_cd"
            wb.Sheets[sheetName].G1.w = "use_pgm_txt"
            wb.Sheets[sheetName].H1.w = "trn_stt_cd"
            wb.Sheets[sheetName].I1.w = "dvlpe_nm"
            wb.Sheets[sheetName].J1.w = "dvlpe_no"
            wb.Sheets[sheetName].K1.w = "frcs_sta_dt"
            wb.Sheets[sheetName].L1.w = "frcs_end_dt"
            wb.Sheets[sheetName].M1.w = "sta_dt"
            wb.Sheets[sheetName].N1.w = "end_dt"
            wb.Sheets[sheetName].O1.w = "rmrk"
            let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            let rowObj_copy = [];

            for (let n = 0; n < rowObj.length; n++) {
              if (isNaN(rowObj[n].frcs_sta_dt) == false) {
                rowObj[n].frcs_sta_dt = this.excelDateToJSDate(rowObj[n].frcs_sta_dt)
              }
              if (isNaN(rowObj[n].frcs_end_dt) == false) {
                rowObj[n].frcs_end_dt = this.excelDateToJSDate(rowObj[n].frcs_end_dt)
              }
              rowObj_copy[n-1] = rowObj[n];
            }

            gridExcelData = JSON.parse(JSON.stringify(rowObj_copy));
            console.log("gridExcelData ::", gridExcelData)
          }
        })
        this.excelUplod = 'Y'

        try {
          this.$refs.grid.invoke('resetData', gridExcelData)
          if(this.excelUplod === 'Y') {
            axiosService.post("/PJTE7100/create", {
              excelUplod: this.excelUplod,
              login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
              login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),
              login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),
              rowDatas: gridExcelData
            }).then(res => {
              console.log(res);
              if (res.data) {
                alert("엑셀 업로드 저장이 완료되었습니다.")
                this.fnSearch()
              }
            }).catch(e => {
              alert("등록중 오류 ::"+ e)
            })
          }
        } catch (e){
          alert('업로드에 실패했습니다.')
        }
      };
      reader.readAsBinaryString(input.files[0]);
      event.target.value = '';
    },
    excelDateToJSDate(excelDate) {
      /* 엑셀에서 넘어온 숫자형태의 데이터를 날짜형태로 바꿔주는 함수
      ex) 1. 엑셀 파일에서 2021-02 형태로 값을 입력하면 Feb-22 형태의 날짜 데이터가 자동입력됨
          2. gridExcelImport2 함수에서
          XLSX.utils.sheet_to_json(wb.Sheets[sheetName]) 엑셀데이터를 JSON으로 바뀌면서
          Feb-22 의 데이터가 44593 << 숫자형태의 데이터로 바뀜
          3. excelDateToJSDate 함수에서 44593 형태의 데이터를 2021-02 형태의 데이터로 변환
       */
      var date = new Date(Math.round((excelDate - (25567 + 2)) * 86400 * 1000));
      var converted_date = date.toISOString().split('T')[0].substring(0, 10);
      return converted_date;
    },
  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{

  },

// 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      infocomboList1: ["C-51T"],
      comboList: ["C0", "C27"],
      comboList2: ["C57"],
      comboList3: ["C57", "C58"],

      gridData: [],
      newCheck: 'Y',
      excelUplod: 'N',
      cmpl_yn : false,

      info: {
        prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트명
        bkup_id_selected: '0000000000',                                 // 백업ID
        prcs_stts_cd_selected : this.$store.state.pms.CD1000000057,
        dstr_selected : this.$store.state.pms.CD1000000058,

        rqs_nm : '', //요청자이름
        rqs_no : '', //요청자번호
        aprv_nm : '', //승인자이름
        aprv_no : '', //승인자번호
        rvw_nm : '', //검토자이름
        rvw_no : '', //검토자번호
        rqs_dt  : '', //요청일자
        rls_dt  : '', //배포일자
        cmpl_yn  : 'N', //완료건 포함여부
      },
      detail: {
        rqs_id    : '',
        dstr   : '',
        prcs_stts_cd : '',
        rsn_rqs   : '',
        rmrk      : '',

        rqs_nm : '', //요청자이름
        rqs_no : '', //요청자번호
        aprv_nm : '', //승인자이름
        aprv_no : '', //승인자번호
        rvw_nm : '', //검토자이름
        rvw_no : '', //검토자번호
        rqs_dt  : '', //요청일자
        rls_dt  : '', //배포일자

        info_as_pgm_dis_cd: sessionStorage.getItem("LOGIN_PROJ_ID") === 'NICECBAP' ? '999' : 'TTT',                                        // As-Is 프로그램 구분코드
      },
      login: {
        login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),    // 권한ID
        login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"),   // 프로젝트ID
        login_bzcd: sessionStorage.getItem("LOGIN_BZCD"),      // 업무구분
        login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),    // 직원번호
        login_emp_nm: sessionStorage.getItem("LOGIN_EMP_NM"),    // 직원명
        login_catn_dcd: sessionStorage.getItem("LOGIN_CATN_DCD"),  // 구성원 구분코드
      },

      /* grid 속성 */
      count: 0,
      curRow: -1,
      title: "",
      scrollX: false,
      scrollY: false,
      bodyHeight: 630,
      minRowHeight: 20,
      rowHeight: 25,
      showDummyRows: false,
      editingEvent: "click",
      aut_cd_check: true,


      // toast ui grid 데이터
      dataSource: {
        api: {
          readData: {url: process.env.VUE_APP_API + '/PJTE7200/select_7200_01', method: 'GET'},
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
        complexColumns: []
      },
      columns: [
        {
          header: '요청 ID',
          width: 250,
          align: 'center',
          name: 'rqs_id',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '요청사유',
          align: 'left',
          name: 'rsn_rqs',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '요청일자',
          width: 100,
          align: 'center',
          name: 'rqs_dt',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '배포일자',
          width: 100,
          align: 'center',
          name: 'rls_dt',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '배포구분',
          width: 120,
          align: 'left',
          name: 'dstr',
          formatter: 'listItemText',
          filter: 'select',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000057N
            }
          }
        },
        {
          header: '처리상태',
          width: 120,
          align: 'center',
          name: 'prcs_stts_cd',
          formatter: 'listItemText',
          filter: 'select',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000058N
            }
          },
        },
        {
          header: '요청자',
          width: 80,
          align: 'center',
          name: 'rqs_nm',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '검토자',
          width: 80,
          align: 'center',
          name: 'rvw_nm',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '승인자',
          width: 80,
          align: 'center',
          name: 'aprv_nm',
          editor: 'text',
          filter: 'text',
        }
      ],

      dataSource2: {
        api: {
          readData: {url: process.env.VUE_APP_API + '/PJTE7100/select_7100_01', method: 'GET'},
        },
        initialRequest: false,
        contentType: 'application/json;',
        headers: {'x-custom-header': 'custom-header'},
        withCredentials: false,
      },
      columnOptions2: {
        resizable: true
      },
      rowHeaders2: ['rowNum'],
      header2: {
        height: 45,
        complexColumns: []
      },
      columns2: [
        {
          header: '배포요청패키지명',
          align: 'left',
          name: 'pck_nm',
          editor: 'text',
          filter: 'text',
        },
      ]
    }
  }
};

</script>
<style>
</style>
