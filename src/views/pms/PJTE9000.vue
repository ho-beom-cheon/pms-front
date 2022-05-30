<template>
  <!-- CONTENTS1 -->
  <div class="contents">

    <!-- ASIDE -- LNB -->
    <PmsSideBar></PmsSideBar>
    <!-- 컨텐츠 영역 -->
    <div class="contents-body">
      <!-- page contents -->
      <section class="page-contents">
        <div class="multiGridWrap-c">
          <div class="div0-c">
            <div class="div1-c">
              <div class="div1-1-c">
                <section class="filter">
                  <ul class="filter-con clear-fix">
                    <combo
                        :comboArray = "this.comboList"
                        @bkup_id_change="bkup_id_change"
                        @prjt_nm_chage="prjt_nm_chage"
                    ></combo>
                    <button class="btn btn-filter-p" style = "margin-top: 5px;" @click="fnSearchRe">
                      <a href="#" >재조회</a>
                    </button>
                    <button class="btn btn-filter-p" style = "margin-top: 5px; margin-left: 5px" @click="tableBackUp" :disabled="aut_cd_check2">
                      <a href="#" >테이블백업</a>
                    </button>

                    &nbsp;
                    <a style="margin-left: 20px; margin-right: 5px">생성프로젝트코드</a><input v-model="info.new_prjt_id" placeholder="신규프로젝트번호" type="text"/>
                    <button class="btn btn-filter-p" style = " margin-left: 5px" @click="copyProject" :disabled="aut_cd_check">
                      <a href="#" >프로젝트기본정보복사</a>
                    </button>
                  </ul>

                </section>
                <div class="div-grid-c">
                </div>
                <ul class="filter-btn" style="margin-top: 25px">
                  <button class="btn btn-filter-d" @click="formDownload">양식다운로드ⓘ</button>
                  <button class="btn btn-filter-e" :disabled="aut_cd_check2">
                    <label for="file">엑셀업로드</label>
                    <input type="file" id="file"  @change="gridExcelImport" accept=".xlsx, .xls" style="display: none;"/>
                  </button>
                  <button class="btn btn-filter-e" @click="gridExcelExport">
                    <a href="#" >엑셀다운로드</a>
                  </button>
                  <button class="btn btn-filter-b" style = "margin-left: 20px;" @click="gridAddRow(1)" :disabled="aut_cd_check2">
                    <a href="#"  >행추가</a>
                  </button>
                  <button class="btn btn-filter-b" @click="gridDelRow(1)" :disabled="aut_cd_check2">
                    <a href="#" >행삭제</a>
                  </button>
                  <button class="btn btn-filter-p" style = "margin-left: 20px; background-color: #9FC93C" @click="loginChange" v-if="!aut_cd_check">
                    <a href="#" >로그인변경</a>
                  </button>
                  <button class="btn btn-filter-p" style = "margin-left: 20px" @click="fnSave(1)" :disabled="aut_cd_check2">
                    <a href="#" >저장</a>
                  </button>
                </ul>
              </div>
              <div class="div1-2-c">
                <div class="div-grid-c">
                  <grid
                      ref="grid1"
                      :data="dataSource"
                      :header="header"
                      :columns="columns1"
                      :bodyHeight="150"
                      :showDummyRows="showDummyRows"
                      :columnOptions="columnOptions"
                      :rowHeight="rowHeight"
                      :minRowHeight="minRowHeight"
                      :editingEvent="editingEvent"
                      @click="onClick($event, 1)"
                  ></grid>
                </div>
              </div>
            </div>
            <div class="div2-c">
              <div class="div2-1-c">
                <section class="filter" style="padding: 0px">
                  <ul class="filter-con clear-fix">
                    <li class="filter-item">
                      <div class="item-con">신규생성년도
                        <input type="text"
                               placeholder="입력"
                               v-model="info.new_yyyy"
                               style   = "width: 150px;"
                        >
                      </div>
                    </li>
                  </ul>
                  <ul class="filter-btn">
                    <button class="btn btn-filter-p" style = "margin-bottom: 5px" @click="createNewYear" :disabled="aut_cd_check">
                      <a href="#" >생성</a>
                    </button>
                  </ul>
                  <ul class="filter-con clear-fix">
                    <li class="filter-item">
                      <div class="item-con">조회년월일<label title="ex) yyyy, yyyymm, yyyymmdd" style="color: red">?</label>
                        <input type="text"
                               placeholder="입력"
                               v-model="info.sel_yyyymmdd"
                               style   = "width: 150px; margin-left: 11px"
                        >
                      </div>
                    </li>
                  </ul>
                  <ul class="filter-btn">
                    <button class="btn btn-filter-p" style = "margin-bottom: 5px" @click="dateSearch">
                      <a href="#" >조회</a>
                    </button>
                  </ul>
                </section>
                <ul class="filter-btn" style="margin-bottom: 8px; margin-top: 10px">
                  <button class="btn btn-filter-p" style = "margin-left: 20px" :disabled="aut_cd_check2" @click="fnSave(4)">
                    <a href="#">저장</a>
                  </button>
                </ul>
              </div>
              <div class="div2-2-c">
                <div class="div-grid-c">
                  <grid
                      ref="grid4"
                      :data="dataSource4"
                      :header="header"
                      :columns="columns4"
                      :bodyHeight="150"
                      :showDummyRows="showDummyRows"
                      :columnOptions="columnOptions"
                      :rowHeight="rowHeight"
                      :minRowHeight="minRowHeight"
                      :editingEvent="editingEvent"
                      @click="onClick"
                  ></grid>
                </div>
              </div>
            </div>
          </div>
          <div class="div3-c">
            <div class="div-header-c"><h2>코드유형</h2>
              <ul class="filter-btn">
                <button class="btn btn-filter-b" @click="gridAddRow(2)" :disabled="aut_cd_check">
                  <a href="#" >행추가</a>
                </button>
                <button class="btn btn-filter-b" @click="gridDelRow(2)" :disabled="aut_cd_check">
                  <a href="#" >행삭제</a>
                </button>
                <button class="btn btn-filter-p" style = "margin-left: 20px" @click="fnSave(2)" :disabled="aut_cd_check">
                  <a href="#" >저장</a>
                </button>
              </ul>
            </div>
            <div class="div-grid-c">
              <grid
                  ref="grid2"
                  :data="dataSource2"
                  :header="header"
                  :columns="columns2"
                  :bodyHeight="235"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  :minRowHeight="minRowHeight"
                  :rowHeaders="rowHeaders"
                  :editingEvent="editingEvent"
                  @click="onClick($event, 2)"
              ></grid>
            </div>
          </div>
          <div class="div4-c">
            <div class="div-header-c">
              <h2 v-if="grp_tymm">{{ grp_tymm }}</h2>
              <h2 v-else>코드상세</h2>
              <ul class="filter-btn">
                <button class="btn btn-filter-b" @click="gridAddRow(3)" :disabled="aut_cd_check">
                  <a href="#" >행추가</a>
                </button>
                <button class="btn btn-filter-b" @click="gridDelRow(3)" :disabled="aut_cd_check">
                  <a href="#" >행삭제</a>
                </button>
                <button class="btn btn-filter-p" style = "margin-left: 20px" @click="fnSave(3)" :disabled="aut_cd_check">
                  <a href="#" >저장</a>
                </button>
              </ul>
            </div>
            <div class="div-grid-c">
              <grid
                  ref="grid3"
                  :data="dataSource3"
                  :header="header"
                  :columns="columns3"
                  :bodyHeight="bodyHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  :minRowHeight="25"
                  :rowHeaders="rowHeaders"
                  :editingEvent="editingEvent"
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
window.fileData = (fileLists) => {
  console.log(fileLists)
}
import '/node_modules/tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';
import WindowPopup from "./PJTE3001.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
import {axiosService} from "@/api/http";
import combo from '@/components/Combo';
import XLSX from "xlsx";
import PmsSideBar from  "@/components/PmsSideBar";

