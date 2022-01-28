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
                            <input type="text" v-model="cctn_id" :disabled= true style="width: calc(100%); float:left; background-color: #f2f2f2;">
                        </td>
                        <th>프로그램/테스트케이스명</th>
                        <td colspan="2">
                            <input type="text" v-model="cctn_nm" :disabled= true style="background-color: #f2f2f2;">
                        </td>
                    </tr>
                    <tr>
                      <th>결함등록자</th>
                      <td>
                        <input type="text" v-model="rgpe_nm" :disabled= true style="width: 73px; background-color: #f2f2f2;">
                        <input type="text" v-model="rgpe_no" :disabled= true style="width: 73px; background-color: #f2f2f2;">
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
                    <tr v-if="mng_id">
                        <th>
                            결함내용
                        </th>
                        <td colspan="5">
                            <textarea cols="30" rows="10" v-model="err_txt" disabled = true  style="background-color: #f2f2f2;"></textarea>
                        </td>
                    </tr>
                    <tr v-else>
                      <th>
                        결함내용
                      </th>
                      <td colspan="5">
                        <textarea cols="30" rows="10" v-model="err_txt" placeholder="결함내용을 입력해주세요"></textarea>
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
                            <input type="date" v-model="ttmn_scd_dt">
                          </div>
                        </td>
                    </tr>
                    <tr>
                        <th>
                          조치담당자
                        </th>
                        <td>
                          <div class="input-searchWrap">
                            <input type="text" v-model="dvlpe_nm" placeholder="직원명" style="width: 92px;" disabled >
                            <button class="search-btn2" onclick="alert('open : search-modal')"></button>
                            <input type="text" v-model="dvlpe_no"  placeholder="직원번호" style="width: 64px; background-color: #f2f2f2;" disabled >
                          </div>
                        </td>
                        <th>
                            업무PL
                        </th>
                        <td>
                            <div class="input-searchWrap">
                              <input type="text" v-model="pl_nm" placeholder="직원명" style="width: 92px;" disabled >
                              <button class="search-btn2" onclick="alert('open : search-modal')"></button>
                              <input type="text" v-model="pl_no"  placeholder="직원번호" style="width: 64px; background-color: #f2f2f2;" disabled >
                            </div>
                        </td>
                        <th>　　조치일자</th>
                        <td>
                          <div class="input-dateWrap">
                            <input type="date" v-model="ttmn_dt">
                          </div>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            조치내용
                        </th>
                        <td colspan="5">
                            <textarea cols="30" rows="10" placeholder="조치내용을 입력해주세요"  v-model="ttmn_txt"></textarea>
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

window.fileData = (fileLists, num) => {
  console.log(fileLists);
  window.pms_register.file_name_list = fileLists;
  window.pms_register.atfl_num = num
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
    console.log("beforeCreate");
  },
// 화면 동작 시 제일 처음 실행되는 부분
// 변수 초기화
  created() {
    console.log("created");
    if(this.mng_id){
      this.getRegisterData();
    }
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
    window.pms_register = this;
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

  },
