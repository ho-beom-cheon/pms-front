<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container shape-container d-flex">
        <div class="col px-0">
            <div class="row">
                <div class="col-lg-6">
                    <h1 class="display-3  text-white">그리드 엑셀Import/Export 예제</h1>
                    <div class="filebox">
                      <label for="file">업로드</label> 
                      <input type="file" id="file" @change="onChange" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                    </div>
  <grid v-if="gridData.length > 0"
        ref="tuiGrid2"
        :data="gridData"
        :columns="columns"
        :scrollX="scrollX"
        :scrollY="scrollY"
    ></grid>
                </div>
            </div>
        </div>
    </div>
  </section> 
</template>

<script>

import '/node_modules/tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';
import XLSX from 'xlsx';

export default {
  inheritAttrs: false,
  name: "Exam3",
  components: {
    grid: Grid 
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      gridData: [],
      columns: [
        {
          header: '이름',
          name: 'a'
        },
        {
          header: '아티스트',
          name: 'b'
        },
        {
          header: '형태',
          name: 'c'
        },
        {
          header: '출시일',
          name: 'release'
        },
        {
          header: '장르',
          name: 'genre'
        }
      ],
      scrollX: false,
      scrollY: false,
    }
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      var input = event.target;
      var reader = new FileReader();
      reader.onload = () => {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});
        wb.SheetNames.forEach((sheetName) => {
        var rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);	        
        this.gridData = JSON.parse(JSON.stringify(rowObj));
        this.$refs.tuiGrid2.invoke('resetData',this.gridData)
        })
      };
      reader.readAsBinaryString(input.files[0]); 
    },
    getData() {
      console.log("getData");
      this.gridData = [
                        {
                          "name": "Beautiful Lies",
                          "artist": "Birdy",
                          "type": "Deluxe",
                          "release": "2016.3.26",
                          "genre": "Pop",
                          "price": 1000,
                          "downloadCount": 1000,
                          "listenCount": 5000,
                          "genreCode": "1",
                          "typeCode": "1",
                          "grade": "1",
                          "a":0
                        },
                        {
                          "name": "X",
                          "artist": "Ed Sheeran",
                          "type": "Deluxe",
                          "release": "2014.6.24",
                          "genre": "Pop",
                          "price": 7000,
                          "downloadCount": 1000,
                          "listenCount": 5000,
                          "genreCode": "1",
                          "typeCode": "1",
                          "grade": "2",
                          "a":0
                        }
                      ];
    },
  }
}
</script>