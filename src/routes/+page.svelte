<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import PageCard from "$lib/components/PageCard.svelte";
        
    import { onMount } from 'svelte';
    import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte';
    import * as Menubar from "$lib/components/ui/menubar";
    import * as Select from "$lib/components/ui/select";

    const getPages = async () => { 
      const res = await fetch("/api/getpages");
      const d = await res.json();
      const extractedData = d.results
      .filter(page => page.properties.Name.title.length > 0)
      .map(page => ({
        id: page.id,
        title: page.properties.Name.title[0].plain_text, 
      }));
      return extractedData;
    }

    let data = []

    onMount(async () => {
      data = await getPages()
    })
</script>

<Navbar />
<div class="p-8">
    <p class="text-2xl font-semibold">Your Pages</p>
    <div class="flex mt-4">
        <div class="flex">
            <Select.Root>
                <Select.Trigger class="w-[180px]">
                  <Select.Value placeholder="Theme" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="all">All pages</Select.Item>
                  <Select.Item value="chem">CHEM 107</Select.Item>
                  <Select.Item value="math">MATH 152</Select.Item>
                </Select.Content>
              </Select.Root>
        </div>
    </div>
        <div class="mt-8">
            <div class="grid grid-cols-5 gap-4 mt-4">
                {#each data as page}
                    <PageCard title={page.title} description="This is {page}" id={page.id} />
                {/each}
            </div>
        </div>
</div>
