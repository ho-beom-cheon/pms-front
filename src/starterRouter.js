var menuList = [];
var menuListStr = [];
var arrRoutes = [];

import Vue from "vue";
import Router from "vue-router";
import PmsHeader from "./layout/PmsHeader";
import PmsFooter from "./layout/PmsFooter";
import Components from "./views/Components.vue";; menuList.push(Components); menuListStr.push("Components");
import Landing from "./views/Landing.vue";; menuList.push(Landing); menuListStr.push("Landing");

import Register from "./views/Register.vue";; menuList.push(Register); menuListStr.push("Register");
import Profile from "./views/Profile.vue";; menuList.push(Profile); menuListStr.push("Profile");
import Starter from "./views/Starter.vue";; menuList.push(Starter); menuListStr.push("Starter");

const Login = () => import(/* webpackChunkName: "login" */ './views/Login.vue'); menuList.push(Login); menuListStr.push("login");
const FileUpload = () => import(/* webpackChunkName: "file-upload" */ './views/example/FileUpload.vue'); menuList.push(FileUpload); menuListStr.push("FileUpload");
const ExcelExport = () => import(/* webpackChunkName: "excel-export" */ './views/example/ExcelExport.vue'); menuList.push(ExcelExport); menuListStr.push("ExcelExport");
const EditSample = () => import(/* webpackChunkName: "edit-sample" */ './views/example/EditSample.vue'); menuList.push(EditSample); menuListStr.push("EditSample");
const GridSample = () => import(/* webpackChunkName: "grid-sample" */ './views/example/GridSample.vue'); menuList.push(GridSample); menuListStr.push("GridSample");
const ExGridAndExcel = () => import(/* webpackChunkName: "grid-excel" */ './views/example/ExGridAndExcel.vue'); menuList.push(ExGridAndExcel); menuListStr.push("ExGridAndExcel");
const ExTran = () => import(/* webpackChunkName: "exTran" */ './views/example/ExTran.vue'); menuList.push(ExTran); menuListStr.push("ExTran");
const NetMain = () => import(/* webpackChunkName: "netMain" */ './views/net/NetMain.vue'); menuList.push(NetMain); menuListStr.push("NetMain");

/* PMS */
const PJTE2100 = () => import(/* webpackChunkName: "PJTE2100" */ './views/pms/PJTE2100.vue'); menuList.push(PJTE2100); menuListStr.push("PJTE2100");
const PJTE1000 = () => import(/* webpackChunkName: "PJTE1000" */ './views/pms/PJTE1000.vue'); menuList.push(PJTE1000); menuListStr.push("PJTE1000");
const PJTE2200 = () => import(/* webpackChunkName: "PJTE2200" */ './views/pms/PJTE2200.vue'); menuList.push(PJTE2200); menuListStr.push("PJTE2200");
const PJTE3000 = () => import(/* webpackChunkName: "PJTE3000" */ './views/pms/PJTE3000.vue'); menuList.push(PJTE3000); menuListStr.push("PJTE3000");
const PJTE6000 = () => import(/* webpackChunkName: "PJTE6000" */ './views/pms/PJTE6000.vue'); menuList.push(PJTE6000); menuListStr.push("PJTE6000");
const PJTE4000 = () => import(/* webpackChunkName: "PJTE4000" */ './views/pms/PJTE4000.vue'); menuList.push(PJTE4000); menuListStr.push("PJTE4000");
const PJTE2210 = () => import(/* webpackChunkName: "PJTE2210" */ './views/pms/PJTE2210.vue'); menuList.push(PJTE2210); menuListStr.push("PJTE2210");
const PJTE2110 = () => import(/* webpackChunkName: "PJTE2110" */ './views/pms/PJTE2110.vue'); menuList.push(PJTE2110); menuListStr.push("PJTE2110");
const PJTE5000 = () => import(/* webpackChunkName: "PJTE5000" */ './views/pms/PJTE5000.vue'); menuList.push(PJTE5000); menuListStr.push("PJTE5000");
const PJTE7000 = () => import(/* webpackChunkName: "PJTE7000" */ './views/pms/PJTE7000.vue'); menuList.push(PJTE7000); menuListStr.push("PJTE7000");
const PJTE8000 = () => import(/* webpackChunkName: "PJTE8000" */ './views/pms/PJTE8000.vue'); menuList.push(PJTE8000); menuListStr.push("PJTE8000");
const PJTE9000 = () => import(/* webpackChunkName: "PJTE9000" */ './views/pms/PJTE9000.vue'); menuList.push(PJTE9000); menuListStr.push("PJTE9000");

