<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="flex flex-row justify-center items-center gap-3">

        <img alt="Vue logo" src="../../assets/logo.svg">
        <div class="text-4xl font-bold text-white">AVSTACTA</div>
    </div>
    <div class="max-w-[22rem] flex flex-col gap-y-3 justify-center items-center w-full p-6 py-10 bg-white/20 border-2 border-white/20 backdrop-blur-md rounded-xl text-white font-[Roboto] shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-8">Login</h2>
      <form @submit.prevent="login" class="flex flex-col justify-center items-center w-full gap-y-5">
          <input type="text" v-model="username" id="username" name="username" placeholder="Username" class="w-full rounded-3xl py-2 px-4 bg-white/80 backdrop-blur-sm text-black">
          <input type="password" v-model="password" id="password" name="password" placeholder="Password" class="w-full rounded-3xl py-2 px-4 bg-white/80 backdrop-blur-sm  text-black">
        <button type="submit" class="mt-5 bg-[#264595] hover:bg-[#26459580] w-[80%] mx-auto text-white py-2 px-4 rounded-3xl">Login</button>
      </form>
      <span class="mt-1 text-[#8BD0EA]">or</span>
      <div class="text-[#B7B7B7]">
        Don't have an account? <a class="text-[#8BD0EA]" href="/signup">Sign up</a>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../services/axios"
import {useToast} from 'vue-toast-notification';
import Cookies from 'js-cookie';
export default {
  name: 'LoginComponent',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
    const toast = useToast();

      const data = {
        username: this.username,
        password: this.password
      };
      // Replace with your backend API endpoint

      await API.post("/users/login",data)
        .then(response => {
          // Handle successful login
          console.log('Login successful:', response.data);
          toast.success('Login successful');
          Cookies.set('accessToken', response.data.accessToken);

        })
        .catch(error => {
          // Handle login error
          toast.error(`Login failed: ${error?.response?.data?.error}`);
        });
    }
  }
};
</script>

