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
              @bkup_id_change="bkup_id_change"
              @prjt_nm_chage="prjt_nm_chage"
          ></combo>
          <li class="filter-item">
            <div class="item-con">게시판ID
              <input type="text"
                     v-model="info.gesipan_id"
                     :disabled=true
              >
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">익명여부
              <input type="text"
                     v-model="info.annym_yn"
                     style   = "width: 50px; background-color: #f2f2f2;"
                     :disabled=true
              >
            </div>
          </li>
        </ul>
        <ul class="filter-btn">
          <button class="btn btn-filter-p" style="margin-left: 10px" @click="fnSearch">목록</button>
        </ul>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box" style="height: 255px">
          <div class="div-header"><h2>게시내역</h2>
            <ul class="filter-btn">
            </ul>
          </div>
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
                @dblclick="dblclick"
            ></grid>
          </div>
        </div>
        <div class="div0-a">
          <div class="div3-b">
            <div class="div-header"><h2>게시정보</h2>
              <ul class="filter-btn">
                <button class="btn btn-filter-e" style="margin-left: 20px" @click="fnClear">신규</button>
              </ul>
            </div>
            <section class="filter-1000" style="padding-top: 0px">
              <div class="col">
                <ul class="filter-con clear-fix">
                  <li class="filter-item" style="width: 40px">
                    <label>게시제목</label>
                  </li>
                  <li class="filter-item">
                    <div class="item-con" style="margin-right: 15px">
                      <input type="text"
                             v-model="detail.post_titl"
                             ref="post_titl"
                             style="width: 850px;"
                      >
                    </div>
                  </li>
                </ul>
                <ul class="filter-con clear-fix">
                  <li class="filter-item">
                    <div class="item-con">
                      <th style="vertical-align: middle">
                        게시내용　
                      </th>
                      <td>
                          <textarea cols="145"
                                    rows="20"
                                    style="width: 100%; height: 240px; line-height: normal;"
                                    v-model="detail.post_dsc"
                                    ref="post_dsc"
                          ></textarea>
                      </td>
                    </div>
                  </li>
                </ul>
                <ul class="filter-btn" style="margin-top: 7px;">
                  <ul class="filter-btn" v-if="this.detail.mng_id">
                    <th style="margin-top: 5px; margin-right: 10px">첨부파일  </th>
                    <input type="text"
                           :disabled=true
                           v-model="detail.org_file_nm"
                           style="background-color: #f2f2f2; width: 500px;"
                    >
                    <button class="btn btn-filter-p" style="margin-right: 140px" @click="open_file_page(2)">첨부</button>
                  </ul>
                  <ul class="filter-btn" style="justify-content: flex-start" v-else>
                    <th style="margin-top: 5px; margin-right: 10px;">첨부파일</th>
                    <th style="margin-top: 5px; margin-right: 335px">첨부파일등록은 저장 후 가능합니다.</th>
                  </ul>
                  <li class="filter-item" style="width: 50px">
                    <label style="margin-top: 5px; width: 50px">비밀번호</label>
                  </li>
                  <li class="filter-item">
                    <div class="item-con" style="margin-right: 5px">
                      <input type="text"
                             v-model="detail.txt_psw"
                             ref="txt_psw"
                             style="width: 150px;"
                      >
                    </div>
                  </li>
                  <button class="btn btn-filter-p" @click="fnSave1">등록</button>
                </ul>
              </div>
            </section>
          </div>
        </div>
        <div class="grid1-box" style="height: 242px">
          <div class="div-header"><h2>답글내역</h2>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid2"
                :data="dataSource2"
                :header="header"
                :columns="columns2"
                :minBodyHeight="55"
                :bodyHeight="167"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeight="rowHeight"
                :rowHeaders="rowHeaders"
            ></grid>
          </div>
        </div>
        <section class="filter">
          <ul class="filter-btn">
            <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSave1" >추가</button>
          </ul>
        </section>
        <br>
        <br>
        <br>
        <br>
        <Modal :show.sync="modals.txt_modal1">
          <div class="modal-pop-body">
            <h2>
              비밀번호
            </h2>
          </div>
          <hr>
          <div class="item-con" style="margin-right: 5px">
            <input type="text"
                   id="modalId"
                   v-model="modalTxt"
                   ref="modalTxt"
                   style="width: 150px;"
            >
          </div>
          <div style="float: right">
            <button id="crpenm-edit" class="btn btn-filter-p" style="margin-right: 5px">삭제</button>
            <button id="crpenm-close" class="btn btn-filter-b" @click="fnCloseModal">닫기</button>
          </div>
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
import Modal from  "@/components/Modal";
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http";


