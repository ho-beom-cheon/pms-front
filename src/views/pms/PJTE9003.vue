<template>
  <!--  -->
  <section class="popup">
    <div class="pop-header">
      <h1>일괄다운로드</h1>
    </div>
    <div class="pop-body">
      <section class="filter">
        <div class = "col">
          <ul class="filter-con clear-fix">
            <combo
                :comboArray = "this.comboList"
                @bkup_id_change="bkup_id_change"
                @prjt_nm_chage="prjt_nm_chage"
                @bzcd_change="bzcd_change"
            >
            </combo>
          </ul>
          <ul style="list-style: none; margin-top: 5px">
            <combo
                :comboArray2 = "this.comboList2"
                @file_rgs_dscd_change="file_rgs_dscd_change"
                style="float: left; margin-right: 15px"
            >
            </combo>
            <li style="float: left;">
              <label for="name" style="margin-right: 3px">산출물구분 </label>
              <input type="text" v-model="info.sah_file_nm" id="name" style="width: 180px" placeholder="입력하세요">
            </li>
            <li class="filter-btn">
              <button class="btn btn-filter-p" @click="fnSearch">조회</button>
            </li>
          </ul>
        </div>
      </section>
      <hr>
      <!-- page contents -->
      <section class="page-contents">
        <div class="div-header"><h2>다운로드 리스트</h2></div>
        <!-- grid contents -->
        <div class="gridWrap">
          <grid
              ref="grid"
              :data="dataSource"
              :header="header"
              :columns="columns"
              :bodyHeight="bodyHeight"
              :showDummyRows="showDummyRows"
              :columnOptions="columnOptions"
              :rowHeight="rowHeight"
              :minRowHeight="minRowHeight"
              :rowHeaders="rowHeaders"
              @onGridUpdated="onGridUpdated"
          ></grid>
        </div>
        <hr>
        <table>
          <colgroup>
            <col width="80px">
            <col width="250px">
            <col width="400px">
            <col width="300px">
          </colgroup>
          <tr>
            <th style="font-weight: bold">다운로드파일명</th>
            <td>
              <div class="item-con">
                <div class="radio">
                  <input type="radio" id="option01" v-model="radioValues" value="radio01" name="radio-set">
                  <label for="option01">서버파일명</label>
                </div>
                <div class="radio">
                  <input type="radio" id="option02" v-model="radioValues" value="radio02" name="radio-set">
                  <label for="option02">원본파일명</label>
                </div>
                <div class="radio">
                  <input type="radio" id="option03" v-model="radioValues" value="radio03" name="radio-set">
                  <label for="option03">산출물양식명</label>
                </div>
              </div>
            </td>
            <td>
              <button class="btn btn-filter-b" @click="fileDownload()">다운로드</button>
            </td>
          </tr>
        </table>
      </section>
    </div>
    <div class="pop-footer">
      <button class="btn btn-filter-b" @click="closePopup">닫기</button>
    </div>
  </section>
</template>

<script>

import { Grid } from '@toast-ui/vue-grid';
import '/node_modules/tui-grid/dist/tui-grid.css';
import {axiosService} from "@/api/http";
import combo from "@/components/Combo";
import Inputs from "@/views/components/Inputs";

export default {
  components : {
    Inputs,
    grid: Grid,
    combo
  },
  mounted() {
    this.fnSearch()
    this.radioValues = "radio01"
  },

  watch: {
  },
  methods: {
    bkup_id_change(params) {this.info.bkup_id_selected = params},
    prjt_nm_chage(params) {this.info.prjt_nm_selected = params},
    bzcd_change(params) {this.info.bzcd_selected = params},
    file_rgs_dscd_change(params) {this.info.file_rgs_dscd_selected = params},

    // 조회
    fnSearch() {
      this.$refs.grid.invoke("setRequestParams", this.info);
      this.$refs.grid.invoke("readData");
    },
    // 수정 후 실행
    onGridUpdated() {
    },
    // 화면 종료
    closePopup() {
      window.close();
    },
    // 파일 다운로드
    fileDownload() {
      this.gridData = this.$refs.grid.invoke("getCheckedRows");
      if(this.gridData.length === 0){
        alert("다운로드 받을 데이터를 선택하세요");
        return;
      }
      this.gridData.reduce((previousValue, currentValue) => {
        return previousValue.then(async() => {
          const res = await axiosService.get("/PJTE9003/fileDownload", {
                params: {
                  fileName:currentValue.file_nm
                },
                responseType: "blob"
              }
          )
          console.log("response :: "+res.data)
          let blob = new Blob([res.data], {type: res.headers['content-type']})
          // let fileName = getFileName(res.headers['content-disposition'])
          // fileName = decodeURI(fileName) // 파일명 디코딩 (프로젝트에 따라 사용여부 옵션)

          if (window.navigator.msSaveOrOpenBlob) { // IE 10+
            window.navigator.msSaveOrOpenBlob(blob, currentValue.file_nm)
          } else { // not IE
            let current = this.radioValues==="radio01"?currentValue.file_nm : (this.radioValues==="radio02"?currentValue.org_file_nm : (this.radioValues==="radio03"?currentValue.sam_file_nm:""))
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.target = '_self'
            if (current != null && current !== "") {
              link.download = current;
              link.click();
            }
          }
        })
      }, Promise.resolve())
    }
  },

  data() {
    return {
      comboList : ["C27","C0","C1","C25"],
      comboList2 : ["C25"],

      radioValues: '',

      info : {
        bzcd_selected : this.$route.query.bzcd,
        bkup_id_selected:this.$route.query.bkup_id,
        prjt_nm_selected:this.$route.query.prjt_id,
        file_rgs_dscd_selected:this.$route.query.file_rgs_dscd,
        sah_file_nm : '',
      },

      /* grid 속성 */
      count:0,
      curRow:-1,
      title:"",
      scrollX:false,
      scrollY:false,
      bodyHeight: 300,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: false,
      editingEvent : "click",
      fileName : '',
      orgFileName: '',
      gridData : [],

      // toast ui grid 데이터
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE9003/select', method: 'GET' },
        },
        initialRequest: false,
        contentType : 'application/json;',
        headers : {  'x-custom-header' : 'custom-header'  },
        withCredentials: false,
      },
      columnOptions: {
        resizable: true,
      },
      rowHeaders:['checkbox', 'rowNum'],
      header:{
        height: 45,
        complexColumns: [
        ]
      },
      columns: [
        {
          header: '업무',
          width : 80,
          align: 'center',
          name: 'bznm',
          ellipsis : true,
          disabled: true,
        },
        {
          header: '파일등록구분',
          width : 140,
          align: 'center',
          name: 'file_rgs_dscd',
          ellipsis : true,
          formatter: 'listItemText',
          disabled: true,
          editor: {
            type: 'select',
            options:{
              listItems: this.$store.state.pms.CD1000000025N
            }
          }
        },
        {
          header: '산출물구분',
          align: 'left',
          name: 'sah_file_nm',
          editor: 'text',
          ellipsis : true,
        },
        {
          header: '서버파일명',
          align: 'left',
          name: 'file_nm',
          ellipsis : true,
        },
        {
          header: '원본파일명',
          align: 'left',
          name: 'org_file_nm',
          ellipsis : true,
        },
        {
          header: '산출물양식명',
          align: 'left',
          name: 'sam_file_nm',
          ellipsis : true,
        },
        {
          header: '파일경로',
          align: 'left',
          name: 'file_path',
          hidden : true,
        },
      ]
    };
  },
};
</script>

<style>
.pop-body table th:nth-of-type(2) {
    padding-left: 0!important;
}

</style>