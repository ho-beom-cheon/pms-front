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
                <li class="active"><a href="/PJTE1000">{{ menu_list[0].name }}</a></li>
                <li><a href="/PJTE2100">{{ menu_list[1].name }}</a></li>
                <li><a href="/PJTE2110">{{ menu_list[2].name }}</a></li>
                <li><a href="/PJTE2200">{{ menu_list[3].name }}</a></li>
                <li><a href="/PJTE2210">{{ menu_list[4].name }}</a></li>
                <li><a href="/PJTE3000">{{ menu_list[5].name }}</a></li>
                <li><a href="/PJTE4000">{{ menu_list[6].name }}</a></li>
                <li><a href="/PJTE5000">{{ menu_list[7].name }}</a></li>
                <li><a href="/PJTE6000">{{ menu_list[8].name }}</a></li>
                <li><a href="/PJTE7000">{{ menu_list[9].name }}</a></li>
                <li><a href="/PJTE9000">{{ menu_list[10].name }}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- 컨텐츠 영역 -->
    <div class="contents-body">
      <!-- 필터영역 -->
      <section class="filter">
        <ul class="filter-con clear-fix">
          <li class="filter-item">
            <div class="item-con">프로젝트명
              <select
                  id="id.bkup_id"
                  v-model="info.bkup_id_selected"
                  style="width: 167px"
                  :disabled = true
              >
                <option
                    v-for="(bkup_id, idx) in info.bkup_id"
                    :key="idx"
                    v-text="bkup_id.text"
                    :value="bkup_id.value"
                ></option>
              </select>
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">프로젝트명
              <select
                  id="id.prjt_id"
                  v-model="info.prjt_id_selected"
                  style="width: 167px"
                  :disabled = true
              >
                <option
                    v-for="(prjt_id, idx) in info.prjt_id"
                    :key="idx"
                    v-text="prjt_id.text"
                    :value="prjt_id.value"
                ></option>
              </select>
            </div>
          </li>
          <div class="btn btn-filter-p" style = "margin-top: 5px">
            <a href="#" @click="fnSearch">재조회</a>
          </div>
        </ul>
        <ul class="filter-btn">
          <div class="btn btn-filter-p" style = "margin-left: 10px; background-color: #9FC93C">
            <a href="#" @click="fnSearch">ProjectEyes 가이드 ⓘ</a>
          </div>
        </ul>
      </section>
      <!-- page contents -->
      <section class="page-contents">
        <div class="multiGridWrap-a">
          <div class="div1-a">
            <div class="div-header-a"><h2>TO-DO현황</h2>
            </div>
            <div class="div-grid-a">
              <grid
                  ref="grid1"
                  :data="dataSource"
                  :header="header"
                  :columns="columns1"
                  :bodyHeight="bodyHeight"
                  :minRowHeight="minRowHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  :rowHeaders="rowHeaders"
                  @click="onClick"
              ></grid>
            </div>
          </div>
          <div class="div2-a">
            <div class="div-header-a"><h2>TO-DO상세내역</h2>
            </div>
            <div class="div-grid-a">
              <grid
                  ref="grid2"
                  :data="dataSource"
                  :header="header"
                  :columns="columns2"
                  :bodyHeight="bodyHeight"
                  :minRowHeight="minRowHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  :rowHeaders="rowHeaders"
                  @click="onClick"
              ></grid>
            </div>
          </div>
          <div class="div0-a">
          <div class="div3-a">
            <div class="div-header-a"><h2>프로젝트 공지사항</h2>
            </div>
            <div class="div-grid-a">
              <grid
                  ref="grid3"
                  :data="dataSource"
                  :header="header"
                  :columns="columns3"
                  :bodyHeight="320"
                  :minRowHeight="minRowHeight"
                  :showDummyRows="showDummyRows"
                  :columnOptions="columnOptions"
                  :rowHeight="rowHeight"
                  :rowHeaders="rowHeaders"
                  @click="onClick"
              ></grid>
            </div>
          </div>
          <div class="div4-a">
            <section class="filter-1000">
              <div class = "col">
                <ul class="filter-con clear-fix">
                    <li class="filter-item">
                      <div class="item-con">공지업무
                        <select
                            v-model="detail.ntar_bzcd_selected"
                            style="width: 165px; margin-left: 8px"
                        >
                          <option
                              v-for="(ntar_bzcd, idx) in detail.ntar_bzcd"
                              :key="idx"
                              v-text="ntar_bzcd.text"
                              :value="ntar_bzcd.value"
                          ></option>
                        </select>
                      </div>
                    </li>
                  <li class="filter-item">
                    <div class="item-con">공지일자
                      <div class="input-dateWrap"><input type="date" v-model="detail.rgs_dt"></div>
                    </div>
                  </li>
                  <li class="filter-item-n">
                    <div class="input-searchWrap">공지자
                      <input type="text"
                             placeholder="직원명"
                             id="id.rgs_nm"
                             v-model="detail.rgs_nm"
                             style="width: 90px"
                      >
                      <button class="search-btn"
                              id="btn.rgs"
                              @click="open_pjte9001"
                      ></button>
                    </div>
                  </li>
                  <li class="filter-item">
                    <input type="text"
                           placeholder="직원번호"
                           id="id.rgs_no"
                           v-model="detail.rgs_no"
                           style="width: 70px; background-color: #f2f2f2;"
                           :disabled = true
                    >
                  </li>
                  <li class="filter-item">
                    <div class="item-con">
                      <input type="checkbox" id="check_Yn" v-model="detail.check_Yn">
                      <label>　공지사항삭제</label>
                    </div>
                  </li>

                    <li class="filter-item">
                      <div class="item-con">　제목　
                        <input type="text"
                               placeholder="제목을 입력해주세요"
                               v-model="detail.titl_txt"
                               style   = "width: 890px; margin-left: 6px"
                        >
                      </div>
                    </li>

                    <li class="filter-item">
                      <div class="item-con">
                        <th style="vertical-align: middle">
                          공지사항　
                        </th>
                        <td>
                          <textarea cols="145"
                                    rows="20"
                                    style   = "width: 890px; height: 240px"
                                    placeholder="공지사항을 입력해주세요"
                                    v-model="detail.ancpt"
                          ></textarea>
                        </td>
                      </div>
                    </li>

                </ul>
                <ul class="filter-btn" style="margin-top: 7px">
                  <label for="file-upload-btn">
                    <input type="file" id="file-upload-btn">
                  </label>
                  <div class="upload-nameWrap">
                    <input type="text" class="upload-name" disabled>
                    <a href="#" class="upload-delete" onclick="alert('delete-file')"></a>
                  </div>
                  <div class="btn btn-line-p">
                    <a href="#">다운로드</a>
                  </div>
                  <div class="btn btn-filter-b" style = "margin-left: 20px">
                    <a href="#" @click="fnClear">공지추가</a>
                  </div>
                  <div class="btn btn-filter-p">
                    <a href="#" @click="fnSave">저장</a>
                  </div>
                </ul>

              </div>
            </section>
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
import WindowPopup from "./PJTE3001.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
import {axiosService} from "@/api/http";
import axios from "axios";

