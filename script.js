//Входные данные
//Поступающие данные из html-документа
const formSearch=document.querySelector('.form-search'),
    inputCitiesFrom=document.querySelector('.input__cities-from'),
    dropdownCitiesFrom=document.querySelector('.dropdown__cities-from'),
    inputCitiesTo=document.querySelector('.input__cities-to'),
    dropdownCitiesTo=document.querySelector('.dropdown__cities-to');

//массив подставляемых данных(города)
const city=['Москва','Санкт-Петербург','Минск','Караганда','Челябинск','Керч','Волгоград','Самара',
    'Днепр','Екатеригбург','Киев'];


//функция для отбражения списка городов
const showCity=(input, list)=>{
    list.textContent='';

    if(input.value!==''){
    

        const filterCity = city.filter((item)=>{
            const fixItem = item.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
        });

        filterCity.forEach((item)=>{
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent=item;
            list.append(li);
            console.log(li);
        });
    }
}

//функция подсказки городов
const list=(input, dropdown)=>{

    //отслеживание ввода текста в поле
    input.addEventListener('input',()=>{
        showCity(input, dropdown);
    });

    //отслеживание клика на параметры всплывающего списка
    dropdown.addEventListener('click',(event)=>{
        const target=event.target;
        if(target.tagName.toLowerCase()==='li'){
            input.value=target.textContent;
            dropdown.textContent='';
        }
    });
    
}

list(inputCitiesFrom, dropdownCitiesFrom);
list(inputCitiesTo, dropdownCitiesTo);