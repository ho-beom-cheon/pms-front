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
        <ul class="filter-con clear-fix" style="width : 100%">
          <combo
              :comboArray = "this.comboList"
              @prjt_nm_change="prjt_nm_change"
          ></combo>
          <li class="filter-item-n">
            <div class="input-searchWrap" >작성자
              <input type="text"
                     placeholder="직원명"
                     v-model="info.athr_nm"
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
                   v-model="info.athr_no"
                   style="width: 90px; background-color: #f2f2f2;"
                   :disabled=true
            >
          </li>
          <li class="filter-item">
            <div class="item-con">회의일자
              <div class="input-dateWrap">
                <input type="date"
                       :max="mtn_edt"
                       v-model="mtn_sdt"
                       style="width: 125px"
                ></div>
              -
              <div class="input-dateWrap">
                <input type="date"
                       :min="mtn_sdt"
                       v-model="mtn_edt"
                       style="width: 125px"
                ></div>
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">
              <input type="checkbox" id="del_yn" v-model="del_yn">
              <label>　삭제건 포함</label>
            </div>
          </li>
        </ul>
          <ul class="filter-con clear-fix">
          <li class="filter-item">
            <div class="input-searchWrap" >회의주제
              <input type="text"
                     v-model="info.cnf_wek"
                     style="width: 413px"
                     placeholder="입력"
              >
            </div>
          </li>
          <li class="filter-item">
            <div class="input-searchWrap" >회의내용
              <input type="text"
                     v-model="info.mtn_dtl"
                     style="width: 600px"
                     placeholder="입력"
              >
            </div>
          </li>
        </ul>
        <ul class="filter-btn">
          <button class="btn btn-filter-p" style="margin-left: 10px" @click="fnSearch">조회</button>
        </ul>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box" style="height: 200px">
          <div class="div-header"><h2>회의정보</h2>
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
                :minBodyHeight="50"
                :bodyHeight="110"
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
          <div class="div-header-b"><h2>회의 상세정보</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-b" style="margin-left: 20px" @click="fnClear">신규초기화</button>
            </ul>
          </div>
          <section class="filter">
            <ul class="filter-con clear-fix" style="width: 100%">
              <li class="filter-item" style="margin-left: 12px">
                <div class="item-con" >관리ID
                  <input type="text"
                         placeholder="입력불가"
                         id      = "mng_id"
                         v-model="detail.mng_id"
                         style= "width: 250px; background-color: #f2f2f2 ;margin-left: 5px"
                         :disabled = true
                  >
                </div>
              </li>
              <li class="filter-item"   style="margin-left: 10px">
                <div class="item-con">회의일자
                  <div class="input-dateWrap">
                    <input type="date"
                           v-model="detail.mtn_dt"
                           style="width: 250px;margin-left: 5px"
                    ></div>
                </div>
              </li>
              <li class="filter-item"   style="margin-left: 10px">
                <div class="item-con">회의시간
                  <input type="text"
                         placeholder="입력"
                         v-model="detail.mtn_tm"
                         style= "width: 250px; margin-left: 5px"
                  >
                </div>
              </li>
              <li class="filter-item"   style="margin-left: 10px">
                <div class="item-con">회의장소
                  <input type="text"
                         placeholder="입력"
                         v-model="detail.mtn_plc"
                         style= "width: 250px; margin-left: 5px"
                  >
                </div>
              </li>
              <li class="filter-item-n">
                <div class="input-searchWrap" style="margin-left: 26px">작성자
                  <input type="text"
                         placeholder="직원명"
                         v-model="detail.athr_nm"
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
                       v-model="detail.athr_no"
                       style="width: 90px; background-color: #f2f2f2;"
                       :disabled=true
                >
              </li>
            </ul>
            <ul class="filter-con clear-fix" style="width: 100%">
              <li class="filter-item" style="margin-left: 2px">
                <div class="item-con" >회의주제
                  <input type="text"
                         placeholder="회의주제를 입력해주세요"
                         ref="address"
                         v-model="detail.cnf_wek"
                         style="width: 1510px; margin-left: 5px"
                  >
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix"  style="width: 100%">
              <li class="filter-item" style="width: 100%">
                <div class="item-con">
                  <th style="vertical-align: middle;text-align: right ;width: 46px;">
                    <label>회의내용</label>
                  </th>
                  <td>
                      <textarea cols="140"
                                rows="8"
                                placeholder="회의내용을 입력해주세요"
                                v-model="detail.mtn_dtl"
                                style="width: 1510px; margin-left: 7px"
                                @dblclick="modalView(1)"
                      ></textarea>
                  </td>
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix"  style="width: 100%">
              <li class="filter-item" style="width: 100%">
                <div class="item-con">
                  <th style="vertical-align: middle;text-align: right ;width: 46px;">
                    <label>회의결과</label>
                  </th>
                  <td>
                      <textarea cols="140"
                                rows="8"
                                placeholder="회의결과를 입력해주세요"
                                v-model="detail.mtn_rsl"
                                style="width: 1510px; margin-left: 7px"
                                @dblclick="modalView(2)"
                      ></textarea>
                  </td>
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix"  style="width: 100%">
              <li class="filter-item" style="width: 100%">
                <div class="item-con">
                  <th style="vertical-align: middle;text-align: right ;width: 46px;">
                    <label>요청사항</label>
                  </th>
                  <td>
                      <textarea cols="140"
                                rows="8"
                                placeholder="요청사항을 입력해주세요"
                                v-model="detail.rqs_dtl"
                                style="width: 1510px; margin-left: 7px"
                                @dblclick="modalView(3)"
                      ></textarea>
                  </td>
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix"  style="width: 100%">
              <li class="filter-item" style="width: 100%">
                <div class="item-con">
                  <th style="vertical-align: middle;text-align: right ;width: 46px">
                    <label>참석자</label>
                  </th>
                  <td>
                      <textarea cols="140"
                                rows="5"
                                placeholder="참석자를 입력해주세요"
                                v-model="detail.atnd_dtl"
                                style="width: 1510px; margin-left: 7px"
                      ></textarea>
                  </td>
                </div>
              </li>
            </ul>
                <ul class="filter-con clear-fix" >
                  <li class="filter-item">
                    <div class="item-con" >첨부파일
                      <input type="text"
                             ref="address"
                             v-model="detail.org_file_nm"
                             style="background-color: #f2f2f2; width: 515px;"
                             :disabled=true
                      >
                    </div>
                  </li>
                </ul>
                <ul class="filter-btn" style="justify-content: start" v-if="this.detail.mng_id">
                  <button class="btn btn-filter-e" style="margin-bottom: 4px" @click="open_file_page" >첨부</button>
                </ul>
                <ul class="filter-btn" style="justify-content: start" v-else>
                  <p style="margin-bottom: 10px;">첨부파일등록은 저장 후 가능합니다.</p>
                </ul>

              <li class="filter-btn">
                <button class="btn btn-filter-p" style="margin-bottom: 4px" @click="fnDelete" :disabled = "deleteBtn_yn">삭제</button>
                <button class="btn btn-filter-p" style="margin-bottom: 4px; margin-left: 10px" @click="fnSave" :disabled = "saveBtn_yn">저장</button>
              </li>

          </section>
        </div>

        <br>
        <br>
        <br>
        <br>
        <Modal :show.sync="detail.modals.txt_modal1"  class="modal_main">
          <div class="div-header-b">
            <h2 v-if="this.large_num == '1'">회원내용 확대보기</h2>
            <h2 v-if="this.large_num == '2'">회의결과 확대보기</h2>
            <h2 v-if="this.large_num == '3'">요청사항 확대보기</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-b" @click="textSizeUP">+ 확대</button>
              <button class="btn btn-filter-b" @click="textSizeDown">- 축소</button>
            </ul>
          </div>
          <tr>
            <textarea v-if="this.large_num == '1'"
                      id="detailTextArea1"
                      v-model="detail.mtn_dtl"
                      :disabled=true
                      style="height: 690px; width: 1650px; background-color: #f2f2f2; border: none; line-height: normal;font-size : 30px"
            ></textarea>
            <textarea v-if="this.large_num == '2'"
                      cols="200"
                      rows="105"
                      id="detailTextArea2"
                      v-model="detail.mtn_rsl"
                      :disabled=true
                      style="height: 690px; width: 1650px; background-color: #f2f2f2; border: none; line-height: normal;font-size : 30px"
            ></textarea>
            <textarea v-if="this.large_num == '3'"
                      cols="200"
                      rows="105"
                      id="detailTextArea3"
                      v-model="detail.rqs_dtl"
                      :disabled=true
                      style="height: 690px; width: 1650px; background-color: #f2f2f2; border: none; line-height: normal;font-size : 30px"
            ></textarea>
            <div style="float: right;margin-top: 5px">
              <button class="btn btn-filter-b" @click="fnCloseModal">닫기</button>
            </div>
          </tr>
        </Modal>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import Combo from "@/components/Combo"
