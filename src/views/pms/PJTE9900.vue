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
              ref="combo1"
          ></combo>
          <li class="filter-item">
            <div class="item-con">기준년월
              <input  type="month" style="width: 125px"  v-model="info.week_yymm">
            </div>
          </li>
        </ul>

        <ul class="filter-btn">
          <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
          <button class="btn btn-filter-b" @click="gridAddRow" :disabled="check_aut_cd">행추가</button>
          <button class="btn btn-filter-b" @click="gridDelRow" :disabled="check_aut_cd">행삭제</button>
          <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSave">저장</button>
          <button class="btn btn-filter-p" @click="fnSearch">조회</button>
        </ul>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <!-- Modal popup contents -->
        <Modal :show.sync="modals.crpe_nm_modal">
          <div class="modal-pop-body">
            <h2>
              담당자 및 참여자
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
            <tr>
              <th>담당자명</th>
              <td colspan="2">
                <input type="text"
                       placeholder="담당자를 입력하세요."
                       v-model="crpenmTxt"
                       style="width: 200px"
                >
              </td>
            </tr>
            <br>
            <tr>
              <th style="vertical-align: middle">
                참여자명
              </th>
              <td colspan="5">
                <textarea
                    cols="95"
                    rows="20"
                    v-model="ptcpnmTxt"
                    style="margin-bottom: 10px; line-height: normal; padding-top: 5px"
                ></textarea>
              </td>
            </tr>
            </tbody>
          </table>
            <div style="float: right">
              <button id="crpenm-edit" class="btn btn-filter-p" style="margin-right: 5px" @click="fnEdit(1)">수정</button>
              <button id="crpenm-close" class="btn btn-filter-b" @click="fnCloseModal(1)">닫기</button>
            </div>
        </Modal>
        <Modal :show.sync="modals.bak_work_modal">
          <div class="modal-pop-body">
            <h2>
              후속작업
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
            <tr>
              <th>작업명</th>
              <td colspan="4">
                <input type="text"
                       placeholder="작업명"
                       v-model="info.work_task"
                       style="width: 260px; margin-right: 40px"
                >
              </td>
              <th>작업ID</th>
              <td colspan="4">
                <input type="text"
                       placeholder="작업ID"
                       v-model="info.mng_id"
                       style="width: calc(100% - 120px); margin-left: 10px"
                >
                <button class="btn btn-filter-p"
                        style="min-width: 80px; margin-left: 20px; float:right"
                        @click="fnBakSearch"
                >조회</button>
              </td>
            </tr>
            <br>
            </tbody>
          </table>
          <div>
            <grid
                ref="grid3"
                :data="dataSource"
                :header="header3"
                :columns="columns3"
                :bodyHeight="300"
                :width="665"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :editingEvent="editingEvent"
                :rowHeight="rowHeight"
                :minRowHeight="minRowHeight"
                :rowHeaders="rowHeaders"
                @onGridUpdated="onGridUpdated"
                @click="onClick3"
                @dblclick="dblClick3"
            ></grid>
          </div>
          <br>
          <br>
          <table>
            <colgroup>
              <col width="60px">
              <col width="*">
              <col width="60px">
              <col width="*">
            </colgroup>
            <tbody>
            <tr>
              <th>현재작업ID</th>
              <td colspan="4">
                <input type="text"
                       v-model="info.current_mng_id"
                       :disabled=true
                       style="width: 260px; margin-right: 25px; background-color: #f2f2f2"
                >
              </td>
              <th>후속작업ID</th>
              <td colspan="4">
                <input type="text"
                       placeholder="현재작업의 후속작업을 선택해주세요."
                       :disabled=true
                       v-model="info.back_work_id"
                       style="width: 260px; margin-left: 5px;"
                >
              </td>
            </tr>
            <br>
            <br>
            </tbody>
          </table>
          <div style="float: right">
            <button id="crpenm-edit2" class="btn btn-filter-p" style="margin-right: 5px" @click="fnEdit(2)">후속작업등록</button>
            <button id="crpenm-close2" class="btn btn-filter-b" @click="fnCloseModal(2)">닫기</button>
          </div>
        </Modal>
      </section>
      <!-- page contents -->
      <section class="page-contents">
        <div class="multiGridWrap-Kanban">
          <div class="div1-Kanban">
            <div>
              <grid
                  ref="grid"
                  :data="dataSource"
                  :header="header"
                  :columns="columns"
                  :bodyHeight="455"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :editingEvent="editingEvent"
                  :rowHeight="rowHeight"
                  :minRowHeight="minRowHeight"
                  :rowHeaders="rowHeaders"
                  @click="onClick"
                  @onGridUpdated="onGridUpdated"
                  @beforeExport="beforeExport"
              ></grid>
            </div>
          </div>
          <div class="div2-Kanban">
            <div class="div-header"><h2>비고(Back-Log)</h2>
              <ul class="filter-btn">
                <button id="backlog-edit" class="btn btn-filter-p" style="margin-right: 5px" @click="fnEdit(3)"  :disabled="btn_yn">수정</button>
              </ul>
            </div>
              <div class="col">
                <ul class="filter-con clear-fix">
                  <li class="filter-item">
                    <div class="item-con">
                    <textarea
                              cols="103"
                              rows="33"
                              id="rmrk"
                              placeholder="비고를 확인 할 작업항목을 선택하세요."
                              v-model="rmrk"
                              style=" margin-left: 10px; height: 206px; width: 732px; border: 1px solid #bdbdbd; line-height: normal"
                    ></textarea>
                    </div>
                  </li>
                </ul>
              </div>
          </div>
          <div class="div3-Kanban">
            <div class="div-header"><h2>연관작업 목록</h2>
              <ul class="filter-btn">
                <button id="con_work_search" class="btn btn-filter-p" style="margin-right: 5px" @click="fnReSearch" :disabled="btn_yn">연관작업 상세조회</button>
              </ul>
            </div>
            <div class="div-grid">
              <grid
                  ref="grid2"
                  :data="dataSource"
                  :header="header2"
                  :columns="columns2"
                  :bodyHeight="175"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :editingEvent="editingEvent"
                  :rowHeight="rowHeight"
                  :minRowHeight="minRowHeight"
                  :rowHeaders="rowHeaders"
                  @onGridUpdated="onGridUpdated"
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

  mounted() {
    // 화면 초기화
    this.init();
    // 화면 접속 시 데이터 조회
    this.fnSearch();
  },

  computed: {},

