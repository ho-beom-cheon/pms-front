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
              :hidden="true"
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
              <input type="checkbox" @click="check_yn" v-model="cmpl_yn" style="margin-left: 10px; margin-bottom: 2px;">
              <label style="margin-left: 3px">완료건 포함</label>
            </div>
          </li>
        </ul>
        <ul class="filter-btn">
          <div class="btn btn-filter-p" style="margin-left: 10px">
            <a href="#" @click="fnSearch">조회</a>
          </div>
        </ul>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box" style="height: 310px">
          <div class="div-header-b"><h2>요청내역</h2>
            <ul class="filter-btn">
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
                :bodyHeight="205"
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
        <div class="grid1-box" style="height: 215px">
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
                         style= "width: 180px; margin-left: 5px; background-color: #f2f2f2;text-align: center"
                         :disabled=true
                  >
                </div>
              </li>
              <li class="filter-item">
                <div class="item-con">요청일자
                  <input type="date"
                         v-model="detail.rqs_dt"
                         style= "width: 150px; margin-left: 5px; background-color: #f2f2f2;text-align: center"
                         :disabled=true
                  >
                </div>
              </li>
              <li class="filter-item">
                <div class="item-con" >배포일시
                  <input type="text"
                         ref="address"
                         v-model="detail.rls_dt"
                         style="width: 150px; margin-left: 5px;text-align: center"
                  >
                </div>
              </li>
              <combo
                  :comboArray3 = "this.comboList3"
                  @dstr_change="dstr_change"
                  @prcs_stts_cd_change="prcs_stts_cd_change"
                  ref="combo"
              ></combo>
            </ul>
            <ul class="filter-con clear-fix" style="width: 100%; margin-left:10px">
              <li class="filter-item-n" >
                <div class="input-searchWrap">요청자
                  <input type="text"
                         placeholder="직원명"
                         v-model="detail.rqs_nm"
                         style="width: 90px; margin-left:5px"
                         @keyup.enter="open_pjte9001_dtail(4)"
                  >
                  <button class="search-btn"
                          @click="open_pjte9001_detail_btn(4)"
                  ></button>
                </div>
              </li>
              <li class="filter-item">
                <input type="text"
                       placeholder="직원번호"
                       v-model="detail.rqs_no"
                       style="width: 90px; background-color: #f2f2f2;text-align: center"
                       :disabled=true
                >
              </li>
              <li class="filter-item-n">
                <div class="input-searchWrap">검토자
                  <input type="text"
                         placeholder="직원명"
                         v-model="detail.rvw_nm"
                         style="width: 90px; margin-left:5px"
                         @keyup.enter="open_pjte9001_dtail(5)"
                  >
                  <button class="search-btn"
                          @click="open_pjte9001_detail_btn(5)"
                  ></button>
                </div>
              </li>
              <li class="filter-item">
                <input type="text"
                       placeholder="직원번호"
                       v-model="detail.rvw_no"
                       style="width: 90px; background-color: #f2f2f2;text-align: center"
                       :disabled=true
                >
              </li>
              <li class="filter-item-n">
                <div class="input-searchWrap">승인자
                  <input type="text"
                         placeholder="직원명"
                         v-model="detail.aprv_nm"
                         style="width: 90px; margin-left:5px"
                         @keyup.enter="open_pjte9001_dtail(6)"
                  >
                  <button class="search-btn"
                          @click="open_pjte9001_detail_btn(6)"
                  ></button>
                </div>
              </li>
              <li class="filter-item">
                <input type="text"
                       placeholder="직원번호"
                       v-model="detail.aprv_no"
                       style="width: 90px; background-color: #f2f2f2;text-align: center"
                       :disabled=true
                >
              </li>
              <li class="filter-item">
                <div class="item-con">
                  <th style="vertical-align: middle;text-align: right ;width: 200px; margin-right: 20px">
                    <label>첨부파일</label>
                  </th>
                  <td>
                    <input type="text"
                           :disabled=true
                           v-model="detail.org_file_nm"
                           style="background-color: #f2f2f2; width: 500px;margin-left: 6px">
                    <button class="btn btn-filter-p" @click="open_file_page(1)" style="margin-left: 3px; margin-bottom: 4px">첨부</button>
                  </td>
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix">
              <li class="filter-item" style="width: 100%">
                <div class="item-con">
                  <th style="vertical-align: top;text-align: right">
                    <label>요청사유</label>
                  </th>
                  <td>
                      <textarea cols="270"
                                rows="6"
                                placeholder="요청사유를 입력해주세요"
                                v-model="detail.rsn_rqs"
                                style="width: 100%; margin-left: 7px"
                      ></textarea>
                  </td>
                  <th style="vertical-align: top;text-align: right ;width: 44px">
                    <label>비고</label>
                  </th>
                  <td>
                      <textarea cols="260"
                                rows="6"
                                placeholder="비고내용을 입력해주세요"
                                v-model="detail.rmrmk"
                                style="width: 100%; margin-left: 7px"
                      ></textarea>
                  </td>
                </div>
              </li>
            </ul>

          </section>

        </div>
        <section class="page-contents">
          <div class="grid1-box" style="height: 225px">
            <div class="div-header"><h2>배포목록</h2>
              <ul class="filter-btn">
                <button class="btn btn-filter-d" @click="formDownload">양식다운로드ⓘ</button>
                <button class="btn btn-filter-e" >
                  <label for="file">엑셀업로드</label>
                  <input type="file" id="file"  @change="gridExcelImport"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="display: none;">
                </button>
                <button class="btn btn-filter-e" @click="gridExcelExport2">엑셀다운로드</button>
                <button class="btn btn-filter-b" @click="gridAddRow">행추가</button>
                <button class="btn btn-filter-b" @click="gridDelRow">행삭제</button>
              </ul>
            </div>
            <div class="gridWrap" style="min-width: 750px;">
              <grid
                  ref="grid2"
                  :data="dataSource2"
                  :header="header2"
                  :columns="columns2"
                  :minBodyHeight="55"
                  :bodyHeight="150"
                  :minRowHeight="minRowHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions2"
                  :rowHeaders="rowHeaders2"
                  :rowHeight="rowHeight"
                  @click="onClick2"
              ></grid>
            </div>
          </div>
          <ul class="div-header">
            <li class="filter-btn" style="margin-right: 5px">
              <button class="btn btn-filter-p" @click="fnTar">TAR생성</button>
              <button class="btn btn-filter-p" @click="fnSave">저장</button>
            </li>
          </ul>
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

