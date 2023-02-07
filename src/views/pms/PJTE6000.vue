<template>
  <!-- CONTENTS -->
  <div class="contents">

    <!-- ASIDE -- LNB -->
    <PmsSideBar></PmsSideBar>
    <!-- 컨텐츠 영역//  -->
    <div class="contents-body">
      <!-- 필터영역 -->
      <section class="filter">
        <div class = "col">
          <ul class="filter-con clear-fix">
            <combo
                :comboArray = "this.comboList"
                @bkup_id_change="bkup_id_change"
                @prjt_nm_chage="prjt_nm_chage"
                @bzcd_change="bzcd_change"
                @req_dscd_change="req_dscd_change"
                @req_prc_step_cd_change="req_prc_step_cd_change"
            ></combo>
            <li class="filter-item-n">
              <div class="input-searchWrap">신청자
                <input type="text"
                       placeholder="직원명"
                       v-model="info.reqpe_nm"
                       @keypress.enter = "open_pjte9001(1)"
                       style="width: 90px"
                >
                <button class="search-btn"
                        @click="open_pjte9001_btn(1)"
                ></button>
              </div>
            </li>
            <li class="filter-item">
              <input type="text"
                     placeholder="직원번호"
                     v-model="info.reqpe_no"
                     style="width: 70px; background-color: #f2f2f2;"
                     :disabled = true
              >
            </li>
            <li class="filter-item-n">
              <div class="input-searchWrap">처리자
                <input type="text"
                       placeholder="직원명"
                       v-model="info.prcpe_nm"
                       @keypress.enter = "open_pjte9001(2)"
                       style="width: 90px"
                >
                <button class="search-btn"
                        @click="open_pjte9001_btn(2)"
                ></button>
              </div>
            </li>
            <li class="filter-item">
              <input type="text"
                     placeholder="직원번호"
                     v-model="info.prcpe_no"
                     style="width: 70px; background-color: #f2f2f2;"
                     :disabled = true
              >
            </li>
          </ul>
          <ul class="filter-con clear-fix">
            <li class="filter-item">
              <div class="item-con">신청일자
                <div class="input-dateWrap"><input type="date" :max="req_end_dt" v-model="req_sta_dt"></div>
                -
                <div class="input-dateWrap"><input type="date" :min="req_sta_dt" v-model="req_end_dt"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">처리일자
                <div class="input-dateWrap"><input type="date" :max="prc_end_dt" v-model="prc_sta_dt"></div>
                -
                <div class="input-dateWrap"><input type="date" :min="prc_sta_dt" v-model="prc_end_dt"></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">신청내용
                <input type="text"
                       placeholder="입력"
                       v-model="info.req_txt"
                       style   = "width: 200px"
                >
              </div>
            </li>

            <li class="filter-item">
              <div class="item-con">
                <input type="checkbox" id="check_Yn" v-model="check_Yn">
                <label>　완료건 포함</label>
              </div>
            </li>
          </ul>
          <ul class="filter-btn">
            <button class="btn btn-filter-b" @click="open_page()">
              <a href="#" >신규신청</a>
            </button>
            <button class="btn btn-filter-e" @click="gridExcelExport">
              <a href="#" >엑셀다운로드</a>
            </button>
            <button class="btn btn-filter-p" style = "margin-left: 20px" @click="fnSearch">
              <a href="#" >조회</a>
            </button>
          </ul>
        </div>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="gridWrap" style="min-width: 750px;">
          <grid
              ref="grid"
              :data="dataSource"
              :header="header"
              :columns="columns"
              :bodyHeight="bodyHeight"
              :showDummyRows="showDummyRows"
              :columnOptions="columnOptions"
              :rowHeight="rowHeight"
              :minRowHeight="25"
              :rowHeaders="rowHeaders"
              @dblclick = "dbClick"
          ></grid>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
import combo from '@/components/Combo';
import {axiosService} from "@/api/http";
import PmsSideBar from  "@/components/PmsSideBar";

// 신정자, 처리자 직원조회 팝업 종료 시 직원명, 직원번호 받아오는 로직
window.empData = (empnm, empno, btn_id) => {
  if(btn_id === '1'){  // 신청자
    window.pms_manage.info.reqpe_nm = empnm
    window.pms_manage.info.reqpe_no = empno
  }else{  // 처리자
    window.pms_manage.info.prcpe_nm = empnm
    window.pms_manage.info.prcpe_no = empno
  }
}

// PJTE6001에서 데이터 insert / update 시 그리드 데이터 재조회 하기 위한 로직
window.pmsRegisterData = (res) => {
  if(res === 'insert' || res === 'update'){
    // checkRegisterData 값이 true로 변경되면 watch에서 로직 수행
    window.pms_manage.checkRegisterData = true;
  }
}


