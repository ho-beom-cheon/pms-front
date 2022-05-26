<template>
  <div style="display:inline;">
    <!-- 주간보고 시작 -->
    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C-38'"  v-bind:hidden="dept_kbn1">
      <div class="item-con" style="margin-left : -8px">
        <td class="td-box">
          <label style = "text-align: center">*프로젝트</label>
        </td>
        <select
            v-model = "real_prjt_id_selected_iss"
            style   = "width: 422px"
            @change = "real_prjt_id_change_iss"
        >
          <option
              v-for  = "(item, idx) in CD1000000038N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>

    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C-38'"  v-bind:hidden="dept_kbn2">
      <div class="item-con">
        <td class="td-box">
          <label style = "text-align: center">*업무</label>
        </td>
        <select
            v-model = "real_prjt_id_selected_iss"
            style   = "width: 422px"
            @change = "real_prjt_id_change_iss"
        >
          <option
              v-for  = "(item, idx) in CD1000000038N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>

    <li class="filter-item-a"  v-for="item in this.comboList" :key="item.id" v-if="item === 'C-39'">
      <div class="item-con" >
        <td class="td-box"> *차수 </td>
        <select
            v-model = "week_sqn_cd_selected_iss"
            style   = "width: 125px"
            @change = "week_sqn_cd_change_iss"
        >
          <option
              v-for  = "(item, idx) in CD1000000039N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>

    <li class="filter-item-a"  v-for="item in this.comboList" :key="item.id" v-if="item === 'C-40'">
      <div class="item-con" >
        <td class="td-box">*부문명
        </td>
        <select
            v-model = "dept_cd_selected_iss"
            style   = "width: 125px"
            @change = "dept_cd_change_iss"
        >
          <option
              v-for  = "(item, idx) in CD1000000040N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!-- 주간보고 시작-->
    <!--  ActionItem및이슈관리현황 시작  -->
    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C-41'">
      <div class="item-con">
        <label>*관리구분</label>
        <select
            v-model="rgs_dis_cd_selected_iss"
            style="width: 150px;"
            @change = "rgs_dis_cd_change_iss"
            id="rgs_dis_cd_iss"
        >
          <option
              v-for="(item, idx) in CD1000000012"
              :key="idx"
              v-text="item.text"
              :value="item.value"
          ></option>
        </select>
      </div>
    </li>

    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C-42'">
      <div class="item-con">
        <label>*처리단계</label>
        <select
            v-model="iss_prc_step_cd_selected_iss"
            style="width: 150px; margin-right: 150px"
            @change = "iss_prc_step_cd_change_iss"
        >
          <option
              v-for="(item, idx) in CD1000000014"
              :key="idx"
              v-text="item.text"
              :value="item.value"
          ></option>
        </select>
      </div>
    </li>

    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C-43'">
      <div class="item-con">
        <label>*요청구분</label>
        <select
            v-model="req_dis_cd_selected_iss"
            style="width: 150px"
            @change = "req_dis_cd_change_iss"
        >
          <option
              v-for="(item, idx) in CD1000000013"
              :key="idx"
              v-text="item.text"
              :value="item.value"
          ></option>
        </select>
      </div>
    </li>

    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C-44'">
      <div class="item-con">
        <label>긴급성</label>
        <select
            v-model="urgn_cd_selected_iss"
            style="width: 150px"
            @change = "urgn_cd_change_iss"
        >
          <option
              v-for="(item, idx) in CD1000000015"
              :key="idx"
              v-text="item.text"
              :value="item.value"
          ></option>
        </select>
      </div>
    </li>

    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C-45'">
      <div class="item-con">
        <label>영향도</label>
        <select
            v-model="ifnc_cd_selected_iss"
            style="width: 150px"
            @change = "ifnc_cd_change_iss"
        >
          <option
              v-for="(item, idx) in CD1000000016"
              :key="idx"
              v-text="item.text"
              :value="item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--  ActionItem및이슈관리현황 끝  -->

    <!--  산출물 팝업 시작 -->
    <table v-for="item in this.comboList" :key="item.id" v-if="item === 'C1-2'">
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
          <select v-model="prjt_nm_selected_pop" style="width: 300px; background-color: #f2f2f2" :disabled="true" @change = "prjt_nm_change_pop">
            <option
                v-for   = "(pjt_list,idx) in CD0000000000"
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
          <select v-model="file_rgs_dscd_selected_pop" style="width: 300px; background-color: #f2f2f2" :disabled="true" @change = "file_rgs_dscd_change_pop">
            <option
                v-for   = "(file_rgs_dscd,idx) in CD1000000025"
                :key    ="idx"
                v-text  ="file_rgs_dscd.text"
                :value  ="file_rgs_dscd.value"
            ></option>
          </select>
        </td>
      </tr>
      </tbody>
    </table>
    <!--  산출물 팝업 끝 -->

    <!--    pms 신청등록-->
    <table v-for="item in this.comboList" :key="item.id" v-if="item === 'C1-1'">
      <colgroup>
        <col width="140px">
        <col width="*">
        <col width="140px">
        <col width="*">
      </colgroup>
      <tbody>
      <tr>
        <th>업무</th>
        <td>
          <select
              v-model = "bzcd_selected_pop"
              @change = "bzcd_change_pop"
          >
            <option
                v-for  = "(item, idx) in CD1000000001"
                :key   = "idx"
                v-text = "item.text"
                :value = "item.value"
            ></option>
          </select>
        </td>
        <th></th>
        <td></td>
      </tr>
      <tr>
        <th>신청구분</th>
        <td>
          <select
              v-model = "req_dscd_selected_pop"
              @change = "req_dscd_change_pop"
          >
            <option
                v-for  = "(item, idx) in CD1000000010"
                :key   = "idx"
                v-text = "item.text"
                :value = "item.value"
            ></option>
          </select>
        </td>
        <th>
          처리구분
        </th>
        <td>
          <select
              v-model = "req_prc_step_cd_selected_pop"
              @change = "req_prc_step_cd_change_pop"
          >
            <option
                v-for  = "(item, idx) in CD1000000011"
                :key   = "idx"
                v-text = "item.text"
                :value = "item.value"
            ></option>
          </select>
        </td>
      </tr>
      </tbody>
    </table>
    <!--   메인 cpmbo -->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C0'">
      <div class="item-con">프로젝트
        <select
            v-model = "prjt_nm_selected"
            style   = "width: 180px"
            :disabled="true"
            @change="prjt_nm_chage"
        >
          <option
              v-for  = "(item, idx) in CD0000000000T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C27'">
      <div class="item-con">백업ID
        <select
            v-model = "bkup_id_selected"
            style   = "width: 120px"
            @change = "bkup_id_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000027T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C1'">
      <div class="item-con">업무구분
        <select
            v-model = "bzcd_selected"
            style   = "width: 110px"
            @change = "bzcd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000001T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C3'">
      <div class="item-con">개발구분
        <select
            v-model = "dvlp_dis_cd_selected"
            style   = "width: 94px"
            @change = "dvlp_dis_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000003T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C6'">
      <div class="item-con">차수
        <select
            v-model = "sqn_cd_selected"
            style   = "width: 80px"
            @change = "sqn_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000006T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C26'">
      <div class="item-con">처리단계
        <select
            v-model = "itg_tst_prc_cd_selected"
            style   = "width: 100px"
            @change = "itg_tst_prc_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000026T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   관리구분코드 -->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C12'">
      <div class="item-con">관리구분
        <select
            v-model="rgs_dis_cd_selected"
            style="width: 145px"
            @change = "rgs_dis_cd_change"
        >
          <option
              v-for="(item, idx) in CD1000000012T"
              :key="idx"
              v-text="item.text"
              :value="item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   요청구분코드 -->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C13'">
      <div class="item-con">요청구분
        <select
            v-model="req_dis_cd_selected"
            style="width: 120px"
            @change = "req_dis_cd_change"
        >
          <option
              v-for="(item, idx) in CD1000000013T"
              :key="idx"
              v-text="item.text"
              :value="item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--    이슈관리구분코드-->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C14'">
      <div class="item-con">처리단계
        <select
            v-model = "iss_prc_step_cd_selected"
            style   = "width: 80px"
            @change = "iss_prc_step_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000014T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--    개발구분코드-->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C2'">
      <div class="item-con">처리단계
        <select
            v-model = "prc_step_cd_selected"
            style   = "width: 80px"
            @change = "prc_step_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000002T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--    프로그램구분코드-->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C4'">
      <div class="item-con">프로그램구분
        <select
            v-model = "pgm_dis_cd_selected"
            style   = "width: 80px"
            @change = "pgm_dis_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000004T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C7'">
      <div class="item-con">결함등록단계구분코드
        <select
            v-model = "err_rgs_dscd_selected"
            style   = "width: 110px"
            @change = "err_rgs_dscd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000007T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C8'">
      <div class="item-con">결함유형코드
        <select
            v-model = "err_tycd_selected"
            style   = "width: 80px"
            @change = "err_tycd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000008T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--  결함처리단계구분코드  -->
    <li class="item-con" v-for="item in this.comboList" :key="item.id" v-if="item === 'C9'">
      <div class="filter-item" >처리상태
        <select
            v-model="err_prc_step_cd_selected"
            style="width: 120px"
            @change = "err_prc_step_cd_change"
        >
          <option
              v-for="(item, idx) in CD1000000009T"
              :key="idx"
              v-text="item.text"
              :value="item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--신청 구분 코드-->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C10'">
      <div class="item-con">신청구분
        <select
            v-model = "req_dscd_selected"
            style   = "width: 80px"
            @change = "req_dscd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000010T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   신청 처리 단계 구분코드-->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C11'">
      <div class="item-con">처리상태
        <select
            v-model = "req_prc_step_cd_selected"
            style   = "width: 80px"
            @change = "req_prc_step_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000011T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   검출구분코드 -->
    <li class="filter-item" v-for="item in this.comboList2" :key="item.id" v-if="item === 'C25'">
      <div class="item-con">파일구분코드
        <select
            v-model = "file_rgs_dscd_selected"
            style   = "width: 160px"
            @change = "file_rgs_dscd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000025T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--    공지업무코드-->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C18'">
      <div class="item-con">공지구분
        <select
            v-model="ntar_bzcd_selected"
            style="width: 165px; margin-left: 8px"
            @change = "ntar_bzcd_change"
        >
          <option
              v-for="(ntar_bzcd, idx) in CD1000000018T"
              :key="idx"
              v-text="ntar_bzcd.text"
              :value="ntar_bzcd.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   WBS관리구분코드 -->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C35'">
      <div class="item-con">관리구분
        <select
            v-model="wbs_mng_cd_selected"
            style="width: 120px"
            @change = "wbs_mng_cd_change"
        >
          <option
              v-for="(wbs_mng_cd, idx) in CD1000000035"
              :key="idx"
              v-text="wbs_mng_cd.text"
              :value="wbs_mng_cd.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   신청 처리 단계 구분코드-->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C19'">
      <div class="item-con">진행상태
        <select
            v-model = "wbs_prc_sts_cd_selected"
            style   = "width: 80px"
            @change = "wbs_prc_sts_cd_change"
        >
          <option
              v-for  = "(wbs_prc_sts_cd, idx) in CD1000000019T"
              :key   = "idx"
              v-text = "wbs_prc_sts_cd.text"
              :value = "wbs_prc_sts_cd.value"
          ></option>
        </select>
      </div>
    </li>

    <!--   검출구분코드 -->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C21'">
      <div class="item-con">검증구분
        <select
            v-model = "check_cd_selected"
            style   = "width: 200px"
            @change = "check_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000021T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   산출물구분코드 -->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C22'">
      <div class="item-con">산출물구분
        <select
            v-model = "file_cd_selected"
            style   = "width: 180px"
            @change = "file_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000022T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   검색항목코드 -->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C36'">
      <div class="item-con">검색항목
        <select
            v-model = "search_cd_selected"
            style   = "width: 100px"
            @change = "search_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000036T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   투입프로젝트 -->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C38'">
      <div class="item-con">
        <label v-bind:hidden="dept_kbn1" >프로젝트
          <select
              v-model = "real_prjt_id_selected"
              style   = "width: 422px"
              @change = "real_prjt_id_change"
          >
            <option
                v-for  = "(item, idx) in CD1000000038T"
                :key   = "idx"
                v-text = "item.text"
                :value = "item.value"
            ></option>
          </select>
        </label>
        <label v-bind:hidden="dept_kbn2" >업무
          <select
              v-model = "real_prjt_id_selected"
              style   = "width: 422px"
              @change = "real_prjt_id_change"
          >
            <option
                v-for  = "(item, idx) in CD1000000038T"
                :key   = "idx"
                v-text = "item.text"
                :value = "item.value"
            ></option>
          </select>
        </label>
      </div>
    </li>
    <!--   회차 -->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C39'">
      <div class="item-con">차수
        <select
            v-model = "week_sqn_cd_selected"
            style   = "width: 100px"
            @change = "week_sqn_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000039T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!--   부문 코드 -->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C40'">
      <div class="item-con">부문명
        <select
            v-model = "dept_cd_selected"
            style   = "width: 110px"
            :disabled="read"
            @change = "dept_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000040T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>

    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C44-1'">
      <div class="item-con"><label>게시부문</label>
        <select
            v-model = "bubun_cd_selected"
            style   = "width: 230px"
            @change = "bubun_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000044T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C44-2'">
      <div class="item-con"><label>게시부문</label>
        <select
            v-model = "bubun_cd_selected_iss"
            style   = "width: 230px"
            @change = "bubun_cd_change_iss"
        >
          <option
              v-for  = "(item, idx) in CD1000000044N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C45-1'">
      <div class="item-con"><label>게시구분</label>
        <select
            v-model = "bsn_cls_cd_selected"
            style   = "width: 230px"
            @change = "bsn_cls_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000045T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C45-2'">
      <div class="item-con"><label>게시구분</label>
        <select
            v-model = "bsn_cls_cd_selected_iss"
            style   = "width: 230px"
            @change = "bsn_cls_cd_change_iss"
        >
          <option
              v-for  = "(item, idx) in CD1000000045N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C46'">
      <div class="item-con line-con"><label>좋아요</label>
        <select
            v-model = "good_nm_selected"
            style   = "width: 110px"
            @change = "good_nm_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000046"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C47-1'">
      <div class="item-con">회의실
        <select
            v-model = "mtng_room_id_selected"
            style   = "width: 180px"
            @change = "mtng_room_id_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000047T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C47-2'">
      <div class="item-con">회의실
        <select
            id      = "mtng_room"
            v-model = "mtng_room_id_selected_iss"
            style   = "width: 125px; margin-left: 11px"
            @change = "mtng_room_id_change_iss"
        >
          <option
              v-for  = "(item, idx) in CD1000000047N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C48-1'">
      <div class="item-con">회의시작시간
        <select
            v-model = "rsr_strt_selected"
            style   = "width: 110px"
            @change = "rsr_strt_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000048N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C48-2'">
      <div class="item-con">회의종료시간
        <select
            v-model = "rsr_endt_selected"
            style   = "width: 110px"
            @change = "rsr_endt_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000048N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>

    <!-- 인력프로파일관리 시작 -->
    <li class="filter-item" v-for="item in this.comboList" :key="item.id" v-if="item === 'C-P1'">
      <div class="item-con">기술등급
        <select
            v-model = "skill_grd_selected_iss"
            style   = "width: 110px"
            @change = "skill_grd_change_iss"
        >
          <option
              v-for  = "(item, idx) in CD1000000042T"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C-P2'">
      <div class="item-con"><label>직원구분</label>
        <select
            v-model = "man_cd_selected"
            style   = "width: 230px"
            @change = "man_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000041N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C-P3'">
      <div class="item-con"><label>기술등급</label>
        <select
            v-model = "skill_grd_selected"
            style   = "width: 230px"
            @change = "skill_grd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000042N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C-P4'">
      <div class="item-con"><label>평판구분</label>
        <select
            v-model = "grd_cd_selected"
            style   = "width: 230px"
            @change = "grd_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000043N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!-- 인력프로파일관리 끝 -->

    <!-- As-Is대To-Be매핑 시작 -->
    <!-- As-Is대To-Be매핑 시작 -->
    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C-51'">
      <div class="item-con">As-Is프로그램유형
        <select
            id      = "as_pgm_dis_cd"
            v-model = "as_pgm_dis_cd_selected"
            style   = "width: 415px;margin-left : 5px"
            @change = "as_pgm_dis_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000051N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>

    <li class="filter-item-a" v-for="item in this.comboList" :key="item.id" v-if="item === 'C-52'">
      <div class="item-con"  style   = "margin-left : 43px">전환상태
        <select
            v-model = "trn_stt_cd_selected"
            style   = "width: 230px;margin-left : 5px"
            @change = "trn_stt_cd_change"
        >
          <option
              v-for  = "(item, idx) in CD1000000052N"
              :key   = "idx"
              v-text = "item.text"
              :value = "item.value"
          ></option>
        </select>
      </div>
    </li>
    <!-- As-Is대To-Be매핑 끝 -->
  </div>
