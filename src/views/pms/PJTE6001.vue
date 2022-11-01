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
            <input type="text" :value="reqpe_nm" :disabled="read" style="width:calc(50%); background-color: #f2f2f2;">
            <input type="text" :value="reqpe_no" :disabled="read" style="width:calc(50%); background-color: #f2f2f2;">
          </td>
          <th>
            신청일자
          </th>
          <td>
            <input type="text" :value="req_dt" :disabled="read" ref="req_dt" style="background-color: #f2f2f2;">
          </td>
        </tr>
        <tr>
          <th>신청ID</th>
          <td>
            <input type="text" :value="mng_id" :disabled="read" style="background-color: #f2f2f2;">
          </td>
        </tr>
        </tbody>
      </table>
      <hr>
      <combo
          :comboArray = "this.comboList"
          @req_prc_step_cd_change_pop = "req_prc_step_cd_change"
          @req_dscd_change_pop = "req_dscd_change"
          @bzcd_change_pop = "bzcd_change"
      >
      </combo>
      <table>
        <colgroup>
          <col width="140px">
          <col width="*">
          <col width="140px">
          <col width="*">
        </colgroup>
        <tbody>
        <tr>
          <th style="line-height: 20;">
            신청내용
          </th>
          <td colspan="5">
            <textarea cols="30" rows="10" placeholder="신청내용을 입력해주세요" v-model="req_txt" ref="req_txt"></textarea>
          </td>
        </tr>
        <tr>
          <th>
            처리자
          </th>
          <td colspan="2">
            <div class="input-searchWrap">
              <input type="text" ref="prcpe_nm" v-model="prcpe_nm" placeholder="직원명" style="width: calc(58%);" @keypress.enter="open_pjte9001" >
              <button class="search-btn2" @click="open_pjte9001_btn"></button>
              <input type="text" v-model="prcpe_no" ref="prcpe_no" placeholder="직원번호" style="width: calc(42%); background-color: #f2f2f2;" disabled = true >
            </div>
          </td>
          <th>
            처리일자
          </th>
          <td colspan="2">
            <input type="text" :value="prc_dt" :disabled="read" ref="prc_dt" style="background-color: #f2f2f2;">
          </td>
        </tr>
        <tr>
          <th style="line-height: 23;">
            처리내용
          </th>
          <td colspan="5">
            <textarea cols="30" rows="10" placeholder="" style="width: 100%" v-model="prc_txt" ref="prc_txt"></textarea>
          </td>
        </tr>
        <tr v-if="mng_id">
          <th>첨부파일</th>
          <td colspan="4">
            <input type="text" :disabled="read" :value="org_file_nm">
          </td>
          <th>
            <button class="btn btn-filter-p" @click="open_file_page">첨부</button>
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
import Combo from "@/components/Combo";

// PJTE9002(첨부파일팝업) 팝업 종료시 데이터 받아오는 로직
window.fileData = (fileLists) => {
  window.pms_register.file_name_list = fileLists;
  window.pms_register.atfl_mng_id = fileLists[fileLists.length-1].atfl_mng_id;
}

// PJTE6001(직원조회팝업) 팝업 종료시 데이터 받아오는 로직
window.empData = (empnm, empno) => {
  window.pms_register.prcpe_nm = empnm;
  window.pms_register.prcpe_no = empno;

}

