<template>
  <div class="home">
    <div class="signout">
      <button class="btn1" @click="Logout">
        {{ loading ? "Loading.." : "Signout..." }}
      </button>
    </div>
    <div v-if="PollList && PollList.data">
      <div
        class="onee"
        v-for="(item, index) in PollList.data"
        :key="index"
        :value="item"
      >
        <div class="title">{{ index + 1 }}.{{ item.title }}</div>
        <hr />
        <ul
          v-for="(itemm, indexx) in item.options"
          :key="indexx"
          :value="itemm"
        >
          <li>
            {{ indexx + 1 }}.{{ itemm.option }}
            <input
              :id="item._id"
              type="radio"
              :name="item._id"
              :value="itemm.vote"
              class="rdo3"
              @change="VOTE(itemm.option, item._id)"
            />
            <span class="span">{{ itemm.vote }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "PollList",
  data() {
    return {
      loading: false,
      title: "",
      option1: "",
      arr: [],
      options: "",
      option: "",
      isOpen: false,
      data: "",
      text: "",
      isempty: false,
      ifOptionSelected: "",
    };
  },
  computed: {
    ...mapGetters({
      PollList: "getPolllist",
    }),

    ...mapGetters({
      allvote: "getVote",
    }),
  },
  mounted() {
    this.pollList();
  },
  methods: {
    ...mapActions({
      Listing: "Listing",
    }),
    ...mapActions({
      Voting: "Voting",
    }),
    async pollList() {
      await this.Listing();
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
    async VOTE(item, poll_id) {
      var data = localStorage.getItem("token");
      // console.log(data);
      let obj = {
        item,
        poll_id,
        token: data,
      };
      await this.Voting(obj);
      this.pollList();
    },
  },
};
</script>
<style scoped>
.signout {
  text-align: end;
  margin: 15px 15px 0 0;
}
.title {
  font-size: 19px;
  font-weight: bolder;
  text-align: start;
  padding-left: 15px;
  color: rgb(32, 35, 36);
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
  text-align: start;
}
.rdo3 {
  float: right;
  margin-top: 6px;
}
.span {
  float: right;
  margin: 2px;
  color: rgb(209, 25, 19);
}
.btn1 {
  font-size: 25px;
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
  border-style: none;
  border-radius: 5px;
  margin-right: 40px;
  cursor: pointer;
}
</style>
