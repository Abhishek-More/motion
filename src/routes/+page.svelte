<script>
	import Navbar from "$lib/components/Navbar.svelte";
	import PageCard from "$lib/components/PageCard.svelte";
  import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte'
</script>

<Navbar />
<div class="p-8">
  <p class="text-4xl font-semibold">Your pages</p>
  <div class="flex mt-4">
    <div class="flex">
      <a href="/">All pages</a>
      <div class="w-3 h-3">
        <FaChevronDown class="w-3 h-3" />
      </div>
    </div>

  </div>
  <div class="grid cols-4 mt-8">
    <PageCard title="Page 1" description="This is page 1" />
  </div>
</div>