import { Grid } from '@toast-ui/vue-grid';
import PmsSideBar from  "@/components/PmsSideBar";
import Modal from "@/components/Modal";
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http";
import XLSX from "xlsx";

// 첨부파일 팝업에서 받은 값
window.fileData = (fileLists) => {
  window.pms_register.file_name_list = [...fileLists];
}

// 직원조회 팝업에서 받은 값
window.empData = (empnm ,empno, btn_id) => {
  if(btn_id === '1'){
    window.pms_register.info.athr_nm = empnm
    window.pms_register.info.athr_no = empno
  } else if(btn_id === '2'){
    window.pms_register.detail.athr_nm = empnm
    window.pms_register.detail.athr_no = empno
  }
}

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    Modal,
    grid: Grid,
    PmsSideBar
  },

  mounted() {
    // 화면 접속 시 데이터 조회
    this.fnSearch();
    // 화면 초기화
    this.init();
    window.pms_register = this;
  },
  updated(){
    this.setNo();
  },

// 일반적인 함수를 선언하는 부분
  methods: {
    // Combo.vue 에서 받아온 값
    prjt_nm_change(params)        {this.info.prjt_nm_selected = params},

    // 화면 init
    init() {
      // 그리드 초기화
      this.$refs.grid.invoke("clear");
      // 그리드1 전체 비활성화
      this.$refs.grid.invoke("disable");
    },

    // 삭제
    fnDelete() {
      if (confirm("정말 삭제하시겠습니까?") === true) {
        axiosService.put("/PJTE8100/delete", {
          prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
          mng_id: this.detail.mng_id,                               // 관리아이디
          login_emp_no:sessionStorage.getItem("LOGIN_EMP_NO"), //로그인번호
        }).then(res => {
          console.log(res);
          alert("삭제에 성공했습니다.");
          this.fnSearch();
          this.$refs.grid.invoke("reloadData");
        }).catch(e => {
          alert("삭제에 실패했습니다.")
        })
      } else {   //취소
        return;
      }
    },

    // 저장 버튼
    fnSave(){
      //필수항목 확인
      if (this.checkPrimary() == true) {
        if (confirm("정말 저장하시겠습니까?") === true) {
          if(this.newCheck == "Y"){
            axiosService.post("/PJTE8100/insert", {
              prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID
              mng_id: this.detail.mng_id,                            //관리id
              cnf_wek: this.detail.cnf_wek,                          // 회의주제
              mtn_dt: this.detail.mtn_dt,                            // 회의일자
              mtn_tm: this.detail.mtn_tm,                            // 회의시간
              mtn_plc: this.detail.mtn_plc,                          // 회의장소
              athr_no: this.detail.athr_no,                          // 작성자
              mtn_rsl: this.detail.mtn_rsl,                          // 회의결과
              mtn_dtl: this.detail.mtn_dtl,                          // 회의내용
              rqs_dtl: this.detail.rqs_dtl,                          // 요청사항
              atnd_dtl: this.detail.atnd_dtl,                        // 참석자
              login_emp_no:sessionStorage.getItem("LOGIN_EMP_NO"), //로그인번호
            }).then(res => {
              this.$refs.grid.invoke("reloadData");
              alert("신규저장을 완료했습니다.")
              this.fnSearch()
            }).catch(e => {
              alert("신규저장에 실패했습니다.")
            })
          }else{
            //기등록일때
            if (sessionStorage.getItem("LOGIN_EMP_NO") == this.detail.athr_no) {
              axiosService.put("/PJTE8100/update", {
                prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID
                mng_id: this.detail.mng_id,                            //관리id
                cnf_wek: this.detail.cnf_wek,                          // 회의주제
                mtn_dt: this.detail.mtn_dt,                            // 회의일자
                mtn_tm: this.detail.mtn_tm,                            // 회의시간
                mtn_plc: this.detail.mtn_plc,                          // 회의장소
                mtn_dtl: this.detail.mtn_dtl,                          // 회의내용
                mtn_rsl: this.detail.mtn_rsl,                          // 회의결과
                rqs_dtl: this.detail.rqs_dtl,                          // 요청사항
                atnd_dtl: this.detail.atnd_dtl,                        // 참석자
                atfl_mng_id : this.detail.atfl_mng_id,                 // 첨부파일id
                login_emp_no:sessionStorage.getItem("LOGIN_EMP_NO"), //로그인번호
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
      if (this.detail.mtn_dt == "" || this.detail.mtn_dt == null) {
        alert('회의일자는 필수 입력사항입니다.');
        return false;
      } else if (this.detail.mtn_tm == "" || this.detail.mtn_tm == null) {
        alert('회의시간은 필수 입력사항입니다.');
        return false;
      } else if (this.detail.mtn_plc == "" || this.detail.mtn_plc == null) {
        alert('회의장소는 필수 입력사항입니다.');
        return false;
      }  else if (this.detail.athr_no == "" || this.detail.athr_no == null) {
        alert('작성자는 필수 입력사항입니다.');
        return false;
      }  else if (this.detail.cnf_wek == "" || this.detail.cnf_wek == null) {
        alert('회의주제는 필수 입력사항입니다.');
        return false;
      } else if (this.detail.mtn_dtl == "" || this.detail.mtn_dtl == null) {
        alert('회의내용은 필수 입력사항입니다.');
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

      // 그리드 row 클릭 시 상세내용에 Bind
      if (currentRowData != null) {
        this.cellDataBind(currentRowData) // currentRowData가 있을 때 Row 클릭 시 상세내용에 Bind
      }
    },

    //조회
    fnSearch(){
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },

    // 조회한 데이터로 인적사항 데이터 바인딩
    cellDataBind(currentRowData) {
      this.detail.mng_id               = currentRowData.mng_id              // 관리id
      this.detail.athr_no              = currentRowData.athr_no             // 작성자사번
      this.detail.athr_nm              = currentRowData.athr_nm             // 작성자명
      this.detail.mtn_dt               = currentRowData.mtn_dt              // 회의일자
      this.detail.cnf_wek              = currentRowData.cnf_wek             // 회의주제
      this.detail.mtn_dtl              = currentRowData.mtn_dtl             // 회의내용
      this.detail.mtn_rsl              = currentRowData.mtn_rsl             // 회의결과
      this.detail.atnd_dtl             = currentRowData.atnd_dtl            // 참석자
      this.detail.rqs_dtl              = currentRowData.rqs_dtl             // 요청사항
      this.detail.prjt_id              = currentRowData.prjt_id             // 프로젝트id
      this.detail.bkup_id              = currentRowData.bkup_id             // 백업id
      this.detail.mtn_plc              = currentRowData.mtn_plc             // 회의장소
      this.detail.del_yn               = currentRowData.del_yn              // 삭제여부
      this.detail.mtn_tm               = currentRowData.mtn_tm              // 회의시간
      this.detail.atfl_mng_id          = currentRowData.atfl_mng_id         // 첨부파일관리id
      this.detail.org_file_nm          = currentRowData.org_file_nm         // 첨부파일명

      //작성자 본인 이거나 관리구분코드가 (500,600,900) 일때 삭제버튼 활성화
      if(sessionStorage.getItem("LOGIN_EMP_NO") === currentRowData.athr_no ||sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600'|| sessionStorage.getItem("LOGIN_AUT_CD") === '900'){
        this.deleteBtn_yn = false
      }else{
        this.deleteBtn_yn = true
      }

      if(currentRowData.del_yn === 'Y'){
        document.getElementById("openFile1").disabled =true;
        this.saveBtn_yn = true
        this.deleteBtn_yn = true
      }else{
        document.getElementById("openFile1").disabled =false;
        this.saveBtn_yn = false
      }
    },

    //직원조회 버튼 클릭 시
    open_pjte9001_btn(btn_id) {
      let empnm = ''

      if (btn_id == '1') {
        empnm = this.info.athr_nm
      } else if (btn_id == '2') {
        empnm = this.detail.athr_nm
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
        empnm = this.info.athr_nm
      } else if (btn_id == '2') {
        empnm = this.detail.athr_nm
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
                  this.info.athr_no = res.data.data.contents[0].empno
                  this.info.athr_nm = res.data.data.contents[0].empnm
                } else if (btn_id == '2') {
                  this.detail.athr_no = res.data.data.contents[0].empno
                  this.detail.athr_nm = res.data.data.contents[0].empnm
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
      if(this.info.athr_nm === "") this.info.athr_no = "";
      if(this.detail.athr_nm === "") this.detail.athr_no = "";
    },

    // [신규초기화] 버튼 클릭 시 상세내용 값 초기화
    fnClear() {
      this.detail.athr_no       = sessionStorage.getItem("LOGIN_EMP_NO");       // 작성자사번
      this.detail.athr_nm       = sessionStorage.getItem("LOGIN_EMP_NM");       // 작성자명
      this.detail.mng_id        = '';                                               // 관리id
      this.detail.mtn_dt        = '';                                               // 회의일자
      this.detail.cnf_wek       = '';                                               // 회의주제
      this.detail.mtn_dtl       = '';                                               // 회의내용
      this.detail.mtn_rsl       = '';                                               // 회의결과
      this.detail.atnd_dtl      = '';                                               // 참석자
      this.detail.rqs_dtl       = '';                                               // 요청사항
      this.detail.bkup_id       = '';                                               // 백업id
      this.detail.prjt_id       = '';                                               // 프로젝트id
      this.detail.mtn_plc       = '';                                               // 회의장소
      this.detail.del_yn        = '';                                               // 삭제여부
      this.detail.mtn_tm        = '';                                               // 회의시간
      this.detail.atfl_mng_id   = '';                                               // 첨부파일관리id
      this.detail.org_file_nm   = '';                                               // 첨부파일명

      this.deleteBtn_yn = true;
      this.saveBtn_yn = false;
      this.newCheck = 'Y';
      document.getElementById("openFile1").disabled =true;
    },

    gridExcelExport() {
      this.$refs.grid.invoke("export", "xlsx", {fileName: "엑셀다운로드"});
    },

    fnCloseModal(){  // 모달창 닫기
      this.detail.modals.txt_modal1 = false;
    },
    //더블클릭시 레이어 띄우기위해
    modalView(num){
      //true일때 레이어 오픈
      this.detail.modals.txt_modal1 = true;

      if (num == 1) {
        this.large_num = '1'
      } else if (num == 2) {
        this.large_num = '2'
      } else if (num == 3) {
        this.large_num = '3'
      }
    },
    //상세내용 확대보기  (+확대버튼)
    textSizeUP() {
      this.defaultFontSize++;
      if(this.large_num == '1'){
        document.getElementById("detailTextArea1").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '2') {
        document.getElementById("detailTextArea2").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '3') {
        document.getElementById("detailTextArea3").style.fontSize = this.defaultFontSize + 'px';
      }
    },

    //상세내용 확대보기  (-축소버튼)
    textSizeDown() {
      this.defaultFontSize--;
      if(this.large_num == '1'){
        document.getElementById("detailTextArea1").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '2') {
        document.getElementById("detailTextArea2").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '3') {
        document.getElementById("detailTextArea3").style.fontSize = this.defaultFontSize + 'px';
      }
    },
    // 첨부파일등록 팝업 오픈
    open_file_page() {
      let file_rgs_dscd = '804'
      let atfl_mng_id = this.detail.atfl_mng_id
      let mng_id = this.detail.mng_id
      let bkup_id = '0000000000', prjt_id = sessionStorage.getItem("LOGIN_PROJ_ID")
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&mng_id=${mng_id}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
    },
  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{
    // del_yn 값 변하면 info 내의 del_yn 값 변화
    del_yn () {
      this.del_yn ? this.info.del_yn = 'Y' : this.info.del_yn = 'N';
    },
    // 일자들은 데이터 조회시 '-' 이 빠져야 하므로 .split('-').join('')으로 통일
    mtn_sdt (){
      this.info.mtn_sdt = this.mtn_sdt.split('-').join('');
    } ,    // 신청일자STA
    mtn_edt () {
      this.info.mtn_edt = this.mtn_edt.split('-').join('');
    },    // 신청일자END

    //첨부파일
    file_name_list() {
      this.detail.org_file_nm = this.file_name_list[0].org_file_nm
      this.detail.atfl_mng_id = this.file_name_list[this.file_name_list.length-1].atfl_mng_id
    },
  },

// 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C0"],

      gridData: [],
      file_name_list : [],
      atfl_num : '',
      newCheck : 'Y',
      defaultFontSize: 40,
      large_num : '',
      deleteBtn_yn : true,
      saveBtn_yn   : false,
      del_yn    : false,  // 완료건 포함(체크박스 값)
      mtn_sdt               : '',                                           // 회의시작일자
      mtn_edt               : '',                                           // 회의종료일자

      info : {
        prjt_nm_selected      : sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트명
        bkup_id_selected      : '0000000000',                                 // 백업ID
        athr_no               : '',                                           // 작성자사번
        athr_nm               : '',                                           // 작성자명
        del_yn                : 'N',                                          // 완료건포함(데이터 조회용)
        mtn_sdt               : '',                                           // 회의시작일자
        mtn_edt               : '',                                           // 회의종료일자
        cnf_wek               : '',                                           // 회의주제
        mtn_dtl               : '',                                           // 회의내용
      },

      detail : {
        athr_no               : sessionStorage.getItem("LOGIN_EMP_NO"),       // 작성자사번
        athr_nm               : sessionStorage.getItem("LOGIN_EMP_NM"),       // 작성자명
        mng_id                : '',                                               // 관리id
        mtn_dt                : '',                                               // 회의일자
        cnf_wek               : '',                                               // 회의주제
        mtn_dtl               : '',                                               // 회의내용
        mtn_rsl               : '',                                               // 회의결과
        atnd_dtl              : '',                                               // 참석자
        rqs_dtl               : '',                                               // 요청사항
        bkup_id               : '',                                               // 백업id
        prjt_id               : '',                                               // 프로젝트id
        mtn_plc               : '',                                               // 회의장소
        del_yn                : '',                                               // 삭제여부
        mtn_tm                : '',                                               // 회의시간
        atfl_mng_id           : '',                                               // 첨부파일관리id
        org_file_nm           : '',                                               // 첨부파일명
        save_yn               : 'N',                                              // 등록가능여부

        /* 그리드 상세보기 모달 속성 */
        modals: {
          txt_modal1: false,
        },
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

      // toast ui grid 데이터
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE8100/select', method: 'GET' },
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
      },
      columns: [
        {
          header: '관리 ID',
          width: 90,
          align: 'center',
          name: 'mng_id',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '회의일자',
          width: 100,
          align: 'center',
          name: 'mtn_dt',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '회의주제',
          width: 300,
          align: 'left',
          name: 'cnf_wek',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '회의내용',
          width: 300,
          align: 'left',
          name: 'mtn_dtl',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '회의결과',
          width: 280,
          align: 'left',
          name: 'mtn_rsl',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '요청사항',
          width: 300,
          align: 'left',
          name: 'rqs_dtl',
          filter: 'text',
        },
        {
          header: '작성자',
          width: 90,
          align: 'left',
          name: 'athr_nm',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '참석자',
          width: 180,
          align: 'left',
          name: 'atnd_dtl',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '삭제',
          width: 40,
          align: 'center',
          name: 'del_yn',
          filter: 'select',
        },
        {
          header: '회의시간',
          width: 60,
          align: 'center',
          name: 'mtn_tm',
        },
        {
          header: '회의장소',
          width: 100,
          align: 'center',
          name: 'mtn_plc',
        },
        {
          header: '백업id',
          width: 300,
          align: 'center',
          name: 'bkup_id',
          hidden : true,
        },
        {
          header: '프로젝트id',
          width: 300,
          align: 'center',
          name: 'prjt_id',
          hidden : true,
        },

        {
          header: '작성자사번',
          width: 300,
          align: 'center',
          name: 'athr_no',
          hidden : true,
        },
        {
          header: '첨부파일관리id',
          width: 300,
          align: 'center',
          name: 'atfl_mng_id',
          hidden : true,
        },
        {
          header: '첨부파일명',
          width: 300,
          align: 'center',
          name: 'org_file_nm',
          hidden : true,
        },
      ],
    }
  },
};

</script>

<style>
.modal-content {
  width :1680px;
  height : 800px;
}
.modal-body .modal-mid{
  background-color: #fff;
  font-weight: bold;
  font-size: 15px;
  height: 5vh;
  width : 700px;
  margin: 20px;
}
.line-con {
  display:flex
}
.modal-dialog {
  max-width: 1680px;
  max-height: 800px;
  margin-left : 7.75rem;
}
</style>
