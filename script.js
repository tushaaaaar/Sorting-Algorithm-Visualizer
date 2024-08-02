let bars = [];
const lime = "#33FF57", finished = "cyan", chng = "yellow", selected = "yellow";
let delay = 4;
window.onload = setup();
function setup() {
    generateBars(75);
}

function reset() {
    location.reload();
}

async function FinishedSorting() {
    let bar = document.getElementsByClassName("bar");
    for (let i = 0; i < bar.length; i++) {
        bar[i].style.backgroundColor = finished;
        await sleep(delay);
    }
}

function generateBars(n = -1) {
    bars = [];
    let container = document.getElementById("container");
    n = n < 0 ? Math.random() * 20 : n;
    for (let i = 0; i < n; i++) {
        bars.push('<div class="bar" id="' + i + '" style="height:' + Math.floor(2 + Math.random() * 98) + '%"></div>');
    }
    container.innerHTML = bars.join('');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// BUBBLE SORT
async function BubbleSort() {
    let container = document.getElementById("container");

    for (let i = 0; i < bars.length; i++) {
        let flag = false;
        for (let j = 0; j < bars.length - i - 1; j++) {
            let curr_idx = bars[j].split('id="')[1].split('"')[0];
            let next_idx = bars[j + 1].split('id="')[1].split('"')[0];

            document.getElementById(curr_idx).style.backgroundColor = selected;
            document.getElementById(next_idx).style.backgroundColor = selected;
            await sleep(delay);

            let a = parseInt(bars[j].split(/[:%]/)[1]);
            let b = parseInt(bars[j + 1].split(/[:%]/)[1]);
            if (a > b) {
                flag = true;
                let t = bars[j];
                bars[j] = bars[j + 1];
                bars[j + 1] = t;

                container.innerHTML = bars.join('');
            }
        }
        await sleep(delay);
        if (flag == false)
            break;
    }
    FinishedSorting();
}


// INSERTION SORT
async function InsertionSort() {
    let container = document.getElementById("container");

    for (let i = 1; i < bars.length; i++) {
        let j = i - 1;
        let key = bars[i];

        let curr_idx = key.split('id="')[1].split('"')[0];
        let next_idx = bars[j].split('id="')[1].split('"')[0];

        document.getElementById(curr_idx).style.backgroundColor = selected;

        while (j >= 0 && parseInt(bars[j].split(/[:%]/)[1]) > parseInt(key.split(/[:%]/)[1])) {
            document.getElementById(next_idx).style.backgroundColor = lime;
            next_idx = bars[j].split('id="')[1].split('"')[0];
            document.getElementById(next_idx).style.backgroundColor = selected;
            await sleep(delay);
            bars[j + 1] = bars[j];
            j--;
        }
        bars[j + 1] = key;
        container.innerHTML = bars.join('');
        await sleep(delay);
    }
    FinishedSorting();
}


// SELECTION SORT
async function SelectionSort() {
    console.log("shaf");
    let container = document.getElementById("container");

    for (let i = 0; i < bars.length; i++) {
        let min = i;
        let curr_idx = bars[i].split('id="')[1].split('"')[0];
        document.getElementById(curr_idx).style.backgroundColor = selected;

        for (let j = i + 1; j < bars.length; j++) {
            let next_idx = bars[j].split('id="')[1].split('"')[0];
            document.getElementById(next_idx).style.backgroundColor = selected;
            let a = parseInt(bars[j].split(/[:%]/)[1]);
            let b = parseInt(bars[min].split(/[:%]/)[1]);
            if (a < b) {
                min = j;
            }
            await sleep(delay);
            document.getElementById(next_idx).style.backgroundColor = lime;
        }
        let next_idx = bars[min].split('id="')[1].split('"')[0];
        document.getElementById(next_idx).style.backgroundColor = selected;
        await sleep(delay);

        let t = bars[min];
        bars[min] = bars[i];
        bars[i] = t;

        container.innerHTML = bars.join('');
        document.getElementById(curr_idx).style.backgroundColor = lime;
        document.getElementById(next_idx).style.backgroundColor = lime;
    }
    FinishedSorting();
}


// QUICK SORT
async function Partition(l, r) {
    let pivot = parseInt(bars[r].split(/[:%]/)[1]);
    let i = l - 1;
    let container = document.getElementById("container");

    for (let j = l; j < r; j++) {
        let currValue = parseInt(bars[j].split(/[:%]/)[1]);

        document.getElementById(bars[j].split('id="')[1].split('"')[0]).style.backgroundColor = selected;
        await sleep(delay);

        if (currValue <= pivot) {
            i++;
            [bars[i], bars[j]] = [bars[j], bars[i]];
            container.innerHTML = bars.join('');
            document.getElementById(bars[j].split('id="')[1].split('"')[0]).style.backgroundColor = lime;
        }
    }

    [bars[i + 1], bars[r]] = [bars[r], bars[i + 1]];
    container.innerHTML = bars.join('');
    document.getElementById(bars[i + 1].split('id="')[1].split('"')[0]).style.backgroundColor = lime;
    document.getElementById(bars[r].split('id="')[1].split('"')[0]).style.backgroundColor = lime;

    return i + 1;
}

async function quickSort(l, r) {
    if (l < r) {
        let p = await Partition(l, r);
        await quickSort(l, p - 1);
        await quickSort(p + 1, r);
    }
}

async function QuickSort() {
    await quickSort(0, bars.length - 1);
    FinishedSorting();
}


// MERGE SORT
async function merge(l, m, r) {
    let container = document.getElementById("container");

    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = bars[l + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = bars[m + 1 + j];
    }

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        let a = parseInt(L[i].split(/[:%]/)[1]);
        let b = parseInt(R[j].split(/[:%]/)[1]);

        if (a <= b) {
            bars[k] = L[i];
            i++;
        } else {
            bars[k] = R[j];
            j++;
        }

        container.innerHTML = bars.join('');

        let curr_idx = bars[k].split('id="')[1].split('"')[0];
        document.getElementById(curr_idx).style.backgroundColor = selected;
        await sleep(delay);
        document.getElementById(curr_idx).style.backgroundColor = lime;

        k++;
    }

    while (i < n1) {
        bars[k] = L[i];
        container.innerHTML = bars.join('');
        let curr_idx = bars[k].split('id="')[1].split('"')[0];
        document.getElementById(curr_idx).style.backgroundColor = selected;
        await sleep(delay);
        document.getElementById(curr_idx).style.backgroundColor = lime;
        i++;
        k++;
    }

    while (j < n2) {
        bars[k] = R[j];
        container.innerHTML = bars.join('');
        let curr_idx = bars[k].split('id="')[1].split('"')[0];
        document.getElementById(curr_idx).style.backgroundColor = selected;
        await sleep(delay);
        document.getElementById(curr_idx).style.backgroundColor = lime;
        j++;
        k++;
    }
}

