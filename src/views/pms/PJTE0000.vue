<template>
  <body>
  <section class="login">
    <div class="loginBx">
      <div class="top">
        <img src="/img/logo_Eyes.bf30f8b2.svg" alt="logo">
      </div>
      <div class="body">
        <em>
          로그인
        </em>
        <h1>
          최초비밀번호를 변경해야 로그인할 수 있습니다. <br>
          비밀번호를 변경 후 다시 로그인하세요.
        </h1>
        <span class="info-msg">
          <i class="ic-info"></i>
          <p>최초비밀번호 : 사번 + 211111</p>
        </span>
        <table class="form-table">
          <tbody>
          <tr>
            <th>프로젝트</th>
            <td>
              <select v-model="pjt_selected" style="width: 300px;">
                <option
                    v-for   = "(pjt_list,idx) in pjt_list"
                    :key    ="idx"
                    v-text  ="pjt_list.text"
                    :value  ="pjt_list.value"
                ></option>
              </select>
            </td>
          </tr>
          <tr>
            <th>로그인 사번</th>
            <td>
              <div class="input-searchWrap">
                <input type="text"
                       placeholder="로그인 사번"
                       v-model="userId"
                       style="width: 300px;"
                       @keyup.enter="open_pjte9001(1)"
                >
                <button class="search-btn3"
                        @click="open_pjte9001(1)"
                ></button>
              </div>
              <h6 class="mt-1" style="color:red; font-size: small" v-if="idCheak">로그인 사번은 필수 입력 사항입니다.</h6>
            </td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td>
              <input type="password" placeholder="비밀번호" name="password"
                     id="password" v-model="password" style="width: 300px;"
                     @keyup.enter="login"
              >
              <p class="mt-1" style="color:red; font-size: small" v-if="pwCheak">비밀번호는 필수 입력 사항입니다.</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="bottom">
        <base-button class="btn btn-primary" @click="login">로그인</base-button>
        <base-button class="btn btn-primary" @click="passwordChg">비밀번호변경</base-button>
        <modal :show.sync="modals.modal1">
          <h3 slot="header" class="modal-title" id="modal-title-default">비밀번호 변경</h3>
          <div class="modal-mid">
            <tr>
              <th>신규 비밀번호&nbsp;</th>
              <td>
                <input type="password" placeholder="비밀번호"
                       name="newPassword"
                       v-model="newPassword"
                       id="newPassword"
                       style="width: 300px; margin-left: 3px"
                >
              </td>
            </tr>
            <br>
            <tr>
              <th>비밀번호 확인&nbsp;</th>
              <td>
                <input type="password" placeholder="비밀번호 확인"
                       name="passwordConfirm"
                       v-model="passwordConfirm"
                       id="passwordConfirm"
                       style="width: 300px; margin-left: 3px"
                >
              </td>
            </tr>
          </div>
          <template slot="footer">
            <button class="btn btn-primary" type="primary" @click="pwChange">변경</button>
            <button type="primary" class="ml-auto btn btn-primary" @click="closeModal"> 취소</button>
          </template>
        </modal>
      </div>
    </div>

  </section>
  </body>
</template>

<script>
import {axiosService} from "@/api/http";
import Modal from "@/components/Modal.vue";

// 직원조회 팝업에서 받은 값
window.empData = (empnm ,empno, btn_id, emprow, empcol) => {
  window.pms_login.emp_nm = empnm;
  window.pms_login.userId = empno;
  window.pms_login.emp_btn_id = btn_id;
  window.pms_login.emp_rowKey = emprow;
  window.pms_login.emp_colName = empcol;
}

// 토큰 및 사용자 정보를 저장하기 위해서 세션 스토리지를 사용한다.
const storage = window.sessionStorage;

