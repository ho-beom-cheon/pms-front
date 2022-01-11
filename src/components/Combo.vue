<template>
  <div>
    <li class="filter-item">
      <div class="item-con">프로젝트명
        <select
            v-model = "prjt_nm_selected"
            style   = "width: 167px"
            :disabled="read"
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
    <li class="filter-item">
      <div class="item-con">업무구분
        <select
            v-model = "bzcd_selected"
            style   = "width: 145px"
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
    <li class="filter-item">
      <div class="item-con">개발구분
        <select
            v-model = "dvlp_dis_cd_selected"
            style   = "width: 80px"
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
    <li class="filter-item">
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
    <li class="filter-item">
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
  </div>
</template>

<script>
import {axiosService} from "@/api/http"; // Date-picker 스타일적용

export default {
  name: "combo",

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

      code_it : [],
      cd_all : [],
      row : 0,
      set_yn : "",
      read : true,

      //프로젝트명
      prjt_nm_selected : "",
      prjt_nm : "",
      // 업무구분
      bzcd_selected : "",
      bzcd : "",
      // 프로그램구분
      pgm_dis_cd_selected : "",
      pgm_dis_cd : "",
      // 개발구분
      dvlp_dis_cd_selected : "",
      dvlp_dis_cd : "",
      // 처리단계
      prc_step_cd_selected : "",
      prc_step_cd : "",
    }
  },
  methods: {
    setTest() {
      this.$store.commit('pms/SET_CD_ALL', this.cd_all)
    },
    bzcd_change() {
      this.$emit('bzcd_change', this.bzcd_selected)
    },
    dvlp_dis_cd_change() {
      this.$emit('dvlp_dis_cd_change', this.dvlp_dis_cd_selected)
    },
    pgm_dis_cd_change() {
      this.$emit('pgm_dis_cd_change', this.pgm_dis_cd_change)
    },
    prc_step_cd_change() {
      this.$emit('prc_step_cd_change', this.prc_step_cd_change)
    },

    setCombo(data) {

      for(let i=0; i<this.code_it.length; i++) {
        this.set_yn = "N";
        this.row = 0;

        for (let z = 0; z < data.length; z++) {
          if (this.code_it[i] === data[z].GRP_TYCD) {
            if(this.row === 0){
              if(i === 0) {
                this.CD0000000000T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD0000000000N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              }
              else if(i === 1) {
                this.CD1000000001T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000001N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              }
              else if(i === 2) {
                this.CD1000000002T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000002N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              }
              else if(i === 3) {
                this.CD1000000003T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000003N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              }
              else if(i === 4) {
                this.CD1000000004T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000004N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              }
              else if(i === 5) {
                this.CD1000000005T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000005N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              }
              else if(i === 6) {
                this.CD1000000006T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000006N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              }
              else if(i === 7) {
                this.CD1000000007T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000007N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              }
              else if(i === 8) {
                this.CD1000000008T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000008N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              }
            }
            if(i === 0) {
              this.CD0000000000T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD0000000000N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            }
            if(i === 1) {
              this.CD1000000001T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000001N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            }
            if(i === 2) {
              this.CD1000000002T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000002N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            }
            if(i === 3) {
              this.CD1000000003T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000003N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            }
            if(i === 4) {
              this.CD1000000004T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000004N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            }
            if(i === 5) {
              this.CD1000000005T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000005N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            }
            if(i === 6) {
              this.CD1000000006T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000006N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            }
            if(i === 7) {
              this.CD1000000007T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000007N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            }

            this.set_yn = "Y";
            this.row++;
          } else if (this.set_yn === "Y") {
            if(this.CD0000000000T.length !== 0)  this.prjt_nm_selected        = sessionStorage.getItem("prjt_id")
            if(this.CD1000000001T.length !== 0)  this.bzcd_selected           = this.CD1000000001T[0].value
            if(this.CD1000000002T.length !== 0)  this.prc_step_cd_selected     = this.CD1000000002T[0].value
            if(this.CD1000000003T.length !== 0)  this.dvlp_dis_cd_selected    = this.CD1000000003T[0].value
            if(this.CD1000000004T.length !== 0)  this.pgm_dis_cd_selected    = this.CD1000000004T[0].value
            break;
          }
        }
        this.setCdAll()
      }
    },
    setCdAll() {
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
    },
    init()  {
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
          ];

      // PMS 상세 코드
      axiosService.get("/PJTE2100/combo", {
        params: {
          prjt_id: sessionStorage.getItem("prjt_id")
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