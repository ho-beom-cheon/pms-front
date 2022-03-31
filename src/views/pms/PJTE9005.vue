<template>
  <!-- CONTENTS -->
  <div class="contents">
    <input type="hidden" name="updatedRows" v-model="updatedRows" id="updatedRows">
    <input type="hidden" name="deletedRows" v-model="deletedRows" id="deletedRows">
    <input type="hidden" name="createdRows" v-model="createdRows" id="createdRows">
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
                       @keyup.enter="open_pjte9001(3)"
                >
                <button class="search-btn"
                        @click="open_pjte9001_btn(3)"
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
            <div class="btn btn-filter-p" style="margin-left: 10px">
              <a href="#" @click="fnSearch">조회</a>
            </div>
          </ul>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box" style="height: 255px">
          <div class="div-header"><h2>인력내역</h2>
            <ul class="filter-btn">
              <div class="btn btn-filter-e">
                <a href="#" @click="gridExcelExport(1)">엑셀다운로드</a>
              </div>
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
                @click="onClick"
            ></grid>
          </div>
        </div>
        <div class="grid1-box" style="height: 500px">
            <div class="div-header-b"><h2>1. 인적사항</h2>
              <p style="margin-left: 50px; margin-top: 8px">(최종변경일자 : YYYY-MM-DD)</p>
              <ul class="filter-btn">
                <button class="btn btn-filter-e" style="margin-left: 20px" @click="fnSave">경력증빙첨부</button>
                <button class="btn btn-filter-b" style="margin-left: 20px" @click="fnSave">신규초기화</button>
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
                    >
                    <button class="search-btn-9005"
                            @click="open_pjte9001_btn(3)"
                    ></button>
                    <input type="text"
                           placeholder="직원번호"
                           ref="man_no"
                           v-model="detail.man_no"
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
                           placeholder="입력"
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
                           style="width: 93.25%"
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
                           placeholder="입력불가"
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
                           placeholder="입력"
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
                           placeholder="입력"
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
        <div class="grid1-box">
          <div class="div-header"><h2>2. 재직사항</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-e">
                <label for="file1" @click="gridExcelExport">엑셀업로드</label>
                <input type="file" id="file1"  @change="gridExcelExport" accept="application/vnd.ms-excel.sheet.macroEnabled.12" style="display: none;"/>
              </button>
              <div class="btn btn-filter-e">
                <a href="#" @click="gridExcelExport(1)">엑셀다운로드</a>
              </div>
              <button class="btn btn-filter-b" @click="gridAddRow" style="margin-left: 20px">행추가</button>
              <button class="btn btn-filter-b" @click="gridDelRow">행삭제</button>
            </ul>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid2"
                :data="dataSource2"
                :header="header"
                :columns="columns2"
                :minBodyHeight="55"
                :bodyHeight="115"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeight="rowHeight"
            ></grid>
          </div>
        </div>
        <div class="grid1-box" style="height: 190px">
          <div class="div-header"><h2>3. 경력사항</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-e">
                <label for="file2" @click="gridExcelExport">엑셀업로드</label>
                <input type="file" id="file2"  @change="gridExcelExport" accept="application/vnd.ms-excel.sheet.macroEnabled.12" style="display: none;"/>
              </button>
              <div class="btn btn-filter-e">
                <a href="#" @click="gridExcelExport(1)">엑셀다운로드</a>
              </div>
              <button class="btn btn-filter-b" @click="gridAddRow" style="margin-left: 20px">행추가</button>
              <button class="btn btn-filter-b" @click="gridDelRow">행삭제</button>
            </ul>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid3"
                :data="dataSource3"
                :header="header"
                :columns="columns3"
                :minBodyHeight="55"
                :bodyHeight="115"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeight="rowHeight"
            ></grid>
          </div>
        </div>
        <section class="filter">
            <ul class="filter-btn">
              <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSave">저장</button>
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
import Modal from "@/components/Modal";
import XLSX from "xlsx";
import PmsSideBar from  "@/components/PmsSideBar";
import WindowPopup from "./PJTE3001.vue";          // 결함등록팝업
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http";


