<template>
  <!-- CONTENTS1 -->
  <div class="contents">

    <!-- ASIDE -- LNB -->
    <PmsSideBar></PmsSideBar>
    <!-- 컨텐츠 영역 -->
    <div class="contents-body">
      <!-- 필터영역 -->
      <section class="filter">
        <div class="col">
          <ul class="filter-con clear-fix">
            <combo
                :comboArray="this.comboList"
                @bubun_cd_change="bubun_cd_change"
                @bsn_cls_cd_change="bsn_cls_cd_change"
            >
            </combo>
          </ul>
          <ul class="filter-con clear-fix">
            <li class="filter-item-a">
              <div class="item-con">게시판제목
                <input  type="text" placeholder="입력" style="width: 60vw" v-model="info.gesipan_titl">
              </div>
            </li>
          </ul>
          <ul class="filter-btn">
            <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSearch">조회</button>
          </ul>
        </div>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box" style="height: 255px">
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid"
                :data="dataSource"
                :header="header"
                :columns="columns"
                :bodyHeight="bodyHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :minRowHeight="minRowHeight"
                :rowHeight="rowHeight"
                :rowHeaders="rowHeaders"
                @click="onClick"
            ></grid>
          </div>
        </div>

        <div class="grid1-box" style="height: 325px">
          <div class="div-header-b">
            <ul class="filter-btn">
              <button class="btn btn-filter-b" style="margin-left: 20px" @click="fnClear">초기화</button>
            </ul>
          </div>

          <section class="filter">
            <ul class="filter-con clear-fix" style="width: 100%">
              <combo
                  :comboArray="this.comboList2"
                  @bubun_cd_change_iss="bubun_cd_change_iss"
                  @bsn_cls_cd_change_iss="bsn_cls_cd_change_iss"
                  ref="combo2"
              >
              </combo>
            </ul>
            <ul class="filter-con clear-fix" style="width: 100%; padding-top: 5px;">
              <li class="filter-item-a" style="margin-right: 15px;">
                <div class="item-con">익명여부
                  <input type="checkbox"
                         v-model="detail.annym_yn"
                         style   = "width: 14px; margin-left: 11px;"
                  >
                </div>
              </li>
              <li class="filter-item-a" style="margin-right: 15px;">
                <div class="item-con">소속확인여부
                  <input type="checkbox"
                         v-model="detail.afrm_yn"
                         style   = "width: 14px"
                  >
                </div>
              </li>
              <li class="filter-item-a" style="margin-right: 15px;">
                <div class="item-con">댓글여부
                  <input type="checkbox"
                         v-model="detail.cmnt_yn"
                         style   = "width: 14px; margin-left: 11px"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">답글여부
                  <input type="checkbox"
                         v-model="detail.rply_yn"
                         style   = "width: 14px; margin-left: 33px"
                  >
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix" style="width: 100%; padding-top: 5px;">
              <li class="filter-item-a" style="margin-right: 15px;">
                <div class="item-con">좋아요여부
                  <input type="checkbox"
                         v-model="detail.good_yn"
                         style   = "width: 14px"
                  >
                </div>
              </li>
              <li class="filter-item-a" style="margin-right: 15px;">
                <div class="item-con">조회횟수여부
                  <input type="checkbox"
                         v-model="detail.nmb_inq_yn"
                         style   = "width: 14px"
                  >
                </div>
              </li>
              <li class="filter-item-a" style="margin-right: 15px;">
                <div class="item-con">페이징여부
                  <input type="checkbox"
                         v-model="detail.pgn_yn"
                         style   = "width: 14px"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">파일업로드여부
                  <input type="checkbox"
                         v-model="detail.file_upld_yn"
                         style   = "width: 14px"
                  >
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix" style="width: 100%; padding-top: 5px;">
              <li class="filter-item-a">
                <div class="item-con">
                  <th style="vertical-align: middle;">게시판제목
                  </th>
                  <td style="padding-left: 4px;">
                    <input type="text"
                           ref="gesipan_titl"
                           placeholder="입력"
                           v-model="detail.gesipan_titl"
                           style   = "width: 73vw; margin: auto"
                    >
                  </td>
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix" style="width: 100%; padding-top: 5px;">
              <li class="filter-item-a">
                <div class="item-con">
                  <th style="vertical-align: middle;">게시판설명
                  </th>
                  <td style="padding-left: 4px;">
                      <textarea cols="140"
                                rows="5"
                                ref="gesipan_dsc"
                                placeholder="게시판내용을 입력해주세요"
                                v-model="detail.gesipan_dsc"
                                style="height: 15vh; width: 73vw; margin: auto;"
                      ></textarea>
                  </td>
                </div>
              </li>
            </ul>
          </section>
        </div>
        <section class="filter">
          <ul class="filter-btn">
            <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSave">저장</button>
          </ul>
        </section>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import {Grid} from '@toast-ui/vue-grid';
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
import axios from "axios";
import Combo from "@/components/Combo"
import PmsSideBar from  "@/components/PmsSideBar";
import {axiosService} from "@/api/http";

