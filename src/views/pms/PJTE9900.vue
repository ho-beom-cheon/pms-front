<template>
  <!-- CONTENTS -->
  <div class="contents">
    <input type="hidden" name="updatedRows" v-model="updatedRows" id="updatedRows">
    <input type="hidden" name="deletedRows" v-model="deletedRows" id="deletedRows">
    <input type="hidden" name="createdRows" v-model="createdRows" id="createdRows">
    <div class="div-img"></div>

    <!-- 컨텐츠 영역 -->
    <div class="kanban-contents-body">
      <!-- 필터영역 -->
      <section class="filter">
        <ul class="filter-con clear-fix">
          <combo
              :comboArray="this.comboList"
              @dept_cd_change="dept_cd_change"
              @bkup_id_change="bkup_id_change"
          ></combo>
          <li class="filter-item">
            <div class="item-con">기준년월
              <input  type="month" style="width: 125px"  v-model="info.week_yymm">
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">연관작업
              <input type="text"
                     placeholder="입력불가"
                     v-model="info.mng_id"
                     style   = "width: 100px; background-color: #f2f2f2"
                     :disabled = true
              >
            </div>
          </li>
        </ul>

        <ul class="filter-btn">
          <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
          <button class="btn btn-filter-b" @click="gridAddRow">행추가</button>
          <button class="btn btn-filter-b" @click="gridDelRow">행삭제</button>
          <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSave">저장</button>
          <button class="btn btn-filter-p" @click="fnSearch">조회</button>
        </ul>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <!-- Modal popup contents -->
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
              @dblclick="dbClick"
              @onGridUpdated="onGridUpdated"
              @beforeExport="beforeExport"
          ></grid>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import Combo from "@/components/Combo"
import {Grid} from '@toast-ui/vue-grid';
import Modal from "@/components/Modal";
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http";

// 부문 코드 (수정필요)
const work_step_cd = [
  { text: '오픈', value: '100' },
  { text: '진행중', value: '200' },
  { text: '중단', value: '300' },
  { text: '완료', value: '400' },
];
// 부문 코드 (수정필요)
const mark = [
  { text: ' ', value: 'NNN' },
  { text: '이슈', value: 'I' },
  { text: '위험', value: 'R' },
];

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    grid: Grid,
    Modal,
  },

  beforeCreate() {

  },
  created() {

  },
  beforeMount() {

  },
  mounted() {
    // 화면 초기화
    this.init();
    // 화면 접속 시 데이터 조회
    this.fnSearch();
  },
  beforeUpdate() {

  },
  updated() {

  },
  beforeDestroy() {

  },
  destroyed() {

  },
// 함수를 선언하는 부분
// "종속대상에 따라 캐싱"된다는 점이 method와는 다른점.
  computed: {},

