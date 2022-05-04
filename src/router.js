let menuList = [];
let menuListStr = [];
let arrRoutes = [];

import Vue from "vue";
import Router from "vue-router";
import PmsHeader from "./layout/PmsHeader";
import PmsFooter from "./layout/PmsFooter";

/*참고 컴포넌트*/
const FileUpload = () => import(/* webpackChunkName: "file-upload" */ './views/example/FileUpload.vue'); menuList.push(FileUpload); menuListStr.push("FileUpload");
const ExcelExport = () => import(/* webpackChunkName: "excel-export" */ './views/example/ExcelExport.vue'); menuList.push(ExcelExport); menuListStr.push("ExcelExport");
const EditSample = () => import(/* webpackChunkName: "edit-sample" */ './views/example/EditSample.vue'); menuList.push(EditSample); menuListStr.push("EditSample");
const GridSample = () => import(/* webpackChunkName: "grid-sample" */ './views/example/GridSample.vue'); menuList.push(GridSample); menuListStr.push("GridSample");
const ExGridAndExcel = () => import(/* webpackChunkName: "grid-excel" */ './views/example/ExGridAndExcel.vue'); menuList.push(ExGridAndExcel); menuListStr.push("ExGridAndExcel");
const ExTran = () => import(/* webpackChunkName: "exTran" */ './views/example/ExTran.vue'); menuList.push(ExTran); menuListStr.push("ExTran");
const NetMain = () => import(/* webpackChunkName: "netMain" */ './views/net/NetMain.vue'); menuList.push(NetMain); menuListStr.push("NetMain");

/* PMS */
const PJTE0000 = () => import(/* webpackChunkName: "PJTE0000" */ './views/pms/PJTE0000.vue'); menuList.push(PJTE0000); menuListStr.push("login");
const PJTE2100 = () => import(/* webpackChunkName: "PJTE2100" */ './views/pms/PJTE2100.vue'); menuList.push(PJTE2100); menuListStr.push("PJTE2100");
const PJTE1000 = () => import(/* webpackChunkName: "PJTE1000" */ './views/pms/PJTE1000.vue'); menuList.push(PJTE1000); menuListStr.push("PJTE1000");
const PJTE2110 = () => import(/* webpackChunkName: "PJTE2110" */ './views/pms/PJTE2110.vue'); menuList.push(PJTE2110); menuListStr.push("PJTE2110");
const PJTE2200 = () => import(/* webpackChunkName: "PJTE2200" */ './views/pms/PJTE2200.vue'); menuList.push(PJTE2200); menuListStr.push("PJTE2200");
const PJTE2210 = () => import(/* webpackChunkName: "PJTE2210" */ './views/pms/PJTE2210.vue'); menuList.push(PJTE2210); menuListStr.push("PJTE2210");
const PJTE3000 = () => import(/* webpackChunkName: "PJTE3000" */ './views/pms/PJTE3000.vue'); menuList.push(PJTE3000); menuListStr.push("PJTE3000");
const PJTE3001 = () => import(/* webpackChunkName: "PJTE3001" */ './views/pms/PJTE3001.vue'); menuList.push(PJTE3001); menuListStr.push("PJTE3001");
const PJTE4000 = () => import(/* webpackChunkName: "PJTE4000" */ './views/pms/PJTE4000.vue'); menuList.push(PJTE4000); menuListStr.push("PJTE4000");
const PJTE5000 = () => import(/* webpackChunkName: "PJTE5000" */ './views/pms/PJTE5000.vue'); menuList.push(PJTE5000); menuListStr.push("PJTE5000");
const PJTE6000 = () => import(/* webpackChunkName: "PJTE6000" */ './views/pms/PJTE6000.vue'); menuList.push(PJTE6000); menuListStr.push("PJTE6000");
const PJTE6001 = () => import(/* webpackChunkName: "PJTE6001" */ './views/pms/PJTE6001.vue'); menuList.push(PJTE6001); menuListStr.push("PJTE6001");
const PJTE7000 = () => import(/* webpackChunkName: "PJTE7000" */ './views/pms/PJTE7000.vue'); menuList.push(PJTE7000); menuListStr.push("PJTE7000");
const PJTE8000 = () => import(/* webpackChunkName: "PJTE8000" */ './views/pms/PJTE8000.vue'); menuList.push(PJTE8000); menuListStr.push("PJTE8000");
const PJTE9000 = () => import(/* webpackChunkName: "PJTE9000" */ './views/pms/PJTE9000.vue'); menuList.push(PJTE9000); menuListStr.push("PJTE9000");
const PJTE9001 = () => import(/* webpackChunkName: "PJTE9001" */ './views/pms/PJTE9001.vue'); menuList.push(PJTE9001); menuListStr.push("PJTE9001");
const PJTE9002 = () => import(/* webpackChunkName: "PJTE9002" */ './views/pms/PJTE9002.vue'); menuList.push(PJTE9002); menuListStr.push("PJTE9002");
const PJTE9003 = () => import(/* webpackChunkName: "PJTE9003" */ './views/pms/PJTE9003.vue'); menuList.push(PJTE9003); menuListStr.push("PJTE9003");
const PJTE9005 = () => import(/* webpackChunkName: "PJTE9005" */ './views/pms/PJTE9005.vue'); menuList.push(PJTE9005); menuListStr.push("PJTE9005");
const PJTE9110 = () => import(/* webpackChunkName: "PJTE9110" */ './views/pms/PJTE9110.vue'); menuList.push(PJTE9110); menuListStr.push("PJTE9110");
const PJTE9120 = () => import(/* webpackChunkName: "PJTE9120" */ './views/pms/PJTE9120.vue'); menuList.push(PJTE9120); menuListStr.push("PJTE9120");
const PJTE9100 = () => import(/* webpackChunkName: "PJTE9100" */ './views/pms/PJTE9100.vue'); menuList.push(PJTE9100); menuListStr.push("PJTE9100");
const PJTE9200 = () => import(/* webpackChunkName: "PJTE9200" */ './views/pms/PJTE9200.vue'); menuList.push(PJTE9200); menuListStr.push("PJTE9200");
const PJTE9300 = () => import(/* webpackChunkName: "PJTE9300" */ './views/pms/PJTE9300.vue'); menuList.push(PJTE9300); menuListStr.push("PJTE9300");
const PJTE9310 = () => import(/* webpackChunkName: "PJTE9310" */ './views/pms/PJTE9310.vue'); menuList.push(PJTE9310); menuListStr.push("PJTE9310");
const PJTE9900 = () => import(/* webpackChunkName: "PJTE9900" */ './views/pms/PJTE9900.vue'); menuList.push(PJTE9900); menuListStr.push("PJTE9900");

