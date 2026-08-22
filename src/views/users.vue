<template>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 text-slate-800">
    <div>
      <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Gestion des Utilisatrices</h1>
      <p class="text-sm text-slate-500 mt-1">Consultez, filtrez et gérez l'ensemble des comptes de la plateforme.</p>
    </div>

    <div class="flex items-center gap-3">
      <!-- BOUTON EXPORT CSV -->
      <button @click="exportToCSV" class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer">
        <Download class="w-4 h-4 text-slate-400" />
        Exportateur CSV
      </button>

      <!-- BOUTON NOUVELLE UTILISATRICE -->
      <button @click="showAddModal = true" class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer">
        <Plus class="w-4 h-4" />
        Nouvelle utilisatrice
      </button>
    </div>
  </div>

  <!-- GRILLE DE STATS -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div v-for="stat in stats" :key="stat.id" class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between font-sans">
      <div>
        <p class="text-sm font-medium text-slate-400 uppercase tracking-widest">{{ stat.titre }}</p>
        <h3 class="text-2xl font-bold text-slate-800 mt-1">{{ stat.valeur }}</h3>
      </div>
      <div :class="['p-3 rounded-lg', stat.couleurIcone]">
        <component :is="stat.icone" class="w-6 h-6" />
      </div>
    </div>
  </div>

  <!-- TABLEAU ET FILTRES -->
  <div class="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
    <div class="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative flex items-center">
          <Search class="absolute left-3 w-4 h-4 text-slate-400" />
          <input v-model="filters.search" @input="debounceSearch" placeholder="Rechercher..." class="bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-700 outline-none focus:border-emerald-500" />
        </div>
        <select v-model="filters.role" @change="loadUsers" class="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 outline-none">
          <option value="">Tous les rôles</option>
          <option value="admin">Administrateur</option>
          <option value="mentor">Mentor</option>
          <option value="user">Utilisatrice</option>
        </select>
        <select v-model="filters.status" @change="loadUsers" class="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 outline-none">
          <option value="">Tous les statuts</option>
          <option value="active">Actives</option>
          <option value="inactive">Inactives</option>
        </select>
      </div>
      <div class="text-slate-400 text-xs font-bold uppercase tracking-tighter">
        Total : <span class="text-slate-700">{{ meta.total || 0 }}</span> utilisatrices
      </div>
    </div>

    <div v-if="loading" class="p-20 text-center text-slate-400 italic animate-pulse font-medium">Chargement des données...</div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-100 font-sans text-slate-400">
            <th class="p-4 text-[10px] font-black uppercase tracking-widest">Utilisatrice</th>
            <th class="p-4 text-[10px] font-black uppercase tracking-widest">Statut</th>
            <th class="p-4 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50/50 transition-colors">
            <td class="p-4 flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 border border-slate-200 overflow-hidden shadow-xs">
                <img :src="`https://ui-avatars.com/api/?name=${user.name}&background=random`" />
              </div>
              <div>
                <div class="font-bold text-slate-800 text-sm tracking-tight">{{ user.name }}</div>
                <div class="text-[10px] text-slate-400 font-bold tracking-tight">
                  <span class="uppercase">{{ user.role }}</span> • <span class="lowercase font-medium">{{ user.email }}</span>
                </div>
              </div>
            </td>
            <td class="p-4">
              <span :class="['inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-black uppercase rounded-full border tracking-widest', getStatusClass(user.is_active)]">
                {{ user.is_active ? 'Actif' : 'Désactivé' }}
              </span>
            </td>
            <td class="p-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button @click="handleEditName(user)" class="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all cursor-pointer"><Edit2 class="w-3.5 h-3.5" /></button>
                <button @click="toggleStatus(user)" :class="user.is_active ? 'text-amber-500 hover:bg-amber-50' : 'text-emerald-500 hover:bg-emerald-50'" class="p-1.5 rounded-md transition-all cursor-pointer"><CirclePlay class="w-3.5 h-3.5" /></button>
                <button @click="confirmDelete(user.id)" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all cursor-pointer"><UserX class="w-3.5 h-3.5" /></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGINATION -->
    <div class="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
      <button @click="changePage(meta.current_page - 1)" :disabled="meta.current_page === 1" class="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer transition-colors">Précédent</button>
      <div>Page {{ meta.current_page }} / {{ meta.last_page }}</div>
      <button @click="changePage(meta.current_page + 1)" :disabled="meta.current_page === meta.last_page" class="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer transition-colors">Suivant</button>
    </div>
  </div>

  <!-- MODAL : AJOUT NOUVELLE UTILISATRICE -->
  <div v-if="showAddModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100">
      <div class="p-6 border-b border-slate-50 flex justify-between items-center">
        <h2 class="text-xl font-bold text-slate-800 tracking-tight">Ajouter un nouveau compte</h2>
        <button @click="showAddModal = false" class="text-slate-400 hover:text-slate-600 cursor-pointer"><X class="w-5 h-5" /></button>
      </div>

      <form @submit.prevent="submitCreateUser" class="p-8 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Nom complet</label>
            <input v-model="newUser.name" required type="text" placeholder="Amina Diallo" class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 text-sm" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Rôle</label>
            <select v-model="newUser.role" class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 text-sm">
              <option value="user">Utilisatrice</option>
              <option value="mentor">Mentor</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Adresse Email</label>
          <input v-model="newUser.email" required type="email" placeholder="amina@example.com" class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 text-sm" />
          <p v-if="modalErrors.email" class="text-rose-500 text-[10px] mt-1">{{ modalErrors.email[0] }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Mot de passe</label>
            <input v-model="newUser.password" required type="password" placeholder="••••••••" class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 text-sm" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Confirmation</label>
            <input v-model="newUser.password_confirmation" required type="password" placeholder="••••••••" class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 text-sm" />
          </div>
        </div>

        <div class="pt-4 flex gap-3">
          <button @click="showAddModal = false" type="button" class="flex-1 px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">Annuler</button>
          <button :disabled="isSubmitting" type="submit" class="flex-1 px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all cursor-pointer">
            {{ isSubmitting ? 'Création...' : 'Créer le compte' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchUsers, updateUserStatus, deleteUser, updateUser, createUser } from '../services/api' 
import { Users, UserCheck, ShieldAlert, Download, Plus, Search, Eye, CirclePlay, UserX, Edit2, X } from 'lucide-vue-next'

// --- ÉTATS ---
const users = ref([])         
const meta = ref({})          
const loading = ref(true)     
const isSubmitting = ref(false)
const showAddModal = ref(false)
const modalErrors = ref({})

const filters = ref({
  search: '',
  role: '',
  status: '',
  page: 1
})

const newUser = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: 'user',
  is_active: true
})

