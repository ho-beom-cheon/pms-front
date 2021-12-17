<template>
    <section class="popup">
        <div class="pop-header">
            <h1>결함상세관리</h1>
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
                        <th>프로그램/케이스ID</th>
                        <td>
                            <input type="text" style="width: calc(100% - 54px); float:left">
                            <button class="btn btn-filter-p" style="min-width: 50px; margin-left: 4px; float:left">검색</button>
                        </td>
                        <th>
                            프로그램/케이스명
                        </th>
                        <td>
                            <input type="text" placeholder="입력하세요">
                        </td>
                    </tr>
                    <tr>
                        <th>결함등록자</th>
                        <td>
                            <input type="text" style="width: 59px;">
                            <input type="text" placeholder="가이드 텍스트" style="width: calc(100% - 62px);" >
                        </td>
                        <th>옵션선택</th>
                        <td>
                            <select name="" id="">
                                <option value="옵션1">옵션1</option>
                                <option value="옵션2">옵션2</option>
                                <option value="옵션3">옵션3</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <h2>
                결함내역
            </h2>
            <table>
                <colgroup>
                    <col width="140px">
                    <col width="*">
                    <col width="140px">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>결함유형</th>
                        <td>
                            <select name="" id="">
                                <option value="옵션1">옵션1</option>
                                <option value="옵션2">옵션2</option>
                                <option value="옵션3">옵션3</option>
                            </select>
                        </td>
                        <th></th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>
                            결함내용
                        </th>
                        <td colspan="3">
                            <textarea name="" id="" cols="30" rows="10" placeholder="결함내용을 입력해주세요"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>첨부파일</th>
                        <td colspan="3">
                            <div class="file-Attach">
                                <label for="file-upload-btn">
                                    <input type="file" id="file-upload-btn">
                                </label>
                                <div class="upload-nameWrap">
                                    <input type="text" class="upload-name" disabled>
                                    <a href="#" class="upload-delete" onclick="alert('delete-file')"></a>
                                </div>
                                <button class="btn btn-line-p">다운로드</button>
                            </div>

                        </td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <table>
                <colgroup>
                    <col width="140px">
                    <col width="*">
                    <col width="140px">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>결함유형</th>
                        <td>
                            <select name="" id="">
                                <option value="옵션1">옵션1</option>
                                <option value="옵션2">옵션2</option>
                                <option value="옵션3">옵션3</option>
                            </select>
                        </td>
                        <th>처리상태</th>
                        <td>
                            <select name="" id="">
                                <option value="옵션1">옵션1</option>
                                <option value="옵션2">옵션2</option>
                                <option value="옵션3">옵션3</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>조치예정일자</th>
                        <td>
                            <div class="input-dateWrap">
                                <input type="date">
                            </div>
                        </td>
                        <th>
                            조치담당자
                        </th>
                        <td>
                            <div class="input-searchWrap">
                                <input type="text" placeholder="입력하세요" disabled>
                                <button class="search-btn" onclick="alert('open : search-modal')"></button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            조치내용
                        </th>
                        <td colspan="3">
                            <textarea name="" id="" cols="30" rows="10" placeholder=""></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>첨부파일</th>
                        <td colspan="3">
                            <div class="file-Attach">
                                <input type="file">
                                <button class="btn"></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pop-footer">
            <span>조치담당자, 업무PL 변경시 변경자명을 변경후 엔터키 입력시 조회됨.</span>
            <button class="btn btn-filter-b">닫기</button>
            <button class="btn btn-filter-p">저장</button>
        </div>
    </section>
</template>

<script>
 

