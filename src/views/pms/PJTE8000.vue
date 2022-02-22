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
                :comboArray = "this.comboList"
                @real_prjt_id_change="real_prjt_id_change"
                @week_sqn_cd_change="week_sqn_cd_change"
            >
            </combo>
            <li class="filter-item">
              <div class="item-con">주간년월
                  <input  type="month" style="width: 125px"  v-model="info.week_yymm">
              </div>
            </li>
            <li class="filter-item-n">
              <div class="input-searchWrap">PM명
                <input type="text"
                       placeholder="PM명"
                       v-model="info.pm_nm"
                       style   = "width: 90px"
                       @keyup.enter="open_pjte9001(1)"
                >
                <button class="search-btn"
                        @click="open_pjte9001(1)"
                ></button>
              </div>
            </li>
            <li class="filter-item">
              <input type="text"
                     placeholder="직원번호"
                     v-model="info.pm_no"
                     style="width: 70px; background-color: #f2f2f2;"
                     :disabled = true
              >
            </li>
            <combo
                :comboArray = "this.comboList1"
                @dept_cd_change="dept_cd_change"
            >
            </combo>
            <li class="filter-btn">
              <button class="btn btn-filter-e" @click="gridExcelExport"  style="margin-top: 5px">엑셀다운로드</button>
              <button class="btn btn-filter-p" style="margin-left: 20px;margin-top: 5px" @click="fnSearch" >조회</button>
            </li>
          </ul>
        </div>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box">
          <div class="div-header-b"><h2>주간보고 내역</h2>
          </div>
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
        </div>
        <div class="div0-d">
          <div class="div3-b">
            <div class="div-header-b"><h2>금주 주간보고 등록</h2>
              <ul class="filter-btn"><p>* : 필수입력 항목입니다.</p>
                <button class="btn btn-filter-b" style="margin-left: 20px" @click="fnClear">신규초기화</button>
                <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnSave">등록</button>
              </ul>
            </div>
            <div class="div2-body-c">
              <ul class="filter-con clear-fix-a">
                <combo
                    :comboArray="this.comboList2"
                    @real_prjt_id_change_iss="real_prjt_id_change_iss"
                    @dept_cd_change_iss="dept_cd_change_iss"
                    ref="combo2"
                >
                </combo>
                <li class="filter-item-a">
                  <div class="input-searchWrap" style = "margin-left : -8px">
                    <td class="td-box"> *PM명 </td>
                    <input type="text"
                           placeholder="PM명"
                           v-model="detail.pm_nm"
                           style   = "width: 80px"
                           @keyup.enter="open_pjte9001(2)"
                    >
                    <button class="search-btn"
                            @click="open_pjte9001(2)"
                    ></button>
                  </div>
                </li>
                <li style="float:left">
                  <input type="text"
                         placeholder="직원번호"
                         v-model="detail.pm_no"
                         style="width: 80px;height: 23px; margin-top: 2px ;  background-color: #f2f2f2;"
                         text-align= "center"
                         :disabled = true
                  >
                </li>
                <li class="filter-item-a" >
                  <div class="item-con">
                    <td class="td-box"> *주간년월 </td>
                    <input type="month" style="width: 125px;text-align: center"  v-model="detail.week_yymm">
                  </div>
                </li>
                <combo
                    :comboArray="this.comboList3"
                    @week_sqn_cd_change_iss="week_sqn_cd_change_iss"
                    ref="combo3"
                >
                </combo>
                <li class="filter-item-a">
                  <div class="item-con" style = "margin-left : -30px">
                    <td class="td-box" style="margin-left : 30px;width :280px"> &emsp;&emsp;전&emsp;&emsp;&emsp;체&emsp;&emsp;</td>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <td class="td-box"> *예정(진척율%) </td>
                    <input type="text"
                           placeholder="숫자만 입력 하세요"
                           ref="all_pred_prg"
                           v-model="detail.all_pred_prg"
                           style="width: 125px;text-align :right "
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <td class="td-box"> *전체(진척율%) </td>
                    <input type="text"
                           placeholder="숫자만 입력 하세요"
                           v-model="detail.all_real_prg"
                           ref="all_real_prg"
                           style="width: 125px;text-align :right "
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con" style = "margin-left : -8px">
                    <td class="td-box"> 단계 </td>
                    <input type="text"
                           placeholder="단계를 입력 하세요"
                           v-model="detail.step_nm"
                           style="width: 160px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <td class="td-box"> 예정진척율(%)</td>
                    <input type="text"
                           placeholder="숫자만 입력 하세요"
                           v-model="detail.step_pred_prg"
                           style="width: 125px;text-align :right "
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <td class="td-box"> 전체진척율(%)</td>
                    <input type="text"
                           placeholder="숫자만 입력 하세요"
                           v-model="detail.step_real_prg"
                           style="width: 125px;text-align :right "
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con" style = "margin-left : -9px">
                    <td class="td-box2">*프로젝트<br> 진행현황</td>
                    <td>
                      <textarea cols="140"
                                rows="5"
                                placeholder="진행현황을 입력해주세요"
                                ref="prg_txt"
                                v-model="detail.prg_txt"
                                id="modalTextArea0"
                                style="width: 685px; height:80px;"
                                @dblclick="modalView(1)"
                      ></textarea>
                    </td>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con" style = "margin-left : -9px">
                     <td class="td-box2">이슈내용</td>
                    <td>
                      <textarea cols="140"
                                rows="5"
                                placeholder="이슈내용을 입력해주세요"
                                v-model="detail.iss_txt"
                                style="width: 685px;height:80px;"
                                @dblclick="modalView(2)"
                      ></textarea>
                    </td>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con" style = "margin-left : -9px">
                      <td class="td-box2">요청내용</td>
                    <td>
                      <textarea cols="140"
                                rows="5"
                                placeholder="요청내용을 입력해주세요"
                                v-model="detail.req_txt"
                                style="width: 685px; height:80px;"
                                @dblclick="modalView(3)"
                      ></textarea>
                    </td>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con" style = "margin-left : -9px">
                      <td class="td-box" style ="margin-top: 2px;">첨부파일</td>
                      <td>
                        <input type="text" :disabled=true
                               v-model="detail.org_file_nm"
                               style="height: 22px;background-color: #f2f2f2;width: 590px;">
                      </td>
                      <td>
                        <button class="btn btn-filter-p" style = "margin-left : 15px;margin-bottom : 5px;" @click="open_file_page(1)">첨부</button>
                      </td>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="div1-d">
            <div class="div-header-b"><h2>지난주 주간보고</h2>
              <ul class="filter-btn">
                <button class="btn btn-filter-p" style="margin-left: 20px" @click="fnLastSerch">지난주 주간보고 조회</button>
              </ul>
            </div>
            <div class="div2-body-c">
              <ul class="filter-con clear-fix-a" style = "margin-top : 30px">
                <li class="filter-item-a">
                  <div class="input-searchWrap" style = "margin-left : -8px">
                    <td class="td-box"> PM명 </td>
                    <input type="text"
                           placeholder="PM명"
                           v-model="detail.bef_pm_nm"
                           style   = "width: 70px"
                           :disabled=true
                    >
                  </div>
                </li>
                <li style="float:left">
                  <input type="text"
                         placeholder="직원번호"
                         v-model="detail.bef_pm_no"
                         style="width: 90px;height: 23px; margin-top: 2px ; background-color: #f2f2f2;"
                         :disabled = true
                  >
                </li>
                <li class="filter-item-a" >
                  <div class="item-con">
                    <td class="td-box"> 주간년월 </td>
                    <input type="text"
                           v-model="detail.bef_week_yymm"
                           name="tgt_biz_nm"
                           :disabled=true
                           style="width: 125px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <td class="td-box">차수</td>
                    <input type="text"
                           v-model="detail.bef_week_sqn_nm"
                           name="tgt_biz_nm"
                           :disabled=true
                           style="width: 125px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con" style = "margin-left : -30px">
                    <td class="td-box" style="margin-left : 30px;width :280px"> &emsp;&emsp;전&emsp;&emsp;&emsp;체&emsp;&emsp;</td>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <td class="td-box"> 예정(진척율%) </td>
                    <input type="text"
                           v-model="detail.bef_all_pred_prg"
                           name="tgt_biz_nm"
                           :disabled=true
                           style="width: 125px;text-align :right "
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <td class="td-box"> 전체(진척율%) </td>
                    <input type="text"
                           v-model="detail.bef_all_real_prg"
                           :disabled=true
                           style="width: 125px;text-align :right "
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con" style = "margin-left : -8px">
                    <td class="td-box"> 단계 </td>
                    <input type="text"
                           v-model="detail.bef_step_nm"
                           name="tgt_biz_nm"
                           :disabled=true
                           style="width: 160px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <td class="td-box"> 예정진척율(%)</td>
                    <input type="text"
                           v-model="detail.bef_step_pred_prg"
                           name="tgt_biz_nm"
                           :disabled=true
                           style="width: 125px;text-align :right "
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <td class="td-box"> 전체진척율(%)</td>
                    <input type="text"
                           v-model="detail.bef_step_real_prg"
                           name="tgt_biz_nm"
                           :disabled=true
                           style="width: 125px;text-align :right "
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con" style = "margin-left : -9px">
                    <td class="td-box2">프로젝트<br> 진행현황</td>
                    <td>
                      <textarea cols="140"
                                rows="5"
                                v-model="detail.bef_prg_txt"
                                readonly="readonly"
                                style="width: 685px; height:80px;"
                                @dblclick="modalView(4)"
                      ></textarea>
                    </td>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con" style = "margin-left : -9px">
                    <td class="td-box2">이슈내용</td>
                    <td>
                      <textarea cols="140"
                                rows="5"
                                v-model="detail.bef_iss_txt"
                                readonly="readonly"
                                style="width: 685px;height:80px;"
                                @dblclick="modalView(5)"
                      ></textarea>
                    </td>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con" style = "margin-left : -9px">
                    <td class="td-box2">요청내용</td>
                    <td>
                      <textarea v-model="detail.bef_req_txt"
                                readonly="readonly"
                                style="width: 685px; height:80px;"
                                @dblclick="modalView(6)"
                      ></textarea>
                    </td>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con" style = "margin-left : -9px">
                    <td class="td-box" style ="margin-top: 1px;">첨부파일</td>
                    <td>
                      <input type="text" :disabled=true v-model="detail.bef_org_file_nm" style="height: 22px;background-color: #f2f2f2;width: 590px;">
                    </td>
                    <td>
                      <button class="btn btn-filter-p" style = "margin-left : 15px;margin-bottom : 5px;" @click="open_file_page(2)">첨부</button>
                    </td>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
        <Modal :show.sync="detail.modals.txt_modal1">
          <div class="div-header-b">
            <h2 v-if="this.large_num == '1'">금주 프로젝트 진행현황 확대보기</h2>
            <h2 v-if="this.large_num == '2'">금주 이슈내용 확대보기</h2>
            <h2 v-if="this.large_num == '3'">금주 요청내용 확대보기</h2>
            <h2 v-if="this.large_num == '4'">지난주 프로젝트 진행현황 확대보기</h2>
            <h2 v-if="this.large_num == '5'">지난주 이슈내용 확대보기</h2>
            <h2 v-if="this.large_num == '6'">지난주 요청내용 확대보기</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-b" @click="textSizeUP">+ 확대</button>
              <button class="btn btn-filter-b" @click="textSizeDown">- 축소</button>
            </ul>
          </div>
          <tr>
            <textarea v-if="this.large_num == '1'"
                      cols="200"
                      rows="105"
                      id="detailTextArea1"
                      v-model="detail.prg_txt"
                      :disabled=true
                      style="height: 425px; width: 465px; background-color: #f2f2f2; border: none; line-height: normal"
            ></textarea>
            <textarea v-if="this.large_num == '2'"
                      cols="200"
                      rows="105"
                      id="detailTextArea2"
                      v-model="detail.iss_txt"
                      :disabled=true
                      style="height: 425px; width: 465px; background-color: #f2f2f2; border: none; line-height: normal"
            ></textarea>
            <textarea v-if="this.large_num == '3'"
                      cols="200"
                      rows="105"
                      id="detailTextArea3"
                      v-model="detail.req_txt"
                      :disabled=true
                      style="height: 425px; width: 465px; background-color: #f2f2f2; border: none; line-height: normal"
            ></textarea>
            <textarea v-if="this.large_num == '4'"
                      cols="200"
                      rows="105"
                      id="detailTextArea4"
                      v-model="detail.bef_prg_txt"
                      :disabled=true
                      style="height: 425px; width: 465px; background-color: #f2f2f2; border: none; line-height: normal"
            ></textarea>
            <textarea v-if="this.large_num == '5'"
                      cols="200"
                      rows="105"
                      id="detailTextArea5"
                      v-model="detail.bef_iss_txt"
                      :disabled=true
                      style="height: 425px; width: 465px; background-color: #f2f2f2; border: none; line-height: normal"
            ></textarea>
            <textarea v-if="this.large_num == '6'"
                      cols="200"
                      rows="105"
                      id="detailTextArea6"
                      v-model="detail.bef_req_txt"
                      :disabled=true
                      style="height: 425px; width: 465px; background-color: #f2f2f2; border: none; line-height: normal"
            ></textarea>
            <div style="float: right;margin-top: 5px">
              <button class="btn btn-filter-b" @click="fnCloseModal">닫기</button>
            </div>
          </tr>
