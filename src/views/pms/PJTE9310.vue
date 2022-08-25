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
                @prjt_nm_change="prjt_nm_change"
                @bkup_id_change="bkup_id_change"
                @dept_cd_change="dept_cd_change"
            ></combo>
          </ul>
          <ul class="filter-btn">
            <button class="btn btn-filter-e" id="excelUpBtn">
              <label for="file">엑셀업로드</label>
              <input type="file" id="file"  @change="gridExcelImport"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="display: none;">
            </button>
            <button class="btn btn-filter-e" id="excelDwnBtn" @click="gridExcelExport">엑셀다운로드</button>
<!--            <button class="btn btn-filter-b" id="addRowBtn" @click="gridAddRow">행추가</button>-->
<!--            <button class="btn btn-filter-b" id="delRowBtn" @click="gridDelRow">행삭제</button>-->
            <button class="btn btn-filter-p" @click="fnSearch">조회</button>
          </ul>

          <Modal :show.sync="modals.txt_modal1">
            <div class="modal-pop-body">
              <h2>
                비고상세보기
              </h2>
            </div>
            <hr>
            <table>
              <colgroup>
                <col width="60px">
                <col width="*">
                <col width="60px">
                <col width="*">
              </colgroup>
              <tbody>
              <br>
              <tr>
                <td colspan="5">
                <textarea
                    id="modalId"
                    cols="72"
                    rows="20"
                    v-model="modalTxt"
                    style="margin-bottom: 10px; line-height: normal; padding-top: 5px"
                ></textarea>
                </td>
              </tr>
              </tbody>
            </table>
            <div style="float: right">
              <button id="crpenm-edit" class="btn btn-filter-p" style="margin-right: 5px" @click="fnEdit">수정</button>
              <button id="crpenm-close" class="btn btn-filter-b" @click="fnCloseModal">닫기</button>
            </div>
          </Modal>
          <!-- grid contents -->
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid"
                :data="dataSource"
                :header="header"
                :columns="columns"
                :bodyHeight="bodyHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :editingEvent="editingEvent"
                :rowHeight="rowHeight"
                :minRowHeight="minRowHeight"
                :rowHeaders="rowHeaders"
                @click="onClick"
                @onGridUpdated="onGridUpdated"
            ></grid>
          </div>
          <ul class="filter-btn" style="margin-top: 7px">
            <button class="btn btn-filter-p" id="saveBtn" @click="fnSave" style="margin-left: 20px">저장</button>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import {Grid} from '@toast-ui/vue-grid';
import Combo from "@/components/Combo"
import Modal from "@/components/Modal";
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http"; // Date-picker 스타일적용
import XLSX from "xlsx";
import PmsSideBar from  "@/components/PmsSideBar";

export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    PmsSideBar,
    Modal,
    grid: Grid,
  },
  mounted: function () {
    this.init();
    this.fnSearch();
    window.input_personnel = this;
  },