const storage = window.sessionStorage;



export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    grid: Grid,
    combo,
    PmsSideBar,
  },

  // 그리드 1,2,3 순서대로 조회 하기 위해 async await 사용
  async mounted() {
    if(sessionStorage.getItem("LOGIN_AUT_CD") === '900'){
      this.aut_cd_check = false
      this.aut_cd_check2 = false
    }
    if(sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600'){
      this.aut_cd_check2 = false
    }
    await this.fnSearch();
    await this.fnSearchCode();
  },
// 일반적인 함수를 선언하는 부분
  methods: {
    copyProject() {
      if(this.info.new_prjt_id ==='' || this.info.new_prjt_id===undefined || this.info.new_prjt_id==null){
        alert('신규프로젝트번호를 입력해야 합니다.');
        return false
      }
      // 신규 프로젝트 추가시 코드정보 신규프로젝트로 데이터 복사
      try{
        axiosService.post('/PJTE9000/create_new_project_data', {
          new_prjt_id : this.info.new_prjt_id,
          login_emp_no : this.info.login_emp_no,
          prjt_id : this.info.prjt_nm_selected
        })
            .then(res => {
              console.log(res.data)
              alert("복사가 완료되었습니다.")
            })
      }catch(e) {
        console.log(e)
      }
    },
    // 재조회 async await 사용하여 그리드 1,2,3 순서대로 조회
    async fnSearchRe() {
      this.info.grid_num = 1
      await this.fnSearch();
      await this.fnSearchCode()
    },
    // 테이블 백업
    tableBackUp() {
      axiosService.get("/PJTE9000/backup_select")
          .then(res => {
            this.info.new_bkup_id = res.data.data.contents[0].new_bkup_id
            this.info.new_bkup_nm = res.data.data.contents[0].new_bkup_nm
            if(res.data.data.contents.length){
              axiosService.post("/PJTE9000/backup_update", {
                new_bkup_id : this.info.new_bkup_id,
                new_bkup_nm : this.info.new_bkup_nm,
                prjt_id : this.info.prjt_nm_selected,
                login_emp_no : this.info.login_emp_no
              }).then(res => {
                if (res.status == 200) {
                  alert("테이블백업이 완료되었습니다.");
                }
              })
            }
          })
          .catch(e => {
            console.log(e)
          })
    },
    // 로그인 변경
    loginChange() {
      if(confirm("로그인변경시 저장하지 않은 수정데이터는 저장되지 않습니다.")){
        this.sessionClear();
        axiosService.post("/user/signin", {
          userId: this.changeUserId,
          password: this.changeUserPassword,
          pjt_selected: this.changeUserPrjtId,
        })
            .then(res => {
              if (res.data.status) {
                this.message = res.data.data[0].empnm + "로 로그인 되었습니다.";

                // this.setInfo(
                //     "성공",
                //     res.data.auth_token,
                //     JSON.stringify(res.data.data)
                // );
                if (res.data.data[0].login_yn === "Y") {


                  /* 세션 스토리지 값 저장 */
                  storage.setItem("jwt-auth-token", res.data.auth_token);       // 인증토큰
                  storage.setItem("LOGIN_EMP_NO", res.data.data[0].empno);             // 직원번호
                  storage.setItem("LOGIN_EMP_NM", res.data.data[0].empnm);             // 직원명
                  storage.setItem("LOGIN_PROJ_ID", res.data.data[0].prjt_id);         // 프로젝트ID
                  storage.setItem("LOGIN_BZCD", res.data.data[0].bzcd);               // 업무구분
                  storage.setItem("LOGIN_CATN_DCD", res.data.data[0].catn_dcd);       // 구성원 구분코드
                  storage.setItem("LOGIN_AUT_CD", res.data.data[0].aut_cd);           // 권한ID
                  storage.setItem("LOGIN_YN", res.data.data[0].login_yn);       // 로그인상태

                  window.location.reload()

                } else if (res.data.data[0].login_yn === 'N') {
                  alert("비밀번호가 틀렸습니다.")
                }
              } else {
                this.setInfo("", "", "");
                alert("입력 정보를 확인하세요.");
              }
            })
            .catch(e => {
              alert("사용자가 없습니다.");
              console.log(e)
              // this.setInfo("실패", "", JSON.stringify(e.response || e.message));
            });
      }

    },
    /* 세션 초기화 */
    sessionClear() {
      storage.setItem("jwt-auth-token", "");          // 인증토큰
      storage.setItem("LOGIN_EMP_NO", "");            // 직원번호
      storage.setItem("LOGIN_EMP_NM", "");            // 직원명
      storage.setItem("LOGIN_PROJ_ID", "");           // 프로젝트ID
      storage.setItem("LOGIN_BZCD", "");              // 업무구분
      storage.setItem("LOGIN_CATN_DCD", "");          // 구성원 구분코드
      storage.setItem("LOGIN_AUT_CD", "");            // 권한ID
      storage.setItem("LOGIN_YN", "");                // 로그인상태
    },
    // 신규 년도 생성
    createNewYear() {
      if(this.info.new_yyyy == null || this.info.new_yyyy === undefined || this.info.new_yyyy === ''){
        alert("신규생성년도의 값이 없습니다.")
        return false;
      }
      let currentYear = new Date();
      if(this.info.new_yyyy*1 <= currentYear.getFullYear()){
        alert(`신규생성년도는 현재 해(${currentYear.getFullYear()}년) 보다 작거나 같을 수 없습니다.`)
      }else{
        try {

          function checkValidDate(value) {
            var result = true;
            try {
              var date = value.split("-");
              var y = parseInt(date[0], 10),
                  m = parseInt(date[1], 10),
                  d = parseInt(date[2], 10);

              var dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
              result = dateRegex.test(d+'-'+m+'-'+y);
            } catch (err) {
              result = false;
            }
            return result;
          }

          let month = [1,2,3,4,5,6,7,8,9,10,11,12]
          let date = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
          let createYear = []
          for(let i=0; i<month.length; i++){
            for(let j=0; j<date.length; j++){
              if(checkValidDate(this.info.new_yyyy+"-"+month[i]+"-"+date[j])){
                let day = new Date(this.info.new_yyyy+"-"+month[i]+"-"+date[j])
                let convertDay = day.getDay() == 0 ? 7 : day.getDay()
                let convertMonth = String(month[i]).length == 1 ? '0'+month[i] : month[i]
                let convertDate = String(date[j]).length == 1 ? '0'+date[j] : date[j]
                let holiday = 1
                if(convertDay > 5 || (month[i]==1 && date[j]==1) || (month[i]==12 && date[j]==25)) holiday = 2
                if((month[i]==3 && date[j]==1) || (month[i]==5 && date[j]==5) || (month[i]==6 && date[j]==6) || (month[i]==8 && date[j]==15) || (month[i]==10 && date[j]==3) || (month[i]==10 && date[j]==9)) holiday = 4

                createYear.push({
                  prjt_id : this.info.prjt_nm_selected,
                  date : this.info.new_yyyy+"-"+convertMonth+"-"+convertDate,
                  date_cd : String(convertDay),
                  holiday_cd : String(holiday)
                })
              }
            }
          }
          axiosService.post('/PJTE9000/create4', {
            prjt_id : this.info.prjt_nm_selected,
            new_yyyy : this.info.new_yyyy,
            rowDatas : createYear
          })
              .then(res => {
                console.log(res.data)
                alert("생성이 완료되었습니다.")

                this.info.sel_yyyymmdd = this.info.new_yyyy;
                this.$refs.grid4.invoke("setRequestParams", this.info);
                this.$refs.grid4.invoke("reloadData")
              })
          // this.$refs.grid4.invoke('resetData', thisYear)


        }catch (e){
          console.log(e)
        }
      }

    },
    dateSearch() {
      this.$refs.grid4.invoke("setRequestParams", this.info);
      this.$refs.grid4.invoke("readData");
    },
    // Combo.vue 에서 받아온 값
    bkup_id_change(params) {
      // 권한구분코드 500,600,900일 때 콤보가 활성화되면서 그리드 2,3 데이터 조회가 안되기 때문에 params 값이 있을 때만 바뀌는 것으로 수정
      if(params){
        this.info.bkup_id_selected = params
      }
    },
    prjt_nm_chage(params) {
      // 권한구분코드 500,600,900일 때 콤보가 활성화되면서 그리드 2,3 데이터 조회가 안되기 때문에 params 값이 있을 때만 바뀌는 것으로 수정
      if(params){
        this.info.prjt_nm_selected = params
      }
    },

    fnSave(grid_num){
      let grid_arr = [];
      let check = true;

      // 그리드 1 저장
      if(grid_num === 1){
        // 데이터 로그 확인
        console.log("updatedRows ::" ,this.$refs.grid1.invoke("getModifiedRows").updatedRows);
        console.log("createdRows ::" ,this.$refs.grid1.invoke("getModifiedRows").createdRows);
        console.log("deletedRows ::" ,this.$refs.grid1.invoke("getModifiedRows").deletedRows);

        // 데이터 변경을 위한 focus 이동
        let focusedRowKey = this.$refs.grid1.invoke("getFocusedCell").rowKey
        let focusedColumn = this.$refs.grid1.invoke("getColumns")[this.$refs.grid1.invoke("getIndexOfColumn", this.$refs.grid1.invoke("getFocusedCell").columnName)+1]
        focusedColumn ? focusedColumn = focusedColumn.name : focusedColumn = this.$refs.grid1.invoke("getColumns")[this.$refs.grid1.invoke("getIndexOfColumn", this.$refs.grid1.invoke("getFocusedCell").columnName)-1].name
        this.$refs.grid1.invoke("focus", focusedRowKey, focusedColumn)

        // 변경 데이터 저장
        this.updatedRows = this.$refs.grid1.invoke("getModifiedRows").updatedRows;
        this.deletedRows = this.$refs.grid1.invoke("getModifiedRows").deletedRows;
        this.createdRows = this.$refs.grid1.invoke("getModifiedRows").createdRows;

        grid_arr = this.$refs.grid1.invoke("getData")
        for(let i = 0; i<grid_arr.length; i++){
          // 프로젝트 ID 값 체크
          if(grid_arr[i].prjt_id == null || grid_arr[i].prjt_id==='' || grid_arr[i].prjt_id === undefined){
            alert(`${i+1}번째 행의 프로젝트ID 값이 없습니다.`);
            this.$refs.grid1.invoke("focus", i, 'prjt_id')
            check = false;
            break;
          }
          // 직원번호 체크
          if(grid_arr[i].empno == null || grid_arr[i].empno==='' || grid_arr[i].empno === undefined){
            alert(`${i+1}번째 행 직원번호 값이 없습니다.`);
            this.$refs.grid1.invoke("focus", i, 'empno')
            check = false;
            break;
          }
          // 직원명 체크
          if(grid_arr[i].empnm == null || grid_arr[i].empnm==='' || grid_arr[i].empnm === undefined){
            alert(`${i+1}번째 행 직원명 값이 없습니다.`);
            this.$refs.grid1.invoke("focus", i, 'empnm')
            check = false;
            break;
          }
          // 로그인 비밀번호 체크
          if(grid_arr[i].lgn_pwd == null || grid_arr[i].lgn_pwd==='' || grid_arr[i].lgn_pwd === undefined){
            alert(`${i+1}번째 행 로그인 비밀번호 값이 없습니다.`);
            this.$refs.grid1.invoke("focus", i, 'lgn_pwd')
            check = false;
            break;
          }
          // 권한구분코드 체크
          if(grid_arr[i].aut_cd == null || grid_arr[i].aut_cd==='' || grid_arr[i].aut_cd === undefined){
            alert(`${i+1}번째 행 권한구분코드 값이 없습니다.`);
            this.$refs.grid1.invoke("focus", i, 'aut_cd')
            check = false;
            break;
          }

        }

        if(check){
          if(this.createdRows.length != 0 || this.updatedRows.length != 0 || this.deletedRows.length != 0){
            try {
              // createdRows
              if(this.createdRows.length != 0){
                // 데이터 파라메타 전달
                this.$refs.grid1.invoke("setRequestParams", JSON.stringify(this.createdRows));
                // create api 요청
                this.$refs.grid1.invoke("request", "createData", {showConfirm: false});
              }

              // updatedRows
              if(this.updatedRows.length != 0){
                // 데이터 파라메타 전달
                this.$refs.grid1.invoke("setRequestParams", JSON.stringify(this.updatedRows));
                // create api 요청
                this.$refs.grid1.invoke("request", "updateData", {showConfirm: false});
              }

              //deletedRows
              if(this.deletedRows.length != 0){
                // 데이터 파라메타 전달
                this.$refs.grid1.invoke("setRequestParams", JSON.stringify(this.updatedRows));
                // create api 요청
                this.$refs.grid1.invoke("request", "deleteData", {showConfirm: false});
              }

              alert("저장이 완료되었습니다.")
              this.info.grid_num = 1;
              this.$refs.grid1.invoke("setRequestParams", this.info);
              this.$refs.grid1.invoke("reloadData");
            } catch (e){
              console.log(e);
            }
          }else{
            alert("변경된 데이터가 없습니다.")
          }

        }else{
          return false;
        }


      }else if(grid_num === 2){       // 그리드 2 저장

        // 데이터 로그 확인
        console.log("updatedRows ::" ,this.$refs.grid2.invoke("getModifiedRows").updatedRows);
        console.log("createdRows ::" ,this.$refs.grid2.invoke("getModifiedRows").createdRows);
        console.log("deletedRows ::" ,this.$refs.grid2.invoke("getModifiedRows").deletedRows);

        // 데이터 변경을 위한 focus 이동
        let focusedRowKey = this.$refs.grid2.invoke("getFocusedCell").rowKey
        let focusedColumn = this.$refs.grid2.invoke("getColumns")[this.$refs.grid2.invoke("getIndexOfColumn", this.$refs.grid2.invoke("getFocusedCell").columnName)+1]
        focusedColumn ? focusedColumn = focusedColumn.name : focusedColumn = this.$refs.grid2.invoke("getColumns")[this.$refs.grid2.invoke("getIndexOfColumn", this.$refs.grid2.invoke("getFocusedCell").columnName)-1].name
        this.$refs.grid2.invoke("focus", focusedRowKey, focusedColumn)

        // 변경 데이터 저장
        this.updatedRows2 = this.$refs.grid2.invoke("getModifiedRows").updatedRows;
        this.deletedRows2 = this.$refs.grid2.invoke("getModifiedRows").deletedRows;
        this.createdRows2 = this.$refs.grid2.invoke("getModifiedRows").createdRows;

        // 필수항목 체크
        grid_arr = this.$refs.grid2.invoke("getData")

        for(let i=0; i<grid_arr.length; i++){
          // 프로젝트 ID 체크
          if(grid_arr[i].prjt_id == null || grid_arr[i].prjt_id ==='' || grid_arr[i].prjt_id === undefined){
            alert(`${i+1}번째 행 프로젝트 ID 값이 없습니다.`)
            this.$refs.grid2.invoke("focus", i, 'prjt_id')
            check = false
            break;

          }

          // 그룹유형코드 체크
          if(grid_arr[i].grp_tycd == null || grid_arr[i].grp_tycd ==='' || grid_arr[i].grp_tycd === undefined){
            alert(`${i+1}번째 행 그룹유형코드 값이 없습니다.`)
            this.$refs.grid2.invoke("focus", i, 'grp_tycd')
            check = false
            break;

          }

          //그룹유형명 체크
          if(grid_arr[i].grp_tymm == null || grid_arr[i].grp_tymm ==='' || grid_arr[i].grp_tymm === undefined){
            alert(`${i+1}번째 행 그룹유형명 값이 없습니다.`)
            this.$refs.grid2.invoke("focus", i, 'grp_tymm')
            check = false
            break;

          }

          //정렬순서 체크
          if(grid_arr[i].sort_seq == null || grid_arr[i].sort_seq ==='' || grid_arr[i].sort_seq === undefined){
            alert(`${i+1}번째 행 정렬순서 값이 없습니다.`)
            this.$refs.grid2.invoke("focus", i, 'sort_seq')
            check = false
            break;

          }

          //사용여부 체크
          if(grid_arr[i].usg_yn == null || grid_arr[i].usg_yn ==='' || grid_arr[i].usg_yn === undefined){
            alert(`${i+1}번째 행 사용여부 값이 없습니다.`)
            this.$refs.grid2.invoke("focus", i, 'usg_yn')
            check = false
            break;

          }
        }

        // 필수값 체크 이상 없을 때 저장장
        if(check){
          if(this.createdRows2.length != 0 || this.updatedRows2.length != 0 || this.deletedRows2.length != 0){
            try {
              if(this.createdRows2.length != 0){
                // 데이터 파라메타 전달
                this.$refs.grid2.invoke("setRequestParams", JSON.stringify(this.createdRows));
                // create api 요청
                this.$refs.grid2.invoke("request", "createData", {showConfirm: false});
              }

              if(this.updatedRows2.length != 0){
                // 데이터 파라메타 전달
                this.$refs.grid2.invoke("setRequestParams", JSON.stringify(this.updatedRows));
                // update api 요청
                this.$refs.grid2.invoke("request", "updateData", {showConfirm: false});
              }

              if(this.deletedRows2.length != 0){
                // 데이터 파라메타 전달
                this.$refs.grid2.invoke("setRequestParams", JSON.stringify(this.updatedRows));
                // update api 요청
                this.$refs.grid2.invoke("request", "deleteData", {showConfirm: false});
              }


              alert("저장이 완료되었습니다.")
              this.info.grid_num = 2;
              this.$refs.grid2.invoke("setRequestParams", this.info);
              this.$refs.grid2.invoke("reloadData");
            } catch (e){
              console.log(e);
            }
          }else{
            alert("변경된 데이터가 없습니다.");
          }


        }else{
          return false;
        }


      }else if(grid_num === 3){
        // 데이터 로그 확인
        console.log("updatedRows ::" ,this.$refs.grid3.invoke("getModifiedRows").updatedRows);
        console.log("createdRows ::" ,this.$refs.grid3.invoke("getModifiedRows").createdRows);
        console.log("deletedRows ::" ,this.$refs.grid3.invoke("getModifiedRows").deletedRows);

        // 데이터 변경을 위한 focus 이동
        let focusedRowKey = this.$refs.grid3.invoke("getFocusedCell").rowKey
        let focusedColumn = this.$refs.grid3.invoke("getColumns")[this.$refs.grid3.invoke("getIndexOfColumn", this.$refs.grid3.invoke("getFocusedCell").columnName)+1]
        focusedColumn ? focusedColumn = focusedColumn.name : focusedColumn = this.$refs.grid3.invoke("getColumns")[this.$refs.grid3.invoke("getIndexOfColumn", this.$refs.grid3.invoke("getFocusedCell").columnName)-1].name
        this.$refs.grid3.invoke("focus", focusedRowKey, focusedColumn)

        // 변경 데이터 저장
        this.updatedRows3 = this.$refs.grid3.invoke("getModifiedRows").updatedRows;
        this.deletedRows3 = this.$refs.grid3.invoke("getModifiedRows").deletedRows;
        this.createdRows3 = this.$refs.grid3.invoke("getModifiedRows").createdRows;

        // 필수항목 체크
        grid_arr = this.$refs.grid3.invoke("getData")

        for(let i=0; i<grid_arr.length; i++){
          // 프로젝트 ID 체크
          if(grid_arr[i].prjt_id == null || grid_arr[i].prjt_id ==='' || grid_arr[i].prjt_id === undefined){
            alert(`${i+1}번째 행 프로젝트 ID 값이 없습니다.`)
            this.$refs.grid3.invoke("focus", i, 'prjt_id')
            check = false
            break;

          }

          // 그룹유형코드 체크
          if(grid_arr[i].grp_tycd == null || grid_arr[i].grp_tycd ==='' || grid_arr[i].grp_tycd === undefined){
            alert(`${i+1}번째 행 그룹유형코드 값이 없습니다.`)
            this.$refs.grid3.invoke("focus", i, 'grp_tycd')
            check = false
            break;

          }

          //세부유형코드 체크
          if(grid_arr[i].dtls_tycd == null || grid_arr[i].dtls_tycd ==='' || grid_arr[i].dtls_tycd === undefined){
            alert(`${i+1}번째 행 세부유형코드 값이 없습니다.`)
            this.$refs.grid3.invoke("focus", i, 'dtls_tycd')
            check = false
            break;

          }

          //세부유형명 체크
          if(grid_arr[i].dtls_tynm == null || grid_arr[i].dtls_tynm ==='' || grid_arr[i].dtls_tynm === undefined){
            alert(`${i+1}번째 행 세부유형명 값이 없습니다.`)
            this.$refs.grid3.invoke("focus", i, 'dtls_tynm')
            check = false
            break;

          }

          //정렬순서 체크
          if(grid_arr[i].sort_seq == null || grid_arr[i].sort_seq ==='' || grid_arr[i].sort_seq === undefined){
            alert(`${i+1}번째 행 정렬순서 값이 없습니다.`)
            this.$refs.grid3.invoke("focus", i, 'sort_seq')
            check = false
            break;

          }

          //사용여부 체크
          if(grid_arr[i].use_yn == null || grid_arr[i].use_yn ==='' || grid_arr[i].use_yn === undefined){
            alert(`${i+1}번째 행 사용여부 값이 없습니다.`)
            this.$refs.grid3.invoke("focus", i, 'use_yn')
            check = false
            break;

          }
        }


        // 필수값 체크 이상 없을 때 저장장
        if(check){
          if(this.createdRows3.length == 0 && this.updatedRows3.length == 0 && this.deletedRows3.length == 0){
            alert('변경된 정보가 없습니다')
            return false;
          }else{
            try {
              // this.$refs.grid3.invoke("setRequestParams", JSON.stringify(grid_arr));
              // this.$refs.grid3.invoke("request", "createData", {showConfirm: false});
              axiosService.post('/PJTE9000/create3', {
                rowDatas : grid_arr
              })
                  .then(res => {
                    console.log(res)
                  })
              alert("저장이 완료되었습니다.")
              this.info.grid_num = 3;
              this.$refs.grid3.invoke("setRequestParams", this.info);
              this.$refs.grid3.invoke("reloadData");

            }catch (e){
              console.log(e)
            }

          }

        }else{
          return false;
        }




      }else if(grid_num === 4){

        // 데이터 변경을 위한 focus 이동
        let focusedRowKey = this.$refs.grid4.invoke("getFocusedCell").rowKey
        let focusedColumn = this.$refs.grid4.invoke("getColumns")[this.$refs.grid4.invoke("getIndexOfColumn", this.$refs.grid4.invoke("getFocusedCell").columnName)+1]
        focusedColumn ? focusedColumn = focusedColumn.name : focusedColumn = this.$refs.grid4.invoke("getColumns")[this.$refs.grid4.invoke("getIndexOfColumn", this.$refs.grid4.invoke("getFocusedCell").columnName)-1].name
        console.log(focusedRowKey, focusedColumn)
        this.$refs.grid4.invoke("focus", focusedRowKey, focusedColumn)

        // 데이터 로그 확인
        console.log("updatedRows ::" ,this.$refs.grid4.invoke("getModifiedRows").updatedRows);
        console.log("createdRows ::" ,this.$refs.grid4.invoke("getModifiedRows").createdRows);
        console.log("deletedRows ::" ,this.$refs.grid4.invoke("getModifiedRows").deletedRows);

        // 변경 데이터 저장
        this.updatedRows4 = this.$refs.grid4.invoke("getModifiedRows").updatedRows;
        this.deletedRows4 = this.$refs.grid4.invoke("getModifiedRows").deletedRows;
        this.createdRows4 = this.$refs.grid4.invoke("getModifiedRows").createdRows;

        // 필수항목 체크
        grid_arr = this.$refs.grid4.invoke("getData")
        if(this.info.sel_yyyymmdd == null || this.info.sel_yyyymmdd === undefined || this.info.sel_yyyymmdd === ''){
          alert("조회년월일의 값이 없습니다.");
          check = false;
        }

        // 필수값 체크 이상 없을 때 저장장
        if(check){
          if(this.createdRows4.length == 0 && this.updatedRows4.length == 0 && this.deletedRows4.length == 0){
            alert('변경된 정보가 없습니다')
            return false;
          }else{
            try {
              axiosService.post('/PJTE9000/update4', {
                updatedRows : this.updatedRows4,
              })
                  .then(res => {
                    alert("저장이 완료되었습니다.")
                    this.$refs.grid4.invoke("setRequestParams", this.info);
                    this.$refs.grid4.invoke("reloadData");
                  })



            }catch (e){
              console.log(e)
            }

          }

        }else{
          return false;
        }
      }


      console.log(check)
      // this.$refs.grid1.invoke("modifyData");
      // console.log("modify");
    },
    onClick(ev, grid_num) {
      console.log("클릭" + ev.rowKey);
      this.curRow = ev.rowKey;
      // 그리드 1 클릭시 로그인 변경 위한 데이터 셋팅
      if(grid_num === 1){
        let grid_arr = this.$refs.grid1.invoke("getData")
        this.changeUserId = grid_arr[this.curRow].empno
        this.changeUserPassword = grid_arr[this.curRow].lgn_pwd
        this.changeUserPrjtId = grid_arr[this.curRow].prjt_id
      }
      // 그리드 2 클릭 시 그리드 3 변화
      if(grid_num === 2){
        let grid_arr = this.$refs.grid2.invoke("getData")
        this.grp_tymm = grid_arr[this.curRow].grp_tymm
        this.info.grp_tycd = grid_arr[this.curRow].grp_tycd
        this.$refs.grid3.invoke("setColumnHeaders", {
          dtls_tycd : grid_arr[this.curRow].grid_colm_nm1 ? grid_arr[this.curRow].grid_colm_nm1 : '세부유형코드',
          dtls_tynm : grid_arr[this.curRow].grid_colm_nm2 ? grid_arr[this.curRow].grid_colm_nm2 : '세부유형명',
          etc_txt1 : grid_arr[this.curRow].grid_colm_nm3 ? grid_arr[this.curRow].grid_colm_nm3 : '기타내용1',
          etc_txt2 : grid_arr[this.curRow].grid_colm_nm4 ? grid_arr[this.curRow].grid_colm_nm4 : '기타내용2',
          etc_txt3 : grid_arr[this.curRow].grid_colm_nm5 ? grid_arr[this.curRow].grid_colm_nm5 : '기타내용3',
          etc_txt4 : grid_arr[this.curRow].grid_colm_nm6 ? grid_arr[this.curRow].grid_colm_nm6 : '기타내용4',
          etc_txt5 : grid_arr[this.curRow].grid_colm_nm7 ? grid_arr[this.curRow].grid_colm_nm7 : '기타내용5',
          etc_txt6 : grid_arr[this.curRow].grid_colm_nm8 ? grid_arr[this.curRow].grid_colm_nm8 : '기타내용6',
          etc_txt7 : grid_arr[this.curRow].grid_colm_nm9 ? grid_arr[this.curRow].grid_colm_nm9 : '기타내용7',
          etc_txt8 : grid_arr[this.curRow].grid_colm_nm10 ? grid_arr[this.curRow].grid_colm_nm10 : '기타내용8',
          etc_txt9 : grid_arr[this.curRow].grid_colm_nm11 ? grid_arr[this.curRow].grid_colm_nm11 : '기타내용9',
          etc_txt10 : grid_arr[this.curRow].grid_colm_nm12 ? grid_arr[this.curRow].grid_colm_nm12 : '기타내용10',
          etc_txt11 : grid_arr[this.curRow].grid_colm_nm13 ? grid_arr[this.curRow].grid_colm_nm13 : '기타내용11',
          etc_txt12 : grid_arr[this.curRow].grid_colm_nm14 ? grid_arr[this.curRow].grid_colm_nm14 : '기타내용12',
          etc_txt13 : grid_arr[this.curRow].grid_colm_nm15 ? grid_arr[this.curRow].grid_colm_nm15 : '기타내용13',
          etc_txt14 : grid_arr[this.curRow].grid_colm_nm16 ? grid_arr[this.curRow].grid_colm_nm16 : '기타내용14',
          etc_txt15 : grid_arr[this.curRow].grid_colm_nm17 ? grid_arr[this.curRow].grid_colm_nm17 : '기타내용15',
          etc_txt16 : grid_arr[this.curRow].grid_colm_nm18 ? grid_arr[this.curRow].grid_colm_nm18 : '기타내용16',
          etc_txt17 : grid_arr[this.curRow].grid_colm_nm19 ? grid_arr[this.curRow].grid_colm_nm19 : '기타내용17',
          etc_txt18 : grid_arr[this.curRow].grid_colm_nm20 ? grid_arr[this.curRow].grid_colm_nm20 : '기타내용17',

        });
        this.info.grid_num = 3;
        this.$refs.grid3.invoke("setRequestParams", this.info);
        this.$refs.grid3.invoke("readData");
      }
    },
    // 그리드 1 조회
    fnSearch(){
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
    },
    // 그리드 2,3 조회
    fnSearchCode(){
      this.info.grid_num = 2;
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");

      this.info.grid_num = 3;
      this.$refs.grid3.invoke("setRequestParams", this.info);
      this.$refs.grid3.invoke("readData");
    },
    // 추가한 행 편집 활성화
    fnEnable() {
      // 새로 ADD한 Row를 enable시킴
      this.NewRow = this.$refs.grid1.invoke("getRowCount");
      this.$refs.grid1.invoke("enableCell", this.NewRow-1, 'empno');
      this.$refs.grid1.invoke("focus", this.NewRow-1, 'empno');
    },
    // 양식다운로드
    formDownload(){
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem("LOGIN_PROJ_ID"), bzcd=sessionStorage.getItem("LOGIN_BZCD"), atfl_mng_id = "0000000000", file_rgs_dscd = '901' //atfl_mng_id 값은 양식 파일 첨부 ID 추후에 추가
      this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&bzcd=${bzcd}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=500");
    },
    // 행추가
    gridAddRow(grid_num){
      if(grid_num === 1){
        this.$refs.grid1.invoke("appendRow",{ prjt_id : this.info.prjt_nm_selected },{focus:true});
        this.fnEnable()
      }else if(grid_num === 2){
        let grid_arr = this.$refs.grid2.invoke("getData")
        this.$refs.grid2.invoke("appendRow",{ prjt_id : this.info.prjt_nm_selected, grp_tycd : grid_arr[grid_arr.length-1].grp_tycd*1+1 },{focus:true}) ;
      }else if(grid_num === 3){
        let grid_arr = this.$refs.grid3.invoke("getData")
        if(grid_arr.length != 0){
          this.$refs.grid3.invoke("appendRow",{ prjt_id : this.info.prjt_nm_selected, grp_tycd : grid_arr[grid_arr.length-1].grp_tycd },{focus:true}) ;
        }else{
          this.$refs.grid3.invoke("appendRow",{ prjt_id : this.info.prjt_nm_selected, grp_tycd : this.info.grp_tycd, bkup_id : this.info.bkup_id_selected },{focus:true}) ;
        }
      }else if(grid_num === 4){
        this.$refs.grid4.invoke("appendRow",{ prjt_id : this.info.prjt_nm_selected },{focus:true}) ;
      }
    },
    // 행삭제
    gridDelRow(grid_num){
      if(grid_num === 1){
        this.$refs.grid1.invoke("removeRow", this.curRow);
      }else if(grid_num === 2){
        let createdRows = this.$refs.grid2.invoke("getModifiedRows").createdRows
        let checkCreatedRows = false
        for(let i=0; i<createdRows.length; i++){
          if(createdRows[i].rowKey == this.curRow){
            checkCreatedRows = true
            break;
          }
        }
        if(checkCreatedRows){
          this.$refs.grid2.invoke("removeRow", this.curRow);
        }else{
          alert("새로 추가한 행만 행삭제가 가능합니다.")
        }
      }else if(grid_num === 3){
        let createdRows = this.$refs.grid3.invoke("getModifiedRows").createdRows
        let checkCreatedRows = false
        for(let i=0; i<createdRows.length; i++){
          if(createdRows[i].rowKey == this.curRow){
            checkCreatedRows = true
            break;
          }
        }
        if(checkCreatedRows){
          this.$refs.grid3.invoke("removeRow", this.curRow);
        }else{
          alert("새로 추가한 행만 행삭제가 가능합니다.")
        }
      }else if(grid_num === 4){
        this.$refs.grid4.invoke("removeRow", this.curRow);
      }
    },
    gridExcelImport(event){
      // 엑셀파일 업로드 로직 추가
      this.file = event.target.files ? event.target.files[0] : null;
      var input = event.target;
      var reader = new FileReader();
      reader.onload = () => {

        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});

        wb.SheetNames.forEach((sheetName, idx) => {

          wb.Sheets[sheetName].A1.w = "prjt_id"
          wb.Sheets[sheetName].B1.w = "empno"
          wb.Sheets[sheetName].C1.w = "empnm"
          wb.Sheets[sheetName].D1.w = "rank_nm"
          wb.Sheets[sheetName].E1.w = "lgn_pwd"
          wb.Sheets[sheetName].F1.w = "bzcd"
          wb.Sheets[sheetName].G1.w = "catn_dcd"
          wb.Sheets[sheetName].H1.w = "aut_cd"
          wb.Sheets[sheetName].I1.w = "del_yn"
          wb.Sheets[sheetName].J1.w = "dept_cd"
          wb.Sheets[sheetName].K1.w = "real_prjt_id"
          wb.Sheets[sheetName].L1.w = "inp_dt"
          wb.Sheets[sheetName].M1.w = "wth_dt"

          let rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          let gridExcelData = JSON.parse(JSON.stringify(rowObj));


          gridExcelData = gridExcelData.filter(e => e.prjt_id && e.empno)
          axiosService.post("/PJTE9000/excel_upload",{
            prjt_id : this.info.prjt_nm_selected,
            rowDatas : gridExcelData
          }).then(res => {
            console.log(res);
            if(res.data){
              alert('사용자 엑셀업로드 정보가 저장되었습니다.')
              this.info.grid_num = 1
              this.fnSearch()
            }
          })
              .catch(e => {
                alert("업로드 에러")
              })

        })
      };
      reader.readAsBinaryString(input.files[0]);
      event.target.value = '';

    },
    gridExcelExport(){
      this.$refs.grid1.invoke("export", "xlsx", {useFormattedValue:true, fileName:"엑셀다운로드"});
    },

    // 첨부파일 팝업(PJTE9002) 테스트용 method
    open_page(){
      let bkup_id='0000000000', prjt_id='1000000001', atfl_mng_id='1000000011', file_rgs_dscd='700',
          mng_id = '1000000000', bzcd='BBB', sqn_cd='Cust_summary_L9', tst_case_id='200', pgm_id='TS-001-TC-014'
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&mng_id=${mng_id}&file_rgs_dscd=${file_rgs_dscd}&bzcd=${bzcd}&sqn_cd=${sqn_cd}&tst_case_id=${tst_case_id}&pgm_id=${pgm_id}&`, "open_page", "width=1000, height=800");
    }

  },
// 변수 선언부분
  data() {
    return {
      aut_cd_check : true,
      aut_cd_check2 : true,
      comboList : ["C27","C0"],
      grp_tymm : '',
      changeUserId : '',
      changeUserPassword : '',
      changeUserPrjtId : '',
      info : {
        bkup_id_selected : '0000000000',
        prjt_nm_selected : sessionStorage.getItem("LOGIN_PROJ_ID"),
        grid_num: 1,
        login_emp_no : sessionStorage.getItem("LOGIN_EMP_NO"),
        grp_tycd : '1000000001',
        new_prjt_ids: '',
        new_prjt_id : '',
        new_bkup_id : '',
        new_bkup_nm : '',
        sel_yyyymmdd: '',
        new_yyyy : '',

      },

      addRow : {
        grid : this.grid,
      },

      check_Yn    : false,  // 삭제프로그램/소스취약점포함

      count:0,
      curRow:-1,
      title:"",
      scrollX:false,
      scrollY:false,
      bodyHeight: 345,
      rowHeight: 25,
      minRowHeight : 25,
      editingEvent : 'click',
      showDummyRows: false,
      open: false,
      dataSource: {
        api: {
          readData: { url: process.env.VUE_APP_API + '/PJTE9000/select', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE9000/create1', method: 'POST'},
          updateData : { url: process.env.VUE_APP_API + '/PJTE9000/update1' , method: 'PUT'},
          deleteData : { url: process.env.VUE_APP_API + '/PJTE9000/delete1' , method: 'PUT'},
        },
        initialRequest: false,
        contentType: 'application/json;',
        headers: {'x-custom-header': 'custom-header'},
        withCredentials: false
      },
      dataSource2: {
        api: {
          readData: { url: process.env.VUE_APP_API + '/PJTE9000/select', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE9000/create2', method: 'POST'},
          updateData : { url: process.env.VUE_APP_API + '/PJTE9000/update2' , method: 'PUT'},
          deleteData : { url: process.env.VUE_APP_API + '/PJTE9000/delete2' , method: 'PUT'},
        },
        initialRequest: false,
        contentType: 'application/json;',
        headers: {'x-custom-header': 'custom-header'},
        withCredentials: false
      },
      dataSource3: {
        api: {
          readData: { url: process.env.VUE_APP_API + '/PJTE9000/select', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE9000/create3' , method: 'POST'},
        },
        initialRequest: false,
        contentType: 'application/json;',
        headers: {'x-custom-header': 'custom-header'},
        withCredentials: false
      },
      dataSource4: {
        api: {
          readData: { url: process.env.VUE_APP_API + '/PJTE9000/select4', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '' , method: 'POST'},
        },
        initialRequest: false,
        contentType: 'application/json;',
        headers: {'x-custom-header': 'custom-header'},
        withCredentials: false
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders:['rowNum'],
      header:{
        height: 25
      },
      columns1: [
        {
          header: '백업ID',
          width: 100,
          name: 'bkup_id',
          hidden : true,
        },
        {
          header: '프로젝트',
          width: 200,
          name: 'prjt_id',
          formatter: 'listItemText',
          disabled : true,
          hidden : true,
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD0000000000N
            }
          }
        },
        {
          header: '직원번호',
          width: 120,
          name: 'empno',
          editor : 'text',
          align: 'center',
          disabled : true,
        },
        {
          header: '직원명',
          width: 100,
          name: 'empnm',
          align: 'center',
          filter: { type: 'text'},
          editor : 'text'
        },
        {
          header: '직급명',
          width: 80,
          name: 'rank_nm',
          filter: 'select',
          editor : 'text'
        },
        {
          hidden: sessionStorage.getItem("LOGIN_AUT_CD") == 900 || sessionStorage.getItem("LOGIN_AUT_CD") == 600 || sessionStorage.getItem("LOGIN_AUT_CD") == 500 ? false : true,
          header: '로그인비밀번호',
          width: 150,
          name: 'lgn_pwd',
          editor : 'text'
        },
        {
          header: sessionStorage.getItem("LOGIN_PROJ_ID") == '0000000003' || sessionStorage.getItem("LOGIN_PROJ_ID") == '0000000001' ? '직책' : '업무',
          width: 100,
          name: 'bzcd',
          formatter: 'listItemText',
          filter: 'select',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000001N
            }
          }
        },
        {
          header: '직원구분',
          width: 90,
          name: 'catn_dcd',
          align: 'center',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000023N
            }
          }
        },
        {
          header: '권한',
          width: 100,
          name: 'aut_cd',
          formatter: 'listItemText',
          filter: 'select',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000024N
            }
          }
        },
        {
          header: '퇴사',
          width: 60,
          name: 'del_yn',
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
          hidden: sessionStorage.getItem("LOGIN_PROJ_ID") != '0000000001' && sessionStorage.getItem("LOGIN_PROJ_ID") != '0000000003' ? true : false,
          header: '소속',
          width: 200,
          name: 'dept_cd',
          formatter: 'listItemText',
          filter: 'select',
          editor : {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000044N
            }
          }
        },
        {
          hidden: sessionStorage.getItem("LOGIN_PROJ_ID") != '0000000001' && sessionStorage.getItem("LOGIN_PROJ_ID") != '0000000003' ? true : false,
          header: '투입프로젝트코드',
          width: 270,
          name: 'real_prjt_id',
          formatter: 'listItemText',
          editor : {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000038N
            }
          }
        },
        {
          hidden: sessionStorage.getItem("LOGIN_PROJ_ID") == '0000000001' || sessionStorage.getItem("LOGIN_PROJ_ID") == '0000000003' ? true : false,
          header: '투입일자',
          name: 'inp_dt',
          width: 130,
          align: 'center',
          format:'yyyy-mm-dd',
          editor:'datePicker'
        },
        {
          hidden: sessionStorage.getItem("LOGIN_PROJ_ID") == '0000000001' || sessionStorage.getItem("LOGIN_PROJ_ID") == '0000000003' ? true : false,
          header: '철수일자',
          name: 'wth_dt',
          width: 130,
          align: 'center',
          format:'yyyy-mm-dd',
          editor:'datePicker'
        },
      ],
      columns2: [
        {
          header: '백업ID',
          width: 100,
          name: 'bkup_id',
          hidden : true,
        },
        {
          header: '프로젝트ID',
          width: 100,
          name: 'prjt_id',
          hidden : 'true'
        },
        {
          header: '그룹유형코드',
          width: 100,
          name: 'grp_tycd',
          hidden : 'true'
        },
        {
          header: '그룹유형명',
          width: 200,
          name: 'grp_tymm',
          filter: { type: 'text'},
          editor : 'text'
        },
        {
          header: '정렬',
          width: 50,
          name: 'sort_seq',
          align: 'right',
          editor : 'text',
        },
        {
          header: '사용',
          width: 50,
          name: 'usg_yn',
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
          header: '그리드컬럼명1',
          width: 200,
          name: 'grid_colm_nm1',
          editor : 'text'
        },
        {
          header: '그리드컬럼명2',
          width: 200,
          name: 'grid_colm_nm2',
          editor : 'text'
        },
        {
          header: '그리드컬럼명3',
          width: 150,
          name: 'grid_colm_nm3',
          editor : 'text'
        },
        {
          header: '그리드컬럼명4',
          width: 150,
          name: 'grid_colm_nm4',
          editor : 'text'
        },
        {
          header: '그리드컬럼명5',
          width: 150,
          name: 'grid_colm_nm5',
          editor : 'text'
        },
        {
          header: '그리드컬럼명6',
          width: 150,
          name: 'grid_colm_nm6',
          editor : 'text'
        },
        {
          header: '그리드컬럼명7',
          width: 150,
          name: 'grid_colm_nm7',
          editor : 'text'
        },
        {
          header: '그리드컬럼명8',
          width: 150,
          name: 'grid_colm_nm8',
          editor : 'text'
        },
        {
          header: '그리드컬럼명9',
          width: 150,
          name: 'grid_colm_nm9',
          editor : 'text'
        },
        {
          header: '그리드컬럼명10',
          width: 150,
          name: 'grid_colm_nm10',
          editor : 'text'
        },
        {
          header: '그리드컬럼명11',
          width: 150,
          name: 'grid_colm_nm11',
          editor : 'text'
        },
        {
          header: '그리드컬럼명12',
          width: 150,
          name: 'grid_colm_nm12',
          editor : 'text'
        },
        {
          header: '그리드컬럼명13',
          width: 150,
          name: 'grid_colm_nm13',
          editor : 'text'
        },
        {
          header: '그리드컬럼명14',
          width: 150,
          name: 'grid_colm_nm14',
          editor : 'text'
        },
        {
          header: '그리드컬럼명15',
          width: 150,
          name: 'grid_colm_nm15',
          editor : 'text'
        },
        {
          header: '그리드컬럼명16',
          width: 150,
          name: 'grid_colm_nm16',
          editor : 'text'
        },
        {
          header: '그리드컬럼명17',
          width: 150,
          name: 'grid_colm_nm17',
          editor : 'text'
        },
        {
          header: '그리드컬럼명18',
          width: 150,
          name: 'grid_colm_nm18',
          editor : 'text'
        },
        {
          header: '그리드컬럼명19',
          width: 150,
          name: 'grid_colm_nm19',
          editor : 'text'
        },
        {
          header: '그리드컬럼명20',
          width: 150,
          name: 'grid_colm_nm20',
          editor : 'text'
        },
      ],

      columns3: [
        {
          header: '백업ID',
          width: 100,
          name: 'bkup_id',
          hidden : 'true'
        },
        {
          header: '프로젝트ID',
          width: 100,
          name: 'prjt_id',
          hidden : 'true'
        },
        {
          header: '그룹유형코드',
          width: 100,
          align: 'center',
          name: 'grp_tycd',
        },
        {
          header: '세부유형코드',
          width: 100,
          name: 'dtls_tycd',
          editor : 'text',
        },
        {
          header: '세부유형명',
          width: 200,
          name: 'dtls_tynm',
          editor : 'text',
        },
        {
          header: '정렬',
          width: 50,
          name: 'sort_seq',
          align: 'right',
          editor : 'text',
        },
        {
          header: '사용',
          width: 50,
          name: 'use_yn',
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
          header: '기타내용1',
          width: 150,
          name: 'etc_txt1',
          editor : 'text',
        },
        {
          header: '기타내용2',
          width: 150,
          name: 'etc_txt2',
          editor : 'text',
        },
        {
          header: '기타내용3',
          width: 150,
          name: 'etc_txt3',
          editor : 'text',
        },
        {
          header: '기타내용4',
          width: 150,
          name: 'etc_txt4',
          editor : 'text',
        },
        {
          header: '기타내용5',
          width: 150,
          name: 'etc_txt5',
          editor : 'text',
        },
        {
          header: '기타내용6',
          width: 150,
          name: 'etc_txt6',
          editor : 'text',
        },
        {
          header: '기타내용7',
          width: 150,
          name: 'etc_txt7',
          editor : 'text',
        },
        {
          header: '기타내용8',
          width: 150,
          name: 'etc_txt8',
          editor : 'text',
        },
        {
          header: '기타내용9',
          width: 150,
          name: 'etc_txt9',
          editor : 'text',
        },
        {
          header: '기타내용10',
          width: 150,
          name: 'etc_txt10',
          editor : 'text',
        },
        {
          header: '기타내용11',
          width: 150,
          name: 'dtl_txt1',
          editor : 'text',
        },
        {
          header: '기타내용12',
          width: 150,
          name: 'dtl_txt2',
          editor : 'text',
        },
        {
          header: '기타내용13',
          width: 150,
          name: 'dtl_txt3',
          editor : 'text',
        },
        {
          header: '기타내용14',
          width: 150,
          name: 'dtl_txt4',
          editor : 'text',
        },
        {
          header: '기타내용15',
          width: 150,
          name: 'dtl_txt5',
          editor : 'text',
        },
        {
          header: '기타내용16',
          width: 150,
          name: 'dtl_txt6',
          editor : 'text',
        },
        {
          header: '기타내용17',
          width: 150,
          name: 'dtl_txt7',
          editor : 'text',
        },
        {
          header: '기타내용18',
          width: 150,
          name: 'dtl_txt8',
          editor : 'text',
        },
        {
          header: '기타내용19',
          width: 150,
          name: 'dtl_txt9',
          editor : 'text',
        },
        {
          header: '기타내용20',
          width: 150,
          name: 'dtl_txt10',
          editor : 'text',
        },
      ],

      columns4: [
        {
          header: '프로젝트ID',
          width: 100,
          name: 'prjt_id',
          hidden : 'true'
        },
        {
          header: '일자',
          name: 'date',
          format:'yyyy-mm-dd',
          editor:'datePicker'
        },
        {
          header: '요일구분',
          name: 'date_cd',
          formatter : 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems:
                  [
                    {"text":"월요일","value":"1"},
                    {"text":"화요일","value":"2"},
                    {"text":"수요일","value":"3"},
                    {"text":"목요일","value":"4"},
                    {"text":"금요일","value":"5"},
                    {"text":"토요일","value":"6"},
                    {"text":"일요일","value":"7"}
                  ]
            }
          }
        },
        {
          header: '휴일구분',
          name: 'holiday_cd',
          formatter : 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems:
                  [
                    {"text":"영업일","value":"1"},
                    {"text":"휴일","value":"2"},
                    {"text":"명절","value":"3"},
                    {"text":"국경일","value":"4"},
                    {"text":"휴일","value":"5"},
                  ]
            }
          }
        },
      ],
    }
  },
};

</script>
<style>
</style>
