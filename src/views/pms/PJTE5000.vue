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
            <li class="filter-item">
              <div class="input-searchWrap">담당자명
                <input type="text"
                       id="id.crpe_nm"
                       placeholder="입력"
                       v-model="info.crpe_nm"
                       style="width: 120px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">계획종료일자
                <div class="input-dateWrap"><input type="date" :max="info.pln_end_dt" v-model="info.pln_sta_dt"></div>
                ~
                <div class="input-dateWrap"><input type="date" :min="info.pln_sta_dt" v-model="info.pln_end_dt"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">실제종료일자
                <div class="input-dateWrap"><input type="date" :max="info.acl_end_dt" v-model="info.acl_sta_dt"></div>
                ~
                <div class="input-dateWrap"><input type="date" :max="info.acl_sta_dt" v-model="info.acl_end_dt"></div>
              </div>
            </li>
          </ul>
          <ul class="filter-btn">
            <button class="btn btn-filter-p" @click="prgRtCalc" :disabled="validated">진행률계산</button>
            <button class="btn btn-filter-e" @click="gridExcelExport" :disabled="validated_aut" style="margin-left: 20px"> 엑셀업로드</button>
            <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
            <button class="btn btn-filter-b" @click="gridUpRow" :disabled="validated_aut" style="margin-left: 20px">+ 행위로</button>
            <button class="btn btn-filter-b" @click="gridDownRow" :disabled="validated_aut">- 행아래</button>
            <button class="btn btn-filter-b" href="#" @click="gridAddRow" :disabled="validated_aut">행추가</button>
            <button class="btn btn-filter-b" @click="gridDelRow" :disabled="validated_aut">행삭제</button>
            <button class="btn btn-filter-p" @click="fnSave" :disabled="validated" style="margin-left: 20px">저장</button>
            <button class="btn btn-filter-p" @click="fnSearch">조회</button>
          </ul>
        </div>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <Modal :show.sync="modals.txt_modal1">
          <h3 slot="header" class="modal-title" id="modal-title-default">내용상세보기</h3>
          <tr>
            <textarea id="modalId" cols="73" rows="15" style="margin-bottom: 10px" v-model="modalTxt"></textarea>
          </tr>
          <tr>
            <div style="float: right">
              <button class="btn btn-filter-p" id="fnEdit" style="margin-right: 5px" @click="fnEdit">수정</button>
              <button class="btn btn-filter-b" @click="fnCloseModal">닫기</button>
            </div>
          </tr>
        </Modal>
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
              @onGridUpdated="onGridUpdated"
              @onGridMounted="onGridMounted"
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
import Modal from "@/components/Modal";
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http"; // Date-picker 스타일적용

// 첨부파일 팝업에서 받은 값
window.fileData = (fileLists, num) => {
  console.log(fileLists);
  window.pms_register.file_name_list = fileLists;
  window.pms_register.atfl_num = num;
  window.pms_register.atfl_mng_id_yn = fileLists[1].atfl_mng_id;
  window.pms_register.atfl_mng_id = fileLists[1].atfl_mng_id;
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
    // 결함등록 버튼 img
    this.el.src = '/img/ic_logOut.8c60a751.svg';
  }
}

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
  {"text":" ","value":"NNN"},
  {text: "업무팀", value: '100'},
  {text: "공통팀", value: "200"},
  {text: "PMO", value: "300"},
];

