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
                    <h1 class="display-3  text-white">Project Eyes</h1>
                    <input type="file" class="form-control" id="file" aria-label="Upload" webkitdirectory>
                </div>
            </div>
        </div>
    </div>
  </section> 
</template>
<script>

</script>
<style>
.filebox label { display: inline-block; padding: .5em .75em; font-size: inherit; line-height: normal; vertical-align: middle; background-color: #fdfdfd; cursor: pointer; border: 1px solid #ebebeb; border-bottom-color: #e2e2e2; border-radius: .25em; } 
.filebox input[type="file"] { /* 파일 필드 숨기기 */ 
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip:rect(0,0,0,0); border: 0; }
</style>
