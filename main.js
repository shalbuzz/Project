
const url = 'https://acb-api.algoritmika.org/api/transaction';

const fetchData = ()=>{
    fetch(url)
    .then((response)=>response.json())
    .then(data=>{
        const transactionList = document.querySelector('.container2');
        transactionList.innerHTML = '';
        data.forEach(transaction => {
            const transactionBlock = document.createElement('div')
            transactionBlock.classList.add('container');
            transactionBlock.innerHTML = `
            <p>${transaction.from} -dan ${transaction.to} -yə ${transaction.amount} rubl ödəniş (${new Date(transaction.date).toLocaleDateString()})</p>
            <button class="edit-btn" data-id="${transaction.id}">EditThisData</button>
            <button class="delete-btn" data-id="${transaction.id}">Delete</button>
        `;
            transactionList.appendChild(transactionBlock);
        });
        document.querySelectorAll('.edit-btn').forEach((btn) =>
            btn.addEventListener('click', handleEdit)
        );
        document.querySelectorAll('.delete-btn').forEach((btn) =>
            btn.addEventListener('click', handleDelete)
        );
    })
    .catch((error) => {
        console.error('This is fail:', error);
    })
    }

    const addData = ()=>{
        const from = document.getElementById('from').value
        const to = document.getElementById('to').value
        const date = document.getElementById('date').value
        const amount = document.getElementById('amount').value

        if (!from || !to || !amount || !date) {
            alert('Заполните все поля!');
            return;
        }

        const newTransaction = {from,to,date,amount}
    fetch(url,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(newTransaction),


    }).then(res=>res.json()).then(()=>{
  fetchData();
    }).catch(error=>{
        console.log(error, 'Xeta bas verdi');
    })
    }

    const handleEdit = (event)=>{
        const id = event.target.dataset.id;
        const newFrom = prompt('Write a new data "Who":');
        const newTo = prompt('Write a new data "Whom":');
        const newAmount = prompt('Write new amount:');
        const newDate = prompt('Write new date (DD-MM-YYYY):');
    
        if (!newFrom || !newTo || !newAmount || !newDate) {
            alert('All this space nedd be full');
            return;
        }
    
        const updatedTransaction = {
            from: newFrom,
            to: newTo,
            amount: Number(newAmount),
            date: newDate,
        };
        fetch(`${url}/${id}`,
            {
            method:'PUT',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTransaction),
        })
        .then(res=>res.json()).then(()=>{
            fetchData();
        }).catch((error)=>{
            console.log(error,'Xeta bas verdi')
        })
    };

    const handleDelete = (event)=>{
        const id = event.target.dataset.id;

    fetch(`${url}/${id}`, 
        { 
            method: 'DELETE' 
        })
        .then(() => {
            fetchData(); 
        })
        .catch((error) => {
            console.error('This is fail:', error);
        });
    };
    const handleClear = () => {
        const popup = document.querySelector('.popup');
        popup.classList.add('show');
    };
    
    
    const confirmClear = () => {
        fetch(url, {
            method: 'DELETE',
        })
            .then(() => {
                fetchData();
                document.querySelector('.popup').classList.remove('show');
            })
            .catch((error) => {
                console.error('Failed to clear data', error);
            });
    };
    
    
    const cancelClear = () => {
        document.querySelector('.popup').classList.remove('show');
    };
    
    
    document.querySelector('.clear-btn').addEventListener('click', handleClear);
    
    
    document.querySelector('.confirm-btn').addEventListener('click', confirmClear);
    document.querySelector('.cancel-btn').addEventListener('click', cancelClear);
    
    document.querySelector('.search-btn').addEventListener('click', fetchData);
    document.querySelector('.add-btn').addEventListener('click',addData);
    






