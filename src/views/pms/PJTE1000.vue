<template>
  <!-- CONTENTS -->
  <div class="contents">
    <!-- ASIDE -- LNB -->
    <PmsSideBar></PmsSideBar>
    <!-- 컨텐츠 영역 -->
    <div class="contents-body">
      <!-- 필터영역 -->
      <section class="filter" :hidden="prjt_gbn">
        <ul class="filter-con clear-fix">
          <combo
              :comboArray="this.comboList"
              @bkup_id_change="bkup_id_change"
              @prjt_nm_chage="prjt_nm_chage"
          ></combo>
          <button class="btn btn-filter-p" style="margin-top: 5px" @click="fnSearch">재조회</button>
        </ul>
        <ul class="filter-btn">
          <button class="btn btn-filter-d"
                  style="margin-left: 10px;"
                  @click="open_file_page(3)">설계산출물 양식 ⓘ
          </button>
          <button class="btn btn-filter-p"
                  style=" background-color: #9FC93C"
                  @click="open_file_page(1)">ProjectEyes 가이드 ⓘ
          </button>
        </ul>
      </section>
      <!-- page contents -->
      <section class="page-contents">
        <div class="day-div">
          <div class="today">
            <p>What day is it today?</p>
            <div class="day-div"><number class="number" :from="0" :to="2022" :duration="2"/>/<number class="number" :from="0" :to="5" :duration="2"/> /<number class="number" :from="0" :to="15" :duration="2"/>
            </div>
          </div>
        </div>
        <div class="multiGridWrap-a">
          <div class="div1-a" :hidden="prjt_gbn">
            <div class="div-header-a"><h2>TO-DO현황</h2>
            </div>
            <div class="div-grid-a">
              <grid
                  ref="grid1"
                  :data="dataSource"
                  :header="header"
                  :columns="columns1"
                  :bodyHeight="bodyHeight"
                  :minRowHeight="minRowHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  :rowHeaders="rowHeaders"
                  @click="onClick"
                  @onGridUpdated="onGridUpdated"
              ></grid>
            </div>
          </div>
          <div class="div2-a" :hidden="prjt_gbn">
            <div class="div-header-a"><h2>TO-DO상세내역</h2>
            </div>
            <div class="div-grid-a">
              <grid
                  ref="grid2"
                  :data="dataSource"
                  :header="header"
                  :columns="columns2"
                  :bodyHeight="bodyHeight"
                  :minRowHeight="minRowHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  :rowHeaders="rowHeaders"
                  @click="onClick"
              ></grid>
            </div>
          </div>
          <div class="div0-a">
            <div class="div3-a">
              <div class="div-header-a"><h2>공지사항</h2>
              </div>
              <div class="div-grid-a">
                <grid
                    ref="grid3"
                    :data="dataSource"
                    :header="header"
                    :columns="columns3"
                    :bodyHeight="315"
                    :minRowHeight="minRowHeight"
                    :showDummyRows="showDummyRows"
                    :columnOptions="columnOptions"
                    :rowHeight="rowHeight"
                    :rowHeaders="rowHeaders"
                    @click="onClick"
                ></grid>
              </div>
            </div>
            <div class="div4-a">
              <section class="filter-1000">
                <div class="col">
                  <ul class="filter-con clear-fix">
                    <combo
                        :comboArray="this.comboList2"
                        @ntar_bzcd_change="ntar_bzcd_change"
                        ref="combo2"
                    >
                    </combo>
                    <li class="filter-item">
                      <div class="item-con">공지일자
                        <div class="input-dateWrap">
                          <input type="date"
                                 v-model="detail.rgs_dt"
                                 ref="rgs_dt"
                                 :disabled=true
                                 style="background-color: #f2f2f2;"
                          >
                        </div>
                      </div>
                    </li>
                    <li class="filter-item-n">
                      <div class="input-searchWrap">공지자
                        <input type="text"
                               placeholder="직원명"
                               id="id.rgs_nm"
                               v-model="detail.rgs_nm"
                               style="width: 80px; background-color: #f2f2f2;"
                               :disabled=true
                        >
                      </div>
                    </li>
                    <li class="filter-item">
                      <input type="text"
                             placeholder="직원번호"
                             id="id.rgs_no"
                             v-model="detail.rgs_no"
                             style="width: 80px; background-color: #f2f2f2;"
                             :disabled=true
                      >
                    </li>
                  </ul>
                  <ul class="filter-con clear-fix">
                    <li class="filter-item" style="width: 40px">
                      <label>　제목</label>
                    </li>
                    <li class="filter-item">
                      <div class="item-con" style="margin-right: 15px">
                        <input type="text"
                               placeholder="제목을 입력해주세요"
                               v-model="detail.titl_txt"
                               ref="titl_txt"
                               style="width: 578px;"
                        >
                      </div>
                    </li>
                    <li v-if="this.detail.mng_id" class="filter-item">
                      <div class="item-con">
                        <input type="checkbox" id="del_yn" v-model="detail.del_yn">
                        <label>　공지사항삭제</label>
                      </div>
                    </li>
                  </ul>
                  <ul class="filter-con clear-fix">
                    <li class="filter-item">
                      <div class="item-con">
                        <th style="vertical-align: middle">
                          공지사항　
                        </th>
                        <td>
                          <textarea cols="145"
                                    rows="20"
                                    style="width: 100%; height: 240px; line-height: normal;"
                                    placeholder="공지사항을 입력해주세요"
                                    v-model="detail.ancpt"
                                    ref="ancpt"
                          ></textarea>
                        </td>
                      </div>
                    </li>
                  </ul>
                  <ul class="filter-btn" style="margin-top: 7px">
                    <ul class="filter-btn" v-if="this.detail.mng_id">
                      <th style="margin-top: 5px; margin-right: 10px">첨부파일</th>
                      <input type="text"
                             :disabled=true
                             v-model="detail.org_file_nm"
                             style="background-color: #f2f2f2; width: 500px;"
                      >
                      <button class="btn btn-filter-p" style="margin-right: 140px" @click="open_file_page(2)">첨부
                      </button>
                    </ul>
                    <ul class="filter-btn" v-else>
                      <th style="margin-top: 5px; margin-right: 21px">첨부파일</th>
                      <th style="margin-top: 5px; ;margin-right: 535px">첨부파일등록은 저장 후 가능합니다.</th>
                    </ul>
                    <button class="btn btn-filter-b" style="margin-left: 20px" @click="fnClear">공지추가</button>
                    <button class="btn btn-filter-p" @click="fnSave">저장</button>
                  </ul>

                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import {Grid} from '@toast-ui/vue-grid';
