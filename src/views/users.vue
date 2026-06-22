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
          Affichage de <span class="font-medium text-slate-700">1 - 10</span> sur <span class="font-medium text-slate-700">12 842</span>
        </div>

      </div>

      <div class="overflow-x-auto">
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
          <img :src="user.avatar" alt="Avatar" class="w-10 h-10 rounded-full object-cover bg-slate-100" />
          <div>
            <div class="font-semibold text-slate-800 text-sm">{{ user.nom }}</div>
            <div class="text-xs text-slate-400">{{ user.email }}</div>
          </div>
        </td>

        <td class="p-4 text-sm">
          <span :class="['inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border', user.couleurStatut]">
            <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
            {{ user.statut }}
          </span>
        </td>

        <td class="p-4 text-sm text-slate-500">
          {{ user.inscription }}
        </td>

        <td class="p-4 text-sm text-slate-500">
          {{ user.connexion }}
        </td>

       <td class="p-4 text-sm text-right">
          <div class="flex items-center justify-end gap-2">
            <button class="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer" title="Voir les détails">
              <Eye class="w-4 h-4" />
            </button>
            
            <button v-if="user.statut === 'Actif'" class="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors cursor-pointer" title="Suspendre l'utilisatrice">
              <CirclePlay class="w-4 h-4 text-amber-500" />
            </button>

            <button v-else-if="user.statut === 'Suspendu'" class="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer" title="Réactiver l'utilisatrice">
              <CirclePlay class="w-4 h-4" />
            </button>
            
            <button class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer" title="Désactiver définitivement">
              <UserX class="w-4 h-4" />
            </button>
          </div>
        </td>

      </tr>
    </tbody>
         </table>
         <div class="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-4 text-sm">
        
        <button class="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors cursor-pointer disabled:opacity-50">
          Précédent
        </button>

        <div class="flex items-center gap-1.5">
          <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-600 text-white font-medium text-xs sm:text-sm cursor-pointer">
            1
          </button>
          
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 font-medium text-xs sm:text-sm cursor-pointer">
            2
          </button>
          
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 font-medium text-xs sm:text-sm cursor-pointer">
            3
          </button>
          
          <span class="text-slate-400 px-1 text-xs sm:text-sm">...</span>
          
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 font-medium text-xs sm:text-sm cursor-pointer">
            128
          </button>
        </div>

        <button class="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors cursor-pointer">
          Suivant
        </button>

      </div>
        </div>

    </div>
  
</template>

<script setup>
  import { ref } from 'vue'
// Importation des icônes de Lucide Vue
import { Users, UserCheck, ShieldAlert,Download, Plus,SlidersHorizontal, Eye,CirclePlay,UserX } from 'lucide-vue-next'

// Données fictives pour nos cartes de statistiques
const stats = ref([
  { 
    id: 1, 
    titre: 'Total Utilisatrices', 
    valeur: '1,248', 
    icone: Users, 
    couleurIcone: 'text-sky-600 bg-sky-50' 
  },
  { 
    id: 2, 
    titre: 'Comptes Actifs', 
    valeur: '1,180', 
    icone: UserCheck, 
    couleurIcone: 'text-emerald-600 bg-emerald-50' 
  },
  { 
    id: 3, 
    titre: 'En Attente / Suspendus', 
    valeur: '68', 
    icone: ShieldAlert, 
    couleurIcone: 'text-amber-600 bg-amber-50' 
  }
])

// Données fictives pour remplir notre tableau d'utilisatrices
const users = ref([
  {
    id: 1,
    nom: 'Léa Marchand',
    email: 'lea.marchand@gmail.com',
    statut: 'Actif',
    couleurStatut: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    inscription: '12 Mars 2024',
    connexion: 'Il y a 2h',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  },
  {
    id: 2,
    nom: 'Sophie Girard',
    email: 's.girard@design.fr',
    statut: 'Suspendu',
    couleurStatut: 'text-amber-700 bg-amber-50 border-amber-100',
    inscription: '05 Juin 2024',
    connexion: 'Il y a 3j',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  },
  {
    id: 3,
    nom: 'Martine Dubois',
    email: 'm.dubois@orange.fr',
    statut: 'Actif',
    couleurStatut: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    inscription: '22 Fév 2024',
    connexion: 'Hier',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'
  }
])
</script>