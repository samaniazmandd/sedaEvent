<script>
  import {
    getAllEvents,
    createEvent,
    updateEventById,
    deleteEventById,
    deleteAllEvents,
  } from "../api/event.api.js";

  import {
    getAllUsers,
    getUserByEmail,
    deleteUserById,
    
  } from "../api/user.api.js";
  import { isLoggedIn, logout, isAdmin } from "../api/auth.api.js";

  let activeTab = "events";
  let succes = "";
  let error = "";
  let loggedIn = isLoggedIn();
  let admin = isAdmin();

  let events = [];
  let newEvent = {
    title: "",
    date: "",
    time: "19:00:00",
    price: 0,
    img: "",
    maxReservations: 100,
  };

  async function loadEvents() {
    error = "";
    succes = "";
    try {
      events = await getAllEvents();
      succes = `Loaded ${events.length} events`;
    } catch (e) {
      error = e.message;
    }
  }

  async function onCreateEvent() {
    succes = "";
    error = "";

    if (!newEvent.title || !newEvent.date) {
      error = "Title and date are required.";
      return;
    }
    try {
      await createEvent(
        newEvent.title,
        newEvent.date,
        newEvent.time,
        Number(newEvent.price),
        newEvent.img,
        Number(newEvent.maxReservations)
      );
      succes = "Event is created yayy";
    } catch (e) {
      error = e.message;
    }
  }

  async function updateEvent(id) {
    error = "";
    succes = "";

    const eventToUpdate = events.find((e) => e.id === id);
    if (!eventToUpdate) {
      error = "Event not found.";
      return;
    }

    try {
      await updateEventById(id, eventToUpdate);
      succes = "Event updated.";
      await loadEvents();
    } catch (e) {
      error = e.message;
    }
  }

  async function deleteEvent(id) {
    error = "";
    succes = "";

    try {
      await deleteEventById(id);
      succes = "event is deleted";
      await loadEvents();
    } catch (e) {
      error = e.message;
    }
  }

  async function deleteAlleEvents() {
    error = "";
    succes = "";

    try {
      await deleteAllEvents();
      succes = "events are all deleted";
      await loadEvents();
    } catch (e) {
      error = e.message;
    }
  }

  let users = [];
  let emailInput = "";

  async function loadUsers() {
    error = "";
    succes = "";
    try {
      users = await getAllUsers();
      succes = `Loaded ${users.length} users`;
    } catch (e) {
      error = e.message;
    }
  }

  async function searchByEmail() {
    succes = "";
    error = "";

    if (!emailInput) {
      await loadUsers();
      return;
    }
    try {
      const user = await getUserByEmail(emailInput);
      //convert it to arrayso I can loop through it :)
      users = user ? [user] : [];
      if (users.length === 0) {
        succes = "No user found";
      }
    } catch (e) {
      error = e.message;
      users = [];
    }
  }

  async function deleteUser(id) {
    succes = "";
    error = "";
    try {
      await deleteUserById(id);
      succes = "User is deleted";
      await loadUsers();
    } catch (e) {
      error = e.message;
    }
  }

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  loadUsers();
</script>

