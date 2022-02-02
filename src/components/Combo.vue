<template>
  <div style="display:inline;">
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C0'">
      <div class="item-con">프로젝트명
        <select
            v-model = "prjt_nm_selected"
            style   = "width: 180px"
            :disabled="read"
            @change="prjt_nm_chage"
        >
          <option
              v-for  = "(prjt_nm, idx) in CD0000000000T"
              :key   = "idx"
              v-text = "prjt_nm.text"
              :value = "prjt_nm.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C27'">
      <div class="item-con">백업ID
        <select
            v-model = "bkup_id_selected"
            style   = "width: 167px"
            @change = "bkup_id_change"
        >
          <option
              v-for  = "(bkup_id, idx) in CD1000000027T"
              :key   = "idx"
              v-text = "bkup_id.text"
              :value = "bkup_id.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C1'">
      <div class="item-con">업무구분
        <select
            v-model = "bzcd_selected"
            style   = "width: 110px"
            @change = "bzcd_change"
            :disabled="read"
        >
          <option
              v-for  = "(bzcd, idx) in CD1000000001T"
              :key   = "idx"
              v-text = "bzcd.text"
              :value = "bzcd.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C2'">
      <div class="item-con">개발구분
        <select
            v-model = "dvlp_dis_cd_selected"
            style   = "width: 94px"
            @change = "dvlp_dis_cd_change"
        >
          <option
              v-for  = "(dvlp_dis_cd, idx) in CD1000000002T"
              :key   = "idx"
              v-text = "dvlp_dis_cd.text"
              :value = "dvlp_dis_cd.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C6'">
      <div class="item-con">차수
        <select
            v-model = "sqn_cd_selected"
            style   = "width: 80px"
            @change = "sqn_cd_change"
        >
          <option
              v-for  = "(sqn_cd, idx) in CD1000000006T"
              :key   = "idx"
              v-text = "sqn_cd.text"
              :value = "sqn_cd.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C26'">
      <div class="item-con">처리단계
        <select
            v-model = "itg_tst_prc_cd_selected"
            style   = "width: 100px"
            @change = "itg_tst_prc_cd_change"
        >
          <option
              v-for  = "(itg_tst_prc_cd, idx) in CD1000000026T"
              :key   = "idx"
              v-text = "itg_tst_prc_cd.text"
              :value = "itg_tst_prc_cd.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   관리구분코드 -->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C12'">
      <div class="item-con">관리구분
        <select
            v-model="mng_cd_selected"
            style="width: 120px"
        >
          <option
              v-for="(mng_cd, idx) in CD1000000012T"
              :key="idx"
              v-text="mng_cd.text"
              :value="mng_cd.value"
          ></option>
        </select>
      </div>
    </li>
    <!--    개발구분코드-->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C3'">
      <div class="item-con">처리단계
        <select
            v-model = "prc_step_cd_selected"
            style   = "width: 80px"
            @change = "prc_step_cd_change"
        >
          <option
              v-for  = "(prc_step_cd, idx) in CD1000000003T"
              :key   = "idx"
              v-text = "prc_step_cd.text"
              :value = "prc_step_cd.value"
          ></option>
        </select>
      </div>
    </li>
    <!--    프로그램구분코드-->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C4'">
      <div class="item-con">프로그램구분
        <select
            v-model = "pgm_dis_cd_selected"
            style   = "width: 80px"
            @change = "pgm_dis_cd_change"
        >
          <option
              v-for  = "(pgm_dis_cd, idx) in CD1000000004T"
              :key   = "idx"
              v-text = "pgm_dis_cd.text"
              :value = "pgm_dis_cd.value"
          ></option>
        </select>
      </div>
    </li>
    <!--  결함처리단계구분코드  -->
    <li class="item-con" v-for="item in this.comboList" :key="item.id" v-if="item === 'C9'">
      <div class="filter-item" >처리상태
        <select
            v-model="err_prc_step_cd_selected"
            style="width: 120px"
        >
          <option
              v-for="(err_prc_step_cd, idx) in CD1000000009T"
              :key="idx"
              v-text="err_prc_step_cd.text"
              :value="err_prc_step_cd.value"
          ></option>
        </select>
      </div>
    </li>
    <!--신청 구분 코드-->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C10'">
      <div class="item-con">신청구분
        <select
            v-model = "req_dscd_selected"
            style   = "width: 80px"
            @change = "req_dscd_change"
        >
          <option
              v-for  = "(req_dscd, idx) in CD1000000010T"
              :key   = "idx"
              v-text = "req_dscd.text"
              :value = "req_dscd.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   신청 처리 단계 구분코드-->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C11'">
      <div class="item-con">처리상태
        <select
            v-model = "req_prc_step_cd_selected"
            style   = "width: 80px"
            @change = "req_prc_step_cd_change"
        >
          <option
              v-for  = "(req_prc_step_cd, idx) in CD1000000011T"
              :key   = "idx"
              v-text = "req_prc_step_cd.text"
              :value = "req_prc_step_cd.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   신청 처리 단계 구분코드-->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C19'">
      <div class="item-con">처리상태
        <select
            v-model = "wbs_mng_cd_selected"
            style   = "width: 80px"
            @change = "wbs_mng_cd_change"
        >
          <option
              v-for  = "(wbs_mng_cd, idx) in CD1000000019T"
              :key   = "idx"
              v-text = "wbs_mng_cd.text"
              :value = "wbs_mng_cd.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   WBS관리구분코드 -->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C35'">
      <div class="item-con">진행상태
        <select
            v-model="wbs_prc_sts_cd_selected"
            style="width: 120px"
            @change = "wbs_prc_sts_cd_change"
        >
          <option
              v-for="(wbs_prc_sts_cd, idx) in CD1000000035T"
              :key="idx"
              v-text="wbs_prc_sts_cd.text"
              :value="wbs_prc_sts_cd.value"
          ></option>
        </select>
      </div>
    </li>
  </div>

