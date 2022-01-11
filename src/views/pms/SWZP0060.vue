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
              <button class="menu-group" type="button" data-toggle="collapse" data-target="#collapseOne"
                      aria-expanded="true" aria-controls="collapseOne">
                PMS
              </button>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
              <ul class="card-body">
                <li><a href="/SWZP0014">{{ menu_list[0].name }}</a></li>
                <li><a href="/SWZP0010">{{ menu_list[1].name }}</a></li>
                <li><a href="/SWZP0030">{{ menu_list[2].name }}</a></li>
                <li><a href="/SWZP0040">{{ menu_list[3].name }}</a></li>
                <li><a href="/SWZP0050">{{ menu_list[4].name }}</a></li>
                <li class="active"><a href="/SWZP0060">{{ menu_list[5].name }}</a></li>
                <li><a href="/SWZP0070">{{ menu_list[6].name }}</a></li>
                <li><a href="/SWZP0080">{{ menu_list[7].name }}</a></li>
                <li><a href="/SWZP0090">{{ menu_list[8].name }}</a></li>
                <li><a href="/SWZP0100">{{ menu_list[9].name }}</a></li>
                <li><a href="/SWZP0110">{{ menu_list[10].name }}</a></li>
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
        <div class="col">
          <ul class="filter-con clear-fix">
            <li class="filter-item">
              <div class="item-con">프로젝트명
                <select
                    v-model="info.prjt_nm_selected"
                    style="width: 167px"
                >
                  <option
                      v-for="(prjt_nm, idx) in info.prjt_nm"
                      :key="idx"
                      v-text="prjt_nm.text"
                      :value="prjt_nm.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">관리구분
                <select
                    v-model="info.rgs_dis_cd_selected"
                    style="width: 145px"
                >
                  <option
                      v-for="(rgs_dis_cd, idx) in info.rgs_dis_cd"
                      :key="idx"
                      v-text="rgs_dis_cd.text"
                      :value="rgs_dis_cd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">요청구분
                <select
                    v-model="info.req_dis_cd_selected"
                    style="width: 120px"
                >
                  <option
                      v-for="(req_dis_cd, idx) in info.req_dis_cd"
                      :key="idx"
                      v-text="req_dis_cd.text"
                      :value="req_dis_cd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">처리상태
                <select
                    v-model="info.prc_step_cd_selected"
                    style="width: 120px"
                >
                  <option
                      v-for="(prc_step_cd, idx) in info.prc_step_cd"
                      :key="idx"
                      v-text="prc_step_cd.text"
                      :value="prc_step_cd.value"
                  ></option>
                </select>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">조치업무명
                <input type="text"
                       placeholder="입력"
                       v-model="info.tgt_biz_nm"
                       @keyup.enter="fnSearch"
                       style="width: 110px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">요청자
                <input type="text"
                       placeholder="입력"
                       v-model="info.achi_nm"
                       @keyup.enter="fnSearch"
                       style="width: 110px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">조치담당자
                <input type="text"
                       placeholder="입력"
                       v-model="info.ttmn_crpe_nm"
                       @keyup.enter="fnSearcha"
                       style="width: 110px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">
                <input type="checkbox" id="check_Yn" v-model="info.check_Yn">
                <label>　완료/제외/해결/미발생해소 포함</label>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">요청일자
                <div class="input-dateWrap">
                  <input type="date"
                         :max="info.rgs_end_dt"
                         v-model="info.rgs_sta_dt"
                         style="width: 137px"
                  ></div>
                -
                <div class="input-dateWrap">
                  <input type="date"
                         :min="info.rgs_sta_dt"
                         v-model="info.rgs_end_dt"
                         style="width: 137px"
                  ></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">조치일자
                <div class="input-dateWrap">
                  <input type="date"
                         :min="info.ttmn_end_dt"
                         v-model="info.ttmn_sta_dt"
                         style="width: 137px"
                  ></div>
                -
                <div class="input-dateWrap">
                  <input type="date"
                         :min="info.ttmn_sta_dt"
                         v-model="info.ttmn_end_dt"
                         style="width: 137px"
                  ></div>
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">제목
                <input type="text"
                       placeholder="입력"
                       v-model="info.titl_nm"
                       @keyup.enter="fnSearch"
                       style="width: 160px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">요청내용
                <input type="text"
                       placeholder="입력"
                       v-model="info.req_dis_txt"
                       @keyup.enter="fnSearch"
                       style="width: 160px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">조치내용
                <input type="text"
                       placeholder="입력"
                       v-model="info.ttmn_txt"
                       @keyup.enter="fnSearch"
                       style="width: 160px"
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="item-con">해결방안내용
                <input type="text"
                       placeholder="입력"
                       v-model="info.slv_mpln_txt"
                       @keyup.enter="fnSearch"
                       style="width: 160px"
                >
              </div>
            </li>

          </ul>
          <ul class="filter-btn">
            <div class="btn btn-filter-e">
              <a href="#" @click="gridExcelExport">엑셀다운로드</a>
            </div>
            <div class="btn btn-filter-p" style="margin-left: 20px">
              <a href="#" @click="fnSearch">조회</a>
            </div>
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
                <div class="btn btn-filter-b" style="margin-left: 20px">
                  <a href="#" @click="fnClear">신규초기화</a>
                </div>
                <div class="btn btn-filter-p" style="margin-left: 20px">
                  <a href="#" @click="fnSave">저장</a>
                </div>
              </ul>
            </div>
            <div class="div2-body-c">
              <ul class="filter-con clear-fix-a">
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>*관리구분</label>
                    <select
                        id="d_rgs_dis_cd_selected"
                        name="d_rgs_dis_cd_selected"
                        v-model="detail.d_rgs_dis_cd_selected"
                        style="width: 230px"
                    >
                      <option
                          v-for="(d_rgs_dis_cd, idx) in detail.d_rgs_dis_cd"
                          :key="idx"
                          v-text="d_rgs_dis_cd.text"
                          :value="d_rgs_dis_cd.value"
                      ></option>
                    </select>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>*처리상태</label>
                    <select
                        v-model="detail.d_prc_step_cd_selected"
                        style="width: 137px"
                    >
                      <option
                          v-for="(d_prc_step_cd, idx) in detail.d_prc_step_cd"
                          :key="idx"
                          v-text="d_prc_step_cd.text"
                          :value="d_prc_step_cd.value"
                      ></option>
                    </select>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>관리ID</label>
                    <input type="text"
                           placeholder="입력 불가"
                           v-model="detail.mng_id"
                           :readonly="detail.mng_id"
                           @keyup.enter="fnSearch"
                           style="background-color: #dcdcdc ; width: 109px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>*요청구분</label>
                    <select
                        v-model="detail.d_req_dis_cd_selected"
                        style="width: 230px"
                    >
                      <option
                          v-for="(d_req_dis_cd, idx) in detail.d_req_dis_cd"
                          :key="idx"
                          v-text="d_req_dis_cd.text"
                          :value="d_req_dis_cd.value"
                      ></option>
                    </select>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>*요청일자</label>
                    <div class="input-dateWrap">
                      <input type="date"
                             v-model="detail.rgs_dt"
                             style="width: 137px"
                      ></div>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>*요청자</label>
                    <input type="text"
                           placeholder="입력"
                           v-model="detail.d_achi_nm"
                           @keyup.enter="fnSearch"
                           style="width: 109px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>조치담당자</label>
                    <input type="text"
                           placeholder="입력"
                           v-model="detail.d_ttmn_crpe_nm"
                           @keyup.enter="fnSearch"
                           style="width: 109px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>조치업무명</label>
                    <input type="text"
                           placeholder="입력"
                           v-model="detail.d_tgt_biz_nm"
                           id="d_tgt_biz_nm"
                           name="d_tgt_biz_nm"
                           @keyup.enter="fnSearch"
                           style="width: 230px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>조치예정일자</label>
                    <div class="input-dateWrap">
                      <input type="date"
                             v-model="detail.ttmn_scd_dt"
                             style="width: 137px"
                      ></div>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>조치일자</label>
                    <div class="input-dateWrap">
                      <input type="date"
                             v-model="detail.ttmn_dt"
                             style="width: 137px"
                      ></div>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>긴급성</label>
                    <select
                        v-model="detail.urgn_cd_selected"
                        style="width: 230px"
                    >
                      <option
                          v-for="(urgn_cd, idx) in detail.urgn_cd"
                          :key="idx"
                          v-text="urgn_cd.text"
                          :value="urgn_cd.value"
                      ></option>
                    </select>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>영향도</label>
                    <select
                        v-model="detail.ifnc_cd_selected"
                        style="width: 137px"
                    >
                      <option
                          v-for="(ifnc_cd, idx) in detail.ifnc_cd"
                          :key="idx"
                          v-text="ifnc_cd.text"
                          :value="ifnc_cd.value"
                      ></option>
                    </select>
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>등급</label>
                    <input type="text"
                           placeholder="입력"
                           v-model="detail.gd_txt"
                           @keyup.enter="fnSearch"
                           style="width: 109px"
                    >
                  </div>
                </li>
                <li class="filter-item-a">
                  <div class="item-con">
                    <label>*제목</label>
                    <input type="text"
                           placeholder="입력"
                           v-model="detail.d_titl_nm"
                           @keyup.enter="fnSearch"
                           style="width: 870px"
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
                                rows="6"
                                placeholder="결함내용을 입력해주세요"
                                v-model="detail.d_req_dis_txt"
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
                                rows="6"
                                placeholder="조치내용을 입력해주세요"
                                v-model="detail.d_ttmn_txt"
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
                                rows="6"
                                placeholder="해결방안내용을 입력해주세요"
                                v-model="detail.d_slv_mpln_txt"
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
                                rows="3"
                                placeholder="비고를 입력해주세요"
                                v-model="detail.rmrk"
                      ></textarea>
                    </td>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="div4-b">
            <div class="div-header-b"><h2>상세내용확대보기</h2>
              <ul class="filter-btn">
                <div class="btn btn-filter-b">
                  <a href="#" @click="gridExcelExport">+ 확대</a>
                </div>
                <div class="btn btn-filter-b">
                  <a href="#" @click="gridExcelExport">- 축소</a>
                </div>
              </ul>
            </div>
            <div class="div2-body-c">
              <ul class="filter-con clear-fix-a">
                <li class="filter-item-a">
                  <td>
                    <textarea cols="103"
                              rows="33"
                              v-model="detail.d_req_dis_txt"
                              :readonly="detail.d_req_dis_txt"
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

