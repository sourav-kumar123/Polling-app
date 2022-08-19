<template>
  <div class="about">
    <div class="first">Login page</div>
    <div class="main">
      <label for="Name" class="one_two">UserName:</label><br />
      <input
        type="text"
        placeholder="Enter  Name"
        v-model="Name"
        class="one"
      /><br />
      <label for="password" class="four">password:</label><br />
      <input
        type="password"
        placeholder="password"
        v-model="password"
        class="four_1"
      /><br />
      <button class="text-center" @click="submit">
        {{ loading ? "Loading.." : "Login..." }}</button
      ><br />
      <button class="fives" @click="homepage">Go to homepage</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      Name: "",
      password: "",
      role: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      List: "getList",
    }),
  },
  methods: {
    ...mapActions({
      login: "login_page",
    }),
    async submit() {
      if (this.Name.trim() && this.password.trim()) {
        const obj = {
          Name: this.Name,
          password: this.password,
        };
        localStorage.setItem(
          "loginStatus",
          JSON.stringify({ isLoggedIN: true })
        );
        const response = await this.login(obj);
        localStorage.setItem("token", response.data.token);
        if (response.data.token) {
          var decoded = jwt_decode(response.data.token);
          this.loading = true;
          var Role = decoded["role"];
          localStorage.setItem("role_data", Role);
          axios
            .post()
            .then(() => {
              this.loading = false;
            })
            .catch((err) => {
              return err;
            });
          if (Role === "guest") {
            this.$router.push({ path: "/pollList" });
          } else {
            this.$router.push({ path: "/admin" });
          }
        } else {
          this.$alert("User is not exist! Please create an Account ");
        }
      } else {
        this.$alert("Please Fill all the box ");
      }
      if (!this.loading) {
        this.Name = "";
        this.password = "";
      }
    },
    homepage() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style scoped>
.one {
  margin: 5px 0 10px 0;
}
.four {
  position: relative;
  right: 52px;
  margin: 0 10px 10px 10px;
}
.four_1 {
  margin: 0 10px 10px 10px;
}
.one_two {
  position: relative;
  right: 52px;
  margin: 0 10px 10px 10px;
}
.about {
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgb(83, 197, 231) 100%
  );
  height: 100vh;
}
.first {
  height: 80px;
  width: 100%;
  background-color: rgb(81, 17, 185);
  font-size: 20px;
  color: white;
  line-height: 100px;
  text-align: center;
}
.rdo3 {
  position: relative;
  right: 5px;
}
.main {
  text-align: center;
}
.text-center {
  position: relative;
  position: relative;
  right: 65px;
  margin: 0 9px 9px 9px;
  cursor: pointer;
  font-size: 20px;
  background-color: rgb(6, 101, 226);
  border-style: none;
  border-radius: 5px;
}
.fives {
  position: relative;
  right: 25px;
  top: 4px;
  font-size: 20px;
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgb(5, 124, 236) 100%
  );
  border-style: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
