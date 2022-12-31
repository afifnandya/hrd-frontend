<template>
  <div
    class="flex items-center justify-center min-w-full min-h-screen overflow-hidden"
  >
    <div
      class="flex flex-col p-2 items-center justify-center min-w-[80%] lg:p-0"
    >
      <div
        class="flex items-center justify-center w-full mt-5 text-center xl:mt-0"
      >
        <img
          src="@/assets/images/logo.jpeg"
          alt="sistem logo"
          class="mb-5 w-[100px]"
        />
      </div>

      <div
        class="w-full md:w-8/12 xl:w-5/12"
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color),
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full h-full px-4 m-0 lg:py-5"
          style="
            border-radius: 53px;
            background: linear-gradient(
              180deg,
              var(--surface-50) 38.9%,
              var(--surface-0)
            );
          "
        >
          <div class="mb-5 text-center">
            <div class="mb-3 text-3xl font-medium">Sign in to continue</div>
          </div>

          <div class="w-full mx-auto">
            <form @submit.prevent="doLogin">
              <label for="username" class="block mb-2 text-xl font-medium"
                >Username</label
              >
              <InputText
                id="username"
                v-model="username"
                type="text"
                class="w-full mb-3"
                placeholder="Username"
                style="padding: 1rem"
              />

              <label for="password1" class="block mb-2 text-xl font-medium"
                >Password</label
              >
              <Password
                id="password1"
                v-model="password"
                placeholder="Password"
                :toggle-mask="true"
                :feedback="false"
                class="w-full mb-3"
                input-class="w-full"
                input-style="padding:1rem"
              ></Password>

              <div class="flex items-center mb-5 justify-content-between">
                <div class="flex items-center">
                  <Checkbox
                    id="rememberme1"
                    v-model="checked"
                    :binary="true"
                    class="mr-2"
                  ></Checkbox>
                  <label for="rememberme1">Remember me</label>
                </div>
                <a
                  class="ml-2 font-medium text-right no-underline cursor-pointer"
                  style="color: var(--primary-color)"
                  >Forgot password?</a
                >
              </div>
              <button
                type="submit"
                class="w-full py-3 text-xl text-white bg-blue-500 rounded-lg hover:bg-blue-400"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { logIn } from '@/service/user'
import { ROUTE_DASHBOARD } from '@/constants'
export default {
  data() {
    return {
      username: '',
      password: '',
      checked: false
    }
  },
  methods: {
    async doLogin() {
      console.log('aa')
      const success = await logIn(this.username, this.password)
      if (success) {
        this.$router.push({ name: ROUTE_DASHBOARD })
      }
    }
  }
}
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
