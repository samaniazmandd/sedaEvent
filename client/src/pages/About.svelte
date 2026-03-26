<script>
  import video from "../assets/ams2.mp4";
</script>

<section class="relative h-screen w-full overflow-hidden">
  <!-- Where I got hints from  -->
  <!-- https://www.w3schools.com/tags/tag_video.asp -->
  <video
    autoplay
    muted
    loop
    playsinline
    class="absolute inset-0 w-full h-full object-cover"
  >
    <source src={video} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div class="absolute inset-0 bg-black/50"></div>

  <article
    class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
  >
    <header>
      <h1 class=" text-white text-3xl font-bold">About us</h1>
    </header>

    <p class="mt-4 text-lg text-white max-w-2xl">
      Since 2018, our mission has been to organize fun and memorable events all
      across the Netherlands. We proudly collaborate with amazing partners such
      as
      <strong class="font-semibold">LightStage Productions</strong>,
      <strong class="font-semibold">CrowdMasters</strong>, and
      <strong class="font-semibold">EventFlow</strong>
      to bring you the best possible experiences. Whether it's concerts, parties,
      or special themed weekends, our goal is simple: to make your weekends more
      exciting and unforgettable without breaking the bank.
    </p>

    <p class="mt-4 text-lg text-white max-w-2xl">
      From affordable concerts to unique gatherings, SedaEvents is here to keep
      you entertained. Don't let boredom take over, take a look at our upcoming
      events and reserve your spot today!
    </p>
  </article>
</section>
