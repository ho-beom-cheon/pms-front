<template>
  <!-- CONTENTS -->
  <div class="contents">
    <input type="hidden" name="updatedRows" v-model="updatedRows" id="updatedRows">
    <input type="hidden" name="deletedRows" v-model="deletedRows" id="deletedRows">
    <input type="hidden" name="createdRows" v-model="createdRows" id="createdRows">
    <!-- ASIDE -- LNB -->
    <PmsSideBar></PmsSideBar>
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
          </ul>
          <ul class="filter-btn">
            <button class="btn btn-filter-e">
              <label for="file">엑셀업로드</label>
              <input type="file" id="file"  @change="gridExcelImport"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="display: none;">
            </button>
            <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
            <button class="btn btn-filter-b" @click="gridAddRow">행추가</button>
            <button class="btn btn-filter-b" @click="gridDelRow">행삭제</button>
            <button class="btn btn-filter-p" @click="fnSave" style="margin-left: 20px">저장</button>
            <button class="btn btn-filter-p" @click="fnSearch">조회</button>
          </ul>
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
import XLSX from "xlsx";
import PmsSideBar from  "@/components/PmsSideBar";

export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    grid: Grid,
    Combo,
    WindowPopup,
    Modal,
    PmsSideBar,
  },

  methods: {


    onClick(ev) {
      console.log("클릭" + ev.rowKey);
      this.curRow = ev.rowKey;
      let gridData = this.$refs.grid.invoke("getRow",this.curRow);
      console.log("클릭 :: ");
      this.upCount = 0;
      this.downCount = 0;

      // grid 셀 클릭 시 윈도우 팝업 호출(함수화예정)
      if(ev.columnName === 'atfl_mng_id_yn' && this.addCheak === 'N') {
        this.count = 1
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
    },
    gridInit() {
      this.$refs.grid.invoke("clear");
    },
    init() {
      if(sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600'){
        // 특정 열 비활성화
        this.$refs.grid.invoke("disableColumn", 'wgt_rt');
        // this.$refs.grid.invoke("disableColumn", 'pln_end_dt');
        // this.$refs.grid.invoke("disableColumn", 'pln_sta_dt');
        this.$refs.grid.invoke("disableColumn", 'wbs_prc_sts_cd');
      }
    },
    gridAddRow() {
      if(this.autCheck() === false){ return; }  //권한 체크
      this.addCheak = 'y';
      this.$refs.grid.invoke("appendRow",
          {
            bzcd    : this.info.bzcd_selected,
            mng_cd  : this.info.wbs_mng_cd_selected,
            prjt_id : sessionStorage.getItem("LOGIN_PROJ_ID"),
            bkup_id : "0000000000",
            sort    : this.$refs.grid.invoke("getData").length+1,
          },
          {focus:true}) ;
      let gridData = this.$refs.grid.invoke("getData")
      this.$refs.grid.invoke("addColumnClassName", "rmrk", "disableColor");
      this.$refs.grid.invoke("enableCell", gridData.length-1 ,"step_cd");
      this.$refs.grid.invoke("enableCell", gridData.length-1 ,"mng_id");
      this.$refs.grid.invoke("enableCell", gridData.length-1 ,"prg_rt");
      this.$refs.grid.invoke("enableCell", gridData.length-1 ,"bzcd");
      // this.$refs.grid.invoke("enableCell", gridData.length-1 ,"pln_end_tim");
      // this.$refs.grid.invoke("enableCell", gridData.length-1 ,"pln_sta_tim");
    },
    gridDelRow() {
      if(this.autCheck() === false){ return; }  //권한 체크
      this.$refs.grid.invoke("removeRow", this.curRow);
    },
    gridExcelExport() {
      this.$refs.grid.invoke("export", "xlsx",{fileName: "엑셀다운로드", useFormattedValue : true});
    },
    gridExcelImport(event) {
      // 엑셀파일 업로드 로직 추가
      console.log(event.target.files[0])
      this.file = event.target.files ? event.target.files[0] : null;
      let input = event.target;
      let reader = new FileReader();
      reader.onload = () => {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, {type: 'binary'});
        let gridExcelData;

        wb.SheetNames.forEach((sheetName, idx) => {
          if (sheetName === 'WBS관리' || sheetName === 'Sheet1') {
            console.log(wb.Sheets[sheetName])
            wb.Sheets[sheetName].A1.w = "NO"
            wb.Sheets[sheetName].B1.w = "mng_cd"
            wb.Sheets[sheetName].C1.w = "bzcd"
            wb.Sheets[sheetName].D1.w = "step_cd"
            wb.Sheets[sheetName].E1.w = "mng_id"
            wb.Sheets[sheetName].F1.w = "hgrn_mng_id"
            wb.Sheets[sheetName].G1.w = "acvt_nm"
            wb.Sheets[sheetName].H1.w = "task_nm"
            wb.Sheets[sheetName].I1.w = "atfl_mng_id_yn"
            wb.Sheets[sheetName].J1.w = "crpe_nm"
            wb.Sheets[sheetName].K1.w = "wbs_prc_sts_cd"
            wb.Sheets[sheetName].L1.w = "wgt_rt"
            wb.Sheets[sheetName].M1.w = "prg_rt"
            let N1 = {N1 : {t: 's', v: '일자', r: '<t>일자</t>', h: '일자', w: 'pln_sta_dt'}}
            wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], N1)
            wb.Sheets[sheetName].N2.w = "pln_sta_dt"
            let O1 = {O1 : {t: 's', v: '시간', r: '<t>시간</t>', h: '시간', w: 'pln_sta_tim'}}
            wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], O1)
            wb.Sheets[sheetName].O2.w = "pln_sta_tim"
            let P1 = {P1 : {t: 's', v: '일자', r: '<t>일자</t>', h: '일자', w: 'pln_end_dt'}}
            wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], P1)
            wb.Sheets[sheetName].P2.w = "pln_end_dt"
            let Q1 = {Q1 : {t: 's', v: '시간', r: '<t>시간</t>', h: '시간', w: 'pln_end_tim'}}
            wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], Q1)
            wb.Sheets[sheetName].Q2.w = "pln_end_tim"
            let R1 = {R1 : {t: 's', v: '일자', r: '<t>일자</t>', h: '일자', w: 'acl_sta_dt'}}
            wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], R1)
            wb.Sheets[sheetName].R2.w = "acl_sta_dt"
            let S1 = {S1 : {t: 's', v: '시간', r: '<t>시간</t>', h: '시간', w: 'acl_sta_tim'}}
            wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], S1)
            wb.Sheets[sheetName].S2.w = "acl_sta_tim"
            let T1 = {T1 : {t: 's', v: '일자', r: '<t>일자</t>', h: '일자', w: 'acl_end_dt'}}
            wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], T1)
            wb.Sheets[sheetName].T2.w = "acl_end_dt"
            let U1 = {U1 : {t: 's', v: '시간', r: '<t>시간</t>', h: '시간', w: 'acl_end_tim'}}
            wb.Sheets[sheetName] = Object.assign(wb.Sheets[sheetName], U1)
            wb.Sheets[sheetName].U2.w = "acl_end_tim"
            wb.Sheets[sheetName].V1.w = "rmrk"

            let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            let rowObj_copy = [];
            for(let n=1; n<rowObj.length; n++){
              // if(rowObj[n].bzcd !== '100'){
              //   rowObj[n].bzcd = (rowObj[n].bzcd).toString()
              // }
              rowObj_copy[n-1] = rowObj[n];
            }
            gridExcelData = JSON.parse(JSON.stringify(rowObj_copy));
            console.log("gridExcelData ::", gridExcelData)
          }
        })
        this.excelUplod = 'Y'
        try {
          this.$refs.grid.invoke('resetData', gridExcelData)
          alert('업로드 파일이 적용되었습니다.')
        } catch (e){
          alert('업로드에 실패했습니다.')
        }

      };
      reader.readAsBinaryString(input.files[0]);
      event.target.value = '';
    },
    autCheck() {
      if(sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600' && sessionStorage.getItem("LOGIN_AUT_CD") !== '900'){
        alert("권한이 부족합니다.")
        return false;
      }
    },
    open_page() {
      this.pop = window.open("../SWZP0041/", "open_page", "width=1000, height=800");
    },
    // 유효값 검증
    // vaildation('검증 랗 데이터', '일반저장(1) | 기타저장(2) 구분')
    vaildation(data) {
      // for(let i=0; i<data.length; i++){
      //   /* 출력 영역  */
      //   if(data[i].wbs_prc_sts_cd === null) { alert("관리구분코드는 필수 입력 사항입니다");      return false;}
      //   if(data[i].bzcd === null)           { alert("업무구분코드는 필수 입력 사항입니다");      return false;}
      //   if(data[i].step_cd === null)          { alert("단계구분코드는 필수 입력 사항입니다");    return false;}
      //   if(data[i].mng_id === null)         { alert("관리ID는 필수 입력 사항입니다");   return false;}
      //
      //   if(data[i].acvt_nm === null)        { alert("ACTIVITY명은 필수 입력 사항입니다");  return false;}
      //   if(data[i].task_nm === null)        { alert("테스크명은 필수 입력 사항입니다");   return false;}
      //   if(data[i].crpe_nm === null)        { alert("담당자명은 필수 입력 사항입니다");   return false;}
      //   if(data[i].mng_id === null)         { alert("처리단계는 필수 입력 사항입니다");      return false;}
      //   if(data[i].pln_sta_dt === null)     { alert("계획시작일자는 필수 입력 사항입니다");   return false;}
      //   if(data[i].pln_sta_tim === null)    { alert("계획시작시간은 필수 입력 사항입니다");      return false;}
      //   if(data[i].pln_end_dt === null)     { alert("계획종료일자는 필수 입력 사항입니다");   return false;}
      //   if(data[i].pnl_end_tim === null)    { alert("계획종료시간은 필수 입력 사항입니다");      return false;}
      //
      //   if(data[i].sort === null)           { alert("정렬은 필수 입력 사항입니다");   return false;}
      //   if(data[i].prjt_id === null)        { alert("프로젝트 ID는 필수 입력 사항입니다");   return false;}
      //   if(data[i].wbs_cnt === null)        { alert("하위건수는 필수 입력 사항입니다");   return false;}
      //
      //   if(data[i].step_cd >= '200') {
      //     if (data[i].hgrn_mng_id === null) {alert("상위관리ID는 필수 입력 사항입니다"); return false;}
      //   }
      //   if(data[i].wbs_prc_sts_cd === '100') {
      //     if(data[i].wgt_rt === null)         { alert("가중치는 필수 입력 사항입니다");   return false;}
      //     if(data[i].prg_rt === null)         { alert("진행율은 필수 입력 사항입니다");   return false;}
      //   }
      //   //if(data[i].atfl_mng_id === null)  { alert("첨부파일관리ID는 필수 입력 사항입니다");   return false;}
      //
      // }
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
    },
  },
