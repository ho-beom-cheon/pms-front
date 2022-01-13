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
          <th>프로젝트명</th>
          <td>
            <select
                id="id.prjt_id"
                v-model="info.prjt_id_selected"
                disabled
            >
              <option
                  v-for="(prjt_id, idx) in info.prjt_id"
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
                  v-for="(bzcd, idx) in info.bzcd"
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
      <button class="btn btn-filter-b" @click="closePopup">닫기</button>
      <button class="btn btn-filter-p" @click="fnChoice">선택</button>
    </div>
  </section>
</template>

<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import {Grid} from '@toast-ui/vue-grid';

//그리드 아이템 예제
var listItem = [{text: "개발", value: "1"}, {text: "운영", value: "2"}, {text: "이관", value: "3"}];
var prjt_id = [{text: "PMS프로젝트", value: "1000000001"}, {text: "PMS프로젝트2", value: "1000000002"}, {text: "PMS프로젝트3", value: "1000000003"}];

// 업무구분
const bzcd = [
  {text: "전체", value: '999'},
  {text: "신용", value: 'AAA'},
  {text: "재무제표", value: "BBB"},
  {text: "신용평가", value: "CCC"},
];

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    grid: Grid,
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  // 화면 동작 시 제일 처음 실행되는 부분
  // 변수 초기화
  created() {
    // 권한에 따른 컬럼 세팅

    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
    this.setCombo();
    this.fnSearch();    // 최초조회
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
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

  },
  // 일반적인 함수를 선언하는 부분
  methods: {
    setCombo() {  // 권한에 따른 콤보박스 활성화/비활성화
      const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      if (aut_cd == '500' || aut_cd == '600') {  // 권한ID가 500, 600인 경우  <프로젝트명> 콤보 활성화
        document.getElementById('id.prjt_id').disabled = false;
      }
    },
    fnChoice() {  // 선택 버튼 클릭 시 Button의 targetId 에 따라 값을 넘김
      debugger;
      const btn_id = opener.document.activeElement.id;
      if(typeof this.info.empno!=="undefined" && this.info.empno !== '' && this.info.empno !== null) {
        if (btn_id == 'btn.achi_nm') {
          opener.document.getElementById(opener.document.getElementById('id.achi_nm').id).value = this.info.empnm // 요청자 직원명
          opener.document.getElementById(opener.document.getElementById('id.achi_no').id).value = this.info.empno // 요청자 직원번호
          window.close();
        } else if (btn_id == 'btn.ttmn_crpe_nm') {
          opener.document.getElementById('id.ttmn_crpe_nm').value = this.info.empnm  // 조치담당자 직원명
          opener.document.getElementById('id.ttmn_crpe_no').value = this.info.empno  // 조치담당자 직원번호
          window.close();
        }
      } else {
        alert('선택 항목이 없습니다.');
      }
    },
    change() {
      console.log();
    },
    onClick(ev) {
      this.curRow = ev.rowKey;
      const currentRowData = (this.$refs.grid.invoke("getRow", this.curRow));
      if(currentRowData != null) {
        this.cellDataBind(currentRowData) // currentRowData가 있을 때 Row 클릭 시 상세내용에 Bind
      }
    },
    dblonClick(ev) {  // 그리드 셀 더블클릭 시 선택버튼 클릭
      this.curRow = ev.rowKey;
      const currentRowData = (this.$refs.grid.invoke("getRow", this.curRow));
      if(currentRowData != null) {
        this.fnChoice()
      }
    },
    /* 그리드 Row onClick클릭 시 상세내용에 Bind */
    cellDataBind(currentRowData) {
      this.info.prjt_id_selected = currentRowData.prjt_id;           // (상세)관리구분
      this.info.bzcd_selected = currentRowData.bzcd;         // (상세)처리상태
      this.info.empno = currentRowData.empno;                              // (상세)관리ID
      this.info.empnm = currentRowData.empnm;           // (상세)요청구분
    },
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
      console.log("count의 값이 변경되면 여기도 실행");
      console.log("new Value :: " + a);
      console.log("old Value :: " + b);
    },
  },
  // 변수 선언부분
  data() {
    return {
      info: {
        /* 필터 변수 */
        prjt_id: prjt_id,                    // 프로젝트명
        bzcd: bzcd,                          // 업무구분
        empno  : this.empno,               // 직원번호
        empnm  : this.empnm,               // 직원명

        prjt_id_selected: prjt_id[0].value,  // 선택 된 프로젝트명
        bzcd_selected: bzcd[0].value,        // 선택 된 업무구분

        login_prjt_id : sessionStorage.getItem("LOGIN_PROJ_ID"),
        login_aut_cd : sessionStorage.getItem("LOGIN_AUT_CD"),
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
          align: 'center',
          name: 'prjt_id',
        },
        {
          header: '업무구분',
          align: 'center',
          name: 'bzcd',
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