<template>
  <!-- CONTENTS -->
  <div class="contents">
    <div class="div-img"></div>

    <!-- ASIDE -- LNB -->
    <PmsSideBar></PmsSideBar>
    <!-- 컨텐츠 영역 -->
    <div class="contents-body">
      <!-- 필터영역 -->
      <section class="filter">
        <ul class="filter-con clear-fix">
          <combo
              :comboArray = "this.comboList"
              @bkup_id_change="bkup_id_change"
              @prjt_nm_chage="prjt_nm_chage"
              @skill_grd_change_iss="skill_grd_change_iss"
          ></combo>
          <li class="filter-item">
            <div class="item-con">주요기술
              <input type="text"
                     placeholder="입력"
                     v-model="info.main_skill"
                     style   = "width: 250px"
              >
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">주요업무
              <input type="text"
                     placeholder="입력"
                     v-model="info.duty_txt"
                     style   = "width: 272px"
              >
            </div>
          </li>
        </ul>
        <ul class="filter-con clear-fix">
          <li class="filter-item-n">
            <div class="input-searchWrap" style="margin-left: 22px">이름
              <input type="text"
                     placeholder="직원명"
                     v-model="info.man_nm"
                     style="width: 90px"
                     @keyup.enter="open_pjte9001(1)"
              >
              <button class="search-btn"
                      @click="open_pjte9001_btn(1)"
              ></button>
            </div>
          </li>
          <li class="filter-item">
            <input type="text"
                   placeholder="직원번호"
                   v-model="info.man_no"
                   style="width: 90px; background-color: #f2f2f2;"
                   :disabled=true
            >
          </li>
          <li class="filter-item">
            <div class="item-con">재직처
              <input type="text"
                     placeholder="입력"
                     v-model="info.company_nm"
                     style   = "width: 293px"
              >
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con" style="margin-left: 11px">발주처
              <input type="text"
                     placeholder="입력"
                     v-model="info.exe_cpy_nm"
                     style   = "width: 250px"
              >
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">경력프로젝트
              <input type="text"
                     placeholder="입력"
                     v-model="info.proj_nm"
                     style   = "width: 250px"
              >
            </div>
          </li>
        </ul>
        <ul class="filter-btn">
          <button class="btn btn-filter-p" style="margin-left: 10px" @click="fnSearch">조회</button>
        </ul>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box" style="height: 255px">
          <div class="div-header"><h2>인력내역</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-e" @click="gridExcelExport(1)">엑셀다운로드</button>
            </ul>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid1"
                :data="dataSource"
                :header="header"
                :columns="columns1"
                :minBodyHeight="55"
                :bodyHeight="180"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeaders="rowHeaders"
                :rowHeight="rowHeight"
                @click="onClick1"
            ></grid>
          </div>
        </div>
        <div class="grid1-box" style="height: 510px">
          <div class="div-header-b"><h2>1. 인적사항</h2>
            <p style="margin-left: 50px; margin-top: 8px">{{ detail.last_chg_dt }}</p>
            <ul class="filter-btn">
              <button class="btn btn-filter-e" style="margin-left: 20px" @click="open_file_page1" >기술등급표</button>
              <button class="btn btn-filter-e" style="margin-left: 20px" @click="open_file_page" >경력증빙첨부</button>
              <button class="btn btn-filter-b" style="margin-left: 20px" @click="fnClear">신규초기화</button>
            </ul>
          </div>
          <div class="div2-body-c">
            <ul class="filter-con clear-fix-a">
              <li class="filter-item-a">
                <div class="item-con">
                  <label>이름</label>
                  <input type="text"
                         placeholder="직원명"
                         ref="man_nm"
                         v-model="detail.man_nm"
                         style="width: 88px;"
                         @keyup.enter="open_pjte9001(2)"
                  >
                  <button class="search-btn-9005"
                          @click="open_pjte9001_btn(2)"
                  ></button>
                  <input type="text"
                         placeholder="직원번호"
                         ref="man_no"
                         v-model="detail.man_no"
                         :disabled=true
                         style="width: 115px; background-color: #f2f2f2; margin-left: 27px"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">
                  <label>직급</label>
                  <input type="text"
                         placeholder="입력"
                         ref="rank_nm"
                         v-model="detail.rank_nm"
                         style="width: 230px;"
                  >
                </div>
              </li>
              <combo
                  :comboArray="this.comboList2"
                  @man_cd_change="man_cd_change"
                  ref="combo2"
              >
              </combo>
              <li class="filter-item-a">
                <div class="item-con">
                  <label>생일</label>
                  <div class="input-dateWrap">
                    <input type="date"
                           v-model="detail.birthday"
                           style="width: 230px"
                    ></div>
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">
                  <label>나이(만)</label>
                  <input type="text"
                         placeholder="입력불가"
                         v-model="detail.age"
                         ref="age"
                         :disabled=true
                         style="width: 230px; background-color: #f2f2f2"
                  >
                </div>
              </li>
              <li class="filter-item-a" style="width: 100%">
                <div class="item-con" style="width: 100%">
                  <label>주소</label>
                  <input type="text"
                         placeholder="입력"
                         ref="address"
                         v-model="detail.address"
                         style="width: 93.45%"
                  >
                </div>
              </li>
              <combo
                  :comboArray="this.comboList3"
                  @skill_grd_change="skill_grd_change"
                  ref="combo3"
              >
              </combo>
              <li class="filter-item-a">
                <div class="item-con">
                  <label>경력</label>
                  <input type="text"
                         placeholder="입력"
                         ref="career"
                         v-model="detail.career"
                         style="width: 230px;"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">
                  <label>현재경력</label>
                  <input type="text"
                         placeholder="경력사항 기준 자동산출"
                         ref="now_career"
                         v-model="detail.now_career"
                         :disabled=true
                         style="width: 230px; background-color: #f2f2f2"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">
                  <label>입사일자</label>
                  <div class="input-dateWrap">
                    <input type="date"
                           v-model="detail.enter_ymd"
                           style="width: 230px"
                    ></div>
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">
                  <label>성별</label>
                  <input type="text"
                         placeholder="남 / 여"
                         ref="sex_nm"
                         v-model="detail.sex_nm"
                         style="width: 230px;"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">
                  <label>주요기술</label>
                  <input type="text"
                         placeholder="입력"
                         ref="main_skill"
                         v-model="detail.main_skill"
                         style="width: 555px"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">
                  <label>주요업무</label>
                  <input type="text"
                         placeholder="입력"
                         ref="duty_txt"
                         v-model="detail.duty_txt"
                         style="width: 880px"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">
                  <label style="vertical-align: text-top; ">현/이전투입<br>프로젝트명</label>
                  <input type="text"
                         v-model="detail.inp_prj_nm"
                         style="width: 555px;vertical-align: text-top; background-color: #f2f2f2;"
                         :disabled = true
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">
                  <label>철수일자</label>
                  <div class="input-dateWrap">
                  <input type="date"
                         v-model="detail.wth_dt"
                         style="width: 230px; background-color: #f2f2f2;"
                         :disabled = true
                  >
                  </div>
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">
                  <label>투입구분</label>
                  <input type="text"
                         ref="cpno"
                         v-model="detail.inp_cls_cd"
                         style="width: 190px; background-color: #f2f2f2;"
                         :disabled = true
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">
                  <label style="width: 120px; vertical-align: text-top; ">차기 희망<br>프로젝트및업무</label>
                  <input type="text"
                         placeholder="앞으로 하고싶은 프로젝트 및 업무 작성"
                         ref="cpno"
                         v-model="detail.nxt_prj_nm"
                         style="width: 230px; vertical-align: text-top; "
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">
                  <label>연락처</label>
                  <input type="text"
                         placeholder="입력"
                         ref="cpno"
                         v-model="detail.cpno"
                         style="width: 230px;"
                  >
                </div>
              </li>
              <li class="filter-item-a">
                <div class="item-con">
                  <label>관리회사</label>
                  <input type="text"
                         placeholder="정직원이 아닌 경우 입력"
                         ref="company_nm"
                         v-model="detail.company_nm"
                         style="width: 230px;"
                  >
                </div>
              </li>
              <combo
                  :comboArray="this.comboList4"
                  @grd_cd_change="grd_cd_change"
                  ref="combo4"
              >
              </combo>
            </ul>
            <ul class="filter-con clear-fix-a">
              <li class="filter-item-a" style="width: 100%; margin-top: 15px;">
                <div class="item-con" style="width: 100%">
                  <label>※ 학력사항</label>
                  <input type="text"
                         class="placeBlack"
                         placeholder="학교명"
                         :disabled=true
                         style="width: 39%; background-color:#c5c5c5; border: #c5c5c5 1px solid; text-align: center;"
                  >
                  <input type="text"
                         class="placeBlack"
                         placeholder="전공"
                         :disabled=true
                         style="width: 39%; background-color:#c5c5c5; border: #c5c5c5 1px solid; border-right: #ffffff 1px solid; border-left: #ffffff 1px solid;text-align: center;"
                  >
                  <input type="text"
                         class="placeBlack"
                         placeholder="졸업년월"
                         :disabled=true
                         style="width: 15%; background-color:#c5c5c5; border: #c5c5c5 1px solid; text-align: center;"
                  >
                </div>
              </li>
              <li class="filter-item-a" style="width: 100%;">
                <div class="item-con" style="width: 100%;">
                  <label></label>
                  <input type="text"
                         placeholder="최종학력순으로 기술"
                         style="width: 39%;"
                         v-model="detail.scholl_nm1"
                  >
                  <input type="text"
                         placeholder=""
                         style="width: 39%;"
                         v-model="detail.study1"
                  >
                  <div class="input-dateWrap" style="width: 15%">
                    <input type="month"
                           style="width: 100%;"
                           v-model="detail.gdt_ym1"
                    ></div>
                </div>
              </li>
              <li class="filter-item-a" style="width: 100%;">
                <div class="item-con" style="width: 100%;">
                  <label></label>
                  <input type="text"
                         style="width: 39%;"
                         v-model="detail.scholl_nm2"
                  >
                  <input type="text"
                         placeholder=""
                         style="width: 39%;"
                         v-model="detail.study2"
                  >
                  <div class="input-dateWrap" style="width: 15%">
                    <input type="month"
                           style="width: 100%;"
                           v-model="detail.gdt_ym2"
                    ></div>
                </div>
              </li>
              <li class="filter-item-a" style="width: 100%;">
                <div class="item-con" style="width: 100%;">
                  <label></label>
                  <input type="text"
                         style="width: 39%;"
                         v-model="detail.scholl_nm3"
                  >
                  <input type="text"
                         placeholder=""
                         style="width: 39%;"
                         v-model="detail.study3"
                  >
                  <div class="input-dateWrap" style="width: 15%">
                    <input type="month"
                           style="width: 100%;"
                           v-model="detail.gdt_ym3"
                    ></div>
                </div>
              </li>
            </ul>
            <ul class="filter-con clear-fix-a">
              <li class="filter-item-a" style="width: 100%; margin-top: 15px;">
                <div class="item-con" style="width: 100%">
                  <label>※ 자 격 증</label>
                  <input type="text"
                         class="placeBlack"
                         placeholder="자격증명"
                         :disabled=true
                         style="width: 78%; background-color:#c5c5c5; border: #c5c5c5 1px solid; border-right: #ffffff 1px solid;text-align: center;"
                  >
                  <input type="text"
                         class="placeBlack"
                         placeholder="취득일자"
                         :disabled=true
                         style="width: 15%; background-color:#c5c5c5; border: #c5c5c5 1px solid; text-align: center;"
                  >
                </div>
              </li>
              <li class="filter-item-a" style="width: 100%;">
                <div class="item-con" style="width: 100%;">
                  <label></label>
                  <input type="text"
                         placeholder="중요 자격증순으로 기술"
                         style="width: 78%;"
                         v-model="detail.qlfks_nm1"
                  >
                  <div class="input-dateWrap" style="width: 15%">
                    <input type="date"
                           style="width: 100%;"
                           v-model="detail.aqu_ymm1"
                    ></div>
                </div>
              </li>
              <li class="filter-item-a" style="width: 100%;">
                <div class="item-con" style="width: 100%;">
                  <label></label>
                  <input type="text"
                         style="width: 78%;"
                         v-model="detail.qlfks_nm2"
                  >
                  <div class="input-dateWrap" style="width: 15%">
                    <input type="date"
                           style="width: 100%;"
                           v-model="detail.aqu_ymm2"
                    ></div>
                </div>
              </li>
              <li class="filter-item-a" style="width: 100%;">
                <div class="item-con" style="width: 100%;">
                  <label></label>
                  <input type="text"
                         style="width: 78%;"
                         v-model="detail.qlfks_nm3"
                  >
                  <div class="input-dateWrap" style="width: 15%">
                    <input type="date"
                           style="width: 100%;"
                           v-model="detail.aqu_ymm3"
                    ></div>
                </div>
              </li>
              <li class="filter-item-a" style="width: 100%;">
                <div class="item-con" style="width: 100%;">
                  <label></label>
                  <input type="text"
                         style="width: 78%;"
                         v-model="detail.qlfks_nm4"
                  >
                  <div class="input-dateWrap" style="width: 15%">
                    <input type="date"
                           style="width: 100%;"
                           v-model="detail.aqu_ymm4"
                    ></div>
                </div>
              </li>
              <li class="filter-item-a" style="width: 100%;">
                <div class="item-con" style="width: 100%;">
                  <label></label>
                  <input type="text"
                         style="width: 78%;"
                         v-model="detail.qlfks_nm5"
                  >
                  <div class="input-dateWrap" style="width: 15%">
                    <input type="date"
                           style="width: 100%;"
                           v-model="detail.aqu_ymm5"
                    ></div>
                </div>
              </li>
            </ul>

          </div>
        </div>
        <div class="grid1-box" style="height: 242px">
          <div class="div-header"><h2>2. 재직사항</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-e">
                <label for="file1">엑셀업로드</label>
                <input type="file" id="file1"  @change="gridExcelImport"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="display: none;">
              </button>
              <button class="btn btn-filter-e" @click="gridExcelExport(2)">엑셀다운로드</button>
              <button class="btn btn-filter-b" @click="gridAddRow(2)" style="margin-left: 20px">행추가</button>
              <button class="btn btn-filter-b" @click="gridDelRow(2)">행삭제</button>
            </ul>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid2"
                :data="dataSource2"
                :header="header"
                :columns="columns2"
                :minBodyHeight="55"
                :bodyHeight="167"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :editingEvent="editingEvent"
                :columnOptions="columnOptions"
                :rowHeight="rowHeight"
                @click="onClick2"
            ></grid>
          </div>
        </div>
        <div class="grid1-box" style="height: 268px">
          <div class="div-header"><h2>3. 경력사항</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-e">
                <label for="file2">엑셀업로드</label>
                <input type="file" id="file2"  @change="gridExcelImport2"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="display: none;">
              </button>
              <button class="btn btn-filter-e" @click="gridExcelExport(3)">엑셀다운로드</button>
              <button class="btn btn-filter-b" @click="gridAddRow(3)" style="margin-left: 20px">행추가</button>
              <button class="btn btn-filter-b" @click="gridDelRow(3)">행삭제</button>
            </ul>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid3"
                :data="dataSource3"
                :header="header"
                :columns="columns3"
                :minBodyHeight="55"
                :bodyHeight="192"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :editingEvent="editingEvent"
                :columnOptions="columnOptions"
                :rowHeight="rowHeight"
                @click="onClick2"
            ></grid>
          </div>
        </div>
        <section class="filter">
          <ul class="filter-btn">
            <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSave" >저장</button>
          </ul>
        </section>
        <br>
        <br>
        <br>
        <br>
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


