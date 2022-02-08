<template>
  <!-- CONTENTS -->
  <div class="contents">

    <!-- ASIDE -- LNB  -->
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
                <li class="active"><a href="/PJTE2210">{{ menu_list[4].name }}</a></li>
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
        <ul class="filter-con clear-fix">
          <Combo
              :comboArray = "this.comboList"
              @bkup_id_change="bkup_id_change"
              @prjt_nm_chage="prjt_nm_chage"
              @bzcd_change="bzcd_change"
              @sqn_cd_change="sqn_cd_change"
          ></Combo>
          <li class="filter-item">
            <div class="item-con">기준일
              <div class="input-dateWrap"><input type="date" v-model="info.inq_date"></div>
            </div>
          </li>
        </ul>
        <ul class="filter-con clear-fix" :hidden="true">
          <li class="filter-item">
            <div class="item-con">현재일자
              <input type="text" v-model="info.crpe_no" style="width: 100px">
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">진행일자
              <input type="text" v-model="info.crpe_no" style="width: 100px">
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">에러처리일자
              <input type="text" v-model="info.crpe_no" style="width: 100px">
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">진행일수
              <input type="text" v-model="info.crpe_no" style="width: 100px">
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">에러처리일수
              <input type="text" v-model="info.crpe_no" style="width: 100px">
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
        <div class="multiGridWrap">
          <div class="div1">
            <div class="div-header"><h2>업무별 통합테스트현황</h2>
              <ul class="filter-btn">
                <div class="btn btn-filter-e">
                  <a href="#" @click="gridExcelExport">엑셀다운로드</a>
                </div>
              </ul>
            </div>
            <div class="div-grid">
              <grid
                  ref="grid1"
                  :data="dataSource"
                  :header="header1"
                  :columns="columns1"
                  :bodyHeight="bodyHeight"
                  :minRowHeight="minRowHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  @click="onClick"
              ></grid>
            </div>
          </div>
          <div class="div2">
            <div class="div-header"><h2>담당자별 통합테스트현황</h2>
              <ul class="filter-btn">
                <div class="btn btn-filter-e">
                  <a href="#" @click="gridExcelExport">엑셀다운로드</a>
                </div>
              </ul>
            </div>
            <div class="div-grid">
              <grid
                  ref="grid2"
                  :data="dataSource"
                  :header="header2"
                  :columns="columns2"
                  :bodyHeight="bodyHeight"
                  :minRowHeight="minRowHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  @click="onClick"
              ></grid>
            </div>
          </div>
          <div class="div3">
            <div class="div-header"><h2>결함현황</h2>
              <ul class="filter-btn">
                <div class="btn btn-filter-e">
                  <a href="#" @click="gridExcelExport">엑셀다운로드</a>
                </div>
              </ul>
            </div>
            <div class="div-grid">
              <grid
                  ref="grid3"
                  :data="dataSource"
                  :header="header3"
                  :columns="columns3"
                  :bodyHeight="bodyHeight"
                  :minRowHeight="minRowHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  @click="onClick"
              ></grid>
            </div>
          </div>
          <div class="div4">
            <div class="div-header"><h2>통합테스트 및 결함 미진내역</h2>
              <ul class="filter-btn">
                <div class="btn btn-filter-e">
                  <a href="#" @click="gridExcelExport">엑셀다운로드</a>
                </div>
              </ul>
            </div>
            <div class="div-grid">
              <grid
                  ref="grid4"
                  :data="dataSource"
                  :header="header4"
                  :columns="columns4"
                  :bodyHeight="bodyHeight"
                  :minRowHeight="minRowHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
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
import '/node_modules/tui-grid/dist/tui-grid.css';
import Combo from "@/components/Combo"
import {Grid} from '@toast-ui/vue-grid';
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
import {axiosService} from "@/api/http";

//그리드 아이템 예제
var listItem = [{text: "개발", value: "1"}, {text: "운영", value: "2"}, {text: "이관", value: "3"}];
// 업무구분
const bzcd = [
  {"text":" ","value":"NNN"},
  {"text":"관리","value":"EEE"},
  {"text":"공통","value":"DDD"},
  {text: "신용", value: 'AAA'},
  {text: "재무제표", value: "BBB"},
  {text: "신용평가", value: "CCC"},
];

// 차수구분
const sqn_cd = [
  {text: " ", value: "NNN"},
  {text: "1차수", value: "100"},
  {text: "2차수", value: "200"},
  {text: "3차수", value: "300"},
  {text: "4차수", value: "400"},
];

