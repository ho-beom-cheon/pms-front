<template>
  <!-- CONTENTS1 -->
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
              <button class="menu-group" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
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
                <li><a href="/PJTE3000">{{ menu_list[5].name }}</a></li>
                <li><a href="/PJTE4000">{{ menu_list[6].name }}</a></li>
                <li><a href="/PJTE5000">{{ menu_list[7].name }}</a></li>
                <li><a href="/PJTE6000">{{ menu_list[8].name }}</a></li>
                <li><a href="/PJTE7000">{{ menu_list[9].name }}</a></li>
                <li class="active"><a href="/PJTE9000">{{ menu_list[10].name }}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- 컨텐츠 영역 -->
    <div class="contents-body">
      <!-- page contents -->
      <section class="page-contents">
        <div class="multiGridWrap-c">
          <div class="div0-c">
            <div class="div1-c">
              <div class="div1-1-c">
                <section class="filter">
                  <ul class="filter-con clear-fix">
                    <li class="filter-item">
                      <div class="item-con">프로젝트명
                        <select
                            id="id.bkup_id"
                            v-model="info.bkup_id_selected"
                            style="width: 167px"
                            :disabled = true
                        >
                          <option
                              v-for="(bkup_id, idx) in info.bkup_id"
                              :key="idx"
                              v-text="bkup_id.text"
                              :value="bkup_id.value"
                          ></option>
                        </select>
                      </div>
                    </li>
                    <li class="filter-item">
                      <div class="item-con">프로젝트명
                        <select
                            id="id.prjt_id"
                            v-model="info.prjt_id_selected"
                            style="width: 167px"
                            :disabled = true
                        >
                          <option
                              v-for="(prjt_id, idx) in info.prjt_id"
                              :key="idx"
                              v-text="prjt_id.text"
                              :value="prjt_id.value"
                          ></option>
                        </select>
                      </div>
                    </li>
                    <div class="btn btn-filter-p" style = "margin-top: 5px">
                      <a href="#" @click="fnSearch">재조회</a>
                    </div>
                  </ul>
                </section>
                <div class="div-grid-c">
                </div>
                <ul class="filter-btn" style="margin-top: 25px">
                  <div class="btn btn-filter-e">
                    <a href="#" @click="gridExcelImport">엑셀업로드</a>
                  </div>
                  <div class="btn btn-filter-e">
                    <a href="#" @click="gridExcelExport">엑셀다운로드</a>
                  </div>
                  <div class="btn btn-filter-b" style = "margin-left: 20px;">
                    <a href="#" @click="gridAddRow" >행추가</a>
                  </div>
                  <div class="btn btn-filter-b">
                    <a href="#" @click="gridDelRow">행삭제</a>
                  </div>
                  <div class="btn btn-filter-p" style = "margin-left: 20px; background-color: #9FC93C">
                    <a href="#" @click="fnSearch">로그인변경</a>
                  </div>
                  <div class="btn btn-filter-p" style = "margin-left: 20px">
                    <a href="#" @click="fnSave">저장</a>
                  </div>
                </ul>
              </div>
              <div class="div1-2-c">
                <div class="div-grid-c">
                  <grid
                      ref="grid1"
                      :data="dataSource"
                      :header="header"
                      :columns="columns1"
                      :bodyHeight="150"
                      :showDummyRows="showDummyRows"
                      :columnOptions="columnOptions"
                      :rowHeight="rowHeight"
                      @click="onClick"
                  ></grid>
                </div>
              </div>
            </div>
            <div class="div2-c">
              <div class="div2-1-c">
                <section class="filter" style="padding: 0px">
                  <ul class="filter-con clear-fix">
                    <li class="filter-item">
                      <div class="item-con">신규생성년도
                        <input type="text"
                               placeholder="입력"
                               v-model="info.empno"
                               @keyup.enter="fnSearch"
                               style   = "width: 150px;"
                        >
                      </div>
                    </li>
                  </ul>
                  <ul class="filter-btn">
                    <div class="btn btn-filter-p" style = "margin-bottom: 5px">
                      <a href="#" @click="fnSearch">생성</a>
                    </div>
                  </ul>
                  <ul class="filter-con clear-fix">
                    <li class="filter-item">
                      <div class="item-con">조회년월일
                        <input type="text"
                               placeholder="입력"
                               v-model="info.empno"
                               @keyup.enter="fnSearch"
                               style   = "width: 150px; margin-left: 11px"
                        >
                      </div>
                    </li>
                  </ul>
                  <ul class="filter-btn">
                    <div class="btn btn-filter-p" style = "margin-bottom: 5px">
                      <a href="#" @click="fnSearch">조회</a>
                    </div>
                  </ul>
                </section>
              <ul class="filter-btn" style="margin-bottom: 8px; margin-top: 10px">
                <div class="btn btn-filter-b">
                  <a href="#" @click="gridAddRow">행추가</a>
                </div>
                <div class="btn btn-filter-b">
                  <a href="#" @click="gridDelRow">행삭제</a>
                </div>
              </ul>
              </div>
              <div class="div2-2-c">
              <div class="div-grid-c">
                <grid
                    ref="grid1"
                    :data="dataSource"
                    :header="header"
                    :columns="columns2"
                    :bodyHeight="150"
                    :showDummyRows="showDummyRows"
                    :columnOptions="columnOptions"
                    :rowHeight="rowHeight"
                    @click="onClick"
                ></grid>
              </div>
              </div>
            </div>
          </div>
          <div class="div3-c">
            <div class="div-header-c"><h2>코드유형</h2>
                <ul class="filter-btn">
                  <div class="btn btn-filter-b">
                    <a href="#" @click="gridAddRow">행추가</a>
                  </div>
                  <div class="btn btn-filter-b">
                    <a href="#" @click="gridDelRow">행삭제</a>
                  </div>
                  <div class="btn btn-filter-p" style = "margin-left: 20px">
                    <a href="#" @click="fnSave">저장</a>
                  </div>
                </ul>
            </div>
            <div class="div-grid-c">
              <grid
                  ref="grid2"
                  :data="dataSource"
                  :header="header"
                  :columns="columns3"
                  :bodyHeight="235"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  :rowHeaders="rowHeaders"
                  @click="onClick"
              ></grid>
            </div>
          </div>
          <div class="div4-c">
            <div class="div-header-c"><h2>코드상세</h2>
              <ul class="filter-btn">
                <div class="btn btn-filter-b">
                  <a href="#" @click="gridAddRow">행추가</a>
                </div>
                <div class="btn btn-filter-b">
                  <a href="#" @click="gridDelRow">행삭제</a>
                </div>
                <div class="btn btn-filter-p" style = "margin-left: 20px">
                  <a href="#" @click="fnSave">저장</a>
                </div>
              </ul>
            </div>
            <div class="div-grid-c">
              <grid
                  ref="grid3"
                  :data="dataSource"
                  :header="header"
                  :columns="columns4"
                  :bodyHeight="bodyHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  :rowHeaders="rowHeaders"
                  @click="onClick"
              ></grid>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
