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
  border: 1px solid #dce5ef;
  border-radius: 14px;
  background: #fff;
  padding: 14px 14px 12px;
  min-height: 92px;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(13, 27, 42, 0.08);
  border-color: #d1d6e8;
  transform: translateY(-2px);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.stat-label {
  color: #6a7a90;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0;
}

.stat-value {
  color: #13233f;
  font-size: 26px;
  line-height: 1;
  font-weight: 800;
}

/* Icon Colors */
.icon-primary {
  color: #14b8a6;
}

.icon-success {
  color: #15803d;
}

.icon-info {
  color: #2563eb;
}

.icon-warning {
  color: #b45309;
}

.icon-purple {
  color: #9333ea;
}

.icon-muted {
  color: #6b7280;
}

@media (max-width: 860px) {
  .stat-card {
    padding: 12px;
  }

  .stat-value {
    font-size: 22px;
  }
}
  }

  .stat-label {
    font-size: 11px;
  }
}
</style>