async function mergeSort(l, r) {
    if (l < r) {
        let m = Math.floor((l + r) / 2);

        await mergeSort(l, m);
        await mergeSort(m + 1, r);

        await merge(l, m, r);
    }
}

async function MergeSort() {
    await mergeSort(0, bars.length - 1);
    FinishedSorting();
}


// HEAP SORT
async function HeapSort() {
    let n = bars.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await Heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        let temp = bars[0];
        bars[0] = bars[i];
        bars[i] = temp;

        document.getElementById("container").innerHTML = bars.join('');
        await Heapify(i, 0);
    }
    FinishedSorting();
}

async function Heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    let curr_id = bars[i].split('id="')[1].split('"')[0];
    let left_id, right_id;
    if (left < n) {
        left_id = bars[left].split('id="')[1].split('"')[0];
        document.getElementById(curr_id).style.backgroundColor = selected;
        document.getElementById(left_id).style.backgroundColor = chng;
    }
    if (right < n) {
        right_id = bars[right].split('id="')[1].split('"')[0];
        document.getElementById(chng ? curr_id : left_id).style.backgroundColor = lime;
        document.getElementById(right_id).style.backgroundColor = chng;
    }
    await sleep(delay);

    if (left < n && parseInt(bars[left].split(/[:%]/)[1]) > parseInt(bars[largest].split(/[:%]/)[1])) {
        largest = left;
    }
    if (right < n && parseInt(bars[right].split(/[:%]/)[1]) > parseInt(bars[largest].split(/[:%]/)[1])) {
        largest = right;
    }

    if (largest !== i) {
        let temp = bars[i];
        bars[i] = bars[largest];
        bars[largest] = temp;

        document.getElementById("container").innerHTML = bars.join('');

        document.getElementById(curr_id).style.backgroundColor = lime;
        if (left < n) document.getElementById(left_id).style.backgroundColor = lime;
        if (right < n) document.getElementById(right_id).style.backgroundColor = chng;
        await sleep(delay);

        await Heapify(n, largest);
    } else {
        document.getElementById(curr_id).style.backgroundColor = lime;
        if (left < n) document.getElementById(left_id).style.backgroundColor = lime;
        if (right < n) document.getElementById(right_id).style.backgroundColor = lime;
    }
}
