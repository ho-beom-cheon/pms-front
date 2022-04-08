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
        <ul class="filter-con clear-fix" style="text-align: left">
          <combo
              :comboArray="this.comboList"
              @bubn_cd_change="bubn_cd_change"
              @bsn_cls_cd_change="bsn_cls_cd_change"
              ref="combo1"
          ></combo>
        </ul>

        <ul class="filter-con clear-fix">
          <li class="filter-item-a">
            <div class="item-con">게시판제목
              <input  type="text" placeholder="입력" style="width: 60vw" v-model="info.gesipan_titl">
            </div>
          </li>
        </ul>

        <ul class="filter-btn">
          <button class="btn btn-filter-p" @click="fnSearch">조회</button>
        </ul>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box" style="height: 255px">
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid1"
                :data="dataSource"
                :header="header"
                :columns="columns1"
                :minBodyHeight="55"
                :bodyHeight="180"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeaders="rowHeaders"
                :rowHeight="rowHeight"
                @click="onClick1"
            ></grid>
          </div>
        </div>

        <div class="grid1-box" style="height: 325px">
          <div class="div-header-b">
            <ul class="filter-btn">
                <button class="btn btn-filter-e" style="margin-left: 20px" @click="fnClear">신규</button>
            </ul>
          </div>

          <section class="filter">
            <ul class="filter-con clear-fix" style="width: 100%">
              <li class="filter-item-a">
                <div class="item-con">게시부문코드
                  <input type="text"
                         placeholder="입력"
                         v-model="detail.bubun_cd"
                         style   = "width: 250px"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">게시구분코드
                  <input type="text"
                         placeholder="입력"
                         v-model="detail.bsn_cls_cd"
                         style   = "width: 250px"
                  >
                </div>
              </li>
            </ul>
<!--            <table>
              <tr>
                <td>익명여부
                  <input type="checkbox"
                         v-model="detail.notice_sta_dt"
                         style   = "width: 14px"
                  >
                </td>
                <td>소속확인여부
                  <input type="checkbox"
                         v-model="detail.notice_sta_dt"
                         style   = "width: 14px"
                  >
                </td>
                <td>댓글여부
                  <input type="checkbox"
                         v-model="detail.notice_sta_dt"
                         style   = "width: 14px"
                  >
                </td>
                <td>답글여부
                  <input type="checkbox"
                         v-model="detail.notice_sta_dt"
                         style   = "width: 14px"
                  >
                </td>
              </tr>
              <tr>
                <td>좋아요여부
                  <input type="checkbox"
                         v-model="detail.notice_sta_dt"
                         style   = "width: 14px"
                  >
                </td>
                <td>조회횟수여부
                  <input type="checkbox"
                         v-model="detail.notice_sta_dt"
                         style   = "width: 14px"
                  >
                </td>
                <td>페이징여부
                  <input type="checkbox"
                         v-model="detail.notice_sta_dt"
                         style   = "width: 14px"
                  >
                </td>
                <td>파일업로드여부
                  <input type="checkbox"
                         v-model="detail.notice_sta_dt"
                         style   = "width: 14px"
                  >
                </td>
              </tr>
            </table>-->
            <ul class="filter-con clear-fix" style="width: 100%; padding-top: 5px;">
              <li class="filter-item-a">
                <div class="item-con">익명여부
                  <input type="checkbox"
                         v-model="detail.notice_sta_dt"
                         style   = "width: 14px; margin-left: 11px"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">소속확인여부
                  <input type="checkbox"
                         v-model="detail.afrm_yn"
                         style   = "width: 14px"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">댓글여부
                  <input type="checkbox"
                         v-model="detail.annmt_yn"
                         style   = "width: 14px; margin-left: 11px"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">답글여부
                  <input type="checkbox"
                         v-model="detail.comment_yn"
                         style   = "width: 14px; margin-left: 33px"
                  >
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix" style="width: 100%; padding-top: 5px;">
              <li class="filter-item-a">
                <div class="item-con">좋아요여부
                  <input type="checkbox"
                         v-model="detail.notice_titl"
                         style   = "width: 14px"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">조회횟수여부
                  <input type="checkbox"
                         v-model="detail.nmb_inq_yn"
                         style   = "width: 14px"
                  >
                </div>
              </li>
              <li class="filter-item-a">
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
                <div class="item-con">게시판제목
                  <input type="text"
                         placeholder="입력"
                         v-model="detail.gesipan_titl"
                         style   = "width: 73vw; margin: auto"
                  >
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix" style="width: 100%; padding-top: 5px;">
              <li class="filter-item-a">
                <div class="item-con">게시판설명
                  <input type="textarea"
                         placeholder="입력"
                         v-model="detail.gesipan_dsc"
                         style   = "height: 15vh; width: 73vw; margin: auto"
                  >
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
import Combo from "@/components/Combo"
import {Grid} from '@toast-ui/vue-grid';
import Modal from "@/components/Modal";
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http";
import PmsSideBar from  "@/components/PmsSideBar";

