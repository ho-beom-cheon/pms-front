<template>
  <!--  -->
  <section class="popup">
    <div class="pop-header">
      <h1>첨부파일등록</h1>
    </div>
    <div class="pop-body">
      <table>
        <colgroup>
          <col width="140px">
          <col width="*">
          <col width="140px">
          <col width="*">
        </colgroup>
        <tbody>
        <tr>
          <th>프로젝트</th>
          <td>
            <select v-model="pjt_selected" style="width: 300px;" :disabled="read">
              <option
                  v-for   = "(pjt_list,idx) in pjt_list"
                  :key    ="idx"
                  v-text  ="pjt_list.text"
                  :value  ="pjt_list.value"
              ></option>
            </select>
          </td>
          <th>
            파일등록구분
          </th>
          <td>
            <select v-model="file_rgs_dscd_selected" style="width: 300px;" :disabled="read">
              <option
                  v-for   = "(file_rgs_dscd,idx) in file_rgs_dscds"
                  :key    ="idx"
                  v-text  ="file_rgs_dscd"
                  :value  ="file_rgs_dscd"
              ></option>
            </select>
          </td>
        </tr>
        <tr>
          <th>첨부파일관리ID</th>
          <td>
            <input type="text" placeholder="가이드 텍스트" style="width: 300px;" v-model="atfl_mng_id" :disabled="read">
          </td>
        </tr>
        </tbody>
      </table>
      <section class="filter">
        <div class = "col">

          <ul class="filter-btn" v-if="bkup_id === '0000000000'">
            <div class="btn btn-filter-b">
              <a href="#" @click="addFile">행추가</a>
            </div>
            <div class="btn btn-filter-b">
              <a href="#" @click="deleteFile">행삭제</a>
            </div>
          </ul>
        </div>
      </section>
      <hr>
      <table v-if="afterSearch">
        <thead>
          <tr>
            <th>no</th>
            <th>순번</th>
            <th>파일경로</th>
            <th>파일명</th>
            <th>원파일명</th>
            <th>비고</th>
            <th>첨부</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fileList, idx) in fileLists" :key="idx">
            <td>
              <input type="checkbox" v-model="check_array" :value="fileList.sqno"/>
            </td>
            <td>{{fileList.sqno}}</td>
            <td>{{fileList.file_path}}</td>
            <td>{{fileList.file_nm}}</td>
            <td>{{fileList.org_file_nm}}</td>
            <td>
              <input type="text" v-model="fileList.rmrmk" />
            </td>
            <td>
              <label class="input-file-button" :for="'input-file'+fileList.sqno" v-if="bkup_id === '0000000000'">
                업로드
              </label>
              <input :id="'input-file'+fileList.sqno" type="file" @change="handleFileChange($event, fileList.sqno)"  style="display: none"/>
              &nbsp;
              <label class="input-down-button" @click="fileDownload(fileList.file_nm)">
                다운로드
              </label>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
    <div class="pop-footer">
      <button class="btn btn-filter-b" @click="close">닫기</button>
      <button class="btn btn-filter-p" @click="fileSave" v-if="bkup_id==='0000000000'">저장</button>
    </div>
  </section>
</template>

<script>

import { Grid } from '@toast-ui/vue-grid';
import '/node_modules/tui-grid/dist/tui-grid.css';
import {axiosService} from "@/api/http";

