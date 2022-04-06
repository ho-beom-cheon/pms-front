<template>
  <!-- CONTENTS1 -->
  <div class="contents">

    <!-- ASIDE -- LNB -->
    <PmsSideBar></PmsSideBar>
    <!-- 컨텐츠 영역 -->
    <div class="contents-body">
      <!-- 필터영역 -->
      <section class="filter">
        <div class="col">
          <ul class="filter-con clear-fix">
            <combo
                :comboArray="this.comboList"
                @bkup_id_change="bkup_id_change"
                @prjt_nm_chage="prjt_nm_chage"
                @rgs_dis_cd_change="rgs_dis_cd_change"
                @req_dis_cd_change="req_dis_cd_change"
                @iss_prc_step_cd_change="iss_prc_step_cd_change"
            >
            </combo>
            <li class="filter-item">
              <div class="item-con">조치업무명
                <input type="text"
                       placeholder="입력"
                       v-model="info.tgt_biz_nm"
                       style="width: 170px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="input-searchWrap">요청자
                <input type="text"
                       placeholder="직원명"
                       v-model="info.achi_nm"
                       style="width: 120px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="input-searchWrap">조치담당자
                <input type="text"
                       placeholder="직원명"
                       v-model="info.ttmn_crpe_nm"
                       style="width: 120px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">요청일자
                <div class="input-dateWrap">
                  <input type="date"
                         :max="info.rgs_end_dt"
                         v-model="info.rgs_sta_dt"
                         style="width: 125px"
                  ></div>
                -
                <div class="input-dateWrap">
                  <input type="date"
                         :min="info.rgs_sta_dt"
                         v-model="info.rgs_end_dt"
                         style="width: 125px"
                  ></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">조치일자
                <div class="input-dateWrap">
                  <input type="date"
                         :min="info.ttmn_end_dt"
                         v-model="info.ttmn_sta_dt"
                         style="width: 125px"
                  ></div>
                -
                <div class="input-dateWrap">
                  <input type="date"
                         :min="info.ttmn_sta_dt"
                         v-model="info.ttmn_end_dt"
                         style="width: 125px"
                  ></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">제목
                <input type="text"
                       placeholder="입력"
                       v-model="info.titl_nm"
                       style="width: 135px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">요청내용
                <input type="text"
                       placeholder="입력"
                       v-model="info.req_dis_txt"
                       style="width: 135px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">해결방안내용
                <input type="text"
                       placeholder="입력"
                       v-model="info.slv_mpln_txt"
                       style="width: 135px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">조치내용
                <input type="text"
                       placeholder="입력"
                       v-model="info.ttmn_txt"
                       style="width: 135px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">
                <input type="checkbox" id="cmpl_yn" v-model="info.cmpl_yn">
                <label>　완료건포함</label>
              </div>
            </li>
          </ul>
          <ul class="filter-btn">
            <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
            <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSearch">조회</button>
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
              :minRowHeight="minRowHeight"
              :rowHeight="rowHeight"
              :rowHeaders="rowHeaders"
              @click="onClick"
          ></grid>
        </div>
        <div class="div0-b">
          <div class="div3-b">
            <div class="div-header-b"><h2>상세내용</h2>
              <ul class="filter-btn"><p>* : 필수입력 항목입니다.</p>
                <button class="btn btn-filter-b" style="margin-left: 20px" @click="fnClear">신규초기화</button>
                <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSave">저장</button>
              </ul>
            </div>
            <div class="div2-body-c">
              <ul class="filter-con clear-fix-a">
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>관리ID</label>
                    <input type="text"
                           placeholder="입력 불가"
                           v-model="detail.mng_id"
                           :disabled=true
                           style="background-color: #f2f2f2 ; width: 150px"
                    >
                  </div>
                </li>
                <combo
                    :comboArray="this.comboList2"
                    @rgs_dis_cd_change_iss="rgs_dis_cd_change_iss"
                    @iss_prc_step_cd_change_iss="iss_prc_step_cd_change_iss"
                    @req_dis_cd_change_iss="req_dis_cd_change_iss"
                    ref="combo2"
                >
                </combo>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>*요청일자</label>
                    <div class="input-dateWrap">
                      <input type="date"
                             ref="rgs_dt"
                             v-model="detail.rgs_dt"
                             :disabled=true
                             style="width: 150px; background-color: #f2f2f2;"
                      ></div>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>*요청자</label>
                    <input type="text"
                           placeholder="입력"
                           ref="achi_nm"
                           v-model="detail.achi_nm"
                           style="width: 150px; margin-right: 150px;"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>조치담당자</label>
                    <input type="text"
                           placeholder="입력"
                           v-model="detail.ttmn_crpe_nm"
                           style="width: 150px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>조치업무명</label>
                    <input type="text"
                           placeholder="입력"
                           v-model="detail.tgt_biz_nm"
                           id="tgt_biz_nm"
                           name="tgt_biz_nm"
                           style="width: 150px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>조치예정일자</label>
                    <div class="input-dateWrap">
                      <input type="date"
                             v-model="detail.ttmn_scd_dt"
                             style="width: 150px"
                      ></div>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>조치일자</label>
                    <div class="input-dateWrap">
                      <input type="date"
                             v-model="detail.ttmn_dt"
                             style="width: 150px"
                      ></div>
                  </div>
                </li>
                <combo
                    :comboArray="this.comboList3"
                    @urgn_cd_change_iss="urgn_cd_change_iss"
                    @ifnc_cd_change_iss="ifnc_cd_change_iss"
                    ref="combo3"
                >
                </combo>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>등급</label>
                    <input type="text"
                           placeholder="입력"
                           v-model="detail.gd_txt"
                           style="width: 150px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>*제목</label>
                    <input type="text"
                           placeholder="입력"
                           ref="titl_nm"
                           v-model="detail.titl_nm"
                           style="width: 885px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <th style="vertical-align: middle">
                      <label>*요청내용</label>
                    </th>
                    <td>
                      <textarea cols="140"
                                rows="5"
                                placeholder="결함내용을 입력해주세요"
                                ref="req_dis_txt"
                                v-model="detail.req_dis_txt"
                                style="width: 885px; line-height: normal;"
                                @click="enlarged_view(1)"
                      ></textarea>
                    </td>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <th style="vertical-align: middle">
                      <label>조치내용</label>
                    </th>
                    <td>
                      <textarea cols="140"
                                rows="5"
                                placeholder="조치내용을 입력해주세요"
                                v-model="detail.ttmn_txt"
                                style="width: 885px; line-height: normal;"
                                @click="enlarged_view(2)"
                      ></textarea>
                    </td>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <th style="vertical-align: middle">
                      <label>해결방안내용</label>
                    </th>
                    <td>
                      <textarea cols="140"
                                rows="5"
                                placeholder="해결방안내용을 입력해주세요"
                                v-model="detail.slv_mpln_txt"
                                style="width: 885px; line-height: normal;"
                                @click="enlarged_view(3)"
                      ></textarea>
                    </td>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <th style="vertical-align: middle">
                      <label>비고</label>
                    </th>
                    <td>
                      <textarea cols="140"
                                rows="2"
                                placeholder="비고를 입력해주세요"
                                v-model="detail.rmrk"
                                style="width: 885px; line-height: normal;"
                                @click="enlarged_view(4)"
                      ></textarea>
                    </td>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="div4-b">
            <div class="div-header-b">
              <h2 v-if="this.large_num == ''">상세내용 확대보기</h2>
              <h2 v-if="this.large_num == '1'">요청내용 확대보기</h2>
              <h2 v-if="this.large_num == '2'">조치내용 확대보기</h2>
              <h2 v-if="this.large_num == '3'">해결방안내용 확대보기</h2>
              <h2 v-if="this.large_num == '4'">비고 확대보기</h2>
              <ul class="filter-btn">
                <button class="btn btn-filter-b" @click="textSizeUP">+ 확대</button>
                <button class="btn btn-filter-b" @click="textSizeDown">- 축소</button>
              </ul>
            </div>
            <div class="div2-body-c">
              <ul class="filter-con clear-fix-a">
                <li class="filter-item-a">
                  <td>
                    <textarea v-if="this.large_num == ''"
                              cols="103"
                              rows="33"
                              id="detailTextArea"
                              v-model="detail.req_dis_txt"
                              :disabled=true
                              style="height: 425px; width: 647px; background-color: #f2f2f2; border: none; line-height: normal"
                    ></textarea>
                    <textarea v-else-if="this.large_num == '1'"
                              cols="103"
                              rows="33"
                              id="detailTextArea1"
                              v-model="detail.req_dis_txt"
                              :disabled=true
                              style="height: 425px; width: 647px; background-color: #f2f2f2; border: none; line-height: normal"
                    ></textarea>
                    <textarea v-else-if="this.large_num == '2'"
                              cols="103"
                              rows="33"
                              id="detailTextArea2"
                              v-model="detail.ttmn_txt"
                              :disabled=true
                              style="height: 425px; width: 647px; background-color: #f2f2f2; border: none; line-height: normal"
                    ></textarea>
                    <textarea v-else-if="this.large_num == '3'"
                              cols="103"
                              rows="33"
                              id="detailTextArea3"
                              v-model="detail.slv_mpln_txt"
                              :disabled=true
                              style="height: 425px; width: 647px; background-color: #f2f2f2; border: none; line-height: normal"
                    ></textarea>
                    <textarea v-else-if="this.large_num == '4'"
                              cols="103"
                              rows="33"
                              id="detailTextArea4"
                              v-model="detail.rmrk"
                              :disabled=true
                              style="height: 425px; width: 647px; background-color: #f2f2f2; border: none; line-height: normal"
                    ></textarea>
                  </td>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import {Grid} from '@toast-ui/vue-grid';
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
import axios from "axios";
import Combo from "@/components/Combo"
import PmsSideBar from  "@/components/PmsSideBar";
import {axiosService} from "@/api/http";

