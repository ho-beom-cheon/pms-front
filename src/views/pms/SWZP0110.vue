<template>
  <!-- CONTENTS -->
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
                <li><a href="/SWZP0014">{{menu_list[0].name}}</a></li>
                <li><a href="/SWZP0010">{{menu_list[1].name}}</a></li>
                <li><a href="/SWZP0030">{{menu_list[2].name}}</a></li>
                <li><a href="/SWZP0040">{{menu_list[3].name}}</a></li>
                <li><a href="/SWZP0050">{{menu_list[4].name}}</a></li>
                <li><a href="/SWZP0060">{{menu_list[5].name}}</a></li>
                <li><a href="/SWZP0070">{{menu_list[6].name}}</a></li>
                <li><a href="/SWZP0080">{{menu_list[7].name}}</a></li>
                <li><a href="/SWZP0090">{{menu_list[8].name}}</a></li>
                <li><a href="/SWZP0100">{{menu_list[9].name}}</a></li>
                <li class="active"><a href="/SWZP0110">{{menu_list[10].name}}</a></li>
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
              <div class="div-header-c"><h2>PMS관리</h2>
              </div>
                  <ul class="filter-con clear-fix">
                    <li class="filter-item-a">
                      <div class="item-con">
                        <label>파일구분</label>
                        <select
                            v-model = "popinfo.file_rgs_dscd_selected"
                            style   = "width: 280px"
                        >
                          <option
                              v-for  = "(file_rgs_dscd, idx) in popinfo.file_rgs_dscd"
                              :key   = "idx"
                              v-text = "file_rgs_dscd.text"
                              :value = "file_rgs_dscd.value"
                          ></option>
                        </select>
                        <div class="btn btn-filter-d" style="margin-bottom: 4px; margin-left: 10px; margin-right: 130px">
                          <a href="#" @click="fnSearch">PMS 테이블백업</a>
                        </div>
                      </div>
                    </li>
                    <li class="filter-item-a">
                      <div class="item-con">
                        팝업정보ID/경로/화면명
                        <input type="text"
                               placeholder="팝업정보ID"
                               v-model="popinfo.scrn_id"
                               @keyup.enter="fnSearch"
                               style   = "width: 145px; margin-right: 5px"
                        >
                        <input type="text"
                               placeholder="경로"
                               v-model="popinfo.file_path"
                               @keyup.enter="fnSearch"
                               style   = "width: 145px;  margin-right: 5px"
                        >
                        <input type="text"
                               placeholder="화면명"
                               v-model="popinfo.scrn_nm"
                               @keyup.enter="fnSearch"
                               style   = "width: 145px;  margin-right: 5px"
                        >
                        <div class="btn btn-filter-d" style="margin-bottom: 4px; margin-left: 5px">
                          <a href="#" @click="open_page">팝업</a>
                        </div>
                      </div>
                    </li>
                    <li class="filter-item">

                    </li>
                  </ul>
                  <ul class="filter-btn" style="margin-right: 37px">
                    <label style="margin-top: 7px">첨부파일</label>
                    <label for="file-upload-btn">
                      <input type="file" id="file-upload-btn">
                    </label>
                    <div class="upload-nameWrap">
                      <input type="text" class="upload-name" disabled>
                      <a href="#" class="upload-delete" onclick="alert('delete-file')"></a>
                    </div>
                    <div class="btn btn-line-p">
                      <a href="#" @click="gridExcelExport">다운로드</a>
                    </div>
                 </ul>
                <div class="div-grid-c">
                </div>
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
                      :rowHeaders="rowHeaders"
                      @click="onClick"
                  ></grid>
                </div>
              </div>
            </div>
            <div class="div2-c">
              <ul class="filter-btn" style="margin-bottom: 40px">
                <div class="btn btn-filter-b">
                  <a href="#" @click="gridAddRow">사용자변경</a>
                </div>
                <div class="btn btn-filter-p" style = "margin-left: 20px">
                  <a href="#" @click="fnSave">저장</a>
                </div>
                <div class="btn btn-filter-p">
                  <a href="#" @click="fnSearch">조회</a>
                </div>
              </ul>
              <ul class="filter-con clear-fix">
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>사번</label>
                    <input type="text"
                           placeholder="입력"
                           v-model="info.empno"
                           @keyup.enter="fnSearch"
                           style   = "width: 220px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>이름</label>
                    <input type="text"
                           placeholder="입력"
                           v-model="info.empnm"
                           @keyup.enter="fnSearch"
                           style   = "width: 220px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>프로젝트명</label>
                    <select
                        v-model = "info.prjt_id_selected"
                        style   = "width: 220px"
                    >
                      <option
                          v-for  = "(prjt_id, idx) in info.prjt_id"
                          :key   = "idx"
                          v-text = "prjt_id.text"
                          :value = "prjt_id.value"
                      ></option>
                    </select>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>업무</label>
                    <select
                        v-model = "info.bzcd_selected"
                        style   = "width: 220px"
                    >
                      <option
                          v-for  = "(bzcd, idx) in info.bzcd"
                          :key   = "idx"
                          v-text = "bzcd.text"
                          :value = "bzcd.value"
                      ></option>
                    </select>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>사용자권한</label>
                    <select
                        v-model = "info.aut_cd_selected"
                        style   = "width: 220px"
                    >
                      <option
                          v-for  = "(aut_cd, idx) in info.aut_cd"
                          :key   = "idx"
                          v-text = "aut_cd.text"
                          :value = "aut_cd.value"
                      ></option>
                    </select>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>비밀번호</label>
                    <input type="text"
                           placeholder="입력"
                           v-model="info.lgn_pwd"
                           @keyup.enter="fnSearch"
                           style   = "width: 220px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>IP</label>
                    <input type="text"
                           placeholder="입력"
                           v-model="info.ip_addr"
                           @keyup.enter="fnSearch"
                           style   = "width: 220px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>핸드폰번호</label>
                    <input type="text"
                           placeholder="입력"
                           v-model="info.cpno"
                           @keyup.enter="fnSearch"
                           style   = "width: 220px"
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="div3-c">
            <div class="div-header-c"><h2>코드유형</h2>
                <ul class="filter-btn">
                  <div class="btn btn-filter-p" style = "margin-left: 10px">
                    <a href="#" @click="fnSearchCode">조회</a>
                  </div>
                </ul>
            </div>
            <div class="div-grid-c">
              <grid
                  ref="grid2"
                  :data="dataSource"
                  :header="header"
                  :columns="columns2"
                  :bodyHeight="235"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  :rowHeaders="rowHeaders"
                  @click="onClick"
              ></grid>
            </div>
          </div>
          <div class="div4-c">
            <div class="div-header-c"><h2>코드상세</h2>
              <ul class="filter-btn">
                <div class="btn btn-filter-b">
                  <a href="#" @click="gridAddRow">행추가</a>
                </div>
                <div class="btn btn-filter-b">
                  <a href="#" @click="gridDelRow">행삭제</a>
                </div>
                <div class="btn btn-filter-p" style = "margin-left: 20px">
                  <a href="#" @click="fnSave">저장</a>
                </div>
              </ul>
            </div>
            <div class="div-grid-c">
              <grid
                  ref="grid3"
                  :data="dataSource"
                  :header="header"
                  :columns="columns3"
                  :bodyHeight="bodyHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  :rowHeaders="rowHeaders"
                  @click="onClick"
              ></grid>
            </div>
          </div>
          <div class="div5-c">
            <div class="div-header-c"><h2>코드유형등록</h2>
              <ul class="filter-btn">
                <div class="btn btn-filter-b">
                  <a href="#" @click="open_page">신규</a>
                </div>
                <div class="btn btn-filter-p" style = "margin-left: 20px">
                  <a href="#" @click="fnSave">저장</a>
                </div>
              </ul>
            </div>
            <div class="div-body-c">
              <div class="div1-body-c">
                <ul class="filter-con clear-fix">
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>그룹유형코드</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>헤더명1</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>헤더명6</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>헤더명11</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                </ul>
              </div>
              <div class="div2-body-c">
                <ul class="filter-con clear-fix">
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>그룹유형명</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 1205px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>헤더명2</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>헤더명3</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>헤더명4</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>헤더명5</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>헤더명7</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>헤더명8</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>헤더명9</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>헤더명10</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>헤더명12</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label>헤더명13</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label >정렬</label>
                      <input type="text"
                             placeholder="입력"
                             v-model="info.pgm_id"
                             @keyup.enter="fnSearch"
                             style   = "width: 230px"
                      >
                    </div>
                  </li>
                  <li class="filter-item-a">
                    <div class="item-con">
                      <label style="margin-bottom: 7px">사용여부</label>
                      <input type="checkbox" id="check_Yn" v-model="info.check_Yn">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';
