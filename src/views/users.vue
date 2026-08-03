<template>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
    <div>
      <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Gestion des Utilisatrices</h1>
      <p class="text-sm text-slate-500 mt-1">Consultez, filtrez et gérez l'ensemble des comptes de la plateforme.</p>
    </div>

    <div class="flex items-center gap-3">
      <button class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer">
        <Download class="w-4 h-4 text-slate-400" />
        Exportateur CSV
      </button>

      <button class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer">
        <Plus class="w-4 h-4" />
        Nouvelle utilisatrice
      </button>
    </div>
  </div>

  <!-- GRILLE DE STATS (Devient dynamique grâce au computed 'stats') -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div 
      v-for="stat in stats" 
      :key="stat.id" 
      class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between"
    >
      <div>
        <p class="text-sm font-medium text-slate-400">{{ stat.titre }}</p>
        <h3 class="text-2xl font-bold text-slate-800 mt-1">{{ stat.valeur }}</h3>
      </div>
      <div :class="['p-3 rounded-lg', stat.couleurIcone]">
        <component :is="stat.icone" class="w-6 h-6" />
      </div>
    </div>
  </div>

  <div class="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
    <div class="p-5 border-b border-slate-100">
      <h2 class="text-lg font-semibold text-slate-800">Liste des utilisatrices</h2>
    </div>

    <div class="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
      <div class="flex flex-wrap items-center gap-3">
        <select class="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 outline-none focus:border-emerald-500 cursor-pointer">
          <option>Toutes les catégories</option>
        </select>
        <select class="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 outline-none focus:border-emerald-500 cursor-pointer">
          <option>Tous les statuts</option>
        </select>
        <button class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium px-3 py-2 cursor-pointer">
          <SlidersHorizontal class="w-4 h-4 text-slate-400" />
          Filtres avancés
        </button>
      </div>

      <div class="text-slate-400 text-xs sm:text-sm">
        Affichage de <span class="font-medium text-slate-700">{{ users.length > 0 ? '1 - ' + users.length : '0' }}</span> sur <span class="font-medium text-slate-700">{{ users.length }}</span>
      </div>
    </div>

    <!-- ÉTAT DE CHARGEMENT -->
    <div v-if="loading" class="p-20 text-center text-slate-400">
      <p class="animate-pulse">Chargement des données en cours...</p>
    </div>

    <!-- ÉTAT D'ERREUR -->
    <div v-else-if="error" class="p-20 text-center text-red-500 bg-red-50/50">
      <p>{{ error }}</p>
      <button @click="loadUsers" class="mt-2 underline text-sm cursor-pointer">Réessayer</button>
    </div>

    <!-- TABLEAU DYNAMIQUE -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-100">
            <th class="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Utilisatrice</th>
            <th class="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Statut</th>
            <th class="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Inscription</th>
            <th class="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Dernière connexion</th>
            <th class="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50/50 transition-colors">
            <td class="p-4 flex items-center gap-3">
              <!-- Avatar dynamique avec fallback si pas d'image -->
              <img 
                :src="user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`" 
                alt="Avatar" 
                class="w-10 h-10 rounded-full object-cover bg-slate-100" 
              />
              <div>
                <div class="font-semibold text-slate-800 text-sm">{{ user.name }}</div>
                <div class="text-xs text-slate-400">{{ user.email }}</div>
              </div>
            </td>

            <td class="p-4 text-sm">
              <span :class="['inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border', getStatusClass(user.status)]">
                <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                {{ user.status || 'Actif' }}
              </span>
            </td>

            <td class="p-4 text-sm text-slate-500">
              {{ formatDate(user.created_at) }}
            </td>

            <td class="p-4 text-sm text-slate-500">
              {{ user.last_login_at ? formatDate(user.last_login_at) : 'Inconnu' }}
            </td>

            <td class="p-4 text-sm text-right">
              <div class="flex items-center justify-end gap-2">
                <button class="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer" title="Voir les détails">
                  <Eye class="w-4 h-4" />
                </button>
                
                <button v-if="user.status === 'Actif' || user.status === 'active'" class="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors cursor-pointer" title="Suspendre">
                  <CirclePlay class="w-4 h-4 text-amber-500" />
                </button>

                <button v-else class="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer" title="Réactiver">
                  <CirclePlay class="w-4 h-4" />
                </button>
                
                <button class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer" title="Désactiver">
                  <UserX class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- PAGINATION (Statique pour le moment) -->
      <div class="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-4 text-sm">
        <button class="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors cursor-pointer disabled:opacity-50">
          Précédent
        </button>
        <div class="flex items-center gap-1.5">
          <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-600 text-white font-medium text-xs sm:text-sm cursor-pointer">1</button>
        </div>
        <button class="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors cursor-pointer">
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
// Importation de ta fonction API (vérifie bien le chemin vers ton dossier services)
import { fetchUsers } from '../services/api' 
import { Users, UserCheck, ShieldAlert, Download, Plus, SlidersHorizontal, Eye, CirclePlay, UserX } from 'lucide-vue-next'

// --- ÉTATS ---
const users = ref([])         // Liste réelle des utilisatrices
const loading = ref(true)     // État de chargement
const error = ref(null)       // Gestion des erreurs

// --- RÉCUPÉRATION DES DONNÉES ---
const loadUsers = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetchUsers()
    // On adapte selon la structure de ta réponse API (souvent response.data)
    users.value = response.data.users || response.data
  } catch (err) {
    error.value = "Erreur lors de la récupération des utilisatrices."
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadUsers)

// --- STATISTIQUES DYNAMIQUES ---
// On recalcule automatiquement les chiffres dès que 'users' change
const stats = computed(() => {
  const total = users.value.length
  const actifs = users.value.filter(u => u.status === 'Actif' || u.status === 'active').length
  const suspendus = total - actifs

  return [
    { 
      id: 1, 
      titre: 'Total Utilisatrices', 
      valeur: total.toLocaleString(), 
      icone: Users, 
      couleurIcone: 'text-sky-600 bg-sky-50' 
    },
    { 
      id: 2, 
      titre: 'Comptes Actifs', 
      valeur: actifs.toLocaleString(), 
      icone: UserCheck, 
      couleurIcone: 'text-emerald-600 bg-emerald-50' 
    },
    { 
      id: 3, 
      titre: 'En Attente / Suspendus', 
      valeur: suspendus.toLocaleString(), 
      icone: ShieldAlert, 
      couleurIcone: 'text-amber-600 bg-amber-50' 
    }
  ]
})

// --- HELPERS (Formatage) ---
const formatDate = (dateString) => {
  if (!dateString) return 'Jamais'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

// Fonction pour mapper les couleurs de statut dynamiquement
const getStatusClass = (status) => {
  if (status === 'Actif' || status === 'active') 
    return 'text-emerald-700 bg-emerald-50 border-emerald-100'
  return 'text-amber-700 bg-amber-50 border-amber-100'
}
</script>