export default {
  created() {
    // 신청일자 데이터 오늘날짜로 세팅
    let today = new Date();
    this.req_dt = today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2)
    // mng_id 가 있으면 기존 데이터 조회
    if(this.mng_id){
      this.getRegisterData();
    }

  },
  components: {
    Combo,
  },
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C1-1"],

      read : true,

      bkup_id : this.$route.query.bkup_id,          // 백업ID
      prjt_id : this.$route.query.prjt_id,          // 프로젝트 ID
      mng_id : this.$route.query.mng_id,            // 신청 ID

      reqpe_nm : sessionStorage.getItem('LOGIN_EMP_NM'),    // 신청자명
      reqpe_no : sessionStorage.getItem('LOGIN_EMP_NO'),    // 신청자 직원번호
      req_dt : '',                                               // 신청일자

      bzcd_selected : '100',                    // 업무
      req_dscd_selected : '100',                // 신청구분
      req_prc_step_cd_selected: '100',          // 처리구분

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
    // Combo.vue 에서 받아온 값
    req_dscd_change(params) {
      this.req_dscd_selected = params
    },
    req_prc_step_cd_change(params) {this.req_prc_step_cd_selected = params},
    bzcd_change(params) {this.bzcd_selected = params},

    //직원조회 버튼 클릭 시
    open_pjte9001_btn(btn_id) {
      let empnm = this.prcpe_nm
      if((empnm === '' || empnm == null || empnm === undefined)) {
        let bkup_id = this.bkup_id, prjt_id =  this.prjt_id
        empnm = ''
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&btn_id=${btn_id}&empnm=${empnm}&`, "open_emp_page", "width=700, height=600");
      } else {
        let bkup_id = this.bkup_id, prjt_id =  this.prjt_id
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      }
    },
    //엔터키를 눌러 직원 조회
    open_pjte9001(event) {
      let empnm = this.prcpe_nm, prjt_id_selected = this.prjt_id, bkup_id_selected = this.bkup_id
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
              // console.log(res_data.contents)
              if (res_data.length == 1) {  // 입력한 직원명으로 조회한 값이 단건일 경우 : 직원번호 바인딩
                this.prcpe_no = res.data.data.contents[0].empno
                this.prcpe_nm = res.data.data.contents[0].empnm
              } else { // 입력한 직원명으로 조회한 값이 여러건일 경우 : PJTE9001 팝업 호출 후 파라미터 값으로 조회
                let bkup_id = this.bkup_id, prjt_id =  this.prjt_id
                window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empnm=${empnm}&`, "open_emp_page", "width=700, height=600");
              }
            })
      } else { // 직원명에 입력한 값이 없을 때 : PJTE9001 팝업 호출
        let bkup_id = this.bkup_id, prjt_id =  this.prjt_id
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&`, "open_emp_page", "width=700, height=600");
      }
      // this.pop = window.open("../PJTE9001/", "open_pjte9001", "width=700, height=600");
    },
    // 직원명 삭제 시 직원번호 초기화
    setNo() {
      if(this.prcpe_nm === "") this.prcpe_no = "";
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
            this.bzcd_selected = res_data.bzcd
            this.req_dscd_selected = res_data.req_dscd
            this.reqpe_nm = res_data.reqpe_nm
            this.reqpe_no = res_data.reqpe_no
            this.req_dt = res_data.req_dt ? res_data.req_dt.substr(0,4)+ '-' +res_data.req_dt.substr(4,2) + '-' + res_data.req_dt.substr(6) : res_data.req_dt
            this.req_prc_step_cd_selected = res_data.req_prc_step_cd
            this.req_txt = res_data.req_txt
            this.prcpe_nm = res_data.prcpe_nm
            this.prcpe_no = res_data.prcpe_no
            this.prc_dt = res_data.prc_dt ? res_data.prc_dt.substr(0,4)+ '-' +res_data.prc_dt.substr(4,2) + '-' + res_data.prc_dt.substr(6) : res_data.prc_dt
            this.prc_txt = res_data.prc_txt
            this.org_file_nm = res_data.org_file_nm
            this.atfl_mng_id = res_data.atfl_mng_id

            // 조회 데이터를 콤보 데이터에 적용
            this.$children[0].$data.bzcd_selected_pop = this.bzcd_selected
            this.$children[0].$data.req_prc_step_cd_selected_pop = this.req_prc_step_cd_selected
            this.$children[0].$data.req_dscd_selected_pop = this.req_dscd_selected
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
            console.log(res.data)
            if(res.data.result){
              alert("저장되었습니다.");
              opener.pmsRegisterData("insert");
              this.open_page(res.data.mng_id)
              // window.close();
            }

          })
    },

    // 저장(mng_id 있는 경우, update 쿼리)
    updateRegisterData() {
      console.log('update')
      console.log(this.prcpe_no)
      if(this.req_prc_step_cd_selected === '200' &&  (this.prcpe_no === '' || this.prcpe_no == null || this.prcpe_no === undefined)){
        alert('처리자를 선택해주세요.')
        this.$refs.prcpe_no.focus();
        return false;
      }

      if(this.req_prc_step_cd_selected === '300' && (this.prc_txt == null || this.prc_txt === '' || this.prc_txt === undefined)){
        alert('보류 선택시에는 처리내용에 보류사유를 작성해주셔야 합니다.');
        this.$refs.prc_txt.focus();
        return false;
      }

      if(this.req_prc_step_cd_selected === '400' && (this.prc_txt == null || this.prc_txt === '' || this.prc_txt === undefined)){
        alert('처리완료 선택시에는 처리내용을 작성해주셔야 합니다.');
        this.$refs.prc_txt.focus();
        return false;
      }

      axiosService.post('/PJTE6001/update',{
        bzcd: this.bzcd_selected,
        req_dscd : this.req_dscd_selected,
        req_dt : this.req_dt.split('-').join(''),
        reqpe_no : this.reqpe_no,
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
              opener.pmsRegisterData("update");
              // window.close();
            }
          })
    }

  },
  mounted() {
    if(this.mng_id == null || this.mng_id === '' || this.mng_id === undefined){
      this.$children[0].$data.req_dscd_selected_pop = '100'
    }
    this.$children[0].$data.req_prc_step_cd_selected_pop = this.req_prc_step_cd_selected
    this.$children[0].$data.bzcd_selected_pop = this.bzcd_selected
    window.pms_register = this;
  },
  updated(){
    // 100, 200 권한에 따른 구분함수
    // 개발자 : 100, PL : 200
    this.setNo();
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