import WindowPopup from "./SWZP0041.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
import axios from 'axios';

//그리드 아이템 예제
const listItem = [
    {text:"개발", value:"1"},
    {text:"운영", value:"2"},
    {text:"이관", value:"3"}
];

// 파일등록구분
const file_rgs_dscd = [
  {text:"단위테스트증빙", value:'100'},
  {text:"설계서", value:'101'},
  {text:"통합테스트증빙", value:"200"},
  {text:"통합테스트양식", value:"201"},
  {text:"결함오류파일", value:"300"},
  {text:"결함조치파일", value:"400"},
  {text:"신청요청파일", value:"500"},
  {text:"공지사항파일", value:"600"},
  {text:"WBS관리파일", value:"700"},
  {text:"업로드약식", value:"900"},
];

// 프로젝트ID
const prjt_id = [
  {text: "전체", value: "999"},
  {text: "PMS프로젝트", value: "1000000001"},
  {text: "PMS프로젝트2", value: "1000000001"},
  {text: "PMS프로젝트3", value: "1000000001"}
];

// 업무구분
const bzcd = [
  {text: "전체", value: '999'},
  {text: "신용", value: 'AAA'},
  {text: "재무제표", value: "BBB"},
  {text: "신용평가", value: "CCC"},
];

// 사용자권한
const aut_cd = [
  {text: "전체", value: '999'},
  {text: "개발자", value: '100'},
  {text: "PL", value: "200"},
  {text: "IT", value: "300"},
  {text: "현업", value: "400"},
  {text: "PM", value: "500"},
  {text: "PMO", value: "600"},
];

