<template>
  <!--  -->
  <section class="popup">
    <div class="pop-header">
      <h1>직원검색</h1>
      <a href="#" class="pop-close" @click="closePopup"></a>
    </div>
    <div class="pop-body">
      <table>
        <colgroup>
          <col width="140px">
          <col width="*">
          <col width="140px">
          <col width="*">
        </colgroup>
        <tbody>
        <tr>
          <th>프로젝트</th>
          <td>
            <select
                id="id.prjt_id"
                v-model="info.prjt_id_selected"
                disabled
            >
              <option
                  v-for="(prjt_id, idx) in prjt_id"
                  :key="idx"
                  v-text="prjt_id.text"
                  :value="prjt_id.value"
              ></option>
            </select>
          </td>
          <th>업무구분</th>
          <td>
            <select
                v-model="info.bzcd_selected"
            >
              <option
                  v-for="(bzcd, idx) in bzcd"
                  :key="idx"
                  v-text="bzcd.text"
                  :value="bzcd.value"
              ></option>
            </select>
          </td>
        </tr>
        <tr>
          <th>직원번호</th>
          <td>
            <input type="text"
                   placeholder="입력"
                   v-model="info.empno"
                   @keyup.enter="fnSearch"
            >
          </td>
          <th>직원명</th>
          <td>
            <input type="text"
                   placeholder="입력"
                   v-model="info.empnm"
                   @keyup.enter="fnSearch"
                   style="width: calc(100% - 54px); float:left"
            >
            <button class="btn btn-filter-p"
                    style="min-width: 50px; margin-left: 4px; float:left"
                    @click="fnSearch"
            >조회</button>
          </td>
        </tr>

        </tbody>
      </table>
      <hr>
      <!-- page contents -->
      <section class="page-contents">
        <div class="gridWrap" style="min-width: 500px;">
          <grid
              ref="grid"
              :data="dataSource"
              :header="header"
              :columns="columns"
              :bodyHeight="bodyHeight"
              :minRowHeight="minRowHeight"
              :showDummyRows="showDummyRows"
              :columnOptions="columnOptions"
              :rowHeight="rowHeight"
              :rowHeaders="rowHeaders"
              @click="onClick"
              @dblclick="dblonClick"
          ></grid>
        </div>
      </section>
    </div>
    <div class="pop-footer">
      <span>선택버튼을 누르거나 행 더블클릭 시 선택할 수 있습니다.</span>
      <button class="btn btn-filter-b" @click="closePopup">닫기</button>
      <button class="btn btn-filter-p" @click="fnChoice">선택</button>
    </div>
  </section>
</template>

