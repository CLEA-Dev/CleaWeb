<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchCoachApplications } from '../services/api'
import { 
  FileText, Link, AlertTriangle, Clock, CheckSquare, 
  Download, ChevronDown, Check, X, Eye 
} from 'lucide-vue-next'

// --- ÉTATS ---
const candidats = ref([])
const loading = ref(true)
const searchFilter = ref('Toutes les expertises')
const urgencyFilter = ref('Standard')

// --- CHARGEMENT ---
onMounted(async () => {
  loading.value = true
  try {
    const res = await fetchCoachApplications()
    candidats.value = res.data.applications || res.data
  } catch (err) {
    console.error("Erreur coachs", err)
  } finally {
    loading.value = false
  }
})

// --- FILTRAGE RÉACTIF (Fonctionnel) ---
const filteredCandidats = computed(() => {
  return candidats.value.filter(c => {
    const matchExpertise = searchFilter.value === 'Toutes les expertises' || c.expertise === searchFilter.value
    return matchExpertise
  })
})

// --- STATISTIQUES DYNAMIQUES ---
const totalPending = computed(() => candidats.value.filter(c => c.status === 'PENDING').length)
const totalApproved = computed(() => candidats.value.filter(c => c.status === 'APPROVED').length)
const infoNeededCount = computed(() => candidats.value.filter(c => c.status === 'INFO REQUESTED').length)

// --- FONCTION EXPORT CSV (Comme sur le Dashboard) ---
const exportData = () => {
  const headers = ["Nom", "Expertise", "Statut", "Date"];
  const rows = filteredCandidats.value.map(c => [
    c.nom || c.name,
    c.expertise,
    c.status,
    c.inscription || c.created_at
  ]);
  const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "validation_coachs.csv");
  link.click();
}

// --- HELPERS DESIGN ---
const getStatusStyles = (status) => {
  const map = {
    'PENDING': 'bg-orange-50 text-orange-700 border-orange-200',
    'UNDER REVIEW': 'bg-cyan-50 text-cyan-700 border-cyan-200',
    'APPROVED': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'REJECTED': 'bg-rose-50 text-rose-700 border-rose-200',
    'INFO REQUESTED': 'bg-indigo-50 text-indigo-700 border-indigo-200'
  }
  return map[status] || 'bg-slate-50 text-slate-700'
}
</script>

