<script setup>

</script>

<template>
  <div class="flex min-h-screen bg-slate-50 text-slate-800">
    
    <aside class="w-64 bg-white border-r border-slate-100 flex flex-col justify-between">
      
      <div>
        <div class="p-6">
          <h2 class="text-xl font-bold text-emerald-800 tracking-wide">CLEA Admin</h2>
          <p class="text-xs text-slate-400 mt-1">Back Office Management</p>
        </div>

        <nav class="mt-2">
          <ul class="space-y-1">
            
            <li class="relative">
              <RouterLink to="/" v-slot="{ isActive }">
                <div v-if="isActive" class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600"></div>
                
                <div :class="[
                  'flex items-center gap-3 pl-6 pr-4 py-3 transition-all',
                  isActive ? 'bg-sky-50 text-emerald-700 font-medium' : 'text-slate-500 hover:bg-slate-50'
                ]">
                  <span>Dashboard</span>
                </div>
              </RouterLink>
            </li >

            <li class="relative">
              <RouterLink to="/users" v-slot="{ isActive }">
                <div v-if="isActive" class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600"></div>
                
                <div :class="[
                  'flex items-center gap-3 pl-6 pr-4 py-3 transition-all',
                  isActive ? 'bg-sky-50 text-emerald-700 font-medium' : 'text-slate-500 hover:bg-slate-50'
                ]">
                  <span>Utilisatrices</span>
                </div>
              </RouterLink>
            </li>

            <li class="relative">
              <RouterLink to="/CoachValid" v-slot="{ isActive }">
                <div v-if="isActive" class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600"></div>
                <div :class="[
                  'flex items-center gap-3 pl-6 pr-4 py-3 transition-all',
                  isActive ? 'bg-sky-50 text-emerald-700 font-medium' : 'text-slate-500 hover:bg-slate-50'
                ]">
                  <span>Coach Validation</span>
                </div>
              </RouterLink>
            </li>

            <li class="relative">
              <RouterLink to="/ContentMgr" v-slot="{ isActive }">
                <div v-if="isActive" class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600"></div>
                <div :class="[
                  'flex items-center gap-3 pl-6 pr-4 py-3 transition-all',
                  isActive ? 'bg-sky-50 text-emerald-700 font-medium' : 'text-slate-500 hover:bg-slate-50'
                ]">
                  <span>Content Management</span>
                </div>
              </RouterLink>
            </li>

          </ul>
        </nav>
      </div>

      <div class="p-4 border-t border-slate-100 bg-slate-50/50">
        <div class="flex items-center gap-3 pl-2 py-2 text-slate-500 hover:text-slate-800 cursor-pointer text-sm">
          <span>Settings</span>
        </div>
        <div class="flex items-center gap-3 pl-2 py-2 text-red-600 hover:text-red-700 cursor-pointer text-sm mt-1">
          <span>Logout</span>
        </div>
      </div>

    </aside>

    <main class="flex-1 flex flex-col bg-slate-50">
      <header class="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8">
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
        <p class="text-sm font-semibold text-slate-700">Admin User</p>
      <p class="text-xs text-slate-400 uppercase tracking-wider">Super Admin</p>
    </div>

    <div class="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-500">
      AV
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