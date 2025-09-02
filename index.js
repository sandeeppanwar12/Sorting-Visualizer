const arr = [
  { color: "red", number: 5, height: "100px" },
  { color: "blue", number: 12, height: "240px" },
  { color: "green", number: 7, height: "140px" },
  { color: "yellow", number: 3, height: "60px" },
  { color: "purple", number: 9, height: "180px" },
  { color: "orange", number: 15, height: "300px" },
  { color: "pink", number: 2, height: "40px" },
  { color: "brown", number: 8, height: "160px" },
  { color: "aqua", number: 6, height: "120px" },
  { color: "magenta", number: 11, height: "220px" },
  { color: "lime", number: 4, height: "80px" },
  { color: "teal", number: 10, height: "200px" },
  { color: "navy", number: 13, height: "260px" },
  { color: "maroon", number: 16, height: "320px" },
  { color: "olive", number: 1, height: "20px" },
  { color: "coral", number: 14, height: "280px" },
  { color: "gold", number: 18, height: "360px" },
  { color: "silver", number: 19, height: "380px" },
  { color: "indigo", number: 20, height: "400px" },
  { color: "violet", number: 17, height: "340px" },
  { color: "cyan", number: 21, height: "420px" },
  { color: "khaki", number: 22, height: "440px" },
  { color: "lavender", number: 23, height: "460px" },
  { color: "crimson", number: 24, height: "480px" },
  { color: "beige", number: 25, height: "500px" },
  { color: "orchid", number: 26, height: "520px" },
  { color: "turquoise", number: 27, height: "540px" },
  { color: "salmon", number: 28, height: "560px" },
  { color: "chocolate", number: 29, height: "580px" },
  { color: "plum", number: 30, height: "600px" }
];

let blocks = arr.slice(0,10);  ;
let size;
 document.getElementById('arraySize').addEventListener('change',(event)=>{
    size=event.target.value;
    console.log(size);
    blocks=arr.slice(0,size);
    document.getElementById('panel').innerHTML='';
    create();
});
 let s=100;
document.getElementById('speed').addEventListener('change',(event)=>{
     s=event.target.value;
    console.log(s);
});   


function create(){
    const panel=document.getElementById('panel');
    for(let i=0;i<blocks.length;i++){
    const block=document.createElement('div');
    block.id=`block${i}`;
    block.id='Box';
    block.innerHTML=`${blocks[i].number}`
    block.style.color = 'white'; // so text is visible
block.style.textAlign = 'center';
block.style.fontSize = 'large';
    block.style.backgroundColor = blocks[i].color;
    block.style.width = 'auto';
    block.style.position='absolute';
    block.style.left = `${i * 30}px`; 
    block.style.bottom='0px'
    block.style.borderRadius="5px"
    block.style.height = `${blocks[i].height}`; // height proportional to number
    block.style.display = 'inline-block';
    block.style.margin = '0 2px';
    panel.appendChild(block);
    }
}
// create();

// -----------------------------------------------

async function bubbleSort() {
  for (let i = 0; i < blocks.length; i++) {
    let swapped = false;
    for (let j = 0; j < blocks.length - i - 1; j++) {
      if (blocks[j].number > blocks[j + 1].number) { 
        let temp = blocks[j];
        blocks[j] = blocks[j + 1];
        blocks[j + 1] = temp;
        swapped = true;
        const panel=document.getElementById('panel');
        panel.innerHTML="";
        create(); // update UI
        await new Promise(resolve => setTimeout(resolve,s)); // delay
      }
    }
    if (!swapped) break;
  }
}

// -----------------------------------------------

async function  Selection_Sort() {
   let n = blocks.length;
    for (let i = 0; i < n - 1; i++) {
    
        // Assume the current position holds
        // the minimum element
        let min_idx = i;
        
        // Iterate through the unsorted portion
        // to find the actual minimum
        for (let j = i + 1; j < n; j++) {
            if (blocks[j].number < blocks[min_idx].number) {
            
                // Update min_idx if a smaller element is found
                min_idx = j;
            }
        }
        // Move minimum element to its
        // correct position
        let temp = blocks[i];
        blocks[i] = blocks[min_idx];
        blocks[min_idx] = temp;
        const panel=document.getElementById('panel');
        panel.innerHTML="";
        create();
       await new Promise(resolve => setTimeout(resolve,s));
    }

}

function merge(blocks, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++)
        L[i] = blocks[left + i];
    for (let j = 0; j < n2; j++)
        R[j] = blocks[mid + 1 + j];

    let i = 0, j = 0;
    let k = left;

    while (i < n1 && j < n2) {
        if (L[i].number <= R[j].number) {
            blocks[k] = L[i];
            i++;
        } else {
            blocks[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        blocks[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        blocks[k] = R[j];
        j++;
        k++;
    }
}

async function Merge_Sort() {
    let left = 0, right = blocks.length - 1;

    async function mergeSort(blocks, left, right) {
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);
        await mergeSort(blocks, left, mid);
        await mergeSort(blocks, mid + 1, right);

        merge(blocks, left, mid, right);

        // Render after each merge
        const panel = document.getElementById('panel');
        panel.innerHTML = "";
        create();
        await new Promise(resolve => setTimeout(resolve, s));
    }

    await mergeSort(blocks, left, right);
    console.log("done", blocks);
}

document.getElementById('left').addEventListener('click',(event)=>{
    const id=event.target.id;
     create();
     if(id==="Bubble_Sort"){
       bubbleSort()
     }
     else if(id==="Selection_Sort")
      Selection_Sort();

     else if(id=="Merge_Sort")
      Merge_Sort();
    //  create();
})
document.getElementById('restart').addEventListener('click',()=>{
    // let random=Math.floor(Math.random()*10))
    blocks=arr.slice(0,10);
    document.getElementById('panel').innerHTML="";
    // create();
});



