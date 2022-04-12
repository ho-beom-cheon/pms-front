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
              @mtng_room_id_change="mtng_room_id_change"
          ></combo>
          <li class="filter-item">
            <div class="item-con">예약일자
              <div class="input-dateWrap">
                <input type="date"
                       :max="info.rsr_endt"
                       v-model="info.rsr_strt"
                       style="width: 125px"
                ></div>
              -
              <div class="input-dateWrap">
                <input type="date"
                       :min="info.rsr_strt"
                       v-model="info.rsr_endt"
                       style="width: 125px"
                ></div>
            </div>
          </li>
          <li class="filter-item-n">
            <div class="input-searchWrap" >예약자
              <input type="text"
                     placeholder="직원명"
                     v-model="info.rsr_nm"
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
                   v-model="info.rsr_no"
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
        <div class="grid1-box" style="height: 570px">
          <div class="div-header"><h2>예약내역</h2>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid"
                :data="dataSource"
                :header="header"
                :columns="columns"
                :minBodyHeight="55"
                :bodyHeight="500"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeaders="rowHeaders"
                :rowHeight="rowHeight"
                @click="onClick"
            ></grid>
          </div>
        </div>
        <div class="grid1-box" style="height: 200px">
          <div class="div-header-b"><h2>예약정보</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-b" style="margin-left: 20px" @click="fnClear">신규초기화</button>
            </ul>
          </div>
          <section class="filter">
            <ul class="filter-con clear-fix" style="width: 100%">
              <combo
                  ref="combo2"
                  :comboArray = "this.comboList2"
                  @mtng_room_id_change_iss="mtng_room_id_change_iss"
              ></combo>
              <li class="filter-item-n">
                <div class="input-searchWrap" style="margin-left: 32px">예약자
                  <input type="text"
                         placeholder="직원명"
                         v-model="detail.rsr_nm"
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
                       v-model="detail.rsr_no"
                       style="width: 90px; background-color: #f2f2f2;"
                       :disabled=true
                >
              </li>
            </ul>
            <ul class="filter-con clear-fix"  style="width: 100%">
              <li class="filter-item">
                <div class="item-con">회의일자
                  <div class="input-dateWrap">
                    <input type="date"
                           v-model="detail.rsr_dt"
                           style="width: 125px"
                    ></div>
                </div>
              </li>
              <combo
                  ref="combo3"
                  :comboArray = "this.comboList3"
                  @rsr_strt_change="rsr_strt_change"
                  @rsr_endt_change="rsr_endt_change"
              ></combo>
            </ul>
            <ul class="filter-con clear-fix"  style="width: 100%">
              <li class="filter-item" style="width: 100%">
                <div class="item-con" >회의제목
                  <input type="text"
                         placeholder="입력"
                         ref="address"
                         v-model="detail.mtng_ttl"
                         style="width: 95%; "
                  >
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix" >
              <li class="filter-item">
                <div class="item-con" >회의자료
                  <input type="text"
                         ref="address"
                         v-model="detail.org_file_nm"
                         style="background-color: #f2f2f2; width: 515px;"
                         :disabled=true
                  >
                </div>
              </li>
            </ul>
            <ul class="filter-btn" style="justify-content: start" v-if="this.detail.sqno">
              <button class="btn btn-filter-e" style="margin-bottom: 4px" @click="open_file_page" >첨부</button>
            </ul>
            <ul class="filter-btn" style="justify-content: start" v-else>
              <p style="margin-bottom: 10px;">첨부파일등록은 저장 후 가능합니다.</p>
            </ul>
            <ul class="filter-btn">
              <button class="btn btn-filter-p" style="margin-bottom: 4px" @click="fnDelete" :disabled = "deleteBtn_yn">삭제</button>
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


