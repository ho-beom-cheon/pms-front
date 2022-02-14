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
      <button class="btn btn-filter-b" @click="close">닫기</button>
      <button class="btn btn-filter-p" @click="fileSave" v-if="bkup_id==='0000000000'">저장</button>
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
  created() {
    this.getPjt();
  },
  data() {
    return {
      comboList : ["C27","C0","C1","C25"],

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
        resizable: true
      },
      rowHeaders:['rowNum'],
      header:{
        height: 45,
        complexColumns: [
          {header: '계획',             name: 'mergeColumn1', childNames: ['frcs_sta_dt', 'frcs_end_dt']},
          {header: '실적',             name: 'mergeColumn2', childNames: ['sta_dt', 'end_dt']},
          {header: '결함',             name: 'mergeColumn3', childNames: ['err_tot_cnt', 'err_cmpl_cnt', 'err_ncmpl_cnt'], headerAlign:'center'},
          {header: '개발자',           name: 'mergeColumn4', childNames: ['dvlpe_btn','dvlpe_nm','dvlpe_no']},
          {header: 'PL',              name: 'mergeColumn5', childNames: ['pl_nm', 'pl_btn','pl_no'], headerAlign:'center'},
          {header: '담당현업',         name: 'mergeColumn6', childNames: ['crpe_nm', 'crpe_btn','crpe_no'], headerAlign:'center'},
          {header: '단위테스트케이스',   name: 'mergeColumn7', childNames: ['atfl_mng_id_yn'], headerAlign:'center'},
          {header: '설계서',           name: 'mergeColumn8', childNames: ['pal_atfl_mng_id_yn'], headerAlign:'center'},
        ]
      },
      columns: [
        {
          header: '프로그램ID',
          width: 150,
          align: 'left',
          name: 'pgm_id',
          ellipsis : true,
          editor: "text",
          disabled: true,
        },
        {
          header: '프로그램명',
          width: 200,
          align: 'left',
          name: 'pgm_nm',
          ellipsis : true,
          editor: 'text',
        },
        {
          header: '업무세부',
          width: 180,
          align: 'left',
          name: 'bz_dtls_txt',
          editor: 'text',
        },
        {
          header: '예상시작일자',
          width: 110,
          align: 'center',
          name: 'frcs_sta_dt',
          format: 'yyyy-mm-dd',
          editor: 'datePicker'
        },
        ]
    };
  },
  methods: {

  },
  mounted() {

  },
};
</script>

<style>
</style>