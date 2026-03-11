<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-left">
        <button @click="toggleMenu" class="menu-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div class="nav-brand">
          <router-link to="/dashboard" class="brand-link">
            <img src="https://inscricoesrestic.brisabr.com.br/_next/image?url=%2Flogo_no-txt.png&w=256&q=75" alt="logo" class="logo">
            <span class="brand-name">BRISA</span>
          </router-link>
        </div>
      </div>
      
      <div class="nav-actions">
        <button @click="logout" class="btn-logout">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sair
        </button>
      </div>
    </div>

    <!-- Sidebar Menu -->
    <transition name="slide">
      <div v-if="menuOpen" class="sidebar-overlay" @click="closeMenu">
        <div class="sidebar" @click.stop>
          <div class="sidebar-header">
            <h3>Menu</h3>
            <button @click="closeMenu" class="close-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <ul class="sidebar-menu">
            <li>
              <router-link to="/dashboard" :class="{ active: $route.path === '/dashboard' }" @click="closeMenu">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/people" :class="{ active: $route.path === '/people' }" @click="closeMenu">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Pessoas
              </router-link>
            </li>
            <li>
              <router-link to="/institutions" :class="{ active: $route.path === '/institutions' }" @click="closeMenu">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Instituições
              </router-link>
            </li>
            <li>
              <router-link to="/programs" :class="{ active: $route.path.startsWith('/programs') }" @click="closeMenu">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                Programas
              </router-link>
            </li>
            <li>
              <router-link to="/logs" :class="{ active: $route.path === '/logs' }" @click="closeMenu">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Logs do Sistema
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/authService';

export default {
  name: 'NavBar',
  setup() {
    const router = useRouter();
    const menuOpen = ref(false);

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    const closeMenu = () => {
      menuOpen.value = false;
    };

    const logout = () => {
      authService.logout();
      router.push('/');
    };

    return {
      menuOpen,
      toggleMenu,
      closeMenu,
      logout
    };
  }
};
</script>

<style scoped>
.navbar {
  background: #1F285F;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.menu-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.2s;
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
  transition: opacity 0.2s;
}

.brand-link:hover {
  opacity: 0.9;
}

.logo {
  color: white;
  height: 60px;
}

.brand-name {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.btn-logout {
  background: #0288d1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  font-size: 14px;
}

.btn-logout:hover {
  background: #0277bd;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(2, 136, 209, 0.3);
}

/* Sidebar Styles */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
}

.sidebar {
  width: 280px;
  height: 100%;
  background: white;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  background: #1F285F;
}

.sidebar-header h3 {
  margin: 0;
  color: white;
  font-size: 20px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-menu {
  list-style: none;
  margin: 0;
  padding: 16px 0;
  flex: 1;
  overflow-y: auto;
}

.sidebar-menu li {
  margin: 0;
}

.sidebar-menu a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  color: #333;
  text-decoration: none;
  transition: all 0.2s;
  font-weight: 500;
  font-size: 15px;
}

.sidebar-menu a:hover {
  background: #f5f5f5;
  color: #0288d1;
}

.sidebar-menu a.active {
  background: #e3f2fd;
  color: #0288d1;
  border-right: 3px solid #0288d1;
}

.sidebar-menu a svg {
  flex-shrink: 0;
}

/* Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s;
}

.slide-enter-active .sidebar,
.slide-leave-active .sidebar {
  transition: transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from .sidebar {
  transform: translateX(-100%);
}

.slide-leave-to .sidebar {
  transform: translateX(-100%);
}
</style>
