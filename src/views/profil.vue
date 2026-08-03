<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-slate-800">Mon Profil Admin</h1>
      <p class="text-slate-500 text-sm mt-1">Gérez vos informations personnelles et votre sécurité.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
    
      <div class="md:col-span-2 space-y-6">
        <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h2 class="font-semibold text-slate-800 mb-4 text-lg">Informations Personnelles</h2>
          
          <form @submit.prevent="handleUpdateInfo" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Nom complet</label>
              <input v-model="formInfo.name" type="text" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Adresse Email</label>
              <input v-model="formInfo.email" type="email" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required />
              
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email[0] }}</p>
            </div>

            <button :disabled="loadingInfo" type="submit" class="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50">
              {{ loadingInfo ? 'Enregistrement...' : 'Mettre à jour le profil' }}
            </button>
            <p v-if="successMsg" class="text-emerald-600 text-sm mt-2 font-medium">✓ {{ successMsg }}</p>
          </form>
        </div>
      </div>

      
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h2 class="font-semibold text-slate-800 mb-4 text-lg">Sécurité</h2>
          <p class="text-xs text-slate-500 mb-4">Changez votre mot de passe régulièrement pour protéger votre compte.</p>
          
          <form @submit.prevent="handleUpdatePassword" class="space-y-3">
            <input v-model="formPass.current_password" type="password" placeholder="Mot de passe actuel" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" required />
            <input v-model="formPass.new_password" type="password" placeholder="Nouveau mot de passe" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" required />
            <input v-model="formPass.new_password_confirmation" type="password" placeholder="Confirmer le nouveau" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" required />
            
            <button :disabled="loadingPass" type="submit" class="w-full bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors">
              Changer le mot de passe
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMonProfil, updateMonProfil, updateMonMotDePasse } from '../services/api'

const formInfo = ref({ name: '', email: '' })
const formPass = ref({ current_password: '', new_password: '', new_password_confirmation: '' })


const loadingInfo = ref(false)
const loadingPass = ref(false)
const errors = ref({})
const successMsg = ref('')


onMounted(async () => {
  try {
    const res = await getMonProfil()
    formInfo.value.name = res.data.user?.name || res.data.name
    formInfo.value.email = res.data.user?.email || res.data.email
  } catch (err) {
    console.error("Impossible de charger le profil", err)
  }
})


const handleUpdateInfo = async () => {
  loadingInfo.value = true
  errors.value = {}
  successMsg.value = ''
  try {
    const res = await updateMonProfil(formInfo.value)
    successMsg.value = res.data.message
    
    localStorage.setItem('user', JSON.stringify(res.data.user))
  } catch (err) {
    if (err.response && err.response.data) {
      errors.value = err.response.data 
    }
  } finally {
    loadingInfo.value = false
  }
}

// Action : Changer Mot de Passe
const handleUpdatePassword = async () => {
  loadingPass.value = true
  try {
    await updateMonMotDePasse(formPass.value)
    alert("Mot de passe modifié avec succès !")
    formPass.value = { current_password: '', new_password: '', new_password_confirmation: '' }
  } catch (err) {
    alert("Erreur : Vérifiez votre mot de passe actuel.")
  } finally {
    loadingPass.value = false
  }
}
</script>