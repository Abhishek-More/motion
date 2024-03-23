<script>
  export let title = '';
  export let description = '';
  export let id = ""

  import { goto } from '$app/navigation';
  import { sendToChatGPT } from "$lib/generator";

  const clicker = async () => {
    console.log("Clicked")
    const params = new URLSearchParams({ id: id });
    const url = `/api/getpage?${params.toString()}`;
    const res = await fetch(url);
    const d = await res.json()
    console.log(d.body)
    const _ = await sendToChatGPT(d)
    goto("/lobby?teacher=1")
  }
</script> 


<button on:click={() => clicker()} class="font-mono border border-white p-4 w-[250px] h-[200px] bg-slate-100 text-slate-600 rounded-md hover:bg-black hover:text-white transition-all">
  <p class="font-bold text-xl text-clip">{title}</p>
  <p>{description}</p>
</button>
