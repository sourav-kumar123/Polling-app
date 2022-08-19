<template>
  <div class="about">
    <div class="main">
      <label for="Name" class="one">UserName:</label><br />
      <input
        type="text"
        placeholder="Enter  Name"
        v-model="Name"
        class="one_1"
      /><br />
      <label for="password" class="three">password:</label><br />
      <input
        type="password"
        placeholder="password"
        v-model="password"
        class="Three_1"
      /><br />
      <label for="password" class="four">Confirm-password:</label><br />
      <input
        type="password"
        placeholder="confirm-password"
        v-model="Cpassword"
        class="four_1"
      /><br />
      <label for="Role" class="four">Role:</label>
      <input
        type="radio"
        v-model="role"
        value="admin"
        name="Role"
        class="rdo3"
      />
      <label for="" class="rdo3">Admin </label>
      <input
        type="radio"
        v-model="role"
        value="guest"
        name="Role"
        class="rdo3"
      /><label for="" class="rdo3">guest </label>
      <br />
      <br />
      <button class="five" @click="SignUp">
        {{ loading ? "Loading..." : "SignUp " }}</button
      ><br /><br />
      <button class="fives" @click="homepage">Go to homepage</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "SignupView",
  data() {
    return {
      Name: "",
      password: "",
      Cpassword: "",
      role: "",
      id: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      users: "getUsers",
    }),
  },
  methods: {
    ...mapActions({
      signUpUsers: "signUpUsers",
    }),
    async SignUp() {
      if (
        this.Name.trim() &&
        this.password.trim() &&
        this.Cpassword.trim() &&
        this.role.trim()
      ) {
        if (this.password.length >= 6) {
          const obj = {
            Name: this.Name,
            password: this.password,
            role: this.role,
          };
          if (this.password == this.Cpassword) {
            this.loading = true;
            axios
              .post()
              .then(() => {
                this.loading = false;
              })
              .catch((err) => {
                return err;
              });
            const response = await this.signUpUsers(obj);
            if (response.data.error == 1) {
              this.$alert("account is already exist");
              this.loading = false;
            } else {
              this.$alert("account is created");
              this.$router.push({ path: "/login" });
            }
          } else {
            this.$alert("passwords not matching");
          }
        } else {
          this.$alert("minimum length of password should be 6");
        }
      } else {
        this.$alert("Please fill all the box");
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
  position: relative;
  right: 52px;
  margin: 10px 10px 10px 10px;
}
.one_1 {
  margin: 5px 0 10px 0;
}
.about {
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgb(238, 132, 83) 100%
  );
  height: 100vh;
}
.five {
  position: relative;
  right: 53px;
  font-size: 20px;
  background-color: rgb(70, 70, 223);
  border-style: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 22px;
}
.main {
  text-align: center;
}
.fives {
  font-size: 20px;
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgb(236, 5, 5) 100%
  );
  border-style: none;
  border-radius: 5px;
  position: relative;
  right: 25px;
  cursor: pointer;
}
.three {
  position: relative;
  right: 52px;
  margin: 5px;
}
.three_1 {
  margin: 5px 0 10px 0;
}
.four {
  position: relative;
  right: 25px;
  margin: 5px;
}
.four_1 {
  margin: 5px 0 0 0;
}
.rdo3 {
  margin: 1px;
}
</style>
