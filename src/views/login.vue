<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 font-sans text-slate-800">
    
    <div class="text-center mb-6 flex flex-col items-center">
      <div class="w-20 h-20 bg-black rounded-lg p-2 mb-3 shadow-md flex items-center justify-center">
        <img src="../assets/CLEA_logo.jpeg" alt="CLEA Logo" class="w-full h-full object-contain" />
      </div>
      <h2 class="text-lg font-semibold text-emerald-800 tracking-wide">CLEA Admin</h2>
      <p class="text-xs text-slate-500 mt-0.5">Portail d'administration sécurisé</p>
    </div>

    <div class="max-w-md w-full bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden relative">
      <div class="h-1 w-full flex">
        <div class="w-1/2 bg-emerald-600"></div>
        <div class="w-1/2 bg-orange-400"></div>
      </div>

      <div class="p-8 space-y-6">
      <div 
          v-if="errorMessage" 
          class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
        <form @submit.prevent="handleLogin" class="space-y-4">
  <div>
    <label class="block text-sm font-medium text-slate-700 mb-1">Email ou Nom d'utilisateur</label>
    <div class="relative flex items-center">
      <span class="absolute left-3 text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </span>
      
      <input 
        v-model="email"
        type="email" 
        placeholder="admin@clea-app.com" 
        class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
        required
      />
    </div>
  </div>
  <div class="relative flex items-center">
  <span class="absolute left-3 text-slate-400">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  </span>
  
  <input 
    v-model="password"
    :type="showPassword ? 'text' : 'password'" 
    placeholder="••••••••" 
    class="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
    required
  />

  <button 
    type="button" 
    @click="showPassword = !showPassword"
    class="absolute right-3 text-slate-400 hover:text-slate-600"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  </button>
</div>
  <div class="flex items-center mt-2">
    <input 
      id="remember_me" 
      type="checkbox" 
      class="checkbox checkbox-xs rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
    />
    <label for="remember_me" class="ml-2 text-xs text-slate-500 select-none">Rester connecté</label>
  </div>

  <button 
    type="submit" 
    class="w-full mt-4 bg-teal-800 hover:bg-teal-900 text-white font-medium py-2.5 px-4 rounded-lg text-sm flex items-center justify-center space-x-2 shadow-md transition-colors"
  >
    <span>Se connecter</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  </button>
</form>
        </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'
const showPassword = ref(false)
import { useRouter } from 'vue-router' //importation useRouter

const email = ref('')
const password = ref('')
const router = useRouter()
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    //etape1 : on demande le jeton de sécurité CSRF
    await api.get('/sanctum/csrf-token')
    //etape2 : on envoie les identifiants pour se connecter
    const response = await api.post('/api/login', {
      email: email.value,
      password: password.value
    })
    // on affiche la reponse de l'API dans la console pour verifier
    console.log('Connexion reussie!', response.data)
    localStorage.setItem('token', response.data.token) // On stocke le token
    router.push('/') // On redirige vers le dashboard

  } catch (error) {

    // On récupère le message d'erreur du backend ou on met un message par défaut
  if (error.response && error.response.data && error.response.data.message) {
    errorMessage.value = error.response.data.message
  } else {
    errorMessage.value = "Une erreur est survenue lors de la connexion. Veuillez réessayer."
  }
     console.error('Erreur lors de la connexion :', error.response?.data)
  }
}
</script>