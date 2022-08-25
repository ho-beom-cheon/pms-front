<template>
  <!-- CONTENTS -->
  <div class="contents">

    <!-- ASIDE -- LNB  -->
    <PmsSideBar></PmsSideBar>
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
              @setDays="setDays"
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
              <input type="text" id="s_day" v-model="info.s_day" style="width: 100px">
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">진행일자
              <input type="text" id="proc_dt" v-model="info.proc_dt" style="width: 100px">
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">에러처리일자
              <input type="text" id="err_proc_dt" v-model="info.err_proc_dt" style="width: 100px">
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">진행일수
              <input type="text" id="proc_days" v-model="info.proc_days" style="width: 100px">
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">에러처리일수
              <input type="text" id="err_proc_days" v-model="info.err_proc_days" style="width: 100px">
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
            <div class="div-header"><h2>업무별 개발현황</h2>
              <ul class="filter-btn">
                <div class="btn btn-filter-e">
                  <a href="#" @click="gridExcelExport1">엑셀다운로드</a>
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
            <div class="div-header"><h2>담당자별 개발현황</h2>
              <ul class="filter-btn">
                <div class="btn btn-filter-e">
                  <a href="#" @click="gridExcelExport2">엑셀다운로드</a>
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
                  <a href="#" @click="gridExcelExport3">엑셀다운로드</a>
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
            <div class="div-header"><h2>개발 및 결함 미진내역</h2>
              <ul class="filter-btn">
                <div class="btn btn-filter-e">
                  <a href="#" @click="gridExcelExport4">엑셀다운로드</a>
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
import PmsSideBar from  "@/components/PmsSideBar";

// 현재 날짜
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let dateString = year + '-' + month  + '-' + day;

export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    PmsSideBar,
    grid: Grid,
  },
  mounted() {
    this.init();
    // 최초조회
    this.fnSearch();
  },
