<template>
	<div class="about">
		<div class="main">
			<div class="btn">
				<button
					class="btn1"
					@click="isOpen = !isOpen"
				>
					{{ isOpen ? "Close" : "Addpoll" }}
				</button>
			</div>
			<div class="btn">
				<button
					class="btn2"
					@click="Logout"
				>
					{{ loading ? "Loading.." : "Signout.." }}
				</button>
			</div>
		</div>
		<transition name="modal">
			<div
				class="mainn"
				v-if="isOpen"
			>
				<div
					class="overlay"
					@click.self="isOpen = true"
				>
					<div class="w-80">
						<div>
							<label
								for="Title"
								class="four"
							>Title:</label>
							<input
								type="text"
								v-model="Title"
								class="four_five"
							/><br />
							<label
								for=""
								class="rdo3"
							></label>
							<input
								id="one"
								type="text"
								v-model="text"
								value="option"
								name="option"
								class="rdo3"
							/>
							<button
								class="btn3"
								@click="Add"
							>Add options one by one</button>
							<br />
							<ul
								v-for="(item, index) in arr"
								:key="index"
								:value="item">
								<li>
									{{ index + 1 }}.{{ item.text }}
									<br/>
								</li>
							</ul>
							<button
								class="btn4"
								@click="ctreate_Poll(true)"
							>
								CreatePoll
							</button>
							<button
								class="cancel"
								@click="cancel"
							>Cancel!</button>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<div v-if="PollList && PollList.data">
			<div
				class="onee"
				v-for="(item, index) in PollList.data"
				:key="index"
				:value="item"
			>
				<div class="title">{{ index + 1 }}.{{ item.title }}</div>
				<div class="update_title">
					<b-button
						variant="primary"
						user="'item'"
						v-on:click="title_updating(item)"
						class="mt-3"
					>Update_title</b-button>
					<b-modal
						v-model="showw"
						v-if="showw"
					>
						<input
							id="one"
							type="text"
							v-model="title"
							class="rdo"
						/><br />
						<button
							class="btn5"
							@click="update_title(title, id)"
						>
							update_title
						</button>
						<template #modal-footer>
							<div class="w-100">
								<b-button
									variant="primary"
									size="sm"
									class="float-right"
									@click="showw = !showw"
								>
									Close
								</b-button>
							</div>
						</template>
					</b-modal>
				</div>
				<hr />
				<ul
					v-for="(itemm, indexx) in item.options"
					:key="indexx"
					:value="itemm"
				>
					<li>
						{{ indexx + 1 }}.{{ itemm.option }}
						<button
							class="del_opt"
							@click="showmessagebox2(item._id, itemm.option, indexx, true)"
						>
							Delete
						</button>
					</li>
				</ul>
				<div>
					<b-button
						class="btn6"
						variant="primary"
						user="'item'"
						@click="sendInfo(item)"
					>add_option</b-button>
					<b-modal
						v-model="show"
						v-if="show"
					>
						<input
							id="one"
							type="text"
							v-model="text1"
							value="option"
							name="option"
							class="rdo"
						/>
						<button
							name="option"
							class="btn7"
							@click="add_option(selectedUser, true)"
						>
							Add_Option
						</button>
						<template #modal-footer>
							<div class="w-100">
								<b-button
									variant="primary"
									size="sm"
									class="float-right"
									@click="check()"
								>
									Close
								</b-button>
							</div>
						</template>
					</b-modal>
				</div>
				<button
					class="Delete"
					@click="showmessagebox(item._id, true)"
				>
					DeletePoll
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import axios from "axios";

	export default {
		name: "EditView",
		data() {
			return {
				user: "",
				show: false,
				showw: false,
				variants: ["primary", "secondary", "success"],
				headerBgVariant: "dark",
				loading: false,
				Title:"",
				title: "",
				option1: "",
				arr: [],
				options: "",
				option: "",
				isOpen: false,
				modalShow: false,
				isOpened: false,
				data: "",
				text: "",
				text1: "",
				text2: "",
				isOpenn: false,
				selectedUser: "",
				titleupdate: "",
				err: "",
				boxTwo: "",
				dialogItem: null,
				dialogItem1: null,
			};
		},
		computed: {
			...mapGetters({
				Poll: "getPoll",
			}),
			...mapGetters({
				PollList: "getPolllist",
			}),
		},
		mounted() {
			this.userlist();
		},
		methods: {
			...mapActions({
				Polling: "Polling",
			}),
			...mapActions({
				Deleting: "Deleting",
			}),
			...mapActions({
				Listing: "Listing",
			}),
			...mapActions({
				deleting_option: "deleting_option",
			}),
			...mapActions({
				adding_option: "adding_option",
			}),
			...mapActions({
				updatting: "updatting",
			}),
			async ctreate_Poll() {
				if (this.Title.trim()) {
					if (this.arr.length >= 1) {
						const obj1 = {
							Title: this.Title,
							arr: this.arr,
						};
						await this.Polling(obj1);
						this.userlist();
						this.isOpen = false;
						this.Title = "";
						this.arr = [];
					} else {
						this.$alert("please fill the option");
					}
				} else {
					this.$alert("please fill the title box");
				}
			},
			Logout() {
				localStorage.clear();
				this.loading = true;
				axios
					.post()
					.then(() => {
						this.loading = false;
					})
					.catch((err) => {
						return err;
					});
				this.$router.push({ path: "/" });
			},
			async Add() {
				if (this.text.trim()) {
					let obj = {
						text: this.text,
					};
					this.arr.push(obj);
					this.text = "";
				} else {
					this.$alert(" don't leave option box empty");
				}
			},
			async Delete(append = false) {
				const id = this.dialogItem;
				let obj = { id };
				await this.Deleting(obj);
				this.userlist();
				this.$bvToast.toast(`poll is delete successfully!`, {
					autoHideDelay: 2000,
					appendToast: append,
				});
			},
			showmessagebox(id) {
				this.dialogItem = id;
				this.boxTwo = "";
				this.$bvModal
					.msgBoxConfirm("Please confirm that you want to delete poll.", {
						title: "Please Confirm",
						size: "sm",
						buttonSize: "sm",
						okVariant: "danger",
						okTitle: "YES",
						cancelTitle: "NO",
						footerClass: "p-2",
						hideHeaderClose: false,
						centered: true,
					})
					.then((value) => {
						this.boxTwo = value;
						if (value === true) {
							this.Delete();
						}
					});
			},
			async delete_option(item_id, option, index, append = false) {
				let obj = this.dialogItem1;
				await this.deleting_option(obj);
				this.userlist();
				this.$bvToast.toast(`option is deleted successfully!`, {
					autoHideDelay: 2000,
					appendToast: append,
				});
			},
			showmessagebox2(item_id, option, index) {
				let obj1 = {
					item_id,
					option,
					index,
				};
				this.dialogItem1 = obj1;
				this.boxTwo = "";
				this.$bvModal
					.msgBoxConfirm("Please confirm that you want to delete everything.", {
						title: "Please Confirm",
						size: "sm",
						buttonSize: "sm",
						okVariant: "danger",
						okTitle: "YES",
						cancelTitle: "NO",
						footerClass: "p-2",
						hideHeaderClose: false,
						centered: true,
					})
					.then((value) => {
						this.boxTwo = value;
						if (value === true) {
							this.delete_option();
						}
					});
			},
			async add_option(param) {
				if (this.text1.trim()) {
					let obj = {
						param,
						text1: this.text1,
					};

					await this.adding_option(obj);
					this.userlist();
					this.show = false;
					this.text1 = "";

					this.$alert("option is added Sucessfully!");
				} else {
					this.$alert("please fill the box");
				}
			},
			async userlist() {
				await this.Listing();
			},
			async update_title(param, id) {
				if (param.trim()) {
					let obj = {
						param,
						id,
					};
					await this.updatting(obj);
					param = "";
					this.userlist();
					this.showw = false;
					this.$alert("title is updated Sucessfully!");
				} else {
					this.$alert("please fill the  box");
				}
			},
			sendInfo(item) {
				this.selectedUser = item;
				this.show = true;
			},
			title_updating(item) {
				this.title = item.title;
				this.id = item._id;
				this.showw = true;
			},
			cancel() {
				this.isOpen = false;
				this.Title = "";
				this.text = "";
			},
			cancel1() {
				this.isOpenn = false;
			},
			check() {
				this.show = false;
				this.text1 = "";
			},
		},
	};
