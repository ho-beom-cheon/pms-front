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
                @file_rgs_dscd_change="file_rgs_dscd_change"
            >
            </combo>
          </ul>
        </div>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <!-- grid contents -->
        <div class="gridWrap" style="min-width: 750px;">
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
          ></grid>
        </div>
      </section>
    </div>
    <div class="pop-footer">

    </div>
  </section>
</template>

<script>

import { Grid } from '@toast-ui/vue-grid';
import '/node_modules/tui-grid/dist/tui-grid.css';
import {axiosService} from "@/api/http";
import combo from "@/components/Combo";

export default {
  components : {
    grid: Grid,
    combo
  },
  methods: {
    bkup_id_change(params) {this.info.bkup_id_selected = params},
    prjt_nm_chage(params) {this.info.prjt_nm_selected = params},
    bzcd_change(params) {this.info.bzcd_selected = params},
    file_rgs_dscd_change(params) {this.info.file_rgs_dscd_selected = params},
  },

  data() {
    return {
      comboList : ["C27","C0","C1","C25"],

      info : {
        bzcd_selected : '',
        prjt_nm_selected : '',
        bkup_id_selected : '',
        file_rgs_dscd_selected : '',
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
      showDummyRows: true,
      editingEvent : "click",
      // toast ui grid 데이터
      dataSource: {
        api: {
          readData   : { url: process.env.VUE_APP_API + '/PJTE2100/select', method: 'GET' },
          createData : { url: process.env.VUE_APP_API + '/PJTE2100/create', method: 'POST'},
          updateData : { url: process.env.VUE_APP_API + '/PJTE2100/update', method: 'PUT'},
          deleteData : { url: process.env.VUE_APP_API + '/PJTE2100/delete', method: 'PUT'},
        },
        initialRequest: false,
        contentType : 'application/json;',
        headers : {  'x-custom-header' : 'custom-header'  },
        withCredentials: false,
      },
      columnOptions: {

      },
      rowHeaders:['checkbox','rowNum'],
      header:{
        height: 45,
        complexColumns: [
        ]
      },
      columns: [
        {
          header: '업무',
          align: 'left',
          name: 'pgm_id',
          ellipsis : true,
          editor: "text",
          disabled: true,
        },
        {
          header: '파일등록구분',
          align: 'left',
          name: 'pgm_nm',
          ellipsis : true,
          editor: 'text',
        },
        {
          header: '산출물구분',
          align: 'left',
          name: 'bz_dtls_txt',
          editor: 'text',
        },
        {
          header: '서버파일명',
          align: 'center',
          name: 'frcs_sta_dt',
        },
        {
          header: '원본파일명',
          align: 'center',
          name: 'frcs_sta_dt',
        },
        {
          header: '산출물양식명',
          align: 'center',
          name: 'frcs_sta_dt',
        },
      ]
    };
  },

  mounted() {

  },
};
</script>

<style>
</style>