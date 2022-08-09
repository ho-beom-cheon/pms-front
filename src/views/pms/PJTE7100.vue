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
          ></combo>
          <li class="filter-item">
            <div class="input-searchWrap" >As-Is 프로그램 ID
              <input type="text"
                     v-model="info.as_pgm_id"
                     style="width: 180px"
              >
            </div>
          </li>
          <li class="filter-item">
            <div class="input-searchWrap" >To-Be 프로그램 ID
              <input type="text"
                     v-model="info.to_pgm_id"
                     style="width: 180px"
              >
            </div>
          </li>
          <li class="filter-item">
            <div class="input-searchWrap" >사용프로그램
              <input type="text"
                     v-model="info.use_pgm_txt"
                     style="width: 180px"
              >
            </div>
          </li>
          <li class="filter-item-n">
            <div class="input-searchWrap" style="margin-left: 26px">전환담당자
              <input type="text"
                     placeholder="직원명"
                     v-model="info.dvlpe_nm"
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
                   v-model="info.dvlpe_no"
                   style="width: 90px; background-color: #f2f2f2;"
                   :disabled=true
            >
          </li>
        </ul>
        <ul class="filter-btn">
          <button class="btn btn-filter-p" style="margin-left: 10px" @click="fnSearch">조회</button>
        </ul>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box" style="height: 470px">
          <div class="div-header"><h2>As-Is 대 To-Be 매핑내역</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-d" @click="formDownload">양식다운로드ⓘ</button>
              <button class="btn btn-filter-e" :disabled="aut_cd_check">
                <label for="file">엑셀업로드</label>
                <input type="file" id="file"  @change="gridExcelImport"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="display: none;">
              </button>
              <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
            </ul>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid"
                :data="dataSource"
                :header="header"
                :columns="columns"
                :minBodyHeight="55"
                :bodyHeight="380"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeaders="rowHeaders"
                :rowHeight="rowHeight"
                @click="onClick"
            ></grid>
          </div>
        </div>
        <div class="grid1-box" style="height: 100%">
          <div class="div-header-b"><h2>As-Is 대 To-Be 매핑정보</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-b" style="margin-left: 20px" @click="fnClear">신규초기화</button>
            </ul>
          </div>
          <section class="filter">
            <ul class="filter-con clear-fix" style="width: 100%">
              <li class="filter-item" style="margin-left: 12px">
                <div class="item-con" >As-Is  프로그램 ID
                  <input type="text"
                         placeholder="입력"
                         id      = "as_pgm_id"
                         v-model="detail.as_pgm_id"
                         style= "width: 680px; margin-left: 5px"
                  >
                </div>
              </li>
              <li class="filter-item"   style="margin-left: 10px">
                <div class="item-con">As-Is 프로그램명
                  <input type="text"
                         placeholder="입력"
                         v-model="detail.as_pgm_nm"
                         style= "width: 680px; margin-left: 5px"
                  >
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix" style="width: 100%">
              <li class="filter-item" style="margin-left: 8px">
                <div class="item-con" >To-Be 프로그램 ID
                  <input type="text"
                         placeholder="입력"
                         ref="address"
                         v-model="detail.to_pgm_id"
                         style="width: 680px; margin-left: 5px"
                  >
                </div>
              </li>
              <li class="filter-item"  style="margin-left: 6px">
                <div class="item-con" >To-Be 프로그램명
                  <input type="text"
                         placeholder="입력"
                         ref="address"
                         v-model="detail.to_pgm_nm"
                         style="width: 680px; margin-left: 5px"
                  >
                </div>
              </li>
            </ul>

            <ul class="filter-con clear-fix" style="width: 100%">
              <combo
                  ref="combo2"
                  :comboArray = "this.comboList2"
                  @as_pgm_dis_cd_change="as_pgm_dis_cd_change"
              >
              </combo>
              <li class="filter-item-n">
                <div class="input-searchWrap" style="margin-left: 26px">전환담당자
                  <input type="text"
                         placeholder="직원명"
                         v-model="detail.dvlpe_nm"
                         style="width: 90px"
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
                       v-model="detail.dvlpe_no"
                       style="width: 90px; background-color: #f2f2f2;"
                       :disabled=true
                >
              </li>
              <combo
                  ref="combo3"
                  :comboArray = "this.comboList3"
                  @trn_stt_cd_change="trn_stt_cd_change"
              >
              </combo>
              <li class="filter-item"   style="margin-left: 10px">
                <div class="item-con">계획시작일자
                  <div class="input-dateWrap">
                    <input type="date"
                           v-model="detail.frcs_sta_dt"
                           ref="frcs_sta_dt"
                           style="width: 120px;margin-left: 5px"
                    ></div>
                </div>
              </li>
              <li class="filter-item"   style="margin-left: 10px">
                <div class="item-con">계획종료일자
                  <div class="input-dateWrap">
                    <input type="date"
                           v-model="detail.frcs_end_dt"
                           ref="frcs_end_dt"
                           style="width: 120px;margin-left: 5px"
                    ></div>
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix"  style="width: 100%">
              <li class="filter-item" style="width: 100%">
                <div class="item-con">
                  <th style="vertical-align: middle;text-align: right ;width: 100px">
                    <label>사용프로그램</label>
                  </th>
                  <td>
                      <textarea cols="140"
                                rows="4"
                                placeholder="사용프로그램을 입력해주세요"
                                v-model="detail.use_pgm_txt"
                                style="width: 1490px; margin-left: 7px"
                      ></textarea>
                  </td>
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix"  style="width: 100%">
              <li class="filter-item" style="width: 100%">
                <div class="item-con">
                  <th style="vertical-align: middle;text-align: right ;width: 100px">
                    <label>비고</label>
                  </th>
                  <td>
                      <textarea cols="140"
                                rows="3"
                                placeholder="비고내용을 입력해주세요"
                                v-model="detail.rmrk"
                                style="width: 1490px; margin-left: 7px"
                      ></textarea>
                  </td>
                </div>
              </li>
            </ul>
            <ul class="filter-btn">
              <button class="btn btn-filter-p" style="margin-bottom: 4px; margin-left: 10px" @click="fnSave" >저장</button>
            </ul>
          </section>
        </div>

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
    window.pms_register.info.dvlpe_nm = empnm
    window.pms_register.info.dvlpe_no = empno
  } else if(btn_id === '2'){   // detail
    window.pms_register.detail.dvlpe_nm = empnm
    window.pms_register.detail.dvlpe_no = empno
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
    as_pgm_dis_cd_change(params)  {this.detail.as_pgm_dis_cd_selected = params},    // As-Is프로그램유형
    trn_stt_cd_change(params)     {this.detail.trn_stt_cd_selected = params},// 전환상태

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
                    use_pgm_txt: this.detail.use_pgm_txt,                  // 사용프로그램
                    dvlpe_no: this.detail.dvlpe_no,                        // 전환담당자번호
                    Rmrk: this.detail.Rmrk,                                // 비고
                    frcs_sta_dt: this.detail.frcs_sta_dt,                  // 계획시작일자
                    frcs_end_dt: this.detail.frcs_end_dt,                  // 계획종료일자
                    login_emp_no:sessionStorage.getItem("LOGIN_EMP_NO"), //로그인번호
                    login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"), // 권한ID
                  }).then(res => {
                    this.$refs.grid.invoke("reloadData");
                    document.getElementById("as_pgm_id").style.backgroundColor="#f2f2f2";
                    document.getElementById("as_pgm_id").disabled=true;
                    document.getElementById("as_pgm_dis_cd").style.backgroundColor="#f2f2f2";
                    document.getElementById("as_pgm_dis_cd").disabled=true;
                    alert("신규저장을 완료했습니다.")
                    this.fnSearch()
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
            if (sessionStorage.getItem("LOGIN_EMP_NO") == this.detail.dvlpe_no) {
              axiosService.put("/PJTE7100/update_7100_01", {
                prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID
                as_pgm_id: this.detail.as_pgm_id,                      // as-is 프로그램id
                as_pgm_dis_cd: this.detail.as_pgm_dis_cd_selected,     // as-is 프로그램구분코드
                as_pgm_nm: this.detail.as_pgm_nm,                      // as-is 프로그램명
                to_pgm_id: this.detail.to_pgm_id,                      // to-be 프로그램id
                to_pgm_nm: this.detail.to_pgm_nm,                      // to-be 프로그램명
                trn_stt_cd : this.detail.trn_stt_cd_selected,
                use_pgm_txt: this.detail.use_pgm_txt,                  // 사용프로그램
                dvlpe_no: this.detail.dvlpe_no,                        // 전환담당자번호
                rmrk: this.detail.rmrk,                                // 비고
                frcs_sta_dt: this.detail.frcs_sta_dt,                  // 계획시작일자
                frcs_end_dt: this.detail.frcs_end_dt,                  // 계획종료일자
                login_emp_no:sessionStorage.getItem("LOGIN_EMP_NO"), //로그인번호
                login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"), // 권한ID
                excelUplod: this.excelUplod,
              }).then(res => {
                console.log(res);
                this.$refs.grid.invoke("reloadData");
                alert("저장을 완료했습니다.")
                this.fnSearch()
              }).catch(e => {
                alert("저장에 실패했습니다.")
              })
            } else {
              alert("작성자 본인만 저장가능합니다.")
            }
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
      }  else if (this.detail.to_pgm_id == "" || this.detail.to_pgm_id == null) {
        alert('To-Be프로그램 ID는 필수 입력사항입니다.');
        return false;
      } else if (this.detail.to_pgm_nm == "" || this.detail.to_pgm_nm == null) {
        alert('To-Be프로그램은 필수 입력사항입니다.');
        return false;
      }else {
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
      document.getElementById("as_pgm_id").style.backgroundColor="#f2f2f2";
      document.getElementById("as_pgm_id").disabled=true;
      document.getElementById("as_pgm_dis_cd").style.backgroundColor="#f2f2f2";
      document.getElementById("as_pgm_dis_cd").disabled=true;
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
      this.detail.as_pgm_id                           = currentRowData.as_pgm_id                  // As-is프로그램id
      this.detail.as_pgm_nm                           = currentRowData.as_pgm_nm                  // As-is프로그램명
      this.detail.to_pgm_id                           = currentRowData.to_pgm_id                  // To-be프로그램id
      this.detail.to_pgm_nm                           = currentRowData.to_pgm_nm                  // To-be프로그램명
      this.detail.as_pgm_dis_cd_selected              = currentRowData.as_pgm_dis_cd              // as-is프로그램유형
      this.$refs.combo2.$data.as_pgm_dis_cd_selected  = currentRowData.as_pgm_dis_cd              // as-is프로그램유형
      this.detail.dvlpe_no                            = currentRowData.dvlpe_no                   // 전환담당자번호
      this.detail.dvlpe_nm                            = currentRowData.dvlpe_nm                   // 전환담당자명
      this.detail.trn_stt_cd_selected                 = currentRowData.trn_stt_cd                 // 전환상태
      this.$refs.combo3.$data.trn_stt_cd_selected     = currentRowData.trn_stt_cd                 // 전환상태
      this.detail.use_pgm_txt                         = currentRowData.use_pgm_txt                // 사용프로그램
      this.detail.rmrk                                = currentRowData.rmrk                       // 비고
      this.detail.frcs_sta_dt                         = currentRowData.frcs_sta_dt                // 계획시작일자
      this.detail.frcs_end_dt                         = currentRowData.frcs_end_dt                // 계획종료일자
    },

    //직원조회 버튼 클릭 시
    open_pjte9001_btn(btn_id) {
      let empnm = ''

      if (btn_id == '1') {
        empnm = this.info.dvlpe_nm
      } else if (btn_id == '2') {
        empnm = this.detail.dvlpe_nm
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
        empnm = this.info.dvlpe_nm
      } else if (btn_id == '2') {
        empnm = this.detail.dvlpe_nm
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
                  this.detail.dvlpe_no = res.data.data.contents[0].empno
                  this.detail.dvlpe_nm = res.data.data.contents[0].empnm
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
      if(this.detail.dvlpe_nm === "") this.detail.dvlpe_no = "";
    },


    // 직원명 삭제 시 직원번호 초기화
    setNo1() {
      if(this.info.dvlpe_nm === "") this.info.dvlpe_no = "";
    },

    // [신규초기화] 버튼 클릭 시 상세내용 값 초기화
    fnClear() {
      document.getElementById("as_pgm_id").style.backgroundColor="#ffffff";
      document.getElementById("as_pgm_id").disabled=false;
      document.getElementById("as_pgm_dis_cd").style.backgroundColor="#ffffff";
      document.getElementById("as_pgm_dis_cd").disabled=false;

      this.detail.as_pgm_id                           = ''                                                  // As-is프로그램id
      this.detail.as_pgm_nm                           = ''                                                  // As-is프로그램명
      this.detail.to_pgm_id                           = ''                                                  // To-be프로그램id
      this.detail.to_pgm_nm                           = ''                                                  // To-be프로그램명
      this.detail.as_pgm_dis_cd_selected              = this.$refs.combo2.$data.CD1000000051N[0].value      // as-is프로그램유형
      this.$refs.combo2.$data.as_pgm_dis_cd_selected  = this.$refs.combo2.$data.CD1000000051N[0].value      // as-is프로그램유형
      this.detail.dvlpe_no                            = ''                                                  // 전환담당자번호
      this.detail.dvlpe_nm                            = ''                                                  // 전환담당자명
      this.detail.trn_stt_cd_selected                 = this.$refs.combo3.$data.CD1000000052N[0].value      // 전환상태
      this.$refs.combo3.$data.trn_stt_cd_selected     = this.$refs.combo3.$data.CD1000000052N[0].value      // 전환상태
      this.detail.use_pgm_txt                         = ''                                                  // 사용프로그램
      this.detail.rmrk                                = ''                                                  // 비고
      this.detail.frcs_sta_dt                         = ''                                                  // 계획시작일자
      this.detail.frcs_end_dt                         = ''                                                  // 계획종료일자

      this.detail.save_yn               = 'N'        // 등록가능여부
      this.newCheck = 'Y';
    },

    gridExcelExport() {
      this.$refs.grid.invoke("export", "xlsx", {fileName: "엑셀다운로드"});
    },
    // 양식다운로드
    formDownload(){
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem("LOGIN_PROJ_ID"), bzcd=sessionStorage.getItem("LOGIN_BZCD"), atfl_mng_id = "0000000000", file_rgs_dscd = '901' //atfl_mng_id 값은 양식 파일 첨부 ID 추후에 추가
      this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&bzcd=${bzcd}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=500");
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
      var converted_date = date.toISOString().split('T')[0].substring(0, 7);
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
      comboList : ["C0","C27"],
      comboList2 : ["C-51"],
      comboList3 : ["C-52"],

      gridData: [],
      newCheck : 'Y',
      excelUplod: 'N',

      info : {
        prjt_nm_selected      : sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트명
        bkup_id_selected      : '0000000000',                                 // 백업ID
        as_pgm_id             : '',                                           // ASIS프로그램ID
        to_pgm_id             : '',                                           // TOBE프로그램ID
        use_pgm_txt           : '',                                           // 사용프로그램
        dvlpe_no              : sessionStorage.getItem("LOGIN_AUT_CD") === '300' || sessionStorage.getItem("LOGIN_AUT_CD") === '400' ||
        sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600' ||
        sessionStorage.getItem("LOGIN_AUT_CD") === '900' || sessionStorage.getItem("LOGIN_AUT_CD") === '200' ? '':sessionStorage.getItem("LOGIN_EMP_NO"), // 전환담당자 번호
        dvlpe_nm              : sessionStorage.getItem("LOGIN_AUT_CD") === '300' || sessionStorage.getItem("LOGIN_AUT_CD") === '400' ||
        sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600' ||
        sessionStorage.getItem("LOGIN_AUT_CD") === '900' || sessionStorage.getItem("LOGIN_AUT_CD") === '200' ? '':sessionStorage.getItem("LOGIN_EMP_NM"),  // 전환담당자 명
      },

      detail : {
        as_pgm_id               : '',                                         // ASIS프로그램ID
        as_pgm_nm               : '',                                         // ASIS프로그램명
        to_pgm_id               : '',                                         // TOBE프로그램ID
        to_pgm_nm               : '',                                         // TOBE프로그램명
        as_pgm_dis_cd_selected  : '',                                         // As-Is 프로그램 구분코드
        dvlpe_no                : sessionStorage.getItem("LOGIN_EMP_NO"), // 전환담당자 번호
        dvlpe_nm                : sessionStorage.getItem("LOGIN_EMP_NM"), // 전환담당자 명
        trn_stt_cd_selected     : '',                                         // 전환상태
        frcs_sta_dt             : '',                                         // 계획시작일자
        frcs_end_dt             : '',                                         // 계획종료일자
        use_pgm_txt             : '',                                         // 사용프로그램
        rmrk                    : '',                                         // 비고
        save_yn                 : 'N',                                        // 등록가능여부
      },

      login : {
        login_aut_cd          : sessionStorage.getItem("LOGIN_AUT_CD"),    // 권한ID
        login_proj_id         : sessionStorage.getItem("LOGIN_PROJ_ID"),   // 프로젝트ID
        login_bzcd            : sessionStorage.getItem("LOGIN_BZCD"),      // 업무구분
        login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO"),    // 직원번호
        login_emp_nm          : sessionStorage.getItem("LOGIN_EMP_NM"),    // 직원명
        login_catn_dcd        : sessionStorage.getItem("LOGIN_CATN_DCD"),  // 구성원 구분코드
      },

      /* grid 속성 */
      count:0,
      curRow:-1,
      title:"",
      scrollX:false,
      scrollY:false,
      bodyHeight: 630,
      minRowHeight: 20,
      rowHeight: 25,
      showDummyRows: false,
      editingEvent : "click",
      aut_cd_check : true,

      // toast ui grid 데이터
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE7100/select_7100_01', method: 'GET' },
        },
        initialRequest: false,
        contentType : 'application/json;',
        headers : {  'x-custom-header' : 'custom-header'  },
        withCredentials: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders: ['rowNum'],
      header: {
        height: 45,
        complexColumns: [
          {header: 'As-Is',           name: 'mergeColumn1', childNames: ['as_pgm_id','as_pgm_nm']},
          {header: 'To-Be',           name: 'mergeColumn2', childNames: ['to_pgm_id','to_pgm_nm']},
          {header: '전환담당자',           name: 'mergeColumn3', childNames: ['dvlpe_nm','dvlpe_no']},
        ]
      },
      columns: [
        {
          header: '프로그램 ID',
          width: 120,
          align: 'left',
          name: 'as_pgm_id',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '프로그램명',
          width: 120,
          align: 'left',
          name: 'as_pgm_nm',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '프로그램 ID',
          width: 120,
          align: 'left',
          name: 'to_pgm_id',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '프로그램명',
          width: 120,
          align: 'left',
          name: 'to_pgm_nm',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '프로그램유형',
          width: 120,
          align: 'center',
          name: 'as_pgm_dis_cd',
          filter: 'select',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000051N
            }
          }
        },
        {
          header: '사용프로그램',
          width: 120,
          align: 'left',
          name: 'use_pgm_txt',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '전환상태',
          width: 90,
          align: 'center',
          name: 'trn_stt_cd',
          formatter: 'listItemText',
          filter: 'select',
          disabled: true,
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000052N
            }
          }
        },
        {
          header: '이름',
          width: 80,
          align: 'center',
          name: 'dvlpe_nm',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '사번',
          width: 80,
          align: 'center',
          name: 'dvlpe_no',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '계획시작일자',
          width: 120,
          align: 'center',
          name: 'frcs_sta_dt',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '계획종료일자',
          width: 120,
          align: 'center',
          name: 'frcs_end_dt',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '실제시작일자',
          width: 120,
          align: 'center',
          name: 'sta_dt',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '실제종료일자',
          width: 120,
          align: 'center',
          name: 'end_dt',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '비고',
          align: 'left',
          name: 'rmrk',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '백업id',
          width: 120,
          align: 'center',
          name: 'bkup_id',
          editor: 'text',
          hidden: true,
        },
        {
          header: '프로젝트id',
          width: 120,
          align: 'center',
          name: 'prjt_id',
          editor: 'text',
          hidden: true,
        },
      ],
    }
  },
};

</script>
<style>
</style>
