<template>
  <header class="GNB">
    <div class="gnb-logo">
      <a href="./PJTE8000" v-if="this.projId === '0000000001'">
        <img src="../assets/img/PE-icon/logo_Eyes.svg" alt="logo">
      </a>
      <a href="./PJTE9900" v-else-if="this.projId === '0000000003'">
        <img src="../assets/img/PE-icon/logo_Eyes.svg" alt="logo">
      </a>
      <a href="./PJTE9005" v-else-if="this.projId === '0000000004'">
        <img src="../assets/img/PE-icon/logo_Eyes.svg" alt="logo">
      </a>
      <a href="./PJTE1000" v-else>
        <img src="../assets/img/PE-icon/logo_Eyes.svg" alt="logo">
      </a>
    </div>
    <div class="gnb-con">
      <ul class="gnb-menu">
        <li class="active" v-if="this.projId ==='0000000001'"><a href="#">{{ this.current_menu }}</a></li>
        <li class="active" v-else-if="this.projId ==='0000000003'"><a href="#">{{ this.current_menu2 }}</a></li>
        <li class="active" v-else><a href="#">{{ this.current_menu }}</a></li>
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
    this.fn_current_menu()  // 현재 메뉴명('0000000001')
    this.fn_current_menu2() // 현재 메뉴명('0000000003')
  },
  data() {
    return {
      empnm: sessionStorage.getItem('LOGIN_EMP_NM'),
      projId : sessionStorage.getItem('LOGIN_PROJ_ID'),
      list: this.$router.options.routes,

      current_menu: '',
      current_menu2: '',

      menu_list: [
        {id: 'PJTE1000', path: '/PJTE1000', name: 'ProjectEyes현황'},
        {id: 'PJTE2100', path: '/PJTE2100', name: '개발현황'},
        {id: 'PJTE2110', path: '/PJTE2110', name: '개발진척현황'},
        {id: 'PJTE2200', path: '/PJTE2200', name: '통합테스트'},
        {id: 'PJTE2210', path: '/PJTE2210', name: '통합테스트진척현황'},
        {id: 'PJTE3000', path: '/PJTE3000', name: '결함관리'},
        {id: 'PJTE4000', path: '/PJTE4000', name: 'ActionItem및이슈관리현황'},
        {id: 'PJTE5000', path: '/PJTE5000', name: 'WBS관리'},
        {id: 'PJTE6000', path: '/PJTE6000', name: 'PMS신청관리'},
        {id: 'PJTE7000', path: '/PJTE7000', name: '산출물정합성체크'},
        {id: 'PJTE9000', path: '/PJTE9000', name: '시스템관리'},
        {id: 'PJTE8000', path: '/PJTE8000', name: '주간보고'},
        {id: 'PJTE9900', path: '/PJTE9900', name: 'KanbanBoard'},
        {id: 'PJTE9005', path: '/PJTE9005', name: '인력프로파일관리'},
        {id: 'PJTE9200', path: '/PJTE9200', name: '회의실예약'},
        {id: 'PJTE9100', path: '/PJTE9100', name: 'KMS게시판생성'},
        {id: 'PJTE9110', path: '/PJTE9110', name: 'KMS게시판'},
        {id: 'PJTE9120', path: '/PJTE9120', name: 'KMS게시글등록'},
      ],
      menu_list2: [
        {id: 'PJTE1000', path: '/PJTE1000', name: '공지사항'},
        {id: 'PJTE8000', path: '/PJTE8000', name: '주간보고'},
        {id: 'PJTE9900', path: '/PJTE9900', name: 'KanbanBoard'},
        {id: 'PJTE9005', path: '/PJTE9005', name: '인력프로파일관리'},
        {id: 'PJTE9200', path: '/PJTE9200', name: '회의실예약'},
        {id: 'PJTE9100', path: '/PJTE9100', name: 'KMS게시판생성'},
        {id: 'PJTE9110', path: '/PJTE9110', name: 'KMS게시판'},
        {id: 'PJTE9120', path: '/PJTE9120', name: '준비중인프로젝트현황'},
        {id: 'PJTE9310', path: '/PJTE9310', name: '투입인력현황'},
        {id: 'PJTE9000', path: '/PJTE9000', name: '시스템관리'},
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
        sessionStorage.setItem("LOGIN_REAL_PRJT_ID", "");      // 투입프로젝트아이디
        sessionStorage.setItem("LOGIN_DEPT_CD", "");           // 부문코드
        this.$router.push('/login')
      } else {   //취소
        return;
      }
    },
    fn_current_menu() {
      for (let i = 0; i < this.menu_list.length; i++) {
        if (this.$route.path === this.menu_list[i].path) {
          this.current_menu = this.menu_list[i].name
        }
      }
    },
    fn_current_menu2() {
      for (let i = 0; i < this.menu_list2.length; i++) {
        if (this.$route.path === this.menu_list2[i].path) {
          this.current_menu2 = this.menu_list2[i].name
        }
      }
    }
  }
};
</script>
<style>
</style>