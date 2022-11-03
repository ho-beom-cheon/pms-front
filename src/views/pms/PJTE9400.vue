<template>
  <!-- CONTENTS test -->
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
        <ul class="filter-con clear-fix">
          <combo
              :comboArray = "this.comboList"
              @bkup_id_change="bkup_id_change"
              @prjt_nm_chage="prjt_nm_chage"
          ></combo>
        </ul>
        <ul class="filter-btn">
          <button class="btn btn-filter-p" style="margin-left: 20px;" @click="fnSearch">조회</button>
        </ul>
      </section>
      <!-- page contents -->
      <section class="page-contents">
        <section class="filter">
          <ul class="filter-btn">
            <button class="btn btn-filter-d" @click="batchDownload">첨부파일일괄다운로드ⓘ</button>
            <button class="btn btn-filter-e" @click="gridExcelExport">엑셀다운로드</button>
            <button class="btn btn-filter-e" style="margin-left: 20px;" @click="fnOpenModal(1)">최상위폴더생성</button>
          </ul>
        </section>
        <div class="grid1-box" style="height: 650px">
          <div class="div-header"><h2>폴더정보</h2>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid1"
                :data="dataSource1"
                :header="header"
                :columns="columns1"
                @dblclick="dblclick"
                @click="onClick"
                :minBodyHeight="55"
                :bodyHeight="550"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeight="rowHeight"
                :rowHeaders="rowHeaders"
                @onGridUpdated="onGridUpdated1"
            ></grid>
          </div>
        </div>
        <br>
        <br>
        <br>
        <br>

        <Modal :show.sync="modals.txt_modal1">
          <div class="modal-pop-body" >
            <h2>
              ※ 폴더정보
            </h2>
          </div>
          <hr>
          <ul style="height: 30px">
            <li class="filter-item-a">
              <div class="item-con line-con">
                <label>폴더명</label>
                <input type="text"
                       v-model="detail.fld_nm"
                       style="width: 400px;"
                >
              </div>
            </li>
          </ul>
          <ul style="height: 100px">
            <li class="filter-item-a">
              <div class="item-con line-con">
                <label style="padding-left: 10px">비고</label>
                <textarea
                    id="modalId"
                    cols="62"
                    rows="6"
                    v-model="detail.rmrk"
                    style="margin-bottom: 10px; line-height: normal; padding-top: 5px"
                ></textarea>
              </div>
            </li>
          </ul>
          <br>
          <div style="float: right">
            <button id="crpenm-edit3" class="btn btn-filter-p" @click="fnSave()" style="margin-right: 5px">저장</button>
            <button id="crpenm-close3" class="btn btn-filter-b" @click="fnCloseModal()">닫기</button>
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
window.fileData = (fileLists, num) => {
  console.log(fileLists);
  window.pms_register.file_name_list = fileLists;
  window.pms_register.atfl_num = num;
  window.pms_register.atfl_mng_id_yn = fileLists[1].atfl_mng_id;
  window.pms_register.atfl_mng_id = fileLists[1].atfl_mng_id;
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

let currentRowData;

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    Combo,
    grid: Grid,
    Modal,
    PmsSideBar
  },
  props: {
    getRow: {
          type: Array,
      },
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

    // 화면 init
    init() {
      // 그리드 초기화 (게시내역, 답글내역, 댓글내역 등)
      this.$refs.grid1.invoke("clear");

      // 그리드1(게시내역), 그리드3(댓글내역) 전체 비활성화
      this.$refs.grid1.invoke("disable");

    },

    // 폴더명 정합성 체크
    fldNmCheckPrimary() {
      if(this.detail.fld_nm === "" || this.detail.fld_nm == null) {
        alert('폴더명을 입력해주세요.');
        return false;
      }else {
        return true;  // 필수 값 모두 입력 시 true
      }
    },

    onGridUpdated1(grid){
      this.$refs.grid1.invoke("addColumnClassName","del_btn", "del-btn-img");
      this.$refs.grid1.invoke("addColumnClassName","new_btn", "new-btn-img");
      this.$refs.grid1.invoke("addColumnClassName","upload_btn", "upload-btn-img");
    },

    onClick(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
      let gridData = this.$refs.grid1.invoke("getRow",this.curRow);

      // TODO 댓글 및 삭제 버튼 이벤트 추가 (게시내역, 답글내역, 댓글내역 각자 추가 필요)
      const currentCellData = (this.$refs.grid1.invoke("getFocusedCell"));
      currentRowData = (this.$refs.grid1.invoke("getRow", this.curRow));

      if(this.curRow === undefined){
        return
      }

      // 게시내역 ROW 클릭 시 하단 게시정보 input 에 바인딩
      if (ev.columnName == 'new_btn') {
        this.detail.coh_hgrn_mng_id = currentRowData.hgrn_mng_id;
        this.fnOpenModal(2);
      }

      if(ev.columnName == 'del_btn'){
        if (confirm("정말 삭제하시겠습니까?") === true) {
          this.fnDelete();
        }
      }
      // grid 셀 클릭 시 윈도우 팝업 호출(함수화예정)
      if(ev.columnName === 'upload_btn') {
        this.count = 1
        let bkup_id='0000000000', prjt_id=sessionStorage.getItem("LOGIN_PROJ_ID"), atfl_mng_id=gridData.atfl_mng_id != null?gridData.atfl_mng_id:'', file_rgs_dscd='805',mng_id=gridData.fld_mng_id
        this.pop = window.open(`../PJTE9002/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&atfl_mng_id=${atfl_mng_id}&mng_id=${mng_id}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=800");
      }

    },

    // 그리드 1 클릭 이벤트 -
    dblclick(ev) {
      // 현재 Row 가져오기
      this.curRow = ev.rowKey;
      if(this.curRow === undefined){
        return
      }
      // TODO 댓글 및 삭제 버튼 이벤트 추가 (게시내역, 답글내역, 댓글내역 각자 추가 필요)
      const currentCellData = (this.$refs.grid1.invoke("getFocusedCell"));
      currentRowData = (this.$refs.grid1.invoke("getRow", this.curRow));

      // 게시내역 ROW 클릭 시 하단 게시정보 input 에 바인딩
      if (ev.columnName != 'atfl_mng_id_yn' || ev.columnName != 'del_btn' || ev.columnName != 'new_btn') {
        this.fnOpenModal(3);
      }
    },
    // 엑셀 다운로드
    gridExcelExport(){
      this.$refs.grid1.invoke("export", "xlsx",{fileName: "파일관리_"+this.getCurrentYyyymmdd(), useFormattedValue : true, onlySelected:true});
    },

    getCurrentYyyymmdd() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = ("0" + date.getDate()).slice(-2);

      if(month < 10){
        month = "0"+month;
      }
      return year + '-' +  month + '-' + day;
    },

    // 첨부파일 일괄다운로드
    batchDownload(){
      let bkup_id='0000000000', prjt_id=sessionStorage.getItem("LOGIN_PROJ_ID"), bzcd=sessionStorage.getItem("LOGIN_BZCD"), file_rgs_dscd = '805' //atfl_mng_id 값은 양식 파일 첨부 ID 추후에 추가
      this.pop = window.open(`../PJTE9003/?bkup_id=${bkup_id}&prjt_id=${prjt_id}&bzcd=${bzcd}&file_rgs_dscd=${file_rgs_dscd}`, "open_file_page", "width=1000, height=710");
    },

    fnSave() {
      if(this.modalSno ==  '1') {  // 상위생성 클릭 후 저장버튼
        //폴더명 벨레데이션 체크
        if(this.fldNmCheckPrimary() === false) {return}

          axiosService.post("/PJTE9400/insert", {
            coh_hgrn_mng_id       : '',                          // 게시글 ID
            fld_nm                : this.detail.fld_nm,                           // 댓글제목
            rmrk                  : this.detail.rmrk,                             // 댓글코드
            prjt_id               : sessionStorage.getItem("LOGIN_PROJ_ID"),     // 프로젝트 ID
            login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO")       // 로그인직원번호
          }).then(res => {
            if (res.data) {
              alert("상위생성이 완료되었습니다.");
              this.modalSno = ''
              this.fnSearch()
              this.fnCloseModal()
            } else {
              alert("상위생성에 실패하였습니다.")
              this.modalSno = ''
            }
          })

      } else if(this.modalSno ==  '2') { // 게시정보 등록
        // 게시판 id에 따른 게시정보 등록
        // TODO 게시판 ID 하드코딩 제거 필요
        // TODO 최초 저장 이후 첨부파일 등록 open 필요
        if(this.fldNmCheckPrimary() === false) {return}
            axiosService.post("/PJTE9400/insert", {
              coh_hgrn_mng_id       : this.detail.coh_hgrn_mng_id,                          // 게시글 ID
              fld_nm                : this.detail.fld_nm,                           // 댓글제목
              rmrk                  : this.detail.rmrk,                             // 댓글코드
              prjt_id               : sessionStorage.getItem("LOGIN_PROJ_ID"),     // 프로젝트 ID
              login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO")       // 로그인직원번호
            }).then(res => {
              if (res.data) {
                alert("하위생성이 완료되었습니다.");
                this.modalSno = '';
                this.init();
                this.fnSearch();
                this.fnCloseModal()
              } else {
                alert("하위생성에 실패하였습니다.");
                this.modalSno = '';
              }
            })
      } else if(this.modalSno ==  '3') { // 답글정보 등록
        //폴더명 벨레데이션 체크
        if(this.fldNmCheckPrimary() === false) {
          return
        }
          axiosService.put("/PJTE9400/update", {
            fld_nm               : this.detail.fld_nm, // 게시글 ID
            rmrk                 : this.detail.rmrk,         // 답글제목
            fld_mng_id           : this.detail.fld_mng_id,    // 파일관리번호
            prjt_id               : sessionStorage.getItem("LOGIN_PROJ_ID"),  // 프로젝트 ID
            login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO")    // 로그인직원번호
          }).then(res => {
            if (res.data) {
              alert("폴더정보 수정이 완료되었습니다.");
              this.$refs.grid1.invoke('readData')
              this.fnCloseModal()
            } else {
              alert("폴더정보 수정이 실패하였습니다.")
            }
          })
      }
    },

    // TODO 비밀번호 일치 여부 로직 추가
    fnDelete() {
      const currentCellData = (this.$refs.grid1.invoke("getFocusedCell"));
      currentRowData = (this.$refs.grid1.invoke("getRow", this.curRow));

      console.log(currentRowData.hgrn_mng_id);
        axiosService.put("/PJTE9400/update01", {
          hgrn_mng_id           : currentRowData.hgrn_mng_id, // 게시글 ID
          prjt_id               : sessionStorage.getItem("LOGIN_PROJ_ID"),
          login_emp_no          : sessionStorage.getItem("LOGIN_EMP_NO")
        }).then(res => {
          if (res.data) {
            alert("삭제가 완료되었습니다.")
            this.modals.txt_modal2 = false; // 비밀번호 입력 모달 닫기
            this.init()
            this.$refs.grid1.invoke("readData")
          } else {
            alert("삭제에 실패하였습니다.")
          }
        })
    },

    // 조회한 데이터로 게시내역 데이터 바인딩
    fnSearch(){
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
      //TODO 여러 여부에 따라 그리드 내 컬럼 보이기 및 가리기 추가 필요 (익명, 조회횟수, 댓글, 답글, 파일업로드 여부 등)
    },

    fnOpenModal(num) {
      if(num == 1){
        this.detail.fld_nm     = '';      //폴더명
        this.detail.rmrk       = '';      //비고
        this.modalSno = '1'
        this.modals.txt_modal1 = true;
      }else if(num == 2){
        this.modalSno = '2'
        this.detail.fld_nm     = '';      //폴더명
        this.detail.rmrk       = '';      //비고
        this.modals.txt_modal1 = true;
      }else if(num == 3){
        this.modalSno = '3'
        this.detail.fld_mng_id  = currentRowData.fld_mng_id;
        this.detail.fld_nm      = currentRowData.fld_nm;
        this.detail.rmrk        = currentRowData.rmrk;
        this.modals.txt_modal1  = true;
      }
    },

    fnCloseModal(){  // 모달창 닫기
        this.modals.txt_modal1 = false;
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
      modalSno    : '',
      atfl_mng_id         : '',  // 단위테스트 케이스 첨부파일관리
      atfl_mng_id_yn      : '',  // 단위테스트 케이스 첨부파일관리

      file_name_list: [],    // 첨부파일 데이터

      info : {
        prjt_nm_selected      : sessionStorage.getItem("LOGIN_PROJ_ID"), // 프로젝트명
        bkup_id_selected      : '0000000000',     // 백업 ID
      },
      detail : {
        fld_nm              : '',     //폴더명
        rmrk                : '',     //비고
        fld_mng_id          : '',     //파일관리번호
        coh_hgrn_mng_id     : '',     //선택된상위폴더

        atfl_mng_id         : this.atfl_mng_id,  // 단위테스트 케이스 첨부파일관리
        atfl_mng_id_yn      : this.atfl_mng_id_yn,  // 단위테스트 케이스 첨부파일관리

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
        txt_modal1: false,  // 폴더정보
      },
      modalTxt:this.modalTxt,

      // toast ui grid 데이터
      dataSource1: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9400/select', method: 'GET' },
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
      header:    { height: 25,},

      columns1: [ //답글내역
        {
          header: '하위폴더생성',
          width: 90,
          align: 'right',
          name: 'new_btn',
        },
        {
          header: '파일업로드',
          width: 90,
          align: 'center',
          name: 'upload_btn',
        },
        {
          header: '폴더(등록건수)',
          align: 'left',
          width: 550,
          name: 'dis_fld_nm',
          whiteSpace: 'pre',
          filter: 'text',
        },
        {
          header: '비고',
          width: 800,
          align: 'left',
          name: 'rmrk',
          editor: 'text',
          filter: 'text',
        },
        {
          header: '삭제',
          width: 70,
          align: 'center',
          name: 'del_btn',
        },
        {
          header: '폴더명',
          width: 100,
          align: 'left',
          name: 'tm_nm',
          editor: 'text',
          hidden : true,
        },
        {
          header: '첨부파일파일관리id',
          width: 100,
          align: 'left',
          name: 'atfl_mng_id',
          editor: 'text',
          hidden : true,
        },
        {
          header: '선택상위관리id',
          width: 100,
          align: 'left',
          name: 'coh_hgrn_mng_id',
          editor: 'text',
          hidden : true,
        },
        {
          header: '상위관리id',
          width: 100,
          align: 'left',
          name: 'hgrn_mng_id',
          editor: 'text',
          hidden : true,
        },
        {
          header: '폴더관리id',
          width: 100,
          align: 'left',
          name: 'fld_mng_id',
          editor: 'text',
          hidden : true,
        },
        {
          header: '프로젝트id',
          width: 100,
          align: 'left',
          name: 'prjt_id',
          editor: 'text',
          hidden : true,
        },
        {
          header: '백업id',
          width: 100,
          align: 'left',
          name: 'bkup_id',
          editor: 'text',
          hidden : true,
        },
      ],
    }
  },
};

</script>
<style>
.modal-content {
  width :900px;
}
.modal-body .modal-mid{
    background-color: #fff;
    font-weight: bold;
    font-size: 15px;
    height: 5vh;
    width : 700px;
    margin: 20px;
}
.line-con {
  display:flex
}

</style>
