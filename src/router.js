let menuList = [];
let menuListStr = [];
let arrRoutes = [];

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
const Tmp = () => import(/* webpackChunkName: "Tmp" */ './views/example/Tmp.vue'); menuList.push(Tmp); menuListStr.push("Tmp");

/* PMS */
const SWZP0010 = () => import(/* webpackChunkName: "SWZP0010" */ './views/pms/SWZP0010.vue'); menuList.push(SWZP0010); menuListStr.push("SWZP0010");
const SWZP0014 = () => import(/* webpackChunkName: "SWZP0014" */ './views/pms/SWZP0014.vue'); menuList.push(SWZP0014); menuListStr.push("SWZP0014");
const SWZP0030 = () => import(/* webpackChunkName: "SWZP0030" */ './views/pms/SWZP0030.vue'); menuList.push(SWZP0030); menuListStr.push("SWZP0030");
const SWZP0040 = () => import(/* webpackChunkName: "SWZP0040" */ './views/pms/SWZP0040.vue'); menuList.push(SWZP0040); menuListStr.push("SWZP0040");
const SWZP0041 = () => import(/* webpackChunkName: "SWZP0041" */ './views/pms/SWZP0041.vue'); menuList.push(SWZP0041); menuListStr.push("SWZP0041");
const SWZP0050 = () => import(/* webpackChunkName: "SWZP0050" */ './views/pms/SWZP0050.vue'); menuList.push(SWZP0050); menuListStr.push("SWZP0050");
const SWZP0060 = () => import(/* webpackChunkName: "SWZP0060" */ './views/pms/SWZP0060.vue'); menuList.push(SWZP0060); menuListStr.push("SWZP0060");
const SWZP0070 = () => import(/* webpackChunkName: "SWZP0070" */ './views/pms/SWZP0070.vue'); menuList.push(SWZP0070); menuListStr.push("SWZP0070");
const SWZP0080 = () => import(/* webpackChunkName: "SWZP0080" */ './views/pms/SWZP0080.vue'); menuList.push(SWZP0080); menuListStr.push("SWZP0080");
const SWZP0090 = () => import(/* webpackChunkName: "SWZP0090" */ './views/pms/SWZP0090.vue'); menuList.push(SWZP0090); menuListStr.push("SWZP0090");
const SWZP0100 = () => import(/* webpackChunkName: "SWZP0100" */ './views/pms/SWZP0100.vue'); menuList.push(SWZP0100); menuListStr.push("SWZP0100");
const SWZP0110 = () => import(/* webpackChunkName: "SWZP0110" */ './views/pms/SWZP0110.vue'); menuList.push(SWZP0110); menuListStr.push("SWZP0110");

/* BOARD */
const RefBoard = () => import(/* webpackChunkName: "RefBoardList" */ './views/board/RefBoardList.vue'); menuList.push(RefBoard); menuListStr.push("RefBoard");
const RefBoardReg = () => import(/* webpackChunkName: "RefBoardReg" */ './views/board/RefBoardReg.vue'); menuList.push(RefBoardReg); menuListStr.push("RefBoardReg");

Vue.use(Router);

let aRootPath = new Object();

aRootPath.path = "/";
aRootPath.redirect = "/login";
arrRoutes.push(aRootPath) ; 

for(var idx=0; idx < menuListStr.length; idx++){

  let tmpObj = new Object();

  tmpObj.path = "/" + menuListStr[idx].toLowerCase() ;
  tmpObj.name = menuListStr[idx].toLowerCase() ;
  
  if( "/login/Tmp/SWZP0041/".indexOf(menuListStr[idx]) > 0 ) {
    tmpObj.components = { default:menuList[idx] } ;  
  } else {
    tmpObj.components = { header:PmsHeader, footer:PmsFooter, default:menuList[idx] } ;
  }
  arrRoutes.push(tmpObj);
}

let aOtherPath = new Object();

aOtherPath.path = "/*";
aOtherPath.name = "/other";
aOtherPath.components = { default:Login } ;
arrRoutes.push(aOtherPath) ; 

export default new Router({
  mode:'history',
  linkExactActiveClass: "active",
  routes : arrRoutes,
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});