// 일반적인 함수를 선언하는 부분
  methods: {
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
    // 첨부파일등록 팝업 오픈
    open_file_page(num){
      console.log(num)
      let bkup_id='0000000000', prjt_id=this.prjt_id, rgs_atfl_mng_id=this.rgs_atfl_mng_id, file_rgs_dscd='500', mng_id = this.mng_id
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&rgs_atfl_mng_id=${rgs_atfl_mng_id}&mng_id=${mng_id}&file_rgs_dscd=${file_rgs_dscd}&num=${num}`, "open_file_page", "width=1000, height=800");
    },
    // 창 닫기
    close() {
      window.close();
    },

    // 데이터 조회
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
            console.log(res_data)
            this.bzcd_selected = res_data.bzcd
            this.err_tycd_selected = res_data.err_tycd
            this.rgs_dscd_selected = res_data.rgs_dscd
            this.err_prc_step_cd_selected = res_data.err_prc_step_cd
            this.cctn_id = res_data.cctn_id
            this.cctn_nm = res_data.cctn_nm
            this.rgpe_nm = res_data.rgpe_nm
            this.rgpe_no = res_data.rgpe_no
            this.rgs_dt = this.getFormatDate(res_data.rgs_dt)
            this.err_txt = res_data.err_txt
            this.rgs_atfl_nm = res_data.rgs_atfl_nm
            this.rgs_atfl_mng_id = res_data.rgs_atfl_mng_id
            this.ttmn_scd_dt = this.getFormatDate(res_data.ttmn_scd_dt)
            this.dvlpe_nm = res_data.dvlpe_nm
            this.dvlpe_no = res_data.dvlpe_no
            this.pl_nm = res_data.pl_nm
            this.pl_no = res_data.pl_no
            this.ttmn_dt = this.getFormatDate(res_data.ttmn_dt)
            this.ttmn_txt = res_data.ttmn_txt
            this.ttmn_atfl_nm = res_data.ttmn_atfl_nm
            this.ttmn_atfl_mng_id = res_data.ttmn_atfl_mng_id
            this.bfjr_bzcd = res_data.bfjr_bzcd
            this.cctn_bzcd = res_data.cctn_bzcd
            this.cctn_sqn_cd = res_data.cctn_sqn_cd
          })
    },

    // 저장(신청 ID 없는 경우, insert 쿼리)
    saveRegisterData() {
      // if(this.bzcd_selected === '' || this.bzcd_selected == null || this.bzcd_selected === undefined){
      //   alert('업무를 선택해주세요.');
      //   this.$refs.bzcd.focus();
      //   return false;
      // }
      // if(this.req_dscd_selected === '' || this.req_dscd_selected == null || this.req_dscd_selected === undefined){
      //   alert('신청구분을 선택해주세요.')
      //   this.$refs.req_dscd.focus();
      //   return false;
      // }
      // if(this.req_txt === '' || this.req_txt == null || this.req_txt === undefined){
      //   alert('신청내용을 작성해주세요.')
      //   this.$refs.req_txt.focus();
      //   return false;
      // }
      // if(this.req_dt === '' || this.req_dt == null || this.req_dt === undefined){
      //   alert('신청일자를 선택해주세요.')
      //   this.$refs.req_dt.focus();
      //   return false;
      // }
      axiosService.post('/PJTE3001/insert',{
        bkup_id : this.bkup_id,                                        // 백업ID
        prjt_id : this.prjt_id,                                        // 프로젝트ID
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
        ttmn_scd_dt : this.getUnFormatDate(this.ttmn_scd_dt),          // 조치예정일자
        dvlpe_nm : this.dvlpe_nm,                                      // 조치자명
        dvlpe_no : this.dvlpe_no,                                      // 조치자번호
        pl_nm : this.pl_nm,                                            // PL명
        pl_no : this.pl_no,                                            // PL번호
        ttmn_dt : this.getUnFormatDate(this.ttmn_dt),                  // 조치일자
        ttmn_txt : this.ttmn_txt,                                      // 조치내용

        bfjr_bzcd : this.bfjr_bzcd,                                    // 이관전업무
        cctn_bzcd : this.cctn_bzcd,                                    // 연결업무구분코드
        cctn_sqn_cd : this.cctn_sqn_cd,                                // 연결차수구분코드

      })
          .then(res => {
            console.log(res);
            if(res.data){
              alert("저장되었습니다.");
              window.close();
            }

          })
    },

    // 저장(mng_id 있는 경우, update 쿼리)
    updateRegisterData() {
      console.log('update')
      console.log(this.prcpe_no)
      // if(this.req_prc_step_cd_selected === '400' && (this.prc_txt == null || this.prc_txt === '' || this.prc_txt === undefined)){
      //   alert('처리완료 선택시에는 처리내용을 작성해주셔야 합니다.');
      //   this.$refs.prc_txt.focus();
      //   return false;
      // }
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
        rgs_dt : this.getUnFormatDate(this.rgs_dt),                    // 결함등록일자

        err_tycd : this.err_tycd_selected,                             // 결함유형코드
        rgs_dscd : this.rgs_dscd_selected,                             // 결함등록단계구분코드
        err_txt : this.err_txt,                                        // 결함내용
        rgs_atfl_nm : this.rgs_atfl_nm,                                // 첨부파일명
        rgs_atfl_mng_id : this.rgs_atfl_mng_id,                        // 요청첨부파일관리ID

        bzcd : this.bzcd_selected,                                     // 업무구분코드
        err_prc_step_cd : this.err_prc_step_cd_selected,               // 결함처리단계구분코드
        ttmn_scd_dt : this.getUnFormatDate(this.ttmn_scd_dt),          // 조치예정일자
        dvlpe_nm : this.dvlpe_nm,                                      // 조치자명
        dvlpe_no : this.dvlpe_no,                                      // 조치자번호
        pl_nm : this.pl_nm,                                            // PL명
        pl_no : this.pl_no,                                            // PL번호
        ttmn_dt : this.getUnFormatDate(this.ttmn_dt),                  // 조치일자
        ttmn_txt : this.ttmn_txt,                                      // 조치내용
        ttmn_atfl_nm : this.ttmn_atfl_nm,                              // 조치파일명
        ttmn_atfl_mng_id : this.ttmn_atfl_mng_id,                      // 조치첨부파일관리ID

        bfjr_bzcd : this.bfjr_bzcd,                                    // 이관전업무
        cctn_bzcd : this.cctn_bzcd,                                    // 연결업무구분코드
        cctn_sqn_cd : this.cctn_sqn_cd,                                // 연결차수구분코드
      })
          .then(res => {
            console.log(res);
            if(res.data){
              alert("저장되었습니다.");
              opener.parent.location.reload();
              window.close();
            }
          })
    }


  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{
    count: (a, b) => {
      console.log("count의 값이 변경되면 여기도 실행");
      console.log("new Value :: " + a);
      console.log("old Value :: " + b);
    },
    file_name_list() {
      // 1. 첨부파일 1개만 보여줄 때
      // if(document.getElementById('file-upload-btn')){
      //   this.rgs_atfl_nm = this.file_name_list[0].org_file_nm
      // }
      // if(document.getElementById('file-upload-btn2')){
      //   this.ttmn_atfl_nm = this.file_name_list[0].org_file_nm
      // }
      if(this.atfl_num == '1'){
        this.rgs_atfl_nm = this.file_name_list[0].org_file_nm
      }else if(this.atfl_num == '2'){
        this.ttmn_atfl_nm = this.file_name_list[0].org_file_nm
      }


      // 2. 첨부파일 모두 보여줄 때
      // this.file_name_list.map(e => {
      //   if(this.rgs_atfl_nm === ''){
      //     this.rgs_atfl_nm += e.rgs_atfl_nm
      //   }else{
      //     this.rgs_atfl_nm += ' / ' + e.rgs_atfl_nm
      //   }
      // })
    },
  },
// 변수 선언부분
  data() {
    return {
      // bkup_id : '0000000000',   // 백업ID
      // prjt_id : '1000000001',   // 프로젝트 ID
      // mng_id : 'E100000000',     // 결함 ID
      bkup_id : this.$route.query.bkup_id,   // 백업ID
      prjt_id : this.$route.query.prjt_id,   // 프로젝트 ID
      mng_id : this.$route.query.mng_id,     // 결함 ID
      cctn_id : this.$route.query.cctn_id,      // 프로그램ID/테스트케이스ID
      cctn_nm : this.$route.query.cctn_nm,      // 프로그램명/테스트케이스명
      atfl_num : '',

      bzcd:[                                 // 업무구분코드
        {	text:"신용", 	value:'AAA'},
        {	text:"재무제표", 	value:"BBB"},
        {	text:"신용평가", 	value:"CCC"},
      ],
      bzcd_selected : 'AAA',

      err_tycd:[                             // 결함유형코드
        {	text:"결함", 	value:'100'},
        {	text:"개선", 	value:"200"},
        {	text:"결함아님", 	value:"300"},
        {	text:"기타결함", 	value:"900"},
      ],
      err_tycd_selected : '100',

      rgs_dscd:[                             // 결함등록단계구분코드
        {	text:"단위테스트단계", 	value:'1100'},
        {	text:"1차통합테스트단계", 	value:"2100"},
        {	text:"2차통합테스트단계", 	value:"2200"},
        {	text:"3차통합테스트단계", 	value:"2300"},
        {	text:"4차통합테스트단계", 	value:"2400"},
      ],
      rgs_dscd_selected : '1100',

      err_prc_step_cd:[                      // 결함처리단계구분코드
        {	text:"등록", 	value:'100'},
        {	text:"담당자배정", 	value:"200"},
        {	text:"결함재등록", 	value:"300"},
        {	text:"이관", 	value:"400"},
        {	text:"보류", 	value:"500"},
        {	text:"개발자조치완료", 	value:"600"},
        {	text:"PL확인", 	value:"700"},
        {	text:"등록자확인", 	value:"800"},
      ],
      err_prc_step_cd_selected : '100',

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
      cctn_bzcd : '',           // 연결업무구분코드
      // cctn_id : '',          // 연결ID
      cctn_sqn_cd : '',         // 연결차수구분코드

      org_file_nm : '',         // 원파일명

    }
  },
};

</script>
<style>

</style>