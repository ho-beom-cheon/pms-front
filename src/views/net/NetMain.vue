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
								<net-button></net-button> 
								<nested-test class="col-8" v-model="elements" />
								<raw-displayer class="col-4" :title="'Vuex Store'" :value="elements" />
							</div>
					</div>
			</div>
    </section>
</template>
<script>
import NestedTest from "./nested-test.vue";
import rawDisplayer from "./raw-displayer.vue";
import NetButton from "./NetButton.vue";

export default {
  name: "nested-with-vmodel",
  display: "Nested (v-model & vuex)",
  order: 16,
  components: {
    NestedTest,
		rawDisplayer,
		NetButton
  },
  computed: {
    elements: {
      get() {
        return this.$store.state.dragAction.elements;
      },
      set(value) {
        this.$store.dispatch("dragAction/updateElements", value);
      }
    }
  },
  methods: {}
};
</script>
<style>
</style>
