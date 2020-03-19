//Входные данные
//Поступающие данные из html-документа
const formSearch=document.querySelector('.form-search'),
    inputCitiesFrom=document.querySelector('.input__cities-from'),
    dropdownCitiesFrom=document.querySelector('.dropdown__cities-from'),
    inputCitiesTo=document.querySelector('.input__cities-to'),
    dropdownCitiesTo=document.querySelector('.dropdown__cities-to');

//данные API
const citiesApi = 'dataBase/cities.json',
    proxy = 'https://cors-anywhere.herokuapp.com/',
    apiKey = '319d551dcd90c268f0f983cf1f6507f8',
    calendar='http://min-prices.aviasales.ru/calendar_preload';

//25 мая - Екатеринбург - Калининград
//Вывести в консоль


//массив подставляемых данных(города)
let city=[];

//функции

const getData=(url, callback)=>{
    const request=new XMLHttpRequest();

    request.open('GET',url);

    request.addEventListener('readystatechange', ()=>{
        if(request.readyState!==4) return;

        if(request.status===200){
            callback(request.response);
        } else{
            console.error(request.status);
        }
    });

    request.send();
};


//функция для отбражения списка городов
const showCity=(input, list)=>{
    list.textContent='';

    if(input.value!==''){
        const filterCity = city.filter((item)=>{
                const fixItem = item.name.toLowerCase();
                return fixItem.includes(input.value.toLowerCase());
        });

        filterCity.forEach((item)=>{
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent=item.name+':'+item.code;
            list.append(li);
        });
    }
}

//функция подсказки городов
const list=(input, dropdown)=>{

    //отслеживание ввода текста в поле
    input.addEventListener('input',()=>{
        showCity(input, dropdown);
    });

    //отслеживание клика на параметры всплывающего списка и подстановка текста в поле
    dropdown.addEventListener('click',(event)=>{
        const target=event.target;
        if(target.tagName.toLowerCase()==='li'){
            input.value=target.textContent;
            dropdown.textContent='';
        }
    });
    
}

//вызовы функций

list(inputCitiesFrom, dropdownCitiesFrom);
list(inputCitiesTo, dropdownCitiesTo);

getData(citiesApi, (data)=>{
    city=JSON.parse(data).filter(item=>item.name)
});

getData(calendar+'?&origin=SVX&destination=KGD&depart_date=2020-05-25', (data)=>{
    console.log(JSON.parse(data));
});
/*

(item)=>{
    return item.name
}

*/