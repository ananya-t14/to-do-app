<template> 
    <div class="min-h-screen flex flex-col gap-3 items-center justify-center">
        <div class="flex flex-row justify-center items-center gap-3">

            <img alt="Vue logo" src="../../assets/logo.svg">
            <div class="text-4xl font-bold text-white">AVSTACTA</div>
        </div>
        <div class="max-w-[22rem] flex flex-col gap-y-3 justify-center items-center w-full p-6 py-10 bg-white/20 border-2 border-white/20 backdrop-blur-md rounded-xl text-white font-[Roboto] shadow-lg">
          <h2 class="text-2xl font-bold text-center mb-8">Sign Up</h2>
          <form @submit.prevent="signup" class="flex flex-col justify-center items-center w-full gap-y-5">
            <input placeholder="Name" type="text" v-model="name" id="name" name="name" class="w-full rounded-3xl py-2 px-4 bg-white/80 backdrop-blur-sm text-black">
            <input placeholder="Username" type="text" v-model="username" id="username" name="username" class="w-full rounded-3xl py-2 px-4 bg-white/80 backdrop-blur-sm text-black">
            <input placeholder="Email" type="email" v-model="email" id="email" name="email" class="w-full rounded-3xl py-2 px-4 bg-white/80 backdrop-blur-sm text-black">
            <input placeholder="Password" type="password" v-model="password" id="password" name="password" class="w-full rounded-3xl py-2 px-4 bg-white/80 backdrop-blur-sm text-black">
            <input placeholder="Confirm Password" type="password" v-model="confirmPassword" id="confirmPassword" name="confirmPassword" class="w-full rounded-3xl py-2 px-4 bg-white/80 backdrop-blur-sm text-black">
            <button type="submit" class="mt-5 bg-[#264595] hover:bg-[#26459580] w-[80%] mx-auto text-white py-2 px-4 rounded-3xl">Sign Up</button>
          </form>
          <span class="mt-1 text-[#8BD0EA]">or</span>
          <div class="text-[#B7B7B7]">
            Already have an account? <a class="text-[#8BD0EA]" href="/">Login</a>
          </div>
        </div>
      </div>
  </template>
  
  <script>
    import {useToast} from 'vue-toast-notification';
    import API from "../../services/axios"
    import Cookies from 'js-cookie';

    const toast = useToast();
    export default {
    data() {
      return {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      async signup() {
        // Validate password match
        if (this.password !== this.confirmPassword && this.password!=='' && this.confirmPassword!==undefined) {
          toast.error('Passwords do not match');
          return;
        }
  
        // Password validation or other signup logic can be added here
  
        const data = {
        username: this.username,
        password: this.password,
        email: this.email,
        name: this.name
      };
      // Replace with your backend API endpoint

      await API.post("/users/signup",data)
        .then(response => {
          // Handle successful login
          console.log('Login successful:', response.data);
           // Reset form fields after successful signup
           Cookies.set('accessToken', response.data.accessToken);
        this.name = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
  
        toast.success('Sign up successful');
        })
        .catch(error => {
          // Handle login error
          toast.error(`Login failed: ${error?.response?.data?.error}`);
        });
    }

       
      }
    
  };
  </script>
  