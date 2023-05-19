<template>
  <div class="container">
    <div class="screen">
      <div class="screen__content">
        <form class="login">
          <div class="login__field">
            <i class="login__icon fas fa-user"></i>
            <input type="text" class="login__input" pattern="^[a-zA-Z]+$" v-model="userName" placeholder="User name">
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <input type="tel" class="login__input" pattern="\D [^a-zA-Z]+$" v-model="phone" placeholder="Phone number">
          </div>
          <button class="button login__submit" @click="checkUser">
            <span class="button__text">Log In Now</span>
            <i class="button__icon fas fa-chevron-right"></i>
          </button>
          <p class="login__error">{{ errorMessage }}</p>
        </form>
      </div>
      <div class="screen__background">
        <span class="screen__background__shape screen__background__shape4"></span>
        <span class="screen__background__shape screen__background__shape3"></span>
        <span class="screen__background__shape screen__background__shape2"></span>
        <span class="screen__background__shape screen__background__shape1"></span>
      </div>
    </div>
  </div>
</template>

<script>
// name: Bret
// phone: 1-770-736-8031 x56442

// "Antonette"
// "010-692-6593 x09125"

import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'LoginForm',
  data() {
    return {
      userName: "",
      phone: "",
      errorMessage: "",
      user: {},
    }
  },
  methods: {
    ...mapActions([
      'getUsers'
    ]),
    ...mapMutations([
      'SET_USER',
    ]),

    isValidUserName() {
      let onlyLetters = /^([a-zа-яё]+)$/i;
      if (onlyLetters.test(this.userName)) {
        return true;
      } else {
        this.errorMessage = "User name should contain only letters";
      }
    },
    isValidPhoneNumber() {
      let onlyNumAndSymb = /^[x\d\-@:%+*~#=()\\\s//]+$/i;
      if (onlyNumAndSymb.test(this.phone)) {
        return true;
      } else {
        this.errorMessage = "Phone number should contain only numbers and/or symbols";
      }
    },
    async checkUser() {
      this.errorMessage = "";

      if (!this.isValidUserName() || !this.isValidPhoneNumber()) {
        return
      }

      let users = await this.getUsers();

      if (users && users.length) {
        users.find(user => {
          if (user.username && user.username === this.userName && user.phone && user.phone === this.phone) {
            this.user = user;
            this.$store.commit('SET_USER', user)
            this.$router.push({ path: `/user/${user.id}` })
          } else {
            this.errorMessage = "User with such name and phone number was not found";
          }
        })
      }
    }
  }
}
</script>