// 일반적인 함수를 선언하는 부분
  methods: {
    bkup_id_change(params) {this.info.bkup_id_selected = params},
    prjt_nm_chage(params) {this.info.prjt_nm_selected = params},
    bzcd_change(params) {this.info.bzcd_selected = params},

    setDays(data) {
      this.info.s_day = data.s_day;
      this.info.proc_dt = data.proc_dt;
      this.info.err_proc_dt = data.err_proc_dt;
      this.info.proc_days = data.proc_days;
      this.info.err_proc_days = data.err_proc_days;
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
    },
    onClick(ev) {
      console.log("클릭" + ev.rowKey);
      this.curRow = ev.rowKey;
    },

    fnSearch() {
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
    gridExcelExport1() {this.$refs.grid1.invoke("export", "xlsx", {fileName: "개발업무별진척현황_"+dateString, useFormattedValue : true} );},
    gridExcelExport2() {this.$refs.grid2.invoke("export", "xlsx", {fileName: "개발담당자별진척현황_"+dateString, useFormattedValue : true} );},
    gridExcelExport3() {this.$refs.grid3.invoke("export", "xlsx", {fileName: "개발결함현황_"+dateString, useFormattedValue : true} );},
    gridExcelExport4() {this.$refs.grid4.invoke("export", "xlsx", {fileName: "개발및결함미진내역_"+dateString, useFormattedValue : true} );},

    open_pjte9001(event) {
      const targetId = event.currentTarget.id;
      this.pop = window.open("../PJTE9001/", targetId, "width=700, height=600");
    },

  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch: {
    proc_dt(){

    }
  },
// 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C27","C0","C1"],

      info: {
        crpe_no: this.crpe_no,             // 담당자 사번
        inq_date: dateString,         // 기준일자
        /* select 박스 */
        bkup_id_selected: "0000000000",      // 프로젝트명
        prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),      // 프로젝트명
        bzcd_selected: sessionStorage.getItem("LOGIN_AUT_CD") === '300' || sessionStorage.getItem("LOGIN_AUT_CD") === '400' ||
                       sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600' ||
                       sessionStorage.getItem("LOGIN_AUT_CD") === '900' ? 'TTT':sessionStorage.getItem("LOGIN_BZCD"),       // 업무구분
        gubun : '',
        s_day               : '',
        proc_dt             : '',
        err_proc_dt         : '',
        proc_days           : '',
        err_proc_days       : '',
      },

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
      showDummyRows: false,
      open: false,
      dataSource: {
        api: {readData: {url: process.env.VUE_APP_API + '/PJTE2110/select', method: 'GET'}},
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
          align: 'center',
          name: 'bzcd',
          disabled: true,
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000001N
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
          name: 'tot_cnt2',
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
          {header: '전체계획및실적(금주포함)', name: 'mergeColumn1', childNames: ['tot_cnt', 'cmpl_cnt', 'ncmpl_cnt', 'prnr_rt']},
          {header: '금주계획및실적(담당자기준)', name: 'mergeColumn3', childNames: ['tot_cnt1', 'cmpl_cnt1', 'ncmpl_cnt1', 'prnr_rt1']},
          {header: '차주계획및실적', name: 'mergeColumn4', childNames: ['pl_prnr_rt', 'tot_cnt2']},
        ]
      },
      columns2: [
        {
          header: '업무구분',
          width: 100,
          align: 'center',
          name: 'bzcd',
          disabled: true,
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000001N
            }
          }
        },
        {
          header: '담당자',
          width: 70,
          align: 'left',
          name: 'emp_nm',
          filter: 'text',
        },
        {
          header: '전체',
          width: 55,
          align: 'right',
          name: 'tot_cnt',
          defaultValue:0,
        },
        {
          header: '완료',
          width: 55,
          align: 'right',
          name: 'cmpl_cnt',
          defaultValue:0,
        },
        {
          header: '미완료',
          width: 55,
          align: 'right',
          name: 'ncmpl_cnt',
          defaultValue:0,
        },
        {
          header: '진척율',
          width: 55,
          align: 'right',
          name: 'prnr_rt',
          defaultValue:0,
        },
        {
          header: '전체',
          width: 55,
          align: 'right',
          name: 'tot_cnt1',
          defaultValue:0,
        },
        {
          header: '완료',
          width: 55,
          align: 'right',
          name: 'cmpl_cnt1',
          defaultValue:0,
        },
        {
          header: '미완료',
          width: 55,
          align: 'right',
          name: 'ncmpl_cnt1',
          defaultValue:0,
        },
        {
          header: '진척율',
          width: 55,
          align: 'right',
          name: 'prnr_rt1',
          defaultValue:0,
        },
        {
          header: '계획',
          width: 55,
          align: 'right',
          name: 'pl_prnr_rt',
          defaultValue:0,
        },
        {
          header: '완료',
          width: 55,
          align: 'right',
          name: 'tot_cnt2',
          defaultValue:0,
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
          align: 'center',
          name: 'bzcd',
          type:'text',
          disabled: true,
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000001N
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
          {header: '완료여부', name: 'mergeColumn1', childNames: ['pl_yn', 'crpe_yn']},
          {header: '개발완료일/', name: 'mergeColumn2', childNames: ['dvlpe_cnf_dt']},
        ]
      },
      columns4: [
        {
          header: '업무구분',
          width: 100,
          align: 'center',
          name: 'bzcd',
          disabled: true,
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000001N
            }
          }
        },
        {
          header: '미진구분',
          width: 90,
          align: 'left',
          name: 'nprrn_kbn',
          filter: 'select',
        },
        {
          header: '프로그램ID',
          width: 140,
          align: 'left',
          name: 'pgm_id',
          filter: 'text',
        },
        {
          header: '프로그램명',
          width: 250,
          align: 'left',
          name: 'pgm_nm',
          filter: 'text',
        },
        {
          header: '예정종료일',
          width: 90,
          align: 'center',
          name: 'frcs_end_dt',
          filter: 'text',
        },
        {
          header: '조치일',
          width: 90,
          align: 'center',
          name: 'dvlpe_cnf_dt',
          filter: 'text',
        },
        {
          header: '담당자',
          width: 70,
          align: 'center',
          name: 'dvlpe_nm',
          filter: 'text',
        },
        {
          header: 'PL',
          width: 70,
          align: 'center',
          name: 'pl_nm',
          filter: 'text',
        },
        {
          header: '담당자',
          width: 50,
          align: 'center',
          name: 'crpe_yn',
        },
        {
          header: 'PL',
          width: 50,
          align: 'left',
          name: 'pl_yn',
        },
        {
          header: '미진사유',
          width: 210,
          align: 'left',
          name: 'nprrn',
          filter: 'text',
        },
      ],
    }
  },
};

</script>
<style>
</style>
