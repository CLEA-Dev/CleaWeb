<template>
   <div class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
           <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Tableau de bord</h1>
           <p class="text-sm text-slate-500 mt-1">Bienvenue, voici un aperçu de l'activité de CLEA aujourd'hui</p>
        </div>

        <button class="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-2 py-4  text-sm font-medium transition-colors shadow-sm">
            <span>Exporter le rapport</span>
        </button>
      </div>
   </div>
   
   <div class="grid grid-cols-4 gap-6">
    <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between mt-6">
        <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500">Total Utilisatrices</span>
            <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
        </div>
        <div class="mt-4">
            <h3 class="text-2xl font-bold text-slate-800 tracking-tight">12,482</h3>
        </div>
    </div>
        <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between mt-6">
        <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500">Coachs Actifs</span>
            <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">+5%</span>
        </div>
        <div class="mt-4">
            <h3 class="text-2xl font-bold text-slate-800 tracking-tight">342</h3>
        </div>
    </div>

     <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between mt-6">
        <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500">Articles publiés</span>
            <span class="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Constant- </span>
        </div>
        <div class="mt-4">
            <h3 class="text-2xl font-bold text-slate-800 tracking-tight">1,894</h3>
        </div>
    </div>
     <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between mt-6">
        <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500">Revenus (Mensuels)</span>
            <span class="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full"> -2%</span>
        </div>
        <div class="mt-4">
            <h3 class="text-2xl font-bold text-slate-800 tracking-tight">42.5k $</h3>
        </div>
    </div>
  </div>
    <div class="grid grid-cols-3 gap-6 mt-8">
        <div class="col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-base font-bold text-slate-800">Tendances des inscriptions</h3>
                <span class="text-xs text-slate-400 border border-slate-200 px-2 py-1 rounded-md">Derniers 7 jours 🔽</span>
            </div>
            <div class="h-64 bg-slate-50 rounded-lg flex items-center justify-between text-slate-400 text-sm"> espace pour les graphique</div>
        </div>
       <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm ">
    <div class="mb-6">
      <h3 class="text-base font-bold text-slate-800">Activités récentes</h3>
    </div>
    <div class="space-y-4 flex-1">
      <div class="text-sm">
        <p class="text-slate-700 font-medium">Sophie Martin <span class="text-slate-400 font-normal">s'est inscrite.</span></p>
        <p class="text-xs text-slate-400 mt-0.5">Il y a 5 minutes</p>
      </div>
      <div class="text-sm border-t border-slate-100 pt-3">
        <p class="text-slate-700 font-medium">Coach Amélie <span class="text-slate-400 font-normal">a publié un article.</span></p>
        <p class="text-xs text-slate-400 mt-0.5">Il y a 22 minutes</p>
      </div>
    </div>
   </div>
    </div>
    <div class="bg-white rounded-xl border border-slate-100 shadow-sm mt-8">
        <div class="p-6 flex items-center justify-between border-b border-slate-100">
            <p class="text-xs text-rose-500">Menu actif actuel : {{ activeMenu }}</p>
            <h3 class="text-base font-bold text-slate-800">Dernières inscriptions</h3>
            <a href="#" class="text-xs font-medium text-emerald-700 hover:underline">Voir toutes les utilisatrices</a>
        </div>
        <table class="w-full text-left border-collapse">
            <thead>
    <tr class="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-100">
      <th class="py-3 px-6">Utilisatrice</th>
      <th class="py-3 px-6">Date d'inscription</th>
      <th class="py-3 px-6">Type de compte</th>
      <th class="py-3 px-6">Statut</th>
      <th class="py-3 px-6 text-right">Actions</th>
    </tr>
  </thead>

 <tbody class="text-sm divide-y divide-slate-100 text-slate-700">
  
  <tr v-for="user in utilisatrices" :key="user.id" class="hover:bg-slate-50/50 transition-colors">
    
    <td class="py-4 px-6 flex items-center gap-3">
      <div :class="['w-8 h-8 rounded-full font-semibold text-xs flex items-center justify-center', user.couleurBadge]">
        {{ user.initiales }}
      </div>
      <div>
        <p class="font-medium text-slate-800">{{ user.nom }}</p>
        <p class="text-xs text-slate-400">{{ user.email }}</p>
      </div>
    </td>
    
    <td class="py-4 px-6 text-slate-500">{{ user.date }}</td>
    
    <td class="py-4 px-6 text-slate-500">{{ user.type }}</td>
    
    <td class="py-4 px-6">
      <span :class="[
        'text-xs font-medium px-2.5 py-1 rounded-full',
        user.statut === 'Actif' ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
      ]">
        ● {{ user.statut }}
      </span>
    </td>
    
    <td class="py-4 px-6 text-right text-slate-400 relative">
      <button @click="toggleMenu(user.id)" class="hover:text-slate-600 font-bold px-2">
        ⋮
      </button>

      <div v-if="activeMenu === user.id" class="bg-slate-100 p-2 rounded text-xs text-left mt-1 absolute right-6 z-50 shadow-md">
        <button @click="modifierUtilisatrice(user)" class="block w-full text-left py-1 text-slate-700 hover:text-slate-900">
          ✏️ Modifier
        </button>
        <button @click="bannirUtilisatrice(user)" class="block w-full text-left py-1 text-rose-600 hover:text-rose-800">
          🚫 Suspendre
        </button>
      </div>
    </td>

  </tr>

</tbody>
        </table>
    </div>
     
</template>

<script setup>
   
 import { ref } from 'vue'

// Variable pour suivre quel menu d'action est ouvert
const activeMenu = ref(null)

// Notre liste d'utilisatrices (les données du tableau)
const utilisatrices = ref([
  {
    id: 1,
    nom: 'Emma Meyer',
    email: 'emma.m@example.com',
    initiales: 'EM',
    date: "21 Juin 2026, 09:12",
    type: 'Standard',
    statut: 'Actif',
    couleurBadge: 'bg-sky-50 text-sky-700'
  },
  {
    id: 2,
    nom: 'Julie Dupont',
    email: 'j.dupont@testmail.fr',
    initiales: 'JD',
    date: "21 Juin 2026, 08:45",
    type: 'Coach',
    statut: 'Vérification',
    couleurBadge: 'bg-purple-50 text-purple-700'
  }
])

// Fonction pour ouvrir/fermer le menu d'une utilisatrice via son ID unique
const toggleMenu = (id) => {
  if (activeMenu.value === id) {
    activeMenu.value = null
  } else {
    activeMenu.value = id
  }
}

// Fonctions d'actions générales
const modifierUtilisatrice = (user) => {
  alert(`✏️ Modification de : ${user.nom} (${user.type})`)
  activeMenu.value = null
}

const bannirUtilisatrice = (user) => {
  alert(`🚫 Le compte de ${user.nom} a été suspendu.`)
  activeMenu.value = null
}
</script>