// Vue 와 Router 연결
Vue.use(Router);

let aRootPath = new Object();

aRootPath.path = "/";
aRootPath.redirect = "/login";
aRootPath.meta = {authRequired : false}
aRootPath.props = true
arrRoutes.push(aRootPath) ;


for (var idx = 0; idx < menuListStr.length; idx++) {

  let tmpObj = new Object();

  tmpObj.path = "/" + menuListStr[idx].toLowerCase();
  tmpObj.name = menuListStr[idx].toLowerCase();

  // 첫 로그인 화면
  if("/login".indexOf(menuListStr[idx]) > 0){
    console.log("tmpObj ::",tmpObj);
    tmpObj.components = {default: menuList[idx]};
    tmpObj.meta = {authRequired : false}
    tmpObj.props = true
  }
  // 팝업 components에 header, footer 가 없기 때문에 따로 분기
  else if ("/PJTE3001/PJTE6001/PJTE9001/PJTE9002/PJTE9003/".indexOf(menuListStr[idx]) > 0){
    tmpObj.components = {default: menuList[idx]};
    if(sessionStorage.getItem("jwt-auth-token")){
      tmpObj.meta = {authRequired : false}
    } else {
      tmpObj.meta = {authRequired : true}
    }
  } else {
    tmpObj.components = {header: PmsHeader, footer: PmsFooter, default: menuList[idx]};
    if(sessionStorage.getItem("jwt-auth-token")){
      tmpObj.meta = {authRequired : false}
    } else {
      tmpObj.meta = {authRequired : true}
    }
  }
  arrRoutes.push(tmpObj);
}

let aOtherPath = new Object();

aOtherPath.path = "/*";
aOtherPath.name = "/other";
aOtherPath.components = {default: PJTE0000};
arrRoutes.push(aOtherPath);

export const router = new Router({
  // history 모드롤 선언시 브라우저가 history.pushState 를 제공한다.
  mode:'history',
  // 전역적으로 linkExactActiveClass 를 통해 css를 적용할 수 있다.
  linkExactActiveClass: "active",
  // route 될 객체 목록
  routes : arrRoutes,

  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

/* Navigation guard
* 뷰 라우터로 특정 URL을 접근 시 해당 URL의 접근을 막아주는 역할
* - to : 이동할 url 정보가 담긴 라우터 객체
* - from : 현재 url 정보가 담긴 라우터 객체
* - next : to에 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
*  */
router.beforeEach(function (to,from,next){
  if(to.fullPath === '/login'){
    sessionStorage.setItem("jwt-auth-token", "")
  }
  if(to.name === '/other'){
    next({path:'/login'})
  }
  if(to.matched.some(function (routeInfo){
    if(from.fullPath === '/login'){
      next()
    } else {
      return routeInfo.meta.authRequired;
    }
  })){
    next({path:'/login'})
    window.alert("잘못된 경로로 접근하였습니다.");
  } else
  {
    next()
  }
})






