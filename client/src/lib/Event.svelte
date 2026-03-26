<script>
  export let event;
  import { createReservation } from "../api/reservation.api.js";
  import { isLoggedIn } from "../api/auth.api.js";


  let eventClass = "";
  if (event.id === 1) eventClass = "img-weekend";
  if (event.id === 2) eventClass = "img-eminem";
  if (event.id === 3) eventClass = "img-halloween";

  let error = "";
  let success = "";
  let loggedIn = isLoggedIn();
  let showReserveForm = false;
  let seats = 1;

  async function onReserveClick() {
    if (!loggedIn) {
      error = "Please log in/ sign up frist before reservation";
      return;
    }

    showReserveForm = true;
  }

  async function submitReservation() {
    error = "";
    success = "";
    const amountTickets = Number(seats);
    if (amountTickets < 1) {
      error = "You should reserve min one seat to be able to confirm";
      return;
    }

    try {
      const data = await createReservation(event.id, amountTickets);
      success=`You reserved ${data.amountOfSeats} seats/tickets for ${event.title} `
      return;
    } catch (e) {
      error = e.message;
    }
  }
</script>

<article
  class="bg-black border-[10px] border-brown-700 rounded-[15px] min-w-[300px] mx-auto mt-8 text-center"
>
  <figure>
    <img
      src={event.img}
      alt={event.title}
      class={`mx-auto block object-cover w-[30%] aspect-[20/29] ${eventClass}`}
      loading="lazy"
    />
  </figure>

  <header>
    <h3 class="text-[bisque] font-bold">{event.title}</h3>
  </header>

  <time class="mr-1 mb-3 mx-4 text-green-600">{event.date} on {event.time}</time
  >

  <p class="text-[bisque] font-semibold mt-2">
    <span aria-label="ticket price">€{event.price}</span>
  </p>

 
  {#if error}<p class="text-red-800 font-semibold">{error}</p>{/if}
  {#if success}<p class="text-green-300 font-semibold">{success}</p>{/if}

  <button
    class="px-4 py-2 bg-green-600 text-white font-semibold hover:bg-green-200"
    on:click|preventDefault={onReserveClick}
  >
    Reserve</button
  >

  {#if loggedIn && showReserveForm}
    <form
      class="mt-4 flex items-center justify-center gap-4"
      on:submit|preventDefault={submitReservation}
    >
      <label class="text-[bisque] font-bold">
        Seats
        <input
          class="bg-gray-600 rounded-lg border-2 border-white"
          type="number"
          min="1"
          bind:value={seats}
          required
        />
      </label>

      <button
        type="submit"
        class="px-4 py-2 bg-green-600 text-white font-semibold hover:bg-green-200"
      >
        Confrim reservation</button
      >
    </form>
  {/if}

 
</article>

<style>
  .img-weekend {
    aspect-ratio: 19/29;
  }

  .img-eminem,
  .img-halloween {
    margin-top: 3rem;
    width: 40%;
    aspect-ratio: 20/10;
  }
</style>