</template>

<script>
import {axiosService} from "@/api/http"; // Date-picker 스타일적용
import {mapActions} from 'vuex'

export default {
  name: "combo",
  props: {
    comboArray: Array,
  },
  mounted () {
    this.init()
  },
  data() {
    return {
      // 조회 조건(콤보박스) - 공통
      // T : 검색조건, N : 그리드
      CD0000000000T : [],  CD0000000000N : [],
      CD1000000001T : [],  CD1000000001N : [],
      CD1000000002T : [],  CD1000000002N : [],
      CD1000000003T : [],  CD1000000003N : [],
      CD1000000004T : [],  CD1000000004N : [],
      CD1000000005T : [],  CD1000000005N : [],
      CD1000000006T : [],  CD1000000006N : [],
      CD1000000007T : [],  CD1000000007N : [],
      CD1000000008T : [],  CD1000000008N : [],
      CD1000000009T : [],  CD1000000009N : [],
      CD1000000010T : [],  CD1000000010N : [],
      CD1000000011T : [],  CD1000000011N : [],
      CD1000000012T : [],  CD1000000012N : [],
      CD1000000013T : [],  CD1000000013N : [],
      CD1000000014T : [],  CD1000000014N : [],
      CD1000000015T : [],  CD1000000015N : [],
      CD1000000016T : [],  CD1000000016N : [],
      CD1000000017T : [],  CD1000000017N : [],
      CD1000000018T : [],  CD1000000018N : [],
      CD1000000019T : [],  CD1000000019N : [],
      CD1000000020T : [],  CD1000000020N : [],
      CD1000000021T : [],  CD1000000021N : [],
      CD1000000022T : [],  CD1000000022N : [],
      CD1000000023T : [],  CD1000000023N : [],
      CD1000000024T : [],  CD1000000024N : [],
      CD1000000025T : [],  CD1000000025N : [],
      CD1000000026T : [],  CD1000000026N : [],
      CD1000000027T : [],  CD1000000027N : [],
      CD1000000028T : [],  CD1000000028N : [],
      CD1000000029T : [],  CD1000000029N : [],
      CD1000000030T : [],  CD1000000030N : [],
      CD1000000031T : [],  CD1000000031N : [],
      CD1000000032T : [],  CD1000000032N : [],
      CD1000000033T : [],  CD1000000033N : [],
      CD1000000034T : [],  CD1000000034N : [],
      CD1000000035T : [],  CD1000000035N : [],

      comboList: this.comboArray,
      code_it : [],
      cd_all : [],
      row : 0,
      set_yn : "",
      read : true,

      // 백업ID
      bkup_id_selected : "",
      bkup_id : "",
      // 프로젝트명
      prjt_nm_selected : "",
      prjt_nm : "",
      // 업무구분
      bzcd_selected : "",
      bzcd : "",
      bzcd_n : [],
      // 프로그램구분
      pgm_dis_cd_selected : "",
      pgm_dis_cd : "",
      // 개발구분
      dvlp_dis_cd_selected : "",
      dvlp_dis_cd : "",
      // 처리단계
      prc_step_cd_selected : "",
      prc_step_cd : "",
      // 차수
      sqn_cd_selected : "",
      sqn_cd : "",
      // 통합테스트 처리단계
      itg_tst_prc_cd_selected : "",
      itg_tst_prc_cd : "",
      // 결함 처리 단계
      err_prc_step_cd_selected : "",
      // 관리구분
      rgs_dis_cd_selected : "",
      // 요청구분
      req_dis_cd_selected : "",
      //신청구분
      req_dscd_selected:"",
      req_dscd:"",
      //처리상태
      req_prc_step_cd_selected:"",
      req_prc_step_cd:"",
      //관리구분
      mng_cd_selected:"",
      mng_cd:"",
      //WBS_진행상태
      wbs_prc_sts_cd_selected:"",
      wbs_prc_sts_cd:"",
      //WBS_관리구분
      wbs_mng_cd_selected:"",
      wbs_mng_cd:"",
    }
  },
  methods: {
    ...mapActions("pms",["SET_COMBO"]),
    async setTest(){
      try {
        await this.SET_COMBO(this.cd_all)

      } catch(error) {
        console.log("Error Msg : " + error)
        // 개발용
      }
    },
    bzcd_change()              {  this.$emit('bzcd_change',             this.bzcd_selected)},              // 업무구분코드
    dvlp_dis_cd_change()       {  this.$emit('dvlp_dis_cd_change',      this.dvlp_dis_cd_selected)},       // 개발구분코드
    pgm_dis_cd_change()        {  this.$emit('pgm_dis_cd_change',       this.pgm_dis_cd_selected)},        // 프로그램구분코드
    prc_step_cd_change()       {  this.$emit('prc_step_cd_change',      this.prc_step_cd_selected)},       // 처리단계코드
    bkup_id_change()           {  this.$emit('bkup_id_change',          this.bkup_id_selected)},           // 백업 ID
    prjt_nm_chage()            {  this.$emit('prjt_nm_chage',           this.prjt_nm_selected)},           // 프로젝트명
    sqn_cd_change()            {  this.$emit('sqn_cd_change',           this.sqn_cd_selected)},            // 차수구분코드
    itg_tst_prc_cd_change()    {  this.$emit('itg_tst_prc_cd_change',   this.itg_tst_prc_cd_selected)},    // 통합테스트 처리구분코드
    req_dscd_change()          {  this.$emit('req_dscd_change',         this.req_dscd_selected)},          // 신청구분코드
    req_prc_step_cd_change()   {  this.$emit('req_prc_step_cd_change',  this.req_prc_step_cd_selected)},   // 신청처리단계구분코드
    wbs_prc_sts_cd_change()    {  this.$emit('wbs_prc_sts_cd_change',   this.wbs_prc_sts_cd_selected)},    // WBS 진행상태코드
    wbs_mng_cd_change()        {  this.$emit('wbs_mng_cd_change',       this.wbs_mng_cd_selected)},        // WBS 관리구분코드

    setCombo(data) {

      for(let i=0; i<this.code_it.length; i++) {
        this.set_yn = "N";
        this.row = 0;

        for (let z = 0; z < data.length; z++) {
          if (this.code_it[i] === data[z].GRP_TYCD) {
            if(this.row === 0) {
              if (i === 1) {
                this.CD1000000001T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000001N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 2) {
                this.CD1000000002T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000002N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 3) {
                this.CD1000000003T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000003N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 4) {
                this.CD1000000004T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000004N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 5) {
                this.CD1000000005T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000005N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 6) {
                this.CD1000000006T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000006N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 7) {
                this.CD1000000007T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000007N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 8) {
                this.CD1000000008T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000008N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 9) {
                this.CD1000000009T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000009N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 10) {
                this.CD1000000010T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000010N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 11) {
                this.CD1000000011T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000011N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 12) {
                this.CD1000000012T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000012N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 13) {
                this.CD1000000013T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000013N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 19) {
                this.CD1000000019T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000019N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 26) {
                this.CD1000000026T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000026N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 35) {
                this.CD1000000035T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000035N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              }
            }
            if(i === 0) {
              this.CD0000000000T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD0000000000N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 1) {
              this.CD1000000001T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000001N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 2) {
              this.CD1000000002T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000002N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 3) {
              this.CD1000000003T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000003N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 4) {
              this.CD1000000004T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000004N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 5) {
              this.CD1000000005T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000005N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 6) {
              this.CD1000000006T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000006N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 7) {
              this.CD1000000007T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000007N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 8) {
              this.CD1000000008T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000008N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 9) {
              this.CD1000000009T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000009N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              //this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 10) {
              this.CD1000000010T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000010N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 11) {
              this.CD1000000011T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000011N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 12) {
              this.CD1000000012T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000012N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 13) {
              this.CD1000000013T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000013N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 19) {
              this.CD1000000019T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000019N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 26) {
              this.CD1000000026T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000026N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 27) {
              this.CD1000000027T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000027N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 35) {
              this.CD1000000035T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000035N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            }

            this.set_yn = "Y";
            this.row++;
          }
          if(this.CD0000000000T.length !== 0)  this.prjt_nm_selected          = sessionStorage.getItem("LOGIN_PROJ_ID")
          if(this.CD1000000001T.length !== 0)  this.bzcd_selected             = (sessionStorage.getItem("LOGIN_BZCD") !== ""  ? sessionStorage.getItem("LOGIN_BZCD"): this.CD1000000001T[0].value)
          if(this.CD1000000002T.length !== 0)  this.prc_step_cd_selected      = this.CD1000000002T[0].value
          if(this.CD1000000003T.length !== 0)  this.dvlp_dis_cd_selected      = this.CD1000000003T[0].value
          if(this.CD1000000004T.length !== 0)  this.pgm_dis_cd_selected       = this.CD1000000004T[0].value
          if(this.CD1000000006T.length !== 0)  this.sqn_cd_selected           = this.CD1000000006T[0].value
          if(this.CD1000000007T.length !== 0)  this.sqn_cd_selected           = this.CD1000000007T[0].value
          if(this.CD1000000008T.length !== 0)  this.sqn_cd_selected           = this.CD1000000008T[0].value
          if(this.CD1000000009T.length !== 0)  this.err_prc_step_cd_selected  = this.CD1000000009T[0].value
          if(this.CD1000000010T.length !== 0)  this.req_dscd_selected         = this.CD1000000010T[0].value
          if(this.CD1000000011T.length !== 0)  this.req_prc_step_cd_selected  = this.CD1000000011T[0].value
          if(this.CD1000000012T.length !== 0)  this.mng_cd_selected           = this.CD1000000012T[0].value
          if(this.CD1000000013T.length !== 0)  this.rgs_dis_cd_selected       = this.CD1000000013T[0].value
          if(this.CD1000000019T.length !== 0)  this.wbs_mng_cd_selected       = this.CD1000000019T[0].value
          if(this.CD1000000026T.length !== 0)  this.itg_tst_prc_cd_selected   = this.CD1000000026T[0].value
          if(this.CD1000000027T.length !== 0)  this.bkup_id_selected          = this.CD1000000027T[0].value
          if(this.CD1000000035T.length !== 0)  this.wbs_prc_sts_cd_selected    = this.CD1000000035T[0].value
        }
        this.setCdAll()
      }
    },
    setCdAll() {
      this.bzcd_n.push(this.CD1000000001N)
      this.cd_all.push(this.CD0000000000N)
      this.cd_all.push(this.CD1000000001N)
      this.cd_all.push(this.CD1000000002N)
      this.cd_all.push(this.CD1000000003N)
      this.cd_all.push(this.CD1000000004N)
      this.cd_all.push(this.CD1000000005N)
      this.cd_all.push(this.CD1000000006N)
      this.cd_all.push(this.CD1000000007N)
      this.cd_all.push(this.CD1000000008N)
      this.cd_all.push(this.CD1000000009N)
      this.cd_all.push(this.CD1000000010N)
      this.cd_all.push(this.CD1000000011N)
      this.cd_all.push(this.CD1000000012N)
      this.cd_all.push(this.CD1000000013N)
      this.cd_all.push(this.CD1000000014N)
      this.cd_all.push(this.CD1000000015N)
      this.cd_all.push(this.CD1000000016N)
      this.cd_all.push(this.CD1000000017N)
      this.cd_all.push(this.CD1000000018N)
      this.cd_all.push(this.CD1000000019N)
      this.cd_all.push(this.CD1000000020N)
      this.cd_all.push(this.CD1000000021N)
      this.cd_all.push(this.CD1000000022N)
      this.cd_all.push(this.CD1000000023N)
      this.cd_all.push(this.CD1000000024N)
      this.cd_all.push(this.CD1000000025N)
      this.cd_all.push(this.CD1000000026N)
      this.cd_all.push(this.CD1000000027N)
      this.cd_all.push(this.CD1000000028N)
      this.cd_all.push(this.CD1000000029N)
      this.cd_all.push(this.CD1000000030N)
      this.cd_all.push(this.CD1000000031N)
      this.cd_all.push(this.CD1000000032N)
      this.cd_all.push(this.CD1000000033N)
      this.cd_all.push(this.CD1000000034N)
      this.cd_all.push(this.CD1000000035N)
    },
    init()  {
      // 백업ID, 프로젝트명(권한ID '500','600'경우 활성화)
      if(sessionStorage.getItem("LOGIN_AUT_CD") === '500' ||
          sessionStorage.getItem("LOGIN_AUT_CD") === '600'){
        this.read = false;
      }

      this.code_it =
          [
            "0000000000",
            "1000000001",
            "1000000002",
            "1000000003",
            "1000000004",
            "1000000005",
            "1000000006",
            "1000000007",
            "1000000008",
            "1000000009",
            "1000000010",
            "1000000011",
            "1000000012",
            "1000000013",
            "1000000014",
            "1000000015",
            "1000000016",
            "1000000017",
            "1000000018",
            "1000000019",
            "1000000020",
            "1000000021",
            "1000000022",
            "1000000023",
            "1000000024",
            "1000000025",
            "1000000026",
            "1000000027",
            "1000000028",
            "1000000029",
            "1000000030",
            "1000000031",
            "1000000032",
            "1000000033",
            "1000000034",
            "1000000035",
            "1000000036",
          ];

      // 조회영역 권한 체크
      axiosService.get("/PJTE2100/combo", {
        params: {
          prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID")
        }
      }).then(res => {
        this.setCombo(res.data.data.contents);
        this.setTest();
      }).catch(e => {

      });
    },
  }
}
</script>

<style scoped>

</style>