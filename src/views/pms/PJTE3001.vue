<template>
  <!--  -->
  <section class="popup">
    <div class="pop-header">
      <h1>결함상세관리</h1>
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
          <th>프로그램/ 테스트케이스ID</th>
          <td colspan="2">
            <input type="text" v-model="cctn_id"  :disabled= true style="width: calc(100%); float:left; background-color: #f2f2f2;">
          </td>
          <th>프로그램/테스트케이스명</th>
          <td colspan="2">
            <input type="text" v-model="cctn_nm" :disabled= true style="background-color: #f2f2f2;">
          </td>
        </tr>
        <tr>
          <th>결함등록자</th>
          <td>
            <input type="text" v-model="rgpe_nm" :disabled= true style="width: calc(50%); background-color: #f2f2f2;">
            <input type="text" v-model="rgpe_no" :disabled= true style="width: calc(50%); background-color: #f2f2f2;">
          </td>
          <th>결함등록일자</th>
          <td>
            <div class="input-dateWrap">
              <input type="date" v-model="rgs_dt" :disabled= true style="background-color: #f2f2f2;">
            </div>
          </td>
          <th>　　결함ID</th>
          <td>
            <input type="text" v-model="mng_id" placeholder="입력불가" :disabled= true style="background-color: #f2f2f2;">
          </td>
        </tr>
        </tbody>
      </table>
      <hr>
      <h2>
        결함내역
      </h2>
      <table>
        <colgroup>
          <col width="140px">
          <col width="*">
          <col width="140px">
          <col width="*">
        </colgroup>
        <tbody>
        <tr>
          <th>결함유형</th>
          <td colspan="2">
            <select ref="err_tycd" v-model="err_tycd_selected">
              <option
                  v-for   = "(err_tycd,idx) in err_tycd"
                  :key    ="idx"
                  v-text  ="err_tycd.text"
                  :value  ="err_tycd.value"
              ></option>
            </select>
          </td>
          <th>등록단계</th>
          <td colspan="2">
            <select ref="rgs_dscd" v-model="rgs_dscd_selected" disabled = true  style="background-color: #f2f2f2;" >
              <option
                  v-for   = "(rgs_dscd,idx) in rgs_dscd"
                  :key    ="idx"
                  v-text  ="rgs_dscd.text"
                  :value  ="rgs_dscd.value"
              ></option>
            </select>
          </td>
        </tr>
        <tr v-if="mng_id===undefined">
          <th>
            결함내용
          </th>
          <td colspan="5">
            <textarea cols="30" rows="10" ref="err_txt" v-model="err_txt" placeholder="결함내용을 입력해주세요"></textarea>
          </td>
        </tr>
        <tr v-else-if="mng_id!==undefined && err_prc_step_cd_selected === '300' && rgpe_no === login_emp_no ">
          <th>
            결함내용
          </th>
          <td colspan="5">
            <textarea cols="30" rows="10" v-model="err_txt" placeholder="결함내용을 입력해주세요"></textarea>
          </td>
        </tr>
        <tr v-else>
          <th>
            결함내용
          </th>
          <td colspan="5">
            <textarea cols="30" rows="10" v-model="err_txt" disabled = true  style="background-color: #f2f2f2;"></textarea>
          </td>
        </tr>

        <tr v-if="mng_id">
          <th>첨부파일</th>
          <td colspan="4">
            <input type="text" :disabled=true v-model="rgs_atfl_nm" style="background-color: #f2f2f2;">
          </td>
          <th>
            <button class="btn btn-filter-p" @click="open_file_page(1)">첨부</button>
          </th>
        </tr>
        <tr v-else>
          <th>첨부파일</th>
          <td colspan="4">
            <span>첨부파일등록은 저장 후 가능합니다.</span>

          </td>
        </tr>
        </tbody>
      </table>
      <hr>
      <table>
        <colgroup>
          <col width="140px">
          <col width="*">
          <col width="140px">
          <col width="*">
        </colgroup>
        <tbody>
        <tr>
          <th>업무</th>
          <td>
            <select ref="bzcd" v-model="bzcd_selected">
              <option
                  v-for   = "(bzcd,idx) in bzcd"
                  :key    ="idx"
                  v-text  ="bzcd.text"
                  :value  ="bzcd.value"
              ></option>
            </select>
          </td>
          <th>처리상태</th>
          <td>
            <select ref="err_prc_step_cd" v-model="err_prc_step_cd_selected">
              <option
                  v-for   = "(err_prc_step_cd,idx) in err_prc_step_cd"
                  :key    ="idx"
                  v-text  ="err_prc_step_cd.text"
                  :value  ="err_prc_step_cd.value"
              ></option>
            </select>
          </td>
          <th>　　조치예정일자</th>
          <td>
            <div class="input-dateWrap">
              <input type="date" ref="ttmn_scd_dt" v-model="ttmn_scd_dt">
            </div>
          </td>
        </tr>
        <tr>
          <th>
            조치담당자
          </th>
          <td>
            <div class="input-searchWrap">
              <input type="text" ref="dvlpe_nm" v-model="dvlpe_nm" placeholder="직원명" style="width: calc(58%);" @keyup.enter="open_pjte9001(1)" >
              <button class="search-btn2" @click="open_pjte9001_btn(1)"></button>
              <input type="text" v-model="dvlpe_no" ref="dvlpe_no" placeholder="직원번호" style="width: calc(42%); background-color: #f2f2f2;" disabled = true >
            </div>
          </td>
          <th>
            업무PL
          </th>
          <td>
            <div class="input-searchWrap">
              <input type="text" ref="pl_nm" v-model="pl_nm" placeholder="직원명" style="width: calc(58%);" @keyup.enter="open_pjte9001(2)">
              <button class="search-btn2" @click="open_pjte9001_btn(2)"></button>
              <input type="text" v-model="pl_no" ref="pl_no" placeholder="직원번호" style="width: calc(42%); background-color: #f2f2f2;" disabled = true >
            </div>
          </td>
          <th>　　조치일자</th>
          <td>
            <div class="input-dateWrap">
              <!--              <input v-if="mng_id" type="date" v-model="ttmn_dt">-->
              <!--              <input v-else type="date" v-model="ttmn_dt" disabled=true style="background-color: #f2f2f2;">-->
              <input type="date" v-model="ttmn_dt" ref="ttmn_dt" disabled=true style="background-color: #f2f2f2;">
            </div>
          </td>
        </tr>
        <tr>
          <th>
            조치내용
          </th>
          <td colspan="5">
            <textarea cols="30" rows="10" ref="ttmn_txt" placeholder="조치내용을 입력해주세요"  v-model="ttmn_txt"></textarea>
          </td>
        </tr>
        <tr v-if="mng_id">
          <th>첨부파일</th>
          <td colspan="4">
            <input type="text" :disabled=true v-model="ttmn_atfl_nm" style="background-color: #f2f2f2;">
          </td>
          <th>
            <button class="btn btn-filter-p" @click="open_file_page(2)">첨부</button>
          </th>
        </tr>
        <tr v-else>
          <th>첨부파일</th>
          <td colspan="4">
            <span>첨부파일등록은 저장 후 가능합니다.</span>

          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="pop-footer">
      <button class="btn btn-filter-b" @click="close">닫기</button>
      <button class="btn btn-filter-p" @click="updateRegisterData" v-if="mng_id">저장</button>
      <button class="btn btn-filter-p" @click="saveRegisterData" v-else>저장</button>
    </div>
  </section>