export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    grid: Grid,
  },
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
    console.log("mounted");
    // 최초조회
    this.fnSearch();
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
  },
// 일반적인 함수를 선언하는 부분
  methods: {
    bkup_id_change(params) {this.info.bkup_id_selected = params},
    prjt_nm_chage(params) {this.info.prjt_nm_selected = params},
    bzcd_change(params) {this.info.bzcd_selected = params},
    sqn_cd_change(params) {this.info.sqn_cd_selected = params},

    // 콤보 처음 값 저장
    comboSetData(){
      this.info.bkup_id_selected = this.$children[0].$data.bkup_id_selected;
      this.info.prjt_nm_selected = this.$children[0].$data.prjt_nm_selected;
      this.info.bzcd_selected = this.$children[0].$data.bzcd_selected;
      this.info.sqn_cd_selected = this.$children[0].$data.sqn_cd_selected;
    },
    init() {
      axiosService.get("/PJTE1000/days", {
        params: {
          prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),
          bkup_id_selected: '0000000000',
        }
      }).then(res => {
        this.setDays(res.data.data.contents[0]);
      }).catch(e => {

      });
      // 정렬
      //this.$refs.grid.invoke("sort",);
    },

    setDays(data) {
       this.s_day = data.s_day;
       this.proc_dt = data.proc_dt;
       this.err_proc_dt = data.err_proc_dt;
       this.proc_days = data.proc_days;
       this.err_proc_days = data.err_proc_days;
    },

    onClick(ev) {
      console.log("클릭" + ev.rowKey);
      this.curRow = ev.rowKey;
    },
    fnSearch() {
      this.comboSetData();
      this.info.gubun = "1";
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
      this.info.gubun = "2"
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");
      this.info.gubun = "3"
      this.$refs.grid3.invoke("setRequestParams", this.info);
      this.$refs.grid3.invoke("readData");
      this.info.gubun = "4"
      this.$refs.grid4.invoke("setRequestParams", this.info);
      this.$refs.grid4.invoke("readData");
    },
    gridInit() {
      this.$refs.grid1.invoke("clear");
      this.$refs.grid2.invoke("clear");
      this.$refs.grid3.invoke("clear");
      this.$refs.grid4.invoke("clear");
    },
    gridExcelExport() {
      this.$refs.grid1.invoke("export", "xlsx", {fileName: "엑셀다운로드"});
      this.$refs.grid2.invoke("export", "xlsx", {fileName: "엑셀다운로드"});
      this.$refs.grid3.invoke("export", "xlsx", {fileName: "엑셀다운로드"});
      this.$refs.grid4.invoke("export", "xlsx", {fileName: "엑셀다운로드"});
    },
    open_pjte9001(event) {
      const targetId = event.currentTarget.id;
      this.pop = window.open("../PJTE9001/", targetId, "width=700, height=600");
    },

  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch: {
    count: (a, b) => {
    }
  },
