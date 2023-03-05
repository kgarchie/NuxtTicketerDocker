<template>
  <div class="chat-wrapper">
    <div class="chat_container not_active">
      <div class="user-profile" style="width: 100%">
        <div class="user-name is-flex is-align-items-center">Admin
          <button class="close-chat not_active" style="cursor: pointer">
            <span class="ex"></span>
          </button>
        </div>
      </div>
      <div class="is-flex is-flex-direction-column message-list">
        <ul class="people">
          <li class="person" v-for="(chat, index) in chats" :key="index">
            <span class="chat_title">{{ chat.to_user }}</span>
            <span class="time">{{ chat.created_at }}</span><br>
            <span class="preview">{{ chat.latest_chat }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="chat_box is-flex is-flex-direction-column is-justify-content-space-between">
      <div class="top-bar">
        <div class="avatar"><p></p></div>
        <div class="name" id=""></div>
        <div class="icons">
          <i class="fas fa-phone"></i>
          <i class="fas fa-video"></i>
        </div>
        <div class="chat_menu">
          <div class="dots"></div>
        </div>
      </div>
      <div class="middle" id="messages_container">
        <div class="messages" id="chat_box">
          <div class="bubble incoming typing" id="typing_indicator">
            <div class="ellipsis one"></div>
            <div class="ellipsis two"></div>
            <div class="ellipsis three"></div>
          </div>
        </div>
      </div>
      <div class="bottom-bar">
        <div class="text">
          <input id="chat_input" class="chat_input" type="text" placeholder="Type a message..."/>
          <button class="chat_button" type="submit">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chats: []
    }
  },
  methods: {
    getChats() {

    }
  },
  mounted() {
    // Data Functions
    this.getChats();


    // Other Functions
    const chatButton = document.querySelector('.chat-button');

    chatButton.addEventListener('click', function () {
      try {
        const chat_container = document.querySelector('.chat_container');
        let close_chat = document.querySelector('.close-chat');

        chat_container.classList.toggle('not_active');
        chatButton.classList.toggle('not_active');
        close_chat.classList.toggle('not_active');
      } catch (e) {
        console.log(e);
      }
    });

    // Messages Functions
    const messages_container = document.getElementById("messages_container");
    const typing_indicator = document.getElementById("typing_indicator");
    const chat_input = document.getElementById("chat_input");

    typing_indicator.style.display = "none";

    function positionMessages() {
      messages_container.scrollTop = messages_container.scrollHeight;
    }
  }
}
</script>

<style scoped>
.chat-button {
  opacity: 0.3;
}

.chat-button:hover {
  opacity: 1;
}
</style>