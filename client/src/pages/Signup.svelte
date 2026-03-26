<script>
  import signupImg from "../assets/signup3.jpg";

  import { signUp } from "../api/auth.api.js";
  let email = "";
  let password = "";
  let mobile_phone = "";
  let city = "";

  let succes = "";
  let error = "";

  async function handleSubmit() {
    succes = "";
    error = "";
    if (!email || !password || !mobile_phone || !city) {
      error = "All fields are required ";
      return;
    }

    try {
      const user = await signUp(email, password, mobile_phone, city);
      succes = `Account created for ${user.email} Now you can log in`;
    } catch (e) {
      error = e.message;
    }
  }
</script>

<main
  class="min-h-screen bg-cover bg-center"
  style={`background-image: url(${signupImg})`}
>
  <header class="bg-black/60 py-1">
    <h1 class="text-white font-bold text-center text-5xl pt-8 pb-8">Sign up</h1>
  </header>
  <section class="bg-gray-600/70 w-90 min-h-[500px] mx-auto my-12 p-2">
    <form
      on:submit|preventDefault={handleSubmit}
      class="flex flex-col gap-8 max-w-xs mx-auto text-white mt-12 mb-12"
    >
      <fieldset>
        <legend>Signup form</legend>

        {#if succes}<p class="text-green-500 font-semibold">{succes}</p>{/if}
        {#if error}<p class="text-red-800 font-semibold">{error}</p>{/if}

        <label class="flex flex-col font-normal">
          Email:
          <input
            class="bg-gray-600 rounded-lg border-2 border-white"
            type="email"
            bind:value={email}
            required
            autocomplete="email"
            placeholder="Enter your email"
          />
        </label>

        <label class="flex flex-col font-normal">
          Password:
          <input
            class="bg-gray-600 rounded-lg border-2 border-white"
            type="password"
            bind:value={password}
            required
            autocomplete="new-password"
            placeholder="Enter your password"
          />
        </label>

        <label class="flex flex-col font-normal">
          Mobile Phone:
          <input
            class="bg-gray-600 rounded-lg border-2 border-white"
            type="text"
            bind:value={mobile_phone}
            required
            placeholder="Enter your phone number"
          />
        </label>

        <label class="flex flex-col font-normal">
          City:
          <input
            class="bg-gray-600 rounded-lg border-2 border-white"
            type="text"
            bind:value={city}
            required
            placeholder="Enter the name of your city"
          />
        </label>
      </fieldset>

      <button
        class="px-4 py-2 bg-green-600 border-2 border-black rounded-lg font-bold text-white hover:bg-green-700 cursor-pointer"
        type="submit">Sign Up</button
      >

      <p class="font-normal text-white">
        If you already have an account log in
      </p>
      <a
        href="/login"
        class="inline-block text-center bg-blue-600 underline text-white rounded-xl font-bold hover:bg-blue-400"
        >log in</a
      >
    </form>
  </section>
</main>
