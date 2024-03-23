<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import PageCard from "$lib/components/PageCard.svelte";
    import { Button } from "$lib/components/ui/button";
    import { onMount } from 'svelte';
    import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte';
    import * as Menubar from "$lib/components/ui/menubar";
    import * as Select from "$lib/components/ui/select";
    import { Input } from "$lib/components/ui/input";

    const getPages = async () => { 
      const res = await fetch("/api/getpages");
      const d = await res.json();
      const extractedData = d.results
      .filter(page => page.properties.Name.title.length > 0)
      .map(page => ({
        id: page.id,
        title: page.properties.Name.title[0].plain_text, 
      }));
      console.log(extractedData)
      return extractedData;
    }

    let data = []

    onMount(async () => {
      data = await getPages()
    })
</script>


<Navbar />
<div class="p-8 bg-black">
    <div class="flex mt-4">
        <navbar class="flex items-center justify-between w-full">
            <Select.Root>
                <Select.Trigger class="w-[180px]">
                  <Select.Value placeholder="All Pages" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="all">All Pages</Select.Item>
                  <Select.Item value="chem">CHEM</Select.Item>
                  <Select.Item value="math">MATH</Select.Item>
                </Select.Content>
              </Select.Root>
              <div class='flex items-end space-x-4 justify-end'>
                <Input />
                <Button variant="outline" target="_blank" href='https://www.notion.so/templates' class='text-black bg-white hover:text-white hover:border hover:bg-black drop-shadow-sm'>New</Button>
              </div>
        </navbar>
    </div>
        <div class="mt-8">
            <div class="grid grid-cols-5 gap-4 mt-4">
                {#each data as page}
                    <PageCard title={page.title} description={""} id={page.id} />
                {/each}
            </div>
        </div>
</div>
