<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "NotHaveAccessView",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    handleLogin() {
      if (this.username === "admin" && this.password === "password") {
        this.errorMessage = "";
        alert("Login successful!");
        // Add your navigation or auth logic here
      } else {
        this.errorMessage = "Invalid username or password.";
      }
    },
  },
};
</script>