window.fileData = (fileLists) => {
  console.log(fileLists)
}
import '/node_modules/tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';
import WindowPopup from "./PJTE3001.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
import axios from 'axios';

//그리드 아이템 예제
const listItem = [
    {text:"개발", value:"1"},
    {text:"운영", value:"2"},
    {text:"이관", value:"3"}
];

// 파일등록구분
const file_rgs_dscd = [
  {text:"단위테스트증빙", value:'100'},
  {text:"설계서", value:'101'},
  {text:"통합테스트증빙", value:"200"},
  {text:"통합테스트양식", value:"201"},
  {text:"결함오류파일", value:"300"},
  {text:"결함조치파일", value:"400"},
  {text:"신청요청파일", value:"500"},
  {text:"공지사항파일", value:"600"},
  {text:"WBS관리파일", value:"700"},
  {text:"업로드약식", value:"900"},
];

// 프로젝트ID
const prjt_id = [
  {text: "전체", value: "999"},
  {text: "PMS프로젝트", value: "1000000001"},
  {text: "PMS프로젝트2", value: "1000000001"},
  {text: "PMS프로젝트3", value: "1000000001"}
];

// 업무구분
const bzcd = [
  {text: "전체", value: '999'},
  {text: "신용", value: 'AAA'},
  {text: "재무제표", value: "BBB"},
  {text: "신용평가", value: "CCC"},
];

// 사용자권한
const aut_cd = [
  {text: "전체", value: '999'},
  {text: "개발자", value: '100'},
  {text: "PL", value: "200"},
  {text: "IT", value: "300"},
  {text: "현업", value: "400"},
  {text: "PM", value: "500"},
  {text: "PMO", value: "600"},
];

var file_rgs_dscd_selected;
var prjt_id_selected;
var bzcd_selected;
var aut_cd_selected;

