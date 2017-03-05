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
              <input type="text" name="name" placeholder="Pseudo" v-model.trim="name">
            </div>
          </div>

          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="email" name="email" placeholder="Email" v-model.trim="email">
            </div>
          </div>

          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" placeholder="Password" v-model="password">
            </div>
          </div>

          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password_confirmation" placeholder="Confirmation password" v-model="password_confirmation">
            </div>
          </div>

          <div class="ui fluid large orange button" @click.prevent="register" :class="{ 'loading': isLoading }">S'inscrire</div>
        </div>

        <div class="ui error message" v-if="hasErrors">
          <p v-for="error in errors">{{ error }}</p>
        </div>

      </form>

      <div class="ui message">
        Déjà un compte ? <router-link to="/login">Se connecter</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'md5'
  import firebase from 'firebase'

  export default {
    name: 'register',
    data () {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors: [],
        usersRef: firebase.database().ref('users'),
        isLoading: false
      }
    },
    computed: {
      hasErrors () {
        return this.errors.length > 0
      }
    },
    methods: {
      register () {
        this.errors = []

        if (this.isFormValid()) {
          this.isLoading = true
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
            // On met à jour le displayName et le lien vers l'avatar de l'utilisateur
            user.updateProfile({
              displayName: this.name,
              photoURL: 'http://www.gravatar.com/avatar/' + md5(user.email) + '?d=identicon'
            }).then(() => {
              // Enregistrement de l'utilisateur en bdd
              this.saveUserToUsersRef(user).then(() => {
                this.$store.dispatch('setUser', user)
                this.$router.push('/')
              })
            }, error => {
              console.log(error)
              this.errors.push(error.message)
              this.isLoading = false
            })
          }).catch(error => {
            console.log(error)
            this.errors.push(error.message)
            this.isLoading = false
          })
        }
      },
      saveUserToUsersRef (user) {
        return this.usersRef.child(user.uid).set({
          id: user.uid,
          name: user.displayName,
          avatar: user.photoURL
        })
      },
      isEmpty () {
        if (this.name.length === 0 || this.email.length === 0 || this.password.length === 0 || this.password_confirmation.length === 0) {
          return true
        }
        return false
      },
      passwordValid () {
        if (this.password < 6 || this.password_confirmation < 6) {
          return false
        }
        if (this.password !== this.password_confirmation) {
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