// 일반적인 함수를 선언하는 부분
  methods: {
    // Combo.vue 에서 받아온 값
    dept_cd_change(params) {
      this.info.dept_cd_selected = params
    },
    bkup_id_change(params) {
      this.info.bkup_id_selected = params
    },


    init() {
      // 그리드 초기화
      this.$refs.grid.invoke("clear");
      // 그리드 전체 비활성화
      this.$refs.grid.invoke("disable");
      // 최초 조회 시 현재 년월 기준 조회 값 세팅
      this.info.week_yymm = this.getCurrentYyyymm()
      // 권한에 따른 컬럼 활성화
      let aut_cd = sessionStorage.getItem("LOGIN_AUT_CD")
      if (aut_cd === '500' || aut_cd === '600') {
        this.$refs.grid.invoke("enableColumn", 'work_task');
        this.$refs.grid.invoke("enableColumn", 'reg_dt');
        this.$refs.grid.invoke("enableColumn", 'com_rgs_dt');
        this.$refs.grid.invoke("enableColumn", 'com_due_dt');
        this.$refs.grid.invoke("enableColumn", 'stop_dt');
        this.$refs.grid.invoke("enableColumn", 're_sta_dt');
        this.$refs.grid.invoke("enableColumn", 'com_dt');
        this.$refs.grid.invoke("enableColumn", 'bak_work_id');
        this.$refs.grid.invoke("enableColumn", 'mark');
      } else {
        this.$refs.grid.invoke("enableColumn", 'com_due_dt');
        this.$refs.grid.invoke("enableColumn", 'stop_dt');
        this.$refs.grid.invoke("enableColumn", 're_sta_dt');
        this.$refs.grid.invoke("enableColumn", 'com_dt');
        this.$refs.grid.invoke("enableColumn", 'bak_work_id');
      }

    },

    // YYYY-MM 형태의 현재 년월을 구하는 함수
    getCurrentYyyymm() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1;

      if(month < 10){
        month = "0"+month;
      }
      return year + '-' + month;
    },
    // YYYYMMDD 형태의 현재 년월일을 구하는 함수
    getCurrentYyyymmdd() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = ("0" + date.getDate()).slice(-2);

      debugger
      if(month < 10){
        month = "0"+month;
      }
      return year + '-' +  month + '-' + day;
    },
    // 저장 버튼
    fnSave() {
      if (this.excelUplod === 'Y') {
        this.gridData = this.$refs.grid.invoke("getData");
        axiosService.post("/PJTE9900/create", {
          excelUplod: this.excelUplod,
          gridData: this.gridData,
          prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
          login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO")
        }).then(res => {
          console.log(res);
          if (res.data) {
          }
        }).catch(e => {
          alert("이미 등록된 프로그램입니다.")
        })
      } else if (this.excelUplod === 'N') {
        // 변경 사항 유무 체크
        if (this.$refs.grid.invoke("isModified") === false) {
          alert("변경된 내용이 없습니다.");
          return;
        }
        // 데이터 로그 확인
        console.log("updatedRows ::", this.$refs.grid.invoke("getModifiedRows").updatedRows);
        console.log("createdRows ::", this.$refs.grid.invoke("getModifiedRows").createdRows);
        console.log("deletedRows ::", this.$refs.grid.invoke("getModifiedRows").deletedRows);

        // 변경 데이터 저장
        this.updatedRows = this.$refs.grid.invoke("getModifiedRows").updatedRows;
        this.deletedRows = this.$refs.grid.invoke("getModifiedRows").deletedRows;
        this.createdRows = this.$refs.grid.invoke("getModifiedRows").createdRows;

        if (this.createdRows.length !== 0) {
          if (this.vaildation(this.createdRows, "1") === true) {
            if (sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600') {
              for (let i = 0; i < this.createdRows.length; i++) {
                if (this.createdRows[i].dvlp_dis_cd === "900") {
                  alert("개발구분 삭제 권한이 없습니다.");
                  return;
                }
              }
            }
            axiosService.post("/PJTE9900/create", {
              excelUplod: this.excelUplod,
              gridData: this.createdRows,
              prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
              login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO")
            }).then(res => {
              console.log(res)
              if (res.data === true) {
                alert("저장이 완료되었습니다.")
              } else {
                alert("이미 등록된 프로그램입니다.")
              }
              this.fnSearch()
            })
          }
          if (this.updatedRows.length !== 0) {
            if (this.vaildation(this.updatedRows, "1") === true) {
              try {
                if (sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600') {
                  for (let i = 0; i < this.updatedRows.length; i++) {
                    if (this.updatedRows[i].dvlp_dis_cd === "900") {
                      alert("삭제 권한이 없습니다.");
                      return;
                    }
                  }
                }
                // 데이터 파라메타 전달
                this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.updatedRows));
                this.$refs.grid.invoke("setRequestParams", this.login);
                // update api 요청
                this.$refs.grid.invoke("request", "updateData", {showConfirm: false});
                alert("저장이 완료되었습니다1111.")
              } catch (e) {
                console.log("업데이트 오류 ::", e);
              }
            } else {
              this.$refs.grid.invoke("reloadData");
            }
          }
          if (this.deletedRows.length !== 0) {
            try {
              // 데이터 파라메타 전달
              this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.deletedRows));
              // delete api 요청
              this.$refs.grid.invoke("request", "deleteData", {showConfirm: false});
              // alert("저장이 완료되었습니다.")
            } catch (e) {
              console.log(e);
            }
          }
        }
        // 저장 후 변경 데이터 배열 비움
        this.$refs.grid.invoke("clearModifiedData")
        this.excelUplod = 'N'
      }
    },

    onGridUpdated(grid) {
      this.$refs.grid.invoke("addColumnClassName", "crpe_nm", "disableColor");
      this.$refs.grid.invoke("addColumnClassName", "rmrk", "disableColor");
      this.addCheak = 'N';
      this.fnStepCheck();
    },
    beforeExport(grid) {
      console.log("beforeExport::", grid)
    },

    // 클릭 이벤트
    onClick(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
      const currentRowData = (this.$refs.grid.invoke("getRow", this.curRow));
      // 그리드 row 클릭 시 연관작업에 바인딩
      if (currentRowData != null) {
        this.info.mng_id = currentRowData.mng_id;
      }

      let gridData = this.$refs.grid.invoke("getData");
      console.log(this.$refs.grid.invoke("getRow", this.curRow));

      const currentCellData = (this.$refs.grid.invoke("getFocusedCell"));

      if (ev.columnName == 'rmrk') {  // 컬럼명이 <비고>일 때만 팝업
        this.modals.txt_modal1 = true;
        this.modalTxt = currentCellData.value;
        const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      }

      if (this.addCheak === 'Y') {
        if (this.curRow === gridData.length - 1) {
          return;
        }
      }
    },

    dbClick(ev) {
      this.curRow = ev.rowKey;
    },
    // 모달창에서 수정버튼 클릭 시 그리드Text 변경
    fnEdit() {
      this.$refs.grid.invoke("setValue", this.curRow, "rmrk", document.getElementById("modalId").value);
      this.modals.txt_modal1 = false;
    },
    // 모달창 닫기
    fnCloseModal() {
      this.modals.txt_modal1 = false;
    },
    //조회
    fnSearch() {
      if (this.searchVaildation() === false) {
        return;
      }
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    // 행추가
    gridAddRow() {
      this.$refs.grid.invoke("setFrozenColumnCount", 0);
      this.addCheak = 'Y';
      this.$refs.grid.invoke("appendRow",
          {
            bzcd: sessionStorage.getItem("LOGIN_BZCD"),
            save_yn: "N", //행르 추가하면 등록여부 'N'
            prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
            bkup_id: "0000000000",
          },
          {focus: true});
      this.fnEnable();
    },
    // 추가한 행 편집 활성화
    fnEnable() {
      this.NewRow = this.$refs.grid.invoke("getRowCount");
      // 새로 ADD한 Row의 등록일을 현재 날짜로 세팅
      this.$refs.grid.invoke("setValue", this.NewRow - 1, "reg_dt", this.getCurrentYyyymmdd());
      // 새로 ADD한 Row의 작업상태를 '100'으로 세팅
      this.$refs.grid.invoke("setValue", this.NewRow - 1, "work_step_cd", '100');
      // // 새로 ADD한 Row의 담당자와 비고 내용 셀 색 변경
      this.$refs.grid.invoke("addColumnClassName", "crpe_nm", "disableColor");
      this.$refs.grid.invoke("addColumnClassName", "rmrk", "disableColor");
      // this.$refs.grid.invoke("enableCell", this.NewRow - 1, "mark");
    },
    // 행삭제
    gridDelRow() {
      if (this.$refs.grid.invoke('getRow', this.curRow).save_yn === "Y") {
        alert("등록된 목록은 삭제불가함. PMS 관리자에게 요청하세요.");
        return;
      }
      this.addCheak = 'N'
      this.$refs.grid.invoke("removeRow", this.curRow, {showConfirm: false});
    },
    // 엑셀 다운로드
    gridExcelExport() {
      this.$refs.grid.invoke("export", "xlsx", {fileName: "엑셀다운로드", useFormattedValue: true, onlySelected: true});
    },

    // 조회 유효값 검사
    searchVaildation() {
      //if(this.bkup_id_selected === null) { alert("백업 ID는 필수 입력 사항입니다"); return false;}
      //if(this.prjt_nm_selected === null) { alert("프로그램 ID는 필수 입력 사항입니다"); return false;}
      return true;
    },
    // 유효값 검증
    // vaildation('검증 랗 데이터', '일반저장(1) | 기타저장(2) 구분')
    vaildation(data, division) {
      for (let i = 0; i < data.length; i++) {
        // 저장과 기타항목수정 분류
        if (division === "1") {

          /* 권한 ID에 따른 처리단계 체크 */
          if (sessionStorage.getItem("LOGIN_AUT_CD") === "100") {        //권한 ID[100:개발자]
            if (data[i].prc_step_cd !== "000" && data[i].prc_step_cd !== "100" && data[i].prc_step_cd !== "200") {
              alert("권한이 부족합니다.")
              return false;
            }
          } else if (sessionStorage.getItem("LOGIN_AUT_CD") === "200") { //권한 ID[200:PL]
            if (data[i].prc_step_cd !== "300") {
              alert("권한이 부족합니다.")
              return false;
            }
          } else if (sessionStorage.getItem("LOGIN_AUT_CD") === "300") { //권한 ID[300:IT]
            if (data[i].prc_step_cd !== "400" && data[i].prc_step_cd !== "600") {
              alert("권한이 부족합니다.")
              return false;
            }
          } else if (sessionStorage.getItem("LOGIN_AUT_CD") === "400") { //권한 ID[400:현업]
            if (data[i].prc_step_cd !== "500" && data[i].prc_step_cd !== "600") {
              alert("권한이 부족합니다.")
              return false;
            }
          }
          //권한ID[500:PM,600:PMO] - 모두 가능
          if (this.addCheak === 'N') {
            if (data[i].atfl_mng_id === null) {
              alert("단위테스트결과서 첨부파일관리ID는 필수 입력 사항입니다");
              return false;
            }
            if (data[i].pal_atfl_mng_id === null) {
              alert("설계서 첨부파일관리ID는 필수 입력 사항입니다");
              return false;
            }
          }
        }
        /* 출력 영역  */
        if (data[i].bzcd === null) {
          alert("업무구분은 필수 입력 사항입니다");
          return false;
        }
        if (data[i].pgm_id === null) {
          alert("프로그램ID는 필수 입력 사항입니다");
          return false;
        }
        if (data[i].pgm_nm === null) {
          alert("프로그램명은 필수 입력 사항입니다");
          return false;
        }
        if (data[i].dvlp_dis_cd === null) {
          alert("개발구분은 필수 입력 사항입니다");
          return false;
        }
        if (data[i].pgm_dis_cd === null) {
          alert("프로그램 구분은 필수 입력 사항입니다");
          return false;
        }
        if (data[i].frcs_sta_dt === null) {
          alert("예상시작일자는 필수 입력 사항입니다");
          return false;
        }
        if (data[i].frcs_end_dt === null) {
          alert("예상종료일자는 필수 입력 사항입니다");
          return false;
        }
        if (data[i].prc_step_cd === null) {
          alert("처리단계는 필수 입력 사항입니다");
          return false;
        }
        if (data[i].dvlpe_no === null) {
          alert("개발자 사번은 필수 입력 사항입니다");
          return false;
        }
        if (data[i].pl_no === null) {
          alert("PL 사번은 필수 입력 사항입니다");
          return false;
        }
        if (data[i].crpe_no === null) {
          alert("담당자 사번은 필수 입력 사항입니다");
          return false;
        }
        if (data[i].bkup_id === null) {
          alert("백업 ID는 필수 입력 사항입니다");
          return false;
        }
        if (data[i].prjt_id === null) {
          alert("프로젝트 ID는 필수 입력 사항입니다");
          return false;
        }


      }
      return true;
    },
  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch: {

  },

// 변수 선언부분
  data() {
    return {

      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList: ["C40", "C27"],

      gridData: [],
      excelUplod: 'N',
      addCheak: 'N',

      atfl_mng_id: '',  // 단위테스트 케이스 첨부파일관리
      atfl_mng_id_yn: '',  // 단위테스트 케이스 첨부파일관리
      pal_atfl_mng_id: '',  // 설계서 첨부파일관리
      pal_atfl_mng_id_yn: '',  // 설계서 첨부파일관리

      info: {
        pgm_id: this.pgm_id,          // 프로그램ID
        pgm_nm: this.pgm_nm,          // 프로그램명
        dvlpe_no: this.dvlpe_no,        // 개발자번호
        dvlpe_nm: this.dvlpe_nm,        // 개발자명
        pl_nm: this.pl_nm,           // 담당PL명
        pl_no: this.pl_no,           // 담당PL번호
        frcs_sta_dt: this.frcs_sta_dt,     // 계획일자STA
        frcs_end_dt: this.frcs_end_dt,     // 계획일자END
        dvlpe_sta_dt: this.dvlpe_sta_dt,    // 실제일자STA
        dvlpe_end_dt: this.dvlpe_end_dt,    // 실제일자END
        atfl_mng_id: this.atfl_mng_id,
        pal_atfl_mng_id: this.pal_atfl_mng_id,

        prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),
        bkup_id_selected: '0000000000',
        bzcd_selected: sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600' ? 'TTT' : sessionStorage.getItem("LOGIN_BZCD"),
        dvlp_dis_cd_selected: 'TTT',
        pgm_dis_cd_selected: 'TTT',
        prc_step_cd_selected: 'TTT',

        reg_dt : '',
        mng_id : this.mng_id,  // 연관작업 ID
        week_yymm : this.week_yymm,  // 기준년월
        work_step_cd : work_step_cd,
        dept_cd_selected : sessionStorage.getItem("LOGIN_DEPT_CD"),
      },
      login: {
        login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),
        login_bzcd: sessionStorage.getItem("LOGIN_BZCD"),
        login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),
        login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
        login_dept_cd: sessionStorage.getItem("LOGIN_DEPT_CD"),
      },


      updatedRows: this.updatedRows,
      deletedRows: this.deletedRows,
      createdRows: this.createdRows,

      /* 그리드 상세보기 모달 속성 */
      modals: {
        txt_modal1: false,
      },
      modalTxt: this.modalTxt,

      /* grid 속성 */
      count: 0,
      curRow: -1,
      title: "",
      scrollX: false,
      scrollY: false,
      bodyHeight: 740,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: false,
      editingEvent: "click",
      // toast ui grid 데이터
      dataSource: {
        api: {
          readData: {url: process.env.VUE_APP_API + '/PJTE9900/select', method: 'GET'},
          createData: {url: process.env.VUE_APP_API + '/PJTE9900/create', method: 'POST'},
          updateData: {url: process.env.VUE_APP_API + '/PJTE9900/update', method: 'PUT'},
          deleteData: {url: process.env.VUE_APP_API + '/PJTE9900/delete', method: 'PUT'},
        },
        initialRequest: false,
        contentType: 'application/json;',
        headers: {'x-custom-header': 'custom-header'},
        withCredentials: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders: ['rowNum'],
      header: {
        height: 55,
        complexColumns: [
          {header: '작업목록(TO-DO)', name: 'mergeColumn1', childNames: ['work_task', 'mng_id', 'reg_nm', 'reg_dt', 'com_rgs_dt', 'work_step_cd']},
          {header: '진행중(In-Progress)', name: 'mergeColumn2', childNames: ['crpe_nm', 'com_due_dt']},
          {header: '중단(Hold)', name: 'mergeColumn3', childNames: ['stop_dt', 're_sta_dt'], headerAlign: 'center'},
          {header: '완료(Done)', name: 'mergeColumn4', childNames: ['com_dt', 'bak_work_id']},
          {header: '비고(Back-Log)', name: 'mergeColumn5', childNames: ['mark', 'rmrk'], headerAlign: 'center'},
        ]
      },
      columns: [
        {
          header: '작업명',
          width: 350,
          align: 'left',
          name: 'work_task',
          whiteSpace: 'normal',
          editor: 'text',
          filter: 'select',
        },
        {
          header: '작업ID',
          width: 95,
          align: 'center',
          name: 'mng_id',
          sortable: true
        },
        {
          header: '등록자',
          width: 95,
          align: 'center',
          name: 'reg_nm',
          filter: 'select',
          defaultValue: sessionStorage.getItem("LOGIN_EMP_NM"),
        },
        {
          header: '등록일',
          width: 95,
          align: 'center',
          type: 'date',
          name: 'reg_dt',
          format: 'yyyy-mm-dd',
          sortable: true,
        },
        {
          header: '완료요청일',
          width: 95,
          align: 'center',
          type: 'date',
          name: 'com_rgs_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true
        },
        {
          header: '작업상태',
          width: 95,
          align: 'center',
          name: 'work_step_cd',
          formatter: 'listItemText',
          type:'text',
          editor: {
            type: 'select',
            options:{
              listItems: work_step_cd
            }
          },
        },
        {
          header: '담당자',
          width: 95,
          align: 'center',
          name: 'crpe_nm',
          editor: 'text',
          filter: 'select'
        },
        {
          header: '참여자',
          width: 95,
          align: 'center',
          name: 'ptcp_nm',
          editor: 'text',
          filter: 'select',
          hidden: true
        },
        {
          header: '완료예정일',
          width: 95,
          align: 'center',
          name: 'com_due_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true
        },
        {
          header: '중단일',
          width: 95,
          align: 'center',
          name: 'stop_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true
        },
        {
          header: '재시작일',
          width: 95,
          align: 'center',
          type: 'date',
          name: 're_sta_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true
        },
        {
          header: '완료일',
          width: 95,
          align: 'center',
          name: 'com_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true
        },
        {
          header: '후속작업',
          name: 'bak_work_id',
          align: 'center',
          width: 95,
          editor: "text",
          sortable: true
        },
        {
          header: 'Mark',
          width: 70,
          align: 'center',
          name: 'mark',
          formatter: 'listItemText',
          type:'text',
          editor: {
            type: 'select',
            options:{
              listItems: mark
            }
          },
        },
        {
          header: '비고내용',
          name: 'rmrk',
          whiteSpace: 'normal',
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
</style>