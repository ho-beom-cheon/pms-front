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
                    <h1 class="display-3  text-white">엑셀업로드/다운로드 예제</h1>
										<section>
											<h3>Create XLSX</h3>
											<div>
												<input v-model="sheetName" placeholder="type a new sheet name" />
												<button v-if="sheetName" @click="addSheet">Add Sheet</button>
											</div>

											<div>Sheets: {{ sheets }}</div>

											<xlsx-workbook>
												<xlsx-sheet
													:collection="sheet.data"
													v-for="sheet in sheets"
													:key="sheet.name"
													:sheet-name="sheet.name"
												/>
												<xlsx-download>
													<button>Download</button>
												</xlsx-download>
											</xlsx-workbook>
										</section>
										<hr />
										<section>
											<h3>Import XLSX</h3>
											<input type="file" @change="onChange" />
											<xlsx-read :file="file">
												<xlsx-sheets>
													<template #default="{sheets}">
														<select v-model="selectedSheet">
															<option v-for="sheet in sheets" :key="sheet" :value="sheet">
																{{ sheet }}
															</option>
														</select>
													</template>
												</xlsx-sheets>
												<xlsx-table :sheet="selectedSheet" />
												<xlsx-json :sheet="selectedSheet">
													<template #default="{collection}">
														<div>
															{{ collection }}
														</div>
													</template>
												</xlsx-json>
											</xlsx-read>
										</section>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>
<script>
import { XlsxRead, XlsxTable, XlsxSheets, XlsxJson, XlsxWorkbook, XlsxSheet, XlsxDownload } from "/node_modules/vue-xlsx/dist/vue-xlsx.es.js"

export default {
  components: {
    XlsxRead,
    XlsxTable,
    XlsxSheets,
    XlsxJson,
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload
  },
  data() {
    return {
      file: null,
      selectedSheet: null,
      sheetName: null,
      sheets: [{ name: "SheetOne", data: [{ c: 2 }] }],
      collection: [{ a: 1, b: 2 }]
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    addSheet() {
      this.sheets.push({ name: this.sheetName, data: [...this.collection] });
      this.sheetName = null;
    }
  }
};
</script>
<style>
</style>
