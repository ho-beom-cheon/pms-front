<template>
  <!-- CONTENTS -->
  <div class="contents">
    <div class="div-img"></div>
    <div class="div-img-delete"></div>
    <div class="div-img-cmnt"></div>

    <!-- ASIDE -- LNB -->
    <PmsSideBar></PmsSideBar>
    <!-- 컨텐츠 영역 -->
    <div class="contents-body">
      <!-- 필터영역 -->
      <section class="filter">
        <ul class="filter-con clear-fix" :hidden=true>
          <combo
              :comboArray = "this.comboList"
              @bkup_id_change="bkup_id_change"
              @prjt_nm_chage="prjt_nm_chage"
          ></combo>
          <li class="filter-item">
            <div class="item-con">게시판ID
              <input type="text"
                     v-model="info.gesipan_id"
                     :disabled=true
              >
            </div>
          </li>
          <li class="filter-item">
            <div class="item-con">익명여부
              <input type="text"
                     v-model="info.annym_yn"
                     style   = "width: 50px; background-color: #f2f2f2;"
                     :disabled=true
              >
            </div>
          </li>
        </ul>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box" style="height: 255px">
          <div class="div-header"><h2>게시내역</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-p" style="margin-left: 10px" @click="fnSearch">목록</button>
            </ul>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid1"
                :data="dataSource"
                :header="header"
                :columns="columns1"
                :minBodyHeight="55"
                :bodyHeight="180"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeaders="rowHeaders"
                :rowHeight="rowHeight"
                @click="onClick1"
                @dblclick="dblclick"
                @onGridUpdated="onGridUpdated"
            ></grid>
          </div>
        </div>
        <div>
          <div class="div3-b">
            <div class="div-header"><h2>게시정보</h2>
              <ul class="filter-btn">
                <button class="btn btn-filter-e" style="margin-left: 20px" @click="fnClear">신규</button>
              </ul>
            </div>
            <section class="filter-1000" style="padding-top: 0px">
              <div class="col">
                <ul class="filter-con clear-fix">
                  <li class="filter-item" style="width: 40px">
                    <label>게시제목</label>
                  </li>
                  <li class="filter-item">
                    <div class="item-con">
                      <input type="text"
                             id="iptPstTit"
                             v-model="detail.post_titl"
                             ref="post_titl"
                             style="width: 1550px;"
                             disabled="disabled"
                      >
                    </div>
                  </li>
                </ul>
                <ul class="filter-con clear-fix">
                  <li class="filter-item">
                    <div class="item-con">
                      <th style="vertical-align: middle">
                        게시내용　
                      </th>
                      <td>
                          <textarea cols="145"
                                    rows="20"
                                    style="width: 1550px; height: 240px; line-height: normal;"
                                    id="iptPstDsc"
                                    v-model="detail.post_dsc"
                                    ref="post_dsc"
                                    disabled="disabled"
                          ></textarea>
                      </td>
                    </div>
                  </li>
                </ul>
                <ul class="filter-btn" style="margin-top: 7px;">
                  <ul class="filter-btn" v-if="this.detail.mng_id">
                    <th style="margin-top: 5px; margin-right: 10px">첨부파일  </th>
                    <input type="text"
                           :disabled=true
                           v-model="detail.org_file_nm"
                           style="background-color: #f2f2f2; width: 500px;"
                    >
                    <button class="btn btn-filter-p" style="margin-right: 140px" @click="open_file_page(2)">첨부</button>
                  </ul>
                  <ul class="filter-btn" style="justify-content: flex-start" v-else>
                    <th style="margin-top: 5px; margin-right: 10px;">첨부파일</th>
                    <th style="margin-top: 5px; margin-right: 335px">첨부파일등록은 저장 후 가능합니다.</th>
                  </ul>
                  <li class="filter-item" style="width: 50px">
                    <label style="margin-top: 5px; width: 50px">비밀번호</label>
                  </li>
                  <li class="filter-item">
                    <div class="item-con" style="margin-right: 5px">
                      <input type="text"
                             id="iptTxtPsw"
                             v-model="detail.txt_psw"
                             ref="txt_psw"
                             style="width: 150px;"
                             disabled="disabled"
                      >
                    </div>
                  </li>
                  <button class="btn btn-filter-p" @click="fnSave(2)">등록</button>
                </ul>
              </div>
            </section>
          </div>
        </div>
        <div class="grid1-box" style="height: 242px">
          <div class="div-header"><h2>답글내역</h2>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid2"
                :data="dataSource2"
                :header="header"
                :columns="columns2"
                @click="onClick2"
                :minBodyHeight="55"
                :bodyHeight="167"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeight="rowHeight"
                :rowHeaders="rowHeaders"
            ></grid>
          </div>
        </div>
        <section class="filter">
          <ul class="filter-btn">
            <button class="btn btn-filter-p" style="margin-left: 20px;" @click="fnOpenModal">추가</button>
          </ul>
        </section>
        <br>
        <br>
        <br>
        <br>
        <!--   모달 추가(댓글 추가(댓글내역), 댓글 삭제 추가(비밀번호 입력), 답글정보 추가    -->
        <Modal :show.sync="modals.txt_modal1">
          <div class="modal-pop-body">
            <h2>
              댓글내역
            </h2>
          </div>
          <hr>
          <table>
            <colgroup>
              <col width="60px">
              <col width="*">
              <col width="60px">
              <col width="*">
            </colgroup>
          </table>
          <div>
            <grid
                ref="grid3"
                :data="dataSource3"
                :header="header3"
                :columns="columns3"
                @click="onClick3"
                :bodyHeight="300"
                :width="665"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :editingEvent="editingEvent"
                :rowHeight="rowHeight"
                :minRowHeight="minRowHeight"
                :rowHeaders="rowHeaders"
            ></grid>
          </div>
          <br>
          <br>
          <div class="div-header"><h2>댓글정보</h2></div>
          <table>
            <colgroup>
              <col width="60px">
              <col width="*">
              <col width="60px">
              <col width="*">
            </colgroup>
            <tbody>
            <tr>
              <th>댓글</th>
              <td colspan="4">
                <input type="text"
                       v-model="detail.cmnt_titl"
                       style="width: 260px; margin-right: 25px;"
                >
              </td>
              <th>비밀번호</th>
              <td colspan="4">
                <input type="text"
                       placeholder="비밀번호를 입력해주세요."
                       v-model="detail.txt_psw"
                       style="width: 150px; margin-left: 5px;"
                >
              </td>
            </tr>
            <br>
            <br>
            </tbody>
          </table>
          <div style="float: right">
            <button id="crpenm-edit1" class="btn btn-filter-p" @click="fnSave(1)" style="margin-right: 5px" >등록</button>
            <button id="crpenm-delete1" class="btn btn-filter-p" @click="fnDelete()" style="margin-right: 5px">삭제</button>
            <button id="crpenm-close1" class="btn btn-filter-b" @click="fnCloseModal(1)">닫기</button>
          </div>
        </Modal>
        <Modal :show.sync="modals.txt_modal2">
          <div class="modal-pop-body">
            <h2>
              비밀번호
            </h2>
          </div>
          <hr>
          <div class="item-con" style="margin-right: 5px">
            <input type="text"
                   id="modalId2"
                   v-model="modalTxt"
                   ref="modalTxt"
                   style="width: 150px;"
            >
          </div>
          <div class="item-con" style="margin-right: 5px">
            <input type="hidden"
                   id="gridKey"
                   style="width: 20px;"
            >
          </div>
          <div style="float: right">
            <button id="crpenm-delete2" class="btn btn-filter-p" @click="fnDelete()" style="margin-right: 5px">삭제</button>
            <button id="crpenm-close2" class="btn btn-filter-b" @click="fnCloseModal(2)">닫기</button>
          </div>
        </Modal>
        <Modal :show.sync="modals.txt_modal3">
          <div class="modal-pop-body">
            <h2>
              답글정보
            </h2>
          </div>
          <hr>
          <table>
          <colgroup>
            <col width="60px">
            <col width="*">
            <col width="60px">
            <col width="*">
          </colgroup>
          <tbody>
          <tr>
            <th>답글</th>
            <td colspan="4">
              <input type="text"
                     v-model="detail.rpl_titl"
                     style="width: 260px; margin-right: 25px; background-color: #f2f2f2"
              >
            </td>
            <th>비밀번호</th>
            <td colspan="4">
              <input type="text"
                     placeholder="비밀번호를 입력해주세요."
                     v-model="detail.txt_psw"
                     style="width: 150px; margin-left: 5px;"
              >
            </td>
            <combo
                :comboArray = "this.goodNmList"
                @good_nm_change="good_nm_change"
            ></combo>
          </tr>
          <br>
          <br>
          </tbody>
          </table>
          <div style="float: right">
            <button id="crpenm-edit3" class="btn btn-filter-p" @click="fnSave(3)" style="margin-right: 5px">등록</button>
            <button id="crpenm-close3" class="btn btn-filter-b" @click="fnCloseModal(3)">닫기</button>
          </div>
        </Modal>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import Combo from "@/components/Combo"
import { Grid } from '@toast-ui/vue-grid';
import PmsSideBar from  "@/components/PmsSideBar";
import Modal from  "@/components/Modal";
import 'tui-date-picker/dist/tui-date-picker.css';
import {axiosService} from "@/api/http";


// 첨부파일 팝업에서 받은 값
window.fileData = (fileLists) => {
  window.pms_register.file_name_list = fileLists;
  window.pms_register.detail.atfl_mng_id = fileLists[fileLists.length-1].atfl_mng_id;
}

// 커스텀 이미지 버튼을 만들기 위한 클래스 생성 (댓글)
class CustomRenderer1 {
  constructor(props) {
    const el = document.createElement('img');
    el.src = 'some-image-link';

    this.el = el;
    this.render(props);
  }
  getElement() {
    return this.el;
  }
  render(props) {
    // 댓글 버튼 img
    this.el.src = '/img/ic_cmnt.3c78c4cd.svg';
  }
}

// 커스텀 이미지 버튼을 만들기 위한 클래스 생성 (삭제)
class CustomRenderer2 {
  constructor(props) {
    const el = document.createElement('img');
    el.src = 'some-image-link';

    this.el = el;
    this.render(props);
  }
  getElement() {
    return this.el;
  }
  render(props) {
    // 삭제 버튼 img
    this.el.src = '/img/ic_delete.b3711c12.svg';
  }
}



export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    grid: Grid,
    Modal,
    PmsSideBar
  },
  mounted() {
    // 화면 초기화
    this.init();
    // 화면 접속 시 데이터 조회
    this.fnSearch();
    window.pms_register = this;
  },
  updated(){
    // this.setNo();
  },