const storage = window.sessionStorage;

//그리드 아이템 예제
var listItem = [{text: "개발", value: "1"}, {text: "운영", value: "2"}, {text: "이관", value: "3"}];
var prjt_nm = [{text: "PMS프로젝트", value: "1"}, {text: "PMS프로젝트2", value: "2"}, {text: "PMS프로젝트3", value: "3"}];


// 관리구분
const rgs_dis_cd = [
  {text: "전체", value: '999'},
  {text: "ActionItem", value: 'A'},
  {text: "이슈", value: 'I'},
  {text: "위험", value: "R"},
];
// 요청구분
const req_dis_cd = [
  {text: "전체", value: '999'},
  {text: "품질", value: "100"},
  {text: "업무처리", value: "200"},
  {text: "협의사항", value: "300"},
  {text: "기타", value: "900"},
];
// 처리상태(이슈처리단계구분코드)
const prc_step_cd = [
  {text: "전체", value: '999'},
  {text: "발생", value: "100"},
  {text: "요청", value: "200"},
  {text: "보류", value: "300"},
  {text: "진행중", value: "400"},
  {text: "완료", value: "500"}
];
// 상세내용 관리구분
const d_rgs_dis_cd = [
  {text: "ActionItem", value: 'A'},
  {text: "이슈", value: 'I'},
  {text: "위험", value: "R"},
];
// 상세내용 요청구분
const d_req_dis_cd = [
  {text: "품질", value: "100"},
  {text: "업무처리", value: "200"},
  {text: "협의사항", value: "300"},
  {text: "기타", value: "900"},
];
// 상세내용 처리상태(이슈처리단계구분코드)
const d_prc_step_cd = [
  {text: "발생", value: "100"},
  {text: "요청", value: "200"},
  {text: "보류", value: "300"},
  {text: "진행중", value: "400"},
  {text: "완료", value: "500"}
];
// 상세내용 영향도
const ifnc_cd = [
  {text: "매우낮음", value: "100"},
  {text: "낮음", value: "200"},
  {text: "높음", value: "300"},
  {text: "매우높음", value: "400"},
];
// 상세내용 긴급성
const urgn_cd = [
  {text: "매우낮음", value: "100"},
  {text: "낮음", value: "200"},
  {text: "높음", value: "300"},
  {text: "매우높음", value: "400"},
];