// 함수를 선언하는 부분
// 일반적인 함수를 선언하는 부분
  methods: {
    // Combo.vue 에서 받아온 값
    prjt_nm_change(params)        {this.info.prjt_nm_selected = params},
    bkup_id_change(params)        {this.info.bkup_id_selected = params},
    dept_cd_change(params)        {this.info.dept_cd_selected = params; this.fnSearch();},

    // 렌더링 중 적용 (mounted와 동일)
    onGridMounted(grid){

    },
    // 렌더링 후 적용됨
    onGridUpdated(grid){
      let gridData = this.$refs.grid.invoke("getData");
      this.$refs.grid.invoke("addColumnClassName", "rmrk", "disableColor");
    },
    fnEdit(){   // 모달창에서 수정버튼 클릭 시 그리드Text 변경
      this.$refs.grid.invoke("setValue", this.curRow, "rmrk", document.getElementById("modalId").value);
      this.modalTxt = document.getElementById("modalId").value;
      // console.log("확인::", document.getElementById("modalId").value);
      // console.log("this.curRow::", this.curRow);
      // console.log("this.modalTxt::", this.modalTxt);
      this.modals.txt_modal1 = false;
    },
    fnCloseModal(){  // 모달창 닫기
      this.modals.txt_modal1 = false;
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

      if(this.excelUplod === 'N') {
        if(this.updatedRows.length !== 0) {
          // 엑셀 업로드는 하지 않았지만 변경한 행이 존재할 때
          this.gridData = this.$refs.grid.invoke("getData");
          if(this.validation(this.gridData) === true) {
            console.log('gridData? > ', this.gridData);
            axiosService.post("/PJTE9310/insert_9310_01", {
              gridData     : this.gridData,
              bkup_id      : this.info.bkup_id_selected,
              dept_cd      : this.info.dept_cd_selected,
              prjt_id      : sessionStorage.getItem("LOGIN_PROJ_ID"),
              login_emp_no : sessionStorage.getItem("LOGIN_EMP_NO")
            }).then(res => {
              console.log(res);
              if (res.data === true) {
                alert("저장이 완료되었습니다.");
                // 저장 후 그리드 Reload
                this.$refs.grid.invoke("reloadData");
                // 저장 후 변경 데이터 배열 비움
                this.$refs.grid.invoke("clearModifiedData");
                this.excelUplod = 'N';
                this.fnSearch();
              } else {
                alert("저장에 실패했습니다.");
              }
            })
          } else {
            return;
          }
        } else {
          // 변경 사항 유무 체크
          if (this.$refs.grid.invoke("isModified") === false) {
            alert("변경된 내용이 없습니다.");
            return;
          }
        }

      } else if(this.excelUplod === 'Y' || this.updatedRows.length !== 0) {
          // 엑셀 업로드나 변경한 행이 존재할 때
          this.gridData = this.$refs.grid.invoke("getData");
          if(this.validation(this.gridData) === true) {
            console.log('gridData? > ', this.gridData);
            axiosService.post("/PJTE9310/insert_9310_01", {
              gridData     : this.gridData,
              bkup_id      : this.info.bkup_id_selected,
              dept_cd      : this.info.dept_cd_selected,
              prjt_id      : sessionStorage.getItem("LOGIN_PROJ_ID"),
              login_emp_no : sessionStorage.getItem("LOGIN_EMP_NO")
            }).then(res => {
              console.log(res);
              if (res.data === true) {
                alert("저장이 완료되었습니다.");
                // 저장 후 그리드 Reload
                this.$refs.grid.invoke("reloadData");
                // 저장 후 변경 데이터 배열 비움
                this.$refs.grid.invoke("clearModifiedData");
                this.excelUplod = 'N';
                this.fnSearch();
              } else {
                alert("저장에 실패했습니다.");
              }
            })
          } else {
            return;
          }
      }
    },
    onClick(ev) {
      console.log("클릭" + ev.rowKey);
      this.curRow = ev.rowKey;
      let gridData = this.$refs.grid.invoke("getRow",this.curRow);
      console.log("클릭 :: ");
      this.upCount = 0;
      this.downCount = 0;

      const currentCellData = (this.$refs.grid.invoke("getFocusedCell"));
      if(ev.columnName == 'rmrk') {  // 컬럼명이 <비고>일 때만 팝업
        this.modals.txt_modal1 = true;
        this.modalTxt = currentCellData.value;
        const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      }
    },
    gridInit() {
      this.$refs.grid.invoke("clear");
    },
    init() {
      if(sessionStorage.getItem("LOGIN_AUT_CD") !== '900'){
        // 엑셀업로드 및 다운로드, 행추가 및 삭제, 저장 버튼 숨기기
        document.getElementById('excelUpBtn').hidden = true;
        document.getElementById('excelDwnBtn').hidden = true;
        document.getElementById('saveBtn').hidden = true;
      }
    },
    fnSearch() {
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    gridAddRow() {
      if(this.autCheck() === false){ return; }  //권한 체크
      this.addCheak = 'Y';
      this.$refs.grid.invoke("appendRow",
          {
            prjt_id : sessionStorage.getItem("LOGIN_PROJ_ID"),
            bkup_id : "0000000000",
            sort    : this.$refs.grid.invoke("getData").length+1,
          },
          {focus:true, at:0});
      let gridData = this.$refs.grid.invoke("getData");
      this.$refs.grid.invoke("addColumnClassName", "rmrk", "disableColor");
    },
    /*gridDelRow() {
      if(this.autCheck() === false){ return; }  //권한 체크
      this.$refs.grid.invoke("removeRow", this.curRow);
    },*/
    excelDateToJSDate(excelDate) {
      /* 엑셀에서 넘어온 숫자형태의 데이터를 날짜형태로 바꿔주는 함수
      ex) 1. 엑셀 파일에서 2021-02 형태로 값을 입력하면 Feb-22 형태의 날짜 데이터가 자동입력됨
          2. gridExcelImport2 함수에서
          XLSX.utils.sheet_to_json(wb.Sheets[sheetName]) 엑셀데이터를 JSON으로 바뀌면서
          Feb-22 의 데이터가 44593 << 숫자형태의 데이터로 바뀜
          3. excelDateToJSDate 함수에서 44593 형태의 데이터를 2021-02 형태의 데이터로 변환
       */
      // if(excelDate != '' && isNaN(excelDate) == false) {
      //   var excelDate2 = excelDate.replaceAll('-','');
      // }

      let date = new Date(Math.round((excelDate - (25567 + 2)) * 86400 * 1000));
      let converted_date = date.toISOString().split('T')[0].substring(0, 12);
      return converted_date;
    },
    gridExcelExport() {
      this.$refs.grid.invoke("export", "xlsx",{fileName: "투입인력현황_"+this.getCurrentYyyymmdd(), useFormattedValue : true});
    },

    getCurrentYyyymmdd() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = ("0" + date.getDate()).slice(-2);

      if(month < 10){
        month = "0"+month;
      }
      return year + '-' +  month + '-' + day;
    },

    gridExcelImport(event) {
      // 엑셀파일 업로드 로직 추가
      console.log(event.target.files[0]);
      this.file = event.target.files ? event.target.files[0] : null;
      let input = event.target;
      let reader = new FileReader();
      reader.onload = () => {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, {type: 'binary'});
        let gridExcelData;

        wb.SheetNames.forEach((sheetName, idx) => {
          if (sheetName === '투입인력현황' || sheetName === 'Sheet1') {
            console.log(wb.Sheets[sheetName]);
            wb.Sheets[sheetName].A1.w = "NO";        // no
            wb.Sheets[sheetName].B1.w = "dept_nm";   // 부문
            wb.Sheets[sheetName].C1.w = "hdq_nm";    // 소속본부
            wb.Sheets[sheetName].D1.w = "tm_nm";     // 소속팀
            wb.Sheets[sheetName].E1.w = "rank_nm";   // 직급
            wb.Sheets[sheetName].F1.w = "empnm";     // 성명
            wb.Sheets[sheetName].G1.w = "empno";     // 직원번호
            wb.Sheets[sheetName].H1.w = "ent_dt";     // 입사일
            wb.Sheets[sheetName].I1.w = "inp_prj_nm";// 투입프로젝트
            wb.Sheets[sheetName].J1.w = "inp_dt";// 투입일
            wb.Sheets[sheetName].K1.w = "wth_dt";// 철수일(예정)
            wb.Sheets[sheetName].L1.w = "prj_typ_nm";// 프로젝트구분명
            wb.Sheets[sheetName].M1.w = "prf_ar";    // 수행지역
            wb.Sheets[sheetName].N1.w = "inp_cls_cd";// 투입구분
            wb.Sheets[sheetName].O1.w = "rmrk";      // 비고
            wb.Sheets[sheetName].P1.w = "wth_sch_yn";// 철수예정

            let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            let rowObj_copy = [];
            for(let n=0; n<rowObj.length; n++){
              if (isNaN(rowObj[n].ent_dt) === false && rowObj[n].ent_dt !== '') {
                rowObj[n].ent_dt = this.excelDateToJSDate(rowObj[n].ent_dt);
              }
              if (isNaN(rowObj[n].inp_dt) === false && rowObj[n].inp_dt !== '') {
                rowObj[n].inp_dt = this.excelDateToJSDate(rowObj[n].inp_dt);
              }
              if (isNaN(rowObj[n].wth_dt) === false && rowObj[n].wth_dt !== '') {
                rowObj[n].wth_dt = this.excelDateToJSDate(rowObj[n].wth_dt);
              }
              rowObj_copy[n] = rowObj[n];
            }
            gridExcelData = JSON.parse(JSON.stringify(rowObj_copy));
            console.log("gridExcelData ::", gridExcelData);
          }
        })
        this.excelUplod = 'Y';
        try {
          this.$refs.grid.invoke('resetData', gridExcelData);
          this.$refs.grid.invoke("setColumnValues", "prjt_id", this.login_proj_id);
          alert('업로드 파일이 적용되었습니다.');
        } catch (e){
          alert('업로드에 실패했습니다.');
        }

      };
      reader.readAsBinaryString(input.files[0]);
      event.target.value = '';
    },
    autCheck() {
      if(sessionStorage.getItem("LOGIN_AUT_CD") !== '900'){
        alert("권한이 부족합니다.");
        return false;
      }
    },
    // 유효값 검증
    validation(data) {
      for(let i=0; i<data.length; i++){
        /* 출력 영역  */
        if(data[i].empno === null)            { alert("직원번호는 필수 입력 사항입니다");    return false;}
      }
      return  true;
    },

  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch: {
  },
