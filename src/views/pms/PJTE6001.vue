<template>
  <!--  -->
  <section class="popup">
    <div class="pop-header">
      <h1>PMS 신청등록</h1>
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
          <th>신청자</th>
          <td>
            <input type="text" :value="reqpe_nm" :disabled="read" style="width: 48.9%">
            &nbsp;
            <input type="text" :value="reqpe_no" :disabled="read" style="width: 48.9%">
          </td>
          <th>
            신청일자
          </th>
          <td>
            <div class="input-dateWrap">
              <input type="date" :value="req_dt" :disabled="read" ref="req_dt">
            </div>
          </td>
        </tr>
        <tr>
          <th>신청ID</th>
          <td>
            <input type="text" :value="mng_id" :disabled="read">
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
          <th></th>
          <td></td>
        </tr>
        <tr>
          <th>신청구분</th>
          <td>
            <select ref="req_dscd" v-model="req_dscd_selected">
              <option
                  v-for   = "(req_dscd,idx) in req_dscd"
                  :key    ="idx"
                  v-text  ="req_dscd.text"
                  :value  ="req_dscd.value"
              ></option>
            </select>
          </td>
          <th>
            처리구분
          </th>
          <td>
            <select v-model="req_prc_step_cd_selected">
              <option
                  v-for   = "(req_prc_step_cd,idx) in req_prc_step_cd"
                  :key    ="idx"
                  v-text  ="req_prc_step_cd.text"
                  :value  ="req_prc_step_cd.value"
              ></option>
            </select>
          </td>
        </tr>
        <tr>
          <th style="line-height: 20;">
            신청내용
          </th>
          <td colspan="3">
            <textarea cols="30" rows="10" placeholder="신청내용을 입력해주세요" v-model="req_txt" ref="req_txt"></textarea>
          </td>
        </tr>
        </tbody>
      </table>
      <table>
        <colgroup>
          <col width="140px">
          <col width="*">
          <col width="140px">
          <col width="*">
        </colgroup>
        <tbody>
        <tr>
          <th style="line-height: 23;">
            처리내용
          </th>
          <td colspan="3">
            <table>
              <tr>
                <th>
                  처리자
                </th>
                <td style="width:100px">
                  <input type="text"
                         placeholder="직원명"
                         id="id.crpe_nm"
                         v-model="prcpe_nm"
                         style="width: 80px"
                  >

                </td>
                <td style="width: 20px">
                  <div class="input-searchWrap" style="width:15px">
                    <button class="search-btn"
                            id="btn.crpe"
                            @click="open_pjte9001"
                    ></button>
                  </div>
                </td>
                <td>
                  <input type="text"
                         placeholder="직원번호"
                         id="id.crpe_no"
                         style="width: 80px; background-color: #f2f2f2;"
                         v-model="prcpe_no"
                         :disabled = true
                  >

                </td>
<!--                <td>-->
<!--                  <input type="text" v-model="prcpe_nm"/>-->
<!--                </td>-->
<!--                <td>-->
<!--                  <button class="btn btn-filter-p">조회</button>-->
<!--                </td>-->
<!--                <td>-->
<!--                  <input type="text" v-model="prcpe_no" :disabled="read"/>-->
<!--                </td>-->
                <th>
                  처리일자
                </th>
                <td>
                  <div class="input-dateWrap">
                    <input type="date" :value="prc_dt">
                  </div>
                </td>
              </tr>
            </table>
            <textarea cols="30" rows="10" placeholder="" style="width: 100%" v-model="prc_txt" ref="prc_txt"></textarea>
          </td>
        </tr>
        <tr v-if="mng_id">
          <th>첨부파일</th>
          <td>
              <input type="text" :disabled="read" :value="org_file_nm">
          </td>
          <th>
            <button class="btn btn-filter-p" @click="open_file_page">첨부</button>
          </th>
        </tr>
        <tr v-else>
          <th>첨부파일</th>
          <td>
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

window.fileData = (fileLists) => {
  console.log(fileLists);
  window.pms_register.file_name_list = fileLists;
}

