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
</style>
