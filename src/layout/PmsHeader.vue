<template>
  <header class="GNB">
    <div class="gnb-logo">
      <a href="./SWZP0014">
        <img src="../assets/img/PE-icon/logo_Eyes.svg" alt="logo">
      </a>
    </div>
    <div class="gnb-con">
      <ul class="gnb-menu">
        <li class="active"><a href="#">{{this.$route.path}}</a></li>
        <li><a href="#"></a></li>
      </ul>
      <div class="gnb-etc">
        <a href="#">
          <div class="imgWrap">
            <img src="../assets/img/PE-icon/ic_profile.svg" alt="profile">
          </div>
          <span>{{ empnm }} 님</span>
        </a>
        <button class="btn logOut" @click="logout">로그아웃</button>
      </div>
    </div>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  data() {
    return {
      empnm : sessionStorage.getItem('empnm'),
      list: this.$router.options.routes
    }
  },
  methods:{
    logout() {

      sessionStorage.setItem("jwt-auth-token", "");
      sessionStorage.setItem("empno", "");             // 직원번호
      sessionStorage.setItem("empnm", "");             // 직원명
      sessionStorage.setItem("prjt_id", "");           // 프로젝트ID
      sessionStorage.setItem("bzcd", "");              // 업무구분
      sessionStorage.setItem("catn_dcd", "");          // 구성원 구분코드
      sessionStorage.setItem("aut_cd", "");            // 권한ID
      sessionStorage.setItem("login_yn", "");          // 로그인상태
      this.$router.push('/login')
    },
  }
};
</script>
<style>
</style>