// 관리구분
const mng_cd = [
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
    WindowPopup,
    Modal,
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
    this.init()
    this.fnSearch()
    window.pms_register = this;
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
    // Combo.vue 에서 받아온 값
    bkup_id_change(params)        {this.info.bkup_id_selected = params},
    prjt_nm_chage(params)         {this.info.prjt_nm_selected = params},
    bzcd_change(params)           {this.info.bzcd_selected = params},
    wbs_mng_cd_change(params)     {this.info.wbs_mng_cd_selected = params},
    wbs_prc_sts_cd_change(params) {this.info.wbs_prc_sts_cd_selected = params},

    // 렌더링 중 적용 (mounted와 동일)
    onGridMounted(grid){
    },
    // 렌더링 후 적용됨
    onGridUpdated(grid){
      let gridData = this.$refs.grid.invoke("getData")
      for(let i=0; i<gridData.length; i++) {
          if(gridData[i].wbs_cnt === "0") {
            this.$refs.grid.invoke("enableCell", i, 'prg_rt');
          }
      }
    },
    fnEdit(){   // 모달창에서 수정버튼 클릭 시 그리드Text 변경
      this.$refs.grid.invoke("setValue", this.curRow, "rmrk", document.getElementById("modalId").value);
      this.modals.txt_modal1 = false;
    },
    fnCloseModal(){  // 모달창 닫기
      this.modals.txt_modal1 = false;
    },
    fnSave() {
      if(this.flag === "N"){
        alert("진행율계산을 수행하세요")
        return;
      }

      let getData = this.$refs.grid.invoke("getData")

      debugger
      for(let i=0; i<getData.length; i++){
        this.$refs.grid.invoke("setValue",i, "sort", i+1)
      }

      this.rowData = this.$refs.grid.invoke("getData")
      debugger
      if(this.rowData.length !== 0) {
        if (this.vaildation(this.rowData) === true) {
          axiosService.delete("/PJTE5000/delete", {
            data: {
              bkup_id: this.info.bkup_id_selected,
              prjt_id: this.info.prjt_nm_selected,
              bzcd: this.info.bzcd_selected,
              mng_cd: this.info.wbs_prc_sts_cd_selected,
              rowData: this.rowData,
            },
          }).then(res => {
            console.log("Delete Success!")
            axiosService.post("/PJTE5000/insert", {
              rowData: this.rowData,
            }).then(res => {
              console.log("Insert Success!")
              alert("저장이 완료되었습니다.")
            }).catch(e => {
            });
          }).catch(e => {
          });
        }
      }
    },
    onClick(ev) {
      console.log("클릭" + ev.rowKey);
      this.curRow = ev.rowKey;
      let gridData = this.$refs.grid.invoke("getRow",this.curRow);

      this.upCount = 0;
      this.downCount = 0;

      // grid 셀 클릭 시 윈도우 팝업 호출(함수화예정)
      if(ev.columnName === 'atfl_mng_id_yn' && this.addCheak === 'N') {
        this.count = 1
        debugger
        let bkup_id='0000000000', prjt_id=gridData.prjt_id, atfl_mng_id=gridData.atfl_mng_id != null?gridData.atfl_mng_id:'', file_rgs_dscd='700', bzcd = gridData.bzcd, mng_id=gridData.mng_id, mng_cd=gridData.mng_cd
        this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&mng_id=${mng_id}&mng_cd=${mng_cd}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
      }

      const currentCellData = (this.$refs.grid.invoke("getFocusedCell"));
      if(ev.columnName == 'rmrk') {  // 컬럼명이 <비고>일 때만 팝업
        this.modals.txt_modal1 = true;
        this.modalTxt = currentCellData.value;
        const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      }
    },
    fnSearch() {
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
      // 버튼 활성화
      if(this.info.bkup_id_selected === '0000000000' && this.info.bzcd_selected !== 'TTT' &&
          this.info.wbs_prc_sts_cd_selected !== 'TTT' && this.info.wbs_mng_cd_selected === 'TTT' &&
          this.info.crpe_nm === undefined && this.info.acl_sta_dt === null && this.info.acl_end_dt === null &&
          this.info.pln_sta_dt=== null && this.info.pln_end_dt === null)
      {
        if(sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600'){
          this.validated_aut = false;
        }
        this.validated = false;
      } else {
        this.validated = true;
        this.validated_aut = true;
      }

    },
    open_pjte9001() {
      this.pop = window.open("../PJTE9001/", "open_page", "width=700, height=600");
    },
    gridInit() {
      this.$refs.grid.invoke("clear");
    },
    init() {
      if(sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600'){
        // 특정 열 비활성화
        this.$refs.grid.invoke("disableColumn", 'wgt_rt');
        this.$refs.grid.invoke("disableColumn", 'pln_end_dt');
        this.$refs.grid.invoke("disableColumn", 'pln_sta_dt');
      }

    },
    gridAddRow() {
      this.addCheak = 'y';
      this.$refs.grid.invoke("appendRow",
          {
            bzcd    : this.info.bzcd_selected,
            mng_cd  : this.info.wbs_prc_sts_cd_selected,
            prjt_id : sessionStorage.getItem("LOGIN_PROJ_ID"),
            bkup_id : "0000000000",
            sort    : this.$refs.grid.invoke("getData").length+1,
          },
          {focus:true}) ;
      let gridData = this.$refs.grid.invoke("getData")
      this.$refs.grid.invoke("enableCell", gridData.length-1 ,"step_cd");
      this.$refs.grid.invoke("enableCell", gridData.length-1 ,"mng_id");
      this.$refs.grid.invoke("enableCell", gridData.length-1 ,"prg_rt");
      this.$refs.grid.invoke("enableCell", gridData.length-1 ,"pln_end_tim");
      this.$refs.grid.invoke("enableCell", gridData.length-1 ,"pln_sta_tim");
    },
    gridDelRow() {
      this.$refs.grid.invoke("removeRow", this.curRow);
      // DB 데이터 삭제로직 추가
    },
    gridADelRow() {
      // DB 데이터 삭제로직 추가
    },
    gridUpRow() {
      this.upCount++;
      this.upDownCount = (this.curRow + this.downCount) - this.upCount;
      this.$refs.grid.invoke("moveRow", this.curRow, this.upDownCount);
    },
    gridDownRow() {
      this.downCount++;
      this.upDownCount = (this.curRow - this.upCount) + this.downCount ;
      this.$refs.grid.invoke("moveRow", this.curRow, this.upDownCount);
    },
    gridIns() {
      // DB 데이터 삭제로직 추가
    },
    gridExcelExport() {
      this.$refs.grid.invoke("export", "xlsx",{fileName: "엑셀다운로드", useFormattedValue : true});
    },
    gridExcelImport() {
// 엑셀파일 업로드 로직 추가 
    },
    // 진행률 계산 함수
    prgRtCalc() {

      this.$refs.grid.invoke("focus",0, "prg_rt",true)
      let i, x, y, z, wbsCnt, roCnt, iMaxRow;
      let mngid, hgrnMngid;
      let wgtRt, prtRt, totWgtRt;

      iMaxRow = this.$refs.grid.invoke("getData").length; // 최대 row 수

      for(z=1; z<=5; z++) {
        for(i=0; i<iMaxRow; i++) {
          totWgtRt = 0;
          mngid = this.$refs.grid.invoke("getValue", i, "mng_id");
          wbsCnt = this.$refs.grid.invoke("getValue", i, "wbs_cnt");

          if (wbsCnt > 0) {
            for (x = i+1; x < iMaxRow; x++) {
              hgrnMngid = this.$refs.grid.invoke("getValue", x, "hgrn_mng_id");
              wgtRt = this.$refs.grid.invoke("getValue", x, "wgt_rt");
              prtRt = this.$refs.grid.invoke("getValue", x, "prg_rt");

              if(hgrnMngid === "1000000001"){
                this.$refs.grid.invoke("disableCell", x,"prg_rt");
              }
              if (mngid === hgrnMngid) {
                totWgtRt = totWgtRt + wgtRt * prtRt
              }
            }
            // 진행율결과값 셋팅
            this.$refs.grid.invoke("setValue", i, "prg_rt", totWgtRt.toString());
            this.flag = 'y'
          }
        }
      }

    },
    open_page() {
      this.pop = window.open("../SWZP0041/", "open_page", "width=1000, height=800");
    },
    // 유효값 검증
    // vaildation('검증 랗 데이터', '일반저장(1) | 기타저장(2) 구분')
    vaildation(data) {
      for(let i=0; i<data.length; i++){
        /* 출력 영역  */
        if(data[i].wbs_prc_sts_cd === null) { alert("관리구분코드는 필수 입력 사항입니다");      return false;}
        if(data[i].bzcd === null)           { alert("업무구분코드는 필수 입력 사항입니다");      return false;}
        if(data[i].step_cd === null)          { alert("단계구분코드는 필수 입력 사항입니다");    return false;}
        if(data[i].mng_id === null)         { alert("관리ID는 필수 입력 사항입니다");   return false;}

        if(data[i].acvt_nm === null)        { alert("ACTIVITY명은 필수 입력 사항입니다");  return false;}
        if(data[i].task_nm === null)        { alert("테스크명은 필수 입력 사항입니다");   return false;}
        if(data[i].crpe_nm === null)        { alert("담당자명은 필수 입력 사항입니다");   return false;}
        if(data[i].mng_id === null)         { alert("처리단계는 필수 입력 사항입니다");      return false;}
        if(data[i].pln_sta_dt === null)     { alert("계획시작일자는 필수 입력 사항입니다");   return false;}
        if(data[i].pln_sta_tim === null)    { alert("계획시작시간은 필수 입력 사항입니다");      return false;}
        if(data[i].pln_end_dt === null)     { alert("계획종료일자는 필수 입력 사항입니다");   return false;}
        if(data[i].pnl_end_tim === null)    { alert("계획종료시간은 필수 입력 사항입니다");      return false;}

        if(data[i].sort === null)           { alert("정렬은 필수 입력 사항입니다");   return false;}
        if(data[i].prjt_id === null)        { alert("프로젝트 ID는 필수 입력 사항입니다");   return false;}
        if(data[i].wbs_cnt === null)        { alert("하위건수는 필수 입력 사항입니다");   return false;}

        if(data[i].step_cd >= '200') {
          if (data[i].hgrn_mng_id === null) {alert("상위관리ID는 필수 입력 사항입니다"); return false;}
        }
        if(data[i].wbs_prc_sts_cd === '100') {
          if(data[i].wgt_rt === null)         { alert("가중치는 필수 입력 사항입니다");   return false;}
          if(data[i].prg_rt === null)         { alert("진행율은 필수 입력 사항입니다");   return false;}
        }
        //if(data[i].atfl_mng_id === null)  { alert("첨부파일관리ID는 필수 입력 사항입니다");   return false;}

      }
      return  true;
    },
  },