const storage = window.sessionStorage;

export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    PmsSideBar,
    grid: Grid,
  },
// beforeCreate ~ destroyed 까지는 Vue 인스턴스 생성에 따라 자동으로 호출되는 함수
// "라이프사이클 훅"이라고 함.
// 자세한 사항은 Vue 라이프 사이클 참조
// https://kr.vuejs.org/v2/guide/instance.html
  beforeCreate() {
    // console.log("beforeCreate");
  },
// 화면 동작 시 제일 처음 실행되는 부분
// 변수 초기화
  created() {
    // console.log("created");

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
    getCount() {
      return this.count;
    }

  },
// 일반적인 함수를 선언하는 부분
  methods: {
    // Combo.vue 에서 받아온 값
    bkup_id_change(params) {
      this.info.bkup_id_selected = params
    },
    prjt_nm_chage(params) {
      this.info.prjt_nm_selected = params
    },
    rgs_dis_cd_change(params) {
      this.info.rgs_dis_cd_selected = params
    },
    req_dis_cd_change(params) {
      this.info.req_dis_cd_selected = params
    },
    iss_prc_step_cd_change(params) {
      this.info.prc_step_cd_selected = params
    },

    rgs_dis_cd_change_iss(params) {
      this.detail.rgs_dis_cd_selected = params
    },
    iss_prc_step_cd_change_iss(params) {
      this.detail.prc_step_cd_selected = params
    },
    req_dis_cd_change_iss(params) {
      this.detail.req_dis_cd_selected = params
    },
    urgn_cd_change_iss(params) {
      this.detail.urgn_cd_selected = params
    },
    ifnc_cd_change_iss(params) {
      this.detail.ifnc_cd_selected = params
    },


    init() {
      // 특정 열 비활성화
      this.$refs.grid.invoke("disable");
      this.$refs.grid.invoke("applyTheme", 'striped', {cell: {disabled: {text: '#000000'}}});
      // 그리드 초기화
      this.$refs.grid.invoke("clear");
      // 조회 필터 초기화
      this.info.cmpl_yn = false
      // 상세내용 초기화
      this.detail.mng_id = ''
      // 상세내용 확대보기 초기 폰트사이즈 설정
      if (this.large_num == '1') {
        document.getElementById("detailTextArea1").style.fontSize = this.defaultFontSize + 'px';  // 상세내용 확대보기 폰트 사이즈 최초값
      } else if (this.large_num == '2') {
        document.getElementById("detailTextArea2").style.fontSize = this.defaultFontSize + 'px';  // 상세내용 확대보기 폰트 사이즈 최초값
      } else if (this.large_num == '3') {
        document.getElementById("detailTextArea3").style.fontSize = this.defaultFontSize + 'px';  // 상세내용 확대보기 폰트 사이즈 최초값
      } else if (this.large_num == '4') {
        document.getElementById("detailTextArea4").style.fontSize = this.defaultFontSize + 'px';  // 상세내용 확대보기 폰트 사이즈 최초값
      } else {
        document.getElementById("detailTextArea").style.fontSize = this.defaultFontSize + 'px';  // 상세내용 확대보기 폰트 사이즈 최초값
      }
    },
    fnSave() {
      //백업ID가 현재 일 때만 저장
      if (this.detail.bkup_id_selected == '0000000000') {
        //필수항목 확인
        if (this.checkPrimary() == true) {
          //확인창
          if (confirm("정말 저장하시겠습니까??") == true) {
            // 관리ID가 없으면 INSERT
            if (this.detail.mng_id == "" || this.detail.mng_id == "null") {

              axiosService.post("/PJTE4000/insert",
                  {
                    rgs_dis_cd: this.detail.rgs_dis_cd_selected,        // (상세)관리구분
                    titl_nm: this.detail.titl_nm,                       // (상세)제목
                    req_dis_txt: this.detail.req_dis_txt,               // (상세)요청내용
                    req_dis_cd: this.detail.req_dis_cd_selected,        // (상세)요청구분
                    rgs_dt: this.detail.rgs_dt,                           // (상세)요청일자
                    achi_nm: this.detail.achi_nm,                       // (상세)요청자
                    prc_step_cd: this.detail.prc_step_cd_selected,      // (상세)처리단계
                    tgt_biz_nm: this.detail.tgt_biz_nm,                 // (상세)조치업무명
                    ttmn_crpe_nm: this.detail.ttmn_crpe_nm,             // (상세)조치담당자
                    ttmn_scd_dt: this.detail.ttmn_scd_dt,                 // (상세)조치예정일자
                    ttmn_dt: this.detail.ttmn_dt,                         // (상세)조치일자
                    ttmn_txt: this.detail.ttmn_txt,                     // (상세)조치내용
                    slv_mpln_txt: this.detail.slv_mpln_txt,             // (상세)해결방안내용
                    ifnc_cd: this.detail.ifnc_cd_selected,                // (상세)영향도
                    gd_txt: this.detail.gd_txt,                           // (상세)등급
                    urgn_cd: this.detail.urgn_cd_selected,                // (상세)긴급성
                    rmrk: this.detail.rmrk,                               // (상세)비고
                    login_emp_no: this.detail.login_emp_no,                // (상세)Session 직원 번호
                    bkup_id: this.detail.bkup_id_selected,                 // (상세)백업ID
                    prjt_id: this.detail.prjt_id_selected,                 // (상세)프로젝트ID
                    mng_id: this.detail.mng_id,                           // (상세)관리ID
                  }
              )
                  .then(res => {
                    if (res.status == 200) {
                      alert("신규 저장이 완료되었습니다.");
                      //insert 후 재조회
                      this.$refs.grid.invoke("reloadData");
                    }
                  }).catch(e => {
                alert("신규 저장에 실패하였습니다.");
              })

              // 관리ID가 있으면 UPDATE
            } else {

              axiosService.put("/PJTE4000/update",
                  {
                    rgs_dis_cd: this.detail.rgs_dis_cd_selected,        // (상세)관리구분
                    titl_nm: this.detail.titl_nm,                       // (상세)제목
                    req_dis_txt: this.detail.req_dis_txt,               // (상세)요청내용
                    req_dis_cd: this.detail.req_dis_cd_selected,        // (상세)요청구분
                    rgs_dt: this.detail.rgs_dt,                           // (상세)요청일자
                    achi_nm: this.detail.achi_nm,                       // (상세)요청자
                    prc_step_cd: this.detail.prc_step_cd_selected,      // (상세)처리단계
                    tgt_biz_nm: this.detail.tgt_biz_nm,                 // (상세)조치업무명
                    ttmn_crpe_nm: this.detail.ttmn_crpe_nm,             // (상세)조치담당자
                    ttmn_scd_dt: this.detail.ttmn_scd_dt,                 // (상세)조치예정일자
                    ttmn_dt: this.detail.ttmn_dt,                         // (상세)조치일자
                    ttmn_txt: this.detail.ttmn_txt,                     // (상세)조치내용
                    slv_mpln_txt: this.detail.slv_mpln_txt,             // (상세)해결방안내용
                    ifnc_cd: this.detail.ifnc_cd_selected,                // (상세)영향도
                    gd_txt: this.detail.gd_txt,                           // (상세)등급
                    urgn_cd: this.detail.urgn_cd_selected,                // (상세)긴급성
                    rmrk: this.detail.rmrk,                               // (상세)비고
                    login_emp_no: this.detail.login_emp_no,                // (상세)Session 직원 번호
                    bkup_id: this.detail.bkup_id_selected,                 // (상세)백업ID
                    prjt_id: this.detail.prjt_id_selected,                 // (상세)프로젝트ID
                    mng_id: this.detail.mng_id,                           // (상세)관리ID
                  }
              )
                  .then(res => {
                    if (res.status == 200) {
                      alert("저장이 완료되었습니다.");
                      //update 후 재조회
                      this.$refs.grid.invoke("reloadData");
                      // 이슈처리단계 구분코드가 500 (완료) 일 때, 상세내용 초기화
                      if (this.detail.prc_step_cd_selected == '500') {
                        this.fnClear();
                      }
                    }
                  }).catch(e => {
                alert("저장에 실패하였습니다.");
              })
            }
          } else {   //취소
            return;
          }
        }
      } else {
        alert('백업정보는 저장할 수 없습니다.');
      }
    },

    fnClear() {  // [신규초기화] 버튼 클릭 시 상세내용 값 초기화
      this.detail.rgs_dis_cd_selected = this.$refs.combo2.$data.CD1000000012[0].value                     // (상세)관리구분
      this.$refs.combo2.$data.rgs_dis_cd_selected_iss = this.$refs.combo2.$data.CD1000000012[0].value
      this.detail.prc_step_cd_selected = this.$refs.combo2.$data.CD1000000014[0].value                    // (상세)처리단계
      this.$refs.combo2.$data.iss_prc_step_cd_selected_iss = this.$refs.combo2.$data.CD1000000014[0].value
      this.detail.mng_id = ''                                                                             // (상세)관리ID
      this.detail.req_dis_cd_selected = this.$refs.combo2.$data.CD1000000013[0].value                     // (상세)요청구분
      this.$refs.combo2.$data.req_dis_cd_selected_iss = this.$refs.combo2.$data.CD1000000013[0].value
      this.detail.rgs_dt = this.getToday()                                                                // (상세)요청일자
      this.detail.achi_nm = sessionStorage.getItem("LOGIN_EMP_NM")                                   // (상세)요청자
      this.detail.ttmn_crpe_nm = ''                                                                      // (상세)조치담당자
      this.detail.tgt_biz_nm = ''                                                                        // (상세)조치업무명
      this.detail.ttmn_scd_dt = ''                                                                       // (상세)조치예정일자
      this.detail.ttmn_dt = ''                                                                           // (상세)조치일자
      this.detail.ifnc_cd_selected = this.$refs.combo3.$data.CD1000000016[0].value                       // (상세)영향도
      this.$refs.combo3.$data.ifnc_cd_selected_iss = this.$refs.combo3.$data.CD1000000016[0].value
      this.detail.urgn_cd_selected = this.$refs.combo3.$data.CD1000000015[0].value                       // (상세)긴급성
      this.$refs.combo3.$data.urgn_cd_selected_iss = this.$refs.combo3.$data.CD1000000015[0].value
      this.detail.gd_txt = ''                                                                            // (상세)등급
      this.detail.titl_nm = ''                                                                           // (상세)제목
      this.detail.req_dis_txt = ''                                                                       // (상세)요청내용
      this.detail.ttmn_txt = ''                                                                          // (상세)조치내용
      this.detail.slv_mpln_txt = ''                                                                      // (상세)해결방안내용
      this.detail.rmrk = ''                                                                              // (상세)비고

      //관리구분 콤보박스 활성화
      document.getElementById('rgs_dis_cd_iss').disabled = false
      document.getElementById('rgs_dis_cd_iss').style.backgroundColor = '#ffffff'
    },
    onClick(ev) {
      this.curRow = ev.rowKey;
      const currentRowData = (this.$refs.grid.invoke("getRow", this.curRow));

      // 그리드 row 클릭 시 상세내용에 Bind
      if (currentRowData != null) {
        // console.log(currentRowData)
        this.cellDataBind(currentRowData) // currentRowData가 있을 때 Row 클릭 시 상세내용에 Bind
        // 관리구분 콤보박스 비활성화 (mng_id가 있을 시)
        if (this.detail.mng_id != '' || this.detail.mng_id != 'null' || this.detail.mng_id !== undefined) {
          document.getElementById('rgs_dis_cd_iss').disabled = true
          document.getElementById('rgs_dis_cd_iss').style.backgroundColor = '#f2f2f2'
        }
      }

    },
    /* 그리드 Row onClick클릭 시 상세내용에 Bind */
    cellDataBind(currentRowData) {
      this.detail.rgs_dis_cd_selected = currentRowData.rgs_dis_cd;           // (상세)관리구분
      this.$refs.combo2.$data.rgs_dis_cd_selected_iss = currentRowData.rgs_dis_cd;
      this.detail.prc_step_cd_selected = currentRowData.prc_step_cd;         // (상세)처리단계
      this.$refs.combo2.$data.iss_prc_step_cd_selected_iss = currentRowData.prc_step_cd;
      this.detail.mng_id = currentRowData.mng_id;                            // (상세)관리ID
      this.detail.req_dis_cd_selected = currentRowData.req_dis_cd;           // (상세)요청구분
      this.$refs.combo2.$data.req_dis_cd_selected_iss = currentRowData.req_dis_cd;
      this.detail.rgs_dt = currentRowData.rgs_dt;                            // (상세)요청일자
      this.detail.achi_nm = currentRowData.achi_nm;                          // (상세)요청자
      this.detail.ttmn_crpe_nm = currentRowData.ttmn_crpe_nm;                // (상세)조치담당자
      this.detail.tgt_biz_nm = currentRowData.tgt_biz_nm;                    // (상세)조치업무명
      this.detail.ttmn_scd_dt = currentRowData.ttmn_scd_dt;                  // (상세)조치예정일자
      this.detail.ttmn_dt = currentRowData.ttmn_dt;                          // (상세)조치일자
      this.detail.ifnc_cd_selected = currentRowData.ifnc_cd;                 // (상세)영향도
      this.$refs.combo3.$data.ifnc_cd_selected_iss = currentRowData.ifnc_cd;
      this.detail.urgn_cd_selected = currentRowData.urgn_cd;                 // (상세)긴급성
      this.$refs.combo3.$data.urgn_cd_selected_iss = currentRowData.urgn_cd;
      this.detail.gd_txt = currentRowData.gd_txt;                            // (상세)등급
      this.detail.titl_nm = currentRowData.titl_nm;                          // (상세)제목
      this.detail.req_dis_txt = currentRowData.req_dis_txt;                  // (상세)요청내용
      this.detail.ttmn_txt = currentRowData.ttmn_txt;                        // (상세)조치내용
      this.detail.slv_mpln_txt = currentRowData.slv_mpln_txt;                // (상세)해결방안내용
      this.detail.rmrk = currentRowData.rmrk;                                // (상세)비고
      this.detail.bkup_id_selected = currentRowData.bkup_id;                 // (상세)백업ID

    },
    /* 저장 */
    fnSearch() {
      // 조회 서비스
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    gridExcelExport() {
      this.$refs.grid.invoke("export", "xlsx",{fileName: "엑셀다운로드", useFormattedValue : true});
    },
    gridExcelImport() {

    },
    /* YYYY-MM-DD형태의 오늘 날짜를 구하는 함수*/
    getToday() {
      var date = new Date();
      var year = date.getFullYear();
      var month = ("0" + (1 + date.getMonth())).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);

      return year + '-' + month + '-' + day;
    },
    enlarged_view(num) {
      if (num == 1) {
        this.large_num = '1'
      } else if (num == 2) {
        this.large_num = '2'
      } else if (num == 3) {
        this.large_num = '3'
      } else if (num == 4) {
        this.large_num = '4'
      }
    },
    textSizeUP() {  //상세내용 확대보기  (+확대버튼)
      this.defaultFontSize++;
      if (this.large_num == '1') {
        document.getElementById("detailTextArea1").style.fontSize = this.defaultFontSize + 'px';
      } else if (this.large_num == '2') {
        document.getElementById("detailTextArea2").style.fontSize = this.defaultFontSize + 'px';
      } else if (this.large_num == '3') {
        document.getElementById("detailTextArea3").style.fontSize = this.defaultFontSize + 'px';
      } else if (this.large_num == '4') {
        document.getElementById("detailTextArea4").style.fontSize = this.defaultFontSize + 'px';
      } else {
        document.getElementById("detailTextArea").style.fontSize = this.defaultFontSize + 'px';
      }
    },
    textSizeDown() {  //상세내용 확대보기  (-축소버튼)
      this.defaultFontSize--;
      if (this.large_num == '1') {
        document.getElementById("detailTextArea1").style.fontSize = this.defaultFontSize + 'px';
      } else if (this.large_num == '2') {
        document.getElementById("detailTextArea2").style.fontSize = this.defaultFontSize + 'px';
      } else if (this.large_num == '3') {
        document.getElementById("detailTextArea3").style.fontSize = this.defaultFontSize + 'px';
      } else if (this.large_num == '4') {
        document.getElementById("detailTextArea4").style.fontSize = this.defaultFontSize + 'px';
      } else {
        document.getElementById("detailTextArea").style.fontSize = this.defaultFontSize + 'px';
      }
    },
    /* 저장을 하기위한 필수 항목 체크 */
    checkPrimary() {
      if (this.detail.rgs_dis_cd == "" || this.detail.rgs_dis_cd == "null") {            // 관리구분
        alert('관리구분이 없습니다.');
        return false;
      } else if (this.detail.prc_step_cd == "" || this.detail.prc_step_cd == "null") {   // 처리단계
        alert('처리단계가 없습니다.');
        return false;
      } else if (this.detail.req_dis_cd == "" || this.detail.req_dis_cd == "null") {     // 요청구분
        alert('요청구분이 없습니다.');
        return false;
      } else if (this.detail.rgs_dt == "" || this.detail.rgs_dt == "null") {                 // 요청일자
        this.$refs.rgs_dt.focus();
        alert('요청일자를 입력해주세요.');
        return false;
      } else if (this.detail.achi_nm == "" || this.detail.achi_nm == "null") {           // 요청자
        this.$refs.achi_nm.focus();
        alert('요청자를 입력해주세요.');
        return false;
      } else if (this.detail.titl_nm == "" || this.detail.titl_nm == "null") {           // 제목
        this.$refs.titl_nm.focus();
        alert('제목을 입력해주세요.');
        return false;
      } else if (this.detail.req_dis_txt == "" || this.detail.req_dis_txt == "null") {   // 요청내용
        this.$refs.req_dis_txt.focus();
        alert('요청내용을 입력해주세요.');
        return false;
      } else {
        return true;  // 필수 값 모두 입력 시 true
      }
    },
  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch: {
    count: (a, b) => {

    },
  },
// 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList: ["C27", "C0", "C12", "C13", "C14"],
      comboList2: ["C-41", "C-42", "C-43"],
      comboList3: ["C-44", "C-45"],
      // comboList2 : ["C4000_1","C4000_2","C4000_3"],
      // comboList3 : ["C4000_4","C4000_5"],

      large_num: '',

      info: {
        /* 필터 변수 */
        // 공통 sessionStorage 데이터
        login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),   // 권한ID
        login_bzcd: sessionStorage.getItem("LOGIN_BZCD"),       // 업무구분
        login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),   // 직원번호
        login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID

        bkup_id_selected: '0000000000',                                 // 백업ID
        prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트명
        rgs_dis_cd_selected: 'TTT',                                     // 선택 된 관리구분
        req_dis_cd_selected: 'TTT',                                     // 선택 된 요청구분
        prc_step_cd_selected: 'TTT',                                    // 선택 된 처리상태

        rgs_sta_dt: this.rgs_sta_dt,          // 요청시작일자
        rgs_end_dt: this.rgs_end_dt,          // 요청종료일자
        ttmn_sta_dt: this.ttmn_sta_dt,        // 조치시작일자
        ttmn_end_dt: this.ttmn_end_dt,        // 조치종료일자

        tgt_biz_nm: this.tgt_biz_nm,          // 조치업무명
        achi_nm: this.achi_nm,                // 요청자
        ttmn_crpe_nm: this.ttmn_crpe_nm,      // 조치담당자
        titl_nm: this.titl_nm,                // 제목
        req_dis_txt: this.req_dis_txt,        // 요청내용
        ttmn_txt: this.ttmn_txt,              // 조치내용
        slv_mpln_txt: this.slv_mpln_txt,      // 해결방안내용

        achi_no: this.achi_nm,                // 요청자
        ttmn_crpe_no: this.ttmn_crpe_nm,      // 조치담당자

        cmpl_yn: this.cmpl_yn,                // 완료/제외/해결/미발생해소 포함 여부
      },

      detail: {
        /* 상세내용 변수 */
        // 공통 sessionStorage 데이터
        login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),   // 권한ID
        login_bzcd: sessionStorage.getItem("LOGIN_BZCD"),       // 업무구분
        login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),   // 직원번호
        login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트ID

        mng_id: '',                                                  // (상세)관리ID
        rgs_dt: this.getToday(),                                     // (상세)요청일자
        achi_nm: sessionStorage.getItem("LOGIN_EMP_NM"),        // (상세)요청자
        ttmn_crpe_nm: this.ttmn_crpe_nm,                             // (상세)조치담당자
        tgt_biz_nm: this.tgt_biz_nm,                                 // (상세)조치업무명
        ttmn_scd_dt: '',                                             // (상세)조치예정일자
        ttmn_dt: '',                                                 // (상세)조치일자
        gd_txt: this.gd_txt,                                         // (상세)등급
        titl_nm: this.titl_nm,                                       // (상세)제목
        req_dis_txt: this.req_dis_txt,                               // (상세)요청내용
        ttmn_txt: this.ttmn_txt,                                     // (상세)조치내용
        slv_mpln_txt: this.slv_mpln_txt,                             // (상세)해결방안내용
        rmrk: this.rmrk,                                             // (상세)비고

        bkup_id_selected: '0000000000',          // 백업ID
        prjt_id_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트명
        rgs_dis_cd_selected: 'A',      // (상세)선택 된 관리구분
        req_dis_cd_selected: '100',      // (상세)선택 된 요청구분
        prc_step_cd_selected: '100',    // (상세)선택 된 처리상태
        urgn_cd_selected: '100',                // (상세)영향도
        ifnc_cd_selected: '100',                // (상세)긴급성

      },

      addRow: {
        grid: this.grid,
      },
      defaultFontSize: 20,
      count: 0,
      curRow: -1,
      title: "",
      scrollX: false,
      scrollY: false,
      bodyHeight: 190,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: false,
      open: false,
      dataSource: {
        api: {
          readData: {url: process.env.VUE_APP_API + '/PJTE4000/select', method: 'GET'},
        },
        initialRequest: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders: ['rowNum'],
      header: {
        height: 25
      },
      columns: [
        {
          header: '관리구분',
          width: 100,
          align: 'left',
          name: 'rgs_dis_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000012N
            }
          }
        },
        {
          header: '관리ID',
          width: 100,
          align: 'center',
          name: 'mng_id',
          sortable: true
        },
        {
          header: '제목',
          width: 250,
          align: 'left',
          name: 'titl_nm',
          ellipsis: true,
        },
        {
          header: '요청내용',
          width: 280,
          align: 'left',
          name: 'req_dis_txt',
          ellipsis: true,
        },
        {
          header: '요청구분',
          width: 110,
          align: 'center',
          name: 'req_dis_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000013N
            }
          }
        },
        {
          header: '요청일자',
          width: 110,
          align: 'center',
          name: 'rgs_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: '요청자',
          width: 110,
          align: 'left',
          name: 'achi_nm',
        },
        {
          header: '처리단계',
          width: 110,
          align: 'center',
          name: 'prc_step_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000014N
            }
          }
        },
        {
          header: '조치업무명',
          width: 120,
          align: 'left',
          name: 'tgt_biz_nm',
        },
        {
          header: '조치담당자',
          width: 110,
          align: 'center',
          name: 'ttmn_crpe_nm',
        },
        {
          header: '조치예정일자',
          width: 110,
          align: 'center',
          name: 'ttmn_scd_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: '조치일자',
          width: 110,
          align: 'center',
          name: 'ttmn_dt',
          format: 'yyyy-mm-dd',
        },
        {
          header: '조치내용',
          width: 230,
          align: 'left',
          name: 'ttmn_txt',
          ellipsis: true,
        },
        {
          header: '비고',
          width: 230,
          align: 'left',
          name: 'rmrk',
          ellipsis: true,
        },
        {
          header: '긴급성',
          width: 110,
          align: 'center',
          name: 'urgn_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000015N
            }
          }
        },
        {
          header: '영향도',
          width: 110,
          align: 'center',
          name: 'ifnc_cd',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: this.$store.state.pms.CD1000000016N
            }
          }
        },

        {
          header: '등급',
          width: 110,
          align: 'center',
          name: 'gd_txt',
        },
        {
          header: '해결방안내용',
          width: 230,
          align: 'left',
          name: 'slv_mpln_txt',
          ellipsis: true,
        },
      ]
    }
  },
};

</script>
<style>
</style>