// 첨부파일 팝업에서 받은 값
window.fileData = (fileLists) => {
  window.pms_register.file_name_list = [...fileLists]; // 받아온 데이터를 리스트에 저장
}
// 직원조회 팝업에서 받은 값
window.empData = (empnm ,empno, btn_id) => {
  if(btn_id === '1'){
    window.pms_register.info.rsr_nm = empnm
    window.pms_register.info.rsr_no = empno
  } else if(btn_id === '2'){
    window.pms_register.detail.rsr_nm = empnm
    window.pms_register.detail.rsr_no = empno
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
    mtng_room_id_change(params) {this.info.mtng_room_id_selected = params},
    mtng_room_id_change_iss(params) {this.detail.mtng_room_id_selected = params},
    rsr_strt_change(params) {this.detail.rsrv_strt_selected = params},
    rsr_endt_change(params) {this.detail.rsrv_endt_selected = params},

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
                axiosService.get("/PJTE9200/saveCheck", {
                  params: {
                    prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
                    mtng_room_id: this.detail.mtng_room_id_selected, // 회의실번호
                    rsr_dt: this.detail.rsr_dt,                      // 예약일자
                    rsrv_strt: this.detail.rsrv_strt_selected,       // 예약시작시간
                    rsrv_endt: this.detail.rsrv_endt_selected,       // 예약종료시간
                    sqno: this.detail.sqno,                          // 순번
                  }
                }).then(res => {
                  console.log(res);
                  if (res.data) {
                    if(res.data.data.contents[0].save_yn == 'Y') {
                      if(this.detail.sqno == '') {  // 순번이 없는경우 insert
                        axiosService.post("/PJTE9200/insert", {
                          prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID
                          mtng_room_id: this.detail.mtng_room_id_selected,      // 회의실번호
                          rsr_no: this.detail.rsr_no,                           // 예약자번호
                          rsr_dt: this.detail.rsr_dt,                           // 예약일자
                          rsrv_strt: this.detail.rsrv_strt_selected,            // 예약시작시간
                          rsrv_endt: this.detail.rsrv_endt_selected,            // 예약종료시간
                          mtng_ttl: this.detail.mtng_ttl,                       // 회의제목
                          atfl_mng_id: this.detail.atfl_mng_id,                 // 첨부파일ID
                          login_emp_no:sessionStorage.getItem("LOGIN_EMP_NO"), //로그인번호
                        }).then(res => {
                          this.detail.sqno = res.data
                          this.$refs.grid.invoke("reloadData");
                          alert("신규저장을 완료했습니다.")
                        }).catch(e => {
                          alert("신규저장에 실패했습니다.")
                        })
                      } else {  // 순번이 0이 아닌경우 update
                        if (sessionStorage.getItem("LOGIN_EMP_NO") == this.detail.rsr_no) {
                          axiosService.put("/PJTE9200/update", {
                            prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID
                            mtng_room_id: this.detail.mtng_room_id_selected,      // 회의실번호
                            sqno: this.detail.sqno,                               // 순번
                            rsr_no: this.detail.rsr_no,                           // 예약자번호
                            rsr_dt: this.detail.rsr_dt,                           // 예약일자
                            rsrv_strt: this.detail.rsrv_strt_selected,            // 예약시작시간
                            rsrv_endt: this.detail.rsrv_endt_selected,            // 예약종료시간
                            mtng_ttl: this.detail.mtng_ttl,                       // 회의제목
                            atfl_mng_id: this.detail.atfl_mng_id,                 // 첨부파일ID
                            login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"), //로그인번호
                          }).then(res => {
                            console.log(res);
                            this.$refs.grid.invoke("reloadData");
                            alert("저장을 완료했습니다.")
                          }).catch(e => {
                            alert("저장에 실패했습니다.")
                          })
                        } else {
                          alert("작성자 본인만 저장가능합니다.")
                        }
                      }
                    } else {
                      alert('등록하려는 회의실이 이미 예약되어있습니다. 확인 후 등록해주세요.')
                      return false;
                    }
                  }
                }).catch(e => {
                  alert("저장에 실패했습니다.")
                })
            } else {   //취소
              return;
            }
          } else {
          }
    },
    /* 저장을 하기위한 필수 항목 체크 */
    checkPrimary() {
      if (this.detail.mtng_room_id_selected == "NNN" ||this.detail.mtng_room_id_selected == "" || this.detail.mtng_room_id_selected == null) {
        alert('회의실은 필수 입력사항입니다.');
        return false;
      } else if (this.detail.rsr_no == "" || this.detail.rsr_no == null) {
        alert('직원명과 직원번호는 필수 입력사항입니다.');
        return false;
      } else if (this.detail.rsr_dt == "" || this.detail.rsr_dt == null) {
        alert('회의일자는 필수 입력사항입니다.');
        return false;
      }  else if (this.detail.rsrv_strt_selected == "NNN" ||this.detail.rsrv_strt_selected == "" || this.detail.rsrv_strt_selected == null) {
        alert('회의시작시간은 필수 입력사항입니다.');
        return false;
      }  else if (this.detail.rsrv_endt_selected == "NNN" ||this.detail.rsrv_endt_selected == "" || this.detail.rsrv_endt_selected == null) {
        alert('회의종료시간은 필수 입력사항입니다.');
        return false;
      } else if (this.detail.mtng_ttl == "" || this.detail.mtng_ttl == null) {
        alert('회의제목은 필수 입력사항입니다.');
        return false;
      } else if (parseInt(this.detail.rsrv_endt_selected) < parseInt(this.detail.rsrv_strt_selected)) {
        alert('회의시작시간은 회의종료시간보다 늦을 수 없습니다.');
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
      const currentRowData = (this.$refs.grid.invoke("getRow", this.curRow));

      // 그리드 row 클릭 시 상세내용에 Bind
      if (currentRowData != null) {
        this.cellDataBind(currentRowData) // currentRowData가 있을 때 Row 클릭 시 상세내용에 Bind
        this.deleteBtn_yn = false
      }

    },
    // 삭제
    fnDelete() {
      if (confirm("정말 삭제하시겠습니까?") === true) {
        axiosService.put("/PJTE9200/delete", {
            prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
            mtng_room_id: this.detail.mtng_room_id_selected, // 회의실번호
            sqno: this.detail.sqno,                          // 순번
        }).then(res => {
          console.log(res);
          alert("삭제에 성공했습니다.")
          this.$refs.grid.invoke("reloadData");
        }).catch(e => {
          alert("삭제에 실패했습니다.")
        })
      } else {   //취소
        return;
      }
    },
    //조회
    fnSearch(){
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },

    // 조회한 데이터로 인적사항 데이터 바인딩
    cellDataBind(currentRowData) {
      this.detail.mtng_room_id_selected = currentRowData.mtng_room_id                      // 회의실ID
      this.$refs.combo2.$data.mtng_room_id_selected_iss =  currentRowData.mtng_room_id     // 회의실ID
      this.detail.rsr_no                = currentRowData.rsr_no                 // 예약자번호
      this.detail.rsr_nm                = currentRowData.rsr_nm                 // 예약자이름
      this.detail.rsr_dt                = currentRowData.rsr_dt                 // 예약일자
      this.detail.mtng_ttl              = currentRowData.mtng_ttl               // 회의제목
      this.detail.rsrv_strt_selected = currentRowData.rsrv_strt                 // 예약시작시간
      this.$refs.combo3.$data.rsr_strt_selected = currentRowData.rsrv_strt      // 예약시작시간
      this.detail.rsrv_endt_selected = currentRowData.rsrv_endt                 // 예약종료시간
      this.$refs.combo3.$data.rsr_endt_selected = currentRowData.rsrv_endt      // 예약종료시간
      this.detail.org_file_nm           = currentRowData.org_file_nm            // 원파일명
      this.detail.atfl_mng_id           = currentRowData.atfl_mng_id            // 첨부파일ID
      this.detail.sqno                  = currentRowData.sqno                   // 순번
    },

    //직원조회 버튼 클릭 시
    open_pjte9001_btn(btn_id) {
      let empnm = ''
      if (btn_id == '1') {
        empnm = this.info.rsr_nm
      } else if (btn_id == '2') {
        empnm = this.detail.rsr_nm
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
        empnm = this.info.rsr_nm
      } else if (btn_id == '2') {
        empnm = this.detail.rsr_nm
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
                  this.info.rsr_no = res.data.data.contents[0].empno
                  this.info.rsr_nm = res.data.data.contents[0].empnm
                } else if (btn_id == '2') {
                  this.detail.rsr_no = res.data.data.contents[0].empno
                  this.detail.rsr_nm = res.data.data.contents[0].empnm
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
      if(this.info.rsr_nm === "") this.info.rsr_no = "";
      if(this.detail.rsr_nm === "") this.detail.rsr_no = "";
    },
    // 첨부파일등록 팝업 오픈
    open_file_page() {
      let file_rgs_dscd = '803'
      let atfl_mng_id = this.detail.atfl_mng_id
      let mng_id = this.detail.mtng_room_id_selected
      let room_sqno = this.detail.sqno
      let bkup_id = '0000000000', prjt_id = sessionStorage.getItem("LOGIN_PROJ_ID")
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&mng_id=${mng_id}&room_sqno=${room_sqno}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
    },
    // [신규초기화] 버튼 클릭 시 상세내용 값 초기화
    fnClear() {
      this.detail.mtng_room_id_selected = this.$refs.combo2.$data.CD1000000047N[0].value                      // 회의실ID
      this.$refs.combo2.$data.mtng_room_id_selected_iss = this.$refs.combo2.$data.CD1000000047N[0].value      // 회의실ID
      this.detail.rsr_no                = sessionStorage.getItem("LOGIN_EMP_NO") // 예약자번호
      this.detail.rsr_nm                = sessionStorage.getItem("LOGIN_EMP_NM") // 예약자이름
      this.detail.rsr_dt                = this.getCurrentYyyymmdd()        // 예약일자
      this.detail.mtng_ttl              = ''        // 회의제목
      this.detail.rsrv_strt_selected = this.$refs.combo3.$data.CD1000000048N[0].value                  // 예약시작시간
      this.$refs.combo3.$data.rsr_strt_selected = this.$refs.combo3.$data.CD1000000048N[0].value      // 예약시작시간
      this.detail.rsrv_endt_selected = this.$refs.combo3.$data.CD1000000048N[0].value                  // 예약종료시간
      this.$refs.combo3.$data.rsr_endt_selected = this.$refs.combo3.$data.CD1000000048N[0].value      // 예약종료시간
      this.detail.sqno                  = ''         // 순번
      this.detail.save_yn               = 'N'        // 등록가능여부
      this.detail.org_file_nm           = ''         // 원파일명
      this.detail.atfl_mng_id           = ''         // 첨부파일ID
      this.deleteBtn_yn = true                       // 삭제 버튼 비활성화
    },
// YYYYMMDD 형태의 현재 년월일을 구하는 함수
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
      comboList : ["C47-1"],
      comboList2 : ["C47-2"],
      comboList3 : ["C48-1", "C48-2"],

      file_name_list: [],
      deleteBtn_yn : true,

      info : {
        prjt_nm_selected      : sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트명
        bkup_id_selected      : '0000000000',     // 백업ID
        mtng_room_id_selected : 'TTT',            // 회의실
        rsr_strt              : this.getCurrentYyyymmdd(),               // 예약시작일자
        rsr_endt              : this.getCurrentYyyymmdd(),               // 예약종료일자
        rsr_nm                : '',               // 예약자이름
        rsr_no                : '',               // 예약자번호
      },
      detail : {
        mtng_room_id_selected : 'NNN',     // 회의실ID
        rsr_no                : sessionStorage.getItem("LOGIN_EMP_NO"),        // 예약자번호
        rsr_nm                : sessionStorage.getItem("LOGIN_EMP_NM"),        // 예약자이름
        rsr_dt                : this.getCurrentYyyymmdd(),        // 예약일자
        mtng_ttl              : '',        // 회의제목
        rsrv_strt_selected    : 'NNN',     // 예약시작시간
        rsrv_endt_selected    : 'NNN',     // 예약종료시간
        sqno                  : '',        // 순번
        save_yn               : 'N',       // 등록가능여부
        org_file_nm           : '',        // 원파일명
        atfl_mng_id           : ''         // 첨부파일ID
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
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: false,
      editingEvent : "click",

      // toast ui grid 데이터
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9200/select', method: 'GET' },
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
        height: 25,
      },
      columns: [
        {
          header: '예약일자',
          width: 120,
          align: 'center',
          name: 'rsr_dt',
          editor: 'text',
        },
        {
          header: '시작시간',
          width: 120,
          align: 'center',
          name: 'rsrv_strt_nm',
          editor: 'text',
        },
        {
          header: '종료시간',
          width: 120,
          align: 'center',
          name: 'rsrv_endt_nm',
          editor: 'text',
        },
        {
          header: '회의실',
          width: 200,
          align: 'left',
          name: 'mtng_room_nm',
          editor: 'text',
        },
        {
          header: '회의제목',
          align: 'left',
          name: 'mtng_ttl',
          editor: 'text',
        },
        {
          header: '예약자',
          width: 120,
          align: 'center',
          name: 'rsr_nm',
          editor: 'text',
        },
        {
          header: '순번',
          width: 120,
          align: 'center',
          name: 'sqno',
          editor: 'text',
          hidden: true
        },
      ],
    }
  },
};

</script>
<style>
</style>
