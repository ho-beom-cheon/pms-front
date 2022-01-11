<template> 
    <header class="GNB"> 
        <div class="gnb-logo"> 
            <a href="./main.html"> 
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
empnm : sessionStorage.getItem('LOGIN_EMP_NM'),
        list: this.$router.options.routes
    } 
  }, 
  methods:{
 logout() {
      sessionStorage.setItem("jwt-auth-token", "");
      sessionStorage.setItem("LOGIN_EMP_NO", "");            // 직원번호
      sessionStorage.setItem("LOGIN_EMP_NM", "");            // 직원명
      sessionStorage.setItem("LOGIN_PROJ_ID", "");           // 프로젝트ID
      sessionStorage.setItem("LOGIN_BZCD", "");              // 업무구분
      sessionStorage.setItem("LOGIN_CATN_DCD", "");          // 구성원 구분코드
      sessionStorage.setItem("LOGIN_AUT_CD", "");            // 권한ID
      sessionStorage.setItem("LOGIN_YN", "");                // 로그인상태
      this.$router.push('/login')
    },
  } 
}; 
</script> 
<style> 
</style>