var file_rgs_dscd_selected;
var prjt_id_selected;
var bzcd_selected;
var aut_cd_selected;

export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    grid: Grid,
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
  mounted() {
    console.log("mounted");
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
    change(){
      console.log("change");
    },
    fnSave(){
      debugger;
      this.$refs.grid1.invoke("modifyData");
      console.log("modify");
    },
    onClick(ev) {
      console.log("클릭" + ev.rowKey);
      this.curRow = ev.rowKey;
    },
    fnSearch(){
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
    },
    fnSearchCode(){
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");
      this.$refs.grid3.invoke("setRequestParams", this.info);
      this.$refs.grid3.invoke("readData");
    },
    gridInit(){
      this.$refs.grid1.invoke("clear");
    },
    gridAddRow(){

      this.$refs.grid1.invoke("appendRow",{ col1:"1", col3:"개발", col4:"SWZP0010", col5:"PMS구축"},{focus:true}) ;
    },
    gridDelRow(){
      this.$refs.grid1.invoke("removeRow", this.curRow);
// DB 데이터 삭제로직 추가
    },
    gridADelRow(){
// DB 데이터 삭제로직 추가
    },
    gridIns(){
// DB 데이터 삭제로직 추가
    },
    gridExcelExport(){
      this.$refs.grid1.invoke("export", "xlsx", {fileName:"엑셀다운로드"});
    },
    gridExcelImport(){
// 엑셀파일 업로드 로직 추가
    },
    open_page(){
      this.pop = window.open("../SWZP0041/", "open_page", "width=1000, height=800");
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
      info : {
        /* 사용자 조회 버튼 */
        empno      : this.empno,    // 사번(직원번호)
        empnm      : this.empnm,    // 이름(직원명)
        lgn_pwd    : this.lgn_pwd,  // 비밀번호
        ip_addr    : this.ip_addr,  // IP
        cpno       : this.cpno,     // 핸드폰번호

        prjt_id     : prjt_id,       // 프로젝트ID
        bzcd        : bzcd,          // 업무구분
        aut_cd      : aut_cd,        // 사용자권한

        prjt_id_selected     : prjt_id[0].value,      // 프로젝트ID
        bzcd_selected        : bzcd[0].value,         // 업무구분
        aut_cd_selected      : aut_cd[0].value,       // 사용자권한

      },
      popinfo : {
        /* PMS관리 - 파일구분, 팝업정보ID/경로/화면명 */
        file_rgs_dscd : file_rgs_dscd, // 파일구분
        file_rgs_dscd_selected : file_rgs_dscd[0].value, // 파일구분코드

        scrn_id: this.scrn_id,    // 팝업정보ID
        file_path: this.file_path,    // 파일경로
        scrn_nm  : this.scrn_nm,  // 화면명

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
      bodyHeight: 235,
      rowHeight: 30,
      showDummyRows: true,
      open: false,
      menu_list: [
        {
          id: 'SWZP0014',
          path: '/SWZP0014',
          name: 'PMS현황'
        },
        {
          id: 'SWZP0010',
          path: '/SWZP0010',
          name: '개발현황'
        },
        {
          id: 'SWZP0030',
          path: '/SWZP0030',
          name: '통합테스트'
        },
        {
          id: 'SWZP0040',
          path: '/SWZP0040',
          name: '결함관리'
        },
        {
          id: 'SWZP0050',
          path: '/SWZP0050',
          name: 'PMS신청관리'
        },
        {
          id: 'SWZP0060',
          path: '/SWZP0060',
          name: 'ActionItem및이슈관리현황'
        },
        {
          id: 'SWZP0070',
          path: '/SWZP0070',
          name: '통합테스트진척현황'
        },
        {
          id: 'SWZP0080',
          path: '/SWZP0080',
          name: '개발진척현황'
        },
        {
          id: 'SWZP0090',
          path: '/SWZP0090',
          name: '본오픈이행관리'
        },
        {
          id: 'SWZP0100',
          path: '/SWZP0100',
          name: '산출물체크관리'
        },
        {
          id: 'SWZP0110',
          path: '/SWZP0110',
          name: '시스템관리'
        },
      ],
      dataSource: {
        api: {
          readData: { url: 'http://localhost:8080/SWZP0110/select', method: 'GET' },
        },
        initialRequest: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders:['checkbox', 'rowNum'],
      header:{
        height: 40
      },
      columns1: [
        {
          header: '프로그램ID',
          width: 150,
          name: 'atfl_mng_id',
        },
        {
          header: '순번',
          width: 50,
          name: 'sqno',
        },
        {
          header: '파일구분',
          width: 120,
          name: 'file_rgs_dscd',
        },
        {
          header: '파일경로',
          width: 300,
          name: 'file_path',
        },
        {
          header: '파일명',
          width: 300,
          name: 'file_nm',
        },
        {
          header: 'PMS변경내용',
          name: 'rmrmk',
        },
      ],
      columns2: [
        {
          header: '그룹유형코드',
          width: 100,
          name: 'grp_tycd',
        },
        {
          header: '그룹유형명',
          name: 'grp_tymm',
        },
      ],
      columns3: [
        {
          header: '그룹유형코드',
          width: 100,
          name: 'grp_tycd',
        },
        {
          header: '세부유형코드',
          width: 100,
          name: 'dtls_tycd',
        },
        {
          header: '세부유형명',
          width: 150,
          name: 'dtls_tynm',
        },
        {
          header: '기타내용1',
          width: 150,
          name: 'etc_txt1',
        },
        {
          header: '기타내용2',
          width: 150,
          name: 'etc_txt2',
        },
        {
          header: '기타내용3',
          width: 150,
          name: 'etc_txt3',
        },
        {
          header: '기타내용4',
          width: 150,
          name: 'etc_txt4',
        },
        {
          header: '기타내용5',
          width: 150,
          name: 'etc_txt5',
        },
        {
          header: '기타내용6',
          width: 150,
          name: 'etc_txt6',
        },
        {
          header: '기타내용7',
          width: 150,
          name: 'etc_txt7',
        },
      ]
    }
  },
};

</script>
<style>
</style>
