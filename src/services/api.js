import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function seConnecter(email, password) {
  return client.post("/login", { email, password }).then((res) => {
    if (res.data.access_token) {
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res.data;
  });
}

export function seDeconnecter() {
  return client.post("/logout").finally(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  });
}

export function getMonProfil() {
  return client.get("/user");
}

export function updateMonProfil(data) {
  return client.patch("/user", data);
}

export function updateMonMotDePasse(data) {
  return client.patch("/user/password", data);
}

export function fetchUsers(params = {}) {
  return client.get("/admin/users", { params });
}

export function createUser(data) {
  return client.post("/admin/users", data);
}

// Consulter un utilisateur spécifique
export function getUserDetails(id) {
  return client.get(`/admin/users/${id}`);
}

// Mettre à jour un utilisateur
export function updateUser(id, data) {
  return client.put(`/admin/users/${id}`, data);
}

export function deleteUser(id) {
  return client.delete(`/admin/users/${id}`);
}

// Restaurer un utilisateur supprimé
export function restoreUser(id) {
  return client.post(`/admin/users/${id}/restore`);
}

// Changer le rôle d'un utilisateur
export function updateUserRole(id, role) {
  return client.patch(`/admin/users/${id}/role`, { role });
}

// Activer ou désactiver un utilisateur
export function updateUserStatus(id, is_active) {
  return client.patch(`/admin/users/${id}/status`, { is_active });
}

export function fetchDashboardData() {
  return client.get("/dashboard-summary");
}

export function fetchCoachApplications() {
  return client.get("/coaches/applications");
}

// Récupérer tous les articles
export function fetchArticles() {
  return client.get("/articles");
}

// Récupérer toutes les catégories
export function fetchCategories() {
  return client.get("/categories");
}

// Supprimer un article
export function deleteArticle(id) {
  return client.delete(`/articles/${id}`);
}
export default client;