Vue.use(Router);

let aRootPath = new Object();

aRootPath.path = "/";
aRootPath.redirect = "/login";
arrRoutes.push(aRootPath) ; 

for(var idx=0; idx < menuListStr.length; idx++){

  let tmpObj = new Object();

  tmpObj.path = "/" + menuListStr[idx].toLowerCase() ;
  tmpObj.name = menuListStr[idx].toLowerCase() ; 
  
  if( menuListStr === "login") {
    tmpObj.components = { default:menuList[idx] } ;  
  } else {
    tmpObj.components = { header:PmsHeader, footer:PmsFooter, default:menuList[idx] } 
  }
  arrRoutes.push(tmpObj);
}

let aOtherPath = new Object();

aOtherPath.path = "/*";
aOtherPath.redirect = "/other";
aOtherPath.components = { default:Login }
arrRoutes.push(aOtherPath) ; 

export default new Router({
  mode:'history',
  linkExactActiveClass: "active",
  routes : arrRoutes,
  // routes: [
  //   {
  //     path: "/",
  //     redirect:"/login"
  //   },
  //   {
  //     path: "/login",
  //     name: "login",
  //     components: {
  //       default: Login
  //     },
  //   },
  //   {
  //     path: "/components",
  //     name: "components",
  //     components: {
  //       header: PmsHeader,
  //       default: Components,
  //       footer: PmsFooter
  //     }
  //   },
  //   {
  //     path: "/landing",
  //     name: "landing",
  //     components: {
  //       header: PmsHeader,
  //       default: Landing,
  //       footer: PmsFooter
  //     }
  //   },
  //   {
  //     path: "/register",
  //     name: "register",
  //     components: {
  //       header: PmsHeader,
  //       default: Register,
  //       footer: PmsFooter
  //     }
  //   },
  //   {
  //     path: "/profile",
  //     name: "profile",
  //     components: {
  //       header: PmsHeader,
  //       default: Profile,
  //       footer: PmsFooter
  //     }
  //   },
  //   {
  //     path: "/starter",
  //     name: "starter",
  //     components: {
  //       header: PmsHeader,
  //       default: Starter,
  //       footer: PmsFooter
  //     }
  //   },
  //   {
  //     path: "/fileUpload",
  //     name: "file-upload",
  //     components: {
  //       header: PmsHeader,
  //       default: FileUpload,
  //       footer: PmsFooter
  //     }
  //   },
  //   {
  //     path: "/excelExport",
  //     name: "excel-export",
  //     components: {
  //       header: PmsHeader,
  //       default: ExcelExport,
  //       footer: PmsFooter
  //     }
  //   },
  //   {
  //     path: "/editSample",
  //     name: "edit-sample",
  //     components: {
  //       header: PmsHeader,
  //       default: EditSample,
  //       footer: PmsFooter
  //     }
  //   },
  //   {
  //     path: "/gridSample",
  //     name: "grid-sample",
  //     components: {
  //       header: PmsHeader,
  //       default: GridSample,
  //       footer: PmsFooter
  //     }
  //   },
  //   {
  //     path: "/gridAndExcel",
  //     name: "grid-excel",
  //     components: {
  //       header: PmsHeader,
  //       default: ExGridAndExcel,
  //       footer: PmsFooter
  //     }
  //   },
  //   {
  //     path: "/exTran",
  //     name: "exTran",
  //     components: {
  //       header: PmsHeader,
  //       default: ExTran,
  //       footer: PmsFooter
  //     }
  //   },
  //   {
  //     path: "/net",
  //     name: "netMain",
  //     components: {
  //       header: PmsHeader,
  //       default: NetMain,
  //       footer: PmsFooter
  //     }
  //   },
  //   {
  //     path: "/SWZP0010",
  //     name: "swzp0010",
  //     components: {
  //       header: PmsHeader,
  //       default: SWZP0010,
  //       footer: PmsFooter
  //     }
  //   },
  //   {
  //     path: "/*",
  //     name: "other",
  //     components: {
  //       default: Login
  //     }
  //   }
  // ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});



