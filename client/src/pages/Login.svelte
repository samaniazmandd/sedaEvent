<script>
  import loginImg from "../assets/login.jpg";
  import { login, isAdmin } from "../api/auth.api.js";

  let email = "";
  let password = "";
  let error = "";
  let succes = "";

  async function handleSubmit() {
    error = "";
    succes = "";
    try {
      const token = await login(email, password);

      succes = "login succesful";
      if (isAdmin()) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/cart";
      }
    } catch (e) {
      error = e.message;
    }
  }
</script>

<main
  class="min-h-screen bg-cover bg-center"
  style={`background-image: url(${loginImg})`}
>
  <header class="bg-black/60 py-1">
    <h1 class="text-white font-bold text-center text-5xl pt-8 pb-8">
      Welcome Back
    </h1>
  </header>

  <section class="bg-gray-600/70 w-90 min-h-[500px] mx-auto my-12 p-2">
    {#if succes}<p class="text-green-500 font-semibold">{succes}</p>{/if}
    {#if error}<p class="text-red-500 font-semibold">{error}</p>{/if}
    <form
      on:submit|preventDefault={handleSubmit}
      class="flex flex-col gap-8 max-w-xs mx-auto text-white mt-12 mb-12"
    >
      <!-- got some hints from this site 
    https://stackoverflow.com/questions/66354788/what-is-the-appropriate-semantic-markup-for-form-label-help-sub-text -->

      <fieldset>
        <legend>Login form</legend>

        <label class="flex flex-col font-normal">
          Email:
          <input
            class="bg-gray-600 rounded-lg border-2 border-white"
            type="email"
            bind:value={email}
            required
            autocomplete="email"
            placeholder="Enter your email as a username"
          />
        </label>
        <label class="flex flex-col font-normal">
          Password:
          <input
            class="bg-gray-600 rounded-lg border-2 border-white"
            type="password"
            bind:value={password}
            required
            autocomplete="current-password"
            placeholder="Enter your password"
          />
        </label>
      </fieldset>

      <button
        class="px-4 py-2 bg-green-600 border-2 border-black rounded-lg font-bold text-white hover:bg-green-700 cursor-pointer"
        type="submit"
        >Login
      </button>

      <p class="font-normal text-white">
        If you don't have an account make sure to sign up first
      </p>
      <a
        href="/signup"
        class="inline-block text-center bg-blue-600 underline text-white rounded-xl font-bold hover:bg-blue-400"
        >Signup
      </a>
    </form>
  </section>
</main>
