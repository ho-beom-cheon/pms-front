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
            ></combo>
          </ul>
          <ul class="filter-btn">
            <!--            <button class="btn btn-filter-b" id="addRowBtn" @click="gridAddRow">행추가</button>-->
            <!--            <button class="btn btn-filter-b" id="delRowBtn" @click="gridDelRow">행삭제</button>-->
            <button class="btn btn-filter-p" @click="fnSearch">조회</button>
          </ul>
        </div>
      </section>
      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box" style="height: 350px">
          <div class="div-header"><h2>요청인력내역</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-b" id="addRowBtn" @click="gridAddRow">행추가</button>
              <button class="btn btn-filter-b" id="delRowBtn" @click="gridDelRow">행삭제</button>
            </ul>
          </div>
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
        </div>

        <div class="grid1-box" style="height: 350px">
          <div class="div-header"><h2>대기인력내역</h2>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid2"
                :data="dataSource2"
                :header="header"
                :columns="columns2"
                :bodyHeight="bodyHeight"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :editingEvent="editingEvent"
                :columnOptions="columnOptions"
                :rowHeight="rowHeight"
                @click="onClick2"
            ></grid>
          </div>
        </div>
        <ul class="filter-btn" style="margin-top: 7px">
          <button class="btn btn-filter-p" id="saveBtn" @click="fnSave">저장</button>
        </ul>
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
    // 그리드 2,3 클릭 이벤트
    onClick2(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
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
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");
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
    gridDelRow() {
      if(this.autCheck() === false){ return; }  //권한 체크
      this.$refs.grid.invoke("removeRow", this.curRow);
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

// 변수 선언부분
  data() {
    return {
      login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),   // 권한ID
      login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),   // 직원번호
      login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID

      validated : true,
      comboList : ["C27","C0"], //프로젝트 ID, 백업 ID, 부문명(부문코드)
      addCheak            : 'N', // 행추가 체크
      editingEvent        : "click",

      info: {
        prjt_nm_selected         : sessionStorage.getItem("LOGIN_PROJ_ID"),
        bkup_id_selected         : '0000000000',
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
      bodyHeight: 280,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: false,
      open: false,
      //draggable: true,
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9300/select_9300_01', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE9300/insert_9300_01', method: 'POST'},
          deleteData : { url: process.env.VUE_APP_API + '/PJTE9300/delete_9300_01', method: 'PUT'},
        },
        initialRequest: false,
        contentType : 'application/json;',
        headers : {  'x-custom-header' : 'custom-header'  },
        withCredentials: false,
      },
      dataSource2: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9300/select_9300_02', method: 'GET' },
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
          header: '프로젝트명',
          width: 350,
          name: 'real_prjt_id',
          align: 'left',
        },
        {
          header: '투입예정일자',
          width: 100,
          name: 'sch_ent_dt',
          align: 'center',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
        },
        {
          header: '등급',
          width: 90,
          name: 'skill_grd',
          align: 'left',
          // filter: 'select',
        },
        {
          header: '요청기술',
          width: 100,
          align: 'left',
          name: 'main_skill',
        },
        {
          header: '요청업무',
          // width: 350,
          align: 'left',
          name: 'duty_txt',
        },
        {
          header: '기타내용',
          width: 150,
          align: 'left',
          name: 'oth_cnt',
        },
        {
          header: '요청인원',
          width: 80,
          align: 'right',
          name: 'nmbr_rcrt',
        },
        {
          header: '등록자',
          width: 90,
          align: 'center',
          name: 'opr_nm',
          editor: 'text',
        },
        {
          header: '지원',
          width: 50,
          align: 'center',
          name: 'aplc_dtls',
        },
        {
          header: '삭제',
          width: 50,
          align: 'center',
          name: 'wth_dt',
          // filter: 'text',
        },
       /* {
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
        },*/
      ],
      columns2: [
        {
          header: '직원명',
          width: 90,
          align: 'center',
          name: 'empnm',
          editor: 'text',
        },
        {
          header: '주요기술',
          width: 350,
          align: 'center',
          name: 'main_skill',
        },
        {
          header: '주요업무',
          width: 350,
          align: 'center',
          name: 'duty_txt',
        },
        {
          header: '등급',
          width: 90,
          align: 'left',
          name: 'skill_grd_nm',
        },
        {
          header: '현/이전프로젝트',
          minWidth: 250,
          align: 'left',
          name: 'inp_prj_nm',
          editor: 'text',
        },
        {
          header: '차기희망프로젝트 및 업무',
          minWidth: 350,
          align: 'center',
          name: 'nxt_prj_nm',
          editor: 'text',
        },
        {
          header: '철수예정일',
          minWidth: 120,
          align: 'center',
          name: 'wth_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
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
.tui-grid-filter-dropdown {
  width : 160px;
}
</style>
