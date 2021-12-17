<template>
    <footer>
        <span>Copyright &copy; {{year}} (주)아이티아이즈. All rights reserved.</span>
        <span><a href="#">운영정책</a></span>
        <span><a href="#">서비스 약관</a></span>
        <span><a href="#" class="text-primary">공지사항</a></span>
    </footer>
</template>
<script>
export default {
  name: 'app-footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
@font-face {
    font-family: 'Noto Sans Kr';
    font-style: normal;
    font-weight: 300;
    src:
      local('Noto Sans Light'),
      local('NotoSans-Light'),
      url('/assets/font/Noto_Sans_KR/NotoSansKR-Light.otf') format('opentype');
}
@font-face {
    font-family: 'Noto Sans Kr';
    font-style: normal;
    font-weight: 400;
    src:
      local('Noto Sans Regular'),
      local('NotoSans-Regular'),
      url('/assets/font/Noto_Sans_KR/NotoSansKR-Regular.otf') format('opentype');
}
@font-face {
    font-family: 'Noto Sans Kr';
    font-style: normal;
    font-weight: 700;
    src:
      local('Noto Sans Bold'),
      local('NotoSans-Bold'),
      url('/assets/font/Noto_Sans_KR/NotoSansKR-Bold.otf') format('opentype');
}

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
html {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica
      Neue, Arial, 'Noto Sans KR', sans-serif, Apple Color Emoji, Segoe UI Emoji;
}
h1,h2,h3,h4,h5,p,em,strong,b,a {
    /* font-family: 'Noto Sans KR', sans-serif; */
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
    background: #f2f2f2 url(../assets/img/ic_select_arr_s.svg) right 5px center/16px no-repeat;
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
    background: url(../assets/img/ic_input_cal.svg) center/cover no-repeat;
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
    background: url(../assets/img/ic_search.svg) center/16px no-repeat;
    border: 0;
}
input[type="checkbox"] {
    height: 24px;
    width: 24px;
    background: #f2f2f2 url(../assets/img/ic_check_df.svg) center/16px no-repeat;
}
input[type="checkbox"]:checked {
    background: var(--primary) url(../assets/img/ic_check_ac.svg) center/16px no-repeat;
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
    background: url(../assets/img/ic_logOut.svg) center/cover no-repeat;
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
    background: url(../assets/img/ic_info.svg) center/cover no-repeat;
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
    background-image: url(../assets/img/ic_select_arr.svg);
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

/* FOOTER */
footer {
    background: #F5F5F5;
    padding: 0 16px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
}
footer span {
    font-weight: normal;
    font-size: 12px;
    line-height: 43px;
    color: #898989;
}
footer span + span {
    margin-left: 20px;
}


</style>