export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    grid: Grid,
    combo,
    PmsSideBar,
  },
  mounted() {
    this.fnSearch();
    window.pms_manage = this;
    console.log("mounted");
  },
  updated(){
    this.setNo();
  },
  // 일반적인 함수를 선언하는 부분
  methods: {
    //직원조회 버튼 클릭 시
    open_pjte9001_btn(btn_id) {
      let empnm = ''
      if (btn_id == '1') {
        empnm = this.info.reqpe_nm
      } else if (btn_id == '2') {
        empnm = this.info.prcpe_nm
      }
      if((empnm === '' || empnm == "null" || empnm === undefined)) {
        let bkup_id = this.info.bkup_id_selected, prjt_id =  this.info.prjt_nm_selected
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      } else {
        let bkup_id = this.info.bkup_id_selected, prjt_id =  this.info.prjt_nm_selected
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      }
    },
    //엔터키를 눌러 직원 조회
    open_pjte9001(btn_id) {         // PJTE9001(직원조회팝업) 오픈하는 method
      // 직원조회시 검색된 이름이 단일건이면 팝업 열리지 않고 바로 직원명,직원번호에 데이터 입력되도록
      if(this.info.prjt_nm_selected === '' || this.info.prjt_nm_selected == null && this.info.prjt_nm_selected ===undefined){
        alert("프로젝트가 선택되어 있어야 직원검색이 가능합니다")
        return false;
      }
      let prjt_id_selected = this.info.prjt_nm_selected
      let bkup_id_selected = this.info.bkup_id_selected
      let empnm = btn_id === 1 ? this.info.reqpe_nm : this.info.prcpe_nm
      if (empnm != null && empnm != '') {
        axiosService.get("/PJTE9001/select", {
          params: {
            empnm,
            prjt_id_selected,
            bkup_id_selected
          }
        })
            .then(res => {
              let res_data = res.data.data.contents;
              // console.log(res_data)
              if (res_data.length == 1) {  // 입력한 직원명으로 조회한 값이 단건일 경우 : 직원번호 바인딩
                if (btn_id == '1') {
                  // 신청자 직원명, 직원번호
                  this.info.reqpe_no = res.data.data.contents[0].empno
                  this.info.reqpe_nm = res.data.data.contents[0].empnm
                } else if (btn_id == '2') {
                  // 처리자 직원명, 직원번호
                  this.info.prcpe_no = res.data.data.contents[0].empno
                  this.info.prcpe_nm = res.data.data.contents[0].empnm
                }
              } else { // 입력한 직원명으로 조회한 값이 여러건일 경우 : PJTE9001 팝업 호출 후 파라미터 값으로 조회
                let bkup_id = this.info.bkup_id_selected, prjt_id = this.info.prjt_nm_selected
                window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
              }
            })
      } else { // 직원명에 입력한 값이 없을 때 : PJTE9001 팝업 호출
        let bkup_id = this.info.bkup_id_selected, prjt_id = this.info.prjt_nm_selected
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      }
    },
// 직원명 삭제 시 직원번호 초기화
    setNo() {
      if(this.info.reqpe_nm === "") this.info.reqpe_no = "";
      if(this.info.prcpe_nm === "") this.info.prcpe_no = "";
    },
    // Combo.vue 에서 받아온 값
    bkup_id_change(params) {this.info.bkup_id_selected = params},
    prjt_nm_chage(params) {this.info.prjt_nm_selected = params},
    bzcd_change(params) {this.info.bzcd_selected = params},
    req_dscd_change(params) {this.info.req_dscd_selected = params},
    req_prc_step_cd_change(params) {this.info.req_prc_step_cd_selected = params},

    // 그리드 더블클릭 시, PJTE6001 호출
    dbClick(ev) {
      let mng_id = this.$refs.grid.invoke("getValue", ev.rowKey, "mng_id")
      this.open_page(mng_id)
    },
    // 그리드 데이터 조회
    fnSearch(){
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    // 그리드 엑셀다운로드
    gridExcelExport(){
      // useFormattedValue 옵션으로 그리드 데이터 내에 select된 값 value가 아닌 text 값으로 설정되어 다운로드 가능
      this.$refs.grid.invoke("export", "xlsx", {useFormattedValue:true, fileName:"PMS신청관리_"+this.getCurrentYyyymmdd()});
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

    // PJTE6001(PMS신청등록) 팝업 오픈 method
    open_page(mng_id){
      // 파라미터 설정
      if(mng_id == null || mng_id==='' || mng_id === undefined) mng_id=''
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem('LOGIN_PROJ_ID')
      this.pop = window.open(`../PJTE6001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&mng_id=${mng_id}`, "open_page", "width=1000, height=860");
    }

  },
  // 특정 데이터에 실행되는 함수를 선언하는 부분
  // newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{
    checkRegisterData() {
      if(this.checkRegisterData){
        this.$refs.grid.invoke("setRequestParams", this.info);
        this.$refs.grid.invoke("readData");
        this.checkRegisterData = false;
      }
    },
    // check_Yn 값 변하면 info 내의 check_Yn 값 변화
    check_Yn () {
      this.check_Yn ? this.info.check_Yn = 'Y' : this.info.check_Yn = 'N';
    },
    // 일자들은 데이터 조회시 '-' 이 빠져야 하므로 .split('-').join('')으로 통일
    req_sta_dt (){
      this.info.req_sta_dt = this.req_sta_dt.split('-').join('');
    } ,    // 신청일자STA
    req_end_dt () {
      this.info.req_end_dt = this.req_end_dt.split('-').join('');
    },    // 신청일자END
    prc_sta_dt () {
      this.info.prc_sta_dt = this.prc_sta_dt.split('-').join('');
    },    // 처리일자STA
    prc_end_dt () {
      this.info.prc_end_dt = this.prc_end_dt.split('-').join('');
    },    // 처리일자END

  },
  // 변수 선언부분
  data() {
    return {
      checkRegisterData : false,
      comboList : ["C27","C0","C1","C10","C11"],
      info : {

        reqpe_nm    : this.reqpe_nm,    // 신청자
        reqpe_no    : this.reqpe_no,    // 신청자 번호
        prcpe_nm    : this.prcpe_nm,    	// 처리자
        prcpe_no    : this.prcpe_no,    	// 처리자 번호
        req_txt     : this.req_txt,//신청내용

        prjt_nm_selected      : sessionStorage.getItem("LOGIN_PROJ_ID"),    // 프로젝트
        bkup_id_selected      : '0000000000',     // 백업ID
        bzcd_selected         : sessionStorage.getItem("LOGIN_AUT_CD") === '300' || sessionStorage.getItem("LOGIN_AUT_CD") === '400' ||
                                sessionStorage.getItem("LOGIN_AUT_CD") === '500' || sessionStorage.getItem("LOGIN_AUT_CD") === '600' ||
                                sessionStorage.getItem("LOGIN_AUT_CD") === '900' ? 'TTT':sessionStorage.getItem("LOGIN_BZCD"),
        req_dscd_selected     : 'TTT',      // 신청구분
        req_prc_step_cd_selected : 'TTT',   // 처리구분
        check_Yn : 'N',     // 완료건포함(데이터 조회용)
        req_sta_dt : '',    // 신청일자STA
        req_end_dt : '',    // 신청일자END
        prc_sta_dt : '',    // 처리일자STA
        prc_end_dt : '',    // 처리일자END
      },
      addRow : {

      },
      req_sta_dt : '',    // 신청일자STA
      req_end_dt : '',    // 신청일자END
      prc_sta_dt : '',    // 처리일자STA
      prc_end_dt : '',    // 처리일자END

      check_Yn    : false,  // 완료건 포함(체크박스 값)

      count:0,
      curRow:-1,
      title:"",
      scrollX:false,
      scrollY:false,
      bodyHeight: 700,
      rowHeight: 25,
      showDummyRows: false,
      open: false,
      dataSource: {
        api: {
          readData: { url: process.env.VUE_APP_API + '/PJTE6000/select', method: 'GET' },
          modifyData : { url: process.env.VUE_APP_API + '/PJTE6000/select', method: 'PUT'},
        },
        initialRequest: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders:['rowNum'],
      header:{
        height: 40
      },
      columns: [
        {
          header: '신청ID',
          width: 90,
          align: 'center',
          filter: 'text',
          name: 'mng_id'/*요청자번호*/
        },
        {
          header: '업무구분',
          width: 100,
          minWidth: 50,
          maxWidth: 250,
          name: 'bzcd',
          align: 'center',
          filter: 'select',
          formatter: 'listItemText',
          disabled : true,
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000001N
            }
          }
        },
        {
          header: '신청구분',
          width: 100,
          align: 'left',
          name: 'req_dscd',
          formatter: 'listItemText',
          disabled : true,
          filter: 'select',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000010N
            }
          }
        },
        {
          header: '신청일자',
          width: 90,
          align: 'center',
          name: 'req_dt',
          format: 'yyyy-mm-dd',
          filter: 'text',
        },
        {
          header: '신청자',
          width: 60,
          align: 'center',
          name: 'reqpe_nm',
          type: 'text',
          filter: 'text',
        },
        {
          header: '신청내용',
          width: 500,
          align: 'left',
          name: 'req_txt',
          type: 'text',
          filter: 'text',
        },
        {
          header: '조치예정일자',
          width: 90,
          align: 'center',
          name: 'ttmn_scd_dt',
          format: 'yyyy-mm-dd',
          filter: 'text',
        },
        {
          header: '처리일자',
          width: 90,
          align: 'center',
          name: 'prc_dt',
          format: 'yyyy-mm-dd',
          filter: 'text',
        },
        {
          header: '처리자',
          width: 60,
          align: 'center',
          name: 'prcpe_nm',
          type: 'text',
          filter: 'text',
        },
        {
          header: '처리내용',
          width: 450,
          align: 'left',
          name: 'prc_txt',
          type: 'text',
          filter: 'text',
        },
        {
          header: '처리상태',
          align: 'left',
          name: 'req_prc_step_cd',
          formatter: 'listItemText',
          disabled : true,
          filter: 'select',
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000011N
            }
          }
        }
      ]
    }
  },
};

</script>
<style>
/* [체크박스 관련 스타일 지정] */
/* 완료건 포함 체크박스 커스터마이징 */
input[type='checkbox'] {
  /* [체크박스 클릭 (전) 이미지 설정] */
  background-image : url(../../assets/img/check_off.png);
}
</style>