export default {
  created() {
    let today = new Date();
    this.req_dt = today.getFullYear() + '-' + ('0' + today.getMonth()+1).slice(-2) + '-' + ('0' + today.getDate()).slice(-2)
    if(this.mng_id){
      this.getRegisterData();
    }

  },
  data() {
    return {
      read : true,

      bkup_id : this.$route.query.bkup_id,          // 백업ID
      prjt_id : this.$route.query.prjt_id,          // 프로젝트 ID
      mng_id : this.$route.query.mng_id,            // 신청 ID

      reqpe_nm : sessionStorage.getItem('LOGIN_EMP_NM'),    // 신청자명
      reqpe_no : sessionStorage.getItem('LOGIN_EMP_NO'),    // 신청자 직원번호
      req_dt : '',                                               // 신청일자

      bzcd:[
        {	text:"전체", 	value:'TTT'},
        {	text:"신용", 	value:'AAA'},
        {	text:"재무제표", 	value:"BBB"},
        {	text:"신용평가", 	value:"CCC"},
      ],                           // 업무
      bzcd_selected : 'TTT',
      req_dscd : [
        {	text:"전체", 	value:'TTT'},
        {	text:"개발현황관련", 	value:'100'},
        {	text:"통합테스트관련", 	value:"200"},
        {	text:"PMS오류관련", 	value:'400'},
        {	text:"DB관련", 	value:'500'},
        {	text:"기타", 	value:"600"},
      ],                          // 신청구분
      req_dscd_selected : 'TTT',
      req_prc_step_cd : [
        {	text:"전체", 	value:'TTT'},
        {	text:"요청", 	value:'100'},
        {	text:"담당자배정", 	value:"200"},
        {	text:"보류", 	value:"300"},
        {	text:"처리완료", 	value:'400'},
      ],                          // 처리구분
      req_prc_step_cd_selected: 'TTT',
      req_txt : '',               // 신청내용
      prcpe_nm : '',              // 처리자명
      prcpe_no : '',              // 처리자 직원번호
      prc_dt:'',                  // 처리일자
      prc_txt : '',               // 처리내용
      file_name_list : [],
      org_file_nm : '',           // 원파일명
      atfl_mng_id : ''            // 첨부파일관리 ID


    };
  },
  watch: {
    file_name_list() {
      // 1. 첨부파일 1개만 보여줄 때
      this.org_file_nm = this.file_name_list[0].org_file_nm

      // 2. 첨부파일 모두 보여줄 때
      // this.file_name_list.map(e => {
      //   if(this.org_file_nm === ''){
      //     this.org_file_nm += e.org_file_nm
      //   }else{
      //     this.org_file_nm += ' / ' + e.org_file_nm
      //   }
      // })
    },
  },
  methods: {
    // 직원 조회 팝업
    open_pjte9001(event) {
      const targetId = event.currentTarget.id;
      this.pop = window.open("../PJTE9001/", targetId, "width=700, height=600");
    },
    // 첨부파일등록 팝업 오픈
    open_file_page(){
      let bkup_id='0000000000', prjt_id=this.prjt_id, atfl_mng_id=this.atfl_mng_id, file_rgs_dscd='500', mng_id = this.mng_id
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&mng_id=${mng_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
    },

    // mng_id 없이 저장했을 때, mng_ig 파라미터로 하여 새 페이지 오픈(첨부파일등록 보여주기 위함)
    open_page(mng_id){
      if(mng_id == null || mng_id==='' || mng_id === undefined) mng_id=''
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem('LOGIN_PROJ_ID')
      this.pop = window.open(`../PJTE6001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&mng_id=${mng_id}&`, "open_page", "width=1000, height=800");
    },

    // 창 닫기
    close() {
      window.close();
    },

    // 데이터 조회
    getRegisterData() {
      axiosService.get("/PJTE6001/select",{
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
        // this.req_dscd_selected = '300'  // 테스트용
        this.req_dscd_selected = res_data.req_dscd
        // this.req_prc_step_cd_selected = '400';    // 테스트용
        this.req_prc_step_cd_selected = res_data.req_prc_step_cd
        this.req_txt = res_data.req_txt
        this.prcpe_nm = res_data.prcpe_nm
        this.prcpe_no = res_data.prcpe_no
        this.prc_dt = res_data.prc_dt ? res_data.prc_dt.substr(0,4)+ '-' +res_data.prc_dt.substr(4,2) + '-' + res_data.prc_dt.substr(6) : res_data.prc_dt
        this.prc_txt = res_data.prc_txt
        this.org_file_nm = res_data.org_file_nm
        this.atfl_mng_id = res_data.atfl_mng_id
      })
    },

    // 저장(신청 ID 없는 경우, insert 쿼리)
    saveRegisterData() {
      if(this.bzcd_selected === '' || this.bzcd_selected == null || this.bzcd_selected === undefined){
        alert('업무를 선택해주세요.');
        this.$refs.bzcd.focus();
        return false;
      }
      if(this.req_dscd_selected === '' || this.req_dscd_selected == null || this.req_dscd_selected === undefined){
        alert('신청구분을 선택해주세요.')
        this.$refs.req_dscd.focus();
        return false;
      }
      if(this.req_txt === '' || this.req_txt == null || this.req_txt === undefined){
        alert('신청내용을 작성해주세요.')
        this.$refs.req_txt.focus();
        return false;
      }
      if(this.req_dt === '' || this.req_dt == null || this.req_dt === undefined){
        alert('신청일자를 선택해주세요.')
        this.$refs.req_dt.focus();
        return false;
      }
      axiosService.post('/PJTE6001/insert',{
        bkup_id : this.bkup_id,
        bzcd : this.bzcd_selected,
        prjt_id : this.prjt_id,
        req_dscd : this.req_dscd_selected,
        reqpe_no : this.reqpe_no,
        // req_dt : this.req_dt,
        req_txt : this.req_txt,
        login_emp_no : sessionStorage.getItem('LOGIN_EMP_NO')

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
      if(this.req_prc_step_cd_selected === '400' && (this.prc_txt == null || this.prc_txt === '' || this.prc_txt === undefined)){
        alert('처리완료 선택시에는 처리내용을 작성해주셔야 합니다.');
        this.$refs.prc_txt.focus();
        return false;
      }
      axiosService.post('/PJTE6001/update',{
        bzcd: this.bzcd_selected,
        req_dscd : this.req_dscd_selected,
        req_dt : this.req_dt.split('-').join(''),
        req_txt : this.req_txt,
        prcpe_no : this.prcpe_no,
        req_prc_step_cd : this.req_prc_step_cd_selected,
        prc_txt : this.prc_txt,
        login_emp_no : sessionStorage.getItem('LOGIN_EMP_NO'),
        bkup_id : '0000000000',
        prjt_id : this.prjt_id,
        mng_id : this.mng_id
      })
      .then(res => {
        console.log(res);
        if(res.data){
          alert("저장되었습니다.");
          window.close();
        }
      })
    }

  },
  mounted() {
    window.pms_register = this;
  },
  beforeDestroy() {
  },
};
</script>

<style>
th {
  text-align: center;
}
</style>