// 첨부파일 팝업에서 받은 값
window.fileData = (fileLists, num) => {
  console.log(fileLists);
  window.pms_register.file_name_list = fileLists;
  window.pms_register.atfl_num = num;
  window.pms_register.atfl_mng_id_yn = fileLists[1].atfl_mng_id;
  window.pms_register.atfl_mng_id = fileLists[1].atfl_mng_id;
  window.pms_register.pal_atfl_mng_id_yn = fileLists[1].atfl_mng_id;
  window.pms_register.pal_atfl_mng_id = fileLists[1].atfl_mng_id;
}
// 직원조회 팝업에서 받은 값
// window.empData = (empnm ,empno, btn_id, emprow, empcol) => {
//   if(btn_id === undefined) {  // 그리드 내 직원조회
//     if(empcol == 'dvlpe_btn') {
//       window.pms_register.$refs.grid.invoke("setValue", emprow, 'dvlpe_no', empno);
//       window.pms_register.$refs.grid.invoke("setValue", emprow, 'dvlpe_nm', empnm);
//     } else if(empcol == 'pl_btn') {
//       window.pms_register.$refs.grid.invoke("setValue", emprow, 'pl_no', empno);
//       window.pms_register.$refs.grid.invoke("setValue", emprow, 'pl_nm', empnm);
//     } else if(empcol == 'crpe_btn') {
//       window.pms_register.$refs.grid.invoke("setValue", emprow, 'crpe_no', empno);
//       window.pms_register.$refs.grid.invoke("setValue", emprow, 'crpe_nm', empnm);
//     } else if(empcol == 'dvlpe_nm') {
//       window.pms_register.$refs.grid.invoke("setValue", emprow, 'dvlpe_no', empno);
//       window.pms_register.$refs.grid.invoke("setValue", emprow, 'dvlpe_nm', empnm);
//     } else if(empcol == 'pl_nm') {
//       window.pms_register.$refs.grid.invoke("setValue", emprow, 'pl_no', empno);
//       window.pms_register.$refs.grid.invoke("setValue", emprow, 'pl_nm', empnm);
//     } else if(empcol == 'crpe_nm') {
//       window.pms_register.$refs.grid.invoke("setValue", emprow, 'crpe_no', empno);
//       window.pms_register.$refs.grid.invoke("setValue", emprow, 'crpe_nm', empnm);
//     }
//   } else {  // 상단 필터 직원조회
//     if(btn_id === '1') {
//       window.pms_register.info.dvlpe_no = empno  // 개발자번호
//       window.pms_register.info.dvlpe_nm = empnm  // 개발자명
//     } else {
//       window.pms_register.info.pl_no = empno  // PL번호
//       window.pms_register.info.pl_nm = empnm  // PL명
//     }
//   }
// }

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    grid: Grid,
    Modal,
    PmsSideBar
  },

  mounted() {
    // 화면 초기화
    this.init();
    // 화면 접속 시 데이터 조회
    this.fnSearch();
    window.pms_register = this;
  },
  updated(){
    // 100, 200 권한에 따른 구분함수
    // 개발자 : 100, PL : 200
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
    },
    // 저장 버튼
    fnSave(){
      if(this.excelUplod === 'Y') {
        this.gridData = this.$refs.grid.invoke("getData");
        axiosService.post("/PJTE9005/create", {
          excelUplod : this.excelUplod,
          gridData: this.gridData,
          prjt_id  : sessionStorage.getItem("LOGIN_PROJ_ID"),
          login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO")
        }).then(res => {
          console.log(res);
          if (res.data) {
          }
        }).catch(e => {
          alert("이미 등록된 프로그램입니다.")
        })
      } else if(this.excelUplod === 'N') {
        // 변경 사항 유무 체크
        if (this.$refs.grid.invoke("isModified") === false) {
          alert("변경된 내용이 없습니다.");
          return;
        }
        // 데이터 로그 확인
        // console.log("updatedRows ::", this.$refs.grid.invoke("getModifiedRows").updatedRows);
        // console.log("createdRows ::", this.$refs.grid.invoke("getModifiedRows").createdRows);
        // console.log("deletedRows ::", this.$refs.grid.invoke("getModifiedRows").deletedRows);

        // 변경 데이터 저장
        this.updatedRows = this.$refs.grid2.invoke("getModifiedRows").updatedRows;
        this.deletedRows = this.$refs.grid2.invoke("getModifiedRows").deletedRows;
        this.createdRows = this.$refs.grid2.invoke("getModifiedRows").createdRows;

        if (this.createdRows.length !== 0) {
          if (this.vaildation(this.createdRows, "1") === true) {
            if (sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600') {
              for (let i = 0; i < this.createdRows.length; i++) {
                if (this.createdRows[i].dvlp_dis_cd === "900") {
                  alert("개발구분 삭제 권한이 없습니다.");
                  return;
                }
              }
            }
            axiosService.post("/PJTE9005/create", {
              excelUplod: this.excelUplod,
              gridData: this.createdRows,
              prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
              login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO")
            }).then(res => {
              console.log(res)
              if (res.data === true) {
                alert("저장이 완료되었습니다.")
                // 저장 후 변경 데이터 배열 비움
                this.$refs.grid2.invoke("clearModifiedData")
                this.excelUplod = 'N'
              } else {
                alert("이미 등록된 프로그램입니다.")
              }
              this.fnSearch()
            })
          } else {
            return;
          }
        }
        if (this.updatedRows.length !== 0) {
          if (this.vaildation(this.updatedRows, "1") === true) {
            try {
              if (sessionStorage.getItem("LOGIN_AUT_CD") !== '500' && sessionStorage.getItem("LOGIN_AUT_CD") !== '600') {
                for (let i = 0; i < this.updatedRows.length; i++) {
                  if (this.updatedRows[i].dvlp_dis_cd === "900") {
                    alert("삭제 권한이 없습니다.");
                    return;
                  }
                }
              }
              // 데이터 파라메타 전달
              this.$refs.grid2.invoke("setRequestParams", JSON.stringify(this.updatedRows));
              this.$refs.grid2.invoke("setRequestParams", this.login);
              // update api 요청
              this.$refs.grid2.invoke("request", "updateData", {showConfirm: false});
              alert("저장이 완료되었습니다.")
              // 저장 후 변경 데이터 배열 비움
              this.$refs.grid2.invoke("clearModifiedData")
              this.excelUplod = 'N'
            } catch (e) {
              console.log("업데이트 오류 ::", e);
            }
          } else {
            return;
          }
        }
      }
    },

    onGridUpdated(grid){

    },
    beforeExport(grid){
      console.log("beforeExport::" , grid)
    },
    // 클릭 이벤트 - 인력내역(그리드1) ROW 클릭 시 하단 세부내역 조회 (인적사항, 그리드2, 그리드3)
    onClick(ev) {
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
        console.log("res.data.data ::" + res.data.data)
        this.setEmpData(res.data.data);
      }).catch(e => {

      });
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");
      this.$refs.grid3.invoke("setRequestParams", this.info);
      this.$refs.grid3.invoke("readData");
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
      this.detail.aqu_ymm5            = data.contents[0].aqu_ymm5             // 자격증취득일5
    },

    // 행추가
    gridAddRow(){
      this.$refs.grid2.invoke("setFrozenColumnCount", 0);
      this.addCheak = 'Y';
      this.$refs.grid2.invoke("appendRow",
          {
            bzcd    : sessionStorage.getItem("LOGIN_BZCD"),
            save_yn : "N", //행르 추가하면 등록여부 'N'
            prjt_id : sessionStorage.getItem("LOGIN_PROJ_ID"),
            bkup_id : "0000000000",
          },
          {focus:true}) ;
      this.fnEnable();
    },
    // 추가한 행 편집 활성화
    fnEnable() {
      // 새로 ADD한 Row를 enable시킴
      this.NewRow = this.$refs.grid2.invoke("getRowCount");
      this.$refs.grid2.invoke("enableRow", this.NewRow-1);
      this.$refs.grid2.invoke("enableCell", this.NewRow-1, "pgm_id");
      this.$refs.grid2.invoke("disableCell", this.NewRow-1, "pal_atfl_mng_id_yn");
      this.$refs.grid2.invoke("disableCell", this.NewRow-1, "atfl_mng_id_yn");
      this.$refs.grid2.invoke("disableCell", this.NewRow-1, "err_btn");
      this.$refs.grid2.invoke("disableCell", this.NewRow-1, "sta_dt");
      this.$refs.grid2.invoke("disableCell", this.NewRow-1, "end_dt");
      this.$refs.grid2.invoke("disableCell", this.NewRow-1, "dvlpe_cnf_dt");
      this.$refs.grid2.invoke("disableCell", this.NewRow-1, "pl_cnf_dt");
    },
    // 행삭제
    gridDelRow(){
      if(this.$refs.grid2.invoke('getRow',this.curRow).save_yn === "Y"){
        alert("등록된 목록은 삭제불가함. PMS 관리자에게 요청하세요.");
        return;
      }
      this.addCheak = 'N'
      this.$refs.grid2.invoke("removeRow", this.curRow, {showConfirm:false});
    },
    // 엑셀 다운로드
    gridExcelExport(){
      this.$refs.grid2.invoke("export", "xlsx",{fileName: "엑셀다운로드", useFormattedValue : true, onlySelected:true});
    },
    //직원조회 버튼 클릭 시
    open_pjte9001_btn(btn_id) {
      let empnm = ''
      if (btn_id == '1') {
        empnm = this.info.dvlpe_nm
      } else if (btn_id == '2') {
        empnm = this.info.pl_nm
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
        empnm = this.info.dvlpe_nm
      } else if (btn_id == '2') {
        empnm = this.info.pl_nm
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
                  this.info.dvlpe_no = res.data.data.contents[0].empno
                  this.info.dvlpe_nm = res.data.data.contents[0].empnm
                } else if (btn_id == '2') {
                  this.info.pl_no = res.data.data.contents[0].empno
                  this.info.pl_nm = res.data.data.contents[0].empnm
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
      if(this.info.pl_nm === "") this.info.pl_no = "";
      if(this.info.dvlpe_nm === "") this.info.dvlpe_no = "";
    },

  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{
    atfl_mng_id(){    // 단위테스트 케이스 변경 시 작동
      if(this.count == 1) {
        if (this.atfl_mng_id_yn !== '') {
          this.$refs.grid.invoke("setValue", this.curRow, 'atfl_mng_id_yn', '첨부');
          this.$refs.grid.invoke("setValue", this.curRow, 'atfl_mng_id', this.atfl_mng_id);
        }
      }
      if(this.count == 2) {
        if(this.pal_atfl_mng_id_yn !== '') {
          this.$refs.grid.invoke("setValue", this.curRow, 'pal_atfl_mng_id_yn', '첨부');
          this.$refs.grid.invoke("setValue", this.curRow, 'pal_atfl_mng_id', this.pal_atfl_mng_id);
        }
      }
    },
    txt_modal1() {
      if(this.modals.txt_modal1 === true) {
        document.getElementById("modalId").focus()
      }
    }
  },

// 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C27","C0","C-P1"],
      comboList2 : ["C-P2"],
      comboList3 : ["C-P3"],
      comboList4 : ["C-P4"],

      gridData: [],
      excelUplod: 'N',
      addCheak: 'N',
      validated: false,

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
        man_cd_selected     : '',                  // 인력구분
        birthday            : '',                     // 생년월
        age                 : '',                     // 만나이
        address             : '',                     // 주소
        skill_grd_selected  : '',                  // 기술등급
        career              : '',                     // 경력
        now_career          : '',                     // 현재경력
        enter_ymd           : '',                     // 입사년월일
        sex_nm              : '',                     // 성별
        main_skill          : '',                     // 주요기술
        duty_txt            : '',                     // 주요업무
        cpno                : '',                     // 휴대전화번호
        company_nm          : '',                     // 회사명
        grd_cd_selected     : '',                  // 평판구분
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
      },
      login : {
        login_aut_cd          : sessionStorage.getItem("LOGIN_AUT_CD"),    // 권한ID
        login_proj_id         : sessionStorage.getItem("LOGIN_PROJ_ID"),   // 프로젝트ID
        login_bzcd            : sessionStorage.getItem("LOGIN_BZCD"),      // 업무구분
        login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO"),    // 직원번호
        login_emp_nm          : sessionStorage.getItem("LOGIN_EMP_NM"),    // 직원명
        login_catn_dcd        : sessionStorage.getItem("LOGIN_CATN_DCD"),  // 구성원 구분코드
      },

      updatedRows : this.updatedRows,
      deletedRows : this.deletedRows,
      createdRows : this.createdRows,

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


      /* 그리드 상세보기 모달 속성 */
      modals: {
        txt_modal1: false,
      },
      modalTxt:this.modalTxt,

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
              listItems: this.$store.state.pms.CD1000000040N
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
              listItems: this.$store.state.pms.CD1000000041N
            }
          }
        },
        {
          header: '경력',
          width: 120,
          align: 'center',
          name: 'career',
          editor: 'text',
        },
        {
          header: '현재경력',
          width: 120,
          align: 'center',
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
          editor: 'text',
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
          type: 'date',
          name: 'enter_dt',
          editor: 'datePicker'
        },
        {
          header: '재직종료년월',
          width: 100,
          align: 'center',
          type: 'date',
          name: 'rsnt_dt',
          editor: 'datePicker'
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
          type: 'date',
          name: 'sta_dt',
          editor: 'datePicker'
        },
        {
          header: '종료년월',
          width: 100,
          align: 'center',
          type: 'date',
          name: 'end_dt',
          editor: 'datePicker'
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
          align: 'center',
          name: 'duty_txt',
          editor: 'text',
        },
        {
          header: '사용기종/OS',
          width: 120,
          align: 'center',
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
input[type="month"]::-webkit-calendar-picker-indicator{
  opacity:0;
  z-index: 1;
  cursor: pointer;
}
.input-monthWrap {
  position: relative;
  display: inline-block;
}
.input-monthWrap::after {
  content: '';
  position: absolute;
  right: 6px;
  top: 4px;
  width: 16px;
  height: 16px;
  background: url(../../assets/img/PE-icon/ic_input_cal.svg) center/cover no-repeat;
}
</style>