// 일반적인 함수를 선언하는 부분
  methods: {
    // Combo.vue 에서 받아온 값
    bkup_id_change(params) {this.info.bkup_id_selected = params},
    prjt_nm_chage(params) {this.info.prjt_nm_selected = params},
    good_nm_change(params) {this.info.good_nm_selected = params},

    // 화면 init
    init() {
      // 그리드 초기화 (게시내역, 답글내역, 댓글내역 등)
      this.$refs.grid1.invoke("clear");
      this.$refs.grid2.invoke("clear");
      this.$refs.grid3.invoke("clear");
      // 그리드1(게시내역), 그리드3(댓글내역) 전체 비활성화
      this.$refs.grid1.invoke("disable");
      this.$refs.grid3.invoke("disable");

      // 시스템 관리자가 아닌경우 자신의 이름과 번호를 조회조건에 바인딩
      if(sessionStorage.getItem("LOGIN_AUT_CD") !== '900'){
        this.info.man_nm = sessionStorage.getItem("LOGIN_EMP_NM")
        this.info.man_no = sessionStorage.getItem("LOGIN_EMP_NO")
      }
    },

    /* 게시정보 저장을 하기위한 필수 항목 체크 */
    // FIXME 비밀번호 정합성 체크
    checkPrimary() {
      if (this.detail.post_titl == "" || this.detail.post_titl == null) {
        alert('게시제목은 필수 입력사항입니다.');
        return false;
      } else if (this.detail.post_dsc == "" || this.detail.post_dsc == null) {
        alert('게시내용은 필수 입력사항입니다.');
        return false;
      } else if (this.detail.txt_psw == "" || this.detail.txt_psw == null) {
        alert('비밀번호는 필수 입력사항입니다.');
        return false;
      }else {
        return true;  // 필수 값 모두 입력 시 true
      }
    },

    onGridUpdated(grid){
      // TODO 게시판 목록에서 파라미터 넘겨오는 값
      // console.log("게시데이터 ::", this.$store.state.pms.GesiData);
      this.info.gesipan_id = this.$store.state.pms.GesiData.gesipan_id
      this.info.annym_yn   = this.$store.state.pms.GesiData.annym_yn

      if(this.info.annym_yn === 'Y'){
         this.validated = false;
         this.$refs.grid1.invoke("showColumn",'post_nm')
         this.$refs.grid2.invoke("showColumn",'empnm')
         this.$refs.grid3.invoke("showColumn",'empnm')
       } else {
         this.validated = true;
         this.$refs.grid1.invoke("hideColumn",'post_nm')
         this.$refs.grid2.invoke("hideColumn",'empnm')
         this.$refs.grid3.invoke("hideColumn",'empnm')
       }
    },

    // 그리드 1 클릭 이벤트 -
    onClick1(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;

      // TODO 댓글 및 삭제 버튼 이벤트 추가 (게시내역, 답글내역, 댓글내역 각자 추가 필요)
      const currentCellData = (this.$refs.grid1.invoke("getFocusedCell"));
      // 댓글내역 조회(모달창)
      if(ev.columnName == 'cmnt_btn') {  // 컬럼명이 <댓글버튼>일 때만 모달 오픈
        this.modals.txt_modal1 = true;
        this.modalTxt = currentCellData.value;
        const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");

        this.info.post_id = this.$refs.grid1.invoke("getValue", this.curRow, "post_id") // ROW 클릭 시 해당 게시글의 답글내역 조회
        axiosService.get("/PJTE9120/select_9120_03", {
          params: {
            prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),
            post_id :this.$refs.grid1.invoke("getValue", this.curRow, "post_id")
          }
        }).then(res => {
          this.$refs.grid3.invoke("setRequestParams", this.info);
          this.$refs.grid3.invoke("readData");
        }).catch(e => {

        });
      }

      if(ev.columnName == 'del_btn') {  // 컬럼명이 <삭제버튼>일 때만 모달 오픈
        this.modals.txt_modal2 = true;
        document.getElementById("gridKey").value = "1"
        this.modalTxt = currentCellData.value;
        const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      }
    },

    // 그리드 2 클릭 이벤트 - 답글내역(그리드2) 삭제 클릭 시 모달 보이기
    onClick2(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;

      const currentCellData = (this.$refs.grid2.invoke("getFocusedCell"));

      if(ev.columnName == 'del_btn') {  // 컬럼명이 <삭제버튼>일 때만 모달 오픈
        this.modals.txt_modal2 = true;
        document.getElementById("gridKey").value = "2"
        this.modalTxt = currentCellData.value;
        const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      }
    },

    // 그리드 3 클릭 이벤트 - 댓글내역(그리드3) 삭제 클릭 시 모달 오픈
    onClick3(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;

      const currentCellData = (this.$refs.grid3.invoke("getFocusedCell"));

      if(ev.columnName == 'del_btn') {  // 컬럼명이 <삭제버튼>일 때만 모달 오픈
        this.modals.txt_modal2 = true;
        document.getElementById("gridKey").value = "3"
        this.modalTxt = currentCellData.value;
        const aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");
      }
    },

    //게시내역(그리드1) ROW 더블클릭 시 게시정보 세부내역 및 답글내역 조회
    dblclick(ev) {
      // 게시내역 ROW 클릭 시 하단 게시정보 input 에 바인딩
      if (ev.columnName == 'dis_post_titl' || ev.columnName == 'post_dt' || ev.columnName == 'post_nm' || ev.columnName == 'view_cnt') {
        this.curRow = ev.rowKey;
        const currentRowData = (this.$refs.grid1.invoke("getRow", this.curRow));
        if (currentRowData != null) {
          this.cellDataBind(currentRowData) // currentRowData 가 있을 때 Row 클릭 시 상세내용에 Bind
        }
      }

      // 답글내역 조회
      this.info.post_id = this.$refs.grid1.invoke("getValue", this.curRow, "post_id") // ROW 클릭 시 해당 게시글의 답글내역 조회
      axiosService.get("/PJTE9120/select_9120_02", {
        params: {
          prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),
          bkup_id_selected: '0000000000',
          post_id :this.$refs.grid1.invoke("getValue", this.curRow, "post_id")
        }
      }).then(res => {
        // console.log("res.data.data ::" + res.data.data)
        //this.setEmpData(res.data.data); // 조회한 데이터로 바인딩

      }).catch(e => {

      });

      // 조회수 증가
      axiosService.put("/PJTE9120/update_9120_01", {
          prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID"),
          post_id :this.$refs.grid1.invoke("getValue", this.curRow, "post_id")
      }).then(res => {
        if(res.status == 200) {
          this.fnSearch()
        }
      }).catch(e => {

      });
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");
    },

    // TODO 비밀번호 정합성 체크 추가
    fnSave(num) {
      console.log('fnSave num?', num)
      if(num == 1) {  // 댓글정보 등록
        let post_Id = this.$refs.grid1.invoke("getValue", this.curRow, "post_id")
        console.log('postId?', post_Id)
        if(post_Id != null && post_Id !== '') {
          console.log('cmnt_titl: ', this.detail.cmnt_titl)
          console.log('prn_cmnt_cd: ', this.detail.prn_cmnt_cd)
          console.log('txt_psw: ', this.detail.txt_psw)

          axiosService.post("/PJTE9120/insert_9120_03", {
            post_id               : this.$refs.grid1.invoke("getValue", this.curRow, "post_id"), // 게시글 ID
            cmnt_titl             : this.detail.cmnt_titl,        // 댓글제목
            prn_cmnt_cd           : this.detail.prn_cmnt_cd,      // 댓글코드
            txt_psw               : this.detail.txt_psw,          // 글비밀번호
            prjt_id               : sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트 ID
            login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO")    // 로그인직원번호
          }).then(res => {
            if (res.data) {
              alert("댓글 등록이 완료되었습니다.");
              this.onClick1()
            } else {
              alert("댓글 등록에 실패하였습니다.")
            }
          })

        }
      } else if(num == 2) { // 게시정보 등록
        // 게시판 id에 따른 게시정보 등록
        // TODO 게시판 ID 하드코딩 제거 필요
        // TODO 최초 저장 이후 첨부파일 등록 open 필요
        let gesipan_id = '0000000001'
        console.log('gesipan_id: ', gesipan_id)
        if(gesipan_id != null && gesipan_id !== '') {
          console.log('post_titl: ', this.detail.post_titl)
          console.log('post_dsc: ', this.detail.post_dsc)
          console.log('txt_psw: ', this.detail.txt_psw)

          axiosService.post("/PJTE9120/insert_9120_01", {
            gesipan_id            : '0000000001',                 // 게시판 ID
            post_titl             : this.detail.post_titl,        // 게시정보_게시제목
            post_dsc              : this.detail.post_dsc,         // 게시글 설명
            txt_psw               : this.detail.txt_psw,          // 글비밀번호
            prjt_id               : sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트 ID
            login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO")    // 로그인직원번호
          }).then(res => {
            if (res.data) {
              alert("게시글 등록이 완료되었습니다.");
              this.init()
              this.fnSearch()
            } else {
              alert("게시글 등록에 실패하였습니다.")
            }
          })

        }
      } else if(num == 3) { // 답글정보 등록
        // 게시내역 선택한 행의 게시글 ID set
        let post_Id = this.$refs.grid1.invoke("getValue", this.curRow, "post_id")
        console.log('postId: ', post_Id)
        if(post_Id != null && post_Id !== '') {
          console.log('rplTitl: ', this.detail.rpl_titl)
          console.log('txtPsw: ', this.detail.txt_psw)
          console.log('goodNmCd: ', this.info.good_nm_selected)

          axiosService.post("/PJTE9120/insert_9120_02", {
            post_id               : this.$refs.grid1.invoke("getValue", this.curRow, "post_id"), // 게시글 ID
            rpl_titl              : this.detail.rpl_titl,         // 답글제목
            txt_psw               : this.detail.txt_psw,          // 글비밀번호
            good_cd               : this.info.good_nm_selected,   // 좋아요 코드
            prjt_id               : sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트 ID
            login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO")    // 로그인직원번호
          }).then(res => {
            if (res.data) {
              alert("답글 등록이 완료되었습니다.");
              this.modals.txt_modal3 = false;
              this.fnSearch()
            } else {
              alert("답글 등록에 실패하였습니다.")
            }
          })

        }
      }
    },

    // TODO 비밀번호 일치 여부 로직 추가
    fnDelete() {
      this.$refs.grid1.invoke("getValue", this.curRow, "post_id")
      let gridKey = document.getElementById("gridKey").value
      console.log('gridKey?', gridKey)

      if(gridKey === "1") {  // 게시정보 삭제
        axiosService.put("/PJTE9120/delete_9120_01", {
          post_id               : this.$refs.grid1.invoke("getValue", this.curRow, "post_id"), // 게시글 ID
          prjt_id               : sessionStorage.getItem("LOGIN_PROJ_ID"),
          login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO")
        }).then(res => {
          if (res.data) {
            alert("삭제가 완료되었습니다.")
            this.modals.txt_modal2 = false; // 비밀번호 입력 모달 닫기
            this.init()
            this.fnSearch();
          } else {
            alert("삭제에 실패하였습니다.")
          }
        })
      } else if(gridKey === "2") { // 답글정보 삭제
        axiosService.put("/PJTE9120/delete_9120_02", {
          post_id               : this.$refs.grid2.invoke("getValue", this.curRow, "post_id"), // 게시글 ID
          rpl_no                : this.$refs.grid2.invoke("getValue", this.curRow, "rpl_no"),  // 답글번호
          prjt_id               : sessionStorage.getItem("LOGIN_PROJ_ID"),
          login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO")
        }).then(res => {
          if (res.data) {
            alert("삭제가 완료되었습니다.")
            this.modals.txt_modal2 = false; // 비밀번호 입력 모달 닫기
            this.init()
            this.fnSearch();
          } else {
            alert("삭제에 실패하였습니다.")
          }
        })
      } else if(gridKey == "3") { // 댓글정보 삭제
        axiosService.put("/PJTE9120/delete_9120_03", {
          prjt_id               : sessionStorage.getItem("LOGIN_PROJ_ID"),
          cmnt_no               : this.$refs.grid3.invoke("getValue", this.curRow, "cmnt_no"), // 댓글번호
          post_id               : this.$refs.grid3.invoke("getValue", this.curRow, "post_id"), // 게시글 ID
          login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO")
        }).then(res => {
          if (res.data) {
            alert("삭제가 완료되었습니다.")
            this.modals.txt_modal2 = false; // 비밀번호 입력 모달 닫기
            this.init()
            this.fnSearch();
          } else {
            alert("삭제에 실패하였습니다.")
          }
        })
      }
    },

    /* 게시내역 Row dblClick 시 게시정보에 Bind */
    cellDataBind(currentRowData) {
      this.detail.post_titl = currentRowData.post_titl;              // (상세)게시글제목
      this.detail.post_dsc = currentRowData.post_dsc;                // (상세)게시글설명
      // TODO 첨부파일 관련 추가 필요
    },

    // 조회한 데이터로 게시내역 데이터 바인딩
    fnSearch(){
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
      //TODO 여러 여부에 따라 그리드 내 컬럼 보이기 및 가리기 추가 필요 (익명, 조회횟수, 댓글, 답글, 파일업로드 여부 등)
    },

    // 첨부파일등록 팝업 오픈
    // TODO function 명 및 내부로직 변경 필요
    setEmpData(data) {
      this.detail.last_chg_dt         = data.contents[0].last_chg_dt           // 최종변경일자
      this.detail.man_no              = data.contents[0].man_no                // 인력번호
      this.detail.man_nm              = data.contents[0].man_nm                // 이름
      this.detail.rank_nm             = data.contents[0].rank_nm               // 직급명
      this.detail.man_cd_selected     = data.contents[0].man_cd                // 인력구분
      this.$refs.combo2.$data.man_cd_selected = data.contents[0].man_cd;       // 인력구분(콤보)
      this.detail.birthday            = data.contents[0].birthday              // 생년월
      this.$refs.combo3.$data.skill_grd_selected = data.contents[0].skill_grd;       // 인력구분(콤보)
      this.detail.career              = data.contents[0].career                // 경력
      this.$refs.combo4.$data.grd_cd_selected = data.contents[0].grd_cd;       // 인력구분(콤보)
      this.detail.atfl_mng_id         = data.contents[0].atfl_mng_id           // 첨부파일관리ID
    },

    // 첨부파일 추가 팝업 오픈
    open_file_page() {
      let file_rgs_dscd = '801'
      let atfl_mng_id = this.detail.atfl_mng_id
      let mng_id = this.detail.man_no
      let bkup_id = '0000000000', prjt_id = sessionStorage.getItem("LOGIN_PROJ_ID")
      window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&mng_id=${mng_id}&atfl_mng_id=${atfl_mng_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
    },

    // [신규] 버튼 클릭 시 상세내용 값 초기화
    fnClear() {
      this.detail.post_titl           = '' // 게시제목
      this.detail.post_dsc            = '' // 게시글설명
      this.detail.atfl_mng_id         = '' // 첨부파일관리 ID
      document.getElementById('iptPstTit').disabled = false;
      document.getElementById('iptPstDsc').disabled = false;
      document.getElementById('iptTxtPsw').disabled = false;

      // 그리드2(답글내역), 그리드3(댓글내역) 초기화
      this.$refs.grid2.invoke("clear");
    },

    fnOpenModal() {
      this.modals.txt_modal3 = true;
    },

    fnCloseModal(num){  // 모달창 닫기
      if(num == 1) {
        this.modals.txt_modal1 = false;
      } else if(num == 2) {
        this.modals.txt_modal2 = false;
      } else if(num == 3) {
        this.modals.txt_modal3 = false;
      }
    },

  },
