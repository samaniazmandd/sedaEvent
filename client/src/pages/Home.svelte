<script>
  import Event from "../lib/Event.svelte";
  import { getAllEvents } from "../api/event.api";
  import stageimage from "../assets/stage.png";

  let events = [];
  let error = "";

  async function loadEvents() {
    error = "";
    try {
      events = await getAllEvents();
    } catch (e) {
      error = e.message;
      events = [];
    }
  }

  loadEvents();
</script>



<main class="bg-gray-500">
  <section
    class="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-center"
    style="background-image: url({stageimage})"
  >
    <!-- got the hints from -->
    <!-- https://tailwindcss.com/docs/z-index -->
    <!-- https://www.w3schools.com/cssref/pr_pos_z-index.php -->
    <header class="absolute inset-0 bg-black/60 z-10">
      <h1 class="text-3xl font-bold mt-55 mb-4 text-white">
        Welcome to SedaEvents, the best event organizer in the Netherlands
      </h1>
      <p class="mb-4 text-white">Sign up to resreve your spot</p>
      <a
        href="/signup"
        class="inline-block px-6 py-2 bg-green-500 text-white rounded-xl font-bold hover:bg-green-700 cursor-pointer"
        >Sign Up</a
      >
    </header>
  </section>

  {#each events as event (event.id)}
    <Event {event} />
  {/each}
</main>
