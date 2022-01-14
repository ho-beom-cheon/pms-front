<template>
  <!-- CONTENTS -->
  <div class="contents">
    <input type="hidden" name="updatedRows" v-model="updatedRows" id="updatedRows">
    <input type="hidden" name="deletedRows" v-model="deletedRows" id="deletedRows">
    <input type="hidden" name="createdRows" v-model="createdRows" id="createdRows">
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
                <li class="active"><a href="/PJTE2200">{{ menu_list[3].name }}</a></li>
                <li><a href="/PJTE2210">{{ menu_list[4].name }}</a></li>
                <li><a href="/PJTE3000">{{ menu_list[5].name }}</a></li>
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
            <li class="filter-item">
              <div class="item-con">프로젝트명
                <select
                    v-model="info.prjt_nm_selected"
                    style="width: 165px"
                >
                  <option
                      v-for="(prjt_nm, idx) in info.prjt_nm"
                      :key="idx"
                      v-text="prjt_nm.text"
                      :value="prjt_nm.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">업무구분
                <select
                    v-model="info.bzcd_selected"
                    style="width: 145px"
                >
                  <option
                      v-for="(bzcd, idx) in info.bzcd"
                      :key="idx"
                      v-text="bzcd.text"
                      :value="bzcd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">차수
                <select
                    v-model="info.sqn_cd_selected"
                    style="width: 120px"
                >
                  <option
                      v-for="(sqn_cd, idx) in info.sqn_cd"
                      :key="idx"
                      v-text="sqn_cd.text"
                      :value="sqn_cd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">시나리오ID
                <input type="text"
                       placeholder="입력"
                       v-model="info.scnr_id"
                       id="info.scnr_id"
                       @keyup.enter="fnSearch"
                       style="width: 90px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">테스트케이스ID
                <input type="text"
                       placeholder="입력"
                       v-model="info.tst_case_id"
                       id="info.tst_case_id"
                       @keyup.enter="fnSearch"
                       style="width: 153px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">처리단계
                <select
                    v-model="info.itg_tst_prc_cd_selected"
                    style="width: 80px"
                >
                  <option
                      v-for="(itg_tst_prc_cd, idx) in info.itg_tst_prc_cd"
                      :key="idx"
                      v-text="itg_tst_prc_cd.text"
                      :value="itg_tst_prc_cd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="input-searchWrap">개발자명
                <input type="text"
                       placeholder="입력"
                       id="id.dvlpe_eno"
                       name="info.dvlpe_eno"
                       v-model="info.dvlpe_eno"
                       @keyup.enter="fnSearch"
                       style="width: 140px"
                >
                <button class="search-btn"
                        @click="open_pjte9001"
                ></button>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">담당PL명
                <input type="text"
                       placeholder="입력"
                       v-model="info.pl_eno"
                       @keyup.enter="fnSearch"
                       style="width: 145px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">예상종료일자
                <div class="input-dateWrap"><input type="date" :max="info.frcs_end_dt02" v-model="info.frcs_end_dt01"></div>
                -
                <div class="input-dateWrap"><input type="date" :min="info.frcs_end_dt01" v-model="info.frcs_end_dt02"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">개발자확인일자
                <div class="input-dateWrap"><input type="date" :max="info.dvlpe_cnf_dt02" v-model="info.dvlpe_cnf_dt01"></div>
                -
                <div class="input-dateWrap"><input type="date" :max="info.dvlpe_cnf_dt01" v-model="info.dvlpe_cnf_dt02"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">담당현업명
                <input type="text"
                       placeholder="입력"
                       v-model="info.crpe_eno"
                       @keyup.enter="fnSearch"
                       style="width: 140px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">유형
                <select
                    v-model="info.tp_selected"
                    style="width: 145px"
                >
                  <option
                      v-for="(tp, idx) in info.tp"
                      :key="idx"
                      v-text="tp.text"
                      :value="tp.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">요구사항ID
                <input type="text"
                       placeholder="입력"
                       v-model="info.rqu_sbh_id"
                       id="info.rqu_sbh_id"
                       @keyup.enter="fnSearch"
                       style="width: 153px"
                >
              </div>
            </li>

            <li class="filter-item">
              <div class="item-con">
                <input type="checkbox" id="check_Yn" v-model="info.check_Yn">
                <label>　삭제통합테스트 포함</label>
              </div>
            </li>
          </ul>
          <ul class="filter-btn">
            <!--            <div class="btn btn-filter-b">-->
            <!--              <a href="#" @click="gridAddRow">행추가(임시)</a>-->
            <!--            </div>-->
            <div class="btn btn-filter-b">
              <a href="#" @click="open_page">기타항목수정</a>
            </div>
            <div class="btn btn-filter-d">
              <a href="#" @click="gridExcelExport">TC증빙 일괄다운로드ⓘ</a>
            </div>
            <div class="btn btn-filter-d">
              <a href="#" @click="gridExcelExport">양식다운로드ⓘ</a>
            </div>
            <div class="btn btn-filter-e">
              <a href="#" @click="gridExcelExport">엑셀업로드</a>
            </div>
            <div class="btn btn-filter-e">
              <a href="#" @click="gridExcelExport">엑셀다운로드</a>
            </div>
            <div class="btn btn-filter-p" style="margin-left: 20px">
              <a href="#" @click="fnSave">저장</a>
            </div>
            <div class="btn btn-filter-p">
              <a href="#" @click="fnSearch">조회</a>
            </div>
          </ul>
        </div>
      </section>

      <!-- page contents -->
      <section class="page-contents">
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
import WindowPopup from "./PJTE3001.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용