</script>
<style scoped>
.title {
	font-size: 19px;
	font-weight: bolder;
	text-align: start;
	padding-left: 15px;
	color: rgb(32, 35, 36);
}
.update_title {
	margin-top: 10px;
}
.add_btn {
	float: left;
}
.del_opt {
	float: right;
	margin-right: 15px;
	background: linear-gradient(
		90deg,
		rgb(120, 6, 196) 0%,
		rgb(29, 201, 253) 50%
	);
	border-radius: 5px;
	color: white;
	font-weight: bold;
	cursor: pointer;
}
.Delete {
	margin: 20px 20px 0 0;
	color: rgb(207, 30, 178);
	background: linear-gradient(
		0deg,
		rgba(34, 193, 195, 1) 0%,
		rgba(253, 187, 45, 1) 100%
	);
	cursor: pointer;
}
.onee {
	width: 90%;
	background: radial-gradient(
		circle,
		rgba(238, 174, 202, 1) 0%,
		rgba(148, 187, 233, 1) 100%
	);
	padding: 4px;
	margin: 40px auto 3px auto;
	border-radius: 5px;
}
ul li {
	list-style-type: none;
}
.span {
	float: right;
	margin: 2px;
}
.main {
	display: flex;
	justify-content: center;

	width: 100%;
	height: 58px;
	background-color: rgb(20, 20, 238);
	line-height: 53px;
	border-radius: 5px;
}
.signout {
	height: 40px;
	width: 20px;
}
.alluser {
	height: 40px;
	width: 20px;
}
.username {
	padding: 3px;
	position: relative;
	bottom: 5px;
	right: 190px;
}
button {
	padding: 5px;
	border-radius: 2px;
	background-color: rgb(85, 88, 85);
	color: rgb(209, 202, 202);
	border: none;
	margin: 2px;
}
.modal2 {
	padding: 10px;
	width: 50%;
	background-color: rgb(144, 138, 145);
	border-radius: 2px;
	box-shadow: 0 2px 8px 3px;
	transition: all 0.2s ease-in;
	font-family: Helvetica, Arial, sans-serif;
}
.cancel {
	float: right;
	font-weight: bold;
	background-color: blue;
	margin-top: 10px;
}
.w-80 {
	padding: 20px;
	background-color: rgb(138, 91, 91);
	border-radius: 2px;
	box-shadow: 0 2px 8px 3px;
	transition: all 0.2s ease-in;
	font-family: Helvetica, Arial, sans-serif;
}
ul li {
	list-style-type: none;
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
.active {
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: #0f0f0f94;
	z-index: 999;
	transition: opacity 0.2s ease;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: #0f0f0f94;
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
.red {
	height: 200px;
	width: 300px;
	border: 2px solid black;
	float: left;
}
.seven {
	position: relative;
	right: 15px;
}
.rdo3 {
	margin-left: 20px;
}
.four {
	color: rgb(59, 4, 4);
}
.four_five {
	margin: 5px 0 0 5px;
}
.mt-3 {
	font-weight: bold;
	background: linear-gradient(
		90deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(16, 110, 222, 1) 35%,
		rgba(0, 212, 255, 1) 100%
	);
	width: 35%;
}
.btn1 {
	font-size: 20px;
	background: linear-gradient(
		90deg,
		rgb(120, 6, 196) 0%,
		rgb(253, 29, 204) 50%,
		rgb(252, 90, 69) 100%
	);
	cursor: pointer;
}
.btn2 {
	font-size: 20px;
	background: linear-gradient(
		90deg,
		rgb(120, 6, 196) 0%,
		rgb(253, 29, 204) 50%,
		rgb(252, 90, 69) 100%
	);
	cursor: pointer;
}
.btn3 {
	cursor: pointer;
	background: linear-gradient(
		90deg,
		rgb(0, 66, 196) 0%,
		rgb(0, 29, 204) 50%,
		rgb(202, 0, 69) 100%
	);
	font-weight: bold;
}
.btn4 {
	margin: 10px 0 0 39px;
	font-weight: bold;
	background-color: blue;
	cursor: pointer;
}
.btn5 {
	font-weight: bold;
	background: linear-gradient(
		90deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(16, 110, 222, 1) 35%,
		rgba(0, 212, 255, 1) 100%
	);
	cursor: pointer;
}
.float-right {
	font-weight: bold;
	background: linear-gradient(
		90deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(16, 110, 222, 1) 35%,
		rgba(0, 212, 255, 1) 100%
	);
	width: 10%;
}
.btn6 {
	background: linear-gradient(
		90deg,
		rgba(131, 58, 180, 1) 0%,
		rgba(253, 29, 29, 1) 50%,
		rgba(252, 176, 69, 1) 100%
	);
	width: 35%;
	font-weight: bold;
}
.btn7 {
	background: linear-gradient(
		90deg,
		rgba(131, 58, 180, 1) 0%,
		rgba(253, 29, 29, 1) 50%,
		rgba(252, 176, 69, 1) 100%
	);
	font-weight: bold;
	cursor: pointer;
}
</style>
