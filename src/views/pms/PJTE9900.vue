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
              @bkup_id_change="bkup_id_change"
              @prjt_nm_chage="prjt_nm_chage"
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
                     v-model="info.pgm_id"
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
import XLSX from "xlsx";
import PmsSideBar from "@/components/PmsSideBar";
import WindowPopup from "./PJTE3001.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http";

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
    bkup_id_change(params) {
      this.info.bkup_id_selected = params
    },
    prjt_nm_chage(params) {
      this.info.prjt_nm_selected = params
    },

    init() {
      // 그리드 초기화
      this.$refs.grid.invoke("clear");

      if (sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600') {
        // 특정 열 비활성화
        this.$refs.grid.invoke("disableColumn", 'pgm_nm');
        this.$refs.grid.invoke("disableColumn", 'pgm_id');
      }

    },
    // 저장 버튼
    fnSave() {
      if (this.excelUplod === 'Y') {
        this.gridData = this.$refs.grid.invoke("getData");
        axiosService.post("/PJTE2100/create", {
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
            axiosService.post("/PJTE2100/create", {
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
      this.addCheak = 'N';

    },
    beforeExport(grid) {
      console.log("beforeExport::", grid)
    },

    // 클릭 이벤트
    onClick(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
      let gridRow = this.$refs.grid.invoke("getRow", this.curRow);
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
      // 새로 ADD한 Row를 enable시킴
      this.NewRow = this.$refs.grid.invoke("getRowCount");
      this.$refs.grid.invoke("enableRow", this.NewRow - 1);
      this.$refs.grid.invoke("enableCell", this.NewRow - 1, "pgm_id");
      this.$refs.grid.invoke("disableCell", this.NewRow - 1, "pal_atfl_mng_id_yn");
      this.$refs.grid.invoke("disableCell", this.NewRow - 1, "atfl_mng_id_yn");
      this.$refs.grid.invoke("disableCell", this.NewRow - 1, "err_btn");
      this.$refs.grid.invoke("disableCell", this.NewRow - 1, "sta_dt");
      this.$refs.grid.invoke("disableCell", this.NewRow - 1, "end_dt");
      this.$refs.grid.invoke("disableCell", this.NewRow - 1, "dvlpe_cnf_dt");
      this.$refs.grid.invoke("disableCell", this.NewRow - 1, "pl_cnf_dt");
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
      comboList: ["C27", "C0"],

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
      },
      login: {
        login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),
        login_bzcd: sessionStorage.getItem("LOGIN_BZCD"),
        login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),
        login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
      },

      updatedRows: this.updatedRows,
      deletedRows: this.deletedRows,
      createdRows: this.createdRows,

      // 메뉴 리스트 (추후 공통 작업 필요)
      menu_list: [
        {id: 'PJTE1000', path: '/PJTE1000', name: 'ProjectEyes현황'},
        {id: 'PJTE2100', path: '/PJTE2100', name: '개발현황'},
        {id: 'PJTE2110', path: '/PJTE2110', name: '개발진척현황'},
        {id: 'PJTE2200', path: '/PJTE2200', name: '통합테스트'},
        {id: 'PJTE2210', path: '/PJTE2210', name: '통합테스트진척현황'},
        {id: 'PJTE3000', path: '/PJTE3000', name: '결함관리'},
        {id: 'PJTE4000', path: '/PJTE4000', name: 'ActionItem및이슈관리현황'},
        {id: 'PJTE5000', path: '/PJTE5000', name: 'WBS관리'},
        {id: 'PJTE6000', path: '/PJTE6000', name: 'PMS신청관리'},
        {id: 'PJTE7000', path: '/PJTE7000', name: '산출물정합성체크'},
        {id: 'PJTE9000', path: '/PJTE9000', name: '시스템관리'},
      ],
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
          readData: {url: process.env.VUE_APP_API + '/PJTE2100/select', method: 'GET'},
          createData: {url: process.env.VUE_APP_API + '/PJTE2100/create', method: 'POST'},
          updateData: {url: process.env.VUE_APP_API + '/PJTE2100/update', method: 'PUT'},
          deleteData: {url: process.env.VUE_APP_API + '/PJTE2100/delete', method: 'PUT'},
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
          {header: '작업목록(TO-DO)', name: 'mergeColumn1', childNames: ['pgm_nm', 'pgm_id', 'pl_nm', 'frcs_sta_dt', 'frcs_end_dt']},
          {header: '진행중(In-Progress)', name: 'mergeColumn2', childNames: ['dvlpe_enm', 'if_end_dt']},
          {header: '중단(Hold)', name: 'mergeColumn3', childNames: ['stop_sta_dt', 'stop_end_dt'], headerAlign: 'center'},
          {header: '완료(Done)', name: 'mergeColumn4', childNames: ['end_dt', 'next_no']},
          {header: '비고(Back-Log)', name: 'mergeColumn5', childNames: ['mark', 'rmrk'], headerAlign: 'center'},
        ]
      },
      columns: [
        {
          header: '작업명',
          width: 350,
          align: 'left',
          name: 'pgm_nm',
          whiteSpace: 'normal',
          editor: 'text',
          filter: 'select',
        },
        {
          header: '작업ID',
          width: 95,
          align: 'center',
          name: 'pgm_id',
          editor: 'text',
          sortable: true
        },
        {
          header: '등록자',
          width: 95,
          align: 'center',
          name: 'pl_nm',
          editor: 'text',
          filter: 'select'
        },
        {
          header: '등록일',
          width: 95,
          align: 'center',
          name: 'frcs_sta_dt',
          format: 'yyyy-mm-dd',
          sortable: true
        },
        {
          header: '완료요청일',
          width: 95,
          align: 'center',
          name: 'frcs_end_dt',
          format: 'yyyy-mm-dd',
          sortable: true
        },
        {
          header: '담당자',
          width: 95,
          align: 'center',
          name: 'dvlpe_enm',
          editor: 'text',
          filter: 'select'
        },
        {
          header: '완료예정일',
          width: 95,
          align: 'center',
          name: 'if_end_dt',
          format: 'yyyy-mm-dd',
          sortable: true
        },
        {
          header: '중단일',
          width: 95,
          align: 'center',
          name: 'stop_sta_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true
        },
        {
          header: '재시작일',
          width: 95,
          align: 'center',
          type: 'date',
          name: 'stop_end_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true
        },
        {
          header: '완료일',
          width: 95,
          align: 'center',
          name: 'end_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true
        },
        {
          header: '후속작업',
          name: 'next_no',
          width: 95,
          editor: "text",
          sortable: true
        },
        {
          header: 'Mark',
          width: 70,
          align: 'center',
          name: 'mark',
          filter: 'select'
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
</style>