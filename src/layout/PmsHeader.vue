<template>
  <header class="GNB">
    <div class="gnb-logo">
      <a href="./PJTE1000">
        <img src="../assets/img/PE-icon/logo_Eyes.svg" alt="logo">
      </a>
    </div>
    <div class="gnb-con">
      <ul class="gnb-menu">
        <li class="active"><a href="#">{{ this.current_menu }}</a></li>
        <li><a href="#"></a></li>
      </ul>
      <div class="gnb-etc">
        <a href="./PJTE9000">
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
    // console.log("created");
    this.fn_current_menu() // 현재 메뉴명
  },
  beforeMount() {
    // console.log("beforeMount");
  },
  mounted() {
    // console.log("mounted");

  },
  beforeUpdate() {
    // console.log("beforeUpdate");
  },
  updated() {
    // console.log("updated");
  },
  beforeDestroy() {
    // console.log("beforeDestroy");
  },
  destroyed() {
    // console.log("destroyed");
  },
  data() {
    return {
      empnm: sessionStorage.getItem('LOGIN_EMP_NM'),
      list: this.$router.options.routes,

      current_menu: '',
      menu_list: [
        {
          id: 'PJTE1000',
          path: '/PJTE1000',
          name: 'ProjectEyes현황'
        },
        {
          id: 'PJTE2100',
          path: '/PJTE2100',
          name: '개발현황'
        },
        {
          id: 'PJTE2110',
          path: '/PJTE2110',
          name: '개발진척현황'
        },
        {
          id: 'PJTE2200',
          path: '/PJTE2200',
          name: '통합테스트'
        },
        {
          id: 'PJTE2210',
          path: '/PJTE2210',
          name: '통합테스트진척현황'
        },
        {
          id: 'PJTE3000',
          path: '/PJTE3000',
          name: '결함관리'
        },
        {
          id: 'PJTE4000',
          path: '/PJTE4000',
          name: 'ActionItem및이슈관리현황'
        },
        {
          id: 'PJTE5000',
          path: '/PJTE5000',
          name: 'WBS관리'
        },
        {
          id: 'PJTE6000',
          path: '/PJTE6000',
          name: 'PMS신청관리'
        },
        {
          id: 'PJTE7000',
          path: '/PJTE7000',
          name: '산출물정합성체크'
        },
        {
          id: 'PJTE9000',
          path: '/PJTE9000',
          name: '시스템관리'
        },
        {
          id: 'PJTE8000',
          path: '/PJTE8000',
          name: '주간보고'
        },
        {
          id: 'PJTE9900',
          path: '/PJTE9900',
          name: 'KanbanBoard'
        },
      ],
    }
  },
  methods: {
    logout() {
      if (confirm("로그아웃하시겠습니까?") == true) {
        sessionStorage.setItem("jwt-auth-token", "");
        sessionStorage.setItem("LOGIN_EMP_NO", "");            // 직원번호
        sessionStorage.setItem("LOGIN_EMP_NM", "");            // 직원명
        sessionStorage.setItem("LOGIN_PROJ_ID", "");           // 프로젝트ID
        sessionStorage.setItem("LOGIN_BZCD", "");              // 업무구분
        sessionStorage.setItem("LOGIN_CATN_DCD", "");          // 구성원 구분코드
        sessionStorage.setItem("LOGIN_AUT_CD", "");            // 권한ID
        sessionStorage.setItem("LOGIN_YN", "");                // 로그인상태
        this.$router.push('/login')
      } else {   //취소
        return;
      }
    },
    fn_current_menu() {
      for (let i = 0; i < this.menu_list.length; i++) {
        if (this.$route.path == this.menu_list[i].path) {
          this.current_menu = this.menu_list[i].name
        }
      }

    }
  }
};
</script>
<style>
</style>