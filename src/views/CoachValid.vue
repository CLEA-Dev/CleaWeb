<script setup>
import { ref } from 'vue'
import { FileText, Link, AlertTriangle, Clock, CheckSquare, Search, Bell, HelpCircle } from 'lucide-vue-next'

const candidats = ref([
  {
    id: 1,
    nom: 'Sarah Meunier',
    initiales: 'SM',
    colorClass: 'bg-sky-100 text-sky-600',
    inscription: 'Inscrit le 12 Mai',
    expertise: 'Yoga & Mobilité',
    credentialType: 'file',
    credentialName: 'Diplôme_Yoga.pdf',
    status: 'PENDING',
    statusClass: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  {
    id: 2,
    nom: 'Julien Lefebvre',
    initiales: 'JL',
    colorClass: 'bg-emerald-100 text-emerald-600',
    inscription: 'Inscrit le 15 Mai',
    expertise: 'Cross-Training',
    credentialType: 'multi',
    files: [
      { type: 'file', name: 'BPJEPS_2022.pdf' },
      { type: 'link', name: 'Portfolio_Web.url' }
    ],
    status: 'UNDER REVIEW',
    statusClass: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  },
  {
    id: 3,
    nom: 'Amandine Bernard',
    initiales: 'AB',
    colorClass: 'bg-orange-100 text-orange-600',
    inscription: 'Inscrit le 10 Mai',
    expertise: 'Nutrition Clinique',
    credentialType: 'missing',
    credentialName: 'Missing ID Document',
    status: 'INFO REQUESTED',
    statusClass: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: 4,
    nom: 'Thomas Rousseau',
    initiales: 'TR',
    colorClass: 'bg-slate-100 text-slate-600',
    inscription: 'Inscrit le 05 Mai',
    expertise: 'Boxe',
    credentialType: 'error',
    credentialName: 'Fichiers inaccessibles',
    status: 'REJECTED',
    statusClass: 'bg-rose-50 text-rose-700 border-rose-200'
  }
])
</script>

<template>
  <div class="p-6 bg-slate-50 min-h-screen space-y-6">
    
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Validation des Coachs</h1>
        <p class="text-sm text-slate-500">Gérez les candidatures entrantes et vérifiez les certifications.</p>
      </div>
      
      <div class="flex space-x-2 bg-slate-200/60 p-1 rounded-lg text-xs font-semibold">
        <span class="px-3 py-1 bg-white text-slate-700 rounded shadow-sm flex items-center gap-1">
          STATUS:</span>
           <span class="px-3 py-1 text-orange-600 flex items-center">8 Pending</span>
        
        <span class="px-3 py-1 text-emerald-700 flex items-center">124 Approved</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
      
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div class="flex items-center space-x-2 font-semibold text-slate-800 text-sm border-b border-slate-100 pb-2">
          <span>⚙️ Filtres de Candidature</span>
        </div>
        
        <div class="form-control w-full">
          <label class="label pt-0">
            <span class="label-text font-medium text-slate-600 text-xs">Spécialité</span>
          </label>
          <select class="select select-sm select-bordered w-full bg-white text-slate-700">
            <option selected>Toutes les expertises</option>
            <option>Yoga & Mobilité</option>
            <option>Cross-Training</option>
            <option>Nutrition Clinique</option>
            <option>Boxe</option>
          </select>
        </div>

        <div class="space-y-2">
          <span class="text-xs font-medium text-slate-600 block">Niveau d'Urgence</span>
          <div class="flex space-x-2">
            <button class="px-3 py-1 text-xs font-medium rounded-full bg-emerald-800 text-white shadow-sm">Standard</button>
            <button class="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">Prioritaire</button>
          </div>
        </div>
      </div>

      <div class="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            
            <thead class="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th class="p-4">Candidat</th>
                <th class="p-4">Expertise</th>
                <th class="p-4">Credentials</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right"></th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
              <tr v-for="candidat in candidats" :key="candidat.id" class="hover:bg-slate-50/80 transition-colors">
                
                <td class="p-4 flex items-center space-x-3">
                  <div class="avatar placeholder">
                    <div :class="[candidat.colorClass, 'w-10 rounded-full font-bold text-xs text-center p-3']">
                      <span>{{ candidat.initiales }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 leading-tight">{{ candidat.nom }}</div>
                    <div class="text-[11px] text-slate-400 mt-0.5">{{ candidat.inscription }}</div>
                  </div>
                </td>

                <td class="p-4">
                  <span class="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-medium">
                    {{ candidat.expertise }}
                  </span>
                </td>

                <td class="p-4 text-xs">
                  <div v-if="candidat.credentialType === 'file'" class="flex items-center space-x-1 text-slate-600 underline cursor-pointer">
                    <FileText class="w-3.5 h-3.5 text-slate-400" />
                    <span>{{ candidat.credentialName }}</span>
                  </div>

                  <div v-else-if="candidat.credentialType === 'multi'" class="space-y-1">
                    <div v-for="(file, index) in candidat.files" :key="index" class="flex items-center space-x-1 text-slate-600 underline cursor-pointer">
                      <component :is="file.type === 'file' ? FileText : Link" class="w-3.5 h-3.5 text-slate-400" />
                      <span>{{ file.name }}</span>
                    </div>
                  </div>

                  <div v-else-if="candidat.credentialType === 'missing'" class="flex items-center space-x-1 text-rose-600 font-medium">
                    <AlertTriangle class="w-3.5 h-3.5" />
                    <span>{{ candidat.credentialName }}</span>
                  </div>

                  <div v-else-if="candidat.credentialType === 'error'" class="text-slate-500 italic">
                    {{ candidat.credentialName }}
                  </div>
                </td>

                <td class="p-4">
                  <span :class="[candidat.statusClass, 'px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-wider']">
                    {{ candidat.status }}
                  </span>
                </td>

                <td class="p-4 text-right text-xs text-emerald-700 font-medium cursor-pointer hover:underline">
                  <span v-if="candidat.id === 4">Voir le motif</span>
                </td>

              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-white px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Affichage de <span class="font-medium text-slate-700">1 à 4</span> sur <span class="font-medium text-slate-700">8</span> candidatures en attente
          </div>
          <div class="flex space-x-2">
            <button class="px-3 py-1.5 border border-slate-200 rounded text-slate-400 bg-slate-50 cursor-not-allowed">Précédent</button>
            <button class="px-3 py-1.5 border border-emerald-700 bg-emerald-800 text-white rounded hover:bg-emerald-900 transition-colors">Suivant</button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
        <div class="p-2.5 bg-cyan-50 rounded-lg text-cyan-600">
          <Clock class="w-5 h-5" />
        </div>
        <div>
          <div class="text-[11px] font-medium text-slate-400 uppercase">Délai moyen</div>
          <div class="text-xl font-bold text-slate-800">2.4 jours</div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
        <div class="p-2.5 bg-emerald-50 rounded-lg text-emerald-600">
          <CheckSquare class="w-5 h-5" />
        </div>
        <div>
          <div class="text-[11px] font-medium text-slate-400 uppercase">Taux d'acceptation</div>
          <div class="text-xl font-bold text-slate-800">82%</div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
        <div class="p-2.5 bg-orange-50 rounded-lg text-orange-600">
          <AlertTriangle class="w-5 h-5" />
        </div>
        <div>
          <div class="text-[11px] font-medium text-slate-400 uppercase">Besoin d'info</div>
          <div class="text-xl font-bold text-slate-800">12 dossiers</div>
        </div>
      </div>

    </div>

    <div class="fixed bottom-6 right-6 z-10">
      <button class="flex items-center space-x-2 bg-emerald-800 text-white px-4 py-2.5 rounded-xl shadow-lg hover:bg-emerald-900 transition-all font-medium text-sm">
        <span>⚡ Validation Groupée</span>
        <span class="bg-emerald-700 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold text-emerald-200">Beta</span>
      </button>
    </div>

  </div>
</template>

