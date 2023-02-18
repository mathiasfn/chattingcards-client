<script setup>
  import { ref, onMounted } from "vue";
  import { supabase } from "@/lib/supabaseClient";

  const categories = ref([]);

  async function getCategories() {
    let { data, error } = await supabase.from("card_categories").select("*");
    categories.value = data;
  }

  onMounted(() => {
    getCategories();
  });
</script>

<template>
  <div class="container mx-auto grid grid-cols-2 gap-4 p-4">
    <router-link
      v-for="category in categories"
      :to="{ name: 'category.card.index', params: { category: category.slug } }"
    >
      <div class="rounded-lg border p-4">
        {{ category.slug }}
      </div>
    </router-link>
  </div>
</template>