<!--          <tr>
            <div style="float: right">
              <button class="btn btn-filter-p" id="fnEdit" style="margin-right: 5px" @click="fnEdit">수정</button>
              <button class="btn btn-filter-b" @click="fnCloseModal">닫기</button>
            </div>
          </tr>-->
        </Modal>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import {Grid} from '@toast-ui/vue-grid';
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
import axios from "axios";
import Combo from "@/components/Combo";
import Modal from "@/components/Modal";
import {axiosService} from "@/api/http";
import PmsSideBar from  "@/components/PmsSideBar";
import WindowPopup from "@/views/pms/PJTE3001";

const storage = window.sessionStorage;

// 첨부파일 팝업에서 받은 값
window.fileData = (fileLists, num) => {
  window.pms_register.file_name_list = fileLists;
  window.pms_register.atfl_num = num
}
// 직원조회 팝업에서 받은 값
window.empData = (empnm ,empno, btn_id) => {
  window.pms_register.emp_nm = empnm;
  window.pms_register.emp_no = empno;
  window.pms_register.emp_btn_id = btn_id;
}

export default {
// 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    PmsSideBar,
    WindowPopup,
    Modal,
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
    window.pms_register = this;
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
    //조회조건 차수, 프로젝트명
    week_sqn_cd_change(params)         {this.info.week_sqn_cd_selected = params},
    real_prjt_id_change(params)        {this.info.real_prjt_id_selected = params},
    dept_cd_change(params)             {this.info.dept_cd_selected = params},
    // 금주주간보고 등록 차수,프로젝트명
    real_prjt_id_change_iss(params)    {this.detail.real_prjt_id_selected = params},
    week_sqn_cd_change_iss(params)     {this.detail.week_sqn_cd_selected = params},
    dept_cd_change_iss(params)         {this.detail.dept_cd_selected = params},

    init() {
      // 특정 열 비활성화 , applyTheme메서드를 이용하여 쉽게 Grid의 전체 스타일을 바꿈
      this.$refs.grid.invoke("disable");
      this.$refs.grid.invoke("applyTheme", 'striped' ,{cell: {disabled: {text: '#000000'}}});
      // 그리드 초기화
      this.$refs.grid.invoke("clear");
    },

    //등록,업데이트
    fnSave() {
      //백업ID가 현재 일 때만 저장
      if (this.detail.bkup_id_selected == '0000000000') {
        //필수항목 확인
        if (this.checkPrimary() == true) {
          //확인창
          if (confirm("정말 등록하시겠습니까??") == true) {
              debugger
              axiosService.post("/PJTE8000/insert",
                  {
                    prjt_id: sessionStorage.getItem('LOGIN_PROJ_ID'),        // (상세)프로젝트아이디
                    real_prjt_id: this.detail.real_prjt_id_selected,                       // (상세)제목
                    week_yymm: this.detail.week_yymm,               // (상세)요청내용
                    week_sqn_cd: this.detail.week_sqn_cd_selected,        // (상세)요청구분
                    dept_cd: this.detail.dept_cd_selected,
                    pm_no: this.detail.pm_no,                           // (상세)요청일자
                    all_real_prg: this.detail.all_real_prg,                       // (상세)요청자
                    all_pred_prg: this.detail.all_pred_prg,      // (상세)처리단계
                    step_nm: this.detail.step_nm,                 // (상세)조치업무명
                    step_real_prg: this.detail.step_real_prg,             // (상세)조치담당자
                    step_pred_prg: this.detail.step_pred_prg,                 // (상세)조치예정일자
                    prg_txt: this.detail.prg_txt,                         // (상세)조치일자
                    iss_txt: this.detail.iss_txt,                     // (상세)조치내용
                    req_txt: this.detail.req_txt,             // (상세)해결방안내용
                    atfl_mng_id: this.detail.atfl_mng_id,                // (상세)영향도
                    opr_no: this.detail.login_emp_no,                // (상세)Session 직원 번호
                  }
              )
                  .then(res => {
                    if (res.status == 200) {
                      alert("등록 완료되었습니다.");
                      //insert 후 재조회
                      this.$refs.grid.invoke("reloadData");
                    }
                  }).catch(e => {
                alert("등록 실패하였습니다.");
              })

          } else {   //취소
            return;
          }
        }
      } else {
        alert('백업정보는 저장할 수 없습니다.');
      }
    },
// 지난 주간보고조회
    fnLastSerch() {
      let week_yymm = this.detail.week_yymm.replace("-","")
      let week_sqn_cd_selected = this.detail.week_sqn_cd_selected
      let real_prjt_id_selected = this.detail.real_prjt_id_selected
      let dept_cd_selected = this.detail.dept_cd_selected

      if ((week_sqn_cd_selected != null && week_sqn_cd_selected != '') && (real_prjt_id_selected != null && real_prjt_id_selected != '') && (dept_cd_selected != null && dept_cd_selected != '')) {
        axiosService.get("/PJTE8000/select02", {
          params: {
            week_yymm,
            week_sqn_cd_selected,
            real_prjt_id_selected,
            dept_cd_selected,
          }
        })
            .then(res => {
              let res_data = res.data.data.contents;
              console.log(res_data);
              if (res_data.length == 1) {  // 입력한 직원명으로 조회한 값이 단건일 경우 : 직원번호 바인딩

                this.detail.bef_pm_nm = res.data.data.contents[0].bef_pm_nm
                this.detail.bef_pm_no = res.data.data.contents[0].bef_pm_no
                this.detail.bef_week_sqn_nm = res.data.data.contents[0].bef_week_sqn_nm
                this.detail.bef_week_yymm = this.getYyyymm(res.data.data.contents[0].bef_week_yymm)
                this.detail.bef_dept_cd = res.data.data.contents[0].bef_dept_cd
                this.detail.bef_all_pred_prg = res.data.data.contents[0].bef_all_pred_prg
                this.detail.bef_all_real_prg = res.data.data.contents[0].bef_all_real_prg
                this.detail.bef_step_nm = res.data.data.contents[0].bef_step_nm
                this.detail.bef_step_pred_prg = res.data.data.contents[0].bef_step_pred_prg
                this.detail.bef_step_real_prg = res.data.data.contents[0].bef_step_real_prg
                this.detail.bef_prg_txt = res.data.data.contents[0].bef_prg_txt
                this.detail.bef_iss_txt = res.data.data.contents[0].bef_iss_txt
                this.detail.bef_req_txt = res.data.data.contents[0].bef_req_txt
                this.detail.bef_atfl_mng_id = res.data.data.contents[0].bef_atfl_mng_id


              }else if(res_data.length == 0){ //다건이 조회되었을대 경고알림.
                alert("지난주 주간보고가 없습니다.");
                //지난주 주간보고 초기화
                this.detail.bef_pm_nm = ''                                                                            // (상세)pm명
                this.detail.bef_pm_no = ''                                                                            // (상세)pmno
                this.detail.bef_week_sqn_nm = ''                                                                      // (상세)pm명
                this.detail.bef_week_yymm = ''                                                                        // (상세)pmno
                this.detail.bef_all_pred_prg = ''                                                                     // (상세)예상진척율
                this.detail.bef_all_real_prg = ''                                                                     // (상세)실제진척율
                this.detail.bef_step_nm = ''                                                                          // (상세)단계 명
                this.detail.bef_step_pred_prg = ''                                                                    // (상세)단계 예정 진척율
                this.detail.bef_step_real_prg = ''                                                                    // (상세)단계 전체 진척율
                this.detail.bef_prg_txt = ''                                                                          // (상세)프로젝트내용
                this.detail.bef_iss_txt = ''                                                                          // (상세)이슈내용
                this.detail.bef_req_txt = ''                                                                          // (상세)요청내용
                this.detail.bef_req_dis_txt = ''                                                                      // (상세)첨부파일
              } else { //다건이 조회되었을대 경고알림.
                alert("eroor: 다건이 조회되었습니다.");
              }
            })
      } else {
        alert("금주 주간보고에서 프로젝트명, 부문명, 차수를 입력해주세요.");
        }
    },
    // 첨부파일등록 팝업 오픈
    open_file_page(num){
      // console.log(num)
      let file_rgs_dscd = ''
      let atfl_mng_id = ''
      if(num == 1) {
        file_rgs_dscd='900'
        atfl_mng_id = this.detail.atfl_mng_id
      } else if(num = 2){
        file_rgs_dscd='900'
        atfl_mng_id = this.detail.bef_atfl_mng_id
      }
      let bkup_id='0000000000', prjt_id= sessionStorage.getItem("LOGIN_PROJ_ID")
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}&num=${num}`, "open_file_page", "width=1000, height=800");
    },

    // 직원조회 팝업 (검색 필터)
    open_pjte9001(btn_id) {
      let empnm = ''
      let prjt_id_selected = this.info.prjt_nm_selected
      let bkup_id_selected = this.info.bkup_id_selected
      if (btn_id == '1') {
        empnm = this.info.pm_nm
      } else if (btn_id == '2') {
        empnm = this.detail.pm_nm
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
                  this.info.pm_no = res.data.data.contents[0].empno
                  this.info.pm_nm = res.data.data.contents[0].empnm
                } else if (btn_id == '2') {
                  this.detail.pm_no = res.data.data.contents[0].empno
                  this.detail.pm_nm = res.data.data.contents[0].empnm
                }
              } else { // 입력한 직원명으로 조회한 값이 여러건일 경우 : PJTE9001 팝업 호출 후 파라미터 값으로 조회
                let bkup_id = this.info.bkup_id_selected, prjt_id = sessionStorage.getItem('LOGIN_PROJ_ID')
                window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
              }
            })
      } else { // 직원명에 입력한 값이 없을 때 : PJTE9001 팝업 호출
        let bkup_id = this.info.bkup_id_selected, prjt_id = sessionStorage.getItem('LOGIN_PROJ_ID')
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      }
    },
    //초기화 클릭했을때
    fnClear() {
      this.detail.real_prjt_id_selected = this.$refs.combo2.$data.CD1000000038N[0].value                    // (상세)프로젝트
      this.$refs.combo2.$data.real_prjt_id_selected_iss = this.$refs.combo2.$data.CD1000000038N[0].value
      this.detail.dept_cd_selected = this.$refs.combo2.$data.CD1000000040N[0].value                         // (상세) 부문명
      this.$refs.combo2.$data.dept_cd_selected_iss = this.$refs.combo2.$data.CD1000000040N[0].value
      this.detail.pm_nm = ''                                                                                // (상세)pm명
      this.detail.pm_no = ''                                                                                // (상세)pmno
      this.detail.week_yymm = this.getToday()                                                               // (상세)주간년월
      this.detail.week_sqn_cd_selected = this.$refs.combo3.$data.CD1000000039N[0].value                     // (상세)차수
      this.$refs.combo3.$data.week_sqn_cd_selected_iss = this.$refs.combo3.$data.CD1000000039N[0].value
      this.detail.all_pred_prg = '0'                                                                         // (상세)예상진척율
      this.detail.all_real_prg = '0'                                                                         // (상세)실제진척율
      this.detail.step_nm = ''                                                                              // (상세)단계 명
      this.detail.step_pred_prg = '0'                                                                        // (상세)단계 예정 진척율
      this.detail.step_real_prg = '0'                                                                        // (상세)단계 전체 진척율
      this.detail.prg_txt = ''                                                                              // (상세)프로젝트내용
      this.detail.iss_txt = ''                                                                              // (상세)이슈내용
      this.detail.req_txt = ''                                                                              // (상세)요청내용
      this.detail.org_file_nm = ''                                                                      // (상세)첨부파일
      this.detail.atfl_mng_id = ''                                                                      // (상세)첨부파일
      //지난주 주간보고 초기화
      this.detail.bef_pm_nm = ''                                                                            // (상세)pm명
      this.detail.bef_pm_no = ''                                                                            // (상세)pmno
      this.detail.bef_week_sqn_nm = ''                                                                      // (상세)pm명
      this.detail.bef_week_yymm = ''                                                                        // (상세)pmno
      this.detail.bef_all_pred_prg = ''                                                                     // (상세)예상진척율
      this.detail.bef_all_real_prg = ''                                                                     // (상세)실제진척율
      this.detail.bef_step_nm = ''                                                                          // (상세)단계 명
      this.detail.bef_step_pred_prg = ''                                                                    // (상세)단계 예정 진척율
      this.detail.bef_step_real_prg = ''                                                                    // (상세)단계 전체 진척율
      this.detail.bef_prg_txt = ''                                                                          // (상세)프로젝트내용
      this.detail.bef_iss_txt = ''                                                                          // (상세)이슈내용
      this.detail.bef_req_txt = ''                                                                          // (상세)요청내용
      this.detail.bef_org_file_nm = ''                                                                      // (상세)첨부파일
      this.detail.bef_atfl_mng_id = ''                                                                      // (상세)첨부파일
    },
    //셀 row 클릭시 주간보고,지난주 주간보고에 바인딩
    onClick(ev) {
      this.curRow = ev.rowKey;
      const currentRowData = (this.$refs.grid.invoke("getRow", this.curRow));
      if (currentRowData != null) {
        this.cellDataBind(currentRowData) // currentRowData가 있을 때 Row 클릭 시 상세내용에 Bind
      }
    },
    /* 그리드 Row onClick클릭 시 상세내용에 Bind */
    cellDataBind(currentRowData) {
      this.detail.real_prjt_id_selected = currentRowData.real_prjt_id;                  // (상세)프로젝트
      this.$refs.combo2.$data.real_prjt_id_selected_iss = currentRowData.real_prjt_id;  //(상세)프로젝트
      this.detail.dept_cd_selected = currentRowData.dept_cd;                            // (상세)부문명
      this.$refs.combo2.$data.dept_cd_selected_iss = currentRowData.dept_cd;            // 부문명
      this.detail.pm_nm = currentRowData.pm_nm;                                         // (상세)pm명
      this.detail.pm_no = currentRowData.pm_no;                                         // (상세)pm번호
      this.detail.week_yymm = this.getYyyymm(currentRowData.week_yymm);                 // (상세)주간년월
      this.detail.week_sqn_cd_selected = currentRowData.week_sqn_cd;                    // (상세)차수
      this.$refs.combo3.$data.week_sqn_cd_selected_iss = currentRowData.week_sqn_cd;    // 차수
      this.detail.all_pred_prg = currentRowData.all_pred_prg;                           // (상세)전체 예정진척율
      this.detail.all_real_prg = currentRowData.all_real_prg;                           // (상세)전체 실제진척율
      this.detail.step_nm = currentRowData.step_nm;                                     // (상세)단계명
      this.detail.step_pred_prg = currentRowData.step_pred_prg;                         // (상세)단계 예정진척율
      this.detail.step_real_prg = currentRowData.step_real_prg;                         // (상세)단계 전체진척율
      this.detail.prg_txt = currentRowData.prg_txt;                                     // (상세)프로젝트진행현황
      this.detail.iss_txt = currentRowData.iss_txt;                                     // (상세)이슈내용
      this.detail.req_txt = currentRowData.req_txt;                                     // (상세)요청내용
      this.detail.bkup_id_selected = currentRowData.bkup_id;                            // (상세)백업id
      this.detail.org_file_nm = currentRowData.org_file_nm;                             // (상세)첨부파일명
      this.detail.atfl_mng_id = currentRowData.atfl_mng_id;                             // (상세)첨부파일id
      //지난주 주간보고
      this.detail.bef_week_sqn_nm = currentRowData.bef_week_sqn_nm;                      // (지난주 상세)차수명
      this.detail.bef_week_yymm = this.getYyyymm(currentRowData.bef_week_yymm);          // (지난주 상세)주간년월
      this.detail.bef_pm_no = currentRowData.bef_pm_no;                                  // (지난주 상세)pm번호
      this.detail.bef_pm_nm = currentRowData.bef_pm_nm;                                  // (지난주 상세)pm명
      this.detail.bef_all_pred_prg = currentRowData.bef_all_pred_prg;                    // (지난주 상세)전체예상진척율
      this.detail.bef_all_real_prg = currentRowData.bef_all_real_prg;                    // (지난주 상세)전체실제진척율
      this.detail.bef_step_nm = currentRowData.bef_step_nm;                              // (지난주 상세)단계명
      this.detail.bef_step_pred_prg = currentRowData.bef_step_pred_prg;                  // (지난주 상세)단계예상진척율
      this.detail.bef_step_real_prg = currentRowData.bef_step_real_prg;                  // (지난주 상세)단계실제진척율
      this.detail.bef_prg_txt = currentRowData.bef_prg_txt;                              // (지난주 상세)프로젝트진행현황
      this.detail.bef_iss_txt = currentRowData.bef_iss_txt;                              // (지난주 상세)이슈내용
      this.detail.bef_req_txt = currentRowData.bef_req_txt;                              // (지난주 상세)요청내용
      this.detail.bef_org_file_nm = currentRowData.bef_org_file_nm;                             // (상세)첨부파일명
      this.detail.bef_atfl_mng_id = currentRowData.bef_atfl_mng_id;                             // (상세)첨부파일id
    },

    /* 조회 */
    fnSearch() {
      // 조회 서비스
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    gridExcelExport() {
      this.$refs.grid.invoke("export", "xlsx", {fileName: "엑셀다운로드"});
    },
    gridExcelImport() {

    },
    /* YYYY-MM-DD형태의 오늘 날짜를 구하는 함수*/
    getToday() {
      var date = new Date();
      var year = date.getFullYear();
      var month = ("0" + (1 + date.getMonth())).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);

      return year + '-' + month;
    },
    // YYYY-MM 으로 형식 변환
    getYyyymm(data) {
      let yyyymm;
      if(data != null && data !=''){
        yyyymm=   data.substring(0,4).concat('-',data.substring(4,6));
      }else{
        return '';
      }
      return yyyymm;
    },

    fnCloseModal(){  // 모달창 닫기
      this.detail.modals.txt_modal1 = false;
    },

    //더블클릭시 레이어 띄우기위해
    modalView(num){
      //true일때 레이어 오픈
      this.detail.modals.txt_modal1 = true;

      if (num == 1) {
        this.large_num = '1'
      } else if (num == 2) {
        this.large_num = '2'
      } else if (num == 3) {
        this.large_num = '3'
      } else if (num == 4) {
        this.large_num = '4'
      }else if (num == 5) {
        this.large_num = '5'
      }else if (num == 6) {
        this.large_num = '6'
      }
    },
    //상세내용 확대보기  (+확대버튼)
    textSizeUP() {
      this.defaultFontSize++;
      if(this.large_num == '1'){
        document.getElementById("detailTextArea1").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '2') {
        document.getElementById("detailTextArea2").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '3') {
        document.getElementById("detailTextArea3").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '4') {
        document.getElementById("detailTextArea4").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '5') {
        document.getElementById("detailTextArea5").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '6') {
        document.getElementById("detailTextArea6").style.fontSize = this.defaultFontSize + 'px';
      }
    },

    //상세내용 확대보기  (-축소버튼)
    textSizeDown() {
      this.defaultFontSize--;
      if(this.large_num == '1'){
        document.getElementById("detailTextArea1").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '2') {
        document.getElementById("detailTextArea2").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '3') {
        document.getElementById("detailTextArea3").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '4') {
        document.getElementById("detailTextArea4").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '5') {
        document.getElementById("detailTextArea5").style.fontSize = this.defaultFontSize + 'px';
      } else if(this.large_num == '6') {
        document.getElementById("detailTextArea6").style.fontSize = this.defaultFontSize + 'px';
      }
    },

    /* 저장을 하기위한 필수 항목 체크 */
    checkPrimary() {
      if (this.detail.real_prjt_id_selected == "" || this.detail.real_prjt_id_selected == "null") {
        alert('프로젝트가 없습니다.');
        return false;
      } else if (this.detail.dept_cd_selected == "" || this.detail.dept_cd_selected == "null") {
        alert('부문명이 없습니다.');
        return false;
      } else if (this.detail.pm_nm == "" || this.detail.pm_nm == "null") {
        alert('PM명이 없습니다.');
        return false;
      } else if (this.detail.week_sqn_cd_selected == "" || this.detail.week_sqn_cd_selected == "null") {
        alert('PM명이 없습니다.');
        return false;
      }  else if (this.detail.all_real_prg == "" || this.detail.all_real_prg == "null") {
        this.$refs.all_real_prg.focus();
        alert('[전체] 실제진척율을 입력해주세요.');
        return false;
      }  else if (this.detail.all_pred_prg == "" || this.detail.all_pred_prg == "null") {
        this.$refs.all_pred_prg.focus();
        alert('[전체] 예정진척율을 입력해주세요.');
        return false;
      }else if (this.detail.prg_txt == "" || this.detail.prg_txt == "null") {
        this.$refs.prg_txt.focus();
        alert('프로젝트 진행현황을 입력해주세요.');
        return false;
      }else {
        return true;  // 필수 값 모두 입력 시 true
      }
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
    emp_btn_id() {
      if(this.emp_btn_id == '1'){       // info
        this.info.pm_no = this.emp_no
        this.info.pm_nm = this.emp_nm
      }else if(this.emp_btn_id == '2'){ // detail
        this.detail.pm_no = this.emp_no
        this.detail.pm_nm = this.emp_nm
      }
    },
    file_name_list() {
      if(this.atfl_num == '1'){
        this.detail.org_file_nm = this.file_name_list[0].org_file_nm
        this.detail.atfl_mng_id = this.file_name_list[1].atfl_mng_id
      }else if(this.atfl_num == '2'){
        this.detail.bef_org_file_nm = this.file_name_list[0].org_file_nm
        this.detail.bef_atfl_mng_id = this.file_name_list[1].atfl_mng_id
      }

    },
  },
// 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C38","C39"],
      comboList1 : ["C40"],
      comboList2 : ["C-38","C-40"],
      comboList3: ["C-39"],

      large_num : '',
      /*직원조회 팝업 변수*/
      emp_btn_id : '',  // 직원조회팝업 버튼ID
      emp_nm : '',      // 직원조회팝업 직원명
      emp_no : '',      // 직원조회팝업 직원번호
      file_name_list : [],
      atfl_num : '',

      info: {
        /* 필터 변수 */
        // 공통 sessionStorage 데이터
        login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),   // 권한ID
        login_bzcd: sessionStorage.getItem("LOGIN_BZCD"),     // 업무구분
        login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),   // 직원번호
        login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트ID

        bkup_id_selected      : '0000000000',              // 백업ID
        prjt_nm_selected      : sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트명

        //신규
        week_yymm : this.getToday(),                      // 주간년월
        pm_no              : this.pm_no,                  // 개발자번호
        pm_nm              : this.pm_nm,                  // 개발자명
        real_prjt_id_selected : 'TTT',                    // 프로젝트콤보
        week_sqn_cd_selected  : 'TTT',                    // 차수콤보
        dept_cd_selected      : 'TTT',                    // 부문명

      },

      detail: {
        /* 상세내용 변수 */
        // 공통 sessionStorage 데이터
        login_aut_cd: sessionStorage.getItem("LOGIN_AUT_CD"),   // 권한ID
        login_bzcd: sessionStorage.getItem("LOGIN_BZCD"),     // 업무구분
        login_emp_no: sessionStorage.getItem("LOGIN_EMP_NO"),   // 직원번호
        login_proj_id: sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트ID

        /*주간보고*/
        real_prjt_id_selected : '',     // 프로젝트
        week_sqn_cd_selected  : '',     // 주간년월 차수
        dept_cd_selected      : '',     // 부문명
        week_yymm             :  this.getToday(),     // 주간년월
        pm_no                 : '',     // pm번호
        pm_nm                 : '',     // pm명
        all_pred_prg          : '0',     // 전체예상진척율
        all_real_prg          : '0',     // 전체실제진척율
        step_nm               : '',     // 단계명
        step_pred_prg         : '0',     // 단계예상진척율
        step_real_prg         : '0',     // 단계실제진척율
        prg_txt               : '',     // 프로젝트진행현황
        iss_txt               : '',     // 이슈내용
        req_txt               : '',     // 요청내용
        org_file_nm           : '',     // (상세)첨부파일
        atfl_mng_id           : '',     // (상세)첨부파일
        //지난주
        bef_week_sqn_nm            : '',     // 주간년월 차수
        bef_week_yymm             : '',     // 주간년월
        bef_pm_no                 : '',     // pm번호
        bef_pm_nm                 : '',     // pm명
        bef_all_pred_prg          : '',     // 전체예상진척율
        bef_all_real_prg          : '',     // 전체실제진척율
        bef_step_nm               : '',     // 단계명
        bef_step_pred_prg         : '',     // 단계예상진척율
        bef_step_real_prg         : '',     // 단계실제진척율
        bef_prg_txt               : '',     // 프로젝트진행현황
        bef_iss_txt               : '',     // 이슈내용
        bef_req_txt               : '',     // 요청내용
        bef_org_file_nm           : '',     // (상세)첨부파일
        bef_atfl_mng_id           : '',     // (상세)첨부파일
        /**/
        bkup_id_selected: '0000000000',          // 백업ID
        prjt_id_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트명

        /* 그리드 상세보기 모달 속성 */
        modals: {
          txt_modal1: false,
        },
        modalTxt1:this.modalTxt,//금주주간보고
        modalTxt2:this.modalTxt2,//지난주주간보고

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
      bodyHeight: 210,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: true,
      open: false,
      menu_list: [
        {
          id: 'PJTE9000',
          path: '/PJTE9000',
          name: '시스템관리'
        },
        {
          id: 'PJTE8000',
          path: '/PJTE8000',
          name: '주간보고'
        },
      ],
      dataSource: {
        api: {
          readData: { url: process.env.VUE_APP_API + '/PJTE8000/select01', method: 'GET' },
        },
        initialRequest: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders: ['rowNum'],
      header: {
        height: 70,
        complexColumns: [
          {header: 'PM',               name: 'mergeColumn1', childNames: ['pm_nm', 'pm_no']},
          {header: '전체',              name: 'mergeColumn2', childNames: ['all_pred_prg', 'all_real_prg']},
          {header: '단계',              name: 'mergeColumn3', childNames: ['step_nm', 'step_pred_prg', 'step_real_prg'], headerAlign:'center'},
          {header: 'WBS',               name:'mergeColumn4', childNames: ['mergeColumn2', 'mergeColumn3']},
        ]
      },
      columns: [
        {
          header  : '프로젝트 ID',
          width   : 0,
          align   : 'left',
          name    : 'real_prjt_id',
          hidden  : true,
        },
        {
          header: '백업id',
          width: 0,
          align: 'left',
          name: 'bkup_id',
          hidden : true,
        },
        {
          header: '프로젝트',
          width: 400,
          align: 'left',
          name: 'real_prjt_nm',
        },
        {
          header: '이름',
          width: 60,
          align: 'center',
          name: 'pm_nm',
        },
        {
          header: '사원번호',
          width: 90,
          align: 'center',
          name: 'pm_no',
          ellipsis: true,
        },
        {
          header: '주간년월',
          width: 80,
          align: 'center',
          name: 'week_yymm',
          formatter({value}){
            return `${value}`.substring(0,4).concat('-',`${value}`.substring(4,6));
          }
        },
        {
          header: '차수 CD',
          width: 110,
          align: 'left',
          name: 'week_sqn_cd',
          hidden : true,
        },
        {
          header: '차수',
          width: 40,
          align: 'left',
          name: 'week_sqn_nm',
        },
        {
          header: '예정',
          width: 40,
          align: 'right',
          name: 'all_pred_prg',
        },
        {
          header: '실제',
          width: 40,
          align: 'right',
          name: 'all_real_prg',
        },
        {
          header: '단계',
          width: 80,
          align: 'left',
          name: 'step_nm',
        },
        {
          header: '예정',
          width: 40,
          align: 'right',
          name: 'step_pred_prg',
        },
        {
          header: '실제',
          width: 40,
          align: 'right',
          name: 'step_real_prg',
        },
        {
          header: '프로젝트진행현황',
          width: 300,
          align: 'left',
          name: 'prg_txt',
          ellipsis: true,
        },
        {
          header: '이슈내용',
          width: 240,
          align: 'left',
          name: 'iss_txt',
          ellipsis: true,
        },
        {
          header: '요청내용',
          width: 230,
          align: 'left',
          name: 'req_txt',
          ellipsis: true,
        },
        {
          header: '첨부파일',
          width: 230,
          align: 'left',
          name: 'org_file_nm',
          hidden : true,
        },
        {
          header: '첨부파일id',
          width: 230,
          align: 'left',
          name: 'atfl_mng_id',
          hidden : true,
        },
        {
          header: '지난주pm명',
          width: 100,
          align: 'left',
          name: 'bef_pm_nm',
          hidden : true,
        },
        {
          header: '지난주사원번호',
          width: 120,
          align: 'center',
          name: 'bef_pm_no',
          hidden : true,
        },
        {
          header: '지난주간년월',
          width: 120,
          align: 'center',
          name: 'bef_week_yymm',
          format: 'yyyy-mm',
          hidden : true,
        },
        {
          header: '지난차수 CD',
          width: 110,
          align: 'left',
          name: 'bef_week_sqn_cd',
          hidden : true,
        },
        {
          header: '지난차수',
          width: 40,
          align: 'left',
          name: 'bef_week_sqn_nm',
          hidden : true,
        },
        {
          header: '지난예정',
          width: 60,
          align: 'center',
          name: 'bef_all_pred_prg',
          hidden : true,
        },
        {
          header: '지난실제',
          width: 60,
          align: 'center',
          name: 'bef_all_real_prg',
          hidden : true,
        },
        {
          header: '지난단계',
          width: 60,
          align: 'center',
          name: 'bef_step_nm',
          hidden : true,
        },
        {
          header: '지난예정',
          width: 60,
          align: 'center',
          name: 'bef_step_pred_prg',
          hidden : true,
        },
        {
          header: '지난실제',
          width: 60,
          align: 'center',
          name: 'bef_step_real_prg',
          hidden : true,
        },
        {
          header: '지난프로젝트진행현황',
          width: 230,
          align: 'left',
          name: 'bef_prg_txt',
          ellipsis: true,
          hidden : true,
        },
        {
          header: '지난이슈내용',
          width: 230,
          align: 'left',
          name: 'bef_iss_txt',
          ellipsis: true,
          hidden : true,
        },
        {
          header: '지난요청내용',
          width: 230,
          align: 'left',
          name: 'bef_req_txt',
          ellipsis: true,
          hidden : true,
        },
        {
          header: '지난첨부파일',
          width: 230,
          align: 'left',
          name: 'bef_org_file_nm',
          hidden : true,
        },
        {
          header: '지난첨부파일id',
          width: 230,
          align: 'left',
          name: 'bef_atfl_mng_id',
          hidden : true,
        },
      ]
    }
  },
};

</script>
<style>
</style>