// 부문 코드 (수정필요)
const work_step_cd = [
  { text: '오픈', value: '100' },
  { text: '진행중', value: '200' },
  { text: '중단', value: '300' },
  { text: '완료', value: '400' },
];
// 부문 코드 (수정필요)
const mark = [
  { text: ' ', value: 'NNN' },
  { text: '이슈', value: 'I' },
  { text: '위험', value: 'R' },
];

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    grid: Grid,
    Modal,
    PmsSideBar
  },

  mounted() {
    // 화면 초기화
    this.init();
    // 화면 접속 시 데이터 조회
    this.fnSearch();
  },

  computed: {},

// 일반적인 함수를 선언하는 부분
  methods: {
    bubn_cd_change(params) {this.info.bubn_cd_change = params},
    bsn_cls_cd_change(params) {this.info.bsn_cls_cd_change = params},

// 화면 init
    init() {
      // 그리드 초기화
      this.$refs.grid1.invoke("clear");
      // 그리드1 전체 비활성화
      this.$refs.grid1.invoke("disable");
    },
    // 저장 버튼
    fnSave() {
        // 권한이 관리자(900) 일 때 저장 가능
        if (sessionStorage.getItem("LOGIN_AUT_CD") === '900') {
            if (confirm("정말 저장하시겠습니까?") == true) {
              axiosService.post("/PJTE9100/create", {
                prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
                login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),

                bubun_cd: this.detail.bubun_cd,             // 게시부문코드
                bsn_cls_cd: this.detail.bsn_cls_cd,         // 게시구분코드
                notice_sta_dt: this.detail.notice_sta_dt,   // 익명여부
                afrm_yn: this.detail.afrm_yn,               // 소속확인여부
                annmt_yn: this.detail.annmt_yn,             // 댓글여부
                comment_yn: this.detail.comment_yn,         // 답글여부
                notice_titl: this.detail.notice_titl,       // 좋아요여부
                nmb_inq_yn: this.detail.nmb_inq_yn,         // 조회횟수여부
                pgn_yn: this.detail.pgn_yn,                 // 페이징여부
                file_upld_yn: this.detail.file_upld_yn,     // 파일업로드여부
                gesipan_titl: this.detail.gesipan_titl,     // 게시판제목
                gesipan_dsc: this.detail.gesipan_dsc,       // 게시판설명

              }).then(res => {
                console.log(res);
                if (res.data) {
                  alert("저장을 완료했습니다.");
                  this.info.man_nm = '';
                  this.info.man_no = '';
                  this.$refs.grid1.invoke("reloadData");
                  this.info.man_nm = sessionStorage.getItem("LOGIN_EMP_NM");
                  this.info.man_no = sessionStorage.getItem("LOGIN_EMP_NO");
                }
              }).catch(e => {
                alert("저장에 실패했습니다.")
              })
            } else {   //취소
              return;
            }
        } else {
          alert('작성자 본인만 저장가능합니다.')
          return false;
        }
    },

    //신규 버튼 클릭 시 등록 영역 초기화
    fnClear(){
      this.detail.bubun_cd        = ''      // 게시부문코드
      this.detail.bsn_cls_cd      = ''      // 게시구분코드
      this.detail.gesipan_titl    = ''      // 게시판제목
      this.detail.gesipan_dsc     = ''      // 게시판설명
      this.detail.notice_sta_dt   = false   // 익명여부
      this.detail.afrm_yn         = false   // 소속확인여부
      this.detail.annmt_yn        = false   // 댓글여부
      this.detail.comment_yn      = false   // 답글여부
      this.detail.notice_titl     = false   // 좋아요여부
      this.detail.nmb_inq_yn      = false   // 조회횟수여부
      this.detail.pgn_yn          = false   // 페이징여부
      this.detail.file_upld_yn    = false   // 파일업로드여부
    },

    onGridUpdated1(grid) {

    },

    // 그리드 1 클릭 이벤트
    onClick1(ev) {

    },

    //조회
    fnSearch() {
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
    },

  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch: {

  },

