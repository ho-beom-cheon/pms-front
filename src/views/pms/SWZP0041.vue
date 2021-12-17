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

</style>