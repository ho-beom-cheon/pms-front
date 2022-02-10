<template>
  <!-- CONTENTS1 -->
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
              <button class="menu-group" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
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
                <li><a href="/PJTE5000">{{ menu_list[7].name }}</a></li>
                <li><a href="/PJTE6000">{{ menu_list[8].name }}</a></li>
                <li><a href="/PJTE7000">{{ menu_list[9].name }}</a></li>
                <li class="active"><a href="/PJTE9000">{{ menu_list[10].name }}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>

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
                    <button class="btn btn-filter-p" style = "margin-top: 5px" @click="tableBackUp">
                      <a href="#" >테이블백업</a>
                    </button>
                  </ul>
                </section>
                <div class="div-grid-c">
                </div>
                <ul class="filter-btn" style="margin-top: 25px">
                  <button class="btn btn-filter-e"  @click="gridExcelImport">
                    <a href="#">엑셀업로드</a>
                  </button>
                  <button class="btn btn-filter-e" @click="gridExcelExport">
                    <a href="#" >엑셀다운로드</a>
                  </button>
                  <button class="btn btn-filter-b" style = "margin-left: 20px;" @click="gridAddRow(1)">
                    <a href="#"  >행추가</a>
                  </button>
                  <button class="btn btn-filter-b" @click="gridDelRow(1)">
                    <a href="#" >행삭제</a>
                  </button>
                  <button class="btn btn-filter-p" style = "margin-left: 20px; background-color: #9FC93C" @click="loginChange">
                    <a href="#" >로그인변경</a>
                  </button>
                  <button class="btn btn-filter-p" style = "margin-left: 20px" @click="fnSave(1)">
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
                    <button class="btn btn-filter-p" style = "margin-bottom: 5px" @click="createNewYear">
                      <a href="#" >생성</a>
                    </button>
                  </ul>
                  <ul class="filter-con clear-fix">
                    <li class="filter-item">
                      <div class="item-con">조회년월일
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
                <button class="btn btn-filter-b" @click="gridAddRow(4)">
                  <a href="#" >행추가</a>
                </button>
                <button class="btn btn-filter-b" @click="gridDelRow(4)">
                  <a href="#" >행삭제</a>
                </button>
<!--                <div class="btn btn-filter-p" style = "margin-left: 20px">-->
<!--                  <a href="#" @click="fnSave(4)">저장</a>-->
<!--                </div>-->
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
                    @click="onClick"
                ></grid>
              </div>
              </div>
            </div>
          </div>
          <div class="div3-c">
            <div class="div-header-c"><h2>코드유형</h2>
                <ul class="filter-btn">
                  <button class="btn btn-filter-b" @click="gridAddRow(2)">
                    <a href="#" >행추가</a>
                  </button>
                  <button class="btn btn-filter-b" @click="gridDelRow(2)">
                    <a href="#" >행삭제</a>
                  </button>
                  <button class="btn btn-filter-p" style = "margin-left: 20px" @click="fnSave(2)">
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
                  @click="onClick($event, 2)"
              ></grid>
            </div>
          </div>
          <div class="div4-c">
            <div class="div-header-c">
              <h2 v-if="grp_tymm">{{ grp_tymm }}</h2>
              <h2 v-else>코드상세</h2>
              <ul class="filter-btn">
                <button class="btn btn-filter-b" @click="gridAddRow(3)">
                  <a href="#" >행추가</a>
                </button>
                <button class="btn btn-filter-b" @click="gridDelRow(3)">
                  <a href="#" >행삭제</a>
                </button>
                <button class="btn btn-filter-p" style = "margin-left: 20px" @click="fnSave(3)">
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
const storage = window.sessionStorage;

//그리드 아이템 예제
const listItem = [
    {text:"개발", value:"1"},
    {text:"운영", value:"2"},
    {text:"이관", value:"3"}
];