{#if !loggedIn}
  <p class="text-red-800 mb-2 mt-15 flex justify-center">
    You are not logged in
  </p>
  <a
    href="/login"
    class="px-2 py-1 bg-blue-600 text-white rounded hover:bg-yellow-600 flex justify-center"
  >
    Login first
  </a>
{:else}
  <div class="flex justify-between items-center mb-4 mt-10">
    <h1 class="text-xl font-bold">Welcome admin</h1>
    <button
      class="px-8 py-3 bg-red-600 text-white rounded hover:bg-red-700"
      on:click={handleLogout}
    >
      Logout
    </button>
  </div>

  <button
    class={`px-3 py-2 mb-3 rounded ${activeTab === "events" ? "bg-blue-700 text-white" : "bg-gray-300"}`}
    on:click={() => (activeTab = "events")}
  >
    Events
  </button>
  {#if admin}
    <button
      class={`px-3 py-2 rounded ${activeTab === "users" ? "bg-blue-700 text-white" : "bg-gray-300"}`}
      on:click={() => (activeTab = "users")}
    >
      Users
    </button>
  {/if}

  {#if succes}<p class="text-green-500 font-semibold">{succes}</p>{/if}
  {#if error}<p class="text-red-800 font-semibold">{error}</p>{/if}

  {#if activeTab === "events"}
    <h2 class="font-bold mb-3">Create Event</h2>
    <form class="flex flex-col gap-2" on:submit|preventDefault={onCreateEvent}>
      <input
        class="border p-3 rounded"
        placeholder="Title e.g Amsterdam event"
        bind:value={newEvent.title}
      />
      <input
        class="border p-3 rounded"
        type="text"
        placeholder="Date e.g. 25/06/2026"
        bind:value={newEvent.date}
      />
      <input
        class="border p-3 rounded"
        type="time"
        bind:value={newEvent.time}
      />
      <input
        class="border p-3 rounded"
        type="number"
        placeholder="Price"
        bind:value={newEvent.price}
      />
      <input
        class="border p-3 rounded"
        placeholder="Image URL"
        bind:value={newEvent.img}
      />
      <input
        class="border p-3 rounded"
        type="number"
        placeholder="Max reservations"
        bind:value={newEvent.maxReservations}
      />
      <button class="bg-green-600 text-white px-4 py-2 rounded">Create</button>
    </form>

    <div class="flex justify-between mb-3 mt-10">
      <h2 class="font-bold">Events</h2>
      <button class="px-3 py-1 bg-gray-200 rounded" on:click={loadEvents}
        >Load all events</button
      >
      <button
        type="button"
        class="bg-red-800 text-white px-4 py-2 rounded"
        on:click={deleteAlleEvents}>Delete all events</button
      >
    </div>

    {#if events.length === 0}
      <p>There are no events yet so add some</p>
    {:else}
      {#each events as event (event.id)}
        <div class="border rounded p-3 mb-3">
          <input
            class="border p-2 rounded mb-2 w-full"
            bind:value={event.title}
          />
          <input
            class="border p-2 rounded mb-2 w-full"
            type="text"
            bind:value={event.date}
          />
          <input
            class="border p-2 rounded mb-2 w-full"
            type="time"
            bind:value={event.time}
          />
          <input
            class="border p-2 rounded mb-2 w-full"
            type="number"
            bind:value={event.price}
          />
          <button
            class="bg-blue-600 text-white px-3 py-1 rounded mr-2"
            on:click={() => updateEvent(event.id)}>Save changes</button
          >
          <button
            class="bg-gray-300 px-3 py-1 rounded"
            on:click={() => deleteEvent(event.id)}>Delete event</button
          >
        </div>
      {/each}
    {/if}
  {/if}

  {#if activeTab === "users" && loggedIn && admin}
    <h2 class="font-bold mb-3">Users</h2>
    <form
      class="flex flex-col gap-2 mb-3"
      on:submit|preventDefault={searchByEmail}
    >
      <input
        class="border p-2 rounded"
        placeholder="Search by email..."
        bind:value={emailInput}
      />
      <div class="flex gap-2">
        <button class="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
       
        <button
          type="button"
          class="bg-gray-200 px-4 py-2 rounded"
          on:click={loadUsers}>Load All</button
        >
      </div>
    </form>

    {#if users.length === 0}
      <p>No users yet</p>
    {:else}
      {#each users as user (user.id)}
        <div class="border rounded p-3 mb-3">
          <p class="font-semibold">{user.email}</p>
          <p class="text-sm text-gray-600">City: {user.city}</p>
          <p class="text-sm text-gray-600">
            Phone: {user.mobile_phone}
          </p>
          <p class="text-sm text-gray-600">Admin: {String(user.isAdmin)}</p>
          <button
            class="mt-2 bg-red-600 text-white px-3 py-1 rounded"
            on:click={() => deleteUser(user.id)}>Delete</button
          >
        </div>
      {/each}
    {/if}
  {/if}
{/if}