export default {
  model: {
    prop: "open",
    event: "close",
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      windowRef: null,
    };
  },
  watch: {
    open(newOpen) {
      if (newOpen) {
        this.openPopup();
      } else {
        this.closePopup();
      }
    },
  },
  methods: {
    openPopup() {
      this.windowRef = window.open(
        "",
        "",
        "width=1200,height=800,left=200,top=200"
      );
      this.windowRef.document.body.appendChild(this.$el);
      window.document, this.windowRef.document;
      this.windowRef.addEventListener("beforeunload", this.closePopup);
    },
    closePopup() {
      if (this.windowRef) {
        this.windowRef.close();
        this.windowRef.removeEventListener("beforeunload", this.closePopup);
        this.windowRef = null;
        this.$emit("close", false);  // 부모창의 binding된 open에게 값을 넘김
      }
    },
  },
  mounted() {
    if (this.open) {
      this.openPopup();
    }
  },
  beforeDestroy() {
    if (this.windowRef) {
      this.closePopup();
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

:root { 
    --primary: #FF5C00; 
    --primary-b: #FF3D00;
    --aside-w : 240px;
    --gnb-h : 54px;
} 

/* COMMON */
* {
    font-size: 14px;
}
h1,h2,h3,h4,h5,p,em,strong,b,a {
    font-family: 'Noto Sans KR', sans-serif;
    color: #000;
    letter-spacing: -0.03em;
}
a {
    text-decoration: none;
    color: inherit;
}
a:hover {
    text-decoration: underline;
    color: inherit;
}
   
input {
    -webkit-appearance:checkbox;
    height: 24px;
    line-height: 24px;
}
select { 
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;
    height: 24px;
    line-height: 24px;
    background: #f2f2f2 url(../../assets/img/ic_select_arr_s.svg) right 5px center/16px no-repeat;
    padding-right: 26px !important;
} 
textarea, input {
    -webkit-appearance: none;
    -webkit-border-radius: 0;
    background: #F2F2F2;
}
textarea::placeholder, input::placeholder {
    color: #A8A8A8;
}
textarea, input, select {
    outline-color: var(--primary);
    border: 0;
    padding: 0 6px;
    font-size: 12px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
input[type="date"]::-webkit-calendar-picker-indicator{
    opacity:0;
    z-index: 1;
    cursor: pointer;
}
.input-dateWrap {
    position: relative;
    display: inline-block;
}
.input-dateWrap::after {
    content: '';
    position: absolute;
    right: 6px;
    top: 4px;
    width: 16px;
    height: 16px;
    background: url(../../assets/img/ic_input_cal.svg) center/cover no-repeat;
}
.input-searchWrap {
    position: relative;
}
.input-searchWrap input {
    padding-right: 28px;
    width: 100%;
}
.input-searchWrap .search-btn {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: block;
    width: 28px;
    height: 24px;
    background: url(../../assets/img/ic_search.svg) center/16px no-repeat;
    border: 0;
}
input[type="checkbox"] {
    height: 24px;
    width: 24px;
    background: #f2f2f2 url(../../assets/img/ic_check_df.svg) center/16px no-repeat;
}
input[type="checkbox"]:checked {
    background: var(--primary) url(../../assets/img/ic_check_ac.svg) center/16px no-repeat;
}
.btn {
    cursor: pointer;
    transition: ease-out 0.3s;
}    
.btn.btn-line {
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    min-width:74px;
    border: 1px solid #DADADA;
    border-radius: 0;
    padding: 2px 4px;
    box-sizing: border-box;
}
.btn.btn-line-p {
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    min-width:74px;
    border: 1px solid var(--primary);
    color: var(--primary);
    border-radius: 0;
    padding: 2px 4px;
    box-sizing: border-box;
}
.btn.btn-primary {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 120px;
    height: 42px;
    padding: 0px 10px;
    background: var(--primary);
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #fff;
    border: 0;
    margin: 0;
}
.btn.btn-primary:hover {
    background-color: var(--primary-b);
}
.btn.btn-primary + .btn.btn-primary {
    margin-left: 8px;
}
.btn.logOut {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    background: #F2F2F2;
    border: 1px solid #DADADA;
    box-sizing: border-box;
    font-weight: bold;
    font-size: 14px;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.btn.logOut::before {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    background: url(../../assets/img/ic_logOut.svg) center/cover no-repeat;
    margin-right: 8px;
}
.btn.btn-filter-p,
.btn.btn-filter-b {
    border-radius: 0;
    font-size: 12px;
    height: 24px;
    line-height: 22px;
    padding: 0 10px;
    color: #fff;
    min-width: 80px;
}
.btn.btn-filter-p {
    background: var(--primary);
}
.btn.btn-filter-b {
    background: #5B5B5B;
}
.btn.btn-filter-p:hover{
    background-color: var(--primary-b);
}
.btn.btn-filter-b:hover {
    background-color: #3c3c3c;
}
.btn.btn-filter-p:hover a,
.btn.btn-filter-b:hover a{
    text-decoration: none;
}
.ic-info {
    display: block;
    width: 16px;
    height: 16px;
    background: url(../../assets/img/ic_info.svg) center/cover no-repeat;
    margin-right: 4px;
}
.info-msg {
    display: flex;
}
table.form-table th {
    width: 113px;
    text-align: left;
    padding: 7px 0;
    font-size: 14px;
    line-height: 19px;
    color: #000000;
    font-size: 14px;
    line-height: 19px;
}
table.form-table td {
    padding: 7px 0;
    font-size: 14px;
    line-height: 19px;
}
table.form-table input,
table.form-table select {
    font-size: 14px;
    line-height: 19px;
    height: 38px;
    background: #F2F2F2;
    border: 0;
    border-radius: 0;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
}
table.form-table select {
    background-image: url(../../assets/img/ic_select_arr.svg);
    background-size: 16px;
    background-position: calc(100% - 15px) center;
    background-repeat: no-repeat;
}
.text-primary {
    color: var(--primary);
}
.clear-fix::after {
    content: '';
    display: block;
    clear: both;
}
.contents {
    display: flex;
    flex-wrap: nowrap;
}
.contents aside {
    width: var(--aside-w);
    height: calc(100vh - 97px);
    border-right: 1px solid #D5D5D5;
    box-sizing: border-box;
    flex: 0 0 auto;
    position: fixed;
    left: 0;
    top: 54px;
}
.contents-body {
    width: 100%;
    padding-top: var(--gnb-h);
    padding-left: var(--aside-w);
}

.page-contents {
    width: 100%;
    overflow: auto;
}
.gridWrap {

}
.grid {
    font-size: 12px;
    text-align: left;
    table-layout: fixed;
    width: 100%;
}
.grid thead {
    font-weight: bold;
}
.grid thead th {
    padding: 7px 20px;
    border-top: 1px solid #D4D4D4;
    border-bottom: 2px solid #C4C4C4;
    height: 50px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
}
.grid tbody td {
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 7px 20px;
    height: 50px;
    border-bottom: 1px solid #C4C4C4;
}

/* SECTION -- POPUP */

.popup {

}
.pop-header {
    background-color: var(--primary);
    padding: 9px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.pop-header h1 {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #fff;
}
.pop-header .pop-close {
    width: 16px;
    height: 16px;
    background: url(../../assets/img/ic_popup_close.svg) center/cover no-repeat;
}
.pop-body {
    padding: 25px 20px;
}
.pop-body h2 {
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 5px;
}
.pop-body h2::before {
    display: block;
    content: '';
    width: 14px;
    height: 2px;
    background: var(--primary);
    margin-bottom: 3px;
}
.pop-body table {
    font-size: 12px;
    line-height: 24px;
    table-layout: fixed;
    width: 100%;
}
.pop-body table th,
.pop-body table td {
    padding: 3px 0 3px 4px;
}
.pop-body table th {
    vertical-align: top;
}
.pop-body table td {
    padding-left: 10px;
}
.pop-body table th:nth-of-type(2) {
    padding-left: 30px;
}
.pop-body table select {
    border-radius: 0;
}
.pop-body table input:only-child,
.pop-body table select:only-child,
.pop-body table textarea:only-child,
.pop-body table .input-dateWrap:only-child {
    width: 100%;
}
.pop-body table .file-Attach label {
    display: block;
    width: 29px;
    height: 24px;
    background: #f2f2f2 url(../../assets/img/ic_upload.svg) center/16px no-repeat;
    position: relative;
    float: left;
}
.pop-body table .file-Attach input[type="file"] {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
}
.pop-body table .file-Attach .upload-nameWrap {
    display: flex;
    align-items: center;
}
.pop-body table .file-Attach .upload-nameWrap a {
    display: none;
    width: 16px;
    height: 16px;
    background: url(../../assets/img/ic_file_delete.svg) center/cover no-repeat;
}
.pop-body table .file-Attach .upload-nameWrap input.upload-name {
    background: transparent;
    color: #1d1d1d;
    float: left;
    width: 50%;
    padding-right: 0;
}
.pop-body table .file-Attach button {
    float: right;
}
.pop-body hr {
    border: 0;
    width: 100%;
    height: 1px;
    background: #bebebe;
    margin-top: 20px;
    margin-bottom: 20px;
}
.pop-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 20px;
    background: #F5F5F5;
    border-top: 1px solid #D3D3D3;
}

.pop-footer span {
    font-size: 12px;
    line-height: 24px;
}
.pop-footer button {
    float: right;
    margin-left: 4px;
}
</style>