import Combo from "@/components/Combo"
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
import {axiosService} from "@/api/http";
import axios from "axios";
import PmsSideBar from '@/components/PmsSideBar';

// 첨부파일 데이터를 받아옴
window.fileData = (fileLists) => {
  window.pms_register.file_name_list = [...fileLists]; // 받아온 데이터를 리스트에 저장
}

export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    PmsSideBar,
    grid: Grid,
    Combo,
  },

  beforeCreate() {
    // console.log("beforeCreate");
  },
// 화면 동작 시 제일 처음 실행되는 부분
// 변수 초기화
  created() {
    if(sessionStorage.getItem("LOGIN_PROJ_ID") === "0000000003") {
      this.prjt_gbn = true;
    } else {
      this.prjt_gbn = false;
    }
    // console.log("created");
  },
  beforeMount() {
    // console.log("beforeMount");
  },
  mounted() {
    // 초기 설정
    this.init();
    // 그리드 조회
    this.fnSearch();
    window.pms_register = this;
  },
  beforeUpdate() {
    // console.log("beforeUpdate");
  },
  updated() {
    // console.log("updated");
  },
  beforeDestroy() {
    // console.log("beforeDestroy");
  },
  destroyed() {
    // console.log("destroyed");
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
    bkup_id_change(params) {
      this.info.bkup_id_selected = params
    },
    prjt_nm_chage(params) {
      this.info.prjt_nm_selected = params
    },
    ntar_bzcd_change(params) {
      this.detail.ntar_bzcd_selected = params
    },

    /* 그리드 1 의 첫번쩨 Row의 todo_cd에 따라
       그리드 2의 TO-DO상세내역의 rmrk 컬럼의 헤더를 변경*/
    onGridUpdated(grid) {  // onGridUpdate는 그리드가 그려지고 바로 실행됨
      let todo_cd = this.$refs.grid1.invoke("getValue", 0, "todo_cd")
      if (todo_cd == '10' || todo_cd == '11' || todo_cd == '12' || todo_cd == '13') {
        this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '진행내용'})
      } else if (todo_cd == '20' || todo_cd == '21' || todo_cd == '22' || todo_cd == '23') {
        this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '미진사유'})
      } else if (todo_cd == '30' || todo_cd == '31' || todo_cd == '32' || todo_cd == '33') {
        this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '결함내용'})
      } else if (todo_cd == '40' || todo_cd == '41') {
        this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '신청내용'})
      } else if (todo_cd == '50') {
        this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '요청및조치내용'})
      } else if (todo_cd == '60' || todo_cd == '61' || todo_cd == '62') {
        this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '비고내용'})
      } else {
        this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '상세내용'})
      }
    },

    init() {
      // 특정 열 비활성화
      this.$refs.grid1.invoke("disable");
      this.$refs.grid2.invoke("disable");
      this.$refs.grid3.invoke("disable");
      // 그리드 초기화
      this.$refs.grid1.invoke("clear");
      this.$refs.grid2.invoke("clear");
      this.$refs.grid3.invoke("clear");
      // 공지사항 상세 내용 초기화
      this.detail.mng_id = ''                                          // (상세)관리ID
      this.detail.rgs_dt = this.getToday()                             // (상세)요청일자
      this.detail.titl_txt = ''                                        // (상세)제목내용
      this.detail.ancpt = ''                                           // (상세)공지내역
      this.detail.rgs_no = sessionStorage.getItem("LOGIN_EMP_NO")  // (상세)등록자번호
      this.detail.rgs_nm = sessionStorage.getItem("LOGIN_EMP_NM")  // (상세)등록자번호
      this.detail.atfl_mng_id = ''                                      // (상세)첨부파일관리ID
      this.detail.del_yn = false                                        // 공지사항 삭제 체크박스
    },
    fnSave() {
      //백업ID가 현재 일 때만 저장
      if (this.detail.bkup_id_selected == '0000000000') {
        //필수항목 확인
        if (this.checkPrimary() == true) {
          //확인창
          if (confirm("정말 저장하시겠습니까?") == true) {
            // 관리ID가 없으면 INSERT
            if (this.detail.mng_id == "" || this.detail.mng_id == "null") {
              axiosService.post("/PJTE1000/insert",
                  {
                    bkup_id: this.detail.bkup_id_selected,                    // (상세)백업ID
                    prjt_id: this.detail.prjt_nm_selected,                    // (상세)프로젝트ID
                    ntar_bzcd: this.detail.ntar_bzcd_selected,                // (상세)공지구분
                    mng_id: this.detail.mng_id,                               // (상세)관리ID
                    rgs_dt: this.detail.rgs_dt,                               // (상세)공지일자
                    titl_txt: this.detail.titl_txt,                           // (상세)제목내용
                    ancpt: this.detail.ancpt,                                 // (상세)공지내역
                    rgs_no: this.detail.rgs_no,                               // (상세)등록자번호
                    rgs_nm: this.detail.rgs_nm,                               // (상세)등록자명
                    atfl_mng_id: this.detail.atfl_mng_id,                     // (상세)첨부파일관리ID
                    login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"), // 직원번호
                    login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"), // 권한ID
                  }
              )
                  .then(res => {
                    if (res.status == 200) {
                      // console.log(res.data);
                      alert("신규 저장이 완료되었습니다.");
                      //insert 후 재조회
                      this.$refs.grid3.invoke("reloadData");
                    }
                  }).catch(e => {
                alert("신규 저장에 실패하였습니다.");
              })

              // 관리ID가 있으면 UPDATE
            } else {
              if (this.detail.rgs_no == sessionStorage.getItem("LOGIN_EMP_NO")) { // 공지 등록자가 본인인지 체크
                axiosService.put("/PJTE1000/update",
                    {
                      bkup_id: this.detail.bkup_id_selected,                     // (상세)백업ID
                      prjt_id: this.detail.prjt_nm_selected,                     // (상세)프로젝트ID
                      ntar_bzcd: this.detail.ntar_bzcd_selected,                 // (상세)공지구분
                      mng_id: this.detail.mng_id,                                // (상세)관리ID
                      rgs_dt: this.detail.rgs_dt,                                // (상세)공지일자
                      titl_txt: this.detail.titl_txt,                            // (상세)제목내용
                      ancpt: this.detail.ancpt,                                  // (상세)공지내역
                      rgs_no: this.detail.rgs_no,                                // (상세)등록자번호
                      rgs_nm: this.detail.rgs_nm,                                // (상세)등록자명
                      atfl_mng_id: this.detail.atfl_mng_id,                      // (상세)첨부파일관리ID
                      del_yn: this.detail.del_yn,                                // (상세)삭제여부체크박스
                      login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"), // 직원번호
                      login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"), // 권한ID
                    }
                )
                    .then(res => {
                      if (res.status == 200) {
                        alert("저장이 완료되었습니다.");
                        //update 후 재조회
                        this.$refs.grid3.invoke("reloadData");
                        // 공지사항 삭제가 true 일 때, 상세내용 초기화
                        if(this.detail.del_yn == true){
                          this.fnClear();
                        }
                      }
                    }).catch(e => {
                  alert("저장에 실패하였습니다.");
                })
              } else {
                alert('해당공지에 대한 수정 권한이 없습니다.');
              }
            }

          } else {   //취소
            return;
          }
        } else {

        }
      } else {
        alert('백업정보는 저장할 수 없습니다.');
      }
    },
    fnClear() {
      // [신규초기화] 버튼 클릭 시 상세내용 값 초기화
      this.detail.mng_id = ''                                         // (상세)관리ID
      this.detail.rgs_dt = this.getToday()                            // (상세)요청일자
      this.detail.titl_txt = ''                                       // (상세)제목내용
      this.detail.ancpt = ''                                          // (상세)공지내역
      this.detail.rgs_no = sessionStorage.getItem("LOGIN_EMP_NO") // (상세)등록자번호
      this.detail.rgs_nm = sessionStorage.getItem("LOGIN_EMP_NM") // (상세)등록자번호
      this.detail.atfl_mng_id = ''                                    // (상세)첨부파일관리ID
      this.detail.del_yn = false                                    // 공지사항 삭제 체크박스
      this.detail.ntar_bzcd_selected = this.$refs.combo2.$data.CD1000000018T[0].value     //(상세)공지업무
      this.$refs.combo2.$data.ntar_bzcd_selected = this.$refs.combo2.$data.CD1000000018T[0].value
    },
    onClick(ev) {
      // TO-DO현황 ROW클릭 시 클릭한ROW의 rowNum으로 TO-DO상세내역 재조회
      if (ev.columnName == 'todo_nm' || ev.columnName == 'proc_cnt') {
        this.info.gubun = "2"

        // TO-DO상세내역 그리드 타이틀 변경 (todo_cd에 따라)
        let todo_cd = this.$refs.grid1.invoke("getValue", ev.rowKey, "todo_cd")
        if (todo_cd == '10' || todo_cd == '11' || todo_cd == '12' || todo_cd == '13') {
          this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '진행내용'})
        } else if (todo_cd == '20' || todo_cd == '21' || todo_cd == '22' || todo_cd == '23') {
          this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '미진사유'})
        } else if (todo_cd == '30' || todo_cd == '31' || todo_cd == '32' || todo_cd == '33') {
          this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '결함내용'})
        } else if (todo_cd == '40' || todo_cd == '41') {
          this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '신청내용'})
        } else if (todo_cd == '50') {
          this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '요청및조치내용'})
        } else if (todo_cd == '60' || todo_cd == '61' || todo_cd == '62') {
          this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '비고내용'})
        } else {
          this.$refs.grid2.invoke("setColumnHeaders", {rmrk: '상세내용'})
        }
        this.info.rowNum = ev.rowKey;
        this.$refs.grid2.invoke("setRequestParams", this.info);
        this.$refs.grid2.invoke("readData");
      }
      // 프로젝트 공지사항 ROW클릭 시 오른쪽 input, selectBox에 바인딩
      if (ev.columnName == 'rgs_dt' || ev.columnName == 'ntar_bzcd' || ev.columnName == 'titl_txt') {
        this.curRow = ev.rowKey;
        const currentRowData = (this.$refs.grid3.invoke("getRow", this.curRow));
        if (currentRowData != null) {
          this.cellDataBind(currentRowData) // currentRowData가 있을 때 Row 클릭 시 상세내용에 Bind
        }
      }
    },
    /* 그리드 Row onClick클릭 시 상세내용에 Bind */
    cellDataBind(currentRowData) {
      this.detail.ntar_bzcd_selected = currentRowData.ntar_bzcd;         // (상세)공지구분
      this.detail.bkup_id_selected = currentRowData.bkup_id;             // (상세)백업ID
      this.detail.mng_id = currentRowData.mng_id;                        // (상세)관리ID
      this.detail.rgs_dt = currentRowData.rgs_dt;                        // (상세)공지일자
      this.detail.titl_txt = currentRowData.titl_txt;                    // (상세)제목내용
      this.detail.ancpt = currentRowData.ancpt;                          // (상세)공지내역
      this.detail.rgs_no = currentRowData.rgs_no;                        // (상세)공지자 번호
      this.detail.rgs_nm = currentRowData.rgs_nm;                        // (상세)공지자 이름
      this.detail.atfl_mng_id = currentRowData.atfl_mng_id;              // (상세)첨부파일관리ID
      this.detail.org_file_nm = currentRowData.org_file_nm;              // (상세)원파일명
    },
    fnSearch() {
      /*조회 시 그리드 구분코드 this.info.gubun를 파라메터로 넘겨서 조회*/
      if(sessionStorage.getItem("LOGIN_PROJ_ID") !== "0000000003") {
        //그리드 1
        this.info.gubun = "1";
        this.$refs.grid1.invoke("setRequestParams", this.info);
        this.$refs.grid1.invoke("readData");
        //그리드 2
        this.info.gubun = "2"
        this.$refs.grid2.invoke("setRequestParams", this.info);
        this.$refs.grid2.invoke("readData");
        //그리드 3
        this.info.gubun = "3"
        this.$refs.grid3.invoke("setRequestParams", this.info);
        this.$refs.grid3.invoke("readData");
      } else if(sessionStorage.getItem("LOGIN_PROJ_ID") === "0000000003") {
        //그리드 3
        this.info.gubun = "3"
        this.$refs.grid3.invoke("setRequestParams", this.info);
        this.$refs.grid3.invoke("readData");
      }
    },

    open_pjte9001(event) {
      const targetId = event.currentTarget.id;
      this.pop = window.open("../PJTE9001/", targetId, "width=700, height=600");
    },
    // 첨부파일등록 팝업 오픈
    open_file_page(num) {
      // console.log(num)
      let file_rgs_dscd = ''
      let atfl_mng_id = ''
      if (num == 1) {  // ProjectEyes가이드 파라미터 file_rgs_dscd = 902
        file_rgs_dscd = '902'
        atfl_mng_id = '0000000000'
      } else if (num == 2) {   // 공지사항첨부파일 파라미터 file_rgs_dscd = 600
        file_rgs_dscd = '600'
        atfl_mng_id = this.detail.atfl_mng_id
      } else if (num == 3) {   // 공지사항첨부파일 파라미터 file_rgs_dscd = 600
        file_rgs_dscd = '900'
        atfl_mng_id = '0000000000'
      }
      let bkup_id = '0000000000', prjt_id = this.detail.prjt_nm_selected, mng_id = this.detail.mng_id
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&mng_id=${mng_id}&file_rgs_dscd=${file_rgs_dscd}&num=${num}`, "open_file_page", "width=1000, height=800");
    },
    /* YYYY-MM-DD형태의 오늘 날짜를 구하는 함수*/
    getToday() {
      var date = new Date();
      var year = date.getFullYear();
      var month = ("0" + (1 + date.getMonth())).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);

      return year + '-' + month + '-' + day;
    },
    /* 저장을 하기위한 필수 항목 체크 */
    checkPrimary() {
      if (this.detail.rgs_dt == "" || this.detail.rgs_dt == "null") {                 // 공지일자
        this.$refs.rgs_dt.focus();
        alert('공지일자가 없습니다.');
        return false;
      } else if (this.detail.titl_txt == "" || this.detail.titl_txt == "null") {      // 제목내용
        this.$refs.titl_txt.focus();
        alert('제목을 입력해주세요.');
        return false;
      } else if (this.detail.ancpt == "" || this.detail.ancpt == "null") {            // 공지내역
        this.$refs.ancpt.focus();
        alert('공지사항을 입력해주세요.');
        return false;
      } else if (this.detail.rgs_no == "" || this.detail.rgs_no == "null") {          // 등록자번호
        alert('공지자가 없습니다.');
        return false;
      } else if (this.detail.prjt_nm_selected == "" || this.detail.prjt_nm_selected == "null") {          // 등록자번호
        alert('프로젝트가 없습니다.');
        return false;
      } else {
        return true;  // 필수 값 모두 입력 시 true
      }
    },

  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch: {
    count: (a, b) => {

    },
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
      comboList: ["C27", "C0"],
      comboList2: ["C18"],

      prjt_gbn: false,

      info: {
        // 그리드 조회 변수
        gubun: '',               // 그리드 구분자
        rowNum: 0,
        bkup_id_selected: '0000000000',      // 백업ID
        prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트명

        // 공통 sessionStorage 데이터
        login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),   // 권한ID
        login_bzcd: sessionStorage.getItem("LOGIN_BZCD"),       // 업무구분
        login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),   // 직원번호
      },

      detail: {
        /* 상세내용 변수 */

        // 공통 sessionStorage 데이터
        login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),    // 권한ID
        login_bzcd: sessionStorage.getItem("LOGIN_BZCD"),        // 업무구분
        login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),    // 직원번호
        login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트ID

        bkup_id_selected: '0000000000',                                 // 백업ID
        prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트명
        ntar_bzcd_selected: '100',        // 공지구분
        mng_id: this.mng_id,              // 관리ID
        rgs_dt: this.rgs_dt,              // 요청일자
        titl_txt: this.titl_txt,          // 제목내용
        ancpt: this.ancpt,                // 공지내역
        rgs_no: this.rgs_no,              // 등록자번호
        rgs_nm: this.rgs_nm,              // 등록자번호
        atfl_mng_id: this.atfl_mng_id,    // 첨부파일관리ID
        org_file_nm: this.org_file_nm,    // 원파일명
        del_yn: false,                    // 공지사항 삭제 체크박스
      },
      file_name_list: [],

      addRow: {
        grid: this.grid,
      },

      count: 0,
      curRow: -1,
      title: "",
      scrollX: false,
      scrollY: false,
      bodyHeight: 315,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: false,
      open: false,
       dataSource: {
        api: {
          readData: {url: process.env.VUE_APP_API + '/PJTE1000/select', method: 'GET'},
        },
        initialRequest: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders: ['rowNum'],
      header: {
        height: 25
      },
      columns1: [
        {
          header: 'TO-DO업무',
          width: 250,
          align: 'left',
          name: 'todo_nm',
        },
        {
          header: '처리건수',
          align: 'right',
          name: 'proc_cnt',
        },
      ],
      columns2: [
        {
          header: 'TO-DO내역',
          width: 400,
          align: 'left',
          name: 'todo_txt',
        },
        {
          header: '시작일자',
          width: 120,
          align: 'center',
          name: 'pln_sta_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: '종료일자',
          width: 120,
          align: 'center',
          name: 'pln_end_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: '결함내용',
          align: 'left',
          name: 'rmrk',
        },
      ],
      columns3: [
        {
          header: '공지일자',
          width: 120,
          align: 'center',
          name: 'rgs_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: '공지구분',
          width: 150,
          align: 'left',
          name: 'ntar_bzcd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000018N
            }
          }
        },
        {
          header: '제목',
          align: 'left',
          name: 'titl_txt',
        },
      ],
    }
  },
};

</script>
<style>
.today {
  margin: 20px auto;
  text-align: center;
}
.today p {
  font-size: 50px;
  line-height: 1;
}
.day-div {
  margin: 80px 0 0 0;
  padding: 10px;
  font-size: 60px;
  font-weight: bold;
  color: #707070;
}
.number {
  letter-spacing: 2px;
  /*background: #FFDBDB;*/
  padding: 10px 10px;
  border-radius: 20px;
  align-items: center;
}
</style>
