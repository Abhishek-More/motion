<script>
  export let title = '';
  export let description = '';
  export let link = ""
</script> 

<a href={`/game/${link}`} class="border border-black p-4 w-[250px] h-[200px] rounded-md">
  <p class="font-bold text-xl truncate">{title}</p>
  <p>{description}</p>
</a>
