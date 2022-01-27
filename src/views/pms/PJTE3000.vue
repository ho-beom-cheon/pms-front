<template>
  <!-- CONTENTS -->
  <div class="contents">

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
                <li><a href="/PJTE2200">{{ menu_list[3].name }}</a></li>
                <li><a href="/PJTE2210">{{ menu_list[4].name }}</a></li>
                <li class="active"><a href="/PJTE3000">{{ menu_list[5].name }}</a></li>
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
            ></combo>
            <li class="filter-item-n">
              <div class="input-searchWrap">결함등록자
                <input type="text"
                       placeholder="직원명"
                       v-model="info.rgpe_nm"
                       style="width: 90px"
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
                     v-model="info.rgpe_no"
                     style="width: 70px; background-color: #f2f2f2;"
                     :disabled=true
              >
            </li>
            <li class="filter-item-n">
              <div class="input-searchWrap">조치자
                <input type="text"
                       placeholder="직원명"
                       v-model="info.dvlpe_nm"
                       style="width: 90px"
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
                     v-model="info.dvlpe_no"
                     style="width: 70px; background-color: #f2f2f2;"
                     :disabled=true
              >
            </li>
            <li class="filter-item-n">
              <div class="input-searchWrap">담당PL
                <input type="text"
                       placeholder="직원명"
                       v-model="info.pl_nm"
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
                     v-model="info.pl_no"
                     style="width: 70px; background-color: #f2f2f2;"
                     :disabled=true
              >
            </li>
            <li class="filter-item">
              <div class="item-con">프로그램ID
                <input type="text"
                       placeholder="입력"
                       v-model="info.cctn_id"
                       style="width: 120px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">프로그램명
                <input type="text"
                       placeholder="입력"
                       v-model="info.cctn_nm"
                       style="width: 140px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">결함내용
                <input type="text"
                       placeholder="입력"
                       v-model="info.err_txt"
                       style="width: 140px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">결함등록일자
                <div class="input-dateWrap"><input type="date" :max="info.rgs_end_dt" v-model="info.rgs_sta_dt"
                                                   style="width: 125px"></div>
                -
                <div class="input-dateWrap"><input type="date" :min="info.rgs_sta_dt" v-model="info.rgs_end_dt"
                                                   style="width: 125px"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">결함조치일자
                <div class="input-dateWrap"><input type="date" :max="info.ttmn_end_dt" v-model="info.ttmn_sta_dt" style="width: 125px">
                </div>
                -
                <div class="input-dateWrap"><input type="date" :max="info.ttmn_sta_dt" v-model="info.ttmn_end_dt" style="width: 125px">
                </div>
              </div>
            </li>


            <li class="filter-item">
              <div class="item-con">
                <input type="checkbox" id="cmpl_yn" v-model="info.cmpl_yn">
                <label>　완료건 포함</label>
              </div>
            </li>
          </ul>
          <ul class="filter-btn">
            <div class="btn btn-filter-e"  @click="gridExcelExport">
              <a href="#">엑셀다운로드</a>
            </div>
            <div class="btn btn-filter-p" style="margin-left: 20px" @click="fnSearch">
              <a href="#" >조회</a>
            </div>
          </ul>
        </div>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <!-- Modal popup contents -->
        <Modal :show.sync="modals.txt_modal1">
          <h3 slot="header" class="modal-title" id="modal-title-default">내용상세보기</h3>
          <tr>
            <textarea id="modalId"
                      cols="73"
                      rows="20"
                      style="margin-bottom: 10px; background-color: #f2f2f2;"
                      v-model="modalTxt"
                      disabled=true
            ></textarea>
          </tr>
          <tr>
            <div style="float: right">
<!--              <button class="btn btn-filter-p" id="fnEdit" style="margin-right: 5px" @click="fnEdit">수정</button>-->
              <button class="btn btn-filter-b" @click="fnCloseModal">닫기</button>
            </div>
          </tr>
        </Modal>
        <!-- grid contents -->
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
          ></grid>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import {Grid} from '@toast-ui/vue-grid';
