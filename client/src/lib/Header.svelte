<script>
  import { isLoggedIn, isAdmin } from "../api/auth.api";
  export let active;

  let loggedIn = isLoggedIn();
  let admin = isAdmin();
</script>

<nav class="sticky top-0 right-0 w-full px-8 py-4 bg-[var(--gray-color)] z-50">
  <ul class="flex gap-8 list-none justify-end">
    <li>
      <a
        href="/"
        class="text-white font-semibold hover:text-yellow-300 hover:underline"
        class:text-yellow-300={active === "/"}
        class:font-bold={active === "/"}
        class:underline={active === "/"}
        >Home
      </a>
    </li>
    <li>
      <a
        href="/about"
        class="text-white font-semibold hover:text-yellow-300 hover:underline"
        class:text-yellow-300={active === "/about"}
        class:font-bold={active === "/about"}
        class:underline={active === "/about"}>About</a
      >
    </li>
    <li>
      <a
        href="/signup"
        class="text-white font-semibold hover:text-yellow-300 hover:underline"
        class:text-yellow-300={active === "/signup"}
        class:font-bold={active === "/signup"}
        class:underline={active === "/signup"}>Sign Up</a
      >
    </li>
    <li>
      <a
        href="/login"
        class="text-white font-semibold hover:text-yellow-300 hover:underline"
        class:text-yellow-300={active === "/login"}
        class:font-bold={active === "/login"}
        class:underline={active === "/login"}>Login</a
      >
    </li>
    {#if loggedIn}
      <li>
        <a
          href="/cart"
          class="text-white font-semibold hover:text-yellow-300 hover:underline"
          class:text-yellow-300={active === "/cart"}
          class:font-bold={active === "/cart"}
          class:underline={active === "/cart"}>Cart</a
        >
      </li>
    {/if}
    {#if admin}
      <li>
        <a
          href="/admin"
          class="text-white font-semibold hover:text-yellow-300 hover:underline"
          class:text-yellow-300={active === "/admin"}
          class:font-bold={active === "/admin"}
          class:underline={active === "/admin"}>Admin page</a
        >
      </li>
    {/if}
  </ul>
</nav>

<style>
</style>
