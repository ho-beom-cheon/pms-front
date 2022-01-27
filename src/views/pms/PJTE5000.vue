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
                <li><a href="/PJTE3000">{{ menu_list[5].name }}</a></li>
                <li><a href="/PJTE4000">{{ menu_list[6].name }}</a></li>
                <li class="active"><a href="/PJTE5000">{{ menu_list[7].name }}</a></li>
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
                @mng_cd_change="mng_cd_change"
                @wbs_prc_sts_cd_change="wbs_prc_sts_cd_change"
                @wbs_mng_cd_change="wbs_mng_cd_change"
            ></combo>

            <li class="filter-item">
              <div class="item-con">Task명
                <input type="text"
                       placeholder="입력"
                       v-model="info.task_nm"
                       style="width: 250px"
                >
              </div>
            </li>
            <li class="filter-item-n">
                          <div class="input-searchWrap">담당자명
                            <input type="text"
                                   id="id.crpe_nm"
                                   placeholder="입력"
                                   v-model="info.crpe_nm"
                                   style="width: 90px"
                            >
                            <button class="search-btn"
                                    id="btn.crpe"
                                    @click="open_pjte9001"
                            ></button>
                          </div>
                        </li>
                        <li class="filter-item">
                        <input type="text"
                               placeholder="직원번호"
                               id="id.crpe_no"
                               v-model="info.crpe_no"
                               style="width: 70px; background-color: #f2f2f2;"
                               :disabled = true
                            >
                        </li>
            <li class="filter-item">
              <div class="item-con">계획종료일자
                <div class="input-dateWrap"><input type="date" :max="info.pln_end_dt" v-model="info.pln_sta_dt"></div>
                -
                <div class="input-dateWrap"><input type="date" :min="info.pln_sta_dt" v-model="info.pln_end_dt"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">실제종료일자
                <div class="input-dateWrap"><input type="date" :max="info.acl_end_dt" v-model="info.acl_sta_dt"></div>
                -
                <div class="input-dateWrap"><input type="date" :max="info.acl_sta_dt" v-model="info.acl_end_dt"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">
                <input type="checkbox" id="check_Yn" v-model="info.check_Yn">
                <label>　이행시나리오</label>
              </div>
            </li>
          </ul>
          <ul class="filter-btn">
              <button class="btn btn-filter-p" @click="gridExcelExport" :disabled="validated">진행률계산</button>
              <button class="btn btn-filter-e" @click="gridExcelExport" :disabled="validated" style="margin-left: 20px"> 엑셀업로드</button>
              <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
              <button class="btn btn-filter-b" @click="gridAddRow" :disabled="validated" style="margin-left: 20px">+ 행위로</button>
              <button class="btn btn-filter-b" @click="gridDelRow" :disabled="validated">- 행아래</button>
              <button class="btn btn-filter-b" href="#" @click="gridAddRow" :disabled="validated">행추가</button>
              <button class="btn btn-filter-b" @click="gridDelRow" :disabled="validated">행삭제</button>
              <button class="btn btn-filter-p" @click="fnSave" :disabled="false" style="margin-left: 20px">저장</button>
              <button class="btn btn-filter-p" @click="fnSearch">조회</button>
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
import Combo from "@/components/Combo"
import 'tui-date-picker/dist/tui-date-picker.css';
import axios from "axios";
import {axiosService} from "@/api/http"; // Date-picker 스타일적용

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
    // 결함등록 버튼 img
    this.el.src = '/img/ic_logOut.8c60a751.svg';
  }
}

//그리드 아이템 예제 
var listItem = [{text: "개발", value: "1"}, {text: "운영", value: "2"}, {text: "이관", value: "3"}];