export default {
  components : {
    Modal
  },
  created() {
    this.sessionClear();
    this.getPjt();
  },

  updated() {
    // 로그인 정보 필수 입력 문구 초기화
    if(this.userId !== "")
      this.idCheak = false
    if(this.password !== "")
      this.pwCheak = false
  },

  watch: {
    pjt_selected() {
      this.userId = ""
      this.password = ""
    }
  },
  data() {
    return {
      userId: "",
      password: "",
      message: "로그인해주세요.",
      status: "",
      token: "",
      info: "",
      dtls_tynm: "",
      dtls_tycd: "",
      pjt_list : [],            // 프로그램 리스트
      pjt_selected  : "",       // 프로그램구분
      idCheak : false,          // id 유효체크
      pwCheak : false,          // password 유효체크
      passwordConfirm : "",     // 변경 패스퉝드 확인
      newPassword     : "",     // 변경할 패스워드
      isActive        : true,
      flag            : false,
      modals: {
        modal1: false,
      }
    };
  },

  methods: {
    /* 비밀번호 변경 조건 체크*/
    passwordChg() {
      if(this.vaildation()) {
        axiosService.post("/user/signin", {
          userId: this.userId,
          password: this.password,
          pjt_selected: this.pjt_selected,
          btn_gubun: "Y",
        }).then(res => {
          this.modals.modal1 = true
        }).catch(e => {
          alert("사용자가 없습니다.");
          this.setInfo("실패", "", JSON.stringify(e.response || e.message));
        });
      }
    },
    /* 모달창 닫기 */
    closeModal() {
      this.modals.modal1 = false
      this.flag = true
      this.newPassword = ""
      this.passwordConfirm = ""
    },
    // 프로젝트 리스트 셋팅
    setPjt(data) {
      for(let i=0; i<data.length; i++) {
        this.pjt_list.push({"text": data[i].DTLS_TYNM, "value": data[i].DTLS_TYCD});
      }
      this.pjt_selected = this.pjt_list[0].value;
    },
    // 프로젝트 리스트 가져오기
    getPjt() {
      axiosService.get(
          "/pjtInfo",
          {
          },
      ).then(res => {
        this.setPjt(res.data.data);
      }).catch(e => {

      });
    },
    setInfo(status, token, info) {
      this.status = status;
      this.token = token;
      this.info = info;
    },

    getInfo() {
      axiosService.post(
          "/info",
          {
            userId: "some_userId",
            password: "some password",

          },
          {
            headers: {
              "jwt-auth-token": storage.getItem("jwt-auth-token")
            }
          }
      )
          .then(res => {
            this.setInfo(
                "정보 조회 성공",
                res.headers.auth_token,
                JSON.stringify(res.data)
            );
          })
          .catch(e => {
            this.setInfo("정보 조회 실패", "", e.response.data.msg);
          });
    },
    /* 비밀번호 변경 */
    pwChange() {
      if(this.newPassword === this.passwordConfirm) {
        axiosService.put(
            "/pwChange",
            {
              password: this.newPassword,
              userId: this.userId,
              pjt_selected: this.pjt_selected,
            },
        ).then(res => {
          this.modals.modal1 = false;
          alert("비밀번호가 변경되었습니다.");
          this.valClear();
        }).catch(e => {
        });
      }
      else {
        alert("변경 비밀번호와 변경 비밀번호 확인이 틀립니다.");
      }
    },
    /* 로그인 체크 */
    login() {
      this.sessionClear();
      if(this.vaildation()) {
        axiosService.post("/user/signin", {
          userId: this.userId,
          password: this.password,
          pjt_selected: this.pjt_selected,
        })
            .then(res => {
              if (res.data.status) {
                this.message = res.data.data[0].empnm + "로 로그인 되었습니다.";

                this.setInfo(
                    "성공",
                    res.data.auth_token,
                    JSON.stringify(res.data.data),
                );
                if (res.data.data[0].login_yn === "Y") {
                  if(res.data.data[0].prjt_id === "0000000001") {
                    this.$router.push('/PJTE8000');
                  } else if (res.data.data[0].prjt_id === "0000000003"){
                    this.$router.push('/PJTE9900');
                  } else if (res.data.data[0].prjt_id === "0000000004"){
                    this.$router.push('/PJTE9005');
                  } else {
                    this.$router.push('/PJTE1000');
                  }
                  /* 세션 스토리지 값 저장 */
                  storage.setItem("jwt-auth-token", res.data.auth_token);                // 인증토큰
                  storage.setItem("LOGIN_EMP_NO", res.data.data[0].empno);               // 직원번호
                  storage.setItem("LOGIN_EMP_NM", res.data.data[0].empnm);               // 직원명
                  storage.setItem("LOGIN_PROJ_ID", res.data.data[0].prjt_id);            // 프로젝트ID
                  storage.setItem("LOGIN_BZCD", res.data.data[0].bzcd);                  // 업무구분
                  storage.setItem("LOGIN_CATN_DCD", res.data.data[0].catn_dcd);          // 구성원 구분코드
                  storage.setItem("LOGIN_AUT_CD", res.data.data[0].aut_cd);              // 권한ID
                  storage.setItem("LOGIN_YN", res.data.data[0].login_yn);                // 로그인상태
                  storage.setItem("LOGIN_REAL_PRJT_ID", res.data.data[0].real_prjt_id);  // 투입프로젝트ID
                  storage.setItem("LOGIN_DEPT_CD", res.data.data[0].dept_cd);            // 투입프로젝트ID

                } else if (res.data.data[0].login_yn === 'X') {
                  alert("시스템은 사용할 수 없는 직원입니다.")
                } else if (res.data.data[0].login_yn === 'C') {
                  alert("비밀번호를 변경하세요.");
                  this.modals.modal1 = true
                } else if (res.data.data[0].login_yn === 'N') {
                  alert("비밀번호가 틀렸습니다.")
                }
              } else {
                this.setInfo("", "", "");
                this.message = "로그인해주세요.";
                alert("입력 정보를 확인하세요.");
              }
            })
            .catch(e => {
              alert("사용자가 없습니다.");
              this.setInfo("실패", "", JSON.stringify(e.response || e.message));
            });
      }
    },

    // 직원조회 팝업 (검색 필터)
    open_pjte9001(btn_id) {
      let empno = ''
      let prjt_id_selected = this.pjt_selected
      let bkup_id_selected = '0000000000'
      storage.setItem("jwt-auth-token", "login")
      if (this.userId != null && this.userId !== '') {
        axiosService.get("/PJTE9001/select", {
          params: {
            empno,
            prjt_id_selected,
            bkup_id_selected
          }
        }).then(res => {
          let res_data = res.data.data.contents;
          let bkup_id = bkup_id_selected, prjt_id = prjt_id_selected, empno = this.userId
          window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empno=${empno}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
        })
      } else { // 직원명에 입력한 값이 없을 때 : PJTE9001 팝업 호출
        let bkup_id = bkup_id_selected, prjt_id = prjt_id_selected, empno = this.userId
        window.open(`../PJTE9001/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&empno=${empno}&btn_id=${btn_id}&`, "open_emp_page", "width=700, height=600");
      }
    },

    /* 세션 초기화 */
    sessionClear() {
      sessionStorage.clear();
    },
    valClear() {
      this.userId = "";
      this.password = "";
      this.passwordConfirm = "";
      this.newPassword = "";
    },
    /* 값 유효성 체크 */
    vaildation() {
      if(this.userId === ""){
        this.idCheak = true;
        return false;
      }
      if(this.password === ""){
        this.pwCheak = true;
        return false;
      }
      return true;
    },
    init() {
      if (storage.getItem("jwt-auth-token")) {
        this.message = storage.getItem('LOGIN_EMP_NO') + "로 로그인 되었습니다.";
      } else {
        storage.setItem("jwt-auth-token", "");
      }
    } // init
  },
  mounted() {
    this.init();
    window.pms_login = this;
  }
};
</script>

<style>
</style>