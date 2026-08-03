<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchArticles, fetchCategories, deleteArticle } from '../services/api'
import { 
  Plus, X, Send, FilePlus, Radio, ChevronLeft, ChevronRight, 
  Eye, Edit2, Trash2, Search, Filter 
} from 'lucide-vue-next'

// --- ÉTATS ---
const articles = ref([])
const categories = ref([])
const loading = ref(true)
const selectedCategory = ref('All Categories')
const selectedStatus = ref('All Status')

// --- CHARGEMENT DES DONNÉES ---
const loadContent = async () => {
  loading.value = true
  try {
    const [resArticles, resCategories] = await Promise.all([
      fetchArticles(),
      fetchCategories()
    ])
    articles.value = resArticles.data.articles || resArticles.data
    categories.value = resCategories.data.categories || resCategories.data
  } catch (err) {
    console.error("Erreur chargement contenu", err)
  } finally {
    loading.value = false
  }
}

onMounted(loadContent)

// --- FILTRAGE DYNAMIQUE ---
const filteredArticles = computed(() => {
  return articles.value.filter(art => {
    const catMatch = selectedCategory.value === 'All Categories' || art.category === selectedCategory.value
    const statusMatch = selectedStatus.value === 'All Status' || art.status === selectedStatus.value
    return catMatch && statusMatch
  })
})

// --- STATS (Content Health) ---
const publishedCount = computed(() => articles.value.filter(a => a.status === 'PUBLISHED').length)
const draftCount = computed(() => articles.value.filter(a => a.status === 'DRAFT').length)

// --- ACTIONS ---
const handleDelete = async (id) => {
  if (confirm("Supprimer définitivement cet article ?")) {
    try {
      await deleteArticle(id)
      articles.value = articles.value.filter(a => a.id !== id)
    } catch (err) { alert("Erreur lors de la suppression") }
  }
}

const sendNotification = () => {
  alert("📣 Notification globale envoyée aux utilisatrices !")
}

// --- HELPERS DESIGN ---
const getStatusClass = (status) => {
  return status === 'PUBLISHED' 
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
    : 'bg-orange-50 text-orange-700 border-orange-200'
}

const formatDate = (date) => {
  if (!date) return 'Récemment'
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}
</script>

