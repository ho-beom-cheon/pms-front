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
        <ul class="filter-btn" style="margin: 5px">
          <button class="btn btn-filter-p" id="saveBtn" @click="fnSave">저장</button>
        </ul>
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
                :rowHeaders="rowHeaders"
                @click="onClick2"
                @onGridUpdated="onGridUpdated"
            ></grid>
          </div>
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
    // 지원 버튼 img
    this.el.src = '/img/ic_new.e2fc07f4.svg';
  }
}
// 그리드 내  커스텀 이미지 버튼을 만들기 위한 클래스 생성
class CustomRenderer2 {
  constructor(props) {
    const el = document.createElement('img');
    el.src = 'some-image-link';
    this.el = el;
    this.render(props);
  }
  getElement() {return this.el;}
  render(props) {
    // 삭제 버튼 img
    this.el.src = '/img/ic_delete.b3711c12.svg';
  }
}

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

    // 렌더링 후 적용됨
    onGridUpdated(grid){
      let gridData = this.$refs.grid.invoke("getData");
      this.$refs.grid.invoke("addColumnClassName", "rmrk", "disableColor");
    },
    fnSave() {
      // 변경 데이터 저장
      this.updatedRows = this.$refs.grid.invoke("getModifiedRows").updatedRows;
      this.deletedRows = this.$refs.grid.invoke("getModifiedRows").deletedRows;
      this.createdRows = this.$refs.grid.invoke("getModifiedRows").createdRows;

      if (confirm("저장하시겠습니까??") === true) {
        // 프로젝트ID가 없으면 INSERT
        if(this.createdRows.length !== 0) {
          axiosService.post("/PJTE9300/insert_9300_01", {
            gridData: this.createdRows,
            login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),
            bkup_id: this.info.bkup_id_selected,
            prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
          }).then(res => {
            if (res.data === true) {
              alert("저장이 완료되었습니다.");
              // 저장 후 그리드 Reload
              this.$refs.grid.invoke("reloadData");
            }
          }).catch(e => {
              alert("저장에 실패하였습니다.");
          });
          //프로젝트ID가 있으면 update
        } else if(this.updatedRows.length !== 0){
          axiosService.put("/PJTE9300/update_9300_01", {
            gridData: this.updatedRows,
            login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),
            bkup_id: this.info.bkup_id_selected,
            prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
          }).then(res => {
            if (res.data === true) {
              alert("저장이 완료되었습니다.");
              // update 후 재조회
              this.$refs.grid.invoke("reloadData");
            }
          }).catch(e => {
            alert("저장에 실패하였습니다.");
          });
        } else {
          alert("변경된 내용이 없습니다");
        }
      } else { //취소
        return false;
      }
     // }
    },
    onClick(ev) {
      debugger
      //console.log("클릭" + ev.rowKey);
      this.curRow = ev.rowKey;
      let gridData = this.$refs.grid.invoke("getData");

      const currentCellData = (this.$refs.grid.invoke("getFocusedCell"));

      if(this.addCheak === 'Y'){
        if(this.curRow === gridData.length-1){
          return;
        }
      }

      if(ev.columnName === 'aplc_dtls_btn'){      //지원
        if(confirm("지원하시겠습니까?")===true) {
          axiosService.put("/PJTE9300/update_9300_02", {
            prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
            real_prjt_id: this.$refs.grid.invoke("getValue", this.curRow, "real_prjt_id"),
            login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),
            login_emp_nm: sessionStorage.getItem("LOGIN_EMP_NM"),
            sqno: this.$refs.grid.invoke("getValue", this.curRow, "sqno"),
          }).then(res => { // 리턴값
            if (res.status == 200) {
              alert("지원 완료되었습니다.");
              12
              this.fnSearch()
            }
          }).catch(e => {  //오류
            alert("지원 실패.");
          });
        }
      }
      if(ev.columnName === 'del_btn'){
/*      console.log("클릭:" + ev.rowKey);
        console.log("real_prjt_id:" + this.$refs.grid.invoke("getValue", this.curRow, "real_prjt_id"));
        console.log("prjt_id:" + sessionStorage.getItem("LOGIN_PROJ_ID"));
        console.log("sqno:" + this.$refs.grid.invoke("getValue", this.curRow, "sqno"));
*/
        if(confirm("삭제하시겠습니까?") === true) {
          axiosService.put("/PJTE9300/update_9300_03", {
            prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),   //삭제
            real_prjt_id: this.$refs.grid.invoke("getValue", this.curRow, "real_prjt_id"),
            sqno: this.$refs.grid.invoke("getValue", this.curRow, "sqno"),
          }).then(res => { // 리턴값
            if (res.status == 200) {
              alert("삭제 완료되었습니다.");
              this.fnSearch()
            }
          }).catch(e => {  //오류
            alert("삭제 실패.");

          });
        }
      }
    },
    // 그리드 2,3 클릭 이벤트
    onClick2(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
    },
