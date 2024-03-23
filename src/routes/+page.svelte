<script>
	import Navbar from "$lib/components/Navbar.svelte";
	import PageCard from "$lib/components/PageCard.svelte";
    import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte';
    import * as Menubar from "$lib/components/ui/menubar";
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
    <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>
              New Tab
              <Menubar.Shortcut>⌘T</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item>New Window</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item>Share</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item>Print</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>
  </div>
  <div class="grid cols-4 mt-8">
    <PageCard title="Page 1" description="This is page 1" />
  </div>
</div>
