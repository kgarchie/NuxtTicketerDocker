<template>
  <nav class="navbar is-white">
    <div class="container">
      <div class="navbar-brand">
        <NuxtLink to="/" class="navbar-item brand-text">
          Ticketer
        </NuxtLink>
        <div class="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-start">
          <NuxtLink to="/" class="navbar-item">
            Home
          </NuxtLink>
          <NuxtLink to="/tickets/" class="navbar-item">
            Tickets
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
  <slot></slot>
  <div class="chat">
    <div class="chat-button">
      <button class="button is-primary">Chat</button>
    </div>
    <!--<Chat/>-->
  </div>
</template>
<style scoped></style>
<script setup lang="ts">
// try to get user auth cookie from cookie store
let userCookie = useCookie('user')
let user: string

if (!userCookie) {
  let { data:userData } = await useFetch('/api/user')
  if (userData) {
    user = userData.value.user_id
    console.log('userData', userData.value)
  } else {
    console.error('No user data found | User cookie not found & User could not be created | fetched')
  }
} else {
  user = userCookie.value
  console.log('userCookie', userCookie.value)
}

const {$socket} = useNuxtApp()

onMounted(() => {
  $socket.onopen = () => {
    $socket.send(user)
  }
  $socket.onmessage = ({data}: any) => {
    console.log("data", data)
  }
  $socket.onclose = function () {
    console.log("disconnected")
  }
})

</script>