<template>
  <div class="p-6 bg-slate-50 min-h-screen space-y-6">
    
    <!-- Breadcrumb -->
    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider space-x-1">
      <span>Admin</span>
      <span>/</span>
      <span class="text-emerald-800">Content Management</span>
    </div>

    <!-- Header Actions -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <h1 class="text-2xl font-bold text-slate-900">Content Dashboard</h1>
      
      <div class="flex items-center space-x-3">
        <button @click="sendNotification" class="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors cursor-pointer">
          <Send class="w-4 h-4" />
          <span>Send Global Notification</span>
        </button>
        <button class="flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors cursor-pointer">
          <FilePlus class="w-4 h-4" />
          <span>Create New Article</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
      
      <!-- Sidebar Gauche -->
      <div class="space-y-6">
        
        <!-- Catégories Réelles -->
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex justify-between items-center border-b border-slate-100 pb-2">
            <span class="text-sm font-bold text-slate-800">Categories</span>
            <button class="text-xs text-blue-600 hover:underline font-medium">Manage All</button>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <span v-for="cat in categories" :key="cat.id" class="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 text-[10px] px-2.5 py-1 rounded-full font-bold border border-blue-100">
              <span>{{ cat.name }}</span>
              <button class="hover:text-blue-900 cursor-pointer"><X class="w-3 h-3" /></button>
            </span>
            
            <button class="inline-flex items-center space-x-1 border border-dashed border-slate-300 text-slate-500 hover:text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium bg-slate-50 cursor-pointer">
              <Plus class="w-3 h-3" />
              <span>Add New</span>
            </button>
          </div>
        </div>

        <!-- Content Health Dynamique -->
        <div class="bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
          <div class="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-widest">Content Health</div>
          
          <div class="grid grid-cols-2 gap-4 relative z-10">
            <div>
              <div class="text-3xl font-bold">{{ publishedCount }}</div>
              <div class="text-[10px] text-slate-500 mt-1 uppercase font-bold">Published</div>
            </div>
            <div class="border-l border-slate-800 pl-4">
              <div class="text-3xl font-bold text-orange-400">{{ draftCount }}</div>
              <div class="text-[10px] text-slate-500 mt-1 uppercase font-bold">Drafts</div>
            </div>
          </div>
          <div class="absolute -right-2.5 -bottom-2.5 text-white/5 font-bold text-7xl pointer-events-none">CLEA</div>
        </div>
      </div>

      <!-- Main Table Area -->
      <div class="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        <!-- Table Filters -->
        <div class="p-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div class="flex items-center space-x-3">
            <span class="text-sm font-bold text-slate-800">Articles Management</span>
            <span class="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-emerald-100">
              <Radio class="w-2.5 h-2.5 animate-pulse" />
              <span>Live Sync</span>
            </span>
          </div>
          
          <div class="flex space-x-2">
            <select v-model="selectedCategory" class="bg-white border border-slate-200 text-slate-600 text-xs rounded px-2 py-1 outline-none focus:border-emerald-500">
              <option>All Categories</option>
              <option v-for="c in categories" :key="c.id">{{ c.name }}</option>
            </select>
            <select v-model="selectedStatus" class="bg-white border border-slate-200 text-slate-600 text-xs rounded px-2 py-1 outline-none focus:border-emerald-500">
              <option>All Status</option>
              <option>PUBLISHED</option>
              <option>DRAFT</option>
            </select>
          </div>
        </div>

        <!-- Table Content -->
        <div v-if="loading" class="p-20 text-center text-slate-400 animate-pulse font-medium">Synchronisation du contenu...</div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th class="p-4 w-2/5">Article Title</th>
                <th class="p-4">Author</th>
                <th class="p-4">Category</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
              <tr v-for="art in filteredArticles" :key="art.id" class="hover:bg-slate-50/50 transition-colors">
                <td class="p-4">
                  <div class="text-slate-900 leading-snug">{{ art.title }}</div>
                  <div class="text-[10px] text-slate-400 mt-1">Updated: {{ formatDate(art.updated_at) }}</div>
                </td>

                <td class="p-4 flex items-center space-x-2">
                  <div class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200">
                    {{ art.author ? art.author.charAt(0) : 'A' }}
                  </div>
                  <span class="text-[11px]">{{ art.author || 'Admin' }}</span>
                </td>

                <td class="p-4 text-[11px] text-blue-600 font-bold uppercase">{{ art.category }}</td>

                <td class="p-4">
                  <span :class="[getStatusClass(art.status), 'px-2 py-0.5 rounded-full text-[9px] font-black border tracking-widest']">
                    {{ art.status }}
                  </span>
                </td>

                <td class="p-4 text-right">
                  <div class="flex justify-end space-x-1">
                    <button class="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-all cursor-pointer"><Eye class="w-3.5 h-3.5" /></button>
                    <button class="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all cursor-pointer"><Edit2 class="w-3.5 h-3.5" /></button>
                    <button @click="handleDelete(art.id)" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all cursor-pointer"><Trash2 class="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredArticles.length === 0">
                <td colspan="5" class="p-10 text-center text-slate-400 italic">Aucun article ne correspond aux filtres.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Dynamic Footer -->
        <div class="bg-white px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div>Showing <span class="text-slate-800">{{ filteredArticles.length }}</span> of <span class="text-slate-800">{{ articles.length }}</span> articles</div>
          
          <div class="flex items-center space-x-1">
            <button class="p-1 border border-slate-200 rounded hover:bg-slate-50 cursor-pointer"><ChevronLeft class="w-3.5 h-3.5" /></button>
            <button class="px-2.5 py-1 bg-emerald-800 text-white rounded">1</button>
            <button class="p-1 border border-slate-200 rounded hover:bg-slate-50 cursor-pointer"><ChevronRight class="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>