export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
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
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated(){
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
    change(){
      console.log("change");
    },
    fnSave(){
      debugger;
      this.$refs.grid1.invoke("modifyData");
      console.log("modify");
    },
    onClick(ev) {
      console.log("클릭" + ev.rowKey);
      this.curRow = ev.rowKey;
    },
    fnSearch(){
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
    },
    fnSearchCode(){
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");
      this.$refs.grid3.invoke("setRequestParams", this.info);
      this.$refs.grid3.invoke("readData");
    },
    gridInit(){
      this.$refs.grid1.invoke("clear");
    },
    gridAddRow(){
      this.$refs.grid1.invoke("appendRow",{ col1:"1", col3:"개발", col4:"SWZP0010", col5:"PMS구축"},{focus:true}) ;
    },
    gridDelRow(){
      this.$refs.grid1.invoke("removeRow", this.curRow);
// DB 데이터 삭제로직 추가
    },
    gridADelRow(){
// DB 데이터 삭제로직 추가
    },
    gridIns(){
// DB 데이터 삭제로직 추가
    },
    gridExcelExport(){
      this.$refs.grid1.invoke("export", "xlsx", {fileName:"엑셀다운로드"});
    },
    gridExcelImport(){
// 엑셀파일 업로드 로직 추가
    },
    open_page(){
      let bkup_id='0000000000', prjt_id='1000000001', atfl_mng_id='1000000011', file_rgs_dscd='700',
      mng_id = '1000000000', bzcd='BBB', sqn_cd='Cust_summary_L9', tst_case_id='200', pgm_id='TS-001-TC-014'
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&mng_id=${mng_id}&file_rgs_dscd=${file_rgs_dscd}&bzcd=${bzcd}&sqn_cd=${sqn_cd}&tst_case_id=${tst_case_id}&pgm_id=${pgm_id}&`, "open_page", "width=1000, height=800");
    }

  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{
    count: (a, b) => {
      console.log("count의 값이 변경되면 여기도 실행");
      console.log("new Value :: " + a);
      console.log("old Value :: " + b);
    }
  },
// 변수 선언부분
  data() {
    return {
      info : {
        /* 사용자 조회 버튼 */
        empno      : this.empno,    // 사번(직원번호)
        empnm      : this.empnm,    // 이름(직원명)
        lgn_pwd    : this.lgn_pwd,  // 비밀번호
        ip_addr    : this.ip_addr,  // IP
        cpno       : this.cpno,     // 핸드폰번호

        prjt_id     : prjt_id,       // 프로젝트ID
        bzcd        : bzcd,          // 업무구분
        aut_cd      : aut_cd,        // 사용자권한

        prjt_id_selected     : prjt_id[0].value,      // 프로젝트ID
        bzcd_selected        : bzcd[0].value,         // 업무구분
        aut_cd_selected      : aut_cd[0].value,       // 사용자권한

      },
      popinfo : {
        /* PMS관리 - 파일구분, 팝업정보ID/경로/화면명 */
        file_rgs_dscd : file_rgs_dscd, // 파일구분
        file_rgs_dscd_selected : file_rgs_dscd[0].value, // 파일구분코드

        scrn_id: this.scrn_id,    // 팝업정보ID
        file_path: this.file_path,    // 파일경로
        scrn_nm  : this.scrn_nm,  // 화면명

      },

      addRow : {
        grid : this.grid,
      },
      frcs_sta_dt : '',    // 계획일자STA
      frcs_end_dt : '',    // 계획일자END
      sta_dt      : '',    // 실제일자STA
      end_dt      : '',    // 실제일자END

      check_Yn    : false,  // 삭제프로그램/소스취약점포함

      count:0,
      curRow:-1,
      title:"",
      scrollX:false,
      scrollY:false,
      bodyHeight: 345,
      rowHeight: 30,
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
          readData: { url: 'http://localhost:8080/PJTE9000/select', method: 'GET' },
        },
        initialRequest: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders:['rowNum'],
      header:{
        height: 25
      },
      columns1: [
        {
          header: '프로젝트',
          width: 150,
          name: 'atfl_mng_id',
        },
        {
          header: '직원번호',
          width: 120,
          name: 'sqno',
        },
        {
          header: '지원명',
          width: 120,
          name: 'file_rgs_dscd',
        },
        {
          header: '직급',
          width: 120,
          name: 'file_path',
        },
        {
          header: '이메일',
          width: 120,
          name: 'file_nm',
        },
        {
          header: '휴대폰번호',
          width: 120,
          name: 'rmrmk',
        },
        {
          header: '구성원',
          width: 120,
          name: 'rmrmk',
        },
        {
          header: '권한',
          width: 120,
          name: 'rmrmk',
        },
        {
          header: 'IP',
          width: 120,
          name: 'rmrmk',
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
      ],
      columns2: [
        {
          header: '일자',
          name: 'file_nm',
        },
        {
          header: '요일구분',
          name: 'file_nm',
        },
        {
          header: '휴일구분',
          name: 'file_nm',
        },
      ],
      columns3: [
        {
          header: '그룹유형코드',
          width: 100,
          name: 'grp_tycd',
        },
        {
          header: '그룹유형명',
          width: 100,
          name: 'dtls_tycd',
        },
        {
          header: '정렬',
          width: 100,
          name: 'dtls_tynm',
        },
        {
          header: '사용',
          width: 100,
          name: 'dtls_tynm',
        },
        {
          header: '그리드컬럼명1',
          width: 150,
          name: 'etc_txt1',
        },
        {
          header: '그리드컬럼명2',
          width: 150,
          name: 'etc_txt2',
        },
        {
          header: '그리드컬럼명3',
          width: 150,
          name: 'etc_txt3',
        },
        {
          header: '그리드컬럼명4',
          width: 150,
          name: 'etc_txt4',
        },
        {
          header: '그리드컬럼명5',
          width: 150,
          name: 'etc_txt5',
        },
        {
          header: '그리드컬럼명6',
          width: 150,
          name: 'etc_txt6',
        },
        {
          header: '그리드컬럼명7',
          width: 150,
          name: 'etc_txt7',
        },
        {
          header: '그리드컬럼명8',
          width: 150,
          name: 'etc_txt8',
        },
        {
          header: '그리드컬럼명9',
          width: 150,
          name: 'etc_txt9',
        },
        {
          header: '그리드컬럼명10',
          width: 150,
          name: 'etc_txt10',
        },
        {
          header: '그리드컬럼명11',
          width: 150,
          name: 'etc_txt11',
        },
        {
          header: '그리드컬럼명12',
          width: 150,
          name: 'etc_txt12',
        },
        {
          header: '그리드컬럼명13',
          width: 150,
          name: 'etc_txt13',
        },
        {
          header: '그리드컬럼명14',
          width: 150,
          name: 'etc_txt14',
        },
        {
          header: '그리드컬럼명15',
          width: 150,
          name: 'etc_txt15',
        },
        {
          header: '그리드컬럼명16',
          width: 150,
          name: 'etc_txt16',
        },
        {
          header: '그리드컬럼명17',
          width: 150,
          name: 'etc_txt17',
        },
        {
          header: '그리드컬럼명18',
          width: 150,
          name: 'etc_txt18',
        },
        {
          header: '그리드컬럼명19',
          width: 150,
          name: 'etc_txt19',
        },
        {
          header: '그리드컬럼명20',
          width: 150,
          name: 'etc_txt20',
        },
      ],
      columns4: [
        {
          header: '그룹유형코드',
          width: 100,
          name: 'grp_tycd',
        },
        {
          header: '세부유형코드',
          width: 100,
          name: 'dtls_tycd',
        },
        {
          header: '세부유형명',
          width: 150,
          name: 'dtls_tynm',
        },
        {
          header: '정렬',
          width: 100,
          name: 'dtls_tynm',
        },
        {
          header: '사용',
          width: 100,
          name: 'dtls_tynm',
        },
        {
          header: '기타내용1',
          width: 150,
          name: 'etc_txt1',
        },
        {
          header: '기타내용2',
          width: 150,
          name: 'etc_txt2',
        },
        {
          header: '기타내용3',
          width: 150,
          name: 'etc_txt3',
        },
        {
          header: '기타내용4',
          width: 150,
          name: 'etc_txt4',
        },
        {
          header: '기타내용5',
          width: 150,
          name: 'etc_txt5',
        },
        {
          header: '기타내용6',
          width: 150,
          name: 'etc_txt6',
        },
        {
          header: '기타내용7',
          width: 150,
          name: 'etc_txt7',
        },
        {
          header: '기타내용8',
          width: 150,
          name: 'etc_txt8',
        },
        {
          header: '기타내용9',
          width: 150,
          name: 'etc_txt9',
        },
        {
          header: '기타내용10',
          width: 150,
          name: 'etc_txt10',
        },
        {
          header: '기타내용11',
          width: 150,
          name: 'etc_txt11',
        },
        {
          header: '기타내용12',
          width: 150,
          name: 'etc_txt12',
        },
        {
          header: '기타내용13',
          width: 150,
          name: 'etc_txt13',
        },
        {
          header: '기타내용14',
          width: 150,
          name: 'etc_txt14',
        },
        {
          header: '기타내용15',
          width: 150,
          name: 'etc_txt15',
        },
        {
          header: '기타내용16',
          width: 150,
          name: 'etc_txt16',
        },
        {
          header: '기타내용17',
          width: 150,
          name: 'etc_txt17',
        },
        {
          header: '기타내용18',
          width: 150,
          name: 'etc_txt18',
        },
        {
          header: '기타내용19',
          width: 150,
          name: 'etc_txt19',
        },
        {
          header: '기타내용20',
          width: 150,
          name: 'etc_txt20',
        },
      ]
    }
  },
};

</script>
<style>
</style>