const ai = axios.create({
  baseURL: "http://localhost:8080/SWZP0060/"
});

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
    // 최초조회
    this.fnSearch();
    // 상세내용 초기화
    this.fnClear();
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
    getCount() {
      return this.count;
    }

  },
// 일반적인 함수를 선언하는 부분
  methods: {
    fnSave() {
      //필수항목 확인
      if (this.checkPrimary() == true) {
        //확인창
        if (confirm("정말 저장하시겠습니까??") == true) {
          // 관리ID가 없으면 INSERT
          if (this.detail.mng_id == "" || this.detail.mng_id == "null") {
            ai.post("/insert",
                {
                  d_rgs_dis_cd: this.detail.d_rgs_dis_cd_selected,
                  d_prc_step_cd: this.detail.d_prc_step_cd_selected,
                  d_req_dis_cd: this.detail.d_req_dis_cd_selected,
                  rgs_dt: this.getUnFormatDate(this.detail.rgs_dt),
                  d_achi_nm: this.detail.d_achi_nm,
                  d_ttmn_crpe_nm: this.detail.d_ttmn_crpe_nm,
                  d_tgt_biz_nm: this.detail.d_tgt_biz_nm,
                  ttmn_scd_dt: this.getUnFormatDate(this.detail.ttmn_scd_dt),
                  ttmn_dt: this.getUnFormatDate(this.detail.ttmn_dt),
                  ifnc_cd: this.detail.ifnc_cd_selected,
                  urgn_cd: this.detail.urgn_cd_selected,
                  gd_txt: this.detail.gd_txt,
                  d_titl_nm: this.detail.d_titl_nm,
                  d_req_dis_txt: this.detail.d_req_dis_txt,
                  d_ttmn_txt: this.detail.d_ttmn_txt,
                  d_slv_mpln_txt: this.detail.d_slv_mpln_txt,
                  rmrk: this.detail.rmrk,
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
            ai.put("/update",
                {
                  d_rgs_dis_cd: this.detail.d_rgs_dis_cd_selected,                   // (상세)관리구분
                  d_prc_step_cd: this.detail.d_prc_step_cd_selected,                 // (상세)처리상태
                  mng_id: this.detail.mng_id,                                        // (상세)관리ID
                  d_req_dis_cd: this.detail.d_req_dis_cd_selected,                   // (상세)요청구분
                  rgs_dt: this.getUnFormatDate(this.detail.rgs_dt),                  // (상세)요청일자
                  d_achi_nm: this.detail.d_achi_nm,                                  // (상세)요청자
                  d_ttmn_crpe_nm: this.detail.d_ttmn_crpe_nm,                        // (상세)조치담당자
                  d_tgt_biz_nm: this.detail.d_tgt_biz_nm,                            // (상세)조치업무명
                  ttmn_scd_dt: this.getUnFormatDate(this.detail.ttmn_scd_dt),        // (상세)조치예정일자
                  ttmn_dt: this.getUnFormatDate(this.detail.ttmn_dt),                // (상세)조치일자
                  ifnc_cd: this.detail.ifnc_cd_selected,                             // (상세)영향도
                  urgn_cd: this.detail.urgn_cd_selected,                             // (상세)긴급성
                  gd_txt: this.detail.gd_txt,                                        // (상세)등급
                  d_titl_nm: this.detail.d_titl_nm,                                  // (상세)제목
                  d_req_dis_txt: this.detail.d_req_dis_txt,                          // (상세)요청내용
                  d_ttmn_txt: this.detail.d_ttmn_txt,                                // (상세)조치내용
                  d_slv_mpln_txt: this.detail.d_slv_mpln_txt,                        // (상세)해결방안내용
                  rmrk: this.detail.rmrk,                                            // (상세)비고
                }
            )
                .then(res => {
                  if (res.status == 200) {
                    console.log(res.data);
                  }
                }).catch(e => {
              alert("필수값을 입력해주세요.");
            })
          }
          //update / insert 후 재조회
          this.$refs.grid.invoke("reloadData");
        } else {   //취소
          return;
        }
      } else {
        //필수 항목 미입력 시
        alert("필수항목을 입력해 주세요.");
      }

    },
    fnClear() {
      this.detail.d_rgs_dis_cd_selected = d_rgs_dis_cd[0].value       // (상세)관리구분
      this.detail.d_prc_step_cd_selected = d_prc_step_cd[0].value     // (상세)처리상태
      this.detail.mng_id = ''                                         // (상세)관리ID
      this.detail.d_req_dis_cd_selected = d_req_dis_cd[0].value       // (상세)요청구분
      this.detail.rgs_dt = ''                                         // (상세)요청일자
      this.detail.d_achi_nm = ''                                      // (상세)요청자
      this.detail.d_ttmn_crpe_nm = ''                                 // (상세)조치담당자
      this.detail.d_tgt_biz_nm = ''                                   // (상세)조치업무명
      this.detail.ttmn_scd_dt = ''                                    // (상세)조치예정일자
      this.detail.ttmn_dt = ''                                        // (상세)조치일자
      this.detail.ifnc_cd_selected = urgn_cd[0].value                 // (상세)영향도
      this.detail.urgn_cd_selected = ifnc_cd[0].value                 // (상세)긴급성
      this.detail.gd_txt = ''                                         // (상세)등급
      this.detail.d_titl_nm = ''                                      // (상세)제목
      this.detail.d_req_dis_txt = ''                                  // (상세)요청내용
      this.detail.d_ttmn_txt = ''                                     // (상세)조치내용
      this.detail.d_slv_mpln_txt = ''                                 // (상세)해결방안내용
      this.detail.rmrk = ''                                           // (상세)비고
    },
    onClick(ev) {
      this.curRow = ev.rowKey;
      const currentRowData = (this.$refs.grid.invoke("getRow", this.curRow));
      if(currentRowData != null) {
        this.cellDataBind(currentRowData) // currentRowData가 있을 때 Row 클릭 시 상세내용에 Bind
      }
    },
    /* 그리드 Row onClick클릭 시 상세내용에 Bind */
    cellDataBind(currentRowData) {
      this.detail.d_rgs_dis_cd_selected = currentRowData.rgs_dis_cd;           // (상세)관리구분
      this.detail.d_prc_step_cd_selected = currentRowData.prc_step_cd;         // (상세)처리상태
      this.detail.mng_id = currentRowData.mng_id;                              // (상세)관리ID
      this.detail.d_req_dis_cd_selected = currentRowData.req_dis_cd;           // (상세)요청구분
      this.detail.rgs_dt = this.getFormatDate(currentRowData.rgs_dt)           // (상세)요청일자
      this.detail.d_achi_nm = currentRowData.achi_nm;                          // (상세)요청자
      this.detail.d_ttmn_crpe_nm = currentRowData.ttmn_crpe_nm;                // (상세)조치담당자
      this.detail.d_tgt_biz_nm = currentRowData.tgt_biz_nm;                    // (상세)조치업무명
      this.detail.ttmn_scd_dt = this.getFormatDate(currentRowData.ttmn_scd_dt) // (상세)조치예정일자
      this.detail.ttmn_dt = this.getFormatDate(currentRowData.ttmn_dt)         // (상세)조치일자
      this.detail.ifnc_cd_selected = currentRowData.ifnc_cd;                   // (상세)영향도
      this.detail.urgn_cd_selected = currentRowData.urgn_cd;                   // (상세)긴급성
      this.detail.gd_txt = currentRowData.gd_txt;                              // (상세)등급
      this.detail.d_titl_nm = currentRowData.titl_nm;                          // (상세)제목
      this.detail.d_req_dis_txt = currentRowData.req_dis_txt;                  // (상세)요청내용
      this.detail.d_ttmn_txt = currentRowData.ttmn_txt;                        // (상세)조치내용
      this.detail.d_slv_mpln_txt = currentRowData.slv_mpln_txt;                // (상세)해결방안내용
      this.detail.rmrk = currentRowData.rmrk;                                  // (상세)비고

    },
    /* 저장 */
    fnSearch() {
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    gridInit() {
      this.$refs.grid.invoke("clear");
    },
    gridExcelExport() {
      this.$refs.grid.invoke("export", "xlsx", {fileName: "엑셀다운로드"});
    },
    gridExcelImport() {

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
      if (this.detail.d_rgs_dis_cd == "" || this.detail.d_rgs_dis_cd == "null") {            // 관리구분
        return false;
      } else if (this.detail.d_prc_step_cd == "" || this.detail.d_prc_step_cd == "null") {   // 처리상태
        return false;
      } else if (this.detail.d_req_dis_cd == "" || this.detail.d_req_dis_cd == "null") {     // 요청구분
        return false;
      } else if (this.detail.rgs_dt == "" || this.detail.rgs_dt == "null") {                 // 요청일자
        return false;
      } else if (this.detail.d_achi_nm == "" || this.detail.d_achi_nm == "null") {           // 요청자
        return false;
      } else if (this.detail.d_titl_nm == "" || this.detail.d_titl_nm == "null") {           // 제목
        return false;
      } else if (this.detail.d_req_dis_txt == "" || this.detail.d_req_dis_txt == "null") {   // 요청내용
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
      console.log("count의 값이 변경되면 여기도 실행");
      console.log("new Value :: " + a);
      console.log("old Value :: " + b);
    }
  },
// 변수 선언부분
  data() {
    return {
      info: {
        /* 필터 변수 */
        prjt_nm: prjt_nm,                // 프로젝트명
        rgs_dis_cd: rgs_dis_cd,          // 관리구분
        req_dis_cd: req_dis_cd,          // 요청구분
        prc_step_cd: prc_step_cd,        // 처리상태

        prjt_nm_selected: prjt_nm[0].value,          // 선택 된 프로젝트명
        rgs_dis_cd_selected: rgs_dis_cd[0].value,    // 선택 된 관리구분
        req_dis_cd_selected: req_dis_cd[0].value,    // 선택 된 요청구분
        prc_step_cd_selected: prc_step_cd[0].value,  // 선택 된 처리상태

        rgs_sta_dt: '',         // 요청시작일자
        rgs_end_dt: '',         // 요청종료일자
        ttmn_sta_dt: '',        // 조치시작일자
        ttmn_end_dt: '',        // 조치종료일자

        tgt_biz_nm: this.tgt_biz_nm,               // 조치업무명
        achi_nm: this.achi_nm,                     // 요청자
        ttmn_crpe_nm: this.ttmn_crpe_nm,           // 조치담당자
        titl_nm: this.titl_nm,                     // 제목
        req_dis_txt: this.req_dis_txt,             // 요청내용
        ttmn_txt: this.ttmn_txt,                   // 조치내용
        slv_mpln_txt: this.slv_mpln_txt,           // 해결방안내용

        check_Yn: false,       // 완료/제외/해결/미발생해소 포함 여부
      },

      detail: {
        /* 상세내용 변수 */
        d_rgs_dis_cd: d_rgs_dis_cd,             // (상세)관리구분
        d_prc_step_cd: d_prc_step_cd,           // (상세)처리상태
        mng_id: '',                             // (상세)관리ID
        d_req_dis_cd: d_req_dis_cd,             // (상세)요청구분
        rgs_dt: '',                             // (상세)요청일자
        d_achi_nm: this.d_achi_nm,              // (상세)요청자
        d_ttmn_crpe_nm: this.d_ttmn_crpe_nm,    // (상세)조치담당자
        d_tgt_biz_nm: this.d_tgt_biz_nm,        // (상세)조치업무명
        ttmn_scd_dt: '',                        // (상세)조치예정일자
        ttmn_dt: '',                            // (상세)조치일자
        ifnc_cd: ifnc_cd,                       // (상세)영향도
        urgn_cd: urgn_cd,                       // (상세)긴급성
        gd_txt: this.gd_txt,                    // (상세)등급
        d_titl_nm: this.d_titl_nm,              // (상세)제목
        d_req_dis_txt: this.d_req_dis_txt,      // (상세)요청내용
        d_ttmn_txt: this.d_ttmn_txt,            // (상세)조치내용
        d_slv_mpln_txt: this.d_slv_mpln_txt,    // (상세)해결방안내용
        rmrk: this.rmrk,                        // (상세)비고

        d_rgs_dis_cd_selected: d_rgs_dis_cd[0].value,      // (상세)선택 된 관리구분
        d_req_dis_cd_selected: d_req_dis_cd[0].value,      // (상세)선택 된 요청구분
        d_prc_step_cd_selected: d_prc_step_cd[0].value,    // (상세)선택 된 처리상태
        urgn_cd_selected: urgn_cd[0].value,                // (상세)영향도
        ifnc_cd_selected: ifnc_cd[0].value,                // (상세)긴급성
      },

      addRow: {
        grid: this.grid,
      },

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
          readData: {url: 'http://localhost:8080/SWZP0060/select', method: 'GET'},
        },
        initialRequest: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders: ['checkbox', 'rowNum'],
      header: {
        height: 40
      },
      columns: [
        {
          header: '관리구분',
          width: 150,
          align: 'left',
          name: 'rgs_dis_cd',
        },
        {
          header: '관리ID',
          width: 100,
          align: 'left',
          name: 'mng_id',
        },
        {
          header: '제목',
          width: 230,
          align: 'left',
          name: 'titl_nm',
        },
        {
          header: '요청내용',
          width: 280,
          align: 'left',
          name: 'req_dis_txt',
        },
        {
          header: '요청구분',
          width: 110,
          align: 'left',
          name: 'req_dis_cd',
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
          header: '처리상태',
          width: 110,
          align: 'left',
          name: 'prc_step_cd',
        },
        {
          header: '조치업무명',
          width: 110,
          align: 'left',
          name: 'tgt_biz_nm',
        },
        {
          header: '조치담당자',
          width: 110,
          align: 'left',
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
        },
        {
          header: '비고',
          width: 230,
          align: 'left',
          name: 'rmrk',
        },
        {
          header: '긴급성',
          width: 110,
          align: 'left',
          name: 'urgn_cd',
        },
        {
          header: '영향도',
          width: 110,
          align: 'left',
          name: 'ifnc_cd',
        },
        {
          header: '등급',
          width: 110,
          align: 'left',
          name: 'gd_txt',
        },
        {
          header: '해결방안내용',
          width: 230,
          align: 'left',
          name: 'slv_mpln_txt',
        },
      ]
    }
  },
};

</script>
<style>
</style>
