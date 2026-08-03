<template>
   <div class="space-y-8">
      <!-- EN-TÊTE DYNAMIQUE -->
      <div class="flex items-center justify-between">
        <div>
           <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Tableau de bord</h1>
           <p class="text-sm text-slate-500 mt-1">
             Bienvenue, il y a actuellement <span class="font-bold text-emerald-600">{{ totalUsers }}</span> utilisatrices enregistrées.
           </p>
        </div>

        <button @click="exportToCSV" class="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer">
            <Download class="w-4 h-4" />
            <span>Exporter le rapport</span>
        </button>
      </div>
   </div>
   
  
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    

    <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between mt-6">
        <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500">Total Utilisatrices</span>
            <Users class="w-4 h-4 text-slate-300" />
        </div>
        <div class="mt-4">
            <h3 class="text-2xl font-bold text-slate-800 tracking-tight">{{ totalUsers }}</h3>
        </div>
    </div>

    <!-- Coachs Actifs (Basé sur le rôle ou statut dans les données) -->
    <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between mt-6">
        <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500">Coachs Actifs</span>
            <UserCheck class="w-4 h-4 text-slate-300" />
        </div>
        <div class="mt-4">
            <h3 class="text-2xl font-bold text-slate-800 tracking-tight">{{ totalCoaches }}</h3>
        </div>
    </div>

    <!-- Articles (À lier plus tard à ton module contenu) -->
    <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between mt-6">
        <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500">Articles</span>
            <FileText class="w-4 h-4 text-slate-300" />
        </div>
        <div class="mt-4">
            <h3 class="text-2xl font-bold text-slate-800 tracking-tight">0</h3>
        </div>
    </div>

    <!-- Revenus (À lier plus tard à ton module paiement) -->
    <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between mt-6">
        <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500">Revenus</span>
            <DollarSign class="w-4 h-4 text-slate-300" />
        </div>
        <div class="mt-4">
            <h3 class="text-2xl font-bold text-slate-800 tracking-tight">0.00 $</h3>
        </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <!-- GRAPHIQUE -->
      <div class="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div class="flex items-center justify-between mb-6">
              <h3 class="text-base font-bold text-slate-800">Tendances des inscriptions</h3>
              <span class="flex items-center gap-1 text-xs text-slate-400 border border-slate-200 px-2 py-1 rounded-md">
                Derniers 7 jours <ChevronDown class="w-3 h-3" />
              </span>
          </div>
          <div class="h-64 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 text-sm italic">
            L'espace graphique sera activé dès réception des données historiques.
          </div>
      </div>

      <!-- ACTIVITÉS RÉCENTES -->
      <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <div class="mb-6">
          <h3 class="text-base font-bold text-slate-800">Activités récentes</h3>
        </div>
        <div v-if="utilisatrices.length > 0" class="space-y-4">
          <div v-for="user in utilisatrices.slice(0, 3)" :key="user.id" class="text-sm border-l-2 border-emerald-500 pl-4 py-1">
            <p class="text-slate-700 font-medium">{{ user.name }} <span class="text-slate-400 font-normal">s'est inscrite.</span></p>
            <p class="text-xs text-slate-400 mt-0.5">Nouveau membre</p>
          </div>
        </div>
        <div v-else class="text-sm text-slate-400 italic">Aucune activité récente.</div>
      </div>
  </div>

  <!-- TABLEAU DES DERNIÈRES INSCRIPTIONS -->
  <div class="bg-white rounded-xl border border-slate-100 shadow-sm mt-8 overflow-hidden">
      <div class="p-6 flex items-center justify-between border-b border-slate-100">
          <h3 class="text-base font-bold text-slate-800">Dernières inscriptions</h3>
          <RouterLink to="/users" class="text-xs font-medium text-emerald-700 hover:underline">Voir toutes les utilisatrices</RouterLink>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 text-slate-400 text-xs uppercase font-semibold border-b border-slate-100">
                <th class="py-3 px-6">Utilisatrice</th>
                <th class="py-3 px-6">Date d'inscription</th>
                <th class="py-3 px-6">Statut</th>
                <th class="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody class="text-sm divide-y divide-slate-100 text-slate-700">
              <tr v-for="user in latestUsers" :key="user.id" class="hover:bg-slate-50/50 transition-colors">
                <td class="py-4 px-6 flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center">
                    {{ user.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-medium text-slate-800">{{ user.name }}</p>
                    <p class="text-xs text-slate-400">{{ user.email }}</p>
                  </div>
                </td>
                <td class="py-4 px-6 text-slate-500">{{ formatDate(user.created_at) }}</td>
                <td class="py-4 px-6">
                  <span :class="['text-xs font-medium px-2.5 py-1 rounded-full', user.status === 'Actif' ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50']">
                    ● {{ user.status || 'Actif' }}
                  </span>
                </td>
                <td class="py-4 px-6 text-right">
                  <button @click="toggleMenu(user.id)" class="text-slate-400 hover:text-slate-600 cursor-pointer">
                    <MoreVertical class="w-4 h-4" />
                  </button>
                </td>
              </tr>
              <!-- Cas où il n'y a pas d'utilisatrices -->
              <tr v-if="utilisatrices.length === 0">
                <td colspan="4" class="py-10 text-center text-slate-400 italic">Aucune inscription pour le moment.</td>
              </tr>
            </tbody>
        </table>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchUsers } from '../services/api'
import { 
  Users, UserCheck, FileText, DollarSign, 
  Download, ChevronDown, MoreVertical 
} from 'lucide-vue-next'

const utilisatrices = ref([])
const activeMenu = ref(null)

//. Charger les données au démarrage
onMounted(async () => {
  try {
    const res = await fetchUsers()
    utilisatrices.value = res.data.users || res.data
  } catch (err) {
    console.error("Erreur chargement dashboard", err)
  }
})


const totalUsers = computed(() => utilisatrices.value.length)
const totalCoaches = computed(() => utilisatrices.value.filter(u => u.role === 'coach').length)


const latestUsers = computed(() => {
  return [...utilisatrices.value].reverse().slice(0, 5)
})

const toggleMenu = (id) => {
  activeMenu.value = activeMenu.value === id ? null : id
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}


const exportToCSV = () => {
  if (utilisatrices.value.length === 0) {
    alert("Aucune donnée à exporter.");
    return;
  }

  //  Définir les colonnes (En-têtes du fichier Excel)
  const headers = ["ID", "Nom", "Email", "Statut", "Date d'inscription"];
  
  //  Transformer les données des utilisatrices en lignes CSV
  const rows = utilisatrices.value.map(user => [
    user.id,
    user.name,
    user.email,
    user.status || 'Actif',
    user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'
  ]);

  const csvContent = [
    headers.join(","), 
    ...rows.map(row => row.join(",")) 
  ].join("\n"); 

 
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", `export_utilisatrices_${new Date().toLocaleDateString()}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>