// 변수 선언부분
  data() {
    return {
      login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),   // 권한ID
      login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),   // 직원번호
      login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID

      validated : true,
      comboList : ["C27","C40"], //프로젝트 ID, 백업 ID, 부문명(부문코드)
      addCheak            : 'N', // 행추가 체크
      editingEvent        : "click",
      excelUplod          : 'N', // 엑셀 업로드

      info: {
        prjt_nm_selected         : sessionStorage.getItem("LOGIN_PROJ_ID"),
        bkup_id_selected         : '0000000000',
        dept_cd_selected         : 'TTT',                    // 부문명
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
          header: '부문',
          width: 100,
          name: 'dept_nm',
          align: 'left',
          filter: 'select',
        },
        {
          header: '소속본부',
          width: 150,
          name: 'hdq_nm',
          align: 'left',
          filter: 'select',
        },
        {
          header: '소속팀',
          width: 150,
          name: 'tm_nm',
          align: 'left',
          filter: 'select',
        },
        {
          header: '직급/직책',
          width: 100,
          align: 'left',
          name: 'rank_nm',
          filter: 'select',
        },
        {
          header: '성명',
          width: 70,
          align: 'center',
          name: 'empnm',
          filter: 'text',
        },
        {
          header: '번호',
          width: 90,
          align: 'center',
          name: 'empno',
          filter: 'text',
        },
        {
          header: '입사일',
          width: 100,
          align: 'center',
          name: 'ent_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true,
        },
        {
          header: '투입프로젝트',
          width: 350,
          align: 'left',
          name: 'inp_prj_nm',
          filter: 'text',
          editor: 'text',
        },
        {
          header: '투입일',
          width: 100,
          align: 'center',
          name: 'inp_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true,
        },
        {
          header: '철수일(예정)',
          width: 100,
          align: 'center',
          name: 'wth_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          filter: 'text',
        },
        {
          header: '구분',
          width: 50,
          align: 'center',
          name: 'prj_typ_nm',
          filter: 'select',
          editor: 'text',
        },
        {
          header: '수행지역',
          width: 80,
          align: 'center',
          name: 'prf_ar',
          filter: 'select',
          editor: 'text',
        },
        {
          header: '투입구분',
          width: 100,
          name: 'inp_cls_cd',
          align: 'center',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000049N
            }
          },
          filter: 'select',
        },
        {
          header: '비고',
          width: 200,
          align: 'left',
          name: 'rmrk',
          filter: 'text',
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
          width: 80,
          align: 'center',
          name: 'dept_cd',
          hidden: true,
          editor: 'text',
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
.tui-grid-filter-dropdown {
  width : 160px;
}
</style>