const storage = window.sessionStorage;

export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    PmsSideBar,
    grid: Grid,
  },
// beforeCreate ~ destroyed 까지는 Vue 인스턴스 생성에 따라 자동으로 호출되는 함수
// "라이프사이클 훅"이라고 함.
// 자세한 사항은 Vue 라이프 사이클 참조
// https://kr.vuejs.org/v2/guide/instance.html
  beforeCreate() {
    // console.log("beforeCreate");
  },
// 화면 동작 시 제일 처음 실행되는 부분
// 변수 초기화
  created() {
    // console.log("created");

  },
  beforeMount() {
    // console.log("beforeMount");
  },
  mounted() {
    // console.log("mounted");
    // 초기화
    this.init();
    // 최초조회
    this.fnSearch();
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
    // Combo.vue 에서 받아온 값
    //comboList1
    bubun_cd_change(params) {
      this.info.bubun_cd_selected = params
    },
    bsn_cls_cd_change(params) {
      this.info.bsn_cls_cd_selected = params
    },
    //comboList2
    bubun_cd_change_iss(params) {
      this.detail.bubun_cd_selected_iss = params
    },
    bsn_cls_cd_change_iss(params) {
      this.detail.bsn_cls_cd_selected_iss = params
    },

    init() {
      // 특정 열 비활성화
      this.$refs.grid.invoke("disable");
      // 그리드 초기화
      this.$refs.grid.invoke("clear");
    },
    fnSave() {
      //백업ID가 현재 일 때만 저장
      if (sessionStorage.getItem("LOGIN_AUT_CD") === '900') {
        //필수항목 확인
        if (this.checkPrimary() == true) {
          //확인창
          if (confirm("정말 저장하시겠습니까??") == true) {
            // 게시판ID가 없으면 INSERT
            if (this.detail.gesipan_id == "" || this.detail.gesipan_id == "null") {

              axiosService.post("/PJTE9100/insert",
                  {
                    bkup_id       : '0000000000',                                  //백업ID
                    prjt_id       : sessionStorage.getItem("LOGIN_PROJ_ID"),  //프로젝트ID
                    gesipan_id    : this.detail.gesipan_id,                       //게시판ID

                    bubun_cd      : this.detail.bubun_cd_selected_iss,            // 게시부문
                    gesipan_titl  : this.detail.gesipan_titl,                     // 게시판제목
                    gesipan_dsc   : this.detail.gesipan_dsc,                      // 게시판설명
                    bsn_cls_cd    : this.detail.bsn_cls_cd_selected_iss,          // 게시구분

                    annym_yn      : this.fnChkVal(this.detail.annym_yn),          // 익명여부
                    afrm_yn       : this.fnChkVal(this.detail.afrm_yn),           // 소속확인여부
                    cmnt_yn       : this.fnChkVal(this.detail.cmnt_yn),           // 댓글여부
                    rply_yn       : this.fnChkVal(this.detail.rply_yn),           // 답글여부
                    good_yn       : this.fnChkVal(this.detail.good_yn),           // 좋아요여부
                    nmb_inq_yn    : this.fnChkVal(this.detail.nmb_inq_yn),        // 조회횟수여부
                    pgn_yn        : this.fnChkVal(this.detail.pgn_yn),            // 페이징여부
                    file_upld_yn  : this.fnChkVal(this.detail.file_upld_yn),      // 파일업로드여부
                  }
              )
                  .then(res => {
                    if (res.status == 200) {
                      alert("저장이 완료되었습니다.");
                      //insert 후 재조회
                      this.$refs.grid.invoke("reloadData");
                    }
                  }).catch(e => {
                alert("저장에 실패하였습니다.");
              });

              // 게시판ID가 있으면 UPDATE
            } else {
              axiosService.put("/PJTE9100/update",
                  {
                    bubun_cd    : this.detail.bubun_cd_selected_iss,            // 게시부문
                    bsn_cls_cd  : this.detail.bsn_cls_cd_selected_iss,          // 게시구분
                    gesipan_titl: this.detail.gesipan_titl,                     // 게시판제목
                    gesipan_dsc : this.detail.gesipan_dsc,                      // 게시판설명

                    annym_yn    : this.fnChkVal(this.detail.annym_yn),          // 익명여부
                    cmnt_yn     : this.fnChkVal(this.detail.cmnt_yn),            // 댓글여부
                    rply_yn     : this.fnChkVal(this.detail.rply_yn),            // 답글여부
                    good_yn     : this.fnChkVal(this.detail.good_yn),            // 좋아요여부
                    afrm_yn     : this.fnChkVal(this.detail.afrm_yn),            // 소속확인여부
                    nmb_inq_yn  : this.fnChkVal(this.detail.nmb_inq_yn),         // 조회횟수여부
                    pgn_yn      : this.fnChkVal(this.detail.pgn_yn),             // 페이징여부
                    file_upld_yn: this.fnChkVal(this.detail.file_upld_yn),       // 파일업로드여부

                    opr_no      : this.detail.opr_no,                           //조작자번호
                    db_chg_ts   : this.detail.db_chg_ts,                        //DB변경일시

                    bkup_id     : '0000000000',                                  //백업ID
                    prjt_id     : sessionStorage.getItem("LOGIN_PROJ_ID"),  //프로젝트ID
                    gesipan_id  : this.detail.gesipan_id,                        //게시판ID
                  }
              )
                  .then(res => {
                    if (res.status == 200) {
                      alert("저장이 완료되었습니다.");
                      //update 후 재조회
                      this.$refs.grid.invoke("reloadData");
                    }
                  }).catch(e => {
                alert("저장에 실패하였습니다.");
              });
            }
          } else {   //취소
            return;
          }
        }
      } else {
        alert('시스템 관리자만 저장가능합니다.');
      }
    },
    fnChkVal(chkValue){ //저장 또는 수정 체크박스 값 변환
      if(chkValue == true || chkValue == 'Y'){
        return 'Y';
      } else {
        return 'N';
      }
    },
    fnClear() {  // [신규초기화] 버튼 클릭 시 상세내용 값 초기화
      this.detail.bkup_id                             = '';
      this.detail.prjt_id                             = '';
      this.detail.gesipan_id                          = '';
      this.detail.bubun_cd_selected_iss               = this.$refs.combo2.$data.CD1000000044N[0].value;   // 게시부문코드
      this.$refs.combo2.$data.bubun_cd_selected_iss   = this.$refs.combo2.$data.CD1000000044N[0].value;   // 게시부문코드
      this.detail.bsn_cls_cd_selected_iss             = this.$refs.combo2.$data.CD1000000045N[0].value;   // 게시구분코드
      this.$refs.combo2.$data.bsn_cls_cd_selected_iss = this.$refs.combo2.$data.CD1000000045N[0].value;   // 게시구분코드
      this.detail.gesipan_titl                        = '';                                               // 게시판제목
      this.detail.gesipan_dsc                         = '';                                               // 게시판설명
      this.detail.annym_yn                            = false;                                            // 익명여부
      this.detail.afrm_yn                             = false;                                            // 소속확인여부
      this.detail.cmnt_yn                             = false;                                            // 댓글여부
      this.detail.rply_yn                             = false;                                            // 답글여부
      this.detail.good_yn                             = false;                                            // 좋아요여부
      this.detail.nmb_inq_yn                          = false;                                            // 조회횟수여부
      this.detail.pgn_yn                              = false;                                            // 페이징여부
      this.detail.file_upld_yn                        = false;                                            // 파일업로드여부
    },
    onClick(ev) {
      this.curRow = ev.rowKey;
      const currentRowData = (this.$refs.grid.invoke("getRow", this.curRow));

      // 그리드 row 클릭 시 상세내용에 Bind
      if (currentRowData != null) {
        // console.log(currentRowData)
        this.cellDataBind(currentRowData); // currentRowData가 있을 때 Row 클릭 시 상세내용에 Bind
      }

    },
    /* 그리드 Row onClick클릭 시 상세내용에 Bind */
    cellDataBind(currentRowData) {
      this.detail.bubun_cd_selected_iss                 = currentRowData.bubun_cd;        // 게시부문
      this.$refs.combo2.$data.bubun_cd_selected_iss     = currentRowData.bubun_cd;
      this.detail.bsn_cls_cd_selected_iss               = currentRowData.bsn_cls_cd;      // 게시구분
      this.$refs.combo2.$data.bsn_cls_cd_selected_iss   = currentRowData.bsn_cls_cd;

      this.detail.annym_yn                              = currentRowData.annym_yn;        // 익명여부
      if(this.detail.annym_yn == 'Y'){
        this.detail.annym_yn = true;
      } else{
        this.detail.annym_yn = false;
      }
      this.detail.afrm_yn                               = currentRowData.afrm_yn;         // 소속확인여부
      if(this.detail.afrm_yn == 'Y'){
        this.detail.afrm_yn = true;
      } else{
        this.detail.afrm_yn = false;
      }
      this.detail.cmnt_yn                               = currentRowData.cmnt_yn;         // 댓글여부
      if(this.detail.cmnt_yn == 'Y'){
        this.detail.cmnt_yn = true;
      } else{
        this.detail.cmnt_yn = false;
      }
      this.detail.rply_yn                               = currentRowData.rply_yn;         // 답글여부
      if(this.detail.rply_yn == 'Y'){
        this.detail.rply_yn = true;
      } else{
        this.detail.rply_yn = false;
      }
      this.detail.good_yn                               = currentRowData.good_yn;         // 좋아요여부
      if(this.detail.good_yn == 'Y'){
        this.detail.good_yn = true;
      } else{
        this.detail.good_yn = false;
      }
      this.detail.nmb_inq_yn                            = currentRowData.nmb_inq_yn;      // 조회횟수여부
      if(this.detail.nmb_inq_yn == 'Y'){
        this.detail.nmb_inq_yn = true;
      } else{
        this.detail.nmb_inq_yn = false;
      }
      this.detail.pgn_yn                                = currentRowData.pgn_yn;          // 페이징여부
      if(this.detail.pgn_yn == 'Y'){
        this.detail.pgn_yn = true;
      } else{
        this.detail.pgn_yn = false;
      }
      this.detail.file_upld_yn                          = currentRowData.file_upld_yn;    // 파일업로드여부
      if(this.detail.file_upld_yn == 'Y'){
        this.detail.file_upld_yn = true;
      } else{
        this.detail.file_upld_yn = false;
      }
      this.detail.gesipan_titl                          = currentRowData.gesipan_titl;    // 게시판제목
      this.detail.gesipan_dsc                           = currentRowData.gesipan_dsc;     // 게시판설명
      this.detail.gesipan_id                            = currentRowData.gesipan_id;       // 게시판ID
    },
    /* 조회 */
    fnSearch() {
      // 조회 서비스
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    /* 저장을 하기위한 필수 항목 체크 */
    checkPrimary() {
      if (this.detail.bubun_cd_selected_iss == "NNN" || this.detail.bubun_cd_selected_iss == "" || this.detail.bubun_cd_selected_iss == "null") {                   // 게시부문
        alert('게시부문은 필수 입력사항입니다.');
        return false;
      } else if (this.detail.bsn_cls_cd_selected_iss == "NNN" || this.detail.bsn_cls_cd_selected_iss == "" || this.detail.bsn_cls_cd_selected_iss == "null") {        // 게시구분
        alert('게시구분은 필수 입력사항입니다.');
        return false;
      } else if (this.detail.gesipan_titl == "" || this.detail.gesipan_titl == "null") {     // 게시판제목
        this.$refs.gesipan_titl.focus();
        alert('게시판제목을 입력해주세요.');
        return false;
      } else if (this.detail.gesipan_dsc == "" || this.detail.gesipan_dsc == "null") {       // 게시판설명
        this.$refs.gesipan_dsc.focus();
        alert('게시판설명을 입력해주세요.');
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
  },
// 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList: ["C44-1", "C45-1"],
      comboList2: ["C44-2", "C45-2"],

      info: {
        /* 필터 변수 */
        // 공통 sessionStorage 데이터
        login_aut_cd  : sessionStorage.getItem("LOGIN_AUT_CD"),  // 권한ID
        login_bzcd    : sessionStorage.getItem("LOGIN_BZCD"),    // 업무구분
        login_emp_no  : sessionStorage.getItem("LOGIN_EMP_NO"),  // 직원번호
        login_proj_id : sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID

        // 조회 변수
        prjt_nm_selected          : sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트명
        prjt_id					          : '',                                           // 프로젝트ID
        bkup_id_selected          : '0000000000',                                 // 백업ID
        bubun_cd_selected         : '10000000',                                   // 게시부문코드
        bsn_cls_cd_selected       : 'TTT',                                        // 게시구분코드
        gesipan_titl              : '',                                           // 게시판제목
      },

      detail: {
        /* 상세내용 변수 */
        // 공통 sessionStorage  데이터
        login_aut_cd  : sessionStorage.getItem("LOGIN_AUT_CD"),  // 권한ID
        login_bzcd    : sessionStorage.getItem("LOGIN_BZCD"),    // 업무구분
        login_emp_no  : sessionStorage.getItem("LOGIN_EMP_NO"),  // 직원번호
        login_proj_id : sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID

        bubun_cd_selected_iss	    : 'NNN',            // 게시부문코드
        bsn_cls_cd_selected_iss		: 'NNN',            // 게시구분코드
        gesipan_titl			        : '',               // 게시판제목
        annym_yn				          : false,            // 익명여부
        cmnt_yn					          : false,            // 댓글여부
        rply_yn					          : false,            // 답글여부
        good_yn					          : false,            // 좋아요
        bkup_id					          : '',               // 백업ID
        prjt_id					          : '',               // 프로젝트ID
        gesipan_id				        : '',               // 게시판ID
        gesipan_dsc				        : '',               // 게시판설명
        afrm_yn					          : false,            // 소속확인여부
        nmb_inq_yn				        : false,            // 조회횟수여부
        pgn_yn					          : false,            // 페이징여부
        file_upld_yn			        : false,            // 파일업로드여부
        opr_no					          : '',				        // 조작자번호
        db_chg_ts				          : '',				        // DB변경일시

        bkup_id_selected: '0000000000',          // 백업ID
        prjt_id_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트명
      },

      /* grid 속성 */
      addRow: {
        grid: this.grid,
      },
      defaultFontSize: 20,
      count: 0,
      curRow: -1,
      title: "",
      scrollX: false,
      scrollY: false,
      bodyHeight: 190,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: false,
      open: false,
      // toast ui grid 데이터
      dataSource: {
        api: {
          readData: {url: process.env.VUE_APP_API + '/PJTE9100/select', method: 'GET'},
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
      columns: [
        {
          header: '게시부문',
          width: 250,
          align: 'left',
          name: 'bubun_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000043N
            }
          }
        },
        {
          header: '게시구분',
          width: 100,
          align: 'center',
          name: 'bsn_cls_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000044N
            }
          }
        },
        {
          header: '게시제목',
          align: 'left',
          name: 'gesipan_titl',
        },
        {
          header: '익명',
          width: 100,
          align: 'center',
          name: 'annym_yn',
        },
        {
          header: '댓글',
          width: 100,
          align: 'center',
          name: 'cmnt_yn',
        },
        {
          header: '답글',
          width: 100,
          align: 'center',
          name: 'rply_yn',
        },
        {
          header: '좋아요',
          width: 100,
          align: 'center',
          name: 'good_yn',
        },
        {
          header: '백업ID',
          width: 100,
          align: 'center',
          name: 'bkup_id',
          editor: 'text',
          hidden: true
        },
        {
          header: '프로젝트ID',
          width: 100,
          align: 'center',
          name: 'prjt_id',
          hidden: true
        },
        {
          header: '게시판ID',
          width: 100,
          align: 'center',
          name: 'gesipan_id',
          hidden: true
        },
        {
          header: '게시판설명',
          width: 100,
          align: 'center',
          name: 'gesipan_id',
          hidden: true
        },
        {
          header: '소속확인여부',
          width: 100,
          align: 'center',
          name: 'afrm_yn',
          hidden: true
        },
        {
          header: '조회횟수여부',
          width: 100,
          align: 'left',
          name: 'nmb_inq_yn',
          hidden: true
        },
        {
          header: '페이징여부',
          width: 100,
          align: 'left',
          name: 'pgn_yn',
          hidden: true
        },
        {
          header: '파일업로드여부',
          width: 100,
          align: 'left',
          name: 'file_upld_yn',
          hidden: true
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
.comColor {
  background: #B7F0B1!important;
}
.stopColor {
  background: #FFC19E!important;
}
.inProgressColor {
  background: #B2EBF4!important;
}
.lineBorder {
  border-right: #aaa solid 1px!important;
}
.modal-dialog {
  max-width: 700px;
  margin: 1.75rem auto !important;
}
.filter {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 15px;
  padding-left: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
}
.filter-con .filter-item-a label {
  margin-right: 7px;
  display: inline-block;
  width: 52px;
  font-weight: normal;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
}
</style>