export default {
  components : {
    grid: Grid,
  },
  created() {
    this.getPjt();
  },
  data() {
    return {
      bkup_id: this.$route.query.bkup_id,
      atfl_mng_id : this.$route.query.atfl_mng_id,
      read : true,
      pjt_list: [],
      pjt_selected:'',
      file_rgs_dscd_selected: this.$route.query.file_rgs_dscd,
      file_rgs_dscds : [100, 101, 200, 300, 400, 500, 600, 700, 900],
      fileLists : [],
      afterSearch:false,
      check_array:[],
      file_array:[],

    };
  },
  methods: {
    // 행 추가
    addFile() {
      let sqno = Number(this.fileLists[this.fileLists.length-1].sqno) + 1;
      let file_path = '', file_nm = '', org_file_nm = '', rmrmk=''
      this.fileLists.push({
        sqno,file_path, file_nm, org_file_nm, rmrmk
      })
    },
    // 행 삭제
    deleteFile() {
      if(this.check_array.length >= this.fileLists.length){
        alert("행이 1개이상 남아있어야 합니다.");
        return false;
      }
      if(this.check_array.length === 0){
        alert("행을 선택해주세요.");
        return false;
      }else{
        // check된 행들 삭제(sqno 기준)
        this.check_array.map(e => {
          for(let i=0; i<this.fileLists.length; i++){
            if(this.fileLists[i].sqno === e){
              this.fileLists.splice(i, 1);
              break;
            }
          }
        })
        this.check_array = [];
        // 행 삭제 후 순번 재설정
        this.fileLists.map((e,i) => {
          e.sqno = i+1;
        })
        alert("행이 삭제되었습니다.")
      }
    },
    // 파일 첨부 시 핸들링 함수
    handleFileChange(e, sqno) {
      let nowDate = new Date();
      let fileNameCheck = false;
      let file_nm = sessionStorage.getItem("LOGIN_EMP_NO")+'-'+nowDate.getFullYear()+''+('0' + (nowDate.getMonth() + 1)).slice(-2) +''+('0'+nowDate.getDate()).slice(-2)+''
          + ('0'+nowDate.getHours()).slice(-2)+''+('0'+nowDate.getMinutes()).slice(-2)+''+('0'+nowDate.getSeconds()).slice(-2);

      // 기존 첨부파일과 파일명 같으면 업로드 X
      let list_idx = this.fileLists.findIndex( e => e.sqno == sqno);
      for(let i=0; i<this.fileLists.length; i++) {
        if (this.fileLists[i].org_file_nm === e.target.files[0].name && i != list_idx) {
          alert("같은 파일명을 가진 파일은 업로드할 수 없습니다.");
          fileNameCheck = true;
          break;
        }
      }
      if(fileNameCheck) return false;

      for(let i=0; i<this.fileLists.length; i++){
        if(this.fileLists[i].sqno === sqno){
          this.fileLists[i].org_file_nm = e.target.files[0].name;
          this.fileLists[i].file_nm = this.file_rgs_dscd_selected+'-'+file_nm+'.'+e.target.files[0].name.split('.')[1];
          this.fileLists[i].file = e.target.files[0];
        }
      }
    },
    // 프로젝트 리스트 가져오기
    getPjt() {
      axiosService.get(
          "/pjtInfo",
          {
          },
      ).then(res => {
        this.setPjt(res.data.data);
      }).catch(e => {

      });
    },

    // 프로젝트 리스트 셋팅
    setPjt(data) {
      for(let i=0; i<data.length; i++) {
        this.pjt_list.push({"text": data[i].DTLS_TYNM, "value": data[i].DTLS_TYCD});
      }
      this.pjt_selected = this.$route.query.prjt_id;
      this.fnSearch();
    },

    // 조회하기
    fnSearch() {
      if(this.atfl_mng_id === '' || this.atfl_mng_id==null || this.atfl_mng_id===undefined){
        this.fileLists = [
          {
            sqno: 1,
            file_path: '',
            file_nm: '',
            org_file_nm : '',
            rmrmk : '',
            file: null,
          },
        ];
      }else{
        axiosService.get(
            "/PJTE9002/select",
            {
              params : {
                bkup_id:this.$route.query.bkup_id,
                prjt_id_selected:this.$route.query.prjt_id,
                atfl_mng_id:this.$route.query.atfl_mng_id,
                file_rgs_dscd:this.file_rgs_dscd_selected,
              }
            },
        ).then(res => {
          res.data.data.fileList.map(e => {
            this.fileLists.push({
              sqno: e.sqno,
              file_path: e.file_path,
              file_nm: e.file_nm,
              org_file_nm : e.org_file_nm,
              rmrmk : e.rmrmk,
              file: null,
            },)
          })
        }).catch(e => {

        });
      }
      this.afterSearch = true;
    },


    //닫기
    close() {
      opener.fileData(this.fileLists);
      window.close();

    },

    //저장
    async fileSave() {
      if(this.bkup_id != '0000000000'){
        alert("백업정보는 저장할 수 없습니다.");
        return false;
      }
      let login_emp_no = sessionStorage.getItem("LOGIN_EMP_NO");
      let login_proj_id = sessionStorage.getItem("LOGIN_PROJ_ID");
      let login_aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");

      const formData = new FormData();

      this.fileLists.map(async fileList => {

        formData.append("files", fileList.file);
        fileList.file = null;

      })
      formData.append("login_emp_no", login_emp_no);
      formData.append("login_proj_id", login_proj_id);
      formData.append("login_aut_cd", login_aut_cd);
      formData.append("bkup_id", this.bkup_id);

      formData.append("prjt_id", this.pjt_selected);
      formData.append("file_rgs_dscd", this.file_rgs_dscd_selected);
      formData.append("atfl_mng_id",  this.atfl_mng_id);

      formData.append("mng_id", this.$route.query.mng_id); // mng_id 넘겨 받은 값으로 대체하기
      formData.append("bzcd", this.$route.query.bzcd); // bzcd 넘겨 받은 값으로 대체하기
      formData.append("pgm_id", this.$route.query.pgm_id); //pgm_id 넘겨 받은 값으로 대체하기
      formData.append("sqn_cd", this.$route.query.sqn_cd); //sqn_cd 넘겨 받은 값으로 대체하기
      formData.append("tst_case_id", this.$route.query.tst_case_id); //tst_case_id 넘겨 받은 값으로 대체하기
      formData.append("jsonList", JSON.stringify(this.fileLists));

      await axiosService.post("/PJTE9002/insert", formData, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      .then(res => {
        // console.log(res.data);
        if(res.data == "success"){
          alert("첨부파일이 저장되었습니다.")
          opener.fileData(this.fileLists);
          window.close();
        }
      })
      .catch(e => {
        // console.log(e);
      })

    },

    fileDownload(fileName) {
      axiosService.get("/PJTE9002/fileDownload",
          {
              params: {
                fileName
              },
            responseType : "blob"
          }
      )
      .then(res => {
        let blob = new Blob([res.data], { type: res.headers['content-type'] })
        // let fileName = getFileName(res.headers['content-disposition'])
        // fileName = decodeURI(fileName) // 파일명 디코딩 (프로젝트에 따라 사용여부 옵션)

        if (window.navigator.msSaveOrOpenBlob) { // IE 10+
          window.navigator.msSaveOrOpenBlob(blob, fileName)
        } else { // not IE
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.target = '_self'
          if (fileName) link.download = fileName
          link.click()
        }
      })
    }

  },
  mounted() {

    // console.log(sessionStorage.getItem("LOGIN_YN"))
  },
  beforeDestroy() {
    // opener.fileData(this.fileLists)
  },
};
</script>

<style>
.input-file-button{
  padding: 1px 10px;
  background-color:#FF6600;
  color: white;
  cursor: pointer;
}

.input-down-button{
  padding: 1px 10px;
  background-color:#5B5B5B;
  color: white;
  cursor: pointer;
}
</style>