// 첨부파일 팝업에서 받은 값
window.fileData = (fileLists) => {
  window.pms_register.file_name_list = fileLists;
  window.pms_register.detail.atfl_mng_id = fileLists[fileLists.length-1].atfl_mng_id;
}
// 직원조회 팝업에서 받은 값
window.empData = (empnm ,empno, btn_id) => {
  if(btn_id === '1'){
    window.pms_register.info.man_nm = empnm
    window.pms_register.info.man_no = empno
  } else if(btn_id === '2'){
    window.pms_register.detail.man_nm = empnm
    window.pms_register.detail.man_no = empno
  }
}

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
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
    this.setNo();
  },

// 일반적인 함수를 선언하는 부분
  methods: {
    // Combo.vue 에서 받아온 값
    bkup_id_change(params) {this.info.bkup_id_selected = params},
    prjt_nm_chage(params) {this.info.prjt_nm_selected = params},
    skill_grd_change_iss(params) {this.info.skill_grd_selected = params},

    man_cd_change(params) {this.detail.man_cd_selected = params},
    skill_grd_change(params) {this.detail.skill_grd_selected = params},
    grd_cd_change(params) {this.detail.grd_cd_selected = params},

    // 화면 init
    init() {
      // 그리드 초기화
      this.$refs.grid1.invoke("clear");
      this.$refs.grid2.invoke("clear");
      this.$refs.grid3.invoke("clear");
      // 그리드1 전체 비활성화
      this.$refs.grid1.invoke("disable");

      // 시스템 관리자가 아닌경우 자신의 이름과 번호를 조회조건에 바인딩
      if(sessionStorage.getItem("LOGIN_AUT_CD") !== '900'){
        this.info.man_nm = sessionStorage.getItem("LOGIN_EMP_NM")
        this.info.man_no = sessionStorage.getItem("LOGIN_EMP_NO")
      }
    },
    // 저장 버튼
    fnSave(){
      if(this.detail.man_no != '') {
        // 권한이 관리자(900) 이거나 본인 일 때 저장 및 경력증빙첨부 가능
        if (sessionStorage.getItem("LOGIN_EMP_NO") === this.detail.man_no || sessionStorage.getItem("LOGIN_AUT_CD") === '900') {
          //필수항목 확인
          if (this.checkPrimary() == true) {
            if (confirm("정말 저장하시겠습니까?") == true) {
              axiosService.post("/PJTE9005/create", {
                gridData2: this.$refs.grid2.invoke("getData"),
                gridData3: this.$refs.grid3.invoke("getData"),
                prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
                login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),

                last_chg_dt: this.detail.last_chg_dt,       // 최종변경일자
                man_no: this.detail.man_no,                 // 인력번호
                man_nm: this.detail.man_nm,                 // 이름
                rank_nm: this.detail.rank_nm,               // 직급명
                man_cd: this.detail.man_cd_selected,        // 인력구분
                birthday: this.detail.birthday,             // 생년월
                age: this.detail.age,                       // 만나이
                address: this.detail.address,               // 주소
                skill_grd: this.detail.skill_grd_selected,  // 기술등급
                career: this.detail.career,                 // 경력
                now_career: this.detail.now_career,         // 현재경력
                enter_ymd: this.detail.enter_ymd,           // 입사년월일
                sex_nm: this.detail.sex_nm,                 // 성별
                nxt_prj_nm: this.detail.nxt_prj_nm,         // 차기프로젝트/업무
                main_skill: this.detail.main_skill,         // 주요기술
                duty_txt: this.detail.duty_txt,             // 주요업무
                cpno: this.detail.cpno,                     // 휴대전화번호
                company_nm: this.detail.company_nm,         // 회사명
                grd_cd: this.detail.grd_cd_selected,        // 평판구분
                scholl_nm1: this.detail.scholl_nm1,         // 학교명1
                gdt_ym1: this.detail.gdt_ym1,               // 졸업년월1
                study1: this.detail.study1,                 // 전공1
                scholl_nm2: this.detail.scholl_nm2,         // 학교명2
                gdt_ym2: this.detail.gdt_ym2,               // 졸업년월2
                study2: this.detail.study2,                 // 전공2
                scholl_nm3: this.detail.scholl_nm3,         // 학교명3
                gdt_ym3: this.detail.gdt_ym3,               // 졸업년월3
                study3: this.detail.study3,                 // 전공3
                qlfks_nm1: this.detail.qlfks_nm1,           // 자격증1
                aqu_ymm1: this.detail.aqu_ymm1,             // 자격증취득일1
                qlfks_nm2: this.detail.qlfks_nm2,           // 자격증2
                aqu_ymm2: this.detail.aqu_ymm2,             // 자격증취득일2
                qlfks_nm3: this.detail.qlfks_nm3,           // 자격증3
                aqu_ymm3: this.detail.aqu_ymm3,             // 자격증취득일3
                qlfks_nm4: this.detail.qlfks_nm4,           // 자격증4
                aqu_ymm4: this.detail.aqu_ymm4,             // 자격증취득일4
                qlfks_nm5: this.detail.qlfks_nm5,           // 자격증5
                aqu_ymm5: this.detail.aqu_ymm5,             // 자격증취득일5
                atfl_mng_id: this.detail.atfl_mng_id,       // 첨부파일관리ID

              }).then(res => {
                console.log(res);
                if (res.data) {
                  alert("저장을 완료했습니다.");
                  this.info.man_nm = '';
                  this.info.man_no = '';
                  this.$refs.grid1.invoke("reloadData");
                  this.$refs.grid2.invoke("reloadData");
                  this.$refs.grid3.invoke("reloadData");
                  this.info.man_nm = sessionStorage.getItem("LOGIN_EMP_NM");
                  this.info.man_no = sessionStorage.getItem("LOGIN_EMP_NO");
                }
              }).catch(e => {
                alert("저장에 실패했습니다.")
              })
            } else {   //취소
              return;
            }
          } else {
          }
        } else {
          alert('작성자 본인만 저장가능합니다.')
          return false;
        }
      } else {
        alert('필수값을 입력해주세요.')
      }
    },
    /* 저장을 하기위한 필수 항목 체크 */
    checkPrimary() {
      if (this.detail.man_no == "" || this.detail.man_no == null) {
        alert('직원명과 직원번호는 필수 입력사항입니다.');
        return false;
      } else if (this.detail.man_cd_selected == "NNN" ||this.detail.man_cd_selected == "" || this.detail.man_cd_selected == null) {
        alert('직원구분은 필수 입력사항입니다.');
        return false;
      } else if (this.detail.birthday == "" || this.detail.birthday == null) {
        alert('생일은 필수 입력사항입니다.');
        return false;
      }  else if (this.detail.skill_grd_selected == "NNN" ||this.detail.skill_grd_selected == "" || this.detail.skill_grd_selected == null) {
        alert('기술등급은 필수 입력사항입니다.');
        return false;
      }  else if (this.$refs.grid2.invoke("getRowCount") == 0) {
        alert('재직사항을 한 줄 이상 입력해주세요.');
        return false;
      }  else if (this.$refs.grid3.invoke("getRowCount") == 0) {
        alert('경력사항을 한 줄 이상 입력해주세요.');
        return false;
      }else {
        return true;  // 필수 값 모두 입력 시 true
      }
    },
    onGridUpdated(grid){

    },

    // 그리드 1 클릭 이벤트 - 인력내역(그리드1) ROW 클릭 시 하단 세부내역 조회 (인적사항, 그리드2, 그리드3)
    onClick1(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
      this.info.current_man_no = this.$refs.grid1.invoke("getValue", this.curRow, "man_no") // ROW클릭 시 인력번호
      axiosService.get("/PJTE9005/select2", {
        params: {
          prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),
          bkup_id_selected: '0000000000',
          current_man_no :this.$refs.grid1.invoke("getValue", this.curRow, "man_no")
        }
      }).then(res => {
        // console.log("res.data.data ::" + res.data.data)
        this.setEmpData(res.data.data); // 조회한 데이터로 바인딩
      }).catch(e => {

      });
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");
      this.$refs.grid3.invoke("setRequestParams", this.info);
      this.$refs.grid3.invoke("readData");
    },
    // 그리드 2,3 클릭 이벤트
    onClick2(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
    },

    //조회
    fnSearch(){
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
    },

    // 조회한 데이터로 인적사항 데이터 바인딩
    setEmpData(data) {
      this.detail.last_chg_dt         = data.contents[0].last_chg_dt           // 최종변경일자
      this.detail.man_no              = data.contents[0].man_no                // 인력번호
      this.detail.man_nm              = data.contents[0].man_nm                // 이름
      this.detail.rank_nm             = data.contents[0].rank_nm               // 직급명
      this.detail.man_cd_selected     = data.contents[0].man_cd                // 인력구분
      this.$refs.combo2.$data.man_cd_selected = data.contents[0].man_cd;       // 인력구분(콤보)
      this.detail.birthday            = data.contents[0].birthday              // 생년월
      this.detail.age                 = data.contents[0].age                   // 만나이
      this.detail.address             = data.contents[0].address               // 주소
      this.detail.skill_grd_selected  = data.contents[0].skill_grd             // 기술등급
      this.$refs.combo3.$data.skill_grd_selected = data.contents[0].skill_grd;       // 인력구분(콤보)
      this.detail.career              = data.contents[0].career                // 경력
      this.detail.now_career          = data.contents[0].now_career            // 현재경력
      this.detail.enter_ymd           = data.contents[0].enter_ymd             // 입사년월일
      this.detail.sex_nm              = data.contents[0].sex_nm                // 성별
      this.detail.inp_prj_nm          = data.contents[0].inp_prj_nm            // 현/이전투입프로젝트명
      this.detail.wth_dt              = data.contents[0].wth_dt                // 철수일자
      this.detail.nxt_prj_nm          = data.contents[0].nxt_prj_nm            // 차기프로젝트/업무
      this.detail.inp_cls_cd          = data.contents[0].inp_cls_cd            // 투입구분코드
      this.detail.main_skill          = data.contents[0].main_skill            // 주요기술
      this.detail.duty_txt            = data.contents[0].duty_txt              // 주요업무
      this.detail.cpno                = data.contents[0].cpno                  // 휴대전화번호
      this.detail.company_nm          = data.contents[0].company_nm            // 회사명
      this.detail.grd_cd_selected     = data.contents[0].grd_cd                // 평판구분
      this.$refs.combo4.$data.grd_cd_selected = data.contents[0].grd_cd;       // 인력구분(콤보)
      this.detail.scholl_nm1          = data.contents[0].scholl_nm1            // 학교명1
      this.detail.gdt_ym1             = data.contents[0].gdt_ym1               // 졸업년월1
      this.detail.study1              = data.contents[0].study1                // 전공1
      this.detail.scholl_nm2          = data.contents[0].scholl_nm2            // 학교명2
      this.detail.gdt_ym2             = data.contents[0].gdt_ym2               // 졸업년월2
      this.detail.study2              = data.contents[0].study2                // 전공2
      this.detail.scholl_nm3          = data.contents[0].scholl_nm3            // 학교명3
      this.detail.gdt_ym3             = data.contents[0].gdt_ym3               // 졸업년월3
      this.detail.study3              = data.contents[0].study3                // 전공3
      this.detail.qlfks_nm1           = data.contents[0].qlfks_nm1             // 자격증1
      this.detail.aqu_ymm1            = data.contents[0].aqu_ymm1              // 자격증취득일1
      this.detail.qlfks_nm2           = data.contents[0].qlfks_nm2             // 자격증2
      this.detail.aqu_ymm2            = data.contents[0].aqu_ymm2              // 자격증취득일2
      this.detail.qlfks_nm3           = data.contents[0].qlfks_nm3             // 자격증3
      this.detail.aqu_ymm3            = data.contents[0].aqu_ymm3              // 자격증취득일3
      this.detail.qlfks_nm4           = data.contents[0].qlfks_nm4             // 자격증4
      this.detail.aqu_ymm4            = data.contents[0].aqu_ymm4              // 자격증취득일4
      this.detail.qlfks_nm5           = data.contents[0].qlfks_nm5             // 자격증5
      this.detail.aqu_ymm5            = data.contents[0].aqu_ymm5              // 자격증취득일5
      this.detail.atfl_mng_id         = data.contents[0].atfl_mng_id           // 첨부파일관리ID
    },

    // 행추가
    gridAddRow(grid_num){
      if(grid_num === 2){
        this.$refs.grid2.invoke("appendRow",{
          prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
          bkup_id: "0000000000",
        },{focus: true, at: 0});
      }else if(grid_num === 3){
        this.$refs.grid3.invoke("appendRow",{
          prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
          bkup_id: "0000000000",
        },{focus: true, at: 0});
      }
    },

    // 행삭제
    gridDelRow(grid_num){
      if(grid_num === 2){
        this.$refs.grid2.invoke("removeRow", this.curRow, {showConfirm:false});
      }else if(grid_num === 3){
        this.$refs.grid3.invoke("removeRow", this.curRow, {showConfirm:false});
      }
    },
    // 엑셀 다운로드
    gridExcelExport(grid_num){
      if(grid_num === 1){
        this.$refs.grid1.invoke("export", "xlsx", {useFormattedValue:true, fileName:"엑셀다운로드"});

      }else if(grid_num === 2){
        this.$refs.grid2.invoke("export", "xlsx", {useFormattedValue:true, fileName:"엑셀다운로드"});

      }else if(grid_num === 3){
        this.$refs.grid3.invoke("export", "xlsx", {useFormattedValue:true, fileName:"엑셀다운로드"});
      }
    },
    // 재직사항 그리드 엑셀업로드
    gridExcelImport(event) {
      // 엑셀파일 업로드 로직 추가
      console.log(event.target.files[0])
      this.file = event.target.files ? event.target.files[0] : null;
      let input = event.target;
      let reader = new FileReader();
      reader.onload = () => {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, {type: 'binary'});
        console.log("wb ::"+ wb.SheetNames);
        let gridExcelData;
        wb.SheetNames.forEach((sheetName, idx) => {
          if (sheetName === '재직현황' || sheetName === 'Sheet1') {
            console.log(wb.Sheets[sheetName])
            wb.Sheets[sheetName].A1.w = "company_nm"
            wb.Sheets[sheetName].B1.w = "enter_dt"
            wb.Sheets[sheetName].C1.w = "rsnt_dt"
            wb.Sheets[sheetName].D1.w = "rssb_bns"
            wb.Sheets[sheetName].E1.w = "rmrk"
            let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            let grid2Data = this.$refs.grid2.invoke("getData");
            let rowObj_copy = [];
            if(grid2Data.length == 0) {
              for(let n=0; n<rowObj.length; n++){
                if(isNaN(rowObj[n].enter_dt) == false) {
                  rowObj[n].enter_dt = this.excelDateToJSDate(rowObj[n].enter_dt)
                }
                if (isNaN(rowObj[n].rsnt_dt) == false) {
                  rowObj[n].rsnt_dt = this.excelDateToJSDate(rowObj[n].rsnt_dt)
                }
                rowObj_copy[n] = rowObj[n];
              }
            } else {
              if (confirm("기존 데이터를 유지하시겠습니까?") == true) {
                for (let n = 0; n < rowObj.length; n++) {
                  if(isNaN(rowObj[n].enter_dt) == false) {
                    rowObj[n].enter_dt = this.excelDateToJSDate(rowObj[n].enter_dt)
                  }
                  if (isNaN(rowObj[n].rsnt_dt) == false) {
                    rowObj[n].rsnt_dt = this.excelDateToJSDate(rowObj[n].rsnt_dt)
                  }
                  rowObj_copy[n] = rowObj[n];
                }
                for (let i = 0; i < grid2Data.length; i++) {
                  rowObj_copy[rowObj.length + i] = grid2Data[i];
                }
              } else {
                for(let n=0; n<rowObj.length; n++){
                  if(isNaN(rowObj[n].enter_dt) == false) {
                    rowObj[n].enter_dt = this.excelDateToJSDate(rowObj[n].enter_dt)
                  }
                  if (isNaN(rowObj[n].rsnt_dt) == false) {
                    rowObj[n].rsnt_dt = this.excelDateToJSDate(rowObj[n].rsnt_dt)
                  }
                  rowObj_copy[n] = rowObj[n];
                }
              }
            }

            gridExcelData = JSON.parse(JSON.stringify(rowObj_copy));
            console.log("gridExcelData ::", gridExcelData)
          }
        })
        alert('업로드 파일이 적용되었습니다.')
        this.$refs.grid2.invoke('resetData', gridExcelData)
      };
      reader.readAsBinaryString(input.files[0]);
      event.target.value = '';
    },
    // 경력사항 그리드 엑셀업로드
    gridExcelImport2(event) {
      // 엑셀파일 업로드 로직 추가
      // console.log(event.target.files[0])
      this.file = event.target.files ? event.target.files[0] : null;
      let input = event.target;
      let reader = new FileReader();
      reader.onload = () => {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, {type: 'binary'});
        let gridExcelData;

        wb.SheetNames.forEach((sheetName, idx) => {
          if (sheetName === '경력사항' || sheetName === 'Sheet1') {
            console.log(wb.Sheets[sheetName])
            wb.Sheets[sheetName].A1.w = "exe_cpy_nm"
            wb.Sheets[sheetName].B1.w = "sta_dt"
            wb.Sheets[sheetName].C1.w = "end_dt"
            wb.Sheets[sheetName].D1.w = "proj_nm"
            wb.Sheets[sheetName].E1.w = "rssb_bns"
            wb.Sheets[sheetName].F1.w = "duty_txt"
            wb.Sheets[sheetName].G1.w = "use_os"
            wb.Sheets[sheetName].H1.w = "rlt_skill"

            let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            let grid3Data = this.$refs.grid3.invoke("getData");
            let rowObj_copy = [];
            if(grid3Data.length == 0) {

              for(let n=0; n<rowObj.length; n++){
                if(isNaN(rowObj[n].sta_dt) == false) {
                  rowObj[n].sta_dt = this.excelDateToJSDate(rowObj[n].sta_dt)
                }
                if (isNaN(rowObj[n].end_dt) == false) {
                  rowObj[n].end_dt = this.excelDateToJSDate(rowObj[n].end_dt)
                }
                rowObj_copy[n] = rowObj[n];
              }
            } else {
              if (confirm("기존 데이터를 유지하시겠습니까?") == true) {
                for (let n = 0; n < rowObj.length; n++) {
                  if(isNaN(rowObj[n].sta_dt) == false) {
                    rowObj[n].sta_dt = this.excelDateToJSDate(rowObj[n].sta_dt)
                  }
                  if (isNaN(rowObj[n].end_dt) == false) {
                    rowObj[n].end_dt = this.excelDateToJSDate(rowObj[n].end_dt)
                  }
                  rowObj_copy[n] = rowObj[n];
                }
                for (let i = 0; i < grid3Data.length; i++) {
                  rowObj_copy[rowObj.length + i] = grid3Data[i];
                }
              } else {
                for(let n=0; n<rowObj.length; n++){

                  if(isNaN(rowObj[n].sta_dt) == false) {
                    rowObj[n].sta_dt = this.excelDateToJSDate(rowObj[n].sta_dt)
                  }
                  if (isNaN(rowObj[n].end_dt) == false) {
                    rowObj[n].end_dt = this.excelDateToJSDate(rowObj[n].end_dt)
                  }
                  rowObj_copy[n] = rowObj[n];
                }
              }
            }

            gridExcelData = JSON.parse(JSON.stringify(rowObj_copy));
            console.log("gridExcelData ::", gridExcelData)
          }
        })
        alert('업로드 파일이 적용되었습니다.')
        this.$refs.grid3.invoke('resetData', gridExcelData)
      };
      reader.readAsBinaryString(input.files[0]);
      event.target.value = '';
    },
    excelDateToJSDate(excelDate) {
      /* 엑셀에서 넘어온 숫자형태의 데이터를 날짜형태로 바꿔주는 함수
      ex) 1. 엑셀 파일에서 2021-02 형태로 값을 입력하면 Feb-22 형태의 날짜 데이터가 자동입력됨
          2. gridExcelImport2 함수에서
          XLSX.utils.sheet_to_json(wb.Sheets[sheetName]) 엑셀데이터를 JSON으로 바뀌면서
          Feb-22 의 데이터가 44593 << 숫자형태의 데이터로 바뀜
          3. excelDateToJSDate 함수에서 44593 형태의 데이터를 2021-02 형태의 데이터로 변환
       */
      var date = new Date(Math.round((excelDate - (25567 + 2)) * 86400 * 1000));
      var converted_date = date.toISOString().split('T')[0].substring(0, 7);
      return converted_date;
    },
    //직원조회 버튼 클릭 시
    open_pjte9001_btn(btn_id) {
      let empnm = ''
      if (btn_id == '1') {
        empnm = this.info.man_nm
      } else if (btn_id == '2') {
        empnm = this.detail.man_nm
      }
      if((empnm === '' || empnm == null || empnm === undefined)) {
        let bkup_id = this.info.bkup_id_selected, prjt_id =  this.info.prjt_nm_selected
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      } else {
        let bkup_id = this.info.bkup_id_selected, prjt_id =  this.info.prjt_nm_selected
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      }
    },
    //엔터키를 눌러 직원 조회
    open_pjte9001(btn_id) {
      let empnm = ''
      let prjt_id_selected = this.info.prjt_nm_selected
      let bkup_id_selected = this.info.bkup_id_selected
      if (btn_id == '1') {
        empnm = this.info.man_nm
      } else if (btn_id == '2') {
        empnm = this.detail.man_nm
      }
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
                  this.info.man_no = res.data.data.contents[0].empno
                  this.info.man_nm = res.data.data.contents[0].empnm
                } else if (btn_id == '2') {
                  this.detail.man_no = res.data.data.contents[0].empno
                  this.detail.man_nm = res.data.data.contents[0].empnm
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
      if(this.info.man_nm === "") this.info.man_no = "";
      if(this.detail.man_nm === "") this.detail.man_no = "";
    },
    // 첨부파일등록 팝업 오픈
    open_file_page1() {
      let file_rgs_dscd = '903'
      let atfl_mng_id = '0000000000'
      let mng_id = ''
      let bkup_id = '0000000000', prjt_id = sessionStorage.getItem("LOGIN_PROJ_ID")
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&mng_id=${mng_id}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
    },
    // 첨부파일등록 팝업 오픈
    open_file_page() {
      let file_rgs_dscd = '801'
      let atfl_mng_id = this.detail.atfl_mng_id
      let mng_id = this.detail.man_no
      let bkup_id = '0000000000', prjt_id = sessionStorage.getItem("LOGIN_PROJ_ID")
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&mng_id=${mng_id}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
    },
    // [신규초기화] 버튼 클릭 시 상세내용 값 초기화
    fnClear() {
      this.detail.last_chg_dt         = '' // 최종변경일자
      this.detail.man_no              = '' // 인력번호
      this.detail.man_nm              = '' // 이름
      this.detail.rank_nm             = '' // 직급명
      this.detail.man_cd_selected     = this.$refs.combo2.$data.CD1000000041N[0].value          // 인력구분
      this.$refs.combo2.$data.man_cd_selected = this.$refs.combo2.$data.CD1000000041N[0].value  // 인력구분(콤보)
      this.detail.birthday            = '' // 생년월
      this.detail.age                 = '' // 만나이
      this.detail.address             = '' // 주소
      this.detail.skill_grd_selected  = this.$refs.combo3.$data.CD1000000042N[0].value             // 기술등급
      this.$refs.combo3.$data.skill_grd_selected = this.$refs.combo3.$data.CD1000000042N[0].value  // 기술등급(콤보)
      this.detail.career              = '' // 경력
      this.detail.now_career          = '' // 현재경력
      this.detail.enter_ymd           = '' // 입사년월일
      this.detail.sex_nm              = '' // 성별
      this.detail.inp_prj_nm          = '' // 현/이전투입프로젝트명
      this.detail.wth_dt              = '' // 철수일자
      this.detail.nxt_prj_nm          = '' // 차기프로젝트/업무
      this.detail.inp_cls_cd          = '' //투입구분코드
      this.detail.main_skill          = '' // 주요기술
      this.detail.duty_txt            = '' // 주요업무
      this.detail.cpno                = '' // 휴대전화번호
      this.detail.company_nm          = '' // 회사명
      this.detail.grd_cd_selected     = this.$refs.combo4.$data.CD1000000043N[0].value          // 평판구분
      this.$refs.combo4.$data.grd_cd_selected = this.$refs.combo4.$data.CD1000000043N[0].value  // 평판구분(콤보)
      this.detail.scholl_nm1          = '' // 학교명1
      this.detail.gdt_ym1             = '' // 졸업년월1
      this.detail.study1              = '' // 전공1
      this.detail.scholl_nm2          = '' // 학교명2
      this.detail.gdt_ym2             = '' // 졸업년월2
      this.detail.study2              = '' // 전공2
      this.detail.scholl_nm3          = '' // 학교명3
      this.detail.gdt_ym3             = '' // 졸업년월3
      this.detail.study3              = '' // 전공3
      this.detail.qlfks_nm1           = '' // 자격증1
      this.detail.aqu_ymm1            = '' // 자격증취득일1
      this.detail.qlfks_nm2           = '' // 자격증2
      this.detail.aqu_ymm2            = '' // 자격증취득일2
      this.detail.qlfks_nm3           = '' // 자격증3
      this.detail.aqu_ymm3            = '' // 자격증취득일3
      this.detail.qlfks_nm4           = '' // 자격증4
      this.detail.aqu_ymm4            = '' // 자격증취득일4
      this.detail.qlfks_nm5           = '' // 자격증5
      this.detail.aqu_ymm5            = '' // 자격증취득일5
      this.detail.atfl_mng_id         = '' // 첨부파일관리ID

      // 그리드2 , 그리드3 초기화
      this.$refs.grid2.invoke("clear");
      this.$refs.grid3.invoke("clear");

    },

  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{

  },