// 그리드 내  커스텀 이미지 버튼을 만들기 위한 클래스 생성
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
    // 결함등록 버튼 img
    this.el.src = '/img/ic_logOut.8c60a751.svg';
  }
};

//그리드 아이템 예제
var listItem = [{text: "개발", value: "1"}, {text: "운영", value: "2"}, {text: "이관", value: "3"}];
var prjt_nm = [{text: "PMS프로젝트", value: "1"}, {text: "PMS프로젝트2", value: "2"}, {text: "PMS프로젝트3", value: "3"}];

// 업무구분
const bzcd = [
  {text: "전체", value: '999'},
  {text: "신용", value: 'AAA'},
  {text: "재무제표", value: "BBB"},
  {text: "신용평가", value: "CCC"},
];
// 차수구분
const sqn_cd = [
  {text: "전체", value: "999"},
  {text: "신규", value: "100"},
  {text: "변경", value: "200"},
  {text: "이행", value: "300"},
  {text: "삭제", value: "400"}
];
// 통합테스트처리코드 (처리단계)
const itg_tst_prc_cd = [
  {text: "전체", value: "999"},
  {text: "테스트전", value: "000"},
  {text: "테스트시작", value: "100"},
  {text: "테스트자완료", value: "200"},
  {text: "PL확인", value: "300"},
  {text: "담당자확인", value: "400"}
];
// 유형
const tp = [
  {text: "전체", value: "999"},
  {text: "화면", value: "100"},
  {text: "프로그램", value: "200"},
  {text: "보고서", value: "300"},
  {text: "배치", value: "400"}
];


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
    // 권한에 따른 컬럼 세팅

    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
    this.fnSearch();    // 최초조회
    this.setColumns();  // 권한에 따른 컬럼 세팅
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
    setColumns() {    // 권한에 따른 컬럼 세팅
      if (sessionStorage.getItem("aut_cd") == '100') {
        this.$refs.grid.invoke("disableColumn", 'frcs_end_dt');
      } else if (sessionStorage.getItem("aut_cd") == '500') {
        this.$refs.grid.invoke("disableColumn", 'frcs_sta_dt');
      } else {
        this.$refs.grid.invoke("disableColumn", 'frcs_sta_dt');
      }
    },
    change() {
      console.log();
    },
    fnSave() {
      // 데이터 로그 확인
      console.log("updatedRows ::", this.$refs.grid.invoke("getModifiedRows").updatedRows);
      console.log("createdRows ::", this.$refs.grid.invoke("getModifiedRows").createdRows);
      console.log("deletedRows ::", this.$refs.grid.invoke("getModifiedRows").deletedRows);
      // 변경 데이터 저장
      this.updatedRows = this.$refs.grid.invoke("getModifiedRows").updatedRows;
      this.deletedRows = this.$refs.grid.invoke("getModifiedRows").deletedRows;
      this.createdRows = this.$refs.grid.invoke("getModifiedRows").createdRows;

      if (this.createdRows.length !== 0) {
        // 데이터 파라메타 전달
        this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.createdRows));
        // create api 요청
        this.$refs.grid.invoke("request", "createData", {showConfirm: false});
      }
      if (this.updatedRows.length !== 0) {
        // 데이터 파라메타 전달
        this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.updatedRows));
        // update api 요청
        this.$refs.grid.invoke("request", "updateData", {showConfirm: false});
      }
      if (this.deletedRows.length !== 0) {
        // 데이터 파라메타 전달
        this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.deletedRows));
        // delete api 요청
        this.$refs.grid.invoke("request", "deleteData", {showConfirm: false});
      }
      // this.$refs.grid.invoke("disableRow", this.curRow, {withCheckbox: true});  // 행 단위 disable
      // this.$refs.grid.invoke("disableCell", this.curRow, 'dvlp_dis_cd');  // 셀 단위 disable
    },
    onClick(ev) {
      this.curRow = ev.rowKey;
      this.$refs.grid.invoke("getRow", this.curRow);
      // 결함등록 Column 클릭 시 결함등록팝업 호출
      if(ev.columnName == 'btn_popup') {
        this.pop = window.open("../PJTE3001/", "open_page", "width=1000, height=800");
      }
    },
    dblonClick(ev) {  // 그리드 셀 더블클릭 시 선택버튼 클릭
      this.curRow = ev.rowKey;
      if(ev.columnName == 'tst_case_nm') {
        this.pop = window.open("../PJTE3001/", "open_page", "width=1000, height=800");
      }
    },
    // gridfocusChange(ev) {
    //   this.$refs.grid.invoke("click", {rowkey:this.curRow}, {columnName: 'btn_popup'});
    //   this.pop = window.open("../SWZP0041/", "open_page", "width=1000, height=800");
    // },
    fnSearch() {
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    gridInit() {
      this.$refs.grid.invoke("clear");
    },
    gridAddRow() {
      this.$refs.grid.invoke("appendRow",
          {
            pgm_id: sessionStorage.getItem("pgm_id"),
            bzcd: sessionStorage.getItem("bzcd"),
            prjt_id: sessionStorage.getItem("prjt_id"),
            bkup_id: "00000000",
          },
          {focus: true});
      this.fnEnable();
    },
    fnEnable() {
      // 새로 ADD한 Row를 enable시킴
      this.NewRow = this.$refs.grid.invoke("getRowCount");
      this.$refs.grid.invoke("enableRow", this.NewRow-1, {withCheckbox: true});
    },
    gridDelRow() {
      this.$refs.grid.invoke("removeCheckedRows", this.curRow, {showConfirm: false});
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
      this.$refs.grid.invoke("import", "xlsx", {fileName: "엑셀업로드"});
    },
    open_page() {
      this.pop = window.open("../PJTE3001/", "open_page", "width=1000, height=800");
    },
    open_pjte9001() {
      this.pop = window.open("../PJTE9001/", "open_page", "width=700, height=600");
    },
  },
  // 특정 데이터에 실행되는 함수를 선언하는 부분
  // newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch: {
    count: (a, b) => {
      console.log("count의 값이 변경되면 여기도 실행");
      console.log("new Value :: " + a);
      console.log("old Value :: " + b);
    }
  },
  // 변수 선언부분
  data() {
    return {
      info: {
        /* 필터 변수 */
        prjt_nm: prjt_nm,             // 프로젝트명
        bzcd: bzcd,                   // 업무구분
        sqn_cd: sqn_cd,               // 차수구분
        itg_tst_prc_cd: itg_tst_prc_cd,     // 처리단계
        tp: tp,                       //유형

        prjt_nm_selected: prjt_nm[0].value,             // 선택 된 프로젝트명
        bzcd_selected: bzcd[0].value,                   // 선택 된 업무구분
        sqn_cd_selected: sqn_cd[0].value,               // 선택 된 차수구분
        itg_tst_prc_cd_selected: itg_tst_prc_cd[0].value,     // 선택 된 처리단계
        tp_selected: tp[0].value,                       // 선택 된 유형

        scnr_id  : this.scnr_id,         // 시나리오ID
        tst_case_id  : this.tst_case_id, // 테스트케이스ID
        dvlpe_eno: this.dvlpe_eno,       // 개발자명
        pl_eno: this.pl_eno,             // 담당PL명
        crpe_eno: this.crpe_eno,         // 담당현업명
        rqu_sbh_id: this.rqu_sbh_id,     // 요구사항ID

        frcs_end_dt01: '',        // 예상종료일자 (시작)
        frcs_end_dt02: '',        // 예상종료일자 (종료)
        dvlpe_cnf_dt01: '',      // 개발자확인일자 (시작)
        dvlpe_cnf_dt02: '',      // 개발자확인일자 (종료)

      },
      updatedRows: this.updatedRows,
      deletedRows: this.deletedRows,
      createdRows: this.createdRows,

      addRow: {
        grid: this.grid,
      },

      frcs_sta_dt: '',    // 예상시작일자
      frcs_end_dt: '',    // 예상종료일자
      sta_dt: '',         // 실제시작일자
      end_dt: '',         // 실제종료일자

      check_Yn: false,    // 삭제프로그램/소스취약점포함

      count: 0,
      curRow: -1,
      title: "",
      scrollX: false,
      scrollY: false,
      bodyHeight: 610,
      rowHeight: 25,
      minRowHeight: 10,
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
          readData   : { url: process.env.VUE_APP_API + '/PJTE2200/select', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE2200/create', method: 'POST'},
          updateData : { url: process.env.VUE_APP_API + '/PJTE2200/update', method: 'PUT'},
          deleteData : { url: process.env.VUE_APP_API + '/PJTE2200/delete', method: 'PUT'},
        },
        initialRequest: false,
        contentType: 'application/json;',
        headers: {'x-custom-header': 'custom-header'},
        withCredentials: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders: ['checkbox', 'rowNum'],
      header: {
        height: 45,
        complexColumns: [
          {
            header: '결함건수',
            name: 'mergeColumn1',
            childNames: ['col19', 'col20', 'col21']
          },
        ]
      },
      columns: [
        {
          header: '업무구분',
          width: 150,
          align: 'center',
          name: 'bzcd',
          editor: 'text'
        },
        {
          header: '차수',
          width: 70,
          align: 'center',
          name: 'sqn_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: sqn_cd
            }
          }
        },
        {
          header: '시나리오ID',
          width: 100,
          align: 'center',
          name: 'scnr_id',
          editor: 'text'
        },
        {
          header: '시나리오명',
          width: 200,
          align: 'left',
          name: 'scnr_nm',
          editor: 'text'
        },
        {
          header: '완료여부',
          width: 70,
          align: 'center',
          name: 'itg_tst_prc_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: itg_tst_prc_cd
            }
          }
        },
        {
          header: '테스트케이스ID',
          width: 130,
          align: 'center',
          name: 'tst_case_id',
          editor: 'text',
          sortable: 'true'
        },
        {
          header: '테스트케이스명',
          width: 200,
          align: 'left',
          name: 'tst_case_nm',
        },
        {
          header: '처리단계',
          width: 130,
          align: 'center',
          name: 'itg_tst_prc_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: itg_tst_prc_cd
            }
          }
        },
        {
          header: '예상시작일',
          width: 110,
          align: 'center',
          name: 'frcs_sta_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'

        },
        {
          header: '예상종료일',
          width: 110,
          align: 'center',
          type: 'date',
          name: 'frcs_end_dt',
          editor: 'datePicker'
        },
        {
          header: '개발자확인일자',
          width: 110,
          align: 'center',
          name: 'dvlpe_cnf_dt',
          editor: 'datePicker'
        },
        {
          header: 'PL확인일자',
          width: 110,
          align: 'center',
          name: 'pl_cnf_dt',
          editor: 'datePicker'
        },
        {
          header: '개발자',
          width: 100,
          align: 'center',
          name: 'dvlpe_eno',

        },
        {
          header: '담당PL',
          width: 100,
          align: 'center',
          name: 'pl_eno',

        },
        {
          header: '담당현업',
          width: 100,
          align: 'center',
          name: 'crpe_eno',

        },
        {
          header: '통합테스트증빙첨부',
          width: 150,
          align: 'center',
          name: 'atfl_mng_id',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: listItem
            }
          }
        },
        {
          header: '총건수',
          width: 80,
          align: 'right',
          name: 'col19',

        },
        {
          header: '완료',
          width: 80,
          align: 'center',
          name: 'col20',

        },
        {
          header: '미완료',
          width: 80,
          align: 'center',
          name: 'col21',

        },
        {
          header: '결함등록',
          width: 120,
          name: 'btn_popup',
          align: 'center',
          renderer: CustomRenderer,
        },
        {
          header: '미진사유',
          width: 400,
          name: 'col24',
        },
        {
          header: '프로그램ID',
          width: 200,
          name: 'pgm_id',
        },
        {
          header: '화면ID',
          width: 140,
          name: 'scrn_id'
        },
        {
          header: '거래코드',
          width: 90,
          name: 'trn_cd'
        },
        {
          header: '요구사항ID',
          width: 150,
          name: 'rqu_sbh_id'
        },
        {
          header: '사전조건',
          width: 90,
          name: 'prr_cnd'
        },
        {
          header: '일자',
          width: 90,
          name: 'col30'
        },
        {
          header: '점검시간',
          width: 90,
          name: 'col31'
        },
        {
          header: '담당자',
          width: 90,
          name: 'crpe_eno'
        },
        {
          header: '이행진행구분',
          width: 150,
          name: 'col33',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: listItem
            }
          }
        },
      ],
    }
  },
};

</script>
<style>
</style>
