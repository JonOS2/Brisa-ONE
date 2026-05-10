<template>
  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">{{ label }}</span>
      <component :is="icon" :size="18" :class="`icon-${iconColor}`" />
    </div>
    <div class="stat-value">{{ value }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import {
  Award,
  CheckCircle,
  Clock,
  Users,
  Building2,
} from 'lucide-vue-next';

defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: [String, Object],
    required: true,
  },
  iconColor: {
    type: String,
    default: 'primary',
  },
});
</script>

<style scoped>
.stat-card {
  background: #ffffff;
  border: 1px solid #D1D6E8;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(23, 31, 74, 0.08);
  transition: all 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(23, 31, 74, 0.12);
  border-color: #C0C7DD;
  transform: translateY(-1px);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.stat-label {
  font-size: 12px;
  font-weight: 500;
  color: #50619E;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #171F4A;
  line-height: 1.1;
}

/* Icon Colors */
.icon-primary {
  color: #6377BA;
}

.icon-success {
  color: #4CAF50;
}

.icon-info {
  color: #2196F3;
}

.icon-warning {
  color: #FF9800;
}

.icon-purple {
  color: #9C27B0;
}

.icon-muted {
  color: #9AA4C0;
}

@media (max-width: 860px) {
  .stat-card {
    padding: 12px;
  }

  .stat-value {
    font-size: 24px;
  }

  .stat-label {
    font-size: 11px;
  }
}
</style>
