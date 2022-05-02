<template>
  <!-- CONTENTS -->
  <div class="contents">
    <div class="div-img"></div>

    <!-- ASIDE -- LNB -->
    <PmsSideBar></PmsSideBar>
    <!-- 컨텐츠 영역 -->
    <div class="contents-body">

      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box"  style="height: 530px">
          <div class="div-header"><h2>전체 게시판 목록</h2>
            <ul class="filter-btn">
<!--              <button class="btn btn-filter-e" @click="gridExcelExport(1)">엑셀다운로드</button>-->
              <button class="btn btn-filter-p" style="margin-left: 10px"><router-link tag="a" to="/PJTE9100">새 게시판 추가</router-link></button>
            </ul>
          </div>

          <div class="gridWrap" style="min-width: 520px;">
            <grid
                ref="grid1"
                :data="dataSource"
                :header="header"
                :columns="columns1"
                :minBodyHeight="155"
                :bodyHeight="455"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeaders="rowHeaders"
                :rowHeight="rowHeight"
                @click="onClick1"
            ></grid>
          </div>
        </div>

      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import Combo from "@/components/Combo"
import { Grid } from '@toast-ui/vue-grid';
import XLSX from "xlsx";
import PmsSideBar from  "@/components/PmsSideBar";
import WindowPopup from "./PJTE3001.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http";
import {mapActions} from "vuex";

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    grid: Grid,
    PmsSideBar
  },

  mounted() {
    // 화면 접속 시 데이터 조회
    this.fnSearch();
    // 화면 초기화
    this.init();
    window.pms_register = this;
  },
  updated(){
    // this.setNo();
  },

// 일반적인 함수를 선언하는 부분
  methods: {
    // 화면 init
    init() {
      // 그리드 초기화
      this.$refs.grid1.invoke("clear");
      /*this.$refs.grid2.invoke("clear");
      this.$refs.grid3.invoke("clear");*/
      // 그리드1 전체 비활성화
      this.$refs.grid1.invoke("disable");

      // // 시스템 관리자가 아닌경우 자신의 이름과 번호를 조회조건에 바인딩
      // if(sessionStorage.getItem("LOGIN_AUT_CD") !== '900'){
      //   this.info.man_nm = sessionStorage.getItem("LOGIN_EMP_NM")
      //   this.info.man_no = sessionStorage.getItem("LOGIN_EMP_NO")
      // }
    },
    ...mapActions("pms",["SET_DATA"]),
    async setData(value) {
      try {
        await this.SET_DATA(value)

      } catch (error) {
        console.log("Error Msg : " + error)
      }
    },

    onClick1(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
      if(this.curRow === undefined) {
        return;
      }
      let gridRow = this.$refs.grid1.invoke("getRow",this.curRow);
      this.setData(gridRow);
      this.$router.push({path : 'PJTE9120', params :  {getRow :this.$refs.grid1.invoke("getRow" , this.curRow)} })
      this.info.current_man_no = this.$refs.grid1.invoke("getValue", this.curRow, "man_no") // ROW클릭 시 인력번호
    },

    //조회
    fnSearch(){
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
    },

  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{

  },
// 변수 선언부분
  data() {
    return {
      info : {
        prjt_id_selected : sessionStorage.getItem("LOGIN_PROJ_ID"),
        bkup_id_selected : '0000000000',
        bubun_nm : '',
        bsn_cls_nm : '',
        gesipan_titl : '',
        gesipan_dsc : '',
        login_dept_cd : sessionStorage.getItem("LOGIN_DEPT_CD"),
        annym_yn : '',
        nmb_inq_yn : '',
        cmnt_yn : '',
        rply_yn : '',
        file_upld_yn : ''

      },

      /* grid 속성 */
      count:0,
      curRow:-1,
      title:"",
      scrollX:false,
      scrollY:false,
      bodyHeight: 630,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: false,
      editingEvent : "click",

      // toast ui grid 데이터
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9110/select1', method: 'GET' },
        },
        initialRequest: false,
        contentType : 'application/json;',
        headers : {  'x-custom-header' : 'custom-header'  },
        withCredentials: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders:['rowNum'],
      header:{
        height: 25,
      },
      columns1: [
        {
          header: '게시부서',
          width: 150,
          align: 'center',
          //name: 'man_nm',
          name : 'bubun_nm',
          editor: 'text',
        },
        {
          header: '게시구분',
          width: 100,
          align: 'center',
          //name: 'man_nm',
          name : 'bsn_cls_nm',
          editor: 'text',
        },
        {
          header: '제목',
          width: 500,
          align: 'left',
          //name: 'man_nm',
          name : 'gesipan_titl',
          editor: 'text',
          filter: { type: 'text', showApplyBtn: true, showClearBtn: true }
        },
        {
          header: '설명',
          //align: 'center',
          name: 'gesipan_dsc',
          editor: 'text',
          filter: { type: 'text', showApplyBtn: true, showClearBtn: true }
        },
        {
          header: '익명',
          //align: 'center',
          name: 'annym_yn',
          editor: 'text',
          hidden : true
        },
        {
          header: '댓글',
          //align: 'center',
          name: 'cmnt_yn',
          editor: 'text',
          hidden : true
        },
        {
          header: '답글',
          //align: 'center',
          name: 'rply_yn',
          editor: 'text',
          hidden : true
        },
        {
          header: '좋아요',
          //align: 'center',
          name: 'good_yn',
          editor: 'text',
          hidden : true
        },
        {
          header: '백업ID',
          //align: 'center',
          name: 'bkup_id',
          editor: 'text',
          hidden : true
        },
        {
          header: '프로젝트ID',
          //align: 'center',
          name: 'prjt_id',
          editor: 'text',
          hidden : true
        },
        {
          header: '게시판ID',
          //align: 'center',
          name: 'gesipan_id',
          editor: 'text',
          hidden : true
        },
        {
          header: '소속확인여부',
          //align: 'center',
          name: 'afrm_yn',
          editor: 'text',
          hidden : true
        },
        {
          header: '조회횟수여부',
          //align: 'center',
          name: 'nmb_inq_yn',
          editor: 'text',
          hidden : true
        },
        {
          header: '페이징여부',
          //align: 'center',
          name: 'pgn_yn',
          editor: 'text',
          hidden : true
        },
        {
          header: '파일업로드여부',
          //align: 'center',
          name: 'file_upld_yn',
          editor: 'text',
          hidden : true,
        },
        {
          header: '게시부문',
          //align: 'center',
          name: 'bubun_cd',
          editor: 'text',
          hidden : true,
        },
        {
          header: '게시구분',
          //align: 'center',
          name: 'bsn_cls_cd',
          editor: 'text',
          hidden : true
        },
      ],
    }
  },
};

</script>
<style>
/*가운데 정렬을 위해서 강제로 맞춰줌.*/
.tui-grid-cell-header{
  padding: 0px !important;
}
</style>
