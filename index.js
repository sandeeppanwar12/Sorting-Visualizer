const blocks = [
  { color: "red", number: 5, width: "20px", height: "100px" },
  { color: "blue", number: 12, width: "20px", height: "240px" },
  { color: "green", number: 7, width: "20px", height: "140px" },
  { color: "yellow", number: 3, width: "20px", height: "60px" },
  { color: "purple", number: 9, width: "20px", height: "180px" },
  { color: "orange", number: 15, width: "20px", height: "300px" },
  { color: "pink", number: 2, width: "20px", height: "40px" },
  { color: "brown", number: 8, width: "20px", height: "160px" },
  { color: "aqua", number: 6, width: "20px", height: "120px" },
  { color: "magenta", number: 11, width: "20px", height: "220px" }
];

function create(){
    const panel=document.getElementById('panel');
    for(let i=0;i<blocks.length;i++){
    const block=document.createElement('div');
    block.id=`block${i}`;
    block.innerHTML=`${blocks[i].number}`
    block.style.color = 'white'; // so text is visible
block.style.textAlign = 'center';
block.style.fontSize = 'large';
    block.style.backgroundColor = blocks[i].color;
    block.style.width = '80px';
    block.style.position='absolute';
    block.style.left = `${i * 90}px`; 
    block.style.bottom='0px'
    block.style.borderRadius="10px"
    block.style.height = `${blocks[i].height}`; // height proportional to number
    block.style.display = 'inline-block';
    block.style.margin = '0 2px';
    panel.appendChild(block);
    }
}
create();

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
        await new Promise(resolve => setTimeout(resolve, 500)); // delay
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
       await new Promise(resolve => setTimeout(resolve, 500));
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
        await new Promise(resolve => setTimeout(resolve, 500));
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