<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import {Grid} from '@toast-ui/vue-grid';
import PJTE3000 from "@/views/pms/PJTE3000";
import {axiosService} from "@/api/http";

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    grid: Grid,
  },
  beforeCreate() {
    // console.log("beforeCreate");
  },
  // 화면 동작 시 제일 처음 실행되는 부분
  // 변수 초기화
  created() {
    // 권한에 따른 컬럼 세팅
    // console.log("created");
    this.getCombo();
  },
  beforeMount() {
    // console.log("beforeMount");
  },
  mounted() {
    // console.log("mounted");
    // 초기화
    this.init();
    // 최초조회
    this.fnSearch();
  },
  beforeUpdate() {
    // console.log("beforeUpdate");
  },
  updated() {
    // console.log("updated");
  },
  beforeDestroy() {
    // console.log("beforeDestroy");
  },
  destroyed() {
    // console.log("destroyed");
  },
  // 함수를 선언하는 부분
  // "종속대상에 따라 캐싱"된다는 점이 method와는 다른점.
  computed: {

  },
  // 일반적인 함수를 선언하는 부분
  methods: {
    // 콤보데이터 조회
    getCombo(){
      axiosService.get("/PJTE9001/combo", {
        params: {
          prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
          bkup_id: this.bkup_id_selected
        }
      }).then(res => {
        this.setCombo(res.data.data);
      }).catch(e => {

      });
    },
    // 프로젝트명, 업무구분 콤보박스 셋팅
    setCombo(combodata) {
      //프로젝트명 세팅
      for(let i=0; i<combodata.contents.length; i++) {
        this.prjt_id.push({"text": combodata.contents[i].dtls_tynm, "value": combodata.contents[i].dtls_tycd});
      }
      //업무구분 세팅
      this.bzcd.push({"text": "전체", "value": "TTT"});
      this.info.bzcd_selected = this.bzcd[0].value
      for(let i=0; i<combodata.contents1.length; i++) {
        this.bzcd.push({"text": combodata.contents1[i].dtls_tynm, "value": combodata.contents1[i].dtls_tycd});
      }
    },
    //초기화 및 초기 값 세팅
    init() {
      //그리드 셀 비활성화
      this.$refs.grid.invoke("disable");
      // 그리드 초기화
      this.$refs.grid.invoke("clear");

      const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      if (aut_cd == '500' || aut_cd == '600') {  // 권한ID가 500, 600인 경우  <프로젝트명> 콤보 활성화
        document.getElementById('id.prjt_id').disabled = false;
      }
    },
    fnChoice() {  // 선택 버튼 클릭 시
      opener.empData(this.send_empnm, this.send_empno, this.open_btn_id, this.open_emprow, this.open_empcol);
      window.close();
    },

    onClick(ev) {
      this.curRow = ev.rowKey;
      const currentRowData = (this.$refs.grid.invoke("getRow", this.curRow));
      if(currentRowData != null) {
        this.send_empno = currentRowData.empno;                              // (상세)관리ID
        this.send_empnm = currentRowData.empnm;           // (상세)요청구분
      }
    },
    dblonClick(ev) {  // 그리드 셀 더블클릭 시 선택버튼 클릭
      this.curRow = ev.rowKey;
      const currentRowData = (this.$refs.grid.invoke("getRow", this.curRow));
      if(currentRowData != null) {
        this.fnChoice()
      }
    },
    // /* 그리드 Row onClick클릭 시 상세내용에 Bind */
    // cellDataBind(currentRowData) {
    //   this.info.prjt_id_selected = currentRowData.prjt_id;           // (상세)관리구분
    //   this.info.bzcd_selected = currentRowData.bzcd;         // (상세)처리상태
    //   this.info.empno = currentRowData.empno;                              // (상세)관리ID
    //   this.info.empnm = currentRowData.empnm;           // (상세)요청구분
    // },
    closePopup() {
      window.close();
    },
    fnSearch() {
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    gridInit() {
      this.$refs.grid.invoke("clear");
    },
    gridIns() {
      // DB 데이터 삭제로직 추가
    },
  },
  // 특정 데이터에 실행되는 함수를 선언하는 부분
  // newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch: {
    count: (a, b) => {
      // console.log("count의 값이 변경되면 여기도 실행");
      // console.log("new Value :: " + a);
      // console.log("old Value :: " + b);
    },
  },
  // 변수 선언부분
  data() {
    return {
      open_btn_id : this.$route.query.btn_id,      // 오픈한 main화면에서 넘겨받은 btn id
      open_emprow : this.$route.query.emp_row,
      open_empcol : this.$route.query.emp_col,

      prjt_id : [],            // 프로그램 리스트
      bzcd : [],               // 업무구분 리스트

      //팝업에서 메인으로 넘길 때 사용하는 변수
      send_empno : '',
      send_empnm : '',

      info: {
        /* 필터 변수 */
        empno  : this.$route.query.empno,                         // 직원번호
        empnm  : this.$route.query.empnm,            // 직원명
        prjt_id_selected: this.$route.query.prjt_id, // 선택 된 프로젝트명
        // prjt_id_selected: "", // 선택 된 프로젝트명
        bkup_id_selected: this.$route.query.bkup_id, // 백업 ID
        bzcd_selected: '',                // 선택 된 업무구분
      },

      addRow: {
        grid: this.grid,
      },
      count: 0,
      curRow: -1,
      title: "",
      scrollX: false,
      scrollY: false,
      bodyHeight: 300,
      rowHeight: 40,
      minRowHeight: 10,
      showDummyRows: true,
      open: false,
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9001/select', method: 'GET' },
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
        height: 30,
      },
      columns: [
        {
          header: '프로젝트명',
          align: 'left',
          name: 'prjt_id',
          width: 180,
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems:this.$store.state.pms.CD0000000000N
            }
          }
        },
        {
          header: '업무구분　　',
          align: 'center',
          name: 'bzcd',
          width: 100,
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options:{
              listItems:this.$store.state.pms.CD1000000001N
            }
          }
        },
        {
          header: '직원번호',
          align: 'center',
          name: 'empno',
        },
        {
          header: '직원명',
          align: 'center',
          name: 'empnm',
        },
        {
          header: '직급',
          align: 'center',
          name: 'rank_nm',
        },
      ],
    }
  },
};

</script>

<style>

</style>