<template>
  <div
    ref="el"
    class="card"
    :style="style"
    :class="classes"
    @mousedown="onMouseDown"
    @touchstart="onMouseDown"
    @mouseup="onMouseUp"
    @touchend="onMouseUp"
  >
    {{ card.text.split("?").join("?\n") }}
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted,
    onBeforeMount,
    defineProps,
    computed,
    inject,
  } from "vue";

  const emit = defineEmits(["exit"]);

  const props = defineProps({
    card: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });

  const draggable = ref(true);
  const dragging = ref(false);
  const startPos = ref({ x: 0, y: 0 });
  const position = ref({ x: 0, y: 0 });

  const rotation = computed(() => {
    switch (props.index % 3) {
      case 0:
        return 3;
      case 1:
        return 0;
      case 2:
        return -3;
    }
  });

  const classes = computed(() => {
    const classes = {};

    if (dragging.value) {
      classes["card--dragging"] = true;
    } else {
      if (position.value.x > 0) {
        classes["card--exit-right"] = true;
      } else if (position.value.x < 0) {
        classes["card--exit-left"] = true;
      }
    }

    return classes;
  });
  const style = computed(() => {
    return {
      top: position.value.y + "px",
      left: position.value.x + "px",
      transform: `rotate(${rotation.value + position.value.x / 10}deg)`,
    };
  });

  function onMouseDown(e) {
    if (!draggable.value) return;

    let clientX, clientY;

    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    dragging.value = true;
    startPos.value = { x: clientX, y: clientY };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onMouseMove);
  }

  function onMouseMove(e) {
    let clientX, clientY;

    e.preventDefault();

    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (dragging.value) {
      position.value = {
        x: clientX - startPos.value.x,
        y: clientY - startPos.value.y,
      };
    }
  }

  function onMouseUp(e) {
    dragging.value = false;

    if (Math.abs(position.value.x) > 100) {
      draggable.value = false;
      setTimeout(() => emit("exit"), 300);
    } else {
      position.value = { x: 0, y: 0 };
    }
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchmove", onMouseMove);
  }
</script>

<style scoped>
  .card {
    transition: all 0.3s ease-in-out;
    touch-action: none;
    @apply absolute rotate-0 text-2xl rounded-3xl border border-gray-500 bg-white cursor-grab h-full w-full top-0 left-0 p-8 flex justify-center items-center break-words select-none whitespace-pre-line;
  }
  .card--dragging {
    transition: none;
    @apply cursor-grabbing;
  }
  .card--exit-right {
    left: 100vw !important;
  }
  .card--exit-left {
    left: -100vw !important;
  }
</style>