// 레벨구분
const level = [
  {text: "1레벨", value: '100'},
  {text: "2레벨", value: '200'},
  {text: "3레벨", value: "300"},
  {text: "4레벨", value: "400"},
  {text: "5레벨", value: "500"},
];
// 업무구분 
const bzcd = [
  {text: " ", value: 'NNN'},
  {text: "신용", value: 'AAA'},
  {text: "재무제표", value: "BBB"},
  {text: "신용평가", value: "CCC"},
];
// 관리구분
const mng_cd = [
  {text: " ", value: "NNN"},
  {text: "신규", value: "100"},
  {text: "변경", value: "200"},
  {text: "이행", value: "300"},
  {text: "삭제", value: "400"}
];
// 프로그램구분 
const pgm_dis_cd = [
  {text: " ", value: "NNN"},
  {text: "화면", value: "100"},
  {text: "프로그램", value: "200"},
  {text: "보고서", value: "300"},
  {text: "배치", value: "400"}
];
// 프로그램 세부 구분 
const wbs_prc_sts_cd = [
  {text: " ", value: 'NNN'},
  {text: "WBS관리", value: "100"},
  {text: "이행관리", value: "200"},
];
// 처리단계 
const prc_step_cd = [
  {text: " ", value: "NNN"},
  {text: "대기", value: "100"},
  {text: "진행중", value: "200"},
  {text: "완료", value: "300"},
];

