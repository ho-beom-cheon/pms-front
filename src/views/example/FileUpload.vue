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
                    <h1 class="display-3  text-white">파일업로드 예제</h1>
                      <input type="file" class="form-control" id="file" aria-label="Upload">
                </div>
            </div>
        </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios';

export default {
  methods: {
     handleClick: async function () {
        const formData = new FormData();
        const filelist = document.getElementById('file');
        formData.append('msg', '파일업로드');
        for(let idx = 0; idx < filelist.files.length; idx++ )
        {
          formData.append('files', filelist.files[idx]);
        }
        await axios.post('/example/upload', formData, {
        headers: {
              'Content-Type' : 'multipart/form-data' 
        }
      })
      .then((response) => {
        alert('성공')
        
      })
      .catch((error) => {
        alert('실패')
      })
    }
  }
};
</script>
<style>
</style>
