<template>
	<div>
		<transition name="modal">
			<div
				class="main"
				v-if="isOpen"
			>
				<div
					class="overlay"
					@click.self="isOpen = false;"
				>
					<div class="modal">
						<div>
							<label
								for="Title"
								class="one"
							>Title:</label>
							<input
								type="text"
								placeholder="Enter  Name"
								v-model="Name"
								class="one"
							/><br>
							<label
								for="Email"
								class="two"
							>options:</label>
							<input
								type="text"
								placeholder="email should contain '@'"
								v-model="email"
								class="two"
							/><br>
							<button
								class="seven"
								v-on:click="submit"
								style="margin: 3px"
							>Save Details</button>
						</div>

					</div>
				</div>
			</div>
		</transition>
		
			
				<ul class="second"
					v-for="(item, index) in allList"
					:key="index"
					:value="item"
					:class="{ red: item.iscolor }"
				>
					<li >
						{{ item.Name }}
						{{ item.email }}
						{{ item.date }}
					</li>
						
				<button
					id="btn"
					@click="isOpen = !isOpen;"
				>
					{{ isOpen ? "Close" : "ADD" }} 
				</button>
			</ul>
		
	</div>

</template>

<script>
	export default {
		name: "HelloWorld",

		data() {
			return {
				Name: "",
				email: "",
				num: 1,
				isOpen: false,
			};
		},
		computed: {
			allList() {
				return this.$store.getters.getList;
			},
		},
		methods: {
			submit() {
				if (this.Name.trim() && this.email.trim()) {
					let obj = {
						Name: this.Name,
						email: this.email,
					};

					this.$store.dispatch("addList", obj);
				} else {
					alert("please fill all the input field");
				}
				this.Name = "";
				this.email = "";
				this.isOpen = false;
			},
			
		},
	};
</script>
<style scoped>
button {
	padding: 5px;
	border-radius: 2px;
	background-color: rgb(85, 88, 85);
	color: white;
	border: none;
	margin: 2px;
}
#btn {
	background-color: aqua;
	color: #000;
}
.modal {
	padding: 20px;
	background-color: rgb(218, 140, 104);
	border-radius: 2px;
	box-shadow: 0 2px 8px 3px;
	transition: all 0.2s ease-in;
	font-family: Helvetica, Arial, sans-serif;
}

.overlay {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: #00000094;
	z-index: 999;
	transition: opacity 0.2s ease;
}
.modal input {
	margin: 5px;
}

.one {
	position: relative;
	left: 21px;
	margin: 2px;
}
.two {
	position: relative;
	left: 23px;
	margin: 2px;
}
.second{
	height: 200px;
	width: 300px;
	border:2px solid black;
	float: left;

}

.seven {
	position: relative;
	right: 15px;
}
</style>

