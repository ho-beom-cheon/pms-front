<template>
  <aside>
    <div class="page-tit"  v-if ="this.LoginId === '0000000003'">
      ITeyes Support System
    </div>
    <div class="page-tit"  v-else>
      ITeyes PMS
    </div>
    <dl>
      <dd>
        <a href="#">기본메뉴</a>
      </dd>
      <dd>
        <a href="#">즐겨찾기메뉴</a>
      </dd>
    </dl>
    <div class="aside-con">
      <div class="accordion" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <button v-if ="this.LoginId === '0000000003'" class="menu-group" type="button" data-toggle="collapse" data-target="#collapseOne"
                    aria-expanded="true" aria-controls="collapseOne">
              ITeyes
            </button>
            <button v-else class="menu-group" type="button" data-toggle="collapse" data-target="#collapseOne"
                    aria-expanded="true" aria-controls="collapseOne">
              PMS
            </button>
          </div>

          <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <ul class="card-body" v-if ="this.LoginId === '0000000001'" >
              <li id="WeekPjte8000"><a href="/PJTE8000">{{ week_menu_list[0].name }}</a></li>
              <li id="WeekPjte9000"><a href="/PJTE9000">{{ week_menu_list[1].name }}</a></li>
            </ul>
            <ul class="card-body" v-else-if ="this.LoginId === '0000000003'" >
              <li id="PJTE1000Iteyes"><a href="/PJTE1000">{{ iteyes_menu_list[0].name }}</a></li>
              <li id="PJTE8000Iteyes"><a href="/PJTE8000">{{ iteyes_menu_list[1].name }}</a></li>
              <li id="PJTE9900Iteyes"><a href="/PJTE9900">{{ iteyes_menu_list[2].name }}</a></li>
              <li id="PJTE9120Iteyes"><a href="/PJTE9120">{{ iteyes_menu_list[3].name }}</a></li>
              <li id="PJTE9310Iteyes"><a href="/PJTE9310">{{ iteyes_menu_list[4].name }}</a></li>
              <li id="PJTE9005Iteyes"><a href="/PJTE9005">{{ iteyes_menu_list[5].name }}</a></li>
              <li id="PJTE9200Iteyes"><a href="/PJTE9200">{{ iteyes_menu_list[6].name }}</a></li>
              <li id="PJTE9000Iteyes"><a href="/PJTE9000">{{ iteyes_menu_list[7].name }}</a></li>
            </ul>
            <ul class="card-body" v-else >
              <li id="PJTE1000"><a href="/PJTE1000">{{ menu_list[0].name }}</a></li>
              <li id="PJTE2100"><a href="/PJTE2100">{{ menu_list[1].name }}</a></li>
              <li id="PJTE2110"><a href="/PJTE2110">{{ menu_list[2].name }}</a></li>
              <li id="PJTE2200"><a href="/PJTE2200">{{ menu_list[3].name }}</a></li>
              <li id="PJTE2210"><a href="/PJTE2210">{{ menu_list[4].name }}</a></li>
              <li id="PJTE3000"><a href="/PJTE3000">{{ menu_list[5].name }}</a></li>
              <li id="PJTE4000"><a href="/PJTE4000">{{ menu_list[6].name }}</a></li>
              <li id="PJTE5000"><a href="/PJTE5000">{{ menu_list[7].name }}</a></li>
              <li id="PJTE6000"><a href="/PJTE6000">{{ menu_list[8].name }}</a></li>
              <li id="PJTE7000"><a href="/PJTE7000">{{ menu_list[9].name }}</a></li>
              <li id="PJTE9200"><a href="/PJTE9200">{{ menu_list[10].name }}</a></li>
              <li id="PJTE9000"><a href="/PJTE9000">{{ menu_list[11].name }}</a></li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
<script>
const storage = window.sessionStorage;

export default {
  components: {
  },
  beforeCreate() {
  },
  created() {

    this.fn_current_menu() // 현재 메뉴명
  },
  beforeMount() {
  },
  mounted() {
    this.fn_highlight_meun() // 현재 메뉴 하이라이팅
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  data() {

    return {
      LoginId : storage.getItem('LOGIN_PROJ_ID'),
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
          id: 'PJTE9200',
          path: '/PJTE9200',
          name: '회의실예약'
        },
        {
          id: 'PJTE9000',
          path: '/PJTE9000',
          name: '시스템관리'
        },

      ],
      week_menu_list: [
        {
          id: 'WeekPjte8000',
          path: '/PJTE8000',
          name: '주간보고'
        },
        {
          id: 'WeekPjte9000',
          path: '/PJTE9000',
          name: '시스템관리'
        },
      ],
      iteyes_menu_list: [
        {
          id: 'PJTE1000Iteyes',
          path: '/PJTE1000',
          name: '공지사항'
        },
        {
          id: 'PJTE8000Iteyes',
          path: '/PJTE8000',
          name: '주간보고'
        },
        {
          id: 'PJTE9900Iteyes',
          path: '/PJTE9900',
          name: 'KanbanBoard'
        },
        {
          id: 'PJTE9120Iteyes',
          path: '/PJTE9120',
          name: '준비중인 프로젝트 현황'
        },
        {
          id: 'PJTE9310Iteyes',
          path: '/PJTE9310',
          name: '투입인력현황'
        },
        {
          id: 'PJTE9005Iteyes',
          path: '/PJTE9005',
          name: '인력프로파일관리'
        },
        {
          id: 'PJTE9200Iteyes',
          path: '/PJTE9200',
          name: '회의실예약'
        },
        {
          id: 'PJTE9000Iteyes',
          path: '/PJTE9000',
          name: '시스템관리'
        },
      ],
      profile_menu_list: [
        {
          id: 'PJTE9005',
          path: '/PJTE9005',
          name: '인력프로파일관리'
        },
        {
          id: 'profilePjte9000',
          path: '/PJTE9000',
          name: '시스템관리'
        },
      ],
    }
  },
  methods: {
    fn_current_menu() {
      if(this.LoginId =='0000000001') {
        for (let i = 0; i < this.week_menu_list.length; i++) {
          if (this.$route.path == this.week_menu_list[i].path) {
            this.current_menu = this.week_menu_list[i].name
          }
        }
      }else if(this.LoginId =='0000000003'){
        for (let i = 0; i < this.iteyes_menu_list.length; i++) {
          if (this.$route.path == this.iteyes_menu_list[i].path) {
            this.current_menu = this.iteyes_menu_list[i].name
          }
        }
      }else{
        for (let i = 0; i < this.menu_list.length; i++) {
          if (this.$route.path == this.menu_list[i].path) {
            this.current_menu = this.menu_list[i].name
          }
        }
      }

    },
    fn_highlight_meun() {
      if(this.LoginId =='0000000001') {
        for (let i = 0; i < this.week_menu_list.length; i++) {
          if (this.$route.path == this.week_menu_list[i].path) {
            document.getElementById(this.week_menu_list[i].id).className = 'active'
          }
        }
      }else if(this.LoginId =='0000000003'){
        for (let i = 0; i < this.iteyes_menu_list.length; i++) {
          if (this.$route.path == this.iteyes_menu_list[i].path) {
            document.getElementById(this.iteyes_menu_list[i].id).className = 'active'
          }
        }
      }else{
        for (let i = 0; i < this.menu_list.length; i++) {
          if (this.$route.path == this.menu_list[i].path) {
            document.getElementById(this.menu_list[i].id).className = 'active'
          }
        }
      }
    }
  }
};
</script>
<style>
</style>