/*    gridInit() {
      this.$refs.grid.invoke("clear");
    },
*/
    init() {
      if(sessionStorage.getItem("LOGIN_AUT_CD") !== '900'){
        //  저장 버튼 숨기기
        document.getElementById('saveBtn').hidden = true;
      }
    },
    fnSearch() {
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");
      // 버튼 비활성화/활성화 - 권한, 백업ID에 따라
      if(this.info.bkup_id_selected == '0000000000') {
        this.check_save = false // 저장 활성화
        if(sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600' || sessionStorage.getItem("LOGIN_AUT_CD") === '900') {
          this.check_aut_cd = false // 행추가, 행삭제  활성화
        }
      } else {
        this.check_save = true // 저장  비활성화
        this.check_aut_cd = true // 행추가, 행삭제  비활성화
      }
    },
    //행추가
    gridAddRow() {
      debugger
      let aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      this.$refs.grid.invoke("setFrozenColumnCount", 0);
      if (aut_cd === '500' || aut_cd === '600' || aut_cd === '900' ) {
        this.addCheak = 'Y';
        this.$refs.grid.invoke("appendRow",
            {
              save_yn: "N", //행르 추가하면 등록여부 'N'
              prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
              bkup_id: "0000000000",
            },
            {focus: true}); //, at: 0  내림차순되게함
      } else {
        alert('행추가 권한이 없습니다.');
      }
      this.fnEnable();
    },
    // 추가한 행 편집 활성화
    fnEnable() {

      // 새로 ADD한 Row를 enable시킴
      this.NewRow = this.$refs.grid.invoke("getRowCount");
      this.$refs.grid.invoke("enableRow", this.NewRow-1);
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "aplc_dtls_btn");
      this.$refs.grid.invoke("disableCell", this.NewRow-1, "del_btn");
    },
    //행삭제
    gridDelRow() {
      let aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      if (aut_cd === '500' || aut_cd === '600' || aut_cd === '900' ) {
        this.addCheak = 'N'
        this.$refs.grid.invoke("removeRow", this.curRow, {showConfirm: false});
      } else {
        alert('행삭제 권한이 없습니다.');
      }
    },
    // YYYYMMDD 형태의 현재 년월일을 구하는 함수
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
  },
// 변수 선언부분
  data() {
    return {
      login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),   // 권한ID
      login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID
      validated : true,
      comboList : ["C27","C0"], //프로젝트 ID, 백업 ID
      addCheak            : 'N', // 행추가 체크
      editingEvent        : "click",
      info: {
        prjt_nm_selected : sessionStorage.getItem("LOGIN_PROJ_ID"),
        bkup_id_selected : '0000000000',
        bkup_id : '',       //백업
        prjt_id : '',       //프로젝트 ID
        real_prjt_id: '',   //투입프로젝트명
        sqno : '',          //순번

        sch_ent_dt : '',    //투입예정일자
        skill_grd : '',     //등급
        main_skill : '',    //필요기술
        duty_txt : '',      //필요업무
        oth_cnt : '',       //기타내용
        nmbr_rcrt : '',     //모집인원
        aplc_dtls : '',     //지원자내용
        del_yn : '',        //
        opr_no : '',			  // 등록직원번호
        db_chg_ts : '',		  // DB변경일시
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
          updateData : { url: process.env.VUE_APP_API + '/PJTE9300/update_9300_02', method: 'PUT'},
          deleteData : { url: process.env.VUE_APP_API + '/PJTE9300/update_9300_03', method: 'PUT'},
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
          formatter: 'listItemText',
          disabled: true,
          editor : {
            type : 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000038
            }
          }
        },
        {
          header: '투입예정일자',
          width: 110,
          name: 'sch_ent_dt',
          align: 'center',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
        },
        {
          header: '등급',
          width: 70,
          name: 'skill_grd',
          align: 'center',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000042
            }
          }
          // filter: 'select',
        },
        {
          header: '요청기술',
          width: 100,
          align: 'left',
          name: 'main_skill',
          editor: 'text',
        },
        {
          header: '요청업무',
          // width: 250,
          align: 'left',
          name: 'duty_txt',
          editor: 'text',
        },
        {
          header: '기타내용',
          width: 100,
          align: 'left',
          name: 'oth_cnt',
          editor: 'text',
        },
        {
          header: '요청인원',
          width: 80,
          align: 'right',
          name: 'nmbr_rcrt',
          editor: 'text',
        },
        {
          header: '등록자',
          width: 90,
          align: 'center',
          name: 'opr_nm',
          // editor: 'text',
        },
        {
          header: '지원자내용',
          width: 90,
          align: 'left',
          name: 'aplc_dtls',
          // editor: 'text',
        },
        {
          header: '지원',
          width: 50,
          align: 'center',
          name: 'aplc_dtls_btn',
          renderer: CustomRenderer,
        },
        {
          header: '삭제',
          width: 50,
          align: 'center',
          name: 'del_btn',
          renderer: CustomRenderer2,
          // filter: 'text',
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
        {
          header: '순번',
          width: 90,
          name: 'sqno',
          hidden : true,
          defaultValue: '0000000000'
        },
        {
          header: '등록직원번호',
          width: 90,
          name: 'opr_no',
          hidden : true,
          defaultValue: '0000000000'
        },
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
