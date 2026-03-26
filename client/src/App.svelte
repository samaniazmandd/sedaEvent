<script>
  import router from "page";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import UserCart from "./pages/UserCart.svelte";

  import Signup from "./pages/Signup.svelte";
  import Login from "./pages/Login.svelte";

  import Admin from "./pages/Admin.svelte";
  import Header from "./lib/Header.svelte";



  let currentRoute = $state("/");
  let Page = $state();
  let context = $state({});

  router("/", (ctx) => {
    Page = Home;
    currentRoute = ctx.pathname;
  });
  router("/about", (ctx) => {
    Page = About;
    currentRoute = ctx.pathname;
  });

  router("/signup", (ctx) => {
    Page = Signup;
    currentRoute = ctx.pathname;
  });
  router("/login", (ctx) => {
    Page = Login;
    currentRoute = ctx.pathname;
  });

  router("/cart", (ctx) => {
    Page = UserCart;
    currentRoute = ctx.pathname;
  });

  router("/admin", (ctx) => {
    Page = Admin;
    currentRoute = ctx.pathname;
  });

  router.start();
</script>

<Header active={currentRoute} />
<Page {context} />