// --- RÉCUPÉRATION ---
const loadUsers = async () => {
  loading.value = true
  try {
    const response = await fetchUsers(filters.value)
    users.value = response.data.data
    meta.value = response.data.meta
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

let timeout = null
const debounceSearch = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    filters.value.page = 1
    loadUsers()
  }, 500)
}

const changePage = (p) => {
  filters.value.page = p
  loadUsers()
}

onMounted(loadUsers)

// --- ACTIONS : CRÉATION ---
const submitCreateUser = async () => {
  isSubmitting.value = true
  modalErrors.value = {}
  try {
    // Appel à la fonction createUser du fichier api.js (POST /api/admin/users)
    await createUser(newUser.value)
    alert("Utilisatrice ajoutée avec succès !")
    showAddModal.value = false
    // Réinitialiser le formulaire
    newUser.value = { name: '', email: '', password: '', password_confirmation: '', role: 'user', is_active: true }
    loadUsers() // Recharger la liste
  } catch (err) {
    if (err.response?.data?.errors) {
      modalErrors.value = err.response.data.errors
    } else {
      alert("Une erreur est survenue lors de la création.")
    }
  } finally {
    isSubmitting.value = false
  }
}

// --- ACTIONS : EXPORT CSV ---
const exportToCSV = () => {
  if (users.value.length === 0) return alert("Aucune donnée à exporter.");
  
  const headers = ["ID", "Nom", "Email", "Role", "Statut"];
  const rows = users.value.map(u => [
    u.id, 
    u.name, 
    u.email.toLowerCase(), 
    u.role.toUpperCase(), 
    u.is_active ? 'Actif' : 'Inactif'
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `export_utilisatrices_${new Date().toLocaleDateString()}.csv`);
  link.click();
}

// --- AUTRES ACTIONS ---
const handleEditName = async (user) => {
  const newName = prompt(`Modifier le nom de ${user.name} :`, user.name);
  if (newName && newName !== user.name) {
    try {
      await updateUser(user.id, { name: newName });
      user.name = newName; 
      alert("Nom mis à jour !");
    } catch (err) { alert("Erreur lors de la modification."); }
  }
}

const toggleStatus = async (user) => {
  try {
    const newStatus = !user.is_active
    await updateUserStatus(user.id, newStatus)
    user.is_active = newStatus
  } catch (err) { alert("Erreur changement statut."); }
}

const confirmDelete = async (id) => {
  if (confirm("Supprimer cette utilisatrice ?")) {
    try {
      await deleteUser(id)
      loadUsers()
    } catch (err) { alert("Erreur lors de la suppression."); }
  }
}

// --- STATS ---
const stats = computed(() => [
  { id: 1, titre: 'Total Plateforme', valeur: meta.value.total || 0, icone: Users, couleurIcone: 'text-sky-600 bg-sky-50' },
  { id: 2, titre: 'Actives (Page)', valeur: users.value.filter(u => u.is_active).length, icone: UserCheck, couleurIcone: 'text-emerald-600 bg-emerald-50' },
  { id: 3, titre: 'Inactives (Page)', valeur: users.value.filter(u => !u.is_active).length, icone: ShieldAlert, couleurIcone: 'text-amber-600 bg-amber-50' }
])

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const getStatusClass = (isActive) => isActive ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 'text-amber-700 bg-amber-50 border-amber-100'
</script>