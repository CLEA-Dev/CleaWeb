<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// AJOUT : On importe la fonction de déconnexion depuis ton fichier API
import { seDeconnecter } from './services/api' 

const router = useRouter()
const currentUser = ref(null)

onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    try {
      currentUser.value = JSON.parse(savedUser)
    } catch (e) {
      console.error('Erreur lors de la lecture des infos utilisateur :', e)
    }
  }
})

// MODIFICATION : On rend la fonction "async" pour attendre la réponse du serveur
const handleLogout = async () => {
  try {
    // 1. Appel à l'API pour invalider le token côté serveur
    await seDeconnecter() 
  } catch (error) {
    // On log l'erreur mais on continue la déconnexion locale quand même
    console.error("Erreur lors de la déconnexion API", error)
  } finally {
    // 2. Nettoyage local (ton code d'origine)
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    currentUser.value = null

    // 3. Redirection
    router.push('/login')
  }
}
</script>
<template>
  <div class="flex min-h-screen bg-slate-50 text-slate-800">
    
    <!-- Navigation Latérale (Sidebar) -->
    <aside v-if="!$route.meta.hideNavigation" class="w-64 bg-white border-r border-slate-100 flex flex-col justify-between">
      <div>
        <div class="p-6">
          <h2 class="text-xl font-bold text-emerald-800 tracking-wide">CLEA Admin</h2>
          <p class="text-xs text-slate-400 mt-1">Back Office Management</p>
        </div>
        
        <nav class="mt-2">
          <ul class="space-y-1">
            <li class="relative">
              <RouterLink to="/" class="flex items-center gap-3 pl-6 pr-4 py-3 text-slate-500 hover:bg-slate-50">
                <span>Tableau de bord</span>
              </RouterLink>
            </li>
            <li class="relative">
              <RouterLink to="/users" class="flex items-center gap-3 pl-6 pr-4 py-3 text-slate-500 hover:bg-slate-50">
                <span>Utilisatrices</span>
              </RouterLink>
            </li>
            <li class="relative">
              <RouterLink to="/CoachValid" class="flex items-center gap-3 pl-6 pr-4 py-3 text-slate-500 hover:bg-slate-50">
                <span>Validation des entraîneurs</span>
              </RouterLink>
            </li>
            <li class="relative">
              <RouterLink to="/ContentMgr" class="flex items-center gap-3 pl-6 pr-4 py-3 text-slate-500 hover:bg-slate-50">
                <span>Gestion de contenu</span>
              </RouterLink>
            </li>
            <li class="relative">
              <RouterLink to="/profil" class="flex items-center gap-3 pl-6 pr-4 py-3 text-slate-500 hover:bg-slate-50">
                <span>Profil Admin</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="p-4 border-t border-slate-100 bg-slate-50/50">
        <div class="flex items-center gap-3 pl-2 py-2 text-slate-500 hover:text-slate-800 cursor-pointer text-sm">
          <span>Settings</span>
        </div>
        
        <!-- Bouton Déconnexion fonctionnel avec @click -->
        <div 
          @click="handleLogout" 
          class="flex items-center gap-3 pl-2 py-2 text-red-600 hover:text-red-700 cursor-pointer text-sm mt-1 font-medium select-none"
        >
          <span>Logout</span>
        </div>
      </div>
    </aside>

    <!-- Zone principale -->
    <main class="flex-1 flex flex-col bg-slate-50">
      <header v-if="!$route.meta.hideNavigation" class="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8">
        <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg w-80">
          <span>🔍</span>
          <input 
            type="text" 
            placeholder="Search data, users, or articles..." 
            class="bg-transparent text-sm w-full outline-none placeholder:text-slate-400"
          />
        </div>

        <div class="flex items-center gap-6">
          <div class="flex items-center gap-4 text-slate-400">
            <button>🔔</button>
            <button>❓</button>
          </div>

          <div class="flex items-center gap-3 border-l border-slate-100 pl-6">
            <div class="text-right">
              <!-- Nom et Rôle dynamiques issus du localStorage -->
              <p class="text-sm font-semibold text-slate-700">{{ currentUser?.name || 'Admin User' }}</p>
              <p class="text-xs text-slate-400 uppercase tracking-wider">{{ currentUser?.email || 'Super Admin' }}</p>
            </div>

            <!-- Avatar avec l'initiale de l'utilisateur -->
            <div class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs border border-emerald-200">
              {{ (currentUser?.name || 'A').charAt(0).toUpperCase() }}
            </div>
          </div>
        </div>
      </header>

      <div class="p-8 flex-1">
        <RouterView />
      </div>
    </main>

  </div>
</template>