import Combo from "@/components/Combo"
import 'tui-date-picker/dist/tui-date-picker.css';
import axios from "axios";
import {axiosService} from "@/api/http"; // Date-picker 스타일적용
import Modal from "@/components/Modal";
import PJTE9001 from "@/views/pms/PJTE9001";

// 직원조회 팝업에서 받은 값
window.empData = (empnm ,empno, btn_id) => {
  window.pms_register.emp_nm = empnm;
  window.pms_register.emp_no = empno;
  window.pms_register.emp_btn_id = btn_id;
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
var prjt_id = [{text: "PMS프로젝트", value: "1000000001"}, {text: "PMS프로젝트2", value: "1000000002"}, {text: "PMS프로젝트3",  value: "1000000003"}];
var bkup_id = [{text: "백업", value: "0000000000"}];


// 업무구분
const bzcd = [
  {text: "전체", value: 'TTT'},
  {text: "신용", value: 'AAA'},
  {text: "재무제표", value: "BBB"},
  {text: "신용평가", value: "CCC"},
];
//등록단계구분
const rgs_dscd = [
  {text: "전체", value: 'TTT'},
  {text: "단위테스트단계", value: '1100'},
  {text: "1차통합테스트단계", value: '2100'},
  {text: "2차통합테스트단계", value: '2200'},
  {text: "3차통합테스트단계", value: '2300'},
  {text: "4차통합테스트단계", value: '2400'},
];

//결함유형
const err_tycd = [
  {text: "전체", value: 'TTT'},
  {text: "결함", value: '100'},
  {text: "개선", value: '200'},
  {text: "결함아님", value: '300'},
  {text: "기타결함", value: '900'},
];

// 처리단계
const err_prc_step_cd = [

  {text: "전체", value: "TTT"},
  {text: "등록", value: "100"},
  {text: "담당자배정", value: "200"},
  {text: "결함재등록", value: "300"},
  {text: "이관", value: "400"},
  {text: "보류", value: "500"},
  {text: "개발자조치완료", value: "600"},
  {text: "PL확인", value: "700"},
  {text: "등록자확인", value: "800"},

];

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Modal,
    Combo,
    grid: Grid,
  },
  // beforeCreate ~ destroyed 까지는 Vue 인스턴스 생성에 따라 자동으로 호출되는 함수
  // "라이프사이클 훅"이라고 함.
  // 자세한 사항은 Vue 라이프 사이클 참조
  // https://kr.vuejs.org/v2/guide/instance.html
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
    this.init();
    this.fnSearch();
    window.pms_register = this;
    console.log("mounted");
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

    // 콤보 처음 값 저장
    comboSetData(){
      this.info.bkup_id_selected = this.$children[0].$data.bkup_id_selected;
      this.info.prjt_nm_selected = this.$children[0].$data.prjt_nm_selected;
      this.info.bzcd_selected = this.$children[0].$data.bzcd_selected;
    },

    init() {
      // 그리드 초기화
      this.$refs.grid.invoke("clear");
      // 조회 필터 초기화
      this.info.cmpl_yn = false
    },
    /*그리드 클릭 이벤트*/
    onClick(ev) {
      console.log("클릭" + ev.rowKey);
      this.curRow = ev.rowKey;
      // 그리드 내용 클릭 시 상세보기 모달팝업
      const currentCellData = (this.$refs.grid.invoke("getFocusedCell"));
      if (ev.columnName == 'ttmn_txt') {  // 컬럼명이 <조치내용>일 때만 팝업
        this.modals.txt_modal1 = true;
        this.modalTxt = currentCellData.value;
        const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      }
      if(ev.columnName === 'rgpe_btn') {
        this.pop = window.open("../PJTE9001/", currentCellData, "width=700, height=600");
      }
    },
    /*그리드 더블클릭 이벤트*/
    dblonClick(ev) {
      this.curRow = ev.rowKey;
      // 컬럼명이 테스트케이스ID(프로그램ID) / 테스트케이스명(프로그램명) 일 때 결함팝업 호출
      if(ev.columnName === 'cctn_id' || ev.columnName === 'cctn_nm') {
        let mng_id= this.$refs.grid.invoke("getValue", this.curRow, 'mng_id');
        let bkup_id='0000000000';
        let prjt_id=sessionStorage.getItem('LOGIN_PROJ_ID');
        let rgpe_nm=this.$refs.grid.invoke("getValue", this.curRow, 'rgpe_nm');
        this.pop = window.open(`../PJTE3001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&mng_id=${mng_id}&rgpe_nm=${rgpe_nm}&`, "open_page", "width=1000, height=800");
      }
    },
    fnEdit() {   // 모달창에서 수정버튼 클릭 시 그리드Text 변경
      this.$refs.grid.invoke("setValue", this.curRow, "ttmn_txt", document.getElementById("modalId").value);
      this.modals.txt_modal1 = false;
    },
    fnCloseModal() {  // 모달창 닫기
      this.modals.txt_modal1 = false;
    },
    fnSearch() {
      this.comboSetData();

      // 조회 서비스
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    gridAddRow() {

      this.$refs.grid.invoke("appendRow", {col1: "1", col3: "개발", col4: "SWZP0010", col5: "PMS구축"}, {focus: true});
    },
    gridDelRow() {
      this.$refs.grid.invoke("removeRow", this.curRow);
      // DB 데이터 삭제로직 추가
    },
    gridADelRow() {
      // DB 데이터 삭제로직 추가
    },
    gridIns() {
      // DB 데이터 삭제로직 추가
    },
    gridExcelExport() {
      this.$refs.grid.invoke("export", "xlsx", {fileName: "엑셀다운로드"});
    },
    gridExcelImport() {
      // 엑셀파일 업로드 로직 추가
    },
    open_page() {
      this.pop = window.open("../PJTE3001/", "open_page", "width=1000, height=800");
    },
    open_pjte9001(btn_id) {
      let empnm = ''
      if (btn_id == '1') {
        empnm = this.info.rgpe_nm
      } else if (btn_id == '2') {
        empnm = this.info.dvlpe_nm
      } else if (btn_id == '3') {
        empnm = this.info.pl_nm
      }
      if (empnm != null && empnm != '') {
        axiosService.get("/PJTE9001/select", {
          params: {
            empnm
          }
        })
            .then(res => {
              let res_data = res.data.data.contents;
              // console.log(res_data)
              if (res_data.length == 1) {  // 입력한 직원명으로 조회한 값이 단건일 경우 : 직원번호 바인딩
                if (btn_id == '1') {
                  this.info.rgpe_no = res.data.data.contents[0].empno
                } else if (btn_id == '2') {
                  this.info.dvlpe_no = res.data.data.contents[0].empno
                } else if (btn_id == '3') {
                  this.info.pl_no = res.data.data.contents[0].empno
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
    count: (a, b) => {
      console.log("count의 값이 변경되면 여기도 실행");
      console.log("new Value :: " + a);
      console.log("old Value :: " + b);
    },
    /* 직원조회 팝업에서 받아온 값으로 emp_btn_id값이 바뀔 때
       버튼 id에 따라 직원명, 직원번호 값을 넣는다*/
    emp_btn_id() {
      if(this.emp_btn_id == '1'){       // 결함등록자
        this.info.rgpe_no = this.emp_no
        this.info.rgpe_nm = this.emp_nm
      }else if(this.emp_btn_id == '2'){ // 조치자
        this.info.dvlpe_no = this.emp_no
        this.info.dvlpe_nm = this.emp_nm
      }else if(this.emp_btn_id == '3'){ // 담당PL
        this.info.pl_no = this.emp_no
        this.info.pl_nm = this.emp_nm
      }
    }
  },
  // 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C27","C0","C1","C9"],

      emp_btn_id : '',
      emp_nm : '',
      emp_no : '',

      info: {
        // 콤보
        prjt_id: prjt_id,    		            // 프로젝트명
        bkup_id: bkup_id,                   // 백업ID
        bzcd: bzcd,    			                // 업무구분
        rgs_dscd: rgs_dscd,                 //등록단계구분
        err_tycd: err_tycd,                 //결함유형
        err_prc_step_cd: err_prc_step_cd,   //처리단계

        prjt_id_selected: prjt_id[0].value,                 // 프로젝트명
        bkup_id_selected: bkup_id[0].value,                 // 백업ID
        bzcd_selected: bzcd[0].value,                       // 업무구분
        rgs_dscd_selected: rgs_dscd[0].value,               // 등록단계구분
        err_tycd_selected: err_tycd[0].value,               // 결함유형
        err_prc_step_cd_selected: err_prc_step_cd[0].value, // 처리단계

        rgpe_no: this.rgpe_no,       // 결함등록자번호
        rgpe_nm: this.rgpe_nm,       // 결함등록자명
        dvlpe_no: this.dvlpe_no,     // 조치자번호
        dvlpe_nm: this.dvlpe_nm,     // 조치자명
        pl_no: this.pl_no,           // 담당PL번호
        pl_nm: this.pl_nm,           // 담당PL명

        cctn_id: this.cctn_id,       // 프로그램ID
        cctn_nm: this.cctn_nm,       // 프로그램명
        err_txt: this.err_txt,       // 결함내용

        rgs_sta_dt: '',     // 결함등록일자STA
        rgs_end_dt: '',     // 결함등록일자END
        ttmn_sta_dt: '',    // 결함조치일자STA
        ttmn_end_dt: '',    // 결함조치일자END

        cmpl_yn: this.cmpl_yn,    // 완료건 포함 여부
      },

      addRow: {},
      /* 그리드 상세보기 모달 속성 */
      modals: {
        txt_modal1: false,
      },
      modalTxt: this.modalTxt,

      count: 0,
      curRow: -1,
      title: "",
      scrollX: false,
      scrollY: false,
      bodyHeight: 650,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: true,
      open: false,
      menu_list: [
        {
          id: 'PJTE1000',
          path: '/PJTE1000',
          name: 'ProjectEyes현황'
        },
        {
          id: 'PJTE2100',
          path: '/PJTE2100',
          name: '개발현황'
        },
        {
          id: 'PJTE2110',
          path: '/PJTE2110',
          name: '개발진척현황'
        },
        {
          id: 'PJTE2200',
          path: '/PJTE2200',
          name: '통합테스트'
        },
        {
          id: 'PJTE2210',
          path: '/PJTE2210',
          name: '통합테스트진척현황'
        },
        {
          id: 'PJTE3000',
          path: '/PJTE3000',
          name: '결함관리'
        },
        {
          id: 'PJTE4000',
          path: '/PJTE4000',
          name: 'ActionItem및이슈관리현황'
        },
        {
          id: 'PJTE5000',
          path: '/PJTE5000',
          name: 'WBS관리'
        },
        {
          id: 'PJTE6000',
          path: '/PJTE6000',
          name: 'PMS신청관리'
        },
        {
          id: 'PJTE7000',
          path: '/PJTE7000',
          name: '산출물정합성체크'
        },
        {
          id: 'PJTE9000',
          path: '/PJTE9000',
          name: '시스템관리'
        },
      ],
      dataSource: {

        api: {
          readData: {url: process.env.VUE_APP_API + '/PJTE3000/select', method: 'GET'},
          createData: {url: process.env.VUE_APP_API + '/PJTE3000/create', method: 'POST'},
          updateData: {url: process.env.VUE_APP_API + '/PJTE3000/update', method: 'PUT'},
          deleteData: {url: process.env.VUE_APP_API + '/PJTE3000/delete', method: 'PUT'},
        },
        initialRequest: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders: ['rowNum'],
      header: {
        height: 45,
        complexColumns: [
          {
            header: '프로그램ID',
            name: 'mergeColumn1',
            childNames: ['cctn_id']
          },
          {
            header: '프로그램명',
            name: 'mergeColumn2',
            childNames: ['cctn_nm']
          },
          {
            header: '결함등록자',
            name: 'mergeColumn3',
            childNames: ['rgpe_nm', 'rgpe_btn', 'rgpe_no'],
            hideChildHeaders : true,
          },
          {
            header: '조치자명',
            name: 'mergeColumn4',
            childNames: ['dvlpe_nm', 'dvlpe_btn', 'dvlpe_no'],
            hideChildHeaders : true,
          },
          {
            header: 'PL명',
            name: 'mergeColumn5',
            childNames: ['pl_nm', 'pl_btn', 'pl_no'],
            hideChildHeaders : true,
          },
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
          editor: {
            type: 'select',
            options:{
              listItems: bzcd
            }
          }
        },
        {
          header: '등록단계',
          width: 180,
          align: 'left',
          name: 'rgs_dscd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: rgs_dscd
            }
          }
        },
        {
          header: '테스트케이스ID',
          width: 120,
          align: 'center',
          name: 'cctn_id'
        },
        {
          header: '테스트케이스명',
          width: 180,
          align: 'left',
          name: 'cctn_nm'
        },
        {
          header: '결함유형',
          width: 100,
          align: 'center',
          name: 'err_tycd',
          type: 'text',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: err_tycd
            }
          }
        },
        {
          header: '처리단계',
          width: 120,
          align: 'center',
          name: 'err_prc_step_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: err_prc_step_cd
            }
          }
        },
        {
          header: '결함등록일자',
          width: 120,
          align: 'center',
          name: 'rgs_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
        },
        {
          header: '결함등록자',
          width: 80,
          align: 'center',
          name: 'rgpe_nm',
          editor: 'text',
        },
        {
          header: '결함등록자',
          width: 40,
          align: 'center',
          name: 'rgpe_btn',
          renderer: SearchBtn,
        },
        {
          header: '결함등록자',
          width: 80,
          align: 'center',
          name: 'rgpe_no',
        },
        {
          header: '결함내용',
          width: 110,
          align: 'center',
          name: 'err_txt',
          ellipsis: true,
        },
        {
          header: '조치내용',
          width: 360,
          align: 'left',
          name: 'ttmn_txt',
          ellipsis: true,
        },
        {
          header: '조치예정일자',
          width: 110,
          align: 'center',
          type: 'date',
          name: 'ttmn_scd_dt',
          editor: 'datePicker'
        },
        {
          header: '조치일자',
          width: 110,
          align: 'center',
          name: 'ttmn_dt',
          editor: 'datePicker'
        },
        {
          header: '조치자명',
          width: 80,
          align: 'center',
          name: 'dvlpe_nm',
          editor: 'text',
        },
        {
          header: '조치자명',
          width: 40,
          align: 'center',
          name: 'dvlpe_btn',
          renderer: SearchBtn,
        },
        {
          header: '조치자명',
          width: 80,
          align: 'center',
          name: 'dvlpe_no',
        },
        {
          header: 'PL명',
          width: 80,
          align: 'center',
          name: 'pl_nm',
          editor: 'text',
        },
        {
          header: 'PL명',
          width: 40,
          align: 'center',
          name: 'pl_btn',
          renderer: SearchBtn,
        },
        {
          header: 'PL명',
          width: 80,
          align: 'center',
          name: 'pl_no',
        },
        {
          header: '이관전업무',
          width: 160,
          align: 'center',
          name: 'bfjr_bzcd'
        }
      ]
    }
  },
};

</script>
<style>
</style>
