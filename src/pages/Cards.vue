<template>
  <div class="overflow-hidden">
    <div
      class="container mx-auto p-8 h-screen flex justify-center items-center"
    >
      <div v-if="loading">loading...</div>
      <div v-else class="card-container">
        <div class="card-container__inner">
          <Card
            v-for="(card, index) in cards"
            :key="card.id"
            :card="card"
            :index="index"
            @exit="onCardExit"
          ></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // imports
  import Card from "@/components/Card.vue";
  import { ref, onMounted, onBeforeMount, computed, provide } from "vue";
  import { supabase } from "@/lib/supabaseClient";

  // props
  const props = defineProps({
    category: {
      type: String,
      required: true,
    },
  });

  // state
  const loading = ref(false);
  const cards = ref([]);

  // methods
  async function getCards() {
    loading.value = true;
    let { data, error } = await supabase.from("cards").select("*");
    cards.value = data;
    loading.value = false;
  }

  function onCardExit() {
    const card = cards.value.pop();
    console.log(cards.value);
  }

  // hooks
  onBeforeMount(() => {
    getCards();
  });
</script>

<style scoped>
  .card-container {
    position: relative;
    width: 350px;
    max-width: 100%;
  }
  .card-container__inner {
    width: 100%;
    padding-bottom: 150%;
  }
</style>
