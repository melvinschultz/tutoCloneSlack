<template>
  <div class="ui middle aligned center aligned grid login__container">
    <div class="column">
      <h2 class="ui orange header">
        <div class="content">
          #Tuto::Slack#
        </div>
      </h2>
      <form class="ui large form" :class="{ 'error': hasErrors }">
        <div class="ui stacked segment">

          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="email" name="email" placeholder="Email" v-model.trim="email" required>
            </div>
          </div>

          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" placeholder="Password" v-model.trim="password" required>
            </div>
          </div>

          <div class="ui fluid large orange button" @click.prevent="login" :class="{ 'loading': isLoading }">Se connecter</div>
        </div>

        <div class="ui error message" v-if="hasErrors">
          <p v-for="error in errors">{{ error }}</p>
        </div>
      </form>

      <div class="ui message">
        Pas encore inscrit ? <router-link to="/register">S'inscrire</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',
    data () {
      return {
        email: '',
        password: '',
        errors: [],
        isLoading: false
      }
    },
    computed: {
      hasErrors () {
        return this.errors.length > 0
      }
    },
    methods: {
      login () {
        this.errors = []

        if (this.isFormValid()) {
          this.isLoading = true
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
            console.log(user)
            this.$store.dispatch('setUser', user)
            this.$router.push('/')
          }).catch(error => {
            console.log(error)
            this.errors.push(error.message)
            this.isLoading = false
          })
        }
      },
      isEmpty () {
        if (this.email.length === 0 || this.password.length === 0) {
          return true
        }
        return false
      },
      passwordValid () {
        if (this.password < 6) {
          return false
        }
        return true
      },
      isFormValid () {
        if (this.isEmpty()) {
          this.errors.push('Veuillez remplir tous les champs')
          return false
        }
        if (!this.passwordValid()) {
          this.errors.push('Passwords incorrects')
          return false
        }
        return true
      }
    }
  }

</script>

<style scoped>
  .login__container {
    margin-top: 40px;
  }
  .column {
    max-width: 450px;
  }
</style>
