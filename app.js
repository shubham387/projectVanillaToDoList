let data = window.localStorage.getItem('expenseData')? JSON.parse(window.localStorage.getItem('expenseData')) : {items: []} ;


function getTotal(items) {
    let total = 0;
    items.forEach(item => {
        total += item.amount;
    });
    return total;
}
function renderData(data) {
    let expenseItems = []
    
    const showTotal = document.querySelector('.total-expense');
     const itemTotal = data.items.length>0?getTotal(data.items):0;
     document.querySelector('.expense-list').innerHTML = '';
     
    data.items.forEach((item, pos) => {
        let li = elementCreator('li','expense-item');
    let span1 = elementCreator('span', 'expense-name', `${item.name}`)
    let span2 = elementCreator('span', 'expense-amount', `₹${item.amount}`)
    let span3 = elementCreator('span', 'delete-item')
    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(span3);
    li.setAttribute('data-index', pos);
    document.querySelector('.expense-list').appendChild(li);
    })
    
    //Add Remove Functinoality to individual item
    updateRemoveFunc(document.querySelectorAll('.expense-item .delete-item'));

    showTotal.textContent = Number(itemTotal).toFixed(2);
    
}
function elementCreator(type, className, content){
    let el = document.createElement(type);
    el.classList.add(className);
    el.textContent = content;
    return el;
}
renderData(data);


const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    const expenseName = formData.get('expense-name');
    const expenseAmount = Number(formData.get('expense-amount'));
    data.items.unshift({name: expenseName, amount: expenseAmount});
    
   window.localStorage.setItem('expenseData',JSON.stringify(data));
   renderData(data);
   console.log(JSON.stringify(data));
   console.log(JSON.parse(window.localStorage.getItem('expenseData')));           
})

//Clear All functionality
document.querySelector('.button.reset-button').addEventListener('click',(event) => {
    event.preventDefault();
    data = {
        items: []
    }
    console.log(data);
    window.localStorage.setItem('expenseData', JSON.stringify(data));
    renderData(data);
})

//Remove Individual item 
function updateRemoveFunc(items){
    items.forEach(item => {
        item.addEventListener('click',(event) => {
            const parIndex = event.currentTarget.parentElement.dataset.index;
            data.items.splice(parIndex,1);
            window.localStorage.setItem('expenseData',JSON.stringify(data));
            renderData(data);
        })
    }) 
}

