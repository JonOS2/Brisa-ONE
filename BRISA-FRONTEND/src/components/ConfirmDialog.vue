<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="cancel">
    <div class="modal-content confirm-modal">
      <div class="modal-header">
        <h2>Confirmar Ação</h2>
      </div>
      <div class="modal-body">
        <p>{{ message }}</p>
      </div>
      <div class="modal-footer">
        <button @click="cancel" class="btn-cancel">Cancelar</button>
        <button @click="confirm" class="btn-confirm">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ConfirmDialog',
  setup() {
    const isOpen = ref(false);
    const message = ref('');
    const confirmText = ref('Confirmar');
    let resolveCallback = null;

    const show = (msg, btnText = 'Confirmar') => {
      return new Promise((resolve) => {
        message.value = msg;
        confirmText.value = btnText;
        resolveCallback = resolve;
        isOpen.value = true;
      });
    };

    const confirm = () => {
      isOpen.value = false;
      if (resolveCallback) resolveCallback(true);
    };

    const cancel = () => {
      isOpen.value = false;
      if (resolveCallback) resolveCallback(false);
    };

    return {
      isOpen,
      message,
      confirmText,
      show,
      confirm,
      cancel
    };
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 90%;
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #1F285F;
}

.modal-body {
  padding: 20px 24px;
}

.modal-body p {
  margin: 0;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

.modal-footer {
  padding: 16px 24px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  border-top: 1px solid #eee;
}

.btn-cancel,
.btn-confirm {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 160ms ease, transform 120ms ease, box-shadow 160ms ease;
}

.btn-cancel {
  background: white;
  color: #333;
  border: 1.5px solid #dde6f0;
}

.btn-cancel:hover {
  background: #f4f7fb;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(31, 40, 95, 0.06);
}

.btn-cancel:active { transform: translateY(0); }

.btn-confirm {
  background: #c0392b;
  color: white;
}

.btn-confirm:hover {
  background: #a03225;
}
</style>
