<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import PageCard from "$lib/components/PageCard.svelte";
    import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte';
    import * as Menubar from "$lib/components/ui/menubar";
    import * as Select from "$lib/components/ui/select";
    
    let v = 0;
    let cate = {
        "🧪 CHEM 107 🧪": [
            "Lec. 1",
            "Lec. 2",
            "Lec. 3",
            "Lec. 4",
            "Lec. 5",
            "Lec. 6",
            "Lec. 7",
            "Lec. 8"
        ],
        "🔢 MATH 152 🔢": [
            "Lec. 1",
            "Lec. 2",
            "Lec. 3",
            "Lec. 4",
            "Lec. 5",
            "Lec. 6",
            "Lec. 7",
            "Lec. 8"
        ]
    };
</script>

<Navbar />
<div class="p-8">
    <div class="flex mt-4">
        <div class="flex">
            <Select.Root>
                <Select.Trigger class="w-[180px]">
                  <Select.Value placeholder="All Pages" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="all">All Pages</Select.Item>
                  <Select.Item value="chem">CHEM 107</Select.Item>
                  <Select.Item value="math">MATH 152</Select.Item>
                </Select.Content>
              </Select.Root>
        </div>
    </div>
    {#each Object.entries(cate) as [subject, pages]}
        <div class="mt-8">
            <p class="text-xl font-semibold">{subject}</p>
            <div class="grid grid-cols-5 gap-6 mt-4">
                {#each pages as page}
                    <PageCard title="{page}" description="Lorem ipsum dolor sit amet this is {page}" />
                {/each}
            </div>
        </div>
    {/each}
</div>
