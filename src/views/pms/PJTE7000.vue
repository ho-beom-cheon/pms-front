<template>
  <!-- CONTENTS1 -->
  <div class="contents">

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
              @bzcd_change="bzcd_change"
              @check_cd_change="check_cd_change"
              @file_cd_change="file_cd_change"
              @search_cd_change="search_cd_change"
          ></combo>
          <li class="filter-item">
            <div class="item-con">
              <input type="text" placeholder="입력" v-model="info.srh_nm" style = "width: 330px">
            </div>
          </li>
        </ul>

        <ul class="filter-btn">
          <button class="btn btn-filter-p" @click="fnSearch" style = "margin-left: 10px">
            <a href="#" >조회</a>
          </button>
        </ul>
      </section>

      <!-- page contents -->
      <section class="page-contents">
        <div class="grid1-box" style="height: 190px">
          <div class="div-header"><h2>산출물 상세정보</h2>
            <ul class="filter-btn">
              <button class="btn btn-filter-e" v-if="info.file_cd_selected != 'TTT'">
                <label for="file" @click="checkBzcd">엑셀업로드</label>
                <input type="file" id="file"  @change="gridExcelImport" accept="application/vnd.ms-excel.sheet.macroEnabled.12" style="display: none;" :disabled="read"/>
              </button>
              <div class="btn btn-filter-e">
                <a href="#" @click="gridExcelExport(1)">엑셀다운로드</a>
              </div>
            </ul>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid1"
                :data="dataSource"
                :header="header"
                :columns="columns1"
                :minBodyHeight="55"
                :bodyHeight="115"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeight="rowHeight"
                :rowHeaders="rowHeaders"
                @click="onClick"
            ></grid>
          </div>
        </div>
        <div class="grid1-box">
          <div class="div-header"><h2>산출물 점검대상</h2></div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid2"
                :data="dataSource2"
                :header="header2"
                :columns="columns2"
                :bodyHeight="295"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeight="rowHeight"
                @click="onClick($event, 2)"
            ></grid>
          </div>
        </div>
        <div class="grid1-box" style="height: 190px">
          <div class="div-header"><h2>미매핑 ID목록</h2>
            <ul class="filter-btn">
              <div class="btn btn-filter-e">
                <a href="#" @click="gridExcelExport(3)">엑셀다운로드</a>
              </div>
            </ul>
          </div>
          <div class="gridWrap" style="min-width: 750px;">
            <grid
                ref="grid3"
                :data="dataSource3"
                :header="header"
                :columns="columns3"
                :minBodyHeight="75"
                :bodyHeight="115"
                :minRowHeight="minRowHeight"
                :showDummyRows="showDummyRows"
                :columnOptions="columnOptions"
                :rowHeight="rowHeight"
                :rowHeaders="rowHeaders"
                @click="onClick"
            ></grid>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import '/node_modules/tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';
import 'tui-date-picker/dist/tui-date-picker.css'; // Date-picker 스타일적용
import combo from '@/components/Combo';
import XLSX from "xlsx";
import {axiosService} from "@/api/http";
import PmsSideBar from  "@/components/PmsSideBar";

//그리드 아이템 예제
var listItem = [{text:"개발", value:"1"},{text:"운영", value:"2"},{text:"이관", value:"3"}];

// 업무구분코드
const bzcd = [
  {text: "신용", value: '100'},
  {text: "재무제표", value: "200"},
  {text: "신용평가", value: "300"},
];
// 산출물구분코드
const file_cd = [
  {text: "전체", value: "TTT"},
  {text: "요구사항정의서", value: "100"},
  {text: "화면설계서", value: "200"},
  {text: "프로그램설계서", value: "300"},
  {text: "인터페이스설계서", value: "400"},
  {text: "테이블목록", value: "500"},
  {text: "단위테스트결과서", value: "600"},
  {text: "통합테스트결과서", value: "700"},
  {text: "요구사항추적표", value: "800"},
];
// 검증구분코드
const check_cd = [
  {text: "1: 산출물목록 -> 산출물매핑ID", value: "100"},
  {text: "2: 산출물매핑ID -> 산출물목록", value: "200"},
];
// 검색항목코드
const search_cd = [
  {text: "전체", value: "TTT"},
  {text: "산출물상세정보", value: "100"},
  {text: "산출물점검대상", value: "200"},
  {text: "미매핑ID목록", value: "300"},
];