export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    grid: Grid,
    combo
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
  async mounted() {
    await this.fnSearch();
    await this.fnSearchCode();
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated(){
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
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
    },
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
          axiosService.post('/PJTE9000/create4', {
            prjt_id : this.info.prjt_nm_selected,
            new_yyyy : this.info.new_yyyy
          })
              .then(res => {
                console.log(res.data)
                alert("생성이 완료되었습니다.")
              })
          this.info.sel_yyyymmdd = this.info.new_yyyy;
          this.$refs.grid4.invoke("setRequestParams", this.info);
          this.$refs.grid4.invoke("reloadData");

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
    bkup_id_change(params) {this.info.bkup_id_selected = params},
    prjt_nm_chage(params) {this.info.prjt_nm_selected = params},

    // 콤보 처음 값 저장
    comboSetData(){
      this.info.bkup_id_selected = this.$children[0].$data.bkup_id_selected;
      this.info.prjt_nm_selected = this.$children[0].$data.prjt_nm_selected;
    },
    change(){
      console.log("change");
    },
    fnSave(grid_num){
      // debugger;
      let grid_arr = [];
      let check = true;



      // 그리드 1 저장
      if(grid_num === 1){
        // 데이터 로그 확인
        console.log("updatedRows ::" ,this.$refs.grid1.invoke("getModifiedRows").updatedRows);
        console.log("createdRows ::" ,this.$refs.grid1.invoke("getModifiedRows").createdRows);
        console.log("deletedRows ::" ,this.$refs.grid1.invoke("getModifiedRows").deletedRows);


        // 변경 데이터 저장
        this.updatedRows = this.$refs.grid1.invoke("getModifiedRows").updatedRows;
        this.deletedRows = this.$refs.grid1.invoke("getModifiedRows").deletedRows;
        this.createdRows = this.$refs.grid1.invoke("getModifiedRows").createdRows;

        grid_arr = this.$refs.grid1.invoke("getData")
        for(let i = 0; i<grid_arr.length; i++){
          // 프로젝트 ID 값 체크
          if(grid_arr[i].prjt_id == null || grid_arr[i].prjt_id==='' || grid_arr[i].prjt_id === undefined){
            alert(`${i+1}번째 행의 프로젝트ID 값이 없습니다.`);
            check = false;
            break;
          }
          // 직원번호 체크
          if(grid_arr[i].empno == null || grid_arr[i].empno==='' || grid_arr[i].empno === undefined){
            alert(`${i+1}번째 행 직원번호 값이 없습니다.`);
            check = false;
            break;
          }
          // 직원명 체크
          if(grid_arr[i].empnm == null || grid_arr[i].empnm==='' || grid_arr[i].empnm === undefined){
            alert(`${i+1}번째 행 직원명 값이 없습니다.`);
            check = false;
            break;
          }
          // 로그인 비밀번호 체크
          if(grid_arr[i].lgn_pwd == null || grid_arr[i].lgn_pwd==='' || grid_arr[i].lgn_pwd === undefined){
            alert(`${i+1}번째 행 로그인 비밀번호 값이 없습니다.`);
            check = false;
            break;
          }
          // 권한구분코드 체크
          if(grid_arr[i].aut_cd == null || grid_arr[i].aut_cd==='' || grid_arr[i].aut_cd === undefined){
            alert(`${i+1}번째 행 권한구분코드 값이 없습니다.`);
            check = false;
            break;
          }
          // IP 주소 체크
          if(grid_arr[i].ip_addr == null || grid_arr[i].ip_addr==='' || grid_arr[i].ip_addr === undefined){
            alert(`${i+1}번째 행 IP주소 값이 없습니다.`);
            check = false;
            break;
          }
          //계획투입시작일자 체크
          if(grid_arr[i].plan_thw_stdt == null || grid_arr[i].plan_thw_stdt==='' || grid_arr[i].plan_thw_stdt === undefined){
            alert(`${i+1}번째 행 계획투입시작일자 값이 없습니다.`);
            check = false;
            break;
          }

        }

        if(check){
          if(this.createdRows.length != 0){
            try {
              // 데이터 파라메타 전달
              this.$refs.grid1.invoke("setRequestParams", JSON.stringify(this.createdRows));
              // create api 요청
              this.createDataUrl = process.env.VUE_APP_API + '/PJTE9000/create'
                  this.$refs.grid1.invoke("request", "createData", {showConfirm: false});
              alert("저장이 완료되었습니다.")
              this.info.grid_num = 1;
              this.$refs.grid1.invoke("setRequestParams", this.info);
              this.$refs.grid1.invoke("reloadData");
            } catch (e){
              console.log(e);
            }
          }

          if(this.updatedRows.length != 0){
            try {
              // 데이터 파라메타 전달
              this.$refs.grid1.invoke("setRequestParams", JSON.stringify(this.updatedRows));
              // create api 요청
              this.updateDataUrl = process.env.VUE_APP_API + '/PJTE9000/update'
              this.$refs.grid1.invoke("request", "updateData", {showConfirm: false});
              alert("저장이 완료되었습니다.")
              this.info.grid_num = 1;
              this.$refs.grid1.invoke("setRequestParams", this.info);
              this.$refs.grid1.invoke("reloadData");
            } catch (e){
              console.log(e);
            }
          }

        }else{
          return false;
        }


      }else if(grid_num === 2){       // 그리드 2 저장

        // 데이터 로그 확인
        console.log("updatedRows ::" ,this.$refs.grid2.invoke("getModifiedRows").updatedRows);
        console.log("createdRows ::" ,this.$refs.grid2.invoke("getModifiedRows").createdRows);
        console.log("deletedRows ::" ,this.$refs.grid2.invoke("getModifiedRows").deletedRows);

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
            check = false
            break;

          }

          // 그룹유형코드 체크
          if(grid_arr[i].grp_tycd == null || grid_arr[i].grp_tycd ==='' || grid_arr[i].grp_tycd === undefined){
            alert(`${i+1}번째 행 그룹유형코드 값이 없습니다.`)
            check = false
            break;

          }

          //그룹유형명 체크
          if(grid_arr[i].grp_tymm == null || grid_arr[i].grp_tymm ==='' || grid_arr[i].grp_tymm === undefined){
            alert(`${i+1}번째 행 그룹유형명 값이 없습니다.`)
            check = false
            break;

          }

          //정렬순서 체크
          if(grid_arr[i].sort_seq == null || grid_arr[i].sort_seq ==='' || grid_arr[i].sort_seq === undefined){
            alert(`${i+1}번째 행 정렬순서 값이 없습니다.`)
            check = false
            break;

          }

          //사용여부 체크
          if(grid_arr[i].usg_yn == null || grid_arr[i].usg_yn ==='' || grid_arr[i].usg_yn === undefined){
            alert(`${i+1}번째 행 사용여부 값이 없습니다.`)
            check = false
            break;

          }
        }

        // 필수값 체크 이상 없을 때 저장장
        if(check){
          if(this.createdRows2.length != 0){
            try {
              // 데이터 파라메타 전달
              this.$refs.grid2.invoke("setRequestParams", JSON.stringify(this.createdRows));
              // create api 요청
              this.$refs.grid2.invoke("request", "createData", {showConfirm: false});
              alert("저장이 완료되었습니다.")
              this.info.grid_num = 2;
              this.$refs.grid2.invoke("setRequestParams", this.info);
              this.$refs.grid2.invoke("reloadData");
            } catch (e){
              console.log(e);
            }
          }

          if(this.updatedRows2.length != 0){
            try {
              // 데이터 파라메타 전달
              this.$refs.grid2.invoke("setRequestParams", JSON.stringify(this.updatedRows));
              // update api 요청
              this.$refs.grid2.invoke("request", "updateData", {showConfirm: false});
              alert("저장이 완료되었습니다.")
              this.info.grid_num = 2;
              this.$refs.grid2.invoke("setRequestParams", this.info);
              this.$refs.grid2.invoke("reloadData");
            } catch (e){
              console.log(e);
            }
          }

        }else{
          return false;
        }


      }else if(grid_num === 3){
        // 데이터 로그 확인
        console.log("updatedRows ::" ,this.$refs.grid3.invoke("getModifiedRows").updatedRows);
        console.log("createdRows ::" ,this.$refs.grid3.invoke("getModifiedRows").createdRows);
        console.log("deletedRows ::" ,this.$refs.grid3.invoke("getModifiedRows").deletedRows);

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
            check = false
            break;

          }

          // 그룹유형코드 체크
          if(grid_arr[i].grp_tycd == null || grid_arr[i].grp_tycd ==='' || grid_arr[i].grp_tycd === undefined){
            alert(`${i+1}번째 행 그룹유형코드 값이 없습니다.`)
            check = false
            break;

          }

          //세부유형코드 체크
          if(grid_arr[i].dtls_tycd == null || grid_arr[i].dtls_tycd ==='' || grid_arr[i].dtls_tycd === undefined){
            alert(`${i+1}번째 행 세부유형코드 값이 없습니다.`)
            check = false
            break;

          }

          //세부유형명 체크
          if(grid_arr[i].dtls_tynm == null || grid_arr[i].dtls_tynm ==='' || grid_arr[i].dtls_tynm === undefined){
            alert(`${i+1}번째 행 세부유형명 값이 없습니다.`)
            check = false
            break;

          }

          //정렬순서 체크
          if(grid_arr[i].sort_seq == null || grid_arr[i].sort_seq ==='' || grid_arr[i].sort_seq === undefined){
            alert(`${i+1}번째 행 정렬순서 값이 없습니다.`)
            check = false
            break;

          }

          //사용여부 체크
          if(grid_arr[i].use_yn == null || grid_arr[i].use_yn ==='' || grid_arr[i].use_yn === undefined){
            alert(`${i+1}번째 행 사용여부 값이 없습니다.`)
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

        // 신규 프로젝트 추가시 코드정보 신규프로젝트로 데이터 복사
        // try{
        //   axiosService.post('/PJTE9000/create_new_project_data', {
        //     // new_prjt_id : this.info.new_prjt_id,
        //     new_prjt_id : '1000000003',
        //     login_emp_no : this.info.login_emp_no
        //   })
        //   .then(res => {
        //     console.log(res.data)
        //     alert("저장이 완료되었습니다.")
        //   })
        // }catch(e) {
        //   console.log(e)
        // }


      }else if(grid_num === 4){
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
                rowDatas : grid_arr,
                sel_yyyymmdd : this.info.sel_yyyymmdd
              })
              .then(res => {
                console.log(res.data)
                alert("저장이 완료되었습니다.")
              })

              this.$refs.grid4.invoke("setRequestParams", this.info);
              this.$refs.grid4.invoke("reloadData");

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
    fnSearch(){
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
    },
    fnSearchCode(){
      this.info.grid_num = 2;
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");

      this.info.grid_num = 3;
      this.$refs.grid3.invoke("setRequestParams", this.info);
      this.$refs.grid3.invoke("readData");
    },
    gridInit(){
      this.$refs.grid1.invoke("clear");
    },
    gridAddRow(grid_num){
      if(grid_num === 1){
        this.$refs.grid1.invoke("appendRow",{ },{focus:true}) ;
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
    gridDelRow(grid_num){
      if(grid_num === 1){
        this.$refs.grid1.invoke("removeRow", this.curRow);
      }else if(grid_num === 2){
        let createdRows = this.$refs.grid2.invoke("getModifiedRows").createdRows
        let checkCreatedRows = false
        console.log("createdRows ::" ,this.$refs.grid2.invoke("getModifiedRows").createdRows);
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
        console.log("createdRows ::" ,this.$refs.grid3.invoke("getModifiedRows").createdRows);
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
// DB 데이터 삭제로직 추가
    },
    gridADelRow(){
// DB 데이터 삭제로직 추가
    },
    gridIns(){
// DB 데이터 삭제로직 추가
    },
    gridExcelExport(){
      this.$refs.grid1.invoke("export", "xlsx", {useFormattedValue:true, fileName:"엑셀다운로드"});
    },
    gridExcelImport(){
// 엑셀파일 업로드 로직 추가
    },
    open_page(){
      let bkup_id='0000000000', prjt_id='1000000001', atfl_mng_id='1000000011', file_rgs_dscd='700',
      mng_id = '1000000000', bzcd='BBB', sqn_cd='Cust_summary_L9', tst_case_id='200', pgm_id='TS-001-TC-014'
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&mng_id=${mng_id}&file_rgs_dscd=${file_rgs_dscd}&bzcd=${bzcd}&sqn_cd=${sqn_cd}&tst_case_id=${tst_case_id}&pgm_id=${pgm_id}&`, "open_page", "width=1000, height=800");
    }

  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{
    count: (a, b) => {
      console.log("count의 값이 변경되면 여기도 실행");
      console.log("new Value :: " + a);
      console.log("old Value :: " + b);
    }
  },
// 변수 선언부분
  data() {
    return {
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
        new_prjt_id : '',
        new_bkup_id : '',
        new_bkup_nm : '',
        sel_yyyymmdd: '',
        new_yyyy : '',

      },

      addRow : {
        grid : this.grid,
      },
      frcs_sta_dt : '',    // 계획일자STA
      frcs_end_dt : '',    // 계획일자END
      sta_dt      : '',    // 실제일자STA
      end_dt      : '',    // 실제일자END

      check_Yn    : false,  // 삭제프로그램/소스취약점포함

      count:0,
      curRow:-1,
      title:"",
      scrollX:false,
      scrollY:false,
      bodyHeight: 345,
      rowHeight: 25,
      minRowHeight : 25,
      showDummyRows: true,
      open: false,
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
          readData: { url: process.env.VUE_APP_API + '/PJTE9000/select', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE9000/create1', method: 'POST'},
          updateData : { url: process.env.VUE_APP_API + '/PJTE9000/update1' , method: 'PUT'},
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
          width: 150,
          name: 'prjt_id',
          editor : 'text'
        },
        {
          header: '직원번호',
          width: 120,
          name: 'empno',
          editor : 'text'
        },
        {
          header: '직원명',
          width: 120,
          name: 'empnm',
          editor : 'text'
        },
        {
          header: '직급명',
          width: 120,
          name: 'rank_nm',
          editor : 'text'
        },
        {
          header: '로그인비밀번호',
          width: 120,
          name: 'lgn_pwd',
          editor : 'text'
        },
        {
          header: '업무구분코드',
          width: 120,
          name: 'bzcd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems:
                  [
                    {"text":"PMO","value":"300"},
                    {"text": "업무팀", "value": '100'},
                    {"text": "공통팀", "value": "200"},
                  ]
            }
          }
        },
        {
          header: '구성원구분코드',
          width: 120,
          name: 'catn_dcd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems:
                  [
                    {"text": "고객", "value": '100'},
                    {"text": "정직원", "value": "200"},
                    {"text": "계약직", "value": "300"},
                    {"text":"프리랜서","value":"400"},
                    {"text":"업체직원","value":"500"},
                    {"text":"기타","value":"900"},
                  ]
            }
          }
        },
        {
          header: '권한구분코드',
          width: 120,
          name: 'aut_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems:
                  [
                    {"text": "개발자", "value": '100'},
                    {"text": "PL", "value": "200"},
                    {"text": "IT", "value": "300"},
                    {"text":"현업","value":"400"},
                    {"text":"PM","value":"500"},
                    {"text":"PMO","value":"600"},
                  ]
            }
          }
        },
        {
          header: '투입프로젝트',
          width: 120,
          name: 'real_prjt_id',
          editor : 'text'
        },
        {
          header: '계획투입시작일자',
          width: 120,
          align: 'center',
          name: 'plan_thw_stdt',
          format: 'yyyy-mm-dd',
          editor : 'datePicker'
        },
        {
          header: '계획투입종료일자',
          width: 120,
          align: 'center',
          name: 'plan_thw_endt',
          format: 'yyyy-mm-dd',
          editor : 'datePicker'
        },
        {
          header: '실제투입시작일자',
          width: 120,
          align: 'center',
          name: 'real_thw_stdt',
          format: 'yyyy-mm-dd',
          editor : 'datePicker'
        },
        {
          header: '실제투입종료일자',
          width: 120,
          align: 'center',
          name: 'real_thw_endt',
          format: 'yyyy-mm-dd',
          editor : 'datePicker'
        },
        {
          header: '이메일주소',
          width: 120,
          name: 'email_addr',
          editor : 'text'
        },
        {
          header: '휴대폰번호',
          width: 120,
          name: 'cpno',
          editor : 'text'
        },
        {
          header: 'IP주소',
          width: 120,
          name: 'ip_addr',
          editor : 'text'
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
          width: 100,
          name: 'grp_tymm',
          editor : 'text'
        },
        {
          header: '정렬',
          width: 100,
          name: 'sort_seq',
          editor : 'text'
        },
        {
          header: '사용',
          width: 100,
          name: 'usg_yn',
          editor : 'text'
        },
        {
          header: '그리드컬럼명1',
          width: 150,
          name: 'grid_colm_nm1',
          editor : 'text'
        },
        {
          header: '그리드컬럼명2',
          width: 150,
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
          name: 'grp_tycd',
        },
        {
          header: '세부유형코드',
          width: 150,
          name: 'dtls_tycd',
          editor : 'text',
        },
        {
          header: '세부유형명',
          width: 150,
          name: 'dtls_tynm',
          editor : 'text',
        },
        {
          header: '정렬',
          width: 100,
          name: 'sort_seq',
          editor : 'text',
        },
        {
          header: '사용',
          width: 100,
          name: 'use_yn',
          editor : 'text',
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