//그리드 아이템 예제
var listItem = [{text:"개발", value:"1"},{text:"운영", value:"2"},{text:"이관", value:"3"}];
var prjt_id = [{text: "PMS프로젝트", value: "1000000001"}, {text: "PMS프로젝트2", value: "1000000002"}, {text: "PMS프로젝트3", value: "1000000003"}];
var bkup_id = [{text: "백업", value: "0000000000"}];


// 업무구분
const bzcd = [
  {text:"전체", value:'TTT'},
  {text:"신용", value:'AAA'},
  {text:"재무제표", value:"BBB"},
  {text:"신용평가", value:"CCC"},
];

// 공지구분
const ntar_bzcd = [
  {text:"프로젝트공지", value:'100'},
  {text:"업무공지", value:"200"},
];

const ai = axios.create({
  baseURL: "http://localhost:8080/PJTE1000/"
});

export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    grid: Grid,
    WindowPopup
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
    this.setCombo();
    this.fnSearch();
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
    setCombo() {  // 권한에 따른 콤보박스 활성화/비활성화
      const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      if (aut_cd == '500' || aut_cd == '600') {  //     권한ID가 500, 600인 경우  <프로젝트명> 콤보 활성화
        document.getElementById('id.prjt_id').disabled = false;
      }
    },
    fnSave(){
      //필수항목 확인
      if (this.checkPrimary() == true) {
        //확인창
        if (confirm("정말 저장하시겠습니까??") == true) {
          // 관리ID가 없으면 INSERT
          if (this.detail.mng_id == "" || this.detail.mng_id == "null") {
            ai.post("/insert",
                {
                  bkup_id:this.detail.bkup_id_selected,                // (상세)백업ID
                  prjt_id:this.detail.prjt_id_selected,                // (상세)프로젝트ID
                  ntar_bzcd:this.detail.ntar_bzcd_selected,               // (상세)공지구분
                  mng_id: this.detail.mng_id,                          // (상세)관리ID
                  rgs_dt: this.getUnFormatDate(this.detail.rgs_dt),    // (상세)공지일자
                  titl_txt: this.detail.titl_txt,                      // (상세)제목내용
                  ancpt: this.detail.ancpt,                            // (상세)공지내역
                  rgs_no: this.detail.rgs_no,                          // (상세)등록자번호
                  rgs_nm: this.detail.rgs_nm,                          // (상세)등록자명
                  atfl_mng_id: this.detail.atfl_mng_id,                // (상세)첨부파일관리ID
                  check_Yn: this.detail.check_Yn,                      // (상세)삭제여부
                  del_yn: this.detail.del_yn,                          // (상세)삭제여부
                }
            )
                .then(res => {
                  if (res.status == 200) {
                    console.log(res.data);
                  }
                }).catch(e => {
              alert("필수값을 입력해주세요.");
            })

            // 관리ID가 있으면 UPDATE
          } else {
            if(check_Yn === true){
              this.detail.del_yn = 'Y'
            }
            ai.put("/update",
                {
                  bkup_id:this.detail.bkup_id_selected,                // (상세)백업ID
                  prjt_id:this.detail.prjt_id_selected,                // (상세)프로젝트ID
                  ntar_bzcd:this.detail.ntar_bzcd_selected,               // (상세)공지구분
                  mng_id: this.detail.mng_id,                          // (상세)관리ID
                  rgs_dt: this.getUnFormatDate(this.detail.rgs_dt),    // (상세)공지일자
                  titl_txt: this.detail.titl_txt,                      // (상세)제목내용
                  ancpt: this.detail.ancpt,                            // (상세)공지내역
                  rgs_no: this.detail.rgs_no,                          // (상세)등록자번호
                  rgs_nm: this.detail.rgs_nm,                          // (상세)등록자명
                  atfl_mng_id: this.detail.atfl_mng_id,                // (상세)첨부파일관리ID
                  check_yn: this.detail.check_Yn,                      // (상세)삭제여부체크박스
                  del_yn: this.detail.del_yn,                          // (상세)삭제여부
                }
            )
                .then(res => {
                  if (res.status == 200) {
                    console.log(res.data);
                  }
                }).catch(e => {
              alert("저장 실패.");
            })
          }
          //update / insert 후 재조회
          this.$refs.grid3.invoke("reloadData");
        } else {   //취소
          return;
        }
      } else {
        //필수 항목 미입력 시
        alert("필수항목을 입력해 주세요.");
      }
    },
    fnClear() {
      // [신규초기화] 버튼 클릭 시 상세내용 값 초기화
      this.detail.ntar_bzcd_selected = ntar_bzcd[0].value         // (상세)공지구분
      this.detail.mng_id = ''                                         // (상세)관리ID
      this.detail.rgs_dt = this.getToday()                                         // (상세)요청일자
      this.detail.titl_txt = ''                                         // (상세)제목내용
      this.detail.ancpt = ''                                         // (상세)공지내역
      this.detail.rgs_no = sessionStorage.getItem("LOGIN_EMP_NO")  // (상세)등록자번호
      this.detail.rgs_nm = sessionStorage.getItem("LOGIN_EMP_NM")  // (상세)등록자번호
      this.detail.atfl_mng_id = ''                                           // (상세)첨부파일관리ID
    },
    onClick(ev) {
      // TO-DO현황 ROW클릭 시 클릭한ROW의 rowNum으로 TO-DO상세내역 재조회
      if (ev.columnName == 'todo_nm' || ev.columnName == 'proc_cnt') {
        this.info.gubun = "2"
        this.info.rowNum = ev.rowKey;
        this.$refs.grid2.invoke("setRequestParams", this.info);
        this.$refs.grid2.invoke("readData");
      }
      // 프로젝트 공지사항 ROW클릭 시 오른쪽 input, selectBox에 바인딩
      if (ev.columnName == 'rgs_dt' || ev.columnName == 'ntar_bzcd' || ev.columnName == 'titl_txt') {
        this.curRow = ev.rowKey;
        const currentRowData = (this.$refs.grid3.invoke("getRow", this.curRow));
        if (currentRowData != null) {
          this.cellDataBind(currentRowData) // currentRowData가 있을 때 Row 클릭 시 상세내용에 Bind
        }
      }
    },
    /* 그리드 Row onClick클릭 시 상세내용에 Bind */
    cellDataBind(currentRowData) {
      this.detail.ntar_bzcd_selected = currentRowData.ntar_bzcd;       // (상세)공지구분
      this.detail.mng_id = currentRowData.mng_id;                        // (상세)관리ID
      this.detail.rgs_dt = this.getFormatDate(currentRowData.rgs_dt);    // (상세)공지일자
      this.detail.titl_txt = currentRowData.titl_txt;                    // (상세)제목내용
      this.detail.ancpt = currentRowData.ancpt;                          // (상세)공지내역
      this.detail.rgs_no = currentRowData.rgs_no;                        // (상세)공지자 번호
      this.detail.rgs_nm = currentRowData.rgs_nm;                        // (상세)공지자 이름
      this.detail.atfl_mng_id = currentRowData.atfl_mng_id;              // (상세)첨부파일관리ID
    },
    fnSearch(){
      /*조회 시 그리드 구분코드 this.info.gubun를 파라메터로 넘겨서 조회*/
      //그리드 1
      this.info.gubun = "1";
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
      //그리드 2
      this.info.gubun = "2"
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");
      //그리드 3
      this.info.gubun = "3"
      this.$refs.grid3.invoke("setRequestParams", this.info);
      this.$refs.grid3.invoke("readData");
    },
    gridInit(){
      this.$refs.grid1.invoke("clear");
      this.$refs.grid2.invoke("clear");
      this.$refs.grid3.invoke("clear");
    },
    open_pjte9001(event) {
      const targetId = event.currentTarget.id;
      this.pop = window.open("../PJTE9001/", targetId, "width=700, height=600");
    },
    /* YYYY-MM-DD형태의 오늘 날짜를 구하는 함수*/
    getToday() {
      var date = new Date();
      var year = date.getFullYear();
      var month = ("0" + (1 + date.getMonth())).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);

      return year + '-' + month + '-' + day;
    },
    /* YYYYMMDD 형태의 Date를 YYYY-MM-DD로 변환 */
    getFormatDate(date) {
      if (date == null || date === '') {
        return;
      } else {
        let year = date.substr(0, 4);
        let month = date.substr(4, 2);
        let day = date.substr(6, 2);

        return year + '-' + month + '-' + day;
      }
    },
    /* YYYY-MM-DD 형태의 Date를 YYYYMMDD로 변환 */
    getUnFormatDate(date) {
      if (date == null || date === '') {
        return;
      } else {
        let year = date.substr(0, 4);
        let month = date.substr(5, 2);
        let day = date.substr(8, 2);

        return year + month + day;
      }
    },
    /* 저장을 하기위한 필수 항목 체크 */
    checkPrimary() {
      if (this.detail.bkup_id == "" || this.detail.bkup_id == "null") {            // 백업ID
        return false;
      } else if (this.detail.d_ntar_bzcd == "" || this.detail.d_ntar_bzcd == "null") {   // 공지구분
        return false;
      } else if (this.detail.rgs_dt == "" || this.detail.rgs_dt == "null") {                 // 공지일자
        return false;
      } else if (this.detail.titl_txt == "" || this.detail.titl_txt == "null") {           // 제목내용
        return false;
      } else if (this.detail.ancpt == "" || this.detail.ancpt == "null") {           // 공지내역
        return false;
      } else if (this.detail.rgs_no == "" || this.detail.rgs_no == "null") {   // 등록자번호
        return false;
      } else {
        return true;  // 필수 값 모두 입력 시 true
      }
    },

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
        // 그리드 조회 변수
        gubun : '',               // 그리드 구분자
        rowNum :0,
        bkup_id     : bkup_id,    // 백업ID
        prjt_id     : prjt_id,    // 프로젝트ID
        bkup_id_selected : bkup_id[0].value,      // 백업ID
        prjt_id_selected : prjt_id[0].value,      // 프로젝트명

        // 공통 sessionStorage 데이터
        login_aut_cd          : sessionStorage.getItem("LOGIN_AUT_CD"),   // 권한ID
        login_bzcd            : sessionStorage.getItem("LOGIN_BZCD"),     // 업무구분
        login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO"),   // 직원번호
        login_proj_id         : sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트ID
      },

      detail : {
        /* 상세내용 변수 */

        // 공통 sessionStorage 데이터
        login_aut_cd          : sessionStorage.getItem("LOGIN_AUT_CD"),   // 권한ID
        login_bzcd            : sessionStorage.getItem("LOGIN_BZCD"),     // 업무구분
        login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO"),   // 직원번호
        login_proj_id         : sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트ID

        bkup_id     : bkup_id,                         // 백업ID
        prjt_id     : prjt_id,                         // 프로젝트ID
        ntar_bzcd   : ntar_bzcd,                       // 공지구분
        bkup_id_selected  : bkup_id[0].value,           // 백업ID
        prjt_id_selected  : prjt_id[0].value,           // 프로젝트명
        ntar_bzcd_selected : ntar_bzcd[0].value,       // 공지구분
        mng_id:this.mng_id,                            // 관리ID
        rgs_dt:this.rgs_dt,                            // 요청일자
        titl_txt:this.titl_txt,                        // 제목내용
        ancpt:this.ancpt,                              // 공지내역
        rgs_no:this.rgs_no,                            // 등록자번호
        rgs_nm:this.rgs_nm,                            // 등록자번호
        atfl_mng_id:this.atfl_mng_id,                  // 첨부파일관리ID
        check_Yn    : false,                           // 공지사항 삭제 체크박스
        del_yn : 'N',                                  // 공지사항 삭제
      },

      addRow : {
        grid : this.grid,
      },

      count:0,
      curRow:-1,
      title:"",
      scrollX:false,
      scrollY:false,
      bodyHeight: 325,
      minRowHeight: 10,
      rowHeight: 25,
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
          readData   : { url: process.env.VUE_APP_API + '/PJTE1000/select', method: 'GET' },
        },
        initialRequest: false,
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
          header: 'TO-DO업무',
          width: 250,
          align: 'left',
          name: 'todo_nm',
        },
        {
          header: '처리건수',
          align: 'right',
          name: 'proc_cnt',
        },
      ],
      columns2: [
        {
          header: 'TO-DO내역',
          width: 400,
          align: 'left',
          name: 'todo_txt',
        },
        {
          header: '시작일자',
          width: 120,
          align: 'center',
          name: 'pln_sta_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: '종료일자',
          width: 120,
          align: 'center',
          name: 'pln_end_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: '결함내용',
          align: 'left',
          name: 'rmrk',
        },
      ],
      columns3: [
        {
          header: '공지일자',
          width: 120,
          align: 'center',
          name: 'rgs_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: '공지업무',
          width: 150,
          align: 'left',
          name: 'ntar_bzcd',
        },
        {
          header: '제목',
          align: 'left',
          name: 'titl_txt',
        },
      ],
    }
  },
};

</script>
<style>
</style>