// 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C27","C0","C-P1"],
      comboList2 : ["C-P2"],
      comboList3 : ["C-P3"],
      comboList4 : ["C-P4"],

      gridData2: [],
      gridData3: [],

      file_name_list: [],

      info : {
        prjt_nm_selected      : sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트명
        bkup_id_selected      : '0000000000',     // 백업ID
        skill_grd_selected    : 'TTT',            // 기술등급
        main_skill            : '',               // 주요기술
        duty_txt              : '',               // 주요업무
        man_no                : '',               // 인력번호
        man_nm                : '',               // 이름
        company_nm            : '',               // 재직처
        exe_cpy_nm            : '',               // 발주처
        proj_nm               : '',               // 경력프로젝트명

        grid_num              : '',               // 그리드 번호
        current_man_no        : '',               // 선택 된 인력이름
      },
      detail : {
        last_chg_dt         : '',           // 최종변경일자
        man_no              : '',                     // 인력번호
        man_nm              : '',                     // 이름
        rank_nm             : '',                     // 직급명
        man_cd_selected     : 'NNN',                  // 인력구분
        birthday            : '',                     // 생년월
        age                 : '',                     // 만나이
        address             : '',                     // 주소
        skill_grd_selected  : 'NNN',                  // 기술등급
        career              : '',                     // 경력
        now_career          : '',                     // 현재경력
        enter_ymd           : '',                     // 입사년월일
        sex_nm              : '',                     // 성별
        inp_prj_nm          : '',                     // 현/이전투입프로젝트명
        wth_dt              : '',                     // 철수일자
        nxt_prj_nm          : '',                     // 차기프로젝트/업무
        inp_cls_cd          : '',                     // 투입구분코드
        main_skill          : '',                     // 주요기술
        duty_txt            : '',                     // 주요업무
        cpno                : '',                     // 휴대전화번호
        company_nm          : '',                     // 회사명
        grd_cd_selected     : 'NNN',                  // 평판구분
        scholl_nm1          : '',                     // 학교명1
        gdt_ym1             : '',                     // 졸업년월1
        study1              : '',                     // 전공1
        scholl_nm2          : '',                     // 학교명2
        gdt_ym2             : '',                     // 졸업년월2
        study2              : '',                     // 전공2
        scholl_nm3          : '',                     // 학교명3
        gdt_ym3             : '',                     // 졸업년월3
        study3              : '',                     // 전공3
        qlfks_nm1           : '',                     // 자격증1
        aqu_ymm1            : '',                     // 자격증취득일1
        qlfks_nm2           : '',                     // 자격증2
        aqu_ymm2            : '',                     // 자격증취득일2
        qlfks_nm3           : '',                     // 자격증3
        aqu_ymm3            : '',                     // 자격증취득일3
        qlfks_nm4           : '',                     // 자격증4
        aqu_ymm4            : '',                     // 자격증취득일4
        qlfks_nm5           : '',                     // 자격증5
        aqu_ymm5            : '',                     // 자격증취득일5
        atfl_mng_id         : '',                     // 첨부파일관리ID
      },
      login : {
        login_aut_cd          : sessionStorage.getItem("LOGIN_AUT_CD"),    // 권한ID
        login_proj_id         : sessionStorage.getItem("LOGIN_PROJ_ID"),   // 프로젝트ID
        login_bzcd            : sessionStorage.getItem("LOGIN_BZCD"),      // 업무구분
        login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO"),    // 직원번호
        login_emp_nm          : sessionStorage.getItem("LOGIN_EMP_NM"),    // 직원명
        login_catn_dcd        : sessionStorage.getItem("LOGIN_CATN_DCD"),  // 구성원 구분코드
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
          readData   : { url: process.env.VUE_APP_API + '/PJTE9005/select1', method: 'GET' },
        },
        initialRequest: false,
        contentType : 'application/json;',
        headers : {  'x-custom-header' : 'custom-header'  },
        withCredentials: false,
      },
      dataSource2: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9005/select3', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE9005/create2', method: 'POST'},
          updateData : { url: process.env.VUE_APP_API + '/PJTE9005/update2', method: 'PUT'},
          deleteData : { url: process.env.VUE_APP_API + '/PJTE9005/delete2', method: 'PUT'},
        },
        initialRequest: false,
        contentType : 'application/json;',
        headers : {  'x-custom-header' : 'custom-header'  },
        withCredentials: false,
      },
      dataSource3: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9005/select4', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE9005/create3', method: 'POST'},
          updateData : { url: process.env.VUE_APP_API + '/PJTE9005/update3', method: 'PUT'},
          deleteData : { url: process.env.VUE_APP_API + '/PJTE9005/delete3', method: 'PUT'},
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
          header: '이름',
          width: 120,
          align: 'center',
          name: 'man_nm',
          editor: 'text',
        },
        {
          header: '번호',
          width: 120,
          align: 'center',
          name: 'man_no',
          editor: 'text',
          hidden: true,
        },
        {
          header: '직급',
          width: 80,
          align: 'center',
          name: 'rank_nm',
          editor: 'text',
        },
        {
          header: '직원구분',
          width: 120,
          align: 'center',
          name: 'man_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000041N
            }
          }
        },
        {
          header: '등급',
          width: 80,
          align: 'center',
          name: 'skill_grd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000042N
            }
          }
        },
        {
          header: '경력',
          width: 120,
          align: 'right',
          name: 'career',
          editor: 'text',
        },
        {
          header: '현재경력',
          width: 120,
          align: 'right',
          name: 'now_career',
          editor: 'text',
        },
        {
          header: '주요기술',
          width: 270,
          align: 'left',
          name: 'main_skill',
          editor: 'text',
        },
        {
          header: '주요업무',
          minWidth: 120,
          align: 'left',
          name: 'duty_txt',
          editor: 'text',
        },
        {
          header: '자격증',
          width: 180,
          align: 'left',
          name: 'qlfks_nm1',
          editor: 'text',
        },
        {
          header: '평판',
          width: 100,
          align: 'center',
          name: 'grd_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000043N
            }
          }
        },
      ],
      columns2: [
        {
          header: '재직처',
          width: 250,
          align: 'left',
          name: 'company_nm',
          editor: 'text',
        },
        {
          header: '재직시작년월',
          width: 100,
          align: 'center',
          name: 'enter_dt',
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy-MM',
              type: 'month',
            }
          }
        },
        {
          header: '재직종료년월',
          width: 100,
          align: 'center',
          name: 'rsnt_dt',
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy-MM',
              type: 'month',
            }
          }
        },
        {
          header: '담당업무',
          width: 350,
          align: 'left',
          name: 'rssb_bns',
          editor: 'text',
        },
        {
          header: '비고',
          minWidth: 120,
          align: 'left',
          name: 'rmrk',
          editor: 'text',
        },
        {
          header: '순번',
          minWidth: 120,
          align: 'center',
          name: 'sqno',
          editor: 'text',
          hidden: true,
        },
      ],
      columns3: [
        {
          header: '수행처(발주처)',
          width: 250,
          align: 'left',
          name: 'exe_cpy_nm',
          editor: 'text',
        },
        {
          header: '시작년월',
          width: 100,
          align: 'center',
          name: 'sta_dt',
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy-MM',
              type: 'month',
            }
          }
        },
        {
          header: '종료년월',
          width: 100,
          align: 'center',
          name: 'end_dt',
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy-MM',
              type: 'month',
            }
          }
        },
        {
          header: '프로젝트명',
          width: 480,
          align: 'left',
          name: 'proj_nm',
          editor: 'text',
        },
        {
          header: '수행업무',
          width: 200,
          align: 'left',
          name: 'rssb_bns',
          editor: 'text',
        },
        {
          header: '역할',
          width: 120,
          align: 'left',
          name: 'duty_txt',
          editor: 'text',
        },
        {
          header: '사용기종/OS',
          width: 120,
          align: 'left',
          name: 'use_os',
          editor: 'text',
        },
        {
          header: '관련기술',
          minWidth: 120,
          align: 'left',
          name: 'rlt_skill',
          editor: 'text',
        },
        {
          header: '순번',
          minWidth: 120,
          align: 'center',
          name: 'sqno',
          editor: 'text',
          hidden: true,
        },
      ],
    }
  },
};

</script>
<style>
/*PJTE9005에서만 사용 CSS*/
.disableColor {
  background: #FFFFFF!important;
}
.empBtnColor {
  background: #BEBEBE!important;
}
.placeBlack::placeholder {
  color: #000000!important;
}
.search-btn-9005 {
  position: absolute;
  width: 28px;
  height: 24px;
  background: url(../../assets/img/PE-icon/ic_search.svg) center/20px no-repeat;
  background-color: #B8B8B8;
  border: 0;
}
</style>
