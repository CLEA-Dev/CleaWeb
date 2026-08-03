import axios from "axios";

const API_URL = "https://clea.hercialabs.com/api";

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

// Liste des utilisatrices
export function fetchUsers() {
  return client.get("/users");
}

// Supprimer une utilisatrice
export function deleteUser(id) {
  return client.delete(`/users/${id}`);
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