// 특정 데이터에 실행되는 함수를 선언하는 부분 
// newValue, oldValue 두개의 매개변수를 사용할 수 있음 
  watch: {
    atfl_mng_id() {    // 단위테스트 케이스 변경 시 작동
        if (this.atfl_mng_id_yn !== '') {
          this.$refs.grid.invoke("setValue", this.curRow, 'atfl_mng_id_yn', '첨부');
          this.$refs.grid.invoke("setValue", this.curRow, 'atfl_mng_id', this.atfl_mng_id);
        }
    }
  },
// 변수 선언부분 
  data() {
    return {
      validated : true,
      validated_aut : true,
      comboList : ["C27","C0","C1","C19","C35"],
      atfl_mng_id         : '',  // 단위테스트 케이스 첨부파일관리
      atfl_mng_id_yn      : '',  // 단위테스트 케이스 첨부파일관리
      flag                : 'N', //진행율 계산 체크
      addCheak            : 'N', // 행추가 체크

      info: {
        pgm_id: this.pgm_id,    // 프로그램ID
        pgm_nm: this.pgm_nm,    // 프로그램명
        task_nm: this.task_nm,  // task명
        crpe_nm: this.crpe_nm,  // 담당자명

        atfl_mng_id         : this.atfl_mng_id,  // 단위테스트 케이스 첨부파일관리
        atfl_mng_id_yn      : this.atfl_mng_id_yn,  // 단위테스트 케이스 첨부파일관리

        prjt_nm_selected         : sessionStorage.getItem("LOGIN_PROJ_ID"),
        bkup_id_selected         : '0000000000',
        bzcd_selected            : sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600' ? 'TTT':sessionStorage.getItem("LOGIN_BZCD"),
        wbs_prc_sts_cd_selected  : 'TTT',
        wbs_mng_cd_selected      : 'TTT',

        acl_sta_dt : null,
        acl_end_dt : null,
        pln_sta_dt : null,
        pln_end_dt : null,

      },
      addRow: {
        grid: this.grid,
      },

      rowData : [],

      /* 그리드 상세보기 모달 속성 */
      modals: {
        txt_modal1: false,
      },
      modalTxt:this.modalTxt,

      check_Yn: false,  // 삭제프로그램/소스취약점포함

      downCount: 0,
      upCount : 0,
      curRow: -1,
      title: "",
      scrollX: false,
      scrollY: false,
      bodyHeight: 700,
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
        height: 40,
        complexColumns: [
          {header: '계획시작',           name: 'mergeColumn1', childNames: ['pln_sta_dt','pln_sta_tim']},
          {header: '계획종료',           name: 'mergeColumn2', childNames: ['pln_end_dt','pln_end_tim']},
          {header: '실제시작',           name: 'mergeColumn3', childNames: ['acl_sta_dt','acl_sta_tim']},
          {header: '실제종료',           name: 'mergeColumn4', childNames: ['acl_end_dt','acl_end_tim']},
        ]
      },
      columns: [
        {
          header: '관리구분',
          width: 100,
          minWidth: 50,
          maxWidth: 250,
          name: 'mng_cd',
          align: 'center',
          disabled: true,
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
          disabled: true,
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
          disabled: true,
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
          editor: "text",
          disabled: true,
        },
        {
          header: '상위관리 ID',
          width: 130,
          align: 'center',
          name: 'hgrn_mng_id',
          editor: 'text',
        },
        {
          header: 'ACTIVITY명',
          width: 120,
          align: 'left',
          name: 'acvt_nm',
          editor: 'text'
        },
        {
          header: '테스크명',
          width: 80,
          align: 'center',
          name: 'task_nm',
          editor: 'text'
        },
        {
          header: '첨부',
          width: 60,
          align: 'center',
          name: 'atfl_mng_id_yn',
          defaultValue: '미첨부',
        },
        {
          header: '첨부',
          width: 60,
          align: 'center',
          name: 'atfl_mng_id',
          hidden: true,
        },
        {
          header: '담당자',
          width: 120,
          align: 'center',
          name: 'crpe_nm',
          editor: 'text'
        },
        {
          header: '처리단계',
          width: 140,
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
          width: 80,
          align: 'center',
          name: 'pln_sta_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '시간',
          width: 80,
          align: 'center',
          name: 'pln_sta_tim',
          format: 'yyyy-mm-dd',
          editor: 'text',
          disabled: true,
        },
        {
          header: '일자',
          width: 80,
          align: 'center',
          name: 'pln_end_dt',
          editor: 'datePicker'
        },
        {
          header: '시간',
          width: 80,
          align: 'center',
          name: 'pln_end_tim',
          editor: 'text',
          disabled: true,
        },
        {
          header: '일자',
          width: 80,
          align: 'center',
          name: 'acl_sta_dt',
          editor: 'datePicker',
          disabled: true,
        },
        {
          header: '시간',
          width: 80,
          align: 'center',
          name: 'acl_sta_tim',
          editor: 'text',
          disabled: true,
        },
        {
          header: '일자',
          width: 80,
          align: 'center',
          name: 'acl_end_dt',
          editor: 'datePicker',
          disabled: true,
        },
        {
          header: '시간',
          width: 80,
          align: 'center',
          name: 'acl_end_tim',
          editor: 'text',
          disabled: true,
        },
        {
          header: '가중치',
          width: 80,
          align: 'center',
          name: 'wgt_rt',
          editor: 'text',
        },
        {
          header: '진행율',
          width: 80,
          align: 'center',
          name: 'prg_rt',
          editor: 'text',
          disabled: true,
        },
        {
          header: '비고',
          width: 200,
          align: 'center',
          name: 'rmrk',
          editor: 'text',
        },
        {
          header: '정렬',
          width: 60,
          align: 'center',
          name: 'sort',
          editor: "text",
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
