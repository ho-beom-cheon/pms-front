<template>
  <body>
  <section class="login">
    <div class="loginBx">
      <div class="top">
        <img src="../assets/img/PE-icon/logo_Eyes.svg" alt="logo">
        <!--<button class="btn logOut">로그아웃</button>-->
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
              <input type="text" placeholder="로그인 사번" name="userId"
                     id="userId" v-model="userId" style="width: 300px;"
                     @keyup.enter="login"
              >
            </td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td>
              <input type="password" placeholder="비밀번호" name="password"
                     id="password" v-model="password" style="width: 300px;"
                     @keyup.enter="login"
              >
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="bottom">
        <button class="btn btn-primary" @click="login">로그인</button>
        <button class="btn btn-primary">비밀번호변경</button>
      </div>
    </div>

  </section>
  </body>
</template>

<script>
import axios from "axios";
import {axiosService} from "@/api/http";
// 토큰 및 사용자 정보를 저장하기 위해서 세션 스토리지를 사용한다. 
const storage = window.sessionStorage;

const ai = axios.create({
  baseURL: "http://localhost:8080/api/"
});


export default {
  created() {
    this.getPjt();
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
      pjt_list : [],
      pjt_selected  : "",    // 프로그램구분
    };
  },

  methods: {
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
    login() {
      storage.setItem("jwt-auth-token", "");    // 인증토큰
      storage.setItem("empno", "");             // 직원번호
      storage.setItem("empnm", "");             // 직원명
      storage.setItem("prjt_id", "");           // 프로젝트ID
      storage.setItem("bzcd", "");              // 업무구분
      storage.setItem("catn_dcd", "");          // 구성원 구분코드
      storage.setItem("aut_cd", "");            // 권한ID
      storage.setItem("login_yn", "");          // 로그인상태

      axiosService.post("/user/signin", {
        userId: this.userId,
        password: this.password,
        pjt_selected : this.pjt_selected,
      })
          .then(res => {
            if (res.data.status) {
              this.message = res.data.data[0].empnm + "로 로그인 되었습니다.";

              this.setInfo(
                  "성공",
                  res.data.auth_token,
                  JSON.stringify(res.data.data)
              );
              if(res.data.data[0].login_yn == "Y") {
                this.$router.push('/SWZP0010');
              } else if(res.data.data[0].login_yn == 'C') {
                alert("비밀번호를 변경하세요.");
              } else if(res.data.data[0].login_yn == 'N') {
                alert("비밀번호가 틀렸습니다.")
              }
              /* 세션 스토리지 값 저장 */
              storage.setItem("jwt-auth-token", res.data.auth_token);       // 인증토큰
              storage.setItem("empno", res.data.data[0].empno);             // 직원번호
              storage.setItem("empnm", res.data.data[0].empnm);             // 직원명
              storage.setItem("prjt_id", res.data.data[0].prjt_id);         // 프로젝트ID
              storage.setItem("bzcd", res.data.data[0].bzcd);               // 업무구분
              storage.setItem("catn_dcd", res.data.data[0].catn_dcd);       // 구성원 구분코드
              storage.setItem("aut_cd", res.data.data[0].aut_cd);           // 권한ID
              storage.setItem("login_yn", res.data.data[0].login_yn);       // 로그인상태

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
    },

    init() {
      if (storage.getItem("jwt-auth-token")) {
        this.message = storage.getItem('empno') + "로 로그인 되었습니다.";
      } else {
        storage.setItem("jwt-auth-token", "");
      }
    } // init 
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
@import "../assets/css/reset.css";
@import "../assets/css/theme.css";

</style>