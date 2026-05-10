<template>
  <div class="tab-filter-container">
    <div class="tab-filter">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-item', { active: activeTabId === tab.id }]"
        @click="$emit('tab-change', tab.id)"
      >
        <span class="tab-label">{{ tab.label }}</span>
        <span class="tab-count">{{ tab.count }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  tabs: {
    type: Array,
    required: true,
    validator: (tabs) => tabs.every((tab) => tab.id && tab.label && typeof tab.count === 'number'),
  },
  activeTabId: {
    type: String,
    required: true,
  },
});

defineEmits(['tab-change']);
</script>

<style scoped>
.tab-filter-container {
  background: #ffffff;
  border: 1px solid #D1D6E8;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
}

.tab-filter {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #E1E6F0;
  overflow-x: auto;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #50619E;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;
}

.tab-item:hover {
  color: #2A3566;
  background: #F4F5FA;
}

.tab-item.active {
  color: #171F4A;
  border-bottom-color: #17A2B8;
  background: #ffffff;
}

.tab-label {
  font-weight: 500;
}

.tab-count {
  background: #E8EBF5;
  color: #2A3566;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  min-width: 24px;
  text-align: center;
}

.tab-item.active .tab-count {
  background: #E8EBF5;
  color: #17A2B8;
}

@media (max-width: 860px) {
  .tab-item {
    padding: 12px 16px;
    font-size: 13px;
  }

  .tab-count {
    font-size: 11px;
  }
}
</style>