export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언) 
  components: {
    grid: Grid,
    Combo,
    WindowPopup
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
    this.fnSearch()
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
    mng_cd_change(params) {this.info.mng_cd_selected = params},
    wbs_mng_cd_change(params) {this.info.wbs_mng_cd_selected = params},
    wbs_prc_sts_cd_change(params) {this.info.wbs_prc_sts_cd_selected = params},

    // 콤보 처음 값 저장
    comboSetData(){
      this.info.bkup_id_selected = this.$children[0].$data.bkup_id_selected;
      this.info.prjt_nm_selected = this.$children[0].$data.prjt_nm_selected;
      this.info.bzcd_selected = this.$children[0].$data.bzcd_selected;
      this.info.mng_cd_selected = this.$children[0].$data.mng_cd_selected;
      this.info.wbs_prc_sts_cd_selected = this.$children[0].$data.wbs_prc_sts_cd_selected;
      this.info.wbs_mng_cd_selected = this.$children[0].$data.wbs_mng_cd_selected;
    },

    change() {
      console.log("change");
    },
    fnSave() {
        this.rowData = this.$refs.grid.invoke("getData")

        axiosService.post("/PJTE5000/insert",{
            rowData : this.rowData,
        }).then(res => {
          console.log("resData ::", res)
        }).catch(e => {
        });
    },
    onClick(ev) {
      console.log("클릭" + ev.rowKey);
      this.curRow = ev.rowKey;

      if(ev.columnName === 'btn_popup') {
        this.pop = window.open("../PJTE9002/", "open_page", "width=1000, height=800");
      }
    },
    fnSearch() {
      this.comboSetData();

      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");


      // 버튼 활성화
      if(
          this.info.bkup_id_selected === '0000000000' && this.info.bzcd_selected !== 'TTT' &&
          this.info.wbs_mng_cd_selected !== 'TTT' && this.info.wbs_prc_sts_cd_selected === 'TTT' &&
          this.info.crpe_nm === undefined && this.info.acl_sta_dt === null && this.info.acl_end_dt === null &&
          this.info.pln_sta_dt=== null && this.info.pln_end_dt === null
      ){
          this.validated = false;
      } else {
        this.validated = true;
      }
    },
    open_pjte9001() {
      this.pop = window.open("../PJTE9001/", "open_page", "width=700, height=600");
    },
    gridInit() {
      this.$refs.grid.invoke("clear");
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
      this.pop = window.open("../SWZP0041/", "open_page", "width=1000, height=800");
    }

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
      validated : true,
      comboList : ["C27","C0","C1","C19","C35"],

      info: {
        pgm_id: this.pgm_id,    // 프로그램ID
        pgm_nm: this.pgm_nm,    // 프로그램명
        task_nm: this.task_nm,  // task명
        crpe_nm: this.crpe_nm,  // 담당자명

        prjt_nm_selected         : null,
        bkup_id_selected         : null,
        bzcd_selected            : null,
        mng_cd_selected          : null,
        wbs_prc_sts_cd_selected  : null,
        wbs_mng_cd_selected      : null,

        acl_sta_dt : null,
        acl_end_dt : null,
        pln_sta_dt : null,
        pln_end_dt : null,

      },
      addRow: {
        grid: this.grid,
      },

      rowData : [],

      check_Yn: false,  // 삭제프로그램/소스취약점포함

      count: 0,
      curRow: -1,
      title: "",
      scrollX: false,
      scrollY: false,
      bodyHeight: 610,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: true,
      open: false,
      //draggable: true,
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
          readData   : { url: process.env.VUE_APP_API + '/PJTE5000/select', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE5000/create', method: 'POST'},
          updateData : { url: process.env.VUE_APP_API + '/PJTE5000/update', method: 'PUT'},
          deleteData : { url: process.env.VUE_APP_API + '/PJTE5000/delete', method: 'PUT'},
        },
        initialRequest: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders: ['rowNum'],
      header: {
        height: 40
      },
      columns: [
        {
          header: '관리구분',
          width: 100,
          minWidth: 50,
          maxWidth: 250,
          name: 'mng_cd',
          align: 'center',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: mng_cd
            }
          }
        },
        {
          header: '업무구분',
          width: 100,
          minWidth: 50,
          maxWidth: 250,
          name: 'bzcd',
          align: 'center',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: bzcd
            }
          }
        },
        {
          header: '레벨',
          width: 100,
          minWidth: 50,
          maxWidth: 250,
          name: 'step_cd',
          align: 'center',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: level
            }
          }
        },
        {
          header: '관리 ID',
          width: 130,
          align: 'center',
          name: 'mng_id',
        },
        {
          header: '상위관리 ID',
          width: 130,
          align: 'center',
          name: 'hgrn_mng_id',
        },
        {
          header: 'ACTIVITY명',
          width: 120,
          align: 'center',
          name: 'acvt_nm',
          type: 'text'
        },
        {
          header: '태스크명',
          width: 80,
          align: 'center',
          name: 'task_nm',
        },
        {
          header: '첨부',
          width: 120,
          name: 'btn_popup',
          align: 'center',
          renderer: CustomRenderer,
        },
        {
          header: '담당자',
          width: 120,
          align: 'center',
          name: 'crpe_nm',
        },
        {
          header: '처리단계',
          width: 80,
          align: 'center',
          name: 'wbs_prc_sts_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: prc_step_cd
            }
          }
        },
        {
          header: '일자',
          width: 110,
          align: 'center',
          name: 'pln_sta_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '시간',
          width: 110,
          align: 'center',
          type: 'date',
          name: 'pln_sta_tim',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '일자',
          width: 110,
          align: 'center',
          name: 'pln_end_dt',
          editor: 'datePicker'
        },
        {
          header: '시간',
          width: 110,
          align: 'center',
          name: 'pnl_end_tim',
          editor: 'datePicker'
        },
        {
          header: '일자',
          width: 80,
          align: 'center',
          name: 'acl_sta_dt',
        },
        {
          header: '시간',
          width: 160,
          align: 'center',
          name: 'acl_sta_tim',
        },
        {
          header: '일자',
          width: 80,
          align: 'center',
          name: 'acl_end_dt',
        },
        {
          header: '시간',
          width: 160,
          align: 'center',
          name: 'acl_end_tim',
        },
        {
          header: '가중치',
          width: 160,
          align: 'center',
          name: 'wgt_rt',
        },
        {
          header: '진행율',
          width: 160,
          align: 'center',
          name: 'prg_rt',
        },
        {
          header: '비고',
          width: 200,
          align: 'center',
          name: 'rmrk',
        },
        {
          header: '정렬',
          width: 80,
          align: 'right',
          name: 'sort',
        },
        {
          header: '첨부파일관리ID',
          width: 160,
          align: 'center',
          name: 'atfl_mng_id',
          hidden: true,
        },
        {
          header: '프로젝트ID',
          width: 150,
          align: 'center',
          name: 'prjt_id',
          hidden: true,
        },
        {
          header: '하위건수',
          width: 80,
          align: 'right',
          name: 'wbs_cnt',
          hidden: true,
        },
      ]
    }
  },
};

</script>
<style>
</style>
