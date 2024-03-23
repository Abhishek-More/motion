<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import PageCard from "$lib/components/PageCard.svelte";
    import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte';
    import * as Menubar from "$lib/components/ui/menubar";
    
    let v = 0;
    let cate = {
        "Chem 107": [
            "Lec. 1",
            "Lec. 2",
            "Lec. 3",
            "Lec. 4",
            "Lec. 5",
            "Lec. 6",
            "Lec. 7",
            "Lec. 8"
        ],
        "Math 152": [
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
    <p class="text-2xl font-semibold">Your pages</p>
    <div class="flex mt-4">
        <div class="flex">
            <a href="/">All pages</a>
            <div class="w-3 h-3">
                <FaChevronDown class="w-3 h-3" />
            </div>
        </div>
    </div>
    {#each Object.entries(cate) as [subject, pages]}
        <div class="mt-8">
            <p class="text-xl font-semibold">{subject}</p>
            <div class="grid grid-cols-5 gap-4 mt-4">
                {#each pages as page}
                    <PageCard title="{page}" description="This is {page}" />
                {/each}
            </div>
        </div>
    {/each}
</div>