// 첨부파일 팝업에서 받은 값
window.fileData = (fileLists) => {
  window.pms_register.file_name_list = fileLists;
  window.pms_register.detail.atfl_mng_id = fileLists[fileLists.length-1].atfl_mng_id;
}

// 커스텀 이미지 버튼을 만들기 위한 클래스 생성
class CustomRenderer {
  constructor(props) {
    const el = document.createElement('img');
    el.src = 'some-image-link';

    this.el = el;
    this.render(props);
  }
  getElement() {
    return this.el;
  }
  render(props) {
    // 플러스 버튼 img
    this.el.src = '/img/ic_new.e2fc07f4.svg';
  }
}

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
    window.pms_register = this;
  },
  updated(){
    // this.setNo();
  },

// 일반적인 함수를 선언하는 부분
  methods: {
    // Combo.vue 에서 받아온 값
    bkup_id_change(params) {this.info.bkup_id_selected = params},
    prjt_nm_chage(params) {this.info.prjt_nm_selected = params},

    // 화면 init
    init() {
      // 그리드 초기화 (게시내역, 답글내역, 댓글내역 등)
      this.$refs.grid1.invoke("clear");
      this.$refs.grid2.invoke("clear");
      // 그리드1 전체 비활성화
      this.$refs.grid1.invoke("disable");

      // 시스템 관리자가 아닌경우 자신의 이름과 번호를 조회조건에 바인딩
      if(sessionStorage.getItem("LOGIN_AUT_CD") !== '900'){
        this.info.man_nm = sessionStorage.getItem("LOGIN_EMP_NM")
        this.info.man_no = sessionStorage.getItem("LOGIN_EMP_NO")
      }
    },
    // 게시정보 등록 버튼
    fnSave1(){

    },
    /* 게시정보 저장을 하기위한 필수 항목 체크 */
    // FIXME 비밀번호 정합성 체크
    checkPrimary() {
      if (this.detail.post_titl == "" || this.detail.post_titl == null) {
        alert('게시제목은 필수 입력사항입니다.');
        return false;
      } else if (this.detail.post_dsc == "" || this.detail.post_dsc == null) {
        alert('게시내용은 필수 입력사항입니다.');
        return false;
      } else if (this.detail.txt_psw == "" || this.detail.txt_psw == null) {
        alert('비밀번호는 필수 입력사항입니다.');
        return false;
      }else {
        return true;  // 필수 값 모두 입력 시 true
      }
    },

    onGridUpdated(grid){

    },

    // 그리드 1 클릭 이벤트 - 게시내역(그리드1) ROW 클릭 시 하단 세부내역 조회 (답글내역)
    onClick1(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;

      // TODO 댓글 및 삭제 버튼 이벤트 추가 (게시내역, 답글내역, 댓글내역 각자 추가 필요)
      const currentCellData = (this.$refs.grid1.invoke("getFocusedCell"));
      if(ev.columnName == 'del_btn') {  // 컬럼명이 <삭제버튼>일 때만 팝업
        this.modals.txt_modal1 = true;
        this.modalTxt = currentCellData.value;
        const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      }

    },
    //더블클릭_게시정보 및 답글내역 조회 추가
    dblclick(ev) {
      //TODO 조회수 증가 update 추가 필요

      // 게시내역 ROW클릭 시 하단 게시정보 input 에 바인딩
      if (ev.columnName == 'dis_post_titl' || ev.columnName == 'post_dt' || ev.columnName == 'post_nm' || ev.columnName == 'view_cnt') {
        this.curRow = ev.rowKey;
        const currentRowData = (this.$refs.grid1.invoke("getRow", this.curRow));
        if (currentRowData != null) {
          this.cellDataBind(currentRowData) // currentRowData 가 있을 때 Row 클릭 시 상세내용에 Bind
        }
      }

      //TODO 답글내역 조회 추가
      this.info.post_id = this.$refs.grid1.invoke("getValue", this.curRow, "post_id") // ROW클릭 시 인력번호
      axiosService.get("/PJTE9120/select_9120_02", {
        params: {
          prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),
          bkup_id_selected: '0000000000',
          post_id :this.$refs.grid1.invoke("getValue", this.curRow, "post_id")
        }
      }).then(res => {
        // console.log("res.data.data ::" + res.data.data)
        this.setEmpData(res.data.data); // 조회한 데이터로 바인딩
      }).catch(e => {

      });
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");
    },

    /* 게시내역 Row dblClick 시 게시정보에 Bind */
    cellDataBind(currentRowData) {
      this.detail.post_titl = currentRowData.post_titl;              // (상세)게시글제목
      this.detail.post_dsc = currentRowData.post_dsc;                // (상세)게시글설명
      // TODO 첨부파일 관련 추가 필요
    },

    // 조회한 데이터로 게시내역 데이터 바인딩
    fnSearch(){
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
      //TODO 여러 여부에 따라 그리드 내 컬럼 보이기 및 가리기 추가 필요 (익명, 조회횟수, 댓글, 답글, 파일업로드 여부 등)
    },

    // 첨부파일등록 팝업 오픈
    // TODO function 명 및 내부로직 변경 필요
    setEmpData(data) {
      this.detail.last_chg_dt         = data.contents[0].last_chg_dt           // 최종변경일자
      this.detail.man_no              = data.contents[0].man_no                // 인력번호
      this.detail.man_nm              = data.contents[0].man_nm                // 이름
      this.detail.rank_nm             = data.contents[0].rank_nm               // 직급명
      this.detail.man_cd_selected     = data.contents[0].man_cd                // 인력구분
      this.$refs.combo2.$data.man_cd_selected = data.contents[0].man_cd;       // 인력구분(콤보)
      this.detail.birthday            = data.contents[0].birthday              // 생년월
      this.$refs.combo3.$data.skill_grd_selected = data.contents[0].skill_grd;       // 인력구분(콤보)
      this.detail.career              = data.contents[0].career                // 경력
      this.$refs.combo4.$data.grd_cd_selected = data.contents[0].grd_cd;       // 인력구분(콤보)
      this.detail.atfl_mng_id         = data.contents[0].atfl_mng_id           // 첨부파일관리ID
    },

    // 첨부파일 추가 팝업 오픈
    open_file_page() {
      let file_rgs_dscd = '801'
      let atfl_mng_id = this.detail.atfl_mng_id
      let mng_id = this.detail.man_no
      let bkup_id = '0000000000', prjt_id = sessionStorage.getItem("LOGIN_PROJ_ID")
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&mng_id=${mng_id}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
    },

    // [신규] 버튼 클릭 시 상세내용 값 초기화
    fnClear() {
      this.detail.post_titl           = '' // 게시제목
      this.detail.post_dsc            = '' // 게시글설명
      this.detail.atfl_mng_id         = '' // 첨부파일관리ID

      // 그리드2(답글내역), 그리드3(댓글내역) 초기화
      this.$refs.grid2.invoke("clear");
    },

    // TODO 모달창 추가 필요
    fnCloseModal(){  // 모달창 닫기
      this.modals.txt_modal1 = false;
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
      comboList : ["C27","C0"], //C27 = 프로젝트 ID, C0 = 백업 ID
      gridData2: [],
      gridData3: [],

      file_name_list: [],

      info : {
        prjt_nm_selected      : sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트명
        bkup_id_selected      : '0000000000',     // 백업 ID
        gesipan_id            : '0000000001',               // 게시판 ID
        annym_yn              : '',               // 익명여부
        post_id               : '',               //게시글 id
      },
      detail : {
        // 게시내역 dtl
        dis_post_titl       : '',                 // 화면용게시글제목
        post_dt             : '',                 // 게시일자
        post_nm             : '',                 // 게시자
        view_cnt            : '',                 // 조회횟수
        // 게시정보 dtl
        post_titl           : '',                 // 게시글제목
        post_dsc            : '',                 // 게시글설명
        txt_psw             : '',                 // 글비밀번호 (+답글내역 dtl + 댓글내역 dtl)
        atfl_mng_id         : '',                 // 첨부파일관리 ID
        bkup_id             : '',                 // 백업 ID
        prjt_id             : '',                 // 프로젝트 ID (+답글내역 dtl + 댓글내역 dtl)
        post_id             : '',                 // 게시글 ID (+답글내역 dtl + 댓글내역 dtl)
        gesipan_id          : '',                 // 게시판 ID
        org_file_nm         : '',                 // 원파일명
        // 답글내역 dtl
        rpl_titl            : '',                 // 답글제목
        rpl_db_chg_ts       : '',                 // 답글등록일시
        good_nm             : '',                 // 좋아요구분명
        rpl_emp_nm          : '',                 // 답글등록자
        rpl_no              : '',                 // 답글번호
        // 댓글내역 dtl
        cmnt_titl           : '',                 // 댓글제목
        cmnt_db_chg_ts      : '',                 // 댓글등록일시
        cmnt_emp_nm         : '',                 // 댓글등록자
        cmnt_no             : '',                 // 댓글번호
        prn_cmnt_no         : '',                 // 상위댓글번호
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

      // TODO 모달 속성 추가 필요
      /* 그리드 상세보기 모달 속성 */
      modals: {
        txt_modal1: false,
      },
      modalTxt:this.modalTxt,

      // toast ui grid 데이터
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9120/select_9120_01', method: 'GET' },
          updateData : { url: process.env.VUE_APP_API + '/PJTE9120/update_9120_01', method: 'PUT'},
        },
        initialRequest: false,
        contentType : 'application/json;',
        headers : {  'x-custom-header' : 'custom-header'  },
        withCredentials: false,
      },
      dataSource2: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9120/select_9120_02', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE9120/create2', method: 'POST'},
          deleteData : { url: process.env.VUE_APP_API + '/PJTE9120/delete2', method: 'PUT'},
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
      columns1: [ //게시내역
        {
          header: '게시제목',
          width: 520,
          align: 'center',
          name: 'dis_post_titl',
          editor: 'text',
        },
        {
          header: '게시제목',
          width: 320,
          align: 'center',
          name: 'post_titl',
          editor: 'text',
        },
        {
          header: '게시일시',
          width: 120,
          align: 'center',
          name: 'post_dt',
          editor: 'text',
        },
        {
          header: '게시자',
          width: 80,
          align: 'center',
          name: 'post_nm',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '조회수',
          width: 120,
          align: 'center',
          name: 'view_cnt',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000040N
            }
          },
          //hidden: true,
        },
        {
          header: '댓글',
          width: 80,
          align: 'center',
          name: 'cmnt_btn',
          renderer: CustomRenderer,
          //hidden: true,
        },
        {
          header: '삭제',
          width: 50,
          align: 'center',
          name: 'del_btn',
          renderer: CustomRenderer,
          editor: 'text',
        },
        // 숨김처리 추가
        {
          header: '게시글설명',
          width: 200,
          align: 'center',
          name: 'post_dsc',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '글비밀번호',
          width: 50,
          align: 'center',
          name: 'txt_psw',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '첨부파일관리ID',
          width: 80,
          align: 'center',
          name: 'atfl_mng_id',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '게시글 ID',
          width: 100,
          align: 'center',
          name: 'post_id',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '백업 ID',
          width: 100,
          align: 'center',
          name: 'bkup_id',
          editor: 'text',
          //hidden: true,
        },
      ],
      columns2: [ //답글내역
        {
          header: '답글',
          width: 500,
          align: 'left',
          name: 'rpl_titl',
          editor: 'text',
        },
        {
          header: '등록일시',
          width: 200,
          align: 'center',
          name: 'db_chg_ts',
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy-MM-dd HH:mm:ss',
              type: 'month',
            }
          }
        },
        {
          header: '좋아요',
          width: 100,
          align: 'left',
          name: 'good_nm',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '등록자',
          width: 100,
          align: 'left',
          name: 'emp_nm',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '삭제',
          width: 50,
          align: 'center',
          name: 'del_btn',
          renderer: CustomRenderer,
          editor: 'text',
          //hidden: true,
        },
      ],
      columns3: [ //답글정보
        {
          header: '수행처(발주처)',
          width: 250,
          align: 'left',
          name: 'exe_cpy_nm',
          editor: 'text',
        },
        {
          header: '시작년월',
          width: 100,
          align: 'center',
          name: 'sta_dt',
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy-MM',
              type: 'month',
            }
          }
        },
        {
          header: '종료년월',
          width: 100,
          align: 'center',
          name: 'end_dt',
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy-MM',
              type: 'month',
            }
          }
        },
        {
          header: '프로젝트명',
          width: 480,
          align: 'left',
          name: 'proj_nm',
          editor: 'text',
        },
        {
          header: '수행업무',
          width: 200,
          align: 'left',
          name: 'rssb_bns',
          editor: 'text',
        },
        {
          header: '역할',
          width: 120,
          align: 'center',
          name: 'duty_txt',
          editor: 'text',
        },
        {
          header: '사용기종/OS',
          width: 120,
          align: 'center',
          name: 'use_os',
          editor: 'text',
        },
        {
          header: '관련기술',
          minWidth: 120,
          align: 'left',
          name: 'rlt_skill',
          editor: 'text',
        },
        {
          header: '순번',
          minWidth: 120,
          align: 'center',
          name: 'sqno',
          editor: 'text',
          hidden: true,
        },
      ],
      columns4: [ //댓글내역
        {
          header: '수행처(발주처)',
          width: 250,
          align: 'left',
          name: 'exe_cpy_nm',
          editor: 'text',
        },
        {
          header: '시작년월',
          width: 100,
          align: 'center',
          name: 'sta_dt',
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy-MM',
              type: 'month',
            }
          }
        },
        {
          header: '종료년월',
          width: 100,
          align: 'center',
          name: 'end_dt',
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy-MM',
              type: 'month',
            }
          }
        },
        {
          header: '프로젝트명',
          width: 480,
          align: 'left',
          name: 'proj_nm',
          editor: 'text',
        },
        {
          header: '수행업무',
          width: 200,
          align: 'left',
          name: 'rssb_bns',
          editor: 'text',
        },
        {
          header: '역할',
          width: 120,
          align: 'center',
          name: 'duty_txt',
          editor: 'text',
        },
        {
          header: '사용기종/OS',
          width: 120,
          align: 'center',
          name: 'use_os',
          editor: 'text',
        },
        {
          header: '관련기술',
          minWidth: 120,
          align: 'left',
          name: 'rlt_skill',
          editor: 'text',
        },
        {
          header: '순번',
          minWidth: 120,
          align: 'center',
          name: 'sqno',
          editor: 'text',
          hidden: true,
        },
      ],
      columns5: [ //댓글정보
        {
          header: '수행처(발주처)',
          width: 250,
          align: 'left',
          name: 'exe_cpy_nm',
          editor: 'text',
        },
        {
          header: '시작년월',
          width: 100,
          align: 'center',
          name: 'sta_dt',
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy-MM',
              type: 'month',
            }
          }
        },
        {
          header: '종료년월',
          width: 100,
          align: 'center',
          name: 'end_dt',
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy-MM',
              type: 'month',
            }
          }
        },
        {
          header: '프로젝트명',
          width: 480,
          align: 'left',
          name: 'proj_nm',
          editor: 'text',
        },
        {
          header: '수행업무',
          width: 200,
          align: 'left',
          name: 'rssb_bns',
          editor: 'text',
        },
        {
          header: '역할',
          width: 120,
          align: 'center',
          name: 'duty_txt',
          editor: 'text',
        },
        {
          header: '사용기종/OS',
          width: 120,
          align: 'center',
          name: 'use_os',
          editor: 'text',
        },
        {
          header: '관련기술',
          minWidth: 120,
          align: 'left',
          name: 'rlt_skill',
          editor: 'text',
        },
        {
          header: '순번',
          minWidth: 120,
          align: 'center',
          name: 'sqno',
          editor: 'text',
          hidden: true,
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
.placeBlack::placeholder {
  color: #000000!important;
}
.search-btn-9005 {
  position: absolute;
  width: 28px;
  height: 24px;
  background: url(../../assets/img/PE-icon/ic_search.svg) center/20px no-repeat;
  background-color: #B8B8B8;
  border: 0;
}
input[type="month"]::-webkit-calendar-picker-indicator{
  opacity:0;
  z-index: 1;
  cursor: pointer;
}
.input-monthWrap {
  position: relative;
  display: inline-block;
}
.input-monthWrap::after {
  content: '';
  position: absolute;
  right: 6px;
  top: 4px;
  width: 16px;
  height: 16px;
  background: url(../../assets/img/PE-icon/ic_input_cal.svg) center/cover no-repeat;
}
</style>
