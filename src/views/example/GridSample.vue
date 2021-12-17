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
                    <h1 class="display-3  text-white">그리드 예제</h1>
                    <grid
                      :data="gridProps.data"
                      :columns="gridProps.columns"
                      :rowHeaders="gridProps.rowHeaders"
                      :columnOptions="gridProps.columnOptions"
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

export default {
  data() {
    return {
      a:0
    };
  },
  methods: {
    
  },
  components: {
    grid: Grid
  },
  created() {
    this.gridProps = {
      data: [
        // for rowData prop
        {
          name: 'Beautiful Lies',
          artist: 'Birdy'
        },
        {
          name: 'X',
          artist: 'Ed Sheeran'
        }
      ],
      columns: [
        // for columnData prop
        {
          header: 'Name',
          name: 'name'
        },
        {
          header: 'Artist',
          name: 'artist'
        }
      ]
    };
  }
};
</script>
<style>
</style>
