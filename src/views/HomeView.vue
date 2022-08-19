<template>
  <div class="home">
    <div class="main">
      <img class="one" src="../assets/image.webp" alt="alt" />
      <p>
        <router-link to="/signup">
          <button class="signupbtn">Create Account</button>
        </router-link>
      </p>
      <p class="big">
        Already have an account?
        <router-link to="/login">login here!</router-link>
      </p>
      <img />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.big {
  font-size: 20px;
}
.main {
  text-align: center;
}
.signupbtn {
  font-size: 30px;
  background-color: rgb(18, 18, 197);
  color: white;
  border-style: none;
  cursor: pointer;
  margin-top: 5px;
  border-radius: 5px;
}
.home {
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(252, 176, 69, 1) 100%
  );
  height: 100vh;
}
.one {
  margin-top: 5px;
}
</style>