// 변수 선언부분
  data() {
    return {

      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList: ["C44", "C45"],
      gridData: [],
      addCheak: 'N',

      info: {
        // 조회 변수
        prjt_nm_selected      : sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트명
        bkup_id_selected      : '0000000000',     // 백업ID
        bubun_cd              : '',               // 게시부문코드
        bsn_cls_cd            : '',               // 게시구분코드
        gesipan_titl          : '',               // 게시판제목
      },
      detail : {
        bubun_cd              : '',               // 게시부문코드
        bsn_cls_cd            : '',               // 게시구분코드
        gesipan_titl          : '',               // 게시판제목
        notice_sta_dt         : '',               // 익명여부
        annmt_yn              : '',               // 댓글여부
        comment_yn            : '',               // 답글여부
        notice_titl           : '',               // 좋아요
        bkup_id               : '',               // 백업ID
        prjt_id               : '',               // 프로젝트ID
        gesipan_id            : '',               // 게시판ID
        gesipan_dsc           : '',               // 게시판설명
        afrm_yn               : '',               // 소속확인여부
        nmb_inq_yn            : '',               // 조회횟수여부
        pgn_yn                : '',               // 페이징여부
        file_upld_yn          : '',               // 파일업로드여부
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
          readData   : { url: process.env.VUE_APP_API + '/PJTE9100/select', method: 'GET' },
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
      columns1: [
        {
          header: '게시부문',
          width: 250,
          align: 'center',
          name: 'bubun_cd',
          editor: 'text',
        },
        {
          header: '게시구분',
          width: 200,
          align: 'center',
          name: 'bsn_cls_cd',
          editor: 'text',
        },
        {
          header: '게시제목',
          width: 575,
          align: 'center',
          name: 'gesipan_titl',
          formatter: 'listItemText',
          editor: 'text',
        },
        {
          header: '익명',
          width: 100,
          align: 'center',
          name: 'notice_sta_dt',
          formatter: 'listItemText',
          editor: 'text',
        },
        {
          header: '댓글',
          width: 100,
          align: 'left',
          name: 'annmt_yn',
          editor: 'text',
        },
        {
          header: '답글',
          width: 100,
          align: 'left',
          name: 'comment_yn',
          editor: 'text',
        },
        {
          header: '좋아요',
          width: 100,
          align: 'left',
          name: 'notice_titl',
          editor: 'text',
          hidden: true
        },
        {
          header: '백업ID',
          width: 100,
          align: 'left',
          name: 'bkup_id',
          editor: 'text',
          hidden: true
        },
        {
          header: '프로젝트ID',
          width: 100,
          align: 'left',
          name: 'prjt_id',
          editor: 'text',
          hidden: true
        },
        {
          header: '게시판ID',
          width: 100,
          align: 'left',
          name: 'gesipan_id',
          editor: 'text',
          hidden: true
        },
        {
          header: '게시판설명',
          width: 100,
          align: 'left',
          name: 'gesipan_dsc',
          editor: 'text',
          hidden: true
        },
        {
          header: '소속확인여부',
          width: 100,
          align: 'left',
          name: 'afrm_yn',
          editor: 'text',
          hidden: true
        },
        {
          header: '조회횟수여부',
          width: 100,
          align: 'left',
          name: 'nmb_inq_yn',
          editor: 'text',
          hidden: true
        },
        {
          header: '페이징여부',
          width: 100,
          align: 'left',
          name: 'pgn_yn',
          editor: 'text',
          hidden: true
        },
        {
          header: '파일업로드여부',
          width: 100,
          align: 'left',
          name: 'file_upld_yn',
          editor: 'text',
          hidden: true
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

td {
  border-spacing: 30px;
  padding: 5px 15px 5px 7px;
  text-align: right;
}

</style>