</template>
<script>

import {axiosService} from "@/api/http";

// 첨부파일 팝업에서 받은 값
window.fileData = (fileLists, num) => {
  // console.log(fileLists);
  window.pms_register.file_name_list = [...fileLists];
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
    // 팝업 콤보데이터 별도 조회(공통 컴포넌트 미사용)
    this.getCombo();
    // mng_id가 있을 때 팝업 데이터 조회
    if(this.mng_id){
      this.getRegisterData();
      // mng_id가 없을 때 신규 등록을 위한팝업 데이터 조회
    } else {
      this.getNewRegisterData();
    }
  },
  beforeMount() {
    // console.log("beforeMount");
  },
  mounted() {
    // console.log("mounted");
    window.pms_register = this;
  },
  beforeUpdate() {
    // console.log("beforeUpdate");
  },
  updated(){
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
      axiosService.get("/PJTE3001/combo", {
        params: {
          prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID")
        }
      }).then(res => {
        this.setCombo(res.data.data);
      }).catch(e => {

      });
    },
    // 프로젝트명, 업무구분 콤보박스 셋팅
    setCombo(combodata) {
      //업무구분 세팅
      for(let i=0; i<combodata.contents.length; i++) {
        this.bzcd.push({"text": combodata.contents[i].dtls_tynm, "value": combodata.contents[i].dtls_tycd});
      }
      //처리상태 세팅
      for(let i=0; i<combodata.contents1.length; i++) {
        this.err_prc_step_cd.push({"text": combodata.contents1[i].dtls_tynm, "value": combodata.contents1[i].dtls_tycd});
      }
      //등록단계 세팅
      for(let i=0; i<combodata.contents2.length; i++) {
        this.rgs_dscd.push({"text": combodata.contents2[i].dtls_tynm, "value": combodata.contents2[i].dtls_tycd});
      }
      //결함유형 세팅
      for(let i=0; i<combodata.contents3.length; i++) {
        this.err_tycd.push({"text": combodata.contents3[i].dtls_tynm, "value": combodata.contents3[i].dtls_tycd});
      }
    },
    /* YYYY-MM-DD형태의 오늘 날짜를 구하는 함수*/
    getToday() {
      var date = new Date();
      var year = date.getFullYear();
      var month = ("0" + (1 + date.getMonth())).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);

      return year + '-' + month + '-' + day;
    },

    // 첨부파일등록 팝업 오픈
    open_file_page(num){
      // console.log(num)
      let file_rgs_dscd = ''
      let atfl_mng_id = ''
      if(num == 1) {
        file_rgs_dscd='300'
        atfl_mng_id = this.rgs_atfl_mng_id
      } else if(num = 2){
        file_rgs_dscd='400'
        atfl_mng_id = this.ttmn_atfl_mng_id
      }
      let bkup_id='0000000000', prjt_id=this.prjt_id, mng_id = this.mng_id
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&mng_id=${mng_id}&file_rgs_dscd=${file_rgs_dscd}&num=${num}`, "open_file_page", "width=1000, height=800");
    },
    // 창 닫기
    close() {
      window.close();
    },

    // mng_id가 있을 때 팝업 데이터 조회
    getRegisterData() {
      axiosService.get("/PJTE3001/select",{
        params : {
          bkup_id : this.bkup_id,
          prjt_id : this.prjt_id,
          mng_id : this.mng_id,
        }
      })
          .then(res => {
            let res_data = res.data.data.contents[0];
            // console.log(res_data)
            this.bzcd_selected = res_data.bzcd                          // 업무구분코드
            this.err_tycd_selected = res_data.err_tycd                  // 결함유형코드
            this.rgs_dscd_selected = res_data.rgs_dscd                  // 결함등록단계구분코드
            this.err_prc_step_cd_selected = res_data.err_prc_step_cd    // 결함처리단계구분코드
            this.cctn_id = res_data.cctn_id                             // 프로그램ID/테스트케이스ID
            this.cctn_nm = res_data.cctn_nm                             // 프로그램명/테스트케이스명
            this.rgpe_nm = res_data.rgpe_nm                             // 등록자명
            this.rgpe_no = res_data.rgpe_no                             // 등록자번호
            this.rgs_dt = res_data.rgs_dt                               // 결함등록일자
            this.err_txt = res_data.err_txt                             // 결함내용
            this.rgs_atfl_nm = res_data.rgs_atfl_nm                     // 요청첨부파일관리명
            this.rgs_atfl_mng_id = res_data.rgs_atfl_mng_id             // 요청첨부파일관리ID
            this.ttmn_scd_dt = res_data.ttmn_scd_dt                     // 조치예정일자
            this.dvlpe_nm = res_data.dvlpe_nm                           // 개발자명
            this.dvlpe_no = res_data.dvlpe_no                           // 개발자번호
            this.pl_nm = res_data.pl_nm                                 // PL명
            this.pl_no = res_data.pl_no                                 // PL번호
            this.ttmn_dt = res_data.ttmn_dt                             // 조치일자
            this.ttmn_txt = res_data.ttmn_txt                           // 조치내용
            this.ttmn_atfl_nm = res_data.ttmn_atfl_nm                   // 조치첨부파일관리명
            this.ttmn_atfl_mng_id = res_data.ttmn_atfl_mng_id           // 조치첨부파일관리ID
            this.bfjr_bzcd = res_data.bfjr_bzcd                         // 이관전업무
            this.cctn_bzcd = res_data.cctn_bzcd                         // 연결업무구분코드
            this.cctn_sqn_cd = res_data.cctn_sqn_cd                     // 연결차수구분코드
          })
    },
    //mng_id가 없을 때 신규 등록을 위한팝업 데이터 조회
    getNewRegisterData() {
      axiosService.get("/PJTE3001/setdata",{
        params : {
          bkup_id : this.bkup_id,
          prjt_id : this.prjt_id,
          cctn_bzcd : this.cctn_bzcd,
          cctn_id : this.cctn_id,
          cctn_sqn_cd : this.cctn_sqn_cd,
          rgs_dscd : this.rgs_dscd_selected,
        }
      })
          .then(res => {
            let res_data = res.data.data.contents[0];
            // console.log(res_data)
            this.bzcd_selected = res_data.bzcd                          // 업무구분코드
            this.cctn_id = res_data.cctn_id                             // 프로그램ID/테스트케이스ID
            this.cctn_nm = res_data.cctn_nm                             // 프로그램명/테스트케이스명
            this.dvlpe_nm = res_data.dvlpe_nm                           // 개발자명
            this.dvlpe_no = res_data.dvlpe_no                           // 개발자번호
            this.pl_nm = res_data.pl_nm                                 // PL명
            this.pl_no = res_data.pl_no                                 // PL번호
          })
    },
    // 저장(신청 ID 없는 경우, insert 쿼리)
    saveRegisterData() {
      // 필수 항목 체크
      if(this.cctn_id === '' || this.cctn_id === "null" || this.cctn_id === undefined){
        alert('프로그램/테스트케이스ID이 없습니다.');
        return false;
      } else if (this.cctn_nm === '' || this.cctn_nm == "null" || this.cctn_nm === undefined) {
        alert('프로그램/테스트케이스명이 없습니다.');
        return false;
      } else if (this.rgpe_no === '' || this.rgpe_no == "null" || this.rgpe_no === undefined) {
        alert('결함등록자가 없습니다.');
        return false;
      } else if (this.rgs_dt === '' || this.rgs_dt == "null" || this.rgs_dt === undefined) {
        alert('결함등록일자가 없습니다.');
        return false;
      } else if (this.err_tycd_selected === '' || this.err_tycd_selected == "null" || this.err_tycd_selected === undefined) {
        alert('선택 된 결함유형이 없습니다.');
        return false;
      } else if (this.rgs_dscd_selected === '' || this.rgs_dscd_selected == "null" || this.rgs_dscd_selected === undefined) {
        alert('선택 된 등록단계가 없습니다.');
        return false;
      } else if (this.err_txt === '' || this.err_txt == "null" || this.err_txt === undefined) {
        alert('결함내용이 없습니다.');
        this.$refs.err_txt.focus();
        return false;
      }

      axiosService.post('/PJTE3001/insert',{
        bkup_id : this.bkup_id,                                         // 백업ID
        prjt_id : this.prjt_id,                                         // 프로젝트ID
        login_emp_no : sessionStorage.getItem('LOGIN_EMP_NO'),     // 직원번호
        login_aut_cd : sessionStorage.getItem('LOGIN_AUT_CD'),     // 권한ID

        cctn_id : this.cctn_id,                                        // 연결ID(프로그램ID/테스트케이스ID)
        cctn_nm : this.cctn_nm,                                        // (프로그램명/테스트케이스명)
        rgpe_nm : this.rgpe_nm,                                        // 등록자이름
        rgpe_no : this.rgpe_no,                                        // 등록자번호
        rgs_dt : this.rgs_dt,                                          // 결함등록일자

        err_tycd : this.err_tycd_selected,                             // 결함유형코드
        rgs_dscd : this.rgs_dscd_selected,                             // 결함등록단계구분코드
        err_txt : this.err_txt,                                        // 결함내용
        bzcd : this.bzcd_selected,                                     // 업무구분코드
        err_prc_step_cd : this.err_prc_step_cd_selected,               // 결함처리단계구분코드
        ttmn_scd_dt : this.ttmn_scd_dt,                                // 조치예정일자
        dvlpe_nm : this.dvlpe_nm,                                      // 조치자명
        dvlpe_no : this.dvlpe_no,                                      // 조치자번호
        pl_nm : this.pl_nm,                                            // PL명
        pl_no : this.pl_no,                                            // PL번호
        ttmn_dt : this.ttmn_dt,                                        // 조치일자
        ttmn_txt : this.ttmn_txt,                                      // 조치내용

        bfjr_bzcd : this.bfjr_bzcd,                                    // 이관전업무
        cctn_bzcd : this.cctn_bzcd,                                    // 연결업무구분코드
        cctn_sqn_cd : this.cctn_sqn_cd,                                // 연결차수구분코드

      })
          .then(res => {

            if(res.data){
              this.open_page(res.data.mng_id)
              alert("저장되었습니다.");
            }

          })
    },

    // mng_id 없이 저장했을 때, mng_ig 파라미터로 하여 새 페이지 오픈(첨부파일등록 보여주기 위함)
    open_page(mng_id){
      if(mng_id == null || mng_id==='' || mng_id === undefined) mng_id=''
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem('LOGIN_PROJ_ID')
      this.pop = window.open(`../PJTE3001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&mng_id=${mng_id}&`, "open_page", "width=1000, height=800");
    },

    // 저장(mng_id 있는 경우, update 쿼리)
    updateRegisterData() {
      // 필수 항목 체크
      if(this.cctn_id === '' || this.cctn_id == null || this.cctn_id === undefined){
        alert('프로그램/테스트케이스ID이 없습니다.');
        return false;
      } else if (this.cctn_nm === '' || this.cctn_nm == null || this.cctn_nm === undefined) {
        alert('프로그램/테스트케이스명이 없습니다.');
        return false;
      } else if (this.rgpe_no === '' || this.rgpe_no == null || this.rgpe_no === undefined) {
        alert('결함등록자가 없습니다.');
        return false;
      } else if (this.rgs_dt === '' || this.rgs_dt == null || this.rgs_dt === undefined) {
        alert('결함등록일자가 없습니다.');
        return false;
      } else if (this.mng_id === '' || this.mng_id == null || this.mng_id === undefined) {
        alert('결함ID가 없습니다.');
        return false;
      } else if (this.err_tycd_selected === '' || this.err_tycd_selected == null || this.err_tycd_selected === undefined) {
        alert('선택 된 결함유형이 없습니다.');
        return false;
      } else if (this.rgs_dscd_selected === '' || this.rgs_dscd_selected == null || this.rgs_dscd_selected === undefined) {
        alert('선택 된 등록단계가 없습니다.');
        return false;
      } else if (this.err_txt === '' || this.err_txt == null || this.err_txt === undefined) {
        alert('결함내용이 없습니다.');
        this.$refs.err_txt.focus();
        return false;
      } else if (this.dvlpe_no === '' || this.dvlpe_no == null || this.dvlpe_no === undefined) {
        alert('선택 된 조치자가 없습니다.');
        this.$refs.dvlpe_nm.focus();
        return false;
      } else if (this.pl_no === '' || this.pl_no == null || this.pl_no === undefined) {
        alert('선택 된 PL이 없습니다.');
        this.$refs.pl_nm.focus();
        return false;
      } else if (this.ttmn_scd_dt === '' || this.ttmn_scd_dt == null || this.ttmn_scd_dt === undefined) {
        this.$refs.ttmn_scd_dt.focus();
        alert('조치예정일자가 없습니다.');
        return false;
      } else if (this.ttmn_txt === '' || this.ttmn_txt == null || this.ttmn_txt === undefined) {
        alert('조치내용이 없습니다.');
        this.$refs.ttmn_txt.focus();
        return false;
      }

      // 결함처리단계구분코드가 [200]인 경우 : 조치담당자,PL,조치예정일자 필수
      if(this.err_prc_step_cd_selected == '200') {
        if(this.dvlpe_no === '' || this.dvlpe_no == null || this.dvlpe_no === undefined){
          alert('선택 된 조지담당자가 없습니다.');
          this.$refs.dvlpe_no.focus();
          return false;
        } else if (this.pl_no === '' || this.pl_no == null || this.pl_no === undefined) {
          alert('선택 된 업무PL이 없습니다.');
          this.$refs.pl_no.focus();
          return false;
        } else if (this.ttmn_dt === '' || this.ttmn_dt == null || this.ttmn_dt === undefined) {
          alert('선택 된 조치일자가 없습니다.');
          this.$refs.ttmn_dt.focus();
          return false;
        }
        // 결함처리단계구분코드가 [500, 600]인 경우 : 조치내용 필수(보류인경우 보류 사유 입력)
      } else if(this.err_prc_step_cd_selected == '600') {
        if(this.ttmn_txt === '' || this.ttmn_txt == null || this.ttmn_txt === undefined) {
          alert('조치내용을 입력해주세요.');
          this.$refs.ttmn_txt.focus();
          return false;
        }
      } else if(this.err_prc_step_cd_selected == '500') {
        if(this.ttmn_txt === '' || this.ttmn_txt == null || this.ttmn_txt === undefined) {
          alert('보류 사유를 입력해주세요.');
          this.$refs.ttmn_txt.focus();
          return false;
        }
      }

      axiosService.put('/PJTE3001/update',{
        bkup_id : this.bkup_id,                                        // 백업ID
        prjt_id : this.prjt_id,                                        // 프로젝트ID
        mng_id : this.mng_id,                                          // 결함ID
        login_emp_no : sessionStorage.getItem('LOGIN_EMP_NO'),     // 직원번호
        login_aut_cd : sessionStorage.getItem('LOGIN_AUT_CD'),     // 권한ID

        cctn_id : this.cctn_id,                                        // 연결ID(프로그램ID/테스트케이스ID)
        cctn_nm : this.cctn_nm,                                        // (프로그램명/테스트케이스명)
        rgpe_nm : this.rgpe_nm,                                        // 등록자이름
        rgpe_no : this.rgpe_no,                                        // 등록자번호
        rgs_dt : this.rgs_dt,                                          // 결함등록일자

        err_tycd : this.err_tycd_selected,                             // 결함유형코드
        rgs_dscd : this.rgs_dscd_selected,                             // 결함등록단계구분코드
        err_txt : this.err_txt,                                        // 결함내용
        rgs_atfl_nm : this.rgs_atfl_nm,                                // 첨부파일명
        rgs_atfl_mng_id : this.rgs_atfl_mng_id,                        // 요청첨부파일관리ID

        bzcd : this.bzcd_selected,                                     // 업무구분코드
        err_prc_step_cd : this.err_prc_step_cd_selected,               // 결함처리단계구분코드
        ttmn_scd_dt : this.ttmn_scd_dt,                                // 조치예정일자
        dvlpe_nm : this.dvlpe_nm,                                      // 조치자명
        dvlpe_no : this.dvlpe_no,                                      // 조치자번호
        pl_nm : this.pl_nm,                                            // PL명
        pl_no : this.pl_no,                                            // PL번호
        ttmn_dt : this.ttmn_dt,                                        // 조치일자
        ttmn_txt : this.ttmn_txt,                                      // 조치내용
        ttmn_atfl_nm : this.ttmn_atfl_nm,                              // 조치파일명
        ttmn_atfl_mng_id : this.ttmn_atfl_mng_id,                      // 조치첨부파일관리ID

        bfjr_bzcd : this.bfjr_bzcd,                                    // 이관전업무
        cctn_bzcd : this.cctn_bzcd,                                    // 연결업무구분코드
        cctn_sqn_cd : this.cctn_sqn_cd,                                // 연결차수구분코드
      })
          .then(res => {

            if(res.data){
              alert("저장되었습니다.");
              opener.parent.location.reload();
            }
          })
    },
    //직원조회 버튼 클릭 시
    open_pjte9001_btn(btn_id) {
      let empnm = ''
      if (btn_id == '1') {
        empnm = this.dvlpe_nm
      } else if (btn_id == '2') {
        empnm = this.pl_nm
      }
      if((empnm === '' || empnm == "null" || empnm === undefined)) {
        let bkup_id = this.bkup_id, prjt_id =  this.prjt_id
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      } else {
        let bkup_id = this.bkup_id, prjt_id =  this.prjt_id
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      }
    },
    //엔터키를 눌러 직원 조회
    open_pjte9001(btn_id) {
      let empnm = ''
      let prjt_id_selected = this.prjt_id
      let bkup_id_selected = this.bkup_id
      if (btn_id == '1') {
        empnm = this.dvlpe_nm
      } else if (btn_id == '2') {
        empnm = this.pl_nm
      }
      if (empnm != null && empnm != '') {
        axiosService.get("/PJTE9001/select", {
          params: {
            empnm,
            prjt_id_selected,
            bkup_id_selected          }
        })
            .then(res => {
              let res_data = res.data.data.contents;
              // console.log(res_data)
              if (res_data.length == 1) {  // 입력한 직원명으로 조회한 값이 단건일 경우 : 직원번호 바인딩
                if (btn_id == '1') {
                  this.dvlpe_no = res.data.data.contents[0].empno
                  this.dvlpe_nm = res.data.data.contents[0].empnm
                } else if (btn_id == '2') {
                  this.pl_no = res.data.data.contents[0].empno
                  this.pl_nm = res.data.data.contents[0].empnm
                }
              } else { // 입력한 직원명으로 조회한 값이 여러건일 경우 : PJTE9001 팝업 호출 후 파라미터 값으로 조회
                let bkup_id = this.bkup_id, prjt_id = this.prjt_id
                window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
              }
            })
      } else { // 직원명에 입력한 값이 없을 때 : PJTE9001 팝업 호출
        let bkup_id = this.bkup_id, prjt_id = this.prjt_id
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      }
    },


  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
  watch:{
    deep: true,
    handler() {
    },
    count: (a, b) => {

    },
    /* 직원조회 팝업에서 받아온 값으로 emp_btn_id값이 바뀔 때
       버튼 id에 따라 직원명, 직원번호 값을 넣는다*/
    emp_no() {
      if(this.emp_btn_id == '1'){       // 요청자
        this.dvlpe_no = this.emp_no
        this.dvlpe_nm = this.emp_nm
      }else if(this.emp_btn_id == '2'){ // 조치담당자
        this.pl_no = this.emp_no
        this.pl_nm = this.emp_nm
      }
    },

    file_name_list() {
      if(this.atfl_num == '1'){
        this.rgs_atfl_nm = this.file_name_list[0].org_file_nm
        this.rgs_atfl_mng_id = this.file_name_list[this.file_name_list.length-1].atfl_mng_id
      }else if(this.atfl_num == '2'){
        this.ttmn_atfl_nm = this.file_name_list[0].org_file_nm
        this.ttmn_atfl_mng_id = this.file_name_list[this.file_name_list.length-1].atfl_mng_id
      }

    },
  },
// 변수 선언부분
  data() {
    return {

      /*직원조회 팝업 변수*/
      emp_btn_id : '',  // 직원조회팝업 버튼ID
      emp_nm : '',      // 직원조회팝업 직원명
      emp_no : '',      // 직원조회팝업 직원번호

      bkup_id : this.$route.query.bkup_id,   // 백업ID
      prjt_id : this.$route.query.prjt_id,   // 프로젝트 ID
      mng_id : this.$route.query.mng_id,     // 결함 ID
      cctn_id : this.$route.query.cctn_id,          // 프로그램ID/테스트케이스ID
      cctn_nm : this.$route.query.cctn_nm,          // 프로그램명/테스트케이스명
      cctn_bzcd : this.$route.query.cctn_bzcd,      // 연결업무구분코드
      cctn_sqn_cd : this.$route.query.cctn_sqn_cd,  // 연결차수구분코드
      atfl_num : '',

      bzcd:[],                                // 업무구분코드

      bzcd_selected : this.$route.query.cctn_bzcd,

      err_tycd:[],                             // 결함유형코드

      err_tycd_selected : '100',

      rgs_dscd:[],                             // 결함등록단계구분코드

      rgs_dscd_selected : this.$route.query.rgs_dscd,

      err_prc_step_cd:[],                      // 결함처리단계구분코드

      err_prc_step_cd_selected :'100' ,

      login_emp_no : sessionStorage.getItem('LOGIN_EMP_NO'),        // 로그인ID
      rgpe_nm : sessionStorage.getItem('LOGIN_EMP_NM'),             // 등록자명
      rgpe_no : sessionStorage.getItem('LOGIN_EMP_NO'),             // 등록자번호
      rgs_dt : this.getToday(),              // 결함등록일자
      err_txt : '',             // 결함내용
      rgs_atfl_nm : '',         // 첨부파일명
      rgs_atfl_mng_id :'',      // 요청첨부파일관리ID
      file_name_list : [],

      ttmn_scd_dt : '',         // 조치예정일자
      dvlpe_nm : '',            // 조치자명
      dvlpe_no :'',             // 조치자번호
      pl_nm : '',               // PL명
      pl_no : '',               // PL번호
      ttmn_dt : '',             // 조치일자
      ttmn_txt : '',            // 조치내용
      ttmn_atfl_nm : '',        // 조치파일명
      ttmn_atfl_mng_id : '',    // 조치첨부파일관리ID
      bfjr_bzcd : '',           // 이관전업무

      org_file_nm : '',         // 원파일명

    }
  },
};

</script>
<style>

</style>