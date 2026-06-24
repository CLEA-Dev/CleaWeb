<script setup>
import { ref } from 'vue'
import { Plus, X, Send, FilePlus, Radio, ChevronLeft, ChevronRight, Eye, Edit2, Trash2 } from 'lucide-vue-next'

// 🏷️ Catégories / Tags gérés à gauche
const categories = ref([
  { id: 1, name: 'Menstrual Health' },
  { id: 2, name: 'Leadership' },
  { id: 3, name: 'Nutrition' },
  { id: 4, name: 'Career' }
])

// 📰 Liste des articles du tableau
const articles = ref([
  {
    id: 1,
    title: 'Comprendre le cycle hormonal',
    updated: 'Last updated: 2 hrs ago',
    author: 'Dr. Sophie Martin',
    authorInitials: 'DR',
    authorColor: 'bg-sky-100 text-sky-600',
    category: 'Menstrual Health',
    status: 'PUBLISHED',
    statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 2,
    title: 'Women in Tech: 2024 Trends',
    updated: 'Last updated: Yesterday',
    author: 'Emma Lefebvre',
    authorInitials: 'EL',
    authorColor: 'bg-emerald-100 text-emerald-600',
    category: 'Leadership',
    status: 'DRAFT',
    statusClass: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  {
    id: 3,
    title: 'Nutrition & Productivité',
    updated: 'Last updated: 3 days ago',
    author: 'Jean Bernard',
    authorInitials: 'JB',
    authorColor: 'bg-orange-100 text-orange-600',
    category: 'Nutrition',
    status: 'PUBLISHED',
    statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 4,
    title: 'The Art of Public Speaking',
    updated: 'Last updated: 1 week ago',
    author: 'Alice Legrand',
    authorInitials: 'AL',
    authorColor: 'bg-cyan-100 text-cyan-600',
    category: 'Career',
    status: 'PUBLISHED',
    statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }
])
</script>

<template>
  <div class="p-6 bg-slate-50 min-h-screen space-y-6">
    
    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider space-x-1">
      <span>Admin</span>
      <span>/</span>
      <span class="text-emerald-800">Content Management</span>
    </div>

    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Content Dashboard</h1>
      </div>
      
      <div class="flex items-center space-x-3">
        <button class="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors">
          <Send class="w-4 h-4" />
          <span>Send Global Notification</span>
        </button>
        <button class="flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors">
          <FilePlus class="w-4 h-4" />
          <span>Create New Article</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
      
      <div class="space-y-6">
        
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex justify-between items-center border-b border-slate-100 pb-2">
            <span class="text-sm font-bold text-slate-800">Categories</span>
            <button class="text-xs text-blue-600 hover:underline font-medium">Manage All</button>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <span v-for="cat in categories" :key="cat.id" class="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium border border-blue-100">
              <span>{{ cat.name }}</span>
              <button class="hover:text-blue-900"><X class="w-3 h-3" /></button>
            </span>
            
            <button class="inline-flex items-center space-x-1 border border-dashed border-slate-300 text-slate-500 hover:text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium bg-slate-50">
              <Plus class="w-3 h-3" />
              <span>Add New</span>
            </button>
          </div>
        </div>

        <div class="bg-slate-900 text-white p-5 rounded-xl shadow-sm relative overflow-hidden">
          <div class="text-sm font-semibold text-slate-300 mb-4">Content Health</div>
          
          <div class="grid grid-cols-2 gap-4 relative z-10">
            <div>
              <div class="text-3xl font-bold">128</div>
              <div class="text-[11px] text-slate-400 mt-1 leading-tight">Articles Published</div>
            </div>
            <div class="border-l border-slate-800 pl-4">
              <div class="text-3xl font-bold">14</div>
              <div class="text-[11px] text-slate-400 mt-1 leading-tight">Drafts Pending</div>
            </div>
          </div>

          <div class="absolute right-2 bottom-2 text-slate-800/40 font-bold text-5xl pointer-events-none select-none">
            📊
          </div>
        </div>

      </div>

      <div class="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        <div class="p-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div class="flex items-center space-x-3">
            <span class="text-sm font-bold text-slate-800">Articles Management</span>
            <span class="inline-flex items-center space-x-1 bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-slate-200">
              <Radio class="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
              <span>Live Sync</span>
            </span>
          </div>
          
          <div class="flex space-x-2">
            <select class="select select-xs select-bordered bg-white text-slate-600 text-xs rounded">
              <option>All Categories</option>
            </select>
            <select class="select select-xs select-bordered bg-white text-slate-600 text-xs rounded">
              <option>All Status</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto">
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

            <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
              <tr v-for="art in articles" :key="art.id" class="hover:bg-slate-50/50 transition-colors">
                
                <td class="p-4">
                  <div class="font-bold text-slate-900 leading-snug max-w-xs md:max-w-sm break-words">
                    {{ art.title }}
                  </div>
                  <div class="text-[11px] text-slate-400 mt-1">{{ art.updated }}</div>
                </td>

                <td class="p-4 flex items-center space-x-2">
                  <div class="avatar placeholder">
                    <div :class="[art.authorColor, 'w-7 rounded-full font-bold text-[10px]']">
                      <span class="p-3 text-center">{{ art.authorInitials }}</span>
                    </div>
                  </div>
                  <span class="text-xs font-medium text-slate-700">{{ art.author }}</span>
                </td>

                <td class="p-4">
                  <span class="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded border border-blue-100 font-medium">
                    {{ art.category }}
                  </span>
                </td>

                <td class="p-4">
                  <span :class="[art.statusClass, 'inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-wider']">
                    <span :class="['w-1.5 h-1.5 rounded-full', art.status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-orange-500']"></span>
                    <span>{{ art.status }}</span>
                  </span>
                </td>

                <td class="p-4 text-right">
                  <div class="flex justify-end space-x-1">
                    <button class="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors" title="View">
                      <Eye class="w-3.5 h-3.5" />
                    </button>
                    <button class="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors" title="Edit">
                      <Edit2 class="w-3.5 h-3.5" />
                    </button>
                    <button class="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors" title="Delete">
                      <Trash2 class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>

              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-white px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span class="font-medium text-slate-700">1 to 4</span> of <span class="font-medium text-slate-700">128</span> articles
          </div>
          
          <div class="flex items-center space-x-1">
            <button class="p-1 border border-slate-200 rounded text-slate-400 hover:bg-slate-50"><ChevronLeft class="w-3.5 h-3.5" /></button>
            <button class="px-2.5 py-1 bg-emerald-800 text-white rounded font-medium">1</button>
            <button class="px-2.5 py-1 hover:bg-slate-100 text-slate-600 rounded font-medium">2</button>
            <button class="px-2.5 py-1 hover:bg-slate-100 text-slate-600 rounded font-medium">3</button>
            <span class="text-slate-400 px-1">...</span>
            <button class="px-2.5 py-1 hover:bg-slate-100 text-slate-600 rounded font-medium">32</button>
            <button class="p-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50"><ChevronRight class="w-3.5 h-3.5" /></button>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