// 첨부파일 데이터를 받아옴
window.fileData = (fileLists) => {
  window.pms_register.file_name_list = [...fileLists]; // 받아온 데이터를 리스트에 저장
}
// 직원조회 팝업에서 받은 값
window.empData = (empnm ,empno, btn_id, gubun) => {

    if (btn_id === '1') {
      window.pms_register.info.rqs_nm = empnm
      window.pms_register.info.rqs_no = empno
    } else if (btn_id === '2') {
      window.pms_register.info.rvw_nm = empnm
      window.pms_register.info.rvw_no = empno
    } else if (btn_id === '3') {
      window.pms_register.info.aprv_nm = empnm
      window.pms_register.info.aprv_no = empno
    }

    if(btn_id === '4'){
      window.pms_register.detail.rqs_nm = empnm
      window.pms_register.detail.rqs_no = empno
    } else if(btn_id === '5'){
      window.pms_register.detail.rvw_nm = empnm
      window.pms_register.detail.rvw_no = empno
    } else if(btn_id === '6'){
      window.pms_register.detail.aprv_nm = empnm
      window.pms_register.detail.aprv_no = empno
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
    prcs_stts_cd_change(params)   {this.detail.prcs_stts_cd_selected = params},       // 배포요청상태
    dstr_change(params)           {this.detail.dstr_selected = params},               // 배포구분
    // 화면 init
    init() {
      // 그리드 초기화
      this.$refs.grid.invoke("clear");
      // 그리드1 전체 비활성화
      this.$refs.grid.invoke("disable");

    },

    fnTar() {
      // 그리드 초기화
      this.req_rscs = "";
      if(this.detail.save_prcs_stts_cd !== '100' && this.detail.save_prcs_stts_cd !== '180')  { alert("TRA생성은 배포요청상태가 [등록/TRA생성실패]가 아닌 경우 생성할 수없습니다."); return;}

      for(let i = 0; i<this.$refs.grid2.invoke("getData").length; i++){
          this.req_rscs += this.$refs.grid2.invoke("getValue", i, "rqs_pck_nm")+",";
      }

      this.req_rscs = this.req_rscs.slice(0, this.req_rscs.length - 1)

      console.log("req_rscs 확인 : " +  this.req_rscs)

      axiosService.get("http://10.94.30.90:14444/nideploy/reqmktar.jsp", {
        params: {
          reqid : this.detail.rqs_id,
          reqrscs : this.req_rscs,
        }
      }).then(res => {
        console.log("res", res)
        this.detail.prcs_stts_cd_selected                  = "190"
        this.$refs.combo.$data.prcs_stts_cd_selected       = "190"
        for(let i = 0; i<this.$refs.grid2.invoke("getData").length; i++){
          this.$refs.grid2.invoke("setValue", i, "scs_yn","성공");
        }
      }).catch(e => {
        this.detail.prcs_stts_cd_selected                  = "180"
        this.$refs.combo.$data.prcs_stts_cd_selected       = "180"
      })
      this.fnTarSave();
    },

    fnTarSave(){
        let gridData = this.$refs.grid2.invoke("getData");

        console.log("gridData ::", gridData)
        axiosService.post("/PJTE7200/insert_7200_01", {
          prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID
          rqs_id : this.detail.rqs_id,
          rsn_rqs : this.detail.rsn_rqs,
          rls_dt : this.detail.rls_dt,
          dstr : this.detail.dstr_selected,
          prcs_stts_cd : this.detail.prcs_stts_cd_selected,
          rqs_no : this.detail.rqs_no,
          rvw_no : this.detail.rvw_no,
          aprv_no : this.detail.aprv_no,
          rmrmk   : this.detail.rmrmk,
          org_file_nm : this.detail.org_file_nm,
          login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"), //로그인번호
          gridData : gridData,
        }).then(res => {
          alert("저장을 완료했습니다.")
        }).catch(e => {
          alert("저장에 실패했습니다.")
        })
    },

    // 저장 버튼
    fnSave(){
      //필수항목 확인
      console.log("dstr_selected ::", this.detail.dstr_selected)


      if(this.detail.dstr_selected === undefined || this.detail.dstr_selected === '')   { alert("배포구분은 필수 입력 사항입니다"); return;}
      if(this.detail.prcs_stts_cd_selected === undefined || this.detail.prcs_stts_cd_selected === '')   { alert("배포요청상태는 필수 입력 사항입니다"); return;}
      if(this.detail.rqs_no === undefined || this.detail.rqs_no === '')   { alert("요청자는 필수 입력 사항입니다"); return;}
      if(this.detail.rvw_no === undefined || this.detail.rvw_no === '')   { alert("검토자는 필수 입력 사항입니다"); return;}
      if(this.detail.aprv_no === undefined || this.detail.aprv_no === '')   { alert("승인자는 필수 입력 사항입니다"); return;}
      if(this.detail.rsn_rqs === undefined || this.detail.rsn_rqs === '')   { alert("요청사유는 필수 입력 사항입니다"); return;}

      if(this.detail.prcs_stts_cd_selected === '500' && this.detail.rls_dt === '')   { alert("배포요청상태가 [배포완료]인경우 배포일시는 필수입력사항입니다\n배포일시형식[YYYY-MM-DD HH24:II:SS]"); return;}
      console.log("prcs_stts_cd_selected ::", this.detail.prcs_stts_cd_selected)
      console.log("save_prcs_stts_cd ::", this.detail.save_prcs_stts_cd)
      if(this.detail.prcs_stts_cd_selected === '200' && this.detail.save_prcs_stts_cd !== '190')   { alert("배포요청상태가 [검토요청]인경우 이전배포요청이 [TAR생성성공]인경만 가능합니다."); return;}

      let gridData = this.$refs.grid2.invoke("getData");

      if (this.vaildation(gridData, "2") === false) {return;}

        if (confirm("정말 저장하시겠습니까?") === true) {
                console.log("gridData ::", gridData)
                axiosService.post("/PJTE7200/insert_7200_01", {
                  prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID
                  rqs_id : this.detail.rqs_id,
                  rsn_rqs : this.detail.rsn_rqs,
                  rls_dt : this.detail.rls_dt,
                  dstr : this.detail.dstr_selected,
                  prcs_stts_cd : this.detail.prcs_stts_cd_selected,
                  rqs_no : this.detail.rqs_no,
                  rvw_no : this.detail.rvw_no,
                  aprv_no : this.detail.aprv_no,
                  rmrmk   : this.detail.rmrmk,
                  org_file_nm : this.detail.org_file_nm,
                  login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"), //로그인번호
                  gridData : gridData,
                }).then(res => {
                  alert("저장을 완료했습니다.")
                  this.fnSearch()
                }).catch(e => {
                  alert("저장에 실패했습니다.")
                })

        }
    },

    // vaildation('검증 랗 데이터', '일반저장(1) | 기타저장(2) 구분')
    vaildation(data, division) {
      if(data.length === 0) { alert("배포목록은 한건이상 등록해야 합니다.");      return false;}
      for(let i=0; i<data.length; i++){
        if(data[i].tst_case_id === null)  { alert((i+1)+"번째 테스트케이스ID는 필수 입력 사항입니다"); return false;}
        if(data[i].mdfc        === null)  { alert((i+1)+"번째 수정사항은 필수 입력 사항입니다"); return false;}
        if(data[i].rqs_pck_nm  === null)  { alert((i+1)+"번째 배포요청패키지명은 필수 입력 사항입니다"); return false;}
      }
      return  true;
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
        this.$refs.grid2.invoke("setRequestParams", this.info);
        this.$refs.grid2.invoke("readData");
      }
    },

    onClick2(ev) {
      // 현재 Row 가져오기
      this.curRow2 = ev.rowKey;
    },

    //조회
    fnSearch(){
      this.fnClear()
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
      this.excelUplod = 'N'
    },

    // 조회한 데이터로 인적사항 데이터 바인딩
    cellDataBind(currentRowData) {
      this.info.rqs_id                                   = currentRowData.rqs_id                     // 요청 ID
      this.detail.rqs_id                                 = currentRowData.rqs_id                     // 요청 ID
      this.detail.rqs_dt                                 = currentRowData.rqs_dt                     // 요청일자
      this.detail.rls_dt                                 = currentRowData.rls_dt                     // 배포일시
      this.detail.rsn_rqs                                = currentRowData.rsn_rqs                    // 요청사유
      this.detail.rmrmk                                  = currentRowData.rmrmk                       // 비고
      this.detail.rqs_nm                                 = currentRowData.rqs_nm                     // 요청자
      this.detail.rqs_no                                 = currentRowData.rqs_no
      this.detail.rvw_nm                                 = currentRowData.rvw_nm                     // 검토자
      this.detail.rvw_no                                 = currentRowData.rvw_no
      this.detail.aprv_nm                                = currentRowData.aprv_nm                    // 승인자
      this.detail.aprv_no                                = currentRowData.aprv_no

      this.detail.prcs_stts_cd_selected                  = currentRowData.prcs_stts_cd
      this.$refs.combo.$data.prcs_stts_cd_selected       = currentRowData.prcs_stts_cd
      this.detail.save_prcs_stts_cd                      = currentRowData.prcs_stts_cd
      this.detail.dstr_selected                          = currentRowData.dstr
      this.$refs.combo.$data.dstr_selected               = currentRowData.dstr

      this.detail.atfl_mng_id = currentRowData.atfl_mng_id;              // (상세)첨부파일관리ID
      this.detail.org_file_nm = currentRowData.org_file_nm;              // (상세)원파일명
    },
    check_yn () {
      this.cmpl_yn ? this.info.cmpl_yn = 'N' : this.info.cmpl_yn = 'Y';
    },

    // 첨부파일등록 팝업 오픈
    open_file_page(num) {
      // console.log(num)
      let file_rgs_dscd = ''
      let atfl_mng_id = ''

      if (num == 1) {
        file_rgs_dscd = '806'
        atfl_mng_id = this.detail.atfl_mng_id
      }

      if(this.detail.rqs_id === undefined || this.detail.rqs_id === '')   { alert("첨부파일을 저장후 가능합니다."); return;}

      let bkup_id = '0000000000', prjt_id = this.info.prjt_nm_selected, mng_id = this.detail.rqs_id
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&mng_id=${mng_id}&file_rgs_dscd=${file_rgs_dscd}&num=${num}`, "open_file_page", "width=1000, height=800");
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
    //직원조회 버튼 클릭 시
    open_pjte9001_detail_btn(btn_id) {
      let empnm = ''

      if (btn_id == '4') {
        empnm = this.detail.rqs_nm
      } else if (btn_id == '5') {
        empnm = this.detail.rvw_nm
      } else if (btn_id == '6') {
        empnm = this.detail.aprv_nm
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
    open_pjte9001_dtail(btn_id) {
      let empnm = ''

      let prjt_id_selected = this.info.prjt_nm_selected
      let bkup_id_selected = this.info.bkup_id_selected

      if (btn_id == '4') {
        empnm = this.detail.rqs_nm
      } else if (btn_id == '5') {
        empnm = this.detail.rvw_nm
      } else if (btn_id == '6') {
        empnm = this.detail.aprv_nm
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
            if (btn_id == '4') {
              this.detail.rqs_no = res.data.data.contents[0].empno
              this.detail.rqs_nm = res.data.data.contents[0].empnm
            } else if (btn_id == '5') {
              this.detail.rvw_no = res.data.data.contents[0].empno
              this.detail.rvw_nm = res.data.data.contents[0].empnm
            } else if (btn_id == '6') {
              this.detail.aprv_no = res.data.data.contents[0].empno
              this.detail.aprv_nm = res.data.data.contents[0].empnm
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

      if(this.detail.rqs_nm === "") this.detail.rqs_nm = "";
      if(this.detail.rvw_nm === "") this.detail.rvw_nm = "";
      if(this.detail.aprv_nm === "") this.detail.aprv_nm = "";
    },
    // 직원명 삭제 시 직원번호 초기화
    setNo1() {
      if(this.info.rqs_nm === "") this.info.rqs_no = "";
      if(this.info.rvw_nm === "") this.info.rvw_no = "";
      if(this.info.aprv_nm === "") this.info.aprv_no = "";

      if(this.detail.rqs_nm === "") this.detail.rqs_no = "";
      if(this.detail.rvw_nm === "") this.detail.rvw_no = "";
      if(this.detail.aprv_nm === "") this.detail.aprv_no = "";
    },
    // 행추가
    gridAddRow(){
      console.log("prcs_stts_cd_selected ::", this.detail.prcs_stts_cd_selected)
      // if(this.detail.prcs_stts_cd_selected !== '100' && this.detail.prcs_stts_cd_selected !== 'undefined')   { alert("배포요청상태가 [등록]아닌 경우 행추가를 할수없습니다."); return;}
      this.addCheak = 'Y';
      this.$refs.grid2.invoke("appendRow",
          {},
          {focus:true}) ;
    },
    // 행삭제
    gridDelRow(){
      if(this.detail.prcs_stts_cd_selected !== '100' && this.detail.prcs_stts_cd_selected !== 'undefined')   { alert("배포요청상태가 [등록]아닌 경우 행삭제를 할수없습니다."); return;}
      this.addCheak = 'N'
      this.$refs.grid2.invoke("removeRow", this.curRow2, {showConfirm:false});
    },
    // [신규초기화] 버튼 클릭 시 상세내용 값 초기화
    fnClear() {
      this.detail.rsn_rqs  = ''
      this.detail.rqs_id   = ''
      this.detail.rqs_dt   = ''
      this.detail.rls_dt   = ''
      this.detail.rqs_no   = ''
      this.detail.rqs_nm   = ''
      this.detail.rvw_no   = ''
      this.detail.rvw_nm   = ''
      this.detail.aprv_no  = ''
      this.detail.aprv_nm  = ''
      this.detail.rmrmk   = ''
      this.detail.org_file_nm = ''
      this.detail.dstr_selected                      = '';
      this.$refs.combo.$data.dstr_selected           = '';
      this.detail.prcs_stts_cd_selected              = '';
      this.$refs.combo.$data.prcs_stts_cd_selected   = '';
      this.detail.save_prcs_stts_cd  = ''

      this.detail.save_yn               = 'N' ;       // 등록가능여부
      this.newCheck                     = 'Y';
      this.$refs.grid2.invoke("clear");
    },

    gridExcelExport() {
      this.$refs.grid.invoke("export", "xlsx", {fileName: "배포요청관리(요청내역)_"+this.getCurrentYyyymmdd(), useFormattedValue : true, onlySelected:true});
    },
    gridExcelExport2() {
      this.$refs.grid2.invoke("export", "xlsx", {fileName: "배포요청관리(배포목록)_"+this.getCurrentYyyymmdd(), useFormattedValue : true, onlySelected:true});
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
// 양식다운로드
    formDownload(){
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem("LOGIN_PROJ_ID"), bzcd=sessionStorage.getItem("LOGIN_BZCD"), atfl_mng_id = "0000000000", file_rgs_dscd = '901' //atfl_mng_id 값은 양식 파일 첨부 ID 추후에 추가
      this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&bzcd=${bzcd}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=650");
    },

    gridExcelImport(event) {
      // 엑셀파일 업로드 로직 추가
      if(this.detail.prcs_stts_cd_selected !== '100' && this.detail.prcs_stts_cd_selected !== 'undefined')   { alert("배포요청상태가 [등록]아닌 경우 엑셀업로드를 할수없습니다."); return;}
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
          if (sheetName === '배포목록' || sheetName === 'Sheet1') {
            console.log(wb.Sheets[sheetName])
            wb.Sheets[sheetName].A1.w = "No"
            wb.Sheets[sheetName].B1.w = "tst_case_id"
            wb.Sheets[sheetName].C1.w = "mdfc"
            wb.Sheets[sheetName].D1.w = "rqs_pck_nm"
            let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);

            gridExcelData = JSON.parse(JSON.stringify(rowObj));
            console.log("gridExcelData ::", gridExcelData)
          }
        })
        this.excelUplod = 'Y'
        try {
          this.$refs.grid2.invoke('resetData', gridExcelData)
          alert('업로드 파일이 적용되었습니다.')
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
    file_name_list() {
      // 1. 첨부파일 1개만 보여줄 때
      this.detail.org_file_nm = this.file_name_list[0].org_file_nm
      this.detail.atfl_mng_id = this.file_name_list[this.file_name_list.length-1].atfl_mng_id
    },
  },

// 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList: ["C0", "C27"],
      comboList2: ["C58"],
      comboList3: ["C3-57", "C3-58"],

      gridData: [],
      newCheck: 'Y',
      excelUplod: 'N',
      addCheak: 'N',
      cmpl_yn : false,
      file_name_list: [],

      req_rscs_array : [],
      req_rscs : "",    //배포패키지명 리스트

      tar: {
        issuc : false,
        reqid : "",
        tarname: [],
      },
      info: {
        prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트명
        bkup_id_selected: '0000000000',                                 // 백업ID
        dstr_selected : '',
        prcs_stts_cd_selected : '',

        rqs_id : '',
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
        rmrmk      : '',
        save_prcs_stts_cd : '',

        rqs_nm : '', //요청자이름
        rqs_no : '', //요청자번호
        aprv_nm : '', //승인자이름
        aprv_no : '', //승인자번호
        rvw_nm : '', //검토자이름
        rvw_no : '', //검토자번호
        rqs_dt  : '', //요청일자
        rls_dt  : '', //배포일자

        atfl_mng_id: this.atfl_mng_id,    // 첨부파일관리ID
        org_file_nm: this.org_file_nm,    // 원파일명

        dstr_selected : '',
        prcs_stts_cd_selected : '',
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
      curRow2: -1,
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
        complexColumns: [
          {header: '요청자',           name: 'mergeColumn1', childNames: ['rqs_nm','rqs_no']},
          {header: '검토자',           name: 'mergeColumn2', childNames: ['rvw_nm','rvw_no']},
          {header: '승인자',           name: 'mergeColumn3', childNames: ['aprv_nm','aprv_no']},
        ]
      },
      columns: [
        {
          header: '요청 ID',
          width: 110,
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
          header: '배포일시',
          width: 150,
          align: 'center',
          name: 'rls_dt',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '배포구분',
          width: 120,
          align: 'center',
          name: 'dstr',
          formatter: 'listItemText',
          filter: 'select',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000057
            }
          }
        },
        {
          header: '처리상태',
          width: 120,
          align: 'center',
          name: 'prcs_stts_cd',
          formatter: 'listItemText',
          filter: 'text',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000058
            }
          },
        },
        {
          header: '이름',
          width: 70,
          align: 'center',
          name: 'rqs_nm',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '사번',
          width: 80,
          align: 'center',
          name: 'rqs_no',
          filter: 'text',
        },
        {
          header: '이름',
          width: 70,
          align: 'center',
          name: 'rvw_nm',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '사번',
          width: 80,
          align: 'center',
          name: 'rvw_no',
          filter: 'text',
        },
        {
          header: '이름',
          width: 70,
          align: 'center',
          name: 'aprv_nm',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '사번',
          width: 80,
          align: 'center',
          name: 'aprv_no',
          filter: 'text',
        },
        {
          header: '비고',
          width: 80,
          align: 'left',
          name: 'rmrmk',
          filter: 'text',
          hidden : true,
        },
        {
          header: '첨부파일',
          width: 80,
          align: 'left',
          name: 'atfl_mng_id',
          filter: 'text',
          hidden : true,
        },
        {
          header: '첨부파일명',
          width: 80,
          align: 'left',
          name: 'org_file_nm',
          filter: 'text',
          hidden : true,
        },
      ],

      dataSource2: {
        api: {
          readData: {url: process.env.VUE_APP_API + '/PJTE7200/select_7200_02', method: 'GET'},
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
        height: 25,
        complexColumns: []
      },
      columns2: [
        {
          header: '테스트케이스ID',
          width: 150,
          align: 'center',
          name: 'tst_case_id',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '수정사항',
          width: 570,
          align: 'left',
          name: 'mdfc',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '배포요청패키지명',
          align: 'left',
          name: 'rqs_pck_nm',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '생성상태',
          width: 80,
          align: 'left',
          name: 'scs_yn',
          filter: 'text',
        },
      ]
    }
  }
};

</script>
<style>
</style>