export default {
  // 컴포넌트를 사용하기 위해 선언하는 영역(import 후 선언)
  components: {
    grid: Grid,
    combo,
    PmsSideBar,
  },
  mounted() {
    console.log("mounted");
    this.fnSearch()

  },
  // 일반적인 함수를 선언하는 부분
  methods: {
    // Combo.vue 에서 받아온 값
    bkup_id_change(params)         {this.info.bkup_id_selected = params},
    prjt_nm_chage(params)          {this.info.prjt_nm_selected = params},
    bzcd_change(params)            {this.info.bzcd_selected = params},
    check_cd_change(params)        {
      // 검증구분 변경시 그리드2 헤더 변경 및 데이터 조회
      this.info.chk_cd_selected = params
      if(params === '100'){
        this.$refs.grid2.invoke("setHeader", {
          complexColumns: [
            {
              header: '산출물',
              name: 'mergeColumn1',
              childNames: [ 'save_yn', 'file_cd']
            },
            {
              header : '산출물매핑 ID',
              name:' mergeColumn2',
              childNames: ['colm_yn01', 'colm_yn02', 'colm_yn03',
                'colm_yn04', 'colm_yn05', 'colm_yn06', 'colm_yn07', 'colm_yn08',
                'colm_yn09', 'colm_yn10', 'colm_yn11',]
            }
          ]
        })

        this.$refs.grid2.invoke("setRequestParams", this.info);
        this.$refs.grid2.invoke("readData");


      }else if(params === '200'){
        this.$refs.grid2.invoke("setHeader", {
          complexColumns: [
            {
              header: '산출물',
              name: 'mergeColumn1',
              childNames: [ 'save_yn', 'file_cd']
            },
            {
              header : '산출물목록',
              name:' mergeColumn2',
              childNames: ['colm_yn01', 'colm_yn02', 'colm_yn03',
                'colm_yn04', 'colm_yn05', 'colm_yn06', 'colm_yn07', 'colm_yn08',
                'colm_yn09', 'colm_yn10', 'colm_yn11',]
            }
          ]
        })

        this.$refs.grid2.invoke("setRequestParams", this.info);
        this.$refs.grid2.invoke("readData");

      }

    },
    search_cd_change(params)       {this.info.srh_cd_selected = params},
    file_cd_change(params)         {this.info.file_cd_selected = params},

    change(){
      console.log();
    },
    fnSave(){
      console.log();
    },
    // 컬럼 네임을 코드로 변경
    convert_file_cd2 (nm) {
      if(nm === 'colm_yn01'){
        return '050';
      }else if(nm === 'colm_yn02'){
        return '100';
      }else if(nm === 'colm_yn03'){
        return '200';
      }else if(nm === 'colm_yn04'){
        return '300';
      }else if(nm === 'colm_yn05'){
        return '400';
      }else if(nm === 'colm_yn06'){
        return '500';
      }else if(nm === 'colm_yn07'){
        return '600';
      }else if(nm === 'colm_yn08'){
        return '700';
      }else if(nm === 'colm_yn09'){
        return '800';
      }else if(nm === 'colm_yn10'){
        return '900';
      }else if(nm === 'colm_yn11'){
        return '910';
      }
    },
    // 그리드2 중에 비정상 누르면 그리드3 데이터 조회, 정상일 때는 그리드3 데이터 클리어
    onClick(ev, grid_num) {
      console.log("클릭" + ev.rowKey);
      this.curRow = ev.rowKey;
      if(grid_num === 2){
        let value = this.$refs.grid2.invoke("getValue", ev.rowKey, ev.columnName);
        if(value === '비정상'){
          this.info.file_cd1 =this.$refs.grid2.invoke("getValue", ev.rowKey, 'file_cd')
          this.info.file_cd2 = this.convert_file_cd2(ev.columnName)

          this.$refs.grid3.invoke("setRequestParams", this.info);
          this.$refs.grid3.invoke("readData");

        }else{
          this.$refs.grid3.invoke("resetData", []);
        }


      }
    },
    // 조회
    fnSearch(){
      this.$refs.grid1.invoke("setRequestParams", this.info);
      this.$refs.grid1.invoke("readData");
      this.$refs.grid2.invoke("setRequestParams", this.info);
      this.$refs.grid2.invoke("readData");

      this.$refs.grid3.invoke("resetData", []);
    },
    // 엑셀 다운로드
    gridExcelExport(grid_num){
      if(grid_num === 1){
        this.$refs.grid1.invoke("export", "xlsx", {useFormattedValue:true, fileName:"엑셀다운로드"});

      }else if(grid_num === 2){
        this.$refs.grid2.invoke("export", "xlsx", {useFormattedValue:true, fileName:"엑셀다운로드"});

      }else if(grid_num === 3){
        this.$refs.grid3.invoke("export", "xlsx", {useFormattedValue:true, fileName:"엑셀다운로드"});

      }
    },
    // 엑셀 업로드 전 체크 로직
    checkBzcd() {
      if(this.info.file_cd_selected === 'TTT'){
        alert("산출물구분이 전체일 때는 업로드할 수 없습니다.");
        return false;
      }
      if(this.info.bzcd_selected != sessionStorage.getItem("LOGIN_BZCD") && sessionStorage.getItem("LOGIN_AUT_CD") != "500" && sessionStorage.getItem("LOGIN_AUT_CD") != "600"){
        alert("해당 업무는 업로드할 수 없습니다.");
        return false;
      }

      this.read = false;


    },
    // 엑셀 업로드
    gridExcelImport(event){
      // 엑셀파일 업로드 로직 추가
      this.file = event.target.files ? event.target.files[0] : null;
      var input = event.target;
      var reader = new FileReader();
      reader.onload = () => {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});

        // 시트명이 엑셀업로드작성 일때만 업로드
        wb.SheetNames.forEach((sheetName, idx) => {
          if(sheetName === '엑셀업로드작성'){
            console.log(wb.Sheets[sheetName])
            wb.Sheets[sheetName].A1.w = "file_cd"
            wb.Sheets[sheetName].B1.w = "sqno"
            wb.Sheets[sheetName].C1.w = "colm01"
            wb.Sheets[sheetName].D1.w = "colm02"
            wb.Sheets[sheetName].E1.w = "colm03"
            wb.Sheets[sheetName].F1.w = "colm04"
            wb.Sheets[sheetName].G1.w = "colm05"
            wb.Sheets[sheetName].H1.w = "colm06"
            wb.Sheets[sheetName].I1.w = "colm07"
            wb.Sheets[sheetName].J1.w = "colm08"
            wb.Sheets[sheetName].K1.w = "colm09"
            wb.Sheets[sheetName].L1.w = "colm10"
            wb.Sheets[sheetName].M1.w = "colm11"
            wb.Sheets[sheetName].N1.w = "colm12"
            wb.Sheets[sheetName].O1.w = "colm13"
            wb.Sheets[sheetName].P1.w = "colm14"
            wb.Sheets[sheetName].Q1.w = "colm15"
            wb.Sheets[sheetName].R1.w = "colm16"
            if(wb.Sheets[sheetName].S1){
              wb.Sheets[sheetName].S1.w = "colm17"
            }

            let rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            let gridExcelData = JSON.parse(JSON.stringify(rowObj));

            gridExcelData = gridExcelData.filter(e => e.sqno && e.file_cd)

            // console.log(this.$refs.grid1.invoke("getData"))
            gridExcelData.map(e => {
              e.file_cd = String(e.file_cd)
            })
            if(gridExcelData[0].file_cd != this.info.file_cd_selected){
              alert("산출물구분이 일치하지 않는 파일은 업로드할 수 없습니다.")
              return false;
            }else{
              axiosService.post("/PJTE7000/create_grid2",{
                file_cd : this.info.file_cd_selected,
                bzcd : this.info.bzcd_selected,
                prjt_id : this.info.prjt_nm_selected,
                bkup_id : this.info.bkup_id_selected,
                rowDatas : gridExcelData
              }).then(res => {
                console.log(res);
                if(res.data){
                  alert('업로드 파일이 적용되었습니다.')
                  this.$refs.grid1.invoke('resetData',gridExcelData)

                }
              })
                  .catch(e => {
                    alert("업로드 에러")
                  })
            }
          }




        })
      };
      reader.readAsBinaryString(input.files[0]);
      event.target.value = '';

    },
  },

  // 변수 선언부분
  data() {
    return {
      read : true,
      gridExcelData : [],
      // 해당 화면에 사용할 콤보박스 입력(코드 상세 보기 참조)
      comboList : ["C27","C0","C1","C21","C22","C36"],
      info: {
        bkup_id_selected: '0000000000',        // 백업 id
        prjt_nm_selected: sessionStorage.getItem("LOGIN_PROJ_ID"),        // 프로젝트명
        bzcd_selected: sessionStorage.getItem("LOGIN_BZCD"),           // 업무구분
        file_cd_selected: file_cd[0].value,        // 산출물구분
        chk_cd_selected: check_cd[0].value,    // 검증구분
        srh_cd_selected: search_cd[0].value,  // 검색항목구분
        srh_nm : '',
        file_cd1 : '',              //산출물 구분1
        file_cd2 : '',              //산출물 구분2


      },

      count:0,
      curRow:-1,
      title:"",
      scrollX:false,
      scrollY:false,
      bodyHeight: 80,
      minRowHeight: 10,
      rowHeight: 25,
      showDummyRows: false,
      open: false,
      dataSource: {
        api: {
          readData: { url: process.env.VUE_APP_API + '/PJTE7000/select_grid1', method: 'GET' },
        },
        initialRequest: false,
      },
      dataSource2: {
        api: {
          readData: { url: process.env.VUE_APP_API + '/PJTE7000/select_grid2', method: 'GET' },
        },
        initialRequest: false,
      },
      dataSource3: {
        api: {
          readData: { url: process.env.VUE_APP_API + '/PJTE7000/select_grid3', method: 'GET' },
        },
        initialRequest: false,
      },
      columnOptions: {
        resizable: true
      },
      rowHeaders:['rowNum'],
      header: {
        height: 25,
      },
      header2: {
        height: 45,
        complexColumns: [
          {
            header: '산출물',
            name: 'mergeColumn1',
            childNames: [ 'save_yn', 'file_cd']
          },
          {
            header : '산출물매핑 ID',
            name:' mergeColumn2',
            childNames: ['colm_yn01', 'colm_yn02', 'colm_yn03',
              'colm_yn04', 'colm_yn05', 'colm_yn06', 'colm_yn07', 'colm_yn08',
              'colm_yn09', 'colm_yn10', 'colm_yn11',]
          }
        ]
      },
      columns1: [
        {
          header: '산출물구분',
          width: 150,
          name: 'file_cd',
          formatter: 'listItemText',
          disabled : true,
          editor: {
            type : "text",
            options:{
              listItems: this.$store.state.pms.CD1000000022N
            }
          }
        },
        {
          header: '순번',
          width: 150,
          name: 'sqno',
          hidden : true,
        },
        {
          header: '요구사항 ID',
          width: 150,
          name: 'colm01',
        },
        {
          header: '요구사항명',
          width: 150,
          name: 'colm02',
        },
        {
          header: '프로세스 ID',
          width: 150,
          name: 'colm03',
        },
        {
          header: '프로세스명',
          width: 150,
          name: 'colm04',
        },
        {
          header: '화면 ID',
          width: 150,
          name: 'colm05',
        },
        {
          header: '화면명',
          width: 150,
          name: 'colm06',
        },
        {
          header: '인터페이스 ID',
          width: 150,
          name: 'colm07',
        },
        {
          header: '인터페이스명',
          width: 150,
          name: 'colm08',
        },
        {
          header: '프로그램 ID',
          width: 150,
          name: 'colm09',
        },
        {
          header: '프로그램명',
          width: 150,
          name: 'colm10',
        },
        {
          header: '테이블 ID',
          width: 150,
          name: 'colm11',
        },
        {
          header: '테이블명',
          width: 150,
          name: 'colm12',
        },
        {
          header: '단위테스트시나리오 ID',
          width: 150,
          name: 'colm13',
        },
        {
          header: '단위테스트시나리오명',
          width: 150,
          name: 'colm14',
        },
        {
          header: '통합테스트시나리오 ID',
          width: 150,
          name: 'colm15',
        },
        {
          header: '통합테스트시나리오명',
          width: 150,
          name: 'colm16',
        },
        {
          header: '메뉴명',
          width: 150,
          name: 'colm17',
        },
      ],
      columns2: [
        {
          header: '구분',
          width: 100,
          name: 'cate',
          rowSpan : true,
          align: 'center',

        },
        {
          header: '명',
          name: 'file_cd',
          formatter: 'listItemText',
          disabled : true,
          editor: {
            type : "text",
            options:{
              listItems: this.$store.state.pms.CD1000000022N
            }
          }
        },
        {
          header: '등록',
          width: 50,
          name: 'save_yn',
          align: 'center',
        },
        {
          header: '업무기능분할도',
          width: 120,
          name: 'colm_yn01',
        },
        {
          header: '요구사항정의서',
          width: 120,
          name: 'colm_yn02',
        },
        {
          header: '화면목록',
          width: 80,
          name: 'colm_yn03',
        },
        {
          header: '보고서목록',
          width: 120,
          name: 'colm_yn04',
        },
        {
          header: '인터페이스목록',
          width: 120,
          name: 'colm_yn05',
        },
        {
          header: '프로그램목록',
          width: 120,
          name: 'colm_yn06',
        },
        {
          header: '테이블목록',
          width: 120,
          name: 'colm_yn07',
        },
        {
          header: '단위테스트',
          width: 120,
          name: 'colm_yn08',
        },
        {
          header: '통합테스트',
          width: 120,
          name: 'colm_yn09',
        },
        {
          header: '요구사항추적표',
          width: 120,
          name: 'colm_yn10',
        },
        {
          header: '메뉴구조도',
          width: 100,
          name: 'colm_yn11',
        },
      ],
      columns3: [
        {
          header: '항목ID',
          width: 250,
          name: 'item_cd',
        },
        {
          header: '항목명',
          width: 550,
          name: 'item_nm',
          align: 'left',
        },
        {
          header: '매핑ID',
          width: 250,
          name: 'map_id',
        },
        {
          header: '매핑명',
          width: 550,
          name: 'map_nm',
          align: 'left',
        },
      ]
    }
  },
};

</script>
<style>
</style>