// 변수 선언부분
  data() {
    return {
      login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),   // 권한ID
      login_bzcd: sessionStorage.getItem("LOGIN_BZCD"),     // 업무구분
      login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),   // 직원번호
      login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트ID

      validated : true,
      comboList : ["C27","C0","C1","C19","C35"],
      atfl_mng_id         : '',  // 단위테스트 케이스 첨부파일관리
      atfl_mng_id_yn      : '',  // 단위테스트 케이스 첨부파일관리
      flag                : 'N', //진행율 계산 체크
      addCheak            : 'N', // 행추가 체크
      editingEvent : "click",
      excelUplod: 'N',           // 엑셀 업로드

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
        wbs_mng_cd_selected      : '100',
        wbs_prc_sts_cd_selected  : 'TTT',

        acl_sta_dt : null,
        acl_end_dt : null,
        pln_sta_dt : null,
        pln_end_dt : null,

      },
      addRow: {
        grid: this.grid,
      },

      rowData : [],
      updatedRows : this.updatedRows,
      deletedRows : this.deletedRows,
      createdRows : this.createdRows,

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
      bodyHeight: 640,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: false,
      open: false,
      //draggable: true,
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9310/select_9310_01', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE9310/insert_9310_01', method: 'POST'},
          deleteData : { url: process.env.VUE_APP_API + '/PJTE9310/delete_9310_01', method: 'PUT'},
        },
        initialRequest: false,
        contentType : 'application/json;',
        headers : {  'x-custom-header' : 'custom-header'  },
        withCredentials: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders: ['rowNum'],
      header: {
        height: 25,
      },
      columns: [
        {
          header: '부분',
          width: 70,
          name: 'dept_nm',
          align: 'center',
          editor: "text",
        },
        {
          header: '소속본부',
          width: 70,
          name: 'hdq_nm',
          align: 'center',
          editor: "text",
        },
        {
          header: '소속팀',
          width: 70,
          name: 'tm_nm',
          align: 'center',
          editor: "text",
        },
        {
          header: '직급',
          width: 90,
          align: 'center',
          name: 'rank_nm',
          editor: "text",
          disabled: true,
        },
        {
          header: '직원번호',
          width: 90,
          align: 'center',
          name: 'empno',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '성명',
          width: 90,
          align: 'center',
          name: 'empnm',
          editor: 'text',
        },
        {
          header: '입사일',
          width: 80,
          align: 'center',
          name: 'ent_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '투입프로젝트',
          width: 80,
          align: 'center',
          name: 'inp_prj_nm',
          editor: 'text'
        },
        {
          header: '투입일',
          width: 80,
          align: 'center',
          name: 'inp_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '철수일(예정)',
          width: 80,
          align: 'center',
          name: 'wth_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        {
          header: '구분',
          width: 50,
          align: 'center',
          name: 'prj_typ_nm',
          editor: 'text',
        },
        {
          header: '수행지역',
          width: 60,
          align: 'center',
          name: 'prf_ar',
        },
        {
          header: '투입구분',
          width: 100,
          name: 'inp_cls_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000001N
            }
          }
        },
        {
          header: '비고',
          width: 200,
          align: 'center',
          name: 'rmrk',
        },
        {
          header: '철수예정',
          width: 60,
          name: 'wth_sch_yn',
          align: 'center',
          editor : {
            type: 'radio',
            options : {
              listItems : [
                { text: 'Y', value : 'Y'},
                { text: 'N', value : 'N'},
              ]
            }
          },
        },
        {
          header: '부문코드',
          width: 50,
          align: 'center',
          name: 'dept_cd',
          //hidden: true,
        },
        {
          header: '프로젝트ID',
          width: 150,
          align: 'center',
          name: 'prjt_id',
          hidden: true,
        },
        {
          header: '백업ID',
          width: 90,
          name: 'bkup_id',
          hidden : true,
          defaultValue: '0000000000'
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
</style>
