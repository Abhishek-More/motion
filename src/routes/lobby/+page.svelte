<script lang="ts">
    import { page } from '$app/stores';
  
    $: outerWidth = 0
      $: innerWidth = 0
      $: outerHeight = 0
      $: innerHeight = 0
    import { docStore } from 'sveltefire';
    import { firestore } from "$lib/firebase";
    import { doc, getDoc, setDoc } from 'firebase/firestore';
    import { stringify } from 'postcss';
    // import { goto } from '@sveltejs/kit';

    const gameStore = docStore(firestore, 'game/game');
    const timeStore = docStore(firestore, 'timer/time');
    
    let timeLeft = 20;
  
    let selectedIndex = -1;
  
    function shuffle(array: any[]) {
      let currentIndex = array.length,  randomIndex;
  
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
  
      return array;
    }
  
    let questions = ["", "", "", ""];
    let correctIndex = 0;
    $: {
      console.log($gameStore?.answer1, $gameStore?.answer2, $gameStore?.answer3, $gameStore?.answer4)
      questions = shuffle([$gameStore?.answer1, $gameStore?.answer2, $gameStore?.answer3, $gameStore?.answer4]);
      correctIndex = questions.indexOf($gameStore?.answer1);
    }
  
    function decrementCount() {
        timeLeft--;
        if (timeLeft === 0)
        {
            clearInterval(interval);
        }
  
        if ($gameStore && teacher)
        {
          const timeRef = doc(firestore, "timer/time");
          let asdf = $timeStore;
          if (timeLeft === 0)
          {
            asdf.state = "reveal";
          }
          else
          {
            asdf.time -= .5;
            timeLeft = asdf.time;
            asdf.state = "playing";
          }
          setDoc(timeRef, asdf);
        }
    }
  
    let interval = setInterval(decrementCount, 1000);
  
    const images = [
      'https://images.pexels.com/photos/1172018/pexels-photo-1172018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1988270/pexels-photo-1988270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/355188/pexels-photo-355188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/356966/pexels-photo-356966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/248082/pexels-photo-248082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4386150/pexels-photo-4386150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/192738/pexels-photo-192738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3839557/pexels-photo-3839557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/302100/pexels-photo-302100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1028904/pexels-photo-1028904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ]
  
    let randomNum = Math.floor(Math.random() * images.length);
  
    const searchParams = $page.url.searchParams;
    const teacher = searchParams.get('teacher');
    console.log(teacher)
  
    const questionStore = docStore(firestore, 'questions/' + teacher);
    console.log(questionStore)
    async function asdfasdf()
    {
      const gameRef = doc(firestore, "game/game");
      let asdf = $gameStore;
      asdf.answer1 = $questionStore.answer1;
      asdf.answer2 = $questionStore.answer2;
      asdf.answer3 = $questionStore.answer3;
      asdf.answer4 = $questionStore.answer4;
      asdf.question = $questionStore.question;
      setDoc(gameRef, asdf);
      console.log("HEE HEE HO")
    }
    $: {
      if (teacher && $questionStore)
      {
        asdfasdf()
      }
      
    }

    $: {
  
        if (selectedIndex == correctIndex){
          console.log("correct")
          const gameRef = doc(firestore, "game/game");
          let asdf = $gameStore;
          asdf.questionNumber = asdf.questionNumber + 1;
          setDoc(gameRef, asdf);

          const currentUrl = window.location.href;
        
          const url = new URL(currentUrl);
          console.log(url.toString());
          let prefix = url.toString().substring(0, url.toString().length - 1);

          const lastChar = url.toString().charAt(url.toString().length - 1);
          let number = parseInt(lastChar);
      
          number++;
          let incrementedString = number.toString();
    
          console.log(prefix + incrementedString);
          let nextTeacher = teacher + 1;
          const timeRef = doc(firestore, "timer/time");
          let bcd = $timeStore;
          bcd.time = 20;
          setDoc(timeRef, bcd);
          window.location.href = prefix + incrementedString;
        }
      
    }
  </script>
  
  <!-- <svelte:window bind:innerWidth bind:outerWidth bind:innerHeight bind:outerHeight /> -->
  
  <div class="h-screen font-satoshi {$gameStore?.state === "reveal" ? "bg-green-100" : ""}">
    {#if teacher}
      <div class="flex flex-col justify-center w-screen h-[60px] bg-gray-200">
        <p class="text-3xl text-center font-extrabold">
          {$gameStore?.question}
        </p>
      </div>
      <p class="font-bold text-4xl text-center">{timeLeft}</p>
      <div class="flex justify-center mt-12">
        <img src={images[randomNum]} class="object-cover h-[400px] w-[800px] rounded-lg" alt="img" />
      </div>
  
      <div class="mt-16 w-screen px-8 grid grid-cols-2 grid-rows-2 gap-4 font-bold">
        <button on:click={() => {selectedIndex = 0;}} id="button1" class="bg-red-200 p-4 rounded-md   border-black {correctIndex === 0 && $gameStore?.state === "reveal" ? " border-4 " : ""}">{questions[0]}</button>
        <button on:click={() => {selectedIndex = 1;}} id="button2" class="bg-blue-200 p-4 rounded-md   border-black {correctIndex === 1 && $gameStore?.state === "reveal" ? " border-4 " : ""}">{questions[1]}</button>
        <button on:click={() => {selectedIndex = 2;}} id="button3" class="bg-green-200 p-4 rounded-md  border-black {correctIndex === 2 && $gameStore?.state === "reveal" ? " border-4 " : ""}">{questions[2]}</button>
        <button on:click={() => {selectedIndex = 3;}} id="button4" class="bg-yellow-200 p-4 rounded-md border-black {correctIndex === 3 && $gameStore?.state === "reveal" ? " border-4 " : ""}">{questions[3]}</button>
      </div>
    {/if}
  
  </div>