// 일반적인 함수를 선언하는 부분
  methods: {
    // Combo.vue 에서 받아온 값
    dept_cd_change(params) {
        if(sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600'){
          this.info.dept_cd_selected  = sessionStorage.getItem("LOGIN_DEPT_CD");
          this.$refs.combo1.$data.dept_cd_selected = sessionStorage.getItem('LOGIN_DEPT_CD');
        }else{
          this.info.dept_cd_selected  = params;
        }

    },
    bkup_id_change(params) {
      this.info.bkup_id_selected = params
    },


    init() {
      // 그리드 초기화
      this.$refs.grid.invoke("clear");
      this.$refs.grid2.invoke("clear");
      this.$refs.grid3.invoke("clear");
      // 그리드 전체 비활성화
      this.$refs.grid.invoke("disable");
      this.$refs.grid2.invoke("disable");
      this.$refs.grid3.invoke("disable");
      // 최초 조회 시 현재 년월 기준 조회 값 세팅
      this.info.week_yymm = this.getCurrentYyyymm();
      // 권한에 따른 컬럼 활성화
      let aut_cd = sessionStorage.getItem("LOGIN_AUT_CD")
      if (aut_cd === '500' || aut_cd === '600') {
        this.$refs.grid.invoke("enableColumn", 'work_task');
        this.$refs.grid.invoke("enableColumn", 'reg_dt');
        this.$refs.grid.invoke("enableColumn", 'com_rgs_dt');
        this.$refs.grid.invoke("enableColumn", 'mark');
        this.check_aut_cd = false // 행추가,행삭제 활성화
      } else {
        this.$refs.grid.invoke("enableColumn", 'com_due_dt');
        this.$refs.grid.invoke("enableColumn", 'stop_dt');
        this.$refs.grid.invoke("enableColumn", 're_sta_dt');
        this.$refs.grid.invoke("enableColumn", 'com_dt');
        this.check_aut_cd = true // 행추가,행삭제 비활성화
      }
      // 비고 폰트사이즈
      document.getElementById("rmrk").style.fontSize = '13px';  // 상세내용 확대보기 폰트 사이즈 최초값

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

      if(month < 10){
        month = "0"+month;
      }
      return year + '-' +  month + '-' + day;
    },
    // 저장 버튼
    fnSave() {
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
                  alert("개발구분 삭제 권한이 없습니다.");
                  return;
            }

            axiosService.post("/PJTE9900/create", {
              gridData: this.createdRows,
              dept_cd: this.info.dept_cd_selected,
              bkup_id: this.info.bkup_id_selected,
              prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
              login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),
            }).then(res => {
              console.log(res)
              if (res.data === true) {
                alert("저장이 완료되었습니다.")
              } else {
                alert("이미 등록된 프로그램입니다.")
              }
              // 조회 시 현재 년월 기준 조회 값 세팅
              this.info.week_yymm = this.getCurrentYyyymm();
              this.info.dept_cd_selected = sessionStorage.getItem("LOGIN_DEPT_CD");
              this.fnSearch()
            })
          }
        }
        if (this.updatedRows.length !== 0) {
              try {
                // 데이터 파라메타 전달
                this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.updatedRows));
                this.$refs.grid.invoke("setRequestParams", this.login);
                // update api 요청
                this.$refs.grid.invoke("request", "updateData", {showConfirm: false});
                alert("저장이 완료되었습니다.")
                this.fnSearch()
              } catch (e) {
                console.log("업데이트 오류 ::", e);
              }
        }
        if (this.deletedRows.length !== 0) {
            try {
              // 데이터 파라메타 전달
              this.$refs.grid.invoke("setRequestParams", JSON.stringify(this.deletedRows));
              // delete api 요청
              this.$refs.grid.invoke("request", "deleteData", {showConfirm: false});
              alert("저장이 완료되었습니다.")
            } catch (e) {
              console.log(e);
            }
        }

        // 저장 후 변경 데이터 배열 비움
        this.$refs.grid.invoke("clearModifiedData")
    },

    onGridUpdated(grid) {
      let aut_cd = sessionStorage.getItem("LOGIN_AUT_CD")
      if (aut_cd === '500' || aut_cd === '600') {
        this.$refs.grid.invoke("addColumnClassName", "bak_work_id", "disableColor");
      }
      this.$refs.grid.invoke("addColumnClassName", "crpe_nm", "disableColor");
      this.$refs.grid.invoke("addColumnClassName", "work_step_cd", "lineBorder");
      this.$refs.grid.invoke("addColumnClassName", "com_due_dt", "lineBorder");
      this.$refs.grid.invoke("addColumnClassName", "re_sta_dt", "lineBorder");
      this.addCheak = 'N';

      // 작업 상태에 따라 셀 색상 변경
      let gridRow = '';
      if(grid.instance.store.id == 1) {
        gridRow = this.$refs.grid3.invoke("getRowCount");
        for(let i=0; i<gridRow; i++) {
          if(grid.instance.store.data.rawData[i].work_step_cd === "400" ){  //완료
            this.$refs.grid3.invoke("addCellClassName", grid.instance.store.data.rawData[i].rowKey , "work_step_cd", "comColor");
          } else if(grid.instance.store.data.rawData[i].work_step_cd === "300"){  // 중단
            this.$refs.grid3.invoke("addCellClassName", grid.instance.store.data.rawData[i].rowKey , "work_step_cd", "stopColor");
          } else if(grid.instance.store.data.rawData[i].work_step_cd === "200"){  // 진행중
            this.$refs.grid3.invoke("addCellClassName", grid.instance.store.data.rawData[i].rowKey , "work_step_cd", "inProgressColor");
          }
        }
      } else if(grid.instance.store.id == 2) {
        gridRow = this.$refs.grid.invoke("getRowCount");
        for(let i=0; i<gridRow; i++) {
          if(grid.instance.store.data.rawData[i].work_step_cd === "400" ){  //완료
            this.$refs.grid.invoke("addCellClassName", grid.instance.store.data.rawData[i].rowKey , "work_step_cd", "comColor");
          } else if(grid.instance.store.data.rawData[i].work_step_cd === "300"){  // 중단
            this.$refs.grid.invoke("addCellClassName", grid.instance.store.data.rawData[i].rowKey , "work_step_cd", "stopColor");
          } else if(grid.instance.store.data.rawData[i].work_step_cd === "200"){  // 진행중
            this.$refs.grid.invoke("addCellClassName", grid.instance.store.data.rawData[i].rowKey , "work_step_cd", "inProgressColor");
          }
        }
      } else if(grid.instance.store.id == 3) {
        gridRow = this.$refs.grid2.invoke("getRowCount");
        for(let i=0; i<gridRow; i++) {
          if(grid.instance.store.data.rawData[i].work_step_cd === "400" ){  //완료
            this.$refs.grid2.invoke("addCellClassName", grid.instance.store.data.rawData[i].rowKey , "work_step_cd", "comColor");
          } else if(grid.instance.store.data.rawData[i].work_step_cd === "300"){  // 중단
            this.$refs.grid2.invoke("addCellClassName", grid.instance.store.data.rawData[i].rowKey , "work_step_cd", "stopColor");
          } else if(grid.instance.store.data.rawData[i].work_step_cd === "200"){  // 진행중
            this.$refs.grid2.invoke("addCellClassName", grid.instance.store.data.rawData[i].rowKey , "work_step_cd", "inProgressColor");
          }
        }
      }
    },
    beforeExport(grid) {
      console.log("beforeExport::", grid)
    },

    // 그리드 1 클릭 이벤트
    onClick(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
      if(this.$refs.grid.invoke("getValue", this.curRow, "mng_id")){
        // 수정, 연관작업 상세조회 버튼 활성화
        this.btn_yn = false;
      } else {
        this.btn_yn = true;
      }
      let gridData = this.$refs.grid.invoke("getData");
      // 그리드 Row 클릭 시 비고(Back-Log) 바인딩
      this.rmrk = this.$refs.grid.invoke("getValue", this.curRow, "rmrk");
      const currentCellData = (this.$refs.grid.invoke("getFocusedCell"));

      // 컬럼명이 <담당자>일 때만 모달 팝업
      if (ev.columnName == 'crpe_nm') {
        this.modals.crpe_nm_modal = true;
        this.crpenmTxt = currentCellData.value;
        this.ptcpnmTxt = this.$refs.grid.invoke("getValue", this.curRow, "ptcp_nm");
      }
      // 컬럼명이 <후속작업>일 때만 모달 팝업
      if (ev.columnName == 'bak_work_id') {
        this.info.work_task = '';  // 작업명 초기화
        this.info.mng_id = ''      // 작업ID 초기화
        this.info.current_mng_id = this.$refs.grid.invoke("getValue", this.curRow, "mng_id"); // 현재작업ID 설정
        this.info.back_work_id = ''; // 후속작업ID 초기화
        this.fnBakSearch()
        let aut_cd = sessionStorage.getItem("LOGIN_AUT_CD")
        if (aut_cd === '500' || aut_cd === '600') {  // 권한이 500, 600일 때만 팝업
          this.modals.bak_work_modal = true;
        }
      }

      if (this.addCheak === 'Y') {
        if (this.curRow === gridData.length - 1) {
          return;
        }
      }
      this.info.gubun = "2";
      this.info.con_work_id = this.$refs.grid.invoke("getValue", this.curRow, "con_work_id");
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");
    },
    // 그리드3(후속작업 모달) 클릭 이벤트
    onClick3(ev) {
      this.curRow3 = ev.rowKey;
      this.info.back_work_id = this.$refs.grid3.invoke("getValue", this.curRow3, "mng_id");
    },
    // 그리드3(후속작업 모달) 더블 클릭 이벤트
    dblClick3(ev) {
      this.fnEdit(2);
    },

    // 모달창에서 수정버튼 클릭 시 그리드Text 변경
    fnEdit(num) {
      if(num == 1){ //담당자모달팝업 수정버튼
        this.$refs.grid.invoke("setValue", this.curRow, "crpe_nm", this.crpenmTxt); //담당자설정
        this.$refs.grid.invoke("setValue", this.curRow, "ptcp_nm", this.ptcpnmTxt); //참여자설정
        this.modals.crpe_nm_modal = false; //담당자모달닫기
      }else if(num == 2) { //후소작업모달팝업 수정버튼
        this.$refs.grid.invoke("setValue", this.curRow, "bak_work_id", this.info.back_work_id); // 후속작업설정
        for(let i=0; i<(this.$refs.grid.invoke("getRowCount")); i++) { //연관작업설정
          if(this.$refs.grid.invoke("getValue", i, "mng_id") == this.$refs.grid3.invoke("getValue", this.curRow3, "mng_id")) {
            this.$refs.grid.invoke("setValue", i, "con_work_id", this.$refs.grid.invoke("getValue", this.curRow, "con_work_id"))
          }
        }
        this.modals.bak_work_modal = false; //후속작업모달닫기
      }
    },
    // 모달팝업 닫기
    fnCloseModal(num) {
      if(num == 1){
        this.modals.crpe_nm_modal = false;
      }else if(num == 2) {
        this.modals.bak_work_modal = false;
      }
    },
    //조회
    fnSearch() {
      this.info.gubun = "1";
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
      this.info.week_yymm = this.getCurrentYyyymm();
    },
    //연관작업 상세조회
    fnReSearch() {
      this.info.gubun = "2";
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
      this.info.week_yymm = '';
    },
    //후속작업 조회
    fnBakSearch() {
      this.info.gubun = "3";
      this.info.dept_cd_selected = this.$refs.grid.invoke("getValue", this.curRow, "dept_cd");
      this.$refs.grid3.invoke("setRequestParams", this.info);
      this.$refs.grid3.invoke("readData");
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
    // 유효값 검증
    // vaildation('검증 랗 데이터', '일반저장(1) | 기타저장(2) 구분')
    vaildation(data, division) {
      for (let i = 0; i < data.length; i++) {
        // 저장과 기타항목수정 분류
        if (division === "1") {
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
      addCheak: 'N',

      info: {
        // 조회 변수
        bkup_id_selected  : '0000000000',                                 //백업ID
        prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),   // 프로젝트ID
        dept_cd_selected  : sessionStorage.getItem("LOGIN_DEPT_CD"), //부문코드
        week_yymm         : this.week_yymm,                               //기준년월

        reg_dt : '',                                                      // 등록일
        work_step_cd : work_step_cd,                                      // 작업상태
        con_work_id : '',                                                 // 연관작업
        gubun : '', // 그리드 구분자
        // 후속작업 팝업
        work_task : this.work_task,       // 작업명
        mng_id : this.mng_id,             // 작업ID
        current_mng_id : this.current_mng_id, // 현재작업ID
        back_work_id : this.back_work_id,     // 후속작업ID
      },

      rmrk : '', // 비고

      updatedRows: this.updatedRows,
      deletedRows: this.deletedRows,
      createdRows: this.createdRows,

      modals: {
        crpe_nm_modal: false,   // 담당자, 참여자 모달팝업
        bak_work_modal: false,   // 후속작업 모달팝업
      },
      modalTxt: this.modalTxt,   // 비고
      crpenmTxt: this.crpenmTxt, // 담당자
      ptcpnmTxt: this.ptcpnmTxt, // 참여자
      btn_yn: true,              // 비고, 연관작업 목록 버튼 비활성화/활성화
      check_aut_cd: true,        // 권한에 따른 행추가, 행삭제 버튼 비활성화/활성화

      /* grid 속성 */
      count: 0,
      curRow: -1,
      title: "",
      scrollX: false,
      scrollY: false,
      bodyHeight: 300,
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
        ]
      },
      header2: {
        height: 30,
      },
      header3: {
        height: 30,
      },
      columns: [
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
          header: '작업ID',
          width: 95,
          align: 'center',
          name: 'mng_id',
          sortable: true
        },
        {
          header: '연관작업ID',
          width: 95,
          align: 'center',
          name: 'con_work_id',
          sortable: true,
          hidden: true
        },
        {
          header: '작업명',
          align: 'left',
          name: 'work_task',
          whiteSpace: 'normal',
          editor: 'text',
          filter: 'select',
        },
        {
          header: '등록자',
          width: 105,
          align: 'center',
          name: 'reg_nm',
          filter: 'select',
          defaultValue: sessionStorage.getItem("LOGIN_EMP_NM"),
        },
        {
          header: '등록일',
          width: 105,
          align: 'center',
          type: 'date',
          name: 'reg_dt',
          format: 'yyyy-mm-dd',
          sortable: true,
        },
        {
          header: '완료요청일',
          width: 105,
          align: 'center',
          type: 'date',
          name: 'com_rgs_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true
        },
        {
          header: '작업상태',
          width: 105,
          align: 'center',
          name: 'work_step_cd',
          formatter: 'listItemText',
          type:'text',
          filter: 'select',
          editor: {
            type: 'select',
            options:{
              listItems: work_step_cd
            }
          },
        },
        {
          header: '담당자',
          width: 105,
          align: 'center',
          name: 'crpe_nm',
          editor: 'text',
          filter: 'select'
        },
        {
          header: '참여자',
          width: 105,
          align: 'center',
          name: 'ptcp_nm',
          editor: 'text',
          filter: 'select',
          hidden: true
        },
        {
          header: '완료예정일',
          width: 105,
          align: 'center',
          name: 'com_due_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true
        },
        {
          header: '중단일',
          width: 105,
          align: 'center',
          name: 'stop_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true
        },
        {
          header: '재시작일',
          width: 105,
          align: 'center',
          type: 'date',
          name: 're_sta_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker',
          sortable: true
        },
        {
          header: '완료일',
          width: 105,
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
          header: '비고내용',
          name: 'rmrk',
          whiteSpace: 'normal',
          hidden: true
        },
      ],
      columns2: [
        {
          header: 'Mark',
          width: 50,
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
          header: '작업ID',
          width: 80,
          align: 'center',
          name: 'mng_id',
          sortable: true
        },
        {
          header: '작업명',
          width: 555,
          align: 'left',
          name: 'work_task',
          whiteSpace: 'normal',
          editor: 'text',
          filter: 'select',
        },
        {
          header: '작업상태',
          width: 80,
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
          header: '등록자',
          width: 105,
          align: 'center',
          name: 'reg_nm',
          filter: 'select',
          defaultValue: sessionStorage.getItem("LOGIN_EMP_NM"),
        },
        {
          header: '담당자',
          width: 105,
          align: 'center',
          name: 'crpe_nm',
          editor: 'text',
          filter: 'select'
        },
        {
          header: '후속작업',
          name: 'bak_work_id',
          align: 'center',
          editor: "text",
          sortable: true
        },
      ],
      columns3: [
        {
          header: '작업ID',
          width: 80,
          align: 'center',
          name: 'mng_id',
          sortable: true
        },
        {
          header: '작업명',
          width: 285,
          align: 'left',
          name: 'work_task',
          whiteSpace: 'normal',
          editor: 'text',
        },
        {
          header: '작업상태',
          width: 80,
          align: 'center',
          name: 'work_step_cd',
          formatter: 'listItemText',
          filter: 'select',
          type:'text',
          editor: {
            type: 'select',
            options:{
              listItems: work_step_cd
            }
          },
        },
        {
          header: '등록자',
          align: 'center',
          width: 80,
          name: 'reg_nm',
          filter: 'select',
        },
        {
          header: '담당자',
          align: 'center',
          name: 'crpe_nm',
          editor: 'text',
          filter: 'select'
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
.comColor {
  background: #B7F0B1!important;
}
.stopColor {
  background: #FFC19E!important;
}
.inProgressColor {
  background: #B2EBF4!important;
}
.lineBorder {
  border-right: #aaa solid 1px!important;
}
.modal-dialog {
  max-width: 700px;
  margin: 1.75rem auto !important;
}

</style>