// 특정 데이터에 실행되는 함수를 선언하는 부분
// newValue, oldValue 두개의 매개변수를 사용할 수 있음
  watch:{

  },

  // 변수 선언부분
  data() {
    return {
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C27","C0"], //C27 = 프로젝트 ID, C0 = 백업 ID
      goodNmList : ["C46"],     //C46 = 좋아요

      file_name_list: [],

      info : {
        prjt_nm_selected      : sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트명
        bkup_id_selected      : '0000000000',     // 백업 ID
        gesipan_id            : this.$store.state.pms.GesiData.gesipan_id,               // 게시판 ID
        annym_yn              : '',               // 익명여부
        post_id               : '',               //게시글 id
      },
      detail : {
        // 게시내역 dtl
        dis_post_titl       : '',                 // 화면용게시글제목
        post_dt             : '',                 // 게시일자
        post_nm             : '',                 // 게시자
        view_cnt            : '',                 // 조회횟수
        // 게시정보 dtl
        post_titl           : '',                 // 게시글제목
        post_dsc            : '',                 // 게시글설명
        txt_psw             : '',                 // 글비밀번호 (+답글내역 dtl + 댓글내역 dtl)
        atfl_mng_id         : '',                 // 첨부파일관리 ID
        bkup_id             : '',                 // 백업 ID
        prjt_id             : '',                 // 프로젝트 ID (+답글내역 dtl + 댓글내역 dtl)
        post_id             : '',                 // 게시글 ID (+답글내역 dtl + 댓글내역 dtl)
        gesipan_id          : '',                 // 게시판 ID
        org_file_nm         : '',                 // 원파일명
        // 답글내역 dtl
        rpl_titl            : '',                 // 답글제목
        rpl_db_chg_ts       : '',                 // 답글등록일시
        good_nm             : '',                 // 좋아요구분명
        rpl_emp_nm          : '',                 // 답글등록자
        rpl_no              : '',                 // 답글번호
        // 댓글내역 dtl
        cmnt_titl           : '',                 // 댓글제목
        cmnt_db_chg_ts      : '',                 // 댓글등록일시
        cmnt_emp_nm         : '',                 // 댓글등록자
        cmnt_no             : '',                 // 댓글번호
        prn_cmnt_cd         : '',                 // 상위댓글코드
      },
      login : {
        login_aut_cd          : sessionStorage.getItem("LOGIN_AUT_CD"),    // 권한ID
        login_proj_id         : sessionStorage.getItem("LOGIN_PROJ_ID"),   // 프로젝트ID
        login_bzcd            : sessionStorage.getItem("LOGIN_BZCD"),      // 업무구분
        login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO"),    // 직원번호
        login_emp_nm          : sessionStorage.getItem("LOGIN_EMP_NM"),    // 직원명
        login_catn_dcd        : sessionStorage.getItem("LOGIN_CATN_DCD"),  // 구성원 구분코드
      },

      /* grid 속성 */
      count:0,
      curRow:-1,
      title:"",
      scrollX:false,
      scrollY:false,
      bodyHeight: 630,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: false,
      editingEvent : "click",

      /* 그리드 상세보기 및 등록 모달 속성 */
      modals: {
        txt_modal1: false,  // 댓글내역
        txt_modal2: false,  // 삭제 시 비밀번호
        txt_modal3: false,  // 답글정보
      },
      modalTxt:this.modalTxt,

      // toast ui grid 데이터
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9120/select_9120_01', method: 'GET' },
          updateData : { url: process.env.VUE_APP_API + '/PJTE9120/update_9120_01', method: 'PUT'},
        },
        initialRequest: false,
        contentType : 'application/json;',
        headers : {  'x-custom-header' : 'custom-header'  },
        withCredentials: false,
      },
      dataSource2: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9120/select_9120_02', method: 'GET' },
        },
        initialRequest: false,
        contentType : 'application/json;',
        headers : {  'x-custom-header' : 'custom-header'  },
        withCredentials: false,
      },
      dataSource3: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9120/select_9120_03', method: 'GET' },
        },
        initialRequest: false,
        contentType : 'application/json;',
        headers : {  'x-custom-header' : 'custom-header'  },
        withCredentials: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders:['rowNum'],
      header:  {height: 25,},
      header3: {height: 30,},
      columns1: [ //게시내역
        {
          header: '게시제목',
          width: 520,
          align: 'left',
          name: 'dis_post_titl',
          editor: 'text',
        },
        {
          header: '게시제목',
          width: 320,
          align: 'center',
          name: 'post_titl',
          editor: 'text',
          hidden: true,
        },
        {
          header: '게시일시',
          width: 150,
          align: 'center',
          name: 'post_dt',
          editor: 'text',
        },
        {
          header: '게시자',
          width: 80,
          align: 'center',
          name: 'post_nm',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '조회수',
          width: 50,
          align: 'center',
          name: 'view_cnt',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '댓글',
          width: 50,
          align: 'center',
          name: 'cmnt_btn',
          renderer: CustomRenderer1,
          hidden: true,
        },
        {
          header: '삭제',
          width: 50,
          align: 'center',
          name: 'del_btn',
          renderer: CustomRenderer2,
          editor: 'text',
        },
        // 숨김처리 추가
        {
          header: '게시글설명',
          align: 'center',
          name: 'post_dsc',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '글비밀번호',
          width: 50,
          align: 'center',
          name: 'txt_psw',
          editor: 'text',
          hidden: true,
        },
        {
          header: '첨부파일관리ID',
          width: 80,
          align: 'center',
          name: 'atfl_mng_id',
          editor: 'text',
          hidden: true,
        },
        {
          header: '게시글 ID',
          width: 100,
          align: 'center',
          name: 'post_id',
          editor: 'text',
          hidden: true,
        },
        {
          header: '백업 ID',
          width: 100,
          align: 'center',
          name: 'bkup_id',
          editor: 'text',
          hidden: true,
        },
      ],
      columns2: [ //답글내역
        {
          header: '게시글ID',
          width: 100,
          align: 'center',
          name: 'post_id',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '답글번호',
          width: 10,
          align: 'center',
          name: 'rpl_no',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '답글',
          width: 500,
          align: 'left',
          name: 'rpl_titl',
          editor: 'text',
        },
        {
          header: '등록일시',
          width: 150,
          align: 'center',
          name: 'db_chg_ts',
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy-MM-dd HH:mm:ss',
              type: 'month',
            }
          },
          disabled: true,
        },
        {
          header: '좋아요',
          width: 100,
          align: 'center',
          name: 'good_nm',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '등록자',
          width: 100,
          align: 'center',
          name: 'empnm',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '삭제',
          width: 50,
          align: 'center',
          name: 'del_btn',
          renderer: CustomRenderer2,
          editor: 'text',
        },
      ],
      columns3: [ //댓글내역
        {
          header: '댓글',
          width: 200,
          align: 'left',
          name: 'cmnt_titl',
          editor: 'text',
          whiteSpace: 'pre',
        },
        {
          header: '등록일시',
          width: 150,
          align: 'center',
          name: 'db_chg_ts',
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy-MM',
              type: 'month',
            }
          },
        },
        {
          header: '등록자',
          width: 100,
          align: 'center',
          name: 'empnm',
          editor: 'text'
        },
        {
          header: '삭제',
          width: 50,
          align: 'center',
          name: 'del_btn',
          renderer: CustomRenderer2,
          editor: 'text',
        },
        {
          header: '댓글번호',
          width: 30,
          align: 'center',
          name: 'cmnt_no',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '상위댓글번호',
          width: 100,
          align: 'center',
          name: 'prn_cmnt_cd',
          editor: 'text',
          //hidden: true,
        },
        {
          header: '비밀번호',
          width: 50,
          align: 'center',
          name: 'txt_psw',
          editor: 'text',
          //hidden: true,
        },
      ],
    }
  },
};

</script>
<style>
</style>