</template>

<script>
import {axiosService} from "@/api/http"; // Date-picker 스타일적용
import {mapActions} from 'vuex'

export default {
  name: "combo",
  props: {
    comboArray: Array,
    comboArray2: Array,
  },
  mounted () {
    this.init()
  },
  updated() {
    this.bzcd_change()
    this.dvlp_dis_cd_change()
    this.pgm_dis_cd_change()
    this.prc_step_cd_change()
    this.iss_prc_step_cd_change()
    this.bkup_id_change()
    this.prjt_nm_chage()
    this.prjt_nm_change_pop()
    this.sqn_cd_change()
    this.itg_tst_prc_cd_change()
    this.req_dis_cd_change()
    this.rgs_dis_cd_change()
    this.req_dscd_change()
    this.req_prc_step_cd_change()
    this.wbs_prc_sts_cd_change()
    this.wbs_mng_cd_change()
    this.ntar_bzcd_change()
    this.err_tycd_change()
    this.err_rgs_dscd_change()
    this.err_prc_step_cd_change()
    this.file_cd_change()
    this.search_cd_change()
    this.check_cd_change()
    this.req_prc_step_cd_change_pop()
    this.bzcd_change_pop()
    this.req_dscd_change_pop()
    this.file_rgs_dscd_change_pop()
    this.file_rgs_dscd_change()
    this.rgs_dis_cd_change_iss()
    this.iss_prc_step_cd_change_iss()
    this.req_dis_cd_change_iss()
    this.urgn_cd_change_iss()
    this.real_prjt_id_change()
    this.week_sqn_cd_change()
    this.dept_cd_change()
    this.skill_grd_change_iss()
    this.bsn_cls_cd_change()
    this.bsn_cls_cd_change_iss()
    this.bubun_cd_change()
    this.bubun_cd_change_iss()
    this.grd_cd_change()
    this.good_nm_change()
    this.mtng_room_id_change()
    this.mtng_room_id_change_iss()
    this.rsr_strt_change()
    this.rsr_endt_change()
    this.inp_cls_cd_change()
    this.as_pgm_dis_cd_change()
    this.trn_stt_cd_change()
  },
  data() {
    return {
      // 조회 조건(콤보박스) - 공통
      // T : 검색조건, N : 그리드
      CD0000000000T : [],  CD0000000000N : [], CD0000000000 : [],
      CD1000000001T : [],  CD1000000001N : [], CD1000000001 : [],
      CD1000000002T : [],  CD1000000002N : [], CD1000000002 : [],
      CD1000000003T : [],  CD1000000003N : [],
      CD1000000004T : [],  CD1000000004N : [],
      CD1000000005T : [],  CD1000000005N : [],
      CD1000000006T : [],  CD1000000006N : [],
      CD1000000007T : [],  CD1000000007N : [],
      CD1000000008T : [],  CD1000000008N : [],
      CD1000000009T : [],  CD1000000009N : [],
      CD1000000010T : [],  CD1000000010N : [], CD1000000010 : [],
      CD1000000011T : [],  CD1000000011N : [], CD1000000011 : [],
      CD1000000012T : [],  CD1000000012N : [], CD1000000012 : [],
      CD1000000013T : [],  CD1000000013N : [], CD1000000013 : [],
      CD1000000014T : [],  CD1000000014N : [], CD1000000014 : [],
      CD1000000015T : [],  CD1000000015N : [], CD1000000015 : [],
      CD1000000016T : [],  CD1000000016N : [], CD1000000016 : [],
      CD1000000017T : [],  CD1000000017N : [],
      CD1000000018T : [],  CD1000000018N : [],
      CD1000000019T : [],  CD1000000019N : [], CD1000000019 : [],
      CD1000000020T : [],  CD1000000020N : [],
      CD1000000021T : [],  CD1000000021N : [],
      CD1000000022T : [],  CD1000000022N : [],
      CD1000000023T : [],  CD1000000023N : [],
      CD1000000024T : [],  CD1000000024N : [],
      CD1000000025T : [],  CD1000000025N : [], CD1000000025 : [],
      CD1000000026T : [],  CD1000000026N : [],
      CD1000000027T : [],  CD1000000027N : [],
      CD1000000028T : [],  CD1000000028N : [],
      CD1000000029T : [],  CD1000000029N : [],
      CD1000000030T : [],  CD1000000030N : [],
      CD1000000031T : [],  CD1000000031N : [],
      CD1000000032T : [],  CD1000000032N : [],
      CD1000000033T : [],  CD1000000033N : [],
      CD1000000034T : [],  CD1000000034N : [],
      CD1000000035T : [],  CD1000000035N : [], CD1000000035 : [],
      CD1000000036T : [],  CD1000000036N : [],
      CD1000000038T : [],  CD1000000038N : [], CD1000000038 : [],
      CD1000000039T : [],  CD1000000039N : [], CD1000000039 : [],
      CD1000000040T : [],  CD1000000040N : [], CD1000000040 : [],
      CD1000000041T : [],  CD1000000041N : [], CD1000000041 : [],
      CD1000000042T : [],  CD1000000042N : [], CD1000000042 : [],
      CD1000000043T : [],  CD1000000043N : [], CD1000000043 : [],
      CD1000000044T : [],  CD1000000044N : [], CD1000000044 : [],
      CD1000000045T : [],  CD1000000045N : [], CD1000000045 : [],
      CD1000000046T : [],  CD1000000046N : [], CD1000000046 : [],
      CD1000000047T : [],  CD1000000047N : [], CD1000000047 : [],
      CD1000000048T : [],  CD1000000048N : [], CD1000000048 : [],
      CD1000000049T : [],  CD1000000049N : [], CD1000000049 : [],
      CD1000000050T : [],  CD1000000050N : [], CD1000000050 : [],
      CD1000000051T : [],  CD1000000051N : [], CD1000000051 : [],
      CD1000000052T : [],  CD1000000052N : [], CD1000000052 : [],

      comboList: this.comboArray,
      comboList2: this.comboArray2,
      code_it : [],
      cd_all : [],
      row : 0,
      set_yn : "",
      read : true,

      dept_kbn1 : false,
      dept_kbn2 : true,

      s_day : '',
      proc_dt : '',
      err_proc_dt : '',
      proc_days : '',
      err_proc_days : '',

      // 백업ID
      bkup_id_selected : "",
      // 프로젝트명
      prjt_nm_selected : "",
      prjt_nm_selected_pop : "",
      // 업무구분
      bzcd_selected : "",
      bzcd_selected_pop : "",
      bzcd_n : [],
      // 프로그램구분
      pgm_dis_cd_selected : "",
      // 개발구분
      dvlp_dis_cd_selected : "",
      // 처리단계
      prc_step_cd_selected : "",
      // 이슈관리처리단계
      iss_prc_step_cd_selected : "",
      // 차수
      sqn_cd_selected : "",
      // 통합테스트 처리단계
      itg_tst_prc_cd_selected : "",
      // 결함 처리 단계
      err_prc_step_cd_selected : "",
      // 결함 유형 코드
      err_tycd_selected : "",
      // 결함 등록 단계 구분코드
      err_rgs_dscd_selected : "",
      // 관리구분
      rgs_dis_cd_selected : "",
      rgs_dis_cd_selected_iss : "",
      // 요청구분
      req_dis_cd_selected : "",
      req_dis_cd_selected_iss : "",
      //신청구분
      req_dscd_selected:"",
      req_dscd_selected_pop:"",
      //처리상태
      req_prc_step_cd_selected:"",
      req_prc_step_cd_selected_pop:"",
      //관리구분
      mng_cd_selected:"",
      //이슈처리단계
      iss_prc_step_cd_selected_iss:"",
      //긴급성
      urgn_cd_selected_iss:"",
      //영향도
      ifnc_cd_selected_iss:"",
      //WBS_진행상태
      wbs_prc_sts_cd_selected:"",
      //WBS_관리구분
      wbs_mng_cd_selected:"",
      //공지업무
      ntar_bzcd_selected:"",
      //검출코드
      check_cd_selected:"",
      //검색항목코드
      search_cd_selected:"",
      //산출물구분
      file_cd_selected:"",
      // 파일등록구분(팝업)
      file_rgs_dscd_selected_pop : "",
      // 파일등록구분
      file_rgs_dscd_selected : "",
      // 투입프로젝트
      real_prjt_id_selected : "",
      real_prjt_id_selected_iss : "",
      // 회차
      week_sqn_cd_selected : "",
      week_sqn_cd_selected_iss : "",
      // 부문코드
      dept_cd_selected : "",
      dept_cd_selected_iss : "",
      // 기술등급(조회)
      skill_grd_selected_iss : "",
      // 인력구분
      man_cd_selected : "",
      // 기술등급
      skill_grd_selected : "",
      // 평판코드
      grd_cd_selected : "",
      // 게시부문
      bubun_cd_selected : "",
      // 게시부문
      bubun_cd_selected_iss : "",
      // 게시구분
      bsn_cls_cd_selected : "",
      // 게시구분
      bsn_cls_cd_selected_iss : "",
      // 좋아요구분
      good_nm_selected : "",
      // 회의실 ID
      mtng_room_id_selected : "",
      // 회의실 ID(아래)
      mtng_room_id_selected_iss : "",
      // 예약시작일자
      rsr_strt_selected : "",
      // 예약종료일자
      rsr_endt_selected : "",
      // 투입구분
      inp_cls_cd_selected : "",
      // As-Is프로그램유형
      as_pgm_dis_cd_selected : "",
      // 전환상태
      trn_stt_cd_selected : "",
    }
  },
  methods: {
    ...mapActions("pms",["SET_COMBO"]),
    async setTest(){
      try {
        await this.SET_COMBO(this.cd_all)

      } catch(error) {
        console.log("Error Msg : " + error)
        // 개발용
      }
    },
    bzcd_change()                   {  this.$emit('bzcd_change',                   this.bzcd_selected)},                 // 업무구분코드
    dvlp_dis_cd_change()            {  this.$emit('dvlp_dis_cd_change',            this.dvlp_dis_cd_selected)},          // 개발구분코드
    pgm_dis_cd_change()             {  this.$emit('pgm_dis_cd_change',             this.pgm_dis_cd_selected)},           // 프로그램구분코드
    prc_step_cd_change()            {  this.$emit('prc_step_cd_change',            this.prc_step_cd_selected)},          // 처리단계코드
    iss_prc_step_cd_change()        {  this.$emit('iss_prc_step_cd_change',        this.iss_prc_step_cd_selected)},      // 이슈관리처리단계코드
    bkup_id_change()                {  this.$emit('bkup_id_change',                this.bkup_id_selected)},              // 백업 ID
    prjt_nm_chage()                 {  this.$emit('prjt_nm_chage',                 this.prjt_nm_selected)},              // 프로젝트명
    prjt_nm_change_pop()            {  this.$emit('prjt_nm_change_pop',            this.prjt_nm_selected_pop)},          // 프로젝트명(팝업)
    sqn_cd_change()                 {  this.$emit('sqn_cd_change',                 this.sqn_cd_selected)},               // 차수구분코드
    itg_tst_prc_cd_change()         {  this.$emit('itg_tst_prc_cd_change',         this.itg_tst_prc_cd_selected)},       // 통합테스트 처리구분코드
    req_dis_cd_change()             {  this.$emit('req_dis_cd_change',             this.req_dis_cd_selected)},           // 요청구분코드
    rgs_dis_cd_change()             {  this.$emit('rgs_dis_cd_change',             this.rgs_dis_cd_selected)},           // 관리구분코드
    req_dscd_change()               {  this.$emit('req_dscd_change',               this.req_dscd_selected)},             // 신청구분코드
    req_prc_step_cd_change()        {  this.$emit('req_prc_step_cd_change',        this.req_prc_step_cd_selected)},      // 신청처리단계구분코드
    wbs_prc_sts_cd_change()         {  this.$emit('wbs_prc_sts_cd_change',         this.wbs_prc_sts_cd_selected)},       // WBS 진행상태코드
    wbs_mng_cd_change()             {  this.$emit('wbs_mng_cd_change',             this.wbs_mng_cd_selected)},           // WBS 관리구분코드
    ntar_bzcd_change()              {  this.$emit('ntar_bzcd_change',              this.ntar_bzcd_selected)},            // 공지업무코드
    err_tycd_change()               {  this.$emit('err_tycd_change',               this.err_tycd_selected)},             // 결함유형구분코드
    err_rgs_dscd_change()           {  this.$emit('err_rgs_dscd_change',           this.err_rgs_dscd_selected)},         // 결함등록단계구분코드
    err_prc_step_cd_change()        {  this.$emit('err_prc_step_cd_change',        this.err_prc_step_cd_selected)},      // 결함처리단계구분코드
    file_cd_change()                {  this.$emit('file_cd_change',                this.file_cd_selected)},              // 산출물구분코드
    search_cd_change()              {  this.$emit('search_cd_change',              this.search_cd_selected)},            // 검색항목코드
    check_cd_change()               {  this.$emit('check_cd_change',               this.check_cd_selected)},             // 검출구분코드
    req_prc_step_cd_change_pop()    {  this.$emit('req_prc_step_cd_change_pop',    this.req_prc_step_cd_selected_pop)},
    bzcd_change_pop()               {  this.$emit('bzcd_change_pop',               this.bzcd_selected_pop)},
    req_dscd_change_pop()           {  this.$emit('req_dscd_change_pop',           this.req_dscd_selected_pop)},
    file_rgs_dscd_change_pop()      {  this.$emit('file_rgs_dscd_change_pop',      this.file_rgs_dscd_selected_pop)},
    file_rgs_dscd_change()          {  this.$emit('file_rgs_dscd_change',          this.file_rgs_dscd_selected)},
    rgs_dis_cd_change_iss()         {  this.$emit('rgs_dis_cd_change_iss',         this.rgs_dis_cd_selected_iss)},       // 관리구분(이슈)
    iss_prc_step_cd_change_iss()    {  this.$emit('iss_prc_step_cd_change_iss',    this.iss_prc_step_cd_selected_iss)},  // 이슈처리단계구분코드(이슈)
    req_dis_cd_change_iss()         {  this.$emit('req_dis_cd_change_iss',         this.req_dis_cd_selected_iss)},       // 요청구분(이슈)
    urgn_cd_change_iss()            {  this.$emit('urgn_cd_change_iss',            this.urgn_cd_selected_iss)},          // 긴급성(이슈)
    ifnc_cd_change_iss()            {  this.$emit('ifnc_cd_change_iss',            this.ifnc_cd_selected_iss)},          // 영향도(이슈)
    real_prjt_id_change()           {  this.$emit('real_prjt_id_change',           this.real_prjt_id_selected)},         // 투입프로젝트
    week_sqn_cd_change()            {  this.$emit('week_sqn_cd_change',            this.week_sqn_cd_selected)},          // 회차
    real_prjt_id_change_iss()       {  this.$emit('real_prjt_id_change_iss',       this.real_prjt_id_selected_iss)},     // 상세보기]투입프로젝트
    week_sqn_cd_change_iss()        {  this.$emit('week_sqn_cd_change_iss',        this.week_sqn_cd_selected_iss)},      // 상세보기]회차
    dept_cd_change()                {  this.$emit('dept_cd_change',                this.dept_cd_selected)},              // 부문코드
    dept_cd_change_iss()            {  this.$emit('dept_cd_change_iss',            this.dept_cd_selected_iss)},          // 상세보기]부문코드
    skill_grd_change_iss()          {  this.$emit('skill_grd_change_iss',          this.skill_grd_selected_iss)},        // 기술등급(조회)
    man_cd_change()                 {  this.$emit('man_cd_change',                 this.man_cd_selected)},               // 인력구분
    skill_grd_change()              {  this.$emit('skill_grd_change',              this.skill_grd_selected)},            // 기술등급
    grd_cd_change()                 {  this.$emit('grd_cd_change',                 this.grd_cd_selected)},               // 평판코드
    bubun_cd_change()               {  this.$emit('bubun_cd_change',               this.bubun_cd_selected)},             // 부문구분
    bubun_cd_change_iss()           {  this.$emit('bubun_cd_change_iss',           this.bubun_cd_selected_iss)},         // 부문구분
    bsn_cls_cd_change()             {  this.$emit('bsn_cls_cd_change',             this.bsn_cls_cd_selected)},           // 게시구분
    bsn_cls_cd_change_iss()         {  this.$emit('bsn_cls_cd_change_iss',         this.bsn_cls_cd_selected_iss)},       // 게시구분
    good_nm_change()                {  this.$emit('good_nm_change',                this.good_nm_selected)},              // 좋아요구분
    mtng_room_id_change()           {  this.$emit('mtng_room_id_change',           this.mtng_room_id_selected)},         // 회의실 ID
    mtng_room_id_change_iss()       {  this.$emit('mtng_room_id_change_iss',       this.mtng_room_id_selected_iss)},     // 회의실 ID(아래)
    rsr_strt_change()               {  this.$emit('rsr_strt_change',               this.rsr_strt_selected)},             // 예약시작일자
    rsr_endt_change()               {  this.$emit('rsr_endt_change',               this.rsr_endt_selected)},             // 예약종료일자
    inp_cls_cd_change()             {  this.$emit('inp_cls_cd_change',             this.inp_cls_cd_selected)},           // 투입구분
    as_pgm_dis_cd_change()          {  this.$emit('as_pgm_dis_cd_change',          this.as_pgm_dis_cd_selected)},        // As-Is프로그램유형
    trn_stt_cd_change()             {  this.$emit('trn_stt_cd_change',             this.trn_stt_cd_selected)},           // 전환상태

    setCombo(data) {
      for(let i=0; i<this.code_it.length; i++) {
        this.set_yn = "N";
        this.row = 0;

        for (let z = 0; z < data.length; z++) {
          if (this.code_it[i] === data[z].GRP_TYCD) {
            if(this.row === 0) {
              if (i === 1) {
                this.CD1000000001T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000001N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 2) {
                this.CD1000000002T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000002N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 3) {
                this.CD1000000003T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000003N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 4) {
                this.CD1000000004T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000004N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 5) {
                this.CD1000000005T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000005N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 6) {
                this.CD1000000006T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000006N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 7) {
                this.CD1000000007T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000007N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 8) {
                this.CD1000000008T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000008N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 9) {
                this.CD1000000009T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000009N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 10) {
                this.CD1000000010T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000010N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 11) {
                this.CD1000000011T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000011N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 12) {
                this.CD1000000012T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000012N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 13) {
                this.CD1000000013T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000013N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 14) {
                this.CD1000000014T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000014N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 19) {
                this.CD1000000019T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000019N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 20) {
                this.CD1000000020T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000020N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 22) {
                this.CD1000000022T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000022N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 23) {
                this.CD1000000023T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000023N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 24) {
                this.CD1000000024T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000024N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 26) {
                this.CD1000000026T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000026N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 35) {
                this.CD1000000035T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000035N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 36) {
                this.CD1000000036T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000036N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 38) {
                this.CD1000000038T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000038N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 39) {
                this.CD1000000039T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000039N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 40) {
                this.CD1000000040T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000040N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 41) {
                this.CD1000000041T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000041N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 42) {
                this.CD1000000042T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000042N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 43) {
                this.CD1000000043T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000043N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 44) {
                this.CD1000000044T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000044N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              }  else if (i === 45) {
                this.CD1000000045T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000045N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 46) {
                this.CD1000000046T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000046N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 47) {
                this.CD1000000047T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000047N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 48) {
                this.CD1000000048T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000048N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 49) {
                this.CD1000000049T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000049N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 50) {
                this.CD1000000050T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000050N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 51) {
                this.CD1000000051T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000051N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              } else if (i === 52) {
                this.CD1000000052T.push({"text": "전체", "value": "TTT"}); //전체 포함 코드정보
                this.CD1000000052N.push({"text": " ", "value": "NNN"});   //NULL 포함 코드정보
              }
            }
            if(i === 0) {
              this.CD0000000000T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD0000000000N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 1) {
              this.CD1000000001T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000001N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000001.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 2) {
              this.CD1000000002T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000002N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000002.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 3) {
              this.CD1000000003T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000003N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 4) {
              this.CD1000000004T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000004N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 5) {
              this.CD1000000005T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000005N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 6) {
              this.CD1000000006T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000006N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 7) {
              this.CD1000000007T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000007N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 8) {
              this.CD1000000008T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000008N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 9) {
              this.CD1000000009T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000009N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              //this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 10) {
              this.CD1000000010T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000010N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000010.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 11) {
              this.CD1000000011T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000011N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000011.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 12) {
              this.CD1000000012T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000012N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000012.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 13) {
              this.CD1000000013T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000013N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000013.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 14) {
              this.CD1000000014T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000014N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000014.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 15) {
              this.CD1000000015T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000015N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000015.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 16) {
              this.CD1000000016T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000016N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000016.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 18) {
              this.CD1000000018T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000018N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 19) {
              this.CD1000000019T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000019N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000019.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 20) {
              this.CD1000000020T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000020N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 21) {
              this.CD1000000021T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000021N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 22) {
              this.CD1000000022T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000022N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 23) {
              this.CD1000000023T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000023N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              // this.CD0000000000.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 24) {
              this.CD1000000024T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000024N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
            } else if(i === 25) {
              this.CD1000000025T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000025N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000025.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            }  else if(i === 26) {
              this.CD1000000026T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000026N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
            } else if(i === 27) {
              this.CD1000000027T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000027N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
            } else if(i === 35) {
              this.CD1000000035T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000035N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000035.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 36) {
              this.CD1000000036T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000036N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
            } else if(i === 38) {
              this.CD1000000038T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000038N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000038.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 39) {
              this.CD1000000039T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000039N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000039.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD});  //등록 코드정보
            } else if(i === 40) {
              this.CD1000000040T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000040N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000040.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            } else if(i === 41) {
              this.CD1000000041T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000041N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000041.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            } else if(i === 42) {
              this.CD1000000042T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000042N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000042.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            } else if(i === 43) {
              this.CD1000000043T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000043N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000043.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            } else if(i === 44) {
              this.CD1000000044T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000044N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000044.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            } else if(i === 45) {
              this.CD1000000045T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000045N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000045.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            }  else if(i === 45) {
              this.CD1000000045T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000045N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000045.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            }  else if(i === 46) {
              this.CD1000000046T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000046N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000046.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            }  else if(i === 47) {
              this.CD1000000047T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000047N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000047.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            }  else if(i === 48) {
              this.CD1000000048T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000048N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000048.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            }  else if(i === 49) {
              this.CD1000000049T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000049N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000049.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            } else if(i === 50) {
              this.CD1000000050T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000050N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000050.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            } else if(i === 51) {
              this.CD1000000051T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000051N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000051.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            } else if(i === 52) {
              this.CD1000000052T.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //전체 포함 코드정보
              this.CD1000000052N.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); //NULL 포함 코드정보
              this.CD1000000052.push({"text": data[z].DTLS_TYNM, "value": data[z].DTLS_TYCD}); // 등록 포함 코드정보
            }
            this.set_yn = "Y";
            this.row++;
          }
          if(this.CD0000000000T.length !== 0)  this.prjt_nm_selected             = sessionStorage.getItem("LOGIN_PROJ_ID")
          if(this.CD1000000001T.length !== 0)  this.bzcd_selected                = (sessionStorage.getItem("LOGIN_AUT_CD") === '300' ||
          sessionStorage.getItem("LOGIN_AUT_CD") === '400' || sessionStorage.getItem("LOGIN_AUT_CD") === '500' ||
          sessionStorage.getItem("LOGIN_AUT_CD") === '600' || sessionStorage.getItem("LOGIN_AUT_CD") === '900' ? this.CD1000000001T[0].value:sessionStorage.getItem("LOGIN_BZCD"))
          if(this.CD1000000002T.length !== 0)  this.prc_step_cd_selected         = this.CD1000000002T[0].value
          if(this.CD1000000003T.length !== 0)  this.dvlp_dis_cd_selected         = this.CD1000000003T[0].value
          if(this.CD1000000004T.length !== 0)  this.pgm_dis_cd_selected          = this.CD1000000004T[0].value
          if(this.CD1000000006T.length !== 0)  this.sqn_cd_selected              = this.CD1000000006T[0].value
          if(this.CD1000000007T.length !== 0)  this.err_tycd_selected            = this.CD1000000007T[0].value
          if(this.CD1000000008T.length !== 0)  this.err_rgs_dscd_selected        = this.CD1000000008T[0].value
          if(this.CD1000000009T.length !== 0)  this.err_prc_step_cd_selected     = this.CD1000000009T[0].value
          if(this.CD1000000010T.length !== 0)  this.req_dscd_selected            = this.CD1000000010T[0].value
          if(this.CD1000000012.length !== 0)  this.rgs_dis_cd_selected_iss       = this.CD1000000012[0].value
          if(this.CD1000000013.length !== 0)  this.req_dis_cd_selected_iss       = this.CD1000000013[0].value
          if(this.CD1000000014.length !== 0)  this.iss_prc_step_cd_selected_iss  = this.CD1000000014[0].value
          if(this.CD1000000015.length !== 0)  this.urgn_cd_selected_iss          = this.CD1000000015[0].value
          if(this.CD1000000016.length !== 0)  this.ifnc_cd_selected_iss          = this.CD1000000016[0].value
          if(this.CD1000000011T.length !== 0)  this.req_prc_step_cd_selected     = this.CD1000000011T[0].value
          if(this.CD1000000012T.length !== 0)  this.rgs_dis_cd_selected          = this.CD1000000012T[0].value
          if(this.CD1000000013T.length !== 0)  this.req_dis_cd_selected          = this.CD1000000013T[0].value
          if(this.CD1000000014T.length !== 0)  this.iss_prc_step_cd_selected     = this.CD1000000013T[0].value
          if(this.CD1000000018T.length !== 0)  this.ntar_bzcd_selected           = this.CD1000000018T[0].value
          if(this.CD1000000019.length !== 0)   this.wbs_mng_cd_selected          = this.CD1000000019[0].value
          if(this.CD1000000021T.length !== 0)  this.check_cd_selected            = this.CD1000000021T[0].value
          if(this.CD1000000022T.length !== 0)  this.file_cd_selected             = this.CD1000000022T[0].value
          if(this.CD1000000025T.length !== 0)  this.file_rgs_dscd_selected       = this.CD1000000025T[0].value
          if(this.CD1000000026T.length !== 0)  this.itg_tst_prc_cd_selected      = this.CD1000000026T[0].value
          if(this.CD1000000027T.length !== 0)  this.bkup_id_selected             = this.CD1000000027T[0].value
          if(this.CD1000000035T.length !== 0)  this.wbs_prc_sts_cd_selected      = this.CD1000000035T[0].value
          if(this.CD1000000036T.length !== 0)  this.search_cd_selected           = this.CD1000000036T[0].value
          if(this.CD1000000038T.length !== 0)  this.real_prjt_id_selected        = this.CD1000000038T[0].value
          if(this.CD1000000039T.length !== 0)  this.week_sqn_cd_selected         = this.CD1000000039T[0].value
          if(this.CD1000000038.length !== 0)   this.real_prjt_id_selected_iss    = this.CD1000000038N[0].value
          if(this.CD1000000039.length !== 0)   this.week_sqn_cd_selected_iss     = this.CD1000000039N[0].value
          if(this.CD1000000040T.length !== 0)  {
            if(sessionStorage.getItem("LOGIN_DEPT_CD") !== '' && sessionStorage.getItem("LOGIN_DEPT_CD") !== null) {
              if (sessionStorage.getItem("LOGIN_PROJ_ID") === '0000000003' || sessionStorage.getItem("LOGIN_PROJ_ID") === '0000000001') {
                if (sessionStorage.getItem("LOGIN_DEPT_CD").substring(0, 3) == '100') {
                  this.dept_cd_selected = this.CD1000000040T[0].value
                } else {
                  this.dept_cd_selected = (sessionStorage.getItem("LOGIN_DEPT_CD").substring(0, 3)).concat('00000')
                }
              } else {
                this.dept_cd_selected = this.CD1000000040T[0].value
              }
            }
          }
          if(this.CD1000000041N.length !== 0)   this.man_cd_selected            = this.CD1000000041N[0].value
          if(this.CD1000000042T.length !== 0)   this.skill_grd_selected_iss     = this.CD1000000042T[0].value
          if(this.CD1000000042N.length !== 0)   this.skill_grd_selected         = this.CD1000000042N[0].value
          if(this.CD1000000043N.length !== 0)   this.grd_cd_selected            = this.CD1000000043N[0].value
          if(this.CD1000000044T.length !== 0)    this.bubun_cd_selected          = this.CD1000000044T[0].value
          if(this.CD1000000044N.length !== 0)   this.bubun_cd_selected_iss      = this.CD1000000044N[0].value
          if(this.CD1000000045T.length !== 0)   this.bsn_cls_cd_selected        = this.CD1000000045T[0].value
          if(this.CD1000000045N.length !== 0)   this.bsn_cls_cd_selected_iss    = this.CD1000000045N[0].value
          if(this.CD1000000046.length !== 0)    this.good_nm_selected           = this.CD1000000046[0].value
          if(this.CD1000000047T.length !== 0)   this.mtng_room_id_selected      = this.CD1000000047T[0].value
          if(this.CD1000000047N.length !== 0)   this.mtng_room_id_selected_iss  = this.CD1000000047N[0].value
          if(this.CD1000000048N.length !== 0)   this.rsr_strt_selected          = this.CD1000000048N[0].value
          if(this.CD1000000049N.length !== 0)   this.inp_cls_cd_selected        = this.CD1000000049N[0].value
          if(this.CD1000000051N.length !== 0)   this.as_pgm_dis_cd_selected     = this.CD1000000051N[0].value
          if(this.CD1000000052N.length !== 0)   this.trn_stt_cd_selected        = this.CD1000000052N[0].value
        }
        this.setCdAll()
      }
    },
    setCdAll() {
      this.bzcd_n.push(this.CD1000000001N)

      this.cd_all.push(this.CD0000000000N)
      this.cd_all.push(this.CD1000000001N)
      this.cd_all.push(this.CD1000000002N)
      this.cd_all.push(this.CD1000000003N)
      this.cd_all.push(this.CD1000000004N)
      this.cd_all.push(this.CD1000000005N)
      this.cd_all.push(this.CD1000000006N)
      this.cd_all.push(this.CD1000000007N)
      this.cd_all.push(this.CD1000000008N)
      this.cd_all.push(this.CD1000000009N)
      this.cd_all.push(this.CD1000000010N)
      this.cd_all.push(this.CD1000000011N)
      this.cd_all.push(this.CD1000000012N)
      this.cd_all.push(this.CD1000000013N)
      this.cd_all.push(this.CD1000000014N)
      this.cd_all.push(this.CD1000000015N)
      this.cd_all.push(this.CD1000000016N)
      this.cd_all.push(this.CD1000000017N)
      this.cd_all.push(this.CD1000000018N)
      this.cd_all.push(this.CD1000000019N)
      this.cd_all.push(this.CD1000000020N)
      this.cd_all.push(this.CD1000000021N)
      this.cd_all.push(this.CD1000000022N)
      this.cd_all.push(this.CD1000000023N)
      this.cd_all.push(this.CD1000000024N)
      this.cd_all.push(this.CD1000000025N)
      this.cd_all.push(this.CD1000000026N)
      this.cd_all.push(this.CD1000000027N)
      this.cd_all.push(this.CD1000000028N)
      this.cd_all.push(this.CD1000000029N)
      this.cd_all.push(this.CD1000000030N)
      this.cd_all.push(this.CD1000000031N)
      this.cd_all.push(this.CD1000000032N)
      this.cd_all.push(this.CD1000000033N)
      this.cd_all.push(this.CD1000000034N)
      this.cd_all.push(this.CD1000000035N)
      this.cd_all.push(this.CD1000000036N)
      this.cd_all.push(this.CD1000000037N)
      this.cd_all.push(this.CD1000000038N)
      this.cd_all.push(this.CD1000000039N)
      this.cd_all.push(this.CD1000000040N)
      this.cd_all.push(this.CD1000000041N)
      this.cd_all.push(this.CD1000000042N)
      this.cd_all.push(this.CD1000000043N)
      this.cd_all.push(this.CD1000000044N)
      this.cd_all.push(this.CD1000000045N)
      this.cd_all.push(this.CD1000000046N)
      this.cd_all.push(this.CD1000000047N)
      this.cd_all.push(this.CD1000000048N)
      this.cd_all.push(this.CD1000000049N)
      this.cd_all.push(this.CD1000000050N)
      this.cd_all.push(this.CD1000000051N)
      this.cd_all.push(this.CD1000000052N)
    },
    init()  {
      //백업ID, 프로젝트명(권한ID '500','600'경우 활성화)
      if(sessionStorage.getItem("LOGIN_PROJ_ID") === '0000000003') {
        this.read = false;  // 인력프로파일관리는 비활성화 콤보
      } else {
        if(sessionStorage.getItem("LOGIN_AUT_CD") === '500' ||
            sessionStorage.getItem("LOGIN_AUT_CD") === '600' ||
            sessionStorage.getItem("LOGIN_AUT_CD") === '900'){
          this.read = false;
        } else {
          this.read = true;
        }
      }
      //백업ID, 프로젝트명(권한ID '500','600'경우 활성화)
      if(sessionStorage.getItem("LOGIN_PROJ_ID") === '0000000000') {
        if (sessionStorage.getItem("LOGIN_AUT_CD") === '500' ||
            sessionStorage.getItem("LOGIN_AUT_CD") === '600' ||
            sessionStorage.getItem("LOGIN_AUT_CD") === '900') {
          this.read = false;
        }
        else {
          this.read = true;
        }
      }

      if(sessionStorage.getItem("LOGIN_PROJ_ID") === '0000000003') {
        this.dept_kbn1 = false
        this.dept_kbn2 = true
      } else {
        this.dept_kbn1 = true
        this.dept_kbn2 = false
      }


      this.code_it =
          [
            "0000000000",
            "1000000001",
            "1000000002",
            "1000000003",
            "1000000004",
            "1000000005",
            "1000000006",
            "1000000007",
            "1000000008",
            "1000000009",
            "1000000010",
            "1000000011",
            "1000000012",
            "1000000013",
            "1000000014",
            "1000000015",
            "1000000016",
            "1000000017",
            "1000000018",
            "1000000019",
            "1000000020",
            "1000000021",
            "1000000022",
            "1000000023",
            "1000000024",
            "1000000025",
            "1000000026",
            "1000000027",
            "1000000028",
            "1000000029",
            "1000000030",
            "1000000031",
            "1000000032",
            "1000000033",
            "1000000034",
            "1000000035",
            "1000000036",
            "1000000037",
            "1000000038",
            "1000000039",
            "1000000040",
            "1000000041",
            "1000000042",
            "1000000043",
            "1000000044",
            "1000000045",
            "1000000046",
            "1000000047",
            "1000000048",
            "1000000049",
            "1000000050",
            "1000000051",
            "1000000052",
          ];

      // 조회영역 권한 체크
      axiosService.get("/PJTE2100/combo", {
        params: {
          prjt_id: sessionStorage.getItem("LOGIN_PROJ_ID")
        }
      }).then(res => {
        this.setCombo(res.data.data.contents);
        this.setTest();
      })
    },
  }
}
</script>

<style scoped>

</style>