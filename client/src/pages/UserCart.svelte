<script>
  import cartImg from "../assets/cart.jpg";
  import { isLoggedIn,logout } from "../api/auth.api";
  import {
    getActiveReservations,
    cancelReservation,
  } from "../api/reservation.api";

  let error = "";
  let success = "";
  let loggedIn = isLoggedIn();
  let allReservations = [];

  function handleLogout() {
    logout();
    window.location.href="/login"
  }

  async function getAllActiveReservationForThisUser() {
    error = "";
    success = "";
    if (!loggedIn) {
      error = "Please log in/ sign up frist before reservation";
      return;
    }

    try {
      allReservations = await getActiveReservations();
      if (allReservations.length === 0) {
        success = "You have no reservations Hurry upp and reserve some of our events";
      }
    } catch (e) {
      error = e.message;
    }
  }

  async function handleCancellation(id) {
    error = "";
    success = "";

    try {
      const updatedReservation = await cancelReservation(id);
      success = `Reservation ${updatedReservation.id} cancelled succesfully`;
      allReservations = allReservations.filter(
        (reservation) => reservation.id !== id
      );
    } catch (e) {
      error = e.message;
    }
  }

</script>

<main
  class="min-h-screen bg-cover bg-center"
  style={`background-image: url(${cartImg})`}
>
  <section class="bg-gray-900 w-90 min-h-[500px] mx-auto py-12 p-2">
    <h1 class="text-white font-bold mb-2">My Reservations</h1>

    {#if error}<p class="text-red-700 font-semibold">{error}</p>{/if}
    {#if success}<p class="text-green-300 font-semibold">{success}</p>{/if}

    <button
      class="px-4 py-2 bg-green-600 border-2 border-black rounded-lg font-bold text-white hover:bg-green-700 cursor-pointer"
      on:click={getAllActiveReservationForThisUser}
    >
      Load my reservations
    </button>

    {#if allReservations.length === 0 && !success && !error}<p
        class="text-gray-300 text-lg"
      >
        click button above to laod your resrevations
      </p>
    {/if}
    {#if allReservations.length > 0}
      <ul class=" mt-3">
        {#each allReservations as reservation}
          {console.log(reservation)}
          <li class="bg-gray-800 p-4 rounded mb-6">
            <p class="font-semibold">Reservation {reservation.id}</p>
            <p class="font-semibold">Event ID:{reservation.eventId}</p>
            <p class="font-semibold">
              Amount of Seats/tickets: {reservation.amountOfSeats}
            </p>
            <p class="font-semibold mb-3">
              Active:{reservation.isActive ? "Yes" : "No"}
            </p>

            {#if reservation.isActive}
              <button
                class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                on:click={() => handleCancellation(reservation.id)}
              >
                Cancel this reservation
              </button>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}

    <button
      class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mb-4"
      on:click={handleLogout}
    >
      Logout
    </button>
  </section>
</main>