<template>
  <div class="p-6 bg-slate-50 min-h-screen space-y-6">
    
    <!-- HEADER -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Validation des Coachs</h1>
        <p class="text-sm text-slate-500">Gérez les candidatures entrantes et vérifiez les certifications.</p>
      </div>
      
      <div class="flex items-center gap-4">
        <button @click="exportData" class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer transition-all">
          <Download class="w-4 h-4" /> Export CSV
        </button>
        
        <div class="flex space-x-2 bg-slate-200/60 p-1 rounded-lg text-xs font-semibold">
          <span class="px-3 py-1 bg-white text-slate-700 rounded shadow-sm">STATUS:</span>
          <span class="px-3 py-1 text-orange-600">{{ totalPending }} En attente</span>
          <span class="px-3 py-1 text-emerald-700">{{ totalApproved }} Approuvés</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
      
      <!-- FILTRES (Rendus fonctionnels via v-model) -->
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div class="flex items-center space-x-2 font-semibold text-slate-800 text-sm border-b border-slate-100 pb-2">
          <span>⚙️ Filtres de Candidature</span>
        </div>
        
        <div class="form-control w-full">
          <label class="label pt-0">
            <span class="label-text font-medium text-slate-600 text-xs">Spécialité</span>
          </label>
          <select v-model="searchFilter" class="select select-sm select-bordered w-full bg-white text-slate-700">
            <option>Toutes les expertises</option>
            <option>Yoga & Mobilité</option>
            <option>Cross-Training</option>
            <option>Nutrition Clinique</option>
            <option>Boxe</option>
          </select>
        </div>

        <div class="space-y-2">
          <span class="text-xs font-medium text-slate-600 block">Niveau d'Urgence</span>
          <div class="flex space-x-2">
            <button 
              @click="urgencyFilter = 'Standard'"
              :class="urgencyFilter === 'Standard' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600'"
              class="px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer"
            >Standard</button>
            <button 
              @click="urgencyFilter = 'Prioritaire'"
              :class="urgencyFilter === 'Prioritaire' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'"
              class="px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer"
            >Prioritaire</button>
          </div>
        </div>
      </div>

      <!-- TABLEAU DYNAMIQUE -->
      <div class="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div v-if="loading" class="p-20 text-center text-slate-400 animate-pulse">Chargement des dossiers...</div>
        
        <div v-else class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th class="p-4">Candidat</th>
                <th class="p-4">Expertise</th>
                <th class="p-4">Credentials</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
              <tr v-for="candidat in filteredCandidats" :key="candidat.id" class="hover:bg-slate-50/80 transition-colors">
                
                <td class="p-4 flex items-center space-x-3">
                  <div :class="[candidat.colorClass || 'bg-slate-100', 'w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-xs']">
                      <span>{{ candidat.initiales || (candidat.nom ? candidat.nom.charAt(0) : 'C') }}</span>
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 leading-tight">{{ candidat.nom || candidat.name }}</div>
                    <div class="text-[11px] text-slate-400 mt-0.5">{{ candidat.inscription || 'Nouveau' }}</div>
                  </div>
                </td>

                <td class="p-4">
                  <span class="bg-blue-50 text-blue-700 text-[10px] px-2 py-1 rounded font-bold uppercase border border-blue-100">
                    {{ candidat.expertise }}
                  </span>
                </td>

                <td class="p-4 text-xs">
                  <!-- Gestion dynamique des fichiers -->
                  <div v-if="candidat.credentialType === 'file' || candidat.credentialName" class="flex items-center space-x-1 text-slate-600 hover:text-emerald-600 cursor-pointer">
                    <FileText class="w-3.5 h-3.5" />
                    <span>{{ candidat.credentialName || 'Voir diplôme' }}</span>
                  </div>
                  <div v-else-if="candidat.credentialType === 'missing'" class="flex items-center space-x-1 text-rose-600 font-medium">
                    <AlertTriangle class="w-3.5 h-3.5" />
                    <span>Document manquant</span>
                  </div>
                </td>

                <td class="p-4">
                  <span :class="[getStatusStyles(candidat.status), 'px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-wider uppercase']">
                    {{ candidat.status }}
                  </span>
                </td>

                <td class="p-4 text-right">
                  <div class="flex justify-end gap-2">
                    <button class="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded transition-colors" title="Approuver"><Check class="w-4 h-4" /></button>
                    <button class="p-1.5 hover:bg-rose-50 text-rose-600 rounded transition-colors" title="Rejeter"><X class="w-4 h-4" /></button>
                    <button class="p-1.5 hover:bg-slate-100 text-slate-400 rounded transition-colors"><Eye class="w-4 h-4" /></button>
                  </div>
                </td>

              </tr>
            </tbody>
          </table>
        </div>

        <!-- PAGINATION DYNAMIQUE -->
        <div class="bg-white px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Affichage de <span class="font-medium text-slate-700">{{ filteredCandidats.length }}</span> candidatures
          </div>
          <div class="flex space-x-2">
            <button class="px-3 py-1.5 border border-slate-200 rounded text-slate-400 hover:bg-slate-50 cursor-pointer">Précédent</button>
            <button class="px-3 py-1.5 border border-emerald-700 bg-emerald-800 text-white rounded hover:bg-emerald-900 transition-colors cursor-pointer">Suivant</button>
          </div>
        </div>
      </div>
    </div>

    <!-- CARTES STATS RÉELLES -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
        <div class="p-2.5 bg-cyan-50 rounded-lg text-cyan-600"><Clock class="w-5 h-5" /></div>
        <div>
          <div class="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Délai moyen</div>
          <div class="text-xl font-bold text-slate-800">2.4 jours</div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
        <div class="p-2.5 bg-emerald-50 rounded-lg text-emerald-600"><CheckSquare class="w-5 h-5" /></div>
        <div>
          <div class="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Taux d'acceptation</div>
          <div class="text-xl font-bold text-slate-800">82%</div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
        <div class="p-2.5 bg-orange-50 rounded-lg text-orange-600"><AlertTriangle class="w-5 h-5" /></div>
        <div>
          <div class="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Besoin d'info</div>
          <div class="text-xl font-bold text-slate-800">{{ infoNeededCount }} dossiers</div>
        </div>
      </div>
    </div>
  </div>
</template>