// 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C27","C0","C1","C6"],

      info: {
        inq_date: this.inq_date,         // 기준일자
        sqn_cd : this.sqn_cd,
        /* select 박스 */
        bkup_id_selected: this.bkup_id_selected,      // 프로젝트명
        prjt_nm_selected: this.prjt_nm_selected,      // 프로젝트명
        bzcd_selected: this.bzcd_selected,            // 업무구분
        sqn_cd_selected : this.sqn_cd_selected,       // 차수구분
        gubun : '',
      },

      s_day               : '',
      proc_dt             : '',
      err_proc_dt         : '',
      proc_days           : '',
      err_proc_days       : '',

      addRow : {
        grid1 : this.grid1,
      },
      count: 0,
      curRow: -1,
      title: "",
      scrollX: false,
      scrollY: false,
      bodyHeight: 270,
      rowHeight: 25,
      minRowHeight: 10,
      showDummyRows: true,
      open: false,
      // 메뉴 리스트 (추후 공통 작업 필요)
      menu_list: [
        { id: 'PJTE1000', path: '/PJTE1000', name: 'ProjectEyes현황' },
        { id: 'PJTE2100', path: '/PJTE2100', name: '개발현황' },
        { id: 'PJTE2110', path: '/PJTE2110', name: '개발진척현황' },
        { id: 'PJTE2200', path: '/PJTE2200', name: '통합테스트' },
        { id: 'PJTE2210', path: '/PJTE2210', name: '통합테스트진척현황' },
        { id: 'PJTE3000', path: '/PJTE3000', name: '결함관리' },
        { id: 'PJTE4000', path: '/PJTE4000', name: 'ActionItem및이슈관리현황' },
        { id: 'PJTE5000', path: '/PJTE5000', name: 'WBS관리' },
        { id: 'PJTE6000', path: '/PJTE6000', name: 'PMS신청관리' },
        { id: 'PJTE7000', path: '/PJTE7000', name: '산출물정합성체크' },
        { id: 'PJTE9000', path: '/PJTE9000', name: '시스템관리' },
      ],
      dataSource: {
        api: {readData: {url: process.env.VUE_APP_API + '/PJTE2210/select', method: 'GET'}},
        initialRequest: false,
      },
      columnOptions: { resizable: true },
      header1: {
        height: 45,
        complexColumns: [
          {header: '전체계획및실적(금주포함)',   name: 'mergeColumn1', childNames: ['af_tot_cnt', 'cmpl_cnt', 'af_cmpl_cnt', 'ncmpl_cnt', 'prnr_rt']},
          {header: '금주계획및실적(담당자기준)', name: 'mergeColumn2', childNames: ['tot_cnt1', 'cmpl_cnt1', 'ncmpl_cnt1', 'prnr_rt1']},
          {header: '금주계획및실적(업무PL기준)', name: 'mergeColumn3', childNames: ['pl_tot_cnt', 'pl_cmpl_cnt', 'pl_ncmpl_cnt']},
          {header: '차주계획및실적', name: 'mergeColumn4', childNames: ['cmpl_cnt2', 'tot_cnt2']},
        ]
      },
      columns1: [
        {
          header: '업무구분',
          width: 100,
          align: 'left',
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
          header: '차수',
          width: 55,
          align: 'left',
          name: 'sqn_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: sqn_cd
            }
          }
        },
        {
          header: '전체',
          width: 65,
          align: 'right',
          name: 'tot_cnt',
        },
        {
          header: '전체',
          width: 55,
          align: 'right',
          name: 'af_tot_cnt',
        },
        {
          header: '계획완료',
          width: 60,
          align: 'right',
          name: 'cmpl_cnt',
        },
        {
          header: '선완료',
          width: 55,
          align: 'right',
          name: 'af_cmpl_cnt',
        },
        {
          header: '미완료',
          width: 55,
          align: 'right',
          name: 'ncmpl_cnt',
        },
        {
          header: '진척율',
          width: 55,
          align: 'right',
          name: 'prnr_rt',
        },
        {
          header: '전체',
          width: 55,
          align: 'right',
          name: 'tot_cnt1',
        },
        {
          header: '완료',
          width: 55,
          align: 'right',
          name: 'cmpl_cnt1',
        },
        {
          header: '미완료',
          width: 55,
          align: 'right',
          name: 'ncmpl_cnt1',
        },
        {
          header: '진척율',
          width: 55,
          align: 'right',
          name: 'prnr_rt1',
        },
        {
          header: '전체',
          width: 60,
          align: 'right',
          name: 'pl_tot_cnt',
        },
        {
          header: '완료',
          width: 60,
          align: 'right',
          name: 'pl_cmpl_cnt',
        },
        {
          header: '미완료',
          width: 60,
          align: 'right',
          name: 'pl_ncmpl_cnt',
        },
        {
          header: '계획',
          width: 55,
          align: 'right',
          name: 'tot_cnt1',
        },
        {
          header: '완료',
          width: 55,
          align: 'right',
          name: 'cmpl_cnt2',
        },
      ],
      header2: {
        height: 45,
        complexColumns: [
          {header: '전체계획및실적(금주포함)', name: 'mergeColumn1', childNames: ['tot_cnt1', 'cmpl_cnt1', 'ncmpl_cnt1', 'prnr_rt1']},
          {header: '금주계획및실적', name: 'mergeColumn3', childNames: ['pl_tot_cnt', 'pl_cmpl_cnt', 'pl_ncmpl_cnt', 'prnr_rt2']},
          {header: '차주계획및실적', name: 'mergeColumn4', childNames: ['pl_prnr_rt', 'tot_cnt2']},
        ]
      },
      columns2: [
        {
          header: '업무구분',
          width: 100,
          align: 'left',
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
          header: '차수',
          width: 55,
          align: 'left',
          name: 'sqn_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: sqn_cd
            }
          }
        },
        {
          header: '담당자',
          width: 55,
          align: 'left',
          name: 'emp_nm',
        },
        {
          header: '전체',
          width: 55,
          align: 'left',
          name: 'tot_cnt1',
        },
        {
          header: '완료',
          width: 55,
          align: 'left',
          name: 'cmpl_cnt1',
        },
        {
          header: '미완료',
          width: 55,
          align: 'left',
          name: 'ncmpl_cnt1',
        },
        {
          header: '진척율',
          width: 55,
          align: 'left',
          name: 'prnr_rt1',
        },
        {
          header: '전체',
          width: 55,
          align: 'left',
          name: 'pl_tot_cnt',
        },
        {
          header: '완료',
          width: 55,
          align: 'left',
          name: 'pl_cmpl_cnt',
        },
        {
          header: '미완료',
          width: 55,
          align: 'left',
          name: 'pl_ncmpl_cnt',
        },
        {
          header: '진척율',
          width: 55,
          align: 'left',
          name: 'prnr_rt2',
        },
        {
          header: '계획',
          width: 55,
          align: 'left',
          name: 'pl_prnr_rt',
        },
        {
          header: '완료',
          width: 55,
          align: 'left',
          name: 'tot_cnt2',
        },
      ],
      header3: {
        height: 45,
        complexColumns: [
          {
            header: '결함유형',
            name: 'mergeColumn1',
            childNames: ['err_cnt', 'impt_cnt', 'etc_err_cnt', 'nerr_cnt']
          },
          {
            header: '조치현황',
            name: 'mergeColumn3',
            childNames: ['spnd_cnt', 'cmpl_cnt', 'ncmpl_cnt']
          },
        ]
      },
      columns3: [
        {
          header: '업무구분',
          width: 100,
          align: 'left',
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
          header: '차수',
          width: 55,
          align: 'left',
          name: 'sqn_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: sqn_cd
            }
          }
        },
        {
          header: '전체',
          width: 65,
          align: 'right',
          name: 'tot_err_cnt',
        },
        {
          header: '결함',
          width: 65,
          align: 'right',
          name: 'err_cnt',
        },
        {
          header: '개선',
          width: 65,
          align: 'right',
          name: 'impt_cnt',
        },
        {
          header: '기타',
          width: 65,
          align: 'right',
          name: 'etc_err_cnt',
        },
        {
          header: '결함아님',
          width: 65,
          align: 'right',
          name: 'nerr_cnt',
        },
        {
          header: '완료',
          width: 65,
          align: 'right',
          name: 'cmpl_cnt',
        },
        {
          header: '진행',
          width: 65,
          align: 'right',
          name: 'ncmpl_cnt',
        },
        {
          header: '보류',
          width: 65,
          align: 'right',
          name: 'spnd_cnt',
        },
      ],
      header4: {
        height: 45,
        complexColumns: [
          {
            header: '완료여부',
            name: 'mergeColumn1',
            childNames: ['pl_yn', 'crpe_yn']
          },
        ]
      },
      columns4: [
        {
          header: '업무구분',
          width: 100,
          align: 'left',
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
          header: '차수',
          width: 55,
          align: 'left',
          name: 'sqn_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: sqn_cd
            }
          }
        },
        {
          header: '미진구분',
          width: 90,
          align: 'left',
          name: 'nprrn_kbn',
        },
        {
          header: '테스트케이스 ID',
          width: 110,
          align: 'center',
          name: 'tst_case_id',
        },
        {
          header: '테스트케이스명',
          width: 280,
          align: 'left',
          name: 'tst_case_nm',
        },
        {
          header: '예정종료일자',
          width: 90,
          align: 'center',
          name: 'frcs_end_dt',
        },
        {
          header: '개발완료일자조치일자',
          width: 150,
          align: 'center',
          name: 'dvlpe_cnf_dt',
        },
        {
          header: '담당자',
          width: 70,
          align: 'center',
          name: 'dvlpe_nm',
        },
        {
          header: 'PL',
          width: 70,
          align: 'center',
          name: 'pl_nm',
        },
        {
          header: '담당자',
          width: 70,
          align: 'center',
          name: 'crpe_yn',
        },
        {
          header: 'PL',
          width: 70,
          align: 'center',
          name: 'pl_yn',
        },
        {
          header: '미진사유',
          width: 240,
          align: 'left',
          name: 'nprrn',
        },
      ],
    }
  },
};

</script>
<style>
</style>
