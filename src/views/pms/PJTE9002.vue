<template>
  <!--  -->
  <section class="popup">
    <div class="pop-header">
      <h1>첨부파일등록</h1>
      <a href="#" class="pop-close"></a>
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
            <input type="text" placeholder="가이드 텍스트" style="width: 300px;" v-model="atfl_mng_id" @keyup.enter="fnSearch">
          </td>
        </tr>
        </tbody>
      </table>
      <section class="filter">
        <div class = "col">

          <ul class="filter-btn">
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
              <label class="input-file-button" :for="'input-file'+fileList.sqno">
                업로드
              </label>
              <input :id="'input-file'+fileList.sqno" type="file" @change="handleFileChange($event, fileList.sqno)"  style="display: none"/>
              &nbsp;
              <label class="input-down-button">
                다운로드
              </label>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
    <div class="pop-footer">
      <button class="btn btn-filter-b" @click="close">닫기</button>
      <button class="btn btn-filter-p" @click="fileSave">저장</button>
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
      atfl_mng_id : '1',
      read : true,
      pjt_list: [],
      pjt_selected:'',
      file_rgs_dscd_selected: 100,
      file_rgs_dscds : [100, 200, 201, 300, 400, 500, 600, 700, 800, 900],
      fileLists : [
        {
          sqno: 1,
          file_path: '',
          file_nm: '',
          org_file_nm : 'test11',
          rmrmk : '비고',
          file : null,
        },
        {
          sqno: 2,
          file_path: '',
          file_nm: '',
          org_file_nm : 'test22',
          rmrmk : '비고',
          file : null,
        },

      ],
      afterSearch:false,
      check_array:[],
      file_array:[],

    };
  },
  methods: {
    // 행 추가
    addFile() {
      let sqno = this.fileLists[this.fileLists.length-1].sqno + 1;
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
      console.log(e.target.files[0], sqno)
      let nowDate = new Date();
      let file_nm = nowDate.getHours()+''+nowDate.getMinutes()+''+nowDate.getSeconds();
      for(let i=0; i<this.fileLists.length; i++){
        if(this.fileLists[i].sqno === sqno){
          this.fileLists[i].org_file_nm = e.target.files[0].name;
          this.fileLists[i].file_nm = this.file_rgs_dscd_selected+file_nm;
          this.fileLists[i].file = e.target.files[0];
        }
      }
    },
    // 프로젝트 리스트 가져오기
    getPjt() {
      // "/PJTE9002/select"
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
      this.pjt_selected = this.pjt_list[0].value;
      this.fnSearch();
    },

    // 조회하기
    fnSearch() {
      if(this.atfl_mng_id === ''){
        this.fileLists = [
          {
            sqno: 1,
            file_path: '',
            file_nm: '',
            org_file_nm : '첨부파일ID 없음',
            rmrmk : '첨부파일ID 없음',
            file: null,
          },
        ];
      }else{
        axiosService.get(
            "/PJTE9002/select",
            {
              params : {
                bkup_id:'0000000000',
                prjt_id_selected:'1000000001',
                atfl_mng_id:'1000000001',
                file_rgs_dscd:this.file_rgs_dscd_selected,
              }
            },
        ).then(res => {
          console.log(res);
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
      let login_emp_no = sessionStorage.getItem("LOGIN_EMP_NO");
      let login_proj_id = sessionStorage.getItem("LOGIN_PROJ_ID");
      let login_aut_cd = sessionStorage.getItem("LOGIN_AUT_CD");

      Promise.all(
          this.fileLists.map(async fileList => {
            const formData = new FormData();
            formData.append("login_emp_no", login_emp_no);
            formData.append("login_proj_id", login_proj_id);
            formData.append("login_aut_cd", login_aut_cd);
            formData.append("bkup_id", '0000000000');

            formData.append("prjt_id", '1000000001');
            formData.append("file_rgs_dscd", this.file_rgs_dscd_selected);
            formData.append("atfl_mng_id",  '1000000011');


            formData.append("sqno", fileList.sqno);
            formData.append("file_nm", fileList.file_nm);
            formData.append("org_file_nm", fileList.org_file_nm);
            formData.append("rmrmk", fileList.rmrmk);
            formData.append("file", fileList.file);
            return await axiosService.post("/PJTE9002/insert", formData, {
              headers: {
                'Content-Type' : 'multipart/form-data'
              }
            })
          })
      )
      .then(res => {
        console.log(res);
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