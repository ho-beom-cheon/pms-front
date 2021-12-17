<template>
	<div>
		<base-button id="btn1" @click="btnClick($event)">버튼1</base-button>
		<base-button>버튼2</base-button>
		<base-button>버튼3</base-button>
	</div>
</template>

<script>
var count = 0;

export default {
	name:"net-button",
	created() {
		count = this.$store.state.dragAction.count;
	},
	methods:{
		btnClick(event) {	
			this.$store.dispatch("dragAction/addElements", {id:count, name:"test", elements:[] });
			count += 1;
		},
	}
};
</script>